'use client'

import { useEffect, useRef, useMemo } from 'react'

const UTM_STORAGE_KEY = 'sa:utm'
const LANDING_PAGE_KEY = 'sa:landing'
const REFERRER_KEY = 'sa:referrer'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

export interface UtmData {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  referrer: string | null
  landing_page: string | null
}

const EMPTY_UTM: UtmData = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null,
  referrer: null,
  landing_page: null,
}

/**
 * Capture UTM parameters from URL and persist them in sessionStorage.
 * Designed to be lightweight: runs once on mount, reads from storage thereafter.
 *
 * Usage:
 *   const utm = useUtmParams()
 *   // Include utm in form submission payload
 */
export function useUtmParams(): UtmData {
  const capturedRef = useRef(false)

  useEffect(() => {
    if (capturedRef.current) return
    capturedRef.current = true

    try {
      // Capture UTM params from URL (first-touch attribution)
      const params = new URLSearchParams(window.location.search)
      const hasUtm = UTM_KEYS.some((key) => params.has(key))

      if (hasUtm) {
        const utmData: Record<string, string> = {}
        for (const key of UTM_KEYS) {
          const val = params.get(key)
          if (val) utmData[key] = val.slice(0, 200) // cap length
        }
        sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmData))
      }

      // Capture referrer (only on first page load — empty string = direct)
      if (!sessionStorage.getItem(REFERRER_KEY)) {
        sessionStorage.setItem(REFERRER_KEY, document.referrer || '')
      }

      // Capture landing page (first page visited in session)
      if (!sessionStorage.getItem(LANDING_PAGE_KEY)) {
        sessionStorage.setItem(
          LANDING_PAGE_KEY,
          window.location.pathname + window.location.search
        )
      }
    } catch {
      // sessionStorage may be unavailable (private browsing, etc.)
    }
  }, [])

  return useMemo(() => {
    if (typeof window === 'undefined') return EMPTY_UTM

    try {
      const stored = sessionStorage.getItem(UTM_STORAGE_KEY)
      const utmData = stored ? (JSON.parse(stored) as Record<string, string>) : {}

      return {
        utm_source: utmData.utm_source || null,
        utm_medium: utmData.utm_medium || null,
        utm_campaign: utmData.utm_campaign || null,
        utm_term: utmData.utm_term || null,
        utm_content: utmData.utm_content || null,
        referrer: sessionStorage.getItem(REFERRER_KEY) || null,
        landing_page: sessionStorage.getItem(LANDING_PAGE_KEY) || null,
      }
    } catch {
      return EMPTY_UTM
    }
  }, [])
}
