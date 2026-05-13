import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { IPID_PRODUCTS } from '@/lib/data/ipid-products'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: "IPID — Fiches d'information produit",
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
    <main className="min-h-screen bg-sand-50">
      <PageHero
        breadcrumbs={[{ label: 'IPID' }]}
        eyebrow="Documents d'Information Produit · DDA art. 20-8"
        EyebrowIcon={FileText}
        title="Fiches IPID"
        description="Conformément au règlement UE 2017/1469, chaque produit non-vie distribué fait l'objet d'une fiche d'information standardisée en 2 pages."
        size="sm"
      />

      <div className="container mx-auto max-w-4xl px-4 py-14">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/ipid/${p.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-charcoal-100 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-premium"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-primary-700 opacity-60 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div className="mb-2 inline-flex items-center rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-700">
                  {p.productType}
                </div>
                <div className="mb-2 font-heading text-lg font-extrabold tracking-tight text-charcoal-900 group-hover:text-primary-700">
                  {p.productName}
                </div>
                <p className="line-clamp-3 text-sm leading-relaxed text-charcoal-600">
                  {p.whatIsIt}
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary-700 transition-transform group-hover:translate-x-0.5">
                  Voir la fiche IPID →
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-xs italic text-charcoal-500">
          Ces fiches sont fournies à titre informatif. Les conditions précises (plafonds,
          franchises, exclusions exactes) figurent dans les Conditions Générales et Particulières
          remises avant souscription.
        </p>
      </div>
    </main>
  )
}
