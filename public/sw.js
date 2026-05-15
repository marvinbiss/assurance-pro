/**
 * Vivos Assurance — Service Worker PWA
 *
 * Stratégies :
 *  - HTML (navigation) : network-first avec fallback /offline
 *  - Assets statiques (CSS, JS, fonts, images) : cache-first puis network
 *  - API : network-only (jamais cached pour éviter données stales)
 *  - Cache versionné : changer CACHE_VERSION invalide tout
 *
 * Pas d'install prompt forcé (l'utilisateur installe via UI navigateur natif).
 */

const CACHE_VERSION = 'vivos-v1-2026-05-14'
const STATIC_CACHE = `${CACHE_VERSION}-static`
const PAGES_CACHE = `${CACHE_VERSION}-pages`

const OFFLINE_URL = '/offline'

// Ressources critiques pré-cachées pour le mode offline
const PRECACHE_URLS = ['/offline', '/manifest.json']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.startsWith(CACHE_VERSION))
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Ignore non-GET
  if (request.method !== 'GET') return

  // Ignore cross-origin (analytics, CDN tiers)
  if (url.origin !== self.location.origin) return

  // Ignore API routes (network-only)
  if (url.pathname.startsWith('/api/')) return

  // Ignore Next.js internal routes (HMR, _next/data...)
  if (url.pathname.startsWith('/_next/data/')) return

  // Stratégie pour HTML/navigation : network-first
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithOfflineFallback(request))
    return
  }

  // Assets statiques (CSS, JS, fonts, images) : cache-first
  if (
    url.pathname.startsWith('/_next/static/') ||
    /\.(css|js|woff2?|ttf|otf|png|jpg|jpeg|svg|ico|webp|avif)$/i.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request))
    return
  }

  // Default : network-first
  event.respondWith(networkFirstWithOfflineFallback(request))
})

async function networkFirstWithOfflineFallback(request) {
  try {
    const networkResponse = await fetch(request)
    // Met en cache la réponse (en arrière-plan, sans bloquer)
    if (networkResponse.ok) {
      const cache = await caches.open(PAGES_CACHE)
      cache.put(request, networkResponse.clone()).catch(() => {})
    }
    return networkResponse
  } catch {
    // Offline : essayer cache puis fallback /offline
    const cached = await caches.match(request)
    if (cached) return cached
    const offline = await caches.match(OFFLINE_URL)
    if (offline) return offline
    return new Response('Hors-ligne', { status: 503, statusText: 'Offline' })
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone()).catch(() => {})
    }
    return networkResponse
  } catch {
    return new Response('Asset indisponible', { status: 503 })
  }
}
