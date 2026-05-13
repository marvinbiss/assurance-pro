/**
 * Pilier — "btp pro mutuelle" (200 vol, KD 0, CPC 100€)
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'btp-pro-mutuelle'
const TITLE = 'BTP Pro Mutuelle — Comparatif PRO BTP, April Pro Santé, Harmonie BTP'
const TAGLINE =
  'Les meilleures mutuelles santé dédiées aux pros du BTP : PRO BTP, April Pro Santé, Harmonie BTP. Comparatif détaillé, tarifs et critères de choix par profil.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'BTP Pro Mutuelle : comparatif PRO BTP S1-S4, April Pro Santé, Harmonie Mutuelle BTP, MMA Mutuelle Pro. Tarifs 38-180€/mois. Madelin déductible TNS. Devis 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Les mutuelles santé dédiées aux professionnels du Bâtiment et des Travaux Publics se distinguent par des garanties calibrées sur la sinistralité spécifique au secteur : accidents du travail fréquents (chutes, écrasement, blessures outillage), exposition produits (amiante, plomb, peinture), médecines douces utiles (ostéo, kiné), hospitalisation. Cette page compare les 4 leaders du segment (PRO BTP, April Pro Santé, Harmonie Mutuelle BTP, MMA Mutuelle Pro) avec tarifs précis et critères de choix par profil."
      legalReference="Loi Madelin (art. 154 bis CGI) pour TNS + ANI 2013 pour salariés"
      benefits={[
        {
          icon: '🏗️',
          title: 'Spécialisée BTP',
          desc: 'Garanties calibrées sinistralité secteur (accidents, médecines douces, hospi)',
        },
        {
          icon: '💼',
          title: 'Madelin déductible TNS',
          desc: 'Cotisations déductibles du résultat imposable pour artisans/EI/EURL',
        },
        {
          icon: '🤝',
          title: '4 leaders comparés',
          desc: 'PRO BTP • April Pro Santé • Harmonie Mutuelle BTP • MMA Mutuelle Pro',
        },
        {
          icon: '💰',
          title: '38-180€/mois',
          desc: 'AE débutant 38-65€ • Artisan TNS 65-120€ • Dirigeant SARL 95-180€',
        },
      ]}
      sections={[
        {
          h2: 'Les 4 mutuelles BTP comparées',
          body: (
            <ul>
              <li>
                <strong>PRO BTP</strong> : institution paritaire historique (1944), 1.5M+ adhérents.
                4 formules S1-S4 + pack P1-P4. Tarif S3 typique : 65-140€/mois. Services annexes
                (retraite, vacances, logement social).
              </li>
              <li>
                <strong>April Pro Santé</strong> : assureur privé (groupe APRIL coté en bourse).
                Best price sur profils TNS jeunes (-15-25% vs PRO BTP S3). Tarif S3 équivalent :
                55-110€/mois. Souscription 100% en ligne possible.
              </li>
              <li>
                <strong>Harmonie Mutuelle BTP</strong> : groupe VYV (mutualiste). Alternative
                paritaire à PRO BTP, services proches. Tarif S3 : 60-125€/mois. Forfait orthodontie
                souvent meilleur (1 200€/an vs 800€ PRO BTP).
              </li>
              <li>
                <strong>MMA Mutuelle Pro</strong> : groupe Covéa. Flexibilité formules + bonne
                couverture optique/dentaire. Tarif Niveau 3 : 70-130€/mois. Pack RC Pro + MMA
                Mutuelle = -15-25%.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Quel choix par profil ?',
          body: (
            <ul>
              <li>
                <strong>Artisan TNS jeune (25-45 ans, CA &lt; 100k€)</strong> : April Pro Santé S3 =
                best price. Madelin déductible.
              </li>
              <li>
                <strong>Artisan TNS expérimenté (45-60 ans, famille)</strong> : Harmonie Mutuelle
                BTP (forfait ortho enfants meilleur) ou PRO BTP S3.
              </li>
              <li>
                <strong>Dirigeant SARL/SAS BTP (5+ salariés)</strong> : Contrat collectif ANI 2013
                obligatoire. PRO BTP collectif ou MMA Pro collectif.
              </li>
              <li>
                <strong>Auto-entrepreneur BTP solo</strong> : April Pro Santé formule basique
                38-55€/mois.
              </li>
              <li>
                <strong>Pré-retraité ou retraité BTP</strong> : PRO BTP retraite (offre dédiée
                seniors avec couverture étendue).
              </li>
              <li>
                <strong>Couple BTP (2 artisans)</strong> : MMA Mutuelle Pro famille (tarif négocié
                couple).
              </li>
            </ul>
          ),
        },
        {
          h2: 'Sinistralité BTP : garanties prioritaires',
          body: (
            <ul>
              <li>
                <strong>Accidents du travail</strong> : 23% des sinistres santé BTP (vs 11% moyenne
                nationale)
              </li>
              <li>
                <strong>Hospitalisation</strong> : forfait journalier + chambre particulière +
                dépassements honoraires (300% BR minimum recommandé)
              </li>
              <li>
                <strong>Médecines douces</strong> : ostéo, kiné, étiopathe (utile pour TMS
                chroniques BTP)
              </li>
              <li>
                <strong>Optique</strong> : protection lunettes spéciales (chantiers poussiéreux)
              </li>
              <li>
                <strong>Dentaire renforcé</strong> : forfait 1 200€+/an pour soins préventifs et
                prothèses
              </li>
              <li>
                <strong>Cures thermales</strong> : utiles pour récupération post-blessures
              </li>
              <li>
                <strong>Couverture pathologies pro</strong> : amiante (déjà couvert par Sécu mais
                complémentaire utile)
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'PRO BTP ou April Pro Santé : lequel choisir ?',
          a: 'Pour TNS jeune (25-45 ans) sans besoins santé importants : April Pro Santé S3 (55-110€/mois, -15-25% vs PRO BTP). Pour artisan attaché à institution paritaire BTP + besoins services annexes (retraite, vacances) : PRO BTP S3.',
        },
        {
          q: 'Mutuelle BTP obligatoire pour les salariés ?',
          a: 'Oui (ANI 2013). Tout salarié BTP doit avoir une mutuelle collective d&apos;entreprise. Pour les TNS (artisan, EI) : pas obligatoire mais FORTEMENT recommandée (couverture santé + déduction Madelin).',
        },
        {
          q: 'Comment changer de mutuelle BTP ?',
          a: 'Contrat individuel TNS : résiliation libre après 1 an d&apos;engagement (loi infra-annuelle 2020). Lettre recommandée AR. Préavis 1 mois. Important : conserver attestation droits pour transition sans rupture.',
        },
        {
          q: 'Combien coûte une mutuelle BTP pour un artisan ?',
          a: 'Formule basique S1 ou Niveau 1 : 38-65€/mois. Standard S2-S3 : 65-120€/mois. Premium S4 ou Niveau 4 (couverture étendue famille) : 120-180€/mois. Madelin déductible TNS.',
        },
      ]}
      relatedMetiers={[
        { name: 'PRO BTP Mutuelle (vue globale)', slug: 'pro-btp-mutuelle' },
        { name: 'PRO BTP Mutuelle (KW principal)', slug: 'mutuelle-pro-btp' },
        { name: 'Mutuelle TNS', slug: 'mutuelle-tns' },
        { name: 'Mutuelle dirigeant', slug: 'mutuelle-dirigeant' },
        { name: 'Assurance pro BTP (pack)', slug: 'assurance-pro-btp' },
      ]}
    />
  )
}
