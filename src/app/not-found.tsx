import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: false },
}

const SUGGESTIONS: Array<{ href: string; label: string; desc: string }> = [
  { href: '/assurance-decennale', label: 'Assurance décennale BTP', desc: 'Loi Spinetta — 12 métiers BTP couverts' },
  { href: '/rc-pro', label: 'RC Pro', desc: 'Consultants, freelances, agences' },
  { href: '/multirisque-pro', label: 'Multirisque pro', desc: 'Locaux, biens, perte d\'exploitation' },
  { href: '/mutuelle-pro', label: 'Mutuelle TNS Madelin', desc: 'Optimisation fiscale art. 154 bis CGI' },
  { href: '/cyber-assurance', label: 'Cyber assurance', desc: 'PME, RGPD, ransomwares' },
  { href: '/comparateur-assureurs', label: 'Comparateur', desc: '10 assureurs partenaires' },
]

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider mb-3">
          Erreur 404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Cette page est introuvable</h1>
        <p className="text-gray-600 text-lg mb-10">
          Le lien que vous avez suivi est peut-être obsolète ou la page a été déplacée. Voici nos
          rubriques principales&nbsp;:
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10 text-left">
          {SUGGESTIONS.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="font-bold text-gray-900">{s.label}</div>
                <div className="text-sm text-gray-600">{s.desc}</div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col md:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
          >
            ← Retour à l&apos;accueil
          </Link>
          <Link
            href="/devis"
            className="px-5 py-2.5 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800"
          >
            Demander un devis
          </Link>
          <Link
            href="/plan-du-site"
            className="px-5 py-2.5 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
          >
            Plan du site
          </Link>
        </div>
      </div>
    </main>
  )
}
