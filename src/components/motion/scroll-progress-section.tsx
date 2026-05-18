'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'

export interface ScrollProgressSectionProps {
  children: ReactNode
  className?: string
  /** Output scale range (4 keyframes 0/0.3/0.7/1). */
  scaleRange?: [number, number, number, number]
  /** Output opacity range (4 keyframes). */
  opacityRange?: [number, number, number, number]
  /** Output translateY px range (4 keyframes). */
  yRange?: [number, number, number, number]
}

/**
 * Wrap any section to bind scale/opacity/y to its scroll progress.
 * Creates kinésique 3D-like feeling without WebGL cost.
 * Respects prefers-reduced-motion.
 */
export function ScrollProgressSection({
  children,
  className,
  scaleRange = [0.94, 1, 1, 0.96],
  opacityRange = [0.5, 1, 1, 0.7],
  yRange = [40, 0, 0, -20],
}: ScrollProgressSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const keyframes = [0, 0.3, 0.7, 1]
  const scale = useTransform(scrollYProgress, keyframes, scaleRange)
  const opacity = useTransform(scrollYProgress, keyframes, opacityRange)
  const y = useTransform(scrollYProgress, keyframes, yRange)

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} className={className} style={{ scale, opacity, y }}>
      {children}
    </motion.div>
  )
}
