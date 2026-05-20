/**
 * Webhooks dispatcher — HMAC signing + retry exponentiel.
 *
 * Pattern Stripe/GitHub:
 *   - Header X-Vivos-Signature: hmac_sha256(secret, payload_raw)
 *   - Header X-Vivos-Event: event type
 *   - Header X-Vivos-Delivery: UUID delivery
 *   - Header X-Vivos-Timestamp: unix epoch
 *   - Retry: 1m, 5m, 30m, 3h, 12h (5 essais max)
 *   - Timeout: 10s par tentative
 *   - Status 2xx = success, autre = failed
 */

import { createHash, createHmac, randomBytes } from 'node:crypto'
import { logger } from '@/lib/logger'
import { createAdminClient } from '@/lib/supabase/admin'
import { decryptSecret, encryptSecret } from '@/lib/crypto/envelope'

export type WebhookEvent =
  | 'agent_booking.created'
  | 'agent_booking.qualified'
  | 'agent_booking.won'
  | 'llm_citation.detected'
  | 'mcp.proof.signed'
  | 'test.ping'

export const SUPPORTED_EVENTS: WebhookEvent[] = [
  'agent_booking.created',
  'agent_booking.qualified',
  'agent_booking.won',
  'llm_citation.detected',
  'mcp.proof.signed',
  'test.ping',
]

const RETRY_DELAYS_MINUTES = [1, 5, 30, 180, 720]
const MAX_ATTEMPTS = RETRY_DELAYS_MINUTES.length
const TIMEOUT_MS = 10_000
const MAX_BODY_LOG_BYTES = 8 * 1024
const AUTO_DISABLE_FAILURE_THRESHOLD = 10

export function generateWebhookSecret(): string {
  return `whsec_${randomBytes(32).toString('base64url')}`
}

export function hashSecret(secret: string): string {
  return createHash('sha256').update(secret, 'utf8').digest('hex')
}

export function encryptWebhookSecret(secret: string): string {
  return encryptSecret(secret)
}

export function signPayload(secret: string, payload: string, timestamp: number): string {
  const signedString = `${timestamp}.${payload}`
  const hmac = createHmac('sha256', secret).update(signedString).digest('hex')
  return `t=${timestamp},v1=${hmac}`
}

export function verifySignature(
  secret: string,
  payload: string,
  signatureHeader: string,
  toleranceSec = 300
): boolean {
  const parts = Object.fromEntries(signatureHeader.split(',').map((p) => p.split('=')))
  const ts = Number(parts.t)
  const v1 = parts.v1
  if (!ts || !v1) return false
  if (Math.abs(Date.now() / 1000 - ts) > toleranceSec) return false
  const expected = createHmac('sha256', secret).update(`${ts}.${payload}`).digest('hex')
  return expected === v1
}

export interface EnqueueOptions {
  event: WebhookEvent
  payload: Record<string, unknown>
  /** Si non fourni, enqueue pour tous les endpoints actifs abonnés à l'event */
  endpointId?: string
}

export async function enqueueWebhookDeliveries(opts: EnqueueOptions): Promise<number> {
  const admin = createAdminClient()
  let query = admin
    .from('webhook_endpoints')
    .select('id, url, secret_hash, events')
    .eq('active', true)
    .contains('events', [opts.event])

  if (opts.endpointId) {
    query = query.eq('id', opts.endpointId)
  }

  const { data: endpoints, error } = await query
  if (error) {
    logger.error({ err: error, event: opts.event }, 'enqueueWebhookDeliveries: fetch failed')
    return 0
  }
  if (!endpoints || endpoints.length === 0) return 0

  const inserts = endpoints.map((ep) => ({
    endpoint_id: ep.id,
    event_type: opts.event,
    payload: opts.payload,
    status: 'pending',
    next_retry_at: new Date().toISOString(),
  }))
  const { error: insertErr } = await admin.from('webhook_deliveries').insert(inserts)
  if (insertErr) {
    logger.error({ err: insertErr }, 'enqueueWebhookDeliveries: insert failed')
    return 0
  }
  return endpoints.length
}

/**
 * Process pending webhook deliveries. Appelé par /api/cron/webhook-dispatcher.
 */
export async function processPendingDeliveries(maxBatch = 50): Promise<{
  processed: number
  success: number
  failed: number
  dead_letter: number
}> {
  const admin = createAdminClient()
  const now = new Date().toISOString()

  const { data: pending, error } = await admin
    .from('webhook_deliveries')
    .select(
      `id, endpoint_id, event_type, payload, attempts,
       webhook_endpoints!inner(url, secret_encrypted)`
    )
    .eq('status', 'pending')
    .lte('next_retry_at', now)
    .limit(maxBatch)

  if (error) {
    logger.error({ err: error }, 'processPendingDeliveries: fetch failed')
    return { processed: 0, success: 0, failed: 0, dead_letter: 0 }
  }
  if (!pending || pending.length === 0) {
    return { processed: 0, success: 0, failed: 0, dead_letter: 0 }
  }

  let success = 0
  let failed = 0
  let deadLetter = 0

  for (const row of pending as unknown as Array<{
    id: string
    endpoint_id: string
    event_type: string
    payload: Record<string, unknown>
    attempts: number
    webhook_endpoints: { url: string; secret_encrypted: string }
  }>) {
    const ep = row.webhook_endpoints
    if (!ep) continue

    // Decrypt secret at-rest (envelope AES-256-GCM) — receiver verifies with raw secret
    let realSecret: string
    try {
      realSecret = decryptSecret(ep.secret_encrypted)
    } catch (err) {
      logger.error(
        { err, delivery_id: row.id, endpoint_id: row.endpoint_id },
        'webhook: secret decryption failed — likely WEBHOOK_ENCRYPTION_KEY rotated'
      )
      await admin
        .from('webhook_deliveries')
        .update({
          status: 'dead_letter',
          error_message: 'secret_decryption_failed',
          delivered_at: null,
        })
        .eq('id', row.id)
      deadLetter++
      continue
    }
    const ts = Math.floor(Date.now() / 1000)
    const payloadRaw = JSON.stringify(row.payload)
    const sig = signPayload(realSecret, payloadRaw, ts)

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    let status = 0
    let bodyTruncated = ''
    let errorMessage: string | null = null
    try {
      const res = await fetch(ep.url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'user-agent': 'Vivos-Webhooks/1.0',
          'x-vivos-event': row.event_type,
          'x-vivos-delivery': row.id,
          'x-vivos-timestamp': String(ts),
          'x-vivos-signature': sig,
        },
        body: payloadRaw,
        signal: controller.signal,
      })
      status = res.status
      const text = await res.text()
      bodyTruncated = text.slice(0, MAX_BODY_LOG_BYTES)
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : String(err)
    } finally {
      clearTimeout(timer)
    }

    const isSuccess = status >= 200 && status < 300
    const nextAttempts = row.attempts + 1
    const isLastAttempt = nextAttempts >= MAX_ATTEMPTS
    const newStatus = isSuccess ? 'success' : isLastAttempt ? 'dead_letter' : 'pending'

    const nextRetryMinutes =
      !isSuccess && !isLastAttempt ? RETRY_DELAYS_MINUTES[nextAttempts] : null
    const nextRetryAt =
      nextRetryMinutes != null
        ? new Date(Date.now() + nextRetryMinutes * 60_000).toISOString()
        : null

    await admin
      .from('webhook_deliveries')
      .update({
        status: newStatus,
        attempts: nextAttempts,
        response_status: status || null,
        response_body: bodyTruncated || null,
        error_message: errorMessage,
        next_retry_at: nextRetryAt,
        delivered_at: isSuccess ? new Date().toISOString() : null,
      })
      .eq('id', row.id)

    if (isSuccess) {
      success++
      await admin
        .from('webhook_endpoints')
        .update({
          last_delivery_at: new Date().toISOString(),
          last_success_at: new Date().toISOString(),
          failure_count: 0,
        })
        .eq('id', row.endpoint_id)
    } else if (isLastAttempt) {
      deadLetter++
      // Increment failure count + auto-disable if threshold
      const { data: endpoint } = await admin
        .from('webhook_endpoints')
        .select('failure_count')
        .eq('id', row.endpoint_id)
        .single()
      const newFailureCount = (endpoint?.failure_count ?? 0) + 1
      const shouldDisable = newFailureCount >= AUTO_DISABLE_FAILURE_THRESHOLD
      await admin
        .from('webhook_endpoints')
        .update({
          last_delivery_at: new Date().toISOString(),
          last_failure_at: new Date().toISOString(),
          failure_count: newFailureCount,
          ...(shouldDisable && { active: false, disabled_at: new Date().toISOString() }),
        })
        .eq('id', row.endpoint_id)
    } else {
      failed++
      await admin
        .from('webhook_endpoints')
        .update({
          last_delivery_at: new Date().toISOString(),
          last_failure_at: new Date().toISOString(),
        })
        .eq('id', row.endpoint_id)
    }
  }

  return { processed: pending.length, success, failed, dead_letter: deadLetter }
}
