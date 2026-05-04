import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, getAllCategories } from '@/lib/data/blog-posts'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Blog — Actualités et conseils assurance pro | Assurance Pro',
  description:
    "Blog du cabinet de courtage ORIAS Assurance Pro. Actualités réglementaires, conseils, guides pratiques sur l'assurance professionnelle française.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Blog — Actualités et conseils assurance pro | Assurance Pro',
    description:
      'Blog du cabinet de courtage ORIAS Assurance Pro. Actualités réglementaires, conseils, guides pratiques sur l\\',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Actualités et conseils assurance pro | Assurance Pro',
    description:
      'Blog du cabinet de courtage ORIAS Assurance Pro. Actualités réglementaires, conseils, guides pratiques sur l\\',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <header className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">Blog Assurance Pro</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Actualités réglementaires, guides pratiques et conseils d&apos;experts sur
            l&apos;assurance professionnelle française. Rédigé par notre équipe de courtiers ORIAS.
          </p>
        </header>

        <nav className="mb-10 flex flex-wrap justify-center gap-2" aria-label="Catégories">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/blog/categorie/${cat.slug}`}
              className="rounded bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              {cat.name} <span className="font-normal text-blue-500">({cat.count})</span>
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
                <Link
                  href={`/blog/categorie/${post.slug ? '' : ''}${typeof post.category === 'string' ? '' : ''}`}
                  className="rounded bg-blue-100 px-2 py-0.5 font-semibold text-blue-700"
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
              <h2 className="mb-2 text-xl font-bold">
                <Link href={`/blog/${post.slug}`} className="text-blue-700 hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mb-4 text-gray-600">{post.description}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-semibold text-blue-700 hover:underline"
              >
                Lire l&apos;article →
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-blue-50 p-8 text-center">
          <h2 className="mb-3 text-xl font-bold">Besoin d&apos;un conseil personnalisé&nbsp;?</h2>
          <p className="mb-6 text-gray-700">
            Notre équipe de courtiers ORIAS analyse gratuitement votre situation.
          </p>
          <Link
            href="/devis"
            className="inline-block rounded bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Demander un devis →
          </Link>
        </div>
      </div>
    </main>
  )
}
