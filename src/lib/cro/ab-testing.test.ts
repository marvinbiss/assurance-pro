import { describe, it, expect } from 'vitest'
import {
  assignVariant,
  parseAbCookie,
  serializeAbCookie,
  buildSetCookieHeader,
  AB_COOKIE_NAME,
} from './ab-testing'

describe('A / B Testing primitives', () => {
  describe('assignVariant', () => {
    it('assigne variante stable pour même visitorId', () => {
      const exp = { id: 'sticky-cta-color', variants: ['blue', 'orange', 'emerald'] as const }
      const v1 = assignVariant(exp, 'visitor-123')
      const v2 = assignVariant(exp, 'visitor-123')
      expect(v1).toBe(v2)
    })

    it('assigne variantes différentes pour visitorIds différents (statistique)', () => {
      const exp = { id: 'test', variants: ['A', 'B'] as const }
      const assignments = new Set<string>()
      for (let i = 0; i < 100; i++) {
        assignments.add(assignVariant(exp, `visitor-${i}`))
      }
      /* Sur 100 visitors, on doit avoir les 2 variantes */
      expect(assignments.size).toBe(2)
    })

    it('respecte distribution équiprobable approximativement', () => {
      const exp = { id: 'split-50-50', variants: ['A', 'B'] as const }
      let countA = 0
      const N = 10_000
      for (let i = 0; i < N; i++) {
        if (assignVariant(exp, `visitor-${i}`) === 'A') countA++
      }
      /* 50% ± 3% sur 10k samples */
      expect(countA).toBeGreaterThan(N * 0.47)
      expect(countA).toBeLessThan(N * 0.53)
    })

    it('respecte poids personnalisés (90/10)', () => {
      const exp = { id: 'biased', variants: ['A', 'B'] as const, weights: [0.9, 0.1] }
      let countA = 0
      const N = 10_000
      for (let i = 0; i < N; i++) {
        if (assignVariant(exp, `visitor-${i}`) === 'A') countA++
      }
      /* 90% ± 2% */
      expect(countA).toBeGreaterThan(N * 0.87)
      expect(countA).toBeLessThan(N * 0.93)
    })
  })

  describe('parseAbCookie — serializeAbCookie', () => {
    it('parse vide → Map vide', () => {
      expect(parseAbCookie(null).size).toBe(0)
      expect(parseAbCookie('').size).toBe(0)
      expect(parseAbCookie(undefined).size).toBe(0)
    })

    it('parse "exp1=A;exp2=B"', () => {
      const map = parseAbCookie('exp1=A;exp2=B')
      expect(map.get('exp1')).toBe('A')
      expect(map.get('exp2')).toBe('B')
    })

    it('serialize Map → "exp1=A;exp2=B"', () => {
      const map = new Map([
        ['exp1', 'A'],
        ['exp2', 'B'],
      ])
      const serialized = serializeAbCookie(map)
      expect(serialized).toContain('exp1=A')
      expect(serialized).toContain('exp2=B')
    })

    it('round-trip parse → serialize identité', () => {
      const original = 'exp1=control;exp2=variant-b'
      const parsed = parseAbCookie(original)
      const reserialized = serializeAbCookie(parsed)
      expect(parseAbCookie(reserialized)).toEqual(parsed)
    })
  })

  describe('buildSetCookieHeader', () => {
    it('produit cookie sécurisé 50 jours', () => {
      const map = new Map([['exp1', 'A']])
      const header = buildSetCookieHeader(map)
      expect(header).toContain('ab_variants=exp1=A')
      expect(header).toContain('Path=/')
      expect(header).toContain('Max-Age=4320000')
      expect(header).toContain('SameSite=Lax')
    })
  })

  it('AB_COOKIE_NAME exporté', () => {
    expect(AB_COOKIE_NAME).toBe('ab_variants')
  })
})
