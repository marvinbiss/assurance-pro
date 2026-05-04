/**
 * Layout segment /outils/ — Auto-injection CRO + SEO sur les 16 outils
 *
 * Injecte automatiquement (post-children) :
 * - TrustBadges (compact, post-children)
 * - RelatedPagesSection (15+ liens contextuels)
 * - StickyConversionBar (CTA persistante post-scroll, variante par cluster)
 *
 * Pourquoi un layout : évite d'éditer 16 pages individuellement et garantit
 * la couverture CRO/SEO sur tous les nouveaux outils ajoutés ultérieurement.
 */

import { headers } from 'next/headers'
import { RelatedPagesSection } from '@/components/seo/RelatedPagesSection'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { TrustBadges } from '@/components/cro/TrustBadges'

interface OutilConfig {
  cluster: string
  ctaText: string
  ctaUrl: string
  variant: 'blue' | 'orange' | 'emerald' | 'violet' | 'amber' | 'slate'
  trustSignal: string
}

const OUTIL_CONFIGS: Record<string, OutilConfig> = {
  /* Calculateurs (déjà avec StickyCTA inline mais double-CTA acceptable car contextuel) */
  'outils/calculateur-tarif-rc-pro': {
    cluster: 'rc-pro',
    ctaText: '→ Devis RC Pro 24h',
    ctaUrl: '/outils/devis-rc-pro',
    variant: 'blue',
    trustSignal: '8 assureurs comparés • Devis ORIAS sous 24h',
  },
  'outils/calculateur-tarif-decennale': {
    cluster: 'assurance-decennale',
    ctaText: '→ Devis décennale 24h',
    ctaUrl: '/outils/devis-assurance-decennale',
    variant: 'orange',
    trustSignal: '8 assureurs BTP • Attestation 24h • ORIAS',
  },
  'outils/calculateur-tarif-mutuelle-pro': {
    cluster: 'mutuelle-pro-btp',
    ctaText: '→ Comparer 8 mutuelles 24h',
    ctaUrl: '/outils/comparateur-mutuelle-pro',
    variant: 'emerald',
    trustSignal: 'Loi ANI calculée • TNS Madelin déductible',
  },
  'outils/calculateur-tarif-vtc': {
    cluster: 'assurance-vtc',
    ctaText: '→ Devis VTC 24h',
    ctaUrl: '/outils/devis-rc-pro?secteur=transport-vtc',
    variant: 'violet',
    trustSignal: '6 assureurs VTC spécialisés • Loi LOTI',
  },
  'outils/calculateur-tarif-multirisque-pro': {
    cluster: 'multirisque-pro',
    ctaText: '→ Devis multirisque 24h',
    ctaUrl: '/outils/devis-rc-pro?secteur=multirisque',
    variant: 'orange',
    trustSignal: '7 assureurs comparés • Tarif négocié -10-25%',
  },
  'outils/calculateur-tarif-cyber-assurance': {
    cluster: 'cyber-assurance',
    ctaText: '→ Devis cyber 24h',
    ctaUrl: '/outils/devis-rc-pro?secteur=cyber',
    variant: 'slate',
    trustSignal: '6 assureurs cyber • RGPD + ANSSI',
  },
  'outils/calculateur-tarif-prevoyance-tns': {
    cluster: 'mutuelle-pro-btp',
    ctaText: '→ Devis prévoyance TNS',
    ctaUrl: '/outils/devis-rc-pro?secteur=prevoyance-tns',
    variant: 'amber',
    trustSignal: '7 assureurs • Loi Madelin déductible',
  },
  'outils/comparateur-rc-pro': {
    cluster: 'rc-pro',
    ctaText: '→ 3 devis personnalisés 24h',
    ctaUrl: '/outils/devis-rc-pro',
    variant: 'blue',
    trustSignal: '8 assureurs analysés • Devoir conseil ACPR',
  },
  /* Forms ORIAS (lead capture direct) */
  'outils/devis-rc-pro': {
    cluster: 'rc-pro',
    ctaText: '→ Calculateur tarif RC Pro',
    ctaUrl: '/outils/calculateur-tarif-rc-pro',
    variant: 'blue',
    trustSignal: 'Cabinet ORIAS • 8 assureurs partenaires',
  },
  'outils/devis-assurance-decennale': {
    cluster: 'assurance-decennale',
    ctaText: '→ Calculateur décennale',
    ctaUrl: '/outils/calculateur-tarif-decennale',
    variant: 'orange',
    trustSignal: 'Cabinet ORIAS BTP • Loi Spinetta',
  },
  'outils/comparateur-mutuelle-pro': {
    cluster: 'mutuelle-pro-btp',
    ctaText: '→ Calculateur mutuelle pro',
    ctaUrl: '/outils/calculateur-tarif-mutuelle-pro',
    variant: 'emerald',
    trustSignal: 'Loi ANI + Madelin • Cabinet ORIAS',
  },
  /* PDF generators */
  'outils/modele-attestation-decennale': {
    cluster: 'assurance-decennale',
    ctaText: '→ Vraie attestation 24h',
    ctaUrl: '/outils/devis-assurance-decennale',
    variant: 'orange',
    trustSignal: 'Modèle pédagogique • Vraie attestation = devis',
  },
  'outils/modele-attestation-rc-pro': {
    cluster: 'rc-pro',
    ctaText: '→ Vraie attestation RC Pro',
    ctaUrl: '/outils/devis-rc-pro',
    variant: 'blue',
    trustSignal: 'Modèle pédagogique • Cabinet ORIAS pour vraie attestation',
  },
  'outils/modele-facture-pro': {
    cluster: 'rc-pro',
    ctaText: '→ Devis RC Pro mention obligatoire',
    ctaUrl: '/outils/devis-rc-pro',
    variant: 'blue',
    trustSignal: 'PDF gratuit • Mentions L. 441-9 + assurance pro',
  },
  'outils/modele-devis-pro': {
    cluster: 'rc-pro',
    ctaText: '→ Devis RC Pro mention obligatoire',
    ctaUrl: '/outils/devis-rc-pro',
    variant: 'blue',
    trustSignal: 'PDF gratuit • Conformité art. L. 111-1 C. conso',
  },
  'outils/lettre-resiliation-assurance': {
    cluster: 'rc-pro',
    ctaText: '→ Devis nouveau contrat',
    ctaUrl: '/outils/devis-rc-pro',
    variant: 'blue',
    trustSignal: 'Loi Hamon • Cabinet ORIAS pour remplacer',
  },
}

const DEFAULT_CONFIG: OutilConfig = {
  cluster: 'rc-pro',
  ctaText: '→ Recevoir mon devis 24h',
  ctaUrl: '/outils/devis-rc-pro',
  variant: 'blue',
  trustSignal: '8 assureurs comparés • Cabinet ORIAS',
}

export default async function OutilsLayout({ children }: { children: React.ReactNode }) {
  const h = await headers()
  const pathname = h.get('x-pathname') ?? h.get('x-invoke-path') ?? h.get('referer') ?? ''
  const match = pathname.match(/\/outils\/[a-z0-9-]+/)
  const slug = match ? match[0].replace(/^\//, '') : ''
  const config = OUTIL_CONFIGS[slug] ?? DEFAULT_CONFIG

  return (
    <>
      {children}

      <TrustBadges variant="default" />

      <RelatedPagesSection
        currentSlug={config.cluster}
        title="Pages connexes — Maillage interne complet (15+ liens)"
      />

      <StickyConversionBar
        ctaText={config.ctaText}
        ctaUrl={config.ctaUrl}
        trustSignal={config.trustSignal}
        variant={config.variant}
      />
    </>
  )
}
