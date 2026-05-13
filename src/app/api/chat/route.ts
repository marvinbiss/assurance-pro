/**
 * RAG Chatbot — streaming endpoint.
 *
 * POST /api/chat
 * Body : { question: string, history?: ChatMessage[] }
 * Returns: text/event-stream (Server-Sent Events) avec deltas
 *
 * Rate limit : 10 req / IP / minute (lib/rate-limiter).
 * No PII : pas de stockage question/réponse en base.
 */

import { type NextRequest } from 'next/server'
import { z } from 'zod'
import { streamChatCompletion, type ChatMessage } from '@/lib/rag'
import { checkRateLimit, getRateLimitKey, getClientIp } from '@/lib/rate-limiter'
import { logger } from '@/lib/logger'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BodySchema = z.object({
  question: z.string().trim().min(2).max(500),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().min(1).max(2000),
      })
    )
    .max(10)
    .optional()
    .default([]),
})

export async function POST(req: NextRequest) {
  // ── Rate limiting (10 req/min/IP) ─────────────────────────────────────────
  const ip = getClientIp(req.headers)
  const rlKey = getRateLimitKey(ip, '/api/chat')
  const rl = await checkRateLimit(rlKey, { max: 10, window: 60_000 })
  if (!rl.allowed) {
    return Response.json(
      { error: 'rate_limited', retryAfterMs: rl.resetTime - Date.now() },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rl.resetTime - Date.now()) / 1000)),
        },
      }
    )
  }

  // ── Body validation ───────────────────────────────────────────────────────
  let parsed: z.infer<typeof BodySchema>
  try {
    const json = await req.json()
    parsed = BodySchema.parse(json)
  } catch (e) {
    return Response.json({ error: 'invalid_body', detail: String(e) }, { status: 400 })
  }

  const { question, history } = parsed

  logger.info('[chat] question received', {
    questionLength: question.length,
    historyLength: history.length,
    ip,
  })

  // ── Stream SSE response ───────────────────────────────────────────────────
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const delta of streamChatCompletion(question, history as ChatMessage[])) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`))
        }
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`))
        controller.close()
      } catch (e) {
        logger.error('[chat] stream error', { error: String(e) })
        // Émet d'abord un événement error explicite (client peut le détecter)
        // puis ferme le stream avec error() pour propager côté reader.
        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'stream_failed' })}\n\n`)
          )
        } catch {
          /* controller already errored — propagate */
        }
        controller.error(e instanceof Error ? e : new Error('stream_failed'))
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
