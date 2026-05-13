'use client'

/**
 * FadeIn — wrapper Server Component-compatible pour reveal au scroll.
 *
 * Apparait avec un fade + slide-up subtle quand l'élément entre dans
 * le viewport. Respecte `prefers-reduced-motion`.
 *
 * Usage :
 *   <FadeIn delay={0.1}>
 *     <h2>Section title</h2>
 *   </FadeIn>
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
  once?: boolean
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  y = 24,
  className,
  once = true,
}: FadeInProps) {
  const reducedMotion = useReducedMotion()

  const variants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : duration,
        delay: reducedMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1], // cubic-bezier soft
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
