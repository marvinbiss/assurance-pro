'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export interface FadeInUpProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'li'
}

export function FadeInUp({ children, delay = 0, className, as = 'div' }: FadeInUpProps) {
  const reduce = useReducedMotion()
  const Component = motion[as]
  if (reduce) {
    return <Component className={className}>{children}</Component>
  }
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  )
}
