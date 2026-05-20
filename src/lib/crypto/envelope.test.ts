import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { encryptSecret, decryptSecret, isEncryptionConfigured } from './envelope'

const TEST_KEY = 'a'.repeat(64)

describe('envelope encryption', () => {
  let originalKey: string | undefined

  beforeAll(() => {
    originalKey = process.env.WEBHOOK_ENCRYPTION_KEY
    process.env.WEBHOOK_ENCRYPTION_KEY = TEST_KEY
  })

  afterAll(() => {
    if (originalKey === undefined) delete process.env.WEBHOOK_ENCRYPTION_KEY
    else process.env.WEBHOOK_ENCRYPTION_KEY = originalKey
  })

  it('roundtrip encrypt → decrypt = original', () => {
    const original = 'whsec_supersecret_token_abc123'
    const encrypted = encryptSecret(original)
    expect(encrypted).not.toContain(original)
    const decrypted = decryptSecret(encrypted)
    expect(decrypted).toBe(original)
  })

  it('different IV produces different ciphertext for same plaintext', () => {
    const plaintext = 'identical_secret'
    const c1 = encryptSecret(plaintext)
    const c2 = encryptSecret(plaintext)
    expect(c1).not.toBe(c2)
    expect(decryptSecret(c1)).toBe(plaintext)
    expect(decryptSecret(c2)).toBe(plaintext)
  })

  it('tampered ciphertext throws on decrypt', () => {
    const original = 'whsec_test'
    const encrypted = encryptSecret(original)
    const tampered = encrypted.slice(0, -4) + 'XXXX'
    expect(() => decryptSecret(tampered)).toThrow()
  })

  it('isEncryptionConfigured returns true with valid key', () => {
    expect(isEncryptionConfigured()).toBe(true)
  })

  it('throws if key missing', () => {
    const old = process.env.WEBHOOK_ENCRYPTION_KEY
    delete process.env.WEBHOOK_ENCRYPTION_KEY
    expect(() => encryptSecret('x')).toThrow(/WEBHOOK_ENCRYPTION_KEY/)
    process.env.WEBHOOK_ENCRYPTION_KEY = old
  })

  it('throws if key wrong length', () => {
    const old = process.env.WEBHOOK_ENCRYPTION_KEY
    process.env.WEBHOOK_ENCRYPTION_KEY = 'short'
    expect(() => encryptSecret('x')).toThrow(/hex chars/)
    process.env.WEBHOOK_ENCRYPTION_KEY = old
  })
})
