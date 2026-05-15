'use client'

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react'

interface GlossaireTooltipProps {
  term: string
  definition: string
  children?: ReactNode
  className?: string
}

export function GlossaireTooltip({
  term,
  definition,
  children,
  className = '',
}: GlossaireTooltipProps) {
  const tooltipId = useId()
  const [open, setOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Click outside to dismiss (mobile tap)
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const handleToggle = useCallback(() => setOpen((v) => !v), [])
  const handleShow = useCallback(() => setOpen(true), [])
  const handleHide = useCallback(() => setOpen(false), [])
  const handleKey = useCallback((e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((v) => !v)
    }
  }, [])

  const transitionStyle = reducedMotion ? undefined : 'opacity 200ms cubic-bezier(0.16, 1, 0.3, 1)'

  return (
    <span ref={wrapperRef} className={`relative inline-block ${className}`}>
      <span
        role="button"
        tabIndex={0}
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onMouseEnter={handleShow}
        onMouseLeave={handleHide}
        onFocus={handleShow}
        onBlur={handleHide}
        onClick={handleToggle}
        onKeyDown={handleKey}
        className="cursor-help underline decoration-primary-300 decoration-dashed underline-offset-4 hover:decoration-primary-500 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2"
      >
        {children ?? term}
      </span>
      <span
        id={tooltipId}
        role="tooltip"
        aria-hidden={!open}
        className="pointer-events-none absolute bottom-full left-1/2 z-[60] mb-2 block w-max max-w-[320px] -translate-x-1/2 rounded-lg bg-charcoal-900 p-3 text-left text-sm font-normal leading-snug text-white shadow-lg"
        style={{
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: transitionStyle,
        }}
      >
        <span className="block font-heading text-xs font-semibold uppercase tracking-wide text-secondary-300">
          {term}
        </span>
        <span className="mt-1 block text-white/90">{definition}</span>
        {/* Arrow pointing down */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-full -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '6px solid #1C1917',
          }}
        />
      </span>
    </span>
  )
}
