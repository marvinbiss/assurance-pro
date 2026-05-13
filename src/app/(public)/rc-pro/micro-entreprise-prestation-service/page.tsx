/**
 * Pilier — RC Pro micro-entreprise prestation de service
 * KW Ahrefs : "assurance micro-entreprise prestation de service" 150 vol KD 8 CPC 250€
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro/micro-entreprise-prestation-service'
const TITLE = 'RC Pro micro-entreprise prestation de service — Pack 2026'
const TAGLINE =
  "L'assurance RC pro pour micro-entreprises de prestation de services (BNC) : conseil, design, formation, freelance digital. Madelin déductible si réel."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro micro-entreprise prestation de service (BNC) : couverture freelance/consultant + plateformes B2B. Madelin déductible au régime réel. Tarifs 220-580€/an. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La micro-entreprise de prestation de services (régime BNC — Bénéfice Non Commercial) couvre les freelances et consultants : développeur web, designer, rédacteur, traducteur, photographe, formateur, coach, conseil. Plafond CA 2026 : 77 700€ HT/an (au-delà : bascule au régime réel obligatoire). La RC Pro est EXIGÉE par 78% des plateformes B2B (Malt, Crème de la Crème, ComeUp Pro, Upwork) à l'inscription. Pack standard : RC Pro 1,5-3 M€ + cyber assurance (si manipulation données client) + protection juridique. Tarifs 2026 accessibles : 220-580€/an. Cette page renvoie vers nos piliers spécialisés selon votre métier."
      legalReference="Loi 9 août 2016 (statut micro-entrepreneur) + Code des assurances L. 113-1"
      isObligatoire={false}
      benefits={[
        {
          icon: '💼',
          title: 'Plafond CA 77 700€ HT',
          desc: 'Limite régime micro-fiscal BNC. Au-delà : bascule régime réel obligatoire',
        },
        {
          icon: '📋',
          title: 'Plateformes B2B',
          desc: 'Exigée par 78% : Malt, Crème de la Crème, ComeUp Pro, Upwork',
        },
        {
          icon: '💰',
          title: 'Madelin si régime réel',
          desc: 'Au régime micro-fiscal : Madelin NON applicable. Au régime réel : oui (économie ~1 750€/an pour 60k€)',
        },
        {
          icon: '⚡',
          title: 'À partir de 220 €/an',
          desc: 'Freelance digital sans antécédent. Senior IT : 580-980€/an',
        },
      ]}
      sections={[
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <ul>
                <li>
                  <Link href="/rc-pro/auto-entrepreneur" className="text-primary-600 underline">
                    RC Pro auto-entrepreneur
                  </Link>{' '}
                  — pilier complet AE/micro-entrepreneur
                </li>
                <li>
                  <Link href="/assurance-micro-entreprise" className="text-primary-600 underline">
                    Pack micro-entreprise
                  </Link>{' '}
                  — RC + multirisque + mutuelle
                </li>
                <li>
                  <Link href="/assurance-freelance" className="text-primary-600 underline">
                    Assurance freelance
                  </Link>{' '}
                  — tous statuts
                </li>
                <li>
                  <Link href="/rc-pro/informatique" className="text-primary-600 underline">
                    RC Pro informatique
                  </Link>{' '}
                  — pour freelances IT (CPC 1 300€)
                </li>
                <li>
                  <Link href="/mutuelle-tns" className="text-primary-600 underline">
                    Mutuelle TNS Madelin
                  </Link>{' '}
                  — santé déductible (régime réel)
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Micro-entreprise prestation services : RC Pro obligatoire ?',
          a: "Pas légalement obligatoire (sauf 21 métiers réglementés : santé, juridique, conseil financier, etc.) MAIS exigée par 78% des plateformes B2B et 100% des clients institutionnels. Sans RC Pro : exclusion des appels d'offres + responsabilité personnelle illimitée.",
        },
        {
          q: 'Combien coûte la RC Pro micro-entreprise prestation de service ?',
          a: 'Démarre à 220€/an pour freelance digital sans antécédent. Médiane marché : 280-480€/an. Senior IT : 580-980€/an. Variables : métier, CA déclaré, plafond RC choisi (1,5-5 M€).',
        },
        {
          q: 'Plus de détails ?',
          a: "Voir nos piliers spécialisés selon votre profil : <a href='/rc-pro/auto-entrepreneur' class='text-primary-600 underline'>/rc-pro/auto-entrepreneur</a>, <a href='/assurance-freelance' class='text-primary-600 underline'>/assurance-freelance</a>, <a href='/assurance-micro-entreprise' class='text-primary-600 underline'>/assurance-micro-entreprise</a>.",
        },
      ]}
    />
  )
}
