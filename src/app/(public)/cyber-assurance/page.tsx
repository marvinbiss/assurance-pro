import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'

export const metadata: Metadata = {
  title: 'Cyber Assurance Pro — Ransomware, RGPD breach | Assurance Pro',
  description:
    'Comparez votre cyber assurance auprès des spécialistes (Hiscox, Stello, Coalition, AIG). E-commerce, ESN, agences digitales. Couverture jusqu\'à 5M€.',
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://assurance-pro.fr'}/cyber-assurance` },
}

export default function CyberAssurancePage() {
  return (
    <PilierLayout
      slug="cyber-assurance"
      title="Cyber Assurance Pro"
      tagline="La seule assurance qui couvre les attaques informatiques, ransomware, fuites de données et notification RGPD. Indispensable en 2026."
      legalReference="RGPD art. 32 + Directive NIS 2"
      intro="Avec 1 entreprise sur 5 victime d'une cyberattaque en France en 2025 (source ANSSI), la cyber assurance n'est plus un luxe mais une nécessité. Elle couvre les conséquences financières d'un ransomware, d'une fuite de données personnelles, d'une attaque par déni de service (DDoS), d'une fraude au président. Notre cabinet ORIAS travaille avec les leaders du marché (Hiscox, Stello, Coalition, AIG, Beazley) pour construire votre couverture sur-mesure."
      benefits={[
        { icon: '🔒', title: 'Ransomware couvert', desc: 'Rançon + restauration' },
        { icon: '📋', title: 'RGPD breach', desc: 'Notification CNIL incluse' },
        { icon: '⚖️', title: 'Frais juridiques', desc: 'Défense + indemnités tiers' },
        { icon: '💼', title: 'Perte d\'exploitation cyber', desc: 'CA garanti après attaque' },
      ]}
      sections={[
        {
          h2: 'Que couvre la cyber assurance ?',
          body: (
            <ul>
              <li><strong>Frais de remédiation technique</strong>&nbsp;: experts forensics, restauration des systèmes, nettoyage</li>
              <li><strong>Rançon (ransomware)</strong>&nbsp;: négociation et paiement (sous conditions strictes)</li>
              <li><strong>Notification RGPD</strong>&nbsp;: communication aux personnes concernées + CNIL</li>
              <li><strong>Frais juridiques</strong>&nbsp;: avocats, expertise, défense en cas de mise en cause</li>
              <li><strong>RC fuite de données</strong>&nbsp;: indemnisation des tiers victimes</li>
              <li><strong>Sanctions CNIL</strong> (selon contrats)&nbsp;: jusqu\'à 4% CA mondial pour RGPD</li>
              <li><strong>Perte d\'exploitation</strong>&nbsp;: CA non réalisé pendant l\'incident</li>
              <li><strong>Fraude au président</strong> et social engineering (option)</li>
              <li><strong>Cyber-extorsion</strong>&nbsp;: chantage, menace de divulgation</li>
            </ul>
          ),
        },
        {
          h2: 'Pour qui ?',
          body: (
            <p>
              Toute entreprise traitant des données ou ayant une présence digitale&nbsp;: e-commerce,
              ESN/SSII, agences web/digital, freelances IT, professions libérales (cabinets médicaux,
              avocats, experts-comptables qui détiennent des données sensibles), commerces avec terminal
              de paiement, PME industrielles connectées (IoT). <strong>Indispensable en 2026 pour toute structure &gt;10 salariés.</strong>
            </p>
          ),
        },
        {
          h2: 'Combien ça coûte ?',
          body: (
            <table className="w-full text-sm border-collapse my-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Profil</th>
                  <th className="border p-2 text-right">Plafond 250k€</th>
                  <th className="border p-2 text-right">Plafond 1M€</th>
                  <th className="border p-2 text-right">Plafond 5M€</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border p-2">Freelance IT (CA &lt;100k)</td><td className="border p-2 text-right">350-600€</td><td className="border p-2 text-right">600-1 000€</td><td className="border p-2 text-right">N/A</td></tr>
                <tr><td className="border p-2">Agence web (10-30 sal.)</td><td className="border p-2 text-right">1 500-2 500€</td><td className="border p-2 text-right">2 500-4 500€</td><td className="border p-2 text-right">5 000-9 000€</td></tr>
                <tr><td className="border p-2">PME (50-100 sal.)</td><td className="border p-2 text-right">3 000-5 000€</td><td className="border p-2 text-right">5 000-9 000€</td><td className="border p-2 text-right">9 000-18 000€</td></tr>
              </tbody>
            </table>
          ),
        },
      ]}
      faq={[
        { q: 'Une RC Pro classique couvre-t-elle les cyberattaques ?', a: 'NON. La RC Pro standard exclut explicitement les pertes informatiques, les ransomware et les fuites de données. Seul un contrat cyber dédié ou une extension cyber sur RC Pro peut couvrir ces risques.' },
        { q: 'L\'assureur paie-t-il vraiment la rançon ?', a: 'Oui mais sous conditions strictes : analyse de la légitimité de la demande, négociation par expert spécialisé, conformité aux sanctions internationales (pas de paiement à des entités sanctionnées). Les contrats récents (2024+) limitent ou excluent parfois la rançon.' },
        { q: 'Quels prérequis techniques pour souscrire ?', a: 'Les assureurs exigent généralement : sauvegardes régulières (3-2-1), authentification multi-facteurs (MFA) pour les accès admin, mises à jour automatiques, formation des employés, plan de réponse à incident documenté.' },
        { q: 'Délai de prise en charge en cas de cyberattaque ?', a: 'Assistance 24/7 avec hotline dédiée. Mobilisation des experts forensics sous 4-12h selon contrat. Premier paiement (frais d\'urgence) sous 48h. Indemnisation finale après expertise (4-12 semaines).' },
        { q: 'Et la sanction CNIL pour défaut RGPD ?', a: 'Selon les contrats, les sanctions CNIL/HADOPI peuvent être couvertes (jusqu\'à 4% CA mondial pour RGPD). Mais attention : la couverture des sanctions est juridiquement débattue (principe de non-couverture des amendes). Vérifiez attentivement les exclusions.' },
      ]}
    />
  )
}
