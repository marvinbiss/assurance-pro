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
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self), payment=(self), interest-cohort=()' },
  // Cross-origin isolation (Mozilla Observatory A+)
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
  // Browser feature opt-out
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  { key: 'Origin-Agent-Cluster', value: '?1' },
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
      { protocol: 'https', hostname: 'vivos-assurance.fr' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      ...(SUPABASE_HOST ? [{ protocol: 'https', hostname: SUPABASE_HOST }] : []),
      ...(process.env.NODE_ENV !== 'production'
        ? [{ protocol: 'http', hostname: 'localhost' }]
        : []),
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    // SVG remote n'est jamais servi en prod ; laisser à false élimine un vecteur XSS.
    dangerouslyAllowSVG: false,
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  staticPageGenerationTimeout: 600,

  experimental: {
    optimizePackageImports: ['lucide-react', '@supabase/supabase-js', 'date-fns', 'zod', 'motion'],
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
      // Aliases métiers courts → fiche RC Pro complète
      { source: '/freelance-it', destination: '/rc-pro/freelance-it', permanent: true },
      { source: '/freelance', destination: '/rc-pro/freelance-it', permanent: true },
      { source: '/consultant', destination: '/rc-pro/consultant', permanent: true },
      { source: '/agence-web', destination: '/rc-pro/agence-web', permanent: true },
      { source: '/coach', destination: '/rc-pro/coach-sportif', permanent: true },
      { source: '/coach-professionnel', destination: '/rc-pro/coach-sportif', permanent: true },
      { source: '/coiffeur', destination: '/rc-pro/coiffeur', permanent: true },
      { source: '/photographe', destination: '/rc-pro/photographe', permanent: true },
      { source: '/expert-comptable', destination: '/rc-pro/expert-comptable', permanent: true },
      { source: '/decennale', destination: '/assurance-decennale', permanent: true },
      { source: '/garantie-decennale', destination: '/assurance-decennale', permanent: true },
      // Aliases métiers BTP courts → fiche décennale métier
      { source: '/plombier', destination: '/assurance-decennale/plombier', permanent: true },
      { source: '/macon', destination: '/assurance-decennale/macon', permanent: true },
      { source: '/maçon', destination: '/assurance-decennale/macon', permanent: true },
      { source: '/electricien', destination: '/assurance-decennale/electricien', permanent: true },
      { source: '/électricien', destination: '/assurance-decennale/electricien', permanent: true },
      { source: '/carreleur', destination: '/assurance-decennale/carreleur', permanent: true },
      { source: '/couvreur', destination: '/assurance-decennale/couvreur-zingueur', permanent: true },
      { source: '/couvreur-zingueur', destination: '/assurance-decennale/couvreur-zingueur', permanent: true },
      { source: '/zingueur', destination: '/assurance-decennale/couvreur-zingueur', permanent: true },
      { source: '/charpentier', destination: '/assurance-decennale/charpentier', permanent: true },
      { source: '/peintre', destination: '/assurance-decennale/peintre-plaquiste', permanent: true },
      { source: '/peintre-plaquiste', destination: '/assurance-decennale/peintre-plaquiste', permanent: true },
      { source: '/plaquiste', destination: '/assurance-decennale/peintre-plaquiste', permanent: true },
      { source: '/maitre-oeuvre', destination: '/assurance-decennale/maitre-oeuvre', permanent: true },
      { source: '/maître-oeuvre', destination: '/assurance-decennale/maitre-oeuvre', permanent: true },
      { source: '/photovoltaique', destination: '/assurance-decennale/photovoltaique', permanent: true },
      { source: '/photovoltaïque', destination: '/assurance-decennale/photovoltaique', permanent: true },
      // Aliases métiers RC Pro complémentaires (consultant/coiffeur/photographe/expert-comptable déjà mappés)
      { source: '/informatique', destination: '/rc-pro/informatique', permanent: true },
      { source: '/freelance-informatique', destination: '/rc-pro/informatique', permanent: true },
      { source: '/vtc', destination: '/rc-pro/vtc', permanent: true },
      { source: '/immobilier', destination: '/rc-pro/immobilier', permanent: true },
      { source: '/agent-immobilier', destination: '/rc-pro/immobilier', permanent: true },
      { source: '/coach-sportif', destination: '/rc-pro/coach-sportif', permanent: true },
      { source: '/esthetique', destination: '/rc-pro/esthetique', permanent: true },
      { source: '/esthéticienne', destination: '/rc-pro/esthetique', permanent: true },
      { source: '/formateur', destination: '/rc-pro/formateur', permanent: true },
      { source: '/sante-paramedical', destination: '/rc-pro/sante-paramedical', permanent: true },
      { source: '/paramedical', destination: '/rc-pro/sante-paramedical', permanent: true },
      { source: '/transport-marchandises', destination: '/rc-pro/transport-marchandises', permanent: true },
      // Aliases métiers décennale slugs longs (sitemap.ts mismatch vs dirs)
      { source: '/charpentier-bois', destination: '/assurance-decennale/charpentier-bois', permanent: true },
      { source: '/etancheur', destination: '/assurance-decennale/etancheur', permanent: true },
      { source: '/étancheur', destination: '/assurance-decennale/etancheur', permanent: true },
      { source: '/facadier-ite', destination: '/assurance-decennale/facadier-ite', permanent: true },
      { source: '/façadier', destination: '/assurance-decennale/facadier-ite', permanent: true },
      { source: '/facadier', destination: '/assurance-decennale/facadier-ite', permanent: true },
      { source: '/installateur-photovoltaique', destination: '/assurance-decennale/installateur-photovoltaique', permanent: true },
      { source: '/menuisier', destination: '/assurance-decennale/menuisier-interieur', permanent: true },
      { source: '/menuisier-interieur', destination: '/assurance-decennale/menuisier-interieur', permanent: true },
      { source: '/plaquiste-platrier', destination: '/assurance-decennale/plaquiste-platrier', permanent: true },
      { source: '/platrier', destination: '/assurance-decennale/plaquiste-platrier', permanent: true },
      // 404 catch — anciens chemins métier/métier imbriqués (ex: multi-services-btp/carreleur)
      { source: '/assurance-decennale/multi-services-btp/:metier', destination: '/assurance-decennale/:metier', permanent: true },
      { source: '/assurance-decennale/:parent/:child', destination: '/assurance-decennale/:child', permanent: true },
      // Aliases métiers RC Pro complémentaires (sitemap slugs)
      { source: '/community-manager', destination: '/rc-pro/community-manager', permanent: true },
      { source: '/designer-graphique', destination: '/rc-pro', permanent: false },
      { source: '/designer', destination: '/rc-pro', permanent: false },
      { source: '/traducteur', destination: '/rc-pro', permanent: false },
      // Hub dirs sans page.tsx → redirect vers contenus existants similaires
      { source: '/attestation', destination: '/attestation/decennale', permanent: false },
      { source: '/comparateur', destination: '/comparateur-assurance-professionnelle', permanent: false },
      { source: '/courtier', destination: '/courtier-assurance-pro', permanent: false },
      { source: '/outils', destination: '/comparateur-assurance-professionnelle', permanent: false },
      { source: '/prix', destination: '/comparateur-assurance-professionnelle', permanent: false },
      { source: '/tarif', destination: '/comparateur-assurance-professionnelle', permanent: false },
      { source: '/guide', destination: '/guides/attestation-decennale', permanent: false },
      { source: '/guides', destination: '/guides/attestation-decennale', permanent: false },
    ]
  },

  env: {
    NEXT_PUBLIC_SITE_URL:
      process.env.NEXT_PUBLIC_SITE_URL || 'https://vivos-assurance.fr',
  },
}

// Sentry wrapping — no-op si SENTRY_DSN absent (instrumentation.ts).
const { withSentryConfig } = require('@sentry/nextjs')

// Bundle analyzer — activer avec ANALYZE=true npm run build
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withSentryConfig(withBundleAnalyzer(nextConfig), {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  // Désactive l'auto-instrumentation App Router qui casse les imports
  // de composants externes en dev sur Next 15.5+ (voir audit 2026-05).
  webpack: {
    autoInstrumentServerFunctions: false,
    autoInstrumentAppDirectory: false,
    autoInstrumentMiddleware: false,
  },
})
