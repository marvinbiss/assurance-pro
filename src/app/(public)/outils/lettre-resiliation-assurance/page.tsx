/**
 * Outil — Lettre de résiliation assurance pro (générateur PDF Loi Hamon)
 *
 * KW Ahrefs cibles (snapshot 2026-04-29) :
 * - "résiliation assurance professionnelle" + variantes
 * - "lettre type résiliation assurance"
 * - "loi hamon assurance pro"
 * - Famille cumulée estimée : 500-700 vol/mois (long-tail concentré)
 *
 * Stratégie : 5e outil PDF de la série utilitaires. Patterns coover/april ont des
 * pages de "modèle lettre" qui rankent bien — ici on combine le contenu éducationnel
 * (Loi Hamon) avec un générateur PDF instantané.
 *
 * Levier conversion : utilisateur en train de résilier = INTENT TRÈS FORT pour
 * souscrire un nouveau contrat ailleurs → CTA appuyé vers /outils/devis-rc-pro.
 */

import type { Metadata } from 'next'
import { LettreResiliationForm } from '@/components/outils/LettreResiliationForm'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/lettre-resiliation-assurance'

export const metadata: Metadata = {
  title: 'Lettre de résiliation assurance pro PDF — Loi Hamon 2026 | Assurance Pro',
  description:
    "Générez votre lettre de résiliation d'assurance professionnelle au format PDF en 2 minutes. Conforme Loi Hamon (art. L. 113-15-2 C. assur.) — résiliation infra-annuelle après 1 an, sans frais, sans motif. Modèle prêt à imprimer + envoyer en LRAR.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Lettre résiliation assurance pro PDF — Loi Hamon',
    description: "Lettre PDF prête à imprimer en 2 min. Conforme Loi Hamon. Sans frais, sans motif après 1 an.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <header className="bg-gradient-to-br from-rose-700 to-pink-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <a href="/guides/resiliation-assurance-professionnelle" className="hover:underline">Guide résiliation</a>{' '}/{' '}
            <span>Lettre PDF</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-green-500/90 text-white rounded-full text-sm font-semibold">
            ✓ Loi Hamon — sans frais, sans motif
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Lettre de résiliation assurance pro
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Générez votre lettre de résiliation au format PDF en 2 minutes. Conforme à la
            <strong> Loi Hamon</strong> (article L. 113-15-2 du Code des assurances) — résiliation
            infra-annuelle après 1 an d&apos;engagement, <strong>sans frais, sans motif</strong>.
            Modèle prêt à imprimer, signer et envoyer en lettre recommandée avec AR.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>📄 Format PDF</strong><br />Téléchargement direct</div>
            <div className="bg-white/10 rounded p-3"><strong>⚖️ Loi Hamon</strong><br />Art. L. 113-15-2</div>
            <div className="bg-white/10 rounded p-3"><strong>🔒 100% privé</strong><br />Aucune donnée envoyée</div>
            <div className="bg-white/10 rounded p-3"><strong>🆓 Gratuit</strong><br />Sans inscription</div>
          </div>
        </div>
      </header>

      {/* GENERATEUR */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-2">Renseignez les informations de votre contrat</h2>
          <p className="text-gray-600 mb-6">
            Le PDF est généré <strong>côté navigateur</strong> — vos données restent privées,
            <strong> aucune information n&apos;est envoyée à nos serveurs</strong>.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <LettreResiliationForm />
          </div>
        </div>
      </section>

      {/* CONDITIONS LOI HAMON */}
      <section className="py-10 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-3 text-amber-900">⚖️ Conditions Loi Hamon (art. L. 113-15-2)</h2>
          <ul className="space-y-2 text-sm">
            <li>✓ <strong>Au moins 1 an d&apos;engagement</strong> dans le contrat actuel (sinon attendre l&apos;échéance avec préavis 2 mois)</li>
            <li>✓ <strong>Sans frais</strong> de résiliation</li>
            <li>✓ <strong>Sans motif</strong> à fournir (la Loi Hamon n&apos;en exige aucun)</li>
            <li>✓ <strong>Délai d&apos;effet : 1 mois</strong> après réception par l&apos;assureur</li>
            <li>✓ <strong>Remboursement prorata temporis</strong> de la prime déjà versée</li>
            <li>📮 <strong>Lettre RECOMMANDÉE avec accusé de réception (LRAR)</strong> obligatoire</li>
          </ul>
          <p className="mt-4 text-sm">
            Cas particuliers (résiliation IMMÉDIATE possible) : cession fonds de commerce,
            cessation d&apos;activité, changement situation matérielle, augmentation tarif &gt; 10%.
            Voir notre <a href="/guides/resiliation-assurance-professionnelle" className="text-blue-600 underline">guide complet résiliation</a>.
          </p>
        </div>
      </section>

      {/* PROCÉDURE */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Procédure de résiliation en 5 étapes</h2>
          <ol className="space-y-3 text-sm">
            <li><strong>1. Souscrire le NOUVEAU contrat AVANT</strong> de résilier l&apos;ancien (éviter rupture de couverture)</li>
            <li><strong>2. Générer la lettre PDF</strong> ci-dessus avec les informations de votre contrat</li>
            <li><strong>3. Imprimer + signer + dater</strong> la lettre</li>
            <li><strong>4. Envoyer en LRAR</strong> au service résiliations de votre assureur (ou notification dans votre espace assuré avec preuve datée)</li>
            <li><strong>5. Conserver le récépissé LRAR + l&apos;accusé de réception</strong> comme preuve. Effet : 1 mois après réception.</li>
          </ol>
          <p className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3 text-sm">
            <strong>💡 Astuce :</strong> demandez à votre nouveau courtier ORIAS d&apos;effectuer la
            résiliation à votre place (mandat de résiliation). Notre cabinet le fait gratuitement
            pour ses nouveaux clients — gain de temps + zéro risque de rupture de couverture.
          </p>
        </div>
      </section>

      {/* CTA SOUSCRIPTION NOUVEAU CONTRAT */}
      <section className="py-12 bg-gradient-to-br from-rose-600 to-pink-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Vous résiliez ? Comparez avant !</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Notre cabinet ORIAS vous transmet sous <strong>24h ouvrées</strong> 3 à 5 propositions
            de nos 8 assureurs partenaires. Économies typiques <strong>15-30%</strong> vs votre
            contrat actuel. Mandat de résiliation pris en charge gratuitement.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="/outils/devis-rc-pro" className="inline-block bg-white text-rose-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Devis RC Pro (2 min)</a>
            <a href="/outils/devis-assurance-decennale" className="inline-block bg-white text-rose-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Devis décennale (2 min)</a>
            <a href="/outils/comparateur-mutuelle-pro" className="inline-block bg-white text-rose-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Comparateur mutuelle</a>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Générateur lettre de résiliation assurance pro PDF — Loi Hamon',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Générateur gratuit de lettre de résiliation d'assurance professionnelle au format PDF. Conforme Loi Hamon (art. L. 113-15-2 C. assur.).",
          }),
        }}
      />
    </main>
  )
}
