'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let raf = 0
    const update = () => {
      const doc = document.documentElement
      const scrolled = window.scrollY
      const max = doc.scrollHeight - window.innerHeight
      const pct = max > 0 ? Math.min(100, Math.max(0, (scrolled / max) * 100)) : 0
      setProgress(pct)
      raf = 0
    }
    const onScroll = () => {
      if (raf === 0) raf = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf !== 0) window.cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      role="progressbar"
      aria-label="Progression de lecture"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-secondary-400 via-primary-500 to-primary-700 motion-safe:transition-transform motion-safe:duration-100"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  )
}
