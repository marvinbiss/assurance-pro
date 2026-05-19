import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_CYBER, EXPERT_DEFAULT, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: "Cyber Assurance Pro 2026 — TPE/PME · Couverture jusqu'à 1M€",
  description:
    "Cyber assurance professionnelle pour TPE/PME (ransomware, RGPD, fraude au président). Comparez Stoïk, Hiscox, Beazley. Devis 2 min, dès 480€/an. Couverture jusqu'à 1M€.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/cyber-assurance`,
  },
  openGraph: {
    title: 'Cyber Assurance Pro 2026 — Dès 480€/an · TPE/PME',
    description:
      'Cyber assurance TPE/PME (ransomware, RGPD, fraude au président). Comparatif Stoïk, Hiscox, Beazley. Devis 2 min.',
    url: `${SITE_URL}/cyber-assurance`,
    type: 'website',
    images: [
      { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Vivos Assurance' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Assurance Pro 2026 — Dès 480€/an · TPE/PME',
    description:
      'Comparatif Stoïk, Hiscox, Beazley. Couverture ransomware, RGPD breach, fraude. Devis 2 min.',
  },
}

export default function CyberAssurancePage() {
  return (
    <PilierLayout
      slug="cyber-assurance"
      title="Cyber Vivos Assurance"
      tagline="La seule assurance qui couvre les attaques informatiques, ransomware, fuites de données et notification RGPD. Indispensable en 2026."
      legalReference="RGPD art. 32 + Directive NIS 2"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="cyber"
      expertBio={EXPERT_DEFAULT}
      comparatifRows={COMPARATIF_CYBER}
      intro="Avec 1 entreprise sur 5 victime d'une cyberattaque en France en 2025 (source ANSSI), la cyber assurance n'est plus un luxe mais une nécessité. Elle couvre les conséquences financières d'un ransomware, d'une fuite de données personnelles, d'une attaque par déni de service (DDoS), d'une fraude au président. Notre cabinet ORIAS travaille avec les leaders du marché (Hiscox, Stello, Coalition, AIG, Beazley) pour construire votre couverture sur-mesure."
      benefits={[
        { icon: '🔒', title: 'Ransomware couvert', desc: 'Rançon + restauration' },
        { icon: '📋', title: 'RGPD breach', desc: 'Notification CNIL incluse' },
        { icon: '⚖️', title: 'Frais juridiques', desc: 'Défense + indemnités tiers' },
        { icon: '💼', title: "Perte d'exploitation cyber", desc: 'CA garanti après attaque' },
      ]}
      sections={[
        {
          h2: 'Que couvre la cyber assurance ?',
          body: (
            <ul>
              <li>
                <strong>Frais de remédiation technique</strong>&nbsp;: experts forensics,
                restauration des systèmes, nettoyage
              </li>
              <li>
                <strong>Rançon (ransomware)</strong>&nbsp;: négociation et paiement (sous conditions
                strictes)
              </li>
              <li>
                <strong>Notification RGPD</strong>&nbsp;: communication aux personnes concernées +
                CNIL
              </li>
              <li>
                <strong>Frais juridiques</strong>&nbsp;: avocats, expertise, défense en cas de mise
                en cause
              </li>
              <li>
                <strong>RC fuite de données</strong>&nbsp;: indemnisation des tiers victimes
              </li>
              <li>
                <strong>Sanctions CNIL</strong> (selon contrats)&nbsp;: jusqu’à 4% CA mondial pour
                RGPD
              </li>
              <li>
                <strong>Perte d’exploitation</strong>&nbsp;: CA non réalisé pendant l’incident
              </li>
              <li>
                <strong>Fraude au président</strong> et social engineering (option)
              </li>
              <li>
                <strong>Cyber-extorsion</strong>&nbsp;: chantage, menace de divulgation
              </li>
            </ul>
          ),
        },
        {
          h2: 'Pour qui ?',
          body: (
            <p>
              Toute entreprise traitant des données ou ayant une présence digitale&nbsp;:
              e-commerce, ESN ou SSII, agences web ou digital, freelances IT, professions libérales
              (cabinets médicaux, avocats, experts-comptables qui détiennent des données sensibles),
              commerces avec terminal de paiement, PME industrielles connectées (IoT).{' '}
              <strong>Indispensable en 2026 pour toute structure &gt;10 salariés.</strong>
            </p>
          ),
        },
        {
          h2: 'Combien ça coûte ?',
          body: (
            <table className="my-4 w-full border-collapse text-sm">
              <thead>
                <tr className="bg-sand-100">
                  <th className="border p-2">Profil</th>
                  <th className="border p-2 text-right">Plafond 250k€</th>
                  <th className="border p-2 text-right">Plafond 1M€</th>
                  <th className="border p-2 text-right">Plafond 5M€</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Freelance IT (CA &lt;100k)</td>
                  <td className="border p-2 text-right">350-600€</td>
                  <td className="border p-2 text-right">600-1 000€</td>
                  <td className="border p-2 text-right">N/A</td>
                </tr>
                <tr>
                  <td className="border p-2">Agence web (10-30 sal.)</td>
                  <td className="border p-2 text-right">1 500-2 500€</td>
                  <td className="border p-2 text-right">2 500-4 500€</td>
                  <td className="border p-2 text-right">5 000-9 000€</td>
                </tr>
                <tr>
                  <td className="border p-2">PME (50-100 sal.)</td>
                  <td className="border p-2 text-right">3 000-5 000€</td>
                  <td className="border p-2 text-right">5 000-9 000€</td>
                  <td className="border p-2 text-right">9 000-18 000€</td>
                </tr>
              </tbody>
            </table>
          ),
        },
      ]}
      faq={[
        {
          q: "Que se passe-t-il si je n'ai pas de cyber assurance en cas d'attaque ?",
          a: "Vous supportez seul l'intégralité du coût : rançon (50-500k€ médian PME), expertise forensics (15-40k€), notification CNIL obligatoire sous 72h (art. 33 RGPD), indemnisation des tiers (art. 82 RGPD), perte d'exploitation, sanctions CNIL (jusqu'à 4% CA mondial). 60% des PME victimes déposent le bilan dans les 18 mois selon l'ANSSI.",
        },
        {
          q: 'Suis-je obligé de notifier la CNIL en cas de fuite de données ?',
          a: "OUI sous 72h après en avoir pris connaissance (art. 33 RGPD). La notification doit décrire la nature de la violation, les catégories de personnes concernées, les conséquences probables et les mesures prises. Une cyber assurance couvre les frais juridiques de cette notification et l'accompagnement par un DPO externe.",
        },
        {
          q: 'La directive NIS 2 impose-t-elle une cyber assurance ?',
          a: "Pas formellement, mais NIS 2 (transposée en France en octobre 2024) impose aux entités essentielles et importantes des obligations strictes de sécurité, de notification d'incident sous 24h et de gestion des risques. La cyber assurance devient de facto un outil de conformité et de transfert de risque incontournable pour ces 15 000+ entités françaises concernées.",
        },
        {
          q: "Mon expert-comptable est responsable s'il subit une fuite de mes données ?",
          a: "OUI. En tant que sous-traitant au sens du RGPD (art. 28), votre expert-comptable est solidairement responsable d'une fuite portant sur vos données. Il doit disposer d'une RC Pro avec extension cyber. Vérifiez son attestation et la présence d'une clause de responsabilité conjointe dans votre contrat.",
        },
        {
          q: 'Une RC Pro classique couvre-t-elle les cyberattaques ?',
          a: 'NON. La RC Pro standard exclut explicitement les pertes informatiques, les ransomware et les fuites de données. Seul un contrat cyber dédié ou une extension cyber sur RC Pro peut couvrir ces risques.',
        },
        {
          q: "L'assureur paie-t-il vraiment la rançon ?",
          a: 'Oui mais sous conditions strictes : analyse de la légitimité de la demande, négociation par expert spécialisé, conformité aux sanctions internationales (pas de paiement à des entités sanctionnées). Les contrats récents (2024+) limitent ou excluent parfois la rançon.',
        },
        {
          q: "Suis-je couvert si l'attaque vient d'un employé interne ?",
          a: "OUI sous conditions. La majorité des contrats cyber couvrent la fraude interne (collaborateur malveillant, vol de données par un salarié) mais excluent le dirigeant lui-même. Une garantie « fraude au président » distincte couvre l'usurpation d'identité du dirigeant pour ordonner des virements (sinistre médian 80 k€).",
        },
        {
          q: "La perte de chiffre d'affaires après l'attaque est-elle indemnisée ?",
          a: "OUI via la garantie « perte d'exploitation cyber » incluse dans 90% des contrats. Indemnisation = CA non réalisé pendant la période d'interruption (généralement 30 à 180 jours) sur la base des 12 mois précédents. Franchise temporelle typique : 8 à 24h de carence avant déclenchement.",
        },
        {
          q: 'Les sanctions CNIL pour défaut RGPD sont-elles couvertes ?',
          a: "Selon les contrats, les sanctions CNIL peuvent être couvertes (jusqu'à 4% CA mondial pour RGPD art. 83). Mais attention : la couverture des sanctions est juridiquement débattue (principe de non-assurabilité des amendes pénales). Les frais de défense devant la CNIL sont en revanche systématiquement pris en charge.",
        },
        {
          q: 'Suis-je couvert si je perds mes données dans le cloud (Google, AWS) ?',
          a: "OUI dans la plupart des contrats récents : la garantie « défaillance prestataire IT » couvre l'interruption de service d'un hébergeur cloud, d'un SaaS critique ou d'un opérateur télécom. Plafonds typiques : 100 000 à 500 000€ avec sous-limite 25-50% du plafond global du contrat cyber.",
        },
        {
          q: 'Combien coûte vraiment une cyber assurance en 2026 ?',
          a: 'Tarifs 2026 : 350-1 000€ par an pour un freelance IT (plafond 250k-1M€), 1 500-9 000€ par an pour une agence web 10-30 salariés (plafond 1-5M€), 3 000-18 000€ par an pour une PME 50-100 salariés. Tarifs en hausse de 15-25% par an depuis 2022 du fait de la sinistralité ransomware.',
        },
        {
          q: 'Puis-je résilier ma cyber assurance à tout moment ?',
          a: "OUI après 1 an de contrat grâce à la loi Hamon (art. L. 113-15-2 C. assur.) : résiliation possible à tout moment sans frais, avec préavis d'un mois. Avant 1 an, résiliation possible uniquement à l'échéance annuelle (préavis 2 mois) ou en cas de changement majeur de situation (cession, fusion).",
        },
        {
          q: 'Quels prérequis techniques pour souscrire ?',
          a: 'Les assureurs exigent généralement : sauvegardes régulières (3-2-1), authentification multi-facteurs (MFA) pour les accès admin, mises à jour automatiques, formation des employés, EDR ou antivirus pro, plan de réponse à incident documenté. Pour les contrats >2M€ : audit technique externe obligatoire.',
        },
        {
          q: 'Délai de prise en charge en cas de cyberattaque ?',
          a: "Assistance 24/7 avec hotline dédiée. Mobilisation des experts forensics sous 4-12h selon contrat. Premier paiement (frais d'urgence) sous 48h. Indemnisation finale après expertise (4-12 semaines selon complexité).",
        },
        {
          q: "Combien de temps pour obtenir l'attestation cyber ?",
          a: "Devis sous 24-48h ouvrées via notre formulaire. Souscription : 48-72h après réception du questionnaire technique rempli (audit sécurité auto-déclaratif). Attestation d'assurance cyber émise immédiatement après paiement de la première échéance. Effet du contrat : 1er du mois suivant ou immédiat (procédure express +120€).",
        },
        {
          q: "Mon entreprise est sous-traitante : suis-je obligé d'avoir une cyber assurance ?",
          a: "Pas légalement, mais contractuellement OUI dans 78% des appels d'offres B2B en 2026. Les donneurs d'ordre (banques, assurances, grands comptes) exigent une attestation cyber avec plafond minimum 1-5M€ pour valider l'inscription au référencement fournisseur. Sans cyber, perte d'accès à 60% du marché B2B.",
        },
        {
          q: 'Comment fonctionne la couverture en cas de cyber-extorsion sans ransomware ?',
          a: "La garantie cyber-extorsion couvre les menaces de divulgation de données volées (double extorsion), le chantage à la destruction de réputation, les demandes de paiement pour ne pas attaquer (pre-extortion). Prise en charge : négociateur spécialisé, frais de communication crise, paiement de la rançon si validé par l'assureur (sous conditions sanctions internationales).",
        },
        {
          q: 'Le vol de matériel informatique est-il couvert par la cyber assurance ?',
          a: "Le vol PHYSIQUE de matériel (ordinateurs, serveurs) relève de la multirisque pro, PAS de la cyber. En revanche, la fuite de données consécutive à un vol de laptop non chiffré est couverte par la cyber : notification CNIL, indemnisation des personnes concernées, frais d'investigation. Bonne pratique : chiffrement intégral du disque (BitLocker, FileVault).",
        },
      ]}
    />
  )
}
