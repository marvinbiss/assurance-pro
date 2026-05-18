'use client'

import { useScroll, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { useRef, useEffect, useState } from 'react'

export interface ScrollStatCountUpProps {
  to: number
  suffix?: string
  prefix?: string
  className?: string
}

/**
 * Number that counts up driven by scroll progress (not time).
 * Visual lock between scroll position and figure increase.
 */
export function ScrollStatCountUp({
  to,
  suffix = '',
  prefix = '',
  className,
}: ScrollStatCountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.4'] })
  const spring = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.6 })
  const value = useTransform(spring, [0, 1], [0, to])
  const [display, setDisplay] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce) return
    return value.on('change', (v) => setDisplay(Math.round(v)))
  }, [value, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('fr-FR')}
      {suffix}
    </span>
  )
}
