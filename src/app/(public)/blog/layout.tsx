import { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Blog Assurance Pro — Conseils ORIAS BTP, RC Pro, cyber',
  description:
    "Analyses, sources légales et chiffres officiels (Légifrance, ACPR, AQC) sur l'assurance professionnelle BTP, RC Pro, cyber et mutuelle TNS. Conseils motivés par nos courtiers ORIAS.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog Assurance Pro — Conseils ORIAS',
    description:
      'Analyses sourcées (Légifrance, ACPR, AQC) sur assurance pro BTP, RC Pro, cyber et mutuelle TNS.',
    url: `${SITE_URL}/blog`,
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
