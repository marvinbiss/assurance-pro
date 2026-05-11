/**
 * Pilier — "rc pro convoyage" (200 vol, KD 0, CPC 300€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-convoyage'
const TITLE = 'RC Pro Convoyage — Véhicules, animaux, personnes, garanties 2026'
const TAGLINE =
  'Le convoyage professionnel (véhicules, animaux, personnes) nécessite une RC Pro spécifique. Garanties, plafonds, tarifs et conditions assurance auto-mission.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'RC Pro convoyage : convoyeur véhicules (auto, moto, camion), animaux (chevaux, NAC), personnes (chauffeur privé). Tarif 350-1 800€/an. Auto-mission complémentaire.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Le convoyage professionnel — qu'il s'agisse de véhicules (auto, moto, camion, bateau), d'animaux (chevaux, NAC, bovins) ou de personnes (chauffeur privé, VTC haut de gamme) — implique des risques spécifiques nécessitant une RC Pro adaptée. Cette page détaille les obligations, les garanties recommandées et les pièges à éviter pour les convoyeurs indépendants ou en société."
      legalReference="art. L. 124-3 + L. 121-2 + L. 211-1 C. assur. + Code transports"
      benefits={[
        {
          icon: '🚗',
          title: 'Convoyage véhicules',
          desc: 'Auto, moto, camions — couverture en mission',
        },
        {
          icon: '🐴',
          title: 'Convoyage animaux',
          desc: 'Chevaux, NAC, bovins — RC + dommages animal',
        },
        {
          icon: '👔',
          title: 'Convoyage personnes',
          desc: 'Chauffeur privé, dirigeant — RC Pro VTC souvent associée',
        },
        {
          icon: '💰',
          title: '350-1 800€/an',
          desc: 'AE 350-650€ • SARL convoyage spécialisé 800-1 800€',
        },
      ]}
      sections={[
        {
          h2: 'Convoyage véhicules — couvertures spécifiques',
          body: (
            <ul>
              <li>
                <strong>RC Pro standard</strong> : dommages causés au véhicule convoyé (rayures,
                chocs)
              </li>
              <li>
                <strong>Auto-mission</strong> : couverture véhicule personnel utilisé
                professionnellement (souvent obligatoire)
              </li>
              <li>
                <strong>Vol pendant convoyage</strong> : vol du véhicule confié (option à valider)
              </li>
              <li>
                <strong>Frais de défense</strong> : avocat en cas de litige client
              </li>
              <li>
                <strong>Plafond recommandé</strong> : 1-2M€ pour véhicules standards, 3-5M€ pour
                véhicules de luxe (Porsche, Ferrari, Tesla)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Convoyage animaux — spécificités',
          body: (
            <ul>
              <li>
                <strong>Mortalité accidentelle</strong> : indemnisation valeur de l&apos;animal (à
                déclarer)
              </li>
              <li>
                <strong>Frais vétérinaires d&apos;urgence</strong> : soins en cours de transport
              </li>
              <li>
                <strong>Conformité réglementation transport animaux</strong> (CAPTAV obligatoire)
              </li>
              <li>
                <strong>Plafond</strong> : variable selon valeur déclarée (cheval pur-sang :
                50k-500k€+)
              </li>
              <li>
                <strong>Documentation</strong> : DAB (Document Accompagnement Bovin), DAOA (autres
                animaux)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs convoyage par activité',
          body: (
            <ul>
              <li>
                <strong>Convoyeur véhicules AE (occasionnel)</strong> : 350-550€/an
              </li>
              <li>
                <strong>Convoyeur véhicules régulier SARL</strong> : 800-1 500€/an
              </li>
              <li>
                <strong>Convoyeur véhicules de luxe</strong> : 1 200-3 500€/an (plafond élevé
                requis)
              </li>
              <li>
                <strong>Convoyeur chevaux occasionnel</strong> : 450-750€/an
              </li>
              <li>
                <strong>Convoyeur chevaux régulier (centre équestre, courses)</strong> : 1 200-2
                800€/an
              </li>
              <li>
                <strong>Convoyeur dirigeant / VIP</strong> : 600-1 500€/an (avec RC Pro VTC)
              </li>
              <li>
                <strong>Convoyeur NAC / animaux exotiques</strong> : 600-1 200€/an (peu
                d&apos;assureurs)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro convoyage = même chose que assurance auto pro ?',
          a: 'Non, complémentaires. L&apos;assurance auto pro couvre votre véhicule. La RC Pro convoyage couvre les dommages au véhicule CONFIÉ par votre client (différent du vôtre).',
        },
        {
          q: 'Auto-mission obligatoire pour un convoyeur ?',
          a: 'Oui si vous utilisez votre véhicule personnel pour le convoyage professionnel. Sinon, sinistre = refus de l&apos;assureur auto perso (clause &quot;usage professionnel exclus&quot; dans 95% des contrats particuliers).',
        },
        {
          q: 'Combien coûte une RC Pro convoyage de luxe (Porsche, Ferrari) ?',
          a: 'Pour convoyeur véhicules &gt; 100k€ valeur : 1 200-3 500€/an avec plafond 3-5M€ recommandé. Allianz Pro et Hiscox sont les principaux acteurs. Vérifier limite valeur véhicule au contrat.',
        },
        {
          q: 'Comment souscrire ma RC Pro convoyage ?',
          a: 'Notre courtier ORIAS compare 5 assureurs spécialisés convoyage (Allianz Pro, MMA, Generali Pro, Hiscox, AXA Pro). Devis en 5 min, souscription en ligne, attestation immédiate.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro VTC', slug: 'rc-pro-vtc' },
        { name: 'Assurance VTC complète', slug: 'assurance-vtc' },
        { name: 'Assurance auto-mission', slug: 'assurance-mission-professionnelle' },
        { name: 'Assurance flotte', slug: 'assurance-flotte-automobile' },
      ]}
    />
  )
}
