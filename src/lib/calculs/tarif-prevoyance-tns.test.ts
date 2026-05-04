import { describe, it, expect } from 'vitest'
import { calculerPrevoyance } from './tarif-prevoyance-tns'

describe('Calculateur prévoyance TNS Madelin', () => {
  it('Consultant 40 ans CA 60k formule standard ≈ 78€/mois base', () => {
    const r = calculerPrevoyance({
      statut: 'auto-entrepreneur',
      profession: 'profession-liberale-conseil',
      age: 40,
      revenus: 60000,
      formule: 'standard',
      fumeur: false,
      capitalDeces: 100000,
    })
    expect(r.cotisationMensuelle).toBeGreaterThan(50)
    expect(r.cotisationMensuelle).toBeLessThan(200)
  })

  it('Loi Madelin : déductibilité plafond 3,75% PASS + 7%', () => {
    const r = calculerPrevoyance({
      statut: 'auto-entrepreneur',
      profession: 'profession-liberale-conseil',
      age: 40,
      revenus: 100000,
      formule: 'standard',
      fumeur: false,
      capitalDeces: 100000,
    })
    expect(r.deductibiliteMadelin).toBeGreaterThan(0)
    expect(r.deductibiliteMadelin).toBeLessThanOrEqual(r.cotisationAnnuelle)
  })

  it('Fumeur => sur-prime ×1.32', () => {
    const nonFum = calculerPrevoyance({
      statut: 'auto-entrepreneur',
      profession: 'profession-liberale-conseil',
      age: 40,
      revenus: 60000,
      formule: 'standard',
      fumeur: false,
      capitalDeces: 100000,
    })
    const fum = calculerPrevoyance({
      statut: 'auto-entrepreneur',
      profession: 'profession-liberale-conseil',
      age: 40,
      revenus: 60000,
      formule: 'standard',
      fumeur: true,
      capitalDeces: 100000,
    })
    expect(fum.cotisationMensuelle).toBeGreaterThan(nonFum.cotisationMensuelle * 1.25)
  })

  it('Agriculteur (×1.42) > consultant', () => {
    const conseil = calculerPrevoyance({
      statut: 'ei',
      profession: 'profession-liberale-conseil',
      age: 40,
      revenus: 50000,
      formule: 'standard',
      fumeur: false,
      capitalDeces: 100000,
    })
    const agri = calculerPrevoyance({
      statut: 'ei',
      profession: 'agriculteur',
      age: 40,
      revenus: 50000,
      formule: 'standard',
      fumeur: false,
      capitalDeces: 100000,
    })
    expect(agri.cotisationMensuelle).toBeGreaterThan(conseil.cotisationMensuelle * 1.4)
  })

  it('IJ couvre 80% du revenu (formule standard)', () => {
    const r = calculerPrevoyance({
      statut: 'ei',
      profession: 'profession-liberale-conseil',
      age: 40,
      revenus: 73000,
      formule: 'standard',
      fumeur: false,
      capitalDeces: 100000,
    })
    const expectedIJ = Math.round((73000 / 365) * 0.8)
    expect(r.ijQuotidienneCouverte).toBe(expectedIJ)
  })

  it('Premium > Standard > Confort > Essentielle', () => {
    const params = {
      statut: 'ei' as const,
      profession: 'profession-liberale-conseil' as const,
      age: 40,
      revenus: 50000,
      fumeur: false,
      capitalDeces: 100000,
    }
    const ess = calculerPrevoyance({ ...params, formule: 'essentielle' })
    const std = calculerPrevoyance({ ...params, formule: 'standard' })
    const cnf = calculerPrevoyance({ ...params, formule: 'confort' })
    const prm = calculerPrevoyance({ ...params, formule: 'premium' })
    expect(prm.cotisationMensuelle).toBeGreaterThan(cnf.cotisationMensuelle)
    expect(cnf.cotisationMensuelle).toBeGreaterThan(std.cotisationMensuelle)
    expect(std.cotisationMensuelle).toBeGreaterThan(ess.cotisationMensuelle)
  })
})
