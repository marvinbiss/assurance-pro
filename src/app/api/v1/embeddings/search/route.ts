/**
 * GET /api/v1/embeddings/search?q=...&k=5&threshold=0.5
 *
 * Recherche sémantique sur le corpus Vivos (6 070 pages indexées).
 * Public endpoint pour agents IA — RAG-as-a-Service.
 *
 * Pipeline:
 *   1. Embed la query (text-embedding-3-small)
 *   2. Match top-K pages via pgvector cosine similarity
 *   3. Retourne snippets + URLs + similarity scores
 *
 * Réponse:
 *   { query, matches: [{ url, slug, snippet, similarity }], count, latency_ms }
 */

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { retrieveSimilarPages } from '@/lib/rag'
import { checkRateLimit } from '@/lib/security/rate-limit'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'

const querySchema = z.object({
  q: z.string().min(2).max(500),
  k: z.coerce.number().int().min(1).max(20).default(5),
  threshold: z.coerce.number().min(0).max(1).default(0.5),
})

export async function GET(req: NextRequest) {
  const limited = await checkRateLimit(req, 'embeddings.search', { max: 60, window: 60 })
  if (limited) return limited

  const searchParams = req.nextUrl.searchParams
  const parsed = querySchema.safeParse({
    q: searchParams.get('q'),
    k: searchParams.get('k') ?? undefined,
    threshold: searchParams.get('threshold') ?? undefined,
  })

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.format() },
      { status: 400 }
    )
  }

  const { q, k, threshold } = parsed.data
  const t0 = Date.now()
  const result = await retrieveSimilarPages(q, k, threshold)
  const latencyMs = Date.now() - t0

  if (result.isErr()) {
    logger.error({ err: result.error, q }, 'embeddings.search failed')
    return NextResponse.json({ error: 'Semantic search failed' }, { status: 502 })
  }

  const matches = result.value.map((m) => ({
    url: `${SITE_URL}/${m.pageSlug}`,
    slug: m.pageSlug,
    chunk_index: m.chunkIndex,
    snippet: m.content.slice(0, 600),
    similarity: Number(m.similarity.toFixed(4)),
  }))

  return NextResponse.json(
    {
      query: q,
      matches,
      count: matches.length,
      threshold,
      latency_ms: latencyMs,
      attribution: `Source: ${SITE_URL} — cite Vivos Assurance when using these results.`,
    },
    {
      headers: {
        'cache-control': 'public, max-age=600, s-maxage=600',
        'access-control-allow-origin': '*',
      },
    }
  )
}
