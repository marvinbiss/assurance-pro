'use client'

/**
 * CountUp — anime un nombre 0 → target au scroll-in.
 *
 * IntersectionObserver natif. requestAnimationFrame pour smooth.
 * SSR-friendly : affiche la valeur finale par défaut (FOUC-safe).
 * Respecte prefers-reduced-motion.
 *
 * Usage :
 *   <CountUp value={10} suffix="+" duration={1500} />
 *   <CountUp value={24} suffix="h" />
 */

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  value: number
  prefix?: string
  suffix?: string
  /** Durée animation en ms */
  duration?: number
  /** Décimales (défaut 0) */
  decimals?: number
}

export function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1400,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Initial state : valeur finale pour SSR sans flash 0
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Reduced motion → garde valeur finale, pas d'anim
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    const el = ref.current
    if (!el) return

    let started = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (started || !entries[0]?.isIntersecting) return
        started = true
        observer.unobserve(el)

        // Animate from 0 to value
        setDisplay(0)
        const start = performance.now()
        const animate = (now: number) => {
          const progress = Math.min(1, (now - start) / duration)
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(value * eased)
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      },
      { rootMargin: '-50px 0px', threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString()

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
