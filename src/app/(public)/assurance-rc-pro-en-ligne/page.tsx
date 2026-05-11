/**
 * Souscription — "assurance rc pro en ligne" (800 vol, KD 12, CPC 500€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-rc-pro-en-ligne'
const TITLE = 'Assurance RC Pro En Ligne — Souscription 5 min, attestation immédiate'
const TAGLINE =
  'Souscrire votre assurance RC Pro 100% en ligne en 5 min. Hiscox + Stello digital pure. Attestation téléchargeable immédiatement. Sans rendez-vous physique.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Assurance RC Pro en ligne 100% digital. Hiscox 95€/an + Stello 90€/an. Souscription 5 min, attestation immédiate. Sans rendez-vous.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Souscrire votre assurance RC Pro 100% en ligne en moins de 5 minutes : 2 assureurs digitaux purs proposent un parcours sans contact physique, sans rendez-vous, avec attestation téléchargeable immédiatement après paiement. Hiscox et Stello sont les leaders du segment en ligne pour AE/freelance. Cette page détaille le parcours pas à pas et compare les 2 offres."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      benefits={[
        {
          icon: '💻',
          title: '100% digital pure',
          desc: 'Aucun papier, aucun rendez-vous, aucun agent physique',
        },
        {
          icon: '⚡',
          title: 'Souscription 5 minutes',
          desc: 'Devis + souscription + paiement + attestation = 5 min',
        },
        {
          icon: '📋',
          title: 'Attestation immédiate',
          desc: 'Téléchargeable espace adhérent dès paiement validé',
        },
        {
          icon: '🌍',
          title: 'Accessible 24/7',
          desc: 'Souscription possible nuit, week-end, jours fériés',
        },
      ]}
      sections={[
        {
          h2: 'Top assureurs RC Pro en ligne 2026',
          body: (
            <ul>
              <li>
                <strong>Hiscox</strong> 🥇 : Britannique 30 ans présent France. Best AE services
                intellectuels (95-220€/an). Postériorité 10 ans incluse (unique). A+ S&amp;P.
                Plafond 1-10M€.
              </li>
              <li>
                <strong>Stello</strong> 🥈 : Challenger français 2019. 100% digital pure, app mobile
                native. AE 90-200€/an. Postériorité 5 ans. Contrat 2-en-1 VTC.
              </li>
              <li>
                <strong>April Pro BTP</strong> : Spécialiste BTP en ligne. AE BTP 250-450€/an RC +
                décennale combinée.
              </li>
              <li>
                <strong>Allianz Pro</strong> : En ligne mais finalisation téléphone fréquente.
                SARL/SAS 600-2 800€/an.
              </li>
              <li>
                <strong>Generali Pro</strong> : Programme Vitality digital. Multi-secteurs.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Parcours souscription 5 minutes',
          body: (
            <ol>
              <li>
                <strong>Étape 1 — Devis</strong> (2 min) : remplir activité, statut, CA
                prévisionnel, options souhaitées
              </li>
              <li>
                <strong>Étape 2 — Comparaison offres</strong> (1 min) : plafond, franchise,
                postériorité, options affichés
              </li>
              <li>
                <strong>Étape 3 — Saisie infos</strong> (1 min) : SIRET, identité, ACOSS/Kbis, RIB
                pour prélèvement
              </li>
              <li>
                <strong>Étape 4 — Paiement sécurisé</strong> (30 sec) : CB ou prélèvement, annuel ou
                mensualisation
              </li>
              <li>
                <strong>Étape 5 — Téléchargement attestation</strong> (immédiat) : PDF disponible
                dans espace adhérent
              </li>
              <li>
                <strong>Étape 6 — Email confirmation</strong> : contrat complet PDF + IPID +
                conditions générales
              </li>
            </ol>
          ),
        },
        {
          h2: 'Avantages en ligne vs agence traditionnelle',
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
                <strong>Accessibilité 24/7</strong> : nuit, week-end, jours fériés possible
              </li>
              <li>
                <strong>Attestation immédiate</strong> vs 24-72h avec agence
              </li>
              <li>
                <strong>Gestion digitale</strong> : app mobile, déclaration sinistres en ligne,
                suivi temps réel
              </li>
              <li>
                <strong>Pas de pression commerciale</strong> : pas d&apos;agent vendeur
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Souscription en ligne aussi sûre qu&apos;en agence ?',
          a: 'OUI strictement. Mêmes garanties contractuelles, même valeur juridique attestation. Différence : pas d&apos;humain en face mais formulaire intelligent qui pose les bonnes questions. Solidité financière A+/A des assureurs identique online vs offline.',
        },
        {
          q: 'Pour quel profil en ligne adapté ?',
          a: 'IDÉAL : AE/freelance services intellectuels (consultant, IT, designer), SASU services, VTC débutant. À ÉVITER : SAS PME avec besoins complexes (multi-corps BTP, profession libérale réglementée) où conseil humain ajoute de la valeur.',
        },
        {
          q: 'Délai attestation après paiement ?',
          a: 'Immédiat (téléchargement direct espace adhérent) chez Hiscox et Stello. Allianz Pro / MMA : 24h ouvrées en ligne. April Pro BTP : 24h ouvrées. AXA Pro : 48-72h.',
        },
        {
          q: 'Erreur saisie après souscription ?',
          a: 'Possibilité modification 14 jours (délai rétractation Loi Hamon). Espace adhérent ou support email. Modification SIRET / activité gratuite. Modification plafond/franchise = avenant tarifé.',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro en ligne (variante)', slug: 'rc-pro-en-ligne' },
        { name: 'Souscrire RC Pro en ligne', slug: 'souscrire-rc-pro-en-ligne' },
        { name: 'Devis RC Pro en ligne', slug: 'devis/rc-pro-en-ligne' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'Stello RC Pro', slug: 'stello-rc-pro' },
      ]}
    />
  )
}
