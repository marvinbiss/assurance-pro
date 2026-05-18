import Link from 'next/link'
import { ArrowRight, Hammer, ShieldCheck } from 'lucide-react'
import { GrainOverlay } from './grain-overlay'
import { DevisCTASection } from './devis-cta-section'

interface DisambiguationOption {
  href: string
  Icon: typeof Hammer
  title: string
  desc: string
  bullet: string
  accent: 'primary' | 'charcoal'
}

interface DisambiguationPageProps {
  statut: string
  intro: string
  options: readonly DisambiguationOption[]
}

const ACCENTS = {
  primary: 'bg-primary-50 text-primary-600 group-hover:bg-primary-100',
  charcoal: 'bg-charcoal-100 text-charcoal-800 group-hover:bg-charcoal-200',
} as const

export function DisambiguationPage({ statut, intro, options }: DisambiguationPageProps) {
  return (
    <article className="min-h-screen bg-sand-50">
      <section className="relative overflow-hidden bg-sand-50 py-20 dark:bg-charcoal-900 md:py-28">
        <GrainOverlay opacity={0.04} />

        <div className="container relative mx-auto max-w-5xl px-6 lg:px-12">
          <nav
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-charcoal-600"
            aria-label="Fil d'Ariane"
          >
            <Link href="/" className="transition-colors hover:text-charcoal-900">
              Accueil
            </Link>
            <span className="text-charcoal-400">/</span>
            <span className="text-charcoal-900">{statut}</span>
          </nav>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-charcoal-200 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-charcoal-700 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5 text-accent-600" aria-hidden />
            Courtier ORIAS · ACPR
          </div>

          <h1
            className="mb-6 font-heading text-4xl font-medium leading-[1.1] tracking-tight text-charcoal-900 sm:text-5xl md:text-6xl"
            style={{
              fontFamily: 'var(--font-heading), Fraunces, serif',
              fontVariationSettings: '"SOFT" 50, "WONK" 0',
            }}
          >
            Assurance pro {statut}
          </h1>

          <p className="mb-12 max-w-2xl text-lg leading-relaxed text-charcoal-700 md:text-xl">
            {intro}
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {options.map((opt) => (
              <Link
                key={opt.href}
                href={opt.href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-sand-300 bg-white p-8 shadow-sm transition-all duration-300 ease-enter hover:-translate-y-1 hover:border-sand-500 hover:shadow-card-hover"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200 ${ACCENTS[opt.accent]}`}
                >
                  <opt.Icon className="h-6 w-6" aria-hidden />
                </div>

                <h2 className="mb-3 font-heading text-2xl font-semibold leading-tight text-charcoal-900">
                  {opt.title}
                </h2>

                <p className="mb-5 text-base leading-relaxed text-charcoal-700">{opt.desc}</p>

                <p className="mb-6 rounded-lg bg-sand-100 px-4 py-3 text-sm font-medium text-charcoal-800">
                  {opt.bullet}
                </p>

                <span className="mt-auto inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-primary-600">
                  Voir la garantie
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-200 ease-enter group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DevisCTASection
        title={`Devis assurance pro ${statut} en 2 minutes`}
        subtitle="Notre courtier ORIAS compare décennale, RC Pro, multirisque, et négocie le tarif adapté à votre activité."
      />
    </article>
  )
}
