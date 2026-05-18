/**
 * Pilier — "assurance rc pro" (TIER A — 3 000 vol/mois, KD 19, CPC 600€) — MONEY KW
 * Variation high-intent du pilier /rc-pro existant.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-rc-pro'
const TITLE = 'Assurance RC Pro 2026 — Tarifs, garanties et comparatif'
const TAGLINE =
  "L'assurance Responsabilité Civile Professionnelle couvre les dommages causés à vos clients dans l'exercice de votre activité. Obligation légale pour 70+ professions, fortement recommandée pour toutes."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance RC Pro : tarif à partir de 95€ par an (auto-entrepreneur), 180€ par an (SARL). Couverture dommages corporels, matériels, immatériels. Comparatif Hiscox, Allianz, AXA, MMA. Devis gratuit en 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance Responsabilité Civile Professionnelle (RC Pro) est le contrat qui prend en charge les conséquences financières des dommages causés à des tiers (clients, fournisseurs, public) dans le cadre de votre activité professionnelle. Elle couvre les dommages corporels (blessure d'un client), matériels (casse d'équipement chez le client) et immatériels (perte d'exploitation, erreur de conseil). Obligatoire pour 70+ professions réglementées (médecins, avocats, agents immobiliers, experts-comptables, BTP en complément de la décennale) et fortement recommandée pour toutes les autres."
      legalReference="art. L. 124-3 et L. 121-2 Code des assurances"
      benefits={[
        {
          icon: '🛡️',
          title: 'Dommages tiers',
          desc: 'Corporels + matériels + immatériels jusqu&apos;à 5M€ par sinistre',
        },
        {
          icon: '⚖️',
          title: 'Défense pénale',
          desc: 'Avocat pris en charge en cas de litige avec un client',
        },
        {
          icon: '💰',
          title: 'À partir de 95€ par an',
          desc: 'Tarif auto-entrepreneur freelance services. SARL ou SAS : 180€+ par an',
        },
        {
          icon: '⚡',
          title: 'Attestation immédiate',
          desc: 'Téléchargeable après souscription en ligne (5 min)',
        },
      ]}
      sections={[
        {
          h2: 'Qui doit souscrire une assurance RC Pro ?',
          body: (
            <>
              <p>
                <strong>Professions où la RC Pro est obligatoire</strong> (liste non exhaustive —
                vérifier sur Légifrance) :
              </p>
              <ul>
                <li>
                  Professions médicales et paramédicales (médecin, infirmier, kiné, ostéopathe)
                </li>
                <li>
                  Professions juridiques (avocat, notaire, huissier, expert-comptable, commissaire
                  aux comptes)
                </li>
                <li>Agents immobiliers (loi Hoguet)</li>
                <li>Professions du bâtiment (en complément de la décennale Loi Spinetta)</li>
                <li>Auto-écoles, ambulanciers, taxis, VTC</li>
                <li>Conseillers en investissements financiers (CIF)</li>
              </ul>
              <p>
                <strong>Professions où la RC Pro est fortement recommandée</strong> (non obligatoire
                mais cruciale) : consultants, freelances IT, agences web, photographes, coachs,
                formateurs, prestataires de services, e-commerce, restaurateurs, commerçants.
              </p>
            </>
          ),
        },
        {
          h2: 'Que couvre concrètement la RC Pro ?',
          body: (
            <>
              <ul>
                <li>
                  <strong>Dommages corporels</strong> : votre client se blesse en glissant sur le
                  sol mouillé après votre prestation de ménage → indemnisation des frais médicaux +
                  arrêt de travail + préjudice moral.
                </li>
                <li>
                  <strong>Dommages matériels</strong> : votre stagiaire renverse un café sur le
                  MacBook Pro du client lors d&apos;une formation → remplacement du matériel.
                </li>
                <li>
                  <strong>Dommages immatériels</strong> : votre erreur de conseil financier fait
                  perdre 50 000€ à votre client → indemnisation de la perte financière + frais de
                  défense.
                </li>
                <li>
                  <strong>Frais de défense pénale</strong> : si un client vous poursuit pour faute
                  professionnelle, l&apos;assureur prend en charge votre avocat.
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Tarifs RC Pro 2026 par statut et activité',
          body: (
            <>
              <p>
                Fourchettes de prix marché agrégées (données propriétaires + Hiscox + Allianz) :
              </p>
              <ul>
                <li>
                  <strong>Auto-entrepreneur services intellectuels</strong> (consultant, freelance
                  IT) : 95-180€ par an
                </li>
                <li>
                  <strong>Auto-entrepreneur services à la personne</strong> (coach, formateur) :
                  120-250€ par an
                </li>
                <li>
                  <strong>Auto-entrepreneur BTP</strong> (en complément décennale) : 250-450€ par an
                </li>
                <li>
                  <strong>SARL ou SAS PME services</strong> : 350-900€ par an
                </li>
                <li>
                  <strong>Profession réglementée</strong> (médecin, avocat) : 500-2 500€ par an
                </li>
                <li>
                  <strong>Activité à risque</strong> (cyber, financier, médical spécialisé) : 1
                  000-15 000€ par an
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La RC Pro est-elle obligatoire pour un auto-entrepreneur ?',
          a: 'Cela dépend de votre activité. Obligatoire pour les professions réglementées (médical, juridique, immobilier, BTP). Recommandée pour toutes les autres activités B2B où votre conseil ou prestation peut causer un préjudice client.',
        },
        {
          q: 'Quelle différence entre RC Pro et RC Exploitation ?',
          a: "La RC Exploitation couvre les dommages causés en dehors de l'exécution du contrat (ex : un client glisse dans votre boutique). La RC Pro couvre les dommages liés à votre prestation elle-même (ex : erreur de conseil, malfaçon). Les deux sont souvent combinées dans une Multirisque Pro.",
        },
        {
          q: 'Que se passe-t-il si je n&apos;ai pas de RC Pro et qu&apos;un client me poursuit ?',
          a: 'Vous payez sur vos fonds personnels. Pour une SARL ou SAS, le patrimoine personnel du dirigeant peut être engagé en cas de faute de gestion. Un sinistre RC Pro coûte en moyenne 30 000-80 000€ — vs une prime annuelle de 100-500€.',
        },
        {
          q: 'Comment obtenir une attestation RC Pro rapidement ?',
          a: "Après souscription en ligne, l'attestation est téléchargeable immédiatement (< 5 minutes). Notre courtier partenaire ORIAS la délivre sous 24h ouvrées maximum après finalisation du dossier.",
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro auto-entrepreneur', slug: 'rc-pro/auto-entrepreneur' },
        { name: 'RC Pro consultant IT', slug: 'rc-pro/informatique' },
        { name: 'RC Pro avocat', slug: 'rc-pro-avocat' },
        { name: 'RC Pro médecin', slug: 'rc-pro-medecin' },
        { name: 'RC Pro VTC', slug: 'rc-pro/vtc' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
