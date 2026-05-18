import { describe, it, expect } from 'vitest'
import { calculerCyber } from './tarif-cyber'

describe('Calculateur tarif cyber assurance', () => {
  it('TPE services CA 200k = tarif standard 380-1280€', () => {
    const r = calculerCyber({
      secteur: 'tpe-services',
      ca: 200000,
      effectif: 5,
      donneesVolume: '1k-10k',
      maturite: 'basique',
      plafond: 500000,
      franchise: 5000,
    })
    expect(r.fourchetteMediane).toBeGreaterThan(200)
    expect(r.fourchetteMediane).toBeLessThan(3000)
  })

  it('Santé / médical = secteur RGPD le plus risqué', () => {
    const tpe = calculerCyber({
      secteur: 'tpe-services',
      ca: 500000,
      effectif: 10,
      donneesVolume: '10k-100k',
      maturite: 'basique',
      plafond: 1000000,
      franchise: 5000,
    })
    const sante = calculerCyber({
      secteur: 'sante-medical',
      ca: 500000,
      effectif: 10,
      donneesVolume: '10k-100k',
      maturite: 'basique',
      plafond: 1000000,
      franchise: 5000,
    })
    expect(sante.fourchetteMediane).toBeGreaterThan(tpe.fourchetteMediane * 2)
  })

  it('ISO 27001 = -22% rabais maturité', () => {
    const aucune = calculerCyber({
      secteur: 'pme-services',
      ca: 1000000,
      effectif: 30,
      donneesVolume: '10k-100k',
      maturite: 'aucune',
      plafond: 1000000,
      franchise: 5000,
    })
    const iso = calculerCyber({
      secteur: 'pme-services',
      ca: 1000000,
      effectif: 30,
      donneesVolume: '10k-100k',
      maturite: 'iso27001',
      plafond: 1000000,
      franchise: 5000,
    })
    expect(iso.fourchetteMediane).toBeLessThan(aucune.fourchetteMediane * 0.7)
  })

  it('Plafond 10M€ ≈ 2.6× plafond 1M€ référence', () => {
    const ref = calculerCyber({
      secteur: 'pme-services',
      ca: 500000,
      effectif: 10,
      donneesVolume: '1k-10k',
      maturite: 'basique',
      plafond: 1000000,
      franchise: 5000,
    })
    const max = calculerCyber({
      secteur: 'pme-services',
      ca: 500000,
      effectif: 10,
      donneesVolume: '1k-10k',
      maturite: 'basique',
      plafond: 10000000,
      franchise: 5000,
    })
    const ratio = max.fourchetteMediane / ref.fourchetteMediane
    expect(ratio).toBeGreaterThan(2.3)
    expect(ratio).toBeLessThan(2.9)
  })

  it('Volume données 1M+ = sur-prime ×2.45 vs 1k-10k', () => {
    const std = calculerCyber({
      secteur: 'pme-services',
      ca: 500000,
      effectif: 20,
      donneesVolume: '1k-10k',
      maturite: 'basique',
      plafond: 1000000,
      franchise: 5000,
    })
    const giga = calculerCyber({
      secteur: 'pme-services',
      ca: 500000,
      effectif: 20,
      donneesVolume: 'plus-1m',
      maturite: 'basique',
      plafond: 1000000,
      franchise: 5000,
    })
    expect(giga.fourchetteMediane).toBeGreaterThan(std.fourchetteMediane * 2.0)
  })
})
