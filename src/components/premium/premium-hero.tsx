import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { GrainOverlay } from './grain-overlay'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'

interface PremiumHeroProps {
  eyebrow?: string
  title: ReactNode
  lead: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  trustRibbon?: ReactNode
  variant?: 'home' | 'pilier'
  className?: string
}

export function PremiumHero({
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  trustRibbon,
  variant = 'home',
  className = '',
}: PremiumHeroProps) {
  const isPilier = variant === 'pilier'

  return (
    <section
      className={`relative overflow-hidden ${isPilier ? 'bg-sand-50 py-16 md:py-24' : 'bg-sand-50 py-20 md:py-28'} ${className}`}
    >
      <GrainOverlay opacity={0.04} />

      <ParallaxLayer
        speed={0.18}
        mouseInfluence={0.4}
        className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-primary-100/40 blur-[100px]"
      >
        <span aria-hidden className="block h-full w-full" />
      </ParallaxLayer>
      <ParallaxLayer
        speed={-0.12}
        mouseInfluence={0.25}
        className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-secondary-100/30 blur-[100px]"
      >
        <span aria-hidden className="block h-full w-full" />
      </ParallaxLayer>

      <div className="container relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className={isPilier ? 'max-w-3xl' : 'max-w-4xl'}>
          {eyebrow && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-charcoal-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal-700 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-accent-600" aria-hidden />
              {eyebrow}
            </div>
          )}

          <h1
            className={`font-display mb-6 text-charcoal-900 ${
              isPilier
                ? 'text-4xl font-medium leading-[1.1] tracking-tight sm:text-5xl md:text-6xl'
                : 'text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl'
            }`}
            style={{
              fontVariationSettings: '"SOFT" 50, "WONK" 0',
              fontFamily: 'var(--font-heading), Fraunces, Sora, serif',
            }}
          >
            {title}
          </h1>

          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-charcoal-700 md:text-xl">
            {lead}
          </p>

          <div className="mb-8 flex flex-wrap items-center gap-3">
            <MagneticButton strength={0.25}>
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-xl bg-primary-500 px-7 py-4 text-base font-semibold text-white shadow-cta transition-[background,box-shadow] duration-200 ease-enter hover:bg-primary-600 hover:shadow-cta-hover"
              >
                {primaryCta.label}
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 ease-enter group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </MagneticButton>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-xl border border-charcoal-200 bg-white/80 px-7 py-4 font-semibold text-charcoal-800 backdrop-blur-sm transition-all duration-200 ease-enter hover:border-charcoal-400 hover:bg-white"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>

          {trustRibbon && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-charcoal-700">
              {trustRibbon}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
