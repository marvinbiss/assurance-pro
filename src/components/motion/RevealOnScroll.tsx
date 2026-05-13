'use client'

/**
 * RevealOnScroll — wrapper léger pour fade-in scroll.
 *
 * Utilise IntersectionObserver natif (pas de framer-motion).
 * Server-safe : SSR rend visible par défaut → progressive enhancement.
 * Respecte prefers-reduced-motion.
 *
 * Usage :
 *   <RevealOnScroll delay={100}>
 *     <Section>...</Section>
 *   </RevealOnScroll>
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface RevealOnScrollProps {
  children: ReactNode
  /** Delay milliseconds avant fade-in après intersection */
  delay?: number
  /** Distance translate Y initial (px) */
  translateY?: number
  /** Class additionnelle wrapper */
  className?: string
  /** Trigger une seule fois (default true) */
  once?: boolean
}

export function RevealOnScroll({
  children,
  delay = 0,
  translateY = 24,
  className = '',
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Detect reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    if (mq.matches) {
      setRevealed(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setTimeout(() => setRevealed(true), delay)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setRevealed(false)
        }
      },
      { rootMargin: '-60px 0px', threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, once])

  const style = reducedMotion
    ? undefined
    : {
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translate3d(0,0,0)' : `translate3d(0,${translateY}px,0)`,
        transition:
          'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
      }

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  )
}
