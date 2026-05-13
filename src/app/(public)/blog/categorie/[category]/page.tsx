import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllCategories, getPostsByCategory, getCategorySlug } from '@/lib/data/blog-posts'
import { SITE_URL } from '@/lib/seo/config'

type Params = { category: string }

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams(): Params[] {
  return getAllCategories().map((c) => ({ category: c.slug }))
}

function findCategoryBySlug(slug: string) {
  return getAllCategories().find((c) => c.slug === slug)
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
  const cat = findCategoryBySlug(params.category)
  if (!cat) return {}
  return {
    title: `Blog — Catégorie ${cat.name}`,
    description: `Tous les articles du blog Vivos Assurance sur la thématique ${cat.name}.`,
    alternates: { canonical: `${SITE_URL}/blog/categorie/${cat.slug}` },
  }
}

export default async function BlogCategoryPage(props: { params: Promise<Params> }) {
  const params = await props.params
  const cat = findCategoryBySlug(params.category)
  if (!cat) notFound()

  const posts = getPostsByCategory(cat.name)

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>{' '}
          ›{' '}
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{' '}
          › <span className="text-gray-900">{cat.name}</span>
        </nav>

        <header className="mb-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            Catégorie
          </p>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">{cat.name}</h1>
          <p className="text-gray-600">
            {posts.length} article{posts.length > 1 ? 's' : ''}
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                <time dateTime={p.publishedAt}>
                  {new Date(p.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{p.readTime}</span>
              </div>
              <h2 className="mb-2 text-xl font-bold">
                <Link href={`/blog/${p.slug}`} className="text-primary-700 hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-600">{p.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link href="/blog" className="text-sm font-semibold text-primary-700 hover:underline">
            ← Retour au blog
          </Link>
        </div>
      </div>
    </main>
  )
}

// Re-export to silence unused-import warnings if helpers are removed later
export { getCategorySlug }
