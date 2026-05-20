/**
 * OAuth 2.1 (PKCE) gateway pour MCP server.
 *
 * Flow:
 *   1. Client GET /.well-known/oauth-authorization-server → metadata
 *   2. Client GET /api/oauth/authorize?response_type=code&client_id=...&code_challenge=...&...
 *   3. User accepte (UI minimaliste) → POST /api/oauth/grant → 302 redirect avec code
 *   4. Client POST /api/oauth/token (grant_type=authorization_code + code_verifier)
 *      → returns access_token + refresh_token
 *   5. Client utilise access_token dans Authorization: Bearer header sur /api/mcp
 *
 * Compliance: RFC 6749 + RFC 7636 (PKCE S256) + RFC 8414 (metadata).
 */

import { createHash, randomBytes, timingSafeEqual } from 'node:crypto'
import { createAdminClient } from '@/lib/supabase/admin'

const TOKEN_LENGTH_BYTES = 32

export interface AuthorizationCodeParams {
  clientId: string
  redirectUri: string
  scope: string
  codeChallenge: string
  codeChallengeMethod: 'S256'
  userPseudoId: string
}

export interface IssuedTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: 'Bearer'
  scope: string
}

export function hashSha256(input: string): string {
  return createHash('sha256').update(input, 'utf8').digest('hex')
}

export function generateRandomToken(): string {
  return randomBytes(TOKEN_LENGTH_BYTES).toString('base64url')
}

export function verifyPkceS256(codeVerifier: string, codeChallenge: string): boolean {
  const expected = createHash('sha256').update(codeVerifier, 'ascii').digest('base64url')
  if (expected.length !== codeChallenge.length) return false
  return timingSafeEqual(Buffer.from(expected), Buffer.from(codeChallenge))
}

export async function getActiveClient(clientId: string) {
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('oauth_clients')
    .select('client_id, client_name, client_secret_hash, redirect_uris, allowed_scopes, active')
    .eq('client_id', clientId)
    .eq('active', true)
    .maybeSingle()
  if (error || !data) return null
  return data
}

export async function createAuthorizationCode(
  params: AuthorizationCodeParams
): Promise<string | null> {
  const admin = createAdminClient()
  const code = generateRandomToken()
  const { error } = await admin.from('oauth_authorization_codes').insert({
    code,
    client_id: params.clientId,
    redirect_uri: params.redirectUri,
    scope: params.scope,
    code_challenge: params.codeChallenge,
    code_challenge_method: params.codeChallengeMethod,
    user_pseudo_id: params.userPseudoId,
  })
  if (error) return null
  return code
}

export async function exchangeCodeForTokens(
  code: string,
  clientId: string,
  redirectUri: string,
  codeVerifier: string
): Promise<IssuedTokens | { error: string }> {
  const admin = createAdminClient()
  const { data: authCode, error: fetchErr } = await admin
    .from('oauth_authorization_codes')
    .select(
      'client_id, redirect_uri, scope, code_challenge, code_challenge_method, user_pseudo_id, expires_at, used'
    )
    .eq('code', code)
    .maybeSingle()

  if (fetchErr || !authCode) return { error: 'invalid_grant' }
  if (authCode.used) return { error: 'invalid_grant' }
  if (new Date(authCode.expires_at).getTime() < Date.now()) return { error: 'invalid_grant' }
  if (authCode.client_id !== clientId) return { error: 'invalid_grant' }
  if (authCode.redirect_uri !== redirectUri) return { error: 'invalid_grant' }
  if (!verifyPkceS256(codeVerifier, authCode.code_challenge)) return { error: 'invalid_grant' }

  // Mark code used (one-time)
  await admin.from('oauth_authorization_codes').update({ used: true }).eq('code', code)

  const accessToken = generateRandomToken()
  const refreshToken = generateRandomToken()
  const { error: insertErr } = await admin.from('oauth_tokens').insert({
    access_token_hash: hashSha256(accessToken),
    refresh_token_hash: hashSha256(refreshToken),
    client_id: clientId,
    user_pseudo_id: authCode.user_pseudo_id,
    scope: authCode.scope,
  })
  if (insertErr) return { error: 'server_error' }

  return {
    accessToken,
    refreshToken,
    expiresIn: 3600,
    tokenType: 'Bearer',
    scope: authCode.scope,
  }
}

export async function refreshAccessToken(
  refreshToken: string,
  clientId: string
): Promise<IssuedTokens | { error: string }> {
  const admin = createAdminClient()
  const refreshHash = hashSha256(refreshToken)
  const { data: tok, error } = await admin
    .from('oauth_tokens')
    .select('client_id, user_pseudo_id, scope, refresh_expires_at, revoked')
    .eq('refresh_token_hash', refreshHash)
    .maybeSingle()

  if (error || !tok) return { error: 'invalid_grant' }
  if (tok.revoked) return { error: 'invalid_grant' }
  if (tok.client_id !== clientId) return { error: 'invalid_grant' }
  if (new Date(tok.refresh_expires_at).getTime() < Date.now()) return { error: 'invalid_grant' }

  // Revoke old token + issue new
  await admin
    .from('oauth_tokens')
    .update({ revoked: true, revoked_at: new Date().toISOString() })
    .eq('refresh_token_hash', refreshHash)

  const newAccess = generateRandomToken()
  const newRefresh = generateRandomToken()
  await admin.from('oauth_tokens').insert({
    access_token_hash: hashSha256(newAccess),
    refresh_token_hash: hashSha256(newRefresh),
    client_id: clientId,
    user_pseudo_id: tok.user_pseudo_id,
    scope: tok.scope,
  })

  return {
    accessToken: newAccess,
    refreshToken: newRefresh,
    expiresIn: 3600,
    tokenType: 'Bearer',
    scope: tok.scope,
  }
}

export async function introspectAccessToken(accessToken: string): Promise<{
  active: boolean
  clientId?: string
  scope?: string
  userPseudoId?: string
  exp?: number
}> {
  const admin = createAdminClient()
  const hash = hashSha256(accessToken)
  const { data, error } = await admin
    .from('oauth_tokens')
    .select('client_id, scope, user_pseudo_id, access_expires_at, revoked')
    .eq('access_token_hash', hash)
    .maybeSingle()

  if (error || !data) return { active: false }
  if (data.revoked) return { active: false }
  const exp = new Date(data.access_expires_at).getTime() / 1000
  if (exp < Date.now() / 1000) return { active: false }

  // Best-effort last_used_at update (non-blocking)
  void admin
    .from('oauth_tokens')
    .update({ last_used_at: new Date().toISOString() })
    .eq('access_token_hash', hash)
    .then(() => undefined)

  return {
    active: true,
    clientId: data.client_id,
    scope: data.scope,
    userPseudoId: data.user_pseudo_id,
    exp: Math.floor(exp),
  }
}
