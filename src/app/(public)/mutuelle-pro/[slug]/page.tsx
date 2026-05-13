import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getVille, getVilleSlugs } from '@/lib/data/villes-top100'
import { GarantieVilleTemplate } from '@/components/assurance/GarantieVilleTemplate'
import { MUTUELLE_PRO_CONFIG as CONFIG } from '@/lib/data/garantie-ville-configs'
import { SITE_URL } from '@/lib/seo/config'

type Params = { slug: string }

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams(): Params[] {
  return getVilleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const v = getVille(params.slug)
  if (!v) return {}
  return {
    title: `Mutuelle TNS Madelin ${v.nom} (${v.departementCode}) — Déduction fiscale | Vivos Assurance`,
    description: `Mutuelle santé Loi Madelin pour les TNS, freelances et professions libérales de ${v.nom}. Déduction art. 154 bis CGI. À partir de ${CONFIG.priceFrom}. Devis gratuit ORIAS.`,
    alternates: { canonical: `${SITE_URL}/${CONFIG.garantieSlug}/${v.slug}` },
  }
}

export default async function Page(props: { params: Promise<Params> }) {
  const params = await props.params
  const ville = getVille(params.slug)
  if (!ville) notFound()
  return <GarantieVilleTemplate ville={ville} config={CONFIG} />
}
