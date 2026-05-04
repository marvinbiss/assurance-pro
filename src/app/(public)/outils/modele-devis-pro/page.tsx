/**
 * Outil — Modèle devis pro (générateur PDF gratuit)
 *
 * Concurrent benchmark : coover.fr/outils/modele-devis = 6 276 vis/mois (#2 marché)
 * (vs modele-facture coover #1 à 14 792 vis/m)
 *
 * KW Ahrefs cibles : famille "modèle devis" / "devis auto-entrepreneur" / "devis BTP"
 *
 * Stratégie : 4e outil PDF de la série utilitaires. Conformité art. L. 111-1 C. conso
 * (devis gratuit obligatoire) + art. L. 441-3 C. com. + arrêté 27/03/2017 secteur BTP.
 * Inclut zone signature client + mention "Bon pour accord" + assurance pro.
 */

import type { Metadata } from 'next'
import { DevisForm } from '@/components/outils/DevisForm'
import { SITE_URL } from '@/lib/seo/config'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

const SLUG = 'outils/modele-devis-pro'

export const metadata: Metadata = {
  title: 'Modèle devis pro PDF — Générateur gratuit auto-entrepreneur 2026 | Assurance Pro',
  description:
    "Générez vos devis professionnels au format PDF en 2 minutes. Conforme art. L. 111-1 C. conso + arrêté 27/03/2017 BTP. Auto-entrepreneur, EI, EURL, SARL, SASU. Inclut zone signature « Bon pour accord » et mention assurance pro. Téléchargement immédiat, gratuit.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: 'Modèle devis pro PDF — Générateur gratuit 2026',
    description: "Devis pro PDF en 2 minutes. Conforme art. L. 111-1 C. conso. Auto-entrepreneur + entreprises.",
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <header className="bg-gradient-to-br from-teal-700 to-cyan-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav aria-label="Fil d'Ariane" className="text-sm opacity-80 mb-4">
            <a href="/" className="hover:underline">Accueil</a>{' '}/{' '}
            <span>Modèle devis pro PDF</span>
          </nav>
          <span className="inline-block mb-4 px-3 py-1 bg-green-500/90 text-white rounded-full text-sm font-semibold">
            ✓ 100% gratuit, sans inscription, sans limite
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Modèle devis pro PDF
          </h1>
          <p className="text-lg md:text-xl opacity-95 mb-6 max-w-3xl">
            Générez vos devis professionnels au format PDF en 2 minutes. Conforme à
            l&apos;<strong>article L. 111-1 du Code de la consommation</strong> (devis gratuit
            obligatoire) et à l&apos;<strong>arrêté du 27 mars 2017</strong> (secteur BTP).
            Auto-entrepreneur, EI, EURL, SARL, SASU. Inclut zone signature « Bon pour accord ».
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded p-3"><strong>📄 Format PDF</strong><br />Téléchargement direct</div>
            <div className="bg-white/10 rounded p-3"><strong>✍️ Bon pour accord</strong><br />Zone signature</div>
            <div className="bg-white/10 rounded p-3"><strong>🔒 100% privé</strong><br />Aucune donnée envoyée</div>
            <div className="bg-white/10 rounded p-3"><strong>🆓 Sans inscription</strong><br />Sans limite</div>
          </div>
        </div>
      </header>

      {/* GENERATEUR */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-2">Renseignez votre devis</h2>
          <p className="text-gray-600 mb-6">
            Le PDF est généré <strong>côté navigateur</strong> — vos données restent privées,
            <strong> aucune information n&apos;est envoyée à nos serveurs</strong>.
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <DevisForm />
          </div>
        </div>
      </section>

      {/* MENTIONS OBLIGATOIRES */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-4">Mentions obligatoires sur un devis pro 2026</h2>
          <p className="text-sm text-gray-700 mb-4">
            Imposées par l&apos;<strong>article L. 111-1 du Code de la consommation</strong>,
            l&apos;art. L. 441-3 C. com. et l&apos;arrêté du 27 mars 2017 (devis BTP &gt; 150 €).
            Sanctions absence : amende administrative (art. L. 131-3 C. conso).
          </p>
          <ol className="list-decimal pl-6 space-y-1 text-sm">
            <li><strong>Mention « Devis » + numéro</strong> unique et chronologique</li>
            <li><strong>Date d&apos;émission</strong> + <strong>date de validité</strong> (typiquement 30-90 jours)</li>
            <li><strong>Mention « Devis gratuit »</strong> (art. L. 111-1 C. conso)</li>
            <li><strong>Identité émetteur</strong> : raison sociale, forme juridique, adresse, SIRET, n° TVA</li>
            <li><strong>Identité client</strong> : raison sociale, adresse, SIRET (si B2B)</li>
            <li><strong>Désignation détaillée</strong> des produits/services + quantités + prix unitaires HT</li>
            <li><strong>Total HT + TVA + TTC</strong> avec taux applicable</li>
            <li><strong>Conditions d&apos;exécution</strong> : durée prévisionnelle, modalités, garanties</li>
            <li><strong>Conditions de règlement</strong> : acompte, échelonnement, mode</li>
            <li><strong>Zone signature client</strong> + mention manuscrite « Bon pour accord »</li>
            <li><strong>Mention assurance pro</strong> (BTP, santé, transport, conseil financier — décret 2024)</li>
          </ol>
        </div>
      </section>

      {/* DIFFÉRENCE DEVIS / FACTURE */}
      <section className="py-10 bg-white border-t">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-4">Devis vs facture : quelles différences ?</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Critère</th>
                <th className="border p-2 text-left">Devis</th>
                <th className="border p-2 text-left">Facture</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border p-2"><strong>Statut juridique</strong></td><td className="border p-2">Pré-contractuel (proposition)</td><td className="border p-2">Contractuel (créance)</td></tr>
              <tr><td className="border p-2"><strong>Validité</strong></td><td className="border p-2">Limitée (30-90 jours)</td><td className="border p-2">Illimitée</td></tr>
              <tr><td className="border p-2"><strong>Acceptation</strong></td><td className="border p-2">« Bon pour accord » + signature client</td><td className="border p-2">Pas d&apos;acceptation requise</td></tr>
              <tr><td className="border p-2"><strong>Pénalités retard</strong></td><td className="border p-2">Non applicables</td><td className="border p-2">Obligatoires (taux BCE +10pts)</td></tr>
              <tr><td className="border p-2"><strong>TVA</strong></td><td className="border p-2">Indicative</td><td className="border p-2">Définitive (collectée)</td></tr>
            </tbody>
          </table>
          <p className="mt-3 text-sm">
            Une fois votre devis SIGNÉ par le client, vous pouvez générer la facture correspondante :
            <a href="/outils/modele-facture-pro" className="text-blue-600 underline ml-1">
              générateur facture pro PDF →
            </a>
          </p>
        </div>
      </section>

      {/* CTA assurance pro */}
      <section className="py-12 bg-gradient-to-br from-teal-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Mention assurance pro obligatoire ?</h2>
          <p className="text-lg opacity-95 mb-6 max-w-2xl mx-auto">
            Pour les artisans BTP (Loi Spinetta) + professions de santé + conseil financier,
            la mention de l&apos;assurance pro est OBLIGATOIRE sur le devis (décret 2024).
            Notre cabinet ORIAS vous transmet sous 24h 3 à 5 propositions adaptées.
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <a href="/outils/devis-rc-pro" className="inline-block bg-white text-teal-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Devis RC Pro (2 min)</a>
            <a href="/outils/devis-assurance-decennale" className="inline-block bg-white text-teal-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg">→ Devis décennale (2 min)</a>
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
            name: 'Générateur modèle devis pro PDF — Assurance Pro',
            url: `${SITE_URL}/${SLUG}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            description:
              "Générateur gratuit de modèle de devis pro au format PDF. Conforme art. L. 111-1 C. conso + arrêté 27/03/2017 BTP. Zone signature « Bon pour accord » incluse.",
          }),
        }}
      />
    </main>
  )
}
