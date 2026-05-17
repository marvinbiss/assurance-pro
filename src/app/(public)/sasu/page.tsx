import type { Metadata } from 'next'
import { Hammer, Briefcase } from 'lucide-react'
import { DisambiguationPage } from '@/components/premium/disambiguation-page'

export const metadata: Metadata = {
  title: 'Assurance pro SASU — RC Pro, Décennale, Multirisque',
  description:
    'SASU ? Comparez RC Pro et décennale selon votre activité. Courtier ORIAS, devis 24h, sans engagement.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/sasu`,
  },
}

export default function SasuPage() {
  return (
    <DisambiguationPage
      statut="SASU"
      intro="Le statut SASU (Société par Actions Simplifiée Unipersonnelle) impose les mêmes obligations qu'une SAS classique. Décennale pour activités BTP, RC Pro pour services ou conseil. Selon les contrats clients, une multirisque pro peut aussi être exigée."
      options={[
        {
          href: '/assurance-rc-pro-sasu',
          Icon: Briefcase,
          accent: 'charcoal',
          title: 'RC Pro SASU',
          desc: 'Activités consulting, IT, communication, agence digitale, coaching, expertise comptable… Couvre dommages corporels, matériels, immatériels causés aux clients.',
          bullet: 'Souvent exigée par les grands comptes au contrat',
        },
        {
          href: '/assurance-decennale/macon',
          Icon: Hammer,
          accent: 'primary',
          title: 'Décennale SASU BTP',
          desc: 'Si votre SASU exerce une activité BTP (gros œuvre, second œuvre, installation), la garantie décennale est obligatoire. Voir nos contrats par métier.',
          bullet: 'Loi Spinetta — applicable tous statuts juridiques',
        },
      ]}
    />
  )
}
