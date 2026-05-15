/**
 * Pilier — "décennale assurance" (TIER A — 400 vol/mois, KD 17, CPC 500€)
 * Variante ordre des mots vs /assurance-decennale, angle obligation + comprendre.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'decennale-assurance'
const TITLE = 'Décennale Assurance — Obligation, garanties et coût 2026'
const TAGLINE =
  "Comprendre l'assurance décennale en BTP : loi Spinetta, périmètre exact des travaux couverts, durée 10 ans, coût par métier et différence avec dommages-ouvrage."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale assurance : obligation Loi Spinetta pour 52 métiers BTP, durée 10 ans à réception, plafond illimité Spinetta. Coût 950-8 000€/an. Comparatif avec Dommages-Ouvrage.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La décennale assurance (officiellement &quot;garantie décennale&quot;) est l'assurance obligatoire pour tout constructeur intervenant sur la structure d'un ouvrage immobilier en France. Elle découle de la Loi Spinetta du 4 janvier 1978 (art. 1792 Code civil) et engage votre responsabilité pendant 10 ans à compter de la réception des travaux. Cette page détaille le périmètre exact (qui est concerné, quels travaux), la durée, le plafond Spinetta, le coût, et la différence cruciale avec la Dommages-Ouvrage (DO) du maître d'ouvrage."
      legalReference="Loi Spinetta 1978 + art. 1792 et 1792-2 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '⚖️',
          title: 'Obligation Loi Spinetta',
          desc: 'Toute personne physique ou morale qui construit, transforme ou rénove un ouvrage immobilier',
        },
        {
          icon: '🏗️',
          title: '10 ans à réception',
          desc: 'Durée de garantie à compter de la signature du PV de réception',
        },
        {
          icon: '🔓',
          title: 'Plafond illimité',
          desc: 'Spinetta : pas de plafond légal (assureur fixe contractuellement, généralement 1-3M€)',
        },
        {
          icon: '📋',
          title: '52 métiers BTP couverts',
          desc: 'Gros œuvre, second œuvre, finitions, équipements techniques',
        },
      ]}
      sections={[
        {
          h2: 'Qu&apos;est-ce que la garantie décennale ?',
          body: (
            <>
              <p>
                La <strong>garantie décennale</strong> est l&apos;engagement légal du constructeur
                (artisan, entreprise BTP, architecte, maître d&apos;œuvre, CMI, promoteur,
                sous-traitant) à réparer les dommages affectant la
                <strong> solidité de l&apos;ouvrage</strong> ou le rendant{' '}
                <strong>impropre à sa destination</strong> pendant 10 ans à compter de la réception
                des travaux.
              </p>
              <p>
                <strong>Exemples de dommages décennaux</strong> :
              </p>
              <ul>
                <li>Fissures importantes dans les murs porteurs ou la dalle</li>
                <li>Effondrement partiel ou total d&apos;une charpente</li>
                <li>Infiltrations d&apos;eau par la toiture rendant les combles inutilisables</li>
                <li>Défaillance d&apos;une fondation provoquant un affaissement</li>
                <li>Carrelage qui se décolle massivement (impropre à destination)</li>
                <li>Système de chauffage central défaillant en hiver</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Qui doit souscrire une décennale ?',
          body: (
            <>
              <p>
                <strong>Tout constructeur</strong> au sens large (art. 1792-1 Code civil) :
              </p>
              <ul>
                <li>
                  Artisans BTP (52 métiers couverts : maçon, plombier, électricien, peintre, etc.)
                </li>
                <li>Entreprises BTP de toute taille (SARL, SAS, EURL, SASU)</li>
                <li>Architectes (DPLG ou ENSA) et maîtres d&apos;œuvre</li>
                <li>Constructeurs de Maisons Individuelles (CMI)</li>
                <li>Promoteurs immobiliers</li>
                <li>Sous-traitants en lien direct avec le maître d&apos;ouvrage</li>
                <li>Auto-entrepreneurs / micro-entrepreneurs BTP (obligation identique)</li>
                <li>Bureaux d&apos;études techniques (BET) intervenant dans la conception</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Décennale vs Dommages-Ouvrage : ne pas confondre',
          body: (
            <>
              <p>
                Ce sont 2 assurances <strong>distinctes mais complémentaires</strong> :
              </p>
              <ul>
                <li>
                  <strong>Décennale</strong> = souscrite par le <em>constructeur</em> (vous,
                  artisan/entreprise BTP). Couvre votre responsabilité de 10 ans.
                </li>
                <li>
                  <strong>Dommages-Ouvrage (DO)</strong> = souscrite par le{' '}
                  <em>maître d&apos;ouvrage</em> (propriétaire, promoteur). Permet une indemnisation
                  rapide sans attendre l&apos;identification du responsable (subrogation contre le
                  constructeur après).
                </li>
              </ul>
              <p>
                Sur un chantier neuf : le constructeur a sa décennale + le maître d&apos;ouvrage a
                sa DO. Les deux sont obligatoires (Spinetta).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Combien coûte une décennale par an ?',
          a: 'Pour un auto-entrepreneur peintre : 950-1 400€/an. Pour un maçon SARL : 2 500-5 000€/an. Pour un multi-services BTP SAS : 3 500-8 000€/an+. La prime dépend du métier (risque), statut, CA déclaré et sinistralité.',
        },
        {
          q: 'La décennale est-elle obligatoire pour un auto-entrepreneur ?',
          a: "Oui. Tout auto-entrepreneur BTP exerçant une activité de constructeur (art. 1792-1) est soumis à la décennale (Loi Spinetta). Aucune exception. Démarrer sans décennale = exercice illégal de l'activité (sanctions pénales + civiles).",
        },
        {
          q: 'Comment souscrire une décennale en tant qu&apos;artisan débutant ?',
          a: '1) Recenser vos qualifications (CAP, diplôme BTP, RGE, Qualibat). 2) Préparer un dossier (statut, CA prévisionnel, expérience). 3) Comparer 5 assureurs via courtier ORIAS spécialisé BTP. 4) Démarrer sur formule auto-entrepreneur (prime réduite). 5) Réviser annuellement selon évolution CA.',
        },
        {
          q: 'Que se passe-t-il si je n&apos;ai pas de décennale ?',
          a: "Exercice illégal de l'activité de constructeur. Sanctions : pénales (6 mois prison + 75 000€ amende, art. L. 243-3 C. assur.), civiles (responsabilité personnelle illimitée sur 10 ans), commerciales (impossible de soumettre à appel d'offres, vente immobilière bloquée chez le notaire).",
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale auto-entrepreneur', slug: 'assurance-decennale-auto-entrepreneur' },
        { name: 'Décennale pas chère', slug: 'assurance-decennale-pas-cher' },
        { name: 'Dommages-Ouvrage', slug: 'assurance-dommages-ouvrage' },
        { name: 'Guide attestation décennale', slug: 'guides/attestation-decennale' },
      ]}
    />
  )
}
