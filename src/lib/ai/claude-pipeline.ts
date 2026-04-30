/**
 * Pipeline LLM Claude Sonnet 4.6 — génération contenu pSEO assurance pro
 *
 * Architecture 70/30 :
 * - 70% data propriétaire/officielle injectée (Sirene, AQC, Légifrance, ORIAS, tarifs)
 * - 30% texte LLM contrôlé (intro, conseils, FAQ, glossaire)
 *
 * Garde-fous anti-hallucination :
 * - Validation Zod stricte de la sortie JSON
 * - Anti-hallucination juridique (jamais inventer un article, un assureur, un tarif)
 * - Cross-validation GPT-5 sur 5% des pages aléatoires
 * - Validation humaine batch obligatoire avant status='published'
 */

import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import { createHash } from 'node:crypto'
import { logger } from '@/lib/logger'

const MODEL = 'claude-sonnet-4-6-20250101'
const MAX_TOKENS = 2200
const TEMPERATURE = 0.4

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// ============================================================================
// SCHEMA Zod — sortie LLM validée
// ============================================================================

export const LlmOutputSchema = z.object({
  intro: z.string().min(200).max(900),
  obligations: z.string().min(150).max(800),
  prix: z.string().min(150).max(800),
  conseils_metier: z.string().min(100).max(600).optional(),
  faq: z
    .array(
      z.object({
        q: z.string().min(10).max(200),
        a: z.string().min(50).max(500),
      })
    )
    .min(4)
    .max(10),
})

export type LlmOutput = z.infer<typeof LlmOutputSchema>

// ============================================================================
// Data pack — variables injectées
// ============================================================================

export interface DataPack {
  vertical: string
  garantie: string
  metier: string
  ville?: string
  region?: string
  statut?: string
  tranche_ca?: string

  // Data propriétaire / officielle
  artisans_actifs?: number       // Sirene
  prime_min?: number             // tarifs propriétaires
  prime_med?: number
  prime_max?: number
  tarif_echantillon?: number
  sinistre_freq?: number         // AQC SYCODÉS
  sinistre_cout?: number
  top_causes?: Array<{ cause: string; pct: number }>
  jurisprudence?: Array<{
    date_arret: string
    juridiction: string
    resume: string
    url?: string
  }>
  obligation_legale?: boolean
  reference_legale?: string

  // Conformité auteur
  auteur_orias?: {
    nom: string
    orias_number: string
    bio_short: string
  }
}

// ============================================================================
// SYSTEM PROMPT — verrous critiques YMYL
// ============================================================================

const SYSTEM_PROMPT = `Tu es un rédacteur expert en assurance professionnelle française, courtier ORIAS depuis 15 ans.
Tu écris pour le site d'un courtier ORIAS dont les pages sont en YMYL strict (Your Money Your Life).

OBLIGATIONS ABSOLUES (chaque déviation = contenu rejeté) :
1. Réponds STRICTEMENT en JSON valide, sans markdown, sans fence, sans préambule.
2. N'invente AUCUN chiffre absent de <data>. Si une donnée manque, écris "selon votre profil" ou "à partir de".
3. N'invente AUCUN nom d'assureur ; n'utilise que ceux fournis dans <data>.
4. N'invente AUCUNE jurisprudence ; n'utilise que celle fournie.
5. Style : précis, factuel, juridiquement exact. Pas de superlatifs commerciaux ("meilleur", "le moins cher").
6. Pas de promesse de remboursement, garantie totale, ou "100% couvert".
7. Mentionne quand pertinent : la décennale est OBLIGATOIRE en BTP (loi Spinetta + art. L. 241-1 C. assur.).
8. Toute estimation tarifaire DOIT être encadrée par "Tarif indicatif basé sur N devis" ou "Selon votre profil".
9. N'utilise jamais "Souscrivez" ; utilise "Demandez votre devis" (le courtier ne vend pas, il intermédie).
10. Pas d'emoji, pas d'humour, pas de second degré.`

// ============================================================================
// PROMPT BUILDER — selon le type de page
// ============================================================================

export function buildPrompt(pageType: string, dataPack: DataPack): string {
  const dataBlock = formatDataBlock(dataPack)

  const taskInstructions: Record<string, string> = {
    pillar: pillarTask(dataPack),
    hub_metier: hubMetierTask(dataPack),
    hub_geo: hubGeoTask(dataPack),
    leaf: leafTask(dataPack),
    price: priceTask(dataPack),
    auto_entrepreneur: autoEntrepreneurTask(dataPack),
    guide: guideTask(dataPack),
  }

  const task = taskInstructions[pageType] ?? leafTask(dataPack)

  return `<context>
Page type : ${pageType}
Vertical : ${dataPack.vertical}
Sujet : ${dataPack.garantie} pour ${dataPack.metier}${dataPack.ville ? ` à ${dataPack.ville}` : ''}
${dataPack.statut ? `Statut juridique : ${dataPack.statut}` : ''}
${dataPack.tranche_ca ? `Tranche CA : ${dataPack.tranche_ca}` : ''}
</context>

${dataBlock}

<task>
${task}

Retourne UNIQUEMENT un objet JSON avec ces clés exactes :
{
  "intro": "...",            // 2 paragraphes, contexte du métier + enjeu assurantiel
  "obligations": "...",      // cadre légal précis (articles cités), périmètre garantie
  "prix": "...",             // analyse facteurs (CA, sinistralité, zone), fourchette indicative
  "conseils_metier": "...",  // optionnel : 1 paragraphe conseil métier-spécifique
  "faq": [                   // 4 à 8 questions concrètes
    {"q": "...", "a": "..."}
  ]
}
</task>`
}

function formatDataBlock(d: DataPack): string {
  const lines: string[] = ['<data>']
  if (d.artisans_actifs !== undefined)
    lines.push(`- Artisans/professionnels actifs Sirene (zone) : ${d.artisans_actifs}`)
  if (d.prime_med !== undefined)
    lines.push(
      `- Prime médiane marché : ${d.prime_med} € HT (échantillon ${d.tarif_echantillon ?? 'N/A'})`
    )
  if (d.prime_min !== undefined && d.prime_max !== undefined)
    lines.push(`- Fourchette : ${d.prime_min} - ${d.prime_max} € HT`)
  if (d.sinistre_freq !== undefined)
    lines.push(
      `- Fréquence sinistres ${d.metier} : ${d.sinistre_freq}% / coût moyen ${d.sinistre_cout ?? 'N/A'} € (AQC SYCODÉS)`
    )
  if (d.top_causes && d.top_causes.length > 0) {
    lines.push(
      `- Top 3 causes sinistres : ${d.top_causes
        .slice(0, 3)
        .map((c) => `${c.cause} (${c.pct}%)`)
        .join(', ')}`
    )
  }
  if (d.jurisprudence && d.jurisprudence.length > 0) {
    lines.push(
      `- Jurisprudence récente : ${d.jurisprudence
        .slice(0, 3)
        .map((j) => `${j.date_arret} ${j.juridiction} : ${j.resume.slice(0, 140)}`)
        .join(' | ')}`
    )
  }
  if (d.obligation_legale !== undefined) {
    lines.push(
      `- Obligation légale : ${
        d.obligation_legale ? 'OUI' : 'NON'
      } (${d.reference_legale ?? 'voir Code des assurances'})`
    )
  }
  if (d.auteur_orias) {
    lines.push(
      `- Auteur signataire : ${d.auteur_orias.nom} (ORIAS n° ${d.auteur_orias.orias_number})`
    )
  }
  lines.push('</data>')
  return lines.join('\n')
}

// ============================================================================
// TÂCHES par type de page
// ============================================================================

function pillarTask(_d: DataPack): string {
  return `Cette page est un PILIER (page racine de garantie). Elle doit être complète et faire autorité.
- Intro : 2 paragraphes (200-300 mots) — qu'est-ce que cette garantie, à qui elle s'adresse, pourquoi elle est essentielle.
- Obligations : 1-2 paragraphes — cadre légal complet avec articles cités, sanctions en cas de non-respect.
- Prix : 1 paragraphe (150-200 mots) — facteurs déterminants, fourchettes, comment varient les primes.
- Conseils : 1 paragraphe — 3 erreurs fréquentes à éviter à la souscription.
- FAQ : 6-8 questions universelles (obligation, durée, exclusions, sanctions, comment souscrire, comment changer).`
}

function hubMetierTask(d: DataPack): string {
  return `Cette page est un HUB MÉTIER (${d.metier}). Elle traite la garantie ${d.garantie} pour ce métier spécifique.
- Intro : 2 paragraphes — risques spécifiques du métier ${d.metier}, pourquoi cette garantie est critique pour ce métier.
- Obligations : cadre légal + spécificités métier (qualifications RGE, déclarations, etc.).
- Prix : facteurs métier (sinistralité, expérience, sous-traitance), fourchette indicative.
- Conseils : 1 paragraphe — comment optimiser sa prime pour un ${d.metier}.
- FAQ : 6-8 questions spécifiques au métier (équipements couverts, sous-traitance, etc.).`
}

function hubGeoTask(d: DataPack): string {
  return `Cette page est un HUB GÉO (${d.ville ?? d.region}). Contextualise le marché de l'assurance pro localement.
- Intro : 2 paragraphes — marché pro local en chiffres, particularités régionales.
- Obligations : règles locales si applicable (PPR, arrêtés préfectoraux), sinon cadre national.
- Prix : variations régionales (IDF/PACA souvent +15-25%), facteurs locaux.
- Conseils : courtiers locaux vs nationaux, particularités régionales.
- FAQ : 5-6 questions adaptées au contexte régional.`
}

function leafTask(d: DataPack): string {
  return `Cette page est une FEUILLE (${d.garantie} ${d.metier}${d.ville ? ` à ${d.ville}` : ''}). Format optimisé conversion.
- Intro : 2 paragraphes (180-250 mots) — contexte local + enjeu métier.
- Obligations : cadre légal métier spécifique.
- Prix : tarif moyen avec fourchette, modulation par profil.
- Conseils : optionnel, 1 paragraphe court.
- FAQ : 5-7 questions transactionnelles (prix, démarche, attestation).`
}

function priceTask(d: DataPack): string {
  return `Cette page traite le PRIX/TARIF de ${d.garantie} pour ${d.metier}. Très transactionnelle.
- Intro : 1-2 paragraphes — facteurs déterminants du prix.
- Obligations : impact des obligations légales sur le prix.
- Prix : tableau qualitatif des facteurs, fourchettes par tranche CA, exemples concrets.
- Conseils : 3-5 leviers pour optimiser sa prime.
- FAQ : 5-7 questions sur le prix (pourquoi varie, négocier, payer mensuellement, etc.).`
}

function autoEntrepreneurTask(d: DataPack): string {
  return `Cette page est dédiée aux AUTO-ENTREPRENEURS / micro-entrepreneurs en ${d.metier}.
- Intro : 2 paragraphes — spécificités du statut AE pour cette assurance.
- Obligations : cadre légal AE, plafonds CA, obligations spécifiques.
- Prix : tarifs AE généralement plus bas, fourchette précise.
- Conseils : passage AE → SARL, déduction Madelin, comment optimiser.
- FAQ : 6-8 questions AE-spécifiques.`
}

function guideTask(d: DataPack): string {
  return `Cette page est un GUIDE pratique sur ${d.garantie} pour ${d.metier}.
- Intro : 1-2 paragraphes — situer le sujet, à qui s'adresse le guide.
- Obligations : étapes-clés du processus.
- Prix : si pertinent, ordres de grandeur.
- Conseils : 5-8 conseils numérotés (étapes pratiques).
- FAQ : 6-8 questions du guide (comment, quand, où, combien).`
}

// ============================================================================
// PIPELINE — appel Claude + validation + stockage
// ============================================================================

export interface GenerateResult {
  output: LlmOutput
  promptHash: string
  llmModel: string
  inputTokens: number
  outputTokens: number
  latencyMs: number
}

export async function generatePageContent(
  pageType: string,
  dataPack: DataPack
): Promise<GenerateResult> {
  const t0 = Date.now()
  const prompt = buildPrompt(pageType, dataPack)
  const promptHash = createHash('sha256').update(prompt).digest('hex')

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    temperature: TEMPERATURE,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })

  const rawText = response.content[0]?.type === 'text' ? response.content[0].text : ''
  const jsonText = extractJson(rawText)
  let parsed: unknown
  try {
    parsed = JSON.parse(jsonText)
  } catch (err) {
    logger.error({ err, rawText }, 'Claude returned invalid JSON')
    throw new Error('Claude output is not valid JSON')
  }

  const validated = LlmOutputSchema.parse(parsed)

  return {
    output: validated,
    promptHash,
    llmModel: MODEL,
    inputTokens: response.usage.input_tokens,
    outputTokens: response.usage.output_tokens,
    latencyMs: Date.now() - t0,
  }
}

function extractJson(text: string): string {
  // Strip markdown fences si présents (ne devrait pas, mais safety net)
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
  if (fenced?.[1]) return fenced[1]

  // Find first { ... }
  const m = text.match(/\{[\s\S]*\}/)
  return m ? m[0] : text
}

/**
 * Conversion LlmOutput → HTML (simple, pour stockage en cms_pages.content_html)
 */
export function renderToHtml(out: LlmOutput): string {
  const faqHtml = out.faq
    .map(
      (f) => `<details><summary><strong>${escapeHtml(f.q)}</strong></summary><p>${escapeHtml(f.a)}</p></details>`
    )
    .join('\n')

  return `
<section class="prose-intro"><p>${escapeHtml(out.intro).replace(/\n\n/g, '</p><p>')}</p></section>
<section class="prose-obligations"><h2>Vos obligations légales</h2><p>${escapeHtml(out.obligations).replace(/\n\n/g, '</p><p>')}</p></section>
<section class="prose-prix"><h2>Combien ça coûte ?</h2><p>${escapeHtml(out.prix).replace(/\n\n/g, '</p><p>')}</p></section>
${out.conseils_metier ? `<section class="prose-conseils"><h2>Nos conseils</h2><p>${escapeHtml(out.conseils_metier).replace(/\n\n/g, '</p><p>')}</p></section>` : ''}
<section class="prose-faq"><h2>Questions fréquentes</h2>${faqHtml}</section>
`.trim()
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Schema.org FAQPage JSON-LD (à injecter dans cms_pages.structured_data)
 */
export function buildFaqSchemaOrg(out: LlmOutput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: out.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
}
