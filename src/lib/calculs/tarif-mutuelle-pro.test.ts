import { describe, it, expect } from 'vitest'
import { calculerMutuelle } from './tarif-mutuelle-pro'

describe('Calculateur tarif mutuelle pro', () => {
  it('Salarié 40 ans formule standard ≈ 58€/mois', () => {
    const r = calculerMutuelle({
      formule: 'standard',
      age: 40,
      regime: 'general-salarie',
      zone: 'metropole',
      composition: 'isole',
      effectif: 1,
    })
    expect(r.tarifMensuelTotal).toBeGreaterThan(40)
    expect(r.tarifMensuelTotal).toBeLessThan(80)
  })

  it('Loi ANI : effectif >=1 => part employeur 50%', () => {
    const r = calculerMutuelle({
      formule: 'standard',
      age: 40,
      regime: 'general-salarie',
      zone: 'metropole',
      composition: 'isole',
      effectif: 5,
    })
    expect(r.partEmployeurMensuelle).toBeGreaterThan(0)
    expect(Math.abs(r.partEmployeurMensuelle - r.tarifMensuelTotal * 0.5)).toBeLessThan(2)
  })

  it('TNS individuel (effectif 0) : pas de part employeur', () => {
    const r = calculerMutuelle({
      formule: 'standard',
      age: 40,
      regime: 'tns-madelin',
      zone: 'metropole',
      composition: 'isole',
      effectif: 0,
    })
    expect(r.partEmployeurMensuelle).toBe(0)
    expect(r.partSalarieMensuelle).toBe(r.tarifMensuelTotal)
  })

  it('TNS Madelin (×1.18) > Régime général', () => {
    const general = calculerMutuelle({
      formule: 'standard',
      age: 40,
      regime: 'general-salarie',
      zone: 'metropole',
      composition: 'isole',
      effectif: 1,
    })
    const tns = calculerMutuelle({
      formule: 'standard',
      age: 40,
      regime: 'tns-madelin',
      zone: 'metropole',
      composition: 'isole',
      effectif: 1,
    })
    expect(tns.tarifMensuelTotal).toBeGreaterThan(general.tarifMensuelTotal)
  })

  it('Alsace-Moselle (régime local) < général', () => {
    const general = calculerMutuelle({
      formule: 'standard',
      age: 40,
      regime: 'general-salarie',
      zone: 'metropole',
      composition: 'isole',
      effectif: 1,
    })
    const alsace = calculerMutuelle({
      formule: 'standard',
      age: 40,
      regime: 'alsace-moselle',
      zone: 'metropole',
      composition: 'isole',
      effectif: 1,
    })
    expect(alsace.tarifMensuelTotal).toBeLessThan(general.tarifMensuelTotal)
  })

  it('Famille 3+ enfants > duo', () => {
    const duo = calculerMutuelle({
      formule: 'standard',
      age: 40,
      regime: 'general-salarie',
      zone: 'metropole',
      composition: 'duo',
      effectif: 1,
    })
    const famille = calculerMutuelle({
      formule: 'standard',
      age: 40,
      regime: 'general-salarie',
      zone: 'metropole',
      composition: 'famille-3plus',
      effectif: 1,
    })
    expect(famille.tarifMensuelTotal).toBeGreaterThan(duo.tarifMensuelTotal)
  })

  it("Coef âge croît avec l'âge (DREES 2024)", () => {
    const jeune = calculerMutuelle({
      formule: 'standard',
      age: 25,
      regime: 'general-salarie',
      zone: 'metropole',
      composition: 'isole',
      effectif: 1,
    })
    const senior = calculerMutuelle({
      formule: 'standard',
      age: 65,
      regime: 'general-salarie',
      zone: 'metropole',
      composition: 'isole',
      effectif: 1,
    })
    expect(senior.tarifMensuelTotal).toBeGreaterThan(jeune.tarifMensuelTotal * 1.5)
  })

  it('Tarif annuel = mensuel × 12', () => {
    const r = calculerMutuelle({
      formule: 'standard',
      age: 40,
      regime: 'general-salarie',
      zone: 'metropole',
      composition: 'isole',
      effectif: 1,
    })
    expect(r.tarifAnnuelTotal).toBe(r.tarifMensuelTotal * 12)
  })
})
