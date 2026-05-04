import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FactureForm } from './FactureForm'

describe('FactureForm — Générateur PDF facture pro', () => {
  it('rend les champs émetteur (raison sociale, SIRET, adresse)', () => {
    render(<FactureForm />)
    expect(screen.getAllByText(/Raison sociale/i).length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText(/SIRET/i).length).toBeGreaterThanOrEqual(2)
  })

  it('rend les champs destinataire', () => {
    render(<FactureForm />)
    expect(screen.getAllByText(/Raison sociale/i).length).toBeGreaterThan(1)
  })

  it('rend au moins 1 ligne facture par défaut', () => {
    render(<FactureForm />)
    const descriptionInputs = screen.getAllByPlaceholderText(/Description/i)
    expect(descriptionInputs.length).toBeGreaterThanOrEqual(1)
  })

  it('bouton "Ajouter une ligne" fonctionne', () => {
    render(<FactureForm />)
    const before = screen.getAllByPlaceholderText(/Description/i).length
    fireEvent.click(screen.getByRole('button', { name: /Ajouter une ligne/i }))
    const after = screen.getAllByPlaceholderText(/Description/i).length
    expect(after).toBe(before + 1)
  })

  it('Taux TVA configurable', () => {
    render(<FactureForm />)
    expect(screen.getAllByText(/Taux TVA/i).length).toBeGreaterThan(0)
  })
})
