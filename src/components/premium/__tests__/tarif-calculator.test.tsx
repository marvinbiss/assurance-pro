/**
 * Tests unitaires TarifCalculator — composant premium.
 *
 * Couvre :
 *   - Rendu par défaut (4 garanties × 1 sélection métier)
 *   - Sélection métier modifie le résultat affiché
 *   - Slider CA modifie le résultat (déclenche re-calc)
 *   - Statut juridique (auto-entrepreneur réduit le prix vs SARL)
 *   - Lien CTA /devis présent et accessible
 *   - Accessibilité : labels, role radiogroup, aria-live result
 */

import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TarifCalculator } from '../tarif-calculator'

function extractPriceFromText(text: string | null): number {
  if (!text) return NaN
  // Format "1 200 € → 1 800 €/an" — récupérer 1er nombre
  const cleaned = text.replace(/\s/g, '').replace(/[€/an→]/g, ' ')
  const match = cleaned.match(/\d+/g)
  if (!match || match.length === 0) return NaN
  return Number(match[0])
}

describe('TarifCalculator', () => {
  it('rend le calculateur décennale avec select métier par défaut', () => {
    render(<TarifCalculator garantie="decennale" />)
    expect(screen.getByLabelText(/Sélection du métier/i)).toBeInTheDocument()
    expect(screen.getByText(/Décennale BTP — votre fourchette annuelle/i)).toBeInTheDocument()
  })

  it('rend les 4 garanties classiques avec select métier', () => {
    const garanties: Array<'decennale' | 'rc-pro' | 'multirisque-pro' | 'cyber'> = [
      'decennale',
      'rc-pro',
      'multirisque-pro',
      'cyber',
    ]
    for (const g of garanties) {
      const { unmount } = render(<TarifCalculator garantie={g} />)
      expect(screen.getByLabelText(/Sélection du métier/i)).toBeInTheDocument()
      unmount()
    }
  })

  it('rend la verticale mutuelle-pro avec champs spécifiques (âge, niveau, ayants droit)', () => {
    render(<TarifCalculator garantie="mutuelle-pro" />)
    expect(screen.getByText(/Mutuelle TNS \/ Pro — votre fourchette annuelle/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Âge en années/i)).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Niveau de couverture/i })).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Ayants droit/i })).toBeInTheDocument()
  })

  it('rend la verticale vtc avec champs spécifiques (zone, permis, véhicule, plateforme)', () => {
    render(<TarifCalculator garantie="vtc" />)
    expect(
      screen.getByText(/Assurance VTC \/ Taxi — votre fourchette annuelle/i)
    ).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Zone d'exploitation/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Ancienneté du permis B en années/i)).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Catégorie véhicule/i })).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Mode d'exploitation/i })).toBeInTheDocument()
  })

  it('rend la verticale multirisque-pro avec surface + valeur contenu', () => {
    render(<TarifCalculator garantie="multirisque-pro" />)
    expect(screen.getByLabelText(/Surface du local en mètres carrés/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Valeur du contenu en euros/i)).toBeInTheDocument()
  })

  it('rend la verticale cyber avec toggle données sensibles', () => {
    render(<TarifCalculator garantie="cyber" />)
    expect(screen.getByText(/Données sensibles/i)).toBeInTheDocument()
  })

  it('rend la verticale décennale avec ancienneté + sinistralité', () => {
    render(<TarifCalculator garantie="decennale" />)
    expect(screen.getByRole('radiogroup', { name: /Ancienneté entreprise/i })).toBeInTheDocument()
    expect(
      screen.getByRole('radiogroup', { name: /Sinistralité 24 derniers mois/i })
    ).toBeInTheDocument()
  })

  it('rend la verticale rc-pro avec effectif + activité sensible', () => {
    render(<TarifCalculator garantie="rc-pro" />)
    expect(screen.getByLabelText(/Nombre de salariés/i)).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Type de mission/i })).toBeInTheDocument()
  })

  it('affiche un range "min → max" en euros avec /an', () => {
    render(<TarifCalculator garantie="rc-pro" />)
    // Le résultat est rendu dans un élément aria-live="polite"
    const result = document.querySelector('[aria-live="polite"]')
    expect(result).not.toBeNull()
    expect(result?.textContent).toMatch(/€/)
    expect(result?.textContent).toMatch(/\/an/)
  })

  it('le slider CA modifie le résultat (calcul recalculé)', () => {
    render(<TarifCalculator garantie="decennale" />)
    const slider = screen.getByLabelText(/Chiffre d'affaires/i) as HTMLInputElement
    const resultBefore = document.querySelector('[aria-live="polite"]')?.textContent ?? ''
    const priceBefore = extractPriceFromText(resultBefore)

    fireEvent.change(slider, { target: { value: '300000' } })

    const resultAfter = document.querySelector('[aria-live="polite"]')?.textContent ?? ''
    const priceAfter = extractPriceFromText(resultAfter)

    expect(priceAfter).toBeGreaterThan(priceBefore)
  })

  it('statut auto-entrepreneur réduit le tarif vs SARL', () => {
    render(<TarifCalculator garantie="rc-pro" />)
    const resultSarl = document.querySelector('[aria-live="polite"]')?.textContent ?? ''
    const priceSarl = extractPriceFromText(resultSarl)

    const autoEntr = screen.getByLabelText(/Statut Auto-entrepreneur/i) as HTMLInputElement
    fireEvent.click(autoEntr)

    const resultAe = document.querySelector('[aria-live="polite"]')?.textContent ?? ''
    const priceAe = extractPriceFromText(resultAe)

    expect(priceAe).toBeLessThan(priceSarl)
  })

  it('select métier change → résultat se met à jour', () => {
    render(<TarifCalculator garantie="decennale" />)
    const select = screen.getByLabelText(/Sélection du métier/i) as HTMLSelectElement
    const resultDefault = document.querySelector('[aria-live="polite"]')?.textContent ?? ''
    const priceDefault = extractPriceFromText(resultDefault)

    // Couvreur (base 2000) — bien plus cher que plombier (1100)
    fireEvent.change(select, { target: { value: 'couvreur' } })

    const resultCouvreur = document.querySelector('[aria-live="polite"]')?.textContent ?? ''
    const priceCouvreur = extractPriceFromText(resultCouvreur)

    expect(priceCouvreur).toBeGreaterThan(priceDefault)
  })

  it('CTA "Devis exact en 24h" pointe vers /devis', () => {
    render(<TarifCalculator garantie="decennale" />)
    const cta = screen.getByRole('link', { name: /Obtenir un devis exact/i })
    expect(cta).toHaveAttribute('href', '/devis')
  })

  it('expose un groupe radio statut juridique accessible', () => {
    render(<TarifCalculator garantie="cyber" />)
    expect(screen.getByRole('radiogroup', { name: /Statut juridique/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Statut Auto-entrepreneur/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Statut SARL/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Statut SAS/i)).toBeInTheDocument()
  })

  // --- Verticales additionnelles (8 nouvelles) -----------------------------

  it('rend flotte-auto avec nb véhicules + type véhicule + bonus-malus', () => {
    render(<TarifCalculator garantie="flotte-auto" />)
    expect(screen.getByLabelText(/Nombre de véhicules dans la flotte/i)).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Type de véhicules/i })).toBeInTheDocument()
    expect(
      screen.getByRole('radiogroup', { name: /Bonus-malus moyen flotte/i })
    ).toBeInTheDocument()
  })

  it('rend dommages-ouvrage avec coût travaux + type ouvrage + maîtrise', () => {
    render(<TarifCalculator garantie="dommages-ouvrage" />)
    expect(screen.getByLabelText(/Coût total des travaux en euros/i)).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Type d'ouvrage/i })).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Maîtrise d'ouvrage/i })).toBeInTheDocument()
  })

  it('rend tous-risques-chantier avec coût + durée + complexité', () => {
    render(<TarifCalculator garantie="tous-risques-chantier" />)
    expect(screen.getByLabelText(/Coût total du chantier en euros/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Durée du chantier en mois/i)).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Complexité technique/i })).toBeInTheDocument()
  })

  it('rend transport-marchandises avec nb véhicules + type march. + zone + valeur', () => {
    render(<TarifCalculator garantie="transport-marchandises" />)
    expect(screen.getByLabelText(/Nombre de véhicules transport/i)).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Type de marchandises/i })).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Zone géographique/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Valeur moyenne du convoi en euros/i)).toBeInTheDocument()
  })

  it('rend moto-pro avec cylindrée + usage + permis + zone', () => {
    render(<TarifCalculator garantie="moto-pro" />)
    expect(screen.getByRole('radiogroup', { name: /Cylindrée/i })).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Usage professionnel/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Ancienneté du permis A en années/i)).toBeInTheDocument()
  })

  it('rend prevoyance avec revenu mensuel + âge + niveau couverture', () => {
    render(<TarifCalculator garantie="prevoyance" />)
    expect(screen.getByLabelText(/Revenu mensuel en euros/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Âge en années/i)).toBeInTheDocument()
    expect(screen.getByRole('radiogroup', { name: /Niveau de couverture/i })).toBeInTheDocument()
  })

  it('rend protection-juridique avec secteur + CA + litiges', () => {
    render(<TarifCalculator garantie="protection-juridique" />)
    expect(screen.getByRole('radiogroup', { name: /Secteur d'activité/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/Chiffre d'affaires annuel en euros/i)).toBeInTheDocument()
    expect(
      screen.getByRole('radiogroup', { name: /Litiges 24 derniers mois/i })
    ).toBeInTheDocument()
  })

  it('rend homme-cle avec capital + CA + nb dirigeants + secteur', () => {
    render(<TarifCalculator garantie="homme-cle" />)
    expect(screen.getByLabelText(/Capital assuré en euros/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/Chiffre d'affaires annuel entreprise en euros/i)
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/Nombre d'hommes-clés/i)).toBeInTheDocument()
  })

  // --- CA caps (>500k€ doit être possible) ---------------------------------

  it('décennale: slider CA accepte 1 500 000 € (au-delà ancienne limite 500k)', () => {
    render(<TarifCalculator garantie="decennale" />)
    const slider = screen.getByLabelText(/Chiffre d'affaires annuel en euros/i) as HTMLInputElement
    fireEvent.change(slider, { target: { value: '1500000' } })
    expect(Number(slider.value)).toBe(1_500_000)
  })

  it("cyber: slider CA accepte 8 000 000 € (PME tech jusqu'à 10M)", () => {
    render(<TarifCalculator garantie="cyber" />)
    const slider = screen.getByLabelText(/Chiffre d'affaires annuel en euros/i) as HTMLInputElement
    fireEvent.change(slider, { target: { value: '8000000' } })
    expect(Number(slider.value)).toBe(8_000_000)
  })
})
