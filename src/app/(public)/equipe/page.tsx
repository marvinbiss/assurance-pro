import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users, Award, CheckCircle2, ShieldCheck } from 'lucide-react'
import { EQUIPE } from '@/lib/data/equipe'
import { SITE_URL } from '@/lib/seo/config'
import { PageHero } from '@/components/layout/PageHero'
import { PAGE_PHOTOS } from '@/lib/data/photo-library'
import { InlineCta } from '@/components/cta/inline-cta'

export const metadata: Metadata = {
  title: "L'équipe — Courtiers ORIAS Vivos Assurance",
  description:
    "Découvrez l'équipe du cabinet de courtage ORIAS Vivos Assurance : direction, pôles BTP, RC Pro, Santé ou Prévoyance. Expertise certifiée IAS Niveau I.",
  alternates: { canonical: `${SITE_URL}/equipe` },
  openGraph: {
    title: "L'équipe — Courtiers ORIAS Vivos Assurance",
    description: "Découvrez l'équipe : direction, pôles BTP, RC Pro, Santé ou Prévoyance.",
    url: `${SITE_URL}/equipe`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "L'équipe — Courtiers ORIAS",
    description: 'Direction, pôles BTP, RC Pro, Santé ou Prévoyance. Expertise IAS Niveau I.',
  },
}

const ENGAGEMENTS = [
  "Indépendance capitalistique totale (aucune participation d'assureur)",
  "Analyse impartiale d'un nombre suffisant de contrats (art. L. 521-4 II)",
  'Recommandation écrite motivée pour chaque souscription',
  'Aucun frais de courtage facturé au client',
  'Réclamations traitées sous 10 j — réponse fond sous 2 mois (ACPR 2024-R-02)',
  'Adhésion CSCA et formation continue annuelle ACPR (15 h par an minimum)',
] as const

export default function EquipePage() {
  const membres = Object.values(EQUIPE)
  return (
    <div className="min-h-screen bg-sand-50 dark:bg-charcoal-950">
      <PageHero
        breadcrumbs={[{ label: 'Cabinet' }, { label: "L'équipe" }]}
        eyebrow="Pôles d'expertise sectoriels"
        EyebrowIcon={Users}
        title={
          <>
            Notre équipe,
            <br />
            <span className="text-secondary-200">votre expertise dédiée.</span>
          </>
        }
        description={
          <>
            Cabinet de courtage indépendant immatriculé ORIAS, organisé en pôles d&apos;expertise
            sectoriels. Tous nos courtiers sont titulaires de la capacité professionnelle{' '}
            <strong className="text-white">IAS Niveau I</strong> (art. R. 512-9 C. assur.).
          </>
        }
        meta={[
          { Icon: Users, label: `${membres.length} courtiers ORIAS` },
          { Icon: Award, label: 'IAS Niveau I certifié' },
          { Icon: ShieldCheck, label: 'CSCA · Formation 15h par an' },
        ]}
      />

      <div className="container mx-auto max-w-6xl px-4 py-14">
        {/* Grid équipe */}
        <section className="mb-14">
          <header className="mb-8">
            <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-primary-700">
              <Users className="h-3.5 w-3.5" strokeWidth={2.4} />
              Profils
            </span>
            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
              Tous nos courtiers ORIAS
            </h2>
          </header>

          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {membres.map((m, idx) => {
              const photo = PAGE_PHOTOS.equipeGrid[idx % PAGE_PHOTOS.equipeGrid.length]
              return (
                <li
                  key={m.slug}
                  className="group relative overflow-hidden rounded-3xl border border-charcoal-100 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-premium"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 opacity-60 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="mb-5 flex items-start gap-4">
                    {photo ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={56}
                        height={56}
                        className="h-14 w-14 flex-shrink-0 rounded-2xl object-cover shadow-glow-clay ring-2 ring-primary-200"
                      />
                    ) : (
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 font-heading text-lg font-extrabold text-white shadow-glow-clay">
                        {m.prenom.charAt(0)}
                        {m.nom.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 leading-tight">
                      <h3 className="mb-1 font-heading text-lg font-extrabold tracking-tight text-charcoal-900">
                        <Link
                          href={`/equipe/${m.slug}`}
                          className="transition-colors group-hover:text-primary-700"
                        >
                          {m.prenom} {m.nom}
                        </Link>
                      </h3>
                      <p className="text-sm font-semibold text-charcoal-500">{m.poste}</p>
                    </div>
                  </div>
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-charcoal-600">
                    {m.bio}
                  </p>
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {m.expertises.slice(0, 3).map((e) => (
                      <span
                        key={e}
                        className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-[11px] font-bold text-primary-700"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/equipe/${m.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 transition-transform group-hover:translate-x-0.5"
                  >
                    Voir le profil
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Engagements premium */}
        <section className="overflow-hidden rounded-3xl border border-charcoal-100 bg-white p-8 shadow-soft md:p-12">
          <header className="mb-8 flex items-start gap-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-700 shadow-soft">
              <Award className="h-6 w-6 text-white" strokeWidth={2.4} />
            </span>
            <div>
              <span className="mb-1 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-secondary-700">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                Promesse cabinet
              </span>
              <h2 className="font-heading text-2xl font-extrabold tracking-tight text-charcoal-900 md:text-3xl">
                Nos engagements
              </h2>
            </div>
          </header>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
            {ENGAGEMENTS.map((e) => (
              <li key={e} className="flex items-start gap-3 text-sm text-charcoal-700">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary-700"
                  strokeWidth={2.4}
                />
                <span className="leading-relaxed">{e}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <InlineCta
            title="Parlez à un courtier ORIAS dédié"
            description="Notre équipe étudie votre situation et négocie 3 devis personnalisés auprès de 10+ assureurs partenaires."
          />
        </div>
      </div>
    </div>
  )
}
