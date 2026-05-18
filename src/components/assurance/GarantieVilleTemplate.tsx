import Link from 'next/link'
import { ArrowRight, MapPin, Target, Euro, Sparkles, ShieldCheck, Scale } from 'lucide-react'
import type { VilleData } from '@/lib/data/villes-top100'
import { VILLES_TOP100 } from '@/lib/data/villes-top100'
import { PageHero } from '@/components/layout/PageHero'
import { CTA_TEXTS } from '@/lib/config/pre-orias'
import { RelatedPagesSection } from '@/components/seo/RelatedPagesSection'

export interface GarantieVilleConfig {
  /** Slug de la garantie (ex: 'multirisque-pro') */
  garantieSlug: string
  /** Libellé pour H1 + breadcrumb (ex: 'Multirisque pro') */
  garantieLabel: string
  /** Sous-titre rapide affiché en hero */
  tagline: string
  /** Référence légale (badge en haut) */
  legalRef: string
  /** Tarif "à partir de" affiché en stat */
  priceFrom: string
  /** Audience principale (ex: 'commerces, ESN, agences') */
  audience: string
  /** Stat label utilisée (artisansBtpEstime ou freelancesEstime) */
  audienceMetric: 'artisansBtpEstime' | 'freelancesEstime'
  /** Sections rich body — h2 + paragraphes */
  sections: Array<{ h2: string; paragraphs: string[]; bullets?: string[] }>
}

export function GarantieVilleTemplate({
  ville,
  config,
}: {
  ville: VilleData
  config: GarantieVilleConfig
}) {
  const otherCities = VILLES_TOP100.filter(
    (c) => c.regionSlug === ville.regionSlug && c.slug !== ville.slug
  ).slice(0, 6)

  const audienceCount =
    config.audienceMetric === 'artisansBtpEstime' ? ville.artisansBtpEstime : ville.freelancesEstime

  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero
        breadcrumbs={[
          { label: config.garantieLabel, href: `/${config.garantieSlug}` },
          { label: ville.nom },
        ]}
        eyebrow={config.legalRef}
        EyebrowIcon={Scale}
        title={
          <>
            {config.garantieLabel} {ville.nom}
            <br />
            <span className="text-secondary-200">
              ({ville.departementCode}) · {new Date().getFullYear()}
            </span>
          </>
        }
        description={config.tagline}
        meta={[
          { Icon: MapPin, label: `${ville.departementNom} · ${ville.regionNom}` },
          { Icon: Target, label: `~${audienceCount.toLocaleString('fr-FR')} ${config.audience}` },
          { Icon: Euro, label: `À partir de ${config.priceFrom}` },
        ]}
      />

      <div className="container mx-auto max-w-4xl px-4 py-14">
        {/* Stats premium cards */}
        <section className="mb-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          <StatCard
            Icon={MapPin}
            label={`${ville.departementNom} (${ville.departementCode})`}
            value={ville.regionNom}
            gradient="from-primary-500 to-primary-700"
          />
          <StatCard
            Icon={Target}
            label={config.audience}
            value={`~${audienceCount.toLocaleString('fr-FR')}`}
            gradient="from-secondary-500 to-secondary-700"
          />
          <StatCard
            Icon={Euro}
            label="À partir de"
            value={config.priceFrom}
            gradient="from-accent-500 to-accent-700"
            highlight
          />
        </section>

        {/* Sections body avec pilier-prose */}
        <section className="pilier-prose prose prose-lg mb-14 max-w-none text-charcoal-700">
          {config.sections.map((s) => (
            <div key={s.h2}>
              <h2>
                {s.h2.replace(/\{ville\}/g, ville.nom).replace(/\{region\}/g, ville.regionNom)}
              </h2>
              {s.paragraphs.map((p, i) => (
                <p key={i}>
                  {p
                    .replace(/\{ville\}/g, ville.nom)
                    .replace(/\{region\}/g, ville.regionNom)
                    .replace(/\{departement\}/g, ville.departementNom)
                    .replace(/\{depCode\}/g, ville.departementCode)}
                </p>
              ))}
              {s.bullets && (
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>
                      {b
                        .replace(/\{ville\}/g, ville.nom)
                        .replace(/\{region\}/g, ville.regionNom)
                        .replace(/\{zonage\}/g, ville.zonageRisque.replace(/_/g, ' '))}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>

        {/* CTA devis premium */}
        <section className="relative mb-14 overflow-hidden rounded-3xl bg-charcoal-900 p-9 text-white shadow-premium-lg md:p-12">
          <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-95" />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary-400/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-secondary-300" />
                10 assureurs interrogés · 24 h
              </span>
              <h2 className="mb-2 font-heading text-2xl font-extrabold tracking-display md:text-3xl">
                Devis {config.garantieLabel} {ville.nom}
              </h2>
              <p className="max-w-xl text-base text-white/85">
                Notre équipe ORIAS interroge nos 10 assureurs partenaires pour vous présenter les
                meilleures offres. <strong className="text-white">Aucun frais de courtage</strong>.
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-white/70">
                <ShieldCheck className="h-3.5 w-3.5 text-secondary-300" strokeWidth={2.4} />
                Conforme DDA art. L. 521-4
              </div>
            </div>
            <Link
              href={`/devis?garantie=${config.garantieSlug}&ville=${encodeURIComponent(ville.slug)}`}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-extrabold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5"
            >
              {CTA_TEXTS.start}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Autres villes — grid premium */}
        {otherCities.length > 0 && (
          <section className="mb-14">
            <header className="mb-6">
              <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
                <MapPin className="h-3.5 w-3.5" strokeWidth={2.4} />
                Couverture régionale
              </span>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
                Autres villes en {ville.regionNom}
              </h2>
            </header>
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${config.garantieSlug}/${c.slug}`}
                    className="group flex items-center justify-between gap-2 rounded-xl border border-charcoal-100 bg-white px-4 py-3 text-sm font-bold text-charcoal-800 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:text-primary-700 hover:shadow-premium"
                  >
                    <span>{c.nom}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      strokeWidth={2.4}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Maillage interne contextuel cluster (15+ liens) */}
        <div className="mb-14">
          <RelatedPagesSection currentSlug={`${config.garantieSlug}/${ville.slug}`} />
        </div>

        {/* Voir aussi */}
        <section className="rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft">
          <header className="mb-4">
            <h2 className="font-heading text-lg font-extrabold tracking-tight text-charcoal-900">
              Voir aussi
            </h2>
          </header>
          <ul className="grid gap-2 text-sm md:grid-cols-3">
            <li>
              <Link
                href={`/${config.garantieSlug}`}
                className="inline-flex items-center gap-1.5 font-bold text-primary-700 underline-offset-4 hover:underline"
              >
                <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
                Pilier {config.garantieLabel}
              </Link>
            </li>
            <li>
              <Link
                href="/comparateur-assureurs"
                className="inline-flex items-center gap-1.5 font-bold text-primary-700 underline-offset-4 hover:underline"
              >
                <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
                Comparateur 10 assureurs
              </Link>
            </li>
            <li>
              <Link
                href="/normes"
                className="inline-flex items-center gap-1.5 font-bold text-primary-700 underline-offset-4 hover:underline"
              >
                <ArrowRight className="h-3 w-3" strokeWidth={2.4} />
                Normes &amp; conformité
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}

function StatCard({
  Icon,
  label,
  value,
  gradient,
  highlight = false,
}: {
  Icon: typeof MapPin
  label: string
  value: string
  gradient: string
  highlight?: boolean
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-premium ${
        highlight ? 'border-primary-200 ring-2 ring-primary-100' : 'border-charcoal-100'
      }`}
    >
      <div
        className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-soft`}
      >
        <Icon className="h-5 w-5 text-white" strokeWidth={2.4} />
      </div>
      <div className="mb-1 text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
        {label}
      </div>
      <div className="font-heading text-lg font-extrabold tracking-tight text-charcoal-900">
        {value}
      </div>
    </div>
  )
}
