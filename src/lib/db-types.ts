/**
 * Types DB partagés — alignés sur les migrations Supabase 001-013.
 *
 * Cette source unique évite la divergence entre les types TS définis
 * inline dans plusieurs fichiers (lead-persistence.ts, gdpr/export,
 * conseil-recommandation, etc.).
 */

// ──────────────────────────────────────────────────────────────────
// public.leads — table canonique (migration 007 + 009 colonnes FIC)
// ──────────────────────────────────────────────────────────────────

export type LeadScoring = 'hot' | 'warm' | 'cold'

export type LeadStatus = 'new' | 'routed' | 'contacted' | 'quoted' | 'won' | 'lost' | 'spam'

export interface LeadRow {
  id: string
  reference: string
  vertical: string
  metier_slug: string | null
  profession_slug: string | null
  forme_juridique: string
  ca_annuel_eur: number | null
  effectif: number | null
  region_slug: string | null
  departement_code: string | null
  ville: string | null
  ville_cp: string
  contact_civilite: string | null
  contact_prenom: string
  contact_nom: string
  contact_email: string
  contact_telephone: string
  message: string | null
  scoring: LeadScoring | null
  scoring_score: number | null
  routing_partners: unknown
  utm: Record<string, string>
  ip: string | null
  user_agent: string | null
  status: LeadStatus
  consent_dda: boolean
  consent_marketing: boolean
  conseil_hash: string | null
  fic_acknowledged_at: string | null
  fic_acknowledged_ip: string | null
  fic_acknowledged_ua: string | null
  fic_acknowledged_version: string | null
  created_at: string
  updated_at: string
}

// ──────────────────────────────────────────────────────────────────
// public.reclamations (migration 007 + 009 SLA)
// ──────────────────────────────────────────────────────────────────

export type ReclamationCategorie =
  | 'conseil'
  | 'souscription'
  | 'sinistre'
  | 'resiliation'
  | 'facturation'
  | 'rgpd'
  | 'autre'

export type ReclamationStatus =
  | 'received'
  | 'acknowledged'
  | 'in_review'
  | 'responded'
  | 'closed'
  | 'escalated_mediation'

export interface ReclamationRow {
  id: string
  ticket: string
  civilite: string | null
  nom: string
  prenom: string
  email: string
  telephone: string | null
  societe: string | null
  contrat: string | null
  sinistre_ref: string | null
  categorie: ReclamationCategorie
  objet: string
  message: string
  ip: string | null
  user_agent: string | null
  status: ReclamationStatus
  acknowledged_at: string | null
  responded_at: string | null
  response_text: string | null
  closed_at: string | null
  sla_acknowledge_deadline: string | null
  sla_response_deadline: string | null
  sla_acknowledge_breached: boolean
  sla_response_breached: boolean
  created_at: string
}

// ──────────────────────────────────────────────────────────────────
// public.conseil_records (migration 007 — immuable via 009)
// ──────────────────────────────────────────────────────────────────

export interface ConseilRecordRow {
  id: string
  lead_id: string | null
  reference: string
  besoins: Record<string, unknown>
  recommandations: Record<string, unknown>
  produits_proposes: unknown[]
  signature_hash: string
  signed_by_email: string | null
  signed_at: string | null
  created_at: string
}

// ──────────────────────────────────────────────────────────────────
// public.newsletter_subscribers (migration 007 + 009 consent_proof_*)
// ──────────────────────────────────────────────────────────────────

export type NewsletterStatus = 'pending' | 'confirmed' | 'unsubscribed'

export interface NewsletterRow {
  id: string
  email: string
  consent_at: string
  consent_ip: string | null
  consent_proof_text: string | null
  consent_proof_lang: string | null
  consent_user_agent: string | null
  status: NewsletterStatus
  confirmed_at: string | null
  unsubscribed_at: string | null
  source: string | null
}

// ──────────────────────────────────────────────────────────────────
// SLA view (migration 009)
// ──────────────────────────────────────────────────────────────────

export interface ReclamationSlaAlertRow {
  id: string
  ticket: string
  email: string
  status: ReclamationStatus
  created_at: string
  sla_acknowledge_deadline: string
  sla_response_deadline: string
  is_acknowledge_breach: boolean
  is_response_breach: boolean
}

// ──────────────────────────────────────────────────────────────────
// RPC : persist_lead_atomic (migration 012)
// ──────────────────────────────────────────────────────────────────

export interface PersistLeadAtomicResult {
  legacy_lead_id: string
  canonical_reference: string
}
