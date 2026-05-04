/**
 * Layout segment /outils/ — Auto-injection RelatedPagesSection
 *
 * Utilise headers() pour récupérer le path courant et déterminer le slug,
 * puis injecte RelatedPagesSection en bas de chaque outil.
 *
 * Bénéfice SEO : passe les 16 outils de ~6 liens internes à 15+ liens
 * → ratio site total >15/page (best practice maillage SEO 2024).
 */

import { headers } from 'next/headers'
import { RelatedPagesSection } from '@/components/seo/RelatedPagesSection'

/* Map slugs outils → cluster sémantique de référence */
const OUTIL_TO_CLUSTER_SLUG: Record<string, string> = {
  'outils/calculateur-tarif-rc-pro': 'rc-pro',
  'outils/devis-rc-pro': 'rc-pro',
  'outils/comparateur-rc-pro': 'rc-pro',
  'outils/modele-attestation-rc-pro': 'rc-pro',
  'outils/calculateur-tarif-decennale': 'assurance-decennale',
  'outils/devis-assurance-decennale': 'assurance-decennale',
  'outils/modele-attestation-decennale': 'assurance-decennale',
  'outils/calculateur-tarif-mutuelle-pro': 'mutuelle-pro-btp',
  'outils/calculateur-tarif-prevoyance-tns': 'mutuelle-pro-btp',
  'outils/comparateur-mutuelle-pro': 'mutuelle-pro-btp',
  'outils/calculateur-tarif-multirisque-pro': 'multirisque-pro',
  'outils/calculateur-tarif-cyber-assurance': 'cyber-assurance',
  'outils/calculateur-tarif-vtc': 'assurance-vtc',
  'outils/modele-facture-pro': 'multirisque-pro',
  'outils/modele-devis-pro': 'multirisque-pro',
  'outils/lettre-resiliation-assurance': 'rc-pro',
}

export default async function OutilsLayout({ children }: { children: React.ReactNode }) {
  const h = await headers()
  const pathname = h.get('x-pathname') ?? h.get('x-invoke-path') ?? h.get('referer') ?? ''
  /* Extrait le slug ex: /outils/calculateur-tarif-rc-pro → outils/calculateur-tarif-rc-pro */
  const match = pathname.match(/\/outils\/[a-z0-9-]+/)
  const slug = match ? match[0].replace(/^\//, '') : ''
  const clusterSlug = OUTIL_TO_CLUSTER_SLUG[slug] ?? 'rc-pro'

  return (
    <>
      {children}
      <RelatedPagesSection
        currentSlug={clusterSlug}
        title="Pages connexes — Maillage interne complet (15+ liens)"
      />
    </>
  )
}
