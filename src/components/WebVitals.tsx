'use client'

import { useReportWebVitals } from 'next/web-vitals'
import * as Sentry from '@sentry/nextjs'

/**
 * Reports Core Web Vitals (LCP, CLS, INP, FCP, TTFB) à GA4 + Sentry measurements.
 *
 * Seuils Google 2024 :
 * - LCP : <2.5s good, <4s ok, >4s poor
 * - INP : <200ms good, <500ms ok, >500ms poor
 * - CLS : <0.1 good, <0.25 ok, >0.25 poor
 */

const POOR_THRESHOLDS: Record<string, number> = {
  LCP: 4000,
  INP: 500,
  CLS: 0.25,
  FCP: 3000,
  TTFB: 1500,
}

const VITAL_UNITS: Record<string, string> = {
  LCP: 'millisecond',
  INP: 'millisecond',
  CLS: 'ratio',
  FCP: 'millisecond',
  TTFB: 'millisecond',
}

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

    /* Sentry — push as measurement on current transaction (visible in perf dashboard) */
    const unit = VITAL_UNITS[metric.name] ?? 'none'
    Sentry.setMeasurement(metric.name, metric.value, unit)

    /* Breadcrumb additionnel si poor (debugging dédié) */
    const poorThreshold = POOR_THRESHOLDS[metric.name]
    if (poorThreshold !== undefined && metric.value > poorThreshold) {
      Sentry.addBreadcrumb({
        category: 'web-vitals',
        message: `Poor ${metric.name}: ${Math.round(metric.value)}${unit === 'millisecond' ? 'ms' : ''}`,
        level: 'warning',
        data: {
          name: metric.name,
          value: metric.value,
          id: metric.id,
          navigationType: metric.navigationType,
          threshold: poorThreshold,
        },
      })
    }
  })

  return null
}
