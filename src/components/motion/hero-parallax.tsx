'use client'

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Image from 'next/image'

export interface HeroParallaxProps {
  src: string
  alt: string
  opacity?: number
}

export function HeroParallax({ src, alt, opacity = 0.3 }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '20%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity }}
        />
      </motion.div>
    </div>
  )
}
