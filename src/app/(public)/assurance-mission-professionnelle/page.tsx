/**
 * Pilier — Assurance mission professionnelle
 * KW Ahrefs : "assurance mission professionnelle" 150 vol KD 0 CPC 140€
 * Famille connexe : "auto-mission", "véhicule mission collaborateur"
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
const SLUG = 'assurance-mission-professionnelle'
const TITLE = 'Assurance mission professionnelle — Auto-mission salarié 2026'
const TAGLINE =
  "L'assurance mission pour les déplacements pro de vos salariés avec leur véhicule perso : RC employeur, garantie tous risques mission, prise en charge sinistre."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance mission professionnelle : couverture des déplacements pro de vos salariés avec leur véhicule personnel (auto-mission). RC employeur + garantie tous risques mission. Tarifs 480-1 800€ par an. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance mission professionnelle (souvent appelée « auto-mission collaborateur ») couvre les déplacements professionnels effectués par vos SALARIÉS avec leur véhicule PERSONNEL : RDV client, formation, congrès, intervention sur site. Pour l'employeur : 2 options. Option 1 — exiger que chaque salarié déclare son auto-mission à son assureur perso (mais difficile à contrôler + responsabilité employeur si défaut). Option 2 — souscrire une assurance MISSION COLLECTIVE qui couvre TOUS les déplacements pro de TOUS les salariés sur leur véhicule perso (~480-1 800€ par an pour PME 10 salariés). Cette dernière option est PROFESSIONNELLEMENT RECOMMANDÉE car protège la responsabilité de l'employeur en cas de sinistre causé par un salarié en mission, sans dépendre des assurances individuelles. Tarifs 2026 : 480 € par an pour PME 5 salariés jusqu'à 4 800 € par an pour ETI 100 salariés. Cette page distingue auto-mission individuelle vs collective et détaille la responsabilité employeur."
      legalReference="Code du travail (responsabilité employeur) + Code des assurances L. 211-1 + Convention collective"
      isObligatoire={false}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '🚗',
          title: 'Véhicule perso salarié',
          desc: 'Couvre les déplacements pro de vos salariés sur leur propre véhicule (RDV client, formation)',
        },
        {
          icon: '⚖️',
          title: 'RC employeur',
          desc: "Protège votre responsabilité d'employeur en cas de sinistre causé par salarié en mission",
        },
        {
          icon: '🛡️',
          title: 'Tous risques mission',
          desc: 'Couvre dommages au véhicule du salarié pendant la mission (avantage en nature pour le salarié)',
        },
        {
          icon: '💰',
          title: 'À partir de 480 € par an',
          desc: 'PME 5 salariés. PME 20 salariés : 980-1 800€ par an. ETI 100 salariés : 3 800-4 800€ par an',
        },
      ]}
      sections={[
        {
          h2: 'Auto-mission individuelle vs collective : 2 approches',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">Individuelle (chaque salarié)</th>
                    <th className="border p-2 text-left">Collective (employeur)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Coût</strong>
                    </td>
                    <td className="border p-2">+80-150€ par an payés par chaque salarié</td>
                    <td className="border p-2">480-4 800€ par an payés par l&apos;employeur</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Contrôle employeur</strong>
                    </td>
                    <td className="border p-2">Difficile (faire signer attestation)</td>
                    <td className="border p-2">Total (1 contrat unique)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Responsabilité employeur</strong>
                    </td>
                    <td className="border p-2">Engagée si défaut salarié</td>
                    <td className="border p-2">Couverte par le contrat</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Avantage en nature salarié</strong>
                    </td>
                    <td className="border p-2">Aucun</td>
                    <td className="border p-2">Possible (à déclarer ~10€ par mois)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Recommandation</strong>
                    </td>
                    <td className="border p-2">TPE &lt; 5 salariés en déplacement occasionnel</td>
                    <td className="border p-2">PME ≥ 10 salariés en déplacement régulier</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance mission collective 2026',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-sand-100">
                    <th className="border p-2 text-left">Effectif salariés</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">PME 5 salariés (déplacements occasionnels)</td>
                    <td className="border p-2 text-right">480 € – 780 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 10 salariés (déplacements réguliers)</td>
                    <td className="border p-2 text-right">680 € – 1 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 20 salariés (commerciaux nomades)</td>
                    <td className="border p-2 text-right">980 € – 1 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">PME 50 salariés (force de vente)</td>
                    <td className="border p-2 text-right">1 800 € – 2 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">ETI 100 salariés multi-sites</td>
                    <td className="border p-2 text-right">3 800 € – 4 800 €</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance mission est-elle obligatoire pour l'employeur ?",
          a: "Pas légalement obligatoire au sens strict, mais la RESPONSABILITÉ EMPLOYEUR est ENGAGÉE en cas de sinistre causé par un salarié en mission (jurisprudence constante depuis 1997). Sans assurance mission collective, vous devez exiger de chaque salarié une attestation d'auto-mission individuelle — difficile à contrôler. Recommandation : assurance mission collective dès 10 salariés en déplacement régulier.",
        },
        {
          q: 'Combien coûte une assurance mission collective ?',
          a: '480-780€ par an pour PME 5 salariés (déplacements occasionnels). 680-1 200€ par an pour PME 10 salariés (déplacements réguliers). 1 800-2 800€ par an pour PME 50 salariés (force de vente). 3 800-4 800€ par an pour ETI 100 salariés multi-sites. Variables : fréquence des déplacements, profil conducteurs, kilométrage cumulé estimé.',
        },
        {
          q: 'Différence avec auto-mission individuelle du salarié ?',
          a: "AUTO-MISSION INDIVIDUELLE = chaque salarié déclare son usage pro à son assureur perso (+80-150€ par an payés par le salarié). Difficile à contrôler par l'employeur, responsabilité de l'employeur engagée si défaut. ASSURANCE MISSION COLLECTIVE = contrat unique souscrit par l'employeur qui couvre TOUS les salariés. Contrôle total + responsabilité employeur couverte.",
        },
        {
          q: 'Mon salarié a un sinistre en mission : qui paie ?',
          a: "AVEC assurance mission collective : votre assureur paie (RC tiers + dommages véhicule perso du salarié). SANS assurance mission collective : si le salarié n'avait pas déclaré son auto-mission individuelle, son assureur perso REFUSE l'indemnisation. Le salarié peut alors se retourner contre VOUS (employeur) pour défaut d'information sur l'obligation d'assurance — sinistre à votre charge personnelle.",
        },
        {
          q: 'Combien de temps pour obtenir un devis ?',
          a: '24h via notre formulaire avec 3 propositions (Allianz Pro Mission, AXA Pro, MMA Pro Mobilité, MAAF Pro). Souscription 24-48h. Effet 1er du mois suivant ou immédiat (procédure express +60€).',
        },
      ]}
    />
  )
}
