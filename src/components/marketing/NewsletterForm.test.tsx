/**
 * Tests unitaires NewsletterForm (variant compact + card).
 *
 * Couvre :
 *   - Rendu initial : email vide, bouton submit, checkbox consent
 *   - Validation : email manquant, consent manquant
 *   - Submit happy path : POST /api/newsletter avec body correct
 *   - Error 429 (rate limit) → message dédié
 *   - Success → écran de confirmation
 *   - Variant 'card' affiche titre + description, 'compact' non
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NewsletterForm } from './NewsletterForm'

describe('NewsletterForm', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('rend le formulaire avec input email et checkbox consent (variant compact)', () => {
    render(<NewsletterForm />)
    expect(screen.getByPlaceholderText(/prenom@exemple/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /S'inscrire à la newsletter/i })).toBeInTheDocument()
  })

  it('rend le titre + description en variant card', () => {
    render(<NewsletterForm variant="card" />)
    expect(screen.getByText(/Newsletter mensuelle Vivos/i)).toBeInTheDocument()
    expect(screen.getByText(/ACPR · DDA · Loi Spinetta/i)).toBeInTheDocument()
  })

  it('refuse le submit sans consent', async () => {
    render(<NewsletterForm />)
    const emailInput = screen.getByPlaceholderText(/prenom@exemple/i)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    const form = emailInput.closest('form')!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Consentement RGPD requis/i)
    })
  })

  it('refuse le submit avec email vide même si consent coché', async () => {
    render(<NewsletterForm />)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    const form = screen.getByPlaceholderText(/prenom@exemple/i).closest('form')!
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Email requis/i)
    })
  })

  it('submit happy path → POST /api/newsletter + écran succès', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ success: true }),
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<NewsletterForm />)
    fireEvent.change(screen.getByPlaceholderText(/prenom@exemple/i), {
      target: { value: 'newuser@example.com' },
    })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.submit(screen.getByPlaceholderText(/prenom@exemple/i).closest('form')!)

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/Inscription confirmée/i)
    })

    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, opts] = fetchMock.mock.calls[0]!
    expect(url).toBe('/api/newsletter')
    expect(opts.method).toBe('POST')
    expect(JSON.parse(opts.body as string)).toEqual({
      email: 'newuser@example.com',
      consent: true,
    })
  })

  it('rate limit 429 → message dédié', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        json: () => Promise.resolve({ error: 'rate' }),
      })
    )

    render(<NewsletterForm />)
    fireEvent.change(screen.getByPlaceholderText(/prenom@exemple/i), {
      target: { value: 'rate@example.com' },
    })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.submit(screen.getByPlaceholderText(/prenom@exemple/i).closest('form')!)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Trop de tentatives/i)
    })
  })

  it('error réseau → message dédié + état error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network down')))

    render(<NewsletterForm />)
    fireEvent.change(screen.getByPlaceholderText(/prenom@exemple/i), {
      target: { value: 'net@example.com' },
    })
    fireEvent.click(screen.getByRole('checkbox'))
    fireEvent.submit(screen.getByPlaceholderText(/prenom@exemple/i).closest('form')!)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/Erreur réseau/i)
    })
  })

  it('lien Politique RGPD pointe vers /confidentialite', () => {
    render(<NewsletterForm variant="card" />)
    const link = screen.getByRole('link', { name: /Politique RGPD/i })
    expect(link).toHaveAttribute('href', '/confidentialite')
  })
})
