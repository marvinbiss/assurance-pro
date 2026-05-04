import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Assurance décennale BTP — Comparez en 2 min | Assurance Pro',
  description:
    'Comparez votre garantie décennale auprès de 10 assureurs partenaires. Maçon, plombier, électricien, couvreur… Devis gratuit en 24h, attestation immédiate après souscription.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assurance-pro.fr'}/assurance-decennale`,
  },
  openGraph: {
    title: 'Assurance décennale BTP — Comparez en 2 min | Assurance Pro',
    description:
      'Comparez votre garantie décennale auprès de 10 assureurs partenaires. Maçon, plombier, électricien, couvreur… Devis gratuit en 24h, attestation immédiate après souscription.',
    url: `${SITE_URL}/assurance-decennale`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assurance décennale BTP — Comparez en 2 min | Assurance Pro',
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
              <p className="my-4 border-l-4 border-blue-400 bg-blue-50 p-4 text-sm">
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
          q: "L'assurance décennale est-elle obligatoire pour un auto-entrepreneur BTP ?",
          a: "Oui. L'obligation de l'art. L. 241-1 du Code des assurances s'applique à tous les statuts juridiques, y compris les auto-entrepreneurs et micro-entrepreneurs du BTP. L'amende prévue (75 000 €) est identique.",
        },
        {
          q: 'Combien de temps avant un chantier dois-je souscrire ?',
          a: "La décennale doit être souscrite AVANT l'ouverture du chantier. Avec notre cabinet, l'attestation est délivrée sous 24 heures après validation de votre dossier. Pour les chantiers d'urgence, une couverture provisoire peut être négociée.",
        },
        {
          q: 'Que faire si plusieurs assureurs me refusent ?',
          a: 'Vous pouvez saisir le Bureau Central de Tarification (BCT) qui obligera un assureur à vous couvrir au tarif fixé. Notre cabinet vous accompagne dans cette démarche et vous conseille les assureurs spécialisés dans les profils difficiles (jeunes entreprises, antécédents sinistres).',
        },
        {
          q: "Comment changer d'assureur en cours d'année ?",
          a: "Grâce à la Loi Hamon (2014), vous pouvez résilier votre décennale après la première année à tout moment, avec un préavis d'1 mois. Notre cabinet gère la résiliation et la transition vers le nouveau contrat sans interruption de couverture.",
        },
        {
          q: 'La décennale couvre-t-elle les travaux en sous-traitance ?',
          a: "Oui, sous conditions. Le sous-traitant doit avoir sa propre décennale. Le donneur d'ordre engage sa responsabilité s'il fait appel à un sous-traitant non couvert. Demandez systématiquement l'attestation de votre sous-traitant avant le chantier.",
        },
        {
          q: 'Peut-on déduire la prime décennale des frais professionnels ?',
          a: "Oui, la prime de décennale est entièrement déductible des frais professionnels en BIC (régime réel) ou en charge déductible pour les sociétés. Pour les auto-entrepreneurs au régime micro, elle n'est pas déductible mais entre dans le calcul du seuil de TVA.",
        },
      ]}
      relatedMetiers={METIERS_BTP}
    />
  )
}
