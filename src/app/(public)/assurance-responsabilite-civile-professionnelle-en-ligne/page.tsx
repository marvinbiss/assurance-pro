/**
 * Souscription — "assurance responsabilité civile professionnelle en ligne" (250 vol, KD 31, CPC 600€)
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
const SLUG = 'assurance-responsabilite-civile-professionnelle-en-ligne'
const TITLE = 'Assurance Responsabilité Civile Professionnelle En Ligne'
const TAGLINE =
  'Souscrire assurance responsabilité civile professionnelle 100% en ligne. 5 assureurs comparés (Hiscox, Stello, Allianz, MMA, AXA). 5 min, attestation immédiate.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance responsabilité civile professionnelle en ligne : comparateur 5 assureurs + souscription 5 min + attestation immédiate. AE 95€/an, SAS 1800€/an.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Souscrire votre assurance responsabilité civile professionnelle (RC Pro) 100% en ligne — variante longue formelle du KW. Cette page propose un parcours digital complet pour AE, freelance, SARL, SAS : comparateur 5 assureurs leaders, souscription en 5 min, attestation téléchargeable immédiate. Adapté tous secteurs : services intellectuels, BTP, libéral, immobilier, mobilité, e-commerce."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '💼',
          title: 'Tous secteurs couverts',
          desc: 'Services, BTP, libéral, immobilier, mobilité, e-commerce',
        },
        {
          icon: '🆚',
          title: 'Comparateur 5 assureurs',
          desc: 'Hiscox, Stello, Allianz Pro, MMA Pro, AXA Pro en parallèle',
        },
        {
          icon: '⚡',
          title: 'Parcours 5 min',
          desc: 'Devis + comparaison + souscription + attestation',
        },
        { icon: '🛡️', title: 'Plafond 1-10M€', desc: 'Adapté AE (1M€) à SAS PME complexe (10M€)' },
      ]}
      sections={[
        {
          h2: 'Assureurs présents en ligne par secteur',
          body: (
            <ul>
              <li>
                <strong>Services intellectuels</strong> (IT, conseil, design) : Hiscox 🥇, Stello
                🥈, Allianz Pro
              </li>
              <li>
                <strong>BTP</strong> (artisans, PME) : April Pro 🥇, SMABTP, Allianz Pro BTP
              </li>
              <li>
                <strong>Libéral réglementé</strong> (avocat, expert-comptable, médical) : Allianz
                Pro, AXA Pro, MAF (architectes), MACSF (santé)
              </li>
              <li>
                <strong>Immobilier</strong> (agent, syndic) : Galian Pro, CGI Pro, MMA Pro
              </li>
              <li>
                <strong>Mobilité</strong> (VTC, taxi, livreur) : Wakam 🥇, Stello (2-en-1)
              </li>
              <li>
                <strong>E-commerce</strong> : Hiscox, Allianz Pro, Generali Pro
              </li>
            </ul>
          ),
        },
        {
          h2: 'Garanties standard incluses',
          body: (
            <ul>
              <li>
                <strong>Dommages corporels causés à tiers</strong> : par activité ou par préposé
              </li>
              <li>
                <strong>Dommages matériels</strong> : sur biens d&apos;autrui pendant prestation
              </li>
              <li>
                <strong>Dommages immatériels</strong> : conséquences (manque à gagner, perte
                d&apos;exploitation client)
              </li>
              <li>
                <strong>Faute professionnelle</strong> : erreur de conseil, manquement obligations
                contractuelles
              </li>
              <li>
                <strong>Frais de défense pénale</strong> : avocats, expertises, procédure judiciaire
              </li>
              <li>
                <strong>Postériorité</strong> : 5 ans standard (10 ans Hiscox unique sur marché)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Options à ajouter selon votre métier',
          body: (
            <ul>
              <li>
                <strong>Cyber-assurance</strong> (+15-30%) : ESSENTIEL pour IT, e-commerce, services
                digitaux. Couvre ransomware, fuite données, frais CNIL.
              </li>
              <li>
                <strong>Protection juridique</strong> (+5%) : recommandée pour litiges B2B fréquents
              </li>
              <li>
                <strong>Dommages aux biens loués</strong> (+20%) : coworking, bureaux partagés,
                locaux loués
              </li>
              <li>
                <strong>Perte d&apos;exploitation</strong> (+20-30%) : pour activités à dépendance
                forte locaux
              </li>
              <li>
                <strong>Extension internationale</strong> (+25-40%) : UE seul ou monde entier (sauf
                USA/Canada parfois exclu)
              </li>
              <li>
                <strong>Décennale</strong> : OBLIGATOIRE BTP (Loi Spinetta art. 1792 C. civ.)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro obligatoire pour mon activité ?',
          a: 'Légalement obligatoire pour : BTP (décennale), libéral réglementé (avocat, expert-comptable, médecin, architecte, notaire), immobilier (loi Hoguet), VTC (décret 2014-371), formateur agréé. Fortement recommandée pour tous autres (responsabilité civile contractuelle existe sans contrat).',
        },
        {
          q: 'En ligne possible pour tous statuts ?',
          a: 'OUI pour AE/EURL/SARL/SAS jusqu&apos;à environ 5 000€/an de prime. Au-delà (SAS PME complexes, libéral réglementé multi-spécialités), parcours hybride recommandé : devis en ligne + finalisation conseiller téléphone/visio.',
        },
        {
          q: 'Quels documents fournir en ligne ?',
          a: 'SIRET (obligatoire), Kbis ou ACOSS attestation (AE), RIB (prélèvement), pièce identité dirigeant. Cas particuliers : diplôme/agrément ordre professionnel (avocat, médecin), attestations expérience BTP (10 ans pour décennale).',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro en ligne (variante courte)', slug: 'rc-pro-en-ligne' },
        { name: 'Assurance RC Pro en ligne', slug: 'assurance-rc-pro-en-ligne' },
        { name: 'Souscrire RC Pro en ligne', slug: 'souscrire-rc-pro-en-ligne' },
        { name: 'RC Pro souscription en ligne', slug: 'rc-pro-souscription-en-ligne' },
        { name: 'Devis RC Pro en ligne', slug: 'devis/rc-pro-en-ligne' },
      ]}
    />
  )
}
