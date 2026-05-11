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

import OpenAI from 'openai'
import * as Sentry from '@sentry/nextjs'
import { createAdminClient } from '@/lib/supabase/admin'
import { type DomainError, ResultAsync, ok, err, externalError, databaseError } from '@/lib/result'

const EMBED_MODEL = 'text-embedding-3-small'
const EMBED_DIM = 1536

let _openai: OpenAI | null = null
function getOpenAI(): OpenAI | null {
  if (_openai) return _openai
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  _openai = new OpenAI({ apiKey })
  return _openai
}

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

const SYSTEM_PROMPT = `Tu es l'assistant Vivos Assurance, un courtier ORIAS spécialiste de l'assurance professionnelle française. Tu réponds en français, ton chaleureux mais professionnel.

CONSIGNES STRICTES :
- Réponds UNIQUEMENT à partir du contexte fourni ci-dessous.
- Si l'info n'est pas dans le contexte, dis "Je n'ai pas cette information précise — un courtier ORIAS peut vous aider en 5 min via le formulaire devis."
- Cite tes sources avec [/slug-page] entre crochets.
- Format : phrases courtes, listes à puces si plusieurs points, max 200 mots.
- Termine TOUJOURS par "💬 Pour un devis personnalisé : devis gratuit en 5 min."
- INTERDIT : conseils juridiques, médicaux, fiscaux personnalisés (rappelle qu'on est courtier, pas avocat).
- INTERDIT : promesses de tarif fixe (rappelle que c'est sur devis personnalisé).
`

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Stream une réponse depuis le LLM avec contexte RAG.
 * Compatible Vercel AI SDK ou consumer direct du stream.
 */
export async function* streamChatCompletion(
  question: string,
  history: ChatMessage[] = []
): AsyncGenerator<string, void, unknown> {
  const client = getOpenAI()
  if (!client) {
    yield 'Le chatbot est temporairement indisponible. Utilisez le formulaire devis pour être recontacté.'
    return
  }

  const retrievalResult = await retrieveSimilarPages(question, 5, 0.55)
  const context = retrievalResult.isOk() ? buildContext(retrievalResult.value) : ''

  if (!context) {
    yield "Je n'ai pas trouvé d'information précise sur ce sujet dans notre base. 💬 Un courtier ORIAS peut vous aider en 5 min via le formulaire devis."
    return
  }

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'system', content: `CONTEXTE :\n${context}` },
    ...history.map((m) => ({ role: m.role, content: m.content }) as const),
    { role: 'user', content: question },
  ]

  const stream = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    temperature: 0.3,
    max_tokens: 600,
    stream: true,
  })

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content
    if (delta) yield delta
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
