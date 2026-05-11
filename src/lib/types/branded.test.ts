import { describe, it, expect } from 'vitest'
import {
  toPageSlug,
  isPageSlug,
  toSIRET,
  toSIREN,
  toCityId,
  toMetierCode,
  toGarantieCode,
  toVilleSlug,
  toStatutJuridique,
} from './branded'

describe('branded types', () => {
  describe('PageSlug', () => {
    it('accepts valid slugs', () => {
      expect(toPageSlug('rc-pro')).toBe('rc-pro')
      expect(toPageSlug('prix/rc-pro')).toBe('prix/rc-pro')
      expect(toPageSlug('prix/rc-pro/consultant')).toBe('prix/rc-pro/consultant')
    })

    it('normalizes leading/trailing slashes', () => {
      expect(toPageSlug('/rc-pro/')).toBe('rc-pro')
      expect(toPageSlug('//prix/rc-pro//')).toBe('prix/rc-pro')
    })

    it('lowercases', () => {
      expect(toPageSlug('Prix/RC-Pro')).toBe('prix/rc-pro')
    })

    it('rejects invalid slugs', () => {
      expect(() => toPageSlug('rc pro')).toThrow('Invalid PageSlug')
      expect(() => toPageSlug('rc_pro')).toThrow('Invalid PageSlug')
      expect(() => toPageSlug('rc.pro')).toThrow('Invalid PageSlug')
    })

    it('isPageSlug type guard', () => {
      expect(isPageSlug('rc-pro')).toBe(true)
      expect(isPageSlug('not valid')).toBe(false)
    })
  })

  describe('SIRET / SIREN', () => {
    it('accepts valid SIRET', () => {
      expect(toSIRET('12345678901234')).toBe('12345678901234')
      expect(toSIRET('123 456 789 01234')).toBe('12345678901234') // strip spaces
    })

    it('rejects invalid SIRET', () => {
      expect(() => toSIRET('123')).toThrow('Invalid SIRET')
      expect(() => toSIRET('123456789012345')).toThrow('Invalid SIRET')
    })

    it('accepts valid SIREN', () => {
      expect(toSIREN('123456789')).toBe('123456789')
    })

    it('rejects invalid SIREN', () => {
      expect(() => toSIREN('12345678')).toThrow('Invalid SIREN')
    })
  })

  describe('CityId (UUID)', () => {
    it('accepts valid UUID v4', () => {
      const uuid = '550e8400-e29b-41d4-a716-446655440000'
      expect(toCityId(uuid)).toBe(uuid)
    })

    it('rejects invalid UUID', () => {
      expect(() => toCityId('not-a-uuid')).toThrow('Invalid CityId')
    })
  })

  describe('lowercase normalization', () => {
    it('toMetierCode', () => {
      expect(toMetierCode('  Plombier  ')).toBe('plombier')
    })
    it('toGarantieCode', () => {
      expect(toGarantieCode('RC-PRO')).toBe('rc-pro')
    })
    it('toVilleSlug', () => {
      expect(toVilleSlug('Paris-15')).toBe('paris-15')
    })
    it('toStatutJuridique', () => {
      expect(toStatutJuridique('SARL')).toBe('sarl')
    })
  })
})
