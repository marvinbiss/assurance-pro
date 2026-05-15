/**
 * RAG (Retrieval-Augmented Generation) chatbot — librairie.
 *
 * Pipeline :
 *   1. embedQuery(question)      → vecteur 1536-dim (OpenAI)
 *   2. matchPageEmbeddings(vec)  → top-k pages similaires (pgvector)
 *   3. buildContext(matches)     → texte concaténé + sources
 *   4. streamChatCompletion()    → réponse Claude/GPT streamée
 *
 * No-op gracieux si OPENAI_API_KEY absente (retourne err Internal).
 * Tous appels externes wrappés en Result<T, DomainError>.
 */

import * as Sentry from '@sentry/nextjs'
import { createAdminClient } from '@/lib/supabase/admin'
import { type DomainError, ResultAsync, ok, err, externalError, databaseError } from '@/lib/result'
import { getOpenAI } from './clients'
import { inferTier, streamWithFallback, type ChatMessage as ChatMessageInternal } from './models'

const EMBED_MODEL = 'text-embedding-3-small'
const EMBED_DIM = 1536

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PageMatch {
  pageSlug: string
  chunkIndex: number
  content: string
  similarity: number
}

export interface ChunkInput {
  pageSlug: string
  chunkIndex: number
  content: string
}

// ─── Embeddings ─────────────────────────────────────────────────────────────

/**
 * Génère un embedding pour une requête utilisateur (online, hot path).
 */
export function embedQuery(question: string): ResultAsync<number[], DomainError> {
  return ResultAsync.fromPromise(
    Sentry.startSpan(
      { op: 'ai.embed', name: 'openai.embedQuery', attributes: { 'embed.model': EMBED_MODEL } },
      async () => {
        const client = getOpenAI()
        if (!client) {
          throw new Error('OPENAI_API_KEY not configured')
        }
        const trimmed = question.trim().slice(0, 8000)
        const response = await client.embeddings.create({
          model: EMBED_MODEL,
          input: trimmed,
          dimensions: EMBED_DIM,
        })
        const vector = response.data[0]?.embedding
        if (!vector || vector.length !== EMBED_DIM) {
          throw new Error(`Unexpected embedding shape: ${vector?.length}`)
        }
        return vector
      }
    ),
    (e) => externalError('openai.embeddings', e)
  )
}

/**
 * Génère un embedding pour un document/chunk (offline, batch).
 */
export function embedDocument(content: string): ResultAsync<number[], DomainError> {
  return embedQuery(content)
}

// ─── Retrieval ───────────────────────────────────────────────────────────────

/**
 * Cherche top-k pages similaires à un vecteur de requête (cosine similarity).
 *
 * @param threshold cosine similarity min (0.7 = strict, 0.5 = loose)
 */
export function matchPageEmbeddings(
  queryEmbedding: number[],
  matchCount = 5,
  threshold = 0.7
): ResultAsync<PageMatch[], DomainError> {
  return ResultAsync.fromPromise(
    Sentry.startSpan(
      {
        op: 'db.rpc',
        name: 'rpc.match_page_embeddings',
        attributes: { 'rag.k': matchCount, 'rag.threshold': threshold },
      },
      async () => {
        const supabase = createAdminClient()
        const { data, error } = await supabase.rpc('match_page_embeddings', {
          query_embedding: queryEmbedding as unknown as string, // pgvector accepts numeric array via postgrest
          match_count: matchCount,
          similarity_threshold: threshold,
        })
        if (error) throw error
        return (data ?? []) as Array<{
          page_slug: string
          chunk_index: number
          content: string
          similarity: number
        }>
      }
    ),
    (e) => databaseError('match_page_embeddings', e)
  ).map((rows) =>
    rows.map((r) => ({
      pageSlug: r.page_slug,
      chunkIndex: r.chunk_index,
      content: r.content,
      similarity: r.similarity,
    }))
  )
}

/**
 * Pipeline complet : question texte → top-k pages similaires.
 */
export function retrieveSimilarPages(
  question: string,
  matchCount = 5,
  threshold = 0.7
): ResultAsync<PageMatch[], DomainError> {
  return embedQuery(question).andThen((vec) => matchPageEmbeddings(vec, matchCount, threshold))
}

// ─── Context Building ────────────────────────────────────────────────────────

/**
 * Concatène les matches en contexte texte structuré.
 * Insère separators entre chunks pour éviter mélanges sémantiques.
 */
export function buildContext(matches: PageMatch[], maxChars = 8000): string {
  if (matches.length === 0) return ''
  const sections: string[] = []
  let used = 0
  for (const m of matches) {
    const header = `[Source: /${m.pageSlug} · similarité ${m.similarity.toFixed(2)}]`
    const block = `${header}\n${m.content.trim()}\n\n---\n`
    if (used + block.length > maxChars) break
    sections.push(block)
    used += block.length
  }
  return sections.join('')
}

// ─── Upsert (offline batch only) ─────────────────────────────────────────────

/**
 * Upsert un embedding en base. Réservé scripts/generate-embeddings.ts.
 */
export function upsertEmbedding(
  chunk: ChunkInput,
  embedding: number[],
  tokenCount?: number
): ResultAsync<string, DomainError> {
  return ResultAsync.fromPromise(
    (async () => {
      const supabase = createAdminClient()
      const { data, error } = await supabase.rpc('upsert_page_embedding', {
        p_page_slug: chunk.pageSlug,
        p_chunk_index: chunk.chunkIndex,
        p_content: chunk.content,
        p_embedding: embedding as unknown as string,
        p_model: EMBED_MODEL,
        p_token_count: tokenCount ?? null,
      })
      if (error) throw error
      return data as string
    })(),
    (e) => databaseError('upsert_page_embedding', e)
  )
}

// ─── Chat completion (Claude/GPT) ────────────────────────────────────────────

const SYSTEM_PROMPT = `Tu es l'assistant IA du cabinet Vivos Assurance, courtier en assurance immatriculé ORIAS (catégorie b — courtier en assurance, conformément à l'art. L. 512-1 du Code des assurances).

═══ IDENTITÉ ═══
- Tu réponds en français, ton chaleureux mais professionnel.
- Tu n'es PAS un courtier humain — tu es un assistant IA générique conçu pour orienter les visiteurs.
- Le vrai devoir de conseil (DDA art. L. 521-4 du Code des assurances) est exclusivement assuré par les courtiers ORIAS humains du cabinet, avec recommandation motivée écrite.

═══ SOURCE D'INFORMATION ═══
- Tu réponds UNIQUEMENT à partir du contexte ci-dessous (extraits de notre site web).
- Si l'info n'est PAS dans le contexte : « Je n'ai pas cette information précise dans ma base. Un courtier ORIAS peut vous accompagner en 5 min via le formulaire devis. »
- Cite tes sources sous forme [/slug-de-la-page] entre crochets (le client peut cliquer).
- Ne jamais inventer un fait, un chiffre, une référence juridique ou une jurisprudence absente du contexte.

═══ INTERDICTIONS STRICTES (YMYL — Your Money Your Life) ═══
- ❌ Conseils juridiques personnalisés (tu n'es pas avocat, ne réponds pas « vous devez faire X »).
- ❌ Conseils fiscaux personnalisés (tu n'es pas expert-comptable).
- ❌ Conseils médicaux (tu n'es pas médecin).
- ❌ Promesses de tarif fixe (toujours « fourchette indicative », « selon votre profil exact »).
- ❌ Recommandation motivée d'un produit d'assurance précis (réservé aux courtiers ORIAS humains, DDA L. 521-4).
- ❌ Garanties de couverture (« vous serez couvert si... » est interdit — toujours « renseignez-vous auprès d'un courtier »).
- ❌ Affirmations sur les obligations contractuelles d'un assureur sans citer la source.

═══ COMPORTEMENT EN CAS DE SUJET SENSIBLE ═══
- Sinistre en cours : « Pour un sinistre en cours, contactez immédiatement votre assureur ou notre cellule sinistres au formulaire dédié. »
- Litige : « Pour un litige, plusieurs recours existent (médiation, ACPR, judiciaire). Un courtier vous oriente. »
- Refus indemnisation : orienter vers /blog/refus-indemnisation-assurance-4-recours-2026 + courtier.

═══ FORMAT DE RÉPONSE ═══
- Phrases courtes (sujet-verbe-complément).
- Listes à puces si plusieurs points (max 5 items).
- Maximum 200 mots.
- Termine TOUJOURS par : « 💬 Pour un devis ou conseil personnalisé : formulaire devis (5 min). »
- Si question sur tarifs : toujours préciser « indicatif », « fourchette », « selon votre profil ».

═══ TRANSPARENCE IA ═══
- Si l'utilisateur demande qui tu es : « Je suis un assistant IA du cabinet Vivos Assurance. Mes réponses sont générées automatiquement à partir des contenus de notre site. Pour un conseil personnalisé conforme DDA L. 521-4, contactez un courtier humain via le formulaire devis. »

Voici les extraits de notre site qui peuvent t'aider à répondre :
`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Stream une réponse depuis le LLM avec contexte RAG.
 *
 * Multi-model :
 *   - Routing par complexité (inferTier) — FAQ simple → Haiku, juridique → Opus
 *   - Fallback chain : Anthropic → OpenAI → message générique
 *   - Métadonnées du modèle utilisé loggées (Sentry)
 *
 * Compatible Vercel AI SDK ou consumer direct du stream.
 */
export async function* streamChatCompletion(
  question: string,
  history: ChatMessage[] = []
): AsyncGenerator<string, void, unknown> {
  // ── Retrieval ─────────────────────────────────────────────────────────────
  const retrievalResult = await retrieveSimilarPages(question, 5, 0.55)
  const context = retrievalResult.isOk() ? buildContext(retrievalResult.value) : ''

  if (!context) {
    yield "Je n'ai pas trouvé d'information précise sur ce sujet dans notre base. 💬 Un courtier ORIAS peut vous aider en 5 min via le formulaire devis."
    return
  }

  // ── Multi-model selection + fallback ──────────────────────────────────────
  const tier = inferTier(question)
  Sentry.setTag('chat.tier', tier)

  for await (const event of streamWithFallback(tier, {
    systemPrompt: SYSTEM_PROMPT,
    context,
    question,
    history: history as ChatMessageInternal[],
  })) {
    if (event.meta) {
      Sentry.setTag('chat.provider', event.meta.provider)
      Sentry.setTag('chat.model', event.meta.model)
      continue
    }
    if (event.delta) yield event.delta
  }
}

/**
 * Variante non-streaming (Result-based) pour callers simples.
 */
export function getChatCompletion(
  question: string,
  history: ChatMessage[] = []
): ResultAsync<string, DomainError> {
  return ResultAsync.fromPromise(
    (async () => {
      let buf = ''
      for await (const chunk of streamChatCompletion(question, history)) {
        buf += chunk
      }
      return buf
    })(),
    (e) => externalError('chat.completion', e)
  ).andThen((s) => (s ? ok(s) : err(externalError('chat.completion', 'empty response'))))
}
