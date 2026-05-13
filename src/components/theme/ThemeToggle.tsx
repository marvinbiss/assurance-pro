'use client'

/**
 * ThemeToggle — bouton dark/light mode.
 *
 * Persist localStorage + respect prefers-color-scheme initial.
 * Tailwind darkMode: 'class' déjà activé dans config.
 * Inline script dans <head> via theme/script.ts pour éviter FOUC.
 */

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(getInitialTheme())
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    window.localStorage.setItem('theme', theme)
  }, [theme, mounted])

  // Empty placeholder pendant hydration pour éviter mismatch
  if (!mounted) return <span className={`h-9 w-9 ${className}`} aria-hidden="true" />

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      className={`flex h-9 w-9 items-center justify-center rounded-lg text-current transition-colors hover:bg-white/10 ${className}`}
      aria-label={theme === 'dark' ? 'Activer mode clair' : 'Activer mode sombre'}
      title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" strokeWidth={2.4} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={2.4} />
      )}
    </button>
  )
}

/**
 * Script inline anti-FOUC à injecter dans <head>.
 * Détecte le thème avant React hydration.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d))document.documentElement.classList.add('dark');}catch(e){}})();`
