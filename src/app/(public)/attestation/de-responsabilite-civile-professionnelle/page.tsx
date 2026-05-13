/**
 * Attestation — "attestation de responsabilité civile professionnelle" (300 vol, KD 4, CPC 400€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'attestation/de-responsabilite-civile-professionnelle'
const TITLE = 'Attestation de Responsabilité Civile Professionnelle — Obtenir + utiliser'
const TAGLINE =
  "Tout savoir sur l'attestation de RC Pro : à quoi sert, qui doit la fournir, valeur juridique, validité et démarches d'obtention rapide."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Attestation de RC Pro : valeur juridique, durée validité 1 an, démarches obtention 24h. Délivrée par assureur agréé ACPR. À présenter clients B2B + Ordres.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'attestation de Responsabilité Civile Professionnelle est le document délivré par votre assureur qui sert de preuve officielle de votre couverture RC Pro auprès des tiers (clients, administration, partenaires). Elle a une valeur juridique de présomption de garantie (sans valoir contrat) et doit être renouvelée chaque année. Cette page détaille la valeur juridique exacte, les durées de validité, les obligations de fourniture et les démarches d'obtention."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + Code de la consommation"
      benefits={[
        {
          icon: '⚖️',
          title: 'Valeur juridique',
          desc: 'Présomption de garantie en cours de validité (opposable aux tiers)',
        },
        {
          icon: '⏰',
          title: 'Validité 1 an',
          desc: 'Renouvelée automatiquement à date anniversaire contrat',
        },
        {
          icon: '📋',
          title: 'Délivrance assureur',
          desc: 'Document officiel — pas de modèle libre à reproduire',
        },
        {
          icon: '🤝',
          title: 'Multi-bénéficiaires',
          desc: 'Clients B2B, Ordres, administration, donneurs d&apos;ordre',
        },
      ]}
      sections={[
        {
          h2: "À quoi sert l'attestation de RC Pro",
          body: (
            <ul>
              <li>
                <strong>Prouver votre couverture à un client B2B</strong> avant signature contrat
              </li>
              <li>
                <strong>Justifier conformité réglementaire</strong> auprès des Ordres professionnels
                (avocat, médecin, architecte, expert-comptable)
              </li>
              <li>
                <strong>Renouveler une carte professionnelle</strong> : Carte T agent immobilier
                (CCI), Carte VTC (préfecture)
              </li>
              <li>
                <strong>Candidater à des appels d&apos;offres</strong> publics ou privés
              </li>
              <li>
                <strong>Conventions de courtage</strong> avec partenaires distributeurs
              </li>
              <li>
                <strong>Cession ou vente d&apos;entreprise</strong> : preuve patrimoine immatériel +
                couverture risques
              </li>
              <li>
                <strong>Souscription crédit pro</strong> auprès banque (parfois exigée)
              </li>
              <li>
                <strong>Contrôle ACPR</strong> ou administration fiscale (preuve respect
                obligations)
              </li>
            </ul>
          ),
        },
        {
          h2: "Valeur juridique de l'attestation",
          body: (
            <>
              <p>
                L&apos;attestation de RC Pro est une <strong>preuve de souscription</strong> en
                cours de validité. Précisions juridiques :
              </p>
              <ul>
                <li>
                  <strong>Présomption simple</strong> : l&apos;attestation atteste de la
                  souscription, mais ne remplace PAS le contrat (conditions générales +
                  particulières)
                </li>
                <li>
                  <strong>Opposable aux tiers</strong> : peut être présentée aux clients, Ordres,
                  administration comme preuve officielle
                </li>
                <li>
                  <strong>Mentionne l&apos;activité couverte</strong> : si votre activité réelle
                  dépasse la nomenclature déclarée, exclusion possible en cas de sinistre
                </li>
                <li>
                  <strong>Date d&apos;effet et d&apos;échéance</strong> : un sinistre survenu après
                  l&apos;échéance n&apos;est pas couvert (même si attestation pas encore renouvelée)
                </li>
                <li>
                  <strong>Faux-attestation</strong> : exercice illégal (falsification + usage faux).
                  Sanctions pénales 3 ans prison + 45 000€.
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Procédure de demande et délais',
          body: (
            <ol>
              <li>
                <strong>Connexion espace adhérent</strong> assureur avec identifiants (numéro
                contrat + mot de passe)
              </li>
              <li>
                <strong>Onglet &quot;Documents&quot; / &quot;Attestations&quot;</strong>
              </li>
              <li>
                <strong>Téléchargement PDF</strong> immédiat (Hiscox, Stello, Allianz Pro)
              </li>
              <li>
                <strong>Délais autres assureurs</strong> : 24-72h ouvrées si pas téléchargement
                direct
              </li>
              <li>
                <strong>Demande par email</strong> à votre conseiller si urgence
              </li>
              <li>
                <strong>Demande téléphone</strong> au service client (réponse 24-48h)
              </li>
              <li>
                <strong>Réception</strong> : email + téléchargement espace + envoi postal possible
                (sur demande)
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: 'Mon assureur peut-il refuser de me donner une attestation ?',
          a: "Non. L'attestation est un document obligatoire que l'assureur doit délivrer dès souscription (Code des assurances). Refus = manquement contractuel. Si refus injustifié : saisir Médiateur de l'Assurance (gratuit, saisine en ligne).",
        },
        {
          q: 'Combien de temps est valable une attestation de RC Pro ?',
          a: '1 an à compter de la date d&apos;effet du contrat. Renouvelée automatiquement chaque année à l&apos;anniversaire. Si paiement échu : suspension contrat — attestation invalide (vérifier statut sur espace adhérent).',
        },
        {
          q: 'Différence entre attestation, contrat et IPID ?',
          a: "Attestation = preuve courte de souscription. Contrat = document juridique complet (CG + CP). IPID = Information sur le Produit d'Assurance (document standardisé européen synthétisant garanties principales). Les 3 sont délivrés à la souscription.",
        },
        {
          q: 'Peut-on présenter une attestation périmée ?',
          a: "Non, l'attestation périmée n'a aucune valeur. Un client refusera de signer avec une attestation périmée. Renouveler chaque année avant échéance. Renouvellement automatique chez la plupart des assureurs (à vérifier).",
        },
      ]}
      relatedMetiers={[
        {
          name: 'Attestation RC Pro (vue globale)',
          slug: 'attestation/responsabilite-civile-professionnelle',
        },
        { name: 'Attestation RC Pro', slug: 'attestation/rc-pro' },
        { name: 'Attestation décennale', slug: 'attestation/decennale' },
        { name: 'Assurance RC Pro', slug: 'assurance-rc-pro' },
        { name: 'Devis RC Pro', slug: 'devis/rc-pro' },
      ]}
    />
  )
}
