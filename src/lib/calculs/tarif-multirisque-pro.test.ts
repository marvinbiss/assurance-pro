import { describe, it, expect } from 'vitest'
import { calculerMultirisque } from './tarif-multirisque-pro'

describe('Calculateur multirisque pro', () => {
  it('Bureau locataire 100m² CA 500k = ~500-2000€ par an', () => {
    const r = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'locataire',
      ca: 500000,
      formule: 'standard',
      valeurMobilier: 50000,
      pertesExploitation: false,
      zone: 'metropole',
    })
    expect(r.cotisationAnnuelle).toBeGreaterThan(300)
    expect(r.cotisationAnnuelle).toBeLessThan(5000)
  })

  it('Restaurant > Bureau (sur-prime cuisine + intoxications)', () => {
    const bureau = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'locataire',
      ca: 500000,
      formule: 'standard',
      valeurMobilier: 30000,
      pertesExploitation: false,
      zone: 'metropole',
    })
    const resto = calculerMultirisque({
      typeLocaux: 'restaurant',
      surface: 100,
      statut: 'locataire',
      ca: 500000,
      formule: 'standard',
      valeurMobilier: 30000,
      pertesExploitation: false,
      zone: 'metropole',
    })
    expect(resto.cotisationAnnuelle).toBeGreaterThan(bureau.cotisationAnnuelle * 2)
  })

  it('Propriétaire occupant (×1.45) > Locataire', () => {
    const loc = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'locataire',
      ca: 500000,
      formule: 'standard',
      valeurMobilier: 50000,
      pertesExploitation: false,
      zone: 'metropole',
    })
    const prop = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'proprietaire-occupant',
      ca: 500000,
      formule: 'standard',
      valeurMobilier: 50000,
      pertesExploitation: false,
      zone: 'metropole',
    })
    expect(prop.cotisationAnnuelle).toBeGreaterThan(loc.cotisationAnnuelle * 1.4)
  })

  it('Perte exploitation ajoute +18%', () => {
    const sans = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'locataire',
      ca: 500000,
      formule: 'standard',
      valeurMobilier: 50000,
      pertesExploitation: false,
      zone: 'metropole',
    })
    const avec = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'locataire',
      ca: 500000,
      formule: 'standard',
      valeurMobilier: 50000,
      pertesExploitation: true,
      zone: 'metropole',
    })
    const ratio = avec.cotisationAnnuelle / sans.cotisationAnnuelle
    expect(ratio).toBeGreaterThan(1.15)
    expect(ratio).toBeLessThan(1.22)
  })

  it('Garanties incluses correctement selon formule', () => {
    const ess = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'locataire',
      ca: 100000,
      formule: 'essentielle',
      valeurMobilier: 10000,
      pertesExploitation: false,
      zone: 'metropole',
    })
    const std = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'locataire',
      ca: 100000,
      formule: 'standard',
      valeurMobilier: 10000,
      pertesExploitation: false,
      zone: 'metropole',
    })
    expect(ess.garanties.find((g) => g.nom === 'Vol — vandalisme')?.couvert).toBe(false)
    expect(std.garanties.find((g) => g.nom === 'Vol — vandalisme')?.couvert).toBe(true)
  })

  it('Zone Paris / IDF (×1.22) > métropole', () => {
    const metro = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'locataire',
      ca: 500000,
      formule: 'standard',
      valeurMobilier: 50000,
      pertesExploitation: false,
      zone: 'metropole',
    })
    const paris = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'locataire',
      ca: 500000,
      formule: 'standard',
      valeurMobilier: 50000,
      pertesExploitation: false,
      zone: 'paris-idf',
    })
    expect(paris.cotisationAnnuelle).toBeGreaterThan(metro.cotisationAnnuelle * 1.18)
  })

  it('Cotisation mensuelle = annuelle — 12', () => {
    const r = calculerMultirisque({
      typeLocaux: 'bureau',
      surface: 100,
      statut: 'locataire',
      ca: 500000,
      formule: 'standard',
      valeurMobilier: 50000,
      pertesExploitation: false,
      zone: 'metropole',
    })
    expect(r.cotisationMensuelle).toBe(Math.round(r.cotisationAnnuelle / 12))
  })
})
