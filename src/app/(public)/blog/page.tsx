import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/data/blog-posts'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Blog — Actualités et conseils assurance pro | Assurance Pro',
  description:
    'Blog du cabinet de courtage ORIAS Assurance Pro. Actualités réglementaires, conseils, guides pratiques sur l\'assurance professionnelle française.',
  alternates: { canonical: `${SITE_URL}/blog` },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Blog Assurance Pro</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Actualités réglementaires, guides pratiques et conseils d&apos;experts sur
            l&apos;assurance professionnelle française. Rédigé par notre équipe de courtiers ORIAS.
          </p>
        </header>

        <nav className="mb-10 flex flex-wrap gap-2 justify-center" aria-label="Catégories">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/categorie/${cat.slug}`}
              className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded font-semibold text-sm"
            >
              {cat.name}{' '}
              <span className="text-blue-500 font-normal">({cat.count})</span>
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <Link
                  href={`/blog/categorie/${post.slug ? '' : ''}${(typeof post.category === 'string' ? '' : '')}`}
                  className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-semibold"
                >
                  {post.category}
                </Link>
                <span>•</span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                <span>•</span>
                <span>{post.readTime} de lecture</span>
              </div>
              <h2 className="text-xl font-bold mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-700 hover:underline"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-blue-700 font-semibold hover:underline"
              >
                Lire l&apos;article →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center bg-blue-50 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Besoin d&apos;un conseil personnalisé&nbsp;?</h2>
          <p className="text-gray-700 mb-6">
            Notre équipe de courtiers ORIAS analyse gratuitement votre situation.
          </p>
          <Link
            href="/devis"
            className="inline-block px-6 py-3 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800"
          >
            Demander un devis →
          </Link>
        </div>
      </div>
    </main>
  )
}
