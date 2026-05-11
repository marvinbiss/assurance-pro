/**
 * Outil — Calculateur prévoyance TNS Madelin 2026
 *
 * KW Ahrefs (kw_universe) :
 * - Famille vert-pr_voyance_tns.json : 9 KW, 1 020 vol, ROI 262k score
 * - "prévoyance tns" 500 vol KD 4 CPC 350€
 * - "loi madelin" 200 vol + tail
 * - "prévoyance auto entrepreneur" 100 vol KD 1 CPC 280€
 *
 * Conversion forte car Loi Madelin = avantage fiscal direct (déduction CGI 154 bis).
 */

import type { Metadata } from 'next'
import { CalculateurPrevoyanceTns } from '@/components/outils/CalculateurPrevoyanceTns'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/calculateur-tarif-prevoyance-tns'

export const metadata: Metadata = {
  title: 'Calculateur prévoyance TNS Madelin 2026 — Estimation immédiate (gratuit)',
  description:
    'Calculez votre cotisation prévoyance TNS Madelin 2026 en 30 secondes. 7 assureurs comparés (Generali, MMA Pro, AXA Pro, Allianz, Pro BTP, Apicil, Swisslife). IJ + invalidité + capital décès. Déductibilité Loi Madelin CGI 154 bis intégrée. Devis officiel 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Calculateur prévoyance TNS Madelin 2026',
    description: 'Estimation prévoyance TNS en 30 secondes. 7 assureurs + déductibilité Madelin.',
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default async function Page() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-amber-700 to-orange-900 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-sm opacity-80">
            <a href="/" className="hover:underline">
              Accueil
            </a>{' '}
            /{' '}
            <a href="/prevoyance-artisan" className="hover:underline">
              Prévoyance
            </a>{' '}
            / <span>Calculateur TNS Madelin</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-emerald-500/90 px-3 py-1 text-sm font-semibold text-white">
            ✓ Loi Madelin — Déduction fiscale CGI 154 bis intégrée
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Calculateur prévoyance TNS Madelin 2026
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Estimez immédiatement votre cotisation prévoyance pour{' '}
            <strong>Travailleur Non Salarié</strong> (auto-entrepreneur, EI, EURL, gérant
            majoritaire) selon votre profession, âge et revenus.{' '}
            <strong>Déductibilité fiscale Loi Madelin</strong> calculée automatiquement (économie
            15-30% TMI).
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded bg-white/10 p-3">
              <strong>⏱ 30 secondes</strong>
              <br />
              Estimation immédiate
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>📊 7 assureurs</strong>
              <br />
              Generali, MMA, AXA…
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>💰 Madelin CGI 154 bis</strong>
              <br />
              Économie fiscale calculée
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🆓 Gratuit</strong>
              <br />
              Sans inscription
            </div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-2xl font-bold">Renseignez votre profil TNS</h2>
          <p className="mb-6 text-gray-600">
            Le calcul est <strong>100% côté navigateur</strong>. Estimation indicative basée sur
            barèmes 2026 des 7 assureurs prévoyance TNS partenaires. Plafond Madelin 2026 :{' '}
            <strong>3,75% PASS + 7%</strong> au-delà ≈ 7 200 €/an déductibles pour CA 100k€.
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <CalculateurPrevoyanceTns />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Pourquoi la prévoyance TNS est INDISPENSABLE</h2>
          <p className="mb-4 text-sm text-gray-700">
            Contrairement aux salariés (Sécu + prévoyance employeur), les TNS sont{' '}
            <strong>très peu couverts par le régime obligatoire</strong> :
          </p>
          <table className="w-full border-collapse bg-white text-sm">
            <thead>
              <tr className="bg-amber-50">
                <th className="border p-2 text-left">Risque</th>
                <th className="border p-2 text-left">Couverture régime obligatoire TNS</th>
                <th className="border p-2 text-left">Manque à compenser</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  <strong>Arrêt maladie</strong>
                </td>
                <td className="border p-2">IJ 56 €/jour mini après 3 jours carence (CIPAV/SSI)</td>
                <td className="border p-2">~70-80% du revenu</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Invalidité totale</strong>
                </td>
                <td className="border p-2">Pension ~1 200-2 200€/mois</td>
                <td className="border p-2">~50-70% du revenu</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Décès (rente conjoint)</strong>
                </td>
                <td className="border p-2">Capital ~3 000-9 000€ (selon caisse)</td>
                <td className="border p-2">100% besoin patrimoine</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Décès (rente enfants)</strong>
                </td>
                <td className="border p-2">Allocation orphelin ~150€/mois</td>
                <td className="border p-2">100% besoin éducation</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 border-l-4 border-amber-500 bg-amber-100 p-3 text-sm">
            <strong>Exemple concret</strong> : consultant 45 ans, CA 80 000 €/an. Arrêt maladie 90
            jours.
            <br />
            Sans prévoyance TNS : SSI verse 56€/j × 87j = <strong>4 872 €</strong>. Perte revenus :
            80 000 × 90/365 = <strong>19 726 €</strong>. Manque : <strong>14 854 €</strong>.
            <br />
            Avec prévoyance TNS standard : IJ 80% × 219€/j × 87j = <strong>15 244 €</strong>. Perte
            couverte à 95%.
          </p>
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-3 text-xl font-bold text-amber-900">
            ⚠️ Estimation indicative — pas un devis officiel
          </h2>
          <p className="text-sm">
            Cette estimation a une <strong>valeur indicative uniquement</strong>. Les assureurs
            prévoyance TNS pratiquent un <strong>questionnaire santé obligatoire</strong> (40-60
            questions) qui peut faire varier le tarif réel de ±20%. Antécédents médicaux non
            déclarés = nullité contrat. Notre cabinet ORIAS optimise ce questionnaire dans tous ses
            devis.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-700 to-orange-800 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">Prêt à protéger vos revenus ?</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-95">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 propositions
            officielles parmi nos 7 partenaires prévoyance TNS. Avantage fiscal Madelin maximisé.
          </p>
          <div className="flex flex-col justify-center gap-3 md:flex-row">
            <a
              href="/prevoyance-artisan"
              className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-amber-700 shadow-lg transition hover:bg-gray-100"
            >
              → Pilier prévoyance artisan/TNS
            </a>
            <a
              href="/mutuelle-sante-tns"
              className="inline-block rounded-lg border border-white/30 bg-amber-800 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-amber-900"
            >
              → Mutuelle santé TNS
            </a>
          </div>
        </div>
      </section>

      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur prévoyance TNS Madelin 2026 — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'Calculateur interactif prévoyance TNS Madelin 2026. IJ + invalidité + capital décès. Déductibilité fiscale CGI 154 bis intégrée. 7 assureurs comparés.',
            featureList: [
              'Calcul instantané 100% client-side',
              'IJ arrêt maladie + rente invalidité + capital décès',
              'Déductibilité Loi Madelin CGI 154 bis automatique',
              '8 professions TNS + 4 formules garantie',
              'Économie fiscale TMI calculée en direct',
            ],
          },
          nonce
        )}
      />
      <StickyConversionBar
        ctaText="→ Devis prévoyance TNS"
        ctaUrl="/outils/devis-rc-pro?secteur=prevoyance-tns"
        trustSignal="7 assureurs comparés • Loi Madelin déductible • ORIAS"
        variant="amber"
      />
    </main>
  )
}
