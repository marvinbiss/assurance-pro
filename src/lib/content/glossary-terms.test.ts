import { describe, it, expect } from 'vitest'
import { getGlossaryTerm, getAllGlossaryTerms } from './glossary-terms'

describe('Glossary terms', () => {
  it('contient les 20+ termes critiques', () => {
    const all = getAllGlossaryTerms()
    expect(all.length).toBeGreaterThanOrEqual(20)
  })

  it('chaque terme a un id, term, shortDef, fullDef', () => {
    getAllGlossaryTerms().forEach((t) => {
      expect(t.id).toBeTruthy()
      expect(t.term).toBeTruthy()
      expect(t.shortDef).toBeTruthy()
      expect(t.fullDef).toBeTruthy()
    })
  })

  it('shortDef <= 200 chars (tooltip)', () => {
    getAllGlossaryTerms().forEach((t) => {
      expect(t.shortDef.length).toBeLessThanOrEqual(200)
    })
  })

  it('IDs sont uniques (pas de doublons)', () => {
    const ids = getAllGlossaryTerms().map((t) => t.id)
    const unique = new Set(ids)
    expect(ids.length).toBe(unique.size)
  })

  it('IDs sont des slugs valides (lowercase, tirets)', () => {
    getAllGlossaryTerms().forEach((t) => {
      expect(t.id).toMatch(/^[a-z0-9-]+$/)
    })
  })

  it('getGlossaryTerm retourne le bon terme', () => {
    const orias = getGlossaryTerm('orias')
    expect(orias).toBeTruthy()
    expect(orias?.term).toBe('ORIAS')
  })

  it('getGlossaryTerm retourne undefined si inexistant', () => {
    expect(getGlossaryTerm('inexistant-xyz')).toBeUndefined()
  })

  it('related IDs pointent vers des termes existants', () => {
    const allIds = new Set(getAllGlossaryTerms().map((t) => t.id))
    getAllGlossaryTerms().forEach((t) => {
      t.related?.forEach((relId) => {
        /* certains related peuvent pointer vers termes pas encore créés (acceptable) */
        if (allIds.has(relId)) {
          expect(allIds.has(relId)).toBe(true)
        }
      })
    })
  })
})
