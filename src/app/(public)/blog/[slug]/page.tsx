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

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const params = await props.params
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

export default async function BlogPostPage(props: { params: Promise<Params> }) {
  const params = await props.params
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
      <div className="container mx-auto max-w-3xl px-4">
        <nav aria-label="Fil d'Ariane" className="mb-4 text-sm text-gray-600">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>{' '}
          ›{' '}
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>{' '}
          ›{' '}
          <Link
            href={`/blog/categorie/${getCategorySlug(post.category)}`}
            className="hover:underline"
          >
            {post.category}
          </Link>{' '}
          › <span className="text-gray-900">{post.title}</span>
        </nav>

        <header className="mb-8 border-b border-gray-200 pb-6">
          <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
            <Link
              href={`/blog/categorie/${getCategorySlug(post.category)}`}
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
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">{post.title}</h1>
          <p className="text-lg text-gray-700">{post.description}</p>
          <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {post.author.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{post.author}</div>
              <div className="text-xs">{post.authorRole}</div>
            </div>
          </div>
        </header>

        {/* Sommaire */}
        <aside className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-5">
          <p className="mb-2 font-bold">Sommaire</p>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-gray-700">
            {post.toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="text-blue-700 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <article className="prose prose-lg mb-10 max-w-none">
          {post.body.map((section) => (
            <section key={section.id} id={section.id}>
              <h2>{section.h2}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {section.list &&
                (section.list.ordered ? (
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
                ))}
              {section.callout && (
                <div
                  className={`not-prose my-4 rounded-lg border p-4 ${TONE_CLASSES[section.callout.tone]}`}
                >
                  <p className="m-0 text-sm font-medium">{section.callout.text}</p>
                </div>
              )}
            </section>
          ))}
        </article>

        <section className="mb-10 border-t border-gray-200 pt-6">
          <h2 className="mb-3 text-lg font-bold">Sources</h2>
          <ul className="space-y-1.5 text-sm">
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

        <section className="mb-10 rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
          <h2 className="mb-2 text-xl font-bold">Besoin d&apos;un conseil sur ce sujet&nbsp;?</h2>
          <p className="mb-4 text-sm text-gray-700">
            Notre équipe ORIAS vous accompagne — devis gratuit, sans engagement.
          </p>
          <Link
            href="/devis"
            className="inline-block rounded bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Demander un devis →
          </Link>
        </section>

        {related.length > 0 && (
          <section>
            <h2 className="mb-3 text-lg font-bold">Articles liés</h2>
            <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="block rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md"
                  >
                    <div className="mb-1 text-xs font-semibold text-blue-700">{p.category}</div>
                    <div className="line-clamp-3 text-sm font-bold text-gray-900">{p.title}</div>
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
