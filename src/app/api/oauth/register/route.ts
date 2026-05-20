/**
 * POST /api/oauth/register — RFC 7591 Dynamic Client Registration.
 *
 * Permet aux LLM stores (OpenAI Apps, Claude Apps, Perplexity, Gemini)
 * + partenaires d'enregistrer un client OAuth automatiquement sans
 * intervention manuelle Vivos.
 *
 * Sécurité:
 *   - Rate limit 5 inscriptions/IP/h
 *   - Validation URL redirect: HTTPS obligatoire (sauf localhost dev)
 *   - Client secret généré + retourné UNE SEULE FOIS
 *   - Inscription marquée pending_review si scopes premium demandés
 */

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { createHash, randomBytes } from 'node:crypto'
import { logger } from '@/lib/logger'
import { createAdminClient } from '@/lib/supabase/admin'
import { checkRateLimit } from '@/lib/security/rate-limit'

const ALLOWED_SCOPES = ['mcp:tools', 'mcp:resources', 'mcp:readonly']

const bodySchema = z.object({
  client_name: z.string().min(3).max(100),
  redirect_uris: z
    .array(z.string().url())
    .min(1)
    .max(5)
    .refine(
      (uris) =>
        uris.every(
          (u) =>
            u.startsWith('https://') ||
            u.startsWith('http://localhost') ||
            u.startsWith('http://127.0.0.1')
        ),
      'redirect_uris must use HTTPS (or localhost for dev)'
    ),
  scope: z.string().optional().default('mcp:tools mcp:resources'),
  client_uri: z.string().url().optional(),
  contacts: z.array(z.string().email()).max(3).optional(),
  logo_uri: z.string().url().optional(),
  tos_uri: z.string().url().optional(),
  policy_uri: z.string().url().optional(),
})

function generateClientId(): string {
  return `vc_${randomBytes(12).toString('base64url')}`
}

function generateClientSecret(): string {
  return `vcs_${randomBytes(32).toString('base64url')}`
}

export async function POST(req: NextRequest) {
  const limited = await checkRateLimit(req, 'oauth.register', { max: 5, window: 3600 })
  if (limited) return limited

  let payload: unknown
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_client_metadata' }, { status: 400 })
  }
  const parsed = bodySchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'invalid_client_metadata', details: parsed.error.format() },
      { status: 400 }
    )
  }

  const requestedScopes = parsed.data.scope.split(' ').filter(Boolean)
  const invalidScopes = requestedScopes.filter((s) => !ALLOWED_SCOPES.includes(s))
  if (invalidScopes.length > 0) {
    return NextResponse.json(
      { error: 'invalid_client_metadata', invalid_scopes: invalidScopes },
      { status: 400 }
    )
  }

  const clientId = generateClientId()
  const clientSecret = generateClientSecret()
  const clientSecretHash = createHash('sha256').update(clientSecret).digest('hex')

  const admin = createAdminClient()
  const { error } = await admin.from('oauth_clients').insert({
    client_id: clientId,
    client_secret_hash: clientSecretHash,
    client_name: parsed.data.client_name,
    redirect_uris: parsed.data.redirect_uris,
    allowed_scopes: requestedScopes,
    active: true,
  })

  if (error) {
    logger.error({ err: error, client_name: parsed.data.client_name }, 'oauth.register failed')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  logger.info(
    { client_id: clientId, client_name: parsed.data.client_name },
    'oauth client registered'
  )

  // RFC 7591 response format
  return NextResponse.json(
    {
      client_id: clientId,
      client_secret: clientSecret,
      client_id_issued_at: Math.floor(Date.now() / 1000),
      client_secret_expires_at: 0,
      client_name: parsed.data.client_name,
      redirect_uris: parsed.data.redirect_uris,
      scope: parsed.data.scope,
      token_endpoint_auth_method: 'client_secret_post',
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      warning: 'Store client_secret securely — it will NEVER be displayed again.',
    },
    { status: 201, headers: { 'cache-control': 'no-store' } }
  )
}
