/**
 * Page /comparateur-assureurs
 * Tableau comparatif des 10 partenaires assureurs avec critères clés
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Award, CheckCircle2, Scale, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { SITE_URL } from '@/lib/seo/config'
import { PageHero } from '@/components/layout/PageHero'

export const metadata: Metadata = {
  title: "Comparateur d'assureurs pro 2026 — 10 compagnies",
  description:
    'Comparez les 10 principaux assureurs pro français. Hiscox, April Pro, Allianz, MMA, Generali, AXA, MAAF, SMABTP, Wakam, Stello. Tarifs, garanties, spécialités.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/comparateur-assureurs`,
  },
  openGraph: {
    title: "Comparateur d'assureurs pro 2026 — 10 compagnies",
    description:
      'Comparez les 10 principaux assureurs pro français. Hiscox, April Pro, Allianz, MMA, Generali, AXA, MAAF, SMABTP, Wakam, Stello. Tarifs, garanties, spécialités.',
    url: `${SITE_URL}/comparateur-assureurs`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Comparateur d'assureurs pro 2026 — 10 compagnies",
    description:
      'Comparez les 10 principaux assureurs pro français. Hiscox, April Pro, Allianz, MMA, Generali, AXA, MAAF, SMABTP, Wakam, Stello. Tarifs, garanties, spécialités.',
  },
}

interface Assureur {
  name: string
  slug: string
  description: string
  forces: string[]
  specialites: string[]
  rating: number
  acprAgrement: boolean
  csaMember: boolean
  tarif: 'eur' | 'eur_eur' | 'eur_eur_eur'
  bestFor: string
}

const ASSUREURS: Assureur[] = [
  {
    name: 'Hiscox',
    slug: 'hiscox',
    description:
      'Spécialiste assurance professionnelle premium, leader sur les RC Pro métiers du conseil et de la tech.',
    forces: [
      'Tarifeur en ligne instantané',
      'Garanties étendues (cyber inclus)',
      'Excellence service sinistre',
    ],
    specialites: ['Consultants', 'IT ou Digital', 'RC Pro étendue', 'Cyber'],
    rating: 4.6,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur_eur',
    bestFor: 'Consultants, freelances, agences digitales',
  },
  {
    name: 'April Pro',
    slug: 'april-pro',
    description:
      'Référence du courtage français, large catalogue multi-vertical (BTP + RC Pro + Mutuelle).',
    forces: ['Catalogue très large', 'Plateforme courtier mature', 'Tarifs compétitifs BTP'],
    specialites: ['Décennale BTP', 'RC Pro tous secteurs', 'Mutuelle TNS Madelin'],
    rating: 4.4,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur',
    bestFor: 'BTP tous métiers, courtage multi-produits',
  },
  {
    name: 'Allianz Pro',
    slug: 'allianz-pro',
    description: 'Géant assureur multi-pays, solide pour les ETI et grands comptes.',
    forces: [
      'Solidité financière maximale',
      'Couverture internationale',
      'Solutions sur-mesure ETI',
    ],
    specialites: ['Multirisque PME ou ETI', 'Flotte auto pro', 'RC Pro grandes structures'],
    rating: 4.3,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur_eur',
    bestFor: 'PME — ETI, multirisque pro',
  },
  {
    name: 'MMA Pro',
    slug: 'mma-pro',
    description: 'Mutuelle française historique, très présente en BTP et profession libérale.',
    forces: ["Réseau d'agents physiques", 'Service de proximité', 'Tarifs maîtrisés'],
    specialites: ['Décennale artisans', 'Multirisque local pro', 'Auto-mission'],
    rating: 4.2,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur',
    bestFor: 'Artisans, professions libérales',
  },
  {
    name: 'Generali Pro',
    slug: 'generali-pro',
    description: 'Assureur premium italien, expertise en santé pro et professions médicales.',
    forces: ['Excellence santé pro', 'Plafonds élevés disponibles', 'Mutuelle TNS premium'],
    specialites: ['Mutuelle TNS Madelin', 'Prévoyance dirigeant', 'RC médicale'],
    rating: 4.4,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur_eur',
    bestFor: 'Médecins, professions libérales premium',
  },
  {
    name: 'AXA Pro',
    slug: 'axa-pro',
    description: 'Géant français, solutions complètes pour TPE ou PME tous secteurs.',
    forces: ['Catalogue complet', 'Solidité maximale', 'Plateforme digitale moderne'],
    specialites: ['Multirisque pro', 'Flotte', 'Cyber pro'],
    rating: 4.3,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur_eur',
    bestFor: 'TPE ou PME tous secteurs',
  },
  {
    name: 'MAAF Pro',
    slug: 'maaf-pro',
    description: "Mutuelle d'origine artisanale, réseau dense et tarifs accessibles.",
    forces: ['Tarifs accessibles', "Réseau d'agents", 'Spécialiste artisans'],
    specialites: ['RC Pro artisans', 'Multirisque commerce'],
    rating: 4.0,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur',
    bestFor: 'Artisans, petits commerces',
  },
  {
    name: 'SMABTP',
    slug: 'smabtp',
    description:
      'LE spécialiste BTP. Mutuelle dédiée aux entreprises du bâtiment, leader sur la décennale.',
    forces: ['Expertise BTP exclusive', 'Décennale haut de gamme', 'Profils difficiles acceptés'],
    specialites: ['Décennale BTP toute taille', 'RC chantier', 'Garantie financière'],
    rating: 4.7,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur_eur',
    bestFor: 'BTP gros œuvre, profils complexes',
  },
  {
    name: 'Wakam',
    slug: 'wakam',
    description:
      'Assurtech française innovante, spécialiste des nouveaux métiers (VTC, e-commerce, freelance).',
    forces: ['Souscription 100% digitale', 'Tarifs ajustés en temps réel', 'Spécialiste niches'],
    specialites: ['VTC — Taxi', 'E-commerce', 'Freelance'],
    rating: 4.3,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur',
    bestFor: 'VTC, freelances digitaux, e-commerce',
  },
  {
    name: 'Stello',
    slug: 'stello',
    description:
      'Assurtech B2B française, expertise consultants ou freelances et auto-entrepreneurs.',
    forces: [
      'Tarifs auto-entrepreneur attractifs',
      'Pack RC Pro + Cyber + Prévoyance',
      'UX moderne',
    ],
    specialites: ['RC Pro auto-entrepreneurs', 'Cyber TPE', 'Prévoyance TNS'],
    rating: 4.5,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur',
    bestFor: 'Auto-entrepreneurs, consultants, freelances',
  },
]

function tarifDisplay(tarif: Assureur['tarif']): string {
  return { eur: '€', eur_eur: '€€', eur_eur_eur: '€€€' }[tarif]
}

export default function ComparateurAssureursPage() {
  return (
    <main className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <PageHero
        breadcrumbs={[{ label: 'Comparateur' }]}
        eyebrow="10 assureurs leaders pro"
        EyebrowIcon={Scale}
        title={
          <>
            Comparateur
            <br />
            <span className="text-secondary-200">d&apos;assureurs pro 2026.</span>
          </>
        }
        description={
          <>
            Notre cabinet ORIAS travaille avec les 10 assureurs leaders de l&apos;assurance
            professionnelle française. Comparez forces, spécialités et niveau tarifaire pour choisir
            le partenaire adapté à votre profil.
          </>
        }
        meta={[
          { Icon: Award, label: `${ASSUREURS.length} compagnies analysées` },
          { Icon: ShieldCheck, label: 'Agréments ACPR vérifiés' },
        ]}
      />

      <div className="container mx-auto max-w-6xl px-4 py-14">
        {/* Tableau premium */}
        <section className="mb-14">
          <header className="mb-6">
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2.4} />
              Vue d&apos;ensemble
            </span>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
              Tableau comparatif
            </h2>
          </header>

          <div className="overflow-hidden rounded-3xl border border-charcoal-100 bg-white shadow-soft">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-br from-charcoal-900 to-charcoal-800">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-white">
                      Assureur
                    </th>
                    <th className="hidden px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-white md:table-cell">
                      Spécialités
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-white">
                      Note
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-extrabold uppercase tracking-wider text-white">
                      Tarif
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-wider text-white">
                      Idéal pour
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ASSUREURS.map((a) => (
                    <tr
                      key={a.slug}
                      className="border-t border-charcoal-100 transition-colors hover:bg-sand-50/60"
                    >
                      <td className="px-5 py-4 font-heading font-extrabold text-charcoal-900">
                        {a.name}
                      </td>
                      <td className="hidden px-5 py-4 md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {a.specialites.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-bold text-primary-700"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-center font-bold text-charcoal-900">
                        <span className="inline-flex items-center gap-1">
                          {a.rating}
                          <Star
                            className="h-3.5 w-3.5 fill-secondary-500 text-secondary-500"
                            strokeWidth={2}
                          />
                        </span>
                      </td>
                      <td className="px-5 py-4 text-center font-extrabold tabular-nums text-primary-700">
                        {tarifDisplay(a.tarif)}
                      </td>
                      <td className="px-5 py-4 text-xs text-charcoal-700">{a.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Cards détaillées */}
        <section className="mb-14">
          <header className="mb-8">
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
              <Award className="h-3.5 w-3.5" strokeWidth={2.4} />
              Fiches détaillées
            </span>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
              Forces et positionnement
            </h2>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ASSUREURS.map((a) => (
              <article
                key={a.slug}
                className="group relative overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-premium"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700 opacity-60 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
                <header className="mb-4 flex items-start justify-between gap-3">
                  <h3 className="font-heading text-xl font-extrabold tracking-tight text-charcoal-900">
                    {a.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary-50 px-2.5 py-0.5 text-xs font-bold text-secondary-800">
                    {a.rating}
                    <Star
                      className="h-3 w-3 fill-secondary-500 text-secondary-500"
                      strokeWidth={2}
                    />
                  </span>
                </header>
                <p className="mb-5 text-sm leading-relaxed text-charcoal-600">{a.description}</p>

                <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-primary-700">
                  <Sparkles className="h-3 w-3" strokeWidth={2.4} />
                  Forces
                </p>
                <ul className="mb-5 space-y-1.5 text-sm">
                  {a.forces.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-charcoal-700">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-secondary-700"
                        strokeWidth={2.4}
                      />
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {a.acprAgrement && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary-50 px-2.5 py-0.5 text-[11px] font-bold text-secondary-800">
                      <ShieldCheck className="h-3 w-3" strokeWidth={2.4} />
                      ACPR
                    </span>
                  )}
                  {a.csaMember && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-50 px-2.5 py-0.5 text-[11px] font-bold text-accent-800">
                      <Award className="h-3 w-3" strokeWidth={2.4} />
                      CSCA
                    </span>
                  )}
                </div>

                <div className="border-t border-charcoal-100 pt-4">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-charcoal-500">
                    Idéal pour
                  </p>
                  <p className="mt-1 text-sm font-bold text-primary-700">{a.bestFor}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden rounded-3xl bg-charcoal-900 p-10 text-white shadow-premium-lg md:p-14">
          <div className="hero-gradient-anim absolute inset-0 bg-gradient-hero-warm opacity-95" />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-secondary-400/30 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                <Sparkles className="h-3 w-3 text-secondary-300" />
                Devis comparatif
              </span>
              <h2 className="mb-2 font-heading text-3xl font-extrabold tracking-display md:text-4xl">
                Ne savez pas lequel choisir&nbsp;?
              </h2>
              <p className="max-w-xl text-base text-white/85 md:text-lg">
                Notre cabinet ORIAS interroge automatiquement les 3-5 partenaires les plus adaptés à
                votre profil et vous remet leur meilleur devis.
              </p>
            </div>
            <Link
              href="/devis"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-extrabold text-primary-700 shadow-premium transition-all hover:-translate-y-0.5"
            >
              Obtenir un devis comparatif
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
