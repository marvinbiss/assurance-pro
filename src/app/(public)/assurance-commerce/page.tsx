/**
 * Pilier — Assurance commerce
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance commerce"           → 500 vol, KD 1, CPC 500€ ⭐
 * - "assurance commerce prix"      → 200 vol, KD 3, CPC 160€
 * - "axa assurance commerce"       → 150 vol, KD 0, CPC 110€
 * - "tarif assurance commerce"     → 150 vol, CPC 250€
 * - "assurance commerce ambulant"  → 150 vol, KD 0, CPC 250€
 * - "devis assurance commerce"     → 100 vol, CPC 700€ (intent commercial)
 * - Famille cumulée : ~1 710 vol/mois
 *
 * Concurrent benchmark (competitor_pages) :
 * - pro.april.fr/assurance-artisans-activite-professionnelle/assurance-commercant → 288 vis/mois
 * - assurup.com/activities/e-commerce → 50 vis/mois
 * Total capté : ~340 vis/mois sur 1 710 disponibles → 80% du marché vacant.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-commerce'
const TITLE = 'Assurance commerce — Multirisque commerçant 2026 (tarifs, garanties)'
const TAGLINE =
  "L'assurance multirisque dédiée aux commerçants : couverture incendie, vol, dégâts des eaux, perte d'exploitation, RC client, marchandises. Devis gratuit ORIAS sous 24h."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Assurance commerce : multirisque commerçant (vitrine, stock, RC client, perte exploitation), couverture incendie, vol, vandalisme. Tarifs négociés à partir de 380 €/an. Comparatif 8 assureurs. Devis gratuit ORIAS sous 24h.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance commerce est une multirisque pro spécifiquement calibrée pour les commerçants : boutiques, magasins de détail, commerces alimentaires, prêt-à-porter, bijouterie, fleuriste, opticien, librairie, esthéticienne, coiffeur, pressing, tabac-presse, ainsi que les commerces ambulants (food trucks, marchés, foires). Elle couvre les principaux risques : incendie, vol avec effraction, vandalisme, dégâts des eaux, événements climatiques, bris de glace (vitrine), responsabilité civile vis-à-vis des clients (chute, intoxication non-alimentaire, casse de vêtement), pertes d'exploitation pendant la durée de fermeture suite à sinistre, et marchandises stockées. Les tarifs 2026 démarrent à 380 € HT/an pour une boutique 50 m² en province jusqu'à 2 800 €/an pour une bijouterie centre-ville Paris. Cette page détaille les garanties indispensables par type de commerce, les tarifs réels et les pièges à éviter (sous-évaluation du stock, exclusion vol nuit sans alarme NF)."
      legalReference="Article 1733 C. civ. (bail commercial) + clauses standard MRP commerçant"
      isObligatoire={true}
      benefits={[
        {
          icon: '🏪',
          title: 'Multirisque vitrine',
          desc: 'Incendie, vol, vandalisme, bris glace, dégâts eaux, événements climatiques',
        },
        {
          icon: '📦',
          title: 'Marchandises stockées',
          desc: 'Couverture stock à valeur déclarée — penser à mettre à jour avant les soldes',
        },
        {
          icon: '💰',
          title: 'À partir de 380 €/an',
          desc: 'Boutique 50 m² province. Médiane marché 580-980€/an',
        },
        {
          icon: '🚨',
          title: "Perte d'exploitation",
          desc: 'Indemnise la perte de marge pendant fermeture sinistre (essentiel pour TPE)',
        },
      ]}
      sections={[
        {
          h2: "Pourquoi un commerce a-t-il besoin d'une assurance dédiée ?",
          body: (
            <>
              <p>3 raisons cumulatives :</p>
              <ol>
                <li>
                  <strong>Obligation contractuelle du bail commercial</strong> (100% des baux
                  exigent la multirisque)
                </li>
                <li>
                  <strong>Sinistralité élevée du secteur</strong> : 1 commerce sur 7 subit un
                  cambriolage ou une effraction dans ses 5 premières années (FFA 2024)
                </li>
                <li>
                  <strong>Risque RC client élevé</strong> (chute en magasin, casse de vêtement,
                  intoxication non-alimentaire) — un sinistre corporel grave peut atteindre 100-500
                  k€
                </li>
              </ol>
              <p>
                Les contrats multirisque pro génériques (« MRP entreprise ») NE couvrent PAS
                toujours le stock à valeur déclarée, le bris de glace de vitrine et la garantie «
                valeur à neuf » sur le matériel. Un contrat dédié commerce est indispensable.
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance commerce 2026 par type de commerce',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Type de commerce</th>
                    <th className="border p-2 text-right">Surface</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Boutique vêtements / accessoires province</td>
                    <td className="border p-2 text-right">50 m²</td>
                    <td className="border p-2 text-right">380 € – 680 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Boutique vêtements Paris</td>
                    <td className="border p-2 text-right">60 m²</td>
                    <td className="border p-2 text-right">680 € – 1 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Coiffeur / institut beauté</td>
                    <td className="border p-2 text-right">60 m²</td>
                    <td className="border p-2 text-right">420 € – 720 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Fleuriste / animalerie</td>
                    <td className="border p-2 text-right">50 m²</td>
                    <td className="border p-2 text-right">380 € – 620 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Opticien (stock haute valeur)</td>
                    <td className="border p-2 text-right">80 m²</td>
                    <td className="border p-2 text-right">820 € – 1 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Bijouterie / horlogerie centre-ville</td>
                    <td className="border p-2 text-right">60 m²</td>
                    <td className="border p-2 text-right">1 200 € – 2 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Tabac-presse-FDJ</td>
                    <td className="border p-2 text-right">40 m²</td>
                    <td className="border p-2 text-right">
                      680 € – 1 200 € (risque braquage majoré)
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Commerce ambulant / food truck</td>
                    <td className="border p-2 text-right">véhicule</td>
                    <td className="border p-2 text-right">480 € – 880 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Boucherie / poissonnerie</td>
                    <td className="border p-2 text-right">80 m²</td>
                    <td className="border p-2 text-right">580 € – 980 € (panne frigo critique)</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : zone géographique (Paris +30-50% vs province), valeur du stock, présence
                d&apos;alarme NF + télésurveillance (-15 à -25%), antécédents, horaires
                d&apos;ouverture (commerces ouverts la nuit majorés).
              </p>
            </>
          ),
        },
        {
          h2: 'Les 8 garanties indispensables pour un commerce',
          body: (
            <>
              <ol>
                <li>
                  <strong>Multirisque local</strong> : incendie, dégâts eaux, vol effraction,
                  vandalisme, événements climatiques
                </li>
                <li>
                  <strong>Bris de glace</strong> : vitrines, vitres porte, éclairage extérieur,
                  panneaux pub (très fréquent)
                </li>
                <li>
                  <strong>Stock marchandises à valeur déclarée</strong> : à mettre à jour AVANT
                  chaque période haute (soldes, fêtes)
                </li>
                <li>
                  <strong>RC exploitation</strong> : client qui glisse, casse de vêtement, dommage à
                  un tiers
                </li>
                <li>
                  <strong>Pertes d&apos;exploitation</strong> : marge brute × durée de fermeture.
                  Critique pour les TPE
                </li>
                <li>
                  <strong>Frais supplémentaires</strong> : relogement temporaire, communication
                  clients, frais d&apos;expert
                </li>
                <li>
                  <strong>Bris du matériel pro</strong> (frigo pro, terminal CB, coffre, machine
                  spécifique)
                </li>
                <li>
                  <strong>Cyber pro</strong> : caisse connectée, click-and-collect, base clients
                  RGPD, paiement en ligne
                </li>
              </ol>
            </>
          ),
        },
        {
          h2: 'Cas particulier : commerce ambulant / food truck / marchés',
          body: (
            <>
              <p>
                Un commerce ambulant (food truck, marchand sur marchés/foires, vente à domicile)
                cumule 2 risques principaux : véhicule + activité. Son assurance doit couvrir :
              </p>
              <ul>
                <li>
                  <strong>Véhicule professionnel</strong> (auto-mission ou flotte si plusieurs)
                </li>
                <li>
                  <strong>Marchandises transportées</strong> (vol pendant transport, gel, accident)
                </li>
                <li>
                  <strong>RC pro / RC client</strong> sur tous les emplacements occupés (foires,
                  marchés, événements)
                </li>
                <li>
                  <strong>Stationnement nocturne</strong> (effraction, vol, incendie criminel) —
                  clause spécifique à demander
                </li>
                <li>
                  <strong>Matériel embarqué</strong> (frigo, plancha, friteuse, congélateur)
                </li>
              </ul>
              <p>
                Tarif 2026 commerce ambulant : 480-880 €/an pour 200 jours d&apos;exploitation.
                Notre cabinet propose un contrat dédié « Commerce mobile pro » négocié avec Wakam et
                Hiscox.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance commerce est-elle obligatoire ?",
          a: "Pas légalement (sauf cas particuliers : ICPE, copropriété), mais OBLIGATOIRE CONTRACTUELLEMENT dans 100% des baux commerciaux. Défaut d'assurance = motif de résiliation du bail. Si propriétaire de votre local : obligation contractuelle vis-à-vis du règlement de copropriété.",
        },
        {
          q: "Combien coûte l'assurance d'une boutique de 50 m² ?",
          a: "Démarre à 380€/an pour une boutique vêtements en province sans antécédent. Médiane marché : 580-980€/an. Variables : zone géographique (Paris +30-50%), valeur du stock, présence d'alarme NF (-15-25%), horaires d'ouverture (commerces nocturnes majorés).",
        },
        {
          q: 'Comment évaluer correctement la valeur du stock à assurer ?',
          a: 'Faire un INVENTAIRE PHYSIQUE annuel (idéalement avant période haute : soldes, Noël). Inclure stock + matériel pro + agencement intérieur + caisses. Sous-déclarer = règle proportionnelle appliquée en cas de sinistre (indemnisation au prorata du stock déclaré). Ex : sinistre 30k€, stock réel 60k€ déclaré 30k€ → 15k€ versés seulement.',
        },
        {
          q: 'Mon commerce est cambriolé la nuit, suis-je couvert ?',
          a: "Pas automatiquement. La garantie « vol par effraction de nuit » est l'une des EXCLUSIONS LES PLUS FRÉQUENTES — à vérifier explicitement. Si exclu, l'assureur exige généralement l'installation d'une alarme certifiée NF en service la nuit + télésurveillance, ou un rideau métallique baissé. Sans ces dispositifs : sinistre non indemnisé.",
        },
        {
          q: 'Bijouterie : assurance spécifique ou contrat commerce standard suffit ?',
          a: 'ASSURANCE SPÉCIFIQUE OBLIGATOIRE. Les contrats commerce standards excluent les bijoux/montres/métaux précieux au-delà de 5 000-15 000€ de valeur cumulée. Une bijouterie a typiquement 100-500 k€ de stock — il faut un contrat « Joaillerie / Horlogerie » dédié avec coffre certifié EN 1143-1, alarme intrusion certifiée APSAD, télésurveillance et limitation des stocks vitrine. Tarif : 1 200-2 800€/an minimum.',
        },
        {
          q: "Comment fonctionne la perte d'exploitation pour un commerce ?",
          a: "Compense la perte de MARGE BRUTE pendant la durée de fermeture du local suite à sinistre couvert. Calcul : marge brute mensuelle × durée d'indisponibilité (jusqu'à 12-24 mois selon contrat). FORTEMENT recommandée pour les TPE — un commerce sans cette garantie ne survit généralement pas à 3+ mois de fermeture forcée.",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance commerce ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3-5 propositions de nos 8 assureurs partenaires. Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +80€) pour les ouvertures urgentes.',
        },
      ]}
    />
  )
}
