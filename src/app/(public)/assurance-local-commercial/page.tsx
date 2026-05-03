/**
 * Pilier — Assurance local commercial
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance local commercial"          → 800 vol, KD 0, CPC 600€ ⭐
 * - "assurance local commercial prix"     → 350 vol, KD 1, CPC 450€
 * - "devis assurance local commercial"    → 200 vol, KD 1, CPC 600€
 * - "assurance local commercial en ligne" → 100 vol, KD 3, CPC 600€
 * - "assurance pour local commercial"     → 100 vol, KD 1, CPC 600€
 * - Famille cumulée : ~1 550 vol/mois
 *
 * Concurrent benchmark (competitor_pages) — marché peu adressé :
 * - olino.fr/nos-assurances/assurance-local-professionnel/ → 129 vis/mois
 * - assurup.com/blog/articles/proprietaire-non-occupant-local-commercial → 110 vis/mois
 * - assurup.com/assurance-professionnelle/bureau-local-professionnel → 62 vis/mois
 *
 * Total capté concurrents : ~340 vis/mois sur 1 550 vol/mois disponibles
 * → 78% du marché vacant. Opportunité à fort levier (KD 0).
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-local-commercial'
const TITLE = 'Assurance local commercial — Tarifs 2026, garanties et obligations'
const TAGLINE = "Assurance multirisque pour locaux commerciaux : couverture incendie, vol, dégâts des eaux, perte d'exploitation, RC exploitation. Tarifs négociés à partir de 280 €/an."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Assurance local commercial obligatoire (clause bail commercial) : couverture incendie, dégâts des eaux, vol, vandalisme, RC exploitation, perte d'exploitation. Tarifs négociés à partir de 280 €/an HT. Devis gratuit ORIAS sous 24h.",
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
      intro="L'assurance local commercial (souvent appelée multirisque commerciale ou MRP — Multirisque Professionnelle) est une garantie qui couvre votre lieu d'exploitation contre les principaux risques : incendie, dégâts des eaux, vol, vandalisme, événements climatiques, bris de glace, ainsi que votre responsabilité civile vis-à-vis des tiers (clients, voisins, fournisseurs). Elle est généralement obligatoire de fait : la clause d'assurance figure dans 100% des baux commerciaux signés en France (art. 1733 et 1719 du Code civil — obligation du locataire envers le bailleur). Le tarif moyen pour un local de 80 m² en zone urbaine démarre à 280 € HT/an pour une couverture standard, jusqu'à 1 800 €/an pour un commerce avec stock important ou activité sensible (bijouterie, électronique). Cette page détaille les garanties indispensables, les options à activer selon votre activité (commerce, restaurant, bureau, atelier), les tarifs 2026 par profil et les pièges à éviter (sous-évaluation du contenu, exclusion vol par effraction la nuit)."
      legalReference="Article 1733 et 1719 du Code civil + Loi du 6 juillet 1989 + Loi Pinel 2014 (baux commerciaux)"
      isObligatoire={true}
      benefits={[
        { icon: '🏢', title: 'Multirisque complète', desc: 'Incendie, dégâts eaux, vol, vandalisme, événements climatiques, bris glace, RC exploitation' },
        { icon: '💰', title: 'À partir de 280 €/an', desc: 'Local 80 m² en zone urbaine, couverture standard. Variables : surface, valeur stock, zone' },
        { icon: '📜', title: 'Obligation bail commercial', desc: '100% des baux exigent une assurance MRP — clause de dénonciation possible si défaut' },
        { icon: '⚡', title: 'Perte d\'exploitation', desc: 'Indemnisation des pertes de CA pendant la fermeture suite à sinistre (essentiel pour TPE)' },
      ]}
      sections={[
        {
          h2: 'Pourquoi l\'assurance local commercial est-elle obligatoire ?',
          body: (
            <>
              <p>
                L&apos;obligation d&apos;assurer un local commercial est <strong>contractuelle
                et non strictement légale</strong>. Elle découle de deux sources :
              </p>
              <ul>
                <li><strong>Le bail commercial</strong> (cas le plus fréquent) : 100% des baux types signés en France (modèles Loi Pinel 2014) intègrent une clause obligeant le preneur à souscrire une assurance multirisque couvrant a minima : incendie, dégâts des eaux, vol, RC. Le bailleur peut exiger une copie de l&apos;attestation chaque année. Défaut = motif de résiliation du bail.</li>
                <li><strong>Le statut de copropriétaire commerçant</strong> : si vous êtes propriétaire de votre local en copropriété, le règlement de copropriété impose presque toujours une assurance contre les risques d&apos;immeuble (incendie qui se propage, dégâts d&apos;eau qui inondent les voisins).</li>
              </ul>
              <p>
                Au-delà de l&apos;obligation contractuelle, l&apos;assurance local commercial
                est <strong>économiquement indispensable</strong> : un sinistre incendie moyen
                coûte 75 000 € à 250 000 € pour un commerce de quartier (rachat stock, remise
                en état, pertes d&apos;exploitation pendant fermeture). Une TPE non assurée
                ne s&apos;en relève généralement pas.
              </p>
            </>
          ),
        },
        {
          h2: 'Combien coûte l\'assurance d\'un local commercial en 2026 ?',
          body: (
            <>
              <p>
                Tarifs indicatifs 2026 pour un commerce en France métropolitaine, basés sur
                les barèmes de nos 8 partenaires (Allianz Pro, AXA Pro, MMA Pro, MAAF Pro,
                Generali, Hiscox, April Pro, Wakam) :
              </p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Type de local + activité</th>
                    <th className="border p-2 text-right">Surface</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Bureau / coworking (TPE, conseil, freelance)</td><td className="border p-2 text-right">40 m²</td><td className="border p-2 text-right">280 € – 480 €</td></tr>
                  <tr><td className="border p-2">Boutique vêtements / accessoires</td><td className="border p-2 text-right">80 m²</td><td className="border p-2 text-right">450 € – 780 €</td></tr>
                  <tr><td className="border p-2">Restaurant / brasserie (40 couverts)</td><td className="border p-2 text-right">120 m²</td><td className="border p-2 text-right">680 € – 1 200 €</td></tr>
                  <tr><td className="border p-2">Coiffeur / salon esthétique</td><td className="border p-2 text-right">60 m²</td><td className="border p-2 text-right">380 € – 620 €</td></tr>
                  <tr><td className="border p-2">Bijouterie / horlogerie (stock haute valeur)</td><td className="border p-2 text-right">60 m²</td><td className="border p-2 text-right">980 € – 1 800 €</td></tr>
                  <tr><td className="border p-2">Atelier artisan (menuiserie, mécanique...)</td><td className="border p-2 text-right">150 m²</td><td className="border p-2 text-right">580 € – 980 €</td></tr>
                  <tr><td className="border p-2">Entrepôt / stockage</td><td className="border p-2 text-right">300 m²</td><td className="border p-2 text-right">820 € – 1 540 €</td></tr>
                  <tr><td className="border p-2">Boulangerie / pâtisserie / traiteur</td><td className="border p-2 text-right">100 m²</td><td className="border p-2 text-right">680 € – 1 100 €</td></tr>
                </tbody>
              </table>
              <p className="text-xs italic text-gray-600 mt-2">
                Variables qui font monter la prime : zone à risque incendie (centre-ville historique),
                stock haute valeur (&gt; 50 k€), absence de système d&apos;alarme/vidéosurveillance,
                ancienneté du local, antécédents sinistres. Réduction possible : -10 à -25% avec
                alarme certifiée NF + porte blindée + télésurveillance.
              </p>
            </>
          ),
        },
        {
          h2: 'Les 7 garanties indispensables pour un local commercial',
          body: (
            <>
              <ol>
                <li><strong>Incendie + foudre + explosion</strong> — base de tout contrat MRP. Couvre les dommages au local, au mobilier, aux marchandises stockées.</li>
                <li><strong>Dégâts des eaux</strong> — fuite, infiltration, débordement, gel des canalisations. ATTENTION à la franchise (souvent 250-500€).</li>
                <li><strong>Vol + vandalisme + détérioration</strong> — vérifier que le vol par EFFRACTION DE NUIT est inclus (clause classique d&apos;exclusion).</li>
                <li><strong>Événements climatiques</strong> — tempête, grêle, neige, gel, mouvement de terrain. Catnat (catastrophes naturelles) inclus si état d&apos;urgence déclaré par arrêté.</li>
                <li><strong>Bris de glace</strong> — vitrines, glaces de porte, panneaux publicitaires. Indispensable pour les commerces de rue.</li>
                <li><strong>Responsabilité civile exploitation</strong> — couvre les dommages causés à un tiers (client qui glisse, fournisseur blessé, voisin inondé).</li>
                <li><strong>Perte d&apos;exploitation</strong> — indemnise la perte de chiffre d&apos;affaires pendant la durée de fermeture suite à sinistre. Calcul : marge brute × durée. Souvent oublié, pourtant CRITIQUE pour la survie de la TPE.</li>
              </ol>
              <p>
                Garanties optionnelles selon activité :
              </p>
              <ul>
                <li>Bris de matériel pro (frigo, four, machine outil)</li>
                <li>Marchandises transportées (livraison à domicile)</li>
                <li>Cyber pro (e-commerce, click-and-collect, base clients)</li>
                <li>Protection juridique (litiges fournisseurs / bailleur / clients)</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Les 5 erreurs qui font perdre l\'indemnisation',
          body: (
            <>
              <ol>
                <li><strong>Sous-évaluer la valeur du contenu</strong> (mobilier + matériel + stock) : règle proportionnelle appliquée. Si vous déclarez 30 k€ de contenu mais que la réalité est 60 k€, indemnisation au prorata = 50% du préjudice réel. Faire un inventaire annuel.</li>
                <li><strong>Ne pas activer la clause « valeur à neuf »</strong> : sans elle, indemnisation à valeur d&apos;usage (vétusté déduite) — souvent 50-70% de la valeur de remplacement réelle.</li>
                <li><strong>Oublier de déclarer le télétravail / l&apos;e-commerce</strong> qui modifient l&apos;exposition au risque (ex: fréquence de présence dans le local, stock additionnel).</li>
                <li><strong>Ne pas installer les protections exigées au contrat</strong> (alarme NF, porte blindée, rideau métallique) : exclusion de garantie en cas de vol.</li>
                <li><strong>Confondre incendie « dommages directs » et « pertes d&apos;exploitation »</strong> : sans la garantie pertes d&apos;exploitation, vous récupérez le local refait à neuf mais aurez perdu 3-6 mois de CA sans compensation.</li>
              </ol>
            </>
          ),
        },
      ]}
      faq={[
        { q: 'L\'assurance local commercial est-elle obligatoire ?', a: "Pas légalement (sauf cas particuliers : copropriété, ICPE), mais obligatoire CONTRACTUELLEMENT dans 100% des baux commerciaux signés en France. Défaut d'assurance = motif de résiliation du bail. Si vous êtes propriétaire de votre local : obligation contractuelle vis-à-vis du règlement de copropriété." },
        { q: 'Combien coûte l\'assurance d\'un local commercial de 80 m² ?', a: "Démarre à 450€/an pour une boutique vêtements en province, jusqu'à 1 800€/an pour une bijouterie en centre-ville Paris. Médiane marché : 580-820€/an. Variables : surface, valeur du stock, zone géographique, présence d'alarme/vidéosurveillance, antécédents sinistres." },
        { q: 'Quelle est la différence entre assurance local commercial et multirisque pro (MRP) ?', a: "Aucune en pratique — ce sont les deux noms du même produit. « Assurance local commercial » est le nom marketing utilisé pour les commerces. « Multirisque professionnelle » (MRP) est le terme assurantiel technique, utilisé aussi pour les bureaux, ateliers, entrepôts. Le contrat couvre les mêmes garanties." },
        { q: 'Que couvre exactement la garantie « pertes d\'exploitation » ?', a: "Compense la perte de marge brute pendant la durée de fermeture du local suite à un sinistre couvert (incendie, dégâts des eaux, vol, etc.). Calcul : marge brute mensuelle × durée d'indisponibilité (jusqu'à 12-24 mois selon contrat). Souscription FORTEMENT recommandée pour les TPE — un commerce sans cette garantie ne survit généralement pas à 3+ mois de fermeture forcée." },
        { q: 'Mon assurance local commercial couvre-t-elle le vol par effraction la nuit ?', a: "Pas automatiquement. C'est l'une des EXCLUSIONS LES PLUS FRÉQUENTES — à VÉRIFIER explicitement dans les conditions générales. Si exclu, l'assureur exige souvent l'installation d'une alarme certifiée NF en service la nuit + télésurveillance, ou un rideau métallique. Sans ces dispositifs : vol non indemnisé." },
        { q: 'Comment résilier mon assurance local commercial ?', a: "Depuis la loi Hamon (15/03/2014), résiliation infra-annuelle possible après 1 an d'engagement, sans frais ni motif. Lettre recommandée AR ou notification sur l'espace assuré. Délai d'effet : 1 mois après la réception. Le nouvel assureur peut faire la démarche pour vous (mandat). Cas particulier : changement de propriétaire ou cession du fonds de commerce permettent une résiliation immédiate." },
        { q: 'Combien de temps pour obtenir un devis assurance local commercial ?', a: "Devis personnalisé via notre formulaire : 24h ouvrées avec 3 à 5 propositions adaptées (assureurs comparés : Allianz Pro, AXA Pro, MMA, MAAF, Generali, Hiscox, April, Wakam). Souscription : 48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat selon urgence." },
      ]}
    />
  )
}
