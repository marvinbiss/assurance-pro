/**
 * Template C — Tarif spécifique métier × garantie
 * Route : /tarif/[garantie]/[metier]
 * Couche : C (yield Ahrefs 75.2 vis/page — intent commercial fort)
 * KW cible : "tarif [garantie] [metier]" + "prix [garantie] [metier]"
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
  const liveSlugs = await getEligibleSlugsForTemplate('tarif', 15)
  const { PSEO_SLUGS_SNAPSHOT } = await import('@/lib/data/pseo-slugs-snapshot')
  const snapshotSlugs = PSEO_SLUGS_SNAPSHOT.tarif as readonly string[]
  const allSlugs = liveSlugs.length > 0 ? liveSlugs : snapshotSlugs
  return [...allSlugs]
    .filter((s) => s.startsWith('tarif/'))
    .map((slug) => {
      const [, garantie, metier] = slug.split('/')
      return { garantie, metier }
    })
    .filter((p) => p.garantie && p.metier)
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const slug = `tarif/${params.garantie}/${params.metier}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) return {}
  return {
    title: buildPageTitle(enrichment),
    description: buildPageDescription(enrichment),
    alternates: { canonical: buildCanonical(slug) },
    robots: { index: true, follow: true },
  }
}

export default async function TarifPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const slug = `tarif/${params.garantie}/${params.metier}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) notFound()

  return (
    <EnrichedPageLayout
      enrichment={enrichment}
      variant="tarif"
      headline={`Tarif ${enrichment.garantie_label} ${enrichment.metier_nom} en ${new Date().getFullYear()}`}
      intro={
        <>
          Fourchette de prix marché pour {enrichment.metier_nom}s, agrégation devis propriétaires +
          assureurs partenaires + ajustement sinistralité métier (AQC).
        </>
      }
    />
  )
}
