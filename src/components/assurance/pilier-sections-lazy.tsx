/**
 * pilier-sections-lazy — Code-split below-fold sections of PilierLayout.
 *
 * Each export is a `next/dynamic` wrapper around a heavy below-the-fold
 * section. SSR stays enabled (`ssr: true`) so SEO content is rendered
 * server-side; only the client JS chunk is deferred until needed.
 *
 * Used by `PilierLayout.tsx` to keep the initial First Load JS small.
 */
import dynamic from 'next/dynamic'

// TarifCalculator — Client Component (interactive form, several kB)
export const TarifCalculator = dynamic(
  () =>
    import('@/components/premium/tarif-calculator').then((m) => ({
      default: m.TarifCalculator,
    })),
  { ssr: true, loading: () => null }
)

// ComparatifAssureursTable — Server Component, but heavy markup
export const ComparatifAssureursTable = dynamic(
  () =>
    import('@/components/premium/comparatif-assureurs-table').then((m) => ({
      default: m.ComparatifAssureursTable,
    })),
  { ssr: true, loading: () => null }
)

// DevisCTASection — contains MagneticButton + ParallaxLayer + grain overlay
export const DevisCTASection = dynamic(
  () =>
    import('@/components/premium/devis-cta-section').then((m) => ({
      default: m.DevisCTASection,
    })),
  { ssr: true, loading: () => null }
)
