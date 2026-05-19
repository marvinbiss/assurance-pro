'use client'

import { useEffect } from 'react'
import { captureFirstTouch } from '@/lib/cro/ads-tracking'

/**
 * Capture UTM + clickids (gclid/fbclid/msclkid) au premier landing.
 * Persiste cookie 30 jours pour attribution first-touch sur conversion.
 *
 * À monter dans le root layout (ClientOnlyFooterHelpers ou équivalent).
 * Idempotent — ne fire qu'une seule fois par cookie TTL.
 */
export function AdsAttributionInit() {
  useEffect(() => {
    captureFirstTouch()
  }, [])

  return null
}
