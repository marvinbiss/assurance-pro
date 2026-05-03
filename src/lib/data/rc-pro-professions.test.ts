// @vitest-environment node
import { describe, it, expect } from 'vitest'
import {
  RC_PRO_PROFESSIONS,
  getProfession,
  getProfessionSlugs,
} from './rc-pro-professions'

describe('rc-pro-professions data', () => {
  it('exposes at least 50 professions', () => {
    expect(getProfessionSlugs().length).toBeGreaterThanOrEqual(50)
  })

  it('every profession has required fields', () => {
    for (const p of Object.values(RC_PRO_PROFESSIONS)) {
      expect(p.slug).toMatch(/^[a-z0-9-]+$/)
      expect(p.name.length).toBeGreaterThan(2)
      expect(p.nafCodes.length).toBeGreaterThan(0)
      expect(p.tagline.length).toBeGreaterThan(20)
      expect(p.intro.length).toBeGreaterThan(50)
      expect(typeof p.obligatoire).toBe('boolean')
      expect(p.plafondRecommande).toBeGreaterThan(0)
      expect(p.risques.length).toBeGreaterThanOrEqual(2)
      expect(p.garantiesRecommandees.length).toBeGreaterThanOrEqual(2)
      expect(p.icon.length).toBeGreaterThan(0)
      expect(p.nbProsFrance).toBeGreaterThan(0)
    }
  })

  it('professions obligatoires have a referenceLegale', () => {
    for (const p of Object.values(RC_PRO_PROFESSIONS)) {
      if (p.obligatoire) {
        expect(p.referenceLegale).toBeTruthy()
      }
    }
  })

  it('tarifs sarl_sas is coherent (max >= min)', () => {
    for (const p of Object.values(RC_PRO_PROFESSIONS)) {
      expect(p.tarifs.sarl_sas.max).toBeGreaterThanOrEqual(p.tarifs.sarl_sas.min)
    }
  })

  it('at least one tariff bracket is populated for every profession', () => {
    for (const p of Object.values(RC_PRO_PROFESSIONS)) {
      const hasAtLeastOne =
        p.tarifs.auto_entrepreneur.max > 0 ||
        p.tarifs.sarl_sas.max > 0 ||
        p.tarifs.grand_compte.max > 0
      expect(hasAtLeastOne, `${p.slug} has no positive tariff`).toBe(true)
    }
  })

  it('grand_compte tarifs always >= sarl_sas (when both populated)', () => {
    for (const p of Object.values(RC_PRO_PROFESSIONS)) {
      if (p.tarifs.sarl_sas.max > 0 && p.tarifs.grand_compte.max > 0) {
        expect(p.tarifs.grand_compte.max).toBeGreaterThanOrEqual(p.tarifs.sarl_sas.max)
      }
    }
  })

  it('auto_entrepreneur is either disabled (0/0) or coherent (max > min > 0)', () => {
    for (const p of Object.values(RC_PRO_PROFESSIONS)) {
      const ae = p.tarifs.auto_entrepreneur
      if (ae.max === 0) {
        expect(ae.min).toBe(0)
      } else {
        expect(ae.min).toBeGreaterThan(0)
        expect(ae.max).toBeGreaterThan(ae.min)
      }
    }
  })

  it('all slugs are unique', () => {
    const slugs = getProfessionSlugs()
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('record key matches slug', () => {
    for (const [key, p] of Object.entries(RC_PRO_PROFESSIONS)) {
      expect(key).toBe(p.slug)
    }
  })

  it('no slug collision with decennale métiers (cross-vertical)', async () => {
    const { getMetierSlugs } = await import('./decennale-metiers')
    const decennaleSlugs = new Set(getMetierSlugs())
    const profSlugs = getProfessionSlugs()
    const collisions = profSlugs.filter((s) => decennaleSlugs.has(s))
    expect(collisions).toEqual([])
  })

  it('getProfession returns the exact entry for a known slug', () => {
    const p = getProfession('avocat')
    expect(p?.name).toBe('Avocat')
    expect(p?.obligatoire).toBe(true)
  })

  it('getProfession returns null for unknown slug', () => {
    expect(getProfession('does-not-exist')).toBeNull()
  })
})
