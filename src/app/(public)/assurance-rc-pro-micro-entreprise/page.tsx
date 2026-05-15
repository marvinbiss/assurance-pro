/**
 * Auto-entrepreneur — "assurance rc pro micro entreprise" (300 vol, KD 6, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-rc-pro-micro-entreprise'
const TITLE = 'Assurance RC Pro Micro Entreprise — Statuts AE/EI/EURL, tarifs 2026'
const TAGLINE =
  'La RC Pro micro-entreprise couvre 3 statuts : AE, EI (ex-régime micro), EURL micro. Spécificités et tarifs 95-450€/an selon profil.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro micro-entreprise : AE, EI, EURL régime micro. Tarifs 95-450€/an. Plafond 1M€ standard. Hiscox best price services, April Pro BTP, Allianz multi-secteurs.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La micro-entreprise regroupe en réalité 3 statuts différents : 1) Auto-entrepreneur (AE) — le plus connu, 2) Entreprise Individuelle (EI) en régime micro, 3) EURL en option régime micro (rare). La RC Pro est identique fiscalement pour ces 3 statuts (déductibilité possible si Madelin TNS). Cette page clarifie les distinctions, détaille les tarifs et oriente vers les meilleurs assureurs selon activité."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + art. 50-0 CGI (régime micro)"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '📋',
          title: '3 statuts micro couverts',
          desc: 'AE • EI (régime micro) • EURL micro',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1M€ standard',
          desc: 'Suffisant pour CA &lt; 80k€ services / 200k€ vente',
        },
        {
          icon: '💰',
          title: '95-450€/an',
          desc: 'Services 95-220€ • Esthétique 180-350€ • BTP 250-450€',
        },
        {
          icon: '💼',
          title: 'Déductible Madelin TNS',
          desc: 'Cotisations RC Pro déductibles du résultat imposable (artisans/EI)',
        },
      ]}
      sections={[
        {
          h2: 'Distinction des 3 statuts micro',
          body: (
            <ul>
              <li>
                <strong>Auto-entrepreneur (AE)</strong> : statut le plus populaire depuis 2009.
                Régime fiscal et social simplifié. Plafond CA : 77 700€ services / 188 700€ vente
                (2024). Statut TNS.
              </li>
              <li>
                <strong>Entreprise Individuelle (EI) en régime micro</strong> : option régime micro
                disponible si CA &lt; plafond. Différence avec AE : pas de protection patrimoine
                personnel (depuis Loi Madelin 2022, séparation patrimoine pro/perso améliorée).
              </li>
              <li>
                <strong>EURL en régime micro</strong> : rare. EURL est généralement au régime réel.
                Option micro possible si CA &lt; plafond. Gérant TNS si majoritaire.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs RC Pro micro-entreprise 2026',
          body: (
            <ul>
              <li>
                <strong>Services intellectuels</strong> (consultant, IT, designer, photographe,
                marketing) : 95-220€/an
              </li>
              <li>
                <strong>Services à la personne</strong> (ménage, jardinage, garde enfants) :
                180-300€/an
              </li>
              <li>
                <strong>Esthétique / coiffure à domicile</strong> : 180-350€/an
              </li>
              <li>
                <strong>Coaching / formation</strong> : 150-300€/an
              </li>
              <li>
                <strong>Coach sportif / yoga</strong> : 200-400€/an
              </li>
              <li>
                <strong>BTP (en complément décennale)</strong> : 250-450€/an
              </li>
              <li>
                <strong>E-commerce / dropshipping</strong> : 200-450€/an
              </li>
              <li>
                <strong>Restauration ambulante</strong> (food truck, traiteur) : 350-700€/an
              </li>
              <li>
                <strong>Médical / paramédical</strong> : 800-2 500€/an (réglementaire)
              </li>
              <li>
                <strong>VTC / taxi</strong> : 280-650€/an (décret 2014-371)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Avantages fiscaux RC Pro micro TNS',
          body: (
            <ul>
              <li>
                <strong>Déductibilité Madelin</strong> (art. 154 bis CGI) : cotisations RC Pro
                déductibles du résultat imposable pour AE/EI artisans en TNS
              </li>
              <li>
                <strong>Économie fiscale typique</strong> : -22-45% du montant de la prime selon
                tranche marginale d&apos;imposition
              </li>
              <li>
                <strong>Exemple</strong> : prime 220€/an × tranche 30% TMI = économie fiscale 66€/an
              </li>
              <li>
                <strong>Conditions</strong> : statut TNS confirmé + déclaration au régime réel ou
                simplifié (pas en versement libératoire)
              </li>
              <li>
                <strong>Plafonds Madelin</strong> : déductions plafonnées (à vérifier avec votre
                comptable)
              </li>
              <li>
                <strong>Cumul possible</strong> : RC Pro + Mutuelle TNS + Prévoyance TNS déductibles
                ensemble (dans limites)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'AE et micro-entreprise : différence pour la RC Pro ?',
          a: 'Aucune différence — AE et micro-entreprise désignent le MÊME statut depuis 2016 (fusion régimes). Les assureurs traitent identiquement. Tarifs strictement identiques.',
        },
        {
          q: 'Quelle RC Pro la moins chère micro-entreprise services ?',
          a: 'Hiscox = best price global services intellectuels (95-220€/an) + postériorité 10 ans (unique). Stello = challenger digital pure (90-200€/an). Allianz Pro pour couverture multi-secteurs (180-380€/an).',
        },
        {
          q: 'RC Pro micro-entreprise déductible des impôts ?',
          a: 'OUI pour artisans / EI en TNS au régime réel ou simplifié (déductible Madelin art. 154 bis CGI). NON pour AE en versement libératoire (régime simplifié forfaitaire). Économie fiscale 22-45% du montant prime selon TMI.',
        },
        {
          q: 'Plafond CA RC Pro micro-entreprise ?',
          a: "Le plafond du REGIME MICRO (fiscal) est 77 700€ services / 188 700€ vente. AU-DELÀ : passage au régime réel obligatoire mais l'AE/EI reste possible. La RC Pro elle n'a pas de plafond CA — vous pouvez avoir une RC Pro à n'importe quel CA, tarif ajusté selon CA déclaré.",
        },
      ]}
      relatedMetiers={[
        {
          name: 'RC Pro Auto-Entrepreneur (vue globale)',
          slug: 'responsabilite-civile-professionnelle-auto-entrepreneur',
        },
        {
          name: 'Assurance RC Pro Auto-Entrepreneur (souscription)',
          slug: 'assurance-rc-pro-auto-entrepreneur',
        },
        { name: 'RC Pro micro-entreprise (variante)', slug: 'rc-pro-micro-entreprise' },
        { name: 'Assurance micro-entreprise', slug: 'assurance-micro-entreprise' },
        { name: 'Mutuelle TNS', slug: 'mutuelle-tns' },
      ]}
    />
  )
}
