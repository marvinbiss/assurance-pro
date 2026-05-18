'use client'

/**
 * ExitIntentPopup — Capture leads partants
 *
 * Pattern : détecte mouseleave vers le haut (sortie navigateur) et affiche
 * un popup avec offre/CTA. Trigger une seule fois par session.
 *
 * Best practice CRO : +5-15% de leads supplémentaires sur sites e-commerce/SaaS
 * (source : OptinMonster 2024, étude 1 800 sites).
 *
 * Conformité RGPD : ne capture pas de PII automatiquement, juste affiche un CTA.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'

export interface ExitIntentPopupProps {
  title?: string
  message?: string
  ctaText: string
  ctaUrl: string
  /** Activer le popup uniquement si scroll >= ce % (évite popups trop tôt) */
  minScrollPct?: number
}

const SESSION_KEY = 'exit-intent-shown'

export function ExitIntentPopup({
  title = 'Vous partez déjà ?',
  message = 'Recevez 3 devis personnalisés sous 24h. Cabinet ORIAS, gratuit, sans engagement.',
  ctaText = '→ Recevoir 3 devis',
  ctaUrl,
  minScrollPct = 30,
}: ExitIntentPopupProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === '1') {
      setDismissed(true)
      return
    }

    let scrollPctReached = false

    const onScroll = () => {
      const scrolled = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 100
      if (pct >= minScrollPct) scrollPctReached = true
    }

    const onMouseLeave = (e: MouseEvent) => {
      /* mouseleave vers le haut + scroll suffisant + pas déjà affiché */
      if (e.clientY <= 0 && scrollPctReached && !visible) {
        setVisible(true)
        sessionStorage.setItem(SESSION_KEY, '1')
        if (typeof window !== 'undefined') {
          const w = window as unknown as { dataLayer?: unknown[] }
          if (Array.isArray(w.dataLayer)) {
            w.dataLayer.push({ event: 'exit_intent_shown', cta_url: ctaUrl })
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [visible, minScrollPct, ctaUrl])

  const handleDismiss = () => {
    setDismissed(true)
    setVisible(false)
  }

  const handleCtaClick = () => {
    if (typeof window !== 'undefined') {
      const w = window as unknown as { dataLayer?: unknown[] }
      if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({ event: 'exit_intent_click', cta_url: ctaUrl })
      }
    }
  }

  if (!visible || dismissed) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-50 flex animate-fade-in items-center justify-center bg-black/50 p-4"
      onClick={handleDismiss}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleDismiss}
          aria-label="Fermer le popup"
          className="absolute right-3 top-3 h-8 w-8 text-2xl leading-none text-charcoal-500 hover:text-charcoal-700"
        >
          ×
        </button>

        <div className="mb-3 text-4xl" aria-hidden="true">
          ⏱️
        </div>
        <h2 id="exit-intent-title" className="mb-2 text-2xl font-bold text-charcoal-900">
          {title}
        </h2>
        <p className="mb-5 text-charcoal-700">{message}</p>

        <div className="mb-5 space-y-2 text-sm text-charcoal-600">
          <p className="flex items-center gap-2">
            <span className="font-bold text-emerald-600">✓</span> 8 assureurs comparés
          </p>
          <p className="flex items-center gap-2">
            <span className="font-bold text-emerald-600">✓</span> Réponse sous 24h ouvrées
          </p>
          <p className="flex items-center gap-2">
            <span className="font-bold text-emerald-600">✓</span> Cabinet ORIAS — sans engagement
          </p>
        </div>

        <Link
          href={ctaUrl}
          onClick={handleCtaClick}
          className="block w-full rounded-lg bg-primary-700 px-6 py-3 text-center font-bold text-white shadow-lg transition hover:bg-primary-800"
        >
          {ctaText}
        </Link>
        <button
          onClick={handleDismiss}
          className="mt-2 block w-full py-2 text-sm text-charcoal-500 hover:text-charcoal-700"
        >
          Non merci, je continue à parcourir
        </button>
      </div>
    </div>
  )
}
