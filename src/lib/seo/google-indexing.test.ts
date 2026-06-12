import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock googleapis : un seul `publish` partagé, accessible via google.indexing().
const { publish, JWT } = vi.hoisted(() => ({
  publish: vi.fn(),
  JWT: vi.fn(),
}))

vi.mock('googleapis', () => ({
  google: {
    auth: { JWT },
    indexing: vi.fn(() => ({ urlNotifications: { publish } })),
  },
}))

import {
  submitToGoogleIndexing,
  isGoogleIndexingEnabled,
  googleIndexingDailyQuota,
} from './google-indexing'

function enableWithCreds() {
  vi.stubEnv('GOOGLE_INDEXING_ENABLED', 'true')
  vi.stubEnv('GOOGLE_INDEXING_CLIENT_EMAIL', 'svc@project.iam.gserviceaccount.com')
  vi.stubEnv('GOOGLE_INDEXING_PRIVATE_KEY', '-----BEGIN-----\\nkey\\n-----END-----')
}

beforeEach(() => {
  publish.mockReset()
  JWT.mockReset()
})

afterEach(() => {
  vi.unstubAllEnvs()
})

describe('isGoogleIndexingEnabled', () => {
  it('is true only when env === "true"', () => {
    vi.stubEnv('GOOGLE_INDEXING_ENABLED', 'true')
    expect(isGoogleIndexingEnabled()).toBe(true)
    vi.stubEnv('GOOGLE_INDEXING_ENABLED', '1')
    expect(isGoogleIndexingEnabled()).toBe(false)
  })
})

describe('googleIndexingDailyQuota', () => {
  it('defaults to 200', () => {
    vi.stubEnv('GOOGLE_INDEXING_DAILY_QUOTA', '')
    expect(googleIndexingDailyQuota()).toBe(200)
  })
  it('honors a valid override', () => {
    vi.stubEnv('GOOGLE_INDEXING_DAILY_QUOTA', '500')
    expect(googleIndexingDailyQuota()).toBe(500)
  })
  it('falls back to 200 on invalid / non-positive input', () => {
    vi.stubEnv('GOOGLE_INDEXING_DAILY_QUOTA', 'abc')
    expect(googleIndexingDailyQuota()).toBe(200)
    vi.stubEnv('GOOGLE_INDEXING_DAILY_QUOTA', '-5')
    expect(googleIndexingDailyQuota()).toBe(200)
  })
})

describe('submitToGoogleIndexing', () => {
  it('no-ops (enabled:false) when the flag is off', async () => {
    vi.stubEnv('GOOGLE_INDEXING_ENABLED', 'false')
    const res = await submitToGoogleIndexing(['/rc-pro/avocat'])
    expect(res.enabled).toBe(false)
    expect(res.submitted).toBe(0)
    expect(publish).not.toHaveBeenCalled()
  })

  it('errors when credentials are missing', async () => {
    vi.stubEnv('GOOGLE_INDEXING_ENABLED', 'true')
    const res = await submitToGoogleIndexing(['/rc-pro/avocat'])
    expect(res.enabled).toBe(true)
    expect(res.error).toMatch(/Missing/)
    expect(publish).not.toHaveBeenCalled()
  })

  it('returns enabled:true with empty results for an empty list', async () => {
    enableWithCreds()
    const res = await submitToGoogleIndexing([])
    expect(res).toEqual({ enabled: true, submitted: 0, failed: 0, results: [] })
    expect(publish).not.toHaveBeenCalled()
  })

  it('keeps the ORIGINAL url in results but sends an absolute url to the API', async () => {
    enableWithCreds()
    publish.mockResolvedValue({ status: 200 })

    const res = await submitToGoogleIndexing(['/rc-pro/avocat'], 'URL_UPDATED')

    expect(res.submitted).toBe(1)
    expect(res.failed).toBe(0)
    expect(res.results[0]).toMatchObject({ url: '/rc-pro/avocat', ok: true, httpStatus: 200 })

    expect(publish).toHaveBeenCalledTimes(1)
    const arg = publish.mock.calls[0]?.[0]
    expect(arg.requestBody.url).toBe('https://vivos-assurance.fr/rc-pro/avocat')
    expect(arg.requestBody.type).toBe('URL_UPDATED')
  })

  it('counts failures and captures the HTTP status from the thrown error', async () => {
    enableWithCreds()
    publish.mockRejectedValue({ code: 429, message: 'quota exceeded' })

    const res = await submitToGoogleIndexing(['/a', '/b'])

    expect(res.submitted).toBe(0)
    expect(res.failed).toBe(2)
    expect(res.results.every((r) => !r.ok && r.httpStatus === 429)).toBe(true)
  })
})
