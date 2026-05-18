import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock 'server-only' Next.js guard (n'existe pas en jsdom)
vi.mock('server-only', () => ({}))

// jsdom n'implémente pas matchMedia → polyfill nécessaire pour les composants
// qui détectent prefers-reduced-motion (ex: RevealOnScroll, motion wrappers).
if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

// IntersectionObserver également non implémenté par jsdom — utilisé par
// RevealOnScroll. Stub minimal pour éviter ReferenceError.
if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class MockIntersectionObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn().mockReturnValue([])
    root = null
    rootMargin = ''
    thresholds: ReadonlyArray<number> = []
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).IntersectionObserver = MockIntersectionObserver
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(globalThis as any).IntersectionObserver = MockIntersectionObserver
}
