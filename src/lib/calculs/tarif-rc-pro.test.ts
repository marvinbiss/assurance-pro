import { describe, it, expect } from 'vitest'
import { calculerTarif, SECTEUR_LABELS, FORME_LABELS, getSinistralite } from './tarif-rc-pro'

describe('Calculateur tarif RC Pro', () => {
  describe('calculerTarif - profils types', () => {
    it('AE consultant CA 30k = tarif minimum (~90-280€ par an)', () => {
      const r = calculerTarif({
        secteur: 'consultant-conseil',
        ca: 30000,
        formeJuridique: 'auto-entrepreneur',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        plafond: 500000,
        anciennete: 5,
      })
      expect(r.fourchetteBasse).toBeGreaterThanOrEqual(50)
      expect(r.fourchetteHaute).toBeLessThanOrEqual(400)
      expect(r.fourchetteMediane).toBeGreaterThan(r.fourchetteBasse)
      expect(r.fourchetteMediane).toBeLessThan(r.fourchetteHaute)
    })

    it('SARL médecin libéral CA 250k = tarif élevé', () => {
      const r = calculerTarif({
        secteur: 'medecin-liberal',
        ca: 250000,
        formeJuridique: 'sarl',
        effectif: 3,
        antecedents: 'aucun',
        franchise: 1500,
        plafond: 2000000,
        anciennete: 10,
      })
      expect(r.fourchetteMediane).toBeGreaterThan(2000)
      expect(r.fourchetteMediane).toBeLessThan(50000)
    })

    it('Sinistre majeur (3+) = sur-prime ×2.4', () => {
      const base = calculerTarif({
        secteur: 'consultant-conseil',
        ca: 50000,
        formeJuridique: 'eurl',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        plafond: 500000,
        anciennete: 3,
      })
      const aggrave = calculerTarif({
        secteur: 'consultant-conseil',
        ca: 50000,
        formeJuridique: 'eurl',
        effectif: 0,
        antecedents: '3-plus',
        franchise: 1500,
        plafond: 500000,
        anciennete: 3,
      })
      const ratio = aggrave.fourchetteMediane / base.fourchetteMediane
      expect(ratio).toBeGreaterThan(2.0)
      expect(ratio).toBeLessThan(2.7)
    })

    it('Plafond 5M€ = sur-prime ×1.85 vs 500k€ référence', () => {
      const ref = calculerTarif({
        secteur: 'consultant-conseil',
        ca: 50000,
        formeJuridique: 'eurl',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        plafond: 500000,
        anciennete: 3,
      })
      const max = calculerTarif({
        secteur: 'consultant-conseil',
        ca: 50000,
        formeJuridique: 'eurl',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        plafond: 5000000,
        anciennete: 3,
      })
      const ratio = max.fourchetteMediane / ref.fourchetteMediane
      expect(ratio).toBeGreaterThan(1.7)
      expect(ratio).toBeLessThan(2.0)
    })

    it('Franchise 5000€ = rabais vs franchise 300€', () => {
      const cher = calculerTarif({
        secteur: 'consultant-conseil',
        ca: 50000,
        formeJuridique: 'eurl',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 300,
        plafond: 500000,
        anciennete: 3,
      })
      const rabais = calculerTarif({
        secteur: 'consultant-conseil',
        ca: 50000,
        formeJuridique: 'eurl',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 5000,
        plafond: 500000,
        anciennete: 3,
      })
      expect(rabais.fourchetteMediane).toBeLessThan(cher.fourchetteMediane)
    })
  })

  describe('Cohérence détail calculs', () => {
    it('detail.coefAge varie selon ancienneté', () => {
      const nouveau = calculerTarif({
        secteur: 'consultant-conseil',
        ca: 50000,
        formeJuridique: 'auto-entrepreneur',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        plafond: 500000,
        anciennete: 0,
      })
      const ancien = calculerTarif({
        secteur: 'consultant-conseil',
        ca: 50000,
        formeJuridique: 'auto-entrepreneur',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        plafond: 500000,
        anciennete: 10,
      })
      expect(nouveau.detail.coefAnciennete).toBeGreaterThan(ancien.detail.coefAnciennete)
    })

    it('Médiane = exactement entre basse et haute (±15%)', () => {
      const r = calculerTarif({
        secteur: 'consultant-conseil',
        ca: 50000,
        formeJuridique: 'eurl',
        effectif: 0,
        antecedents: 'aucun',
        franchise: 1500,
        plafond: 500000,
        anciennete: 3,
      })
      const ratioBasse = r.fourchetteBasse / r.fourchetteMediane
      const ratioHaute = r.fourchetteHaute / r.fourchetteMediane
      expect(ratioBasse).toBeCloseTo(0.85, 1)
      expect(ratioHaute).toBeCloseTo(1.18, 1)
    })
  })

  describe('Référentiels', () => {
    it('SECTEUR_LABELS contient 14 secteurs', () => {
      expect(Object.keys(SECTEUR_LABELS)).toHaveLength(14)
    })

    it('FORME_LABELS contient 6 formes juridiques', () => {
      expect(Object.keys(FORME_LABELS)).toHaveLength(6)
    })

    it('getSinistralite retourne string non vide pour chaque secteur', () => {
      Object.keys(SECTEUR_LABELS).forEach((s) => {
        const sin = getSinistralite(s as Parameters<typeof getSinistralite>[0])
        expect(sin).toBeTruthy()
        expect(sin.length).toBeGreaterThan(3)
      })
    })
  })
})
