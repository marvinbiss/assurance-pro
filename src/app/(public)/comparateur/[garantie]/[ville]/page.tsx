/**
 * Template C — Comparateur assureur × ville
 * Route : /comparateur/[garantie]/[ville]
 * Couche : C (yield Ahrefs 24.8 vis/page mais conversion ×3 vs autres)
 * KW cible : "comparateur [garantie] [ville]" + "meilleur [garantie] [ville]"
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

type Params = { garantie: string; ville: string }

export async function generateStaticParams() {
  const slugs = await getEligibleSlugsForTemplate('comparateur_garantie_ville', 15)
  return slugs
    .filter((s) => s.startsWith('comparateur/'))
    .map((slug) => {
      const [, garantie, ville] = slug.split('/')
      return { garantie, ville }
    })
    .filter((p) => p.garantie && p.ville)
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const slug = `comparateur/${params.garantie}/${params.ville}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) return {}
  return {
    title: buildPageTitle(enrichment),
    description: buildPageDescription(enrichment),
    alternates: { canonical: buildCanonical(slug) },
    robots: { index: true, follow: true },
  }
}

export default async function ComparateurPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const slug = `comparateur/${params.garantie}/${params.ville}`
  const enrichment = await getPageEnrichment(slug)
  if (!enrichment) notFound()

  return (
    <EnrichedPageLayout
      enrichment={enrichment}
      variant="comparateur"
      headline={`Comparateur ${enrichment.garantie_label} ${enrichment.ville_nom} ${new Date().getFullYear()}`}
      intro={
        <>
          Comparaison des {enrichment.assureurs_top3_jsonb?.length ?? 0} assureurs partenaires ORIAS
          actifs sur {enrichment.ville_nom}, avec solidité financière Pappers + avis vérifiés ISO
          20488.
        </>
      }
    />
  )
}
