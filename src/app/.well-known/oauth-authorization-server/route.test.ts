import { describe, it, expect } from 'vitest'
import { GET } from './route'

describe('GET /.well-known/oauth-authorization-server (RFC 8414)', () => {
  it('returns OAuth metadata with all required RFC 8414 fields', () => {
    const res = GET()
    expect(res.status).toBe(200)
  })

  it('declares issuer URL', async () => {
    const res = GET()
    const body = await res.json()
    expect(body.issuer).toBeDefined()
    expect(body.issuer).toMatch(/^https?:\/\//)
  })

  it('declares authorize, token, introspection, registration endpoints', async () => {
    const res = GET()
    const body = await res.json()
    expect(body.authorization_endpoint).toContain('/api/oauth/authorize')
    expect(body.token_endpoint).toContain('/api/oauth/token')
    expect(body.introspection_endpoint).toContain('/api/oauth/introspect')
    expect(body.registration_endpoint).toContain('/api/oauth/register')
  })

  it('only supports S256 code challenge (no plain)', async () => {
    const res = GET()
    const body = await res.json()
    expect(body.code_challenge_methods_supported).toEqual(['S256'])
  })

  it('supports authorization_code + refresh_token grants', async () => {
    const res = GET()
    const body = await res.json()
    expect(body.grant_types_supported).toContain('authorization_code')
    expect(body.grant_types_supported).toContain('refresh_token')
  })

  it('declares MCP scopes', async () => {
    const res = GET()
    const body = await res.json()
    expect(body.scopes_supported).toContain('mcp:tools')
    expect(body.scopes_supported).toContain('mcp:resources')
  })

  it('returns CORS allow-origin: *', () => {
    const res = GET()
    expect(res.headers.get('access-control-allow-origin')).toBe('*')
  })
})
