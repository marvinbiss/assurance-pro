/**
 * BreadcrumbSchema — Injecte un BreadcrumbList JSON-LD pour Schema.org.
 *
 * Utilisé en complément de PageHero (qui injecte aussi son propre schema)
 * pour les pages qui n'utilisent pas PageHero (home, blog index, blog article).
 *
 * @example
 *   <BreadcrumbSchema items={[{ label: 'Blog' }, { label: post.title }]} />
 */

import { SITE_URL } from '@/lib/seo/config'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const listItems = [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    ...items.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: b.label,
      ...(b.href ? { item: `${SITE_URL}${b.href}` } : {}),
    })),
  ]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: listItems,
  }
  return <script {...jsonLdScriptProps(schema)} />
}
