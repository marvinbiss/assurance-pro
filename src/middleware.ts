import { type NextRequest, NextResponse } from 'next/server'
import {
  checkRateLimit,
  getRateLimitConfig,
  getRateLimitKey,
  getClientIp,
} from '@/lib/rate-limiter'
import { logger } from '@/lib/logger'

/**
 * Middleware Assurance Pro — concerns hot-path uniquement.
 *
 * Responsabilités (single source of truth) :
 * - URL canonicalization (https, non-www, no trailing slash, lowercase, strip tracking params)
 * - CSP nonce per request (strict-dynamic)
 * - Rate limiting on /api/*
 * - CDN Cache-Control sur les routes pSEO publiques (next.config.js ne fait plus rien ici)
 *
 * NB : la collecte des hits Googlebot a été retirée du middleware (I/O Supabase
 * sur le hot path = anti-pattern). Vercel logs + Search Console couvrent ce besoin.
 */

function buildCsp(nonce: string): string {
  return (
    "default-src 'self'; " +
    `script-src 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://t.contentsquare.net; ` +
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com; ` +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' data: blob: https:; " +
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api-adresse.data.gouv.fr https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://t.contentsquare.net https://connect.facebook.net; " +
    "frame-src 'self' https://www.openstreetmap.org; " +
    "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"
  )
}

function addCspHeaders(response: NextResponse, nonce: string): NextResponse {
  if (process.env.NODE_ENV === 'development') return response
  response.headers.set('Content-Security-Policy', buildCsp(nonce))
  return response
}

function getCanonicalRedirect(request: NextRequest): string | null {
  const url = request.nextUrl
  const host = request.headers.get('host') || 'vivos-assurance.fr'
  let canonicalHost = host
  let pathname = url.pathname
  let needsRedirect = false

  if (process.env.NODE_ENV === 'production') {
    if (url.protocol === 'http:' || host.startsWith('www.')) {
      canonicalHost = host.replace(/^www\./, '')
      needsRedirect = true
    }
  }

  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1)
    needsRedirect = true
  }

  const trackingParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'fbclid',
    'gclid',
  ]
  const hasTracking = trackingParams.some((p) => url.searchParams.has(p))
  let search = url.search
  if (hasTracking) {
    trackingParams.forEach((p) => url.searchParams.delete(p))
    const cleanSearch = url.searchParams.toString()
    search = cleanSearch ? `?${cleanSearch}` : ''
    needsRedirect = true
  }

  if (pathname !== pathname.toLowerCase()) {
    pathname = pathname.toLowerCase()
    needsRedirect = true
  }

  if (needsRedirect) {
    return `https://${canonicalHost}${pathname}${search}`
  }

  return null
}

// Centralisé pour permettre l'extension future (e.g. ajout d'une garantie).
const PUBLIC_CACHE_PREFIXES = [
  '/assurance-decennale/',
  '/rc-pro/',
  '/multirisque-pro/',
  '/mutuelle-pro/',
  '/assurance-vtc/',
  '/cyber-assurance/',
  '/blog/',
  '/equipe/',
  '/ipid/',
] as const

const PUBLIC_CACHE_EXACT = new Set<string>([
  '/',
  '/assurance-decennale',
  '/rc-pro',
  '/multirisque-pro',
  '/mutuelle-pro',
  '/assurance-vtc',
  '/cyber-assurance',
  '/rc-pro-avocat',
  '/rc-pro-medecin',
  '/comparateur-assureurs',
  '/blog',
  '/faq',
  '/glossaire',
  '/a-propos',
  '/contact',
  '/cgv',
  '/cookies',
  '/confidentialite',
  '/mediation',
  '/normes',
  '/plan-du-site',
  '/mentions-legales',
  '/fic',
  '/ipid',
  '/equipe',
  '/notre-processus-conseil',
  '/selection-assureurs',
])

const PUBLIC_CACHE_VALUE = 'public, s-maxage=86400, stale-while-revalidate=604800'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const canonicalUrl = getCanonicalRedirect(request)
  if (canonicalUrl && process.env.NODE_ENV === 'production') {
    return NextResponse.redirect(canonicalUrl, 301)
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  if (pathname.startsWith('/api/') && pathname !== '/api/health') {
    const clientIp = getClientIp(request.headers)
    const rateLimitConfig = getRateLimitConfig(pathname)
    const rateLimitKey = getRateLimitKey(clientIp, pathname)

    try {
      const result = await checkRateLimit(rateLimitKey, rateLimitConfig)
      if (!result.allowed) {
        const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000)
        return new NextResponse(
          JSON.stringify({ error: 'Trop de requêtes. Veuillez réessayer plus tard.' }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(retryAfter),
              'X-RateLimit-Limit': String(rateLimitConfig.max),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': String(result.resetTime),
            },
          }
        )
      }
    } catch (error) {
      logger.error('Rate limiter error:', error)
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('x-nonce', nonce)
  response.headers.set('x-pathname', pathname)

  if (
    PUBLIC_CACHE_EXACT.has(pathname) ||
    PUBLIC_CACHE_PREFIXES.some((p) => pathname.startsWith(p))
  ) {
    response.headers.set('Cache-Control', PUBLIC_CACHE_VALUE)
    response.headers.set('CDN-Cache-Control', PUBLIC_CACHE_VALUE)
  }

  return addCspHeaders(response, nonce)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|sitemap/|robots\\.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|xml|css|js|woff2?)$).*)',
  ],
}
