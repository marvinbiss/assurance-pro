'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Changer de thème"
        className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal-200 bg-white/80 shadow-soft backdrop-blur-sm"
      >
        <span className="sr-only">Charger le sélecteur de thème</span>
      </button>
    )
  }

  const isDark = resolvedTheme === 'dark'
  const next = isDark ? 'light' : 'dark'
  const enableViewTransition = typeof document !== 'undefined' && 'startViewTransition' in document

  function handleToggle() {
    if (enableViewTransition) {
      ;(
        document as unknown as { startViewTransition: (cb: () => void) => void }
      ).startViewTransition(() => {
        setTheme(next)
      })
    } else {
      setTheme(next)
    }
  }

  return (
    <button
      type="button"
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      onClick={handleToggle}
      className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-charcoal-200 bg-white/90 text-charcoal-800 shadow-soft backdrop-blur-sm transition-transform hover:-translate-y-0.5 hover:shadow-premium dark:border-charcoal-700 dark:bg-charcoal-900/90 dark:text-charcoal-100"
    >
      {isDark ? (
        <Sun className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
      )}
    </button>
  )
}
