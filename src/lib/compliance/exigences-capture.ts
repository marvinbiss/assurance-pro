/**
 * Capture initiale des exigences/besoins (étape 1 DDA)
 *
 * Ce module enregistre les exigences déclarées par le prospect au moment du
 * formulaire devis, avant que le courtier formule sa recommandation.
 * Ce snapshot, hashé en SHA-256, sera repris ensuite pour l'enregistrement
 * complet du conseil DDA art. L. 521-4 dans `public.conseil_records`
 * (recommandation ACPR 2024-R-03).
 */

import { createHash } from 'node:crypto'

export interface ExigencesSnapshot {
  vertical: string
  metier_code: string
  garantie_code: string
  statut_juridique: string
  tranche_ca: string
  anciennete_annees: number
  sinistralite_36m: number
  sous_traitance: boolean
  garanties_demandees: string[]
  postal_code?: string
  ville?: string
  collected_at: string
}

export function buildExigencesSnapshot(
  raw: Omit<ExigencesSnapshot, 'collected_at'>
): ExigencesSnapshot {
  return { ...raw, collected_at: new Date().toISOString() }
}

export function hashExigences(snapshot: ExigencesSnapshot): string {
  const stable = JSON.stringify(snapshot, Object.keys(snapshot).sort())
  return createHash('sha256').update(stable).digest('hex')
}

/**
 * Dérive les besoins légalement applicables au prospect (art. L. 521-4-I).
 * Cette logique est auditable et documentée (point critique pour ACPR 2024-R-03).
 */
export function deriveLegalRequirements(s: ExigencesSnapshot): string[] {
  const out: string[] = []
  if (s.vertical === 'BTP') {
    out.push('decennale_loi_spinetta_art_L241-1')
    out.push('rc_pro_recommandee')
    if (s.statut_juridique !== 'auto_entrepreneur') out.push('multirisque_pro_recommandee')
  }
  if (s.vertical === 'VTC_TAXI') {
    out.push('rc_circulation_obligatoire_art_L211-1')
    out.push('inscription_evtc_obligatoire')
  }
  if (s.vertical === 'SANTE_MEDICAL') {
    out.push('rc_medicale_loi_kouchner_art_L1142-2')
  }
  if (s.vertical === 'AVOCATS_JURIDIQUE') {
    out.push('rc_pro_avocat_obligatoire_art_27_loi_71-1130')
  }
  if (
    ['250_500k', 'gt_500k'].includes(s.tranche_ca) ||
    s.garanties_demandees.includes('cyber')
  ) {
    out.push('cyber_recommandee_taille_pme')
  }
  return out
}
