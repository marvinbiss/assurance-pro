import type { Metadata } from 'next'
import Link from 'next/link'
import { IPID_PRODUCTS } from '@/lib/data/ipid-products'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'IPID — Fiches d\'information produit | Assurance Pro',
  description: 'Fiches IPID standardisées DDA pour chaque produit d\'assurance distribué : décennale, RC Pro, mutuelle TNS, cyber, multirisque, VTC.',
  alternates: { canonical: `${SITE_URL}/ipid` },
}

export default function IpidIndexPage() {
  const products = Object.values(IPID_PRODUCTS)
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-10">
          <p className="text-sm text-gray-500 mb-2">Document d&apos;Information Produit Assurance — DDA art. 20-8</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">IPID — Fiches d&apos;information produit</h1>
          <p className="text-gray-700 text-lg">
            Conformément au règlement d&apos;exécution UE 2017/1469, chaque produit non-vie distribué fait
            l&apos;objet d&apos;une fiche d&apos;information standardisée. Ces fiches vous présentent l&apos;essentiel
            de chaque garantie en 2 pages.
          </p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/ipid/${p.slug}`}
                className="block bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="text-xs font-semibold text-blue-700 mb-1 uppercase tracking-wide">
                  {p.productType}
                </div>
                <div className="text-base font-bold text-gray-900 mb-2">{p.productName}</div>
                <p className="text-sm text-gray-600 line-clamp-3">{p.whatIsIt}</p>
                <div className="text-sm text-blue-700 font-semibold mt-3">Voir la fiche IPID →</div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs italic text-gray-500 mt-10">
          Ces fiches sont fournies à titre informatif. Les conditions précises (plafonds, franchises,
          exclusions exactes) figurent dans les Conditions Générales et Particulières remises avant
          souscription.
        </p>
      </div>
    </main>
  )
}
