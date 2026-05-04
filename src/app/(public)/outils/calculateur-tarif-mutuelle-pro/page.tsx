/**
 * Outil — Calculateur tarif mutuelle santé pro 2026
 *
 * KW Ahrefs cibles (snapshot 2026-04-29, validés kw_universe Supabase) :
 * Famille kw-mutuelle_pro_BTP.json : 55 KW, 32 100 vol cumulé, ROI 3M
 * Top KW :
 * - "pro btp mutuelle"           → 16 000 vol KD 4 CPC 90€ ⭐⭐⭐ (volume #1 toutes familles)
 * - "mutuelle pro btp"           →  7 500 vol KD 4 CPC 90€
 * - "mutuelle tns"               →  1 400 vol KD 7 CPC 500€
 * - "mutuelle entreprise"        →  ~  pour effectif Loi ANI
 * - "tarif mutuelle entreprise" / "prix mutuelle pro" / "comparateur mutuelle"
 *
 * Stratégie : OUTIL INTERACTIF haute conversion, double cible
 * (1) TNS Madelin individuel (1 400 vol "mutuelle tns" KD 7 CPC 500€)
 * (2) Loi ANI collective entreprise (volume "pro btp mutuelle" 16 000)
 * Funnel direct vers /outils/comparateur-mutuelle-pro (form lead existant en prod).
 *
 * Conformité : ACPR 2024-R-02 + Loi ANI art. L. 911-7 CSS (50% employeur).
 */

import type { Metadata } from 'next'
import { CalculateurTarifMutuellePro } from '@/components/outils/CalculateurTarifMutuellePro'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/calculateur-tarif-mutuelle-pro'

export const metadata: Metadata = {
  title: 'Calculateur tarif mutuelle pro 2026 — TNS Madelin & Loi ANI (gratuit)',
  description:
    "Calculez votre tarif mutuelle santé pro en 30 secondes. TNS Madelin (individuel) ou Loi ANI (collective entreprise). 8 mutuelles comparées : Pro BTP, Apicil, Malakoff Humanis, Harmonie Mutuelle, AG2R, Allianz, Generali, Klesia. 4 niveaux garantie. Devis officiel 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Calculateur tarif mutuelle pro 2026 — TNS & Loi ANI',
    description: "Estimation tarif mutuelle pro en 30 secondes. 8 organismes comparés. Devis officiel 24h.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-emerald-700 to-teal-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <a href="/mutuelle-pro-btp" className="hover:underline">Mutuelle pro</a>{' '}/{' '}
            <span>Calculateur tarif</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-green-500/90 text-white rounded-full text-sm font-semibold">
            ✓ TNS Madelin + Loi ANI — Estimation 30 secondes
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Calculateur tarif mutuelle pro 2026
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Estimez immédiatement votre tarif mutuelle santé professionnelle :{' '}
            <strong>TNS Madelin individuel</strong> (auto-entrepreneur, profession libérale,
            dirigeant TNS) ou <strong>Loi ANI collective</strong> (entreprise ≥1 salarié — 50%
            employeur obligatoire). Calcul basé sur barèmes 2026 de 8 mutuelles partenaires.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>⏱ 30 secondes</strong><br />Estimation immédiate</div>
            <div className="bg-white/10 rounded p-3"><strong>📊 8 mutuelles</strong><br />Pro BTP, Apicil, Malakoff…</div>
            <div className="bg-white/10 rounded p-3"><strong>⚖️ Loi ANI</strong><br />Calcul part employeur</div>
            <div className="bg-white/10 rounded p-3"><strong>🆓 Gratuit</strong><br />Sans inscription</div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-2">Renseignez votre profil</h2>
          <p className="text-gray-600 mb-6">
            Le calcul est <strong>100% côté navigateur</strong> — vos données ne sont pas envoyées
            à nos serveurs. Estimation indicative basée sur barèmes mutualisés DREES 2024 + grilles
            2026 partenaires (Pro BTP, Apicil, Malakoff Humanis, Harmonie Mutuelle, AG2R La
            Mondiale, Allianz, Generali, Klesia).
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <CalculateurTarifMutuellePro />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Comprendre les 4 niveaux de couverture</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border-l-4 border-gray-400 p-4 rounded-r">
              <h3 className="font-bold mb-1">Socle ANI minimal — 32 €/mois</h3>
              <p className="text-sm">
                Couverture obligatoire Loi ANI (art. R. 911-3 CSS). Remboursement 100% Base Sécurité
                sociale + 100% santé sur lunettes/dentaire de classe A. Aucun dépassement honoraires
                couvert. <strong>Adapté</strong> : salariés 25-35 ans en bonne santé sans famille.
              </p>
            </div>
            <div className="bg-white border-l-4 border-emerald-500 p-4 rounded-r">
              <h3 className="font-bold mb-1">Standard — 58 €/mois (recommandée)</h3>
              <p className="text-sm">
                125% BR consultations + dentaire 200% (couronne 600€) + optique 350€/équipement.
                Hospitalisation chambre particulière. <strong>Adapté</strong> : 80% des
                travailleurs/familles avec besoins santé courants.
              </p>
            </div>
            <div className="bg-white border-l-4 border-teal-500 p-4 rounded-r">
              <h3 className="font-bold mb-1">Confort — 92 €/mois</h3>
              <p className="text-sm">
                200% BR + médecines douces (ostéo, étiopathie, sophrologie) + chambre particulière
                100% + dentaire 300%. <strong>Adapté</strong> : familles avec enfants, dirigeants
                TNS exposés au stress, professions libérales.
              </p>
            </div>
            <div className="bg-white border-l-4 border-cyan-700 p-4 rounded-r">
              <h3 className="font-bold mb-1">Premium — 145 €/mois</h3>
              <p className="text-sm">
                300% BR + remboursement intégral lunettes/dentaire/implants/orthodontie adulte +
                assistance internationale. <strong>Adapté</strong> : dirigeants 50+ ans, professions
                libérales à fort revenu, expatriés, familles nombreuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Loi ANI vs TNS Madelin — Quelles différences ?</h2>
          <table className="w-full text-sm border-collapse bg-white">
            <thead>
              <tr className="bg-emerald-50">
                <th className="border p-2 text-left">Critère</th>
                <th className="border p-2 text-left">TNS Madelin</th>
                <th className="border p-2 text-left">Loi ANI collective</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2"><strong>Cible</strong></td>
                <td className="border p-2">Travailleurs non-salariés (AE, EI, EURL gérant majoritaire, prof. libérale)</td>
                <td className="border p-2">Tous salariés du privé (depuis 1er janvier 2016)</td>
              </tr>
              <tr>
                <td className="border p-2"><strong>Obligation</strong></td>
                <td className="border p-2">FACULTATIVE (mais fiscalement intéressante)</td>
                <td className="border p-2">OBLIGATOIRE pour l&apos;entreprise (art. L. 911-7 CSS)</td>
              </tr>
              <tr>
                <td className="border p-2"><strong>Cotisation</strong></td>
                <td className="border p-2">100% à charge du TNS</td>
                <td className="border p-2">50% mini employeur + 50% maxi salarié</td>
              </tr>
              <tr>
                <td className="border p-2"><strong>Avantage fiscal</strong></td>
                <td className="border p-2">Cotisations déductibles BIC/BNC (loi Madelin art. 154 bis CGI)</td>
                <td className="border p-2">Part employeur charge déductible IS, part salarié déductible IR</td>
              </tr>
              <tr>
                <td className="border p-2"><strong>Plafond déduction</strong></td>
                <td className="border p-2">3,75% PASS + 7% PASS (≈ 7 200 €/an 2026)</td>
                <td className="border p-2">5% PASS + 2% rémunération (≈ 4 000 €/an 2026)</td>
              </tr>
              <tr>
                <td className="border p-2"><strong>Tarif moyen 2026</strong></td>
                <td className="border p-2">68 €/mois adulte (+18% vs salarié — pas de couverture employeur)</td>
                <td className="border p-2">58 €/mois adulte référence</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-3 text-amber-900">⚠️ Estimation indicative — pas un devis officiel</h2>
          <p className="text-sm">
            Cette estimation a une <strong>valeur indicative uniquement</strong> et n&apos;engage pas
            les organismes (Recommandation ACPR 2024-R-02). Le tarif réel peut varier ±15% selon :
            antécédents santé déclarés, garanties optionnelles (médecines douces, dentaire
            implantologie, optique premium), réseau de soins partenaire, ancienneté contrat.
            <br />
            <br />
            <strong>Pour obtenir un tarif contractuel signé</strong> : remplissez notre comparateur
            détaillé et notre cabinet ORIAS vous transmet sous 24h ouvrées 3 à 5 propositions
            officielles de nos partenaires.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Prêt à comparer 8 mutuelles ?</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 à 5 propositions
            officielles parmi nos 8 mutuelles santé partenaires. Adhésion en ligne, attestation
            mutuelle téléchargeable dans les 24h.
          </p>
          <a
            href="/outils/comparateur-mutuelle-pro"
            className="inline-block bg-white text-emerald-700 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition shadow-lg"
          >
            → Comparateur officiel mutuelle pro (2 min, ORIAS)
          </a>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur tarif mutuelle pro 2026 — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Calculateur interactif tarif mutuelle santé pro 2026. Double cible TNS Madelin + Loi ANI collective. 5 coefficients publics ACPR. 8 mutuelles comparées.",
            featureList: [
              'Calcul instantané 100% client-side (RGPD)',
              'Double mode : TNS Madelin individuel / Loi ANI collective',
              'Calcul automatique part employeur (50% Loi ANI)',
              'Barèmes 2026 réels 8 mutuelles partenaires',
              '4 niveaux garantie (socle ANI / standard / confort / premium)',
            ],
          }),
        }}
      />
      <StickyConversionBar
        ctaText="→ Comparer 8 mutuelles 24h"
        ctaUrl="/outils/comparateur-mutuelle-pro"
        trustSignal="Loi ANI calculée • TNS Madelin déductible • ORIAS"
        variant="emerald"
      />
    </main>
  )
}
