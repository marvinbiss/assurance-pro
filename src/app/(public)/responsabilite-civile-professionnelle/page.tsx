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

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'responsabilite-civile-professionnelle'
const TITLE = 'Responsabilité civile professionnelle — Guide complet 2026 (RCP / RC Pro)'
const TAGLINE = "Tout savoir sur la responsabilité civile professionnelle (RCP) : définition juridique, métiers concernés, plafonds recommandés, tarifs 2026 et différence avec l'assurance décennale."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Responsabilité Civile Professionnelle (RCP / RC Pro) : définition juridique, 21 métiers réglementés, plafonds recommandés (1,5 M€ standard, 5 M€ conseil financier), tarifs 2026, distinction avec décennale et cyber. Guide expert ORIAS.",
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
        { icon: '⚖️', title: '21 métiers obligatoires', desc: 'BTP, santé, juridique, conseil financier (CGP/CIF/IOBSP), transport, sport, esthétique invasive, sécurité' },
        { icon: '🛡️', title: 'Plafond 1,5 à 10 M€', desc: 'Standard 1,5 M€/sinistre. Conseil financier (CGP/CIF) : 5 M€ obligatoire (homologation ACPR)' },
        { icon: '💰', title: 'Tarif 89 € à 5 800 €/an', desc: 'Freelance digital sans antécédent : 89-180 €/an. Cabinet d\'expertise comptable : 1 200-3 800 €/an' },
        { icon: '📋', title: 'Conforme arrêté 2024', desc: 'Mention obligatoire de l\'attestation sur tous les devis/factures depuis 1er juillet 2024' },
      ]}
      sections={[
        {
          h2: 'Définition juridique de la responsabilité civile professionnelle',
          body: (
            <>
              <p>
                La RCP couvre les <strong>3 types de dommages</strong> qu&apos;un professionnel
                peut causer à un tiers dans l&apos;exercice de son activité :
              </p>
              <ul>
                <li><strong>Dommages corporels</strong> : atteinte à l&apos;intégrité physique d&apos;un tiers (client qui se blesse en RDV, passant heurté lors d&apos;une livraison, intoxication non-alimentaire)</li>
                <li><strong>Dommages matériels</strong> : destruction, détérioration ou perte d&apos;un bien d&apos;un tiers (vous renversez un café sur le portable d&apos;un client en RDV)</li>
                <li><strong>Dommages immatériels consécutifs</strong> : perte financière du tiers résultant directement d&apos;un dommage corporel ou matériel (perte de chiffre d&apos;affaires d&apos;un client suite à une erreur de votre part)</li>
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
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Activité</th>
                    <th className="border p-2 text-right">Plafond recommandé / sinistre</th>
                    <th className="border p-2 text-right">Plafond annuel cumulé</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Freelance digital, photographe, formation</td><td className="border p-2 text-right">1 500 000 €</td><td className="border p-2 text-right">3 000 000 €</td></tr>
                  <tr><td className="border p-2">Conseil management, marketing, RH</td><td className="border p-2 text-right">2 000 000 €</td><td className="border p-2 text-right">4 000 000 €</td></tr>
                  <tr><td className="border p-2">Conseil IT / DevOps / cybersécurité</td><td className="border p-2 text-right">5 000 000 €</td><td className="border p-2 text-right">10 000 000 €</td></tr>
                  <tr><td className="border p-2">Cabinet expertise comptable</td><td className="border p-2 text-right">2 500 000 €</td><td className="border p-2 text-right">5 000 000 €</td></tr>
                  <tr><td className="border p-2">CGP / CIF / IOBSP</td><td className="border p-2 text-right">5 000 000 €</td><td className="border p-2 text-right">obligation ACPR</td></tr>
                  <tr><td className="border p-2">Avocat (selon spécialité)</td><td className="border p-2 text-right">5 000 000 €</td><td className="border p-2 text-right">obligation Conseil National</td></tr>
                  <tr><td className="border p-2">Médecin / paramédical</td><td className="border p-2 text-right">8 000 000 €</td><td className="border p-2 text-right">obligation L. 1142-2 CSP</td></tr>
                  <tr><td className="border p-2">Architecte DPLG</td><td className="border p-2 text-right">8 000 000 €</td><td className="border p-2 text-right">obligation Loi MOP</td></tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'RCP vs autres garanties : ne pas confondre',
          body: (
            <>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Garantie</th>
                    <th className="border p-2 text-left">Couvre</th>
                    <th className="border p-2 text-left">Pour qui</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2"><strong>RC Pro / RCP</strong></td><td className="border p-2">Dommages causés à un tiers PENDANT la prestation</td><td className="border p-2">Tous pros</td></tr>
                  <tr><td className="border p-2"><strong>Décennale</strong></td><td className="border p-2">Dommages affectant la solidité de l&apos;ouvrage 10 ANS APRÈS RÉCEPTION</td><td className="border p-2">Artisans BTP uniquement</td></tr>
                  <tr><td className="border p-2"><strong>RC Exploitation</strong></td><td className="border p-2">Dommages causés à un tiers EN DEHORS de la prestation (visiteurs, livreurs)</td><td className="border p-2">Tous pros</td></tr>
                  <tr><td className="border p-2"><strong>Cyber assurance</strong></td><td className="border p-2">Cyberattaque, fuite de données, ransomware</td><td className="border p-2">Tous pros (recommandée)</td></tr>
                  <tr><td className="border p-2"><strong>RC Mandataire social</strong></td><td className="border p-2">Faute de gestion du dirigeant envers la société</td><td className="border p-2">Dirigeants SARL/SAS</td></tr>
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
                <li><a href="/rc-pro" className="text-blue-600 underline">Pilier RC Pro complet</a> — toutes garanties + 30 professions couvertes</li>
                <li><a href="/rc-pro/auto-entrepreneur" className="text-blue-600 underline">RC Pro auto-entrepreneur</a> — guide spécifique AE/micro</li>
                <li><a href="/rc-pro/informatique" className="text-blue-600 underline">RC Pro informatique</a> — métiers IT, ESN, freelance dev (CPC le plus haut du marché)</li>
                <li><a href="/guides/attestation-rc-pro" className="text-blue-600 underline">Guide attestation RC Pro</a> — modèle PDF + mentions obligatoires</li>
              </ul>
            </>
          ),
        },
      ]}
      faq={[
        { q: 'La responsabilité civile professionnelle est-elle obligatoire ?', a: "Légalement obligatoire pour 21 métiers réglementés : BTP (Loi Spinetta + RC travaux), santé (L. 1142-2), juridique (avocat, notaire, expert-comptable), conseil financier (CGP, CIF, IOBSP — homologation ACPR), transport (VTC, taxi, LVC), sport encadré, esthétique invasive, sécurité privée. Pour les autres : pas obligatoire mais EXIGÉE par 78% des plateformes B2B et tous les clients institutionnels." },
        { q: 'Quel plafond de RCP choisir pour mon activité ?', a: "Standard 1,5 M€/sinistre + 3 M€/an pour la majorité des activités. Conseil IT à fort impact : 5 M€ minimum. Conseil financier (CGP/CIF) : 5 M€ obligatoire ACPR. Médecin/paramédical : 8 M€ obligatoire (L. 1142-2 CSP). Architecte : 8 M€ obligatoire (Loi MOP). Plafond trop bas = exposition patrimoine personnel en cas de sinistre majeur." },
        { q: 'Combien coûte une RCP en 2026 ?', a: "Démarre à 89€/an pour un freelance digital sans antécédent. Médiane : 180-340€/an. Plafond pratique : 1 200-3 800€/an pour cabinet d'expertise comptable, 5 800€/an pour CGP/CIF agréé ACPR. Variables : métier, CA déclaré, plafonds choisis, antécédents sinistres, territoire couvert (France métro vs UE vs monde)." },
        { q: 'Différence entre RCP et RC Exploitation ?', a: "RCP = dommages causés à un tiers PENDANT la prestation professionnelle (erreur consultant, faute médicale). RC EXPLOITATION = dommages causés à un tiers EN DEHORS de la prestation (visiteur qui glisse dans vos locaux, livreur blessé). Les 2 sont souvent regroupées dans un même contrat « RC Pro complète » ou « MRP » pour les professionnels avec local." },
        { q: 'La RCP couvre-t-elle les cyberattaques ?', a: "Pas systématiquement. La RCP standard couvre les dommages causés à un tiers MAIS les conséquences d'une cyberattaque (perte de données client, ransomware, breach RGPD) relèvent généralement d'une garantie CYBER ASSURANCE distincte. Certains contrats RCP haut de gamme intègrent un volet cyber limité (50-200 k€) — à vérifier explicitement à la souscription." },
        { q: 'Mon assureur peut-il refuser un sinistre RCP ?', a: "Oui, dans 4 cas principaux : (1) faute intentionnelle (toujours exclue par ordre public), (2) sinistre antérieur à la souscription sans clause de rétroactivité, (3) activité non déclarée à la souscription, (4) plafond annuel cumulé déjà épuisé. Pour limiter les refus : déclarer TOUTES vos activités, activer la rétroactivité, augmenter le plafond annuel si plusieurs sinistres potentiels." },
        { q: 'Combien de temps pour obtenir un devis RCP ?', a: "Devis personnalisé via notre formulaire : 24h ouvrées avec 3-5 propositions de nos 8 partenaires (Hiscox, April Pro, MMA, AXA Pro, Allianz Pro, Generali, Wakam, Stello). Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +120€)." },
      ]}
    />
  )
}
