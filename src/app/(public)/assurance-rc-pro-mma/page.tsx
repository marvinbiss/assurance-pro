/**
 * Pilier — "assurance rc pro mma" (200 vol, KD 5, CPC 250€)
 * Variante de /rc-pro-mma avec angle COMPARATIF + TARIFS détaillés.
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-rc-pro-mma'
const TITLE = 'Assurance RC Pro MMA — Comparatif tarifs et garanties détaillés'
const TAGLINE =
  "Analyse approfondie de l'assurance RC Pro MMA : garanties par formule, fourchettes tarifaires précises, comparaison avec MAAF ou GMF (groupe Covéa) et concurrents."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance RC Pro MMA : tarifs détaillés par profil (AE 250-450€, SARL 600-1 200€, SAS PME 1 200-2 500€). Comparatif MMA vs MAAF ou GMF vs Allianz, Hiscox ou Generali.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Analyse détaillée de l'offre RC Pro MMA : structure des formules par niveau de couverture, fourchettes tarifaires précises par profil d'activité, et comparaison rigoureuse avec les autres marques du groupe Covéa (MAAF, GMF) ainsi qu'avec les principaux concurrents (Allianz Pro, Hiscox, Generali Pro, April Pro, AXA Pro)."
      legalReference="art. L. 124-3 + L. 121-2 C. assur."
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '📊',
          title: '3 niveaux de formule',
          desc: 'Essentielle (basique) • Equilibre (standard) • Premium (étendue)',
        },
        {
          icon: '💰',
          title: 'Tarifs précis par profil',
          desc: 'AE 250-450€ • SARL services 600-1 200€ • SAS PME 1 200-2 500€',
        },
        {
          icon: '🔍',
          title: 'Comparatif groupe Covéa',
          desc: 'MMA vs MAAF vs GMF — différences réelles à connaître',
        },
        {
          icon: '🆚',
          title: 'vs concurrents externes',
          desc: 'Allianz Pro, Hiscox, Generali, April, AXA — qui pour quel profil ?',
        },
      ]}
      sections={[
        {
          h2: 'Les 3 formules MMA RC Pro',
          body: (
            <ul>
              <li>
                <strong>Formule Essentielle</strong> : plafond 500k€ par sinistre, franchise 800€,
                postériorité 5 ans. Idéal AE ou freelance débutant. Tarif AE : 250-380€ par an.
              </li>
              <li>
                <strong>Formule Equilibre</strong> : plafond 1M€ par sinistre, franchise 500€,
                postériorité 5 ans, RC Exploitation incluse. Idéal SARL ou SAS PME. Tarif : 600-1
                200€ par an.
              </li>
              <li>
                <strong>Formule Premium</strong> : plafond 3M€ par sinistre, franchise 300€,
                postériorité 5 ans, RC Exploitation + cyber basique + protection juridique. Idéal
                PME établie. Tarif : 1 500-2 500€ par an.
              </li>
            </ul>
          ),
        },
        {
          h2: 'MMA vs MAAF vs GMF (groupe Covéa)',
          body: (
            <>
              <p>
                Toutes trois font partie du groupe Covéa créé en 2003. Différences positionnement :
              </p>
              <ul>
                <li>
                  <strong>MMA Pro</strong> : pôle dédié{' '}
                  <strong>entreprises et professionnels</strong> du groupe. Force sur SARL ou SAS
                  PME, BTP, services. RC Pro complète disponible.{' '}
                  <strong>C&apos;est elle qu&apos;il faut viser pour pro.</strong>
                </li>
                <li>
                  <strong>MAAF Pro</strong> : historiquement orientée{' '}
                  <strong>particuliers et TPE</strong>. Offre Pro plus limitée (RC Pro simple, AE,
                  micro-entreprises). Tarifs compétitifs sur AE.
                </li>
                <li>
                  <strong>GMF</strong> : cible <strong>fonctionnaires et services publics</strong>.
                  Offre Pro quasi-inexistante. À éviter pour RC Pro classique.
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'MMA RC Pro vs concurrents externes',
          body: (
            <ul>
              <li>
                <strong>vs Hiscox</strong> : MMA plus cher AE freelance services (250€ vs 95€) mais
                inclus plus de garanties. Hiscox meilleur sur postériorité (10 ans vs 5 ans).
              </li>
              <li>
                <strong>vs Allianz Pro</strong> : équivalents sur SARL ou SAS. Allianz Pro plus
                large (couvre agriculture, plus de secteurs). Tarifs similaires.
              </li>
              <li>
                <strong>vs Generali Pro</strong> : MMA plus de réseau agences (1 500 vs 1 200).
                Generali plus fort cyber-assurance combinée.
              </li>
              <li>
                <strong>vs April Pro</strong> : April Pro leader BTP ou artisans, MMA plus
                généraliste. April moins cher AE BTP.
              </li>
              <li>
                <strong>vs AXA Pro</strong> : AXA prime +20% vs MMA pour services équivalents. AXA
                meilleur assistance premium.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quel tarif RC Pro MMA pour un consultant indépendant ?',
          a: 'AE consultant CA &lt; 80k€ avec formule Essentielle : 250-380€ par an. Avec formule Equilibre (recommandée si CA &gt; 50k€) : 380-550€ par an. Hiscox ou Stello restent 30-50% moins chers sur ce segment précis.',
        },
        {
          q: 'MAAF et MMA : différence pour un freelance ?',
          a: 'MAAF Pro AE : 280-450€ par an, formule basique limitée. MMA Pro AE : 250-380€ par an formule Essentielle, plus extensible avec options. À profils égaux, MMA est généralement légèrement moins chère et plus complète.',
        },
        {
          q: 'MMA propose-t-elle une cyber-assurance ?',
          a: 'Oui, en option dans la formule Premium ou en standalone. Cyber basique : +200-500€ par an AE. Cyber étendue : +800-2 500€ par an SARL ou SAS. Pour activités à risque (cybersécurité, hébergeur), Hiscox ou Generali sont plus spécialisés.',
        },
        {
          q: 'Comment basculer de MAAF Pro à MMA Pro ?',
          a: 'Les 2 sont du groupe Covéa mais contrats juridiquement distincts. Procédure : résiliation MAAF (lettre AR, préavis 1 mois) + souscription MMA. Possible de demander conseil à votre agent Covéa actuel pour faciliter transition.',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro MMA (vue globale)', slug: 'rc-pro-mma' },
        { name: 'MMA Assurance RC Pro (souscription)', slug: 'mma-assurance-rc-pro' },
        { name: 'Multirisque Pro MMA', slug: 'multirisque-pro-mma' },
        { name: 'Hiscox RC Pro', slug: 'hiscox-rc-pro' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
