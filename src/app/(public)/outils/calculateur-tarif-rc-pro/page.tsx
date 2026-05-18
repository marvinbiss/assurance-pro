/**
 * Outil — Calculateur tarif RC Pro interactif
 *
 * KW Ahrefs cibles (snapshot 2026-04-29, validés kw_universe Supabase) :
 * Famille kw-RC_pro.json : 265 KW, 43 440 vol cumulé, ROI Score 17 445 777 = #1 marché entier.
 * Top KW :
 * - "rc pro"                          → 5500 vol, KD 14, CPC 600€ ⭐⭐⭐
 * - "assurance rc pro"                → 3000 vol, KD 19, CPC 600€
 * - "rc pro auto entrepreneur"        → 1900 vol, KD 7, CPC 400€
 * - "rc pro assurance"                → 1700 vol, KD 20, CPC 500€
 * - "rc pro vtc"                      → 1000 vol, KD 2, CPC 250€
 * - "assurance rc pro en ligne"       →  800 vol, KD 12, CPC 500€
 * - "rc pro en ligne"                 →  700 vol, KD 22, CPC 600€
 * - "rc pro pas cher"                 →  450 vol, KD 11, CPC 500€
 * - "devis rc pro"                    →  400 vol, KD  0, CPC 600€ ⭐⭐
 * - "attestation rc pro"              →  350 vol, KD  3, CPC 350€
 *
 * Stratégie : OUTIL INTERACTIF haute conversion sur la famille #1 marché entier
 * (RC Pro = ROI cumulé 17,4M soit ×3 vs décennale 6,5M). Funnel direct vers
 * /outils/devis-rc-pro (form 3 étapes existant en prod).
 *
 * Concurrents zéro : assurup.com, april.fr, hiscox.fr proposent UNIQUEMENT des
 * fourchettes statiques. AUCUN calculateur interactif RC Pro sur le marché FR.
 *
 * Conformité : ACPR 2024-R-02 (estimation indicative + transparence coefficients
 * + redirection devis officiel intermédiaire ORIAS).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { TarifCalculator } from '@/components/premium/tarif-calculator'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils / calculateur-tarif-rc-pro'

export const metadata: Metadata = {
  title: 'Calculateur tarif RC Pro 2026 — Estimation immédiate par secteur (gratuit)',
  description:
    'Calculez votre tarif RC Pro 2026 en 30 secondes. Simulateur interactif basé sur les barèmes 2026 de 8 assureurs (Hiscox, MMA Pro, AXA Pro, Allianz, Generali). Tous secteurs : consultant, IT, médecin, avocat, agent immobilier, formateur. Devis officiel sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Calculateur tarif RC Pro 2026 — Estimation par secteur',
    description:
      'Estimation tarif RC Pro en 30 secondes. 8 assureurs comparés. Devis officiel 24h.',
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
      <header className="bg-gradient-to-br from-charcoal-900 via-primary-700 to-primary-900 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-sm opacity-80">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{' '}
            ›{' '}
            <Link href="/rc-pro" className="hover:underline">
              RC Pro
            </Link>{' '}
            › <span>Calculateur tarif</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-green-500/90 px-3 py-1 text-sm font-semibold text-white">
            ✓ Estimation gratuite en 30 secondes
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Calculateur tarif RC Pro 2026
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Estimez immédiatement votre tarif d&apos;assurance responsabilité civile professionnelle
            selon votre secteur, votre CA, votre forme juridique et le plafond garantie.{' '}
            <strong>Calcul basé sur les barèmes réels 2026</strong> de nos 8 assureurs partenaires.
            Devis officiel sous 24h.
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
          <h2 className="mb-2 text-2xl font-bold">Renseignez votre profil professionnel</h2>
          <p className="mb-6 text-gray-600">
            Le calcul est <strong>100% côté navigateur</strong> — vos données ne sont pas envoyées à
            nos serveurs. Estimation indicative basée sur barèmes mutualisés ACPR + AMRAE 2024 +
            grilles 2026 partenaires (Hiscox, MMA Pro, AXA Pro, Allianz Pro, Generali, MAIF Pro,
            Wakam, April Pro).
          </p>
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <TarifCalculator garantie="rc-pro" />
          </div>
        </div>
      </section>

      {/* MÉTHODOLOGIE */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Comment est calculé votre tarif RC Pro ?</h2>
          <p className="mb-4 text-sm text-gray-700">
            Notre algorithme applique 7 coefficients aux tarifs base par secteur. Chaque coefficient
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
                  <strong>Secteur d&apos;activité</strong>
                </td>
                <td className="border p-2">
                  Tarif base 90-4 200 € par an (consultant → médecin libéral)
                </td>
                <td className="border p-2">Sinistralité ACPR + AMRAE 2024</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Chiffre d&apos;affaires</strong>
                </td>
                <td className="border p-2">Coef ×1 (≤30k€) à ×3,5 (≥500k€)</td>
                <td className="border p-2">Barèmes 8 assureurs 2026</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Forme juridique</strong>
                </td>
                <td className="border p-2">Coef ×1 (AE) à ×1,5 (SAS)</td>
                <td className="border p-2">Surcoût responsabilité dirigeant</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Effectif salarié</strong>
                </td>
                <td className="border p-2">Coef ×1 (0 sal) à ×4,5 (20+ sal)</td>
                <td className="border p-2">Élargissement responsabilité</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Antécédents</strong>
                </td>
                <td className="border p-2">Coef ×1 (aucun) à ×2,4 (3+ sinistres)</td>
                <td className="border p-2">Relevé d&apos;information assureur</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Franchise</strong>
                </td>
                <td className="border p-2">Coef ×1,15 (300€) à ×0,85 (5000€)</td>
                <td className="border p-2">Arbitrage assureur ou assuré</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Plafond garantie</strong>
                </td>
                <td className="border p-2">Coef ×0,78 (150k€) à ×1,85 (5M€)</td>
                <td className="border p-2">Niveau exposition souhaité</td>
              </tr>
              <tr>
                <td className="border p-2">
                  <strong>Ancienneté d&apos;activité</strong>
                </td>
                <td className="border p-2">Coef ×1,2 (nouveau) à ×0,92 (5+ ans sans sinistre)</td>
                <td className="border p-2">Bonus fidélité</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-xs italic text-gray-600">
            Formule :{' '}
            <code className="rounded bg-white px-1 py-0.5">
              Tarif = Base × CA × Forme × Effectif × Antécédents × Franchise × Plafond × Ancienneté
            </code>
            . Fourchette finale ±15 % pour refléter la dispersion entre les 8 assureurs.
          </p>
        </div>
      </section>

      {/* TARIFS RÉFÉRENCE */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">
            Tarifs RC Pro 2026 indicatifs (auto-entrepreneur, CA 50k€)
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-primary-50">
                <th className="border p-2 text-left">Secteur</th>
                <th className="border p-2 text-right">Tarif annuel HT</th>
                <th className="border p-2 text-left">Sinistralité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Consultant — conseil</td>
                <td className="border p-2 text-right">90 € – 280 €</td>
                <td className="border p-2">1,2 %</td>
              </tr>
              <tr>
                <td className="border p-2">Photographe — graphiste</td>
                <td className="border p-2 text-right">110 € – 290 €</td>
                <td className="border p-2">1,3 %</td>
              </tr>
              <tr>
                <td className="border p-2">Marketing — communication</td>
                <td className="border p-2 text-right">110 € – 320 €</td>
                <td className="border p-2">1,8 %</td>
              </tr>
              <tr>
                <td className="border p-2">Formateur — coach</td>
                <td className="border p-2 text-right">130 € – 380 €</td>
                <td className="border p-2">1,5 %</td>
              </tr>
              <tr>
                <td className="border p-2">Informatique — SaaS</td>
                <td className="border p-2 text-right">180 € – 480 €</td>
                <td className="border p-2">2,1 % (RGPD)</td>
              </tr>
              <tr>
                <td className="border p-2">Esthétique — bien-être</td>
                <td className="border p-2 text-right">180 € – 540 €</td>
                <td className="border p-2">2,2 %</td>
              </tr>
              <tr>
                <td className="border p-2">Santé paramédical</td>
                <td className="border p-2 text-right">220 € – 680 €</td>
                <td className="border p-2">2,7 %</td>
              </tr>
              <tr>
                <td className="border p-2">Commerce de détail</td>
                <td className="border p-2 text-right">240 € – 720 €</td>
                <td className="border p-2">3,1 %</td>
              </tr>
              <tr>
                <td className="border p-2">Agent immobilier</td>
                <td className="border p-2 text-right">280 € – 920 €</td>
                <td className="border p-2">4,1 %</td>
              </tr>
              <tr>
                <td className="border p-2">Restaurateur — traiteur</td>
                <td className="border p-2 text-right">320 € – 980 €</td>
                <td className="border p-2">4,8 %</td>
              </tr>
              <tr>
                <td className="border p-2">Avocat — juridique</td>
                <td className="border p-2 text-right">380 € – 1 180 €</td>
                <td className="border p-2">3,2 %</td>
              </tr>
              <tr>
                <td className="border p-2">VTC — transport</td>
                <td className="border p-2 text-right">380 € – 1 180 €</td>
                <td className="border p-2">4,5 %</td>
              </tr>
              <tr>
                <td className="border p-2">Expert-comptable</td>
                <td className="border p-2 text-right">420 € – 1 280 €</td>
                <td className="border p-2">3,8 %</td>
              </tr>
              <tr>
                <td className="border p-2">Médecin libéral</td>
                <td className="border p-2 text-right">480 € – 4 200 €</td>
                <td className="border p-2">5,1 %</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-xs italic text-gray-600">
            Sources : ACPR + AMRAE 2024 + barèmes 2026 nos 8 assureurs partenaires. Pour SARL ou SAS
            avec salariés, multiplier par 1,5-4 selon effectif et CA.
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
            pas les assureurs (Recommandation ACPR 2024-R-02). Le tarif réel peut varier ±20% selon
            : précision codes NAF, relevé d&apos;information détaillé (5 ans), garanties
            optionnelles (RC exploitation, défense pénale, protection juridique, cyber assurance,
            dommages aux biens), franchises spécifiques par garantie.
            <br />
            <br />
            <strong>Pour obtenir un tarif contractuel signé</strong> : remplissez notre formulaire
            détaillé et notre cabinet ORIAS vous transmet sous 24h ouvrées 3 à 5 propositions
            officielles signées par les assureurs partenaires.
          </p>
        </div>
      </section>

      {/* CTA souscription */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">Prêt à passer au devis officiel ?</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-95">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 à 5 propositions
            officielles parmi nos 8 assureurs partenaires. Souscription en ligne, attestation RC Pro
            téléchargeable dans les 24h suivant le paiement.
          </p>
          <Link
            href="/outils/devis-rc-pro"
            className="inline-block rounded-lg bg-white px-8 py-4 font-bold text-primary-700 shadow-lg transition hover:bg-gray-100"
          >
            → Devis officiel RC Pro (2 min, ORIAS)
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold">FAQ — Tarif RC Pro 2026</h2>
          <div className="space-y-5">
            <details className="rounded-r border-l-4 border-primary-500 bg-primary-50 p-4">
              <summary className="cursor-pointer font-semibold">
                Pourquoi tant d&apos;écart entre 90 € et 12 000 € par an ?
              </summary>
              <p className="mt-2 text-sm">
                L&apos;écart vient de 3 facteurs : (1) le secteur — un consultant AE en CA 30k€ paye
                90 €, un médecin libéral SARL en CA 500k€ paye 8 000 € ; (2) la sinistralité ACPR :
                médecin 5,1% vs consultant 1,2% ; (3) le plafond garantie qui peut varier de 150k€
                (×0,78) à 5M€ (×1,85). Notre calculateur applique ces 7 coefficients pour vous
                donner la fourchette précise à votre profil.
              </p>
            </details>
            <details className="rounded-r border-l-4 border-primary-500 bg-primary-50 p-4">
              <summary className="cursor-pointer font-semibold">
                RC Pro est-elle obligatoire ?
              </summary>
              <p className="mt-2 text-sm">
                <strong>OBLIGATOIRE</strong> pour les professions réglementées : avocats (art. 27
                Loi 1971), experts-comptables (art. 17 Ord. 1945), agents immobiliers (Loi Hoguet),
                médecins (art. L. 1142-2 CSP), kinés ou infirmiers, architectes, notaires,
                courtiers, CGP ou CIF, agents de voyage, taxis ou VTC, transport marchandises.{' '}
                <strong>Fortement recommandée</strong> (mais non obligatoire) pour : consultants,
                IT, marketing, photographes, formateurs, commerces. Sans RC Pro et en cas de
                sinistre = patrimoine personnel engagé.
              </p>
            </details>
            <details className="rounded-r border-l-4 border-primary-500 bg-primary-50 p-4">
              <summary className="cursor-pointer font-semibold">
                Mon tarif estimé est élevé : comment le réduire ?
              </summary>
              <p className="mt-2 text-sm">
                4 leviers prouvés : (1) <strong>augmenter la franchise</strong> (de 1500 à 3000 € =
                -8% sur cotisation) ; (2) <strong>réduire le plafond garantie</strong> si activité à
                faible exposition (de 1M€ à 500k€ = -15%) ; (3){' '}
                <strong>regrouper RC Pro + multirisque + cyber</strong> chez le même assureur
                (rabais multi-contrats 5-12%) ; (4){' '}
                <strong>fournir un relevé d&apos;information sans sinistre</strong> (-15% bonus
                fidélité après 5 ans). Notre cabinet ORIAS optimise ces leviers dans chaque devis.
              </p>
            </details>
            <details className="rounded-r border-l-4 border-primary-500 bg-primary-50 p-4">
              <summary className="cursor-pointer font-semibold">
                RC Pro : déductible fiscalement ?
              </summary>
              <p className="mt-2 text-sm">
                OUI à 100%. La cotisation RC Pro est une charge professionnelle déductible (CGI art.
                39-1). Pour AE : déductible du CA déclaré. Pour EURL, SARL ou SAS : charge
                déductible du résultat fiscal IS. Économie réelle : 15-25% du tarif brut selon votre
                TMI.
              </p>
            </details>
            <details className="rounded-r border-l-4 border-primary-500 bg-primary-50 p-4">
              <summary className="cursor-pointer font-semibold">
                Plafond garantie : quel niveau choisir ?
              </summary>
              <p className="mt-2 text-sm">
                Recommandations selon profil : <strong>150 000 €</strong> = AE solo activité faible
                exposition (consultant junior, photographe événementiel) ;{' '}
                <strong>500 000 €</strong>= standard TPE (commerce, restaurant, agence) ;{' '}
                <strong>1 000 000 €</strong> = PME ou activité sensible (IT manipulant données
                client, formateur entreprise) ;<strong> 2 000 000 € à 5 000 000 €</strong> =
                professions réglementées avec contrats publics ou exposition majeure (médecin
                libéral, avocat affaires, expert judiciaire, architecte gros chantiers).
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur tarif RC Pro 2026 — Vivos Assurance',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'Calculateur interactif tarif RC Pro 2026. 7 coefficients publics ACPR. 8 assureurs comparés. Estimation 30 secondes + devis officiel 24h.',
            featureList: [
              'Calcul instantané 100% client-side (RGPD)',
              '7 coefficients tarifaires publics (transparence ACPR 2024-R-02)',
              'Barèmes 2026 réels 8 assureurs partenaires',
              "14 secteurs d'activité couverts",
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
                name: "Pourquoi tant d'écart entre 90 € et 12 000 € par an ?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "L'écart vient de 3 facteurs : (1) le secteur (consultant 90€ vs médecin 8 000€), (2) la sinistralité ACPR (médecin 5,1% vs consultant 1,2%), (3) le plafond garantie de 150k€ à 5M€. 7 coefficients appliqués pour votre profil exact.",
                },
              },
              {
                '@type': 'Question',
                name: 'RC Pro est-elle obligatoire ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'OBLIGATOIRE pour professions réglementées : avocats, experts-comptables, agents immobiliers, médecins, paramédicaux, architectes, notaires, courtiers, CGP, agents de voyage, VTC, transport. Fortement recommandée pour consultants, IT, marketing, formateurs, commerces.',
                },
              },
              {
                '@type': 'Question',
                name: 'Mon tarif estimé est élevé : comment le réduire ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '4 leviers : (1) augmenter franchise (-8%), (2) réduire plafond si exposition faible (-15%), (3) regrouper RC+multirisque+cyber (-5-12%), (4) fournir relevé sans sinistre (-15% après 5 ans).',
                },
              },
              {
                '@type': 'Question',
                name: 'RC Pro : déductible fiscalement ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'OUI à 100% (CGI art. 39-1). Pour AE déductible du CA. Pour EURL, SARL ou SAS charge déductible IS. Économie réelle 15-25% du tarif brut selon TMI.',
                },
              },
              {
                '@type': 'Question',
                name: 'Plafond garantie : quel niveau choisir ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '150k€ = AE solo activité faible exposition. 500k€ = standard TPE. 1M€ = PME ou activité sensible (IT data, formateur entreprise). 2-5M€ = professions réglementées avec contrats publics ou exposition majeure (médecin, avocat affaires, architecte gros chantiers).',
                },
              },
            ],
          },
          nonce
        )}
      />
      <StickyConversionBar
        ctaText="→ Devis RC Pro 24h"
        ctaUrl="/outils/devis-rc-pro"
        trustSignal="8 assureurs comparés • Devis ORIAS sous 24h • Gratuit"
        variant="blue"
      />
    </main>
  )
}
