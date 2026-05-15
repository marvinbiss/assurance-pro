'use client'

import { useEffect, useRef, useState } from 'react'

interface LiveCounterProps {
  baseValue: number
  label: string
  incrementPerHour?: number
  className?: string
}

const DEFAULT_INCREMENT_PER_HOUR = 12

function computeHoursSinceMidnight(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
  return (now.getTime() - start.getTime()) / 3_600_000
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function LiveCounter({
  baseValue,
  label,
  incrementPerHour = DEFAULT_INCREMENT_PER_HOUR,
  className = '',
}: LiveCounterProps) {
  // SSR-stable: baseValue. Client recomputes hour-adjusted value after mount.
  const [value, setValue] = useState<number>(baseValue)
  const [tick, setTick] = useState<boolean>(false)
  const reducedMotionRef = useRef<boolean>(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Sync to "real" value on mount (avoids hydration mismatch)
  useEffect(() => {
    reducedMotionRef.current = prefersReducedMotion()
    const hours = computeHoursSinceMidnight()
    const current = Math.max(baseValue, baseValue + Math.floor(hours * incrementPerHour))
    setValue(current)
  }, [baseValue, incrementPerHour])

  // Random tick interval 45-90s
  useEffect(() => {
    function scheduleNext(): void {
      const delayMs = 45_000 + Math.random() * 45_000
      timeoutRef.current = setTimeout(() => {
        setValue((v) => v + 1)
        if (!reducedMotionRef.current) {
          setTick(true)
          setTimeout(() => setTick(false), 320)
        }
        scheduleNext()
      }, delayMs)
    }
    scheduleNext()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-sand-300 bg-white/80 px-4 py-2 backdrop-blur ${className}`}
      role="status"
      aria-live="polite"
      aria-label={`${value} ${label}`}
    >
      <span
        className="relative inline-flex h-2 w-2 shrink-0 items-center justify-center"
        aria-hidden="true"
      >
        <span className="absolute inline-flex h-full w-full animate-pulse-slow rounded-full bg-accent-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
      </span>
      <span
        className={`font-display text-2xl font-semibold tabular-nums text-charcoal-900 transition-transform duration-300 ease-enter ${
          tick ? 'scale-110' : 'scale-100'
        }`}
        style={{ fontFamily: 'var(--font-heading), Fraunces, serif' }}
      >
        {value.toLocaleString('fr-FR')}
      </span>
      <span className="font-heading text-xs uppercase tracking-wider text-charcoal-700">
        {label}
      </span>
    </div>
  )
}
