/**
 * Auto-entrepreneur — "assurance décennale auto entrepreneur" (800 vol, KD 11, CPC 500€) MONEY
 * 🏆 Yield Ahrefs 119.7 vis/page — TOP yield catégorie
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { COMPARATIF_BTP, EXPERT_BTP, STATS_DEFAULT } from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'assurance-decennale-auto-entrepreneur'
const TITLE = 'Assurance Décennale Auto Entrepreneur — Obligation, tarifs 950€ par an'
const TAGLINE =
  'Tout auto-entrepreneur BTP est soumis à la décennale (Loi Spinetta). Tarif AE peintre 950€ par an, plombier 1 400€ par an, maçon 1 800€ par an. Souscription en ligne 24h.'

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Décennale auto-entrepreneur BTP obligatoire (Spinetta). Tarif peintre 950€ par an, plombier 1 400€ par an, maçon 1 800€ par an. April Pro best price, en ligne 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Tout auto-entrepreneur (micro-entrepreneur) exerçant une activité BTP est SOUMIS à l'obligation de souscrire une décennale (Loi Spinetta + art. 1792 Code civil + art. L. 241-1 C. assur.). AUCUNE exception au statut AE — sanctions identiques à toute autre forme juridique : 75 000€ d'amende + 6 mois prison + responsabilité personnelle illimitée 10 ans. Cette page détaille les obligations spécifiques AE BTP, les tarifs marché 2026 par métier et les démarches de souscription en ligne en 24h."
      legalReference="Loi Spinetta + art. 1792 et 1792-1 Code civil + art. L. 241-1 C. assur."
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="decennale"
      expertBio={EXPERT_BTP}
      comparatifRows={COMPARATIF_BTP}
      benefits={[
        {
          icon: '⚖️',
          title: 'Obligation TOTALE Loi Spinetta',
          desc: 'Aucune exception au statut AE — même obligations qu&apos;une SARL BTP',
        },
        {
          icon: '💰',
          title: '950-3 500€ par an selon métier',
          desc: 'Peintre 950€ • Plombier 1 400€ • Maçon 1 800€ • Couvreur 2 500€',
        },
        {
          icon: '⚡',
          title: 'Souscription en ligne 24h',
          desc: 'April Pro BTP : devis instantané + attestation sous 24h ouvrées',
        },
        {
          icon: '🏆',
          title: 'Yield Ahrefs 119.7 vis ou page',
          desc: 'Top type de page (×16 vs métier×ville pur)',
        },
      ]}
      sections={[
        {
          h2: 'Pourquoi décennale obligatoire pour AE BTP',
          body: (
            <ul>
              <li>
                <strong>Loi Spinetta art. 1792-1 Code civil</strong> : tout &quot;constructeur&quot;
                est soumis à décennale, sans distinction de statut juridique (AE inclus)
              </li>
              <li>
                L&apos;auto-entrepreneur n&apos;est PAS une exception légale — c&apos;est un régime
                fiscal et social simplifié, pas un statut juridique séparé
              </li>
              <li>
                L&apos;AE BTP encourt les <strong>MÊMES sanctions</strong> qu&apos;une SARL BTP sans
                décennale : 75 000€ amende + 6 mois prison (art. L. 243-3 C. assur.)
              </li>
              <li>
                En cas de sinistre sans décennale : <strong>patrimoine personnel</strong> de
                l&apos;AE entièrement exposé (vs responsabilité limitée SARL ou SAS)
              </li>
              <li>
                Démarrer un chantier sans décennale = exercice illégal de l&apos;activité de
                constructeur
              </li>
            </ul>
          ),
        },
        {
          h2: 'Tarifs décennale AE BTP 2026 par métier (April Pro best price)',
          body: (
            <ul>
              <li>
                <strong>Peintre AE</strong> : 950-1 400€ par an (le moins risqué)
              </li>
              <li>
                <strong>Plâtrier AE</strong> : 1 100-1 600€ par an
              </li>
              <li>
                <strong>Carreleur AE</strong> : 1 200-1 700€ par an
              </li>
              <li>
                <strong>Vitrier — solier AE</strong> : 1 200-1 800€ par an
              </li>
              <li>
                <strong>Plombier AE</strong> : 1 400-2 100€ par an
              </li>
              <li>
                <strong>Plombier-chauffagiste AE</strong> : 1 600-2 500€ par an
              </li>
              <li>
                <strong>Électricien AE</strong> : 1 500-2 200€ par an
              </li>
              <li>
                <strong>Menuisier AE</strong> : 1 600-2 400€ par an
              </li>
              <li>
                <strong>Maçon AE traditionnel</strong> : 1 800-2 800€ par an
              </li>
              <li>
                <strong>Couvreur-zingueur AE</strong> : 2 200-3 500€ par an (sinistralité forte)
              </li>
              <li>
                <strong>Charpentier AE</strong> : 2 400-3 800€ par an
              </li>
              <li>
                <strong>Terrassier ou TP AE</strong> : 2 800-4 500€ par an (risque maximum)
              </li>
              <li>
                <strong>Multi-services BTP AE</strong> : 2 200-3 500€ par an (pack 5-10 métiers)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Démarches souscription décennale AE BTP',
          body: (
            <ol>
              <li>
                <strong>Préparer dossier</strong> : SIRET (Insee.fr), attestation ACOSS (URSSAF) AE,
                CNI ou passeport, CAP, BEP ou diplôme BTP ou expérience 3+ ans, RIB, CA prévisionnel
                12 mois
              </li>
              <li>
                <strong>Comparer 5 assureurs spé BTP</strong> via courtier ORIAS : April Pro BTP
                (best price AE), SMABTP, Allianz Pro BTP, MMA Pro BTP, AXA Pro BTP
              </li>
              <li>
                <strong>Choisir formule</strong> : plafond 1M€ minimum (recommandé 2M€), franchise
                800-1 500€, postériorité 10 ans
              </li>
              <li>
                <strong>Validation pièces digitales</strong> : upload sur plateforme assureur
                (24-48h validation)
              </li>
              <li>
                <strong>Paiement</strong> : annuel (-3-7% vs mensualisation) ou mensuel
              </li>
              <li>
                <strong>Réception attestation</strong> : 24h après validation chez April Pro (le
                plus rapide)
              </li>
              <li>
                <strong>Présentation MO</strong> : remettre attestation au maître d&apos;ouvrage
                AVANT démarrage chantier
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: "Un auto-entrepreneur BTP est-il VRAIMENT obligé d'avoir une décennale ?",
          a: 'OUI absolument. Tout AE BTP exerçant une activité de constructeur (peintre, plombier, électricien, etc.) est soumis à la Loi Spinetta SANS exception. Sanctions identiques à SARL ou SAS : 75 000€ amende + 6 mois prison + responsabilité personnelle illimitée 10 ans. AUCUNE exception possible.',
        },
        {
          q: 'Quelle est la décennale auto-entrepreneur la moins chère ?',
          a: "Pour peintre AE débutant (CA &lt; 50k€) : April Pro BTP à 950€ par an (plafond 1M€, postériorité 10 ans). C'est le best price marché vérifié. En-dessous de 800€ par an = SUSPECT (assureur non-agréé ACPR ou exclusions étendues).",
        },
        {
          q: 'Comment souscrire ma décennale AE en ligne ?',
          a: 'Via courtier ORIAS spécialisé BTP : 1) Devis en ligne 5 min (April Pro, MMA, Allianz). 2) Upload SIRET + CNI + RIB + justificatif activité. 3) Paiement. 4) Attestation téléchargeable sous 24h ouvrées. Délai total : moins de 48h dossier complet.',
        },
        {
          q: 'Décennale AE et autres assurances obligatoires BTP ?',
          a: 'Décennale = SEULE obligation légale stricte (Loi Spinetta). MAIS fortement recommandées en complément : RC Pro Bâtiment (250-700€ par an pour AE — couvre dommages PENDANT chantier), Multirisque Pro (si local atelier), Auto-mission (si véhicule perso utilisé pro), Mutuelle TNS (santé déductible Madelin).',
        },
      ]}
      relatedMetiers={[
        { name: 'Décennale obligatoire (sanctions)', slug: 'assurance-decennale-obligatoire' },
        { name: 'Décennale BTP (vue globale)', slug: 'assurance-decennale-btp' },
        { name: 'Décennale pour AE', slug: 'assurance-decennale-pour-auto-entrepreneur' },
        { name: 'Décennale AE BTP pack', slug: 'assurance-decennale-auto-entrepreneur-pro-btp' },
        {
          name: 'RC Pro auto-entrepreneur',
          slug: 'responsabilite-civile-professionnelle-auto-entrepreneur',
        },
        { name: 'Assurance décennale (vue globale)', slug: 'assurance-decennale' },
      ]}
    />
  )
}
