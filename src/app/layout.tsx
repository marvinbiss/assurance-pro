import type { Metadata, Viewport } from 'next'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { headers } from 'next/headers'
import { DM_Sans, Sora } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { TrackingScripts } from '@/components/TrackingScripts'
import { getOrganizationSchema, getWebsiteSchema } from '@/lib/seo/jsonld'
import { SITE_URL } from '@/lib/seo/config'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  adjustFontFallback: true,
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  adjustFontFallback: true,
})

// Dynamic imports for performance (client-only utilities)
const ServiceWorkerRegistration = dynamic(
  () => import('@/components/ServiceWorkerRegistration'),
  { ssr: false }
)
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), {
  ssr: false,
})
const WebVitals = dynamic(
  () => import('@/components/WebVitals').then(mod => ({ default: mod.WebVitals })),
  { ssr: false }
)

// Viewport configuration - Primary brand color
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E86B4B' },
    { media: '(prefers-color-scheme: dark)', color: '#C24B2A' },
  ],
  colorScheme: 'light',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Assurance Pro — Courtier ORIAS multi-vertical',
    template: '%s | Assurance Pro',
  },
  description:
    'Courtier ORIAS spécialiste assurance professionnelle. Comparez les offres de 10+ assureurs partenaires. Décennale, RC Pro, Multirisque, Mutuelle, VTC, Cyber. Devis gratuit et sans engagement.',
  authors: [{ name: 'Assurance Pro' }],
  applicationName: 'Assurance Pro',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Assurance Pro',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: 'Assurance Pro',
    title: 'Assurance Pro — Comparez et économisez en 2 minutes',
    description:
      'Courtier ORIAS spécialiste assurance pro. 10+ assureurs partenaires comparés. Décennale, RC Pro, Multirisque, Mutuelle TNS, VTC. Devis gratuit en 24h.',
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Assurance Pro — Comparez et économisez en 2 minutes' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assurance Pro — Comparez et économisez en 2 minutes',
    description:
      'Courtier ORIAS — Décennale, RC Pro, Multirisque, Mutuelle TNS, VTC. Devis gratuit.',
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'fr-FR': SITE_URL,
      'x-default': SITE_URL,
    },
    types: {
      'application/rss+xml': [
        { url: `${SITE_URL}/feed/blog.xml`, title: 'Blog Assurance Pro' },
      ],
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

// revalidate removed — each page sets its own (86400 for pSEO pages)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <html lang="fr" className={`scroll-smooth ${dmSans.variable} ${sora.variable}`}>
      <head>
        {/* PWA Meta Tags (apple-mobile-web-app, mobile-web-app-capable, theme-color handled by metadata/viewport exports) */}
        <meta name="msapplication-TileColor" content="#E86B4B" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* Additional icon size (180px apple-touch-icon + icon.svg handled by metadata.icons export) */}
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />

        {/* LLM discovery — llms.txt (GEO/AEO optimization) */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM access guidelines" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM detailed content" />

        {/* Global Organization + WebSite schema (E-E-A-T) */}
        <script
          nonce={nonce}
          type="application/ld+json"
                   dangerouslySetInnerHTML={{
            __html: JSON.stringify([getOrganizationSchema(), getWebsiteSchema()])
              .replace(/</g, '\\u003c')
              .replace(/>/g, '\\u003e')
              .replace(/&/g, '\\u0026'),
          }}
        />

        {/* Preconnect for Google Tag Manager */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Preconnect for Meta Pixel */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        {/* Preconnect for Supabase backend */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL || ''} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL || ''} />

        {/* Preconnect for images - Unsplash */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans bg-sand-50 antialiased text-charcoal-900">
        {/*
         * Google Consent Mode v2 — 'denied' par défaut.
         * Aucun pixel ne se déclenche tant que l'utilisateur n'a pas
         * explicitement consenti via la bannière. CookieConsent passe ensuite
         * 'granted' aux catégories acceptées et émet un événement
         * 'cookie-consent-changed' que TrackingScripts consomme pour injecter
         * les balises (GTM, Meta Pixel, Contentsquare).
         */}
        <Script id="consent-default" strategy="beforeInteractive" nonce={nonce}>
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`}
        </Script>
        <TrackingScripts
          nonce={nonce}
          gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-THV3KZ8N'}
          metaPixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID}
        />
        <WebVitals />
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <ServiceWorkerRegistration />
        <CookieConsent />
      </body>
    </html>
  )
}
