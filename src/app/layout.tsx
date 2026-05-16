import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { headers } from 'next/headers'
import { DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { PreOriasBanner } from '@/components/PreOriasBanner'
import Footer from '@/components/Footer'
import { StickyMobileCta } from '@/components/premium'
import { TrackingScripts } from '@/components/TrackingScripts'
import {
  getOrganizationSchema,
  getWebsiteSchema,
  getAggregateRatingDirectSchema,
} from '@/lib/seo/jsonld'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { SITE_URL } from '@/lib/seo/config'
import { SITE_AGGREGATE_RATING } from '@/lib/seo/aggregate-rating'
import { ClientOnlyWebVitals, ClientOnlyFooterHelpers } from '@/app/_components/client-only-helpers'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { ScrollToTop } from '@/components/ui/scroll-to-top'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  adjustFontFallback: true,
})

// Fraunces — variable serif éditoriale premium (axes opsz + SOFT + wght continu)
// Élève instantanément le brand vers "Editorial Luxury Artisanal"
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  style: ['normal'],
  axes: ['opsz', 'SOFT'],
  adjustFontFallback: true,
})

// Client-only dynamic imports moved to ./_components/client-only-helpers.tsx
// (Next 15: `ssr: false` requires a Client Component boundary)

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
    default: 'Vivos Assurance — Courtier ORIAS multi-vertical',
    template: '%s | Vivos Assurance',
  },
  description:
    'Courtier ORIAS spécialiste assurance professionnelle. Comparez les offres de 10+ assureurs partenaires. Décennale, RC Pro, Multirisque, Mutuelle, VTC, Cyber. Devis gratuit et sans engagement.',
  authors: [{ name: 'Vivos Assurance' }],
  applicationName: 'Vivos Assurance',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vivos Assurance',
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
    siteName: 'Vivos Assurance',
    title: 'Vivos Assurance — Comparez et économisez en 2 minutes',
    description:
      'Courtier ORIAS spécialiste assurance pro. 10+ assureurs partenaires comparés. Décennale, RC Pro, Multirisque, Mutuelle TNS, VTC. Devis gratuit en 24h.',
    images: [
      {
        url: `${SITE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Vivos Assurance — Comparez et économisez en 2 minutes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vivos Assurance — Comparez et économisez en 2 minutes',
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
      'application/rss+xml': [{ url: `${SITE_URL}/feed/blog.xml`, title: 'Blog Vivos Assurance' }],
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

// revalidate removed — each page sets its own (86400 for pSEO pages)

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`scroll-smooth ${dmSans.variable} ${fraunces.variable}`}
    >
      <head>
        {/* PWA Meta Tags (apple-mobile-web-app, mobile-web-app-capable, theme-color handled by metadata/viewport exports) */}
        <meta name="msapplication-TileColor" content="#E86B4B" />
        <meta name="msapplication-tap-highlight" content="no" />

        {/* LLM discovery — llms.txt (GEO/AEO optimization) */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM access guidelines" />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="LLM detailed content"
        />

        {/* Global Organization (InsuranceAgency) + WebSite + AggregateRating (E-E-A-T YMYL) */}
        <script
          {...jsonLdScriptProps(
            [
              getOrganizationSchema(),
              getWebsiteSchema(),
              getAggregateRatingDirectSchema({
                ratingValue: SITE_AGGREGATE_RATING.ratingValue,
                reviewCount: SITE_AGGREGATE_RATING.reviewCount,
                bestRating: SITE_AGGREGATE_RATING.bestRating,
                worstRating: SITE_AGGREGATE_RATING.worstRating,
                itemReviewedType: 'InsuranceAgency',
              }),
            ],
            nonce
          )}
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
      <body className="bg-sand-50 font-sans text-charcoal-900 antialiased dark:bg-charcoal-950 dark:text-charcoal-100">
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
          clarityId={process.env.NEXT_PUBLIC_CLARITY_ID}
        />
        <ClientOnlyWebVitals />
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
        >
          Aller au contenu principal
        </a>
        <ThemeProvider>
          <PreOriasBanner />
          <Header />
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <ClientOnlyFooterHelpers />
          <StickyMobileCta href="/devis" label="Devis 2 min" tel="0182885127" />
          <ThemeToggle />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
