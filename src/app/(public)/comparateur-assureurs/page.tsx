/**
 * Page /comparateur-assureurs
 * Tableau comparatif des 10 partenaires assureurs avec critères clés
 */

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Comparateur d\'assureurs pro 2026 — 10 compagnies | Assurance Pro',
  description:
    'Comparez les 10 principaux assureurs pro français. Hiscox, April Pro, Allianz, MMA, Generali, AXA, MAAF, SMABTP, Wakam, Stello. Tarifs, garanties, spécialités.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assurance-pro.fr'}/comparateur-assureurs` },
}

interface Assureur {
  name: string
  slug: string
  description: string
  forces: string[]
  specialites: string[]
  rating: number
  acprAgrement: boolean
  csaMember: boolean
  tarif: 'eur' | 'eur_eur' | 'eur_eur_eur'
  bestFor: string
}

const ASSUREURS: Assureur[] = [
  {
    name: 'Hiscox',
    slug: 'hiscox',
    description: 'Spécialiste assurance professionnelle premium, leader sur les RC Pro métiers du conseil et de la tech.',
    forces: ['Tarifeur en ligne instantané', 'Garanties étendues (cyber inclus)', 'Excellence service sinistre'],
    specialites: ['Consultants', 'IT/Digital', 'RC Pro étendue', 'Cyber'],
    rating: 4.6,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur_eur',
    bestFor: 'Consultants, freelances, agences digitales',
  },
  {
    name: 'April Pro',
    slug: 'april-pro',
    description: 'Référence du courtage français, large catalogue multi-vertical (BTP + RC Pro + Mutuelle).',
    forces: ['Catalogue très large', 'Plateforme courtier mature', 'Tarifs compétitifs BTP'],
    specialites: ['Décennale BTP', 'RC Pro tous secteurs', 'Mutuelle TNS Madelin'],
    rating: 4.4,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur',
    bestFor: 'BTP tous métiers, courtage multi-produits',
  },
  {
    name: 'Allianz Pro',
    slug: 'allianz-pro',
    description: 'Géant assureur multi-pays, solide pour les ETI et grands comptes.',
    forces: ['Solidité financière maximale', 'Couverture internationale', 'Solutions sur-mesure ETI'],
    specialites: ['Multirisque PME/ETI', 'Flotte auto pro', 'RC Pro grandes structures'],
    rating: 4.3,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur_eur',
    bestFor: 'PME / ETI, multirisque pro',
  },
  {
    name: 'MMA Pro',
    slug: 'mma-pro',
    description: 'Mutuelle française historique, très présente en BTP et profession libérale.',
    forces: ['Réseau d\'agents physiques', 'Service de proximité', 'Tarifs maîtrisés'],
    specialites: ['Décennale artisans', 'Multirisque local pro', 'Auto-mission'],
    rating: 4.2,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur',
    bestFor: 'Artisans, professions libérales',
  },
  {
    name: 'Generali Pro',
    slug: 'generali-pro',
    description: 'Assureur premium italien, expertise en santé pro et professions médicales.',
    forces: ['Excellence santé pro', 'Plafonds élevés disponibles', 'Mutuelle TNS premium'],
    specialites: ['Mutuelle TNS Madelin', 'Prévoyance dirigeant', 'RC médicale'],
    rating: 4.4,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur_eur',
    bestFor: 'Médecins, professions libérales premium',
  },
  {
    name: 'AXA Pro',
    slug: 'axa-pro',
    description: 'Géant français, solutions complètes pour TPE/PME tous secteurs.',
    forces: ['Catalogue complet', 'Solidité maximale', 'Plateforme digitale moderne'],
    specialites: ['Multirisque pro', 'Flotte', 'Cyber pro'],
    rating: 4.3,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur_eur',
    bestFor: 'TPE/PME tous secteurs',
  },
  {
    name: 'MAAF Pro',
    slug: 'maaf-pro',
    description: 'Mutuelle d\'origine artisanale, réseau dense et tarifs accessibles.',
    forces: ['Tarifs accessibles', 'Réseau d\'agents', 'Spécialiste artisans'],
    specialites: ['RC Pro artisans', 'Multirisque commerce'],
    rating: 4.0,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur',
    bestFor: 'Artisans, petits commerces',
  },
  {
    name: 'SMABTP',
    slug: 'smabtp',
    description: 'LE spécialiste BTP. Mutuelle dédiée aux entreprises du bâtiment, leader sur la décennale.',
    forces: ['Expertise BTP exclusive', 'Décennale haut de gamme', 'Profils difficiles acceptés'],
    specialites: ['Décennale BTP toute taille', 'RC chantier', 'Garantie financière'],
    rating: 4.7,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur_eur',
    bestFor: 'BTP gros œuvre, profils complexes',
  },
  {
    name: 'Wakam',
    slug: 'wakam',
    description: 'Assurtech française innovante, spécialiste des nouveaux métiers (VTC, e-commerce, freelance).',
    forces: ['Souscription 100% digitale', 'Tarifs ajustés en temps réel', 'Spécialiste niches'],
    specialites: ['VTC / Taxi', 'E-commerce', 'Freelance'],
    rating: 4.3,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur',
    bestFor: 'VTC, freelances digitaux, e-commerce',
  },
  {
    name: 'Stello',
    slug: 'stello',
    description: 'Assurtech B2B française, expertise consultants/freelances et auto-entrepreneurs.',
    forces: ['Tarifs auto-entrepreneur attractifs', 'Pack RC Pro + Cyber + Prévoyance', 'UX moderne'],
    specialites: ['RC Pro auto-entrepreneurs', 'Cyber TPE', 'Prévoyance TNS'],
    rating: 4.5,
    acprAgrement: true,
    csaMember: true,
    tarif: 'eur_eur',
    bestFor: 'Auto-entrepreneurs, consultants, freelances',
  },
]

function tarifDisplay(tarif: Assureur['tarif']): string {
  return { eur: '€', eur_eur: '€€', eur_eur_eur: '€€€' }[tarif]
}

export default function ComparateurAssureursPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Comparateur d&apos;assureurs pro 2026
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-3xl">
            Notre cabinet ORIAS travaille avec les 10 assureurs leaders de l&apos;assurance professionnelle française.
            Comparez leurs forces, spécialités et niveau tarifaire pour choisir le partenaire adapté à votre profil.
          </p>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Assureur</th>
                  <th className="border p-3 text-left hidden md:table-cell">Spécialités</th>
                  <th className="border p-3 text-center">Note</th>
                  <th className="border p-3 text-center">Tarif</th>
                  <th className="border p-3 text-left">Idéal pour</th>
                </tr>
              </thead>
              <tbody>
                {ASSUREURS.map((a) => (
                  <tr key={a.slug} className="hover:bg-gray-50">
                    <td className="border p-3 font-semibold">{a.name}</td>
                    <td className="border p-3 hidden md:table-cell text-xs">
                      {a.specialites.map((s) => (
                        <span key={s} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded mr-1 mb-1">
                          {s}
                        </span>
                      ))}
                    </td>
                    <td className="border p-3 text-center font-semibold">
                      {a.rating} <span className="text-yellow-500">★</span>
                    </td>
                    <td className="border p-3 text-center font-semibold">{tarifDisplay(a.tarif)}</td>
                    <td className="border p-3 text-xs">{a.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {ASSUREURS.map((a) => (
              <article key={a.slug} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <header className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold">{a.name}</h2>
                  <span className="text-yellow-500 text-sm">
                    {a.rating} ★
                  </span>
                </header>
                <p className="text-gray-600 mb-4">{a.description}</p>
                <h3 className="font-semibold text-sm mb-2">Forces&nbsp;:</h3>
                <ul className="list-disc pl-5 text-sm text-gray-700 mb-4 space-y-1">
                  {a.forces.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 text-xs mb-4">
                  {a.acprAgrement ? (
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded">✓ Agrément ACPR</span>
                  ) : null}
                  {a.csaMember ? (
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded">✓ Membre CSCA</span>
                  ) : null}
                </div>
                <p className="text-sm font-semibold">Idéal pour&nbsp;: <span className="text-blue-600">{a.bestFor}</span></p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center bg-blue-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-3">Ne savez pas lequel choisir&nbsp;?</h2>
            <p className="text-gray-700 mb-6">
              Notre cabinet ORIAS interroge automatiquement les 3-5 partenaires les plus adaptés à votre profil
              et vous remet leur meilleur devis.
            </p>
            <Link
              href="/devis"
              className="inline-block px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800"
            >
              Obtenir un devis comparatif →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
