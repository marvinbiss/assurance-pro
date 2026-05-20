import { describe, it, expect } from 'vitest'
import { buildOpenAPISpec } from './spec'

describe('OpenAPI 3.1 spec', () => {
  const spec = buildOpenAPISpec()

  it('declares openapi 3.1.0', () => {
    expect(spec.openapi).toBe('3.1.0')
  })

  it('has info with title + version + contact', () => {
    const info = spec.info as Record<string, unknown>
    expect(info.title).toBe('Vivos Assurance Public API')
    expect(info.version).toBeDefined()
    expect(info.contact).toBeDefined()
  })

  it('declares production server first', () => {
    expect(spec.servers[0]?.description).toBe('Production')
  })

  it('declares 6 tags covering all features', () => {
    const tagNames = spec.tags.map((t) => t.name)
    expect(tagNames).toContain('Embeddings')
    expect(tagNames).toContain('Knowledge Graph')
    expect(tagNames).toContain('Agents')
    expect(tagNames).toContain('OAuth')
    expect(tagNames).toContain('MCP')
    expect(tagNames).toContain('Webhooks')
  })

  it('declares BearerAuth + ApiKeyAuth security schemes', () => {
    const components = spec.components as { securitySchemes: Record<string, unknown> }
    expect(components.securitySchemes.BearerAuth).toBeDefined()
    expect(components.securitySchemes.ApiKeyAuth).toBeDefined()
  })

  it('declares core paths', () => {
    const expectedPaths = [
      '/api/v1/embeddings',
      '/api/v1/embeddings/search',
      '/api/v1/knowledge-graph',
      '/api/v1/agents/booking',
      '/api/v1/webhooks/subscriptions',
      '/api/mcp',
      '/.well-known/oauth-authorization-server',
      '/api/oauth/authorize',
      '/api/oauth/token',
      '/api/oauth/introspect',
    ]
    for (const p of expectedPaths) {
      expect(spec.paths[p], `path ${p} missing`).toBeDefined()
    }
  })

  it('Garantie schema enumerates 14 verticales', () => {
    const components = spec.components as { schemas: { Garantie: { enum: string[] } } }
    expect(components.schemas.Garantie.enum.length).toBe(14)
    expect(components.schemas.Garantie.enum).toContain('decennale')
    expect(components.schemas.Garantie.enum).toContain('cyber')
  })

  it('BookingRequest requires email + garantie + consent fields', () => {
    const components = spec.components as { schemas: { BookingRequest: { required: string[] } } }
    expect(components.schemas.BookingRequest.required).toContain('email')
    expect(components.schemas.BookingRequest.required).toContain('garantie')
    expect(components.schemas.BookingRequest.required).toContain('consent_at')
    expect(components.schemas.BookingRequest.required).toContain('consent_text')
  })
})
