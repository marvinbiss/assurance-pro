'use client'

import { useEffect, useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'

export interface ShareButtonProps {
  title: string
  url: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [hasShare, setHasShare] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setHasShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
  }, [])

  async function handleClick() {
    try {
      if (hasShare) {
        await navigator.share({ title, url })
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      // user cancelled — silent
    }
  }

  const Icon = copied ? Check : hasShare ? Share2 : Link2
  const label = copied ? 'Copié !' : hasShare ? 'Partager' : 'Copier le lien'

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-xl border border-charcoal-200 bg-white px-4 py-2 text-xs font-bold text-charcoal-700 transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:text-primary-700 dark:border-charcoal-700 dark:bg-charcoal-900 dark:text-charcoal-200 dark:hover:border-primary-700 dark:hover:text-primary-300"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
      {label}
    </button>
  )
}
