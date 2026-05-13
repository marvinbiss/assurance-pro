/**
 * Pilier — Assurance médecin (HUB métier global, complémentaire à /rc-pro-medecin)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance médecin"           → 400 vol, KD 0 ⭐ (vacant)
 * - "assurance médecin libéral"   →  50 vol, KD 0, CPC 100€
 * - "assurance médicale professionnelle" → 50 vol
 * - Famille cumulée : ~500 vol/mois
 *
 * Concurrent benchmark : marché VACANT (10 vis/mois capté maximum chez coover).
 *
 * Distinction avec /rc-pro-medecin existant :
 * - /rc-pro-medecin : RC Pro médicale OBLIGATOIRE (Loi Kouchner L. 1142-2 CSP)
 * - /assurance-medecin : HUB GLOBAL — toutes garanties médecin (RC + multirisque
 *   cabinet + mutuelle TNS + prévoyance + cyber + auto-mission)
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-medecin'
const TITLE = 'Assurance médecin — Pack libéral 2026 (RC Kouchner, mutuelle, multirisque)'
const TAGLINE =
  'Le pack assurance complet pour médecins libéraux : RC Pro médicale (Loi Kouchner), multirisque cabinet, mutuelle TNS Madelin, prévoyance, cyber. Conseil ORIAS dédié santé.'

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    'Assurance médecin libéral : RC Pro médicale 8M€ (Loi Kouchner), multirisque cabinet, mutuelle TNS Madelin déductible, prévoyance, cyber RGPD données patients. Pack 2 200-4 800€/an. Comparatif MACSF, Generali, Allianz, Hiscox. Devis ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance médecin libéral est un ensemble de garanties spécifiquement adaptées à l'exercice de la médecine en cabinet privé : RC Pro médicale obligatoire (Loi Kouchner du 4 mars 2002, art. L. 1142-2 du Code de la santé publique), multirisque du cabinet (incendie, vol, dégâts des eaux du local + matériel médical), mutuelle santé TNS déductible Loi Madelin, prévoyance (IJ + invalidité + capital décès), cyber assurance critique (vol de données patients, RGPD santé), et auto-mission pour les visites à domicile. Ces garanties s'appliquent aux médecins généralistes, spécialistes (cardio, dermato, ophtalmo, gynéco, ORL, psychiatre, gastro, endocrino), médecins remplaçants, médecins en SELARL ou SCM, et internes/jeunes installés. Le pack complet 2026 démarre à 2 200 € HT/an pour un médecin généraliste solo en province jusqu'à 7 800 € HT/an pour un cardiologue interventionniste à Paris. Cette page distingue clairement les garanties OBLIGATOIRES (RC médicale Kouchner) des garanties RECOMMANDÉES (cyber, prévoyance) et compare les 4 assureurs spécialistes santé."
      legalReference="Loi Kouchner du 4 mars 2002 + Article L. 1142-2 du Code de la santé publique + Loi Madelin"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚕️',
          title: 'RC Médicale 8 M€',
          desc: 'Plafond standard Loi Kouchner — obligation absolue (sanction radiation)',
        },
        {
          icon: '🏥',
          title: 'Multirisque cabinet',
          desc: 'Incendie, vol, vandalisme, dégâts eaux + matériel médical (échographe, ECG, autoclave)',
        },
        {
          icon: '🔒',
          title: 'Cyber RGPD santé',
          desc: 'CRITIQUE : vol/fuite de données de santé = sanctions CNIL aggravées (RGPD art. 9)',
        },
        {
          icon: '💰',
          title: 'Madelin déductible',
          desc: 'Mutuelle + prévoyance déductibles BNC (économie ~2 000€/an pour 75k€ de bénéfice)',
        },
      ]}
      sections={[
        {
          h2: 'Les 6 garanties indispensables pour un médecin libéral',
          body: (
            <>
              <ol>
                <li>
                  <strong>RC Pro médicale (OBLIGATOIRE Loi Kouchner)</strong> — plafond 8
                  M€/sinistre standard pour médecin généraliste, jusqu&apos;à 15 M€ pour spécialités
                  à risque (chirurgie, anesthésie, gynéco-obstétrique). Voir{' '}
                  <Link href="/rc-pro-medecin" className="text-primary-600 underline">
                    /rc-pro-medecin
                  </Link>
                </li>
                <li>
                  <strong>Multirisque cabinet</strong> — local + mobilier + matériel médical (un
                  échographe = 25-80 k€, un appareil ECG = 3-12 k€, un autoclave = 5-15 k€). Pertes
                  d&apos;exploitation incluses
                </li>
                <li>
                  <strong>Cyber assurance santé</strong> — CRITIQUE depuis 2024. Les données de
                  santé sont des « données sensibles » (RGPD art. 9) → sanctions CNIL aggravées en
                  cas de breach. Coût moyen sinistre cyber santé : 80-300 k€
                </li>
                <li>
                  <strong>Mutuelle TNS Madelin</strong> — santé du médecin déductible BNC. Voir{' '}
                  <Link href="/mutuelle-tns" className="text-primary-600 underline">
                    /mutuelle-tns
                  </Link>
                </li>
                <li>
                  <strong>Prévoyance TNS Madelin</strong> — IJ + invalidité + décès. CRITIQUE pour
                  médecins libéraux (revenus dépendant de la présence physique). Voir{' '}
                  <Link href="/prevoyance-tns" className="text-primary-600 underline">
                    /prevoyance-tns
                  </Link>
                </li>
                <li>
                  <strong>Auto-mission</strong> ou véhicule pro — pour les visites à domicile
                  (extension assurance perso ou contrat dédié)
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance médecin 2026 par spécialité',
          body: (
            <>
              <p>Pack complet (RC Pro + multirisque cabinet + cyber + auto-mission) :</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Spécialité</th>
                    <th className="border p-2 text-right">Plafond RC</th>
                    <th className="border p-2 text-right">Pack annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Médecin généraliste</td>
                    <td className="border p-2 text-right">8 M€</td>
                    <td className="border p-2 text-right">2 200 € – 3 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Cardiologue (non-interventionniste)</td>
                    <td className="border p-2 text-right">10 M€</td>
                    <td className="border p-2 text-right">3 200 € – 4 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Cardiologue interventionniste</td>
                    <td className="border p-2 text-right">15 M€</td>
                    <td className="border p-2 text-right">5 800 € – 7 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Dermatologue</td>
                    <td className="border p-2 text-right">8 M€</td>
                    <td className="border p-2 text-right">2 800 € – 4 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Ophtalmologue (chirurgie réfractive)</td>
                    <td className="border p-2 text-right">15 M€</td>
                    <td className="border p-2 text-right">4 800 € – 7 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Gynécologue-obstétricien</td>
                    <td className="border p-2 text-right">15 M€</td>
                    <td className="border p-2 text-right">
                      6 800 € – 12 000 € (sinistralité élevée)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Anesthésiste-réanimateur</td>
                    <td className="border p-2 text-right">15 M€</td>
                    <td className="border p-2 text-right">8 200 € – 14 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Psychiatre / psychanalyste</td>
                    <td className="border p-2 text-right">8 M€</td>
                    <td className="border p-2 text-right">1 800 € – 3 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Médecin remplaçant (jeune installé)</td>
                    <td className="border p-2 text-right">8 M€</td>
                    <td className="border p-2 text-right">
                      980 € – 1 800 € (tarif jeune installé)
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : antécédents sinistres 5 dernières années (-30 à +50%), volume de
                patientèle, présence de matériel d&apos;imagerie, surface du cabinet, zone
                géographique (Paris +20%). MACSF (mutuelle d&apos;assurance des professions de
                santé) reste leader historique mais notre cabinet compare aussi Generali Santé,
                Allianz Pro Santé, Hiscox Médical.
              </p>
            </>
          ),
        },
        {
          h2: 'Cyber assurance santé : la garantie devenue critique',
          body: (
            <>
              <p>
                Les données de santé sont classées <strong>« données sensibles »</strong>
                par le RGPD (article 9). Conséquences en cas de fuite :
              </p>
              <ul>
                <li>
                  <strong>Sanctions CNIL aggravées</strong> : amendes pouvant atteindre 4% du CA
                  mondial OU 20 M€ (le plus élevé)
                </li>
                <li>
                  <strong>Notification obligatoire</strong> à la CNIL sous 72h + notification
                  individuelle aux patients concernés
                </li>
                <li>
                  <strong>Frais de remédiation</strong> élevés : audit forensique, restauration,
                  mesures correctives, communication crise
                </li>
                <li>
                  <strong>Préjudice réputationnel</strong> majeur (perte de patientèle 30-50%
                  post-incident selon études)
                </li>
              </ul>
              <p>
                Coût moyen 2026 d&apos;un sinistre cyber dans un cabinet médical :{' '}
                <strong>80 000 à 300 000 €</strong>. Tarif d&apos;une cyber assurance santé dédiée :
                400-1 200 €/an. ROI évident dès le 1er incident.
              </p>
              <p>
                <strong>Bonnes pratiques cybersécurité cabinet médical</strong> : hébergeur agréé
                HDS (Hébergeur de Données de Santé), authentification forte sur le DMP, double
                sauvegarde (off-site), chiffrement en transit ET au repos, formation annuelle
                phishing pour le secrétariat.
              </p>
            </>
          ),
        },
        {
          h2: 'Cas particulier : médecin remplaçant ou jeune installé',
          body: (
            <>
              <p>Pour les médecins remplaçants et jeunes installés (&lt; 5 ans) :</p>
              <ul>
                <li>
                  <strong>Tarifs préférentiels</strong> : -30 à -50% vs médecin installé (offre «
                  Jeune installé » MACSF, Generali, Allianz)
                </li>
                <li>
                  <strong>RC Pro médicale</strong> reste OBLIGATOIRE dès le 1er jour de remplacement
                  (Loi Kouchner sans exception)
                </li>
                <li>
                  <strong>Garantie « formation continue »</strong> souvent incluse (couverture
                  pendant DPC, congrès, stages spécialisation)
                </li>
                <li>
                  <strong>Modulation par jour de remplacement</strong> possible chez certains
                  assureurs (alternative au forfait annuel pour les moins de 80 jours/an)
                </li>
                <li>
                  <strong>Pack starter</strong> RC + multirisque + mutuelle TNS de base : 980-1 800
                  €/an pour les 2 premières années
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'Quelles assurances sont obligatoires pour un médecin libéral ?',
          a: "RC Pro médicale (Loi Kouchner du 4 mars 2002, art. L. 1142-2 CSP) — OBLIGATION ABSOLUE dès le 1er jour d'exercice. Sanction absence : radiation du Conseil de l'Ordre + interdiction d'exercer. Plafond minimum 8 M€/sinistre standard, 15 M€ pour spécialités à risque. Assurance véhicule pro (RC circulation) si visites à domicile.",
        },
        {
          q: "Combien coûte l'assurance d'un médecin généraliste en 2026 ?",
          a: 'Pack complet (RC Pro + multirisque cabinet + cyber + auto-mission) : démarre à 2 200€/an pour médecin généraliste solo en province sans antécédent. Médiane marché : 2 800-3 800€/an. Cardiologue interventionniste : 5 800-7 800€/an. Gynéco-obstétricien : 6 800-12 000€/an (sinistralité plus élevée). Anesthésiste : 8 200-14 000€/an.',
        },
        {
          q: 'MACSF ou autre assureur : que choisir ?',
          a: "MACSF (Mutuelle d'Assurance du Corps de Santé Français) est l'assureur historique des professions de santé en France, choisi par défaut par 60% des médecins. Mais NOTRE CABINET compare systématiquement avec Generali Santé, Allianz Pro Santé et Hiscox Médical — économies typiques 15-30% pour des garanties équivalentes ou supérieures. À comparer sur EXACTEMENT le même cahier des charges.",
        },
        {
          q: 'Cyber assurance : utile pour un médecin libéral ?',
          a: "OUI fortement recommandée. Les données de santé sont classées « données sensibles » par le RGPD (article 9) — sanctions CNIL aggravées en cas de breach (jusqu'à 20 M€). Coût moyen sinistre cyber cabinet médical : 80-300 k€. Tarif cyber assurance santé : 400-1 200€/an. ROI évident dès le 1er incident.",
        },
        {
          q: "Loi Madelin : économie d'impôt pour médecin libéral ?",
          a: "Plafond annuel commun santé + prévoyance Madelin pour un médecin BNC dégageant 80 k€ de bénéfice : ~6 626€/an déductibles. À TMI 41% : économie d'impôt nette ~2 700€/an + économie cotisations sociales (~24%). Pour un cardiologue à 150 k€ de bénéfice : plafond ~10 305€/an, économie ~4 200€/an d'impôts.",
        },
        {
          q: 'Médecin remplaçant : tarif préférentiel ?',
          a: 'Oui, -30 à -50% vs médecin installé. Offres « Jeune installé » MACSF / Generali / Allianz : pack starter 980-1 800€/an pour les 2 premières années (vs 2 200-3 800€ médecin installé). Modulation par jour de remplacement disponible chez certains assureurs (alternative au forfait annuel pour < 80 jours/an de remplacement).',
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance médecin ?',
          a: "Devis personnalisé via notre formulaire : 24h ouvrées avec 3 propositions de nos partenaires spécialistes santé (MACSF, Generali Santé, Allianz Pro Santé, Hiscox Médical). Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +120€) pour démarrage d'installation urgent.",
        },
      ]}
    />
  )
}
