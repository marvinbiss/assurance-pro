/**
 * Pilier — "rc pro decennale" (100 vol, KD 6, CPC 500€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'rc-pro-decennale'
const TITLE = 'RC Pro Décennale — Différences et complémentarité (Loi Spinetta)'
const TAGLINE =
  'RC Pro et Décennale sont 2 assurances distinctes mais complémentaires pour les pros BTP. Différences exactes, périodes de garantie, exclusions et pack combiné.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro vs Décennale : différences exactes (périmètre, durée, plafond). Pack combiné recommandé BTP. Tarif AE pack 2 500-3 500€ par an. April Pro, SMABTP comparatif.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro et la Décennale sont les 2 assurances essentielles pour les professionnels du BTP, mais elles ne couvrent PAS les mêmes risques. Beaucoup d'artisans confondent les 2, ou pensent qu'elles sont interchangeables. Cette page clarifie les différences exactes : la RC Pro couvre les dommages causés à des tiers PENDANT l'activité, la Décennale couvre les défauts d'ouvrage 10 ANS APRÈS RÉCEPTION. Les 2 sont complémentaires et souvent souscrites en pack."
      legalReference="RC Pro : art. L. 124-3 + L. 121-2 • Décennale : Loi Spinetta + art. 1792 Code civil"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '🔧',
          title: 'RC Pro = pendant activité',
          desc: 'Dommages causés à tiers durant prestation ou exécution travaux',
        },
        {
          icon: '🏗️',
          title: 'Décennale = après réception',
          desc: '10 ans à compter PV réception, solidité ouvrage',
        },
        {
          icon: '📦',
          title: 'Pack combiné -15-25%',
          desc: 'Souscription groupée chez même assureur = remise paquet',
        },
        {
          icon: '💰',
          title: '2 500-3 500€ par an pack AE',
          desc: 'AE BTP combiné RC Pro + Décennale chez April Pro — SMABTP',
        },
      ]}
      sections={[
        {
          h2: 'Différences exactes RC Pro vs Décennale',
          body: (
            <ul>
              <li>
                <strong>Période couverte</strong> : RC Pro = pendant l&apos;activité. Décennale = 10
                ans à compter PV réception.
              </li>
              <li>
                <strong>Risque couvert</strong> : RC Pro = dommages causés à tiers (clients, public,
                sous-traitants). Décennale = défauts solidité ouvrage ou impropriété destination.
              </li>
              <li>
                <strong>Exemple RC Pro</strong> : votre stagiaire renverse café sur MacBook du
                client (1k€) → RC Pro indemnise. Votre échelle tombe sur la voiture du voisin (5k€)
                → RC Pro.
              </li>
              <li>
                <strong>Exemple Décennale</strong> : fissures structurelles N+2 → Décennale.
                Infiltrations toiture N+5 → Décennale.
              </li>
              <li>
                <strong>Obligation</strong> : Décennale OBLIGATOIRE BTP (Loi Spinetta). RC Pro
                OBLIGATOIRE pour certaines professions (médical, juridique, immobilier, BTP en
                complément).
              </li>
              <li>
                <strong>Plafond</strong> : RC Pro = 500k€-5M€ standard. Décennale = pas de plafond
                légal Spinetta (assureur fixe contractuellement, généralement 1-3M€).
              </li>
            </ul>
          ),
        },
        {
          h2: 'Pack combiné RC Pro + Décennale BTP',
          body: (
            <>
              <p>Avantages du pack combiné chez même assureur :</p>
              <ul>
                <li>
                  <strong>Remise paquet -15-25%</strong> vs souscriptions séparées
                </li>
                <li>
                  <strong>1 interlocuteur</strong> : 1 dossier sinistre, 1 expert si problème mixte
                </li>
                <li>
                  <strong>Pas de zone grise</strong> entre RC Pro et Décennale (assureur unique
                  gère)
                </li>
                <li>
                  <strong>Renouvellement simplifié</strong> : 1 contrat, 1 prime annuelle
                </li>
                <li>
                  <strong>Évolution facile</strong> : ajustements simultanés selon CA ou activité
                </li>
              </ul>
              <p>Tarifs typiques pack AE BTP :</p>
              <ul>
                <li>
                  Peintre AE : RC Pro 250€ + Décennale 950€ = 1 200€ séparés vs{' '}
                  <strong>1 050€ pack</strong> (-12%)
                </li>
                <li>
                  Plombier AE : 400€ + 1 700€ = 2 100€ séparés vs <strong>1 800€ pack</strong>{' '}
                  (-14%)
                </li>
                <li>
                  Maçon AE : 500€ + 2 500€ = 3 000€ séparés vs <strong>2 500€ pack</strong> (-17%)
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Assureurs proposant pack RC Pro + Décennale BTP',
          body: (
            <ul>
              <li>
                <strong>April Pro BTP</strong> : leader pack BTP, remise -15-20%, souscription en
                ligne
              </li>
              <li>
                <strong>SMABTP</strong> : institution paritaire, pack BTP global complet
              </li>
              <li>
                <strong>MMA Pro BTP</strong> : équilibré, réseau d&apos;agences, remise -10-15%
              </li>
              <li>
                <strong>Allianz Pro BTP</strong> : couverture large, pack avec multirisque possible
              </li>
              <li>
                <strong>AXA Pro BTP</strong> : premium, services étendus, remise -10-15%
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'RC Pro et Décennale c&apos;est la même chose ?',
          a: 'NON, totalement distinctes. RC Pro = dommages tiers PENDANT activité. Décennale = défauts ouvrage 10 ANS APRÈS réception. Pour un BTP : il faut les DEUX (la Décennale est obligatoire Loi Spinetta + RC Pro complémentaire fortement recommandée).',
        },
        {
          q: 'Si j&apos;ai une Décennale, ai-je besoin d&apos;une RC Pro ?',
          a: 'OUI. La Décennale ne couvre PAS : 1) Dommages causés à tiers pendant chantier (chute échelle sur voiture voisin), 2) Casse matériel client durant intervention, 3) Erreur de conseil. La RC Pro couvre ces 3 cas. Pack combiné fortement recommandé.',
        },
        {
          q: 'Combien coûte le pack RC Pro + Décennale BTP ?',
          a: 'AE peintre : 1 050-1 400€ par an pack. AE plombier : 1 800-2 500€ par an. AE maçon : 2 500-3 500€ par an. SARL BTP : 4 000-7 500€ par an pack. Économie -15-25% vs souscriptions séparées chez même assureur.',
        },
        {
          q: 'Quel assureur pour pack RC Pro + Décennale ?',
          a: 'April Pro BTP (best price + en ligne), SMABTP (paritaire BTP), MMA Pro BTP (réseau agences), Allianz Pro BTP (couverture large), AXA Pro BTP (premium). Notre courtier ORIAS compare les 5.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance RC Pro (vue globale)', slug: 'assurance-rc-pro' },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'RC Pro et Décennale (variante)', slug: 'rc-pro-et-decennale' },
        { name: 'Assurance pro BTP (pack complet)', slug: 'assurance-pro-btp' },
      ]}
    />
  )
}
