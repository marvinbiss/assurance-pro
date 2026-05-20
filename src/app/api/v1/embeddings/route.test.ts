import { describe, it, expect, vi, beforeEach } from 'vitest'

const fakeEmbedding = new Array(1536).fill(0.001)

vi.mock('@/lib/rag', () => ({
  embedQuery: vi.fn().mockResolvedValue({
    isOk: () => true,
    isErr: () => false,
    value: fakeEmbedding,
  }),
}))

vi.mock('@/lib/security/rate-limit', () => ({
  checkRateLimit: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/logger', () => ({
  logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}))

const { POST, GET } = await import('./route')

function makeRequest(body: unknown): Request {
  return new Request('http://localhost/api/v1/embeddings', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/v1/embeddings (OpenAI-compatible)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('accepte string input → retourne format OpenAI', async () => {
    const res = await POST(makeRequest({ input: 'assurance décennale plombier' }) as never)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.object).toBe('list')
    expect(body.data).toHaveLength(1)
    expect(body.data[0].embedding).toHaveLength(1536)
    expect(body.model).toBe('text-embedding-3-small')
  })

  it('accepte array input batch', async () => {
    const res = await POST(makeRequest({ input: ['rc pro freelance', 'cyber pme'] }) as never)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.data).toHaveLength(2)
    expect(body.data[0].index).toBe(0)
    expect(body.data[1].index).toBe(1)
  })

  it('rejette array > 10 items (400)', async () => {
    const res = await POST(makeRequest({ input: Array(11).fill('x') }) as never)
    expect(res.status).toBe(400)
  })

  it('rejette string > 8000 chars (400)', async () => {
    const res = await POST(makeRequest({ input: 'x'.repeat(8001) }) as never)
    expect(res.status).toBe(400)
  })

  it('rejette body sans input (400)', async () => {
    const res = await POST(makeRequest({}) as never)
    expect(res.status).toBe(400)
  })

  it('rejette JSON malformé (400)', async () => {
    const req = new Request('http://localhost/api/v1/embeddings', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: 'garbage{',
    })
    const res = await POST(req as never)
    expect(res.status).toBe(400)
  })

  it('renvoie 502 si embedding fails', async () => {
    const { embedQuery } = await import('@/lib/rag')
    vi.mocked(embedQuery).mockResolvedValueOnce({
      isOk: () => false,
      isErr: () => true,
      error: { kind: 'external' } as never,
    } as never)
    const res = await POST(makeRequest({ input: 'test' }) as never)
    expect(res.status).toBe(502)
  })

  it('respect rate limit (429)', async () => {
    const { checkRateLimit } = await import('@/lib/security/rate-limit')
    const { NextResponse } = await import('next/server')
    vi.mocked(checkRateLimit).mockResolvedValueOnce(
      NextResponse.json({ error: 'rate_limit_exceeded' }, { status: 429 })
    )
    const res = await POST(makeRequest({ input: 'test' }) as never)
    expect(res.status).toBe(429)
  })

  it('GET retourne documentation', async () => {
    const res = GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.endpoint).toBe('/api/v1/embeddings')
    expect(body.semantic_search).toContain('/api/v1/embeddings/search')
  })

  it('cache-control: private, no-store sur POST', async () => {
    const res = await POST(makeRequest({ input: 'test' }) as never)
    expect(res.headers.get('cache-control')).toContain('no-store')
  })
})
