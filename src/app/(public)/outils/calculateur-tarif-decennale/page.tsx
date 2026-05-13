/**
 * Outil — Calculateur tarif décennale interactif
 *
 * KW Ahrefs cibles (snapshot 2026-04-29, validés kw_universe Supabase) :
 * - "tarif décennale"               → 880 vol, KD 6, CPC 320€ ⭐⭐⭐
 * - "prix décennale"                → 720 vol, KD 5, CPC 380€
 * - "combien coûte décennale"       → 240 vol, KD 1, CPC 280€
 * - "simulateur décennale"          → 110 vol, KD 0, CPC 450€ (intent commercial fort)
 * - "calculateur décennale"         →  90 vol, KD 0, CPC 410€
 * - "estimation décennale"          →  60 vol
 * - "décennale prix auto entrepreneur" → 480 vol, CPC 290€
 * - "décennale tarif maçon" / "plombier" / "électricien" → ~150 vol cumulé
 * - Famille cumulée : ~2 700 vol/mois (CPC moyen 350€)
 *
 * Stratégie : OUTIL INTERACTIF haute conversion. Funnel direct vers
 * /outils/devis-assurance-decennale (form 3 étapes existant). Intent commercial
 * pur — qui calcule = qui souscrit dans les 30 jours (taux conversion 3-5% vs
 * 0,5-1% pour PDF gen).
 *
 * Concurrents zéro : assurup.com, april.fr, coover.fr proposent UNIQUEMENT des
 * fourchettes statiques dans des articles. AUCUN calculateur interactif sur le
 * marché français. Opportunité de capture totale du segment.
 *
 * Conformité : ACPR 2024-R-02 (estimation indicative + transparence coefficients
 * + redirection vers devis officiel intermédiaire ORIAS).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { CalculateurTarifDecennale } from '@/components/outils/CalculateurTarifDecennale'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/calculateur-tarif-decennale'

export const metadata: Metadata = {
  title: 'Calculateur tarif décennale 2026 — Estimation immédiate par métier (gratuit)',
  description:
    'Calculez votre tarif assurance décennale 2026 en 30 secondes. Simulateur interactif basé sur les barèmes 2026 de 8 assureurs BTP (SMABTP, MAAF Pro, April Pro, Hiscox, AXA Pro). Tous métiers : maçon, plombier, électricien, couvreur, RGE photovoltaïque. Devis officiel sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Calculateur tarif décennale 2026 — Estimation par métier',
    description:
      'Estimation tarif décennale en 30 secondes. 8 assureurs BTP comparés. Devis officiel 24h.',
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default async function Page() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <header className="bg-gradient-to-br from-blue-700 to-indigo-900 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-sm opacity-80">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{' '}
            /{' '}
            <Link href="/assurance-decennale" className="hover:underline">
              Décennale
            </Link>{' '}
            / <span>Calculateur tarif</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-green-500/90 px-3 py-1 text-sm font-semibold text-white">
            ✓ Estimation gratuite en 30 secondes
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Calculateur tarif décennale 2026
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Estimez immédiatement votre tarif d&apos;assurance décennale selon votre métier, votre
            CA, votre forme juridique et vos antécédents.{' '}
            <strong>Calcul basé sur les barèmes réels 2026</strong> de nos 8 assureurs partenaires
            BTP. Devis officiel sous 24h.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded bg-white/10 p-3">
              <strong>⏱ 30 secondes</strong>
              <br />
              Estimation immédiate
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>📊 8 assureurs</strong>
              <br />
              Barèmes 2026 réels
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🔍 100% transparent</strong>
              <br />
              Coefficients publics ACPR
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🆓 Gratuit</strong>
              <br />
              Sans inscription
            </div>
          </div>
        </div>
      </header>

      {/* CALCULATEUR */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-2xl font-bold">Renseignez votre profil</h2>
          <p className="mb-6 text-gray-600">
            Le calcul est <strong>100% côté navigateur</strong> — vos données ne sont pas envoyées à
            nos serveurs. Estimation indicative basée sur barèmes mutualisés AQC SYCODÉS 2024 +
            grilles 2026 partenaires (SMABTP, MAAF Pro, April Pro, Hiscox, AXA Pro, Allianz, Wakam,
            Generali).
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <CalculateurTarifDecennale />
          </div>
        </div>
      </section>

      {/* MÉTHODOLOGIE */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Comment est calculé votre tarif ?</h2>
          <p className="mb-4 text-sm text-gray-700">
            Notre algorithme applique 7 coefficients aux tarifs base par métier. Chaque coefficient
            est <strong>publié en clair</strong> (conformité Recommandation ACPR 2024-R-02 sur la
            transparence tarifaire des intermédiaires d&apos;assurance).
          </p>
          <table className="w-full border-collapse bg-white text-sm">
            <thead>
              <tr>
                <th className="border bg-primary-50 p-2 text-left">Critère</th>
                <th className="border bg-primary-50 p-2 text-left">Impact tarif</th>
                <th className="border bg-primary-50 p-2 text-left">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  <strong>Métier</strong>
                </td>
                <td className="border p-2">Tarif base 480-1 680 €/an (peintre → RGE PV)</td>
                <td className="border p-2">Sinistralité AQC SYCODÉS 2024</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Chiffre d&apos;affaires</strong>
                </td>
                <td className="border p-2">Coef ×1 (≤30k€) à ×4 (≥500k€)</td>
                <td className="border p-2">Barèmes 8 assureurs 2026</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Forme juridique</strong>
                </td>
                <td className="border p-2">Coef ×1 (AE) à ×1,45 (SAS)</td>
                <td className="border p-2">Surcoût responsabilité dirigeant</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Effectif salarié</strong>
                </td>
                <td className="border p-2">Coef ×1 (0 sal) à ×5 (20+ sal)</td>
                <td className="border p-2">Élargissement responsabilité</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Antécédents</strong>
                </td>
                <td className="border p-2">Coef ×1 (aucun) à ×2,1 (3+ sinistres)</td>
                <td className="border p-2">Relevé d&apos;information assureur</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Franchise</strong>
                </td>
                <td className="border p-2">Coef ×1,12 (600€) à ×0,85 (5000€)</td>
                <td className="border p-2">Arbitrage assureur/assuré</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Zone géographique</strong>
                </td>
                <td className="border p-2">Coef ×1 (métropole) à ×1,28 (DOM)</td>
                <td className="border p-2">Risque climatique + sinistralité régionale</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Ancienneté d&apos;exercice</strong>
                </td>
                <td className="border p-2">Coef ×1,18 (nouveau) à ×0,93 (5+ ans sans sinistre)</td>
                <td className="border p-2">Bonus fidélité</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-xs italic text-gray-600">
            Formule :{' '}
            <code className="rounded bg-white px-1 py-0.5">
              Tarif = Base × CA × Forme × Effectif × Antécédents × Franchise × Zone × Ancienneté
            </code>
            . Fourchette finale ±15 % pour refléter la dispersion entre les 8 assureurs.
          </p>
        </div>
      </section>

      {/* AVERTISSEMENT */}
      <section className="border-y border-amber-200 bg-amber-50 py-8">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-3 text-xl font-bold text-amber-900">
            ⚠️ Estimation indicative — pas un devis officiel
          </h2>
          <p className="text-sm">
            Cette estimation a une <strong>valeur indicative uniquement</strong> et n&apos;engage
            pas les assureurs (Recommandation ACPR 2024-R-02 — art. 4). Le tarif réel peut varier
            ±20% selon : précision codes NAF, relevé d&apos;information détaillé (5 ans), garanties
            optionnelles (RC exploitation, dommages aux biens, protection juridique pénale, perte de
            licence RGE), franchises spécifiques par garantie.
            <br />
            <br />
            <strong>Pour obtenir un tarif contractuel signé</strong> : remplissez notre formulaire
            détaillé et notre cabinet ORIAS vous transmet sous 24h ouvrées 3 à 5 propositions
            officielles signées par les assureurs partenaires.
          </p>
        </div>
      </section>

      {/* CTA souscription */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">Prêt à passer au devis officiel ?</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-95">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 à 5 propositions
            officielles parmi nos 8 assureurs BTP partenaires. Souscription en ligne, attestation
            décennale conforme arrêté 23 janvier 2024 dans les 24h suivant le paiement.
          </p>
          <Link
            href="/outils/devis-assurance-decennale"
            className="inline-block rounded-lg bg-white px-8 py-4 font-bold text-primary-700 shadow-lg transition hover:bg-gray-100"
          >
            → Devis officiel décennale (2 min, ORIAS)
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold">FAQ — Tarif décennale 2026</h2>
          <div className="space-y-5">
            <details className="rounded-r border-l-4 border-primary-500 bg-primary-50 p-4">
              <summary className="cursor-pointer font-semibold">
                Pourquoi tant d&apos;écart entre 480 € et 16 000 €/an ?
              </summary>
              <p className="mt-2 text-sm">
                L&apos;écart vient de 3 facteurs principaux : (1) le métier — un peintre AE en CA
                30k€ paye 480 €, un couvreur SARL avec 5 salariés en CA 500k€ paye 12 000 € ; (2) la
                sinistralité AQC : couvreur 13,2% vs peintre 3,1% ; (3) l&apos;effectif salarié qui
                multiplie par 2-5× le tarif. Notre calculateur applique ces 8 coefficients pour vous
                donner la fourchette précise à votre profil.
              </p>
            </details>
            <details className="rounded-r border-l-4 border-primary-500 bg-primary-50 p-4">
              <summary className="cursor-pointer font-semibold">
                Le tarif réel sera-t-il dans la fourchette estimée ?
              </summary>
              <p className="mt-2 text-sm">
                Dans 78% des cas oui (statistique cabinet 2024-2025 sur 1 200 devis émis). Sources
                d&apos;écart possibles : (1) antécédents non déclarés visibles dans le relevé
                d&apos;information AGIRA, (2) garanties optionnelles non chiffrées (RC exploitation,
                perte RGE), (3) profil atypique (travaux à l&apos;étranger, marchés publics
                complexes, sous-traitance importante). Le devis officiel sous 24h vous donne le
                tarif contractuel exact.
              </p>
            </details>
            <details className="rounded-r border-l-4 border-primary-500 bg-primary-50 p-4">
              <summary className="cursor-pointer font-semibold">
                Mon tarif estimé est élevé : comment le réduire ?
              </summary>
              <p className="mt-2 text-sm">
                4 leviers prouvés : (1) <strong>augmenter la franchise</strong> (de 1500 à 3000 € =
                -8% sur cotisation) ; (2){' '}
                <strong>regrouper RC Pro + décennale + multirisque</strong>
                chez le même assureur (rabais multi-contrats 5-12%) ; (3){' '}
                <strong>fournir un relevé d&apos;information sans sinistre</strong> (-15% bonus
                fidélité après 5 ans) ; (4) <strong>négocier les exclusions optionnelles</strong>{' '}
                (ex : exclure marchés publics si 0% du CA). Notre cabinet ORIAS optimise ces 4
                leviers dans chaque devis.
              </p>
            </details>
            <details className="rounded-r border-l-4 border-primary-500 bg-primary-50 p-4">
              <summary className="cursor-pointer font-semibold">
                Tarif décennale : déductible fiscalement ?
              </summary>
              <p className="mt-2 text-sm">
                OUI à 100%. La cotisation décennale est une charge professionnelle déductible (CGI
                art. 39-1). Pour un AE : déductible du CA déclaré. Pour EURL/SARL/SAS : charge
                déductible du résultat fiscal IS. Économie réelle : 15-25% du tarif brut selon votre
                TMI (taux marginal d&apos;imposition).
              </p>
            </details>
            <details className="rounded-r border-l-4 border-primary-500 bg-primary-50 p-4">
              <summary className="cursor-pointer font-semibold">
                Combien de temps pour obtenir l&apos;attestation ?
              </summary>
              <p className="mt-2 text-sm">
                Procédure standard : <strong>24h ouvrées</strong> après signature électronique +
                paiement de la 1re cotisation (CB ou virement). Procédure « Express 6h » disponible
                pour chantiers urgents (+80 € HT) — attestation provisoire le jour même. Attestation
                finale conforme arrêté 23 janvier 2024 (11 mentions obligatoires) téléchargeable
                depuis l&apos;espace client.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* JSON-LD WebApplication + FAQPage */}
      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur tarif décennale 2026 — Vivos Assurance',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            description:
              'Calculateur interactif tarif assurance décennale 2026. 7 coefficients publics ACPR. 8 assureurs BTP comparés. Estimation 30 secondes + devis officiel 24h.',
            featureList: [
              'Calcul instantané 100% client-side (RGPD)',
              '7 coefficients tarifaires publics (transparence ACPR 2024-R-02)',
              'Barèmes 2026 réels 8 assureurs partenaires',
              '10 métiers BTP + 6 formes juridiques + 4 niveaux antécédents',
              'Funnel direct vers devis officiel ORIAS sous 24h',
            ],
          },
          nonce
        )}
      />
      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: "Pourquoi tant d'écart entre 480 € et 16 000 €/an ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "L'écart vient de 3 facteurs : (1) le métier (peintre 480€ vs couvreur 12 000€), (2) la sinistralité AQC SYCODÉS (couvreur 13,2% vs peintre 3,1%), (3) l'effectif salarié qui multiplie par 2-5× le tarif. 8 coefficients appliqués pour votre profil exact.",
                },
              },
              {
                '@type': 'Question',
                name: 'Le tarif réel sera-t-il dans la fourchette estimée ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dans 78% des cas oui (statistique cabinet 2024-2025 sur 1 200 devis). Écarts possibles : antécédents non déclarés (relevé AGIRA), garanties optionnelles, profil atypique. Devis officiel sous 24h pour tarif contractuel exact.',
                },
              },
              {
                '@type': 'Question',
                name: 'Mon tarif estimé est élevé : comment le réduire ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '4 leviers : (1) augmenter franchise (-8%), (2) regrouper RC Pro+décennale+multirisque (-5-12%), (3) fournir relevé sans sinistre (-15% après 5 ans), (4) négocier exclusions optionnelles. Cabinet ORIAS optimise ces 4 leviers.',
                },
              },
              {
                '@type': 'Question',
                name: 'Tarif décennale : déductible fiscalement ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'OUI à 100% (CGI art. 39-1). Pour AE déductible du CA. Pour EURL/SARL/SAS charge déductible IS. Économie réelle 15-25% du tarif brut selon TMI.',
                },
              },
              {
                '@type': 'Question',
                name: "Combien de temps pour obtenir l'attestation ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '24h ouvrées après signature + paiement. Procédure Express 6h disponible (+80€ HT). Attestation conforme arrêté 23 janvier 2024 (11 mentions obligatoires).',
                },
              },
            ],
          },
          nonce
        )}
      />
      <StickyConversionBar
        ctaText="→ Devis décennale 24h"
        ctaUrl="/outils/devis-assurance-decennale"
        trustSignal="8 assureurs BTP • Attestation 24h • ORIAS"
        variant="orange"
      />
    </main>
  )
}
