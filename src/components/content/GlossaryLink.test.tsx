import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GlossaryLink } from './GlossaryLink'

describe('GlossaryLink', () => {
  it('rend lien vers /glossaire#orias pour terme valide', () => {
    render(<GlossaryLink termId="orias" />)
    const link = screen.getByRole('link', { name: /ORIAS/i })
    expect(link.getAttribute('href')).toBe('/glossaire#orias')
  })

  it('utilise children custom au lieu du term par défaut', () => {
    render(<GlossaryLink termId="orias">cabinet ORIAS</GlossaryLink>)
    expect(screen.getByText(/cabinet ORIAS/i)).toBeInTheDocument()
  })

  it('a un title (tooltip natif HTML)', () => {
    render(<GlossaryLink termId="orias" />)
    const link = screen.getByRole('link', { name: /ORIAS/i })
    expect(link.getAttribute('title')).toBeTruthy()
    expect(link.getAttribute('title')!.length).toBeGreaterThan(20)
  })

  it('a un aria-label complet pour a11y', () => {
    render(<GlossaryLink termId="rgpd" />)
    const link = screen.getByRole('link', { name: /RGPD/i })
    expect(link.getAttribute('aria-label')).toContain('RGPD')
  })

  it('fallback gracieux si terme inexistant', () => {
    render(<GlossaryLink termId="terme-inexistant-xyz">fallback texte</GlossaryLink>)
    expect(screen.getByText('fallback texte')).toBeInTheDocument()
    /* Pas de lien dans ce cas */
    expect(screen.queryByRole('link')).toBeNull()
  })

  it('underline pointillé (visual cue glossaire)', () => {
    render(<GlossaryLink termId="acpr" />)
    const link = screen.getByRole('link', { name: /ACPR/i })
    expect(link.className).toContain('decoration-dotted')
  })
})
