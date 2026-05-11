import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Conditions Générales de Service | Assurance Pro',
  description:
    'Conditions générales de service du cabinet de courtage ORIAS Assurance Pro. Périmètre, rémunération, responsabilité, conformité ACPR.',
  alternates: { canonical: `${SITE_URL}/cgv` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Conditions Générales de Service | Assurance Pro',
    description:
      'Conditions générales de service du cabinet de courtage ORIAS Assurance Pro. Périmètre, rémunération, responsabilité, conformité ACPR.',
    url: `${SITE_URL}/cgv`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conditions Générales de Service | Assurance Pro',
    description:
      'Conditions générales de service du cabinet de courtage ORIAS Assurance Pro. Périmètre, rémunération, responsabilité, conformité ACPR.',
  },
}

export default function CgvPage() {
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="prose prose-lg container mx-auto max-w-3xl px-4">
        <h1>Conditions Générales de Service</h1>
        <p className="text-sm text-gray-500">Dernière mise à jour : 30 avril 2026</p>

        <h2>1. Présentation du cabinet</h2>
        <p>
          Assurance Pro est un cabinet de courtage en assurance immatriculé à l\'ORIAS sous le
          numéro {process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX'} (catégorie : Courtier en
          Assurance, type b), consultable sur{' '}
          <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer">
            www.orias.fr
          </a>
          .
        </p>
        <p>
          Le cabinet est soumis au contrôle de l\'Autorité de Contrôle Prudentiel et de Résolution
          (ACPR), 4 Place de Budapest, CS 92459, 75436 PARIS CEDEX 09.
        </p>

        <h2>2. Périmètre de l\'activité</h2>
        <p>
          Notre cabinet a pour activité l\'intermédiation en assurance professionnelle (courtage).
          Nous proposons la distribution de contrats d\'assurance souscrits auprès de nos compagnies
          d\'assurance partenaires, dans les domaines suivants :
        </p>
        <ul>
          <li>Garantie décennale BTP</li>
          <li>Responsabilité Civile Professionnelle (RC Pro)</li>
          <li>Multirisque professionnelle</li>
          <li>Mutuelle santé pro / TNS Madelin</li>
          <li>Prévoyance dirigeant / TNS</li>
          <li>Cyber assurance</li>
          <li>Flotte automobile professionnelle</li>
          <li>Tous risques chantier (TRC)</li>
          <li>Dommages-ouvrage</li>
        </ul>

        <h2>3. Rémunération du courtier</h2>
        <p>
          Conformément à l\'article L. 521-2 du Code des assurances (DDA), notre cabinet est
          rémunéré exclusivement par les commissions versées par les compagnies d\'assurance
          partenaires lors de la souscription et tout au long de la durée du contrat.
        </p>
        <p>
          <strong>Aucun frais de courtage n\'est facturé à nos clients.</strong> Le détail de la
          rémunération peut être communiqué sur simple demande écrite avant souscription.
        </p>

        <h2>4. Devoir de conseil (DDA)</h2>
        <p>
          Conformément aux articles L. 521-1 et suivants du Code des assurances (Directive
          Distribution Assurance), notre cabinet :
        </p>
        <ul>
          <li>Recueille vos exigences et besoins via un questionnaire adapté</li>
          <li>Identifie les garanties indispensables à votre profil</li>
          <li>Formule par écrit une recommandation personnalisée motivée</li>
          <li>Documente la traçabilité du conseil (Recommandation ACPR 2024-R-03)</li>
        </ul>

        <h2>5. Indépendance et impartialité</h2>
        <p>
          Notre cabinet est <strong>indépendant</strong> et n\'a aucun lien capitalistique avec les
          compagnies d\'assurance distribuées. Nous n\'avons d\'obligation contractuelle de
          placement avec aucune compagnie en particulier. Notre analyse est fondée sur l\'intérêt du
          client.
        </p>

        <h2>6. Réclamations</h2>
        <p>
          Toute réclamation peut être adressée à{' '}
          <a href="mailto:reclamations@vivos-assurance.fr">reclamations@vivos-assurance.fr</a>.
          Conformément à la Recommandation ACPR 2024-R-02 (applicable au 31/12/2025), nous nous
          engageons à :
        </p>
        <ul>
          <li>Accuser réception de toute réclamation sous 10 jours ouvrés</li>
          <li>Répondre sur le fond sous 2 mois maximum</li>
          <li>Tenir un registre des réclamations</li>
        </ul>
        <p>
          En cas de désaccord persistant, vous pouvez saisir{' '}
          <strong>le Médiateur de l\'Assurance</strong> : TSA 50110, 75441 Paris cedex 09 —{' '}
          <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener noreferrer">
            www.mediation-assurance.org
          </a>
          .
        </p>

        <h2>7. Garantie financière et RCP</h2>
        <p>
          Notre cabinet dispose d\'une <strong>Garantie Financière</strong> et d\'une{' '}
          <strong>Responsabilité Civile Professionnelle</strong> conformes aux articles L. 512-6 et
          L. 512-7 du Code des assurances. Plafond minimum : 1 850 000 € par sinistre / 2 500 000 €
          par année. Notre couverture effective est de 5 M€/7,5 M€.
        </p>

        <h2>8. Protection des données personnelles (RGPD)</h2>
        <p>
          Voir notre <a href="/confidentialite">Politique de confidentialité</a> détaillée.
        </p>

        <h2>9. Droit applicable</h2>
        <p>
          Les présentes Conditions Générales de Service sont régies par le droit français. Tout
          litige relatif à leur exécution relève de la compétence des tribunaux français, après
          tentative de conciliation amiable et saisine du Médiateur de l\'Assurance.
        </p>

        <h2>10. Adhésion à une association agréée</h2>
        <p>
          Notre cabinet est membre de la{' '}
          <strong>Chambre Syndicale des Courtiers d\'Assurances (CSCA)</strong>, association
          professionnelle agréée au titre de l\'article L. 513-3 du Code des assurances.
        </p>
      </div>
    </main>
  )
}
