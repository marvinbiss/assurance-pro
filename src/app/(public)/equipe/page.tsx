import type { Metadata } from 'next'
import Link from 'next/link'
import { EQUIPE } from '@/lib/data/equipe'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: "L'équipe — Courtiers ORIAS Assurance Pro",
  description:
    "Découvrez l'équipe du cabinet de courtage ORIAS Assurance Pro : direction, pôles BTP, RC Pro, Santé/Prévoyance. Expertise certifiée IAS Niveau I.",
  alternates: { canonical: `${SITE_URL}/equipe` },
  openGraph: {
    title: 'L\\',
    description: 'Découvrez l\\',
    url: `${SITE_URL}/equipe`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L\\',
    description: 'Découvrez l\\',
  },
}

export default function EquipePage() {
  const membres = Object.values(EQUIPE)
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <header className="mb-10">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">Notre équipe</h1>
          <p className="max-w-3xl text-lg text-gray-700">
            Cabinet de courtage indépendant immatriculé ORIAS, organisé en pôles d&apos;expertise
            sectoriels. Tous nos courtiers sont titulaires de la capacité professionnelle{' '}
            <strong>IAS Niveau I</strong> (art. R. 512-9 C. assur.) et adhèrent à la formation
            continue annuelle ACPR (15h/an minimum).
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {membres.map((m) => (
            <li key={m.slug} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start gap-4">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                  {m.prenom.charAt(0)}
                  {m.nom.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    <Link href={`/equipe/${m.slug}`} className="text-gray-900 hover:underline">
                      {m.prenom} {m.nom}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-600">{m.poste}</p>
                </div>
              </div>
              <p className="mb-3 line-clamp-3 text-sm text-gray-700">{m.bio}</p>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {m.expertises.slice(0, 3).map((e) => (
                  <span key={e} className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
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

        <section className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h2 className="mb-3 text-xl font-bold">Nos engagements</h2>
          <ul className="grid grid-cols-1 gap-3 text-sm text-blue-900 md:grid-cols-2">
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
