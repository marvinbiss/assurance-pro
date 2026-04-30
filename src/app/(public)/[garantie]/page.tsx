/**
 * Page PILIER — /[garantie]
 * Ex : /assurance-decennale, /rc-pro-btp, /multirisque-pro
 *
 * Couche A — Tête de pont E-E-A-T (480 pages)
 * Yield attendu : 35-40 visites/mois
 * ISR revalidate : 24h
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import JsonLd from '@/components/JsonLd'

export const revalidate = 86400 // 24h
export const dynamicParams = true
export const dynamic = 'force-static'

type Params = { garantie: string }

export async function generateStaticParams(): Promise<Params[]> {
  // Pre-render à la demande via ISR — pas de generateStaticParams au build
  // pour éviter les contextes Supabase indisponibles côté serveur statique.
  return []
}

async function getPillarPage(garantieCode: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('cms_pages')
    .select('*, garantie:app__garanties_assurance(*)')
    .eq('page_type', 'pillar')
    .eq('garantie_code', garantieCode)
    .eq('status', 'published')
    .single()
  return data
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { garantie } = await params
  const page = await getPillarPage(garantie)
  if (!page) return {}

  return {
    title: page.meta_title ?? page.title,
    description: page.meta_description,
    alternates: {
      canonical: page.canonical_url ?? `${process.env.NEXT_PUBLIC_SITE_URL}/${page.slug}`,
    },
    openGraph: {
      title: page.meta_title ?? page.title,
      description: page.meta_description,
      type: 'website',
      images: page.og_image_url ? [page.og_image_url] : undefined,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function PillarPage({ params }: { params: Promise<Params> }) {
  const { garantie } = await params
  const page = await getPillarPage(garantie)
  if (!page) notFound()

  return (
    <article className="prose-pillar mx-auto max-w-4xl py-8 px-4">
      {page.structured_data ? <JsonLd data={page.structured_data} /> : null}

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{page.h1 ?? page.title}</h1>
        {page.excerpt ? <p className="text-xl text-gray-700">{page.excerpt}</p> : null}
      </header>

      {page.content_html ? (
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: page.content_html }}
        />
      ) : null}

      <footer className="mt-16 pt-8 border-t">
        {page.author_name ? (
          <p className="text-sm text-gray-600">
            Article rédigé par <strong>{page.author_name}</strong>
            {page.author_bio ? ` — ${page.author_bio}` : null}
          </p>
        ) : null}
        {page.published_at ? (
          <p className="text-sm text-gray-500">
            Mis à jour le {new Date(page.published_at).toLocaleDateString('fr-FR')}
          </p>
        ) : null}
      </footer>
    </article>
  )
}
