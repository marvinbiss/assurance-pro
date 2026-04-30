/**
 * ACPR Recommandation 2024-R-02 — Traitement des réclamations
 * Applicable au 31/12/2025
 *
 * Obligations :
 * - Circuit dédié de réception des réclamations (email, courrier, formulaire)
 * - Accusé réception ≤ 10 jours ouvrés
 * - Réponse sur le fond ≤ 2 mois
 * - Registre des réclamations + reporting interne mensuel
 * - Information du Médiateur de l'Assurance si non résolu après 60 jours
 *
 * Sans ce dispositif → sanction ACPR (avertissement → blâme → radiation).
 */

import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'

export interface ReclamationInput {
  lead_id?: string
  client_email: string
  client_nom?: string
  client_telephone?: string
  channel: 'email' | 'courrier' | 'formulaire' | 'telephone'
  category: 'qualite_conseil' | 'tarif_erreur' | 'sinistre_traitement' | 'demarche_administrative' | 'autre'
  message: string
  urgency: 'low' | 'medium' | 'high'
  attachments?: string[]
}

export interface ReclamationStatus {
  id: string
  status: 'received' | 'acknowledged' | 'in_progress' | 'resolved' | 'escalated_mediator' | 'closed'
  received_at: string
  acknowledged_at?: string
  resolved_at?: string
  escalated_at?: string
  sla_acknowledge_deadline: string  // received_at + 10 jours ouvrés
  sla_resolve_deadline: string       // received_at + 2 mois
  sla_acknowledge_met: boolean
  sla_resolve_met: boolean
}

const ACK_SLA_BUSINESS_DAYS = 10
const RESOLVE_SLA_DAYS = 60

/**
 * Calcule la deadline en jours ouvrés (lundi-vendredi, sans jours fériés français)
 * Approximation simplifiée — ajouter calendrier jours fériés FR pour précision totale
 */
function addBusinessDays(start: Date, days: number): Date {
  const result = new Date(start)
  let added = 0
  while (added < days) {
    result.setDate(result.getDate() + 1)
    const day = result.getDay()
    if (day !== 0 && day !== 6) added++
  }
  return result
}

function addCalendarDays(start: Date, days: number): Date {
  const result = new Date(start)
  result.setDate(result.getDate() + days)
  return result
}

/**
 * Reçoit une nouvelle réclamation
 * Déclenche : enregistrement, log audit, envoi accusé réception, alerting interne
 */
export async function receiveReclamation(
  input: ReclamationInput
): Promise<{ id: string; sla_acknowledge_deadline: string; sla_resolve_deadline: string }> {
  const now = new Date()
  const ackDeadline = addBusinessDays(now, ACK_SLA_BUSINESS_DAYS)
  const resolveDeadline = addCalendarDays(now, RESOLVE_SLA_DAYS)

  const supabase = await createClient()

  // Insert dans table réclamations (à créer dans une migration future)
  // Pour l'instant on log dans audit.acpr_compliance_log
  const { data, error } = await supabase
    .schema('audit')
    .from('acpr_compliance_log')
    .insert({
      event_type: 'reclamation_received',
      reference_type: 'lead',
      reference_id: input.lead_id ?? null,
      metadata: {
        channel: input.channel,
        category: input.category,
        urgency: input.urgency,
        client_email: input.client_email,
        client_nom: input.client_nom,
        message: input.message,
        attachments: input.attachments ?? [],
      },
      sla_deadline: ackDeadline.toISOString(),
      sla_met: null,
    })
    .select('id')
    .single()

  if (error) {
    logger.error({ err: error, input }, 'Failed to record réclamation')
    throw error
  }

  logger.info(
    { reclamationId: data.id, channel: input.channel, urgency: input.urgency },
    'Réclamation received — SLA started'
  )

  return {
    id: data.id,
    sla_acknowledge_deadline: ackDeadline.toISOString(),
    sla_resolve_deadline: resolveDeadline.toISOString(),
  }
}

/**
 * Marque une réclamation comme accusée (envoi confirmation au client)
 */
export async function acknowledgeReclamation(
  reclamationId: string,
  acknowledgedBy: string
): Promise<{ slaMet: boolean }> {
  const supabase = await createClient()
  const now = new Date()

  // Récupérer la réclamation pour vérifier le SLA
  const { data: reclamation, error: fetchErr } = await supabase
    .schema('audit')
    .from('acpr_compliance_log')
    .select('created_at, sla_deadline')
    .eq('id', reclamationId)
    .eq('event_type', 'reclamation_received')
    .single()

  if (fetchErr || !reclamation) {
    throw new Error('Réclamation introuvable')
  }

  const slaMet = now <= new Date(reclamation.sla_deadline)

  const { error } = await supabase.schema('audit').from('acpr_compliance_log').insert({
    event_type: 'reclamation_acknowledged',
    reference_type: 'reclamation',
    reference_id: reclamationId,
    metadata: { acknowledged_by: acknowledgedBy },
    sla_deadline: reclamation.sla_deadline,
    sla_met: slaMet,
  })

  if (error) throw error

  if (!slaMet) {
    logger.warn(
      { reclamationId, deadline: reclamation.sla_deadline },
      '⚠️ SLA accusé réception DÉPASSÉ — risque ACPR'
    )
  }

  return { slaMet }
}

/**
 * Résout définitivement une réclamation
 */
export async function resolveReclamation(
  reclamationId: string,
  resolvedBy: string,
  resolution: { outcome: 'satisfied' | 'partially_satisfied' | 'rejected'; explanation: string }
): Promise<{ slaMet: boolean }> {
  const supabase = await createClient()
  const now = new Date()

  const { data: reclamation, error: fetchErr } = await supabase
    .schema('audit')
    .from('acpr_compliance_log')
    .select('created_at')
    .eq('id', reclamationId)
    .eq('event_type', 'reclamation_received')
    .single()

  if (fetchErr || !reclamation) {
    throw new Error('Réclamation introuvable')
  }

  const resolveDeadline = addCalendarDays(new Date(reclamation.created_at), RESOLVE_SLA_DAYS)
  const slaMet = now <= resolveDeadline

  const { error } = await supabase.schema('audit').from('acpr_compliance_log').insert({
    event_type: 'reclamation_resolved',
    reference_type: 'reclamation',
    reference_id: reclamationId,
    metadata: { resolved_by: resolvedBy, ...resolution },
    sla_deadline: resolveDeadline.toISOString(),
    sla_met: slaMet,
  })

  if (error) throw error

  if (!slaMet) {
    logger.warn(
      { reclamationId, deadline: resolveDeadline.toISOString() },
      '⚠️ SLA résolution DÉPASSÉ — escalade Médiateur recommandée'
    )
  }

  return { slaMet }
}

/**
 * Escalade vers le Médiateur de l'Assurance
 * https://www.mediation-assurance.org
 */
export async function escalateToMediator(
  reclamationId: string,
  reason: string
): Promise<void> {
  const supabase = await createClient()
  await supabase.schema('audit').from('acpr_compliance_log').insert({
    event_type: 'complaint_escalated',
    reference_type: 'reclamation',
    reference_id: reclamationId,
    metadata: { reason, mediator: 'mediation-assurance.org' },
  })

  logger.info({ reclamationId, reason }, 'Réclamation escalated to Médiateur')
}

/**
 * Reporting mensuel (à déclencher en cron le 1er de chaque mois)
 * Génère le rapport ACPR-ready : volume, SLA, top categories, escalades
 */
export async function generateMonthlyReport(year: number, month: number): Promise<{
  total_reclamations: number
  by_category: Record<string, number>
  sla_acknowledge_met_rate: number
  sla_resolve_met_rate: number
  escalated_count: number
  resolved_count: number
}> {
  const supabase = await createClient()
  const startDate = new Date(year, month - 1, 1).toISOString()
  const endDate = new Date(year, month, 1).toISOString()

  const { data: events, error } = await supabase
    .schema('audit')
    .from('acpr_compliance_log')
    .select('event_type, metadata, sla_met')
    .gte('created_at', startDate)
    .lt('created_at', endDate)

  if (error) throw error

  const all = events ?? []
  const received = all.filter((e) => e.event_type === 'reclamation_received')
  const acknowledged = all.filter((e) => e.event_type === 'reclamation_acknowledged')
  const resolved = all.filter((e) => e.event_type === 'reclamation_resolved')
  const escalated = all.filter((e) => e.event_type === 'complaint_escalated')

  const byCategory: Record<string, number> = {}
  for (const e of received) {
    const cat = ((e.metadata as Record<string, unknown> | null)?.category as string | undefined) ?? 'autre'
    byCategory[cat] = (byCategory[cat] ?? 0) + 1
  }

  const ackMetCount = acknowledged.filter((e) => e.sla_met === true).length
  const resolveMetCount = resolved.filter((e) => e.sla_met === true).length

  return {
    total_reclamations: received.length,
    by_category: byCategory,
    sla_acknowledge_met_rate: acknowledged.length > 0 ? ackMetCount / acknowledged.length : 1,
    sla_resolve_met_rate: resolved.length > 0 ? resolveMetCount / resolved.length : 1,
    escalated_count: escalated.length,
    resolved_count: resolved.length,
  }
}
