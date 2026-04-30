/**
 * SCORING DES LEADS — segmentation HOT / WARM / COLD
 * Basé sur 8 facteurs : métier, CA, statut, ancienneté, sinistralité,
 * garanties, comportement, SIRET vérifié.
 *
 * Source : KPMG-1 modélisation financière
 * Cible conversion :
 *   - HOT (70-100) : appel direct < 30 min ouvrées
 *   - WARM (45-69) : email + appel J+1 < 2h ouvrées
 *   - COLD (0-44)  : email + séquence nurturing 60j
 */

type StatutJuridique = 'auto_entrepreneur' | 'ei' | 'eurl' | 'sarl' | 'sasu' | 'sas' | 'profession_liberale'
type CaRange = 'lt_50k' | '50_100k' | '100_250k' | '250_500k' | 'gt_500k'

export interface LeadScoringInput {
  metier_code: string
  ca_range: CaRange
  statut_juridique: StatutJuridique
  anciennete_annees: number
  sinistralite_36m: number
  garanties_demandees: string[]
  source_page_id?: string
  source_metier?: string
  source_ville?: string
  time_on_site_sec: number
  pages_viewed: number
  form_completed_one_shot: boolean
  has_siret: boolean
}

export interface LeadScoringResult {
  score: number
  segment: 'hot' | 'warm' | 'cold'
  breakdown: Record<string, number>
  routing_priority: 'p1_phone_30min' | 'p2_email_2h' | 'p3_nurturing_60d'
}

// Score par métier (panier × marge × probabilité conversion)
const METIER_VALUE: Record<string, number> = {
  // BTP haut panier
  macon: 18,
  charpentier_bois: 17,
  couvreur_zingueur: 17,
  etancheur: 18,
  facadier_ite: 16,
  pisciniste: 15,

  // BTP moyen
  plombier: 14,
  electricien: 14,
  menuisier_exterieur: 13,
  carreleur: 12,
  plaquiste_platrier: 11,
  peintre: 10,

  // VTC / Médical / Avocat (fort intent + panier)
  vtc: 14,
  taxi: 13,
  avocat: 18,
  medecin_specialiste: 20,
  medecin_generaliste: 16,
  expert_comptable: 17,
  notaire: 19,

  // Autres
  paysagiste: 9,
  consultant: 11,
  multi_services_btp: 7,
}

const CA_SCORE: Record<CaRange, number> = {
  lt_50k: 4,
  '50_100k': 8,
  '100_250k': 14,
  '250_500k': 18,
  gt_500k: 20,
}

const STATUT_SCORE: Record<StatutJuridique, number> = {
  auto_entrepreneur: 4,
  ei: 7,
  eurl: 10,
  sarl: 14,
  sasu: 12,
  sas: 14,
  profession_liberale: 11,
}

export function scoreLead(input: LeadScoringInput): LeadScoringResult {
  const breakdown: Record<string, number> = {}

  // 1. Métier (max 18-20)
  breakdown.metier = METIER_VALUE[input.metier_code] ?? 8

  // 2. CA (max 20)
  breakdown.ca = CA_SCORE[input.ca_range] ?? 4

  // 3. Statut (max 14)
  breakdown.statut = STATUT_SCORE[input.statut_juridique] ?? 5

  // 4. Ancienneté (sweet spot 3-10 ans, max 12)
  if (input.anciennete_annees >= 3 && input.anciennete_annees <= 10) breakdown.anciennete = 12
  else if (input.anciennete_annees > 10) breakdown.anciennete = 9
  else if (input.anciennete_annees >= 1) breakdown.anciennete = 7
  else breakdown.anciennete = 3

  // 5. Sinistralité (max +10, min -5)
  if (input.sinistralite_36m === 0) breakdown.sinistralite = 10
  else if (input.sinistralite_36m === 1) breakdown.sinistralite = 4
  else breakdown.sinistralite = -5

  // 6. Multi-garanties (cross-sell potentiel, max 10)
  breakdown.garanties = Math.min(input.garanties_demandees.length * 3, 10)

  // 7. Comportement web (max 12)
  let behavior = 0
  if (input.time_on_site_sec > 120) behavior += 4
  if (input.pages_viewed >= 3) behavior += 4
  if (input.form_completed_one_shot) behavior += 4
  breakdown.behavior = behavior

  // 8. SIRET fourni (intention forte, max 4)
  breakdown.siret = input.has_siret ? 4 : 0

  // Total clampé 0-100
  const rawScore = Object.values(breakdown).reduce((a, b) => a + b, 0)
  const score = Math.max(0, Math.min(100, Math.round(rawScore)))

  let segment: 'hot' | 'warm' | 'cold'
  let routing_priority: LeadScoringResult['routing_priority']
  if (score >= 70) {
    segment = 'hot'
    routing_priority = 'p1_phone_30min'
  } else if (score >= 45) {
    segment = 'warm'
    routing_priority = 'p2_email_2h'
  } else {
    segment = 'cold'
    routing_priority = 'p3_nurturing_60d'
  }

  return { score, segment, breakdown, routing_priority }
}

/**
 * Helper : devis attendu par segment
 */
export function expectedConversionRate(segment: 'hot' | 'warm' | 'cold'): number {
  return { hot: 0.45, warm: 0.22, cold: 0.07 }[segment]
}
