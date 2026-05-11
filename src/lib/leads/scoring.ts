/**
 * Lead Scoring — classifier qualité des leads avant routing / revente.
 *
 * Stratégie hybride :
 *   1. Heuristic scoring (rules-based) — déterministe, explicable, audit-ready
 *   2. AI scoring optionnel (Claude/GPT) — sur cas borderline ou enrichissement
 *
 * Score 0-100 + breakdown explicable + classification tier (A/B/C/D).
 *
 * Tier × pricing typique marché assurance pro 2026 :
 *   - Tier A (80-100) : 50-100€/lead (high intent, big-ticket)
 *   - Tier B (60-79)  : 25-50€/lead   (qualifié, intent moyen)
 *   - Tier C (40-59)  : 10-25€/lead   (recherche tarif, intent faible)
 *   - Tier D (0-39)   : 0-5€/lead     (low intent, à filtrer)
 *
 * Conformité : pas de PII dans le score lui-même, seulement features dérivées.
 */

import { z } from 'zod'

// ─── Schema ──────────────────────────────────────────────────────────────────

export const LeadInputSchema = z.object({
  /** Activité déclarée (libre ou normalisée NAF) */
  activity: z.string().trim().min(1).max(200),
  /** Statut juridique : 'AE' | 'EI' | 'EURL' | 'SARL' | 'SAS' | 'SASU' | 'autre' */
  legalStatus: z.string().trim().max(50).optional(),
  /** Chiffre d'affaires annuel HT en EUR */
  annualRevenueEur: z.number().min(0).max(1_000_000_000).optional(),
  /** Garantie(s) recherchée(s) */
  garanties: z.array(z.string().min(1)).max(10).optional(),
  /** Profession réglementée ? */
  isRegulatedProfession: z.boolean().optional(),
  /** Activité BTP (décennale obligatoire) ? */
  isBtp: z.boolean().optional(),
  /** Nombre de salariés */
  employeeCount: z.number().int().min(0).max(100_000).optional(),
  /** Antécédents sinistres 3 ans (count) */
  claimsCount3y: z.number().int().min(0).max(100).optional(),
  /** Sinistre récent < 12 mois ? */
  hadRecentClaim: z.boolean().optional(),
  /** Délai souhaité contractualisation (jours) */
  urgencyDays: z.number().int().min(0).max(365).optional(),
  /** Source UTM ou referer */
  source: z.string().max(100).optional(),
  /** Page de capture */
  capturePage: z.string().max(200).optional(),
  /** Email fourni ? */
  hasEmail: z.boolean().optional(),
  /** Téléphone fourni ? */
  hasPhone: z.boolean().optional(),
  /** SIRET fourni ? */
  hasSiret: z.boolean().optional(),
})

export type LeadInput = z.infer<typeof LeadInputSchema>

export type LeadTier = 'A' | 'B' | 'C' | 'D'

export interface ScoreBreakdownItem {
  factor: string
  weight: number
  reason: string
}

export interface LeadScore {
  score: number /* 0-100 */
  tier: LeadTier
  estimatedValueEur: number /* prix de revente lead estimé */
  breakdown: ScoreBreakdownItem[]
  /** Si AI utilisée, indicateur de tier */
  enrichmentTier?: 'heuristic-only' | 'ai-enhanced'
}

// ─── Heuristic scoring (rules-based) ─────────────────────────────────────────

export function scoreLead(input: LeadInput): LeadScore {
  const breakdown: ScoreBreakdownItem[] = []
  let score = 30 // baseline (signal de présence = 30 pts)
  breakdown.push({ factor: 'baseline', weight: 30, reason: 'Lead capturé via formulaire' })

  // ── Volume d'affaires (signal le plus fort) ──────────────────────────────
  if (input.annualRevenueEur != null) {
    const ca = input.annualRevenueEur
    if (ca >= 1_000_000) {
      breakdown.push({ factor: 'revenue', weight: 20, reason: 'CA > 1M€ (SAS PME)' })
      score += 20
    } else if (ca >= 300_000) {
      breakdown.push({ factor: 'revenue', weight: 15, reason: 'CA 300k-1M€ (SARL/SAS établie)' })
      score += 15
    } else if (ca >= 100_000) {
      breakdown.push({ factor: 'revenue', weight: 10, reason: 'CA 100-300k€ (SARL/EURL active)' })
      score += 10
    } else if (ca >= 30_000) {
      breakdown.push({ factor: 'revenue', weight: 5, reason: 'CA 30-100k€ (AE/EURL débutant)' })
      score += 5
    } else {
      breakdown.push({ factor: 'revenue', weight: 0, reason: 'CA < 30k€ (low ticket)' })
    }
  }

  // ── Statut juridique (proxy LTV) ─────────────────────────────────────────
  const legal = input.legalStatus?.toLowerCase() ?? ''
  if (legal.includes('sas') && !legal.includes('sasu')) {
    breakdown.push({ factor: 'legalStatus', weight: 10, reason: 'SAS multi-associés (big ticket)' })
    score += 10
  } else if (legal.includes('sarl') && !legal.includes('eurl')) {
    breakdown.push({ factor: 'legalStatus', weight: 8, reason: 'SARL multi-associés' })
    score += 8
  } else if (legal.includes('sasu') || legal.includes('eurl')) {
    breakdown.push({ factor: 'legalStatus', weight: 5, reason: 'SASU/EURL (small business)' })
    score += 5
  } else if (legal.includes('ae') || legal.includes('micro')) {
    breakdown.push({
      factor: 'legalStatus',
      weight: 2,
      reason: 'AE / micro-entreprise (low ticket)',
    })
    score += 2
  }

  // ── BTP (décennale obligatoire, prime élevée) ────────────────────────────
  if (input.isBtp) {
    breakdown.push({
      factor: 'btp',
      weight: 15,
      reason: 'BTP — décennale obligatoire (high value)',
    })
    score += 15
  }

  // ── Profession réglementée ──────────────────────────────────────────────
  if (input.isRegulatedProfession) {
    breakdown.push({
      factor: 'regulated',
      weight: 10,
      reason: 'Profession réglementée (RC Pro obligatoire)',
    })
    score += 10
  }

  // ── Nombre salariés ──────────────────────────────────────────────────────
  if (input.employeeCount != null && input.employeeCount > 0) {
    if (input.employeeCount >= 20) {
      breakdown.push({ factor: 'employees', weight: 12, reason: '20+ salariés (PME)' })
      score += 12
    } else if (input.employeeCount >= 5) {
      breakdown.push({ factor: 'employees', weight: 6, reason: '5-19 salariés (TPE/PME)' })
      score += 6
    }
  }

  // ── Plusieurs garanties = up-sell potential ─────────────────────────────
  if (input.garanties && input.garanties.length >= 2) {
    breakdown.push({
      factor: 'garanties',
      weight: 8,
      reason: `${input.garanties.length} garanties — multi-contrat`,
    })
    score += 8
  }

  // ── Urgence (intent commercial) ──────────────────────────────────────────
  if (input.urgencyDays != null) {
    if (input.urgencyDays <= 7) {
      breakdown.push({ factor: 'urgency', weight: 10, reason: 'Urgent < 7 jours (intent fort)' })
      score += 10
    } else if (input.urgencyDays <= 30) {
      breakdown.push({ factor: 'urgency', weight: 5, reason: 'Délai < 1 mois' })
      score += 5
    }
  }

  // ── Coordonnées complètes (qualifié) ─────────────────────────────────────
  let contactCompleteness = 0
  if (input.hasEmail) contactCompleteness += 3
  if (input.hasPhone) contactCompleteness += 4
  if (input.hasSiret) contactCompleteness += 5
  if (contactCompleteness > 0) {
    breakdown.push({
      factor: 'contactCompleteness',
      weight: contactCompleteness,
      reason: `Coordonnées : ${input.hasEmail ? 'email ' : ''}${input.hasPhone ? 'tel ' : ''}${input.hasSiret ? 'SIRET' : ''}`,
    })
    score += contactCompleteness
  }

  // ── Source — fort signal pour les payants ────────────────────────────────
  const source = input.source?.toLowerCase() ?? ''
  if (source.includes('google') && !source.includes('organic')) {
    breakdown.push({ factor: 'source', weight: 5, reason: 'Google Ads (intent commercial)' })
    score += 5
  } else if (source.includes('linkedin')) {
    breakdown.push({ factor: 'source', weight: 3, reason: 'LinkedIn (B2B)' })
    score += 3
  }

  // ── Penalty : sinistre récent ────────────────────────────────────────────
  if (input.hadRecentClaim) {
    breakdown.push({
      factor: 'recentClaim',
      weight: -10,
      reason: 'Sinistre < 12 mois (placement difficile)',
    })
    score -= 10
  }
  if (input.claimsCount3y != null && input.claimsCount3y >= 3) {
    breakdown.push({
      factor: 'claimsHistory',
      weight: -8,
      reason: `${input.claimsCount3y} sinistres 3 ans (haute sinistralité)`,
    })
    score -= 8
  }

  // ── Penalty : info manquante (lead pauvre) ──────────────────────────────
  if (!input.hasEmail && !input.hasPhone) {
    breakdown.push({ factor: 'incomplete', weight: -15, reason: 'Aucune coordonnée fournie' })
    score -= 15
  }

  // Bounded
  score = Math.max(0, Math.min(100, score))

  const tier: LeadTier = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D'
  const estimatedValueEur = tier === 'A' ? 80 : tier === 'B' ? 35 : tier === 'C' ? 15 : 3

  return {
    score,
    tier,
    estimatedValueEur,
    breakdown,
    enrichmentTier: 'heuristic-only',
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Classifie un lead en tier sans le scorer complètement.
 */
export function classifyTier(score: number): LeadTier {
  if (score >= 80) return 'A'
  if (score >= 60) return 'B'
  if (score >= 40) return 'C'
  return 'D'
}

/**
 * Suggère le routing pour un tier donné.
 */
export function suggestRouting(tier: LeadTier): {
  channel: 'phone-priority' | 'email-fast' | 'email-batch' | 'archive'
  slaHours: number
  recommendation: string
} {
  switch (tier) {
    case 'A':
      return {
        channel: 'phone-priority',
        slaHours: 2,
        recommendation: 'Appel téléphonique sous 2h ouvrées. Allouer expert sénior.',
      }
    case 'B':
      return {
        channel: 'email-fast',
        slaHours: 24,
        recommendation: 'Email personnalisé sous 24h. Suivi téléphonique sous 48h.',
      }
    case 'C':
      return {
        channel: 'email-batch',
        slaHours: 72,
        recommendation: 'Email batch sous 72h. Pas de relance téléphonique.',
      }
    case 'D':
      return {
        channel: 'archive',
        slaHours: 0,
        recommendation: 'Archiver. Re-cibler via remarketing si signal commercial futur.',
      }
  }
}
