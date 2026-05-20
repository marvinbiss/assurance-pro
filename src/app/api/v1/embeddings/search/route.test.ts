import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/rag', () => ({
  retrieveSimilarPages: vi.fn().mockResolvedValue({
    isOk: () => true,
    isErr: () => false,
    value: [
      {
        pageSlug: 'assurance-rc-pro',
        chunkIndex: 0,
        content: 'Snippet RC Pro...',
        similarity: 0.92,
      },
      {
        pageSlug: 'assurance-decennale',
        chunkIndex: 0,
        content: 'Snippet décennale...',
        similarity: 0.87,
      },
    ],
  }),
}))

vi.mock('@/lib/security/rate-limit', () => ({
  checkRateLimit: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/logger', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() },
}))

const { GET } = await import('./route')

function makeRequest(qs: string): import('next/server').NextRequest {
  return {
    nextUrl: { searchParams: new URLSearchParams(qs) },
    headers: new Headers(),
  } as never
}

describe('GET /api/v1/embeddings/search', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('retourne matches triés avec snippets', async () => {
    const res = await GET(makeRequest('q=assurance%20decennale&k=5'))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.query).toBe('assurance decennale')
    expect(body.matches).toHaveLength(2)
    expect(body.matches[0].similarity).toBe(0.92)
    expect(body.matches[0].url).toContain('/assurance-rc-pro')
  })

  it('rejette q trop court (< 2 chars)', async () => {
    const res = await GET(makeRequest('q=a'))
    expect(res.status).toBe(400)
  })

  it('rejette q manquant (400)', async () => {
    const res = await GET(makeRequest(''))
    expect(res.status).toBe(400)
  })

  it('rejette k > 20 (400)', async () => {
    const res = await GET(makeRequest('q=test&k=50'))
    expect(res.status).toBe(400)
  })

  it('rejette threshold > 1 (400)', async () => {
    const res = await GET(makeRequest('q=test&threshold=2'))
    expect(res.status).toBe(400)
  })

  it('renvoie 502 si retrieveSimilarPages fails', async () => {
    const { retrieveSimilarPages } = await import('@/lib/rag')
    vi.mocked(retrieveSimilarPages).mockResolvedValueOnce({
      isOk: () => false,
      isErr: () => true,
      error: { kind: 'external' } as never,
    } as never)
    const res = await GET(makeRequest('q=test'))
    expect(res.status).toBe(502)
  })

  it('inclut attribution dans réponse', async () => {
    const res = await GET(makeRequest('q=test'))
    const body = await res.json()
    expect(body.attribution).toContain('Vivos Assurance')
  })

  it('sets edge cache headers', async () => {
    const res = await GET(makeRequest('q=test'))
    const cc = res.headers.get('cache-control') ?? ''
    expect(cc).toContain('public')
  })

  it('CORS allow-origin *', async () => {
    const res = await GET(makeRequest('q=test'))
    expect(res.headers.get('access-control-allow-origin')).toBe('*')
  })
})
