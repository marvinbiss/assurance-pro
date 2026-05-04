/** @type {import('next').NextConfig} */

// Cache-Control est géré exclusivement par src/middleware.ts (autorité unique).
// CSP nonce-based : également par middleware (per-request).
// Ce fichier ne contient que les concerns next.config qui ne peuvent pas
// vivre ailleurs : images, compiler, experimental, env, headers de sécurité fixes.

const SECURITY_HEADERS = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=(self)' },
]

const SUPABASE_HOST = (() => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!url) return null
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
})()

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: 'https', hostname: 'assurance-pro.fr' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      ...(SUPABASE_HOST ? [{ protocol: 'https', hostname: SUPABASE_HOST }] : []),
      ...(process.env.NODE_ENV !== 'production'
        ? [{ protocol: 'http', hostname: 'localhost' }]
        : []),
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // SVG remote n'est jamais servi en prod ; laisser à false élimine un vecteur XSS.
    dangerouslyAllowSVG: false,
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  staticPageGenerationTimeout: 600,

  experimental: {
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js', 'date-fns', 'zod'],
    instrumentationHook: true,
  },

  async headers() {
    return [
      { source: '/(.*)', headers: SECURITY_HEADERS },
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Toutes les routes pSEO publiques sont mises en cache via le middleware
      // (single source of truth). Pas de duplication ici.
    ]
  },

  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/accueil', destination: '/', permanent: true },
      // Aliases pages légales (variations FR fréquentes)
      { source: '/politique-de-confidentialite', destination: '/confidentialite', permanent: true },
      { source: '/politique-confidentialite', destination: '/confidentialite', permanent: true },
      { source: '/conditions-generales', destination: '/cgv', permanent: true },
      { source: '/conditions-generales-de-vente', destination: '/cgv', permanent: true },
      { source: '/conditions-generales-de-service', destination: '/cgv', permanent: true },
      { source: '/cookies-policy', destination: '/cookies', permanent: true },
      { source: '/legal', destination: '/mentions-legales', permanent: true },
      { source: '/legals', destination: '/mentions-legales', permanent: true },
      // Devoir de conseil et processus
      { source: '/processus', destination: '/notre-processus-conseil', permanent: true },
      { source: '/conseil', destination: '/notre-processus-conseil', permanent: true },
      { source: '/devis-gratuit', destination: '/devis', permanent: true },
      { source: '/demande-devis', destination: '/devis', permanent: true },
    ]
  },

  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || 'https://assurance-pro.fr',
  },
}

// Sentry wrapping — no-op si SENTRY_DSN absent (sentry.{client,server,edge}.config.ts).
// withSentryConfig n'ajoute pas d'overhead runtime s'il n'y a pas de DSN.
const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  // disableLogger deprecated → utiliser webpack.treeshake.removeDebugLogging dans Next 15+
})
