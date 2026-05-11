/**
 * Pilier — "rc pro credit agricole" (200 vol, KD 0, CPC 120€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-credit-agricole'
const TITLE = 'RC Pro Crédit Agricole — Pacifica Pro, avis, alternatives 2026'
const TAGLINE =
  'Le Crédit Agricole propose une RC Pro via Pacifica (filiale assurance du groupe). Analyse des garanties, tarifs et alternatives spécialisées pro (MMA, Hiscox).'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'RC Pro Crédit Agricole (Pacifica) : assureur bancaire accessible si client CA. Tarif 280-1 500€/an. Comparatif vs Hiscox, MMA, Allianz Pro — quel choix pour qui ?',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Le Crédit Agricole propose une RC Pro via Pacifica, sa filiale assurance créée en 1990 (groupe Crédit Agricole Assurances). L'offre cible principalement les pros déjà clients du Crédit Agricole pour leurs services bancaires (compte pro, prêt, terminal de paiement), avec une logique de bancassurance et de pack global. Cette page analyse l'offre Pacifica RC Pro, ses points forts/faibles et la compare aux spécialistes pro (MMA, Hiscox, Allianz Pro)."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '🏦',
          title: 'Bancassurance Crédit Agricole',
          desc: 'Idéal si déjà client CA (compte pro, prêt, TPE)',
        },
        {
          icon: '🛡️',
          title: 'Plafond 500k€-2M€',
          desc: 'Standard 500k€ AE, jusqu&apos;à 2M€ SARL/SAS PME',
        },
        {
          icon: '💰',
          title: '280-1 500€/an',
          desc: 'AE 280-500€ • SARL services 600-1 200€ • SAS PME 1 200-1 500€',
        },
        {
          icon: '📦',
          title: 'Pack bancaire combiné',
          desc: 'Compte pro + RC Pro + multirisque = remise -10-15%',
        },
      ]}
      sections={[
        {
          h2: 'Points forts Crédit Agricole RC Pro (Pacifica)',
          body: (
            <ul>
              <li>
                <strong>Pack bancassurance</strong> : si client Crédit Agricole pour services
                bancaires (compte pro, prêt, TPE), ajout RC Pro = remise -10-15% sur ensemble
              </li>
              <li>
                <strong>Réseau d&apos;agences large</strong> : 7 000+ agences Crédit Agricole en
                France (le plus dense)
              </li>
              <li>
                <strong>Conseil pro intégré</strong> : chargé de compte pro CA peut
                prescrire/conseiller assurances pro
              </li>
              <li>
                <strong>Tarifs corrects sur AE</strong> : 280-500€/an, milieu de marché
              </li>
              <li>
                <strong>Solidité financière A</strong> (groupe Crédit Agricole Assurances)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Points faibles vs spécialistes pro',
          body: (
            <ul>
              <li>
                <strong>Pas spécialiste pro pur</strong> : Pacifica fait d&apos;abord du
                particulier. Offre pro moins développée que MMA Pro ou Allianz Pro
              </li>
              <li>
                <strong>Plafonds limités</strong> : 2M€ max standard. Insuffisant pour activités à
                risque (cyber, médical spécialisé)
              </li>
              <li>
                <strong>Postériorité 5 ans</strong> (vs 10 ans Hiscox)
              </li>
              <li>
                <strong>Cyber-assurance basique</strong> : module simple, pas adapté aux pros IT
                exigeants
              </li>
              <li>
                <strong>Pas de RC Pro BTP décennale</strong> : pour BTP, April Pro / SMABTP / MMA
                plus pertinents
              </li>
              <li>
                <strong>Souscription liée banque</strong> : difficile sans être client Crédit
                Agricole bancaire
              </li>
            </ul>
          ),
        },
        {
          h2: 'Quand choisir Crédit Agricole vs alternatives',
          body: (
            <ul>
              <li>
                <strong>Choisir Crédit Agricole</strong> si : déjà client CA bancaire, souhaitez 1
                seul interlocuteur banque+assurance, activité simple AE/TPE avec besoins standards
              </li>
              <li>
                <strong>Choisir MMA Pro</strong> si : recherchez assureur pur pro avec réseau
                agences, SARL/SAS PME tous secteurs, pack multi-contrats étendu
              </li>
              <li>
                <strong>Choisir Hiscox</strong> si : freelance/AE services intellectuels, plafond
                1M€+ requis, postériorité 10 ans souhaitée
              </li>
              <li>
                <strong>Choisir Allianz Pro</strong> si : couverture multi-secteurs (services + BTP
                + agriculture), bon rapport prix/services PME
              </li>
              <li>
                <strong>Choisir Generali Pro</strong> si : cyber-assurance combinée prioritaire,
                programme &quot;Generali Vitality&quot;
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Peut-on souscrire Crédit Agricole RC Pro sans être client CA ?',
          a: 'En théorie oui, en pratique difficile. Pacifica privilégie la souscription via les agences CA pour ses clients existants. Sans compte pro CA, le conseiller redirige souvent vers d&apos;autres assureurs.',
        },
        {
          q: 'Quel tarif CA RC Pro pour un AE consultant ?',
          a: 'AE consultant CA &lt; 80k€ : 280-450€/an (Pacifica AE). Pour comparaison : Hiscox 95-180€/an, MMA 250-380€/an. Crédit Agricole rentable surtout si pack bancassurance avec compte pro CA.',
        },
        {
          q: 'CA RC Pro couvre-t-elle le BTP ?',
          a: 'Pacifica fait de la RC Pro BTP standard (sans décennale). Pour décennale BTP : April Pro Crédit Agricole partenaire, ou SMABTP/MMA Pro directement. À comparer pour pack global.',
        },
        {
          q: 'Comment résilier Crédit Agricole RC Pro ?',
          a: 'Résiliation libre après 1 an d&apos;engagement (loi infra-annuelle 2020). Lettre recommandée AR à votre agence CA. Préavis 1 mois. Important si pack bancassurance : la résiliation RC Pro peut impacter les remises sur autres produits.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro MMA', slug: 'rc-pro-mma' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'RC Pro MAIF', slug: 'rc-pro-maif' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
