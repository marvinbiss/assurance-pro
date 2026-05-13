/**
 * Pilier — "rc pro mma" (TIER S — 250 vol/mois, KD 5, CPC 250€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-mma'
const TITLE = 'RC Pro MMA — Avis, garanties, tarifs et alternatives 2026'
const TAGLINE =
  "MMA Pro propose une RC Pro équilibrée pour SARL/SAS PME : analyse des garanties, tarifs 250-2 500€/an, retours d'adhérents et comparatif avec Hiscox, Allianz Pro, AXA."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'MMA RC Pro : assureur paritaire historique (groupe MMA). Plafond 500k€-3M€, postériorité 5 ans. Tarif 250-2 500€/an. Comparatif Hiscox, Allianz, AXA, Generali.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="MMA (Mutuelles du Mans Assurance) est l'un des assureurs paritaires historiques français (fondé en 1828), membre du groupe Covéa avec MAAF et GMF. MMA Pro propose une RC Pro couvrant tous secteurs (services, BTP, commerce, médical) avec un bon équilibre prix/garanties pour SARL/SAS PME (100-500k€ CA). Cette page analyse l'offre MMA RC Pro, ses points forts/faibles, et la compare avec Hiscox, Allianz Pro, AXA Pro, Generali."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '🏛️',
          title: 'Assureur paritaire historique',
          desc: 'Groupe Covéa (avec MAAF + GMF), fondé 1828, solidité maximale',
        },
        {
          icon: '🛡️',
          title: 'Plafond 500k€-3M€',
          desc: 'Standard 1M€ AE, jusqu&apos;à 3M€ SARL/SAS PME',
        },
        {
          icon: '💰',
          title: '250-2 500€/an',
          desc: 'AE 250-450€ • SARL services 600-1 200€ • SAS PME 1 200-2 500€',
        },
        {
          icon: '🏗️',
          title: 'Couverture BTP incluse',
          desc: 'Contrairement à Hiscox/Stello, MMA fait aussi BTP + décennale',
        },
      ]}
      sections={[
        {
          h2: 'Points forts MMA RC Pro',
          body: (
            <ul>
              <li>
                <strong>Couverture tous secteurs</strong> : services intellectuels, BTP, commerce,
                médical, restauration — pas d&apos;exclusion par activité (contrairement à Hiscox
                limité services).
              </li>
              <li>
                <strong>Réseau d&apos;agences physiques</strong> : 1 500+ agences en France, idéal
                si vous préférez contact courtier direct vs digital pur.
              </li>
              <li>
                <strong>Pack multi-contrats avantageux</strong> : RC Pro + Multirisque + Flotte +
                Mutuelle = remise -15-25% paquet.
              </li>
              <li>
                <strong>Service sinistres réactif</strong> : équipe dédiée pro, déclaration en ligne
                ou par téléphone, réponse sous 5 jours ouvrés.
              </li>
              <li>
                <strong>Solidité financière A</strong> (groupe Covéa).
              </li>
              <li>
                <strong>Programme fidélité</strong> : remises évolutives selon ancienneté contrat.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Points faibles MMA RC Pro',
          body: (
            <ul>
              <li>
                <strong>Tarifs AE freelance services pas les plus compétitifs</strong> : 250-450€/an
                vs 95-180€ chez Hiscox/Stello sur ce segment.
              </li>
              <li>
                <strong>Postériorité 5 ans</strong> (vs 10 ans Hiscox) : si vous cessez activité,
                vos sinistres déclarés après 5 ans sont exclus.
              </li>
              <li>
                <strong>Process plus lourd qu&apos;un challenger digital</strong> : papier +
                signature physique souvent demandés.
              </li>
              <li>
                <strong>Pas le top sur activités à risque</strong> (cyber, financier spécialisé) —
                Hiscox ou Beazley plus adaptés.
              </li>
              <li>
                <strong>Souscription pas 100% en ligne</strong> : souvent passage en agence ou par
                téléphone nécessaire.
              </li>
            </ul>
          ),
        },
        {
          h2: 'MMA vs Hiscox vs Allianz Pro vs AXA',
          body: (
            <ul>
              <li>
                <strong>MMA Pro</strong> : équilibré tous secteurs, idéal SARL/SAS PME 100-500k€ CA,
                réseau agences. Postériorité 5 ans.
              </li>
              <li>
                <strong>Hiscox</strong> : best price AE services intellectuels, plafonds élevés,
                postériorité 10 ans. Pas de BTP.
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture la plus large (BTP + services), bon
                rapport prix/services SARL/SAS. Postériorité 5 ans.
              </li>
              <li>
                <strong>AXA Pro</strong> : couverture premium, assistance haut de gamme, prime +20%
                vs MMA équivalent.
              </li>
              <li>
                <strong>Generali Pro</strong> : alternative équilibrée, programme &quot;Generali
                Vitality&quot;.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'MMA Pro est-il un bon choix pour un freelance ?',
          a: 'Pour un AE/freelance services intellectuels (consultant, IT, designer) avec CA &lt; 80k€, Hiscox ou Stello seront généralement 30-50% moins chers que MMA. MMA devient compétitif à partir de SARL/SAS avec CA 100k€+.',
        },
        {
          q: 'MMA couvre-t-il la décennale BTP ?',
          a: 'Oui, MMA propose RC Pro BTP + Décennale + Multirisque BTP. C&apos;est l&apos;un de ses points forts vs les pure-services (Hiscox, Stello). Tarifs compétitifs sur SARL BTP 5-15 salariés.',
        },
        {
          q: 'Quelle est la différence MMA / MAAF / GMF ?',
          a: 'Toutes trois font partie du groupe Covéa (créé 2003). MMA est le pôle dédié pro/entreprises. MAAF est plutôt particuliers et TPE. GMF cible les fonctionnaires. En RC Pro, c&apos;est MMA qu&apos;il faut viser.',
        },
        {
          q: 'Comment résilier MMA RC Pro ?',
          a: 'Résiliation libre à tout moment après 1 an d&apos;engagement (loi infra-annuelle 2020). Lettre recommandée AR à votre agence MMA ou via espace adhérent. Préavis 1 mois. Important : conserver la postériorité 5 ans pour les sinistres antérieurs.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
        { name: 'RC Pro pas chère', slug: 'rc-pro-pas-cher' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
