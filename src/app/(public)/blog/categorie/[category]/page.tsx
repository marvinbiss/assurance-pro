import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getAllCategories,
  getPostsByCategory,
  getCategorySlug,
} from '@/lib/data/blog-posts'
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

export function generateMetadata({ params }: { params: Params }): Metadata {
  const cat = findCategoryBySlug(params.category)
  if (!cat) return {}
  return {
    title: `Blog — Catégorie ${cat.name} | Assurance Pro`,
    description: `Tous les articles du blog Assurance Pro sur la thématique ${cat.name}.`,
    alternates: { canonical: `${SITE_URL}/blog/categorie/${cat.slug}` },
  }
}

export default function BlogCategoryPage({ params }: { params: Params }) {
  const cat = findCategoryBySlug(params.category)
  if (!cat) notFound()

  const posts = getPostsByCategory(cat.name)

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">Accueil</Link> ›{' '}
          <Link href="/blog" className="hover:underline">Blog</Link> ›{' '}
          <span className="text-gray-900">{cat.name}</span>
        </nav>

        <header className="mb-8">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Catégorie</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{cat.name}</h1>
          <p className="text-gray-600">{posts.length} article{posts.length > 1 ? 's' : ''}</p>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
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
              <h2 className="text-xl font-bold mb-2">
                <Link href={`/blog/${p.slug}`} className="text-blue-700 hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm">{p.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link href="/blog" className="text-blue-700 hover:underline text-sm font-semibold">
            ← Retour au blog
          </Link>
        </div>
      </div>
    </main>
  )
}

// Re-export to silence unused-import warnings if helpers are removed later
export { getCategorySlug }
