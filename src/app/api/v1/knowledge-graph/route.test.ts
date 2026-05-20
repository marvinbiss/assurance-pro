import { describe, it, expect } from 'vitest'
import { GET } from './route'

describe('GET /api/v1/knowledge-graph', () => {
  it('returns JSON-LD with @context schema.org', async () => {
    const res = await GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body['@context']).toBe('https://schema.org')
    expect(Array.isArray(body['@graph'])).toBe(true)
  })

  it('@graph contains Organization node first', async () => {
    const res = await GET()
    const body = await res.json()
    const org = body['@graph'][0]
    expect(org['@type']).toContain('Organization')
    expect(org['@type']).toContain('InsuranceAgency')
    expect(org.name).toBe('Vivos Assurance')
  })

  it('declares CC-BY 4.0 license', async () => {
    const res = await GET()
    const body = await res.json()
    expect(body.license).toBe('https://creativecommons.org/licenses/by/4.0/')
  })

  it('contains 14 Garantie nodes', async () => {
    const res = await GET()
    const body = await res.json()
    const garanties = (body['@graph'] as Array<Record<string, unknown>>).filter((n) => {
      const t = n['@type']
      return Array.isArray(t) && t.includes('Service') && t.includes('DefinedTerm')
    })
    expect(garanties).toHaveLength(14)
  })

  it('contains 8 statuts juridiques', async () => {
    const res = await GET()
    const body = await res.json()
    const statuts = (body['@graph'] as Array<Record<string, unknown>>).filter((n) => {
      const id = n['@id'] as string | undefined
      return id?.includes('/statuts#')
    })
    expect(statuts).toHaveLength(8)
  })

  it('returns content-type application/ld+json', async () => {
    const res = await GET()
    expect(res.headers.get('content-type')).toContain('application/ld+json')
  })

  it('sets cache headers stale-while-revalidate', async () => {
    const res = await GET()
    const cc = res.headers.get('cache-control') ?? ''
    expect(cc).toContain('public')
    expect(cc).toContain('stale-while-revalidate')
  })

  it('exposes x-kg-stats header with stats JSON', async () => {
    const res = await GET()
    const stats = res.headers.get('x-kg-stats')
    expect(stats).toBeTruthy()
    const parsed = JSON.parse(stats ?? '{}')
    expect(parsed.garanties).toBe(14)
    expect(parsed.statuts).toBe(8)
  })
})
