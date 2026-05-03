import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getIpidProduct, getIpidSlugs, IPID_PRODUCTS } from '@/lib/data/ipid-products'
import { SITE_URL } from '@/lib/seo/config'

type Params = { product: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return getIpidSlugs().map((product) => ({ product }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const p = getIpidProduct(params.product)
  if (!p) return {}
  return {
    title: `IPID ${p.productName} | Assurance Pro`,
    description: `Fiche d'information produit standardisée DDA pour ${p.productName}. Garanties, exclusions, restrictions, obligations, durée.`,
    alternates: { canonical: `${SITE_URL}/ipid/${p.slug}` },
  }
}

export default function IpidProductPage({ params }: { params: Params }) {
  const p = getIpidProduct(params.product)
  if (!p) notFound()

  const others = Object.values(IPID_PRODUCTS).filter((o) => o.slug !== p.slug).slice(0, 4)

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">Accueil</Link> ›{' '}
          <Link href="/ipid" className="hover:underline">IPID</Link> ›{' '}
          <span className="text-gray-900">{p.productName}</span>
        </nav>

        <header className="border-b border-gray-200 pb-6 mb-6">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">
            Document d&apos;Information Produit Assurance
          </p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{p.productName}</h1>
          <p className="text-sm text-gray-600">{p.productType}</p>
          <p className="text-sm text-gray-600">Distributeur : {p.insurer}</p>
        </header>

        <Section title="De quel type d'assurance s'agit-il ?" icon="🛡️">
          <p>{p.whatIsIt}</p>
        </Section>

        <Section title="Qu'est-ce qui est assuré ?" icon="✅" tone="green">
          <ul className="list-disc pl-5 space-y-1">
            {p.whatIsCovered.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Qu'est-ce qui n'est pas assuré ?" icon="❌" tone="red">
          <ul className="list-disc pl-5 space-y-1">
            {p.whatIsNotCovered.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Y a-t-il des restrictions de couverture ?" icon="⚠️" tone="amber">
          <ul className="list-disc pl-5 space-y-1">
            {p.restrictions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Où suis-je couvert(e) ?" icon="🌍">
          <ul className="list-disc pl-5 space-y-1">
            {p.whereCovered.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Quelles sont mes obligations ?" icon="📋">
          <ul className="list-disc pl-5 space-y-1">
            {p.obligations.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Quand et comment effectuer les paiements ?" icon="💳">
          <p>{p.paymentTerms}</p>
        </Section>

        <Section title="Quand commence la couverture et quand prend-elle fin ?" icon="📅">
          <p>{p.duration}</p>
        </Section>

        <Section title="Comment puis-je résilier le contrat ?" icon="🔚">
          <p>{p.termination}</p>
        </Section>

        <div className="mt-10 bg-blue-50 border border-blue-200 rounded-lg p-5">
          <p className="text-sm text-blue-900 mb-3">
            <strong>Important :</strong> ce document est un résumé conforme au règlement d&apos;exécution
            UE 2017/1469. Il ne se substitue pas aux Conditions Générales et Particulières du contrat,
            qui seules ont valeur contractuelle.
          </p>
          <Link
            href="/devis"
            className="inline-block px-5 py-2.5 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800"
          >
            Demander un devis →
          </Link>
        </div>

        {others.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold mb-3">Autres fiches IPID</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/ipid/${o.slug}`} className="text-blue-700 hover:underline">
                    {o.productName}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  )
}

function Section({
  title,
  icon,
  tone = 'neutral',
  children,
}: {
  title: string
  icon: string
  tone?: 'neutral' | 'green' | 'red' | 'amber'
  children: React.ReactNode
}) {
  const toneClasses = {
    neutral: 'border-gray-200 bg-white',
    green: 'border-green-200 bg-green-50',
    red: 'border-red-200 bg-red-50',
    amber: 'border-amber-200 bg-amber-50',
  }[tone]
  return (
    <section className={`border ${toneClasses} rounded-lg p-5 mb-4`}>
      <h2 className="text-base font-bold mb-2">
        <span className="mr-2" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h2>
      <div className="text-sm text-gray-800">{children}</div>
    </section>
  )
}
