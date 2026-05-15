import type { Metadata } from 'next'
import { Hammer, Briefcase } from 'lucide-react'
import { DisambiguationPage } from '@/components/premium/disambiguation-page'

export const metadata: Metadata = {
  title: 'Assurance pro auto-entrepreneur — Décennale ou RC Pro ?',
  description:
    'Vous êtes auto-entrepreneur ? Comparez décennale BTP et RC Pro selon votre activité. Courtier ORIAS, devis 24h.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/auto-entrepreneur`,
  },
}

export default function AutoEntrepreneurPage() {
  return (
    <DisambiguationPage
      statut="auto-entrepreneur"
      intro="Selon votre activité, vous devez souscrire une garantie décennale (BTP) ou une RC Pro (services, conseil, métiers du numérique). Choisissez votre couverture."
      options={[
        {
          href: '/assurance-decennale/auto-entrepreneur',
          Icon: Hammer,
          accent: 'primary',
          title: 'Décennale auto-entrepreneur BTP',
          desc: 'Maçon, plombier, électricien, couvreur, peintre, plaquiste, photovoltaïque… Garantie obligatoire 10 ans (Loi Spinetta) pour tout artisan AE du BTP.',
          bullet: "Obligation légale Loi Spinetta — 75 000 € d'amende sans couverture",
        },
        {
          href: '/rc-pro/auto-entrepreneur',
          Icon: Briefcase,
          accent: 'charcoal',
          title: 'RC Pro auto-entrepreneur',
          desc: "Consultant, freelance IT, coach, photographe, formateur, expert-comptable, agence digitale… Couvre dommages causés à vos clients dans l'exercice de votre activité.",
          bullet: "Recommandée pour services pro — exigée par certains clients/donneurs d'ordre",
        },
      ]}
    />
  )
}
