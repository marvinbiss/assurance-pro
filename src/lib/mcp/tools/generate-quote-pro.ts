/**
 * MCP Tool: generate_quote_pro
 *
 * Génère un devis assurance professionnelle personnalisé après recueil
 * exigences (DDA L.521-4 compliance gate). Réutilise les tarifs réels
 * du synthetic-enrichment + multiplicateurs statut juridique.
 *
 * Prérequis: proofId valide (TTL 30 min) issu de recueil_exigences.
 */

import { createPiiAdminClient } from '@/lib/supabase/admin'
import { logger } from '@/lib/logger'
import { buildSyntheticEnrichment } from '@/lib/programmatic/synthetic-enrichment'
import {
  generateQuoteSchema,
  type McpToolSpec,
  type McpToolResult,
  type GenerateQuotePayload,
} from '../types'

export const generateQuoteProToolSpec: McpToolSpec = {
  name: 'generate_quote_pro',
  title: 'Devis assurance pro personnalisé',
  description:
    "Génère un devis personnalisé pour une garantie d'assurance professionnelle sur la base d'un recueil exigences DDA validé. Requiert proofId valide. Retourne tarifs min/médian/max + top 3 assureurs partenaires + URL IPID.",
  inputSchema: {
    type: 'object',
    properties: {
      proofId: {
        type: 'string',
        pattern: '^mcp_proof_[a-f0-9]{32}$',
        description: 'ID preuve recueil exigences (issue de recueil_exigences, TTL 30 min)',
      },
      garanties_options: {
        type: 'array',
        items: { type: 'string' },
        maxItems: 10,
        description: 'Garanties optionnelles à inclure (ex: extension territoriale)',
      },
    },
    required: ['proofId'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      prime_min: { type: 'number', description: 'Prime annuelle minimum €' },
      prime_med: { type: 'number', description: 'Prime annuelle médiane €' },
      prime_max: { type: 'number', description: 'Prime annuelle maximum €' },
      currency: { type: 'string', const: 'EUR' },
      periodicity: { type: 'string', enum: ['annuel', 'mensuel'] },
      assureurs: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            nom: { type: 'string' },
            prix_annuel: { type: 'number' },
            plafond: { type: 'string' },
            rating: { type: 'string' },
          },
        },
      },
      sinistralite_metier: { type: 'number' },
      reference_legale: { type: 'string' },
      ipid_url: { type: 'string' },
      devis_url: { type: 'string' },
      next_action: { type: 'string' },
    },
    required: ['prime_min', 'prime_med', 'prime_max', 'currency', 'assureurs'],
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'

export async function handleGenerateQuotePro(rawParams: unknown): Promise<McpToolResult> {
  // 1. Validation
  const parsed = generateQuoteSchema.safeParse(rawParams)
  if (!parsed.success) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Erreur validation: ${parsed.error.issues
            .map((i) => `${i.path.join('.')}: ${i.message}`)
            .join(', ')}`,
        },
      ],
    }
  }

  const params: GenerateQuotePayload = parsed.data

  // 2. Récupérer le proof depuis Supabase
  let proof
  try {
    const admin = createPiiAdminClient()
    const { data, error } = await admin
      .from('mcp_proofs')
      .select('*')
      .eq('id', params.proofId)
      .single()
    if (error || !data) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `proofId "${params.proofId}" introuvable. Appelez recueil_exigences pour générer un nouveau proofId.`,
          },
        ],
      }
    }
    proof = data
  } catch (err) {
    logger.error({ err, proofId: params.proofId }, 'mcp generate_quote_pro lookup failed')
    return {
      isError: true,
      content: [{ type: 'text', text: 'Erreur technique récupération preuve DDA.' }],
    }
  }

  // 3. Vérifier TTL
  if (new Date(proof.expires_at).getTime() < Date.now()) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `proofId expiré (TTL 30 min dépassé). Appelez recueil_exigences pour générer un nouveau proofId.`,
        },
      ],
    }
  }

  // 4. Construire slug pSEO pour réutiliser synthetic-enrichment
  const garantieSlug = proof.garantie_souhaitee as string
  const metierSlug = (proof.metier as string).toLowerCase().replace(/\s+/g, '-')
  const statutSlug = proof.statut_juridique as string
  const pseoSlug = `prix/${garantieSlug}/${metierSlug}/${statutSlug}`

  const enrichment = buildSyntheticEnrichment(pseoSlug)
  if (!enrichment || !enrichment.prix_med_eur) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Métier "${proof.metier}" non couvert par notre référentiel. Notre équipe peut faire un devis sur-mesure : ${SITE_URL}/contact`,
        },
      ],
    }
  }

  const primeMin = enrichment.prix_min_eur ?? 0
  const primeMed = enrichment.prix_med_eur ?? 0
  const primeMax = enrichment.prix_max_eur ?? 0
  const assureurs = enrichment.assureurs_top3_jsonb ?? []
  const sinistralite = enrichment.sinistralite_pct ?? null
  const referenceLegale = enrichment.reference_legale ?? null

  // 5. URLs IPID + devis
  const ipidUrl = `${SITE_URL}/ipid/${garantieSlug}`
  const devisUrl = `${SITE_URL}/devis?garantie=${encodeURIComponent(
    garantieSlug
  )}&metier=${encodeURIComponent(metierSlug)}&statut=${encodeURIComponent(
    statutSlug
  )}&ref=${params.proofId}`

  // 6. Résumé conversationnel
  const garantieLabel = enrichment.garantie_label ?? garantieSlug
  const summary = [
    `Devis ${garantieLabel} pour ${proof.metier} (${proof.statut_juridique}) :`,
    `• Prime min : ${primeMin.toLocaleString('fr-FR')} €/an`,
    `• Prime médiane : ${primeMed.toLocaleString('fr-FR')} €/an`,
    `• Prime max : ${primeMax.toLocaleString('fr-FR')} €/an`,
    sinistralite ? `• Sinistralité métier : ${sinistralite}% (AQC SYCODÉS)` : null,
    referenceLegale ? `• Cadre légal : ${referenceLegale}` : null,
    '',
    `Top assureurs partenaires : ${assureurs.map((a) => a.nom).join(', ')}.`,
    '',
    `Prochaine étape : ${devisUrl}`,
  ]
    .filter(Boolean)
    .join('\n')

  return {
    content: [{ type: 'text', text: summary }],
    structuredContent: {
      prime_min: primeMin,
      prime_med: primeMed,
      prime_max: primeMax,
      currency: 'EUR',
      periodicity: 'annuel',
      assureurs: assureurs.map((a) => ({
        nom: a.nom,
        prix_annuel: primeMed,
        plafond: a.rating ?? 'sur devis',
        rating: a.rating ?? null,
      })),
      sinistralite_metier: sinistralite,
      reference_legale: referenceLegale,
      ipid_url: ipidUrl,
      devis_url: devisUrl,
      next_action: 'Finaliser souscription via devisUrl ou contacter courtier ORIAS',
    },
    _meta: {
      'vivos/proofId': params.proofId,
      'vivos/dda_compliant': true,
      'vivos/garantie': garantieSlug,
      'vivos/metier': metierSlug,
    },
  }
}
