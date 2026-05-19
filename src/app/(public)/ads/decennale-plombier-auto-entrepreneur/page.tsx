import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo/config'
import { LandingAdsClient } from './LandingAdsClient'

export const metadata: Metadata = {
  title: 'Décennale plombier auto-entrepreneur — Tarif négocié 950€/an (au lieu de 1 800€)',
  description:
    'Économisez 47% sur votre décennale plombier auto-entrepreneur. Comparatif 10 assureurs (April Pro, Hiscox, SMABTP). Attestation 24h, Loi Spinetta conforme. Devis gratuit.',
  alternates: {
    canonical: `${SITE_URL}/ads/decennale-plombier-auto-entrepreneur`,
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Décennale plombier AE — 950€/an au lieu de 1 800€',
    description:
      "Tarif négocié pour plombiers auto-entrepreneurs. 47% d'économie validée par 3 247 artisans.",
    url: `${SITE_URL}/ads/decennale-plombier-auto-entrepreneur`,
    type: 'website',
    images: [
      { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Vivos Assurance' },
    ],
  },
}

const FACTUAL_CLAIMS = {
  tarifAE: '950€/an',
  tarifMarche: '1 800€/an',
  economieAnnuelle: '850€',
  pourcentEconomie: '47%',
  delaiAttestation: '24h',
  artisanAssures: '3 247',
  notation: '4,9/5',
  reviewsCount: '142',
  sinistralitePlombier: '18%',
  sourceAQC: 'AQC SYCODÉS 2026',
}

export default function LandingAdsPage() {
  return <LandingAdsClient claims={FACTUAL_CLAIMS} />
}
