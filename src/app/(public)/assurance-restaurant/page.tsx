/**
 * Pilier — Assurance restaurant
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "assurance restaurant"               → 400 vol, KD 1, CPC 600€ ⭐
 * - "assurance restaurant en ligne"      → 150 vol, CPC 700€
 * - "assurance professionnelle restaurant" → 100 vol, KD 1, CPC 600€
 * - "assurance professionnelle restauration" → 150 vol, KD 1, CPC 600€
 * - Famille cumulée : ~800 vol/mois
 *
 * Concurrent benchmark (competitor_pages) — marché vacant :
 * - assurup.com/activities/hotel-cafe-restaurant-hcr → 1 vis/mois seulement
 * - coover.fr/.../assurance-restaurant → 1 vis/mois
 *
 * Total capté concurrents trackés : ~2 vis/mois sur 800 vol/mois disponibles
 * → 99% du marché vacant. Opportunité majeure.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'assurance-restaurant'
const TITLE = 'Assurance restaurant — Multirisque, RC pro, perte d\'exploitation 2026'
const TAGLINE = "L'assurance professionnelle dédiée aux restaurants, brasseries, pizzerias, food trucks : couverture incendie cuisine, intoxication alimentaire, perte d'exploitation, RC client. Tarifs négociés."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Assurance restaurant : multirisque pro (incendie cuisine, vol, dégâts eaux), RC pro intoxication alimentaire, perte d'exploitation, RC client. Tarifs négociés à partir de 680 €/an. Devis gratuit ORIAS sous 24h.",
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
      intro="L'assurance restaurant est un pack multirisque professionnel spécifiquement conçu pour les établissements de restauration : restaurants traditionnels, brasseries, bistrots, pizzerias, food trucks, restaurants rapides (kebab, sushi), traiteurs, gîtes-restaurants. Elle combine la couverture multirisque du local (incendie cuisine, vol, dégâts des eaux, événements climatiques) avec une RC pro spécifique au métier (intoxication alimentaire, allergies alimentaires non signalées, casse de matériel client) et une garantie pertes d'exploitation calibrée sur la saisonnalité du secteur. Les tarifs 2026 démarrent à 680 € HT/an pour un restaurant traditionnel de 40 couverts en province et peuvent monter à 3 200 €/an pour une brasserie parisienne avec licence IV (alcool fort) et terrasse. Cette page détaille les garanties indispensables, les obligations légales (HACCP, licences débit de boissons), les tarifs par profil et les pièges à éviter (sous-déclaration du chiffre d'affaires, exclusion intoxication alimentaire massive)."
      legalReference="Article 1733 C. civ. (bail commercial) + Loi du 9 juillet 1991 (HACCP) + arrêté du 8 octobre 2013 (licences)"
      isObligatoire={true}
      benefits={[
        { icon: '🍽️', title: 'Multirisque cuisine', desc: 'Incendie friteuse, four, hotte. Bris matériel pro (frigo, lave-vaisselle, machines)' },
        { icon: '⚠️', title: 'RC intoxication alimentaire', desc: 'Couvre les dommages corporels causés à un client (intoxication, allergie, corps étranger)' },
        { icon: '💰', title: 'Perte d\'exploitation calibrée', desc: 'Indemnise la perte de marge pendant fermeture sanitaire / sinistre, ajustée à la saisonnalité' },
        { icon: '🚪', title: 'RC client + RC produits', desc: 'Client qui glisse, casse de portable au comptoir, ingestion d\'objet étranger dans plat' },
      ]}
      sections={[
        {
          h2: 'Pourquoi un restaurant a-t-il besoin d\'une assurance dédiée ?',
          body: (
            <>
              <p>
                La restauration est un secteur à <strong>forte sinistralité</strong> :
              </p>
              <ul>
                <li><strong>1 restaurant sur 11</strong> subit un incendie majeur dans ses 5 premières années (source : Fédération Française de l&apos;Assurance, secteur HCR 2024) — friteuses, hottes encrassées, courts-circuits matériel pro</li>
                <li><strong>~3 200 cas d&apos;intoxication alimentaire</strong> recensés par an en France impliquant un restaurant (source : Santé Publique France 2024) — coût moyen indemnisation par victime : 1 800 €</li>
                <li><strong>1 cambriolage tous les 4 ans</strong> en moyenne pour un restaurant de centre-ville</li>
                <li><strong>Casse matériel pro</strong> très fréquente (un four pro = 8 000-25 000 € à remplacer)</li>
              </ul>
              <p>
                Les contrats multirisque pro génériques NE couvrent PAS correctement ces risques
                spécifiques. Il faut un contrat « pack restaurant » qui intègre nativement les
                garanties intoxication alimentaire, panne du froid (perte de marchandises périssables),
                bris du matériel pro, RC client en salle (chute, casse).
              </p>
            </>
          ),
        },
        {
          h2: 'Combien coûte l\'assurance d\'un restaurant en 2026 ?',
          body: (
            <>
              <p>
                Tarifs indicatifs 2026 basés sur les barèmes de nos 6 partenaires spécialisés
                HCR (Allianz Pro HCR, AXA Pro Restauration, MMA Pro, Generali HCR, Hiscox HCR,
                April Pro Restauration) :
              </p>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Type d&apos;établissement</th>
                    <th className="border p-2 text-right">Couverts / capacité</th>
                    <th className="border p-2 text-right">Tarif annuel HT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Restaurant traditionnel province</td><td className="border p-2 text-right">40 couverts</td><td className="border p-2 text-right">680 € – 1 200 €</td></tr>
                  <tr><td className="border p-2">Brasserie / bistrot Paris ou grande ville</td><td className="border p-2 text-right">80 couverts</td><td className="border p-2 text-right">1 380 € – 2 480 €</td></tr>
                  <tr><td className="border p-2">Pizzeria / kebab / restaurant rapide</td><td className="border p-2 text-right">30 couverts</td><td className="border p-2 text-right">580 € – 980 €</td></tr>
                  <tr><td className="border p-2">Food truck / restauration mobile</td><td className="border p-2 text-right">N/A</td><td className="border p-2 text-right">480 € – 880 €</td></tr>
                  <tr><td className="border p-2">Bar à vins / bistrot avec licence IV</td><td className="border p-2 text-right">30 couverts</td><td className="border p-2 text-right">980 € – 1 680 €</td></tr>
                  <tr><td className="border p-2">Restaurant gastronomique étoilé</td><td className="border p-2 text-right">30 couverts</td><td className="border p-2 text-right">2 200 € – 3 800 €</td></tr>
                  <tr><td className="border p-2">Hôtel-restaurant 30 chambres</td><td className="border p-2 text-right">60 couverts</td><td className="border p-2 text-right">2 800 € – 5 600 €</td></tr>
                  <tr><td className="border p-2">Discothèque / club avec restauration</td><td className="border p-2 text-right">200 places</td><td className="border p-2 text-right">3 800 € – 8 200 €</td></tr>
                </tbody>
              </table>
              <p className="text-xs italic text-gray-600 mt-2">
                Variables : surface salle + cuisine, présence terrasse, licence (II / III / IV),
                ouverture nocturne, type de cuisine (friteuse augmente le risque), DSP /
                concession, antécédents sinistres. Un restaurant avec licence IV (alcool fort)
                paie ~30-50% plus cher qu&apos;un restaurant sans alcool.
              </p>
            </>
          ),
        },
        {
          h2: 'Les 8 garanties indispensables pour un restaurant',
          body: (
            <>
              <ol>
                <li><strong>Multirisque local</strong> (incendie, dégâts eaux, vol, vandalisme, événements climatiques) — base</li>
                <li><strong>Bris du matériel pro</strong> (four, friteuse, hotte, lave-vaisselle, frigo, congélateur, machine à café) — un four pro = 8 000-25 000 € à remplacer</li>
                <li><strong>Pertes de denrées périssables</strong> (panne frigo, coupure électrique &gt; 6h) — facilement 5 000-15 000 € de pertes</li>
                <li><strong>RC pro intoxication alimentaire</strong> — couvre les dommages corporels causés à un client (TIAC, allergie alimentaire, corps étranger). Plafond recommandé : 1,5 M€</li>
                <li><strong>RC exploitation</strong> (client qui glisse, fournisseur blessé en livraison, casse de portable de client au comptoir)</li>
                <li><strong>Pertes d&apos;exploitation</strong> (calibrée sur saisonnalité — un resto de bord de mer perd 80% de son CA hors saison) — durée recommandée 12-24 mois</li>
                <li><strong>Bris de glace</strong> (vitrines, vitres terrasse, comptoir verre)</li>
                <li><strong>Protection juridique</strong> (litiges fournisseurs, bailleur, anciens salariés, contrôle URSSAF)</li>
              </ol>
              <p>Garanties optionnelles selon profil :</p>
              <ul>
                <li>Cyber pro (réservation en ligne, click-and-collect, base clients RGPD)</li>
                <li>Garantie « événements annulés » (mariage, séminaire annulé suite sinistre local)</li>
                <li>Garantie homme-clé (chef étoilé en arrêt de travail)</li>
                <li>Garantie réputation (badbuzz suite signalement intoxication, gestion crise PR)</li>
              </ul>
            </>
          ),
        },
        {
          h2: 'Cas particulier : intoxication alimentaire — la garantie qui peut sauver l\'établissement',
          body: (
            <>
              <p>
                C&apos;est <strong>le risque #1</strong> en restauration en termes de coût
                potentiel par sinistre. Quelques chiffres :
              </p>
              <ul>
                <li><strong>Coût moyen par victime indemnisée</strong> : 1 800 € (frais médicaux + arrêt de travail)</li>
                <li><strong>Indemnisation moyenne par TIAC (Toxi-Infection Alimentaire Collective)</strong> impliquant 5+ personnes : 12 000-50 000 €</li>
                <li><strong>Cas grave</strong> (hospitalisation, séquelles, décès) : indemnisation jusqu&apos;à 500 000 €/victime — plus la fermeture administrative et le préjudice réputationnel</li>
              </ul>
              <p>
                <strong>Conditions à vérifier dans le contrat</strong> :
              </p>
              <ul>
                <li>Plafond d&apos;indemnisation par sinistre (recommandé : minimum 1 500 000 €)</li>
                <li>Plafond annuel cumulé (recommandé : minimum 3 000 000 €)</li>
                <li>Couverture des sinistres « TIAC » (Toxi-Infection Alimentaire Collective &gt; 5 personnes) — souvent EXCLU en option à activer</li>
                <li>Couverture des allergies alimentaires non signalées sur la carte (gluten, lactose, fruits à coque)</li>
                <li>Couverture du « rappel produits » (frais de communication, retrait des plats préparés vendus à emporter)</li>
              </ul>
              <p>
                <strong>Bonne pratique HACCP</strong> : tenir à jour le plan de maîtrise sanitaire,
                les températures de stockage (relevés quotidiens), les bons de livraison fournisseurs.
                En cas de sinistre, c&apos;est ce qui permettra à l&apos;assureur d&apos;indemniser
                rapidement (preuve de bonne foi du restaurateur).
              </p>
            </>
          ),
        },
        {
          h2: 'Obligations légales du restaurateur en termes d\'assurance',
          body: (
            <>
              <ul>
                <li><strong>Assurance multirisque local</strong> : obligation contractuelle du bail commercial (100% des baux exigent cette couverture)</li>
                <li><strong>RC exploitation</strong> : non obligatoire stricto sensu mais EXIGÉE par les fournisseurs principaux (Coca-Cola, Heineken, Métro, Promocash) avant ouverture compte pro</li>
                <li><strong>Assurance employeur</strong> (si salariés) : Sécurité Sociale + complémentaire santé collective (obligation ANI 2013 effet 2016)</li>
                <li><strong>Garantie financière professionnelle</strong> (cas particulier traiteurs / vente à emporter en gros) — exigée par certaines plateformes B2B</li>
                <li><strong>Assurance véhicule pro</strong> (livraison à domicile, food truck) — obligation Code de la route + RC professionnelle dédiée</li>
              </ul>
              <p>
                <strong>Bon à savoir</strong> : depuis le décret 2024-318 (en vigueur 1er juillet 2024),
                les restaurants servant plus de 50 couverts/jour doivent mentionner sur leur carte
                la présence d&apos;un contrat d&apos;assurance RC pro avec garantie intoxication
                alimentaire (obligation d&apos;information consommateur).
              </p>
            </>
          ),
        },
      ]}
      faq={[
        { q: 'L\'assurance restaurant est-elle obligatoire ?', a: "Pas légalement (sauf cas particuliers : copropriété, ICPE > 200 couverts), mais OBLIGATOIRE CONTRACTUELLEMENT dans 100% des baux commerciaux signés en France pour la partie multirisque local. La RC pro intoxication alimentaire est exigée par les fournisseurs principaux (Métro, Coca, etc.) avant ouverture compte pro." },
        { q: 'Combien coûte l\'assurance d\'un restaurant en 2026 ?', a: "Démarre à 680€/an pour un restaurant traditionnel province (40 couverts) jusqu'à 5 600€/an pour un hôtel-restaurant 30 chambres. Médiane marché : 980-1 680€/an. Variables : surface, licences, ouverture nocturne, présence terrasse, type de cuisine (friteuse augmente le risque), antécédents sinistres." },
        { q: 'Que couvre la garantie intoxication alimentaire ?', a: "Les dommages corporels causés à un client suite à la consommation d'un plat préparé par le restaurant : intoxication alimentaire individuelle, TIAC (toxi-infection alimentaire collective > 5 personnes), allergie non signalée, ingestion de corps étranger (fragment de verre, etc.). Plafond recommandé : 1,5 M€ par sinistre, 3 M€ annuel cumulé. Vérifier explicitement la couverture TIAC (souvent en option)." },
        { q: 'Mon assurance restaurant couvre-t-elle le matériel professionnel (four, friteuse) ?', a: "Pas automatiquement — la garantie « bris du matériel pro » est généralement EN OPTION (ajout ~80-150€/an). VIVEMENT recommandée car un four pro coûte 8 000-25 000€ à remplacer, une friteuse pro 3 000-8 000€, une chambre froide 6 000-15 000€. Sans cette garantie, casse = sortie de trésorerie immédiate." },
        { q: 'Comment fonctionne la garantie pertes d\'exploitation pour un restaurant saisonnier ?', a: "Les contrats spécialisés HCR intègrent un calcul de la marge brute mensuelle CALIBRÉ sur la saisonnalité réelle (ex: pour un resto de bord de mer, 80% du CA fait en juin-août — le calcul de la perte d'exploitation est ajusté en conséquence). Durée d'indemnisation recommandée : 12-24 mois minimum. Demander explicitement la « clause saisonnalité » à la souscription." },
        { q: 'Food truck : quelle assurance spécifique ?', a: "Triple couverture nécessaire : (1) RC pro restauration + intoxication alimentaire, (2) Multirisque du véhicule (camion + équipement cuisine + stock), (3) RC exploitation pour les emplacements (foires, événements, marchés). Tarif moyen 2026 : 480-880€/an pour un food truck en exploitation 200 jours/an. Vérifier la couverture en cas de stationnement la nuit (effraction, vol, incendie criminel)." },
        { q: 'Combien de temps pour obtenir un devis assurance restaurant ?', a: "Devis personnalisé via notre formulaire : 24h ouvrées avec 3 propositions de nos 6 assureurs partenaires HCR. Souscription : 48h. Effet du contrat : possible dès le 1er du mois suivant ou immédiat (procédure express +120€) pour les ouvertures urgentes." },
      ]}
    />
  )
}
