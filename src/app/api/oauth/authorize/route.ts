/**
 * GET /api/oauth/authorize
 *
 * Flow PKCE step 2: client redirect user here.
 * Pour MVP: auto-grant (pas de UI consent) — adapter à un écran UI quand prod.
 *
 * Params requis: response_type=code, client_id, redirect_uri, scope, code_challenge,
 * code_challenge_method=S256, state.
 */

import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import {
  createAuthorizationCode,
  getActiveClient,
  generateRandomToken,
} from '@/lib/oauth/mcp-gateway'

const querySchema = z.object({
  response_type: z.literal('code'),
  client_id: z.string().min(8).max(128),
  redirect_uri: z.string().url(),
  scope: z.string().default('mcp:tools mcp:resources'),
  code_challenge: z.string().min(43).max(128),
  code_challenge_method: z.literal('S256'),
  state: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const params = querySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams))
  if (!params.success) {
    return NextResponse.json(
      { error: 'invalid_request', details: params.error.format() },
      { status: 400 }
    )
  }

  const client = await getActiveClient(params.data.client_id)
  if (!client) {
    return NextResponse.json({ error: 'unauthorized_client' }, { status: 401 })
  }
  if (!client.redirect_uris.includes(params.data.redirect_uri)) {
    return NextResponse.json({ error: 'invalid_redirect_uri' }, { status: 400 })
  }
  const requestedScopes = params.data.scope.split(' ')
  const allowed = requestedScopes.every((s) => client.allowed_scopes.includes(s))
  if (!allowed) {
    return NextResponse.json({ error: 'invalid_scope' }, { status: 400 })
  }

  // MVP: auto-grant. Production: rediriger vers UI consent + form POST /api/oauth/grant
  const userPseudoId = `mcp_user_${generateRandomToken().slice(0, 16)}`
  const code = await createAuthorizationCode({
    clientId: params.data.client_id,
    redirectUri: params.data.redirect_uri,
    scope: params.data.scope,
    codeChallenge: params.data.code_challenge,
    codeChallengeMethod: 'S256',
    userPseudoId,
  })

  if (!code) {
    logger.error({ client_id: params.data.client_id }, 'oauth.authorize: code creation failed')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  const redirect = new URL(params.data.redirect_uri)
  redirect.searchParams.set('code', code)
  if (params.data.state) redirect.searchParams.set('state', params.data.state)

  return NextResponse.redirect(redirect.toString(), 302)
}
