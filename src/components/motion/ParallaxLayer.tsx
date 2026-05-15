'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface ParallaxLayerProps {
  children: ReactNode
  speed?: number
  className?: string
  mouseInfluence?: number
}

export function ParallaxLayer({
  children,
  speed = 0.15,
  className = '',
  mouseInfluence = 0,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = ref.current
    if (!el) return

    let scrollY = 0
    let mouseX = 0
    let mouseY = 0
    let rafId = 0

    const apply = () => {
      const tx = mouseX * mouseInfluence
      const ty = scrollY * speed + mouseY * mouseInfluence
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
      rafId = 0
    }

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(apply)
    }

    const onScroll = () => {
      const rect = el.parentElement?.getBoundingClientRect()
      if (!rect) return
      scrollY = -rect.top
      schedule()
    }

    const onMouse = (e: MouseEvent) => {
      if (mouseInfluence === 0) return
      mouseX = (e.clientX / window.innerWidth - 0.5) * 40
      mouseY = (e.clientY / window.innerHeight - 0.5) * 40
      schedule()
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    if (mouseInfluence > 0) {
      window.addEventListener('mousemove', onMouse, { passive: true })
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [speed, mouseInfluence])

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }} aria-hidden="true">
      {children}
    </div>
  )
}
