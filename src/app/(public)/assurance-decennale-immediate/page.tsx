/**
 * Pilier — "assurance décennale immédiate" (150 vol, KD 0, CPC 700€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-immediate'
const TITLE = 'Assurance Décennale Immédiate — Attestation en 24h, démarrage chantier'
const TAGLINE =
  "Besoin d'une décennale en urgence pour démarrer un chantier ? Souscription rapide possible en 24h chez April Pro, Hiscox, Allianz. Pièces et délais."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale immédiate : attestation en 24h pour démarrage chantier urgent. Pièces nécessaires, assureurs proposant souscription express, tarifs, risques contrats accélérés.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Vous devez démarrer un chantier dans 24-48h et n'avez pas encore votre décennale ? La souscription d'une décennale immédiate est possible chez plusieurs assureurs (April Pro, Hiscox, Allianz Pro, MMA, AXA Pro) — sous réserve de fournir rapidement les pièces nécessaires. Cette page détaille les démarches express, les conditions pour obtenir une attestation en 24-48h, et les pièges à éviter (tarification d'urgence majorée, exclusions étendues, contrats provisoires)."
      legalReference="Loi Spinetta + art. 1792 Code civil"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '⚡',
          title: 'Attestation 24-48h',
          desc: 'Délai express avec dossier complet et pièces digitales',
        },
        {
          icon: '🏗️',
          title: 'Démarrage chantier urgent',
          desc: 'Idéal si MO, notaire ou promoteur exige attestation rapide',
        },
        {
          icon: '💰',
          title: 'Tarif standard (pas de majoration urgence)',
          desc: 'Prix identiques à souscription normale chez April Pro — Hiscox',
        },
        {
          icon: '🔒',
          title: 'Couverture immédiate',
          desc: 'Valide à partir de la date d&apos;effet (généralement le lendemain)',
        },
      ]}
      sections={[
        {
          h2: '5 assureurs proposant la décennale immédiate',
          body: (
            <ul>
              <li>
                <strong>April Pro</strong> : leader BTP, plateforme souscription en ligne.
                Attestation sous 24h ouvrées avec pièces complètes. Prix compétitif.
              </li>
              <li>
                <strong>Hiscox</strong> : pas leader BTP mais propose décennale pour multi-services.
                Délai 24-48h.
              </li>
              <li>
                <strong>Allianz Pro</strong> : couverture la plus large métiers BTP. Souscription en
                agence + en ligne. Délai 48h.
              </li>
              <li>
                <strong>MMA Pro BTP</strong> : réseau d&apos;agences 1 500+ pour signature physique
                rapide. Délai 24-72h.
              </li>
              <li>
                <strong>AXA Pro BTP</strong> : couverture premium, délai 48-72h. Prime souvent
                +10-15% vs concurrents.
              </li>
            </ul>
          ),
        },
        {
          h2: 'Pièces nécessaires pour souscription express',
          body: (
            <ol>
              <li>
                <strong>SIRET valide</strong> (vérifié Insee.fr — &lt; 3 mois)
              </li>
              <li>
                <strong>K-bis pour SARL ou SAS</strong> ou{' '}
                <strong>attestation ACOSS pour AE</strong>
              </li>
              <li>
                <strong>Justificatif d&apos;identité dirigeant</strong> (CNI ou passeport
                recto-verso)
              </li>
              <li>
                <strong>Justificatif activité BTP</strong> : CAP, BEP, diplôme, qualifications RGE
                ou Qualibat, expérience BTP (3 ans+ recommandé)
              </li>
              <li>
                <strong>CA prévisionnel 12 mois</strong> + ventilation par métier déclaré
              </li>
              <li>
                <strong>Antécédents sinistralité 36 mois</strong> (déclaration honneur + relevé
                d&apos;information si déjà assuré)
              </li>
              <li>
                <strong>RIB</strong> pour paiement (annuel ou mensuel)
              </li>
              <li>
                <strong>Description chantier en cours — prévu</strong> (montant + nature travaux)
              </li>
            </ol>
          ),
        },
        {
          h2: 'Pièges à éviter pour décennale immédiate',
          body: (
            <ul>
              <li>
                <strong>Tarification d&apos;urgence majorée</strong> : certains courtiers facturent
                +15-30% pour traitement express. Comparer 3-5 devis.
              </li>
              <li>
                <strong>Exclusions étendues</strong> : contrats express peuvent exclure
                sous-traitance, travaux spéciaux (RGE PV), travaux outre-mer.
              </li>
              <li>
                <strong>Plafond insuffisant</strong> : vérifier plafond standard 1M€ AE, 2M€ SARL ou
                SAS. Pas en-dessous.
              </li>
              <li>
                <strong>Contrat provisoire</strong> : certains assureurs émettent attestation
                provisoire 1 mois avec contrat définitif après. Vérifier que le contrat définitif
                n&apos;a pas de modifications majeures.
              </li>
              <li>
                <strong>Postériorité limitée</strong> : standard 10 ans légal. Vérifier qu&apos;elle
                est garantie.
              </li>
              <li>
                <strong>Assureur non agréé ACPR</strong> : éviter assureurs étrangers sans passeport
                européen LPS valide.
              </li>
            </ul>
          ),
        },
      ]}
      faq={[
        {
          q: 'Peut-on vraiment avoir une décennale en 24h ?',
          a: 'Oui, avec dossier complet et pièces digitales fournies immédiatement. April Pro, Hiscox proposent l&apos;attestation sous 24h ouvrées (Lun-Ven 9h-18h). Délai réel : 4-24h selon réactivité de votre dossier.',
        },
        {
          q: 'Le tarif est-il majoré pour souscription express ?',
          a: 'Pas chez April Pro et Hiscox (tarification standard). Certains courtiers facturent +15-30% pour service express. Notre courtier ORIAS partenaire ne facture pas de surcharge urgence.',
        },
        {
          q: 'Quel risque à souscrire en urgence ?',
          a: 'Risque principal : choisir un contrat mal adapté faute de temps de comparaison. Toujours vérifier : plafond, métiers déclarés, exclusions clés, postériorité 10 ans. Avoir attestation immédiate &gt; attendre meilleur contrat.',
        },
        {
          q: 'Peut-on démarrer le chantier avant attestation ?',
          a: 'NON, jamais. Loi Spinetta exige décennale active AVANT démarrage travaux. Démarrer sans attestation = exercice illégal (75k€ amende + 6 mois prison art. L. 243-3). Attendre l&apos;attestation, même 24h supplémentaires.',
        },
      ]}
      relatedMetiers={[
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
        { name: 'Décennale BTP', slug: 'assurance-decennale-btp' },
        { name: 'Décennale obligatoire', slug: 'assurance-decennale-obligatoire' },
        { name: 'Devis décennale en ligne', slug: 'devis/assurance-decennale' },
        { name: 'Guide attestation décennale', slug: 'guides/attestation-decennale' },
      ]}
    />
  )
}
