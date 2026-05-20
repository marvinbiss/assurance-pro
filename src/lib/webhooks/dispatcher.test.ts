import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { signPayload, verifySignature, generateWebhookSecret, hashSecret } from './dispatcher'

const TEST_KEY = 'b'.repeat(64)

describe('webhook dispatcher signing', () => {
  let originalKey: string | undefined
  beforeAll(() => {
    originalKey = process.env.WEBHOOK_ENCRYPTION_KEY
    process.env.WEBHOOK_ENCRYPTION_KEY = TEST_KEY
  })
  afterAll(() => {
    if (originalKey === undefined) delete process.env.WEBHOOK_ENCRYPTION_KEY
    else process.env.WEBHOOK_ENCRYPTION_KEY = originalKey
  })

  it('generates whsec_ prefixed secrets', () => {
    const s = generateWebhookSecret()
    expect(s).toMatch(/^whsec_[A-Za-z0-9_-]+$/)
    expect(s.length).toBeGreaterThan(40)
  })

  it('hashSecret produces 64-char hex', () => {
    const h = hashSecret('whsec_test')
    expect(h).toMatch(/^[a-f0-9]{64}$/)
  })

  it('signPayload format matches Stripe pattern t=<ts>,v1=<hmac>', () => {
    const sig = signPayload('secret', '{"a":1}', 1700000000)
    expect(sig).toMatch(/^t=1700000000,v1=[a-f0-9]{64}$/)
  })

  it('verifySignature accepts correct signature within tolerance', () => {
    const secret = 'whsec_test_secret'
    const payload = '{"foo":"bar"}'
    const ts = Math.floor(Date.now() / 1000)
    const sig = signPayload(secret, payload, ts)
    expect(verifySignature(secret, payload, sig)).toBe(true)
  })

  it('verifySignature rejects wrong secret', () => {
    const ts = Math.floor(Date.now() / 1000)
    const sig = signPayload('secret_A', 'payload', ts)
    expect(verifySignature('secret_B', 'payload', sig)).toBe(false)
  })

  it('verifySignature rejects tampered payload', () => {
    const secret = 'whsec_test'
    const ts = Math.floor(Date.now() / 1000)
    const sig = signPayload(secret, 'original', ts)
    expect(verifySignature(secret, 'tampered', sig)).toBe(false)
  })

  it('verifySignature rejects expired timestamp (> 300s)', () => {
    const secret = 'whsec_test'
    const oldTs = Math.floor(Date.now() / 1000) - 400
    const sig = signPayload(secret, 'p', oldTs)
    expect(verifySignature(secret, 'p', sig)).toBe(false)
  })

  it('verifySignature rejects malformed header', () => {
    expect(verifySignature('secret', 'p', 'garbage')).toBe(false)
    expect(verifySignature('secret', 'p', 't=1')).toBe(false)
  })
})
