import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { SITE_URL } from '@/lib/seo/config'
import { jsonLdScriptProps } from '@/lib/seo/safe-jsonld'
import { getFAQPageSchema } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'FAQ — Assurance professionnelle 2026 | Assurance Pro',
  description:
    "40+ questions fréquentes sur l'assurance pro : décennale, RC Pro, courtage ORIAS, ACPR, Loi Madelin, sinistre, résiliation. Réponses claires.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'}/faq`,
  },
  openGraph: {
    title: 'FAQ — Assurance professionnelle 2026 | Assurance Pro',
    description: '40+ questions fréquentes sur l\\',
    url: `${SITE_URL}/faq`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ — Assurance professionnelle 2026 | Assurance Pro',
    description: '40+ questions fréquentes sur l\\',
  },
}

interface FaqItem {
  q: string
  a: string
  category: string
}

const FAQ: FaqItem[] = [
  // === Notre cabinet ===
  {
    category: 'Notre cabinet',
    q: "Qu'est-ce qu'un courtier ORIAS ?",
    a: "Un courtier ORIAS est un intermédiaire en assurance immatriculé au Registre Unique des Intermédiaires en Assurance, Banque et Finance (ORIAS). Il représente le client (vous) et compare les offres de plusieurs compagnies pour vous proposer la meilleure couverture. À la différence d'un agent général lié à une seule compagnie, le courtier travaille pour vos intérêts.",
  },
  {
    category: 'Notre cabinet',
    q: 'Quelle est la différence entre courtier et agent général ?',
    a: "L'agent général est mandaté par UNE compagnie d'assurance et ne propose que ses produits. Le courtier est INDÉPENDANT et compare 5-15 compagnies. Le courtier est plus pertinent pour optimiser votre tarif et votre couverture.",
  },
  {
    category: 'Notre cabinet',
    q: 'Combien coûte vos services de courtage ?',
    a: "Aucun frais de courtage n'est facturé à nos clients. Notre rémunération provient exclusivement des commissions versées par les compagnies d'assurance partenaires (transparence DDA, art. L. 521-2 C. assur.). Cette information est communiquée par écrit avant toute souscription.",
  },
  {
    category: 'Notre cabinet',
    q: "Combien d'assureurs comparez-vous ?",
    a: 'Nous travaillons avec 10 assureurs partenaires : Hiscox, April Pro, Allianz Pro, MMA Pro, Generali Pro, AXA Pro, MAAF Pro, SMABTP, Wakam et Stello. Selon votre profil, nous interrogeons les 3-5 plus pertinents.',
  },

  // === Décennale BTP ===
  {
    category: 'Décennale BTP',
    q: "L'assurance décennale est-elle vraiment obligatoire ?",
    a: "Oui, c'est une obligation légale (Loi Spinetta du 4 janvier 1978 + art. L. 241-1 du Code des assurances) pour tout professionnel du BTP qui réalise des travaux affectant la solidité de l'ouvrage ou le rendant impropre à sa destination. Sanctions en cas de défaut : 75 000 € d'amende et 6 mois d'emprisonnement.",
  },
  {
    category: 'Décennale BTP',
    q: "L'auto-entrepreneur BTP doit-il avoir une décennale ?",
    a: "Oui. L'obligation s'applique à TOUS les statuts juridiques, y compris les auto-entrepreneurs et micro-entrepreneurs du BTP. L'amende prévue (75 000 €) est identique. Notre cabinet propose des contrats spécifiques AE à partir de 35€/mois selon le métier.",
  },
  {
    category: 'Décennale BTP',
    q: "Puis-je commencer un chantier avant d'avoir la décennale ?",
    a: "NON. La décennale doit être active AVANT l'ouverture du chantier. Avec notre cabinet, l'attestation est délivrée sous 24 heures après validation de votre dossier. Pour les chantiers urgents, une couverture provisoire peut être négociée.",
  },
  {
    category: 'Décennale BTP',
    q: 'Que se passe-t-il si plusieurs assureurs me refusent ?',
    a: 'Vous pouvez saisir le Bureau Central de Tarification (BCT) qui obligera un assureur à vous couvrir au tarif fixé. Notre cabinet vous accompagne dans cette démarche et vous propose les assureurs spécialisés dans les profils difficiles (jeunes entreprises, antécédents sinistres).',
  },
  {
    category: 'Décennale BTP',
    q: 'La décennale couvre-t-elle les travaux en sous-traitance ?',
    a: "Oui, sous conditions. Le sous-traitant DOIT avoir sa propre décennale active. Le donneur d'ordre engage sa responsabilité s'il fait appel à un sous-traitant non couvert. Demandez systématiquement l'attestation de votre sous-traitant avant le chantier.",
  },

  // === RC Pro ===
  {
    category: 'RC Pro',
    q: 'La RC Pro est-elle obligatoire ?',
    a: 'Oui pour les professions réglementées (médecins, avocats, agents immobiliers, experts-comptables, agences de voyage, IOBSP, architectes…). Pour les autres (consultants, freelances, agences digitales), elle est fortement recommandée et souvent exigée par les clients pros.',
  },
  {
    category: 'RC Pro',
    q: 'Différence entre RC Pro et RC Exploitation ?',
    a: 'La RC Pro couvre les dommages causés DANS LE CADRE de votre prestation (mauvais conseil, erreur professionnelle). La RC Exploitation couvre les dommages causés EN DEHORS de la prestation (un visiteur tombe dans vos locaux). Les deux peuvent être combinées dans un contrat multirisque pro.',
  },
  {
    category: 'RC Pro',
    q: 'Quel plafond de garantie choisir ?',
    a: 'Pour un auto-entrepreneur consultant, 500k-1M€ par sinistre suffit généralement. Pour une agence ou un freelance qui intervient sur des projets stratégiques (>50k€), prévoir 2-3M€. Pour les professions à risque élevé (médical, juridique, IT critique), 5M€+ sont recommandés.',
  },

  // === Mutuelle TNS / Madelin ===
  {
    category: 'Mutuelle TNS / Madelin',
    q: "Qu'est-ce que la Loi Madelin ?",
    a: "La Loi Madelin (1994, art. 154 bis CGI) permet aux Travailleurs Non Salariés de déduire fiscalement les cotisations de mutuelle, prévoyance et retraite. Plafond 2026 : 4 997 €/an. Économie d'impôts moyenne : 30-45% selon votre TMI.",
  },
  {
    category: 'Mutuelle TNS / Madelin',
    q: 'Auto-entrepreneur : Madelin est-il intéressant ?',
    a: 'Pour les AE en micro, la Loi Madelin n\'est PAS applicable (vous êtes au régime micro-fiscal sans bénéfice imposable). Mieux vaut une mutuelle "santé indépendant" non-Madelin, souvent moins chère.',
  },
  {
    category: 'Mutuelle TNS / Madelin',
    q: "Quelle différence entre mutuelle TNS et mutuelle d'entreprise ?",
    a: "La mutuelle d'entreprise (collective) est obligatoirement souscrite par l'employeur pour ses salariés (depuis 2016). La mutuelle TNS est INDIVIDUELLE pour les non-salariés (gérants majoritaires SARL, EI, AE), avec déduction Madelin pour les non-AE.",
  },

  // === Sinistre & gestion ===
  {
    category: 'Sinistre & gestion',
    q: 'Que faire en cas de sinistre ?',
    a: '1) Mettre les personnes en sécurité (urgence). 2) Constater par écrit (constat amiable, photos, témoignages). 3) Déclarer à votre assureur sous les délais (5 jours pour la plupart, 2 jours pour vol). 4) Conserver toutes les preuves (factures, devis réparation). Notre cabinet gère le suivi du dossier pour vous.',
  },
  {
    category: 'Sinistre & gestion',
    q: 'Combien de temps pour être indemnisé ?',
    a: "Cela dépend de la complexité : 15 jours pour un sinistre simple (vol, dégât des eaux clair), 1-3 mois si expertise nécessaire, plusieurs années pour les contentieux décennaux. Notre cabinet accélère les démarches en mobilisant les bons interlocuteurs chez l'assureur.",
  },
  {
    category: 'Sinistre & gestion',
    q: "Comment changer d'assureur ?",
    a: 'Grâce à la Loi Hamon (2014), vous pouvez résilier la plupart des contrats après la 1ère année à tout moment, avec préavis 1 mois. Notre cabinet gère la résiliation et la transition vers le nouveau contrat sans interruption de couverture.',
  },

  // === Tarifs ===
  {
    category: 'Tarifs',
    q: "Comment est calculée ma prime d'assurance ?",
    a: 'Plusieurs facteurs : votre métier (sinistralité), votre CA, votre statut juridique, votre ancienneté, vos antécédents sinistres (3-5 ans), votre zone géographique, les garanties souhaitées. Notre cabinet optimise chaque variable pour réduire votre prime.',
  },
  {
    category: 'Tarifs',
    q: 'Pourquoi mon tarif a-t-il augmenté au renouvellement ?',
    a: 'Plusieurs causes possibles : sinistre déclaré, augmentation du CA, durcissement du marché (réassurance), modification du barème assureur. Si la hausse est >10%, contactez-nous : nous comparons immédiatement avec les concurrents.',
  },
  {
    category: 'Tarifs',
    q: 'Peut-on payer mensuellement ?',
    a: "Oui, la plupart des assureurs acceptent le paiement mensuel (sans frais ou avec frais 1-2%). C'est plus confortable pour la trésorerie mais légèrement plus cher qu'un paiement annuel.",
  },

  // === ACPR / Réclamation ===
  {
    category: 'ACPR / Réclamation',
    q: 'Que faire si je ne suis pas satisfait du service de mon courtier ?',
    a: "Adressez votre réclamation par écrit (email ou courrier) à reclamations@vivos-assurance.fr. Conformément à la Recommandation ACPR 2024-R-02, nous accusons réception sous 10 jours ouvrés et répondons sur le fond sous 2 mois. En cas de désaccord persistant, vous pouvez saisir le Médiateur de l'Assurance.",
  },
  {
    category: 'ACPR / Réclamation',
    q: "Comment vérifier qu'un courtier est ORIAS ?",
    a: 'Sur le site officiel orias.fr, entrez le numéro ORIAS du courtier (8 chiffres). Vous obtenez sa fiche : statut (actif, suspendu, radié), catégorie, immatriculation. Tout courtier sérieux affiche son numéro ORIAS de manière cliquable sur son site (arrêté 6/12/2022).',
  },
  {
    category: 'ACPR / Réclamation',
    q: 'Le courtier peut-il me conseiller un produit non-adapté ?',
    a: 'Non. La DDA (Directive Distribution Assurance, art. L. 521-4 C. assur.) impose au courtier un devoir de conseil personnalisé motivé. Il doit recueillir vos exigences, identifier vos besoins et formuler par écrit la justification du produit choisi. La Reco ACPR 2024-R-03 durcit cette traçabilité.',
  },
]

const CATEGORIES = Array.from(new Set(FAQ.map((f) => f.category)))

export default async function FaqPage() {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">FAQ — Assurance Pro</h1>
          <p className="text-lg text-gray-600">
            Réponses claires aux questions les plus fréquentes sur l\'assurance professionnelle.
          </p>
        </header>

        <nav className="mb-10 flex flex-wrap justify-center gap-2 border-y py-4">
          {CATEGORIES.map((cat) => (
            <a
              key={cat}
              href={`#cat-${cat.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}
              className="rounded bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700 hover:bg-blue-100"
            >
              {cat}
            </a>
          ))}
        </nav>

        <div className="space-y-12">
          {CATEGORIES.map((cat) => (
            <section key={cat} id={`cat-${cat.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}>
              <h2 className="mb-4 border-b pb-2 text-2xl font-bold">{cat}</h2>
              <div className="space-y-3">
                {FAQ.filter((f) => f.category === cat).map((f) => (
                  <details key={f.q} className="group cursor-pointer rounded-lg bg-gray-50 p-5">
                    <summary className="flex list-none items-start justify-between gap-4 font-semibold text-gray-900">
                      <span>{f.q}</span>
                      <span
                        className="flex-shrink-0 text-blue-600 transition group-open:rotate-180"
                        aria-hidden="true"
                      >
                        ▼
                      </span>
                    </summary>
                    <p className="mt-3 leading-relaxed text-gray-700">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-blue-50 p-8 text-center">
          <h2 className="mb-3 text-xl font-bold">Votre question n\'est pas listée&nbsp;?</h2>
          <p className="mb-6 text-gray-700">
            Notre équipe ORIAS répond à toutes vos questions sous 24h ouvrées.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Nous contacter →
          </Link>
        </div>
      </div>

      <script {...jsonLdScriptProps(getFAQPageSchema(FAQ), nonce)} />
    </main>
  )
}
