'use client'

/**
 * useFormAnalytics — Hook tracking funnel forms multi-étapes
 *
 * Track automatiquement :
 * - form_start (premier render)
 * - form_step_completed (passage étape N → N+1)
 * - form_step_abandoned (départ avant submit, via beforeunload)
 * - form_field_focus (interactions champs critiques)
 * - form_submitted (succès)
 *
 * Bénéfice CRO : permet d'identifier les étapes/champs qui font abandonner
 * (ex : 60% drop-off à étape 2 = problème UX cette étape).
 *
 * Tous les events sont envoyés via window.dataLayer (compatible GTM/GA4).
 */

import { useCallback, useEffect, useRef } from 'react'

export interface FormAnalyticsOptions {
  /** Identifiant unique du form (ex: "devis-rc-pro", "devis-decennale") */
  formName: string
  /** Étape courante (1-indexed) */
  currentStep: number
  /** Nombre total d'étapes */
  totalSteps: number
}

interface DataLayerEvent {
  event: string
  form_name: string
  step?: number
  total_steps?: number
  duration_ms?: number
  field_name?: string
  [key: string]: unknown
}

function pushEvent(event: DataLayerEvent) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { dataLayer?: unknown[] }
  if (!Array.isArray(w.dataLayer)) w.dataLayer = []
  w.dataLayer.push(event)
}

export function useFormAnalytics(opts: FormAnalyticsOptions) {
  const { formName, currentStep, totalSteps } = opts
  const startTimeRef = useRef<number>(0)
  const previousStepRef = useRef<number>(currentStep)
  const submittedRef = useRef<boolean>(false)
  const lastStepTimeRef = useRef<number>(0)

  /* form_start au mount */
  useEffect(() => {
    startTimeRef.current = Date.now()
    lastStepTimeRef.current = Date.now()
    pushEvent({
      event: 'form_start',
      form_name: formName,
      step: currentStep,
      total_steps: totalSteps,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formName])

  /* form_step_completed quand currentStep change vers le haut */
  useEffect(() => {
    const previous = previousStepRef.current
    if (currentStep > previous) {
      const stepDuration = Date.now() - lastStepTimeRef.current
      pushEvent({
        event: 'form_step_completed',
        form_name: formName,
        step: previous,
        total_steps: totalSteps,
        duration_ms: stepDuration,
      })
      lastStepTimeRef.current = Date.now()
    }
    previousStepRef.current = currentStep
  }, [currentStep, formName, totalSteps])

  /* form_step_abandoned au départ de la page sans submit */
  useEffect(() => {
    const onBeforeUnload = () => {
      if (!submittedRef.current) {
        const totalDuration = Date.now() - startTimeRef.current
        pushEvent({
          event: 'form_step_abandoned',
          form_name: formName,
          step: previousStepRef.current,
          total_steps: totalSteps,
          duration_ms: totalDuration,
        })
      }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload)
    }
  }, [formName, totalSteps])

  const trackFieldFocus = useCallback(
    (fieldName: string) => {
      pushEvent({
        event: 'form_field_focus',
        form_name: formName,
        step: currentStep,
        field_name: fieldName,
      })
    },
    [formName, currentStep]
  )

  const trackSubmit = useCallback(
    (success: boolean, error?: string) => {
      submittedRef.current = success
      const totalDuration = Date.now() - startTimeRef.current
      pushEvent({
        event: success ? 'form_submitted' : 'form_submit_error',
        form_name: formName,
        step: currentStep,
        total_steps: totalSteps,
        duration_ms: totalDuration,
        ...(error ? { error_message: error.slice(0, 200) } : {}),
      })
    },
    [formName, currentStep, totalSteps]
  )

  return {
    trackFieldFocus,
    trackSubmit,
  }
}
