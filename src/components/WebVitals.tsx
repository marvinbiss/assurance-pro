'use client'

import { useReportWebVitals } from 'next/web-vitals'

/**
 * Reports Core Web Vitals (LCP, CLS, INP, FCP, TTFB) à GA4 + Sentry breadcrumbs.
 *
 * Seuils Google 2024 :
 * - LCP : <2.5s good, <4s ok, >4s poor
 * - INP : <200ms good, <500ms ok, >500ms poor
 * - CLS : <0.1 good, <0.25 ok, >0.25 poor
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    /* GA4 */
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const w = window as typeof window & { gtag: (...args: unknown[]) => void }
      w.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      })
    }

    /* Sentry breadcrumb si métrique poor (debugging perf) */
    const isPoor =
      (metric.name === 'LCP' && metric.value > 4000) ||
      (metric.name === 'INP' && metric.value > 500) ||
      (metric.name === 'CLS' && metric.value > 0.25) ||
      (metric.name === 'FCP' && metric.value > 3000) ||
      (metric.name === 'TTFB' && metric.value > 1500)

    if (isPoor && typeof window !== 'undefined') {
      const w = window as typeof window & {
        Sentry?: { addBreadcrumb: (b: unknown) => void }
      }
      if (w.Sentry) {
        w.Sentry.addBreadcrumb({
          category: 'web-vitals',
          message: `Poor ${metric.name}: ${Math.round(metric.value)}`,
          level: 'warning',
          data: {
            name: metric.name,
            value: metric.value,
            id: metric.id,
            navigationType: metric.navigationType,
          },
        })
      }
    }
  })

  return null
}
