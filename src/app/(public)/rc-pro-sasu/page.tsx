/**
 * Pilier — "rc pro sasu" (150 vol, KD 0, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-sasu'
const TITLE = 'RC Pro SASU — Statut juridique, garanties et tarifs 2026'
const TAGLINE =
  'La SASU (Société par Actions Simplifiée Unipersonnelle) impose une RC Pro pour son dirigeant. Spécificités statut, plafonds recommandés, tarifs 350-1 500€/an.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro SASU : couvre activité société + dirigeant personne morale. Tarif 350-1 500€/an. Spécificités vs SARL/AE. Recommandé plafond 1-2M€ + cyber-assurance.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La SASU (Société par Actions Simplifiée Unipersonnelle) est un statut juridique populaire pour les entrepreneurs individuels souhaitant une responsabilité limitée + flexibilité de gestion. Sa RC Pro a des spécificités vs AE/SARL : couverture société + dirigeant personne morale, statut assimilé salarié (vs TNS), plafonds standards plus élevés, et possibilité d'ajouter une RC Mandataire Social pour le président."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + art. L. 227-1 et s. Code de commerce"
      benefits={[
        {
          icon: '🏢',
          title: 'Société + dirigeant couverts',
          desc: 'Personne morale + responsabilité du président SASU',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1-3M€ standard',
          desc: 'Supérieur à AE (500k€) — adapté à SASU avec CA &gt; 50k€',
        },
        {
          icon: '⚖️',
          title: 'Statut assimilé salarié',
          desc: 'Président SASU = TNS-pas TNS (cotisations différentes vs AE)',
        },
        {
          icon: '💰',
          title: '350-1 500€/an',
          desc: 'SASU débutante 350-500€ • SASU établie 600-900€ • SASU PME 900-1 500€',
        },
      ]}
      sections={[
        {
          h2: 'Spécificités RC Pro SASU vs AE/SARL',
          body: (
            <ul>
              <li>
                <strong>SASU vs AE</strong> : SASU = personne morale (responsabilité limitée capital
                social). AE = personne physique (patrimoine perso engagé). RC Pro SASU plus chère
                (350-500€ vs 95-220€ AE) mais plafonds standards plus élevés (1-2M€ vs 500k€).
              </li>
              <li>
                <strong>SASU vs SARL</strong> : SASU = 1 associé (le président). SARL = 1-100
                associés. RC Pro tarifs similaires. SASU + souple en gestion (pas de gérance
                imposée).
              </li>
              <li>
                <strong>SASU vs EURL</strong> : SASU = président assimilé salarié (sécu générale).
                EURL = gérant TNS (sécu SSI). Impact mutuelle différent, pas la RC Pro.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Garanties recommandées SASU',
          body: (
            <ul>
              <li>
                <strong>RC Pro standard</strong> : 1-2M€ plafond (vs 500k€ AE), couvre activité
                société
              </li>
              <li>
                <strong>RC Mandataire Social (RCMS) optionnelle</strong> : couvre le président SASU
                contre actions personnelles (faute de gestion, abus pouvoir). +250-800€/an.
                Recommandé pour SASU &gt; 100k€ CA.
              </li>
              <li>
                <strong>Cyber-assurance combinée</strong> : recommandée si activité IT/digital,
                données client. +200-1 500€/an.
              </li>
              <li>
                <strong>Protection juridique</strong> : litiges clients, fournisseurs,
                prud&apos;hommes. +60-150€/an.
              </li>
              <li>
                <strong>Multirisque pro</strong> : si local commercial ou stockage matériel.
              </li>
              <li>
                <strong>Prévoyance dirigeant</strong> : invalidité, décès président (non couvert par
                RC Pro).
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs RC Pro SASU par activité',
          body: (
            <ul>
              <li>
                <strong>SASU services intellectuels (consultant, IT, marketing)</strong> CA &lt;
                80k€ : 350-550€/an
              </li>
              <li>
                <strong>SASU services intellectuels CA 80-300k€</strong> : 550-1 000€/an
              </li>
              <li>
                <strong>SASU agence web/communication</strong> : 600-1 200€/an
              </li>
              <li>
                <strong>SASU e-commerce / marketplace</strong> : 800-1 800€/an (risque produits)
              </li>
              <li>
                <strong>SASU formation/coaching</strong> : 450-900€/an
              </li>
              <li>
                <strong>SASU BTP (en complément décennale)</strong> : 600-1 500€/an
              </li>
              <li>
                <strong>SASU professions libérales</strong> (avocat, expert) : 1 000-5 000€/an+
                (selon spé)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'SASU doit-elle absolument avoir une RC Pro ?',
          a: 'Légalement, obligatoire uniquement pour professions réglementées (médical, juridique, immobilier, BTP). Pour SASU services classiques : pas obligatoire mais FORTEMENT recommandée. Sans RC Pro, la responsabilité limitée de la SASU ne protège pas en cas de faute de gestion du président (patrimoine perso engagé).',
        },
        {
          q: 'Quelle différence entre RC Pro et RC Mandataire Social SASU ?',
          a: 'RC Pro = couvre les dommages causés à des tiers (clients) dans l&apos;exercice de l&apos;activité de la SASU. RC Mandataire Social (RCMS) = couvre le président personnellement contre actions en responsabilité (faute de gestion, abus de pouvoir, défaut surveillance).',
        },
        {
          q: 'Combien coûte une RC Pro pour SASU débutante ?',
          a: 'SASU consultant services intellectuels (CA prévisionnel &lt; 100k€) : 350-550€/an chez Hiscox, Stello ou Allianz Pro. Plafond standard 1-2M€. Ajouter RC Mandataire Social : +250-500€/an.',
        },
        {
          q: 'SASU vs AE : impact sur la RC Pro ?',
          a: 'Pour activité identique, RC Pro SASU est 2-3x plus chère que AE (350-500€ vs 95-220€) car plafonds plus élevés + personne morale. MAIS responsabilité limitée SASU = avantage majeur en cas de gros sinistre (patrimoine perso protégé).',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
        { name: 'RC Pro consultant', slug: 'rc-pro-consultant' },
        { name: 'Assurance SASU (vue spécifique)', slug: 'assurance-sasu' },
        { name: 'Assurance dirigeant homme-clé', slug: 'assurance-homme-cle' },
      ]}
    />
  )
}
