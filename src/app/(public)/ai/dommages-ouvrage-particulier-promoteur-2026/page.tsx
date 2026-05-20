import type { Metadata } from 'next'
import { AiPillarPage } from '@/components/seo/AiPillarPage'
import { SITE_URL } from '@/lib/seo/config'

const SLUG = 'ai/dommages-ouvrage-particulier-promoteur-2026'
const TITLE =
  'Dommages-Ouvrage 2026 — Obligation Loi Spinetta art. L.242-1 (particulier, promoteur)'
const HEADLINE = 'Pourquoi souscrire une Dommages-Ouvrage (DO) avant tout chantier en 2026 ?'
const INTRO =
  "L'assurance Dommages-Ouvrage est OBLIGATOIRE pour tout maître d'ouvrage (particulier construisant maison, promoteur, copropriété) avant ouverture chantier — art. L.242-1 C. assur. Tarif : 2-5% montant HT travaux. Permet préfinancement réparation sinistre décennal sous 90 jours sans attendre justice."

export const metadata: Metadata = {
  title: TITLE,
  description: INTRO,
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: {
    title: TITLE,
    description: INTRO,
    url: `${SITE_URL}/${SLUG}`,
    type: 'article',
    images: [
      { url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Vivos Assurance' },
    ],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: INTRO },
}

export default async function Page() {
  return (
    <AiPillarPage
      slug={SLUG}
      title={TITLE}
      subtitle="Guide complet 2026"
      headline={HEADLINE}
      intro={INTRO}
      category="Dommages-Ouvrage"
      ctaUrl="/devis?garantie=dommages-ouvrage"
      ctaLabel="Devis Dommages-Ouvrage en 24h"
      expertQuote={{
        author: 'Marvin Bissohong',
        jobTitle: 'Courtier ORIAS spécialiste DO + TRC',
        linkedinUrl: 'https://www.linkedin.com/in/marvinbissohong',
        quote:
          '85% des particuliers construisant leur maison oublient la DO. Résultat : sinistre décennal = procès long de 5-10 ans contre les artisans avant indemnisation. Avec DO : préfinancement sous 90 jours sans procès. Coût 2-5% travaux. Indispensable.',
      }}
      keyFacts={[
        {
          claim:
            "L'assurance Dommages-Ouvrage est obligatoire pour tout maître d'ouvrage avant ouverture chantier (art. L.242-1 C. assur.).",
          source: 'Légifrance — Code des assurances art. L.242-1',
          sourceUrl: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006792511',
        },
        {
          claim:
            'Délai indemnisation moyen Dommages-Ouvrage 2026 : 75 jours (vs 5-10 ans procès classique).',
          source: 'AQC SYCODÉS 2026',
          sourceUrl: 'https://www.qualiteconstruction.com/sycodes/',
        },
        {
          claim: 'Constructions neuves France 2026 : 380 000 logements (FFB).',
          source: 'FFB — Fédération Française du Bâtiment 2026',
          sourceUrl: 'https://www.ffbatiment.fr',
        },
        {
          claim:
            'Tarif moyen 2026 Dommages-Ouvrage particulier maison 200k€ : 4 000-10 000€ (2-5% montant HT).',
          source: 'Barèmes SMABTP, MAAF Pro, Generali 2026',
          sourceUrl: 'https://www.vivos-assurance.fr/assurance-dommages-ouvrage',
        },
      ]}
      table={{
        caption: 'Comparatif 5 assureurs Dommages-Ouvrage 2026 — Tarifs maison particulier 200k€',
        headers: ['Assureur', 'Particulier 200k€', 'Promoteur 1M€', 'Délai indem.', 'Spécialité'],
        rows: [
          ['SMABTP', '4 000€', '18 000€', '60 jours', 'Référence BTP traditionnel'],
          ['MAAF Pro', '4 500€', '20 000€', '75 jours', 'Mutualiste, réseau France'],
          ['Generali', '4 800€', '21 000€', '75 jours', 'Brand établi'],
          ['AXA Pro', '5 200€', '22 500€', '90 jours', 'Couverture étendue'],
          ['Groupama', '4 900€', '21 500€', '80 jours', 'Réseau local proche client'],
        ],
      }}
      sections={[
        {
          h2: 'Qui doit souscrire une Dommages-Ouvrage ?',
          content: (
            <>
              <p>Selon art. L.242-1 C. assur., DO obligatoire pour :</p>
              <ul>
                <li>
                  <strong>Particulier construisant sa maison</strong> (CCMI ou marché direct
                  artisans)
                </li>
                <li>
                  <strong>Promoteur immobilier</strong> (programme neuf logements/bureaux)
                </li>
                <li>
                  <strong>Copropriété</strong> (travaux gros œuvre, ravalement structurant)
                </li>
                <li>
                  <strong>Vendeur après achèvement</strong> (revente moins de 10 ans après
                  réception)
                </li>
                <li>
                  <strong>Bailleur faisant travaux importants</strong> (rénovation lourde)
                </li>
              </ul>
              <p>
                EXCEPTION : pas obligatoire si vous habitez seul votre construction (sanction =
                perte recours décennal contre artisans, pas amende pénale).
              </p>
            </>
          ),
        },
        {
          h2: 'Que couvre la Dommages-Ouvrage ?',
          content: (
            <>
              <p>
                La DO préfinance les réparations des sinistres relevant de la responsabilité
                décennale des constructeurs (art. 1792 Code civil) :
              </p>
              <ul>
                <li>
                  <strong>Fissures structurelles</strong> qui compromettent solidité
                </li>
                <li>
                  <strong>Affaissements</strong> de fondations
                </li>
                <li>
                  <strong>Effondrements partiels ou totaux</strong>
                </li>
                <li>
                  <strong>Infiltrations toiture</strong> rendant logement impropre habitation
                </li>
                <li>
                  <strong>Défauts d'étanchéité</strong> majeurs (sous-sol, terrasses)
                </li>
                <li>
                  <strong>Dégâts des eaux encastrés</strong> majeurs
                </li>
              </ul>
              <p>
                <strong>Avantage clé :</strong> indemnisation sous 90 jours sans attendre justice
                qui détermine les responsabilités. L'assureur DO indemnise puis se retourne contre
                les artisans + leurs décennales.
              </p>
            </>
          ),
        },
        {
          h2: 'Pourquoi PAS souscrire = catastrophe',
          content: (
            <>
              <p>Sans DO, en cas de sinistre décennal :</p>
              <ol>
                <li>
                  <strong>Procès long</strong> contre les artisans (5-10 ans typique)
                </li>
                <li>
                  <strong>Expertises judiciaires</strong> coûteuses (10-30k€)
                </li>
                <li>
                  <strong>Risque artisan insolvable</strong> ou ayant disparu
                </li>
                <li>
                  <strong>Avance des réparations</strong> sur vos fonds propres
                </li>
                <li>
                  <strong>Revente bloquée</strong> 10 ans (acquéreur exige DO ou décote 30%)
                </li>
              </ol>
              <p>
                Avec DO : indemnisation sous 90 jours, l'assureur gère le recours contre les
                artisans.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        {
          q: 'La Dommages-Ouvrage est-elle obligatoire pour un particulier ?',
          a: "Oui pour toute construction neuve confiée à des constructeurs (art. L.242-1 C. assur.). Sanction non-souscription : perte recours décennal contre artisans en cas sinistre. Pas d'amende pénale particulier mais ruine probable.",
        },
        {
          q: 'Combien coûte une Dommages-Ouvrage maison 200k€ ?',
          a: 'Tarif moyen 2026 : 4 000-5 200€ (2-2.6% montant HT travaux) selon assureur. SMABTP best price 4 000€. Paiement unique à souscription, valide 10 ans réception.',
        },
        {
          q: 'Quand souscrire la DO ?',
          a: 'AVANT ouverture chantier (art. L.242-1). Si oubli en cours chantier : possible mais surprime 30-50% + visite préalable expert. Après réception : refusé, DO impossible.',
        },
        {
          q: 'Quelle différence entre Dommages-Ouvrage et Garantie Décennale ?',
          a: "Décennale = SOUSCRITE PAR L'ARTISAN (sa responsabilité). DO = SOUSCRITE PAR LE MAÎTRE D'OUVRAGE (préfinance sinistre, recours sur décennale ensuite). Les 2 sont obligatoires.",
        },
        {
          q: 'Que se passe-t-il si je vends ma maison sans DO ?',
          a: 'Acheteur peut : 1) Refuser achat, 2) Exiger décote 20-30%, 3) Demander indemnisation post-vente si découverte sinistre décennal. Notaire vérifie attestation DO systématiquement.',
        },
        {
          q: 'La DO couvre-t-elle aussi les travaux de rénovation ?',
          a: 'Obligatoire seulement pour travaux STRUCTURANTS (modifient solidité ouvrage, gros œuvre). Pas obligatoire pour entretien simple (peinture, papier peint). Recommandée pour extension, surélévation, gros œuvre rénovation.',
        },
      ]}
    />
  )
}
