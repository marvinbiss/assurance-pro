/**
 * Template C — Devis spécifique (MONEY KW — CPC 500-1300€)
 * Route : /devis/[garantie]/[metier]
 * Couche : C (yield Ahrefs 75.2 vis/page + conversion ×3 vs autres pages)
 * KW cible : "devis [garantie]" + "devis [garantie] [metier]" + "demande devis [garantie]"
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getPageEnrichment,
  getEligibleSlugsForTemplate,
  buildPageTitle,
  buildPageDescription,
  buildCanonical,
} from '@/lib/programmatic/page-enrichment'
import { EnrichedPageLayout } from '@/components/programmatic/EnrichedPageLayout'

export const dynamicParams = false
export const revalidate = 86400

type Params = { garantie: string; metier: string }

export async function generateStaticParams() {
  const slugs = await getEligibleSlugsForTemplate('prix_garantie_ville_statut', 15)
  return slugs
    .filter((s) => s.startsWith('devis/'))
    .map((slug) => {
      const [, garantie, metier] = slug.split('/')
      return { garantie, metier }
    })
    .filter((p) => p.garantie && p.metier)
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const slug = `devis/${params.garantie}/${params.metier}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) return {}
  return {
    title: buildPageTitle(enrichment),
    description: buildPageDescription(enrichment),
    alternates: { canonical: buildCanonical(slug) },
    robots: { index: true, follow: true },
  }
}

export default async function DevisPage({ params }: { params: Params }) {
  const slug = `devis/${params.garantie}/${params.metier}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) notFound()

  return (
    <EnrichedPageLayout
      enrichment={enrichment}
      variant="devis"
      headline={`Devis ${enrichment.garantie_label} ${enrichment.metier_nom} — Gratuit en 24h`}
      intro={
        <>
          Recevez gratuitement une comparaison personnalisée pour votre activité de{' '}
          {enrichment.metier_nom}, basée sur tarifs marché propriétaires + solidité Pappers + avis
          vérifiés Trustpilot ISO 20488.
        </>
      }
    />
  )
}
