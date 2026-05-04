import type { Metadata } from 'next'
import Link from 'next/link'
import { IPID_PRODUCTS } from '@/lib/data/ipid-products'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: "IPID — Fiches d'information produit | Assurance Pro",
  description:
    "Fiches IPID standardisées DDA pour chaque produit d'assurance distribué : décennale, RC Pro, mutuelle TNS, cyber, multirisque, VTC.",
  alternates: { canonical: `${SITE_URL}/ipid` },
  openGraph: {
    title: 'IPID — Fiches d\\',
    description: 'Fiches IPID standardisées DDA pour chaque produit d\\',
    url: `${SITE_URL}/ipid`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPID — Fiches d\\',
    description: 'Fiches IPID standardisées DDA pour chaque produit d\\',
  },
}

export default function IpidIndexPage() {
  const products = Object.values(IPID_PRODUCTS)
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="mb-10">
          <p className="mb-2 text-sm text-gray-500">
            Document d&apos;Information Produit Assurance — DDA art. 20-8
          </p>
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">
            IPID — Fiches d&apos;information produit
          </h1>
          <p className="text-lg text-gray-700">
            Conformément au règlement d&apos;exécution UE 2017/1469, chaque produit non-vie
            distribué fait l&apos;objet d&apos;une fiche d&apos;information standardisée. Ces fiches
            vous présentent l&apos;essentiel de chaque garantie en 2 pages.
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/ipid/${p.slug}`}
                className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {p.productType}
                </div>
                <div className="mb-2 text-base font-bold text-gray-900">{p.productName}</div>
                <p className="line-clamp-3 text-sm text-gray-600">{p.whatIsIt}</p>
                <div className="mt-3 text-sm font-semibold text-blue-700">Voir la fiche IPID →</div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs italic text-gray-500">
          Ces fiches sont fournies à titre informatif. Les conditions précises (plafonds,
          franchises, exclusions exactes) figurent dans les Conditions Générales et Particulières
          remises avant souscription.
        </p>
      </div>
    </main>
  )
}
