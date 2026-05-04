import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StickyConversionBar } from './StickyConversionBar'

describe('StickyConversionBar', () => {
  beforeEach(() => {
    sessionStorage.clear()
    /* Force scroll position pour test */
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
  })

  it('rend le CTA et le trust signal', () => {
    /* Force scroll passé 25% pour faire apparaître la bar */
    window.scrollY = 1000
    render(<StickyConversionBar ctaText="Devis 24h" ctaUrl="/devis" trustSignal="ORIAS" />)
    fireEvent.scroll(window)
    expect(screen.getByRole('link', { name: /Devis 24h/ })).toBeInTheDocument()
  })

  it('CTA pointe vers la bonne URL', () => {
    window.scrollY = 1000
    render(<StickyConversionBar ctaText="Devis" ctaUrl="/outils/devis-rc-pro" />)
    fireEvent.scroll(window)
    const link = screen.getByRole('link', { name: /Devis/ })
    expect(link).toHaveAttribute('href', '/outils/devis-rc-pro')
  })

  it('appelle dataLayer.push au click', () => {
    window.scrollY = 1000
    const dl: unknown[] = []
    ;(window as unknown as { dataLayer: unknown[] }).dataLayer = dl
    render(<StickyConversionBar ctaText="Devis" ctaUrl="/devis" />)
    fireEvent.scroll(window)
    fireEvent.click(screen.getByRole('link', { name: /Devis/ }))
    expect(dl.length).toBeGreaterThan(0)
    expect(dl[0]).toMatchObject({ event: 'sticky_cta_click' })
  })

  it('disparait après dismiss + persiste sessionStorage', () => {
    window.scrollY = 1000
    render(<StickyConversionBar ctaText="Devis" ctaUrl="/devis" />)
    fireEvent.scroll(window)
    fireEvent.click(screen.getByLabelText(/Masquer le bandeau/))
    expect(screen.queryByRole('link', { name: /Devis/ })).not.toBeInTheDocument()
    expect(sessionStorage.getItem('sticky-cta-dismissed')).toBe('1')
  })

  it('respecte le dismiss si déjà dans sessionStorage', () => {
    sessionStorage.setItem('sticky-cta-dismissed', '1')
    window.scrollY = 1000
    render(<StickyConversionBar ctaText="Devis" ctaUrl="/devis" />)
    fireEvent.scroll(window)
    expect(screen.queryByRole('link', { name: /Devis/ })).not.toBeInTheDocument()
  })

  it('supporte les 6 variantes de couleur sans crash', () => {
    const variants: Array<'blue' | 'emerald' | 'orange' | 'violet' | 'amber' | 'slate'> = [
      'blue',
      'emerald',
      'orange',
      'violet',
      'amber',
      'slate',
    ]
    variants.forEach((v) => {
      window.scrollY = 1000
      const { unmount } = render(<StickyConversionBar ctaText="C" ctaUrl="/x" variant={v} />)
      fireEvent.scroll(window)
      unmount()
      sessionStorage.clear()
    })
  })
})
