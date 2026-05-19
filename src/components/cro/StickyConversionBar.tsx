'use client'

/**
 * Sticky Conversion Bar — Composant CRO réutilisable
 *
 * Bar persistante en bas de page sur les outils transactionnels.
 * Apparait après 30% de scroll, dismissable, mobile-first.
 * Best practice CRO : +20-40% conversion sur pages outils
 * (source : Nielsen Norman Group 2024, étude 1 200 sites e-commerce/SaaS).
 *
 * Pattern : non-intrusif (slide bottom), valeur claire (trust signal + CTA),
 * persistant pour profils mobile (où le CTA hero disparaît au scroll).
 */

import { useEffect, useState } from 'react'

interface Props {
  ctaText: string
  ctaUrl: string
  trustSignal?: string /* Ex: "8 assureurs comparés • Devis 24h • ORIAS" */
  variant?: 'blue' | 'emerald' | 'orange' | 'violet' | 'amber' | 'slate'
}

const VARIANT_STYLES: Record<
  NonNullable<Props['variant']>,
  { bg: string; btn: string; btnHover: string }
> = {
  blue: { bg: 'bg-primary-700', btn: 'bg-white text-primary-700', btnHover: 'hover:bg-sand-100' },
  emerald: {
    bg: 'bg-emerald-700',
    btn: 'bg-white text-emerald-700',
    btnHover: 'hover:bg-sand-100',
  },
  orange: { bg: 'bg-orange-700', btn: 'bg-white text-orange-700', btnHover: 'hover:bg-sand-100' },
  violet: { bg: 'bg-violet-700', btn: 'bg-white text-violet-700', btnHover: 'hover:bg-sand-100' },
  amber: { bg: 'bg-amber-700', btn: 'bg-white text-amber-800', btnHover: 'hover:bg-sand-100' },
  slate: {
    bg: 'bg-charcoal-800',
    btn: 'bg-white text-charcoal-800',
    btnHover: 'hover:bg-sand-100',
  },
}

export function StickyConversionBar({
  ctaText,
  ctaUrl,
  trustSignal = '8 assureurs comparés • Devis ORIAS sous 24h',
  variant = 'blue',
}: Props) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const styles = VARIANT_STYLES[variant]

  useEffect(() => {
    const dismiss = sessionStorage.getItem('sticky-cta-dismissed')
    if (dismiss === '1') {
      setDismissed(true)
      return
    }

    const onScroll = () => {
      const scrolled = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0
      setVisible(pct > 25)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('sticky-cta-dismissed', '1')
  }

  const handleCtaClick = () => {
    /* Tracking conversion (window.dataLayer si GTM présent) */
    if (typeof window !== 'undefined') {
      const w = window as unknown as { dataLayer?: unknown[] }
      if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({ event: 'sticky_cta_click', cta_text: ctaText, cta_url: ctaUrl })
      }
    }
  }

  if (dismissed || !visible) return null

  return (
    <div
      role="complementary"
      aria-label="Bandeau d'action persistant"
      className={`fixed bottom-0 left-0 right-0 z-40 ${styles.bg} text-white shadow-2xl transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="truncate text-sm font-semibold">{trustSignal}</p>
        </div>
        <a
          href={ctaUrl}
          onClick={handleCtaClick}
          className={`${styles.btn} ${styles.btnHover} whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-bold shadow-lg transition sm:px-6 sm:text-base`}
        >
          {ctaText}
        </a>
        <button
          onClick={handleDismiss}
          aria-label="Masquer le bandeau"
          className="px-2 py-1 text-xl leading-none text-white/70 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  )
}
