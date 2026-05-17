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
})
