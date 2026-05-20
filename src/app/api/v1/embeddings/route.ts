/**
 * POST /api/v1/embeddings — OpenAI-compatible embeddings endpoint.
 *
 * Public endpoint pour agents IA externes voulant générer un embedding
 * compatible avec notre index page_embeddings (1536-dim text-embedding-3-small).
 *
 * Rate limit: 30 req/min/IP (anti-abuse).
 *
 * Format réponse OpenAI-compatible:
 *   { object: 'list', data: [{ object: 'embedding', embedding: [...], index: 0 }],
 *     model: 'text-embedding-3-small', usage: { prompt_tokens, total_tokens } }
 *
 * Pour recherche sémantique sur notre corpus: GET /api/v1/embeddings/search
 */

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { embedQuery } from '@/lib/rag'
import { checkRateLimit } from '@/lib/security/rate-limit'

const bodySchema = z.object({
  input: z.union([z.string().min(1).max(8000), z.array(z.string().min(1).max(8000)).max(10)]),
  model: z.string().optional().default('text-embedding-3-small'),
})

export async function POST(req: NextRequest) {
  const limited = await checkRateLimit(req, 'embeddings.post', { max: 30, window: 60 })
  if (limited) return limited

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.format() },
      { status: 400 }
    )
  }

  const inputs = Array.isArray(parsed.data.input) ? parsed.data.input : [parsed.data.input]
  const data: Array<{ object: string; embedding: number[]; index: number }> = []
  let totalTokens = 0

  for (let i = 0; i < inputs.length; i++) {
    const text = inputs[i]!
    const result = await embedQuery(text)
    if (result.isErr()) {
      logger.error({ err: result.error }, 'embeddings: embedQuery failed')
      return NextResponse.json({ error: 'Embedding generation failed' }, { status: 502 })
    }
    data.push({ object: 'embedding', embedding: result.value, index: i })
    totalTokens += Math.ceil(text.length / 4)
  }

  return NextResponse.json(
    {
      object: 'list',
      data,
      model: 'text-embedding-3-small',
      usage: { prompt_tokens: totalTokens, total_tokens: totalTokens },
    },
    {
      headers: {
        'cache-control': 'private, no-store',
        'access-control-allow-origin': '*',
      },
    }
  )
}

export function GET() {
  return NextResponse.json(
    {
      endpoint: '/api/v1/embeddings',
      method: 'POST',
      description: 'OpenAI-compatible embeddings (1536-dim text-embedding-3-small)',
      body: { input: 'string OR string[]', model: 'optional, default text-embedding-3-small' },
      example: { input: 'assurance décennale plombier' },
      semantic_search: '/api/v1/embeddings/search?q=...',
      docs: 'https://vivos-assurance.fr/llms.txt',
    },
    { headers: { 'cache-control': 'public, max-age=3600' } }
  )
}
