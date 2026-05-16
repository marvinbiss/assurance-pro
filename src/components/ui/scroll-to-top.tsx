'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 800)
        raf = 0
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Remonter en haut"
      title="Remonter en haut"
      className={`fixed bottom-20 right-5 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal-200 bg-white/90 text-charcoal-800 shadow-soft backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:shadow-premium dark:border-charcoal-700 dark:bg-charcoal-900/90 dark:text-charcoal-100 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ChevronUp className="h-5 w-5" strokeWidth={2.4} aria-hidden="true" />
    </button>
  )
}
