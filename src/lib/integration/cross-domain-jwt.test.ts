// @vitest-environment node
import { describe, it, expect, beforeEach } from 'vitest'
import { signCrossDomainToken, verifyCrossDomainToken } from './cross-domain-jwt'

const SECRET = '0123456789abcdef0123456789abcdef0123456789' // 42 chars

describe('cross-domain-jwt', () => {
  beforeEach(() => {
    process.env.CROSS_DOMAIN_JWT_SECRET = SECRET
  })

  it('round-trips a payload', async () => {
    const payload = {
      vertical: 'BTP',
      metier: 'plombier',
      ville: 'Lyon',
      postal_code: '69001',
      prenom: 'Jean',
      nom: 'Dupont',
      email: 'jean@example.com',
    }
    const token = await signCrossDomainToken(payload)
    expect(token.split('.')).toHaveLength(3)
    const decoded = await verifyCrossDomainToken(token, { consumeJti: false })
    expect(decoded).toMatchObject(payload)
  })

  it('rejects an unsigned token', async () => {
    const decoded = await verifyCrossDomainToken('not-a-jwt')
    expect(decoded).toBeNull()
  })

  it('rejects a token signed with another secret', async () => {
    const token = await signCrossDomainToken({ vertical: 'BTP' })
    process.env.CROSS_DOMAIN_JWT_SECRET = 'a-different-secret-012345678901234567890'
    const decoded = await verifyCrossDomainToken(token, { consumeJti: false })
    expect(decoded).toBeNull()
  })

  it('throws when secret too short', async () => {
    process.env.CROSS_DOMAIN_JWT_SECRET = 'short'
    await expect(signCrossDomainToken({})).rejects.toThrow(/CROSS_DOMAIN_JWT_SECRET/)
  })
})
