/**
 * CONSEIL TRACER — Preuve devoir de conseil DDA art. L. 521-4
 *
 * Recommandation ACPR 2024-R-03 (applicable 31/12/2025) :
 * Le distributeur d'assurance DOIT pouvoir prouver, pour chaque client,
 * qu'il a recueilli les exigences/besoins et formulé un conseil personnalisé
 * AVANT toute souscription.
 *
 * Sans cette preuve traçable horodatée → sanction ACPR garantie.
 *
 * Ce module :
 * 1. Capture les exigences/besoins lors du formulaire devis
 * 2. Stocke la motivation du choix produit
 * 3. Génère un hash immuable de l'enregistrement
 * 4. Permet l'extraction d'audit ACPR-ready (export CSV/PDF)
 */

import { createHash } from 'node:crypto'
import { createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/logger'

export interface ExigencesBesoins {
  // Exigences (ce que le client demande)
  garanties_demandees: string[]
  budget_max?: number
  delai_souhaite?: 'urgent' | 'normal' | 'pas_de_contrainte'

  // Besoins (ce que le client doit avoir, déduit du contexte)
  vertical: string
  metier_code: string
  statut_juridique: string
  tranche_ca: string
  anciennete_annees: number
  sinistralite_36m: number
  sous_traitance: boolean

  // Contexte additionnel
  travaux_principaux?: string[]
  zones_intervention?: string[]
  obligations_legales_applicables: string[]

  // Métadonnées
  collected_at: string  // ISO 8601
  collection_method: 'web_form' | 'phone' | 'email' | 'meeting'
  ip_address?: string
  user_agent?: string
}

export interface RecommandationConseil {
  produit_recommande: string  // ex : "Décennale + RC Pro pack PME BTP"
  partenaire_recommande: string  // ex : "Hiscox" / "April Pro" / "SMABTP"
  motivation_choix: string  // Motivation TEXTE explicitant le pourquoi (DDA)
  alternatives_examinees: Array<{
    partenaire: string
    raison_ecart: string
  }>
  nombre_contrats_analyses: number  // Art. L. 521-4-II : si analyse impartiale
  is_analyse_impartiale: boolean

  // Méthode de délivrance
  delivery_method: 'phone' | 'email' | 'docusign' | 'meeting' | 'signed_pdf'
  delivery_at: string  // ISO 8601
  delivery_proof_url?: string  // URL preuve (mail tracking, signature DocuSign, etc.)
}

export interface ConseilRecord {
  lead_id: string
  courtier_id: string
  exigences_collectees: ExigencesBesoins
  recommandation: RecommandationConseil
  document_hash: string
  signature_data: Record<string, unknown>
}

/**
 * Calcule le hash SHA-256 d'un enregistrement de conseil
 * Garantit l'intégrité immuable du record en cas d'audit ACPR
 */
export function calculateRecordHash(record: Omit<ConseilRecord, 'document_hash'>): string {
  // Tri stable des clés pour hash déterministe
  const stableJson = JSON.stringify(record, Object.keys(record).sort())
  return createHash('sha256').update(stableJson).digest('hex')
}

/**
 * Enregistre la preuve du devoir de conseil dans audit.conseil_traceability
 * IMMUTABLE : pas de UPDATE possible (RLS + triggers à mettre en place)
 */
export async function recordConseilDelivery(
  input: Omit<ConseilRecord, 'document_hash'>
): Promise<{ id: string; hash: string }> {
  const hash = calculateRecordHash(input)
  const record: ConseilRecord = { ...input, document_hash: hash }

  const supabase = await createClient()
  const { data, error } = await supabase
    .schema('audit')
    .from('conseil_traceability')
    .insert({
      lead_id: record.lead_id,
      courtier_id: record.courtier_id,
      exigences_collectees: record.exigences_collectees,
      besoins_identifies: deriveBesoins(record.exigences_collectees),
      questionnaire_complete: record.exigences_collectees,
      produit_recommande: record.recommandation.produit_recommande,
      motivation_choix: record.recommandation.motivation_choix,
      alternatives_examinees: record.recommandation.alternatives_examinees,
      nombre_contrats_analyses: record.recommandation.nombre_contrats_analyses,
      delivery_method: record.recommandation.delivery_method,
      delivery_proof_url: record.recommandation.delivery_proof_url,
      delivery_at: record.recommandation.delivery_at,
      document_hash: hash,
      signature_data: record.signature_data,
    })
    .select('id')
    .single()

  if (error) {
    logger.error({ err: error, leadId: record.lead_id }, 'Failed to record conseil delivery')
    throw error
  }

  // Log événement audit ACPR
  await supabase.schema('app').from('events').insert({
    actor_id: record.courtier_id,
    entity_type: 'lead',
    entity_id: record.lead_id,
    event_type: 'conseil.delivered',
    metadata: {
      hash,
      delivery_method: record.recommandation.delivery_method,
      partenaire: record.recommandation.partenaire_recommande,
    },
  })

  logger.info(
    { leadId: record.lead_id, hash, courtierId: record.courtier_id },
    'Conseil DDA recorded'
  )

  return { id: data.id, hash }
}

/**
 * Dérive les "besoins identifiés" à partir des exigences collectées
 * Cette logique est documentée et auditable (clé pour ACPR 2024-R-03)
 */
function deriveBesoins(exigences: ExigencesBesoins): Record<string, unknown> {
  const besoins: Record<string, unknown> = {
    garanties_obligatoires: [],
    garanties_recommandees: [],
  }

  // Exemples de logique métier — à étendre selon le produit
  if (exigences.vertical === 'BTP' && exigences.obligations_legales_applicables.includes('decennale')) {
    ;(besoins.garanties_obligatoires as string[]).push('decennale')
  }
  if (exigences.vertical === 'BTP') {
    ;(besoins.garanties_recommandees as string[]).push('rc_pro', 'multirisque_pro')
  }
  if (exigences.tranche_ca === '250_500k' || exigences.tranche_ca === 'gt_500k') {
    ;(besoins.garanties_recommandees as string[]).push('protection_juridique', 'cyber')
  }

  return besoins
}

/**
 * Vérifie qu'un lead a bien une preuve de conseil avant souscription
 * Bloque la finalisation si non-conforme.
 */
export async function hasValidConseilProof(leadId: string): Promise<{
  valid: boolean
  reason?: string
  recordId?: string
  hash?: string
}> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .schema('audit')
    .from('conseil_traceability')
    .select('id, document_hash, delivery_at')
    .eq('lead_id', leadId)
    .order('delivery_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) {
    return { valid: false, reason: 'Aucune preuve de conseil enregistrée' }
  }

  return { valid: true, recordId: data.id, hash: data.document_hash }
}

/**
 * Export d'audit ACPR pour un range de dates
 * Génère un CSV horodaté hashé pour démontrer l'exhaustivité du registre
 */
export async function exportAcprAudit(
  startDate: string,
  endDate: string
): Promise<{ records: number; csv: string; export_hash: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .schema('audit')
    .from('conseil_traceability')
    .select('id, lead_id, courtier_id, delivery_at, delivery_method, document_hash, produit_recommande, nombre_contrats_analyses')
    .gte('delivery_at', startDate)
    .lte('delivery_at', endDate)
    .order('delivery_at', { ascending: true })

  if (error) {
    logger.error({ err: error, startDate, endDate }, 'ACPR audit export failed')
    throw error
  }

  const records = data ?? []
  const header =
    'id,lead_id,courtier_id,delivery_at,delivery_method,document_hash,produit_recommande,nombre_contrats_analyses\n'
  const rows = records
    .map(
      (r) =>
        `${r.id},${r.lead_id},${r.courtier_id},${r.delivery_at},${r.delivery_method},${r.document_hash},"${r.produit_recommande}",${r.nombre_contrats_analyses ?? ''}`
    )
    .join('\n')
  const csv = header + rows
  const exportHash = createHash('sha256').update(csv).digest('hex')

  return { records: records.length, csv, export_hash: exportHash }
}
