/**
 * Pilier — "rc pro et décennale" (70 vol, KD 1, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-et-decennale'
const TITLE = 'RC Pro et Décennale — 2 assurances BTP complémentaires obligatoires'
const TAGLINE =
  'Pourquoi un pro BTP a besoin des 2 ? Distinction RC Pro et Décennale, périodes, sinistres types, pack combiné économique. Guide complet artisan BTP.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro et Décennale : 2 assurances DIFFÉRENTES mais COMPLÉMENTAIRES pour pros BTP. Distinction exacte, exemples sinistres, pack combiné -15-25% économie.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="RC Pro et Décennale sont les 2 assurances ESSENTIELLES pour tout professionnel du BTP, mais beaucoup d'artisans confondent leurs rôles. Cette page explique simplement : la RC Pro couvre les dommages PENDANT votre activité (casse client, chute échelle), la Décennale couvre les défauts d'ouvrage 10 ANS APRÈS RÉCEPTION (fissures, infiltrations). Les 2 sont OBLIGATOIRES pour le BTP. Pack combiné = -15-25% d'économie chez April Pro, SMABTP, MMA Pro BTP."
      legalReference="RC Pro : art. L. 124-3 + L. 121-2 • Décennale : Loi Spinetta + art. 1792"
      isObligatoire={true}
      benefits={[
        {
          icon: '🔧',
          title: 'RC Pro = pendant chantier',
          desc: 'Dommages causés à clients/tiers durant prestation',
        },
        {
          icon: '🏗️',
          title: 'Décennale = 10 ans après',
          desc: 'Solidité ouvrage ou impropriété destination',
        },
        {
          icon: '📦',
          title: 'Pack -15-25%',
          desc: 'Économies substantielles en souscription combinée',
        },
        {
          icon: '⚖️',
          title: 'Obligation BTP',
          desc: 'Décennale obligatoire (Spinetta). RC Pro fortement recommandée.',
        },
      ]}
      sections={[
        {
          h2: '2 exemples pour comprendre RC Pro vs Décennale',
          body: (
            <>
              <p>
                <strong>Exemple 1 — RC Pro (pendant chantier)</strong> :
              </p>
              <p>
                Votre apprenti plombier porte un radiateur de 80kg dans le salon du client. Il
                glisse, le radiateur tombe sur le canapé Roche Bobois (3 500€) et casse le parquet
                bois exotique (4 000€). Total : 7 500€ de dégâts immédiats au client.
              </p>
              <p>
                → <strong>RC Pro indemnise</strong> ces 7 500€ (moins franchise 300-1 500€ selon
                contrat).
              </p>
              <hr />
              <p>
                <strong>Exemple 2 — Décennale (10 ans après réception)</strong> :
              </p>
              <p>
                Vous avez posé une canalisation de chauffage encastrée dans la dalle d&apos;une
                maison neuve en 2023. En 2027 (4 ans après réception), un raccord lâche, fuite
                invisible pendant 2 mois → dalle gorgée d&apos;eau, parquet pourri, moisissures
                généralisées. Coût total réparation : 45 000€.
              </p>
              <p>
                → <strong>Décennale indemnise</strong> ces 45 000€ (le défaut d&apos;étanchéité
                encastrée affecte la destination du logement).
              </p>
            </>
          ),
        },
        {
          h2: 'Tableau récapitulatif RC Pro vs Décennale',
          body: (
            <>
              <p>
                <strong>Quand intervient-elle ?</strong>
              </p>
              <ul>
                <li>RC Pro : PENDANT le chantier (de la signature contrat à la réception)</li>
                <li>Décennale : APRÈS la réception (10 ans à compter PV réception)</li>
              </ul>
              <p>
                <strong>Qu&apos;est-ce qu&apos;elle couvre ?</strong>
              </p>
              <ul>
                <li>
                  RC Pro : dommages aux biens et personnes pendant l&apos;exécution (casse matériel
                  client, chute outils, blessure visiteur chantier)
                </li>
                <li>
                  Décennale : dommages affectant la solidité de l&apos;ouvrage ou le rendant
                  impropre à destination (fissures structurelles, infiltrations majeures)
                </li>
              </ul>
              <p>
                <strong>Plafonds typiques</strong> :
              </p>
              <ul>
                <li>RC Pro : 500k€-5M€ contractuel</li>
                <li>Décennale : pas de plafond légal Spinetta (assureur fixe 1-3M€ standard)</li>
              </ul>
              <p>
                <strong>Obligation</strong> :
              </p>
              <ul>
                <li>
                  RC Pro : OBLIGATOIRE pour professions réglementées + recommandée pour toutes
                </li>
                <li>
                  Décennale : OBLIGATOIRE pour TOUT constructeur BTP (Loi Spinetta sans exception)
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Pourquoi un pro BTP a besoin des 2',
          body: (
            <ul>
              <li>
                <strong>RC Pro seule = insuffisante</strong> : ne couvre pas les défauts
                d&apos;ouvrage post-réception. Sans Décennale, votre patrimoine personnel est exposé
                sur 10 ans pour les sinistres post-réception.
              </li>
              <li>
                <strong>Décennale seule = insuffisante</strong> : ne couvre pas les dommages PENDANT
                le chantier (casse client, chute visiteur). Sinistre pendant chantier sans RC Pro =
                patrimoine perso engagé.
              </li>
              <li>
                <strong>Pack combiné = optimal</strong> : couverture complète + économies 15-25% + 1
                interlocuteur.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Suis-je obligé d&apos;avoir les 2 si je suis BTP ?',
          a: 'Décennale OBLIGATOIRE (Loi Spinetta — toute exception punie 75k€ + 6 mois prison). RC Pro non-obligatoire stricto sensu mais FORTEMENT recommandée (1 sinistre RC Pro non couvert = 30-80k€ sortie de poche). En pratique : tous les pros BTP sérieux ont les 2.',
        },
        {
          q: 'Pack RC Pro + Décennale : combien d&apos;économies ?',
          a: 'Économies typiques pack vs séparé : AE peintre -150€/an, AE plombier -300€/an, SARL BTP 5 salariés -1 200€/an, SAS BTP PME 10 salariés -1 800€/an. Soit -15-20% en moyenne.',
        },
        {
          q: 'Quel assureur pour pack RC Pro + Décennale BTP ?',
          a: 'Pour AE BTP : April Pro BTP (best price + souscription en ligne 24h). Pour SARL BTP : SMABTP (paritaire BTP, expertise sinistres). Pour SAS PME : Allianz Pro BTP (couverture la plus large) ou MMA Pro BTP (réseau d&apos;agences).',
        },
        {
          q: 'Si je n&apos;ai qu&apos;une des 2, laquelle privilégier ?',
          a: 'Si vous êtes BTP : DÉCENNALE en absolu (obligatoire légalement, exposition personnelle 10 ans + sanctions pénales). Si pas BTP (services intellectuels) : RC Pro suffit. Mais pour pro BTP : il faut absolument les 2.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro et Décennale (variante)', slug: 'assurance-rc-pro-et-decennale' },
        { name: 'RC Pro Décennale (différences)', slug: 'rc-pro-decennale' },
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Assurance pro BTP (pack complet)', slug: 'assurance-pro-btp' },
      ]}
    />
  )
}
