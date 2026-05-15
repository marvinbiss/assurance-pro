'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * NumberTicker — compteur animé qui s'incrémente à la première vue.
 * Inspiration Magic UI number-ticker, version Framer Motion.
 *
 * Usage :
 *   <NumberTicker value={5800} suffix="+" />
 *   <NumberTicker value={92} suffix="%" decimalPlaces={0} />
 *   <NumberTicker value={4.9} decimalPlaces={1} suffix="/5" />
 */
interface NumberTickerProps {
  value: number
  startValue?: number
  direction?: 'up' | 'down'
  /** Délai avant déclenchement en ms */
  delay?: number
  decimalPlaces?: number
  /** Format thousands separator (true = espace insécable français) */
  groupSeparator?: boolean
  prefix?: string
  suffix?: string
  className?: string
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = 'up',
  delay = 0,
  decimalPlaces = 0,
  groupSeparator = true,
  prefix,
  suffix,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const shouldReduceMotion = useReducedMotion()

  const motionValue = useMotionValue(direction === 'down' ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })

  useEffect(() => {
    if (!isInView) return
    if (shouldReduceMotion) {
      // Pas d'animation : afficher directement la valeur finale
      if (ref.current) {
        ref.current.textContent = formatValue(value, decimalPlaces, groupSeparator, prefix, suffix)
      }
      return
    }
    const timer = window.setTimeout(() => {
      motionValue.set(direction === 'down' ? startValue : value)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [
    motionValue,
    isInView,
    delay,
    value,
    startValue,
    direction,
    shouldReduceMotion,
    decimalPlaces,
    groupSeparator,
    prefix,
    suffix,
  ])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest, decimalPlaces, groupSeparator, prefix, suffix)
      }
    })
    return () => unsubscribe()
  }, [springValue, decimalPlaces, groupSeparator, prefix, suffix])

  return (
    <span
      ref={ref}
      className={className ?? 'inline-block tabular-nums tracking-tight'}
      aria-label={`${prefix ?? ''}${value}${suffix ?? ''}`}
    >
      {formatValue(startValue, decimalPlaces, groupSeparator, prefix, suffix)}
    </span>
  )
}

function formatValue(
  n: number,
  decimalPlaces: number,
  groupSeparator: boolean,
  prefix?: string,
  suffix?: string
): string {
  const formatted = Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    useGrouping: groupSeparator,
  }).format(Number(n.toFixed(decimalPlaces)))
  return `${prefix ?? ''}${formatted}${suffix ?? ''}`
}
