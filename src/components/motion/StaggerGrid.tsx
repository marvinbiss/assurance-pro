'use client'

/**
 * StaggerGrid — orchestre l'apparition séquentielle des enfants au scroll.
 *
 * Chaque enfant doit être wrappé dans <StaggerItem>. La grille parent
 * déclenche le stagger quand elle entre dans le viewport.
 *
 * Usage :
 *   <StaggerGrid className="grid grid-cols-3 gap-5">
 *     {items.map(i => (
 *       <StaggerItem key={i.id}>
 *         <Card />
 *       </StaggerItem>
 *     ))}
 *   </StaggerGrid>
 */

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

interface StaggerGridProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  once?: boolean
}

export function StaggerGrid({
  children,
  className,
  staggerDelay = 0.08,
  once = true,
}: StaggerGridProps) {
  const reducedMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : staggerDelay,
        delayChildren: 0.05,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reducedMotion = useReducedMotion()

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 24, scale: reducedMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0 : 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}
