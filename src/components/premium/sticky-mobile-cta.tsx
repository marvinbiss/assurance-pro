'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

interface StickyMobileCtaProps {
  href: string
  label: string
  tel?: string
  className?: string
}

export function StickyMobileCta({ href, label, tel, className = '' }: StickyMobileCtaProps) {
  const [hidden, setHidden] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const lastY = useRef(0)
  const rafId = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)

    lastY.current = window.scrollY

    const update = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      // Hide on scroll-up after 50px from top, show on scroll-down
      if (y < 50) {
        setHidden(false)
      } else if (delta < -4) {
        // Scrolling up
        setHidden(true)
      } else if (delta > 4) {
        // Scrolling down
        setHidden(false)
      }
      lastY.current = y
      rafId.current = 0
    }

    const schedule = () => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      window.removeEventListener('scroll', schedule)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const transitionStyle = reducedMotion
    ? undefined
    : 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)'

  return (
    <div
      role="region"
      aria-label="Actions rapides"
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-sand-300 bg-white/95 p-3 shadow-lg backdrop-blur md:hidden ${className}`}
      style={{
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
        transform: hidden && !reducedMotion ? 'translateY(110%)' : 'translateY(0)',
        opacity: hidden && !reducedMotion ? 0 : 1,
        transition: transitionStyle,
        willChange: 'transform, opacity',
      }}
    >
      <div className="flex items-center gap-2">
        <Link
          href={href}
          aria-label={`${label} — obtenir un devis en 2 minutes`}
          className="flex-1 rounded-xl bg-primary-400 px-4 py-3 text-center font-heading text-sm font-semibold text-white shadow-cta transition-colors hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2"
        >
          {label}
        </Link>
        {tel && (
          <a
            href={`tel:${tel}`}
            aria-label={`Appeler le ${tel}`}
            className="shrink-0 rounded-xl border border-sand-400 bg-white px-4 py-3 text-center font-heading text-sm font-semibold text-charcoal-900 transition-colors hover:bg-sand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2"
          >
            Appeler
          </a>
        )}
      </div>
    </div>
  )
}
