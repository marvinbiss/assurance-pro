/**
 * Pilier — "assurance rc pro et decennale" (80 vol, KD 1, CPC 600€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-rc-pro-et-decennale'
const TITLE = 'Assurance RC Pro et Décennale — Pack BTP combiné, économies'
const TAGLINE =
  'Souscrire RC Pro et Décennale ensemble : économies -15-25%, 1 interlocuteur, simplification gestion. Comparatif des 5 assureurs BTP proposant le pack.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Pack assurance RC Pro et Décennale BTP : économies -15-25% vs souscriptions séparées. Tarif AE pack 1 200-3 500€/an. April Pro, SMABTP, Allianz, MMA, AXA.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Pour les professionnels du BTP, souscrire l'assurance RC Pro et la Décennale ensemble chez le même assureur (pack combiné) est la meilleure stratégie : économies de 15-25% sur les primes, gestion centralisée avec 1 seul interlocuteur, et cohérence des couvertures (pas de zone grise entre les 2 contrats). Cette page compare les 5 assureurs BTP proposant des packs RC Pro + Décennale, avec tarifs précis et calcul d'économies réelles."
      legalReference="RC Pro : art. L. 124-3 + L. 121-2 • Décennale : Loi Spinetta + art. 1792 Code civil"
      isObligatoire={true}
      benefits={[
        {
          icon: '📦',
          title: 'Pack combiné',
          desc: 'RC Pro + Décennale chez même assureur — souscription groupée',
        },
        {
          icon: '💰',
          title: 'Économies -15-25%',
          desc: 'Remise paquet substantielle vs souscriptions séparées',
        },
        {
          icon: '🤝',
          title: '1 interlocuteur',
          desc: '1 dossier sinistre, 1 expert, 1 renouvellement par an',
        },
        {
          icon: '🔄',
          title: 'Évolution facile',
          desc: 'Ajustements simultanés selon CA, embauches, nouveaux métiers',
        },
      ]}
      sections={[
        {
          h2: 'Calcul économies pack vs séparé (exemples concrets)',
          body: (
            <ul>
              <li>
                <strong>AE peintre</strong> : 250€ RC Pro + 950€ Décennale = 1 200€ séparés vs{' '}
                <strong>1 050€ pack</strong> = -12%
              </li>
              <li>
                <strong>AE plombier</strong> : 400€ + 1 700€ = 2 100€ séparés vs{' '}
                <strong>1 800€ pack</strong> = -14%
              </li>
              <li>
                <strong>AE maçon</strong> : 500€ + 2 500€ = 3 000€ séparés vs{' '}
                <strong>2 500€ pack</strong> = -17%
              </li>
              <li>
                <strong>AE multi-services BTP</strong> : 700€ + 3 500€ = 4 200€ séparés vs{' '}
                <strong>3 400€ pack</strong> = -19%
              </li>
              <li>
                <strong>SARL plomberie 3 salariés</strong> : 900€ + 2 800€ = 3 700€ séparés vs{' '}
                <strong>3 100€ pack</strong> = -16%
              </li>
              <li>
                <strong>SAS BTP gros-œuvre 10 salariés</strong> : 2 500€ + 6 500€ = 9 000€ séparés
                vs <strong>7 200€ pack</strong> = -20%
              </li>
              <li>
                <strong>SAS multi-services BTP 25 salariés</strong> : 5 000€ + 12 000€ = 17 000€
                séparés vs <strong>13 600€ pack</strong> = -20%
              </li>
            </ul>
          ),
        },
        {
          h2: 'Comparatif 5 assureurs pack RC Pro + Décennale BTP',
          body: (
            <ul>
              <li>
                <strong>April Pro BTP</strong> : <strong>leader pack BTP</strong>, remise -15-20%,
                souscription 100% en ligne, attestation 24h. Best price AE/SARL.
              </li>
              <li>
                <strong>SMABTP</strong> : institution paritaire BTP, pack global, remise -15%.
                Expertise sinistres reconnue mais souscription moins digitale.
              </li>
              <li>
                <strong>Allianz Pro BTP</strong> : couverture la plus large, pack avec multirisque
                possible, remise -10-15%. Bon réseau d&apos;agences.
              </li>
              <li>
                <strong>MMA Pro BTP</strong> : équilibré SARL/SAS, réseau 1 500+ agences. Remise
                pack -10-15%.
              </li>
              <li>
                <strong>AXA Pro BTP</strong> : couverture premium, services étendus, remise -10-15%.
                Prime +10-15% vs April Pro équivalent.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Pourquoi le pack est plus avantageux',
          body: (
            <ul>
              <li>
                <strong>Économies tarifaires</strong> : 15-25% selon assureur et profil, soit 200-3
                500€/an d&apos;économie selon ampleur
              </li>
              <li>
                <strong>Gestion centralisée</strong> : 1 interlocuteur courtier, 1 contrat, 1 prime
                annuelle
              </li>
              <li>
                <strong>Pas de zone grise</strong> : assureur unique gère les sinistres mixtes RC
                Pro/Décennale
              </li>
              <li>
                <strong>Couvertures cohérentes</strong> : plafonds + exclusions harmonisés entre les
                2 contrats
              </li>
              <li>
                <strong>1 dossier sinistre</strong> : si un sinistre touche RC Pro et Décennale
                (rare mais possible), 1 expert + 1 procédure
              </li>
              <li>
                <strong>Évolution simplifiée</strong> : nouveau métier, embauche salarié,
                augmentation CA = 1 ajustement unique
              </li>
              <li>
                <strong>Programme fidélité</strong> : la plupart des assureurs offrent remises
                évolutives sur ancienneté pack
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: "Combien d'économies sur un pack RC Pro + Décennale ?",
          a: 'Économies typiques : -12% à -20% selon profil. AE peintre : -150€/an. SARL plomberie : -600€/an. SAS BTP PME 10 salariés : -1 800€/an. Sur 10 ans (durée standard contrats) : économies cumulées 1 500-18 000€.',
        },
        {
          q: 'Peut-on changer 1 contrat du pack sans toucher l&apos;autre ?',
          a: 'Oui, chaque contrat reste juridiquement distinct même dans un pack négocié. Vous pouvez résilier (loi infra-annuelle après 1 an) un contrat spécifique. MAIS : vous perdez la remise paquet sur le contrat restant. Évaluer si économies suffisent à compenser.',
        },
        {
          q: 'Quel assureur propose le meilleur pack RC Pro + Décennale ?',
          a: 'Pour AE BTP : April Pro BTP (best price + 100% en ligne). Pour SARL BTP : SMABTP (expertise paritaire) ou MMA Pro BTP (réseau agences). Pour SAS PME multi-secteurs : Allianz Pro BTP (couverture la plus large) ou AXA Pro BTP (premium).',
        },
        {
          q: 'Comment obtenir une remise pack supplémentaire ?',
          a: 'Ajouter d&apos;autres contrats au pack : Multirisque BTP, Flotte auto, Mutuelle Pro. Pack global 5 contrats = remise -20-30% vs souscriptions séparées. Notre courtier ORIAS négocie ces packs étendus avec les assureurs.',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro et Décennale (variante)', slug: 'rc-pro-et-decennale' },
        { name: 'RC Pro Décennale (différences)', slug: 'rc-pro-decennale' },
        { name: 'Assurance pro BTP (pack complet 5)', slug: 'assurance-pro-btp' },
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
      ]}
    />
  )
}
