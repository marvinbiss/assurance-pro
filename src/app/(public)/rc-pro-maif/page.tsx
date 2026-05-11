/**
 * Pilier — "rc pro maif" (TIER S — 250 vol/mois, KD 3, CPC 60€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-maif'
const TITLE = 'RC Pro MAIF — Avis, garanties associatives et alternatives 2026'
const TAGLINE =
  'La MAIF propose une RC Pro principalement orientée associations, économie sociale et solidaire, professions libérales. Analyse des garanties, tarifs et comparatif avec MMA, Hiscox, Allianz Pro.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'MAIF RC Pro : assureur mutualiste, fort sur associations + ESS + professions libérales (enseignants, médical). Tarif 180-1 500€/an. Comparatif honnête avec MMA et Hiscox.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La MAIF (Mutuelle Assurance des Instituteurs de France) est un assureur mutualiste français créé en 1934 par les enseignants, désormais ouvert à tous mais conservant une forte spécialisation dans le secteur associatif, l'économie sociale et solidaire (ESS), les professions libérales (enseignants, médico-social, culture) et les associations sportives. Sa RC Pro est moins agressive sur les pros services commerciaux purs, mais excellente pour les structures à but non lucratif et les pros &quot;à vocation sociale&quot;. Cette page analyse l'offre MAIF RC Pro et la compare avec MMA, Hiscox, Allianz Pro."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + Loi 1901 (associations)"
      benefits={[
        {
          icon: '🎓',
          title: 'Spécialiste associations + ESS',
          desc: 'Asso 1901, mutuelles, coopératives, fondations, structures ESS',
        },
        {
          icon: '⚖️',
          title: 'Mutualiste à but non lucratif',
          desc: 'Pas d&apos;actionnaires, bénéfices réinvestis, gouvernance sociétaires',
        },
        {
          icon: '💰',
          title: '180-1 500€/an',
          desc: 'AE prof libéral 180-350€ • Asso 250-600€ • SARL ESS 500-1 500€',
        },
        {
          icon: '🤝',
          title: 'Service éthique',
          desc: 'Réputation forte sur gestion sinistres équitable et conseil non-vendeur',
        },
      ]}
      sections={[
        {
          h2: 'Points forts MAIF RC Pro',
          body: (
            <ul>
              <li>
                <strong>Référence absolue associations + ESS</strong> : RC Pro Asso 1901 starter à
                180€/an, couverture activités événementielles, encadrants bénévoles, dommages
                matériels club.
              </li>
              <li>
                <strong>
                  Excellente pour professions libérales du soin et de l&apos;enseignement
                </strong>{' '}
                : enseignant indépendant, prof particulier, formateur, coach, art-thérapeute,
                médico-social.
              </li>
              <li>
                <strong>Approche mutualiste éthique</strong> : pas d&apos;objectif de profit,
                conseil non-vendeur, programme &quot;Réparer&quot; (réparation au lieu de
                remplacement).
              </li>
              <li>
                <strong>Prime stable</strong> : faible augmentation annuelle (~2-3% vs 5-8% chez
                assureurs commerciaux).
              </li>
              <li>
                <strong>Solidité financière A-</strong> (notation S&amp;P) avec stabilité forte.
              </li>
              <li>
                <strong>Gestion sinistres équitable</strong> : 90% des sinistres traités sans
                contestation (reconnu par UFC Que Choisir).
              </li>
            </ul>
          ),
        },
        {
          h2: 'Points faibles MAIF RC Pro',
          body: (
            <ul>
              <li>
                <strong>Pas la plus compétitive sur services commerciaux</strong> : freelance IT,
                consultant business, agence digitale — Hiscox / Stello / Allianz Pro sont moins
                chers de 15-30%.
              </li>
              <li>
                <strong>Pas de RC Pro BTP</strong> : la MAIF ne fait pas décennale ni couverture
                artisans BTP. Pour BTP : April Pro, MMA, Allianz Pro, SMABTP.
              </li>
              <li>
                <strong>Plafonds standards modérés</strong> : 500k€-1.5M€ standard. Pour activités à
                risque élevé (5M€+), Hiscox ou AXA Pro plus adaptés.
              </li>
              <li>
                <strong>Pas le top sur cyber / numérique</strong> : couverture cyber basique en
                option, pas leader sur ce segment.
              </li>
              <li>
                <strong>Processus parfois lent</strong> : souscription papier souvent demandée, pas
                de full digital instant comme Stello.
              </li>
            </ul>
          ),
        },
        {
          h2: 'MAIF Pro vs alternatives',
          body: (
            <ul>
              <li>
                <strong>MAIF</strong> : top sur associations, ESS, professions libérales
                social/culture. Pas optimal pour services commerciaux purs ou BTP.
              </li>
              <li>
                <strong>Hiscox</strong> : best price services intellectuels commerciaux, plafonds
                élevés, postériorité 10 ans.
              </li>
              <li>
                <strong>MMA Pro</strong> : équilibré tous secteurs, fort sur SARL/SAS PME,
                couverture BTP incluse.
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture la plus large (services + BTP +
                agriculture), bon rapport prix.
              </li>
              <li>
                <strong>April Pro</strong> : leader BTP + bonne couverture professions libérales
                médicales.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'La MAIF couvre-t-elle uniquement les enseignants ?',
          a: 'Non, c&apos;est une idée reçue. Bien que créée en 1934 par et pour les enseignants, la MAIF est ouverte à tous depuis 1990. Elle reste cependant très forte sur enseignement, formation, médico-social, ESS, associations.',
        },
        {
          q: 'Combien coûte une RC Pro MAIF pour une asso ?',
          a: 'RC Pro Asso 1901 starter : 180-300€/an (asso &lt; 20 adhérents, peu d&apos;activités), 300-600€/an (asso 50-200 adhérents, activités hebdo régulières), 600-1 500€/an (grande asso ou ESS structure).',
        },
        {
          q: 'MAIF Pro vs Hiscox : lequel pour un consultant ?',
          a: 'Pour un consultant freelance commercial (services aux entreprises) avec CA &lt; 80k€ : Hiscox sera 30-50% moins cher (95-180€/an vs 250-400€ chez MAIF). Pour un consultant social/formation/coaching éthique, la MAIF reste pertinente.',
        },
        {
          q: 'Comment souscrire MAIF RC Pro ?',
          a: 'Via maif.fr → onglet &quot;Pro et Asso&quot;. Devis en ligne possible, souscription souvent finalisée par un conseiller MAIF (téléphone ou agence). Délai 24-48h pour attestation.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'MMA RC Pro', slug: 'rc-pro-mma' },
        { name: 'Assurance association', slug: 'assurance-association' },
        { name: 'RC Pro freelance', slug: 'assurance-freelance' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
