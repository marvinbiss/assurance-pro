'use client'

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react'
import type { ReactNode, MouseEvent } from 'react'
import { useRef } from 'react'

export interface MagneticCtaProps {
  children: ReactNode
  className?: string
  strength?: number
}

/**
 * Magnetic cursor effect for CTA buttons.
 * Mouse drags element subtly toward cursor.
 * Respects prefers-reduced-motion.
 */
export function MagneticCta({ children, className, strength = 0.25 }: MagneticCtaProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(my, { stiffness: 200, damping: 18, mass: 0.4 })
  const x = useTransform(sx, (v) => v * strength)
  const y = useTransform(sy, (v) => v * strength)

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set(e.clientX - rect.left - rect.width / 2)
    my.set(e.clientY - rect.top - rect.height / 2)
  }

  function handleLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduce ? undefined : { x, y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
