'use client'

import { motion, useReducedMotion, useInView } from 'motion/react'
import { useRef } from 'react'

export interface AnimatedStepIconProps {
  step: 1 | 2 | 3
  className?: string
}

/**
 * SVG line-art process step icon with stroke-dashoffset draw-in.
 * Zero external Lottie/JSON deps. Triggered on inView.
 */
export function AnimatedStepIcon({ step, className }: AnimatedStepIconProps) {
  const ref = useRef<SVGSVGElement>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const animate = inView && !reduce
  const transition = { duration: 1.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }

  return (
    <svg
      ref={ref}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? 'h-10 w-10'}
      aria-hidden="true"
    >
      {step === 1 && (
        <>
          {/* Clipboard outline */}
          <motion.rect
            x="12"
            y="14"
            width="40"
            height="42"
            rx="4"
            initial={{ pathLength: 0 }}
            animate={animate ? { pathLength: 1 } : {}}
            transition={transition}
          />
          {/* Clip top */}
          <motion.path
            d="M 22 14 Q 22 10 26 10 H 38 Q 42 10 42 14"
            initial={{ pathLength: 0 }}
            animate={animate ? { pathLength: 1 } : {}}
            transition={{ ...transition, delay: 0.4 }}
          />
          {/* 3 lines */}
          {[26, 34, 42].map((y, i) => (
            <motion.line
              key={y}
              x1="20"
              y1={y}
              x2={i === 2 ? 38 : 44}
              y2={y}
              initial={{ pathLength: 0 }}
              animate={animate ? { pathLength: 1 } : {}}
              transition={{ ...transition, delay: 0.7 + i * 0.18 }}
            />
          ))}
        </>
      )}

      {step === 2 && (
        <>
          {/* Magnifier circle */}
          <motion.circle
            cx="26"
            cy="26"
            r="14"
            initial={{ pathLength: 0 }}
            animate={animate ? { pathLength: 1 } : {}}
            transition={transition}
          />
          {/* Handle */}
          <motion.line
            x1="36"
            y1="36"
            x2="52"
            y2="52"
            initial={{ pathLength: 0 }}
            animate={animate ? { pathLength: 1 } : {}}
            transition={{ ...transition, delay: 0.5 }}
          />
          {/* Inner sparkle dot */}
          <motion.circle
            cx="26"
            cy="26"
            r="3"
            fill="currentColor"
            stroke="none"
            initial={{ scale: 0, opacity: 0 }}
            animate={animate ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
            style={{ transformOrigin: '26px 26px' }}
          />
        </>
      )}

      {step === 3 && (
        <>
          {/* Document */}
          <motion.path
            d="M 14 10 H 40 L 52 22 V 54 H 14 Z"
            initial={{ pathLength: 0 }}
            animate={animate ? { pathLength: 1 } : {}}
            transition={transition}
          />
          <motion.path
            d="M 40 10 V 22 H 52"
            initial={{ pathLength: 0 }}
            animate={animate ? { pathLength: 1 } : {}}
            transition={{ ...transition, delay: 0.3 }}
          />
          {/* Checkmark */}
          <motion.path
            d="M 22 38 L 30 46 L 44 30"
            initial={{ pathLength: 0 }}
            animate={animate ? { pathLength: 1 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.9 }}
            stroke="#3d8b68"
            strokeWidth="3"
          />
        </>
      )}
    </svg>
  )
}
