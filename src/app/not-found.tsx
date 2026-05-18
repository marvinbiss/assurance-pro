import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass, Hammer, Briefcase, Building2, Heart, Lock, Scale } from 'lucide-react'
import { CTA_TEXTS } from '@/lib/config/pre-orias'

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: false },
}

const SUGGESTIONS = [
  {
    href: '/assurance-decennale',
    label: 'Assurance décennale BTP',
    desc: 'Loi Spinetta — 12 métiers BTP couverts',
    Icon: Hammer,
    gradient: 'from-primary-500 to-primary-700',
  },
  {
    href: '/rc-pro',
    label: 'RC Pro',
    desc: 'Consultants, freelances, agences',
    Icon: Briefcase,
    gradient: 'from-secondary-500 to-secondary-700',
  },
  {
    href: '/multirisque-pro',
    label: 'Multirisque pro',
    desc: "Locaux, biens, perte d'exploitation",
    Icon: Building2,
    gradient: 'from-accent-500 to-accent-700',
  },
  {
    href: '/mutuelle-pro',
    label: 'Mutuelle TNS Madelin',
    desc: 'Optimisation fiscale art. 154 bis CGI',
    Icon: Heart,
    gradient: 'from-rose-500 to-rose-700',
  },
  {
    href: '/cyber-assurance',
    label: 'Cyber assurance',
    desc: 'PME, RGPD, ransomwares',
    Icon: Lock,
    gradient: 'from-charcoal-700 to-charcoal-900',
  },
  {
    href: '/comparateur-assureurs',
    label: 'Comparateur',
    desc: '10 assureurs partenaires',
    Icon: Scale,
    gradient: 'from-violet-500 to-violet-700',
  },
] as const

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sand-50 px-4 py-16">
      <div className="w-full max-w-3xl">
        <div className="text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
            <Compass className="h-3.5 w-3.5" strokeWidth={2.4} />
            Erreur 404
          </div>
          <h1 className="mb-4 font-heading text-4xl font-extrabold tracking-tight text-charcoal-900 md:text-5xl">
            Cette page est introuvable
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-base text-charcoal-600 md:text-lg">
            Le lien que vous avez suivi est peut-être obsolète ou la page a été déplacée. Voici nos
            rubriques principales&nbsp;:
          </p>
        </div>

        <ul className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-2">
          {SUGGESTIONS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group flex items-start gap-3 rounded-2xl border border-charcoal-100 bg-white p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-premium"
              >
                <span
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} shadow-soft transition-transform group-hover:scale-110`}
                >
                  <s.Icon className="h-5 w-5 text-white" strokeWidth={2.4} />
                </span>
                <div className="flex-1 leading-tight">
                  <div className="font-heading font-extrabold text-charcoal-900 group-hover:text-primary-700">
                    {s.label}
                  </div>
                  <div className="mt-0.5 text-xs text-charcoal-600">{s.desc}</div>
                </div>
                <ArrowRight
                  className="mt-2.5 h-4 w-4 flex-shrink-0 text-charcoal-500 transition-all group-hover:translate-x-0.5 group-hover:text-primary-700"
                  strokeWidth={2.4}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-charcoal-200 bg-white px-5 py-3 font-bold text-charcoal-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-charcoal-300 hover:shadow-premium"
          >
            ← Retour à l&apos;accueil
          </Link>
          <Link
            href="/devis"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary-500 px-5 py-3 font-extrabold text-white shadow-cta transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-cta-hover"
          >
            {CTA_TEXTS.short}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/plan-du-site"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-charcoal-200 bg-white px-5 py-3 font-bold text-charcoal-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-charcoal-300 hover:shadow-premium"
          >
            Plan du site
          </Link>
        </div>
      </div>
    </main>
  )
}
