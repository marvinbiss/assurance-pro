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
import { ComparateurRcPro } from '@/components/outils/ComparateurRcPro'
import { StickyConversionBar } from '@/components/cro/StickyConversionBar'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/comparateur-rc-pro'

export const metadata: Metadata = {
  title: 'Comparateur RC Pro 2026 — 8 assureurs comparés en ligne (gratuit)',
  description:
    "Comparateur RC Pro 2026 : 8 assureurs comparés (Hiscox, MMA Pro, AXA Pro, Allianz, Generali, MAIF Pro, Wakam, April). Tri par secteur + priorité (tarif/rapidité/plafond). Recommandation cabinet ORIAS sous 24h. Gratuit, sans inscription.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Comparateur RC Pro 2026 — 8 assureurs en ligne',
    description: "Comparez 8 assureurs RC Pro en ligne. Tri par secteur. Recommandation ORIAS 24h.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <a href="/rc-pro" className="hover:underline">RC Pro</a>{' '}/{' '}
            <span>Comparateur 8 assureurs</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-green-500/90 text-white rounded-full text-sm font-semibold">
            ✓ 8 assureurs comparés — Tri intelligent par secteur
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Comparateur RC Pro 2026
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Comparez en ligne <strong>8 assureurs RC Pro</strong> partenaires de notre cabinet
            ORIAS : Hiscox, MMA Pro, AXA Pro, Allianz Pro, Generali, MAIF Pro, Wakam, April Pro.
            Tri intelligent par secteur d&apos;activité + priorité (tarif compétitif / rapidité /
            plafonds élevés). Notes attribuées sur base d&apos;expertise terrain 2024-2025.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>📊 8 assureurs</strong><br />Comparés en détail</div>
            <div className="bg-white/10 rounded p-3"><strong>🎯 Tri par secteur</strong><br />Recommandations ciblées</div>
            <div className="bg-white/10 rounded p-3"><strong>⚖️ Transparence ACPR</strong><br />Reco 2024-R-02 + 2025-R-01</div>
            <div className="bg-white/10 rounded p-3"><strong>🆓 Sans inscription</strong><br />Données 100% client</div>
          </div>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-4">Sélectionnez votre profil pour le tri intelligent</h2>
          <p className="text-gray-600 mb-6">
            Le comparateur trie automatiquement les 8 assureurs selon leur <strong>force par
            secteur</strong> (un assureur fort sur un secteur monte en tête, faible descend) et
            votre <strong>priorité personnelle</strong> (tarif, rapidité ou plafonds élevés).
          </p>
          <ComparateurRcPro />
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Comment lire ce comparateur ?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded border">
              <h3 className="font-bold mb-2">📊 Note globale /5</h3>
              <p>
                Synthèse de l&apos;expertise terrain de notre cabinet ORIAS sur 2024-2025 (1 200+
                devis émis sur 8 assureurs). Critères pondérés : tarif/couverture, qualité
                souscription, gestion sinistres, service client, réputation marché.
              </p>
            </div>
            <div className="bg-white p-4 rounded border">
              <h3 className="font-bold mb-2">🎯 « Recommandé pour vous »</h3>
              <p>
                S&apos;affiche en vert avec mise en avant si l&apos;assureur figure dans ses
                « secteurs forts » par rapport au secteur que vous avez sélectionné. Indication la
                plus fiable pour un choix rapide.
              </p>
            </div>
            <div className="bg-white p-4 rounded border">
              <h3 className="font-bold mb-2">⚠️ « Déconseillé pour ce secteur »</h3>
              <p>
                S&apos;affiche en orange et l&apos;assureur descend en bas du classement.
                L&apos;assureur peut techniquement vous assurer mais avec des sur-primes ou des
                exclusions qui le rendent non-optimal pour ce secteur précis.
              </p>
            </div>
            <div className="bg-white p-4 rounded border">
              <h3 className="font-bold mb-2">🏷️ Badge tarif</h3>
              <p>
                <strong>Compétitif</strong> = -10 à -20% vs marché • <strong>Moyen</strong> =
                marché standard • <strong>Premium</strong> = +15 à +25% vs marché (justifié par
                couverture renforcée ou rapidité).
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Pourquoi un comparateur ne suffit pas (devoir conseil ACPR)</h2>
          <p className="text-sm text-gray-700 mb-3">
            La Recommandation ACPR 2025-R-01 impose à tout intermédiaire d&apos;assurance un
            <strong> devoir d&apos;analyse d&apos;adéquation</strong> (art. L. 521-2 C. assur.) qui
            va au-delà d&apos;une simple comparaison de prix :
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm">
            <li><strong>Analyse de votre activité réelle</strong> (codes NAF, géographie, sous-traitance)</li>
            <li><strong>Identification des risques spécifiques</strong> (RGPD, cyber, contrats publics, exposition internationale)</li>
            <li><strong>Vérification des garanties optionnelles utiles</strong> (RC exploitation, défense pénale, perte de licence)</li>
            <li><strong>Cohérence des plafonds</strong> avec votre exposition financière réelle</li>
            <li><strong>Validation des exclusions</strong> qui pourraient vous laisser découvert</li>
            <li><strong>Comparaison des relevés d&apos;information</strong> (antécédents 5 ans)</li>
          </ol>
          <p className="mt-4 text-sm bg-blue-50 border-l-4 border-blue-500 p-3">
            C&apos;est pour cette raison que notre cabinet ORIAS vous transmet sous 24h{' '}
            <strong>3 propositions personnalisées</strong> avec analyse d&apos;adéquation
            détaillée — vs un simple comparateur en ligne automatique.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Prêt à recevoir 3 propositions personnalisées ?</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Notre cabinet ORIAS analyse votre profil et négocie sous <strong>24h ouvrées</strong>{' '}
            les 3 meilleures offres parmi nos 8 partenaires. Conseil expert + tarif optimisé.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="/outils/devis-rc-pro" className="inline-block bg-white text-blue-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Devis officiel RC Pro (2 min)</a>
            <a href="/outils/calculateur-tarif-rc-pro" className="inline-block bg-blue-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-900 transition shadow-lg border border-white/30">→ Estimer mon tarif d&apos;abord</a>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Comparateur RC Pro 2026 — 8 assureurs',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Comparateur interactif 8 assureurs RC Pro. Tri par secteur + priorité. Conformité ACPR 2024-R-02 + 2025-R-01.",
            featureList: [
              'Comparatif 8 assureurs (Hiscox, MMA, AXA, Allianz, Generali, MAIF, Wakam, April)',
              'Tri intelligent par secteur d\'activité',
              'Tri par priorité (tarif / rapidité / plafonds)',
              'Notes /5 cabinet ORIAS expertise terrain',
              'Funnel direct devis officiel ORIAS sous 24h',
            ],
          }),
        }}
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
