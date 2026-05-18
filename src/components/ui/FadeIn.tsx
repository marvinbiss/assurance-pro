'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import { type ReactNode, type ElementType } from 'react'

/**
 * FadeIn — composant d'animation scroll-triggered réutilisable.
 *
 * Pattern :
 *  - Apparition douce au scroll (whileInView)
 *  - Délai paramétrable pour stagger
 *  - Respect du `prefers-reduced-motion` (a11y)
 *  - Once: true → animation joue 1 seule fois
 *
 * Usage :
 *   <FadeIn delay={0.1}>
 *     <Card />
 *   </FadeIn>
 *
 *   {items.map((item, i) => (
 *     <FadeIn key={item.id} delay={i * 0.08}>
 *       <Card item={item} />
 *     </FadeIn>
 *   ))}
 */

interface FadeInProps {
  children: ReactNode
  /** Délai en secondes avant l'animation (utile pour stagger) */
  delay?: number
  /** Durée de l'animation en secondes (défaut 0.5) */
  duration?: number
  /** Direction de l'entrée : 'up' (défaut), 'down', 'left', 'right', 'none' */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  /** Distance de translation en px (défaut 20) */
  distance?: number
  /** className optionnelle pour le wrapper */
  className?: string
  /** Element tag à utiliser (défaut div) */
  as?: ElementType
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 20,
  className,
  as = 'div',
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()

  const offsetByDirection: Record<
    NonNullable<FadeInProps['direction']>,
    { x: number; y: number }
  > = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }

  const offset = offsetByDirection[direction]

  const variants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset },
    visible: { opacity: 1, x: 0, y: 0 },
  }

  const MotionComponent = motion[as as 'div'] ?? motion.div

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px 0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      variants={variants}
    >
      {children}
    </MotionComponent>
  )
}

/**
 * Stagger — wrapper qui anime ses enfants directs en cascade.
 *
 * Usage :
 *   <Stagger>
 *     {items.map((item) => <Card key={item.id} item={item} />)}
 *   </Stagger>
 */
interface StaggerProps {
  children: ReactNode
  className?: string
  /** Délai entre chaque enfant en secondes (défaut 0.08) */
  staggerDelay?: number
}

export function Stagger({ children, className, staggerDelay = 0.08 }: StaggerProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Item enfant d'un Stagger — utilise les variants pour cascader.
 */
interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      variants={{
        hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
