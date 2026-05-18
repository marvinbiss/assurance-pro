/**
 * Outil — Comparateur RC Pro 8 assureurs interactif
 *
 * KW Ahrefs cibles (snapshot 2026-04-29, validés kw_universe Supabase) :
 * Sous-fam famille kw-RC_pro.json (intent comparatif/courtier) :
 * - "rc pro en ligne"           → 700 vol KD 22 CPC 600€
 * - "assurance rc pro en ligne" → 800 vol KD 12 CPC 500€
 * - "comparateur rc pro"        → ~ vol moyen, intent commercial pur
 * - "courtier rc pro"           → 100+ vol CPC 700€
 * - "meilleure rc pro"          → ~ vol commercial
 * - "rc pro pas cher"           → 450 vol KD 11 CPC 500€
 * - Famille cumulée comparative : ~2 200 vol/m, ROI 1,5M
 *
 * Stratégie : capture l'intent COMPARATIF (pas encore décidé, étape avant devis).
 * Différent de /outils/devis-rc-pro (qui cible "devis" = prêt à acheter).
 * Funnel : comparateur → calculateur OU devis selon maturité.
 *
 * Conformité : ACPR 2024-R-02 (transparence comparaison intermédiaire) +
 * Reco 2025-R-01 (devoir conseil + analyse adéquation).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ComparateurRcPro } from '@/components/outils/ComparateurRcPro'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { SITE_URL } from '@/lib/seo/config'
import { headers } from 'next/headers'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils / comparateur-rc-pro'

export const metadata: Metadata = {
  title: 'Comparateur RC Pro 2026 — 8 assureurs comparés en ligne (gratuit)',
  description:
    'Comparateur RC Pro 2026 : 8 assureurs comparés (Hiscox, MMA Pro, AXA Pro, Allianz, Generali, MAIF Pro, Wakam, April). Tri par secteur + priorité (tarif, rapidité ou plafond). Recommandation cabinet ORIAS sous 24h. Gratuit, sans inscription.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Comparateur RC Pro 2026 — 8 assureurs en ligne',
    description: 'Comparez 8 assureurs RC Pro en ligne. Tri par secteur. Recommandation ORIAS 24h.',
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default async function Page() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-charcoal-900 via-primary-700 to-primary-900 py-12 text-white">
        <div className="container mx-auto max-w-5xl px-4">
          <nav aria-label="Fil d'Ariane" className="mb-4 text-sm opacity-80">
            <Link href="/" className="hover:underline">
              Accueil
            </Link>{' '}
            ›{' '}
            <Link href="/rc-pro" className="hover:underline">
              RC Pro
            </Link>{' '}
            › <span>Comparateur 8 assureurs</span>
          </nav>
          <span className="mb-4 inline-block rounded-full bg-green-500/90 px-3 py-1 text-sm font-semibold text-white">
            ✓ 8 assureurs comparés — Tri intelligent par secteur
          </span>
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl">
            Comparateur RC Pro 2026
          </h1>
          <p className="mb-6 max-w-3xl text-lg opacity-95 md:text-xl">
            Comparez en ligne <strong>8 assureurs RC Pro</strong> partenaires de notre cabinet ORIAS
            : Hiscox, MMA Pro, AXA Pro, Allianz Pro, Generali, MAIF Pro, Wakam, April Pro. Tri
            intelligent par secteur d&apos;activité + priorité (tarif compétitif ou rapidité /
            plafonds élevés). Notes attribuées sur base d&apos;expertise terrain 2024-2025.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="rounded bg-white/10 p-3">
              <strong>📊 8 assureurs</strong>
              <br />
              Comparés en détail
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🎯 Tri par secteur</strong>
              <br />
              Recommandations ciblées
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>⚖️ Transparence ACPR</strong>
              <br />
              Reco 2024-R-02 + 2025-R-01
            </div>
            <div className="rounded bg-white/10 p-3">
              <strong>🆓 Sans inscription</strong>
              <br />
              Données 100% client
            </div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-4 text-2xl font-bold">
            Sélectionnez votre profil pour le tri intelligent
          </h2>
          <p className="mb-6 text-charcoal-600">
            Le comparateur trie automatiquement les 8 assureurs selon leur{' '}
            <strong>force par secteur</strong> (un assureur fort sur un secteur monte en tête,
            faible descend) et votre <strong>priorité personnelle</strong> (tarif, rapidité ou
            plafonds élevés).
          </p>
          <ComparateurRcPro />
        </div>
      </section>

      <section className="bg-sand-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">Comment lire ce comparateur ?</h2>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div className="rounded border bg-white p-4">
              <h3 className="mb-2 font-bold">📊 Note globale /5</h3>
              <p>
                Synthèse de l&apos;expertise terrain de notre cabinet ORIAS sur 2024-2025 (1 200+
                devis émis sur 8 assureurs). Critères pondérés : tarif ou couverture, qualité
                souscription, gestion sinistres, service client, réputation marché.
              </p>
            </div>
            <div className="rounded border bg-white p-4">
              <h3 className="mb-2 font-bold">🎯 « Recommandé pour vous »</h3>
              <p>
                S&apos;affiche en vert avec mise en avant si l&apos;assureur figure dans ses «
                secteurs forts » par rapport au secteur que vous avez sélectionné. Indication la
                plus fiable pour un choix rapide.
              </p>
            </div>
            <div className="rounded border bg-white p-4">
              <h3 className="mb-2 font-bold">⚠️ « Déconseillé pour ce secteur »</h3>
              <p>
                S&apos;affiche en orange et l&apos;assureur descend en bas du classement.
                L&apos;assureur peut techniquement vous assurer mais avec des sur-primes ou des
                exclusions qui le rendent non-optimal pour ce secteur précis.
              </p>
            </div>
            <div className="rounded border bg-white p-4">
              <h3 className="mb-2 font-bold">🏷️ Badge tarif</h3>
              <p>
                <strong>Compétitif</strong> = -10 à -20% vs marché • <strong>Moyen</strong> = marché
                standard • <strong>Premium</strong> = +15 à +25% vs marché (justifié par couverture
                renforcée ou rapidité).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-2xl font-bold">
            Pourquoi un comparateur ne suffit pas (devoir conseil ACPR)
          </h2>
          <p className="mb-3 text-sm text-charcoal-700">
            La Recommandation ACPR 2025-R-01 impose à tout intermédiaire d&apos;assurance un
            <strong> devoir d&apos;analyse d&apos;adéquation</strong> (art. L. 521-2 C. assur.) qui
            va au-delà d&apos;une simple comparaison de prix :
          </p>
          <ol className="list-decimal space-y-2 pl-6 text-sm">
            <li>
              <strong>Analyse de votre activité réelle</strong> (codes NAF, géographie,
              sous-traitance)
            </li>
            <li>
              <strong>Identification des risques spécifiques</strong> (RGPD, cyber, contrats
              publics, exposition internationale)
            </li>
            <li>
              <strong>Vérification des garanties optionnelles utiles</strong> (RC exploitation,
              défense pénale, perte de licence)
            </li>
            <li>
              <strong>Cohérence des plafonds</strong> avec votre exposition financière réelle
            </li>
            <li>
              <strong>Validation des exclusions</strong> qui pourraient vous laisser découvert
            </li>
            <li>
              <strong>Comparaison des relevés d&apos;information</strong> (antécédents 5 ans)
            </li>
          </ol>
          <p className="mt-4 border-l-4 border-primary-500 bg-primary-50 p-3 text-sm">
            C&apos;est pour cette raison que notre cabinet ORIAS vous transmet sous 24h{' '}
            <strong>3 propositions personnalisées</strong> avec analyse d&apos;adéquation détaillée
            — vs un simple comparateur en ligne automatique.
          </p>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-12 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl">
            Prêt à recevoir 3 propositions personnalisées ?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg opacity-95">
            Notre cabinet ORIAS analyse votre profil et négocie sous <strong>24h ouvrées</strong>{' '}
            les 3 meilleures offres parmi nos 8 partenaires. Conseil expert + tarif optimisé.
          </p>
          <div className="flex flex-col justify-center gap-3 md:flex-row">
            <Link
              href="/outils/devis-rc-pro"
              className="inline-block rounded-lg bg-white px-6 py-3 font-bold text-primary-700 shadow-lg transition hover:bg-sand-100"
            >
              → Devis officiel RC Pro (2 min)
            </Link>
            <Link
              href="/outils/calculateur-tarif-rc-pro"
              className="inline-block rounded-lg border border-white/30 bg-primary-800 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-primary-900"
            >
              → Estimer mon tarif d&apos;abord
            </Link>
          </div>
        </div>
      </section>

      <script
        {...jsonLdScriptProps(
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Comparateur RC Pro 2026 — 8 assureurs',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              'Comparateur interactif 8 assureurs RC Pro. Tri par secteur + priorité. Conformité ACPR 2024-R-02 + 2025-R-01.',
            featureList: [
              'Comparatif 8 assureurs (Hiscox, MMA, AXA, Allianz, Generali, MAIF, Wakam, April)',
              "Tri intelligent par secteur d'activité",
              'Tri par priorité (tarif — rapidité — plafonds)',
              'Notes /5 cabinet ORIAS expertise terrain',
              'Funnel direct devis officiel ORIAS sous 24h',
            ],
          },
          nonce
        )}
      />
      <StickyConversionBar
        ctaText="→ 3 devis personnalisés 24h"
        ctaUrl="/outils/devis-rc-pro"
        trustSignal="8 assureurs analysés • Devoir conseil ACPR • ORIAS"
        variant="blue"
      />
    </main>
  )
}
