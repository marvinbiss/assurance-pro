import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Chainable Supabase mock ───────────────────────────────────
const { fromMock, upsertMock, selectMock, eqMock, orderMock, limitMock, gteMock } = vi.hoisted(
  () => {
    const upsertMock = vi.fn()
    const limitMock = vi.fn()
    const gteMock = vi.fn()
    const orderMock = vi.fn(() => ({ limit: limitMock }))
    // eq sert deux chaînes : claim (eq→order→limit) et count (eq→gte).
    const eqMock = vi.fn(() => ({ order: orderMock, gte: gteMock }))
    const selectMock = vi.fn(() => ({ eq: eqMock }))
    const fromMock = vi.fn(() => ({ upsert: upsertMock, select: selectMock }))
    return { fromMock, upsertMock, selectMock, eqMock, orderMock, limitMock, gteMock }
  }
)

vi.mock('@/lib/supabase/admin', () => ({
  createPiiAdminClient: () => ({ from: fromMock }),
  createAdminClient: () => ({ from: fromMock }),
}))

// ── google-indexing mock (for notifyGoogleIndexing) ───────────
const { submitMock, enabledMock } = vi.hoisted(() => ({
  submitMock: vi.fn(),
  enabledMock: vi.fn(),
}))
vi.mock('@/lib/seo/google-indexing', () => ({
  isGoogleIndexingEnabled: enabledMock,
  submitToGoogleIndexing: submitMock,
  googleIndexingDailyQuota: () => 200,
}))

import {
  syncUrlUniverse,
  claimNextUrls,
  recordSubmissions,
  notifyGoogleIndexing,
  countSubmittedToday,
  remainingQuotaToday,
} from './index-queue'

beforeEach(() => {
  fromMock.mockClear()
  selectMock.mockClear()
  eqMock.mockClear()
  orderMock.mockClear()
  upsertMock.mockReset().mockResolvedValue({ error: null })
  limitMock.mockReset().mockResolvedValue({ data: [], error: null })
  gteMock.mockReset().mockResolvedValue({ count: 0, error: null })
  submitMock.mockReset()
  enabledMock.mockReset()
})

describe('syncUrlUniverse', () => {
  it('upserts the URL universe with ignoreDuplicates', async () => {
    const { total } = await syncUrlUniverse()
    expect(total).toBeGreaterThan(0)
    expect(fromMock).toHaveBeenCalledWith('seo_index_submissions')
    expect(upsertMock).toHaveBeenCalled()
    expect(upsertMock.mock.calls[0]?.[1]).toEqual({ onConflict: 'url', ignoreDuplicates: true })
  })

  it('throws when the upsert errors', async () => {
    upsertMock.mockResolvedValueOnce({ error: { message: 'boom' } })
    await expect(syncUrlUniverse()).rejects.toThrow(/boom/)
  })
})

describe('claimNextUrls', () => {
  it('selects oldest-submitted-first with nulls first', async () => {
    limitMock.mockResolvedValueOnce({ data: [{ url: '/a', submit_count: 2 }], error: null })
    const rows = await claimNextUrls(50)
    expect(rows).toEqual([{ url: '/a', submit_count: 2 }])
    expect(eqMock).toHaveBeenCalledWith('engine', 'google')
    expect(orderMock).toHaveBeenCalledWith('last_submitted_at', {
      ascending: true,
      nullsFirst: true,
    })
    expect(limitMock).toHaveBeenCalledWith(50)
  })

  it('throws when the select errors', async () => {
    limitMock.mockResolvedValueOnce({ data: null, error: { message: 'nope' } })
    await expect(claimNextUrls(10)).rejects.toThrow(/nope/)
  })
})

describe('recordSubmissions', () => {
  it('increments the claimed count and records status', async () => {
    await recordSubmissions(
      [{ url: '/a', submit_count: 5 }],
      [{ url: '/a', ok: true, httpStatus: 200 }]
    )
    const rows = upsertMock.mock.calls[0]?.[0]
    expect(rows[0]).toMatchObject({
      url: '/a',
      last_status: 'ok',
      last_http_status: 200,
      submit_count: 6,
    })
  })

  it('records an error result with last_error', async () => {
    await recordSubmissions(
      [{ url: '/b', submit_count: 0 }],
      [{ url: '/b', ok: false, httpStatus: 429, error: 'quota' }]
    )
    expect(upsertMock.mock.calls[0]?.[0][0]).toMatchObject({
      url: '/b',
      last_status: 'error',
      last_error: 'quota',
      submit_count: 1,
    })
  })

  it('no-ops on empty results', async () => {
    await recordSubmissions([], [])
    expect(upsertMock).not.toHaveBeenCalled()
  })
})

describe('countSubmittedToday / remainingQuotaToday', () => {
  it('counts today rows via the engine + gte(last_submitted_at) chain', async () => {
    gteMock.mockResolvedValueOnce({ count: 42, error: null })
    expect(await countSubmittedToday()).toBe(42)
    expect(eqMock).toHaveBeenCalledWith('engine', 'google')
    expect(gteMock).toHaveBeenCalled()
  })

  it('computes remaining quota, clamped at 0', async () => {
    gteMock.mockResolvedValueOnce({ count: 180, error: null })
    expect(await remainingQuotaToday(200)).toBe(20)
    gteMock.mockResolvedValueOnce({ count: 250, error: null })
    expect(await remainingQuotaToday(200)).toBe(0)
  })
})

describe('notifyGoogleIndexing', () => {
  it('no-ops when disabled (no submit, no write)', async () => {
    enabledMock.mockReturnValue(false)
    await notifyGoogleIndexing(['/a'])
    expect(submitMock).not.toHaveBeenCalled()
    expect(upsertMock).not.toHaveBeenCalled()
  })

  it('no-ops when the daily quota is exhausted', async () => {
    enabledMock.mockReturnValue(true)
    gteMock.mockResolvedValueOnce({ count: 200, error: null })
    await notifyGoogleIndexing(['/a'])
    expect(submitMock).not.toHaveBeenCalled()
  })

  it('submits and records when enabled and within quota', async () => {
    enabledMock.mockReturnValue(true)
    gteMock.mockResolvedValueOnce({ count: 0, error: null })
    submitMock.mockResolvedValue({
      enabled: true,
      submitted: 1,
      failed: 0,
      results: [{ url: '/a', ok: true, httpStatus: 200 }],
    })
    await notifyGoogleIndexing(['/a'], 'URL_UPDATED')
    expect(submitMock).toHaveBeenCalledWith(['/a'], 'URL_UPDATED')
    expect(upsertMock).toHaveBeenCalled()
  })

  it('caps the batch to the remaining quota', async () => {
    enabledMock.mockReturnValue(true)
    gteMock.mockResolvedValueOnce({ count: 199, error: null }) // 1 left
    submitMock.mockResolvedValue({ enabled: true, submitted: 1, failed: 0, results: [] })
    await notifyGoogleIndexing(['/a', '/b', '/c'])
    expect(submitMock).toHaveBeenCalledWith(['/a'], 'URL_UPDATED')
  })
})
