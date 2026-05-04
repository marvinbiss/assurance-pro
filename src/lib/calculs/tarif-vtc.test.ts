import { describe, it, expect } from 'vitest'
import { calculerVtc } from './tarif-vtc'

describe('Calculateur tarif VTC', () => {
  it('AE solo Paris berline classique = tarif standard', () => {
    const r = calculerVtc({
      profil: 'auto-entrepreneur-solo',
      ageChauffeur: 38,
      ancienneteVTC: 2,
      ancienneteB: 15,
      zone: 'paris-petite-couronne',
      formule: 'tous-risques',
      vehicule: 'berline-classique',
      antecedents: 'aucun',
      effectifChauffeurs: 1,
    })
    expect(r.fourchetteMediane).toBeGreaterThan(1000)
    expect(r.fourchetteMediane).toBeLessThan(8000)
  })

  it('Paris (×1.45) > métropole standard', () => {
    const metro = calculerVtc({
      profil: 'auto-entrepreneur-solo',
      ageChauffeur: 38,
      ancienneteVTC: 2,
      ancienneteB: 15,
      zone: 'metropole',
      formule: 'tous-risques',
      vehicule: 'berline-classique',
      antecedents: 'aucun',
      effectifChauffeurs: 1,
    })
    const paris = calculerVtc({
      profil: 'auto-entrepreneur-solo',
      ageChauffeur: 38,
      ancienneteVTC: 2,
      ancienneteB: 15,
      zone: 'paris-petite-couronne',
      formule: 'tous-risques',
      vehicule: 'berline-classique',
      antecedents: 'aucun',
      effectifChauffeurs: 1,
    })
    expect(paris.fourchetteMediane).toBeGreaterThan(metro.fourchetteMediane * 1.4)
  })

  it('Permis < 3 ans = sur-prime ×1.45', () => {
    const exp = calculerVtc({
      profil: 'auto-entrepreneur-solo',
      ageChauffeur: 25,
      ancienneteVTC: 1,
      ancienneteB: 10,
      zone: 'metropole',
      formule: 'tous-risques',
      vehicule: 'berline-classique',
      antecedents: 'aucun',
      effectifChauffeurs: 1,
    })
    const novice = calculerVtc({
      profil: 'auto-entrepreneur-solo',
      ageChauffeur: 25,
      ancienneteVTC: 1,
      ancienneteB: 2,
      zone: 'metropole',
      formule: 'tous-risques',
      vehicule: 'berline-classique',
      antecedents: 'aucun',
      effectifChauffeurs: 1,
    })
    expect(novice.fourchetteMediane).toBeGreaterThan(exp.fourchetteMediane * 1.4)
  })

  it('Véhicule électrique = -8% bonus écologique', () => {
    const std = calculerVtc({
      profil: 'auto-entrepreneur-solo',
      ageChauffeur: 38,
      ancienneteVTC: 2,
      ancienneteB: 15,
      zone: 'metropole',
      formule: 'tous-risques',
      vehicule: 'berline-classique',
      antecedents: 'aucun',
      effectifChauffeurs: 1,
    })
    const elec = calculerVtc({
      profil: 'auto-entrepreneur-solo',
      ageChauffeur: 38,
      ancienneteVTC: 2,
      ancienneteB: 15,
      zone: 'metropole',
      formule: 'tous-risques',
      vehicule: 'electrique',
      antecedents: 'aucun',
      effectifChauffeurs: 1,
    })
    expect(elec.fourchetteMediane).toBeLessThan(std.fourchetteMediane)
  })

  it('Résilié pour sinistralité = sur-prime ×2.4', () => {
    const propre = calculerVtc({
      profil: 'auto-entrepreneur-solo',
      ageChauffeur: 38,
      ancienneteVTC: 2,
      ancienneteB: 15,
      zone: 'metropole',
      formule: 'tous-risques',
      vehicule: 'berline-classique',
      antecedents: 'aucun',
      effectifChauffeurs: 1,
    })
    const resilie = calculerVtc({
      profil: 'auto-entrepreneur-solo',
      ageChauffeur: 38,
      ancienneteVTC: 2,
      ancienneteB: 15,
      zone: 'metropole',
      formule: 'tous-risques',
      vehicule: 'berline-classique',
      antecedents: 'resilie',
      effectifChauffeurs: 1,
    })
    expect(resilie.fourchetteMediane).toBeGreaterThan(propre.fourchetteMediane * 2)
  })

  it('Flotte 5 véhicules ≈ 5× tarif solo (avec rabais volume)', () => {
    const solo = calculerVtc({
      profil: 'sarl-flotte',
      ageChauffeur: 38,
      ancienneteVTC: 2,
      ancienneteB: 15,
      zone: 'metropole',
      formule: 'tous-risques',
      vehicule: 'berline-classique',
      antecedents: 'aucun',
      effectifChauffeurs: 1,
    })
    const flotte = calculerVtc({
      profil: 'sarl-flotte',
      ageChauffeur: 38,
      ancienneteVTC: 2,
      ancienneteB: 15,
      zone: 'metropole',
      formule: 'tous-risques',
      vehicule: 'berline-classique',
      antecedents: 'aucun',
      effectifChauffeurs: 5,
    })
    expect(flotte.fourchetteMediane).toBeGreaterThan(solo.fourchetteMediane * 4)
  })
})
