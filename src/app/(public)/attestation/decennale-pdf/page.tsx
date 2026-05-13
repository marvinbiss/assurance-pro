/**
 * Attestation — "attestation décennale pdf" (200 vol, KD 0, CPC 250€) MONEY
 */
import type { Metadata } from 'next'
import { PilierLayout } from '@/components/assurance/PilierLayout'
import { SITE_URL } from '@/lib/seo/config'

export const revalidate = 86400
const SLUG = 'attestation/decennale-pdf'
const TITLE = 'Attestation Décennale PDF — Format, téléchargement, modèles 2026'
const TAGLINE =
  "Tout sur le format PDF de l'attestation décennale : taille, qualité, sécurité, modèles par assureur (April Pro, SMABTP, Allianz Pro, MMA, AXA)."

export const metadata: Metadata = {
  title: `${TITLE}`,
  description:
    'Attestation décennale PDF : format A4 standard, taille 50-200 Ko. Téléchargement espace adhérent. Différences modèles April Pro, SMABTP, Allianz Pro, MMA, AXA.',
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
  openGraph: { title: TITLE, description: TAGLINE, url: `${SITE_URL}/${SLUG}`, type: 'website' },
}

export default function Page() {
  return (
    <PilierLayout
      slug={SLUG}
      title={TITLE}
      tagline={TAGLINE}
      intro="L'attestation décennale au format PDF est le standard d'échange entre constructeur, maître d'ouvrage, notaire et administration. Format A4 imprimable, taille 50-200 Ko, généralement protégé contre la modification (PDF signé électroniquement chez les grands assureurs). Cette page détaille les caractéristiques techniques du PDF par assureur, les bonnes pratiques de conservation et les différences de présentation."
      legalReference="Loi Spinetta + art. 1792 Code civil + eIDAS pour signatures électroniques"
      benefits={[
        {
          icon: '📄',
          title: 'Format A4 standard',
          desc: 'Imprimable, conformes Code des assurances',
        },
        {
          icon: '🔒',
          title: 'PDF signé électroniquement',
          desc: 'Non modifiable, signature eIDAS chez grands assureurs',
        },
        {
          icon: '💾',
          title: 'Taille 50-200 Ko',
          desc: 'Léger, transmissible par email facilement',
        },
        {
          icon: '📲',
          title: 'Compatibility universelle',
          desc: 'Ouvrable iOS/Android/Windows/Mac, imprimable couleur/N&amp;B',
        },
      ]}
      sections={[
        {
          h2: 'Caractéristiques techniques PDF attestation décennale',
          body: (
            <ul>
              <li>
                <strong>Format</strong> : PDF 1.4 ou 1.7 (compatibility maximale)
              </li>
              <li>
                <strong>Taille</strong> : 50-200 Ko (texte + logo + cachet électronique)
              </li>
              <li>
                <strong>Pages</strong> : 1 page A4 (rarement 2 pour profils complexes multi-corps)
              </li>
              <li>
                <strong>Résolution</strong> : 300 dpi pour impression nette (texte + logos)
              </li>
              <li>
                <strong>Signature électronique</strong> : eIDAS qualifié (grands assureurs) ou
                simple cachet
              </li>
              <li>
                <strong>Protection</strong> : généralement protégé contre modification (PDF/A-2 ou
                PDF signé)
              </li>
              <li>
                <strong>Métadonnées</strong> : auteur (assureur), date création, validité
              </li>
              <li>
                <strong>Polices</strong> : Helvetica/Arial (standard universel)
              </li>
            </ul>
          ),
        },
        {
          h2: 'Différences modèles PDF par assureur',
          body: (
            <ul>
              <li>
                <strong>April Pro BTP</strong> : 1 page A4, design moderne, signature électronique
                eIDAS, QR code de vérification authenticité
              </li>
              <li>
                <strong>SMABTP</strong> : 1 page A4, design institutionnel (paritaire BTP), tampon
                assureur officiel
              </li>
              <li>
                <strong>Allianz Pro BTP</strong> : 1 page A4, design corporate, logo Allianz +
                agrément ACPR mentionné
              </li>
              <li>
                <strong>MMA Pro BTP</strong> : 1-2 pages A4 (selon multi-corps), signature
                électronique
              </li>
              <li>
                <strong>AXA Pro BTP</strong> : 1 page A4, design premium, cachet sec (parfois) ou
                électronique
              </li>
              <li>
                <strong>Hiscox</strong> : 1 page A4, design épuré britannique, postériorité 10 ans
                mentionnée
              </li>
              <li>
                <strong>Stello</strong> : 1 page A4, design moderne digital pure, signature eIDAS
              </li>
            </ul>
          ),
        },
        {
          h2: 'Bonnes pratiques conservation PDF attestations',
          body: (
            <ol>
              <li>
                <strong>Stockage cloud sécurisé</strong> : Google Drive, Dropbox, iCloud — accès
                permanent
              </li>
              <li>
                <strong>Backup local</strong> : disque dur externe + clé USB de secours
              </li>
              <li>
                <strong>Historique 10 ans</strong> : conservation toutes attestations passées (durée
                garantie décennale)
              </li>
              <li>
                <strong>Renommage standardisé</strong> :
                &quot;Attestation-Décennale-AnnéeN-Assureur.pdf&quot;
              </li>
              <li>
                <strong>Envoi sécurisé clients</strong> : email avec accusé réception OU WeTransfer
              </li>
              <li>
                <strong>Vérification annuelle</strong> : vérifier ouverture + lisibilité PDF chaque
                année
              </li>
              <li>
                <strong>Sauvegarde dans contrats clients</strong> : annexer PDF attestation au
                contrat de prestation
              </li>
            </ol>
          ),
        },
      ]}
      faq={[
        {
          q: "Comment vérifier l'authenticité d'un PDF d'attestation décennale ?",
          a: '1) Ouvrir avec Adobe Reader (gratuit). 2) Vérifier signature électronique dans propriétés document. 3) Vérifier mentions ACPR + ORIAS. 4) Appeler assureur pour confirmer émission. 5) Si QR code présent : scanner pour vérification en ligne (April Pro propose).',
        },
        {
          q: 'Puis-je imprimer mon attestation décennale ?',
          a: 'OUI sans problème. Impression couleur ou N&amp;B équivalente (validité juridique identique). Privilégier impression couleur si présentation MO grand compte. Conserver PDF original signé électroniquement pour valeur juridique maximale.',
        },
        {
          q: "Que faire si mon PDF d'attestation est corrompu ?",
          a: '1) Re-télécharger depuis espace adhérent assureur (toujours disponible). 2) Si problème persiste : email conseiller assureur, ré-émission gratuite sous 24h. 3) Pour gros chantier urgence : appeler service client express.',
        },
        {
          q: 'Peut-on signer électroniquement un contrat avec PDF attestation ?',
          a: 'OUI. Le PDF attestation peut être joint à tout contrat signé électroniquement (DocuSign, Yousign, Universign). Sa valeur juridique est identique au PDF papier scanné — voire supérieure si signé eIDAS (valeur probante renforcée).',
        },
      ]}
      relatedMetiers={[
        { name: 'Attestation décennale (vue globale)', slug: 'attestation/decennale' },
        { name: 'Attestation assurance décennale', slug: 'attestation/assurance-decennale' },
        { name: 'Attestation RC Pro', slug: 'attestation/rc-pro' },
        { name: 'Assurance décennale', slug: 'assurance-decennale' },
        { name: 'Guide attestation décennale', slug: 'guides/attestation-decennale' },
      ]}
    />
  )
}
