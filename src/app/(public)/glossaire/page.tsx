import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/seo/config'

export const metadata: Metadata = {
  title: 'Glossaire de l\'assurance pro — Définitions claires | Assurance Pro',
  description:
    'Glossaire de l\'assurance professionnelle : 40+ définitions claires (décennale, RC Pro, DDA, Loi Spinetta, Madelin, IPID, ACPR, ORIAS...).',
  alternates: { canonical: `${SITE_URL}/glossaire` },
}

interface Term {
  term: string
  definition: string
  related?: string[]
}

const TERMS: Term[] = [
  {
    term: 'ACPR',
    definition: 'Autorité de Contrôle Prudentiel et de Résolution. Autorité publique française qui supervise les banques et les assurances. Tout courtier ORIAS est soumis à son contrôle (art. L. 612-1 CMF). Sanctions possibles : avertissement, blâme, interdiction d\'exercer, radiation ORIAS, amende jusqu\'à 100 M€.',
    related: ['ORIAS', 'CSCA'],
  },
  {
    term: 'Article 1792 du Code civil',
    definition: 'Texte fondateur de la responsabilité décennale en France. Il établit la présomption de responsabilité des constructeurs pour les dommages compromettant la solidité de l\'ouvrage ou le rendant impropre à sa destination, pendant 10 ans après réception.',
    related: ['Décennale', 'Loi Spinetta'],
  },
  {
    term: 'Attestation décennale',
    definition: 'Document obligatoire à remettre au client AVANT le début des travaux. Mentionne l\'assureur, le numéro de police, la période de validité, la zone géographique couverte et les activités assurées. Depuis 2024, sa mention est obligatoire sur tous les devis et factures.',
  },
  {
    term: 'Auto-entrepreneur (micro-entrepreneur)',
    definition: 'Statut juridique simplifié permettant d\'exercer une activité indépendante. L\'obligation de souscription d\'assurance pro (décennale, RC Pro selon métier) s\'applique aussi à l\'auto-entrepreneur. Plafond CA 2026 : 77 700 € (services) / 188 700 € (vente).',
    related: ['Loi Madelin'],
  },
  {
    term: 'Bureau Central de Tarification (BCT)',
    definition: 'Institution permettant à un professionnel refusé par plusieurs assureurs d\'obtenir une couverture obligatoire (décennale, RC pro auto). Le BCT fixe le tarif et oblige un assureur à couvrir. Recours en dernier ressort.',
    related: ['Décennale'],
  },
  {
    term: 'Capacité financière (courtier)',
    definition: 'Garantie obligatoire pour les courtiers ORIAS qui encaissent des fonds clients (art. L. 512-7 C. assur.). Montant minimum 115 000 €. Notre cabinet en est doté pour la sécurité de vos primes.',
    related: ['ORIAS', 'RCP'],
  },
  {
    term: 'CSCA',
    definition: 'Chambre Syndicale des Courtiers d\'Assurances. Association professionnelle agréée (art. L. 513-3 C. assur.) à laquelle adhèrent les courtiers ORIAS. Notre cabinet est membre actif.',
    related: ['ORIAS', 'ACPR'],
  },
  {
    term: 'Décennale (garantie)',
    definition: 'Garantie obligatoire pour les constructeurs (Loi Spinetta 1978 + art. L. 241-1 C. assur.). Couvre pendant 10 ans après réception les dommages compromettant la solidité de l\'ouvrage ou le rendant impropre à destination.',
    related: ['Article 1792 du Code civil', 'Loi Spinetta', 'Dommages-ouvrage'],
  },
  {
    term: 'DDA (Directive Distribution Assurance)',
    definition: 'Directive européenne 2016/97 transposée en France (Ordonnance 2018-361). Encadre la distribution d\'assurance : information précontractuelle, devoir de conseil, transparence des rémunérations.',
    related: ['Devoir de conseil', 'IPID'],
  },
  {
    term: 'Devoir de conseil (DDA art. L. 521-4)',
    definition: 'Obligation pour le courtier de recueillir les exigences et besoins du client AVANT toute souscription, et de formuler une recommandation personnalisée motivée par écrit. La Reco ACPR 2024-R-03 (applicable 31/12/2025) durcit la traçabilité.',
    related: ['DDA'],
  },
  {
    term: 'Dommages-ouvrage (assurance)',
    definition: 'Assurance souscrite par le maître d\'ouvrage (particulier ou pro qui fait construire) pour bénéficier rapidement d\'une indemnisation en cas de sinistre décennal, sans attendre la décision judiciaire. Obligatoire (art. L. 242-1 C. assur.).',
    related: ['Décennale'],
  },
  {
    term: 'Éligibilité ORIAS',
    definition: 'Conditions pour s\'immatriculer comme courtier ORIAS : honorabilité (casier vierge), capacité professionnelle (formation 150h + examen ou expérience), garantie financière, RCP renforcée, adhésion à une association agréée.',
  },
  {
    term: 'Exclusion de garantie',
    definition: 'Clause d\'un contrat d\'assurance excluant certains risques de la couverture (art. L. 113-1 C. assur.). Doit être rédigée en caractères apparents et limitée aux cas listés. Toute exclusion non-conforme est inopposable au client.',
  },
  {
    term: 'Franchise',
    definition: 'Montant restant à la charge de l\'assuré en cas de sinistre. Peut être fixe (ex : 500€), proportionnelle (ex : 10% du sinistre) ou mixte. Varie selon l\'assureur et le type de garantie.',
  },
  {
    term: 'Garantie subséquente',
    definition: 'Période pendant laquelle l\'assureur couvre les sinistres déclarés APRÈS la fin du contrat, pour des faits survenus pendant la période de validité. Durée habituelle : 5 ans (RC Pro) à 10 ans (RC médicale).',
  },
  {
    term: 'IPID (DIPA)',
    definition: 'Document d\'Information sur le Produit d\'Assurance. Imposé par DDA. Format standardisé européen, doit être remis au client AVANT souscription. Résume les garanties, exclusions, primes, plafonds.',
    related: ['DDA'],
  },
  {
    term: 'Loi Hamon',
    definition: 'Loi du 17 mars 2014 permettant la résiliation de la plupart des contrats d\'assurance après la 1ère année, à tout moment, avec préavis 1 mois. Concerne aussi la décennale et la RC Pro.',
  },
  {
    term: 'Loi Kouchner',
    definition: 'Loi du 4 mars 2002 relative aux droits des malades. Impose à tout professionnel de santé exerçant à titre libéral de souscrire une RC Pro (art. L. 1142-2 CSP).',
    related: ['RC Pro'],
  },
  {
    term: 'Loi Madelin',
    definition: 'Loi du 11 février 1994 (art. 154 bis CGI) permettant aux TNS (travailleurs non salariés) de déduire fiscalement les cotisations de mutuelle, prévoyance et retraite. Plafond 2026 : 4 997 €/an.',
    related: ['Mutuelle TNS'],
  },
  {
    term: 'Loi Naegelen',
    definition: 'Loi du 24 juillet 2020 + décret 2022-34. Encadre le démarchage téléphonique : autorisé uniquement lundi-vendredi 10h-13h et 14h-20h, max 4 appels/mois/personne, intégration Bloctel obligatoire.',
  },
  {
    term: 'Loi Spinetta',
    definition: 'Loi 78-12 du 4 janvier 1978 instituant la responsabilité civile décennale obligatoire pour les constructeurs et la garantie dommages-ouvrage pour les maîtres d\'ouvrage.',
    related: ['Décennale', 'Dommages-ouvrage'],
  },
  {
    term: 'Médiateur de l\'Assurance',
    definition: 'Organisme indépendant chargé de résoudre amiablement les litiges entre assurés et assureurs. Saisi gratuitement après échec du recours interne. www.mediation-assurance.org.',
  },
  {
    term: 'Multirisque professionnelle (MRP)',
    definition: 'Contrat tout-en-un couvrant les locaux pro, leur contenu (mobilier, matériel, stocks), la perte d\'exploitation et la RC Exploitation. Pas obligatoire mais incontournable pour les commerces et artisans avec atelier.',
  },
  {
    term: 'Mutuelle TNS',
    definition: 'Mutuelle santé pour Travailleurs Non Salariés (auto-entrepreneurs, EI, gérants majoritaires SARL). Cotisations déductibles via Loi Madelin pour les non-AE.',
    related: ['Loi Madelin'],
  },
  {
    term: 'Note de couverture',
    definition: 'Document temporaire émis par le courtier ou l\'assureur attestant qu\'une couverture est en cours, en attendant l\'émission du contrat définitif. Valeur juridique d\'une attestation provisoire.',
  },
  {
    term: 'ORIAS',
    definition: 'Registre Unique des Intermédiaires en Assurance, Banque et Finance. Tout courtier en assurance doit y être immatriculé (art. L. 512-1 C. assur.). Vérifiable sur orias.fr. Cliquabilité obligatoire sur les sites courtiers (arrêté 6/12/2022).',
    related: ['ACPR', 'CSCA'],
  },
  {
    term: 'Plafond de garantie',
    definition: 'Montant maximum versé par l\'assureur en cas de sinistre. Peut être par sinistre, par année, par garantie. Pour la RC Pro : généralement 0,5 à 5 M€. Pour les chirurgiens : jusqu\'à 25 M€.',
  },
  {
    term: 'Prime d\'assurance',
    definition: 'Cotisation versée par l\'assuré à l\'assureur en contrepartie de la couverture. Calculée selon le risque, le profil, les garanties choisies. Payable en une fois (annuelle) ou fractionnée (mensuelle / trimestrielle).',
  },
  {
    term: 'Profession réglementée',
    definition: 'Profession dont l\'accès et l\'exercice sont encadrés par la loi (médecins, avocats, notaires, agents immobiliers, experts-comptables, etc.). La RC Pro est OBLIGATOIRE pour ces professions.',
  },
  {
    term: 'Quittance d\'assurance',
    definition: 'Reçu fiscal délivré par l\'assureur après paiement de la prime, attestant que la couverture est active pour la période. Document à conserver pour la déduction fiscale (BIC, BNC).',
  },
  {
    term: 'Ratio S/P (Sinistres/Primes)',
    definition: 'Indicateur calculé par les assureurs : montant des sinistres payés / primes encaissées. Si > 100%, l\'assureur est en perte. Détermine le tarif applicable l\'année suivante (surprime, refus).',
  },
  {
    term: 'RC Exploitation',
    definition: 'Couvre les dommages causés à des tiers EN DEHORS de la prestation pro (ex : un client glisse dans vos locaux). À distinguer de la RC Pro qui couvre les dommages liés au métier.',
  },
  {
    term: 'RC Pro (Responsabilité Civile Professionnelle)',
    definition: 'Assurance couvrant les dommages corporels, matériels et immatériels causés à des tiers dans l\'exercice du métier. Obligatoire pour les professions réglementées (médical, juridique, immobilier).',
    related: ['Loi Kouchner'],
  },
  {
    term: 'RCP renforcée (courtier)',
    definition: 'Responsabilité Civile Professionnelle obligatoire pour les courtiers ORIAS (art. L. 512-6 C. assur.). Plafond minimum 1,85M€ par sinistre / 2,5M€ par an. Notre cabinet est doté d\'une RCP renforcée 5M€/7,5M€.',
  },
  {
    term: 'Réception (des travaux)',
    definition: 'Acte par lequel le maître d\'ouvrage déclare accepter l\'ouvrage. Point de départ des garanties légales (parfait achèvement 1 an, biennale 2 ans, décennale 10 ans).',
    related: ['Décennale'],
  },
  {
    term: 'Recommandation ACPR 2024-R-02',
    definition: 'Recommandation du 2 juillet 2024 sur le traitement des réclamations. Applicable au 31/12/2025. Impose accusé réception 10 jours, réponse fond 2 mois, registre + reporting interne mensuel.',
    related: ['ACPR'],
  },
  {
    term: 'Recommandation ACPR 2024-R-03',
    definition: 'Recommandation du 21 novembre 2024 sur le recueil des informations relatives au client (devoir de conseil DDA). Applicable au 31/12/2025. Durcit la traçabilité du conseil personnalisé.',
    related: ['DDA', 'Devoir de conseil'],
  },
  {
    term: 'Sinistralité',
    definition: 'Taux de fréquence des sinistres pour un métier ou une activité. Calculé par les observatoires sectoriels (AQC SYCODÉS pour le BTP). Détermine le tarif appliqué par les assureurs.',
  },
  {
    term: 'Sous-traitant BTP',
    definition: 'Entreprise intervenant sur un chantier pour le compte d\'une autre. Doit avoir SA propre décennale. Le donneur d\'ordre engage sa responsabilité s\'il fait appel à un sous-traitant non couvert.',
    related: ['Décennale'],
  },
  {
    term: 'Surprime',
    definition: 'Majoration de la prime appliquée par l\'assureur en cas de risque aggravé : antécédents sinistres, non-conformité, métier à risque, zone à fort sinistre. Peut atteindre +50 à +100% du tarif standard.',
  },
  {
    term: 'TRC (Tous Risques Chantier)',
    definition: 'Assurance facultative couvrant le chantier lui-même contre tous les risques (vol, incendie, dégradation, intempérie). Souscrite par le maître d\'ouvrage ou l\'entreprise principale.',
  },
]

const ALPHABET = Array.from(new Set(TERMS.map((t) => t.term[0]?.toUpperCase()))).filter(Boolean).sort()

export default function GlossairePage() {
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Glossaire de l&apos;assurance pro</h1>
          <p className="text-gray-600 text-lg">
            {TERMS.length}+ définitions claires pour comprendre l&apos;assurance professionnelle française.
          </p>
        </header>

        <nav className="mb-10 flex flex-wrap gap-2 border-y py-4" aria-label="Navigation alphabétique">
          {ALPHABET.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded font-semibold hover:bg-blue-100"
            >
              {letter}
            </a>
          ))}
        </nav>

        <div className="space-y-6">
          {TERMS.map((t) => (
            <article
              key={t.term}
              id={`letter-${t.term[0]?.toUpperCase()}`}
              className="border-l-4 border-blue-600 pl-4 py-2"
            >
              <h2 className="text-lg font-bold mb-2">{t.term}</h2>
              <p className="text-gray-700 leading-relaxed">{t.definition}</p>
              {t.related && t.related.length > 0 ? (() => {
                const related = t.related
                return (
                  <p className="mt-2 text-xs text-gray-500">
                    Voir aussi&nbsp;:{' '}
                    {related.map((r, i) => (
                      <span key={r}>
                        <em>{r}</em>
                        {i < related.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </p>
                )
              })() : null}
            </article>
          ))}
        </div>

        <div className="mt-12 text-center bg-blue-50 p-8 rounded-lg">
          <h2 className="text-xl font-bold mb-3">Une question sur un terme&nbsp;?</h2>
          <p className="text-gray-700 mb-6">
            Notre équipe ORIAS est disponible pour vous expliquer les subtilités de votre contrat.
          </p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800">
            Nous contacter →
          </Link>
        </div>
      </div>
    </main>
  )
}
