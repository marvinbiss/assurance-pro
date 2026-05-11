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
  const slugs = await getEligibleSlugsForTemplate('guide_metier_ville', 15)
  return slugs
    .filter((s) => s.startsWith('guide/'))
    .map((slug) => {
      const [, garantie, metier] = slug.split('/')
      return { garantie, metier }
    })
    .filter((p) => p.garantie && p.metier)
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
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

export default async function GuidePage({ params }: { params: Params }) {
  const slug = `guide/${params.garantie}/${params.metier}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) notFound()

  return (
    <EnrichedPageLayout
      enrichment={enrichment}
      variant="guide"
      headline={`Guide ${enrichment.garantie_label} pour ${enrichment.metier_nom}`}
      intro={
        <>
          Cadre légal, garanties recommandées, exclusions et bonnes pratiques pour les{' '}
          {enrichment.metier_nom}s, avec références jurisprudence Légifrance et stats sinistralité
          AQC SYCODÉS.
        </>
      }
    />
  )
}
