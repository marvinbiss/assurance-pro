/**
 * Ambient global type augmentations for Assurance Pro.
 * Loaded automatically by TypeScript via tsconfig "include".
 */

declare global {
  interface Window {
    /**
     * Google Tag Manager / Google Analytics consent + tracking API.
     * Loaded by GTM in app/layout.tsx.
     */
    gtag?: (
      command: 'consent' | 'event' | 'config' | 'set' | 'js',
      arg?: string | Date,
      options?: Record<string, unknown>
    ) => void

    /**
     * Microsoft Clarity. Loaded conditionally after RGPD consent.
     */
    clarity?: (...args: unknown[]) => void

    /**
     * Meta (Facebook) Pixel. Loaded conditionally after RGPD consent.
     */
    fbq?: (...args: unknown[]) => void
  }
}

export {}
