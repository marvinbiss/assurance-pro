/**
 * Tests unitaires TrustBadgesAcpr.
 *
 * Couvre :
 *   - Rendu des 3 badges : ORIAS, ACPR, DDA
 *   - aria-label correct par badge
 *   - Numéro ORIAS optionnel : affiché si fourni, sinon "XXX"
 *   - aria-label du UL conteneur "Badges de conformité réglementaire"
 *   - tabIndex=0 (focusable au clavier)
 *   - className propagée
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TrustBadgesAcpr } from '../trust-badges-acpr'

describe('TrustBadgesAcpr', () => {
  it('rend les 3 badges ORIAS — ACPR — DDA', () => {
    render(<TrustBadgesAcpr />)
    expect(screen.getByText(/ORIAS/i)).toBeInTheDocument()
    expect(screen.getByText(/ACPR Conformité/i)).toBeInTheDocument()
    expect(screen.getByText(/DDA Compliant/i)).toBeInTheDocument()
  })

  it('affiche numéro ORIAS si fourni en prop', () => {
    render(<TrustBadgesAcpr orias="07 012 345" />)
    expect(screen.getByText(/ORIAS n°07 012 345/i)).toBeInTheDocument()
  })

  it('fallback à "ORIAS n°XXX" si pas de numéro fourni', () => {
    render(<TrustBadgesAcpr />)
    expect(screen.getByText(/ORIAS n°XXX/i)).toBeInTheDocument()
  })

  it('aria-label correct sur chaque badge', () => {
    render(<TrustBadgesAcpr orias="07 000 001" />)
    expect(screen.getByLabelText(/Inscription ORIAS — ORIAS n°07 000 001/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/Conformité ACPR — Autorité de Contrôle Prudentiel/i)
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/Conformité DDA — Directive sur la Distribution/i)
    ).toBeInTheDocument()
  })

  it('liste accessible avec aria-label "Badges de conformité réglementaire"', () => {
    render(<TrustBadgesAcpr />)
    expect(screen.getByLabelText(/Badges de conformité réglementaire/i)).toBeInTheDocument()
  })

  it('badges focusables au clavier (tabIndex=0)', () => {
    render(<TrustBadgesAcpr />)
    const oriasBadge = screen.getByLabelText(/Inscription ORIAS/i)
    expect(oriasBadge.getAttribute('tabIndex')).toBe('0')
  })

  it('propage la className personnalisée sur le ul', () => {
    const { container } = render(<TrustBadgesAcpr className="custom-x mt-8" />)
    const ul = container.querySelector('ul')
    expect(ul?.className).toContain('mt-8')
    expect(ul?.className).toContain('custom-x')
  })

  it('chaque badge a un title (tooltip) descriptif', () => {
    render(<TrustBadgesAcpr orias="07 999 999" />)
    const orias = screen.getByLabelText(/Inscription ORIAS/i)
    expect(orias.getAttribute('title')).toContain('07 999 999')
  })
})
