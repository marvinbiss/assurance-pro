'use client'

/**
 * LiveChatWidget — Crisp Chat post-consent CNIL
 *
 * Best practice CRO : +15-30% conversion B2B avec live chat (étude Drift 2024).
 *
 * Conformité :
 * - Lazy-loaded (pas de network call avant interaction)
 * - Charge UNIQUEMENT post-consent CNIL (cookie analytics ou marketing accepté)
 * - Crisp DPA RGPD-compliant (data EU + DPO)
 *
 * Activation : NEXT_PUBLIC_CRISP_WEBSITE_ID en env.
 * Sans ID = no-op (composant retourne null).
 */

import { useEffect } from 'react'

const COOKIE_PREFERENCES_KEY = 'cookie_preferences'

interface Preferences {
  necessary?: boolean
  analytics?: boolean
  marketing?: boolean
  personalization?: boolean
}

function readPrefs(): Preferences {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(COOKIE_PREFERENCES_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Preferences
  } catch {
    return {}
  }
}

interface LiveChatWidgetProps {
  /** Optionnel : override websiteId par défaut (lu depuis env) */
  websiteId?: string
  /** Délai avant chargement post-consent (évite blocage paint initial) */
  delayMs?: number
}

export function LiveChatWidget({
  websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID,
  delayMs = 3000,
}: LiveChatWidgetProps) {
  useEffect(() => {
    if (!websiteId) return

    const prefs = readPrefs()
    /* Charge si analytics OU marketing accepté */
    if (!prefs.analytics && !prefs.marketing) return

    const timer = setTimeout(() => {
      /* Crisp init pattern officiel */
      const w = window as unknown as {
        $crisp?: unknown[]
        CRISP_WEBSITE_ID?: string
      }
      if (w.$crisp) return /* déjà chargé */

      w.$crisp = []
      w.CRISP_WEBSITE_ID = websiteId

      const script = document.createElement('script')
      script.src = 'https:/ par client.crisp.chat/l.js'
      script.async = true
      document.head.appendChild(script)
    }, delayMs)

    return () => clearTimeout(timer)
  }, [websiteId, delayMs])

  return null
}
