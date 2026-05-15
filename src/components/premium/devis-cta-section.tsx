import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock, ShieldCheck } from 'lucide-react'
import { GrainOverlay } from './grain-overlay'
import { MagneticButton } from '@/components/motion/dynamic/MagneticButtonDynamic'
import { ParallaxLayer } from '@/components/motion/dynamic/ParallaxLayerDynamic'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

interface DevisCTASectionProps {
  title?: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

const DEFAULT_REASSURANCE = [
  { Icon: Clock, label: '2 minutes' },
  { Icon: ShieldCheck, label: 'Sans engagement' },
  { Icon: CheckCircle2, label: 'Comparé · négocié' },
] as const

export function DevisCTASection({
  title = 'Prêt à comparer votre assurance pro ?',
  subtitle = 'Recevez 3 devis personnalisés sous 24 heures, négociés par un courtier ORIAS.',
  primaryCta = { label: 'Obtenir mon devis', href: '/devis' },
  secondaryCta = { label: 'Parler à un courtier', href: '/contact' },
  className = '',
}: DevisCTASectionProps) {
  return (
    <section
      className={`relative overflow-hidden bg-charcoal-900 py-20 text-white md:py-28 ${className}`}
    >
      <GrainOverlay opacity={0.06} />
      <ParallaxLayer
        speed={0.25}
        mouseInfluence={0.5}
        className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-primary-600/30 blur-[120px]"
      >
        <span aria-hidden className="block h-full w-full" />
      </ParallaxLayer>
      <ParallaxLayer
        speed={-0.18}
        mouseInfluence={0.35}
        className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-secondary-500/20 blur-[100px]"
      >
        <span aria-hidden className="block h-full w-full" />
      </ParallaxLayer>

      <RevealOnScroll translateY={36}>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h2
            className="font-display mb-6 text-4xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-heading), Fraunces, serif' }}
          >
            {title}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {subtitle}
          </p>

          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton strength={0.3}>
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-xl bg-primary-500 px-8 py-4 text-base font-semibold text-white shadow-premium-terra transition-[background] duration-200 ease-enter hover:bg-primary-600"
              >
                {primaryCta.label}
                <ArrowRight
                  className="h-5 w-5 transition-transform duration-200 ease-enter group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </MagneticButton>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-200 ease-enter hover:border-white/40 hover:bg-white/10"
            >
              {secondaryCta.label}
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
            {DEFAULT_REASSURANCE.map(({ Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-secondary-400" aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  )
}
