/**
 * Tests unitaires de la fonction `simulate()` du simulateur.
 *
 * Couvre :
 *   - Validation du métier (id inconnu → null)
 *   - Ordering des fourchettes : étancheur > maçon > peintre
 *   - Multipliers statut : SAS > micro
 *   - Multipliers CA : 300+ > 30-77
 *   - Multipliers antécédents : 2 sinistres > propre
 *   - Total = somme des garanties sélectionnées
 *   - Flag obligatoire (décennale BTP, RC Pro réglementée)
 */

import { describe, it, expect } from 'vitest'
import { simulate, METIERS, STATUTS, CA_RANGES, type Garantie } from './simulator-rates'

describe('simulate()', () => {
  describe('validation', () => {
    it('retourne null pour un métier inconnu', () => {
      const result = simulate({
        metier: 'metier-inexistant',
        statut: 'micro',
        ca: '30-77',
        antecedents: 'none',
        garanties: ['rc-pro'],
      })
      expect(result).toBeNull()
    })

    it('retourne un résultat valide pour un métier connu', () => {
      const result = simulate({
        metier: 'macon',
        statut: 'micro',
        ca: '30-77',
        antecedents: 'none',
        garanties: ['decennale'],
      })
      expect(result).not.toBeNull()
      expect(result?.totalMin).toBeGreaterThan(0)
      expect(result?.totalMax).toBeGreaterThan(result!.totalMin)
    })

    it('ignore les garanties non supportées par le métier', () => {
      // Consultant n'a pas de décennale
      const result = simulate({
        metier: 'consultant',
        statut: 'micro',
        ca: '30-77',
        antecedents: 'none',
        garanties: ['decennale', 'rc-pro'],
      })
      expect(result?.perGarantie).toHaveLength(1)
      expect(result?.perGarantie[0]?.garantie).toBe('rc-pro')
    })
  })

  describe('ordering par métier', () => {
    const baseInput = {
      statut: 'micro' as const,
      ca: '30-77' as const,
      antecedents: 'none' as const,
      garanties: ['decennale'] as Garantie[],
    }

    it('étancheur > maçon (sinistralité supérieure)', () => {
      const etancheur = simulate({ ...baseInput, metier: 'etancheur' })
      const macon = simulate({ ...baseInput, metier: 'macon' })
      expect(etancheur!.totalMin).toBeGreaterThan(macon!.totalMin)
    })

    it('couvreur > plombier (chute hauteur > plomberie)', () => {
      const couvreur = simulate({ ...baseInput, metier: 'couvreur' })
      const plombier = simulate({ ...baseInput, metier: 'plombier' })
      expect(couvreur!.totalMin).toBeGreaterThan(plombier!.totalMin)
    })

    it('peintre intérieur est le moins cher du BTP', () => {
      const peintre = simulate({ ...baseInput, metier: 'peintre-int' })
      const couvreur = simulate({ ...baseInput, metier: 'couvreur' })
      expect(peintre!.totalMin).toBeLessThan(couvreur!.totalMin)
    })
  })

  describe('multipliers statut', () => {
    const baseInput = {
      metier: 'macon' as const,
      ca: '30-77' as const,
      antecedents: 'none' as const,
      garanties: ['decennale'] as Garantie[],
    }

    it('SAS coûte plus que micro à profil égal', () => {
      const micro = simulate({ ...baseInput, statut: 'micro' })
      const sas = simulate({ ...baseInput, statut: 'sas' })
      expect(sas!.totalMin).toBeGreaterThan(micro!.totalMin * 1.3)
    })

    it('EI légèrement > micro (impact ~5 %)', () => {
      const micro = simulate({ ...baseInput, statut: 'micro' })
      const ei = simulate({ ...baseInput, statut: 'ei' })
      expect(ei!.totalMin).toBeGreaterThan(micro!.totalMin)
      expect(ei!.totalMin).toBeLessThan(micro!.totalMin * 1.2)
    })
  })

  describe("multipliers chiffre d'affaires", () => {
    const baseInput = {
      metier: 'macon' as const,
      statut: 'micro' as const,
      antecedents: 'none' as const,
      garanties: ['decennale'] as Garantie[],
    }

    it('CA 300+ coûte beaucoup plus que CA 0-30', () => {
      const low = simulate({ ...baseInput, ca: '0-30' })
      const high = simulate({ ...baseInput, ca: '300+' })
      expect(high!.totalMin).toBeGreaterThan(low!.totalMin * 2)
    })

    it('croissance monotone par tranche CA', () => {
      const ranges: Array<'0-30' | '30-77' | '77-150' | '150-300' | '300+'> = [
        '0-30',
        '30-77',
        '77-150',
        '150-300',
        '300+',
      ]
      const totals = ranges.map((ca) => simulate({ ...baseInput, ca })!.totalMin)
      for (let i = 1; i < totals.length; i++) {
        expect(totals[i]!).toBeGreaterThan(totals[i - 1]!)
      }
    })
  })

  describe('multipliers antécédents', () => {
    const baseInput = {
      metier: 'macon' as const,
      statut: 'micro' as const,
      ca: '30-77' as const,
      garanties: ['decennale'] as Garantie[],
    }

    it('2 sinistres = majoration vs propre', () => {
      const none = simulate({ ...baseInput, antecedents: 'none' })
      const twoPlus = simulate({ ...baseInput, antecedents: 'two_plus' })
      expect(twoPlus!.totalMin).toBeGreaterThan(none!.totalMin * 1.3)
    })

    it('aucun sinistre = légère minoration vs 1 sinistre', () => {
      const none = simulate({ ...baseInput, antecedents: 'none' })
      const one = simulate({ ...baseInput, antecedents: 'one' })
      expect(none!.totalMin).toBeLessThan(one!.totalMin)
    })
  })

  describe('flag obligatoire', () => {
    it('maçon : décennale = obligatoire', () => {
      const result = simulate({
        metier: 'macon',
        statut: 'micro',
        ca: '30-77',
        antecedents: 'none',
        garanties: ['decennale', 'rc-pro'],
      })
      const decennale = result?.perGarantie.find((g) => g.garantie === 'decennale')
      expect(decennale?.obligatoire).toBe(true)
    })

    it('avocat : RC Pro = obligatoire', () => {
      const result = simulate({
        metier: 'avocat',
        statut: 'eurl',
        ca: '77-150',
        antecedents: 'none',
        garanties: ['rc-pro'],
      })
      const rcpro = result?.perGarantie.find((g) => g.garantie === 'rc-pro')
      expect(rcpro?.obligatoire).toBe(true)
    })

    it('consultant : RC Pro = non-obligatoire', () => {
      const result = simulate({
        metier: 'consultant',
        statut: 'micro',
        ca: '30-77',
        antecedents: 'none',
        garanties: ['rc-pro'],
      })
      const rcpro = result?.perGarantie.find((g) => g.garantie === 'rc-pro')
      expect(rcpro?.obligatoire).toBeFalsy()
    })
  })

  describe('totaux', () => {
    it('totalMin = somme des min par garantie', () => {
      const result = simulate({
        metier: 'macon',
        statut: 'micro',
        ca: '30-77',
        antecedents: 'none',
        garanties: ['decennale', 'rc-pro'],
      })
      const expectedMin = result!.perGarantie.reduce((acc, g) => acc + g.min, 0)
      expect(result!.totalMin).toBe(expectedMin)
    })

    it('totalMax = somme des max par garantie', () => {
      const result = simulate({
        metier: 'macon',
        statut: 'micro',
        ca: '30-77',
        antecedents: 'none',
        garanties: ['decennale', 'rc-pro'],
      })
      const expectedMax = result!.perGarantie.reduce((acc, g) => acc + g.max, 0)
      expect(result!.totalMax).toBe(expectedMax)
    })

    it('min < max pour chaque garantie', () => {
      const result = simulate({
        metier: 'macon',
        statut: 'micro',
        ca: '30-77',
        antecedents: 'none',
        garanties: ['decennale', 'rc-pro', 'multirisque'],
      })
      for (const g of result!.perGarantie) {
        expect(g.min).toBeLessThan(g.max)
      }
    })
  })

  describe('exhaustivité catalogue', () => {
    it('40 métiers définis', () => {
      expect(METIERS.length).toBeGreaterThanOrEqual(40)
    })

    it('chaque métier a au moins 1 garantie', () => {
      for (const m of METIERS) {
        expect(m.garanties.length).toBeGreaterThan(0)
      }
    })

    it('chaque garantie déclarée a une fourchette définie', () => {
      for (const m of METIERS) {
        for (const g of m.garanties) {
          expect(m.fourchettes[g]).toBeDefined()
          expect(m.fourchettes[g]?.[0]).toBeGreaterThan(0)
          expect(m.fourchettes[g]?.[1]).toBeGreaterThan(m.fourchettes[g]![0])
        }
      }
    })

    it('6 statuts juridiques disponibles', () => {
      expect(STATUTS).toHaveLength(6)
    })

    it('5 tranches CA', () => {
      expect(CA_RANGES).toHaveLength(5)
    })
  })
})
