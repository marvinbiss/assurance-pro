'use client'

import { useEffect, useRef, useState } from 'react'

interface ProcessStep {
  n: string
  title: string
  desc: string
}

interface EditorialProcessStepsProps {
  steps: readonly ProcessStep[]
  className?: string
}

const OFFSETS = ['lg:ml-0', 'lg:ml-24', 'lg:ml-8']

export function EditorialProcessSteps({ steps, className = '' }: EditorialProcessStepsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    if (mq.matches) {
      setProgress(1)
      return
    }

    const el = containerRef.current
    if (!el) return

    let rafId = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.85
      const end = vh * 0.15
      const range = start - end
      const p = Math.max(0, Math.min(1, (start - rect.top) / range))
      setProgress(p)
      rafId = 0
    }
    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto max-w-5xl space-y-16 lg:space-y-24 ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 800 1200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute left-0 top-0 hidden h-full w-full lg:block"
      >
        <path
          d="M 120 100 Q 400 250 580 400 Q 700 550 250 750 Q 100 900 400 1100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="text-primary-200"
          style={{
            strokeDashoffset: reducedMotion ? 0 : (1 - progress) * 2400,
            transition: 'stroke-dashoffset 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: progress * 0.8 + 0.2,
          }}
        />
      </svg>

      {steps.map((step, i) => {
        const stepProgress = Math.max(0, Math.min(1, progress * steps.length - i))
        return (
          <div
            key={step.n}
            className={`relative flex flex-col items-start gap-6 md:flex-row md:items-end md:gap-10 ${
              OFFSETS[i % OFFSETS.length]
            }`}
            style={{
              opacity: reducedMotion ? 1 : 0.2 + stepProgress * 0.8,
              transform: reducedMotion
                ? undefined
                : `translate3d(0, ${(1 - stepProgress) * 30}px, 0)`,
              transition:
                'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <span
              aria-hidden
              className="font-display select-none text-[6rem] font-medium leading-none tracking-tight text-primary-200 md:text-[9rem]"
              style={{
                fontFamily: 'var(--font-heading), Fraunces, serif',
                fontVariationSettings: '"SOFT" 100, "WONK" 1',
                opacity: 0.55,
              }}
            >
              {step.n}
            </span>

            <div className="md:mb-6 md:flex-1">
              <h3 className="mb-3 font-heading text-2xl font-semibold text-charcoal-900 md:text-3xl">
                {step.title}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-charcoal-700 md:text-lg">
                {step.desc}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
