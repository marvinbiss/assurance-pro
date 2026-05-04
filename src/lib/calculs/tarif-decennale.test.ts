import { describe, it, expect } from 'vitest'
import { calculerTarif, METIER_LABELS, getSinistraliteAQC } from './tarif-decennale'

describe('Calculateur tarif décennale', () => {
  describe('Profils types AQC SYCODÉS 2024', () => {
    it('AE peintre CA 30k = tarif minimum BTP (480-760€/an)', () => {
      const r = calculerTarif({
        metier: 'peintre-plaquiste',
        ca: 30000,
        formeJuridique: 'auto-entrepreneur',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        zone: 'metropole',
        anciennete: 5,
      })
      expect(r.fourchetteBasse).toBeGreaterThanOrEqual(300)
      expect(r.fourchetteHaute).toBeLessThanOrEqual(900)
    })

    it('Couvreur (top 1 BTP, sinistralité 13,2%) > peintre', () => {
      const peintre = calculerTarif({
        metier: 'peintre-plaquiste',
        ca: 50000,
        formeJuridique: 'auto-entrepreneur',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        zone: 'metropole',
        anciennete: 5,
      })
      const couvreur = calculerTarif({
        metier: 'couvreur-zingueur',
        ca: 50000,
        formeJuridique: 'auto-entrepreneur',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        zone: 'metropole',
        anciennete: 5,
      })
      expect(couvreur.fourchetteMediane).toBeGreaterThan(peintre.fourchetteMediane * 1.4)
    })

    it('SARL maçon 5 salariés CA 500k = tarif élevé (5 800-15 000€/an)', () => {
      const r = calculerTarif({
        metier: 'macon',
        ca: 500000,
        formeJuridique: 'sarl',
        effectif: 5,
        antecedents: 'aucun',
        franchise: 1500,
        zone: 'metropole',
        anciennete: 5,
      })
      expect(r.fourchetteMediane).toBeGreaterThan(5000)
      expect(r.fourchetteMediane).toBeLessThan(20000)
    })

    it('Zone DOM (+28%) > zone métropole', () => {
      const metro = calculerTarif({
        metier: 'macon',
        ca: 50000,
        formeJuridique: 'auto-entrepreneur',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        zone: 'metropole',
        anciennete: 3,
      })
      const dom = calculerTarif({
        metier: 'macon',
        ca: 50000,
        formeJuridique: 'auto-entrepreneur',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        zone: 'dom',
        anciennete: 3,
      })
      const ratio = dom.fourchetteMediane / metro.fourchetteMediane
      expect(ratio).toBeGreaterThan(1.2)
      expect(ratio).toBeLessThan(1.35)
    })

    it('Photovoltaïque > électricien standard (sur-prime RGE PV)', () => {
      const elec = calculerTarif({
        metier: 'electricien',
        ca: 50000,
        formeJuridique: 'auto-entrepreneur',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        zone: 'metropole',
        anciennete: 3,
      })
      const pv = calculerTarif({
        metier: 'rge-photovoltaique',
        ca: 50000,
        formeJuridique: 'auto-entrepreneur',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        zone: 'metropole',
        anciennete: 3,
      })
      expect(pv.fourchetteMediane).toBeGreaterThan(elec.fourchetteMediane * 1.3)
    })
  })

  describe('Référentiels', () => {
    it('METIER_LABELS contient 10 métiers BTP', () => {
      expect(Object.keys(METIER_LABELS)).toHaveLength(10)
    })

    it('Sinistralité AQC référencée pour chaque métier', () => {
      Object.keys(METIER_LABELS).forEach((m) => {
        const sin = getSinistraliteAQC(m as Parameters<typeof getSinistraliteAQC>[0])
        expect(sin).toMatch(/\d/)
      })
    })
  })
})
