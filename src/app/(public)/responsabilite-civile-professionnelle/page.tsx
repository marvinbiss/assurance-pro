/**
 * Pilier — Responsabilité Civile Professionnelle (terme institutionnel large)
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "responsabilité civile professionnelle"             → 5 200 vol, KD 22, CPC 350€ ⭐⭐⭐
 * - "assurance responsabilité civile professionnelle"   → 3 100 vol, KD 16, CPC 400€
 * - "responsabilité civile professionnelle tarif"       →   450 vol, KD 0, CPC 200€
 * - "responsabilité civile professionnelle auto entrepreneur" → 450 vol, KD 2, CPC 350€
 * - "assurance responsabilité civile professionnelle auto entrepreneur" → 450 vol, KD 6, CPC 400€
 * - "assurance civile professionnelle"                  → 600 vol, KD 20, CPC 400€
 * - "assurance responsabilité professionnelle"          → 600 vol, KD 22
 * - "devis responsabilité civile professionnelle"       → 200 vol, KD 10, CPC 800€
 * - "responsabilité civile professionnelle informatique" → 100 vol, KD 0, CPC 1300€
 * - "assurance responsabilité civile entreprise"        → 350 vol, KD 10
 * - Famille cumulée : ~12 000 vol/mois
 *
 * Concurrent benchmark (competitor_pages) :
 * - assurup.com/.../responsabilite-civile-pro → 456 vis/mois (top)
 * - coover.fr/responsabilite-civile-pro/assureurs/hiscox → 316 vis/mois
 * - Total capté ~1 100 vis/mois sur ~12 000 disponibles → 91% du marché vacant
 *
 * Stratégie : pilier complémentaire à /rc-pro (qui cible "rc pro" 5 500 vol).
 * Cette page cible le terme institutionnel long "responsabilité civile professionnelle"
 * — utilisé par les juristes, comptables, conseillers financiers.
 */

import Link from 'next/link'
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'responsabilite-civile-professionnelle'
const TITLE = 'Responsabilité civile professionnelle — Guide complet 2026 (RCP / RC Pro)'
const TAGLINE =
  "Tout savoir sur la responsabilité civile professionnelle (RCP) : définition juridique, métiers concernés, plafonds recommandés, tarifs 2026 et différence avec l'assurance décennale."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Responsabilité Civile Professionnelle (RCP / RC Pro) : définition juridique, 21 métiers réglementés, plafonds recommandés (1,5 M€ standard, 5 M€ conseil financier), tarifs 2026, distinction avec décennale et cyber. Guide expert ORIAS.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La Responsabilité Civile Professionnelle (RCP — souvent appelée RC Pro) est la garantie d'assurance qui couvre les conséquences pécuniaires de la responsabilité civile du professionnel envers les tiers (clients, fournisseurs, passants) en cas de dommages corporels, matériels ou immatériels causés dans l'exercice de son activité. Régie par l'article L. 113-1 du Code des assurances et par les codes spécifiques aux professions réglementées (santé, juridique, BTP, conseil financier, transport, sport, sécurité), elle est légalement obligatoire pour 21 métiers et fortement recommandée pour TOUS les professionnels et entreprises. Sans RCP, le patrimoine personnel du chef d'entreprise reste exposé en cas de sinistre — un seul dossier client litigieux peut atteindre 100 000 à 1 500 000 € de dommages et intérêts. Cette page détaille la définition juridique exacte, les plafonds recommandés par activité (1,5 M€ standard, 5 M€ conseil financier homologué), les tarifs 2026, et distingue la RCP de l'assurance décennale (BTP) et de la cyber assurance (data breach)."
      legalReference="Article L. 113-1 du Code des assurances + obligations métier (L. 1142-2 santé, L. 511-1 BTP, L. 6321-1 transport)"
      isObligatoire={true}
      benefits={[
        {
          icon: '⚖️',
          title: '21 métiers obligatoires',
          desc: 'BTP, santé, juridique, conseil financier (CGP/CIF/IOBSP), transport, sport, esthétique invasive, sécurité',
        },
        {
          icon: '🛡️',
          title: 'Plafond 1,5 à 10 M€',
          desc: 'Standard 1,5 M€/sinistre. Conseil financier (CGP/CIF) : 5 M€ obligatoire (homologation ACPR)',
        },
        {
          icon: '💰',
          title: 'Tarif 89 € à 5 800 €/an',
          desc: "Freelance digital sans antécédent : 89-180 €/an. Cabinet d'expertise comptable : 1 200-3 800 €/an",
        },
        {
          icon: '📋',
          title: 'Conforme arrêté 2024',
          desc: "Mention obligatoire de l'attestation sur tous les devis/factures depuis 1er juillet 2024",
        },
      ]}
      sections={[
        {
          h2: 'Définition juridique de la responsabilité civile professionnelle',
          body: (
            <>
              <p>
                La RCP couvre les <strong>3 types de dommages</strong> qu&apos;un professionnel peut
                causer à un tiers dans l&apos;exercice de son activité :
              </p>
              <ul>
                <li>
                  <strong>Dommages corporels</strong> : atteinte à l&apos;intégrité physique
                  d&apos;un tiers (client qui se blesse en RDV, passant heurté lors d&apos;une
                  livraison, intoxication non-alimentaire)
                </li>
                <li>
                  <strong>Dommages matériels</strong> : destruction, détérioration ou perte
                  d&apos;un bien d&apos;un tiers (vous renversez un café sur le portable d&apos;un
                  client en RDV)
                </li>
                <li>
                  <strong>Dommages immatériels consécutifs</strong> : perte financière du tiers
                  résultant directement d&apos;un dommage corporel ou matériel (perte de chiffre
                  d&apos;affaires d&apos;un client suite à une erreur de votre part)
                </li>
              </ul>
              <p>
                3 types de fautes sont couvertes : faute, erreur, omission ou négligence dans
                l&apos;exécution de la prestation. La <strong>faute intentionnelle</strong> reste
                toujours exclue (c&apos;est le principe d&apos;ordre public de l&apos;assurance).
              </p>
            </>
          ),
        },
        {
          h2: 'Plafonds recommandés par activité',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Activité</th>
                    <th className="border p-2 text-right">Plafond recommandé / sinistre</th>
                    <th className="border p-2 text-right">Plafond annuel cumulé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Freelance digital, photographe, formation</td>
                    <td className="border p-2 text-right">1 500 000 €</td>
                    <td className="border p-2 text-right">3 000 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Conseil management, marketing, RH</td>
                    <td className="border p-2 text-right">2 000 000 €</td>
                    <td className="border p-2 text-right">4 000 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Conseil IT / DevOps / cybersécurité</td>
                    <td className="border p-2 text-right">5 000 000 €</td>
                    <td className="border p-2 text-right">10 000 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Cabinet expertise comptable</td>
                    <td className="border p-2 text-right">2 500 000 €</td>
                    <td className="border p-2 text-right">5 000 000 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">CGP / CIF / IOBSP</td>
                    <td className="border p-2 text-right">5 000 000 €</td>
                    <td className="border p-2 text-right">obligation ACPR</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Avocat (selon spécialité)</td>
                    <td className="border p-2 text-right">5 000 000 €</td>
                    <td className="border p-2 text-right">obligation Conseil National</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Médecin / paramédical</td>
                    <td className="border p-2 text-right">8 000 000 €</td>
                    <td className="border p-2 text-right">obligation L. 1142-2 CSP</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Architecte DPLG</td>
                    <td className="border p-2 text-right">8 000 000 €</td>
                    <td className="border p-2 text-right">obligation Loi MOP</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'RCP vs autres garanties : ne pas confondre',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">Couvre</th>
                    <th className="border p-2 text-left">Pour qui</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Pro / RCP</strong>
                    </td>
                    <td className="border p-2">Dommages causés à un tiers PENDANT la prestation</td>
                    <td className="border p-2">Tous pros</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Décennale</strong>
                    </td>
                    <td className="border p-2">
                      Dommages affectant la solidité de l&apos;ouvrage 10 ANS APRÈS RÉCEPTION
                    </td>
                    <td className="border p-2">Artisans BTP uniquement</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Exploitation</strong>
                    </td>
                    <td className="border p-2">
                      Dommages causés à un tiers EN DEHORS de la prestation (visiteurs, livreurs)
                    </td>
                    <td className="border p-2">Tous pros</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Cyber assurance</strong>
                    </td>
                    <td className="border p-2">Cyberattaque, fuite de données, ransomware</td>
                    <td className="border p-2">Tous pros (recommandée)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>RC Mandataire social</strong>
                    </td>
                    <td className="border p-2">Faute de gestion du dirigeant envers la société</td>
                    <td className="border p-2">Dirigeants SARL/SAS</td>
                  </tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Pour aller plus loin',
          body: (
            <>
              <p>Pages-piliers connexes :</p>
              <ul>
                <li>
                  <Link href="/rc-pro" className="text-primary-600 underline">
                    Pilier RC Pro complet
                  </Link>{' '}
                  — toutes garanties + 30 professions couvertes
                </li>
                <li>
                  <Link href="/rc-pro/auto-entrepreneur" className="text-primary-600 underline">
                    RC Pro auto-entrepreneur
                  </Link>{' '}
                  — guide spécifique AE/micro
                </li>
                <li>
                  <Link href="/rc-pro/informatique" className="text-primary-600 underline">
                    RC Pro informatique
                  </Link>{' '}
                  — métiers IT, ESN, freelance dev (CPC le plus haut du marché)
                </li>
                <li>
                  <Link href="/guides/attestation-rc-pro" className="text-primary-600 underline">
                    Guide attestation RC Pro
                  </Link>{' '}
                  — modèle PDF + mentions obligatoires
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Que se passe-t-il si je n'ai pas de RCP et qu'un client engage ma responsabilité ?",
          a: "Action directe de la victime contre vous (art. L. 124-3 Code des assurances). Sans assureur, c'est votre patrimoine personnel qui répond — auto-entrepreneur, EI : biens privés saisissables. Dossier moyen : 30 000 à 250 000 €. Profession réglementée : sanction pénale + radiation possible (avocat, médecin, CGP).",
        },
        {
          q: "Suis-je obligé d'avoir une RCP pour mon activité ?",
          a: 'Légalement OBLIGATOIRE pour 21 métiers réglementés : BTP (Loi Spinetta), santé (L. 1142-2 CSP), juridique (avocat, notaire, expert-comptable), conseil financier (CGP, CIF, IOBSP — homologation ACPR), transport (VTC, taxi), sport encadré, esthétique invasive, sécurité privée. Pour les autres : non obligatoire mais EXIGÉE par 78% des plateformes B2B.',
        },
        {
          q: "Que risque ma profession réglementée si je n'ai pas de RCP ?",
          a: "Avocat : radiation par le Conseil National + sanction disciplinaire. Médecin : suspension par le Conseil de l'Ordre + amende pénale. CGP/CIF/IOBSP : retrait d'agrément ACPR (impossibilité d'exercer). Expert-comptable : sanction Ordre des Experts-Comptables. La RCP est une condition d'inscription au tableau.",
        },
        {
          q: "Mon client B2B peut-il m'imposer une RCP avec plafond élevé ?",
          a: "Oui, c'est une pratique standard en B2B et marchés publics. Les contrats avec grands comptes exigent souvent 2-5 M€ par sinistre, parfois 10 M€ pour l'IT critique. Notre cabinet ORIAS négocie les avenants nécessaires en 48h pour répondre à une exigence client avant signature de mission.",
        },
        {
          q: 'Suis-je couvert si un client me réclame 5 ans après une mission ?',
          a: "Oui si votre contrat fonctionne en « base réclamation » avec garantie subséquente active (standard 5 ans, jusqu'à 10 ans). Si vous avez résilié sans garantie subséquente, le sinistre n'est PAS couvert. Vérifiez TOUJOURS la durée de subséquente avant toute résiliation ou changement d'assureur.",
        },
        {
          q: 'Mon assureur peut-il refuser un sinistre RCP ?',
          a: 'Oui dans 4 cas : (1) faute intentionnelle (toujours exclue par ordre public art. L. 113-1), (2) sinistre antérieur à la souscription sans clause de rétroactivité, (3) activité non déclarée à la souscription, (4) plafond annuel cumulé déjà épuisé. Déclarez TOUTES vos activités et activez la rétroactivité.',
        },
        {
          q: 'La RCP couvre-t-elle une cyberattaque ou fuite de données client ?',
          a: "Pas systématiquement. La RCP standard couvre les dommages causés à un tiers MAIS une cyberattaque (perte de données, ransomware, breach RGPD) relève d'une garantie CYBER ASSURANCE distincte. Certains contrats RCP premium incluent un volet cyber limité (50-200 k€) — à vérifier explicitement à la souscription.",
        },
        {
          q: 'Suis-je couvert pour les missions effectuées avant la souscription ?',
          a: "Uniquement avec une clause de rétroactivité (« reprise du passé »). Standard sans option : non couvert. Notre cabinet négocie une rétroactivité 1 à 5 ans avec Hiscox, April Pro, Stello — indispensable si vous régularisez tardivement votre RCP ou changez d'assureur après plusieurs années d'activité.",
        },
        {
          q: 'Combien ça coûte vraiment une RCP en 2026 ?',
          a: "Démarre à 89 €/an pour un freelance digital sans antécédent (plafond 1,5 M€). Médiane : 180-340 €/an. Cabinet d'expertise comptable : 1 200-3 800 €/an. CGP/CIF agréé ACPR : 2 800-5 800 €/an. Variables : métier, CA déclaré, plafonds choisis, antécédents, territoire (France/UE/monde).",
        },
        {
          q: 'Quel plafond de RCP choisir pour ne pas être sous-couvert ?',
          a: 'Standard 1,5 M€/sinistre + 3 M€/an pour la majorité des activités. Conseil IT à fort impact : 5 M€ minimum. Conseil financier (CGP/CIF) : 5 M€ obligatoire ACPR. Médecin/paramédical : 8 M€ obligatoire (L. 1142-2). Architecte : 8 M€ obligatoire (Loi MOP). Plafond trop bas = exposition patrimoine personnel.',
        },
        {
          q: 'Mon assureur peut-il me résilier après un sinistre ?',
          a: "Oui, après tout sinistre l'assureur dispose d'un délai d'1 mois pour résilier (art. R. 113-10 Code des assurances). Vous bénéficiez du même droit. Si vous êtes résilié, notre cabinet ORIAS vous oriente vers des assureurs spécialisés profils difficiles (Wakam, Stello, Hiscox segments spécifiques).",
        },
        {
          q: 'Puis-je résilier ma RCP à tout moment ?',
          a: "Oui, après 1 an d'engagement vous pouvez résilier à tout moment sans frais ni motif (Loi Hamon 2014, art. L. 113-15-2 Code des assurances). Préavis 1 mois. ATTENTION : conservez la « garantie subséquente » 5 ans minimum pour couvrir les réclamations sur missions anciennes — non négociable.",
        },
        {
          q: 'Puis-je déduire ma prime RCP de mes impôts ?',
          a: 'Oui en intégralité si vous êtes en BIC réel, BNC déclaration contrôlée ou IS (SARL/SAS/EURL) — charge professionnelle déductible 100%. Auto-entrepreneur au micro-BIC/BNC : non déductible (régime forfaitaire), mais la prime reste 100% à votre charge sans franchise ni plafond de remboursement.',
        },
        {
          q: 'Combien de temps pour obtenir mon attestation RCP ?',
          a: 'Via notre formulaire : devis personnalisé sous 24h ouvrées avec 3-5 propositions de nos 8 partenaires (Hiscox, April Pro, MMA, AXA Pro, Allianz Pro, Generali, Wakam, Stello). Souscription : 24-48h. Effet contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +120 €).',
        },
        {
          q: "Combien de temps prend l'indemnisation d'un sinistre RCP ?",
          a: "Délai moyen : 3 à 12 mois selon la complexité (expertise contradictoire, judiciarisation). L'assureur a 30 jours pour proposer une indemnisation après expertise. Préservez TOUTES les preuves dès la mise en cause : e-mails, contrats, livrables, devis, échanges WhatsApp/Slack. Pas d'accord direct avec le client sans avis assureur.",
        },
        {
          q: 'Différence entre RCP et RC Exploitation : laquelle me faut-il ?',
          a: 'RCP = dommages causés à un tiers PENDANT la prestation professionnelle (erreur consultant, faute médicale, audit erroné). RC Exploitation = dommages causés EN DEHORS de la prestation (visiteur qui glisse dans vos locaux, livreur blessé). Les 2 souvent regroupées dans un contrat « RC Pro complète » ou « Multirisque Pro ».',
        },
        {
          q: 'Différence entre RCP et assurance décennale BTP ?',
          a: "La RCP couvre les dommages causés à un tiers PENDANT la prestation (chute d'outil, dégât sur chantier). La DÉCENNALE couvre les désordres affectant la solidité de l'ouvrage 10 ANS APRÈS RÉCEPTION (Loi Spinetta + art. 1792 Code civil). Pour un artisan BTP : les 2 sont OBLIGATOIRES (RC travaux + décennale).",
        },
        {
          q: 'La RCP couvre-t-elle aussi le dirigeant pour faute de gestion ?',
          a: "Non. La RCP couvre l'exercice professionnel de l'entreprise envers les clients/tiers. Pour la faute de gestion du dirigeant (art. L. 223-22 Code de commerce SARL, L. 225-251 SAS), il faut une RC Mandataire Social (D&O) distincte. Indispensable pour les SAS/SARL > 5 salariés ou avec investisseurs.",
        },
      ]}
    />
  )
}
