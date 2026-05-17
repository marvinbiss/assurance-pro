import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Download, Mail, Palette, Phone, Type } from 'lucide-react'
import { SITE_URL } from '@/lib/seo/config'
import { BRAND, MANIFESTO } from '@/lib/brand/brand-voice'
import { VivosLogo } from '@/components/brand/VivosLogo'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Espace presse — Vivos Assurance',
  description:
    'Ressources presse Vivos Assurance : logos téléchargeables, palette brand, baseline, biographie fondateur, contact relations presse.',
  alternates: { canonical: `${SITE_URL}/presse` },
}

const COLORS = [
  { name: 'Terracotta Primary', hex: '#E86B4B', usage: 'CTA, hero, accent principal' },
  { name: 'Terracotta Deep', hex: '#C24B2A', usage: 'Hover, gradients, ombres' },
  { name: 'Honey Secondary', hex: '#E8960A', usage: 'Accent éditorial, awards, premium' },
  { name: 'Honey Bright', hex: '#F2B523', usage: 'Highlights, badges' },
  { name: 'Charcoal 950', hex: '#0F0E0C', usage: 'Hero backgrounds, dark surfaces' },
  { name: 'Sand 50', hex: '#FDFAF7', usage: 'Page backgrounds light' },
] as const

const TYPOGRAPHY = [
  { family: 'Fraunces', usage: 'Display, drop caps, pull quotes', weight: 'Variable 100-900' },
  { family: 'Sora', usage: 'Headings, eyebrows, badges', weight: '400, 600, 700, 800' },
  { family: 'DM Sans', usage: 'Body, UI, micro-copy', weight: '400, 500, 700' },
] as const

export default function PressePage() {
  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <BreadcrumbSchema items={[{ label: 'Espace presse' }]} />

      <section className="noise-overlay relative overflow-hidden bg-charcoal-900 py-16 text-white md:py-24">
        <div className="mesh-shader opacity-85" aria-hidden="true" />
        <div className="container relative mx-auto max-w-4xl px-4">
          <nav
            aria-label="Fil d'Ariane"
            className="mb-5 flex items-center gap-2 text-sm text-white/70"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Accueil
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-white">Espace presse</span>
          </nav>
          <h1 className="mb-4 font-display-premium font-heading text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            Espace presse
          </h1>
          <p className="max-w-3xl font-display-premium text-xl italic leading-snug text-white/90 md:text-2xl">
            « {BRAND.tagline} »
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <h2 className="mb-6 font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
          À propos de Vivos
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-charcoal-700">{MANIFESTO.hero}</p>
        <p className="mb-4 text-base leading-relaxed text-charcoal-700">{MANIFESTO.body}</p>
        <p className="text-base italic leading-relaxed text-charcoal-600">{MANIFESTO.cta}</p>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-16">
        <h2 className="mb-8 font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
          Identité visuelle
        </h2>

        <div className="rounded-3xl border border-charcoal-100 bg-white p-10 shadow-soft">
          <div className="mb-8 flex items-center justify-between border-b border-charcoal-100 pb-8">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-charcoal-500">
                Logo
              </p>
              <p className="text-sm text-charcoal-700">
                Mark + wordmark. Variants dark (fond clair) & light (fond foncé).
              </p>
            </div>
            <div className="flex items-center gap-6">
              <VivosLogo size="lg" variant="dark" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-500">
                <Palette className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                Palette brand
              </p>
              <ul className="space-y-2">
                {COLORS.map((c) => (
                  <li key={c.hex} className="flex items-center gap-3 text-sm">
                    <span
                      className="h-7 w-7 flex-shrink-0 rounded-md border border-charcoal-200 shadow-sm"
                      style={{ background: c.hex }}
                      aria-hidden="true"
                    />
                    <div className="flex-1">
                      <p className="m-0 font-bold text-charcoal-900">{c.name}</p>
                      <p className="m-0 font-mono text-xs text-charcoal-500">{c.hex}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-charcoal-500">
                <Type className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                Typographie
              </p>
              <ul className="space-y-3">
                {TYPOGRAPHY.map((t) => (
                  <li
                    key={t.family}
                    className="rounded-xl border border-charcoal-100 bg-sand-50 p-3"
                  >
                    <p className="m-0 font-heading text-base font-extrabold text-charcoal-900">
                      {t.family}
                    </p>
                    <p className="m-0 text-xs text-charcoal-600">{t.usage}</p>
                    <p className="m-0 mt-1 font-mono text-[11px] text-charcoal-500">{t.weight}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <h2 className="mb-6 font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
          Contact relations presse
        </h2>
        <div className="rounded-3xl bg-gradient-to-br from-charcoal-900 to-charcoal-950 p-10 text-white shadow-premium">
          <p className="mb-5 max-w-2xl text-base text-white/85">
            Interviews, prises de parole, citations, données chiffrées sur le marché assurance pro.
            Réponse sous 24h ouvrées.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:presse@vivos-assurance.fr"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
              presse@vivos-assurance.fr
            </a>
            <a
              href="tel:+33182885127"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Phone className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
              01 82 88 51 27
            </a>
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/90 underline-offset-4 hover:underline"
            >
              En savoir plus sur Vivos
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
            </Link>
          </div>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 text-xs text-charcoal-500">
          <Download className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
          Pack logo (SVG + PNG) sur demande email — réponse 24h.
        </p>
      </section>
    </main>
  )
}
