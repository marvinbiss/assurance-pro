import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Calculator, ShieldCheck, Zap, Sparkles } from 'lucide-react'
import { SimulatorForm } from '@/components/simulator/SimulatorForm'
import { PageHero } from '@/components/layout/PageHero'
import { SITE_URL } from '@/lib/seo/config'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const metadata: Metadata = {
  title: 'Simulateur assurance pro 2026 — Estimation gratuite en 2 min',
  description:
    "Estimez votre prime d'assurance professionnelle 2026 en moins de 2 minutes. 40 métiers couverts (BTP, conseil, santé, immobilier, transport). Fourchette de prix immédiate, sans inscription.",
  alternates: { canonical: `${SITE_URL}/simulateur` },
  openGraph: {
    title: 'Simulateur assurance pro 2026 — Estimation gratuite en 2 min',
    description:
      'Estimez votre prime assurance pro 2026 instantanément. 40 métiers couverts. Sans inscription.',
    url: `${SITE_URL}/simulateur`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulateur assurance pro 2026',
    description: 'Estimez votre prime en 2 min. 40 métiers couverts. Sans inscription.',
  },
}

const BENEFICES = [
  {
    Icon: Zap,
    title: 'Résultat instantané',
    desc: 'Fourchette de prix calculée en 2 minutes, sans inscription, sans engagement.',
  },
  {
    Icon: ShieldCheck,
    title: '40 métiers couverts',
    desc: 'BTP, conseil, santé, immobilier, transport, e-commerce, sport. Tous les principaux verticaux.',
  },
  {
    Icon: Calculator,
    title: 'Méthode transparente',
    desc: 'Basé sur ~500 dossiers réels du cabinet et benchmarks AQC SYCODÉS 2024.',
  },
]

export default async function SimulateurPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Simulateur assurance pro Vivos',
    description:
      "Outil d'estimation de prime d'assurance professionnelle pour 40 métiers : BTP, conseil, santé, immobilier, transport.",
    url: `${SITE_URL}/simulateur`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    provider: {
      '@type': 'Organization',
      name: 'Vivos Assurance',
      url: SITE_URL,
    },
  }

  return (
    <main className="min-h-screen bg-sand-50">
      <script {...jsonLdScriptProps(schema, nonce)} />

      <PageHero
        breadcrumbs={[{ label: 'Outils' }, { label: 'Simulateur' }]}
        eyebrow="Estimation gratuite"
        EyebrowIcon={Calculator}
        title={
          <>
            Combien coûte votre
            <br />
            <span className="text-secondary-200">assurance pro en 2026 ?</span>
          </>
        }
        description={
          <>
            Estimation en 2 minutes basée sur 500 dossiers analysés. 40 métiers couverts. Sans
            inscription.
          </>
        }
        meta={[
          { Icon: Zap, label: 'Résultat instantané' },
          { Icon: ShieldCheck, label: '40 métiers couverts' },
          { Icon: Sparkles, label: 'Sans inscription' },
        ]}
      />

      <div className="container mx-auto max-w-4xl px-4 py-14">
        {/* Bénéfices */}
        <section className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {BENEFICES.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-charcoal-100 bg-white p-5 shadow-soft"
            >
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                <b.Icon className="h-5 w-5 text-primary-700" strokeWidth={2.4} />
              </span>
              <h3 className="mb-1 font-heading text-base font-extrabold text-charcoal-900">
                {b.title}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal-600">{b.desc}</p>
            </div>
          ))}
        </section>

        {/* Simulator */}
        <SimulatorForm />

        {/* Légal */}
        <div className="mt-8 rounded-2xl border border-charcoal-100 bg-white p-5 text-xs text-charcoal-600 shadow-soft">
          <p className="mb-2">
            <strong className="text-charcoal-800">⚠️ Mention légale :</strong> les estimations
            affichées sont indicatives et basées sur les analyses 2024-2025 de notre cabinet sur
            environ 500 dossiers, ainsi que sur les benchmarks AQC SYCODÉS et FFA. Le tarif
            définitif ne peut être donné qu&apos;après souscription effective auprès d&apos;un
            assureur agréé ACPR, qui prendra en compte tous les critères individuels (zone
            géographique, ancienneté, certifications RGE/Qualibat, antécédents détaillés,
            sous-traitance, plafonds spécifiques).
          </p>
          <p>
            Conformément au devoir de conseil (DDA art. L. 521-4), une recommandation motivée écrite
            vous sera remise lors de toute souscription. Vivos Assurance est cabinet de courtage
            ORIAS indépendant.
          </p>
        </div>
      </div>
    </main>
  )
}
