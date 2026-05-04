/**
 * withApiObservability — Wrapper pour route handlers
 *
 * Ajoute automatiquement :
 * - Request ID (corrélation logs)
 * - Timing (durée requête)
 * - Logging entrée/sortie structuré
 * - Capture exception Sentry avec contexte
 * - Header X-Request-Id en réponse
 *
 * Usage :
 *   export const POST = withApiObservability(async (req, ctx) => {
 *     // ... votre handler
 *     return NextResponse.json({ ok: true })
 *   }, { route: '/api/contact', method: 'POST' })
 */

import { NextResponse } from 'next/server'
import { logger } from '@/lib/logger'
import { getOrCreateRequestId, REQUEST_ID_HEADER_KEY } from './request-id'

export interface ApiObservabilityOptions {
  route: string
  method: string
}

export interface ApiContext {
  requestId: string
  startedAt: number
}

type ApiHandler = (request: Request, ctx: ApiContext) => Promise<Response>

export function withApiObservability(handler: ApiHandler, opts: ApiObservabilityOptions) {
  return async (request: Request): Promise<Response> => {
    const requestId = getOrCreateRequestId(request.headers)
    const startedAt = Date.now()
    const log = logger.child({ requestId, route: opts.route, method: opts.method })

    log.info('API request received')

    try {
      const response = await handler(request, { requestId, startedAt })
      const duration = Date.now() - startedAt

      log.info('API request completed', { status: response.status, duration_ms: duration })

      /* Attache request ID en header pour debug client-side */
      const headers = new Headers(response.headers)
      headers.set(REQUEST_ID_HEADER_KEY, requestId)
      headers.set('x-response-time-ms', String(duration))

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      })
    } catch (err) {
      const duration = Date.now() - startedAt
      log.error('API request failed', err, { duration_ms: duration })

      /* Capture Sentry si dispo */
      try {
        const Sentry = await import('@sentry/nextjs')
        Sentry.captureException(err, {
          tags: { route: opts.route, method: opts.method, request_id: requestId },
          contexts: { request: { duration_ms: duration } },
        })
      } catch {
        /* Sentry no-op si pas configuré */
      }

      return NextResponse.json(
        { error: 'Erreur serveur', request_id: requestId },
        { status: 500, headers: { [REQUEST_ID_HEADER_KEY]: requestId } }
      )
    }
  }
}
