/**
 * Devis — "devis rc pro en ligne" (200 vol, KD 0, CPC 500€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'devis/rc-pro-en-ligne'
const TITLE = 'Devis RC Pro En Ligne — 100% digital, attestation immédiate'
const TAGLINE =
  'Devis RC Pro 100% en ligne en 5 min. Hiscox + Stello en pure digital. Attestation téléchargeable immédiatement après paiement. Sans rendez-vous.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Devis RC Pro en ligne 100% digital. Hiscox 95€/an + Stello 90€/an best price. Souscription 5 min, attestation immédiate. Sans rendez-vous physique.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Souscrire votre RC Pro 100% en ligne en moins de 5 minutes : 2 assureurs digitaux purs proposent un parcours sans contact physique, sans rendez-vous, avec attestation téléchargeable immédiatement après paiement. Hiscox (leader services intellectuels) et Stello (challenger 100% digital) sont les leaders du segment en ligne. Cette page détaille le parcours digital pas à pas et compare les 2 offres."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '💻',
          title: '100% digital pure',
          desc: 'Pas de papier, pas de rendez-vous, pas d&apos;agent physique',
        },
        {
          icon: '⚡',
          title: '5 minutes',
          desc: 'Devis + souscription + paiement + attestation = 5 min total',
        },
        {
          icon: '📋',
          title: 'Attestation immédiate',
          desc: 'Téléchargeable dans espace adhérent après paiement',
        },
        {
          icon: '🌍',
          title: '24/7 accessible',
          desc: 'Souscription possible nuit, week-end, jours fériés',
        },
      ]}
      sections={[
        {
          h2: 'Hiscox vs Stello : les 2 leaders digital',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> : groupe britannique, présent France depuis 1993.
                Spécialiste services intellectuels (consultant, IT, designer). 100% digital pour
                AE/SASU. Postériorité 10 ans (unique marché). Solidité A+ S&amp;P. Tarif AE :
                95-220€/an.
              </li>
              <li>
                <strong>Stello</strong> : challenger français créé 2019. Spécialiste mobilités pro +
                freelance services. App mobile native. Contrat 2-en-1 auto+RC Pro pour VTC.
                Postériorité 5 ans. Solidité A-. Tarif AE : 90-200€/an.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Parcours souscription en ligne (5 minutes)',
          body: (
            <ol>
              <li>
                <strong>Étape 1 — Devis</strong> (2 min) : remplir activité, statut, CA
                prévisionnel, options
              </li>
              <li>
                <strong>Étape 2 — Comparaison offres</strong> (1 min) : plafond, franchise,
                postériorité affichés
              </li>
              <li>
                <strong>Étape 3 — Saisie infos</strong> (1 min) : SIRET, identité, ACOSS/Kbis, RIB
              </li>
              <li>
                <strong>Étape 4 — Paiement sécurisé</strong> (30 sec) : CB ou prélèvement,
                annuel/mensuel
              </li>
              <li>
                <strong>Étape 5 — Téléchargement attestation</strong> (immédiat) : PDF dans espace
                adhérent
              </li>
              <li>
                <strong>Étape 6 — Confirmation email</strong> avec contrat PDF + IPID
              </li>
            </ol>
          ),
        },
        {
          h2: 'Avantages souscription en ligne vs agence',
          body: (
            <ul>
              <li>
                <strong>Rapidité</strong> : 5 min vs 1-2 semaines avec agence (RDV + dossier +
                signature physique)
              </li>
              <li>
                <strong>Tarifs souvent plus bas</strong> : -10-15% car économies sur commissions
                agents physiques
              </li>
              <li>
                <strong>Accessibilité 24/7</strong> : souscription nuit, week-end, jours fériés
                possible
              </li>
              <li>
                <strong>Attestation immédiate</strong> vs 24-72h avec agence traditionnelle
              </li>
              <li>
                <strong>Gestion digitale</strong> : app mobile, déclaration sinistres en ligne,
                suivi temps réel
              </li>
              <li>
                <strong>Pas de pression commerciale</strong> : pas d&apos;agent vendeur, vous
                décidez librement
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quels assureurs proposent vraiment 100% en ligne ?',
          a: 'Hiscox et Stello sont les seuls 100% pure digital sur le segment AE/freelance services. Allianz Pro et MMA proposent en ligne mais finalisent souvent par téléphone. AXA Pro requiert souvent passage agence. April Pro BTP en ligne pour AE BTP.',
        },
        {
          q: 'Souscription en ligne aussi sûre qu&apos;en agence ?',
          a: 'OUI strictement. Mêmes garanties contractuelles, même valeur juridique attestation. Différence : pas d&apos;humain en face mais formulaire intelligent qui pose les bonnes questions. Solidité financière A+/A des assureurs identique online vs offline.',
        },
        {
          q: 'Délai attestation après paiement ?',
          a: 'Immédiat (téléchargement direct espace adhérent) chez Hiscox et Stello. Allianz Pro / MMA : 24h ouvrées en ligne. April Pro BTP : 24h ouvrées. AXA Pro : 48-72h.',
        },
        {
          q: 'Pour quel profil en ligne adapté ?',
          a: 'IDÉAL : AE/freelance services intellectuels (consultant, IT, designer), SASU services, VTC débutant. À ÉVITER : SAS PME avec besoins complexes (multi-corps BTP, profession libérale réglementée) où conseil humain ajoute de la valeur.',
        },
      ]}
      relatedMetiers={[
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'Stello RC Pro', slug: 'stello-rc-pro' },
        { name: 'Devis RC Pro', slug: 'devis/rc-pro' },
        { name: 'Devis assurance RC Pro', slug: 'devis/assurance-rc-pro' },
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
      ]}
    />
  )
}
