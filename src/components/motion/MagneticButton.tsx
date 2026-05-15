'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
  as?: 'div' | 'span'
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  as = 'div',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | HTMLSpanElement | null>(null)

  const handleMove = (e: MouseEvent<HTMLDivElement | HTMLSpanElement>) => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate3d(0, 0, 0)'
  }

  const style = {
    transition: 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform',
  }

  if (as === 'span') {
    return (
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        className={`inline-block ${className}`}
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </span>
    )
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`inline-block ${className}`}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  )
}
