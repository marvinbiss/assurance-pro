import { describe, it, expect } from 'vitest'
import { slugify } from './slugify'

describe('slugify', () => {
  it('convertit titre simple en slug', () => {
    expect(slugify('Mentions obligatoires')).toBe('mentions-obligatoires')
  })

  it('retire les accents français', () => {
    expect(slugify('Décennale photovoltaïque')).toBe('decennale-photovoltaique')
    expect(slugify('Tarif assurance pro')).toBe('tarif-assurance-pro')
  })

  it('retire ponctuation et apostrophes', () => {
    /* L' → l (apostrophe retirée puis tirets supprimés en bordure) */
    expect(slugify("L'article L. 441-9")).toBe('larticle-l-441-9')
    expect(slugify('« Express 6h » disponible')).toBe('express-6h-disponible')
  })

  it('limite à 80 caractères', () => {
    const long = 'mot '.repeat(50)
    expect(slugify(long).length).toBeLessThanOrEqual(80)
  })

  it('retire tirets en début / fin', () => {
    expect(slugify('  Hello   ')).toBe('hello')
    expect(slugify('---test---')).toBe('test')
  })

  it('gère caractères spéciaux et chiffres', () => {
    expect(slugify('Top 5 mentions')).toBe('top-5-mentions')
    expect(slugify('100% RGPD compliant')).toBe('100-rgpd-compliant')
  })
})
