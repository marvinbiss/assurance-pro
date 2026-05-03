import type { Metadata } from 'next'
import Link from 'next/link'
import { EQUIPE } from '@/lib/data/equipe'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'L\'équipe — Courtiers ORIAS Assurance Pro',
  description: 'Découvrez l\'équipe du cabinet de courtage ORIAS Assurance Pro : direction, pôles BTP, RC Pro, Santé/Prévoyance. Expertise certifiée IAS Niveau I.',
  alternates: { canonical: `${SITE_URL}/equipe` },
}

export default function EquipePage() {
  const membres = Object.values(EQUIPE)
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Notre équipe</h1>
          <p className="text-gray-700 text-lg max-w-3xl">
            Cabinet de courtage indépendant immatriculé ORIAS, organisé en pôles d&apos;expertise
            sectoriels. Tous nos courtiers sont titulaires de la capacité professionnelle{' '}
            <strong>IAS Niveau I</strong> (art. R. 512-9 C. assur.) et adhèrent à la formation
            continue annuelle ACPR (15h/an minimum).
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {membres.map((m) => (
            <li
              key={m.slug}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
                  {m.prenom.charAt(0)}
                  {m.nom.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    <Link
                      href={`/equipe/${m.slug}`}
                      className="text-gray-900 hover:underline"
                    >
                      {m.prenom} {m.nom}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-600">{m.poste}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">{m.bio}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {m.expertises.slice(0, 3).map((e) => (
                  <span
                    key={e}
                    className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded"
                  >
                    {e}
                  </span>
                ))}
              </div>
              <Link
                href={`/equipe/${m.slug}`}
                className="text-sm font-semibold text-blue-700 hover:underline"
              >
                Voir le profil →
              </Link>
            </li>
          ))}
        </ul>

        <section className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-3">Nos engagements</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-900">
            <li>✓ Indépendance capitalistique totale (aucune participation d&apos;assureur)</li>
            <li>✓ Analyse impartiale d&apos;un nombre suffisant de contrats (art. L. 521-4 II)</li>
            <li>✓ Recommandation écrite motivée pour chaque souscription</li>
            <li>✓ Aucun frais de courtage facturé au client</li>
            <li>✓ Réclamations traitées sous 10j / réponse fond sous 2 mois (ACPR 2024-R-02)</li>
            <li>✓ Adhésion CSCA et formation continue annuelle</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
