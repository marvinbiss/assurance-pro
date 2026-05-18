'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Subtle cursor trail — small terracotta dot following the mouse with spring,
 * grows on link/button hover. Hidden on touch devices + reduced-motion.
 * Pure DOM + rAF (no extra deps).
 */
export function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef({ x: 0, y: 0 })
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const [active, setActive] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse) return
    setActive(true)

    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX
      targetRef.current.y = e.clientY
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      setHovering(!!target.closest('a, button, [role="button"], [data-cursor-hover]'))
    }
    const tick = () => {
      const t = targetRef.current
      const p = posRef.current
      p.x += (t.x - p.x) * 0.18
      p.y += (t.y - p.y) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${p.x - 6}px, ${p.y - 6}px, 0)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!active) return null
  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[60] h-3 w-3 rounded-full bg-primary-500 mix-blend-multiply transition-[width,height,opacity] duration-200 ease-out ${
        hovering ? '!h-8 !w-8 opacity-30' : 'opacity-60'
      }`}
      style={{ willChange: 'transform' }}
    />
  )
}
