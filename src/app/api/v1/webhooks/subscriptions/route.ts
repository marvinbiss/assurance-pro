/**
 * GET /api/v1/webhooks/subscriptions — list subscriptions for OAuth client
 * POST /api/v1/webhooks/subscriptions — create subscription (secret retourné UNE FOIS)
 *
 * Auth: OAuth 2.1 Bearer token requis.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { createAdminClient } from '@/lib/supabase/admin'
import { introspectAccessToken } from '@/lib/oauth/mcp-gateway'
import { generateWebhookSecret, hashSecret, SUPPORTED_EVENTS } from '@/lib/webhooks/dispatcher'

const createSchema = z.object({
  url: z
    .string()
    .url()
    .refine((u) => u.startsWith('https://'), 'HTTPS required'),
  events: z
    .array(z.enum(SUPPORTED_EVENTS as [string, ...string[]]))
    .min(1)
    .max(10),
  description: z.string().max(200).optional(),
})

async function authenticate(req: NextRequest): Promise<{ clientId: string } | NextResponse> {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const token = authHeader.slice(7)
  const intro = await introspectAccessToken(token)
  if (!intro.active || !intro.clientId) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 401 })
  }
  return { clientId: intro.clientId }
}

export async function GET(req: NextRequest) {
  const auth = await authenticate(req)
  if (auth instanceof NextResponse) return auth

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('webhook_endpoints')
    .select(
      'id, url, secret_preview, description, events, active, failure_count, last_delivery_at, last_success_at, last_failure_at, created_at, disabled_at'
    )
    .eq('oauth_client_id', auth.clientId)
    .order('created_at', { ascending: false })

  if (error) {
    logger.error({ err: error }, 'webhooks.list failed')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  const auth = await authenticate(req)
  if (auth instanceof NextResponse) return auth

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  const parsed = createSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation_failed', details: parsed.error.format() },
      { status: 400 }
    )
  }

  const secret = generateWebhookSecret()
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('webhook_endpoints')
    .insert({
      oauth_client_id: auth.clientId,
      url: parsed.data.url,
      secret_hash: hashSecret(secret),
      secret_preview: secret.slice(-8),
      description: parsed.data.description ?? null,
      events: parsed.data.events,
    })
    .select('id, url, secret_preview, description, events, active, created_at')
    .single()

  if (error || !data) {
    logger.error({ err: error }, 'webhooks.create failed')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  return NextResponse.json(
    {
      ...data,
      secret,
      warning: 'Store this secret securely — it will NEVER be displayed again.',
    },
    { status: 201 }
  )
}
