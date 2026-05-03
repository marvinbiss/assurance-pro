/**
 * Lead persistence — single source of truth wrapper.
 *
 * Implémente l'ADR-001 : `public.leads` est canonique, `app.insurance_leads`
 * est conservée en parallèle pendant la fenêtre de dépréciation (jusqu'à
 * Q4 2026). Toute autre couche du code (API routes, jobs cron) doit
 * passer par ces helpers — ne PAS écrire directement dans les tables.
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import { createPiiAdminClient } from '@/lib/supabase/admin'
import { logger } from '@/lib/logger'

export interface LeadCanonicalRecord {
  reference: string
  vertical: string
  metier_slug?: string
  forme_juridique: string
  ca_annuel_eur?: number
  effectif?: number
  ville?: string
  ville_cp: string
  contact_civilite?: string
  contact_prenom: string
  contact_nom: string
  contact_email: string
  contact_telephone: string
  scoring: 'hot' | 'warm' | 'cold'
  scoring_score: number
  utm: Record<string, string>
  ip: string | null
  user_agent: string | null
  consent_dda: boolean
  consent_marketing: boolean
  conseil_hash: string
  fic_acknowledged_at: string
  fic_acknowledged_version?: string
}

export interface LegacyLeadRecord {
  vertical: string
  metier_code: string
  garantie_code: string
  statut_juridique: string
  tranche_ca_code: string
  source_page_id?: string
  source_url?: string
  utm?: Record<string, string>
  postal_code: string
  siret?: string
  anciennete_annees: number
  sinistralite_36m: number
  sous_traitance: boolean
  prenom: string
  nom: string
  email: string
  telephone: string
  consent_rgpd: boolean
  consent_marketing: boolean
  score: number
  segment: 'hot' | 'warm' | 'cold'
}

export interface ConseilRecordInput {
  lead_id: string
  reference: string
  besoins: Record<string, unknown>
  signature_hash: string
}

interface PersistResult {
  legacyLeadId: string
  canonical: { ok: boolean; error?: string }
  conseil: { ok: boolean; error?: string }
}

/**
 * Persiste un lead atomiquement via la RPC `public.persist_lead_atomic`
 * (migration 012). Les 3 INSERT (app.insurance_leads + public.leads +
 * public.conseil_records) s'exécutent dans la même transaction Postgres :
 * toute erreur rollback en bloc — plus de leads orphelins entre legacy et
 * canonique.
 *
 * Le client `legacyClient` est conservé en argument pour rétro-compatibilité,
 * mais l'appel RPC se fait via `createPiiAdminClient()` (service_role) car
 * la RPC est SECURITY DEFINER et restreinte à `service_role`.
 */
export async function persistLead(
  _legacyClient: SupabaseClient,
  legacy: LegacyLeadRecord,
  canonical: LeadCanonicalRecord,
  conseil: Omit<ConseilRecordInput, 'lead_id'>
): Promise<PersistResult> {
  const admin = createPiiAdminClient()

  const { data, error } = await admin.rpc('persist_lead_atomic', {
    p_legacy: legacy as unknown as Record<string, unknown>,
    p_canonical: {
      ...canonical,
      fic_acknowledged_ip: canonical.ip,
      fic_acknowledged_ua: canonical.user_agent,
    } as unknown as Record<string, unknown>,
    p_conseil: {
      besoins: conseil.besoins,
      signature_hash: conseil.signature_hash,
    } as unknown as Record<string, unknown>,
  })

  if (error || !data || (Array.isArray(data) && data.length === 0)) {
    logger.error({ err: error }, 'persist_lead_atomic RPC failed')
    throw new Error(`Lead atomic persist failed: ${error?.message ?? 'no rows'}`)
  }

  const row = (Array.isArray(data) ? data[0] : data) as
    | { legacy_lead_id: string; canonical_reference: string }
    | undefined

  if (!row?.legacy_lead_id) {
    throw new Error('persist_lead_atomic RPC returned no legacy_lead_id')
  }

  const result: PersistResult = {
    legacyLeadId: row.legacy_lead_id,
    canonical: { ok: true },
    conseil: { ok: true },
  }

  return result
}
