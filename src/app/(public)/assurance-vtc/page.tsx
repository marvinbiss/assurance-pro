import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Assurance VTC / Taxi — Tarifs négociés',
  description:
    'Comparez votre assurance VTC ou taxi auprès des spécialistes (Wakam, Hiscox, Stello). Auto-entrepreneur, SARL, plateformes Uber/Bolt. Devis en 2 min.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/assurance-vtc`,
  },
  openGraph: {
    title: 'Assurance VTC / Taxi — Tarifs négociés',
    description:
      'Comparez votre assurance VTC ou taxi auprès des spécialistes (Wakam, Hiscox, Stello). Auto-entrepreneur, SARL, plateformes Uber/Bolt. Devis en 2 min.',
    url: `${SITE_URL}/assurance-vtc`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assurance VTC / Taxi — Tarifs négociés',
    description:
      'Comparez votre assurance VTC ou taxi auprès des spécialistes (Wakam, Hiscox, Stello). Auto-entrepreneur, SARL, plateformes Uber/Bolt. Devis en 2 min.',
  },
}

export default function AssuranceVtcPage() {
  return (
    <PilierLayout
      slug="assurance-vtc"
      title="Assurance VTC / Taxi"
      tagline="L'assurance auto pro spécifique à votre activité de transport de personnes. Conforme aux exigences Uber, Bolt, Heetch et licence VTC."
      legalReference="art. L. 211-1 C. assur. + Loi Grandguillaume 2014"
      isObligatoire={true}
      intro="L'activité de chauffeur VTC ou taxi nécessite une assurance auto SPÉCIFIQUE qui couvre le transport rémunéré de personnes (l'assurance auto particulier ne suffit PAS). Notre cabinet ORIAS travaille avec les spécialistes du marché (Wakam, Hiscox, Stello, Allianz Pro) pour vous obtenir le meilleur tarif quel que soit votre statut (auto-entrepreneur, SARL, EI) ou votre plateforme (Uber, Bolt, Heetch, location avec chauffeur)."
      benefits={[
        { icon: '🚗', title: 'Conforme licence VTC', desc: 'Carte pro acceptée' },
        { icon: '📱', title: 'Compatible plateformes', desc: 'Uber, Bolt, Heetch' },
        { icon: '⚡', title: 'Attestation 24h', desc: 'Démarrage rapide' },
        { icon: '💰', title: 'Tarifs négociés', desc: "Jusqu'à -40% vs perso" },
      ]}
      sections={[
        {
          h2: 'Pourquoi une assurance VTC spécifique ?',
          body: (
            <>
              <p>
                Le transport rémunéré de personnes constitue une{' '}
                <strong>activité commerciale</strong> qui requiert une assurance "véhicule à motor
                utilisé à titre professionnel". L\'assurance auto particulier{' '}
                <strong>ne couvre PAS</strong> les passagers payants&nbsp;: en cas de sinistre,
                votre assureur refusera la prise en charge et vous resterez personnellement
                responsable.
              </p>
              <p>
                De plus, les plateformes (Uber, Bolt){' '}
                <strong>exigent une attestation d\'assurance VTC</strong>
                pour valider votre inscription. La préfecture vous demandera également cette
                attestation lors de la délivrance de votre carte pro VTC.
              </p>
            </>
          ),
        },
        {
          h2: 'Garanties indispensables',
          body: (
            <ul>
              <li>
                <strong>RC Circulation</strong>&nbsp;: obligatoire (dommages aux tiers)
              </li>
              <li>
                <strong>Garantie corporelle conducteur</strong>&nbsp;: vous-même en cas de blessure
              </li>
              <li>
                <strong>Vol / incendie</strong>&nbsp;: indispensable vu la valeur du véhicule
              </li>
              <li>
                <strong>Tous risques</strong>&nbsp;: recommandé pour véhicule récent (&lt;5 ans)
              </li>
              <li>
                <strong>Garantie passagers</strong>&nbsp;: étendue pour transport rémunéré
              </li>
              <li>
                <strong>Protection juridique</strong>&nbsp;: en cas de litige client/plateforme
              </li>
              <li>
                <strong>Indemnités journalières</strong> (option)&nbsp;: revenus en cas d\'arrêt
                forcé
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs indicatifs VTC 2026',
          body: (
            <table className="my-4 w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Profil</th>
                  <th className="border p-2 text-right">Berline standard</th>
                  <th className="border p-2 text-right">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Auto-entrepreneur 1 véhicule</td>
                  <td className="border p-2 text-right">1 800-2 800€/an</td>
                  <td className="border p-2 text-right">2 800-4 200€/an</td>
                </tr>
                <tr>
                  <td className="border p-2">SARL 1-3 véhicules</td>
                  <td className="border p-2 text-right">1 600-2 500€/véh.</td>
                  <td className="border p-2 text-right">2 500-3 800€/véh.</td>
                </tr>
                <tr>
                  <td className="border p-2">Flotte 4+ véhicules</td>
                  <td className="border p-2 text-right">1 400-2 200€/véh.</td>
                  <td className="border p-2 text-right">2 200-3 500€/véh.</td>
                </tr>
              </tbody>
            </table>
          ),
        },
      ]}
      faq={[
        {
          q: 'Mon ancienne assurance auto suffit-elle ?',
          a: 'NON. L\'assurance auto particulier ou affaires "trajet domicile-travail" ne couvre pas le transport rémunéré. Vous devez impérativement souscrire un contrat VTC/Taxi spécifique avant de commencer.',
        },
        {
          q: 'Différence entre VTC et Taxi côté assurance ?',
          a: 'Les contrats sont similaires mais avec des spécificités : taxis = couverture borne/maraude, VTC = uniquement réservation préalable. Le taxi a aussi des contraintes liées à la licence ADS et aux courses sans réservation.',
        },
        {
          q: 'Puis-je assurer une voiture personnelle pour faire VTC le week-end ?',
          a: 'Oui mais le contrat doit être adapté. La plupart des assureurs proposent des "contrats mixtes" qui couvrent l\'usage perso + pro. Tarif intermédiaire (entre auto perso et VTC pure).',
        },
        {
          q: 'Que couvre la garantie passagers étendue ?',
          a: "Elle couvre jusqu'à 4 passagers payants en cas d'accident, avec plafonds élevés (jusqu'à 1M€ par personne). Les bagages peuvent aussi être inclus jusqu'à 1 000€/passager.",
        },
        {
          q: "Que se passe-t-il si je n'ai pas l'assurance VTC adéquate ?",
          a: "En cas de contrôle ou sinistre, vous êtes en faute (défaut d'assurance professionnelle). Conséquences : refus de prise en charge, amende préfecture, suspension carte VTC, responsabilité civile et pénale personnelle.",
        },
      ]}
    />
  )
}
