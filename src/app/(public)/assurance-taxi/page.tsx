/**
 * Pilier — Assurance taxi
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance taxi"          → 500 vol, KD 0, CPC 250€ ⭐
 * - "assurance taxi pas cher" → 150 vol, KD 2, CPC 300€
 * - "assurance taxi vtc"      → 100 vol, KD 0, CPC 250€
 * - "assurance taxi parisien" → 100 vol, KD 7, CPC 120€
 * - "assurance taxi axa"      →  90 vol, KD 0, CPC 140€
 * - "devis assurance taxi"    →  90 vol
 * - "meilleur assurance taxi" →  70 vol, KD 0, CPC 170€
 * - Famille cumulée : ~1 510 vol/mois
 *
 * Concurrent benchmark — marché QUASI VACANT :
 * - simplis.fr/.../service-a-la-personne → 18 vis/mois sur "rc pro taxi"
 * - assurup.com/.../rc-pro-chauffeur-taxi → 8 vis/mois
 * - Total capté ~26 vis/mois sur 1 510 vol/mois → 98% du marché vacant !
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-taxi'
const TITLE = 'Assurance taxi — Tarifs 2026, garanties artisan-taxi (ADS)'
const TAGLINE =
  "L'assurance professionnelle dédiée aux taxis : couverture véhicule, RC client, ADS-licence, marchandises transportées, perte d'exploitation. Tarifs négociés à partir de 1 280 €/an."

export const metadata: Metadata = {
  title: `${TITLE} | Vivos Assurance`,
  description:
    "Assurance taxi : pack véhicule pro + RC pro chauffeur, ADS-licence, perte d'exploitation, garanties artisan-taxi. Tarifs à partir de 1 280€/an. Comparatif 6 assureurs spécialisés (AXA, MMA, Allianz, Wakam, Stello). Devis ORIAS sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'assurance taxi est un pack professionnel obligatoire (Code des transports + Code des assurances) qui combine l'assurance du véhicule (responsabilité civile circulation tous risques pro), la responsabilité civile professionnelle vis-à-vis des passagers, la couverture de la licence ADS (Autorisation De Stationnement, valeur 50 000 à 250 000 € selon ville), les garanties spécifiques aux artisans-taxis (perte d'exploitation pendant arrêt de travail, immobilisation du véhicule, vol de la valise) et les garanties propres aux conducteurs salariés ou locataires-gérants. Les tarifs 2026 démarrent à 1 280 € HT/an pour un artisan-taxi province exerçant 200 jours/an, jusqu'à 3 800 € HT/an pour un taxi parisien (G7, G7 Pro, Tax'Up) ou un véhicule haut de gamme. Cette page distingue les obligations propres aux taxis vs VTC, détaille les tarifs par profil et les pièges à éviter (sous-déclaration km annuels, exclusion garantie vol valise)."
      legalReference="Code des transports L. 3120-1 et s. + Code des assurances L. 211-1 (RC obligatoire)"
      isObligatoire={true}
      benefits={[
        {
          icon: '🚖',
          title: 'RC pro chauffeur',
          desc: 'Couverture passagers + tiers + sinistre véhicule. Plafond 5-10 M€ par sinistre',
        },
        {
          icon: '🔑',
          title: 'Garantie ADS / licence',
          desc: "Indemnisation perte/vol licence (valeur 50-250k€ selon ville) — clé de l'activité",
        },
        {
          icon: '💰',
          title: 'À partir de 1 280 €/an',
          desc: 'Artisan-taxi province 200 jours/an. Paris : 2 200-3 800€/an',
        },
        {
          icon: '🛡️',
          title: 'Perte exploitation',
          desc: 'Indemnités journalières si arrêt de travail OU immobilisation véhicule > 7 jours',
        },
      ]}
      sections={[
        {
          h2: 'Différence assurance taxi vs assurance VTC : à ne pas confondre',
          body: (
            <>
              <p>Les 2 statuts sont assurés différemment :</p>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Critère</th>
                    <th className="border p-2 text-left">TAXI (artisan)</th>
                    <th className="border p-2 text-left">VTC</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">
                      <strong>Statut juridique</strong>
                    </td>
                    <td className="border p-2">Artisan, salarié ou locataire-gérant</td>
                    <td className="border p-2">EI, EURL, SARL, SAS (rare en salarié)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Licence</strong>
                    </td>
                    <td className="border p-2">
                      ADS (Autorisation De Stationnement) — délivrée par mairie, valeur 50-250k€
                    </td>
                    <td className="border p-2">Carte VTC (Préfecture, gratuite, individuelle)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Maraude</strong>
                    </td>
                    <td className="border p-2">Autorisée (peut prendre client en rue)</td>
                    <td className="border p-2">INTERDITE — réservation préalable obligatoire</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Tarification</strong>
                    </td>
                    <td className="border p-2">Réglementée (compteur Préfecture)</td>
                    <td className="border p-2">Libre (mais affichée avant départ)</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      <strong>Tarif assurance moyen 2026</strong>
                    </td>
                    <td className="border p-2">1 280 – 3 800 €/an</td>
                    <td className="border p-2">
                      650 – 1 400 €/an (voir notre page /assurance-vtc)
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-3">
                <strong>Pour les chauffeurs faisant les 2 (taxi + VTC sur 2 véhicules)</strong>, des
                contrats « bi-statut » existent — souvent 15-20% moins chers que 2 contrats séparés.
                À demander explicitement au courtier.
              </p>
            </>
          ),
        },
        {
          h2: 'Tarifs assurance taxi 2026 par profil',
          body: (
            <>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Profil</th>
                    <th className="border p-2 text-left">Zone</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Artisan-taxi solo, 35 ans, sans antécédent</td>
                    <td className="border p-2">Province (≤ 100k hab)</td>
                    <td className="border p-2 text-right">1 280 € – 1 880 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Artisan-taxi 40 ans</td>
                    <td className="border p-2">
                      Grande ville régionale (Lyon, Marseille, Bordeaux)
                    </td>
                    <td className="border p-2 text-right">1 680 € – 2 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Artisan-taxi parisien (G7, G7 Pro)</td>
                    <td className="border p-2">Paris IDF zone dense</td>
                    <td className="border p-2 text-right">2 200 € – 3 200 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Taxi haut de gamme (Mercedes Classe E, Audi A6)</td>
                    <td className="border p-2">Paris</td>
                    <td className="border p-2 text-right">2 800 € – 3 800 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Taxi moto (2 roues)</td>
                    <td className="border p-2">Paris IDF</td>
                    <td className="border p-2 text-right">920 € – 1 580 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">
                      Taxi locataire-gérant (utilise ADS d&apos;un autre)
                    </td>
                    <td className="border p-2">Province</td>
                    <td className="border p-2 text-right">980 € – 1 480 €</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Salarié de société de taxi</td>
                    <td className="border p-2">Toute zone</td>
                    <td className="border p-2 text-right">~50% pris en charge employeur</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs italic text-gray-600">
                Variables : km annuels (forfait 30k / 50k / 80k+ km), antécédents accidentels 3
                dernières années, ancienneté permis B + carte pro &gt; 3 ans (-15%), zone
                géographique, modèle véhicule (Tesla Model S Paris : majoration +25%).
              </p>
            </>
          ),
        },
        {
          h2: 'Les 6 garanties indispensables pour un taxi',
          body: (
            <>
              <ol>
                <li>
                  <strong>RC pro circulation tous risques</strong> — base : passagers + tiers +
                  véhicule. Plafond corporel ILLIMITÉ (obligation Code des assurances)
                </li>
                <li>
                  <strong>Garantie ADS / licence</strong> — indemnise la valeur de remplacement de
                  la licence en cas de perte/vol/destruction administrative. ADS Paris ~ 200k€,
                  Marseille ~ 160k€, Lyon ~ 120k€
                </li>
                <li>
                  <strong>Bris de glace + vandalisme + vol</strong> avec franchise réduite (taxi en
                  stationnement nocturne = forte exposition)
                </li>
                <li>
                  <strong>Garantie vol des effets personnels du chauffeur</strong> (téléphone,
                  valise, portefeuille) — souvent EXCLUE en option
                </li>
                <li>
                  <strong>Indemnités journalières en cas d&apos;arrêt de travail</strong> (maladie,
                  accident) ou immobilisation véhicule &gt; 7 jours. Critique pour artisan solo
                </li>
                <li>
                  <strong>Protection juridique conducteur</strong> — défense en cas de litige
                  client, contrôle URSSAF, infraction Code de la route disputée
                </li>
              </ol>
              <p>Garanties optionnelles selon profil :</p>
              <ul>
                <li>Garantie « véhicule de remplacement » 24h/24 (nécessaire si artisan solo)</li>
                <li>Cyber pro (terminal CB, application réservation, base clients)</li>
                <li>
                  Garantie agression — capital décès/invalidité du chauffeur (taxis nocturnes
                  urbains)
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Le piège #1 : la sous-déclaration kilométrique',
          body: (
            <>
              <p>
                C&apos;est <strong>l&apos;erreur la plus coûteuse</strong> chez les taxis : déclarer
                un forfait 30 000 km/an pour économiser sur la prime, alors qu&apos;on roule en
                réalité 60 000 km/an. En cas de sinistre, l&apos;assureur applique :
              </p>
              <ul>
                <li>
                  <strong>Règle proportionnelle</strong> : indemnisation au prorata du forfait
                  souscrit
                </li>
                <li>
                  <strong>Refus de prise en charge</strong> en cas d&apos;écart majeur (&gt; 50%) —
                  fausse déclaration considérée comme dolosive
                </li>
                <li>
                  <strong>Résiliation</strong> du contrat à effet immédiat avec impossibilité de
                  souscrire ailleurs pendant 3 ans
                </li>
              </ul>
              <p>
                <strong>Bonne pratique</strong> : déclarer le forfait JUSTE au-dessus de votre
                kilométrage réel prévisionnel, faire un point en cours d&apos;année si changement
                notable (changement de zone d&apos;activité, augmentation course événementielle).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: "L'assurance taxi est-elle obligatoire ?",
          a: "Oui, doublement : (1) RC circulation obligatoire pour TOUT véhicule (Code des assurances L. 211-1), (2) RC pro chauffeur de taxi exigée pour conserver la carte professionnelle (Code des transports). Sanctions : 75 000€ amende + interdiction d'exercer + responsabilité personnelle illimitée en cas de sinistre corporel.",
        },
        {
          q: 'Combien coûte une assurance taxi en 2026 ?',
          a: 'Démarre à 1 280€/an pour un artisan-taxi province sans antécédent. Médiane : 1 680-2 480€/an. Paris : 2 200-3 800€/an. Variables : km annuels, antécédents accidentels, ancienneté carte pro, zone géographique, modèle véhicule (haut de gamme = +25-40%).',
        },
        {
          q: "L'ADS est-elle assurable ?",
          a: "OUI — garantie « ADS / Licence » indispensable pour les artisans-taxis. Indemnise la valeur de remplacement de la licence en cas de perte, vol ou destruction administrative. Coût garantie ADS : inclus dans les contrats spécialisés taxi. Sans cette garantie, perte d'une ADS = ruine personnelle (valeur 50-250k€ selon ville, 200k€ à Paris).",
        },
        {
          q: 'Différence assurance taxi et assurance VTC ?',
          a: "TAXI = artisan avec ADS (valeur 50-250k€), maraude autorisée, tarification réglementée. Assurance 1 280-3 800€/an. VTC = carte préfectorale gratuite, réservation préalable obligatoire, tarification libre. Assurance 650-1 400€/an. Les 2 statuts sont assurables avec un contrat « bi-statut » si vous exercez les 2 (~15-20% d'économie vs 2 contrats séparés).",
        },
        {
          q: 'Mon taxi est volé pendant la nuit, suis-je couvert ?',
          a: 'Oui si la garantie « vol » est souscrite (incluse dans tous les contrats taxi standards). MAIS le « vol des effets personnels du chauffeur » (téléphone, valise pro, portefeuille, terminal CB) est souvent EN OPTION. À vérifier explicitement à la souscription — coût modeste (~30-50€/an) pour un risque réel.',
        },
        {
          q: 'Locataire-gérant taxi : qui doit assurer le véhicule ?',
          a: "Le locataire-gérant (chauffeur) doit assurer SA RC pro chauffeur + son éventuelle indemnité d'arrêt. Le propriétaire de l'ADS reste responsable de l'assurance de la licence (sauf accord contraire dans le bail). À la signature du bail, demander une attestation d'assurance locataire-gérant taxi VALIDE — l'absence engage la responsabilité du propriétaire ADS.",
        },
        {
          q: 'Combien de temps pour obtenir un devis assurance taxi ?',
          a: 'Devis personnalisé via notre formulaire : 24h ouvrées avec 3 propositions de nos 6 assureurs partenaires (AXA Pro Taxi, MMA Pro, Allianz Pro, Wakam, Stello, Generali Mobility). Souscription : 24-48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +120€).',
        },
      ]}
    />
  )
}
