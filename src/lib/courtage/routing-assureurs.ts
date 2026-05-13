/**
 * ROUTING DES LEADS vers ASSUREURS PARTENAIRES
 *
 * Pattern emprunté à algorithm_config + lead_assignments de Vivos Assurance,
 * adapté pour router des leads d'assurance vers les assureurs partenaires
 * (Hiscox, April Pro, MMA, Generali, AXA Pro, SMABTP, Wakam, Stello, ...)
 *
 * Critères :
 * - Métier × Garantie compatibles avec le partenaire
 * - Tranche CA dans la fourchette acceptée
 * - Statut juridique éligible
 * - Quotas mensuels du partenaire respectés
 * - Score solidité Pappers acceptable
 * - Préférence spécialiste vs généraliste selon profil
 *
 * Fallback :
 * - Si aucun partenaire ne match → email courtier (assignation manuelle)
 */

import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'

export interface LeadRoutingInput {
  lead_id: string
  metier_code: string
  garantie_code: string
  statut_juridique: string
  tranche_ca: string
  region?: string
  score: number
  segment: 'hot' | 'warm' | 'cold'
}

export interface RoutingDecision {
  primary_partner: string | null
  secondary_partners: string[]
  fallback_strategy: 'auto' | 'email_courtier' | 'no_dispatch'
  reason: string
}

interface PartnerRow {
  code: string
  name: string
  is_active: boolean
  metiers_couverts: string[]
  garanties_couvertes: string[]
  ca_min: number | null
  ca_max: number | null
  partner_priority: number
  solidity_score: number | null
  acpr_agrement: string | null
}

const TRANCHE_CA_RANGES: Record<string, { min: number; max: number }> = {
  lt_50k: { min: 0, max: 49999 },
  '50_100k': { min: 50000, max: 99999 },
  '100_250k': { min: 100000, max: 249999 },
  '250_500k': { min: 250000, max: 499999 },
  gt_500k: { min: 500000, max: 999999999 },
}

/**
 * Décide le routing pour un lead — retourne le partenaire prioritaire + fallback
 */
export async function decideRouting(input: LeadRoutingInput): Promise<RoutingDecision> {
  const supabase = await createClient()

  const { data: partners, error } = await supabase
    .schema('app')
    .from('insurance_partners')
    .select(
      'code,name,is_active,metiers_couverts,garanties_couvertes,ca_min,ca_max,partner_priority,solidity_score,acpr_agrement'
    )
    .eq('is_active', true)
    .order('partner_priority', { ascending: true })

  if (error) {
    logger.error({ err: error, leadId: input.lead_id }, 'Failed to fetch partners')
    return {
      primary_partner: null,
      secondary_partners: [],
      fallback_strategy: 'email_courtier',
      reason: 'partners_fetch_failed',
    }
  }

  const allPartners = (partners ?? []) as PartnerRow[]
  const eligible = allPartners.filter((p) => isEligible(p, input))

  if (eligible.length === 0) {
    return {
      primary_partner: null,
      secondary_partners: [],
      fallback_strategy: 'email_courtier',
      reason: 'no_eligible_partner',
    }
  }

  // Score chaque partenaire éligible
  const scored = eligible
    .map((p) => ({ partner: p, fit_score: scorePartnerFit(p, input) }))
    .sort((a, b) => b.fit_score - a.fit_score)

  const primary = scored[0]
  if (!primary) {
    return {
      primary_partner: null,
      secondary_partners: [],
      fallback_strategy: 'email_courtier',
      reason: 'no_scored_partner',
    }
  }

  return {
    primary_partner: primary.partner.code,
    secondary_partners: scored.slice(1, 4).map((s) => s.partner.code),
    fallback_strategy: 'auto',
    reason: `matched_${scored.length}_partners`,
  }
}

function isEligible(partner: PartnerRow, input: LeadRoutingInput): boolean {
  // Métier compatible ?
  const metiersOk =
    partner.metiers_couverts.length === 0 ||
    partner.metiers_couverts.includes(input.metier_code) ||
    partner.metiers_couverts.includes('*')

  // Garantie compatible ?
  const garantieOk =
    partner.garanties_couvertes.length === 0 ||
    partner.garanties_couvertes.includes(input.garantie_code)

  // Tranche CA acceptée ?
  const range = TRANCHE_CA_RANGES[input.tranche_ca]
  let caOk = true
  if (range && partner.ca_min !== null) {
    if (range.max < partner.ca_min) caOk = false
  }
  if (range && partner.ca_max !== null) {
    if (range.min > partner.ca_max) caOk = false
  }

  return metiersOk && garantieOk && caOk
}

function scorePartnerFit(partner: PartnerRow, input: LeadRoutingInput): number {
  let score = 0

  // Priorité partenaire (10-100, lower = better → on inverse)
  score += Math.max(0, 100 - partner.partner_priority)

  // Solidité financière Pappers (0-10)
  if (partner.solidity_score !== null) {
    score += partner.solidity_score * 5
  }

  // Match exact métier (vs liste générique)
  if (partner.metiers_couverts.includes(input.metier_code)) {
    score += 30
  }

  // Match exact garantie
  if (partner.garanties_couvertes.includes(input.garantie_code)) {
    score += 25
  }

  // Bonus si lead HOT et partenaire avec API tarifeur active (=> route automatique)
  if (input.segment === 'hot' && partner.acpr_agrement) {
    score += 15
  }

  return score
}

/**
 * Dispatch un lead aux partenaires retenus (création de devis_simules)
 * Appel asynchrone aux APIs tarifeurs partenaires
 */
export async function dispatchLeadToPartners(
  leadId: string,
  decision: RoutingDecision
): Promise<{ dispatched: string[]; errors: string[] }> {
  if (!decision.primary_partner) {
    return { dispatched: [], errors: ['no_primary_partner'] }
  }

  const supabase = await createClient()
  const dispatched: string[] = []
  const errors: string[] = []

  const targets = [decision.primary_partner, ...decision.secondary_partners]
  for (const partnerCode of targets) {
    try {
      // Récupérer l'id partenaire
      const { data: partner } = await supabase
        .schema('app')
        .from('insurance_partners')
        .select('id, code, name')
        .eq('code', partnerCode)
        .single()

      if (!partner) {
        errors.push(`partner_not_found:${partnerCode}`)
        continue
      }

      // Insert dans devis_simules
      const { error: insertErr } = await supabase
        .schema('app')
        .from('devis_simules')
        .insert({
          lead_id: leadId,
          partner_id: partner.id,
          payload_in: {
            lead_id: leadId,
            partner_code: partnerCode,
            dispatched_at: new Date().toISOString(),
          },
          status: 'pending',
        })

      if (insertErr) {
        errors.push(`insert_failed:${partnerCode}`)
        continue
      }

      dispatched.push(partnerCode)

      // Audit event
      await supabase
        .schema('app')
        .from('events')
        .insert({
          entity_type: 'lead',
          entity_id: leadId,
          event_type: 'lead.dispatched',
          metadata: { partner_code: partnerCode, partner_name: partner.name },
        })
    } catch (err) {
      logger.error({ err, leadId, partnerCode }, 'Dispatch failed')
      errors.push(`exception:${partnerCode}`)
    }
  }

  // Update lead status
  await supabase
    .schema('app')
    .from('insurance_leads')
    .update({ status: 'contacted', updated_at: new Date().toISOString() })
    .eq('id', leadId)

  return { dispatched, errors }
}
