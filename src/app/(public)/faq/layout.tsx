import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { getBreadcrumbSchema } from '@/lib/seo/jsonld'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'FAQ - Questions fréquentes',
  description:
    "Réponses aux questions fréquentes sur l'assurance professionnelle : décennale BTP, RC Pro, multirisque, mutuelle TNS Madelin, VTC, cyber. Cabinet de courtage ORIAS.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
  openGraph: {
    title: 'FAQ - Questions fréquentes',
    description: 'Trouvez les réponses à vos questions sur Vivos Assurance.',
    url: `${SITE_URL}/faq`,
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', url: '/' },
    { name: 'FAQ', url: '/faq' },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  )
}
