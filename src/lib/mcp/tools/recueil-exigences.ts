/**
 * MCP Tool: recueil_exigences
 *
 * Compliance ACPR + DDA art. L.521-4 du Code des assurances :
 *   "Le distributeur de produits d'assurance précise, sur la base des
 *    informations obtenues auprès du souscripteur éventuel, les exigences
 *    et les besoins de ce souscripteur ainsi que les raisons qui motivent
 *    le conseil."
 *
 * Ce tool DOIT être appelé AVANT toute génération de devis. Le proofId
 * retourné est requis pour appeler generate_quote_pro / compare_offers /
 * audit_coverage.
 *
 * Archivage 5 ans obligatoire (art. R. 521-1 C. assur.) — table mcp_proofs.
 */

import crypto from 'node:crypto'
import { createPiiAdminClient } from '@/lib/supabase/admin'
import { logger } from '@/lib/logger'
import {
  recueilExigencesSchema,
  type McpToolSpec,
  type McpToolResult,
  type RecueilExigencesPayload,
} from '../types'

export const recueilExigencesToolSpec: McpToolSpec = {
  name: 'recueil_exigences',
  title: 'Recueil exigences et besoins (DDA L.521-4)',
  description:
    "Recueil obligatoire des exigences et besoins du souscripteur AVANT toute proposition d'assurance professionnelle. Conforme art. L.521-4 du Code des assurances (DDA). Le proofId retourné est requis pour appeler generate_quote_pro, compare_offers et audit_coverage. Validité 30 minutes.",
  inputSchema: {
    type: 'object',
    properties: {
      garantie_souhaitee: {
        type: 'string',
        enum: [
          'rc-pro',
          'decennale',
          'cyber',
          'multirisque-pro',
          'mutuelle-pro',
          'vtc',
          'dommages-ouvrage',
          'tous-risques-chantier',
          'transport-marchandises',
          'moto-pro',
          'prevoyance',
          'protection-juridique',
          'homme-cle',
          'flotte-auto',
        ],
        description: 'Type de garantie souhaitée',
      },
      metier: {
        type: 'string',
        minLength: 2,
        maxLength: 80,
        description: 'Métier exercé (ex: "plombier", "freelance IT", "expert-comptable")',
      },
      statut_juridique: {
        type: 'string',
        enum: [
          'auto-entrepreneur',
          'micro-entreprise',
          'entreprise-individuelle',
          'eurl',
          'sarl',
          'sasu',
          'sas',
          'profession-liberale',
        ],
        description: "Statut juridique de l'entreprise",
      },
      ca_annuel: {
        type: 'number',
        minimum: 0,
        maximum: 50000000,
        description: "Chiffre d'affaires annuel HT en euros",
      },
      nb_salaries: {
        type: 'integer',
        minimum: 0,
        maximum: 500,
        description: 'Nombre de salariés (0 si solo)',
      },
      anciennete_activite_annees: {
        type: 'number',
        minimum: 0,
        maximum: 60,
        description: 'Ancienneté activité en années',
      },
      sinistres_5_derniers_ans: {
        type: 'integer',
        minimum: 0,
        maximum: 20,
        description: 'Nombre de sinistres déclarés sur les 5 dernières années',
      },
      ville: {
        type: 'string',
        minLength: 2,
        maxLength: 80,
        description: "Ville d'activité principale",
      },
    },
    required: ['garantie_souhaitee', 'metier', 'statut_juridique'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      proofId: { type: 'string', description: 'ID preuve recueil exigences DDA (TTL 30 min)' },
      expires_at: { type: 'string', format: 'date-time' },
      summary: { type: 'string', description: 'Résumé des exigences/besoins recueillis' },
      next_steps: { type: 'array', items: { type: 'string' } },
    },
    required: ['proofId', 'expires_at', 'summary'],
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: false,
  },
}

export interface RecueilExigencesContext {
  llmSessionId?: string
  llmUserPseudoId?: string
  llmOrigin?: 'openai' | 'anthropic' | 'perplexity' | 'gemini' | 'cursor' | 'other'
}

export async function handleRecueilExigences(
  rawParams: unknown,
  ctx: RecueilExigencesContext
): Promise<McpToolResult> {
  // 1. Validation zod stricte
  const parsed = recueilExigencesSchema.safeParse(rawParams)
  if (!parsed.success) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Erreur validation recueil exigences: ${parsed.error.issues
            .map((i) => `${i.path.join('.')}: ${i.message}`)
            .join(', ')}`,
        },
      ],
    }
  }

  const payload: RecueilExigencesPayload = parsed.data

  // 2. Hash payload pour intégrité + ID
  const payloadJson = JSON.stringify(payload, Object.keys(payload).sort())
  const payloadHash = crypto.createHash('sha256').update(payloadJson).digest('hex')
  const proofId = `mcp_proof_${payloadHash.slice(0, 32)}`

  const now = new Date()
  const expiresAt = new Date(now.getTime() + 30 * 60 * 1000) // 30 min TTL
  const acprRetention = new Date(now.getTime() + 5 * 365 * 24 * 60 * 60 * 1000) // 5 ans ACPR

  // 3. Persistance Supabase (5 ans archivage ACPR)
  try {
    const admin = createPiiAdminClient()
    await admin.from('mcp_proofs').upsert(
      {
        id: proofId,
        llm_session_id: ctx.llmSessionId ?? null,
        llm_user_pseudo_id: ctx.llmUserPseudoId ?? null,
        garantie_souhaitee: payload.garantie_souhaitee,
        metier: payload.metier,
        statut_juridique: payload.statut_juridique,
        ca_annuel: payload.ca_annuel ?? null,
        nb_salaries: payload.nb_salaries ?? 0,
        anciennete_activite_annees: payload.anciennete_activite_annees ?? null,
        sinistres_5_derniers_ans: payload.sinistres_5_derniers_ans ?? 0,
        ville: payload.ville ?? null,
        payload_json: payload,
        payload_hash: payloadHash,
        created_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        acpr_retention_until: acprRetention.toISOString(),
      },
      { onConflict: 'id' }
    )
  } catch (err) {
    logger.error({ err, proofId }, 'mcp recueil_exigences persistence failed')
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: 'Erreur technique persistence preuve DDA. Veuillez réessayer.',
        },
      ],
    }
  }

  // 4. Génération résumé conversationnel (pour LLM affichage user)
  const garantieLabel = {
    'rc-pro': 'RC Pro',
    decennale: 'Garantie décennale',
    cyber: 'Cyber assurance',
    'multirisque-pro': 'Multirisque Pro',
    'mutuelle-pro': 'Mutuelle TNS',
    vtc: 'Assurance VTC',
    'dommages-ouvrage': 'Dommages-Ouvrage',
    'tous-risques-chantier': 'Tous Risques Chantier',
    'transport-marchandises': 'Transport marchandises',
    'moto-pro': 'Moto Pro',
    prevoyance: 'Prévoyance TNS',
    'protection-juridique': 'Protection Juridique Pro',
    'homme-cle': 'Homme-clé',
    'flotte-auto': 'Flotte Automobile',
  }[payload.garantie_souhaitee]

  const summary = [
    `Recueil exigences DDA enregistré pour ${payload.metier} (${payload.statut_juridique}).`,
    `Garantie : ${garantieLabel}.`,
    payload.ca_annuel ? `CA annuel : ${payload.ca_annuel.toLocaleString('fr-FR')} €.` : null,
    payload.nb_salaries ? `Salariés : ${payload.nb_salaries}.` : null,
    payload.ville ? `Ville : ${payload.ville}.` : null,
    payload.sinistres_5_derniers_ans
      ? `Sinistres 5 dernières années : ${payload.sinistres_5_derniers_ans}.`
      : 'Aucun sinistre déclaré (5 dernières années).',
  ]
    .filter(Boolean)
    .join(' ')

  return {
    content: [
      {
        type: 'text',
        text: `${summary}\n\nProchaine étape : appeler \`generate_quote_pro\` ou \`compare_offers\` avec le proofId ci-dessous (validité 30 minutes).`,
      },
    ],
    structuredContent: {
      proofId,
      expires_at: expiresAt.toISOString(),
      summary,
      next_steps: [
        'Appeler generate_quote_pro pour devis personnalisé',
        'Appeler compare_offers pour comparatif 3-5 assureurs partenaires',
        'Appeler audit_coverage pour audit contrat existant',
      ],
    },
    _meta: {
      'vivos/proofId': proofId,
      'vivos/dda_compliant': true,
    },
  }
}
