/**
 * Pilier — RC Pro auto-entrepreneur (1 900 vol/mois, KD 7)
 * Source data : Ahrefs 2026-04-29, kw_universe['rc pro auto entrepreneur'] +
 * vert-rc_pro_auto_entrepreneur.json (134 KW).
 *
 * Concurrent direct : simplis.fr (page éditoriale qui capte 1 209 vis/mois sur ce KW).
 * Stratégie : pilier dédié auto-entrepreneur, pas un dispatch métier.
 *
 * Note routing : cette route statique a priorité sur /rc-pro/[slug] dynamique
 * (Next.js : statique > dynamique pour le même path).
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

const SLUG = 'rc-pro / auto-entrepreneur'
const TITLE = 'RC Pro auto-entrepreneur — Tarifs 2026 et obligations légales'
const TAGLINE =
  "L'assurance Responsabilité Civile Professionnelle pour micro-entrepreneurs et auto-entrepreneurs : obligations métier, tarifs négociés à partir de 89€ par an, devis ORIAS sous 24h."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'RC Pro auto-entrepreneur : couverture obligatoire pour 21 métiers, recommandée pour tous. Tarifs négociés à partir de 89€ par an. Conseil ORIAS, attestation immédiate. Devis gratuit sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: TAGLINE,
    url: `${SITE_URL}/${SLUG}`,
    type: 'website',
  },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="La RC Pro (Responsabilité Civile Professionnelle) auto-entrepreneur couvre les dommages corporels, matériels ou immatériels que vous causez à un tiers (client, fournisseur, passant) dans le cadre de votre activité. Elle est légalement obligatoire pour 21 métiers réglementés (BTP, santé, droit, conseil financier, transport...) mais fortement recommandée pour TOUS les auto-entrepreneurs. Les tarifs démarrent à 89 € HT par an pour un freelance digital sans antécédent, et peuvent monter à 800-1 200 € par an pour un consultant IT à fort chiffre d'affaires. Cette page détaille les obligations par métier, les tarifs 2026 par activité et les pièges à éviter (sous-déclaration de CA, exclusion de garantie cyber, absence d'indemnisation après cessation)."
      legalReference="Article L. 113-1 du Code des assurances + obligations métier (L. 241-1 BTP, L. 1142-2 santé, L. 6321-1 transport...)"
      isObligatoire={true}
      socialProofStats={STATS_DEFAULT}
      calculatorGarantie="rc-pro"
      expertBio={EXPERT_SERVICES}
      comparatifRows={COMPARATIF_SERVICES}
      benefits={[
        {
          icon: '⚖️',
          title: '21 métiers obligatoires',
          desc: 'BTP, santé, juridique, conseil financier, transport, sport, esthétique...',
        },
        {
          icon: '💰',
          title: 'À partir de 89 € par an',
          desc: 'Freelance digital sans antécédent. Tarif moyen secteur 180-340 € par an',
        },
        {
          icon: '⚡',
          title: 'Attestation immédiate',
          desc: 'Téléchargeable dès paiement, mention obligatoire sur devis et factures depuis 2024',
        },
        {
          icon: '📋',
          title: 'Conforme Loi Madelin',
          desc: "Cotisations déductibles si bascule au régime réel d'imposition",
        },
      ]}
      sections={[
        {
          h2: 'RC Pro auto-entrepreneur : obligation / recommandation ?',
          body: (
            <>
              <p>
                La RC Pro est <strong>obligatoire</strong> pour les auto-entrepreneurs exerçant une
                activité réglementée. Voici les principales activités concernées :
              </p>
              <ul>
                <li>
                  <strong>Métiers du BTP</strong> (maçon, plombier, électricien, peintre,
                  couvreur...) — Loi Spinetta + RC Pro travaux
                </li>
                <li>
                  <strong>Professions de santé</strong> (kiné, ostéopathe, psychothérapeute,
                  naturopathe, infirmier libéral) — art. L. 1142-2 CSP
                </li>
                <li>
                  <strong>Professions juridiques</strong> (avocat, notaire, mandataire,
                  expert-comptable indépendant)
                </li>
                <li>
                  <strong>Conseil financier</strong> (CGP, CIF, IOBSP) — homologation ACPR ou AMF
                </li>
                <li>
                  <strong>Transport de personnes</strong> (VTC, taxi, LVC) — RC pro spécifique
                </li>
                <li>
                  <strong>Activités sportives encadrées</strong> (coach sportif, moniteur ski, prof
                  yoga, prof escalade) — code du sport
                </li>
                <li>
                  <strong>Esthétique et soins corporels</strong> (esthéticienne, prothésiste
                  ongulaire, masseur bien-être) si actes invasifs
                </li>
                <li>
                  <strong>Sécurité privée</strong> (agent CNAPS)
                </li>
                <li>
                  <strong>Restauration</strong> (food truck, traiteur) si livraison sur sites tiers
                </li>
              </ul>
              <p>
                Pour les autres activités (consulting, freelance digital, design, e-commerce,
                photographe, rédaction web, formation hors sport ou santé), la RC Pro est{' '}
                <strong>fortement recommandée</strong>
                mais pas légalement obligatoire. En pratique, 78 % des plateformes B2B (Malt, Crème
                de la Crème, ComeUp Pro, Upwork France) exigent une attestation RC Pro pour valider
                votre profil pro et candidater sur les missions.
              </p>
            </>
          ),
        },
        {
          h2: 'Combien coûte une RC Pro auto-entrepreneur en 2026 ?',
          body: (
            <>
              <p>
                Les tarifs 2026 RC Pro auto-entrepreneur dépendent de 4 facteurs : métier, CA
                déclaré, antécédents (sinistralité), territoire d&apos;intervention (France métro vs
                UE vs monde). Fourchettes indicatives basées sur les barèmes 2026 de nos 8
                partenaires (Hiscox, April Pro, MMA, Generali, AXA Pro, Allianz Pro, Wakam, Stello)
                :
              </p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Activité auto-entrepreneur</th>
                    <th className="border p-2 text-left">CA déclaré</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Freelance digital (dev, design, rédaction)</td>
                    <td className="border p-2">&lt; 30 k€</td>
                    <td className="border p-2 text-right">89 € – 180 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant management — marketing</td>
                    <td className="border p-2">30-60 k€</td>
                    <td className="border p-2 text-right">240 € – 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Consultant IT — DevOps freelance</td>
                    <td className="border p-2">60-77 k€ (plafond AE BNC)</td>
                    <td className="border p-2 text-right">480 € – 980 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Coach sportif — prof yoga</td>
                    <td className="border p-2">&lt; 50 k€</td>
                    <td className="border p-2 text-right">160 € – 320 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Esthéticienne — prothésiste ongulaire AE</td>
                    <td className="border p-2">&lt; 50 k€</td>
                    <td className="border p-2 text-right">220 € – 380 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Photographe — vidéaste événementiel</td>
                    <td className="border p-2">&lt; 50 k€</td>
                    <td className="border p-2 text-right">180 € – 320 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Artisan BTP AE (plombier, électricien...)</td>
                    <td className="border p-2">&lt; 77 k€</td>
                    <td className="border p-2 text-right">
                      480 € – 1 200 € (avec décennale couplée)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">VTC AE</td>
                    <td className="border p-2">&lt; 77 k€</td>
                    <td className="border p-2 text-right">650 € – 1 400 € par an</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Tarifs HT, hors options (cyber, RC perso dirigeant, protection juridique). Devis
                personnalisé recommandé via notre formulaire.
              </p>
            </>
          ),
        },
        {
          h2: 'Que couvre exactement une RC Pro auto-entrepreneur ?',
          body: (
            <>
              <p>Garanties standard incluses dans 95 % des contrats RC Pro AE :</p>
              <ul>
                <li>
                  <strong>Dommages corporels causés à un tiers</strong> (client qui se blesse dans
                  vos locaux, passant heurté lors d&apos;une livraison...)
                </li>
                <li>
                  <strong>Dommages matériels causés à un tiers</strong> (vous renversez un café sur
                  le portable d&apos;un client en RDV)
                </li>
                <li>
                  <strong>Dommages immatériels consécutifs</strong> (perte de chiffre
                  d&apos;affaires d&apos;un client suite à une erreur de votre part)
                </li>
                <li>
                  <strong>Faute professionnelle, erreur, omission, négligence</strong> dans
                  l&apos;exécution de votre prestation
                </li>
                <li>
                  <strong>Responsabilité après livraison</strong> (dommages survenant après la fin
                  de votre intervention)
                </li>
              </ul>
              <p>Garanties OPTIONNELLES à ajouter selon métier :</p>
              <ul>
                <li>
                  <strong>RC Cyber</strong> (perte de données client, ransomware, breach RGPD) —
                  recommandée pour freelances digital, ESN, agences web
                </li>
                <li>
                  <strong>RC Perte de chiffre d&apos;affaires du client</strong> — pour consultants
                  IT, conseils financiers
                </li>
                <li>
                  <strong>Protection juridique</strong> — assistance juridique en cas de litige
                  client (factures impayées)
                </li>
                <li>
                  <strong>Garantie biens confiés</strong> — pour photographes, designers manipulant
                  du matériel client
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Les 5 erreurs à éviter avec sa RC Pro auto-entrepreneur',
          body: (
            <>
              <ol>
                <li>
                  <strong>Sous-déclarer son CA</strong> à la souscription pour économiser sur la
                  prime : en cas de sinistre, l&apos;assureur applique la « règle proportionnelle »
                  et indemnise au prorata du CA déclaré. Ex : sinistre 10 000€, CA réel 50k€ mais
                  déclaré 25k€ → indemnisation 5 000€ seulement.
                </li>
                <li>
                  <strong>Oublier la mention obligatoire</strong> de l&apos;assureur + n° de police
                  sur tous les devis et factures depuis le décret 2024 (BTP, santé, transport,
                  conseil financier).
                </li>
                <li>
                  <strong>Ne pas déclarer les changements de situation</strong> (nouveau métier,
                  augmentation CA, déménagement) : entraîne nullité du contrat (art. L. 113-2 C.
                  assur.).
                </li>
                <li>
                  <strong>Confondre RC Pro et décennale</strong> dans le BTP : ce sont 2 garanties
                  distinctes, complémentaires, toutes les deux obligatoires pour les artisans BTP.
                  La RC Pro couvre les dommages PENDANT le chantier ; la décennale couvre les
                  dommages PENDANT 10 ANS APRÈS la réception.
                </li>
                <li>
                  <strong>Ne pas activer la « rétroactivité »</strong> à la souscription : protège
                  contre les sinistres survenus avant la souscription mais déclarés après (très
                  utile en cas de plainte client tardive).
                </li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "Tous les auto-entrepreneurs ont-ils l'obligation de souscrire une RC Pro ?",
          a: "Non. Légalement obligatoire uniquement pour 21 métiers réglementés (BTP, santé, juridique, conseil financier, transport, sport, esthétique invasive, sécurité privée). Pour les autres (consulting, digital, e-commerce, photographe, formation hors sport ou santé), elle reste FORTEMENT recommandée — 78% des plateformes B2B la demandent à l'inscription.",
        },
        {
          q: "Quel est le tarif d'une RC Pro auto-entrepreneur en 2026 ?",
          a: 'Démarre à 89€ HT par an pour un freelance digital sans antécédent. Médiane marché : 180-340 € par an. Plafond pratique : 1 200 € par an pour artisan BTP avec décennale couplée, 1 400 € par an pour VTC AE. Tarif fonction du métier, du CA déclaré, des antécédents et du territoire couvert.',
        },
        {
          q: 'Comment obtenir une attestation RC Pro auto-entrepreneur ?',
          a: "Téléchargeable immédiatement après paiement de la première cotisation. Doit obligatoirement mentionner : nom de l'assureur, numéro de police, période de validité, garanties souscrites, plafonds, métier(s) couvert(s) et territoire. Cette attestation doit figurer sur tous vos devis et factures depuis le décret 2024 (pour BTP, santé, transport, conseil financier).",
        },
        {
          q: 'RC Pro auto-entrepreneur : est-elle déductible fiscalement ?',
          a: "Au régime micro-fiscal classique (versement libératoire), NON — pas de déduction possible. Au régime réel d'imposition (option à activer auprès du SIE), OUI — déductible intégralement du bénéfice imposable. À étudier dès que votre bénéfice dépasse ~30 k€ par an.",
        },
        {
          q: "Que se passe-t-il si j'arrête mon auto-entreprise ?",
          a: "À la cessation, vous devez impérativement maintenir la RC Pro pendant la durée de la responsabilité contractuelle restante (souvent 5 à 10 ans selon métier — 10 ans en BTP via la décennale). C'est ce qu'on appelle la « garantie subséquente ». Sans elle, vous restez personnellement responsable sur votre patrimoine en cas de sinistre tardif.",
        },
        {
          q: 'Puis-je changer de RC Pro à tout moment ?',
          a: "Oui depuis la loi Hamon (résiliation infra-annuelle) après 1 an d'engagement. Lettre recommandée ou notification espace assuré. Le nouvel assureur peut faire la démarche pour vous (mandat). Effet : 1er du mois suivant la réception. Penser à activer une « tacite reconduction » sur le nouveau contrat pour éviter une rupture de couverture.",
        },
        {
          q: 'RC Pro et décennale, quelle différence pour un auto-entrepreneur du BTP ?',
          a: "Deux garanties distinctes, toutes les deux obligatoires pour les artisans BTP : RC Pro = couvre les dommages PENDANT le chantier (ex : tuile qui tombe sur la voiture du voisin pendant les travaux). Décennale = couvre les dommages PENDANT 10 ANS APRÈS RÉCEPTION qui affectent la solidité de l'ouvrage (ex : fissure structurelle qui apparaît 4 ans après). Souvent groupées dans un même contrat « pack BTP » pour ~480 à 1 200 € par an pour un AE.",
        },
      ]}
    />
  )
}
