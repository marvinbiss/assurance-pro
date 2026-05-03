/**
 * Guide juridique — Avocat litige assurance
 *
 * KW cibles (validés Supabase kw_universe, snapshot 2026-04-29) :
 * - "avocat assurance"             → 300 vol, KD 1, CPC 70€
 * - "avocat litige assurance"      → 200 vol, KD 0, CPC 60€ ⭐
 * - "avocat spécialisé en assurance" → 200 vol, KD 0, CPC 50€
 * - "assurance avocat"             → 300 vol, KD 11, CPC 50€ (couvert par RC pro avocat)
 * - Famille cumulée : ~700 vol/mois (hors assurance avocat)
 *
 * Stratégie : guide pour les pros confrontés à un litige avec leur assureur
 * (refus indemnisation, mauvaise foi, procédure longue). Cible MAÎTRES d'ouvrage
 * + dirigeants TPE/PME en conflit assureur. Reflux vers /protection-juridique-professionnelle.
 */

import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400

const SLUG = 'guides/avocat-litige-assurance'
const TITLE = 'Avocat litige assurance — Guide 2026 (refus indemnisation, recours)'
const TAGLINE = "Comment trouver et choisir un avocat spécialisé en droit des assurances : refus d'indemnisation, mauvaise foi, mise en demeure, expertise judiciaire. Conseil ORIAS."

export const metadata: Metadata = {
  title: `${TITLE} | Assurance Pro`,
  description:
    "Guide avocat litige assurance : trouver un avocat spécialisé droit des assurances, procédure recours après refus indemnisation, médiation préalable, expertise judiciaire, alternatives (PJ Pro, médiateur). Conseil ORIAS gratuit sous 24h.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'article' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="Faire appel à un avocat pour un litige avec votre assureur est parfois nécessaire : refus d'indemnisation après sinistre, application abusive d'une exclusion, application de la règle proportionnelle injustifiée, lenteur dans le traitement, sous-évaluation de l'expertise, application de la déchéance pour fausse déclaration prétendue. Cette page explique quand engager un avocat, comment le choisir (spécialité droit des assurances, barreau de proximité, honoraires), les alternatives moins coûteuses (médiateur de l'assurance, PJ Pro, association de consommateurs), la procédure type et les coûts à anticiper. Important : 70% des litiges assurés/assureur se résolvent en MÉDIATION sans aller en justice. La voie judiciaire (avec avocat) est à privilégier pour les sinistres > 10 000 € et les refus d'indemnisation manifestement abusifs."
      legalReference="Articles L. 113-1 et suivants du Code des assurances + Code de la consommation"
      isObligatoire={false}
      benefits={[
        { icon: '⚖️', title: 'Avocat spécialisé', desc: 'Droit des assurances — connaît les arrêts récents de la Cour de cassation' },
        { icon: '📞', title: 'Médiation gratuite', desc: 'Médiateur de l\'assurance (gratuit) résout 70% des litiges sans avocat' },
        { icon: '💰', title: 'Honoraires 200-450 €/h', desc: 'Forfait possible (1 500-5 000 €) selon complexité du dossier' },
        { icon: '🛡️', title: 'PJ Pro = défense gratuite', desc: 'Si vous avez une <a href="/protection-juridique-professionnelle" className="underline">PJ pro</a>, frais avocat pris en charge jusqu\'à 30 000€' },
      ]}
      sections={[
        {
          h2: 'Quand engager un avocat pour un litige assurance ?',
          body: (
            <>
              <p>5 situations où l&apos;avocat est PERTINENT (vs médiation simple) :</p>
              <ol>
                <li><strong>Refus d&apos;indemnisation après sinistre majeur</strong> (&gt; 30 000 €) — l&apos;assureur invoque une exclusion contestable, application déchéance, déclaration tardive</li>
                <li><strong>Sous-évaluation manifeste de l&apos;expertise</strong> (écart &gt; 30% vs estimation contradictoire) — refus de l&apos;assureur d&apos;une contre-expertise</li>
                <li><strong>Application abusive de la règle proportionnelle</strong> — l&apos;assureur réduit l&apos;indemnisation alléguant une sous-déclaration que vous contestez</li>
                <li><strong>Application de la déchéance pour fausse déclaration prétendue</strong> — l&apos;assureur invoque l&apos;art. L. 113-8 (déchéance) que vous contestez</li>
                <li><strong>Lenteur prolongée dans le traitement du sinistre</strong> (&gt; 6 mois sans avancée significative) malgré relances — possibilité d&apos;intérêts moratoires + dommages-intérêts</li>
              </ol>
              <p>Pour les litiges &lt; 10 000 € : la MÉDIATION (gratuite) est généralement plus efficace.</p>
            </>
          ),
        },
        {
          h2: 'Les alternatives moins coûteuses à l\'avocat',
          body: (
            <>
              <h3>1. Médiation amiable (GRATUITE — recommandée en 1er)</h3>
              <p>
                <strong>Médiateur de l&apos;Assurance</strong> (mediation-assurance.org) : organisme
                indépendant, saisine gratuite, traitement sous 90 jours. Résout 70% des litiges
                à l&apos;amiable. SAISINE OBLIGATOIRE avant toute action en justice (art. 750-1 CPC).
              </p>
              <h3>2. Protection juridique professionnelle (frais avocat couverts)</h3>
              <p>
                Si vous avez souscrit une <a href="/protection-juridique-professionnelle" className="text-blue-600 underline">PJ Pro</a>,
                votre assureur PJ prend en charge :
              </p>
              <ul>
                <li>Frais avocat (jusqu&apos;à 30 000 €/litige standard, 50-100k€ étendu)</li>
                <li>Frais d&apos;huissier + d&apos;expert</li>
                <li>Frais de procédure</li>
                <li>Conseil juridique téléphonique illimité 7j/7</li>
              </ul>
              <p>
                Tarif PJ Pro : 280-1 800 €/an selon taille entreprise. ROI évident dès le 1er litige.
              </p>
              <h3>3. Association de consommateurs / fédération pro</h3>
              <p>
                UFC-Que Choisir, CLCV, Fédération de votre métier (FFB, CAPEB, FNAIM) — accompagnement
                souvent gratuit pour les adhérents. Moins efficace pour les sinistres complexes mais
                utile en 1re intention.
              </p>
              <h3>4. Médiation de la consommation</h3>
              <p>
                Si litige B2C ou B2B-B2C, saisine du médiateur de la consommation (gratuit).
                Procédure obligatoire avant toute action judiciaire de plus de 5 000 € (Loi
                Macron 2015).
              </p>
            </>
          ),
        },
        {
          h2: 'Comment choisir un avocat spécialisé droit des assurances ?',
          body: (
            <>
              <ol>
                <li><strong>Spécialité « droit des assurances »</strong> : vérifier la mention de spécialisation au Conseil de l&apos;Ordre (annuaire avocat.fr). Idéalement avec sous-mention « contentieux assurance »</li>
                <li><strong>Barreau de proximité</strong> : avocat du barreau où la procédure aura lieu (où l&apos;assureur a son siège social ou succursale)</li>
                <li><strong>Expérience contre votre type d&apos;assureur</strong> : MACSF (médecins), SMABTP (BTP), MAAF, Generali, AXA — chaque assureur a des stratégies de défense connues des avocats spécialisés</li>
                <li><strong>Honoraires transparents</strong> : convention d&apos;honoraires écrite OBLIGATOIRE depuis 2015 (Loi Macron). Forfait recommandé sur dossiers complexes (1 500-5 000 €)</li>
                <li><strong>Réputation</strong> : avis Google + Trustpilot + recommandations bouche-à-oreille de pairs ayant eu des litiges similaires</li>
              </ol>
              <h3>Honoraires types 2026</h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Prestation</th>
                    <th className="border p-2 text-right">Coût indicatif</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border p-2">Consultation initiale (1h)</td><td className="border p-2 text-right">200 € – 450 €</td></tr>
                  <tr><td className="border p-2">Mise en demeure assureur</td><td className="border p-2 text-right">500 € – 1 200 €</td></tr>
                  <tr><td className="border p-2">Saisine référé-expertise</td><td className="border p-2 text-right">2 500 € – 5 800 €</td></tr>
                  <tr><td className="border p-2">Action au fond (jusqu&apos;à jugement 1re instance)</td><td className="border p-2 text-right">5 800 € – 18 000 €</td></tr>
                  <tr><td className="border p-2">Appel</td><td className="border p-2 text-right">6 800 € – 22 000 €</td></tr>
                  <tr><td className="border p-2">Cassation</td><td className="border p-2 text-right">8 800 € – 35 000 €</td></tr>
                </tbody>
              </table>
            </>
          ),
        },
        {
          h2: 'Procédure type d\'un litige assurance avec avocat',
          body: (
            <>
              <ol>
                <li><strong>Constitution du dossier</strong> (1 mois) : tous les échanges écrits avec l&apos;assureur, contrat d&apos;origine + conditions générales/particulières, attestation du sinistre, expertises, factures, photos, témoignages</li>
                <li><strong>Médiation amiable</strong> (3 mois — OBLIGATOIRE avant action judiciaire art. 750-1 CPC)</li>
                <li><strong>Mise en demeure</strong> par l&apos;avocat à l&apos;assureur (LR/AR — 30 jours pour répondre)</li>
                <li><strong>Référé-expertise</strong> si désaccord persistant sur évaluation : nomination d&apos;un expert judiciaire (4-8 mois, 1 500-3 000 € d&apos;avance)</li>
                <li><strong>Action au fond</strong> devant le tribunal judiciaire (12-24 mois selon complexité et juridiction)</li>
                <li><strong>Jugement</strong> + exécution (huissier si nécessaire). Possibilité d&apos;appel sous 1 mois après signification</li>
              </ol>
              <p className="bg-blue-50 border-l-4 border-blue-500 p-3 my-3">
                <strong>Important</strong> : un litige assurance dure typiquement 18-36 mois entre
                la 1re mise en demeure et le jugement définitif. Prévoir budget temps + financier
                en conséquence. Privilégier MÉDIATION en 1er recours.
              </p>
            </>
          ),
        },
      ]}
      faq={[
        { q: 'Quand faire appel à un avocat pour un litige assurance ?', a: "Pour les sinistres > 30 000€ avec refus d'indemnisation, sous-évaluation manifeste de l'expertise (>30% d'écart), application abusive de la règle proportionnelle, déchéance contestée, ou lenteur prolongée (>6 mois). Pour les litiges < 10 000€ : médiation gratuite via mediation-assurance.org plus efficace que l'avocat." },
        { q: 'Combien coûte un avocat spécialisé en droit des assurances ?', a: "Consultation initiale : 200-450€. Mise en demeure : 500-1 200€. Référé-expertise : 2 500-5 800€. Action au fond jusqu'à jugement : 5 800-18 000€. Appel : 6 800-22 000€. Convention d'honoraires écrite OBLIGATOIRE depuis Loi Macron 2015. Forfait recommandé sur dossiers complexes." },
        { q: 'Avez-vous obligation de passer par un avocat ?', a: "NON pour la médiation (mediation-assurance.org, gratuite, 70% de résolution). NON pour les petits litiges (< 5 000€) traitables seul. OUI au-delà de 10 000€ devant le tribunal judiciaire (représentation par avocat OBLIGATOIRE depuis Loi Justice 2019). Cas particulier prud'hommes : avocat non obligatoire mais fortement recommandé." },
        { q: 'PJ Pro : couvre-t-elle les frais d\'avocat pour litige avec mon assureur ?', a: "OUI dans 100% des contrats PJ Pro standards : frais d'avocat + huissier + expert + procédure couverts jusqu'à 30 000€/litige (50-100k€ en formule étendue). Conseil juridique téléphonique illimité 7j/7. ROI évident dès 1er litige (1 litige = 5-20 ans de cotisations PJ couvertes). Voir <a href='/protection-juridique-professionnelle' class='text-blue-600 underline'>/protection-juridique-professionnelle</a>." },
        { q: 'Médiateur de l\'Assurance : comment le saisir ?', a: "Saisine GRATUITE en ligne sur mediation-assurance.org. Conditions cumulatives : (1) avoir épuisé les voies de recours internes auprès de l'assureur (réclamation écrite + relance), (2) litige < 1 an. Délai de traitement : 90 jours. Recommandation du médiateur non contraignante mais suivie dans 80% des cas par les assureurs (engagement professionnel)." },
        { q: 'Combien de temps dure un litige assurance avec avocat ?', a: "18-36 mois entre la 1re mise en demeure et le jugement définitif. Médiation préalable obligatoire : 3 mois. Référé-expertise : 4-8 mois. Action au fond 1re instance : 12-24 mois. Appel : +12-18 mois. Cassation : +12-24 mois. À anticiper en termes de trésorerie (provisions avocat, expertise) et de patience." },
        { q: 'Comment trouver un avocat spécialisé en droit des assurances ?', a: "(1) Annuaire officiel sur avocat.fr — filtrer par mention de spécialisation « droit des assurances » et sous-mention « contentieux ». (2) Barreau du tribunal compétent (où l'assureur a son siège social). (3) Recommandations de pairs ayant eu litiges similaires. (4) Avis Google + Trustpilot. (5) Notre cabinet ORIAS peut vous orienter vers 3-5 avocats partenaires spécialisés selon votre dossier." },
      ]}
    />
  )
}
