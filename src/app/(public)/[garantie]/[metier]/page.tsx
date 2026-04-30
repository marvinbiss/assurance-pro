/**
 * Page HUB MÉTIER × GARANTIE OU FEUILLE — /[garantie]/[metier]
 * Ex : /assurance-decennale/plombier, /rc-pro/avocat, /assurance-vtc/auto-entrepreneur
 *
 * Couche B/C/D — selon page_layer en DB
 * ISR revalidate : 7 jours pour feuilles, 24h pour hubs
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import JsonLd from '@/components/JsonLd'

export const revalidate = 604800 // 7 jours
export const dynamicParams = true

type Params = { garantie: string; metier: string }

export async function generateStaticParams(): Promise<Params[]> {
  // Pre-render à la demande via ISR — pas de generateStaticParams au build
  return []
}

async function getMetierPage(garantieCode: string, metierCode: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('cms_pages')
    .select('*')
    .eq('garantie_code', garantieCode)
    .eq('metier_code', metierCode)
    .eq('status', 'published')
    .order('intent_score', { ascending: false })
    .limit(1)
    .single()
  return data
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { garantie, metier } = await params
  const page = await getMetierPage(garantie, metier)
  if (!page) return {}

  return {
    title: page.meta_title ?? page.title,
    description: page.meta_description,
    alternates: {
      canonical: page.canonical_url ?? `${process.env.NEXT_PUBLIC_SITE_URL}/${page.slug}`,
    },
    robots: {
      index: !page.noindex,
      follow: true,
    },
  }
}

export default async function MetierGarantiePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { garantie, metier } = await params
  const page = await getMetierPage(garantie, metier)
  if (!page) notFound()

  return (
    <article className="mx-auto max-w-4xl py-8 px-4">
      {page.structured_data ? <JsonLd data={page.structured_data} /> : null}

      <nav className="text-sm text-gray-600 mb-4" aria-label="Fil d'Ariane">
        <a href={`/${garantie}`}>Retour {garantie}</a>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{page.h1 ?? page.title}</h1>
        {page.excerpt ? <p className="text-lg text-gray-700">{page.excerpt}</p> : null}
      </header>

      {page.content_html ? (
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: page.content_html }}
        />
      ) : null}

      {/* CTA devis intégré */}
      <aside className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Recevez votre devis personnalisé</h3>
        <p className="mb-4 text-gray-700">
          Comparaison entre nos partenaires assureurs en 2 minutes. Sans engagement.
        </p>
        <a
          href={`/devis?garantie=${garantie}&metier=${metier}`}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700"
        >
          Obtenir mon devis →
        </a>
      </aside>

      <footer className="mt-16 pt-8 border-t text-sm text-gray-600">
        {page.author_name ? (
          <p>
            Article rédigé par <strong>{page.author_name}</strong>
            {page.author_bio ? ` — ${page.author_bio}` : null}
          </p>
        ) : null}
        {page.published_at ? (
          <p>Mis à jour le {new Date(page.published_at).toLocaleDateString('fr-FR')}</p>
        ) : null}
      </footer>
    </article>
  )
}
