/**
 * Auto-entrepreneur — "responsabilité civile professionnelle auto entrepreneur" (450 vol, KD 2, CPC 350€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'responsabilite-civile-professionnelle-auto-entrepreneur'
const TITLE = 'Responsabilité Civile Professionnelle Auto-Entrepreneur — Guide 2026'
const TAGLINE =
  'La RC Pro pour AE/micro-entrepreneur est obligatoire pour certaines professions (médical, BTP, immobilier) et fortement recommandée pour toutes. Tarif 95-450€/an.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro auto-entrepreneur : obligation par profession + tarifs 95-450€/an. Hiscox best price AE freelance 95€/an. Comparatif 5 assureurs + cyber combinée IT.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La Responsabilité Civile Professionnelle pour les auto-entrepreneurs (et micro-entrepreneurs) est obligatoire pour certaines professions réglementées et fortement recommandée pour TOUTES les activités. Sinistre moyen AE : 5-30k€ (casse client, conseil erroné, blessure visiteur). Sans RC Pro, le patrimoine personnel de l'AE est intégralement exposé (vs responsabilité limitée d'une SARL/SAS). Cette page détaille les obligations par profession, les tarifs marché et les meilleures offres 2026."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + obligations sectorielles (Loi Spinetta BTP, Loi Hoguet immo, etc.)"
      benefits={[
        {
          icon: '⚖️',
          title: 'Obligation par profession',
          desc: 'Médical, juridique, immobilier, BTP — RC Pro impérative',
        },
        {
          icon: '🤝',
          title: 'Recommandée toutes activités',
          desc: 'Services intellectuels, esthétique, coaching, formation, etc.',
        },
        {
          icon: '💰',
          title: '95-450€/an',
          desc: 'Hiscox 95-220€ services intellectuels • BTP 250-450€ (en + décennale)',
        },
        {
          icon: '🛡️',
          title: 'Patrimoine perso protégé',
          desc: 'Sinistre 5-30k€ couvert vs sortie de poche AE',
        },
      ]}
      sections={[
        {
          h2: 'RC Pro AE : obligation par profession',
          body: (
            <>
              <p>
                <strong>OBLIGATOIRE</strong> pour les professions réglementées :
              </p>
              <ul>
                <li>Professions médicales (médecin, infirmier, kiné, ostéopathe, sage-femme)</li>
                <li>Professions juridiques (avocat, notaire, huissier, expert-comptable)</li>
                <li>Agents immobiliers (Loi Hoguet — carte T/G)</li>
                <li>BTP (en complément décennale Spinetta)</li>
                <li>Auto-écoles, ambulanciers, taxis, VTC (décret 2014-371)</li>
                <li>Conseillers en investissements financiers (CIF — AMF)</li>
              </ul>
              <p>
                <strong>FORTEMENT RECOMMANDÉE</strong> (non obligatoire mais cruciale) :
              </p>
              <ul>
                <li>Consultants, freelances IT, agences web, photographes</li>
                <li>Coachs, formateurs, professeurs particuliers</li>
                <li>Esthéticiennes, coiffeurs à domicile, prothésistes</li>
                <li>E-commerce, dropshipping, vendeurs en ligne</li>
                <li>Restauration ambulante (food trucks, traiteurs)</li>
                <li>Services à la personne (ménage, jardinage, garde enfants)</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Tarifs RC Pro AE par activité 2026',
          body: (
            <ul>
              <li>
                <strong>Consultant / freelance IT</strong> : 95-220€/an (Hiscox best price)
              </li>
              <li>
                <strong>Designer / photographe</strong> : 120-250€/an
              </li>
              <li>
                <strong>Coach professionnel / formateur</strong> : 150-300€/an
              </li>
              <li>
                <strong>Coach sportif / yoga</strong> : 200-400€/an (risque corporel)
              </li>
              <li>
                <strong>Esthéticienne / coiffeur à domicile</strong> : 180-350€/an
              </li>
              <li>
                <strong>Prothésiste ongulaire</strong> : 200-400€/an
              </li>
              <li>
                <strong>BTP (en complément décennale)</strong> : 250-450€/an
              </li>
              <li>
                <strong>Auto-école / ambulancier / taxi</strong> : 400-800€/an
              </li>
              <li>
                <strong>Médical libéral</strong> : 800-2 500€/an (réglementaire)
              </li>
              <li>
                <strong>Avocat</strong> : 500-1 500€/an (Ordre minimum)
              </li>
              <li>
                <strong>Agent immobilier mandataire</strong> : 350-600€/an (Hoguet)
              </li>
            </ul>
          ),
        },
        {
          h2: '5 critères de choix RC Pro AE',
          body: (
            <ol>
              <li>
                <strong>Plafond par sinistre</strong> : minimum 500k€ AE services, 1M€ recommandé
                pour activités à risque (BTP, médical, financier)
              </li>
              <li>
                <strong>Postériorité (subséquente)</strong> : minimum 5 ans, idéal 10 ans (Hiscox
                seul propose standard 10 ans)
              </li>
              <li>
                <strong>Exclusions clés</strong> : lire attentivement (cyber-attaques, données
                sensibles, sous-traitance non déclarée)
              </li>
              <li>
                <strong>Franchise par sinistre</strong> : 300-1 500€ standard. Adapter à votre
                trésorerie
              </li>
              <li>
                <strong>Cyber-assurance combinée</strong> : indispensable si activité IT/digital ou
                données client
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Un auto-entrepreneur doit-il OBLIGATOIREMENT avoir une RC Pro ?',
          a: 'Cela dépend de votre activité. OBLIGATOIRE pour : médical, juridique, immobilier, BTP, auto-école, ambulancier, taxi/VTC, CIF. FORTEMENT RECOMMANDÉE pour toutes les autres activités B2B où votre conseil/prestation peut causer un préjudice client (consultant, IT, marketing, formation, etc.).',
        },
        {
          q: 'Quelle est la RC Pro AE la moins chère ?',
          a: 'Pour AE freelance services intellectuels (consultant, IT, designer) CA &lt; 80k€ : Hiscox 95-220€/an ou Stello 90-200€/an avec plafond 1M€. Pour AE BTP en complément décennale : 250-450€/an chez April Pro BTP.',
        },
        {
          q: 'Combien coûte une RC Pro pour un AE freelance débutant ?',
          a: 'AE services intellectuels CA &lt; 30k€ : 95-150€/an chez Hiscox (plafond 500k€-1M€). AE coach sportif : 200-300€/an. AE esthéticienne à domicile : 180-280€/an. AE BTP : 250-400€/an.',
        },
        {
          q: 'Que risque-t-on sans RC Pro AE ?',
          a: "Pour professions réglementées : sanctions ordinales + pénales (interdiction d'exercer). Pour toutes activités : responsabilité personnelle ILLIMITÉE en cas de sinistre. Patrimoine perso AE 100% exposé. Sinistre moyen 5-30k€ = sortie de poche directe.",
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro Auto-Entrepreneur (variante)', slug: 'assurance-rc-pro-auto-entrepreneur' },
        { name: 'RC Pro micro-entreprise', slug: 'rc-pro-micro-entreprise' },
        { name: 'Assurance micro entreprise', slug: 'assurance-micro-entreprise' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
      ]}
    />
  )
}
