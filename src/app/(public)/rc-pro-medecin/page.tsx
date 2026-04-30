import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'

export const metadata: Metadata = {
  title: 'RC Pro Médecin / Praticien santé | Assurance Pro',
  description:
    'RC Pro médicale obligatoire (Loi Kouchner). Médecins, infirmiers, kinés, ostéopathes, sage-femmes. Comparaison sur 6 assureurs spécialistes.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assurance-pro.fr'}/rc-pro-medecin` },
}

export default function RcProMedecinPage() {
  return (
    <PilierLayout
      slug="rc-pro-medecin"
      title="RC Pro Médecin / Praticien santé"
      tagline="L'assurance professionnelle obligatoire pour tout praticien de santé — Loi Kouchner du 4 mars 2002."
      legalReference="Loi 2002-303 du 4 mars 2002 (Loi Kouchner) + art. L. 1142-2 CSP"
      isObligatoire={true}
      intro="Tout professionnel de santé exerçant à titre libéral est tenu de souscrire une RC Pro médicale couvrant les conséquences pécuniaires de sa responsabilité civile pouvant être engagée dans l'exercice de son art. Cette obligation s'applique aux médecins, infirmiers libéraux, kinésithérapeutes, ostéopathes, sage-femmes, psychologues, dentistes, podologues, orthophonistes et autres professionnels paramédicaux. Notre cabinet ORIAS compare les contrats des assureurs spécialistes du secteur médical (MACSF, Generali, Allianz, Hiscox)."
      benefits={[
        { icon: '⚕️', title: 'Conforme Loi Kouchner', desc: 'RC obligatoire L. 1142-2' },
        { icon: '🏥', title: 'Plafond 8M€', desc: 'Standard professions médicales' },
        { icon: '⏱️', title: 'Garantie 10 ans', desc: 'Subséquente longue' },
        { icon: '🛡️', title: 'Défense pénale incluse', desc: 'Avocats spécialisés santé' },
      ]}
      sections={[
        { h2: 'Spécialités médicales couvertes', body: (<><p>Notre cabinet propose des contrats RC Pro adaptés aux 15 professions médicales suivantes&nbsp;:</p><ul><li>Médecin généraliste</li><li>Médecin spécialiste (cardio, derma, ophtalmo, gynéco, ORL, psychiatre, gastro, endocrino, etc.)</li><li>Infirmier libéral / IDEL</li><li>Kinésithérapeute</li><li>Ostéopathe / chiropracteur</li><li>Sage-femme</li><li>Dentiste / orthodontiste / chirurgien dentiste</li><li>Psychologue / psychothérapeute</li><li>Pharmacien</li><li>Médecin remplaçant</li><li>Ergothérapeute, podologue, orthophoniste, diététicien, sophrologue</li></ul></>) },
        { h2: 'Tarifs RC Pro médicale 2026', body: (<table className="w-full text-sm border-collapse my-4"><thead><tr className="bg-gray-100"><th className="border p-2">Spécialité</th><th className="border p-2 text-right">Plafond 8M€</th></tr></thead><tbody><tr><td className="border p-2">Médecin généraliste</td><td className="border p-2 text-right">800-1 600€/an</td></tr><tr><td className="border p-2">Médecin spécialiste (consultation)</td><td className="border p-2 text-right">1 500-3 500€/an</td></tr><tr><td className="border p-2">Chirurgien</td><td className="border p-2 text-right">8 000-25 000€/an</td></tr><tr><td className="border p-2">Gynécologue obstétricien</td><td className="border p-2 text-right">15 000-45 000€/an</td></tr><tr><td className="border p-2">Infirmier libéral</td><td className="border p-2 text-right">200-400€/an</td></tr><tr><td className="border p-2">Kinésithérapeute</td><td className="border p-2 text-right">280-550€/an</td></tr><tr><td className="border p-2">Ostéopathe</td><td className="border p-2 text-right">220-450€/an</td></tr><tr><td className="border p-2">Sage-femme libérale</td><td className="border p-2 text-right">450-900€/an</td></tr><tr><td className="border p-2">Psychologue</td><td className="border p-2 text-right">180-380€/an</td></tr></tbody></table>) },
      ]}
      faq={[
        { q: 'La RC Pro médicale est-elle obligatoire pour un remplaçant ?', a: 'Oui. La Loi Kouchner s\'applique à TOUT professionnel exerçant à titre libéral, y compris les médecins remplaçants et collaborateurs. La RC Pro doit être nominative et active pendant toute la durée du remplacement.' },
        { q: 'Quel plafond minimum ?', a: 'La loi n\'impose pas de minimum chiffré, mais les compagnies d\'assurance proposent généralement 8M€ par sinistre comme standard. Pour les chirurgiens et gynécos-obstétriciens, des plafonds 15-25M€ sont nécessaires.' },
        { q: 'Que couvre exactement la RC Pro médicale ?', a: 'Tous les dommages corporels, matériels et immatériels causés à un patient ou à un tiers dans l\'exercice de votre art. Cela inclut les fautes de diagnostic, erreurs thérapeutiques, défauts d\'information, manquements au devoir d\'information.' },
        { q: 'Garantie subséquente : pourquoi 10 ans ?', a: 'Les actions en responsabilité médicale ont une prescription de 10 ans à compter de la consolidation du dommage. La garantie subséquente longue (10 ans) est donc indispensable, notamment pour les chirurgiens et obstétriciens.' },
      ]}
    />
  )
}
