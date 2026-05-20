/**
 * GET /.well-known/oauth-authorization-server — RFC 8414 metadata.
 *
 * Permet aux clients OAuth (OpenAI Apps, Claude Apps Store, etc.) de découvrir
 * automatiquement les endpoints du gateway Vivos.
 */

import { NextResponse } from 'next/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'

export function GET() {
  return NextResponse.json(
    {
      issuer: SITE_URL,
      authorization_endpoint: `${SITE_URL}/api/oauth/authorize`,
      token_endpoint: `${SITE_URL}/api/oauth/token`,
      introspection_endpoint: `${SITE_URL}/api/oauth/introspect`,
      registration_endpoint: `${SITE_URL}/api/oauth/register`,
      response_types_supported: ['code'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
      code_challenge_methods_supported: ['S256'],
      token_endpoint_auth_methods_supported: ['client_secret_post', 'client_secret_basic'],
      scopes_supported: ['mcp:tools', 'mcp:resources', 'mcp:readonly'],
      service_documentation: `${SITE_URL}/llms-full.txt`,
      ui_locales_supported: ['fr-FR'],
      op_policy_uri: `${SITE_URL}/confidentialite`,
      op_tos_uri: `${SITE_URL}/cgv`,
    },
    {
      headers: {
        'cache-control': 'public, max-age=86400',
        'access-control-allow-origin': '*',
      },
    }
  )
}
