import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Assurance décennale BTP — Comparez en 2 min',
  description:
    'Comparez votre garantie décennale auprès de 10 assureurs partenaires. Maçon, plombier, électricien, couvreur… Devis gratuit en 24h, attestation immédiate après souscription.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/assurance-decennale`,
  },
  openGraph: {
    title: 'Assurance décennale BTP — Comparez en 2 min',
    description:
      'Comparez votre garantie décennale auprès de 10 assureurs partenaires. Maçon, plombier, électricien, couvreur… Devis gratuit en 24h, attestation immédiate après souscription.',
    url: `${SITE_URL}/assurance-decennale`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assurance décennale BTP — Comparez en 2 min',
    description:
      'Comparez votre garantie décennale auprès de 10 assureurs partenaires. Maçon, plombier, électricien, couvreur… Devis gratuit en 24h, attestation immédiate après souscription.',
  },
}

const METIERS_BTP = [
  { name: 'Maçon', slug: 'macon' },
  { name: 'Plombier', slug: 'plombier' },
  { name: 'Électricien', slug: 'electricien' },
  { name: 'Couvreur', slug: 'couvreur-zingueur' },
  { name: 'Charpentier', slug: 'charpentier-bois' },
  { name: 'Peintre', slug: 'peintre' },
  { name: 'Plaquiste', slug: 'plaquiste-platrier' },
  { name: 'Carreleur', slug: 'carreleur' },
  { name: 'Menuisier', slug: 'menuisier-interieur' },
  { name: 'Façadier', slug: 'facadier-ite' },
  { name: 'Étancheur', slug: 'etancheur' },
  { name: 'Photovoltaïque', slug: 'installateur-photovoltaique' },
]

export default function PilierDecennalePage() {
  return (
    <PilierLayout
      slug="assurance-decennale"
      title="Assurance décennale BTP"
      tagline="La garantie obligatoire qui couvre vos chantiers pendant 10 ans après réception. Comparez 10 assureurs en 2 minutes."
      legalReference="Loi Spinetta du 4 janvier 1978 — art. L. 241-1 du Code des assurances"
      isObligatoire={true}
      socialProofStats={[
        { value: '3 247', label: 'Artisans assurés 2026' },
        { value: '−32%', label: 'Économie moyenne' },
        { value: '24h', label: 'Attestation délivrée' },
        { value: '4.9/5', label: '142 avis vérifiés' },
      ]}
      calculatorGarantie="decennale"
      expertBio={{
        name: 'Marvin Bissohong',
        role: 'Courtier ORIAS spécialiste BTP',
        orias: process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? '07 0XX XXX',
        linkedin: 'https://www.linkedin.com/in/marvinbissohong',
        bio: "10 ans d'expérience en assurance pro BTP. Spécialiste des dossiers complexes (jeunes entreprises, antécédents sinistres, profils refusés). Négocie chaque dossier auprès de 10 assureurs partenaires (SMABTP, Hiscox, April Pro, MMA, Generali) pour obtenir la meilleure couverture au tarif juste.",
      }}
      comparatifRows={[
        {
          assureur: 'SMABTP',
          color: '#1A4F8B',
          prix: '1 200 €/an',
          plafond: '8 M€',
          delai: '48h',
          recommande: true,
        },
        {
          assureur: 'Hiscox',
          color: '#7B2CBF',
          prix: '1 450 €/an',
          plafond: '10 M€',
          delai: '24h',
        },
        {
          assureur: 'April Pro',
          color: '#00A859',
          prix: '1 380 €/an',
          plafond: '5 M€',
          delai: '24h',
        },
        {
          assureur: 'MMA Pro',
          color: '#003B71',
          prix: '1 320 €/an',
          plafond: '8 M€',
          delai: '48h',
        },
        {
          assureur: 'AXA Pro',
          color: '#00008F',
          prix: '1 500 €/an',
          plafond: '6 M€',
          delai: '72h',
        },
      ]}
      intro="La garantie décennale est obligatoire pour tout artisan ou entreprise du BTP qui réalise des travaux affectant la solidité de l'ouvrage ou le rendant impropre à sa destination. Elle s'applique pendant 10 ans à compter de la réception des travaux. Notre cabinet de courtage ORIAS compare pour vous les offres de 10 assureurs spécialistes du BTP (Hiscox, April Pro, MMA, Generali, AXA Pro, SMABTP…) afin d'obtenir la meilleure couverture au tarif le plus juste."
      benefits={[
        { icon: '⚖️', title: 'Conforme Loi Spinetta', desc: 'Couverture obligatoire 10 ans' },
        { icon: '💰', title: 'Tarifs négociés', desc: "Jusqu'à -30% vs souscription directe" },
        { icon: '⚡', title: 'Attestation 24h', desc: 'Délivrée dès souscription validée' },
        { icon: '🛡️', title: '10 assureurs partenaires', desc: 'SMABTP, Hiscox, April Pro…' },
      ]}
      sections={[
        {
          h2: "Qui est concerné par l'assurance décennale ?",
          body: (
            <>
              <p>
                L\'obligation de souscription concerne tout professionnel intervenant dans la
                construction d\'un ouvrage&nbsp;: artisans, entreprises générales, sous-traitants,
                architectes, bureaux d\'études, maîtres d\'œuvre, constructeurs de maisons
                individuelles (CMI), promoteurs.
              </p>
              <p>
                Cela englobe&nbsp;: les <strong>52 métiers BTP</strong> du gros œuvre et second
                œuvre, les spécialistes de la couverture / étanchéité / charpente, les installateurs
                RGE (photovoltaïque, pompes à chaleur), les paysagistes lorsqu\'ils réalisent des
                ouvrages durs.
              </p>
              <p className="my-4 border-l-4 border-primary-400 bg-primary-50 p-4 text-sm">
                <strong>Auto-entrepreneurs&nbsp;:</strong> l\'obligation s\'applique aussi aux
                micro-entrepreneurs du BTP. Notre cabinet propose des contrats spécifiques adaptés
                au statut AE avec primes à partir de 35€/mois selon le métier et le CA déclaré.
              </p>
            </>
          ),
        },
        {
          h2: 'Que couvre la décennale ?',
          body: (
            <>
              <p>La garantie décennale couvre les dommages qui&nbsp;:</p>
              <ul>
                <li>
                  compromettent la <strong>solidité de l\'ouvrage</strong>&nbsp;: fissures
                  structurelles, affaissement de fondations, effondrement, etc.
                </li>
                <li>
                  rendent l\'ouvrage <strong>impropre à sa destination</strong>&nbsp;: infiltrations
                  de toiture, défauts d\'étanchéité, dégâts des eaux encastrés, défauts d\'isolation
                  phonique majeurs.
                </li>
                <li>
                  affectent la <strong>solidité d\'un élément d\'équipement indissociable</strong>{' '}
                  (canalisations encastrées, faux-plafonds, escalier intégré).
                </li>
              </ul>
              <p>
                Le tiers lésé (maître d\'ouvrage, particulier, copropriété) peut activer la garantie
                pendant 10 ans à compter de la réception. La présomption de responsabilité de
                l\'art. 1792 du Code civil signifie que c\'est à{' '}
                <strong>l\'artisan de prouver l\'absence de faute</strong>, pas l\'inverse.
              </p>
            </>
          ),
        },
        {
          h2: 'Combien coûte une assurance décennale ?',
          body: (
            <>
              <p>
                Le tarif annuel d\'une décennale dépend de plusieurs facteurs&nbsp;: votre métier
                (sinistralité AQC), votre chiffre d\'affaires, votre statut juridique, vos
                antécédents de sinistres, votre zone géographique et votre ancienneté.
              </p>
              <table className="my-4 w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Métier</th>
                    <th className="border border-gray-300 p-2 text-right">CA &lt; 50k€</th>
                    <th className="border border-gray-300 p-2 text-right">CA 100-250k€</th>
                    <th className="border border-gray-300 p-2 text-right">CA &gt; 500k€</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Maçon</td>
                    <td className="border border-gray-300 p-2 text-right">1 200-2 200€</td>
                    <td className="border border-gray-300 p-2 text-right">2 000-3 500€</td>
                    <td className="border border-gray-300 p-2 text-right">6 000-10 000€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Couvreur</td>
                    <td className="border border-gray-300 p-2 text-right">1 500-2 500€</td>
                    <td className="border border-gray-300 p-2 text-right">2 200-4 000€</td>
                    <td className="border border-gray-300 p-2 text-right">7 000-12 000€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Plombier</td>
                    <td className="border border-gray-300 p-2 text-right">800-1 600€</td>
                    <td className="border border-gray-300 p-2 text-right">1 300-2 200€</td>
                    <td className="border border-gray-300 p-2 text-right">3 500-6 000€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Électricien</td>
                    <td className="border border-gray-300 p-2 text-right">600-1 200€</td>
                    <td className="border border-gray-300 p-2 text-right">750-1 800€</td>
                    <td className="border border-gray-300 p-2 text-right">3 000-5 000€</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Peintre</td>
                    <td className="border border-gray-300 p-2 text-right">500-1 000€</td>
                    <td className="border border-gray-300 p-2 text-right">600-1 200€</td>
                    <td className="border border-gray-300 p-2 text-right">2 200-3 500€</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs italic text-gray-600">
                Tarif indicatif basé sur les données AQC SYCODÉS 2024 et les barèmes publics des
                assureurs partenaires. Le tarif réel dépend de votre profil et fait l\'objet d\'un
                devis personnalisé.
              </p>
            </>
          ),
        },
        {
          h2: 'Sanctions en cas de non-souscription',
          body: (
            <>
              <p>
                L\'absence de garantie décennale est sanctionnée pénalement (art. L. 243-3 du Code
                des assurances)&nbsp;:
              </p>
              <ul>
                <li>
                  <strong>75 000 € d\'amende</strong>
                </li>
                <li>
                  <strong>6 mois d\'emprisonnement</strong>
                </li>
                <li>Interdiction d\'exercer en tant qu\'artisan pour la durée fixée par le juge</li>
                <li>Responsabilité civile et pénale personnelle en cas de sinistre</li>
              </ul>
              <p>
                De plus, depuis 2024 la mention de votre décennale (assureur, n° de police, période,
                zone géographique couverte) est obligatoire sur tous vos devis et factures clients.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Que se passe-t-il si je n'ai pas de décennale et qu'un sinistre arrive ?",
          a: "Vous êtes personnellement responsable sur votre patrimoine pendant 10 ans (art. 1792 Code civil). Un sinistre type fissure structurelle = 50 000 à 300 000 € à votre charge. S'ajoutent 75 000 € d'amende pénale et 6 mois de prison (art. L. 243-3 Code des assurances).",
        },
        {
          q: 'Que risque-je vraiment si je travaille sans décennale en auto-entrepreneur BTP ?',
          a: "Mêmes sanctions qu'une SARL : 75 000 € d'amende, 6 mois de prison, interdiction d'exercer. L'obligation de l'art. L. 241-1 du Code des assurances s'applique à TOUS les statuts. Un client peut aussi vous poursuivre 10 ans après pour le coût intégral des réparations.",
        },
        {
          q: "Mon client peut-il refuser de me payer si je n'ai pas d'attestation décennale ?",
          a: "Oui, et c'est légal. Depuis 2024 (arrêté NOR ECOC2306450A), l'attestation décennale est obligatoire sur tout devis et facture BTP. Sans elle, le client peut suspendre le paiement et refuser l'ouverture de chantier sans engager sa responsabilité.",
        },
        {
          q: "Suis-je obligé d'avoir une décennale si je ne fais que de la rénovation légère ?",
          a: "Oui dès lors que vos travaux affectent la solidité de l'ouvrage ou un élément d'équipement indissociable (canalisation encastrée, isolation, étanchéité). Seuls les travaux purement décoratifs (peinture pure sans préparation, pose de tableaux) en sont exemptés.",
        },
        {
          q: 'Suis-je couvert si un client me poursuit 8 ans après la fin du chantier ?',
          a: "Oui si la décennale était en vigueur le jour de la réception des travaux. La couverture suit le chantier pendant 10 ans même si vous changez d'assureur, cessez votre activité ou partez en retraite (sous réserve de la garantie subséquente).",
        },
        {
          q: "Mes anciens chantiers sont-ils couverts si je change d'assureur ?",
          a: "Oui, en principe : la décennale fonctionne en « capitalisation » (le contrat de l'année de réception couvre 10 ans). Demandez à votre ancien assureur une attestation de garantie subséquente et conservez-la précieusement — c'est elle qui prouve la couverture en cas de sinistre futur.",
        },
        {
          q: "La décennale couvre-t-elle un sous-traitant si je n'ai pas vérifié son attestation ?",
          a: "Non. Si votre sous-traitant n'a pas sa propre décennale et cause un sinistre, vous engagez votre responsabilité solidaire (art. 1792 Code civil). Demandez systématiquement son attestation avant tout chantier — sans elle, ne le faites pas intervenir.",
        },
        {
          q: "Suis-je couvert si je travaille à l'étranger pendant le chantier ?",
          a: 'Uniquement si la couverture territoriale du contrat inclut le pays. La majorité des décennales françaises couvrent la France métropolitaine + DOM. Pour Belgique, Suisse, Luxembourg, il faut un avenant. Notre cabinet ORIAS négocie ces extensions selon votre profil.',
        },
        {
          q: 'Combien ça coûte vraiment une décennale en auto-entrepreneur ?',
          a: "À partir de 35-45 €/mois pour un peintre AE débutant, 60-120 €/mois pour un plombier-chauffagiste, 100-180 €/mois pour un maçon. Le tarif dépend du métier (sinistralité AQC), du CA et de l'expérience. Méfiez-vous des offres < 30 €/mois : couverture souvent insuffisante.",
        },
        {
          q: "Mon assureur peut-il me lâcher en cours d'année après un sinistre ?",
          a: "Oui, après tout sinistre l'assureur dispose d'un délai d'1 mois pour résilier (art. R. 113-10 Code des assurances). Vous bénéficiez du même droit. Si vous êtes résilié, le Bureau Central de Tarification (BCT) peut obliger un assureur à vous couvrir au tarif fixé.",
        },
        {
          q: 'Puis-je résilier ma décennale en cours de contrat ?',
          a: "Oui : après 1 an d'engagement, la Loi Hamon (2014) vous permet de résilier à tout moment avec préavis d'1 mois, sans frais ni motif. Notre cabinet gère la résiliation et la transition pour garantir une continuité de couverture (zéro jour sans attestation).",
        },
        {
          q: 'Puis-je déduire ma prime décennale de mes impôts ?',
          a: "Oui en intégralité si vous êtes en BIC réel, IS (SARL/SAS/EURL) ou BNC déclaration contrôlée — c'est une charge professionnelle déductible. Auto-entrepreneur au micro-BIC : non déductible (forfait), mais la prime reste 100% à votre charge sans plafond de remboursement.",
        },
        {
          q: 'Combien de temps pour recevoir mon attestation après souscription ?',
          a: "Via notre cabinet ORIAS : 24h ouvrées maximum après validation de votre dossier complet (Kbis, devis-type, CV, attestation antécédents). Pour les chantiers d'urgence, une couverture provisoire dans la journée peut être négociée avec certains partenaires (April Pro, Hiscox, SMABTP).",
        },
        {
          q: "Combien de temps prend l'indemnisation d'un sinistre décennale ?",
          a: "Délai moyen : 6 à 18 mois selon la complexité (expertise contradictoire, contre-expertise, judiciarisation). L'assureur a 60 jours pour mandater un expert (art. L. 242-1). Préservez les preuves (photos, devis-réparation) dès la déclaration pour accélérer le dossier.",
        },
        {
          q: 'Comment prouver ma couverture décennale sur un chantier ?',
          a: "Présentez votre attestation annuelle (à jour, < 12 mois) qui mentionne assureur, n° police, période de validité, activités couvertes et zone géographique. Depuis 2024 cette mention doit aussi figurer sur tous devis et factures. Refusez tout chantier qui n'accepte pas votre attestation.",
        },
        {
          q: "Suis-je couvert si je modifie mon activité en cours d'année (nouveau métier) ?",
          a: 'Non automatiquement : la décennale couvre UNIQUEMENT les activités déclarées au contrat. Ajouter la « plomberie » à votre métier de carreleur impose un avenant immédiat. Sans déclaration, le sinistre sur la nouvelle activité ne sera PAS indemnisé (exclusion pour fausse déclaration).',
        },
        {
          q: "Puis-je travailler en sous-traitance avec une décennale d'auto-entrepreneur ?",
          a: "Oui, mais le donneur d'ordre exigera votre attestation avant le chantier. Le sous-traitant doit aussi être inscrit à la Chambre des Métiers (CMA) avec qualification reconnue pour le métier exercé. Sans cela, l'assureur peut refuser sa garantie en cas de sinistre.",
        },
        {
          q: 'Ma décennale couvre-t-elle un chantier sans permis de construire ?',
          a: "Non en principe : les travaux non déclarés (extension > 20 m², surélévation, changement de destination sans autorisation) sont exclus. L'assureur peut refuser sa garantie si le chantier est sanctionné pour non-respect du Code de l'urbanisme. Vérifiez systématiquement le PC avec le client.",
        },
      ]}
      relatedMetiers={METIERS_BTP}
    />
  )
}
