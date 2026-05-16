'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export interface HoverLiftProps {
  children: ReactNode
  className?: string
  scale?: number
  y?: number
}

/**
 * Subtle card hover lift with spring. Replaces CSS transition for smoother feel.
 * Respects prefers-reduced-motion.
 */
export function HoverLift({ children, className, scale = 1.01, y = -4 }: HoverLiftProps) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      whileHover={{ y, scale, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
      whileTap={{ scale: 0.99 }}
    >
      {children}
    </motion.div>
  )
}
