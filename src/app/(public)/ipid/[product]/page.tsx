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

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const p = getIpidProduct(params.product)
  if (!p) return {}
  return {
    title: `IPID ${p.productName}`,
    description: `Fiche d'information produit standardisée DDA pour ${p.productName}. Garanties, exclusions, restrictions, obligations, durée.`,
    alternates: { canonical: `${SITE_URL}/ipid/${p.slug}` },
  }
}

export default async function IpidProductPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const p = getIpidProduct(params.product)
  if (!p) notFound()

  const others = Object.values(IPID_PRODUCTS)
    .filter((o) => o.slug !== p.slug)
    .slice(0, 4)

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto max-w-3xl px-4">
        <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-charcoal-600">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>{' '}
          ›{' '}
          <Link href="/ipid" className="hover:underline">
            IPID
          </Link>{' '}
          › <span className="text-charcoal-900">{p.productName}</span>
        </nav>

        <header className="mb-6 border-b border-sand-200 pb-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            Document d&apos;Information Produit Assurance
          </p>
          <h1 className="mb-2 text-2xl font-bold md:text-3xl">{p.productName}</h1>
          <p className="text-sm text-charcoal-600">{p.productType}</p>
          <p className="text-sm text-charcoal-600">Distributeur : {p.insurer}</p>
        </header>

        <Section title="De quel type d'assurance s'agit-il ?" icon="🛡️">
          <p>{p.whatIsIt}</p>
        </Section>

        <Section title="Qu'est-ce qui est assuré ?" icon="✅" tone="green">
          <ul className="list-disc space-y-1 pl-5">
            {p.whatIsCovered.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Qu'est-ce qui n'est pas assuré ?" icon="❌" tone="red">
          <ul className="list-disc space-y-1 pl-5">
            {p.whatIsNotCovered.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Y a-t-il des restrictions de couverture ?" icon="⚠️" tone="amber">
          <ul className="list-disc space-y-1 pl-5">
            {p.restrictions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Où suis-je couvert(e) ?" icon="🌍">
          <ul className="list-disc space-y-1 pl-5">
            {p.whereCovered.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Quelles sont mes obligations ?" icon="📋">
          <ul className="list-disc space-y-1 pl-5">
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

        <div className="mt-10 rounded-lg border border-primary-200 bg-primary-50 p-5">
          <p className="mb-3 text-sm text-primary-900">
            <strong>Important :</strong> ce document est un résumé conforme au règlement
            d&apos;exécution UE 2017/1469. Il ne se substitue pas aux Conditions Générales et
            Particulières du contrat, qui seules ont valeur contractuelle.
          </p>
          <Link
            href="/devis"
            className="inline-block rounded bg-primary-700 px-5 py-2.5 font-semibold text-white hover:bg-primary-800"
          >
            Demander un devis →
          </Link>
        </div>

        {others.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-lg font-bold">Autres fiches IPID</h2>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/ipid/${o.slug}`} className="text-primary-700 hover:underline">
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
    neutral: 'border-sand-200 bg-white',
    green: 'border-green-200 bg-green-50',
    red: 'border-red-200 bg-red-50',
    amber: 'border-amber-200 bg-amber-50',
  }[tone]
  return (
    <section className={`border ${toneClasses} mb-4 rounded-lg p-5`}>
      <h2 className="mb-2 text-base font-bold">
        <span className="mr-2" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h2>
      <div className="text-sm text-charcoal-800">{children}</div>
    </section>
  )
}
