import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getVille, getVilleSlugs } from '@/lib/data/villes-top100'
import { GarantieVilleTemplate } from '@/components/assurance/GarantieVilleTemplate'
import { CYBER_ASSURANCE_CONFIG as CONFIG } from '@/lib/data/garantie-ville-configs'
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
    title: `Cyber assurance ${v.nom} (${v.departementCode}) — TPE/PME RGPD | Assurance Pro`,
    description: `Cyber assurance pour les TPE/PME de ${v.nom}. Couverture rançongiciels, fuite de données, sanctions CNIL, perte d'exploitation. À partir de ${CONFIG.priceFrom}. Devis gratuit ORIAS.`,
    alternates: { canonical: `${SITE_URL}/${CONFIG.garantieSlug}/${v.slug}` },
  }
}

export default function Page({ params }: { params: Params }) {
  const ville = getVille(params.slug)
  if (!ville) notFound()
  return <GarantieVilleTemplate ville={ville} config={CONFIG} />
}
