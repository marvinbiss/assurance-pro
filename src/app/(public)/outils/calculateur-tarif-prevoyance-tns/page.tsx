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
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/calculateur-tarif-prevoyance-tns'

export const metadata: Metadata = {
  title: 'Calculateur prévoyance TNS Madelin 2026 — Estimation immédiate (gratuit)',
  description:
    "Calculez votre cotisation prévoyance TNS Madelin 2026 en 30 secondes. 7 assureurs comparés (Generali, MMA Pro, AXA Pro, Allianz, Pro BTP, Apicil, Swisslife). IJ + invalidité + capital décès. Déductibilité Loi Madelin CGI 154 bis intégrée. Devis officiel 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Calculateur prévoyance TNS Madelin 2026',
    description: "Estimation prévoyance TNS en 30 secondes. 7 assureurs + déductibilité Madelin.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-amber-700 to-orange-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <a href="/prevoyance-artisan" className="hover:underline">Prévoyance</a>{' '}/{' '}
            <span>Calculateur TNS Madelin</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-emerald-500/90 text-white rounded-full text-sm font-semibold">
            ✓ Loi Madelin — Déduction fiscale CGI 154 bis intégrée
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Calculateur prévoyance TNS Madelin 2026
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Estimez immédiatement votre cotisation prévoyance pour <strong>Travailleur Non Salarié</strong>{' '}
            (auto-entrepreneur, EI, EURL, gérant majoritaire) selon votre profession, âge et revenus.{' '}
            <strong>Déductibilité fiscale Loi Madelin</strong> calculée automatiquement (économie 15-30% TMI).
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>⏱ 30 secondes</strong><br />Estimation immédiate</div>
            <div className="bg-white/10 rounded p-3"><strong>📊 7 assureurs</strong><br />Generali, MMA, AXA…</div>
            <div className="bg-white/10 rounded p-3"><strong>💰 Madelin CGI 154 bis</strong><br />Économie fiscale calculée</div>
            <div className="bg-white/10 rounded p-3"><strong>🆓 Gratuit</strong><br />Sans inscription</div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">Renseignez votre profil TNS</h2>
          <p className="text-gray-600 mb-6">
            Le calcul est <strong>100% côté navigateur</strong>. Estimation indicative basée sur
            barèmes 2026 des 7 assureurs prévoyance TNS partenaires. Plafond Madelin 2026 :{' '}
            <strong>3,75% PASS + 7%</strong> au-delà ≈ 7 200 €/an déductibles pour CA 100k€.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <CalculateurPrevoyanceTns />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Pourquoi la prévoyance TNS est INDISPENSABLE</h2>
          <p className="text-sm text-gray-700 mb-4">
            Contrairement aux salariés (Sécu + prévoyance employeur), les TNS sont <strong>très peu
            couverts par le régime obligatoire</strong> :
          </p>
          <table className="w-full text-sm border-collapse bg-white">
            <thead>
              <tr className="bg-amber-50">
                <th className="border p-2 text-left">Risque</th>
                <th className="border p-2 text-left">Couverture régime obligatoire TNS</th>
                <th className="border p-2 text-left">Manque à compenser</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2"><strong>Arrêt maladie</strong></td><td className="border p-2">IJ 56 €/jour mini après 3 jours carence (CIPAV/SSI)</td><td className="border p-2">~70-80% du revenu</td></tr>
              <tr><td className="border p-2"><strong>Invalidité totale</strong></td><td className="border p-2">Pension ~1 200-2 200€/mois</td><td className="border p-2">~50-70% du revenu</td></tr>
              <tr><td className="border p-2"><strong>Décès (rente conjoint)</strong></td><td className="border p-2">Capital ~3 000-9 000€ (selon caisse)</td><td className="border p-2">100% besoin patrimoine</td></tr>
              <tr><td className="border p-2"><strong>Décès (rente enfants)</strong></td><td className="border p-2">Allocation orphelin ~150€/mois</td><td className="border p-2">100% besoin éducation</td></tr>
            </tbody>
          </table>
          <p className="mt-4 text-sm bg-amber-100 border-l-4 border-amber-500 p-3">
            <strong>Exemple concret</strong> : consultant 45 ans, CA 80 000 €/an. Arrêt maladie 90 jours.
            <br />
            Sans prévoyance TNS : SSI verse 56€/j × 87j = <strong>4 872 €</strong>. Perte revenus : 80 000 × 90/365 = <strong>19 726 €</strong>. Manque : <strong>14 854 €</strong>.
            <br />
            Avec prévoyance TNS standard : IJ 80% × 219€/j × 87j = <strong>15 244 €</strong>. Perte couverte à 95%.
          </p>
        </div>
      </section>

      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-3 text-amber-900">⚠️ Estimation indicative — pas un devis officiel</h2>
          <p className="text-sm">
            Cette estimation a une <strong>valeur indicative uniquement</strong>. Les assureurs
            prévoyance TNS pratiquent un <strong>questionnaire santé obligatoire</strong> (40-60
            questions) qui peut faire varier le tarif réel de ±20%. Antécédents médicaux non
            déclarés = nullité contrat. Notre cabinet ORIAS optimise ce questionnaire dans tous
            ses devis.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-amber-700 to-orange-800 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Prêt à protéger vos revenus ?</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 propositions
            officielles parmi nos 7 partenaires prévoyance TNS. Avantage fiscal Madelin maximisé.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="/prevoyance-artisan" className="inline-block bg-white text-amber-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Pilier prévoyance artisan/TNS</a>
            <a href="/mutuelle-sante-tns" className="inline-block bg-amber-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-amber-900 transition shadow-lg border border-white/30">→ Mutuelle santé TNS</a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur prévoyance TNS Madelin 2026 — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Calculateur interactif prévoyance TNS Madelin 2026. IJ + invalidité + capital décès. Déductibilité fiscale CGI 154 bis intégrée. 7 assureurs comparés.",
            featureList: [
              'Calcul instantané 100% client-side',
              'IJ arrêt maladie + rente invalidité + capital décès',
              'Déductibilité Loi Madelin CGI 154 bis automatique',
              '8 professions TNS + 4 formules garantie',
              'Économie fiscale TMI calculée en direct',
            ],
          }),
        }}
      />
    </main>
  )
}
