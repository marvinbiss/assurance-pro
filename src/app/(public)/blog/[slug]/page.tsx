import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPostSlugs, getAllPosts, getCategorySlug } from '@/lib/data/blog-posts'
import { SITE_URL } from '@/lib/seo/config'

type Params = { slug: string }

export const dynamicParams = false
export const revalidate = 86400

export function generateStaticParams(): Params[] {
  return getPostSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Blog Assurance Pro`,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

const TONE_CLASSES: Record<'info' | 'warning' | 'success', string> = {
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  success: 'border-green-200 bg-green-50 text-green-900',
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Assurance Pro',
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    keywords: post.tags.join(', '),
  }

  return (
    <main className="min-h-screen bg-white py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container mx-auto px-4 max-w-3xl">
        <nav aria-label="Fil d'Ariane" className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">Accueil</Link> ›{' '}
          <Link href="/blog" className="hover:underline">Blog</Link> ›{' '}
          <Link
            href={`/blog/categorie/${getCategorySlug(post.category)}`}
            className="hover:underline"
          >
            {post.category}
          </Link>{' '}
          › <span className="text-gray-900">{post.title}</span>
        </nav>

        <header className="mb-8 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
            <Link
              href={`/blog/categorie/${getCategorySlug(post.category)}`}
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
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
          <p className="text-gray-700 text-lg">{post.description}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{post.author}</div>
              <div className="text-xs">{post.authorRole}</div>
            </div>
          </div>
        </header>

        {/* Sommaire */}
        <aside className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-5">
          <p className="font-bold mb-2">Sommaire</p>
          <ol className="list-decimal pl-5 text-sm space-y-1 text-gray-700">
            {post.toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-blue-700 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="prose prose-lg max-w-none mb-10">
          {post.body.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.h2}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {section.list && (
                section.list.ordered ? (
                  <ol>
                    {section.list.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <ul>
                    {section.list.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )
              )}
              {section.callout && (
                <div
                  className={`not-prose border rounded-lg p-4 my-4 ${TONE_CLASSES[section.callout.tone]}`}
                >
                  <p className="text-sm font-medium m-0">{section.callout.text}</p>
                </div>
              )}
            </section>
          ))}
        </article>

        <section className="mb-10 border-t border-gray-200 pt-6">
          <h2 className="text-lg font-bold mb-3">Sources</h2>
          <ul className="text-sm space-y-1.5">
            {post.sources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:underline"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-10 text-center">
          <h2 className="text-xl font-bold mb-2">Besoin d&apos;un conseil sur ce sujet&nbsp;?</h2>
          <p className="text-sm mb-4 text-gray-700">
            Notre équipe ORIAS vous accompagne — devis gratuit, sans engagement.
          </p>
          <Link
            href="/devis"
            className="inline-block px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white rounded font-semibold"
          >
            Demander un devis →
          </Link>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="text-lg font-bold mb-3">Articles liés</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="text-xs text-blue-700 font-semibold mb-1">
                      {p.category}
                    </div>
                    <div className="text-sm font-bold text-gray-900 line-clamp-3">{p.title}</div>
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
