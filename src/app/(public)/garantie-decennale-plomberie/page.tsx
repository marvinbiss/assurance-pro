/**
 * Pilier — "garantie décennale plomberie" (200 vol, KD 1, CPC 50€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'garantie-decennale-plomberie'
const TITLE = 'Garantie Décennale Plomberie — Tarifs, garanties, sinistralité'
const TAGLINE =
  'La décennale plomberie couvre les défauts d&apos;étanchéité, fuites encastrées et installations chauffage central. Tarifs plombier AE 1 400€/an, SARL 2 200€/an.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale plomberie : obligation Loi Spinetta. Plombier AE 1 400-2 100€/an, plombier-chauffagiste 1 600-2 500€/an, SARL plomberie 1 800-3 500€/an. Sinistralité 18% AQC.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La garantie décennale plomberie s'applique aux plombiers, plombiers-chauffagistes, climaticiens, et spécialistes sanitaires intervenant sur la structure d'un bâtiment (installations encastrées, chauffage central, sanitaires intégrés). Elle couvre pendant 10 ans à compter de la réception les défauts qui affectent la solidité de l'ouvrage ou le rendent impropre à sa destination — particulièrement les infiltrations encastrées et défauts d'étanchéité plomberie."
      legalReference="Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🔧',
          title: 'Plombier + chauffagiste + climaticien',
          desc: '5 métiers CVC couverts par même décennale',
        },
        {
          icon: '💧',
          title: 'Infiltrations encastrées',
          desc: 'Fuites canalisations dans murs/dalle (sinistre fréquent)',
        },
        {
          icon: '💰',
          title: '1 400-3 500€/an',
          desc: 'AE 1 400-2 100€ • Plombier-chauffagiste AE 1 600-2 500€ • SARL 1 800-3 500€',
        },
        {
          icon: '📊',
          title: '18% sinistralité (AQC)',
          desc: 'Plomberie 2e poste sinistres BTP après couverture (24%)',
        },
      ]}
      sections={[
        {
          h2: 'Métiers CVC couverts par décennale plomberie',
          body: (
            <ul>
              <li>
                <strong>Plombier (généraliste)</strong> : canalisations, robinetterie, évacuations,
                raccordements
              </li>
              <li>
                <strong>Chauffagiste</strong> : chaudière fixe, radiateurs, plancher chauffant,
                régulation
              </li>
              <li>
                <strong>Plombier-chauffagiste</strong> : combinaison des 2 (le plus fréquent)
              </li>
              <li>
                <strong>Climaticien / frigoriste</strong> : PAC air-air et air-eau, climatiseurs
                encastrés
              </li>
              <li>
                <strong>Spécialiste sanitaire</strong> : douches italiennes, baignoires balnéo,
                robinetterie haut de gamme
              </li>
              <li>
                <strong>Spécialiste pompe à chaleur RGE</strong> : PAC géothermique, aérothermique
                (qualification RGE Qualibat)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Sinistres typiques en décennale plomberie',
          body: (
            <ul>
              <li>
                <strong>Fuite canalisation encastrée</strong> : raccord mal soudé, joint défectueux
                dans mur ou dalle (sinistre N+1 à N+5 fréquent)
              </li>
              <li>
                <strong>Infiltration douche italienne</strong> : défaut d&apos;étanchéité receveur
                ou évacuation
              </li>
              <li>
                <strong>Défaut système chauffage central</strong> : circuit défaillant rendant
                logement inhabitable en hiver
              </li>
              <li>
                <strong>PAC mal dimensionnée</strong> : ne chauffe pas le volume prévu, COP
                insuffisant
              </li>
              <li>
                <strong>Refoulement égouts</strong> : pente d&apos;évacuation incorrecte
              </li>
              <li>
                <strong>Légionellose</strong> : circuit eau chaude mal conçu (rare mais sinistre
                majeur)
              </li>
              <li>
                <strong>Plancher chauffant défaillant</strong> : circuit cassé, fuite généralisée
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs décennale plomberie 2026',
          body: (
            <ul>
              <li>
                <strong>Plombier AE</strong> : 1 400-2 100€/an (plafond 1M€)
              </li>
              <li>
                <strong>Plombier-chauffagiste AE</strong> : 1 600-2 500€/an
              </li>
              <li>
                <strong>Climaticien-frigoriste AE</strong> : 1 800-2 800€/an (risque PAC haut)
              </li>
              <li>
                <strong>Spécialiste PAC RGE AE</strong> : 1 900-3 200€/an (qualification spé
                requise)
              </li>
              <li>
                <strong>SARL plomberie (1-5 salariés)</strong> : 1 800-3 500€/an
              </li>
              <li>
                <strong>SARL plomberie-chauffage (3-10 salariés)</strong> : 2 500-5 000€/an
              </li>
              <li>
                <strong>SAS PME CVC (10-30 salariés)</strong> : 4 000-9 000€/an
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Un plombier doit-il avoir une décennale ?',
          a: 'OUI obligatoire (Loi Spinetta) pour TOUTE intervention sur installations encastrées ou chauffage central. Sans décennale : 75 000€ amende + 6 mois prison (art. L. 243-3 C. assur.) + responsabilité personnelle illimitée 10 ans.',
        },
        {
          q: 'Tarif décennale pour un plombier-chauffagiste débutant ?',
          a: 'AE plombier-chauffagiste 1ère année : 1 600-2 500€/an. Tarif négociable -10-20% via courtier ORIAS spécialisé BTP. Qualification Qualibat ou RGE peut donner -5-10% supplémentaire.',
        },
        {
          q: 'La décennale couvre-t-elle la pose PAC ?',
          a: 'Oui si fixée et intégrée au bâti (PAC géothermique, aérothermique encastrée). Pour les PAC simples (split mural amovible), c&apos;est la RC Pro qui couvre généralement. Qualification RGE Qualibat ou Qualit&apos;EnR requise pour PAC.',
        },
        {
          q: 'Que faire en cas de fuite encastrée 5 ans après pose ?',
          a: 'Déclarer le sinistre à l&apos;assureur décennale du plombier qui a réalisé l&apos;installation. L&apos;assureur indemnise (ou subroge la DO du MO). Si plombier disparu : expertise + DO rétroactive éventuelle pour propriétaire.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale toiture', slug: 'garantie-decennale-toiture' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
        { name: 'Pour quels travaux ?', slug: 'garantie-decennale-obligatoire-pour-quels-travaux' },
      ]}
    />
  )
}
