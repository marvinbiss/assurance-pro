'use client'

import { useEffect, useState } from 'react'
import { assignVariant, parseAbCookie } from '@/lib/cro/ab-testing'
import { trackExposure } from '@/lib/cro/tracking'
import type { ExperimentMetadata, ExperimentVariant, ExperimentId } from '@/lib/cro/experiments'
import { isExperimentActive } from '@/lib/cro/experiments'

const VISITOR_COOKIE = 'vivos_vid'
const AB_COOKIE_NAME = 'ab_variants'

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`))
  return match?.split('=')[1] ?? null
}

function genVisitorId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

function getOrSetVisitorId(): string {
  let id = getCookie(VISITOR_COOKIE)
  if (!id) {
    id = genVisitorId()
    if (typeof document !== 'undefined') {
      document.cookie = `${VISITOR_COOKIE}=${id}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`
    }
  }
  return id
}

/**
 * Hook client-side pour récupérer la variante d'une expérience.
 *
 * - Stable inter-renders (lookup cookie ab_variants en priorité)
 * - Auto-tracking exposure au montage
 * - Fallback control si expérience archivée/paused
 *
 * Usage :
 *   const variant = useExperiment(EXPERIMENTS.ctaColor)
 *   return <Button color={variant === 'orange' ? '#E86B4B' : '#1D4ED8'} />
 */
export function useExperiment<K extends ExperimentId>(
  experiment: ExperimentMetadata & { variants: readonly ExperimentVariant<K>[] }
): ExperimentVariant<K> {
  const [variant, setVariant] = useState<ExperimentVariant<K>>(
    () => experiment.variants[0] as ExperimentVariant<K>
  )

  useEffect(() => {
    if (!isExperimentActive(experiment)) {
      setVariant(experiment.variants[0] as ExperimentVariant<K>)
      return
    }

    const abMap = parseAbCookie(getCookie(AB_COOKIE_NAME))
    const cached = abMap.get(experiment.id)
    let resolved: ExperimentVariant<K>

    if (cached && experiment.variants.includes(cached as ExperimentVariant<K>)) {
      resolved = cached as ExperimentVariant<K>
    } else {
      const visitorId = getOrSetVisitorId()
      resolved = assignVariant(experiment, visitorId) as ExperimentVariant<K>
      abMap.set(experiment.id, resolved)
      const serialized = Array.from(abMap.entries())
        .map(([k, v]) => `${k}=${v}`)
        .join(';')
      if (typeof document !== 'undefined') {
        document.cookie = `${AB_COOKIE_NAME}=${serialized}; Path=/; Max-Age=${60 * 60 * 24 * 50}; SameSite=Lax`
      }
    }

    setVariant(resolved)
    trackExposure(experiment, resolved)
  }, [experiment])

  return variant
}
