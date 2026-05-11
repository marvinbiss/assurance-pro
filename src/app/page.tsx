/**
 * Homepage — Assurance Pro France
 * Courtier ORIAS multi-vertical (BTP / RC Pro / Mutuelle / VTC / etc.)
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { TrustBadgesRow } from '@/components/conversion/TrustBadgesRow'
import { StatsBar } from '@/components/conversion/StatsBar'
import { TestimonialsBlock } from '@/components/conversion/TestimonialsBlock'

export const metadata: Metadata = {
  title: 'Assurance Pro — Comparez et économisez en 2 minutes',
  description:
    'Courtier ORIAS spécialiste assurance professionnelle. Comparez les offres de 10+ assureurs partenaires. Décennale, RC Pro, Multirisque, Mutuelle, VTC, Cyber. Devis gratuit et sans engagement.',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr',
  },
}

const VERTICALS = [
  {
    code: 'decennale',
    title: 'Décennale BTP',
    desc: 'Maçon, plombier, électricien, couvreur, peintre… Garantie obligatoire selon la Loi Spinetta.',
    href: '/assurance-decennale',
    icon: '🏗️',
    examples: '52 métiers BTP couverts',
  },
  {
    code: 'rc-pro',
    title: 'RC Pro',
    desc: 'Consultants, freelances, services aux entreprises, agences digitales, coachs.',
    href: '/rc-pro',
    icon: '💼',
    examples: '32 professions couvertes',
  },
  {
    code: 'multirisque-pro',
    title: 'Multirisque Pro',
    desc: 'Local commercial, atelier, bureau, stock. Vol, incendie, dégâts des eaux, perte d’exploitation.',
    href: '/multirisque-pro',
    icon: '🏢',
    examples: '30 secteurs d’activité',
  },
  {
    code: 'mutuelle-pro',
    title: 'Mutuelle Pro / TNS',
    desc: 'Travailleurs non-salariés, dirigeants, freelances. Loi Madelin déductible.',
    href: '/mutuelle-pro',
    icon: '🏥',
    examples: 'Comparatif 8 mutuelles',
  },
  {
    code: 'assurance-vtc',
    title: 'VTC / Taxi',
    desc: 'Chauffeur privé, location avec chauffeur, plateformes Uber / Bolt / Heetch.',
    href: '/assurance-vtc',
    icon: '🚗',
    examples: 'Auto-entrepreneur ou SARL',
  },
  {
    code: 'cyber-assurance',
    title: 'Cyber Assurance',
    desc: 'E-commerce, ESN, agences digitales. Ransomware, RGPD breach, fuite de données.',
    href: '/cyber-assurance',
    icon: '🔒',
    examples: 'Couverture jusqu’à 5 M€',
  },
]

const TRUST_INDICATORS = [
  { value: '10+', label: 'Assureurs partenaires' },
  { value: '17', label: 'Verticaux couverts' },
  { value: '24h', label: 'Délivrance attestation' },
  { value: '0€', label: 'Frais de courtage' },
]

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-blue-700 to-blue-900 py-20 text-white">
        <div className="container mx-auto max-w-5xl px-4">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider opacity-90">
            Courtier en assurance professionnelle ORIAS n°
            {process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'}
          </p>
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Votre assurance pro,
            <br />
            comparée et négociée en 2&nbsp;minutes
          </h1>
          <p className="mb-8 max-w-3xl text-lg opacity-95 md:text-xl">
            Décennale, RC&nbsp;Pro, Multirisque, Mutuelle TNS, VTC, Cyber. Recevez 3&nbsp;devis
            personnalisés en moins de 24&nbsp;heures auprès de nos partenaires assureurs reconnus.
          </p>

          <div className="mb-10 flex flex-wrap gap-3">
            <Link
              href="/devis"
              className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-lg transition hover:bg-gray-100"
            >
              Obtenir mon devis gratuit →
            </Link>
            <a
              href="#verticaux"
              className="inline-block rounded-lg border-2 border-white px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Découvrir les garanties
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-white/20 pt-8 md:grid-cols-4">
            {TRUST_INDICATORS.map((t) => (
              <div key={t.label}>
                <div className="text-3xl font-bold md:text-4xl">{t.value}</div>
                <div className="mt-1 text-sm opacity-90">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBadgesRow />

      <StatsBar />

      <section id="verticaux" className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
            Une assurance adaptée à votre métier
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
            Notre cabinet de courtage spécialiste de l’assurance pro intervient sur l’ensemble des
            verticaux professionnels en France.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VERTICALS.map((v) => (
              <Link
                key={v.code}
                href={v.href}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg"
              >
                <div className="mb-3 text-4xl" aria-hidden="true">
                  {v.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{v.title}</h3>
                <p className="mb-4 text-gray-600">{v.desc}</p>
                <p className="text-sm font-medium text-blue-600">{v.examples} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            3 étapes pour souscrire votre assurance pro
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                n: 1,
                title: 'Vos besoins',
                desc: 'Décrivez votre activité, votre profil et vos garanties souhaitées. 2 minutes chrono.',
              },
              {
                n: 2,
                title: 'Comparaison',
                desc: 'Notre équipe interroge nos 10 assureurs partenaires et négocie pour vous. Réponse sous 24 heures.',
              },
              {
                n: 3,
                title: 'Souscription',
                desc: 'Vous choisissez l’offre la plus adaptée. Attestation délivrée sous 24 heures après souscription.',
              },
            ].map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                  {s.n}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsBlock />

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-semibold md:text-3xl">Nos partenaires assureurs</h2>
          <p className="mb-8 text-gray-600">
            Nous comparons les offres de plus de 10 compagnies d’assurance reconnues.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 font-medium text-gray-700">
            {[
              'Hiscox',
              'April Pro',
              'Allianz Pro',
              'MMA Pro',
              'Generali Pro',
              'AXA Pro',
              'MAAF Pro',
              'SMABTP',
              'Wakam',
              'Stello',
            ].map((p) => (
              <span key={p} className="rounded border border-gray-200 bg-white px-4 py-2">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-700 py-16 text-center text-white">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Prêt à comparer votre assurance pro&nbsp;?
          </h2>
          <p className="mb-8 text-lg opacity-95">
            Devis gratuit, sans engagement. Recevez vos premières offres en moins de 24&nbsp;heures.
          </p>
          <Link
            href="/devis"
            className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-lg transition hover:bg-gray-100"
          >
            Démarrer mon devis →
          </Link>
        </div>
      </section>

      <section className="bg-gray-100 py-6 text-xs text-gray-600">
        <div className="container mx-auto max-w-5xl px-4">
          <p>
            <strong>Information précontractuelle —</strong> Ce contenu est informatif et ne
            constitue pas un conseil personnalisé au sens de l’article L.&nbsp;521-4 du Code des
            assurances. Pour un conseil adapté à votre situation, un courtier ORIAS vous
            recontactera après réception de votre demande de devis. Aucune commission n’est facturée
            à nos clients ; nous sommes rémunérés par les compagnies d’assurance partenaires.
          </p>
        </div>
      </section>
    </>
  )
}
