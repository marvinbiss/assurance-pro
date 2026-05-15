import type { Metadata } from 'next'
import { Hammer, Briefcase } from 'lucide-react'
import { DisambiguationPage } from '@/components/premium/disambiguation-page'

export const metadata: Metadata = {
  title: 'Assurance pro micro-entreprise — Décennale ou RC Pro ?',
  description:
    'Micro-entrepreneur ? Choisissez entre décennale BTP et RC Pro selon votre activité. Courtier ORIAS, devis 24h.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/micro-entreprise`,
  },
}

export default function MicroEntreprisePage() {
  return (
    <DisambiguationPage
      statut="micro-entreprise"
      intro="Le statut micro-entrepreneur (ex-auto-entrepreneur) impose les mêmes obligations d'assurance. Décennale pour BTP, RC Pro pour services. Notre cabinet trouve la couverture adaptée à votre chiffre d'affaires."
      options={[
        {
          href: '/assurance-decennale/micro-entreprise',
          Icon: Hammer,
          accent: 'primary',
          title: 'Décennale micro-entrepreneur BTP',
          desc: '52 métiers BTP éligibles. Tarifs à partir de 35€/mois selon métier et CA. Attestation 24h, conforme Loi Spinetta.',
          bullet: 'Obligation Loi Spinetta — applicable tous statuts y compris micro',
        },
        {
          href: '/assurance-rc-pro-micro-entreprise',
          Icon: Briefcase,
          accent: 'charcoal',
          title: 'RC Pro micro-entreprise',
          desc: 'Activités de services, conseil, prestations intellectuelles, métiers du digital. Couvre vos responsabilités professionnelles vis-à-vis des clients.',
          bullet: 'Recommandée pour micro-entrepreneurs hors BTP',
        },
      ]}
    />
  )
}
