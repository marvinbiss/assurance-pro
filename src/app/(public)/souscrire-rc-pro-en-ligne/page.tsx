/**
 * Souscription — "souscrire rc pro en ligne" (200 vol, KD 29, CPC 600€)
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
const SLUG = 'souscrire-rc-pro-en-ligne'
const TITLE = 'Souscrire RC Pro En Ligne — Guide complet 2026'
const TAGLINE =
  'Guide pour souscrire votre RC Pro 100% en ligne en 2026 : étapes, documents requis, comparaison assureurs, choix optimal. Best price Hiscox 95€ par an AE.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Souscrire RC Pro en ligne : guide complet — étapes, documents, comparaison Hiscox, Stello, Allianz, MMA / AXA, choix optimal. 5 min, attestation immédiate.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Comment souscrire votre RC Pro 100% en ligne en 2026 ? Guide pas à pas pour AE, freelance, SARL, SAS : préparer documents requis, comparer 5 assureurs leaders, faire le bon choix, souscrire en 5 min, recevoir attestation immédiate. Cette page synthétise méthodologie + pièges à éviter + recommandations par profil."
      legalReference="art. L. 124-3 + L. 121-2 C. assur. + Loi Hamon (rétractation 14j)"
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '📚',
          title: 'Guide pas à pas',
          desc: 'Méthodologie complète préparer + comparer + souscrire',
        },
        {
          icon: '📋',
          title: 'Documents à préparer',
          desc: 'SIRET, Kbis ou ACOSS, RIB, identité, justificatifs sectoriels',
        },
        {
          icon: '🆚',
          title: 'Recommandations par profil',
          desc: 'AE → Hiscox, BTP → April, SAS → courtier négocié',
        },
        {
          icon: '⚠️',
          title: 'Pièges à éviter',
          desc: '4 pièges low-cost + 3 erreurs souscription fréquentes',
        },
      ]}
      sections={[
        {
          h2: 'Étape 1 — Préparer documents',
          body: (
            <ol>
              <li>
                <strong>SIRET</strong> : obligatoire, obtenu via INPI ou INSEE après immatriculation
              </li>
              <li>
                <strong>Kbis</strong> (SARL ou SAS) OU <strong>ACOSS attestation</strong> (AE) : -
                de 3 mois
              </li>
              <li>
                <strong>RIB IBAN</strong> : prélèvement automatique ou paiement CB
              </li>
              <li>
                <strong>Pièce identité dirigeant</strong> : CNI ou passeport
              </li>
              <li>
                <strong>Justificatifs sectoriels</strong> selon activité :
                <ul>
                  <li>BTP : 10 ans expérience pour décennale (CV, attestations)</li>
                  <li>Médical : diplôme + inscription Ordre + assurance étudiant si récent</li>
                  <li>Avocat : carte CNB + inscription Barreau</li>
                  <li>VTC : carte VTC + diplôme + visite médicale</li>
                </ul>
              </li>
              <li>
                <strong>Antécédents sinistres</strong> : 3-5 dernières années (si existants)
              </li>
            </ol>
          ),
        },
        {
          h2: 'Étape 2 — Comparer 5 assureurs',
          body: (
            <ul>
              <li>
                <strong>Critères à comparer obligatoirement</strong> :
                <ul>
                  <li>Prix annuel HT et TTC</li>
                  <li>Plafond garantie (mini 500k€ AE, 1M€ recommandé)</li>
                  <li>Franchise (300-1 500€)</li>
                  <li>Postériorité (mini 5 ans, idéal 10 ans Hiscox)</li>
                  <li>Exclusions (lire intégralement!)</li>
                  <li>Options incluses vs en plus (cyber, juridique, dommages biens)</li>
                </ul>
              </li>
              <li>
                <strong>Outils pour comparer</strong> :
                <ul>
                  <li>Comparateur courtier ORIAS (gratuit) : 5 assureurs en parallèle</li>
                  <li>
                    Sites assureurs directs : Hiscox.fr, Stello.fr, Allianz.fr (parcours pure
                    online)
                  </li>
                </ul>
              </li>
            </ul>
          ),
        },
        {
          h2: 'Étape 3 — Choisir selon profil',
          body: (
            <ul>
              <li>
                <strong>AE services intellectuels (IT, conseil, design)</strong> : 🥇 Hiscox (best
                price + postériorité 10 ans)
              </li>
              <li>
                <strong>AE BTP</strong> : 🥇 April Pro BTP (spécialiste + décennale combinée)
              </li>
              <li>
                <strong>AE coach sportif — formateur</strong> : 🥇 Allianz Pro (couverture
                corporelle adaptée)
              </li>
              <li>
                <strong>AE VTC</strong> : 🥇 Wakam / Stello (contrat 2-en-1 auto+RC)
              </li>
              <li>
                <strong>SARL services 100-500k€ CA</strong> : 🥇 Hiscox ou Allianz Pro selon options
              </li>
              <li>
                <strong>SAS PME &gt; 1M€ CA</strong> : 🥇 Courtier ORIAS négocié (tarif sur mesure)
              </li>
              <li>
                <strong>Libéral réglementé</strong> : Caisse spécialisée (MACSF santé, MAF
                architectes) ou Allianz ou AXA Pro
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Erreur sur formulaire après validation ?',
          a: 'Loi Hamon : 14 jours rétractation possibles après souscription. Modification SIRET — activité gratuite via support. Modification plafond ou franchise = avenant tarifé. Modification radicale = résiliation + nouvelle souscription.',
        },
        {
          q: 'Comment savoir si offre vraiment compétitive ?',
          a: 'Comparer 3-5 assureurs minimum. Tarif compétitif = fourchette basse profil. Ex : AE consultant IT = 95-180€ par an → 95-130€ très compétitif. Au-delà 200€ par an pour ce profil = à challenger.',
        },
        {
          q: 'Délai souscription si activité commence demain ?',
          a: 'Souscription en ligne pure (Hiscox ou Stello) : effet immédiat ou date au choix dans 30 jours. Attestation téléchargeable immédiate. Cas particulier BTP : attestation décennale parfois 24-48h ouvrées (vérifications expérience).',
        },
      ]}
      relatedMetiers={[
        { name: 'RC Pro en ligne (vue globale)', slug: 'rc-pro-en-ligne' },
        { name: 'Assurance RC Pro en ligne', slug: 'assurance-rc-pro-en-ligne' },
        { name: 'RC Pro souscription en ligne', slug: 'rc-pro-souscription-en-ligne' },
        { name: 'Devis RC Pro en ligne', slug: 'devis/rc-pro-en-ligne' },
        { name: 'Comparateur RC Pro', slug: 'comparateur-rc-pro' },
      ]}
    />
  )
}
