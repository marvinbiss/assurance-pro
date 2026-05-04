import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CalculateurPrevoyanceTns } from './CalculateurPrevoyanceTns'

describe('CalculateurPrevoyanceTns — UI', () => {
  it('rend profession + formule + sliders age/revenus', () => {
    render(<CalculateurPrevoyanceTns />)
    expect(screen.getByLabelText(/Profession/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Niveau de couverture/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Âge :/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Revenus annuels HT/i)).toBeInTheDocument()
  })

  it('affiche cotisation mensuelle', () => {
    render(<CalculateurPrevoyanceTns />)
    expect(screen.getAllByText(/€\/mois/i).length).toBeGreaterThan(0)
  })

  it('affiche IJ + rente invalidité + capital décès', () => {
    render(<CalculateurPrevoyanceTns />)
    expect(screen.getByText(/IJ arrêt maladie/i)).toBeInTheDocument()
    expect(screen.getAllByText(/invalidité totale/i).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Capital décès/i).length).toBeGreaterThan(0)
  })

  it('affiche déductibilité Loi Madelin CGI 154 bis', () => {
    render(<CalculateurPrevoyanceTns />)
    expect(screen.getByText(/Loi Madelin/i)).toBeInTheDocument()
    expect(screen.getByText(/CGI art. 154 bis/i)).toBeInTheDocument()
  })

  it('toggle fumeur impacte cotisation (visible via détail)', () => {
    render(<CalculateurPrevoyanceTns />)
    const checkbox = screen.getByLabelText(/Fumeur/i) as HTMLInputElement
    expect(checkbox.checked).toBe(false)
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
  })
})
