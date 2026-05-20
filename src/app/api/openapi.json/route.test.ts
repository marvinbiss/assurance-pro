import { describe, it, expect } from 'vitest'
import { GET } from './route'

describe('GET /api/openapi.json', () => {
  it('returns valid OpenAPI 3.1 spec', async () => {
    const res = GET()
    expect(res.status).toBe(200)
    const ct = res.headers.get('content-type') ?? ''
    expect(ct).toContain('application/json')
    const body = await res.json()
    expect(body.openapi).toBe('3.1.0')
    expect(body.info.title).toBe('Vivos Assurance Public API')
  })

  it('declares 6 tags', async () => {
    const res = GET()
    const body = await res.json()
    expect(body.tags).toHaveLength(6)
  })

  it('returns CORS allow-origin: *', async () => {
    const res = GET()
    expect(res.headers.get('access-control-allow-origin')).toBe('*')
  })

  it('sets edge cache headers', async () => {
    const res = GET()
    const cc = res.headers.get('cache-control') ?? ''
    expect(cc).toContain('public')
    expect(cc).toContain('max-age=3600')
  })
})
