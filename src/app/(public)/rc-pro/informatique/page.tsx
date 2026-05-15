/**
 * Pilier — RC Pro informatique (LE money keyword absolu)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "responsabilité civile professionnelle informatique" → 100 vol, KD 0, CPC 1300€ ⭐⭐⭐
 * - "assurance professionnelle informatique"            → 150 vol, KD 0, CPC 600€
 * - "assurance rc pro informatique"                     →  75 vol (estimation famille)
 * Famille cumulée : ~400 vol/mois — petit volume MAIS le CPC le plus haut du marché
 * (1 300 € sur le KW principal — signal monetary intent extrême).
 *
 * Concurrent benchmark (competitor_pages) :
 * - assurup.com/activities/informatique-technologie → 175 vis/mois (top)
 * - simplis.fr/.../technologie-informatique → 48 vis/mois
 *
 * Stratégie : page dédiée aux métiers IT à fort risque (devs freelance, ESN, agences,
 * DevOps, cybersécurité) avec plafonds élevés (5-10 M€) + cyber assurance recommandée.
 *
 * Note routing : /rc-pro/informatique = route statique sous /rc-pro/[slug] dynamique.
 * Next.js : statique > dynamique. Pas de conflit (cf. /rc-pro/auto-entrepreneur).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import {
  COMPARATIF_SERVICES,
  EXPERT_SERVICES,
  STATS_DEFAULT,
} from '@/lib/data/pilier-premium-defaults'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'rc-pro/informatique'
const TITLE = 'RC Pro informatique — Tarifs 2026, plafonds 5-10 M€ pour métiers IT'
const TAGLINE =
  "L'assurance responsabilité civile professionnelle dédiée aux métiers IT : développeurs freelance, ESN, agences web, DevOps, cybersécurité, data scientists. Plafonds 5-10 M€ + cyber."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro informatique : couverture freelance dev, ESN, agences digitales, DevOps. Plafonds recommandés 5-10 M€ (gestion de système critique). Cyber assurance couplée recommandée. Tarifs négociés à partir de 380 €/an. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance responsabilité civile professionnelle dédiée aux métiers de l'informatique couvre les conséquences pécuniaires d'une erreur, d'une négligence ou d'un défaut de prestation causant un dommage à un client : bug critique en production, perte de données, faille de sécurité non détectée, dépassement de délai entraînant un préjudice client, mauvaise architecture causant une indisponibilité prolongée, intégration buggée. Le secteur IT cumule les risques : un seul incident sur un système critique d'un grand client peut atteindre 500 k€ à 5 M€ de dommages et intérêts (perte de chiffre d'affaires du client, sanctions RGPD, frais de remédiation). C'est pour cette raison que les plafonds standards de RC Pro (1,5 M€) sont INSUFFISANTS pour les métiers IT — il faut viser 5 à 10 M€ minimum, particulièrement pour les freelances DevOps, cybersécurité, ESN gérant des systèmes bancaires/santé, et conseil en architecture cloud. Cette page détaille les plafonds adaptés par profil IT, l'articulation RC Pro / Cyber assurance, les tarifs 2026 et les exclusions spécifiques au secteur."
      legalReference="Article L. 113-1 du Code des assurances + RGPD art. 82 (responsabilité du sous-traitant)"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '💻',
          title: 'Tous métiers IT',
          desc: 'Dev freelance, ESN/SSII, agences web, DevOps, cybersécurité, data scientist, consultant IT, integrateur',
        },
        {
          icon: '🛡️',
          title: 'Plafond 5-10 M€',
          desc: 'Standard 1,5 M€ INSUFFISANT pour IT critique. Recommandé 5 M€ minimum, 10 M€ pour systèmes bancaires/santé',
        },
        {
          icon: '🔒',
          title: 'Cyber assurance couplée',
          desc: 'RC Pro standard NE COUVRE PAS les cyberattaques. Cyber assurance dédiée recommandée (+200-800€/an)',
        },
        {
          icon: '💰',
          title: 'Tarif 380-2 800 €/an',
          desc: 'Freelance dev solo : 380-680€/an (5 M€). ESN 10 personnes : 2 800-5 800€/an',
        },
      ]}
      sections={[
        {
          h2: "Pourquoi un plafond standard 1,5 M€ est insuffisant pour l'IT",
          body: (
            <>
              <p>Trois raisons cumulatives :</p>
              <ol>
                <li>
                  <strong>Effet de levier client</strong> : un bug en production sur le SI d&apos;un
                  client à 50 M€ de CA peut coûter 1-3 M€ de perte d&apos;exploitation au client. Ce
                  préjudice est entièrement répercutable sur le prestataire IT.
                </li>
                <li>
                  <strong>Sanctions RGPD</strong> (art. 82) : en cas de fuite de données causée par
                  votre erreur, votre client peut se retourner contre vous pour récupérer les
                  amendes CNIL (4% du CA mondial dans le pire cas). Pour un client à 200 M€ : amende
                  potentielle 8 M€.
                </li>
                <li>
                  <strong>Effet domino</strong> : un système payment cassé un Black Friday = des
                  millions de transactions perdues. Une faille sur une API publique = des milliers
                  de comptes compromis.
                </li>
              </ol>
              <p>
                <strong>Recommandation</strong> : plafond minimum 5 M€/sinistre pour TOUT métier IT.
                Pour les systèmes critiques (banque, santé, énergie, télécoms) : 10 M€ minimum.
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs RC Pro informatique 2026 par profil',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil IT</th>
                    <th className="border p-2 text-right">Plafond</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      Freelance dev web (front-end/back-end), CA &lt; 60k€
                    </td>
                    <td className="border p-2 text-right">3 M€</td>
                    <td className="border p-2 text-right">380 € – 580 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Freelance dev senior, CA 60-120k€</td>
                    <td className="border p-2 text-right">5 M€</td>
                    <td className="border p-2 text-right">580 € – 980 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Freelance DevOps / SRE, CA 80-150k€</td>
                    <td className="border p-2 text-right">5 M€</td>
                    <td className="border p-2 text-right">780 € – 1 280 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Freelance cybersécurité (audit, pentest)</td>
                    <td className="border p-2 text-right">10 M€</td>
                    <td className="border p-2 text-right">1 480 € – 2 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Freelance data scientist / ML engineer</td>
                    <td className="border p-2 text-right">5 M€</td>
                    <td className="border p-2 text-right">680 € – 1 100 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Agence web 5 personnes</td>
                    <td className="border p-2 text-right">5 M€</td>
                    <td className="border p-2 text-right">1 480 € – 2 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">ESN / SSII 10 personnes</td>
                    <td className="border p-2 text-right">5-10 M€</td>
                    <td className="border p-2 text-right">2 800 € – 5 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">ESN bancaire/santé 30+ personnes</td>
                    <td className="border p-2 text-right">10-20 M€</td>
                    <td className="border p-2 text-right">8 000 € – 18 000 €</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : CA déclaré, antécédents sinistres, certifications (ISO 27001, SOC 2,
                ANSSI), clientèle (B2B grands comptes vs PME), territoire (France métro vs UE vs
                monde), rétroactivité activée (oui/non).
              </p>
            </>
          ),
        },
        {
          h2: 'RC Pro vs Cyber assurance : couvertures complémentaires',
          body: (
            <>
              <p>Deux garanties souvent confondues mais distinctes :</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">Couvre</th>
                    <th className="border p-2 text-left">Sinistre type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro IT</strong>
                    </td>
                    <td className="border p-2">
                      Erreur de votre prestation causant dommage au client
                    </td>
                    <td className="border p-2">
                      Bug en production qui plante le e-commerce du client (perte CA)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Cyber assurance</strong>
                    </td>
                    <td className="border p-2">
                      Cyberattaque subie par VOUS (ou répercutée à votre client)
                    </td>
                    <td className="border p-2">
                      Ransomware sur votre infra → indisponibilité service client
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>Pour 95% des métiers IT en 2026 : SOUSCRIRE LES 2.</strong> La RC Pro
                standard NE COUVRE PAS les cyberattaques (exclusion explicite dans 100% des
                contrats). Une cyber assurance dédiée coûte 200-800 €/an supplémentaires — ROI
                évident dès qu&apos;on stocke ou manipule des données client.
              </p>
              <p>
                Voir notre page dédiée{' '}
                <Link href="/cyber-assurance" className="text-primary-600 underline">
                  /cyber-assurance
                </Link>
                .
              </p>
            </>
          ),
        },
        {
          h2: 'Exclusions classiques à vérifier dans un contrat RC Pro IT',
          body: (
            <>
              <ul>
                <li>
                  <strong>Cyberattaque / ransomware / DDoS</strong> : exclu de la RC Pro standard.
                  Cyber assurance dédiée nécessaire.
                </li>
                <li>
                  <strong>Faute intentionnelle</strong> : toujours exclu (ordre public).
                </li>
                <li>
                  <strong>Violation propriété intellectuelle</strong> : utilisation de code open
                  source incompatible licence (GPL contaminante), copie de code propriétaire —
                  souvent EXCLU. Garantie « PI » spécifique en option.
                </li>
                <li>
                  <strong>Dépassement de délai contractuel</strong> : exclusion dans certains
                  contrats (« non-respect d&apos;obligation de résultat »). À vérifier
                  explicitement.
                </li>
                <li>
                  <strong>Pertes financières SEULES</strong> sans dommage matériel/corporel :
                  exclues dans les contrats RC Pro entrée de gamme. Indispensable d&apos;avoir «
                  dommages immatériels NON consécutifs » couverts.
                </li>
                <li>
                  <strong>Sinistres antérieurs à la souscription</strong> : exclus sans clause de
                  rétroactivité. À ACTIVER systématiquement.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Un freelance dev a-t-il besoin d'une RC Pro ?",
          a: "Oui — fortement recommandée même si pas légalement obligatoire pour le métier de développeur. 78% des plateformes B2B (Malt, Crème de la Crème, Comeup Pro, Upwork) exigent une attestation RC Pro à l'inscription. Sans elle, accès aux missions B2B fortement limité. Tarif accessible : 380-580€/an pour un freelance dev solo (plafond 3 M€).",
        },
        {
          q: 'Quel plafond RC Pro choisir pour un freelance IT ?',
          a: 'Minimum 5 M€/sinistre pour TOUT freelance IT — le plafond standard 1,5 M€ est INSUFFISANT pour le secteur. Pour cybersécurité, conseil bancaire/santé, gestion de systèmes critiques : 10 M€ minimum. Justification : un seul sinistre sur un client à 50 M€ de CA peut générer 1-3 M€ de dommages-intérêts (perte CA client + sanctions RGPD répercutées).',
        },
        {
          q: 'Combien coûte une RC Pro pour un freelance dev en 2026 ?',
          a: 'Démarre à 380€/an pour un freelance dev web junior (plafond 3 M€). Médiane marché : 580-980€/an pour un freelance dev senior (plafond 5 M€). DevOps/SRE : 780-1 280€/an. Cybersécurité : 1 480-2 380€/an (plafond 10 M€). Variables : CA déclaré, antécédents, certifications, type clientèle.',
        },
        {
          q: 'RC Pro et Cyber assurance : faut-il les 2 ?',
          a: "OUI pour 95% des métiers IT. La RC Pro standard NE COUVRE PAS les cyberattaques (exclusion explicite). Coût d'un sinistre cyber type pour un freelance IT : 25 000-150 000€ (notification CNIL, frais juridiques RGPD, perte d'exploitation, restauration de données). Cyber assurance dédiée : 200-800€/an supplémentaires. ROI évident.",
        },
        {
          q: 'ESN / SSII : quelles garanties indispensables ?',
          a: 'Pack standard ESN : (1) RC Pro 5-10 M€ avec dommages immatériels NON consécutifs, (2) Cyber assurance 1-3 M€, (3) RC Mandataire social pour le dirigeant (1-2 M€), (4) Multirisque bureau/serveur, (5) Mutuelle collective salariés (ANI 2013). Tarif global 5-15k€/an pour ESN 10 personnes, 18-40k€/an pour ESN 30+.',
        },
        {
          q: 'Mon code open source GPL est dans le projet client : suis-je couvert ?',
          a: "Pas systématiquement. La violation involontaire d'une licence open source contaminante (GPL, AGPL) qui obligerait votre client à publier son code propriétaire peut générer un sinistre RC Pro… SOUS CONDITION que la garantie « violation propriété intellectuelle » soit incluse. Cette garantie est SOUVENT EN OPTION dans les contrats entrée de gamme (+150-400€/an). À demander explicitement à la souscription.",
        },
        {
          q: 'Combien de temps pour obtenir un devis RC Pro IT ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3-5 propositions de nos partenaires spécialisés IT (Hiscox Tech, AIG Tech, Beazley, Allianz Cyber, AXA Pro IT). Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +120€) pour démarrage de mission urgent.',
        },
      ]}
    />
  )
}
