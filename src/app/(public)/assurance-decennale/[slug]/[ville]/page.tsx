/**
 * Page nested /assurance-decennale/[slug]/[ville]
 * Phase 3 — pSEO long-tail : 37 métiers × 100 villes = ~3 700 pages combinées.
 * Chaque page combine la fiche métier (sinistralité, tarifs, risques) + la fiche
 * ville (zonage, marché local, climat). Tarifs ajustés par zone (×0.95 → ×1.15).
 *
 * Note : le folder est nommé [slug] (et non [metier]) pour coexister avec
 * /assurance-decennale/[slug] sans violer la contrainte Next.js « même nom de
 * paramètre par segment ». Sémantiquement params.slug = métier.
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DECENNALE_METIERS, getMetier, getMetierSlugs } from '@/lib/data/decennale-metiers'
import { getVille, getVilleSlugs, VILLES_TOP100 } from '@/lib/data/villes-top100'
import { DecennaleMetierVilleTemplate } from '@/components/assurance/DecennaleMetierVilleTemplate'
import { SITE_URL } from '@/lib/seo/config'

type Params = { slug: string; ville: string }

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams(): Params[] {
  const metierSlugs = getMetierSlugs()
  const villeSlugs = getVilleSlugs()
  const params: Params[] = []
  for (const slug of metierSlugs) {
    for (const ville of villeSlugs) {
      params.push({ slug, ville })
    }
  }
  return params
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const metier = getMetier(params.slug)
  const ville = getVille(params.ville)
  if (!metier || !ville) return {}

  const aeMin = metier.tarifs.auto_entrepreneur.min
  return {
    title: `Assurance décennale ${metier.name.toLowerCase()} ${ville.nom} (${ville.departementCode}) — Tarifs ${aeMin}€ | Assurance Pro`,
    description: `Décennale ${metier.name.toLowerCase()} à ${ville.nom} : tarifs négociés à partir de ${aeMin}€/an. Sinistralité métier ${metier.sinistraliteAqc}%, zone ${ville.zonageRisque.replace(/_/g, ' ')}. Devis gratuit ORIAS sous 24h.`,
    alternates: {
      canonical: `${SITE_URL}/assurance-decennale/${metier.slug}/${ville.slug}`,
    },
    openGraph: {
      title: `Décennale ${metier.name} ${ville.nom} — Tarifs ${aeMin}€/an`,
      description: `Garantie décennale ${metier.name.toLowerCase()} à ${ville.nom}. ${ville.artisansBtpEstime.toLocaleString('fr-FR')} artisans BTP locaux. Conseil ORIAS, attestation 24h.`,
      url: `${SITE_URL}/assurance-decennale/${metier.slug}/${ville.slug}`,
      type: 'website',
    },
  }
}

export default function Page({ params }: { params: Params }) {
  const metier = getMetier(params.slug)
  const ville = getVille(params.ville)
  if (!metier || !ville) notFound()
  return <DecennaleMetierVilleTemplate metier={metier} ville={ville} />
}

// Export utilisé par sitemap / link graph internes.
export const NESTED_DECENNALE_PAGE_COUNT =
  Object.keys(DECENNALE_METIERS).length * VILLES_TOP100.length
