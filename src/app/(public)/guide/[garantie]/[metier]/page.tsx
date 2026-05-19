/**
 * Template D — Guide juridique profond
 * Route : /guide/[garantie]/[metier]
 * Couche : D (yield Ahrefs 56.7 vis/page — content middle-funnel info-seeker)
 * KW cible : "guide [garantie] [metier]" + "comment [garantie] [metier]"
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
  const liveSlugs = await getEligibleSlugsForTemplate('guide_metier_ville', 15)
  const { PSEO_SLUGS_SNAPSHOT } = await import('@/lib/data/pseo-slugs-snapshot')
  const snapshotSlugs = PSEO_SLUGS_SNAPSHOT.guide_metier_ville as readonly string[]
  const allSlugs = liveSlugs.length > 0 ? liveSlugs : snapshotSlugs
  return [...allSlugs]
    .filter((s) => s.startsWith('guide/'))
    .map((slug) => {
      const [, garantie, metier] = slug.split('/')
      return { garantie, metier }
    })
    .filter((p) => p.garantie && p.metier)
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const slug = `guide/${params.garantie}/${params.metier}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) return {}
  return {
    title: buildPageTitle(enrichment),
    description: buildPageDescription(enrichment),
    alternates: { canonical: buildCanonical(slug) },
    robots: { index: true, follow: true },
  }
}

export default async function GuidePage(props: { params: Promise<Params> }) {
  const params = await props.params
  const slug = `guide/${params.garantie}/${params.metier}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) notFound()

  const metier = enrichment.metier_nom ?? 'professionnel'
  const garantie = enrichment.garantie_label ?? 'votre activité'
  const sinPct = enrichment.sinistralite_pct
  const tarifMed = enrichment.prix_med_eur

  // Intro unique par métier × garantie (anti-HCU duplicate)
  const intro = (
    <>
      Guide complet 2026 de la <strong>{garantie}</strong> pour le métier de{' '}
      <strong>{metier}</strong>. Cadre légal applicable, obligations spécifiques, sinistralité
      observée
      {sinPct ? ` (${sinPct}% selon l'AQC SYCODÉS)` : ''}
      {tarifMed ? `, tarif médian observé ${tarifMed.toLocaleString('fr-FR')}€/an` : ''}, garanties
      recommandées et exclusions à connaître. Sources : Légifrance, AQC SYCODÉS, FFA/FFB, retours
      terrain de notre cabinet ORIAS.
    </>
  )

  return (
    <EnrichedPageLayout
      enrichment={enrichment}
      variant="guide"
      headline={`Guide ${garantie} ${metier} 2026 — Cadre légal, tarifs, exclusions`}
      intro={intro}
    />
  )
}
