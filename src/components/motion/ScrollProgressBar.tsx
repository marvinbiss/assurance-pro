'use client'

/**
 * ScrollProgressBar — barre fixe top qui se remplit selon la position scroll.
 *
 * Indique la progression de lecture au visiteur (signal de longueur de page,
 * pattern Stripe/Linear/Vercel). Gradient brand terracotta → honey.
 *
 * Auto-hidden si reduced-motion (juste barre statique invisible).
 */

import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const reducedMotion = useReducedMotion()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  if (reducedMotion) return null

  return (
    <motion.div
      style={{ scaleX }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-600"
      aria-hidden="true"
    />
  )
}
