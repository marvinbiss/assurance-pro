import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFormAnalytics } from './use-form-analytics'

describe('useFormAnalytics', () => {
  beforeEach(() => {
    /* Reset dataLayer entre tests */
    ;(window as unknown as { dataLayer: unknown[] }).dataLayer = []
  })

  it('push form_start au mount', () => {
    renderHook(() => useFormAnalytics({ formName: 'devis-test', currentStep: 1, totalSteps: 3 }))
    const dl = (window as unknown as { dataLayer: Array<{ event: string }> }).dataLayer
    expect(dl.some((e) => e.event === 'form_start')).toBe(true)
  })

  it('push form_step_completed au passage étape suivante', () => {
    const { rerender } = renderHook(
      ({ step }) => useFormAnalytics({ formName: 'test', currentStep: step, totalSteps: 3 }),
      { initialProps: { step: 1 } }
    )
    rerender({ step: 2 })
    const dl = (window as unknown as { dataLayer: Array<{ event: string; step?: number }> })
      .dataLayer
    expect(dl.some((e) => e.event === 'form_step_completed' && e.step === 1)).toBe(true)
  })

  it('trackFieldFocus push event field_focus', () => {
    const { result } = renderHook(() =>
      useFormAnalytics({ formName: 'test', currentStep: 1, totalSteps: 3 })
    )
    act(() => {
      result.current.trackFieldFocus('email')
    })
    const dl = (window as unknown as { dataLayer: Array<{ event: string; field_name?: string }> })
      .dataLayer
    expect(dl.some((e) => e.event === 'form_field_focus' && e.field_name === 'email')).toBe(true)
  })

  it('trackSubmit success push form_submitted', () => {
    const { result } = renderHook(() =>
      useFormAnalytics({ formName: 'test', currentStep: 3, totalSteps: 3 })
    )
    act(() => {
      result.current.trackSubmit(true)
    })
    const dl = (window as unknown as { dataLayer: Array<{ event: string }> }).dataLayer
    expect(dl.some((e) => e.event === 'form_submitted')).toBe(true)
  })

  it('trackSubmit failure push form_submit_error avec error_message', () => {
    const { result } = renderHook(() =>
      useFormAnalytics({ formName: 'test', currentStep: 3, totalSteps: 3 })
    )
    act(() => {
      result.current.trackSubmit(false, 'Network error')
    })
    const dl = (
      window as unknown as { dataLayer: Array<{ event: string; error_message?: string }> }
    ).dataLayer
    const errEvent = dl.find((e) => e.event === 'form_submit_error')
    expect(errEvent).toBeTruthy()
    expect(errEvent?.error_message).toBe('Network error')
  })

  it('error_message tronqué à 200 chars', () => {
    const { result } = renderHook(() =>
      useFormAnalytics({ formName: 'test', currentStep: 3, totalSteps: 3 })
    )
    const longError = 'x'.repeat(500)
    act(() => {
      result.current.trackSubmit(false, longError)
    })
    const dl = (
      window as unknown as { dataLayer: Array<{ event: string; error_message?: string }> }
    ).dataLayer
    const errEvent = dl.find((e) => e.event === 'form_submit_error')
    expect(errEvent?.error_message?.length).toBeLessThanOrEqual(200)
  })
})
