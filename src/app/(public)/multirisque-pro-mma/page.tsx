/**
 * Pilier — "multirisque pro mma" (250 vol, KD 3)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_MULTIRISQUE,
  EXPERT_DEFAULT,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'multirisque-pro-mma'
const TITLE = 'Multirisque Pro MMA — Garanties, tarifs et alternatives 2026'
const TAGLINE =
  "MMA propose une multirisque pro couvrant locaux, stock, matériel et perte d'exploitation. Analyse des garanties, tarifs 350-2 800€ par an et comparatif avec Allianz Pro, AXA, Hiscox."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'MMA Multirisque Pro : couverture locaux + contenu + perte exploitation. Tarif 350-2 800€ par an (commerce TPE ou PME). Pack BTP ou services dispo. Comparatif Allianz, AXA, Generali.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="MMA Pro propose une multirisque professionnelle (MRP) modulaire couvrant les locaux, le contenu (mobilier, stock, matériel), la perte d'exploitation et la RC Exploitation. Adaptée aux SARL ou SAS PME (commerce, restauration, services, BTP), elle peut être combinée avec RC Pro et flotte auto pour bénéficier d'une remise paquet de 15-25%."
      legalReference="art. L. 121-2 et s. C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="multirisque-pro"
      expertBio={EXPERT_DEFAULT}
      comparatifRows={COMPARATIF_MULTIRISQUE}
      benefits={[
        {
          icon: '🏢',
          title: 'Locaux + contenu',
          desc: 'Murs, mobilier, stock, matériel pro, marchandises stockées',
        },
        {
          icon: '🔥',
          title: 'Risques courants',
          desc: 'Incendie, vol, dégâts eaux, bris glace, tempête, CatNat',
        },
        {
          icon: '💼',
          title: 'Perte d&apos;exploitation',
          desc: 'Indemnité journalière + marge brute pendant remise en état (option clé)',
        },
        {
          icon: '💰',
          title: '350-2 800€ par an',
          desc: 'TPE commerce 350-650€ • PME services 850-1 800€ • PME BTP 1 200-2 800€',
        },
      ]}
      sections={[
        {
          h2: 'Garanties standard MMA Multirisque Pro',
          body: (
            <ul>
              <li>
                <strong>Incendie — explosion</strong> : locaux + contenu, valeur à neuf disponible
                en option
              </li>
              <li>
                <strong>Dégâts des eaux</strong> : fuites, infiltrations, refoulement égouts
              </li>
              <li>
                <strong>Vol et vandalisme</strong> : effraction, vol avec violence, dégradations
              </li>
              <li>
                <strong>Bris de glaces</strong> : vitrines, enseignes, fenêtres
              </li>
              <li>
                <strong>Tempête + CatNat</strong> : intégré aux conditions générales
              </li>
              <li>
                <strong>RC Exploitation</strong> : dommages causés à des tiers SUR votre site (≠ RC
                Pro)
              </li>
              <li>
                <strong>Marchandises transportées</strong> : option pour commerces livreurs
              </li>
              <li>
                <strong>Perte d&apos;exploitation</strong> : option fortement recommandée, +30-60%
                prime base
              </li>
            </ul>
          ),
        },
        {
          h2: 'Avantages MMA vs concurrents',
          body: (
            <ul>
              <li>
                <strong>Pack global SARL ou PME</strong> : MMA permet de combiner RC Pro + MRP +
                Flotte + Mutuelle avec remise paquet 15-25% — un des packages les plus attractifs du
                marché.
              </li>
              <li>
                <strong>Réseau d&apos;agences physiques</strong> : 1 500+ agences en France pour
                conseil et gestion sinistres en présentiel.
              </li>
              <li>
                <strong>Couverture BTP incluse</strong> : MMA fait aussi décennale BTP et
                multirisque BTP (contrairement à Hiscox limité services).
              </li>
              <li>
                <strong>Solidité financière A</strong> (groupe Covéa avec MAAF et GMF).
              </li>
              <li>
                <strong>Programme fidélité</strong> : remises évolutives selon ancienneté.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Limites à connaître',
          body: (
            <ul>
              <li>
                <strong>Prime moyenne</strong> : pas la moins chère du marché. Allianz Pro souvent
                -10-15% pour grande PME.
              </li>
              <li>
                <strong>Cyber-assurance limitée</strong> : MMA propose un module cyber mais moins
                développé que Hiscox ou Generali.
              </li>
              <li>
                <strong>Pas leader sur restaurants ou CHR</strong> : Allianz Pro ou April Pro
                souvent mieux placés pour restauration risque incendie cuisine.
              </li>
              <li>
                <strong>Souscription pas 100% digitale</strong> : passage en agence ou téléphone
                souvent nécessaire pour finalisation.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quel tarif MMA Multirisque Pro pour un commerce TPE ?',
          a: 'Boutique 30-80m² centre-ville : 350-650€ par an (vol, incendie, bris glace). Avec perte d&apos;exploitation : 550-950€ par an. En zone à risque (centre ancien, métro ou RER) : prime +15-25%.',
        },
        {
          q: 'MMA couvre-t-il les restaurants ?',
          a: 'Oui mais pas leader sur ce segment. Restaurant traditionnel TPE chez MMA : 1 000-1 800€ par an. Allianz Pro ou April Pro souvent plus compétitifs (-15-25%) sur restauration. À comparer.',
        },
        {
          q: 'Le pack MMA RC Pro + MRP est-il intéressant ?',
          a: 'Oui, remise paquet 15-25% vs souscriptions séparées. Pour SARL ou SAS PME services (CA 200-500k€) : RC Pro 900€ + MRP 1 100€ = 2 000€ séparés vs 1 600€ pack = économie 400€ par an.',
        },
        {
          q: 'Comment déclarer un sinistre MMA Multirisque ?',
          a: 'Téléphone agence MMA ou plateforme en ligne mma.fr. Délai 5 jours ouvrés pour déclaration. Vol ou cambriolage : porter plainte préalable obligatoire. Expert MMA mandaté sous 7-15 jours selon gravité.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance multirisque pro (vue globale)', slug: 'assurance-multirisque-pro' },
        { name: 'Multirisque pro (variantes)', slug: 'multirisque-pro' },
        { name: 'MMA RC Pro', slug: 'rc-pro-mma' },
        { name: 'Assurance commerce', slug: 'assurance-commerce' },
        { name: 'Assurance restaurant', slug: 'assurance-restaurant' },
      ]}
    />
  )
}
