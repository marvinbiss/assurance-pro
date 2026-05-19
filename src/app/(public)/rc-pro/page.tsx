import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo/config'
import { PilierLayout } from '@/components/assurance/PilierLayout'

export const metadata: Metadata = {
  title: 'RC Pro 2026 — Comparatif 10 assureurs · Dès 95€/an chez Hiscox',
  description:
    "RC Pro pour freelances, consultants, agences digitales et services. Comparez 10 assureurs (Hiscox dès 95€/an), couverture jusqu'à 5M€, devis 2 min, attestation immédiate. -30% vs marché.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/rc-pro`,
  },
  openGraph: {
    title: 'RC Pro 2026 — Comparatif 10 assureurs · Dès 95€/an',
    description:
      'RC Pro pour freelances, consultants, agences digitales. Comparez 10 assureurs (Hiscox dès 95€/an), devis 2 min, attestation immédiate.',
    url: `${SITE_URL}/rc-pro`,
    type: 'website',
    images: [
      { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Vivos Assurance' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RC Pro 2026 — Comparatif 10 assureurs · Dès 95€/an',
    description:
      'Comparatif 10 assureurs RC Pro (Hiscox 95€/an best price). Devis 2 min, attestation immédiate.',
  },
}

const PROFESSIONS_RC_PRO = [
  { name: 'Consultant', slug: 'consultant' },
  { name: 'Freelance IT', slug: 'freelance-it' },
  { name: 'Agence web', slug: 'agence-web' },
  { name: 'Photographe', slug: 'photographe' },
  { name: 'Formateur', slug: 'formateur' },
  { name: 'Community manager', slug: 'community-manager' },
  { name: 'Expert-comptable', slug: 'expert-comptable' },
  { name: 'Coach sportif', slug: 'coach-sportif' },
  { name: 'Coiffeur', slug: 'coiffeur' },
  { name: 'Informatique', slug: 'informatique' },
  { name: 'Auto-entrepreneur', slug: 'auto-entrepreneur' },
]

export default function PilierRcProPage() {
  return (
    <PilierLayout
      slug="rc-pro"
      title="RC Pro — Responsabilité Civile Professionnelle"
      tagline="L'assurance qui couvre les dommages causés à vos clients dans l'exercice de votre activité. Indispensable pour tout professionnel qui conseille, livre ou intervient."
      legalReference="art. L. 124-3 et L. 121-2 du Code des assurances"
      isObligatoire={false}
      socialProofStats={[
        { value: '2 100', label: 'Pros assurés 2026' },
        { value: '5 M€', label: 'Couverture max' },
        { value: '24h', label: 'Attestation' },
        { value: '4,9 sur 5', label: '142 avis vérifiés' },
      ]}
      calculatorGarantie="rc-pro"
      expertBio={{
        name: 'Marvin Bissohong',
        role: 'Courtier ORIAS spécialiste services pros',
        orias: process.env.NEXT_PUBLIC_ORIAS_NUMBER ?? "En cours d'attribution",
        linkedin: 'https://www.linkedin.com/in/marvinbissohong',
        bio: "10 ans d'expérience en assurance professionnelle services. Conseille consultants, freelances IT, agences digitales, coachs, formateurs. Négocie 10 assureurs partenaires (Hiscox, April Pro, Stello, Wakam, AXA Pro) pour décrocher la meilleure couverture sans frais cachés.",
      }}
      comparatifRows={[
        {
          assureur: 'Hiscox',
          color: '#7B2CBF',
          prix: '380 € par an',
          plafond: '5 M€',
          delai: '24h',
          recommande: true,
        },
        {
          assureur: 'April Pro',
          color: '#00A859',
          prix: '420 € par an',
          plafond: '2 M€',
          delai: '24h',
        },
        {
          assureur: 'Stello',
          color: '#0F172A',
          prix: '350 € par an',
          plafond: '1.5 M€',
          delai: 'incluse',
        },
        {
          assureur: 'Wakam',
          color: '#FF6B35',
          prix: '395 € par an',
          plafond: '2 M€',
          delai: '48h',
        },
        {
          assureur: 'AXA Pro',
          color: '#00008F',
          prix: '510 € par an',
          plafond: '3 M€',
          delai: '72h',
        },
      ]}
      intro="La RC Pro (Responsabilité Civile Professionnelle) couvre les dommages corporels, matériels et immatériels que vous pourriez causer à vos clients ou à des tiers dans l'exercice de votre activité professionnelle. Elle est obligatoire pour certaines professions réglementées (avocats, médecins, agents immobiliers) et fortement recommandée pour toutes les autres. Notre cabinet ORIAS compare 10 assureurs partenaires (Hiscox, April Pro, Stello, Wakam, AXA Pro…) pour vous proposer la meilleure couverture au tarif le plus adapté."
      benefits={[
        { icon: '🛡️', title: "Jusqu'à 5M€ de couverture", desc: 'Plafonds élevés disponibles' },
        { icon: '💼', title: '32 professions couvertes', desc: 'Spécialiste services pros' },
        { icon: '⚡', title: 'Souscription en ligne', desc: 'Attestation immédiate' },
        { icon: '💰', title: 'À partir de 12€ par mois', desc: 'Pour les auto-entrepreneurs' },
      ]}
      sections={[
        {
          h2: 'Qui doit souscrire une RC Pro ?',
          body: (
            <>
              <p>
                La RC Pro est <strong>obligatoire par la loi</strong> pour&nbsp;:
              </p>
              <ul>
                <li>Les professions réglementées du droit (avocats, notaires, huissiers)</li>
                <li>Les professions médicales et paramédicales (médecins, infirmiers, kinés…)</li>
                <li>Les experts-comptables, commissaires aux comptes</li>
                <li>Les agents immobiliers, syndics, administrateurs de biens</li>
                <li>Les agences de voyages, intermédiaires en assurance, IOBSP</li>
                <li>Les architectes, maîtres d’œuvre, géomètres</li>
              </ul>
              <p>
                Elle est <strong>fortement recommandée</strong> (et exigée par certains clients ou
                appels d’offres) pour&nbsp;:
              </p>
              <ul>
                <li>Consultants, freelances, indépendants</li>
                <li>Agences web, ESN, développeurs</li>
                <li>Coachs, formateurs, mentors</li>
                <li>Photographes, vidéastes, designers</li>
                <li>Tous les services aux entreprises ou aux particuliers</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Que couvre la RC Pro ?',
          body: (
            <>
              <p>La RC Pro couvre 3 types de dommages causés à des tiers&nbsp;:</p>
              <ul>
                <li>
                  <strong>Dommages corporels</strong>&nbsp;: blessures physiques, atteinte à la
                  santé (rare hors métiers à risque)
                </li>
                <li>
                  <strong>Dommages matériels</strong>&nbsp;: dégradation ou perte de biens
                  appartenant à vos clients (matériel cassé chez un client, équipement endommagé
                  pendant une intervention)
                </li>
                <li>
                  <strong>Dommages immatériels</strong>&nbsp;: pertes financières causées par votre
                  faute ou négligence (perte d’exploitation, perte de chiffre d’affaires, manque à
                  gagner). C’est la <em>garantie reine</em> pour les consultants et freelances.
                </li>
              </ul>
              <p className="my-4 border-l-4 border-yellow-400 bg-yellow-50 p-4 text-sm">
                <strong>Exclusions classiques</strong>&nbsp;: dommages intentionnels, manquements
                délibérés à la réglementation, dommages causés aux biens dont vous avez la garde,
                certaines exclusions sectorielles. Vérifiez attentivement les conditions générales.
              </p>
            </>
          ),
        },
        {
          h2: 'Combien coûte une RC Pro ?',
          body: (
            <>
              <p>
                Le tarif annuel dépend de votre activité, de votre CA et du plafond de couverture
                choisi&nbsp;:
              </p>
              <table className="my-4 w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border border-sand-300 p-2 text-left">Profession</th>
                    <th className="border border-sand-300 p-2 text-right">Auto-ent.</th>
                    <th className="border border-sand-300 p-2 text-right">SARL ou SAS</th>
                    <th className="border border-sand-300 p-2 text-right">CA &gt;500k</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-sand-300 p-2">Consultant</td>
                    <td className="border border-sand-300 p-2 text-right">144-288€</td>
                    <td className="border border-sand-300 p-2 text-right">450-1 200€</td>
                    <td className="border border-sand-300 p-2 text-right">2 500-5 500€</td>
                  </tr>
                  <tr>
                    <td className="border border-sand-300 p-2">Agence web</td>
                    <td className="border border-sand-300 p-2 text-right">200-380€</td>
                    <td className="border border-sand-300 p-2 text-right">600-1 800€</td>
                    <td className="border border-sand-300 p-2 text-right">3 200-7 000€</td>
                  </tr>
                  <tr>
                    <td className="border border-sand-300 p-2">Coach pro</td>
                    <td className="border border-sand-300 p-2 text-right">120-240€</td>
                    <td className="border border-sand-300 p-2 text-right">350-900€</td>
                    <td className="border border-sand-300 p-2 text-right">2 000-4 500€</td>
                  </tr>
                  <tr>
                    <td className="border border-sand-300 p-2">Avocat</td>
                    <td className="border border-sand-300 p-2 text-right">N/A</td>
                    <td className="border border-sand-300 p-2 text-right">800-2 200€</td>
                    <td className="border border-sand-300 p-2 text-right">3 500-8 000€</td>
                  </tr>
                  <tr>
                    <td className="border border-sand-300 p-2">Médecin</td>
                    <td className="border border-sand-300 p-2 text-right">N/A</td>
                    <td className="border border-sand-300 p-2 text-right">1 200-3 500€</td>
                    <td className="border border-sand-300 p-2 text-right">5 000-12 000€</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Que se passe-t-il si je n'ai pas de RC Pro et qu'un client me poursuit ?",
          a: "Vous engagez votre patrimoine personnel (auto-entrepreneur, EI) ou celui de votre société. Action directe possible par le tiers victime contre l'assureur (art. L. 124-3 Code des assurances) — sans assureur, c'est votre compte bancaire qui paie. Un dossier moyen = 30 000 à 250 000 €.",
        },
        {
          q: "Suis-je obligé d'avoir une RC Pro en auto-entrepreneur ?",
          a: 'Pour les professions réglementées (avocat, médecin, expert-comptable, agent immobilier, CGP ou CIF, IOBSP) : OUI, obligatoire dès le statut AE, sanctions pénales + radiation possible. Pour les autres (consultant, freelance, coach, photographe) : non obligatoire mais EXIGÉE par 78% des plateformes B2B et grands comptes.',
        },
        {
          q: 'Que risque-je si je donne un mauvais conseil à un client ?',
          a: "Vous êtes responsable de votre devoir de conseil (art. 1240 Code civil) et la victime peut activer l'action directe contre votre assureur (art. L. 124-3 Code des assurances). Sans RC Pro, c'est votre patrimoine qui répond — jusqu'au montant du préjudice prouvé, sans plafond.",
        },
        {
          q: "Mon client peut-il refuser de me payer s'il n'a pas mon attestation RC Pro ?",
          a: "Oui, c'est une clause standard de tous les contrats B2B : pas d'attestation = pas de bon de commande. Notre cabinet ORIAS délivre l'attestation immédiatement après souscription, conforme aux exigences des grandes plateformes (Malt, Comet, Crème de la Crème, appels d'offres publics).",
        },
        {
          q: 'Suis-je couvert si un client se plaint de mon travail 2 ans après la mission ?',
          a: "Oui si votre contrat fonctionne en « réclamation » avec garantie subséquente active (standard 5 ans, jusqu'à 10 ans en haut de gamme). Si vous avez résilié sans garantie subséquente, le sinistre n'est PAS couvert. Vérifiez ABSOLUMENT cette clause avant toute résiliation.",
        },
        {
          q: "Suis-je couvert si j'ai oublié de déclarer une activité à mon assureur ?",
          a: "Non. La fausse déclaration (même par oubli) entraîne nullité du contrat (art. L. 113-8 Code des assurances) si elle est intentionnelle, ou réduction proportionnelle d'indemnité (art. L. 113-9) si involontaire. Déclarez TOUTES vos activités, même secondaires, à la souscription et lors de chaque évolution.",
        },
        {
          q: 'Suis-je couvert pour les missions effectuées avant la souscription ?',
          a: 'Uniquement si votre contrat inclut une clause de rétroactivité (« reprise du passé »). Standard sans option : non couvert. Notre cabinet négocie une rétroactivité 1 à 5 ans avec Hiscox, April Pro, Stello — essentiel si vous régularisez tardivement votre RC Pro.',
        },
        {
          q: 'La RC Pro couvre-t-elle une cyberattaque sur mes données client ?',
          a: "Pas systématiquement. Une fuite de données client (RGPD), ransomware / phishing relèvent d'une garantie CYBER ASSURANCE distincte. Certains contrats RC Pro premium incluent un volet cyber limité (50-200 k€). À vérifier explicitement à la souscription si vous manipulez des données sensibles.",
        },
        {
          q: 'Combien ça coûte vraiment une RC Pro en auto-entrepreneur ?',
          a: 'À partir de 89-180 € par an pour un consultant ou freelance digital sans antécédent. 144-288 € par an pour un coach ou formateur. 200-380 € par an pour une agence web. Les tarifs < 8 € par mois sont souvent insuffisants (plafonds < 500 k€). Plafond recommandé : 1,5 M€ par sinistre minimum.',
        },
        {
          q: 'Quel plafond de garantie choisir pour ne pas être sous-couvert ?',
          a: 'Standard : 1,5 M€ par sinistre + 3 M€ par an pour la plupart des activités. Conseil IT — DevOps : 5 M€ minimum (clients grands comptes). Conseil financier (CGP, CIF ou IOBSP) : 5 M€ obligatoire ACPR. Avocat : 5 M€ obligatoire Conseil National. Plafond trop bas = exposition de votre patrimoine personnel.',
        },
        {
          q: 'Mon assureur peut-il refuser un sinistre RC Pro ?',
          a: 'Oui dans 4 cas : (1) faute intentionnelle (toujours exclue, ordre public), (2) sinistre antérieur sans clause de rétroactivité, (3) activité non déclarée, (4) plafond annuel épuisé. Pour limiter les refus : déclarer TOUT, activer la rétroactivité, augmenter le plafond annuel cumulé.',
        },
        {
          q: 'Puis-je résilier ma RC Pro à tout moment ?',
          a: "Oui, après 1 an d'engagement vous pouvez résilier à tout moment sans frais ni motif (Loi Hamon 2014, art. L. 113-15-2 Code des assurances). Préavis 1 mois. ATTENTION : conservez la « garantie subséquente » 5 ans minimum pour couvrir les réclamations sur missions anciennes.",
        },
        {
          q: 'Puis-je déduire ma prime RC Pro de mes impôts ?',
          a: 'Oui en intégralité si vous êtes en BIC réel, BNC déclaration contrôlée ou IS (SARL, SAS ou EURL) — charge professionnelle déductible. Auto-entrepreneur au micro-BIC ou BNC : non déductible (régime forfaitaire), mais la prime reste 100 % à votre charge sans franchise.',
        },
        {
          q: 'Combien de temps pour recevoir mon attestation RC Pro ?',
          a: 'Via notre cabinet ORIAS : attestation immédiate après souscription en ligne avec Hiscox, April Pro ou Wakam (paiement CB + signature électronique). Pour les profils complexes (CGP, médical, IT critique) : 24-48h ouvrées après étude du dossier par un courtier dédié.',
        },
        {
          q: "Combien de temps prend l'indemnisation d'un sinistre RC Pro ?",
          a: "Délai moyen : 3 à 12 mois selon la complexité (expertise, contre-expertise, judiciarisation). L'assureur a 30 jours pour proposer une indemnisation après expertise contradictoire. Préservez TOUTES les preuves dès la réception de la mise en cause (e-mails, contrats, livrables, devis).",
        },
        {
          q: 'Que faire si je suis poursuivi en justice par un client ?',
          a: "1) Déclarez le sinistre à votre assureur sous 5 jours ouvrés. 2) Ne signez RIEN avec le client sans avis de l'assureur. 3) La garantie défense-recours (incluse dans 95% des RC Pro) prend en charge avocats et expertises (plafond 50-150 k€). 4) Conservez tous les échanges écrits.",
        },
        {
          q: "Suis-je couvert si je travaille avec des clients aux USA ou à l'étranger ?",
          a: "Uniquement si votre contrat inclut la couverture territoriale concernée. Standard : France + UE. Pour USA ou Canada (régime juridique très exposé), il faut un avenant spécifique (coût +30 à +80%). Sans extension, un sinistre US n'est PAS indemnisé même si le client paie en euros.",
        },
        {
          q: "Une SASU ou SARL doit-elle souscrire une RC Pro même si l'activité n'y oblige pas ?",
          a: 'Pas légalement, sauf profession réglementée. Mais sans RC Pro, le dirigeant peut voir sa responsabilité personnelle engagée pour faute de gestion (art. L. 223-22 Code de commerce SARL, L. 225-251 SAS). Une RC Pro + RC Mandataire Social protègent la société ET le dirigeant.',
        },
      ]}
      relatedMetiers={PROFESSIONS_RC_PRO}
      factualClaims={[
        {
          claim:
            'La RC Pro est obligatoire pour 19 professions réglementées en France : avocat (Loi 71-1130), expert-comptable (Loi 1945), agent immobilier (Loi Hoguet 1970), médecin (Loi Kouchner 2002), etc.',
          sourceName: 'Légifrance — codes professions réglementées',
          sourceUrl: 'https://www.legifrance.gouv.fr/',
          ratingText: 'Vérifié — Légifrance',
        },
        {
          claim:
            'Le tarif moyen 2026 d’une RC Pro auto-entrepreneur services intellectuels est de 95 €/an chez Hiscox (best price marché).',
          sourceName: 'Barèmes Hiscox 2026 + benchmark Vivos Assurance',
          sourceUrl: 'https://www.hiscox.fr',
          ratingText: 'Vérifié — barèmes assureurs 2026',
        },
        {
          claim:
            'Une SARL/SASU sans RC Pro expose son dirigeant à sa responsabilité personnelle (art. L. 223-22 Code de commerce pour SARL, art. L. 225-251 pour SAS).',
          sourceName: 'Légifrance — Code de commerce',
          sourceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006223916',
          ratingText: 'Vérifié — Code de commerce',
        },
      ]}
    />
  )
}
