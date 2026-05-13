/**
 * Pilier — Assurance portage salarial
 * KW long-tail : "portage salarial assurance", "freelance portage RC pro"
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-portage-salarial'
const TITLE = 'Assurance portage salarial — Couverture freelance porté 2026'
const TAGLINE =
  "L'assurance pour freelances en portage salarial : RC pro incluse par société de portage, mutuelle collective, prévoyance. Garanties souvent INSUFFISANTES — comment compléter."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Assurance portage salarial : RC pro incluse par société de portage (souvent plafond 1,5 M€ INSUFFISANT pour clients institutionnels). Mutuelle collective + prévoyance + chômage. Comment compléter avec RC pro 5 M€ individuelle. Guide ORIAS.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Le portage salarial est un statut hybride : le freelance porté est SALARIÉ de la société de portage (régime général SS, couverture chômage, mutuelle collective obligatoire ANI 2013) tout en exerçant son activité comme un indépendant chez ses clients. La société de portage souscrit traditionnellement une RC PRO COLLECTIVE qui couvre tous ses portés — MAIS le plafond standard est souvent 1,5 M€ par sinistre, INSUFFISANT pour les freelances IT seniors, conseil financier, ou ayant des clients institutionnels (grands groupes, ETI, collectivités) qui exigent 5-10 M€. Cette page détaille la couverture standard du portage, les insuffisances classiques et comment souscrire une RC Pro complémentaire individuelle (+580-1 200€/an pour passer à 5 M€)."
      legalReference="Convention collective portage salarial 2017 + Code du travail L. 1254-1 et s."
      isObligatoire={false}
      benefits={[
        {
          icon: '👔',
          title: 'Statut salarié',
          desc: 'Couverture chômage + mutuelle collective ANI + retraite régime général',
        },
        {
          icon: '⚠️',
          title: 'RC pro souvent insuffisante',
          desc: 'Plafond standard 1,5 M€ — insuffisant pour clients institutionnels',
        },
        {
          icon: '🛡️',
          title: 'RC complémentaire 5 M€',
          desc: 'À souscrire individuellement pour clients institutionnels (+580-1 200€/an)',
        },
        {
          icon: '💰',
          title: 'Coût total ~10% CA',
          desc: 'Frais portage 5-10% + cotisations sociales ~50% du salaire brut',
        },
      ]}
      sections={[
        {
          h2: 'Couverture standard incluse par la société de portage',
          body: (
            <>
              <ul>
                <li>
                  <strong>RC pro collective</strong> : plafond standard 1,5 M€/sinistre (à VÉRIFIER
                  auprès de votre société de portage)
                </li>
                <li>
                  <strong>Mutuelle collective ANI 2013</strong> : panier minimum garanti, prise en
                  charge employeur 50%
                </li>
                <li>
                  <strong>Prévoyance collective</strong> : IJ + invalidité + capital décès (variable
                  selon société)
                </li>
                <li>
                  <strong>Couverture chômage</strong> : régime général France Travail (vs TNS = pas
                  de chômage)
                </li>
                <li>
                  <strong>Retraite</strong> : régime général + complémentaire AGIRC-ARRCO
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Quand compléter avec une RC Pro individuelle ?',
          body: (
            <>
              <p>3 situations où la RC Pro de la société de portage est INSUFFISANTE :</p>
              <ol>
                <li>
                  <strong>Clients institutionnels exigeant ≥ 5 M€</strong> (grands groupes, ETI,
                  collectivités). Solution : RC Pro complémentaire individuelle 5 M€ (+580-1
                  200€/an)
                </li>
                <li>
                  <strong>Métier IT à risque systémique</strong> (DevOps, cybersécurité, architecte
                  cloud) — voir{' '}
                  <Link href="/rc-pro/informatique" className="text-primary-600 underline">
                    /rc-pro/informatique
                  </Link>{' '}
                  (CPC 1 300€)
                </li>
                <li>
                  <strong>Garantie « rétroactivité »</strong> non incluse → souscrire une RC Pro
                  individuelle avec rétroactivité 5 ans
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Le portage salarial inclut-il vraiment une RC Pro ?',
          a: 'OUI dans 100% des sociétés de portage (obligation conventionnelle). MAIS plafond standard 1,5 M€/sinistre — INSUFFISANT pour clients institutionnels (5-10 M€ exigés). Vérifier auprès de votre société de portage le plafond exact + les exclusions.',
        },
        {
          q: 'Combien coûte le portage salarial total ?',
          a: 'Frais société de portage : 5-10% du CA HT. Cotisations sociales : ~50% du salaire brut versé (vs ~30-45% en TNS). Coût total ~50-60% du CA HT en charges + frais. À comparer avec EURL/SARL gérant majoritaire (TNS) qui peut être plus avantageux dès 50k€ de CA.',
        },
        {
          q: 'Faut-il compléter avec une RC Pro individuelle ?',
          a: 'OUI si vos clients exigent 5-10 M€ de plafond, ou si vous êtes IT à risque systémique. Tarif RC Pro individuelle 5 M€ : 580-1 200€/an supplémentaires. ROI évident sur 1 mission grand compte.',
        },
      ]}
    />
  )
}
