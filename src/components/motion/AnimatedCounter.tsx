'use client'

/**
 * AnimatedCounter — anime un nombre de 0 → target quand visible au scroll.
 *
 * Gère :
 *   - Format suffix (€, %, +, h)
 *   - prefers-reduced-motion → affiche directement la valeur finale
 *   - Easing soft cubic-bezier
 *   - Trigger une seule fois (par défaut)
 *
 * Usage :
 *   <AnimatedCounter value={10} suffix="+" />
 *   <AnimatedCounter value={24} suffix="h" duration={1.2} />
 *   <AnimatedCounter value={0} suffix="€" prefix="0" />  // pour "0€" pas d'animation
 */

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion, animate } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 1.5,
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(reducedMotion ? value : 0)

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      setDisplay(value)
      return
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, value, duration, reducedMotion])

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString()

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
