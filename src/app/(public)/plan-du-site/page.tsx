import type { Metadata } from 'next'
import Link from 'next/link'
import { Map } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { SITE_URL } from '@/lib/seo/config'
import { DECENNALE_METIERS } from '@/lib/data/decennale-metiers'
import { RC_PRO_PROFESSIONS } from '@/lib/data/rc-pro-professions'

export const metadata: Metadata = {
  title: 'Plan du site',
  description:
    'Plan du site Vivos Assurance — toutes les pages organisées par catégorie : verticaux, métiers, ressources, légal.',
  alternates: { canonical: `${SITE_URL}/plan-du-site` },
  openGraph: {
    title: 'Plan du site',
    description:
      'Plan du site Vivos Assurance — toutes les pages organisées par catégorie : verticaux, métiers, ressources, légal.',
    url: `${SITE_URL}/plan-du-site`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plan du site',
    description:
      'Plan du site Vivos Assurance — toutes les pages organisées par catégorie : verticaux, métiers, ressources, légal.',
  },
}

export default function PlanDuSitePage() {
  return (
    <main className="min-h-screen bg-sand-50">
      <PageHero
        breadcrumbs={[{ label: 'Plan du site' }]}
        eyebrow="Navigation complète"
        EyebrowIcon={Map}
        title="Plan du site"
        description="Toutes les pages du site organisées par catégorie."
        size="sm"
      />

      <div className="container mx-auto max-w-4xl px-4 py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <section>
            <h2 className="mb-3 border-b pb-2 text-xl font-bold">Pages principales</h2>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/devis"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Devis gratuit en 2 min
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  À propos du cabinet
                </Link>
              </li>
              <li>
                <Link
                  href="/comparateur-assureurs"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Comparateur des 10 assureurs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Nous contacter
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 border-b pb-2 text-xl font-bold">Garanties (Piliers)</h2>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/assurance-decennale"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Assurance décennale BTP
                </Link>
              </li>
              <li>
                <Link
                  href="/rc-pro"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  RC Pro générique
                </Link>
              </li>
              <li>
                <Link
                  href="/multirisque-pro"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Multirisque professionnelle
                </Link>
              </li>
              <li>
                <Link
                  href="/mutuelle-pro"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Mutuelle pro / TNS Madelin
                </Link>
              </li>
              <li>
                <Link
                  href="/assurance-vtc"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Assurance VTC / Taxi
                </Link>
              </li>
              <li>
                <Link
                  href="/cyber-assurance"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Cyber assurance
                </Link>
              </li>
              <li>
                <Link
                  href="/rc-pro-avocat"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  RC Pro Avocat
                </Link>
              </li>
              <li>
                <Link
                  href="/rc-pro-medecin"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  RC Pro Médecin
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 border-b pb-2 text-xl font-bold">Décennale × Métiers BTP</h2>
            <ul className="columns-2 space-y-1.5">
              {Object.values(DECENNALE_METIERS).map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/assurance-decennale/${m.slug}`}
                    className="text-sm font-semibold text-primary-700 underline-offset-2 hover:underline"
                  >
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 border-b pb-2 text-xl font-bold">RC Pro × Professions</h2>
            <ul className="columns-2 space-y-1.5">
              {Object.values(RC_PRO_PROFESSIONS).map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/rc-pro/${p.slug}`}
                    className="text-sm font-semibold text-primary-700 underline-offset-2 hover:underline"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-3 border-b pb-2 text-xl font-bold">Ressources</h2>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/blog"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/glossaire"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Glossaire (40+ termes)
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  FAQ assurance pro
                </Link>
              </li>
              <li>
                <Link
                  href="/normes"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Normes et conformité
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 border-b pb-2 text-xl font-bold">Mentions légales</h2>
            <ul className="space-y-1.5">
              <li>
                <Link
                  href="/mentions-legales"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/cgv"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Conditions Générales de Service
                </Link>
              </li>
              <li>
                <Link
                  href="/fic"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  FIC — Fiche d&apos;Information Précontractuelle
                </Link>
              </li>
              <li>
                <Link
                  href="/ipid"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  IPID — Fiches produit standardisées
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Politique de confidentialité (RGPD)
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Politique cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/reclamation"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Déposer une réclamation
                </Link>
              </li>
              <li>
                <Link
                  href="/mediation"
                  className="font-semibold text-primary-700 underline-offset-2 hover:underline"
                >
                  Médiation
                </Link>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 rounded-lg bg-gray-50 p-6 text-sm text-gray-600">
          <p>
            <strong>Sitemap XML :</strong>{' '}
            <Link href="/sitemap.xml" className="font-semibold text-primary-700 underline">
              sitemap.xml
            </Link>{' '}
            (pour les moteurs de recherche)
          </p>
          <p className="mt-2">
            <strong>Robots :</strong>{' '}
            <Link href="/robots.txt" className="font-semibold text-primary-700 underline">
              robots.txt
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
