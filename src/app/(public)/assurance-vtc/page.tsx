import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_AUTO, EXPERT_SERVICES, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Assurance VTC 2026 — Conforme décret 2014 · Dès 95€/mois',
  description:
    'Assurance VTC obligatoire (décret 2014-1725). Comparez Wakam, Stello, Hiscox. RC Pro + flotte + protection. Compatible Uber/Bolt/Heetch. Devis 5 min, attestation immédiate. Dès 95€/mois.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/assurance-vtc`,
  },
  openGraph: {
    title: 'Assurance VTC 2026 — Dès 95€/mois · Conforme décret 2014',
    description:
      'Assurance VTC conforme décret 2014. Wakam, Stello, Hiscox comparés. Uber/Bolt compatibles. Devis 5 min.',
    url: `${SITE_URL}/assurance-vtc`,
    type: 'website',
    images: [
      { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Vivos Assurance' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assurance VTC 2026 — Dès 95€/mois · Conforme décret 2014',
    description:
      'Comparatif Wakam, Stello, Hiscox. Compatible Uber/Bolt. Devis 5 min, attestation immédiate.',
  },
}

export default function AssuranceVtcPage() {
  return (
    <PilierLayout
      slug="assurance-vtc"
      title="Assurance VTC — Taxi"
      tagline="L'assurance auto pro spécifique à votre activité de transport de personnes. Conforme aux exigences Uber, Bolt, Heetch et licence VTC."
      legalReference="art. L. 211-1 C. assur. + Loi Grandguillaume 2014"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_AUTO}
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
                utilisé à titre professionnel". L’assurance auto particulier{' '}
                <strong>ne couvre PAS</strong> les passagers payants&nbsp;: en cas de sinistre,
                votre assureur refusera la prise en charge et vous resterez personnellement
                responsable.
              </p>
              <p>
                De plus, les plateformes (Uber, Bolt){' '}
                <strong>exigent une attestation d’assurance VTC</strong>
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
                <strong>Vol — incendie</strong>&nbsp;: indispensable vu la valeur du véhicule
              </li>
              <li>
                <strong>Tous risques</strong>&nbsp;: recommandé pour véhicule récent (&lt;5 ans)
              </li>
              <li>
                <strong>Garantie passagers</strong>&nbsp;: étendue pour transport rémunéré
              </li>
              <li>
                <strong>Protection juridique</strong>&nbsp;: en cas de litige client ou plateforme
              </li>
              <li>
                <strong>Indemnités journalières</strong> (option)&nbsp;: revenus en cas d’arrêt
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
                <tr className="bg-sand-100">
                  <th className="border p-2">Profil</th>
                  <th className="border p-2 text-right">Berline standard</th>
                  <th className="border p-2 text-right">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Auto-entrepreneur 1 véhicule</td>
                  <td className="border p-2 text-right">1 800-2 800€ par an</td>
                  <td className="border p-2 text-right">2 800-4 200€ par an</td>
                </tr>
                <tr>
                  <td className="border p-2">SARL 1-3 véhicules</td>
                  <td className="border p-2 text-right">1 600-2 500€ par véh.</td>
                  <td className="border p-2 text-right">2 500-3 800€ par véh.</td>
                </tr>
                <tr>
                  <td className="border p-2">Flotte 4+ véhicules</td>
                  <td className="border p-2 text-right">1 400-2 200€ par véh.</td>
                  <td className="border p-2 text-right">2 200-3 500€ par véh.</td>
                </tr>
              </tbody>
            </table>
          ),
        },
      ]}
      faq={[
        {
          q: "Que se passe-t-il si je n'ai pas l'assurance VTC adéquate ?",
          a: "Défaut d'assurance professionnelle = sanctions cumulées : refus de prise en charge par l'assureur en cas de sinistre, amende préfecture jusqu'à 3 750€ (art. L. 211-1 C. assur.), suspension de la carte pro VTC, retrait des plateformes Uber ou Bolt, responsabilité civile ET pénale personnelle (art. L. 324-2 C. route).",
        },
        {
          q: 'Mon ancienne assurance auto particulier suffit-elle pour faire du VTC ?',
          a: "NON, formellement exclu par art. L. 211-1 C. assur. L'assurance particulier ou « trajet domicile-travail » ne couvre PAS le transport rémunéré de personnes. En cas de sinistre avec passager payant, l'assureur invoque la fausse déclaration intentionnelle (art. L. 113-8) : nullité du contrat et remboursement des indemnités versées.",
        },
        {
          q: "Suis-je obligé d'avoir la carte pro VTC pour souscrire l'assurance ?",
          a: "OUI dans 95% des cas. Les assureurs spécialisés exigent la carte professionnelle VTC en cours de validité (délivrée par la préfecture après formation 250h + examen) ou l'inscription au registre VTC. Pour le taxi : licence ADS (Autorisation de Stationnement) obligatoire. Loi Grandguillaume du 29 décembre 2014 stricte sur la conformité.",
        },
        {
          q: "Si je conduis sans avoir activé l'app Uber, suis-je couvert ?",
          a: "OUI à condition d'avoir un contrat VTC pro adapté. Le contrat couvre 24/7, application activée ou non. Attention cependant : certains contrats « plateformes » plus économiques ne couvrent QUE les courses tracées par l'app Uber ou Bolt. Vérifiez la clause « usage déclaré » avant souscription.",
        },
        {
          q: 'Suis-je couvert si un passager se blesse en descendant du véhicule ?',
          a: "OUI via la garantie passagers étendue. Couverture jusqu'à 4 passagers payants en cas d'accident, glissade, chute, avec plafonds élevés (jusqu'à 1M€ par personne en corporel). Les bagages peuvent aussi être inclus jusqu'à 1 000€ par passager. La RC circulation (L. 211-1) reste la base obligatoire.",
        },
        {
          q: 'Et si on vole ma voiture pendant que je travaille ?',
          a: "Couvert par la garantie « vol ou incendie » si le contrat l'inclut (recommandée vu la valeur du véhicule, souvent 25-40k€ pour un VTC haut de gamme). Conditions : véhicule équipé d'un système antivol homologué SRA, dépôt de plainte sous 48h, restitution des 2 jeux de clés. Franchise typique : 600-1 200€.",
        },
        {
          q: 'Suis-je indemnisé si je suis en arrêt suite à un accident ?',
          a: "OUI via l'option « indemnités journalières » (IJ) ou via la garantie corporelle conducteur. IJ typiques : 50-150€ par jour après franchise de 7-30 jours, durée 365-1095 jours. Indispensable pour AE ou EI sans prévoyance (sinon perte totale de revenus). Combiner avec une prévoyance Madelin pour optimiser la fiscalité.",
        },
        {
          q: 'Différence entre VTC et Taxi côté assurance ?',
          a: "Les contrats sont similaires mais avec des spécificités : taxis = couverture borne ou maraude (courses spontanées), VTC = uniquement réservation préalable (art. L. 3122-2 Code transports). Le taxi a aussi des contraintes liées à la licence ADS (jusqu'à 300k€ à Paris) et aux courses sans réservation. Tarif assurance taxi 10-15% supérieur en moyenne.",
        },
        {
          q: 'Puis-je assurer une voiture personnelle pour faire VTC le week-end ?',
          a: "Oui via un « contrat mixte » qui couvre l'usage perso + pro. Tarif intermédiaire entre auto perso et VTC pure (typiquement 1 200-1 800€ par an). Conditions : déclaration du nombre d'heures VTC par semaine, kilométrage annuel total, plage horaire d'activité pro. Sous-déclaration = nullité du contrat (art. L. 113-8 C. assur.).",
        },
        {
          q: 'Combien coûte vraiment une assurance VTC en 2026 ?',
          a: 'Tarifs 2026 : 1 800-2 800€ par an pour AE 1 véhicule berline standard, 2 800-4 200€ par an pour véhicule premium (Mercedes Classe E, Tesla S), 1 600-2 500€ par véhicule pour SARL 1-3 véhicules, 1 400-2 200€ par véhicule pour flotte 4+. Variables : âge du conducteur (surprime <25 ans), bonus-malus, zone (+30% Paris ou IDF), historique sinistres.',
        },
        {
          q: 'Puis-je résilier ma assurance VTC à tout moment ?',
          a: "OUI après 1 an grâce à la loi Hamon (art. L. 113-15-2 C. assur.) : résiliation à tout moment sans frais, préavis 1 mois. Avant 1 an, résiliation possible uniquement à l'échéance annuelle (préavis 2 mois) ou cas spécifiques (changement de véhicule, cessation d'activité, vente du véhicule, déménagement >50km).",
        },
        {
          q: "Combien de temps pour obtenir l'attestation d'assurance VTC ?",
          a: 'Devis sous 24h ouvrées. Souscription : 24-48h après réception des justificatifs (carte VTC, carte grise, permis B >3 ans, K-bis ou attestation INSEE). Attestation provisoire immédiate après paiement de la première prime. Vert mémo (carte verte) sous 7-10 jours. Procédure express +80€ pour démarrage urgent.',
        },
        {
          q: "Mon véhicule est en location longue durée (LLD) : comment l'assurer ?",
          a: "Le contrat VTC pro couvre les véhicules en LLD ou LOA aux mêmes conditions qu'un véhicule en pleine propriété. Le bailleur (Arval, ALD, Leaseplan) doit figurer comme bénéficiaire de la garantie « dommages » (clause de subrogation). Attestation à transmettre au bailleur avant prise en main du véhicule.",
        },
        {
          q: "Suis-je couvert si j'ai un sinistre avec une course Uber non-déclarée ?",
          a: "OUI si votre contrat est un VTC pro classique (sans clause « plateforme »). NON ou couverture réduite si contrat « plateforme » qui n'autorise que les courses tracées par l'app. La fausse déclaration (course non-déclarée fiscalement par exemple) peut entraîner nullité du contrat (art. L. 113-8 C. assur.).",
        },
        {
          q: 'Quelles garanties pour transporter des personnes à mobilité réduite (PMR) ?',
          a: "Garantie « adaptation PMR » spécifique : couvre les équipements complémentaires (rampe d'accès, fixation fauteuil, sangles homologuées), garantie passagers étendue pour les transports médicalisés, RC Pro renforcée. Tarif : +15-25% vs VTC standard. Indispensable pour la conventionnement CPAM en transport sanitaire.",
        },
        {
          q: "Que faire en cas d'accident corporel avec un passager Uber ?",
          a: "Étapes : (1) sécuriser la scène et appeler le 15/18, (2) prévenir Uber via l'app (assistance 24/7), (3) déclarer le sinistre à votre assureur sous 5 jours (art. L. 113-2), (4) constat amiable avec le tiers, (5) envoyer témoignages passagers et factures médicales. Uber dispose d'une couverture complémentaire pour les blessures graves passager.",
        },
        {
          q: "Comment passer du VTC au taxi (ou inverse) sans rupture d'assurance ?",
          a: "Procédure : avenant au contrat existant (gain de temps + bonus-malus conservé) ou nouveau contrat si l'assureur n'a pas la gamme taxi ou VTC. Délai : 7-15 jours ouvrés. Documents : nouvelle carte pro, licence ADS si taxi, attestation préfecture. Notre cabinet ORIAS gère le transfert sans rupture de couverture (continuité garantie).",
        },
        {
          q: 'Suis-je couvert pour les trajets aéroport longue distance (Paris-province) ?',
          a: 'OUI, le contrat VTC pro couvre toute la France métropolitaine 24/7 sans limite de kilométrage (sauf clause spécifique). Pour les trajets internationaux (Belgique, Suisse, Luxembourg), vérifiez la carte verte (zones colorées en vert) et souscrivez éventuellement une extension « étranger » si vous traversez régulièrement les frontières.',
        },
      ]}
    />
  )
}
