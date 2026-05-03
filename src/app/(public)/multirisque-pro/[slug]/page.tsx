import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getVille, getVilleSlugs } from '@/lib/data/villes-top100'
import { GarantieVilleTemplate } from '@/components/assurance/GarantieVilleTemplate'
import { MULTIRISQUE_PRO_CONFIG as CONFIG } from '@/lib/data/garantie-ville-configs'
import { SITE_URL } from '@/lib/seo/config'

type Params = { slug: string }

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams(): Params[] {
  return getVilleSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const v = getVille(params.slug)
  if (!v) return {}
  return {
    title: `${CONFIG.garantieLabel} ${v.nom} (${v.departementCode}) — Tarifs 2026 | Assurance Pro`,
    description: `Multirisque professionnelle pour les commerces, ESN, agences de ${v.nom}. Locaux, biens, perte d'exploitation, RC Exploitation. À partir de ${CONFIG.priceFrom}. Devis gratuit ORIAS.`,
    alternates: { canonical: `${SITE_URL}/${CONFIG.garantieSlug}/${v.slug}` },
  }
}

export default function Page({ params }: { params: Params }) {
  const ville = getVille(params.slug)
  if (!ville) notFound()
  return <GarantieVilleTemplate ville={ville} config={CONFIG} />
}
