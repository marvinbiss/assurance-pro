// @vitest-environment node
import { describe, it, expect } from 'vitest'
import {
  DECENNALE_METIERS,
  getMetier,
  getMetierSlugs,
} from './decennale-metiers'

describe('decennale-metiers data', () => {
  it('exposes at least 30 métiers', () => {
    expect(getMetierSlugs().length).toBeGreaterThanOrEqual(30)
  })

  it('every métier has all required fields populated', () => {
    for (const m of Object.values(DECENNALE_METIERS)) {
      expect(m.slug).toMatch(/^[a-z0-9-]+$/)
      expect(m.name.length).toBeGreaterThan(2)
      expect(m.nafCodes.length).toBeGreaterThan(0)
      expect(m.tagline.length).toBeGreaterThan(20)
      expect(m.intro.length).toBeGreaterThan(80)
      expect(m.sinistraliteAqc).toBeGreaterThan(0)
      expect(m.coutSinistreMoyen).toBeGreaterThan(0)
      expect(m.topCauses.length).toBeGreaterThanOrEqual(3)
      expect(m.tarifs.auto_entrepreneur.min).toBeGreaterThan(0)
      expect(m.tarifs.auto_entrepreneur.max).toBeGreaterThan(m.tarifs.auto_entrepreneur.min)
      expect(m.tarifs.grand_compte.max).toBeGreaterThan(m.tarifs.pme_100k_250k.max)
      expect(m.niveauRisque).toBeGreaterThanOrEqual(1)
      expect(m.niveauRisque).toBeLessThanOrEqual(5)
      expect(m.icon.length).toBeGreaterThan(0)
      expect(m.nbEntreprisesFrance).toBeGreaterThan(0)
      expect(m.garantiesSpecifiques.length).toBeGreaterThanOrEqual(2)
      expect(m.risques.length).toBeGreaterThanOrEqual(2)
    }
  })

  it('topCauses percentages are reasonable (each <100, sum <=100 not enforced)', () => {
    for (const m of Object.values(DECENNALE_METIERS)) {
      for (const cause of m.topCauses) {
        expect(cause.pct).toBeGreaterThan(0)
        expect(cause.pct).toBeLessThanOrEqual(100)
        expect(cause.cause.length).toBeGreaterThan(2)
      }
    }
  })

  it('all slugs are unique', () => {
    const slugs = getMetierSlugs()
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('getMetier returns the exact entry for a known slug', () => {
    const m = getMetier('plombier')
    expect(m?.name).toBe('Plombier')
  })

  it('getMetier returns null for unknown slug', () => {
    expect(getMetier('does-not-exist')).toBeNull()
  })

  it('record key matches slug', () => {
    for (const [key, m] of Object.entries(DECENNALE_METIERS)) {
      expect(key).toBe(m.slug)
    }
  })
})
