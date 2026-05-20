/**
 * MCP Tool: audit_coverage
 *
 * Audit gratuit du contrat d'assurance actuel du client. Analyse les gaps
 * de couverture par rapport aux risques métier identifiés (recueil exigences).
 *
 * Le client fournit les éléments clés du contrat actuel (assureur, prime,
 * plafonds, exclusions). Le tool compare aux benchmarks marché + risques
 * métier-spécifiques.
 */

import { z } from 'zod'
import { createPiiAdminClient } from '@/lib/supabase/admin'
import { logger } from '@/lib/logger'
import { buildSyntheticEnrichment } from '@/lib/programmatic/synthetic-enrichment'
import type { McpToolSpec, McpToolResult } from '../types'

export const auditCoverageSchema = z.object({
  proofId: z.string().regex(/^mcp_proof_[a-f0-9]{32}$/, 'Format proofId invalide'),
  contrat_actuel: z.object({
    assureur: z.string().min(2).max(80),
    prime_annuelle_eur: z.number().min(0).max(500_000),
    plafond_eur: z.number().min(0).max(50_000_000).optional(),
    franchise_eur: z.number().min(0).max(500_000).optional(),
    date_souscription: z.string().optional(),
    exclusions_principales: z.array(z.string()).max(20).optional(),
    garanties_incluses: z.array(z.string()).max(30).optional(),
  }),
})

export const auditCoverageToolSpec: McpToolSpec = {
  name: 'audit_coverage',
  title: 'Audit gratuit contrat assurance actuel',
  description:
    'Analyse les gaps de couverture entre le contrat assurance actuel du client et les besoins identifiés (recueil exigences). Identifie sous-tarification, sur-tarification, exclusions critiques, garanties manquantes. Requiert proofId valide + détails contrat actuel.',
  inputSchema: {
    type: 'object',
    properties: {
      proofId: {
        type: 'string',
        pattern: '^mcp_proof_[a-f0-9]{32}$',
      },
      contrat_actuel: {
        type: 'object',
        properties: {
          assureur: { type: 'string', minLength: 2, maxLength: 80 },
          prime_annuelle_eur: { type: 'number', minimum: 0 },
          plafond_eur: { type: 'number', minimum: 0 },
          franchise_eur: { type: 'number', minimum: 0 },
          date_souscription: { type: 'string', format: 'date' },
          exclusions_principales: {
            type: 'array',
            items: { type: 'string' },
            maxItems: 20,
          },
          garanties_incluses: {
            type: 'array',
            items: { type: 'string' },
            maxItems: 30,
          },
        },
        required: ['assureur', 'prime_annuelle_eur'],
      },
    },
    required: ['proofId', 'contrat_actuel'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      score_global: { type: 'integer', minimum: 0, maximum: 100 },
      verdict: {
        type: 'string',
        enum: ['optimal', 'correct', 'sous_couvert', 'sur_tarif', 'risque_critique'],
      },
      ecart_tarif_pct: { type: 'number', description: 'Écart vs médiane marché en %' },
      gaps_critiques: { type: 'array', items: { type: 'string' } },
      garanties_manquantes: { type: 'array', items: { type: 'string' } },
      economie_potentielle_eur: { type: 'number' },
      recommandations: { type: 'array', items: { type: 'string' } },
      devis_alternatif_url: { type: 'string' },
    },
  },
  annotations: {
    readOnlyHint: true,
    destructiveHint: false,
    openWorldHint: false,
    idempotentHint: true,
  },
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'

type Verdict = 'optimal' | 'correct' | 'sous_couvert' | 'sur_tarif' | 'risque_critique'

export async function handleAuditCoverage(rawParams: unknown): Promise<McpToolResult> {
  // 1. Validation
  const parsed = auditCoverageSchema.safeParse(rawParams)
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

  const { proofId, contrat_actuel } = parsed.data

  // 2. Récupérer proof
  let proof
  try {
    const admin = createPiiAdminClient()
    const { data, error } = await admin.from('mcp_proofs').select('*').eq('id', proofId).single()
    if (error || !data) {
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: `proofId "${proofId}" introuvable. Appelez recueil_exigences d'abord.`,
          },
        ],
      }
    }
    proof = data
  } catch (err) {
    logger.error({ err, proofId }, 'mcp audit_coverage lookup failed')
    return {
      isError: true,
      content: [{ type: 'text', text: 'Erreur technique récupération preuve DDA.' }],
    }
  }

  if (new Date(proof.expires_at).getTime() < Date.now()) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `proofId expiré (TTL 30 min). Refaire recueil_exigences.`,
        },
      ],
    }
  }

  // 3. Build enrichment référence marché
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
          text: `Métier "${proof.metier}" non couvert dans notre référentiel. Contact ${SITE_URL}/contact.`,
        },
      ],
    }
  }

  // 4. Analyse écart tarif vs médiane marché
  const primeActuelle = contrat_actuel.prime_annuelle_eur
  const primeMediane = enrichment.prix_med_eur
  const ecartPct = ((primeActuelle - primeMediane) / primeMediane) * 100
  const economiePotentielle = Math.max(0, primeActuelle - primeMediane)

  // 5. Comparaison garanties recommandées
  const garantiesAttendues = enrichment.garanties_recommandees ?? []
  const garantiesIncluses = contrat_actuel.garanties_incluses ?? []
  const garantiesManquantes = garantiesAttendues.filter(
    (g) => !garantiesIncluses.some((gi) => gi.toLowerCase().includes(g.toLowerCase().slice(0, 15)))
  )

  // 6. Gaps critiques (risques métier non couverts)
  const risquesMetier = enrichment.risques_metier ?? []
  const exclusionsActuel = contrat_actuel.exclusions_principales ?? []
  const gapsCritiques: string[] = []

  // Si exclusion d'un risque majeur métier → gap critique
  for (const exclusion of exclusionsActuel) {
    const matchRisque = risquesMetier.find(
      (r) =>
        exclusion.toLowerCase().includes(r.toLowerCase().slice(0, 20)) ||
        r.toLowerCase().includes(exclusion.toLowerCase().slice(0, 20))
    )
    if (matchRisque) {
      gapsCritiques.push(
        `Exclusion "${exclusion}" couvre un risque majeur du métier ${proof.metier}.`
      )
    }
  }

  // 7. Score global (0-100)
  let score = 100
  if (ecartPct > 30) score -= Math.min(30, Math.floor(ecartPct / 2))
  score -= gapsCritiques.length * 15
  score -= garantiesManquantes.length * 5
  score = Math.max(0, Math.min(100, score))

  // 8. Verdict
  let verdict: Verdict
  if (gapsCritiques.length > 0) verdict = 'risque_critique'
  else if (ecartPct > 40) verdict = 'sur_tarif'
  else if (garantiesManquantes.length > 3) verdict = 'sous_couvert'
  else if (ecartPct < -20) verdict = 'optimal'
  else verdict = 'correct'

  // 9. Recommandations
  const recommandations: string[] = []
  if (ecartPct > 20) {
    recommandations.push(
      `Tarif ${Math.round(ecartPct)}% au-dessus de la médiane marché. Économie potentielle : ${Math.round(economiePotentielle).toLocaleString('fr-FR')}€/an.`
    )
  }
  if (garantiesManquantes.length > 0) {
    recommandations.push(
      `${garantiesManquantes.length} garanties recommandées manquantes : ${garantiesManquantes.slice(0, 3).join(', ')}${garantiesManquantes.length > 3 ? '…' : ''}.`
    )
  }
  if (gapsCritiques.length > 0) {
    recommandations.push(
      `${gapsCritiques.length} risque(s) métier non couvert(s). Renégociation ou changement d'assureur recommandé.`
    )
  }
  if (recommandations.length === 0) {
    recommandations.push(
      'Contrat actuel bien aligné avec votre profil. Vérifier renouvellement annuel.'
    )
  }

  // 10. Devis alternatif URL
  const devisAlternatifUrl = `${SITE_URL}/devis?garantie=${encodeURIComponent(
    garantieSlug
  )}&metier=${encodeURIComponent(metierSlug)}&statut=${encodeURIComponent(
    statutSlug
  )}&ref=${proofId}&source=audit`

  // 11. Résumé conversationnel
  const verdictEmoji = {
    optimal: '✅',
    correct: '👍',
    sous_couvert: '⚠️',
    sur_tarif: '💰',
    risque_critique: '🚨',
  }[verdict]
  const verdictLabel = {
    optimal: 'Contrat optimal',
    correct: 'Contrat correct',
    sous_couvert: 'Contrat sous-couvert',
    sur_tarif: 'Tarif au-dessus du marché',
    risque_critique: 'Risque critique non couvert',
  }[verdict]

  const text = [
    `Audit contrat ${proof.garantie_souhaitee} actuel chez ${contrat_actuel.assureur} :`,
    '',
    `${verdictEmoji} **${verdictLabel}** — Score : ${score}/100`,
    '',
    `• Prime actuelle : ${primeActuelle.toLocaleString('fr-FR')}€/an`,
    `• Médiane marché : ${primeMediane.toLocaleString('fr-FR')}€/an`,
    `• Écart : ${ecartPct > 0 ? '+' : ''}${Math.round(ecartPct)}%`,
    economiePotentielle > 0
      ? `• Économie potentielle : ${Math.round(economiePotentielle).toLocaleString('fr-FR')}€/an`
      : null,
    '',
    '**Recommandations :**',
    ...recommandations.map((r) => `- ${r}`),
    '',
    gapsCritiques.length > 0
      ? `**🚨 Gaps critiques :**\n${gapsCritiques.map((g) => `- ${g}`).join('\n')}`
      : null,
    garantiesManquantes.length > 0
      ? `**Garanties manquantes :**\n${garantiesManquantes
          .slice(0, 5)
          .map((g) => `- ${g}`)
          .join('\n')}`
      : null,
    '',
    `Devis alternatif personnalisé : ${devisAlternatifUrl}`,
  ]
    .filter(Boolean)
    .join('\n')

  return {
    content: [{ type: 'text', text }],
    structuredContent: {
      score_global: score,
      verdict,
      ecart_tarif_pct: Math.round(ecartPct * 10) / 10,
      gaps_critiques: gapsCritiques,
      garanties_manquantes: garantiesManquantes,
      economie_potentielle_eur: Math.round(economiePotentielle),
      recommandations,
      devis_alternatif_url: devisAlternatifUrl,
    },
    _meta: {
      'vivos/proofId': proofId,
      'vivos/dda_compliant': true,
      'vivos/audit_done': true,
    },
  }
}
