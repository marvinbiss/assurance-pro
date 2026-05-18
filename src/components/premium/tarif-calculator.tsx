'use client'

/**
 * TarifCalculator — estimateur tarifaire interactif par garantie.
 *
 * 100% local (zéro API). Chaque verticale a son propre schéma de formulaire
 * et sa propre formule. Aucun champ générique imposé : tout est strict
 * vertical-specific (zéro tolérance).
 *
 * Verticales supportées :
 *   - decennale       : métier BTP + CA + statut + ancienneté + sinistralité
 *   - rc-pro          : profession + CA + statut + activité sensible + effectif
 *   - multirisque-pro : type local + surface m² + valeur contenu + statut
 *   - cyber           : secteur + CA + effectif + données sensibles + statut
 *   - mutuelle-pro    : âge + statut + niveau couverture + ayants droit
 *   - vtc             : zone + ancienneté permis + plateforme + véhicule
 *
 * Tarifs base 2026 France, indicatifs. Fourchette ±spread% autour du mid.
 *
 * A11y : aria-labels, focus rings, radiogroup, aria-live result.
 */

import Link from 'next/link'
import { useId, useMemo, useState } from 'react'
import { ArrowRight, Calculator, TrendingDown } from 'lucide-react'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export type Garantie =
  | 'decennale'
  | 'rc-pro'
  | 'multirisque-pro'
  | 'cyber'
  | 'mutuelle-pro'
  | 'vtc'
  | 'flotte-auto'
  | 'dommages-ouvrage'
  | 'tous-risques-chantier'
  | 'transport-marchandises'
  | 'moto-pro'
  | 'prevoyance'
  | 'protection-juridique'
  | 'homme-cle'

type Statut = 'auto-entrepreneur' | 'sarl' | 'sas'

export interface TarifCalculatorProps {
  garantie: Garantie
  className?: string
  /** Slug métier à préselectionner depuis URL (ex: 'medecin-generaliste'). Fallback transparent si miss. */
  defaultMetier?: string
}

interface MetierOption {
  readonly value: string
  readonly label: string
  /** Prix de base annuel pour CA = 80k€ et statut SARL (€). */
  readonly base: number
  /** Spread minimal autour de la base pour le range affiché (ex: 0.25 → ±25%). */
  readonly spread: number
}

// ---------------------------------------------------------------------------
// Catalogues métiers — tarifs base France 2026, indicatifs.
// ---------------------------------------------------------------------------

const METIERS_DECENNALE: readonly MetierOption[] = [
  // Risque FAIBLE
  { value: 'peintre', label: 'Peintre en bâtiment', base: 750, spread: 0.33 },
  { value: 'carreleur', label: 'Carreleur', base: 1200, spread: 0.3 },
  { value: 'plaquiste-platrier', label: 'Plaquiste-plâtrier', base: 850, spread: 0.3 },
  { value: 'placoplatre', label: 'Plâtrerie placoplâtre', base: 800, spread: 0.3 },
  { value: 'menuisier-interieur', label: 'Menuisier intérieur', base: 900, spread: 0.3 },
  { value: 'sol-souple', label: 'Sols souples — parquet', base: 700, spread: 0.32 },
  { value: 'cuisiniste', label: 'Cuisiniste — salle de bain', base: 1300, spread: 0.3 },
  // Risque MOYEN
  { value: 'plombier', label: 'Plombier', base: 1100, spread: 0.32 },
  { value: 'electricien', label: 'Électricien', base: 900, spread: 0.33 },
  { value: 'electricien-domotique', label: 'Électricien domotique', base: 1050, spread: 0.32 },
  {
    value: 'menuisier-exterieur',
    label: 'Menuisier extérieur — fenêtres',
    base: 1800,
    spread: 0.3,
  },
  { value: 'climatisation', label: 'Climatisation — frigoriste', base: 1800, spread: 0.28 },
  {
    value: 'isolation-thermique',
    label: 'Isolation thermique (ITE/ITI)',
    base: 2200,
    spread: 0.28,
  },
  { value: 'paysagiste', label: 'Paysagiste avec gros œuvre', base: 1700, spread: 0.3 },
  { value: 'ravalement', label: 'Ravalement de façade', base: 2100, spread: 0.28 },
  // Risque ÉLEVÉ
  {
    value: 'plombier-chauffagiste',
    label: 'Plombier-chauffagiste (PAC)',
    base: 1900,
    spread: 0.3,
  },
  { value: 'macon', label: 'Maçon — gros œuvre', base: 2100, spread: 0.3 },
  { value: 'charpentier-bois', label: 'Charpentier bois', base: 2200, spread: 0.28 },
  { value: 'facadier-ite', label: 'Façadier — ITE', base: 2300, spread: 0.28 },
  {
    value: 'installateur-photovoltaique',
    label: 'Installateur photovoltaïque',
    base: 2100,
    spread: 0.3,
  },
  {
    value: 'electricien-photovoltaique',
    label: 'Électricien PV résidentiel',
    base: 3000,
    spread: 0.28,
  },
  { value: 'serrurier-metallier', label: 'Serrurier-métallier', base: 2600, spread: 0.28 },
  { value: 'fumiste', label: 'Fumiste — cheminées', base: 2400, spread: 0.28 },
  { value: 'multi-services-btp', label: 'Multi-services BTP (TCE)', base: 2800, spread: 0.28 },
  // pSEO BTP additionnels (catalogue Ahrefs 72 métiers)
  { value: 'agenceur', label: 'Agenceur — second œuvre', base: 900, spread: 0.32 },
  {
    value: 'alarme-securite',
    label: 'Alarme-sécurité — vidéosurveillance',
    base: 1200,
    spread: 0.3,
  },
  { value: 'architecte-dplg', label: 'Architecte DPLG', base: 3200, spread: 0.3 },
  { value: 'ascensoriste', label: 'Ascensoriste', base: 2800, spread: 0.28 },
  { value: 'assainisseur', label: 'Assainisseur — fosses septiques', base: 1800, spread: 0.3 },
  { value: 'bardeur', label: 'Bardeur — couvreur métallique', base: 2400, spread: 0.28 },
  { value: 'bureau-etudes', label: 'Bureau d’études techniques', base: 2400, spread: 0.3 },
  { value: 'carrossier-batiment', label: 'Carrossier bâtiment', base: 1400, spread: 0.3 },
  { value: 'charpentier-metallique', label: 'Charpentier métallique', base: 2400, spread: 0.28 },
  { value: 'cheminee-fumisterie', label: 'Cheminée-fumisterie', base: 2400, spread: 0.28 },
  { value: 'cmi', label: 'CMI — Constructeur de maisons individuelles', base: 3500, spread: 0.28 },
  { value: 'desamianteur', label: 'Désamianteur', base: 4500, spread: 0.25 },
  { value: 'domoticien', label: 'Domoticien', base: 1100, spread: 0.3 },
  {
    value: 'economiste-construction',
    label: 'Économiste de la construction',
    base: 2200,
    spread: 0.3,
  },
  { value: 'elagueur', label: 'Élagueur — arboriste', base: 1500, spread: 0.3 },
  { value: 'escalierieur', label: 'Escaliériste', base: 1200, spread: 0.3 },
  { value: 'foreur', label: 'Foreur — géothermie — puits', base: 3600, spread: 0.26 },
  { value: 'frigoriste', label: 'Frigoriste — chambre froide', base: 2200, spread: 0.28 },
  { value: 'geometre-expert', label: 'Géomètre-expert', base: 2400, spread: 0.3 },
  { value: 'insert-poele', label: 'Insert — poêle à bois', base: 1400, spread: 0.3 },
  { value: 'installateur-fibre', label: 'Installateur fibre optique', base: 1100, spread: 0.3 },
  { value: 'isolation-iteiti', label: 'Isolation ITE/ITI', base: 2100, spread: 0.28 },
  { value: 'lvc', label: 'LVC — Loi VEFA / contrats construction', base: 2400, spread: 0.3 },
  { value: 'maitre-oeuvre', label: 'Maître d’œuvre', base: 3000, spread: 0.28 },
  { value: 'pac', label: 'PAC — pompe à chaleur', base: 2200, spread: 0.28 },
  { value: 'parqueteur', label: 'Parqueteur — sols bois', base: 850, spread: 0.32 },
  { value: 'photovoltaique', label: 'Photovoltaïque (installateur)', base: 2100, spread: 0.3 },
  { value: 'poseur-veranda', label: 'Poseur de véranda', base: 1900, spread: 0.3 },
  { value: 'promoteur', label: 'Promoteur immobilier', base: 4500, spread: 0.28 },
  { value: 'sanitaire', label: 'Sanitaire — plomberie sanitaire', base: 1300, spread: 0.3 },
  { value: 'solier-moquettiste', label: 'Solier-moquettiste', base: 750, spread: 0.32 },
  { value: 'sous-traitant-btp', label: 'Sous-traitant BTP générique', base: 1800, spread: 0.3 },
  { value: 'vitrier', label: 'Vitrier — miroitier', base: 1200, spread: 0.3 },
  { value: 'chauffeur-prive', label: 'Chauffeur privé (BTP)', base: 1900, spread: 0.3 },
  // Risque TRÈS ÉLEVÉ
  { value: 'couvreur-zingueur', label: 'Couvreur-zingueur', base: 2200, spread: 0.28 },
  { value: 'etancheur', label: 'Étancheur — toiture-terrasse', base: 3500, spread: 0.24 },
  { value: 'terrassier', label: 'Terrassier — VRD', base: 1600, spread: 0.32 },
  { value: 'demolisseur', label: 'Démolisseur — désamiantage', base: 4800, spread: 0.25 },
  { value: 'pisciniste', label: 'Pisciniste', base: 4200, spread: 0.25 },
  { value: 'puisatier', label: 'Puisatier-foreur — géothermie', base: 3600, spread: 0.26 },
  // Aliases pSEO non-BTP (apparaissent en pSEO decennale Ahrefs sans sens métier
  // mais routes existent — fallback prix générique pour 100% matching)
  { value: 'architecte-interieur', label: 'Architecte d’intérieur', base: 1400, spread: 0.32 },
  { value: 'avocat', label: 'Avocat (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'commissaire-aux-comptes', label: 'CAC (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'dentiste', label: 'Dentiste (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'expert-comptable', label: 'Expert-comptable (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'huissier', label: 'Huissier (N/A décennale)', base: 800, spread: 0.4 },
  {
    value: 'infirmier-liberal',
    label: 'Infirmier libéral (N/A décennale)',
    base: 800,
    spread: 0.4,
  },
  {
    value: 'infirmier-libéral',
    label: 'Infirmier libéral (N/A décennale)',
    base: 800,
    spread: 0.4,
  },
  { value: 'kinesitherapeute', label: 'Kiné (N/A décennale)', base: 800, spread: 0.4 },
  {
    value: 'mandataire-judiciaire',
    label: 'Mandataire judiciaire (N/A décennale)',
    base: 800,
    spread: 0.4,
  },
  { value: 'medecin-generaliste', label: 'Médecin gé (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'medecin-specialiste', label: 'Médecin spé (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'notaire', label: 'Notaire (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'osteopathe', label: 'Ostéopathe (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'pharmacien', label: 'Pharmacien (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'psychologue', label: 'Psychologue (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'sage-femme', label: 'Sage-femme (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'taxi', label: 'Taxi (N/A décennale)', base: 800, spread: 0.4 },
  { value: 'vtc', label: 'VTC (N/A décennale)', base: 800, spread: 0.4 },
  // Legacy slugs (compatibilité URLs anciennes)
  { value: 'couvreur', label: 'Couvreur (générique)', base: 2200, spread: 0.28 },
  { value: 'menuisier', label: 'Menuisier (générique)', base: 1050, spread: 0.3 },
  { value: 'charpentier', label: 'Charpentier (générique)', base: 2200, spread: 0.28 },
  { value: 'chauffagiste', label: 'Chauffagiste — clim', base: 2400, spread: 0.28 },
  { value: 'platrier', label: 'Plâtrier-plaquiste (alt)', base: 850, spread: 0.3 },
] as const

const METIERS_RC_PRO: readonly MetierOption[] = [
  // Conseil / business (cross-validé Hiscox/Coover/Orus/Brokin/Stello 2026)
  { value: 'consultant', label: 'Consultant indépendant', base: 280, spread: 0.38 },
  { value: 'conseil-rh', label: 'Consultant RH — recruteur', base: 700, spread: 0.36 },
  { value: 'conseil-financier', label: 'CGP — CIF', base: 850, spread: 0.32 },
  { value: 'agent-general-assurance', label: 'Agent général assurance', base: 1800, spread: 0.3 },
  { value: 'consultant-marketing', label: 'Consultant marketing digital', base: 340, spread: 0.38 },
  { value: 'formateur', label: 'Formateur — organisme Qualiopi', base: 280, spread: 0.38 },
  // Tech / digital / créatif (Hiscox/Stello/Insify/plateya 2026)
  { value: 'freelance-it', label: 'Freelance IT — dev', base: 290, spread: 0.4 },
  { value: 'developpeur-freelance', label: 'Développeur freelance', base: 250, spread: 0.4 },
  { value: 'data-scientist', label: 'Data scientist — ML engineer', base: 300, spread: 0.38 },
  { value: 'agence-web', label: 'Agence web — digitale', base: 550, spread: 0.38 },
  { value: 'webmaster', label: 'Webmaster — intégrateur', base: 200, spread: 0.4 },
  { value: 'consultant-seo', label: 'Consultant SEO', base: 240, spread: 0.4 },
  { value: 'community-manager', label: 'Community manager', base: 160, spread: 0.4 },
  { value: 'graphiste', label: 'Graphiste — designer', base: 180, spread: 0.4 },
  { value: 'designer', label: 'Designer UX — UI', base: 220, spread: 0.4 },
  { value: 'photographe', label: 'Photographe pro', base: 420, spread: 0.4 },
  { value: 'videaste', label: 'Vidéaste — cameraman', base: 450, spread: 0.4 },
  { value: 'redacteur', label: 'Rédacteur — traducteur', base: 150, spread: 0.4 },
  // Juridique / chiffre (cross-validé Coover/Adallom/Sidecare/MACSF 2026)
  { value: 'avocat', label: 'Avocat', base: 1100, spread: 0.32 },
  { value: 'avocat-conseil', label: 'Avocat — conseil juridique', base: 800, spread: 0.32 },
  { value: 'notaire', label: 'Notaire', base: 8000, spread: 0.28 },
  { value: 'expert-comptable', label: 'Expert-comptable', base: 1700, spread: 0.32 },
  { value: 'comptable', label: 'Comptable', base: 800, spread: 0.34 },
  { value: 'commissaire-aux-comptes', label: 'Commissaire aux comptes', base: 5800, spread: 0.3 },
  { value: 'huissier', label: 'Huissier — commissaire de justice', base: 2500, spread: 0.3 },
  { value: 'mandataire-judiciaire', label: 'Mandataire judiciaire', base: 6500, spread: 0.28 },
  // Santé / médical (MACSF / Médere 2026 — RCP libérale)
  { value: 'medecin-generaliste', label: 'Médecin généraliste', base: 1300, spread: 0.32 },
  { value: 'medecin-specialiste', label: 'Médecin spécialiste', base: 3200, spread: 0.32 },
  { value: 'chirurgien', label: 'Chirurgien', base: 15000, spread: 0.32 },
  { value: 'sage-femme', label: 'Sage-femme libérale', base: 1450, spread: 0.32 },
  { value: 'dentiste', label: 'Chirurgien-dentiste', base: 2500, spread: 0.3 },
  { value: 'infirmiere-liberale', label: 'Infirmière libérale (IDEL)', base: 480, spread: 0.34 },
  { value: 'infirmier-liberal', label: 'Infirmier libéral (IDEL)', base: 480, spread: 0.34 },
  { value: 'infirmier-libéral', label: 'Infirmier libéral (IDEL)', base: 480, spread: 0.34 },
  { value: 'kinesitherapeute', label: 'Kinésithérapeute', base: 500, spread: 0.34 },
  { value: 'osteopathe', label: 'Ostéopathe', base: 380, spread: 0.34 },
  { value: 'psychologue', label: 'Psychologue', base: 180, spread: 0.34 },
  { value: 'pharmacien', label: 'Pharmacien titulaire (RC Pro)', base: 2000, spread: 0.28 },
  { value: 'veterinaire', label: 'Vétérinaire', base: 1400, spread: 0.3 },
  // Architecture / immobilier (RC Pro pure — Coover/UNAPI/MAF 2026, décennale séparée)
  { value: 'architecte', label: 'Architecte (RC Pro)', base: 2500, spread: 0.3 },
  { value: 'architecte-dplg', label: 'Architecte DPLG (RC Pro)', base: 2500, spread: 0.3 },
  { value: 'architecte-interieur', label: 'Architecte d’intérieur', base: 700, spread: 0.36 },
  { value: 'agent-immobilier', label: 'Agent immobilier', base: 850, spread: 0.32 },
  { value: 'syndic-immobilier', label: 'Syndic de copropriété', base: 1500, spread: 0.3 },
  { value: 'diagnostic-immobilier', label: 'Diagnostiqueur immobilier', base: 1400, spread: 0.3 },
  { value: 'geometre', label: 'Géomètre-expert', base: 2300, spread: 0.3 },
  { value: 'geometre-expert', label: 'Géomètre-expert (alias)', base: 2300, spread: 0.3 },
  // Services / commerce / restauration (RC Pro pure, multirisque distinct)
  { value: 'restaurateur', label: 'Restaurateur', base: 420, spread: 0.32 },
  { value: 'commercant', label: 'Commerçant indépendant', base: 400, spread: 0.34 },
  { value: 'aide-domicile', label: 'Aide à domicile', base: 230, spread: 0.34 },
  { value: 'esthetique', label: 'Esthéticienne — institut', base: 230, spread: 0.34 },
  { value: 'coiffeur', label: 'Coiffeur à domicile', base: 190, spread: 0.34 },
  { value: 'agent-de-voyage', label: 'Agent de voyage', base: 900, spread: 0.3 },
  // Bien-être / sport (Coover/Sportas/Insify 2026)
  { value: 'coach', label: 'Coach — formateur', base: 240, spread: 0.38 },
  { value: 'coach-pro', label: 'Coach professionnel', base: 280, spread: 0.38 },
  { value: 'coach-sportif', label: 'Coach sportif', base: 220, spread: 0.34 },
  { value: 'moniteur-yoga', label: 'Moniteur yoga — pilates', base: 180, spread: 0.34 },
  { value: 'animateur-jeunesse', label: 'Animateur jeunesse (BAFA)', base: 200, spread: 0.34 },
  // Transport / dépannage — RC Pro pure (assurance véhicule = garantie vtc/flotte séparée)
  { value: 'taxi', label: 'Taxi (RC Pro pure)', base: 220, spread: 0.32 },
  { value: 'transporteur-leger', label: 'Transporteur léger — coursier', base: 260, spread: 0.32 },
  { value: 'serrurier-depannage', label: 'Serrurier dépannage', base: 550, spread: 0.32 },
  { value: 'electricien-depannage', label: 'Électricien dépannage', base: 500, spread: 0.32 },
  // Statut générique
  { value: 'auto-entrepreneur', label: 'Auto-entrepreneur (autre)', base: 220, spread: 0.4 },
  // Aliases pSEO BTP en RC Pro (généralement métiers BTP sans décennale mais avec RC Pro)
  { value: 'macon', label: 'Maçon (RC Pro)', base: 280, spread: 0.4 },
  { value: 'electricien', label: 'Électricien (RC Pro)', base: 260, spread: 0.4 },
  { value: 'plombier', label: 'Plombier (RC Pro)', base: 260, spread: 0.4 },
  {
    value: 'plombier-chauffagiste',
    label: 'Plombier-chauffagiste (RC Pro)',
    base: 280,
    spread: 0.4,
  },
  { value: 'chauffagiste', label: 'Chauffagiste (RC Pro)', base: 260, spread: 0.4 },
  { value: 'peintre', label: 'Peintre (RC Pro)', base: 220, spread: 0.4 },
  { value: 'carreleur', label: 'Carreleur (RC Pro)', base: 240, spread: 0.4 },
  { value: 'menuisier-interieur', label: 'Menuisier intérieur (RC Pro)', base: 240, spread: 0.4 },
  { value: 'menuisier-exterieur', label: 'Menuisier extérieur (RC Pro)', base: 260, spread: 0.4 },
  { value: 'charpentier-bois', label: 'Charpentier bois (RC Pro)', base: 280, spread: 0.4 },
  { value: 'charpentier-metallique', label: 'Charpentier métal (RC Pro)', base: 280, spread: 0.4 },
  { value: 'couvreur-zingueur', label: 'Couvreur (RC Pro)', base: 280, spread: 0.4 },
  { value: 'etancheur', label: 'Étancheur (RC Pro)', base: 320, spread: 0.4 },
  { value: 'terrassier', label: 'Terrassier (RC Pro)', base: 280, spread: 0.4 },
  { value: 'demolisseur', label: 'Démolisseur (RC Pro)', base: 360, spread: 0.38 },
  { value: 'pisciniste', label: 'Pisciniste (RC Pro)', base: 320, spread: 0.4 },
  { value: 'paysagiste', label: 'Paysagiste (RC Pro)', base: 240, spread: 0.4 },
  { value: 'plaquiste-platrier', label: 'Plaquiste-plâtrier (RC Pro)', base: 220, spread: 0.4 },
  { value: 'serrurier-metallier', label: 'Serrurier-métallier (RC Pro)', base: 280, spread: 0.4 },
  { value: 'facadier-ite', label: 'Façadier ITE (RC Pro)', base: 280, spread: 0.4 },
  { value: 'multi-services-btp', label: 'Multi-services BTP (RC Pro)', base: 320, spread: 0.4 },
  { value: 'agenceur', label: 'Agenceur (RC Pro)', base: 220, spread: 0.4 },
  { value: 'alarme-securite', label: 'Alarme-sécurité (RC Pro)', base: 380, spread: 0.4 },
  { value: 'ascensoriste', label: 'Ascensoriste (RC Pro)', base: 420, spread: 0.4 },
  { value: 'assainisseur', label: 'Assainisseur (RC Pro)', base: 320, spread: 0.4 },
  { value: 'bardeur', label: 'Bardeur (RC Pro)', base: 320, spread: 0.4 },
  { value: 'bureau-etudes', label: 'Bureau d’études (RC Pro)', base: 540, spread: 0.36 },
  { value: 'carrossier-batiment', label: 'Carrossier bâtiment (RC Pro)', base: 260, spread: 0.4 },
  { value: 'cheminee-fumisterie', label: 'Cheminée-fumisterie (RC Pro)', base: 260, spread: 0.4 },
  { value: 'cmi', label: 'CMI (RC Pro)', base: 580, spread: 0.36 },
  { value: 'desamianteur', label: 'Désamianteur (RC Pro)', base: 380, spread: 0.4 },
  { value: 'domoticien', label: 'Domoticien (RC Pro)', base: 280, spread: 0.4 },
  {
    value: 'economiste-construction',
    label: 'Économiste construction (RC Pro)',
    base: 480,
    spread: 0.36,
  },
  { value: 'elagueur', label: 'Élagueur (RC Pro)', base: 240, spread: 0.4 },
  { value: 'escalierieur', label: 'Escaliériste (RC Pro)', base: 240, spread: 0.4 },
  { value: 'foreur', label: 'Foreur (RC Pro)', base: 320, spread: 0.4 },
  { value: 'frigoriste', label: 'Frigoriste (RC Pro)', base: 320, spread: 0.4 },
  { value: 'insert-poele', label: 'Insert-poêle (RC Pro)', base: 240, spread: 0.4 },
  { value: 'installateur-fibre', label: 'Installateur fibre (RC Pro)', base: 260, spread: 0.4 },
  { value: 'isolation-iteiti', label: 'Isolation ITE/ITI (RC Pro)', base: 260, spread: 0.4 },
  { value: 'lvc', label: 'LVC (RC Pro)', base: 540, spread: 0.36 },
  { value: 'maitre-oeuvre', label: 'Maître d’œuvre (RC Pro)', base: 680, spread: 0.34 },
  { value: 'pac', label: 'PAC (RC Pro)', base: 260, spread: 0.4 },
  { value: 'parqueteur', label: 'Parqueteur (RC Pro)', base: 220, spread: 0.4 },
  { value: 'photovoltaique', label: 'Photovoltaïque (RC Pro)', base: 280, spread: 0.4 },
  { value: 'poseur-veranda', label: 'Poseur véranda (RC Pro)', base: 260, spread: 0.4 },
  { value: 'promoteur', label: 'Promoteur immo (RC Pro)', base: 1480, spread: 0.3 },
  { value: 'sanitaire', label: 'Sanitaire (RC Pro)', base: 240, spread: 0.4 },
  { value: 'solier-moquettiste', label: 'Solier-moquettiste (RC Pro)', base: 220, spread: 0.4 },
  { value: 'sous-traitant-btp', label: 'Sous-traitant BTP (RC Pro)', base: 280, spread: 0.4 },
  { value: 'vitrier', label: 'Vitrier (RC Pro)', base: 240, spread: 0.4 },
  { value: 'vtc', label: 'VTC (RC Pro pure)', base: 220, spread: 0.4 },
  { value: 'chauffeur-prive', label: 'Chauffeur privé (RC Pro)', base: 220, spread: 0.4 },
] as const

const METIERS_MULTIRISQUE: readonly MetierOption[] = [
  // Commerce de bouche (Coover / AssurResto 2026 — local SARL CA 80k)
  { value: 'restaurant', label: 'Restaurant — brasserie', base: 1400, spread: 0.3 },
  { value: 'boulangerie', label: 'Boulangerie — pâtisserie', base: 850, spread: 0.32 },
  { value: 'boucherie', label: 'Boucherie — charcuterie', base: 1100, spread: 0.3 },
  { value: 'primeur-caviste', label: 'Primeur — caviste — fromagerie', base: 660, spread: 0.34 },
  { value: 'traiteur', label: 'Traiteur — food truck', base: 740, spread: 0.34 },
  // Retail spécialisé
  { value: 'commerce-detail', label: 'Commerce de détail généraliste', base: 540, spread: 0.35 },
  { value: 'pharmacie', label: 'Pharmacie — officine', base: 1700, spread: 0.28 },
  {
    value: 'opticien-bijoutier',
    label: 'Opticien — bijouterie — horlogerie',
    base: 1900,
    spread: 0.28,
  },
  { value: 'librairie-presse', label: 'Librairie — presse — tabac', base: 720, spread: 0.32 },
  { value: 'fleuriste', label: 'Fleuriste — animalerie', base: 480, spread: 0.34 },
  // Services à la personne
  {
    value: 'salon-coiffure',
    label: 'Salon coiffure — esthétique — barbier',
    base: 460,
    spread: 0.35,
  },
  {
    value: 'pressing-cordonnerie',
    label: 'Pressing — cordonnerie — retoucherie',
    base: 520,
    spread: 0.34,
  },
  // Cabinets / libéraux
  { value: 'bureau-services', label: 'Bureau — activité de services', base: 380, spread: 0.36 },
  { value: 'cabinet-medical', label: 'Cabinet médical — paramédical', base: 540, spread: 0.33 },
  {
    value: 'cabinet-liberal',
    label: 'Cabinet libéral (avocat — EC — architecte)',
    base: 620,
    spread: 0.33,
  },
  // Ateliers & BTP local
  { value: 'atelier-artisan', label: 'Atelier artisan', base: 620, spread: 0.34 },
  { value: 'garage-auto', label: 'Garage — carrosserie automobile', base: 1700, spread: 0.28 },
  { value: 'depot-btp', label: 'Showroom — dépôt BTP', base: 880, spread: 0.32 },
  // Hôtellerie & tourisme
  { value: 'hotel', label: 'Hôtel — résidence', base: 1800, spread: 0.3 },
  { value: 'camping-gite', label: 'Camping — gîte — chambre d’hôtes', base: 920, spread: 0.32 },
  // Sport, loisir, éducation
  { value: 'salle-sport', label: 'Salle de sport — école de danse', base: 850, spread: 0.32 },
  {
    value: 'autoecole-formation',
    label: 'Auto-école — organisme de formation',
    base: 580,
    spread: 0.34,
  },
  // E-commerce physique / stock
  {
    value: 'ecommerce-entrepot',
    label: 'E-commerce avec entrepôt — stock',
    base: 1500,
    spread: 0.3,
  },
  // Industrie & associatif
  {
    value: 'industrie-legere',
    label: 'Atelier de production — industrie légère',
    base: 2400,
    spread: 0.28,
  },
  { value: 'association', label: 'Association — lieu d’accueil', base: 420, spread: 0.36 },
  // Aliases pSEO complets (72 métiers Ahrefs — multirisque covers all)
  { value: 'avocat', label: 'Cabinet avocat (local)', base: 620, spread: 0.34 },
  { value: 'commissaire-aux-comptes', label: 'CAC (cabinet)', base: 720, spread: 0.32 },
  { value: 'huissier', label: 'Huissier (étude)', base: 680, spread: 0.32 },
  {
    value: 'mandataire-judiciaire',
    label: 'Mandataire judiciaire (étude)',
    base: 720,
    spread: 0.32,
  },
  { value: 'notaire', label: 'Notaire (étude)', base: 980, spread: 0.3 },
  { value: 'expert-comptable', label: 'Expert-comptable (cabinet)', base: 620, spread: 0.32 },
  { value: 'dentiste', label: 'Cabinet dentaire', base: 720, spread: 0.32 },
  { value: 'kinesitherapeute', label: 'Cabinet kiné', base: 480, spread: 0.34 },
  { value: 'medecin-generaliste', label: 'Cabinet médecin gé', base: 540, spread: 0.33 },
  { value: 'medecin-specialiste', label: 'Cabinet médecin spé', base: 720, spread: 0.32 },
  { value: 'osteopathe', label: 'Cabinet ostéopathe', base: 460, spread: 0.34 },
  { value: 'psychologue', label: 'Cabinet psychologue', base: 380, spread: 0.36 },
  { value: 'pharmacien', label: 'Pharmacien (alias)', base: 1700, spread: 0.28 },
  { value: 'sage-femme', label: 'Cabinet sage-femme', base: 480, spread: 0.34 },
  { value: 'infirmier-liberal', label: 'Infirmier libéral (cabinet)', base: 420, spread: 0.34 },
  { value: 'infirmier-libéral', label: 'Infirmier libéral (cabinet)', base: 420, spread: 0.34 },
  {
    value: 'architecte-interieur',
    label: 'Architecte d’intérieur (cabinet)',
    base: 540,
    spread: 0.34,
  },
  { value: 'architecte-dplg', label: 'Architecte DPLG (cabinet)', base: 720, spread: 0.32 },
  // BTP en multirisque (local atelier/dépôt artisan)
  { value: 'macon', label: 'Maçon (atelier/dépôt)', base: 620, spread: 0.34 },
  { value: 'electricien', label: 'Électricien (atelier)', base: 580, spread: 0.34 },
  { value: 'plombier', label: 'Plombier (atelier)', base: 580, spread: 0.34 },
  {
    value: 'plombier-chauffagiste',
    label: 'Plombier-chauffagiste (atelier)',
    base: 620,
    spread: 0.34,
  },
  { value: 'chauffagiste', label: 'Chauffagiste (atelier)', base: 580, spread: 0.34 },
  { value: 'peintre', label: 'Peintre (atelier)', base: 480, spread: 0.34 },
  { value: 'carreleur', label: 'Carreleur (atelier)', base: 480, spread: 0.34 },
  { value: 'menuisier-interieur', label: 'Menuisier intérieur (atelier)', base: 520, spread: 0.34 },
  { value: 'menuisier-exterieur', label: 'Menuisier extérieur (atelier)', base: 580, spread: 0.34 },
  { value: 'charpentier-bois', label: 'Charpentier bois (atelier)', base: 620, spread: 0.34 },
  {
    value: 'charpentier-metallique',
    label: 'Charpentier métal (atelier)',
    base: 680,
    spread: 0.34,
  },
  { value: 'couvreur-zingueur', label: 'Couvreur (atelier)', base: 680, spread: 0.34 },
  { value: 'etancheur', label: 'Étancheur (atelier)', base: 720, spread: 0.34 },
  { value: 'terrassier', label: 'Terrassier (dépôt)', base: 620, spread: 0.34 },
  { value: 'demolisseur', label: 'Démolisseur (dépôt)', base: 780, spread: 0.32 },
  { value: 'pisciniste', label: 'Pisciniste (atelier)', base: 720, spread: 0.34 },
  { value: 'paysagiste', label: 'Paysagiste (atelier)', base: 540, spread: 0.34 },
  { value: 'plaquiste-platrier', label: 'Plaquiste-plâtrier (atelier)', base: 480, spread: 0.34 },
  { value: 'serrurier-metallier', label: 'Serrurier-métallier (atelier)', base: 580, spread: 0.34 },
  { value: 'facadier-ite', label: 'Façadier ITE (atelier)', base: 620, spread: 0.34 },
  { value: 'multi-services-btp', label: 'Multi-services BTP (atelier)', base: 680, spread: 0.34 },
  { value: 'agenceur', label: 'Agenceur (atelier)', base: 520, spread: 0.34 },
  { value: 'alarme-securite', label: 'Alarme-sécurité (atelier)', base: 720, spread: 0.34 },
  { value: 'ascensoriste', label: 'Ascensoriste (atelier)', base: 820, spread: 0.32 },
  { value: 'assainisseur', label: 'Assainisseur (atelier)', base: 680, spread: 0.34 },
  { value: 'bardeur', label: 'Bardeur (atelier)', base: 680, spread: 0.34 },
  { value: 'bureau-etudes', label: 'Bureau d’études (bureau)', base: 480, spread: 0.34 },
  { value: 'carrossier-batiment', label: 'Carrossier bâtiment (atelier)', base: 620, spread: 0.34 },
  { value: 'cheminee-fumisterie', label: 'Cheminée-fumisterie (atelier)', base: 620, spread: 0.34 },
  { value: 'cmi', label: 'CMI (bureau-dépôt)', base: 820, spread: 0.32 },
  { value: 'desamianteur', label: 'Désamianteur (dépôt)', base: 780, spread: 0.32 },
  { value: 'domoticien', label: 'Domoticien (atelier)', base: 520, spread: 0.34 },
  {
    value: 'economiste-construction',
    label: 'Économiste construction (bureau)',
    base: 480,
    spread: 0.34,
  },
  { value: 'elagueur', label: 'Élagueur (atelier)', base: 480, spread: 0.34 },
  { value: 'escalierieur', label: 'Escaliériste (atelier)', base: 520, spread: 0.34 },
  { value: 'foreur', label: 'Foreur (dépôt)', base: 680, spread: 0.34 },
  { value: 'frigoriste', label: 'Frigoriste (atelier)', base: 680, spread: 0.34 },
  { value: 'geometre-expert', label: 'Géomètre-expert (bureau)', base: 540, spread: 0.34 },
  { value: 'insert-poele', label: 'Insert-poêle (atelier)', base: 540, spread: 0.34 },
  { value: 'installateur-fibre', label: 'Installateur fibre (atelier)', base: 580, spread: 0.34 },
  { value: 'isolation-iteiti', label: 'Isolation ITE/ITI (atelier)', base: 580, spread: 0.34 },
  { value: 'lvc', label: 'LVC (bureau)', base: 720, spread: 0.32 },
  { value: 'maitre-oeuvre', label: 'Maître d’œuvre (bureau)', base: 680, spread: 0.32 },
  { value: 'pac', label: 'PAC (atelier)', base: 580, spread: 0.34 },
  { value: 'parqueteur', label: 'Parqueteur (atelier)', base: 480, spread: 0.34 },
  { value: 'photovoltaique', label: 'Photovoltaïque (atelier)', base: 620, spread: 0.34 },
  { value: 'poseur-veranda', label: 'Poseur véranda (atelier)', base: 580, spread: 0.34 },
  { value: 'promoteur', label: 'Promoteur immo (bureau)', base: 1480, spread: 0.3 },
  { value: 'sanitaire', label: 'Sanitaire (atelier)', base: 520, spread: 0.34 },
  { value: 'solier-moquettiste', label: 'Solier-moquettiste (atelier)', base: 460, spread: 0.34 },
  { value: 'sous-traitant-btp', label: 'Sous-traitant BTP (atelier)', base: 580, spread: 0.34 },
  { value: 'vitrier', label: 'Vitrier (atelier)', base: 520, spread: 0.34 },
  { value: 'taxi', label: 'Taxi (garage)', base: 540, spread: 0.34 },
  { value: 'vtc', label: 'VTC (garage)', base: 540, spread: 0.34 },
  { value: 'chauffeur-prive', label: 'Chauffeur privé (garage)', base: 540, spread: 0.34 },
] as const

const METIERS_CYBER: readonly MetierOption[] = [
  // Tech (post-NIS2 oct 2024 — Hiscox/Courtier-Digital/Axido 2026)
  { value: 'freelance-dev', label: 'Freelance IT — développeur', base: 650, spread: 0.38 },
  { value: 'agence-digital', label: 'Agence digital — web — UX', base: 1200, spread: 0.36 },
  { value: 'esn-prestataire', label: 'ESN — prestataire IT', base: 3800, spread: 0.32 },
  { value: 'editeur-saas', label: 'Éditeur SaaS — tech', base: 3500, spread: 0.34 },
  { value: 'media-agence', label: 'Média — régie — agence com', base: 1200, spread: 0.36 },
  // Retail / e-commerce
  { value: 'ecommerce', label: 'E-commerce mono-boutique', base: 1600, spread: 0.36 },
  { value: 'marketplace', label: 'Marketplace — plateforme', base: 4200, spread: 0.34 },
  {
    value: 'retail-omnicanal',
    label: 'Retail omnicanal — réseau magasins',
    base: 1800,
    spread: 0.34,
  },
  // Services pro
  { value: 'tpe-services', label: 'TPE services (<10 salariés)', base: 750, spread: 0.36 },
  { value: 'pme-services', label: 'PME services (10-50)', base: 2200, spread: 0.34 },
  {
    value: 'cabinet-conseil',
    label: 'Cabinet conseil — audit — stratégie',
    base: 1100,
    spread: 0.34,
  },
  { value: 'cabinet-avocat', label: 'Cabinet avocat — RGPD — DPO', base: 2400, spread: 0.3 },
  { value: 'expert-comptable', label: 'Expert-comptable — paie', base: 2600, spread: 0.3 },
  { value: 'courtier-iobsp', label: 'Courtier IOBSP — assurance — immo', base: 2400, spread: 0.3 },
  {
    value: 'finance-courtage',
    label: 'Finance — gestion privée — fintech',
    base: 5800,
    spread: 0.28,
  },
  // Santé
  { value: 'sante', label: 'Acteur santé — cabinet', base: 2800, spread: 0.32 },
  {
    value: 'cabinet-sante',
    label: 'Cabinet médical — paramédical libéral',
    base: 880,
    spread: 0.36,
  },
  { value: 'clinique-ehpad', label: 'Clinique — EHPAD — centre santé', base: 4500, spread: 0.3 },
  {
    value: 'laboratoire-imagerie',
    label: 'Laboratoire — imagerie médicale',
    base: 2400,
    spread: 0.3,
  },
  {
    value: 'pharmacie-connectee',
    label: 'Pharmacie — parapharmacie connectée',
    base: 1320,
    spread: 0.34,
  },
  // Industrie & logistique
  { value: 'industrie-pme', label: 'Industrie — PME production', base: 1700, spread: 0.34 },
  {
    value: 'transport-logistique',
    label: 'Transport — logistique — flotte connectée',
    base: 1900,
    spread: 0.34,
  },
  // Hôtellerie connectée
  {
    value: 'hotellerie-resto',
    label: 'Hôtellerie — restauration (PMS — CRM)',
    base: 980,
    spread: 0.36,
  },
  // Éducation
  {
    value: 'ecole-formation',
    label: 'École — organisme formation — edtech',
    base: 900,
    spread: 0.34,
  },
  // ESS / collectivités
  { value: 'association', label: 'Association — ESS', base: 480, spread: 0.38 },
  { value: 'collectivite-osm', label: 'Collectivité — OSE NIS2', base: 4500, spread: 0.3 },
  // Aliases pSEO — métiers libéraux/santé fréquents en pSEO cyber (mapping vers cyber pro)
  { value: 'avocat', label: 'Cabinet avocat (cyber)', base: 1900, spread: 0.32 },
  { value: 'commissaire-aux-comptes', label: 'CAC (cyber audit)', base: 3800, spread: 0.3 },
  { value: 'huissier', label: 'Huissier — commissaire justice (cyber)', base: 2200, spread: 0.32 },
  {
    value: 'mandataire-judiciaire',
    label: 'Mandataire judiciaire (cyber)',
    base: 3200,
    spread: 0.3,
  },
  { value: 'notaire', label: 'Notaire (cyber)', base: 4200, spread: 0.3 },
  { value: 'dentiste', label: 'Cabinet dentaire (cyber)', base: 1400, spread: 0.32 },
  { value: 'kinesitherapeute', label: 'Kinésithérapeute (cyber)', base: 680, spread: 0.34 },
  { value: 'medecin-generaliste', label: 'Médecin généraliste (cyber)', base: 880, spread: 0.34 },
  { value: 'medecin-specialiste', label: 'Médecin spécialiste (cyber)', base: 1450, spread: 0.32 },
  { value: 'osteopathe', label: 'Ostéopathe (cyber)', base: 520, spread: 0.34 },
  { value: 'psychologue', label: 'Psychologue (cyber)', base: 480, spread: 0.36 },
  { value: 'pharmacien', label: 'Pharmacien (cyber)', base: 1480, spread: 0.32 },
  { value: 'sage-femme', label: 'Sage-femme (cyber)', base: 720, spread: 0.34 },
  { value: 'infirmier-liberal', label: 'Infirmier libéral (cyber)', base: 560, spread: 0.34 },
  { value: 'infirmier-libéral', label: 'Infirmier libéral (cyber)', base: 560, spread: 0.34 },
  {
    value: 'architecte-interieur',
    label: 'Architecte d’intérieur (cyber)',
    base: 580,
    spread: 0.36,
  },
  { value: 'architecte-dplg', label: 'Architecte DPLG (cyber)', base: 920, spread: 0.34 },
  // BTP en cyber (rare mais pSEO génère ces routes) — base proche TPE services
  { value: 'macon', label: 'Maçon (cyber)', base: 580, spread: 0.4 },
  { value: 'electricien', label: 'Électricien (cyber)', base: 520, spread: 0.4 },
  { value: 'plombier', label: 'Plombier (cyber)', base: 520, spread: 0.4 },
  {
    value: 'plombier-chauffagiste',
    label: 'Plombier-chauffagiste (cyber)',
    base: 560,
    spread: 0.4,
  },
  { value: 'chauffagiste', label: 'Chauffagiste (cyber)', base: 540, spread: 0.4 },
  { value: 'peintre', label: 'Peintre (cyber)', base: 480, spread: 0.4 },
  { value: 'carreleur', label: 'Carreleur (cyber)', base: 500, spread: 0.4 },
  { value: 'menuisier-interieur', label: 'Menuisier intérieur (cyber)', base: 500, spread: 0.4 },
  { value: 'menuisier-exterieur', label: 'Menuisier extérieur (cyber)', base: 550, spread: 0.4 },
  { value: 'charpentier-bois', label: 'Charpentier bois (cyber)', base: 580, spread: 0.4 },
  { value: 'charpentier-metallique', label: 'Charpentier métal (cyber)', base: 600, spread: 0.4 },
  { value: 'couvreur-zingueur', label: 'Couvreur (cyber)', base: 620, spread: 0.4 },
  { value: 'etancheur', label: 'Étancheur (cyber)', base: 680, spread: 0.4 },
  { value: 'terrassier', label: 'Terrassier (cyber)', base: 550, spread: 0.4 },
  { value: 'demolisseur', label: 'Démolisseur (cyber)', base: 720, spread: 0.4 },
  { value: 'pisciniste', label: 'Pisciniste (cyber)', base: 680, spread: 0.4 },
  { value: 'paysagiste', label: 'Paysagiste (cyber)', base: 480, spread: 0.4 },
  { value: 'plaquiste-platrier', label: 'Plaquiste-plâtrier (cyber)', base: 480, spread: 0.4 },
  { value: 'serrurier-metallier', label: 'Serrurier-métallier (cyber)', base: 540, spread: 0.4 },
  { value: 'facadier-ite', label: 'Façadier ITE (cyber)', base: 560, spread: 0.4 },
  { value: 'multi-services-btp', label: 'Multi-services BTP (cyber)', base: 580, spread: 0.4 },
  // Autres pSEO BTP+
  { value: 'agenceur', label: 'Agenceur (cyber)', base: 460, spread: 0.4 },
  { value: 'alarme-securite', label: 'Alarme-sécurité (cyber)', base: 1200, spread: 0.34 },
  { value: 'ascensoriste', label: 'Ascensoriste (cyber)', base: 780, spread: 0.4 },
  { value: 'assainisseur', label: 'Assainisseur (cyber)', base: 580, spread: 0.4 },
  { value: 'bardeur', label: 'Bardeur (cyber)', base: 580, spread: 0.4 },
  { value: 'bureau-etudes', label: 'Bureau d’études (cyber)', base: 1200, spread: 0.34 },
  { value: 'carrossier-batiment', label: 'Carrossier bâtiment (cyber)', base: 540, spread: 0.4 },
  { value: 'cheminee-fumisterie', label: 'Cheminée-fumisterie (cyber)', base: 540, spread: 0.4 },
  { value: 'cmi', label: 'CMI (cyber)', base: 980, spread: 0.36 },
  { value: 'desamianteur', label: 'Désamianteur (cyber)', base: 680, spread: 0.4 },
  { value: 'domoticien', label: 'Domoticien (cyber)', base: 720, spread: 0.36 },
  {
    value: 'economiste-construction',
    label: 'Économiste construction (cyber)',
    base: 1080,
    spread: 0.34,
  },
  { value: 'elagueur', label: 'Élagueur (cyber)', base: 480, spread: 0.4 },
  { value: 'escalierieur', label: 'Escaliériste (cyber)', base: 500, spread: 0.4 },
  { value: 'foreur', label: 'Foreur (cyber)', base: 580, spread: 0.4 },
  { value: 'frigoriste', label: 'Frigoriste (cyber)', base: 720, spread: 0.4 },
  { value: 'geometre-expert', label: 'Géomètre-expert (cyber)', base: 1080, spread: 0.34 },
  { value: 'insert-poele', label: 'Insert-poêle (cyber)', base: 500, spread: 0.4 },
  { value: 'installateur-fibre', label: 'Installateur fibre (cyber)', base: 680, spread: 0.4 },
  { value: 'isolation-iteiti', label: 'Isolation ITE/ITI (cyber)', base: 560, spread: 0.4 },
  { value: 'lvc', label: 'LVC (cyber)', base: 980, spread: 0.36 },
  { value: 'maitre-oeuvre', label: 'Maître d’œuvre (cyber)', base: 1280, spread: 0.34 },
  { value: 'pac', label: 'PAC (cyber)', base: 560, spread: 0.4 },
  { value: 'parqueteur', label: 'Parqueteur (cyber)', base: 460, spread: 0.4 },
  { value: 'photovoltaique', label: 'Photovoltaïque (cyber)', base: 580, spread: 0.4 },
  { value: 'poseur-veranda', label: 'Poseur véranda (cyber)', base: 540, spread: 0.4 },
  { value: 'promoteur', label: 'Promoteur immo (cyber)', base: 1880, spread: 0.32 },
  { value: 'sanitaire', label: 'Sanitaire (cyber)', base: 500, spread: 0.4 },
  { value: 'solier-moquettiste', label: 'Solier-moquettiste (cyber)', base: 460, spread: 0.4 },
  { value: 'sous-traitant-btp', label: 'Sous-traitant BTP (cyber)', base: 580, spread: 0.4 },
  { value: 'vitrier', label: 'Vitrier (cyber)', base: 500, spread: 0.4 },
  { value: 'taxi', label: 'Taxi (cyber)', base: 480, spread: 0.4 },
  { value: 'vtc', label: 'VTC (cyber)', base: 480, spread: 0.4 },
  { value: 'chauffeur-prive', label: 'Chauffeur privé (cyber)', base: 480, spread: 0.4 },
] as const

const STATUT_MODIFIER: Readonly<Record<Statut, number>> = {
  'auto-entrepreneur': 0.82,
  sarl: 1.0,
  sas: 1.06,
}

const STATUTS: readonly { readonly value: Statut; readonly label: string }[] = [
  { value: 'auto-entrepreneur', label: 'Auto-entrepreneur' },
  { value: 'sarl', label: 'SARL' },
  { value: 'sas', label: 'SAS — SASU' },
] as const

const GARANTIE_LABELS: Readonly<Record<Garantie, string>> = {
  decennale: 'Décennale BTP',
  'rc-pro': 'RC Pro',
  'multirisque-pro': 'Multirisque Pro',
  cyber: 'Cyber-assurance',
  'mutuelle-pro': 'Mutuelle TNS — Pro',
  vtc: 'Assurance VTC — Taxi',
  'flotte-auto': 'Flotte automobile pro',
  'dommages-ouvrage': 'Dommages-ouvrage (DO)',
  'tous-risques-chantier': 'Tous Risques Chantier (TRC)',
  'transport-marchandises': 'Transport de marchandises',
  'moto-pro': 'Moto professionnelle',
  prevoyance: 'Prévoyance TNS — dirigeant',
  'protection-juridique': 'Protection juridique pro',
  'homme-cle': 'Assurance Homme-clé',
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CA_REF = 80_000

/**
 * Multiplicateur CA — courbe sous-linéaire calibrée marché courtage FR 2026.
 * Plafonnée à 1,5 M€ pour éviter dérive sur très gros CA (au-delà = négociation broker).
 *
 * Exposant 0.60 calibré vs courbes APRIL Pro / Hiscox 2026 (broker typique
 * @150k = ×1.35-1.45, @500k = ×1.75-1.90, @1M = ×2.15-2.40).
 */
function caMultiplier(caEuros: number): number {
  const ca = Math.max(Math.min(caEuros, 1_500_000), 5_000)
  return 0.55 + 0.45 * Math.pow(ca / CA_REF, 0.6)
}

function roundTen(n: number): number {
  return Math.round(n / 10) * 10
}

/**
 * Range min/max autour du mid avec garde-fou plancher 10€ (jamais 0€ affiché).
 * Garantit min < max même sur valeurs très faibles.
 */
function spreadRange(mid: number, spread: number): { min: number; max: number } {
  const rawMin = roundTen(mid * (1 - spread))
  const rawMax = roundTen(mid * (1 + spread))
  const guardedMin = Math.max(10, rawMin)
  return { min: guardedMin, max: Math.max(guardedMin + 10, rawMax) }
}

/**
 * Sélectionne le métier initial: priorité au defaultMetier (depuis URL slug)
 * s'il est dans le catalogue, sinon fallback au premier élément.
 */
function pickInitialMetier(
  defaultMetier: string | undefined,
  catalog: readonly MetierOption[]
): string {
  if (defaultMetier && catalog.some((m) => m.value === defaultMetier)) {
    return defaultMetier
  }
  return catalog[0]?.value ?? ''
}

const eurosFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'decimal',
  maximumFractionDigits: 0,
})

function formatEuros(n: number): string {
  return `${eurosFormatter.format(n)} €`
}

function formatCaShort(n: number): string {
  if (n >= 1_000_000) {
    const m = n / 1_000_000
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} M€`
  }
  if (n >= 1000) return `${Math.round(n / 1000)} k€`
  return `${n} €`
}

/**
 * Détermine step adaptatif pour un slider CA selon max.
 * Maintient ~50-100 crans utiles.
 */
function caStep(maxCa: number): number {
  if (maxCa <= 500_000) return 10_000
  if (maxCa <= 2_000_000) return 25_000
  if (maxCa <= 5_000_000) return 50_000
  return 100_000
}

/** Génère ticks 3-pts pour slider CA [min, mid, max]. */
function caTicks(maxCa: number): readonly [string, string, string] {
  return ['5 k€', formatCaShort(maxCa / 2), formatCaShort(maxCa)]
}

// ---------------------------------------------------------------------------
// UI sub-components (réutilisés)
// ---------------------------------------------------------------------------

interface SelectFieldProps {
  id: string
  label: string
  ariaLabel: string
  value: string
  onChange: (v: string) => void
  options: readonly { value: string; label: string }[]
  colSpan?: 1 | 2
}

function SelectField({
  id,
  label,
  ariaLabel,
  value,
  onChange,
  options,
  colSpan = 2,
}: SelectFieldProps) {
  return (
    <div className={colSpan === 2 ? 'md:col-span-2' : ''}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-charcoal-800">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="w-full appearance-none rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-sm text-charcoal-900 shadow-sm transition-colors hover:border-sand-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

interface SliderFieldProps {
  id: string
  label: string
  ariaLabel: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  display: string
  ticks?: readonly string[]
}

function SliderField({
  id,
  label,
  ariaLabel,
  value,
  min,
  max,
  step,
  onChange,
  display,
  ticks,
}: SliderFieldProps) {
  return (
    <div className="md:col-span-2">
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-charcoal-800">
          {label}
        </label>
        <span className="text-sm font-semibold tabular-nums text-charcoal-900">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={display}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-sand-200 accent-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400/40"
      />
      {ticks && (
        <div className="mt-1 flex justify-between text-[11px] tabular-nums text-charcoal-500">
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

interface RadioGroupFieldProps<T extends string> {
  id: string
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (v: T) => void
  /** ariaLabelPrefix devient `${prefix} ${optionLabel}` pour matcher tests. */
  ariaLabelPrefix?: string
  cols?: 2 | 3 | 4
}

function RadioGroupField<T extends string>({
  id,
  label,
  value,
  options,
  onChange,
  ariaLabelPrefix,
  cols = 3,
}: RadioGroupFieldProps<T>) {
  const colsCls = cols === 2 ? 'sm:grid-cols-2' : cols === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'
  return (
    <div className="md:col-span-2">
      <span id={id} className="mb-1.5 block text-sm font-medium text-charcoal-800">
        {label}
      </span>
      <div role="radiogroup" aria-labelledby={id} className={`grid grid-cols-1 gap-2 ${colsCls}`}>
        {options.map((o) => {
          const checked = value === o.value
          const aria = ariaLabelPrefix ? `${ariaLabelPrefix} ${o.label}` : o.label
          return (
            <label
              key={o.value}
              className={`flex cursor-pointer items-center justify-center rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors focus-within:ring-2 focus-within:ring-primary-400/40 ${
                checked
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-sand-300 bg-white text-charcoal-800 hover:border-sand-400'
              }`}
            >
              <input
                type="radio"
                name={id}
                value={o.value}
                checked={checked}
                onChange={() => onChange(o.value)}
                aria-label={aria}
                className="sr-only"
              />
              {o.label}
            </label>
          )
        })}
      </div>
    </div>
  )
}

interface ToggleFieldProps {
  id: string
  label: string
  value: boolean
  onChange: (v: boolean) => void
  hint?: string
}

function ToggleField({ id, label, value, onChange, hint }: ToggleFieldProps) {
  return (
    <div className="md:col-span-2">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start justify-between gap-3 rounded-lg border border-sand-300 bg-white px-4 py-3 text-sm hover:border-sand-400"
      >
        <span className="flex-1">
          <span className="block font-medium text-charcoal-900">{label}</span>
          {hint && <span className="mt-0.5 block text-[12px] text-charcoal-600">{hint}</span>}
        </span>
        <span className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center">
          <input
            id={id}
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-sand-300 transition-colors peer-checked:bg-primary-500 peer-focus:ring-2 peer-focus:ring-primary-400/40"
          />
          <span
            aria-hidden
            className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"
          />
        </span>
      </label>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Per-vertical state hooks + compute
// ---------------------------------------------------------------------------

type Range = { min: number; max: number }

// ---- DECENNALE -------------------------------------------------------------

type Anciennete = 'creation' | '1-5ans' | '5plus'
type Sinistralite = '0' | '1' | '2plus'

const ANCIENNETE_MOD: Record<Anciennete, number> = {
  creation: 1.18,
  '1-5ans': 1.0,
  '5plus': 0.92,
}
const SINISTRALITE_MOD: Record<Sinistralite, number> = {
  '0': 1.0,
  '1': 1.18,
  '2plus': 1.45,
}

function useDecennaleForm(defaultMetier?: string) {
  const [metierValue, setMetierValue] = useState<string>(
    pickInitialMetier(defaultMetier, METIERS_DECENNALE)
  )
  const [ca, setCa] = useState<number>(80_000)
  const [statut, setStatut] = useState<Statut>('sarl')
  const [anciennete, setAnciennete] = useState<Anciennete>('1-5ans')
  const [sinistralite, setSinistralite] = useState<Sinistralite>('0')

  const range = useMemo<Range>(() => {
    const metier = METIERS_DECENNALE.find((m) => m.value === metierValue)
    if (!metier) return { min: 0, max: 0 }
    const mid =
      metier.base *
      caMultiplier(ca) *
      STATUT_MODIFIER[statut] *
      ANCIENNETE_MOD[anciennete] *
      SINISTRALITE_MOD[sinistralite]
    return spreadRange(mid, metier.spread)
  }, [metierValue, ca, statut, anciennete, sinistralite])

  return {
    metierValue,
    setMetierValue,
    ca,
    setCa,
    statut,
    setStatut,
    anciennete,
    setAnciennete,
    sinistralite,
    setSinistralite,
    range,
  }
}

// ---- RC PRO ----------------------------------------------------------------

const ACTIVITE_RISQUE_MOD = { standard: 1.0, sensible: 1.28 } as const
type ActiviteRisque = keyof typeof ACTIVITE_RISQUE_MOD

/**
 * Multiplicateur effectif (RC Pro) — sous-linéaire calibrée FFA 2026.
 * Coeff 0.15 (vs 0.18 ancien) — lisse le saut n=0→1 (+15% vs +18%) et corrige
 * sur-estimation n=50 (2.30 vs 2.55, marché 2.0-2.3).
 * @0=1.0, @1=1.15, @5=1.36, @10=1.53, @50=2.30, @100=2.85
 */
function effectifMultiplier(n: number): number {
  return 1 + 0.15 * Math.pow(Math.max(n, 0), 0.55)
}

/**
 * Multiplicateur effectif CYBER — courbe amortie vs RC Pro.
 * Cyber compound caMul × effMul × dataSens dépasse marché si pleine pente.
 * Coeff 0.12 corrige overshoot ~20% sur PME 10-50 sal (Hiscox cyber 2026).
 * @0=1.0, @10=1.42, @50=2.04, @100=2.49
 */
function cyberEffectifMultiplier(n: number): number {
  return 1 + 0.12 * Math.pow(Math.max(n, 0), 0.55)
}

function useRcProForm(defaultMetier?: string) {
  const [metierValue, setMetierValue] = useState<string>(
    pickInitialMetier(defaultMetier, METIERS_RC_PRO)
  )
  const [ca, setCa] = useState<number>(80_000)
  const [statut, setStatut] = useState<Statut>('sarl')
  const [activite, setActivite] = useState<ActiviteRisque>('standard')
  const [effectif, setEffectif] = useState<number>(0)

  const range = useMemo<Range>(() => {
    const metier = METIERS_RC_PRO.find((m) => m.value === metierValue)
    if (!metier) return { min: 0, max: 0 }
    const mid =
      metier.base *
      caMultiplier(ca) *
      STATUT_MODIFIER[statut] *
      ACTIVITE_RISQUE_MOD[activite] *
      effectifMultiplier(effectif)
    return spreadRange(mid, metier.spread)
  }, [metierValue, ca, statut, activite, effectif])

  return {
    metierValue,
    setMetierValue,
    ca,
    setCa,
    statut,
    setStatut,
    activite,
    setActivite,
    effectif,
    setEffectif,
    range,
  }
}

// ---- MULTIRISQUE -----------------------------------------------------------

function surfaceMultiplier(m2: number): number {
  // 50m² = 1.0, 200m² = ~1.7, 500m² = ~2.5
  return 0.6 + 0.4 * Math.pow(Math.max(m2, 10) / 50, 0.6)
}
function contenuMultiplier(eur: number): number {
  // 20k = 1.0, 100k = ~1.5, 500k = ~2.3
  return 0.7 + 0.3 * Math.pow(Math.max(eur, 5_000) / 20_000, 0.55)
}

function useMultirisqueForm(defaultMetier?: string) {
  const [metierValue, setMetierValue] = useState<string>(
    pickInitialMetier(defaultMetier, METIERS_MULTIRISQUE)
  )
  const [surface, setSurface] = useState<number>(80)
  const [contenu, setContenu] = useState<number>(40_000)
  const [statut, setStatut] = useState<Statut>('sarl')

  const range = useMemo<Range>(() => {
    const metier = METIERS_MULTIRISQUE.find((m) => m.value === metierValue)
    if (!metier) return { min: 0, max: 0 }
    const mid =
      metier.base *
      surfaceMultiplier(surface) *
      contenuMultiplier(contenu) *
      STATUT_MODIFIER[statut]
    return spreadRange(mid, metier.spread)
  }, [metierValue, surface, contenu, statut])

  return {
    metierValue,
    setMetierValue,
    surface,
    setSurface,
    contenu,
    setContenu,
    statut,
    setStatut,
    range,
  }
}

// ---- CYBER -----------------------------------------------------------------

function useCyberForm(defaultMetier?: string) {
  const [metierValue, setMetierValue] = useState<string>(
    pickInitialMetier(defaultMetier, METIERS_CYBER)
  )
  const [ca, setCa] = useState<number>(80_000)
  const [statut, setStatut] = useState<Statut>('sarl')
  const [effectif, setEffectif] = useState<number>(5)
  const [dataSensibles, setDataSensibles] = useState<boolean>(false)

  const range = useMemo<Range>(() => {
    const metier = METIERS_CYBER.find((m) => m.value === metierValue)
    if (!metier) return { min: 0, max: 0 }
    const mid =
      metier.base *
      caMultiplier(ca) *
      STATUT_MODIFIER[statut] *
      cyberEffectifMultiplier(effectif) *
      (dataSensibles ? 1.35 : 1.0)
    return spreadRange(mid, metier.spread)
  }, [metierValue, ca, statut, effectif, dataSensibles])

  return {
    metierValue,
    setMetierValue,
    ca,
    setCa,
    statut,
    setStatut,
    effectif,
    setEffectif,
    dataSensibles,
    setDataSensibles,
    range,
  }
}

// ---- MUTUELLE PRO ----------------------------------------------------------

type NiveauMutuelle = 'eco' | 'median' | 'premium'

// Mutuelle TNS NIVEAU_BASE (Empruntis / LeComparateurAssurance / UNOCAM 2026)
// Calibré pour profil 40 ans 0 ayant droit (ref applyMul = 1.0).
const NIVEAU_BASE: Record<NiveauMutuelle, number> = {
  eco: 540,
  median: 900,
  premium: 1450,
}
const NIVEAU_SPREAD: Record<NiveauMutuelle, number> = {
  eco: 0.28,
  median: 0.26,
  premium: 0.24,
}

/**
 * Multiplicateur âge mutuelle TNS — courbe UNOCAM / grilles AMC 2026.
 * @30=0.84, @45=1.16, @60=1.72 (ratio cible 1.7 entre 30 et 60 ans).
 * Quadratique 0.0005 calibré post-50 ans (vs 0.0006 ancien trop agressif >55).
 */
function ageMultiplier(age: number): number {
  const a = Math.max(age, 18)
  return 0.7 + 0.012 * (a - 18) + 0.0005 * Math.pow(Math.max(a - 30, 0), 2)
}

function useMutuelleForm() {
  const [age, setAge] = useState<number>(40)
  const [statut, setStatut] = useState<Statut>('sarl')
  const [niveau, setNiveau] = useState<NiveauMutuelle>('median')
  const [ayantsDroit, setAyantsDroit] = useState<'0' | '1' | '2' | '3plus'>('0')

  const range = useMemo<Range>(() => {
    const ayantsMul =
      ayantsDroit === '0' ? 1 : ayantsDroit === '1' ? 1.45 : ayantsDroit === '2' ? 1.85 : 2.3
    const mid = NIVEAU_BASE[niveau] * ageMultiplier(age) * STATUT_MODIFIER[statut] * ayantsMul
    return spreadRange(mid, NIVEAU_SPREAD[niveau])
  }, [age, statut, niveau, ayantsDroit])

  return { age, setAge, statut, setStatut, niveau, setNiveau, ayantsDroit, setAyantsDroit, range }
}

// ---- VTC -------------------------------------------------------------------

type ZoneVtc = 'paris' | 'idf' | 'grande-ville' | 'regions'
type Vehicule = 'standard' | 'premium' | 'van'
type Plateforme = 'uber-bolt' | 'taxi'

const ZONE_BASE: Record<ZoneVtc, number> = {
  paris: 2600,
  idf: 2100,
  'grande-ville': 1700,
  regions: 1400,
}
const ZONE_SPREAD: Record<ZoneVtc, number> = {
  paris: 0.28,
  idf: 0.3,
  'grande-ville': 0.32,
  regions: 0.34,
}
const VEHICULE_MOD: Record<Vehicule, number> = { standard: 1.0, premium: 1.22, van: 1.35 }
const PLATEFORME_MOD: Record<Plateforme, number> = { 'uber-bolt': 1.0, taxi: 0.92 }

/**
 * Multiplicateur ancienneté permis (VTC/moto pro).
 * Calibré marché 2026 (AssurVTC, Wakam Pro, AssurancesVTC.com).
 * Référence = 10 ans = 1.00 (conducteur expérimenté).
 *
 * @2 ans = 1.60 (jeune permis +60%, art. R.3120-8 minimum VTC 3 ans)
 * @5 ans = 1.30 (intermédiaire +30%)
 * @10 ans = 1.00 (référence)
 * @20 ans = 0.92 (sénior bonus)
 * @30 ans = 0.88 (sénior plafond)
 */
function permisMultiplier(years: number): number {
  const y = Math.max(years, 2)
  if (y < 5) return 1.6 - 0.1 * (y - 2)
  if (y < 10) return 1.3 - 0.06 * (y - 5)
  return Math.max(0.88, 1.0 - 0.008 * (y - 10))
}

function useVtcForm() {
  const [zone, setZone] = useState<ZoneVtc>('paris')
  const [permis, setPermis] = useState<number>(8)
  const [vehicule, setVehicule] = useState<Vehicule>('standard')
  const [plateforme, setPlateforme] = useState<Plateforme>('uber-bolt')
  const [statut, setStatut] = useState<Statut>('auto-entrepreneur')

  const range = useMemo<Range>(() => {
    const mid =
      ZONE_BASE[zone] *
      permisMultiplier(permis) *
      VEHICULE_MOD[vehicule] *
      PLATEFORME_MOD[plateforme] *
      STATUT_MODIFIER[statut]
    return spreadRange(mid, ZONE_SPREAD[zone])
  }, [zone, permis, vehicule, plateforme, statut])

  return {
    zone,
    setZone,
    permis,
    setPermis,
    vehicule,
    setVehicule,
    plateforme,
    setPlateforme,
    statut,
    setStatut,
    range,
  }
}

// ---------------------------------------------------------------------------
// Shared statut radio (réutilisé par toutes verticales)
// ---------------------------------------------------------------------------

function StatutField({
  id,
  value,
  onChange,
}: {
  id: string
  value: Statut
  onChange: (v: Statut) => void
}) {
  return (
    <RadioGroupField<Statut>
      id={id}
      label="Statut juridique"
      value={value}
      options={STATUTS}
      onChange={onChange}
      ariaLabelPrefix="Statut"
    />
  )
}

// ---------------------------------------------------------------------------
// Per-vertical form renderers
// ---------------------------------------------------------------------------

function DecennaleFields({
  ids,
  defaultMetier,
}: {
  ids: Record<string, string>
  defaultMetier?: string
}) {
  const f = useDecennaleForm(defaultMetier)
  const MAX_CA = 2_000_000
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField
          id={ids.metier!}
          label="Métier BTP"
          ariaLabel="Sélection du métier"
          value={f.metierValue}
          onChange={f.setMetierValue}
          options={METIERS_DECENNALE}
        />
        <SliderField
          id={ids.ca!}
          label="Chiffre d'affaires annuel"
          ariaLabel="Chiffre d'affaires annuel en euros"
          value={f.ca}
          min={5_000}
          max={MAX_CA}
          step={caStep(MAX_CA)}
          onChange={f.setCa}
          display={formatCaShort(f.ca)}
          ticks={caTicks(MAX_CA)}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
        <RadioGroupField<Anciennete>
          id={ids.anciennete!}
          label="Ancienneté entreprise"
          value={f.anciennete}
          options={[
            { value: 'creation', label: 'Création (<1 an)' },
            { value: '1-5ans', label: '1 à 5 ans' },
            { value: '5plus', label: 'Plus de 5 ans' },
          ]}
          onChange={f.setAnciennete}
        />
        <RadioGroupField<Sinistralite>
          id={ids.sinistralite!}
          label="Sinistralité 24 derniers mois"
          value={f.sinistralite}
          options={[
            { value: '0', label: '0 sinistre' },
            { value: '1', label: '1 sinistre' },
            { value: '2plus', label: '2 ou +' },
          ]}
          onChange={f.setSinistralite}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="Tarif décennale soumis à l'attestation Loi Spinetta (art. L. 241-1 C. assur.)."
      />
    </>
  )
}

function RcProFields({
  ids,
  defaultMetier,
}: {
  ids: Record<string, string>
  defaultMetier?: string
}) {
  const f = useRcProForm(defaultMetier)
  const MAX_CA = 2_000_000
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField
          id={ids.metier!}
          label="Profession"
          ariaLabel="Sélection du métier"
          value={f.metierValue}
          onChange={f.setMetierValue}
          options={METIERS_RC_PRO}
        />
        <SliderField
          id={ids.ca!}
          label="Chiffre d'affaires annuel"
          ariaLabel="Chiffre d'affaires annuel en euros"
          value={f.ca}
          min={5_000}
          max={MAX_CA}
          step={caStep(MAX_CA)}
          onChange={f.setCa}
          display={formatCaShort(f.ca)}
          ticks={caTicks(MAX_CA)}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
        <SliderField
          id={ids.effectif!}
          label="Effectif salariés"
          ariaLabel="Nombre de salariés"
          value={f.effectif}
          min={0}
          max={50}
          step={1}
          onChange={f.setEffectif}
          display={`${f.effectif} salarié${f.effectif > 1 ? 's' : ''}`}
          ticks={['0', '25', '50']}
        />
        <RadioGroupField<ActiviteRisque>
          id={ids.activite!}
          label="Type de mission"
          value={f.activite}
          options={[
            { value: 'standard', label: 'Standard' },
            { value: 'sensible', label: 'Sensible (finance — santé — juridique)' },
          ]}
          onChange={f.setActivite}
          cols={2}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="RC Pro obligatoire pour professions réglementées (art. L. 113-2 C. assur.)."
      />
    </>
  )
}

function MultirisqueFields({
  ids,
  defaultMetier,
}: {
  ids: Record<string, string>
  defaultMetier?: string
}) {
  const f = useMultirisqueForm(defaultMetier)
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField
          id={ids.metier!}
          label="Type de local"
          ariaLabel="Sélection du métier"
          value={f.metierValue}
          onChange={f.setMetierValue}
          options={METIERS_MULTIRISQUE}
        />
        <SliderField
          id={ids.surface!}
          label="Surface du local (m²)"
          ariaLabel="Surface du local en mètres carrés"
          value={f.surface}
          min={20}
          max={500}
          step={10}
          onChange={f.setSurface}
          display={`${f.surface} m²`}
          ticks={['20 m²', '250 m²', '500 m²']}
        />
        <SliderField
          id={ids.contenu!}
          label="Valeur du contenu (matériel + stock)"
          ariaLabel="Valeur du contenu en euros"
          value={f.contenu}
          min={5_000}
          max={5_000_000}
          step={50_000}
          onChange={f.setContenu}
          display={formatCaShort(f.contenu)}
          ticks={['5 k€', '2,5 M€', '5 M€']}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
      </div>
      <ResultBlock
        range={f.range}
        hint="Tarif multirisque pro indicatif — inclut vol, incendie, dégâts des eaux, perte d'exploitation."
      />
    </>
  )
}

function CyberFields({
  ids,
  defaultMetier,
}: {
  ids: Record<string, string>
  defaultMetier?: string
}) {
  const f = useCyberForm(defaultMetier)
  const MAX_CA = 10_000_000
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SelectField
          id={ids.metier!}
          label="Secteur d'activité"
          ariaLabel="Sélection du métier"
          value={f.metierValue}
          onChange={f.setMetierValue}
          options={METIERS_CYBER}
        />
        <SliderField
          id={ids.ca!}
          label="Chiffre d'affaires annuel"
          ariaLabel="Chiffre d'affaires annuel en euros"
          value={f.ca}
          min={5_000}
          max={MAX_CA}
          step={caStep(MAX_CA)}
          onChange={f.setCa}
          display={formatCaShort(f.ca)}
          ticks={caTicks(MAX_CA)}
        />
        <SliderField
          id={ids.effectif!}
          label="Effectif salariés"
          ariaLabel="Nombre de salariés"
          value={f.effectif}
          min={1}
          max={200}
          step={1}
          onChange={f.setEffectif}
          display={`${f.effectif} salarié${f.effectif > 1 ? 's' : ''}`}
          ticks={['1', '100', '200']}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
        <ToggleField
          id={ids.data!}
          label="Données sensibles (santé, finance, données bancaires)"
          hint="Active si vous traitez des PII sensibles soumises au RGPD renforcé."
          value={f.dataSensibles}
          onChange={f.setDataSensibles}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="Cyber-assurance — couverture ransomware, RGPD breach, perte d'exploitation IT."
      />
    </>
  )
}

function MutuelleFields({ ids }: { ids: Record<string, string> }) {
  const f = useMutuelleForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SliderField
          id={ids.age!}
          label="Âge du dirigeant assuré"
          ariaLabel="Âge en années"
          value={f.age}
          min={20}
          max={70}
          step={1}
          onChange={f.setAge}
          display={`${f.age} ans`}
          ticks={['20', '45', '70']}
        />
        <RadioGroupField<NiveauMutuelle>
          id={ids.niveau!}
          label="Niveau de couverture"
          value={f.niveau}
          options={[
            { value: 'eco', label: 'Éco (100 %)' },
            { value: 'median', label: 'Médian (200 %)' },
            { value: 'premium', label: 'Premium (300 %+)' },
          ]}
          onChange={f.setNiveau}
        />
        <RadioGroupField<'0' | '1' | '2' | '3plus'>
          id={ids.ayants!}
          label="Ayants droit (conjoint + enfants)"
          value={f.ayantsDroit}
          options={[
            { value: '0', label: '0' },
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3plus', label: '3 ou +' },
          ]}
          onChange={f.setAyantsDroit}
          cols={4}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
      </div>
      <ResultBlock
        range={f.range}
        hint="Mutuelle TNS — déductible fiscalement (Loi Madelin, art. 154 bis CGI)."
      />
    </>
  )
}

function VtcFields({ ids }: { ids: Record<string, string> }) {
  const f = useVtcForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <RadioGroupField<ZoneVtc>
          id={ids.zone!}
          label="Zone d'exploitation"
          value={f.zone}
          options={[
            { value: 'paris', label: 'Paris intra-muros' },
            { value: 'idf', label: 'Île-de-France' },
            { value: 'grande-ville', label: 'Grande ville (>200k hab.)' },
            { value: 'regions', label: 'Régions' },
          ]}
          onChange={f.setZone}
          cols={4}
        />
        <SliderField
          id={ids.permis!}
          label="Ancienneté permis B (années)"
          ariaLabel="Ancienneté du permis B en années"
          value={f.permis}
          min={2}
          max={40}
          step={1}
          onChange={f.setPermis}
          display={`${f.permis} an${f.permis > 1 ? 's' : ''}`}
          ticks={['2', '20', '40']}
        />
        <RadioGroupField<Vehicule>
          id={ids.vehicule!}
          label="Catégorie véhicule"
          value={f.vehicule}
          options={[
            { value: 'standard', label: 'Standard (berline)' },
            { value: 'premium', label: 'Premium — luxe' },
            { value: 'van', label: 'Van — 6+ places' },
          ]}
          onChange={f.setVehicule}
        />
        <RadioGroupField<Plateforme>
          id={ids.plateforme!}
          label="Mode d'exploitation"
          value={f.plateforme}
          options={[
            { value: 'uber-bolt', label: 'VTC plateformes (Uber — Bolt)' },
            { value: 'taxi', label: 'Taxi traditionnel (licence ADS)' },
          ]}
          onChange={f.setPlateforme}
          cols={2}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
      </div>
      <ResultBlock
        range={f.range}
        hint="Assurance VTC — taxi — usage transport public de personnes (art. R. 211-3 C. assur.)."
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// ---- FLOTTE AUTO -----------------------------------------------------------
// ---------------------------------------------------------------------------

type FlotteType = 'berline' | 'utilitaire' | 'mixte' | 'pl'
type BonusMalus = 'bonus' | 'reference' | 'malus'

// Flotte par véhicule — Verspieren / Argus Assurance 2026
const FLOTTE_BASE_PER_VEHICULE: Record<FlotteType, number> = {
  berline: 720,
  utilitaire: 780,
  mixte: 820,
  pl: 3200,
}
const BONUS_MALUS_MOD: Record<BonusMalus, number> = {
  bonus: 0.78,
  reference: 1.0,
  malus: 1.38,
}

/**
 * Remise flotte — sous-linéaire log10 calibrée marché courtage flotte 2026.
 * @1=0.96, @10=0.88, @50=0.79, @100=0.76 (marché annonce -15 à -25% à partir 30 véh).
 * Coeff 0.12 (vs 0.07 ancien trop conservateur).
 */
function nbVehiculesDiscount(n: number): number {
  return Math.max(0.65, 1 - 0.12 * Math.log10(Math.max(n, 1) + 1))
}

function useFlotteForm() {
  const [nbVehicules, setNbVehicules] = useState<number>(3)
  const [typeVehicule, setTypeVehicule] = useState<FlotteType>('utilitaire')
  const [bonus, setBonus] = useState<BonusMalus>('reference')

  const range = useMemo<Range>(() => {
    const perVeh = FLOTTE_BASE_PER_VEHICULE[typeVehicule]
    const mid = perVeh * nbVehicules * nbVehiculesDiscount(nbVehicules) * BONUS_MALUS_MOD[bonus]
    return spreadRange(mid, 0.28)
  }, [nbVehicules, typeVehicule, bonus])

  return {
    nbVehicules,
    setNbVehicules,
    typeVehicule,
    setTypeVehicule,
    bonus,
    setBonus,
    range,
  }
}

function FlotteFields({ ids }: { ids: Record<string, string> }) {
  const f = useFlotteForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SliderField
          id={ids.nbVehicules!}
          label="Nombre de véhicules"
          ariaLabel="Nombre de véhicules dans la flotte"
          value={f.nbVehicules}
          min={1}
          max={150}
          step={1}
          onChange={f.setNbVehicules}
          display={`${f.nbVehicules} véhicule${f.nbVehicules > 1 ? 's' : ''}`}
          ticks={['1', '75', '150+']}
        />
        <RadioGroupField<FlotteType>
          id={ids.typeVehicule!}
          label="Type de véhicules"
          value={f.typeVehicule}
          options={[
            { value: 'berline', label: 'Berlines — VP' },
            { value: 'utilitaire', label: 'Utilitaires (VUL)' },
            { value: 'mixte', label: 'Mixte VP ou VUL' },
            { value: 'pl', label: 'Poids lourds (>3,5 t)' },
          ]}
          onChange={f.setTypeVehicule}
          cols={4}
        />
        <RadioGroupField<BonusMalus>
          id={ids.bonus!}
          label="Bonus-malus moyen flotte"
          value={f.bonus}
          options={[
            { value: 'bonus', label: 'Bonus (< 0,80)' },
            { value: 'reference', label: 'Référence (1,00)' },
            { value: 'malus', label: 'Malus (> 1,20)' },
          ]}
          onChange={f.setBonus}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="Flotte auto pro — usage professionnel obligatoire (art. L. 211-1 C. assur.)."
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// ---- DOMMAGES-OUVRAGE ------------------------------------------------------
// ---------------------------------------------------------------------------

type TypeOuvrage = 'maison-neuve' | 'extension' | 'renovation-lourde' | 'collectif'
type Maitrise = 'particulier' | 'maitre-oeuvre' | 'architecte'

const OUVRAGE_FACTOR: Record<TypeOuvrage, number> = {
  'maison-neuve': 0.034, // % du coût travaux
  extension: 0.029,
  'renovation-lourde': 0.041,
  collectif: 0.048,
}
const MAITRISE_MOD: Record<Maitrise, number> = {
  particulier: 1.15,
  'maitre-oeuvre': 1.0,
  architecte: 0.92,
}

function useDoForm() {
  const [coutTravaux, setCoutTravaux] = useState<number>(180_000)
  const [typeOuvrage, setTypeOuvrage] = useState<TypeOuvrage>('maison-neuve')
  const [maitrise, setMaitrise] = useState<Maitrise>('maitre-oeuvre')

  const range = useMemo<Range>(() => {
    const mid = coutTravaux * OUVRAGE_FACTOR[typeOuvrage] * MAITRISE_MOD[maitrise]
    return spreadRange(mid, 0.22)
  }, [coutTravaux, typeOuvrage, maitrise])

  return {
    coutTravaux,
    setCoutTravaux,
    typeOuvrage,
    setTypeOuvrage,
    maitrise,
    setMaitrise,
    range,
  }
}

function DoFields({ ids }: { ids: Record<string, string> }) {
  const f = useDoForm()
  const MAX = 3_000_000
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SliderField
          id={ids.cout!}
          label="Coût total des travaux TTC"
          ariaLabel="Coût total des travaux en euros"
          value={f.coutTravaux}
          min={50_000}
          max={MAX}
          step={caStep(MAX)}
          onChange={f.setCoutTravaux}
          display={formatCaShort(f.coutTravaux)}
          ticks={['50 k€', '1,5 M€', '3 M€']}
        />
        <RadioGroupField<TypeOuvrage>
          id={ids.typeOuvrage!}
          label="Type d'ouvrage"
          value={f.typeOuvrage}
          options={[
            { value: 'maison-neuve', label: 'Maison neuve' },
            { value: 'extension', label: 'Extension — surélévation' },
            { value: 'renovation-lourde', label: 'Rénovation lourde' },
            { value: 'collectif', label: 'Immeuble collectif' },
          ]}
          onChange={f.setTypeOuvrage}
          cols={4}
        />
        <RadioGroupField<Maitrise>
          id={ids.maitrise!}
          label="Maîtrise d'ouvrage"
          value={f.maitrise}
          options={[
            { value: 'particulier', label: 'Particulier (auto-construction)' },
            { value: 'maitre-oeuvre', label: 'Maître d’œuvre' },
            { value: 'architecte', label: 'Architecte DPLG' },
          ]}
          onChange={f.setMaitrise}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="DO obligatoire avant ouverture chantier — Loi Spinetta art. L. 242-1 C. assur."
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// ---- TOUS RISQUES CHANTIER -------------------------------------------------
// ---------------------------------------------------------------------------

type ComplexiteChantier = 'standard' | 'technique' | 'tres-technique'

const COMPLEXITE_MOD: Record<ComplexiteChantier, number> = {
  standard: 1.0,
  technique: 1.25,
  'tres-technique': 1.55,
}

function dureeChantierMod(mois: number): number {
  // 6 mois = 1.0, 12 = 1.35, 24 = 1.75, 36+ = 2.0
  return 0.6 + 0.4 * Math.pow(Math.max(mois, 1) / 6, 0.6)
}

function useTrcForm() {
  const [coutChantier, setCoutChantier] = useState<number>(500_000)
  const [duree, setDuree] = useState<number>(12)
  const [complexite, setComplexite] = useState<ComplexiteChantier>('standard')

  const range = useMemo<Range>(() => {
    // Base TRC 0,20% coût chantier × durée × complexité
    // Calibré marché 2026 (assurance-btp.net 0.15-0.30%, SMABTP TRC, Verspieren)
    // Ancien 0.4% sur-cotait +60-150% vs marché
    const mid = coutChantier * 0.002 * dureeChantierMod(duree) * COMPLEXITE_MOD[complexite]
    return spreadRange(mid, 0.28)
  }, [coutChantier, duree, complexite])

  return {
    coutChantier,
    setCoutChantier,
    duree,
    setDuree,
    complexite,
    setComplexite,
    range,
  }
}

function TrcFields({ ids }: { ids: Record<string, string> }) {
  const f = useTrcForm()
  const MAX = 10_000_000
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SliderField
          id={ids.coutChantier!}
          label="Coût total du chantier TTC"
          ariaLabel="Coût total du chantier en euros"
          value={f.coutChantier}
          min={50_000}
          max={MAX}
          step={caStep(MAX)}
          onChange={f.setCoutChantier}
          display={formatCaShort(f.coutChantier)}
          ticks={['50 k€', '5 M€', '10 M€']}
        />
        <SliderField
          id={ids.duree!}
          label="Durée du chantier (mois)"
          ariaLabel="Durée du chantier en mois"
          value={f.duree}
          min={1}
          max={48}
          step={1}
          onChange={f.setDuree}
          display={`${f.duree} mois`}
          ticks={['1', '24', '48']}
        />
        <RadioGroupField<ComplexiteChantier>
          id={ids.complexite!}
          label="Complexité technique"
          value={f.complexite}
          options={[
            { value: 'standard', label: 'Standard' },
            { value: 'technique', label: 'Technique (charpente — VRD)' },
            { value: 'tres-technique', label: 'Très technique (ouvrage d’art)' },
          ]}
          onChange={f.setComplexite}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="TRC — couvre dommages matériels durant exécution (effondrement, incendie, vol)."
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// ---- TRANSPORT MARCHANDISES ------------------------------------------------
// ---------------------------------------------------------------------------

type TypeMarchandises = 'standard' | 'refrigeree' | 'fragile-electro' | 'matiere-dangereuse'
type ZoneTransport = 'national' | 'europe' | 'international'

const MARCH_BASE_PER_VEH: Record<TypeMarchandises, number> = {
  standard: 1200,
  refrigeree: 1850,
  'fragile-electro': 2100,
  'matiere-dangereuse': 4000,
}
const ZONE_TRANSPORT_MOD: Record<ZoneTransport, number> = {
  national: 1.0,
  europe: 1.28,
  international: 1.65,
}

function valeurConvoiMod(eur: number): number {
  // 10k = 1.0, 50k = 1.4, 200k = 2.1
  return 0.7 + 0.3 * Math.pow(Math.max(eur, 5_000) / 10_000, 0.5)
}

function useTransportForm() {
  const [nbVehicules, setNbVehicules] = useState<number>(2)
  const [typeMarch, setTypeMarch] = useState<TypeMarchandises>('standard')
  const [zone, setZone] = useState<ZoneTransport>('national')
  const [valeurConvoi, setValeurConvoi] = useState<number>(25_000)

  const range = useMemo<Range>(() => {
    const mid =
      MARCH_BASE_PER_VEH[typeMarch] *
      nbVehicules *
      nbVehiculesDiscount(nbVehicules) *
      ZONE_TRANSPORT_MOD[zone] *
      valeurConvoiMod(valeurConvoi)
    return spreadRange(mid, 0.3)
  }, [nbVehicules, typeMarch, zone, valeurConvoi])

  return {
    nbVehicules,
    setNbVehicules,
    typeMarch,
    setTypeMarch,
    zone,
    setZone,
    valeurConvoi,
    setValeurConvoi,
    range,
  }
}

function TransportFields({ ids }: { ids: Record<string, string> }) {
  const f = useTransportForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SliderField
          id={ids.nbVehicules!}
          label="Nombre de véhicules"
          ariaLabel="Nombre de véhicules transport"
          value={f.nbVehicules}
          min={1}
          max={100}
          step={1}
          onChange={f.setNbVehicules}
          display={`${f.nbVehicules} véhicule${f.nbVehicules > 1 ? 's' : ''}`}
          ticks={['1', '50', '100']}
        />
        <SliderField
          id={ids.valeurConvoi!}
          label="Valeur moyenne par convoi"
          ariaLabel="Valeur moyenne du convoi en euros"
          value={f.valeurConvoi}
          min={5_000}
          max={500_000}
          step={5_000}
          onChange={f.setValeurConvoi}
          display={formatCaShort(f.valeurConvoi)}
          ticks={['5 k€', '250 k€', '500 k€+']}
        />
        <RadioGroupField<TypeMarchandises>
          id={ids.typeMarch!}
          label="Type de marchandises"
          value={f.typeMarch}
          options={[
            { value: 'standard', label: 'Standard — palettisé' },
            { value: 'refrigeree', label: 'Réfrigérée — sous T°' },
            { value: 'fragile-electro', label: 'Fragile — électronique' },
            { value: 'matiere-dangereuse', label: 'Matières dangereuses (ADR)' },
          ]}
          onChange={f.setTypeMarch}
          cols={4}
        />
        <RadioGroupField<ZoneTransport>
          id={ids.zone!}
          label="Zone géographique"
          value={f.zone}
          options={[
            { value: 'national', label: 'France' },
            { value: 'europe', label: 'Europe' },
            { value: 'international', label: 'International' },
          ]}
          onChange={f.setZone}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="Police marchandises transportées — clauses CMR (art. 17 Convention CMR)."
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// ---- MOTO PRO --------------------------------------------------------------
// ---------------------------------------------------------------------------

type UsageMoto = 'livraison' | 'coursier' | 'location' | 'demo-revente'
type Cylindree = 'moins-125' | '125-500' | '500-1000' | 'plus-1000'

const MOTO_BASE: Record<Cylindree, number> = {
  'moins-125': 580,
  '125-500': 920,
  '500-1000': 1380,
  'plus-1000': 1850,
}
// Calibré APRIL Moto/Mutuelle Motards 2026 — livraison Uber/Deliveroo risque max
const USAGE_MOTO_MOD: Record<UsageMoto, number> = {
  livraison: 1.55,
  coursier: 1.7,
  location: 1.45,
  'demo-revente': 1.1,
}

function useMotoProForm() {
  const [cylindree, setCylindree] = useState<Cylindree>('125-500')
  const [usage, setUsage] = useState<UsageMoto>('livraison')
  const [permis, setPermis] = useState<number>(6)
  const [zone, setZone] = useState<ZoneVtc>('grande-ville')

  const range = useMemo<Range>(() => {
    const mid =
      (MOTO_BASE[cylindree] *
        USAGE_MOTO_MOD[usage] *
        permisMultiplier(permis) *
        // Réutilise ZONE_BASE comme proxy zone-risque (Paris+50%, IDF+25%, etc.)
        ZONE_BASE[zone]) /
      ZONE_BASE['grande-ville']
    return spreadRange(mid, 0.28)
  }, [cylindree, usage, permis, zone])

  return { cylindree, setCylindree, usage, setUsage, permis, setPermis, zone, setZone, range }
}

function MotoProFields({ ids }: { ids: Record<string, string> }) {
  const f = useMotoProForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <RadioGroupField<Cylindree>
          id={ids.cylindree!}
          label="Cylindrée"
          value={f.cylindree}
          options={[
            { value: 'moins-125', label: '< 125 cm³' },
            { value: '125-500', label: '125 — 500 cm³' },
            { value: '500-1000', label: '500 — 1000 cm³' },
            { value: 'plus-1000', label: '> 1000 cm³' },
          ]}
          onChange={f.setCylindree}
          cols={4}
        />
        <RadioGroupField<UsageMoto>
          id={ids.usage!}
          label="Usage professionnel"
          value={f.usage}
          options={[
            { value: 'livraison', label: 'Livraison repas — colis' },
            { value: 'coursier', label: 'Coursier urbain' },
            { value: 'location', label: 'Location à des tiers' },
            { value: 'demo-revente', label: 'Démo — revente' },
          ]}
          onChange={f.setUsage}
          cols={4}
        />
        <SliderField
          id={ids.permis!}
          label="Ancienneté permis (années)"
          ariaLabel="Ancienneté du permis A en années"
          value={f.permis}
          min={2}
          max={40}
          step={1}
          onChange={f.setPermis}
          display={`${f.permis} an${f.permis > 1 ? 's' : ''}`}
          ticks={['2', '20', '40']}
        />
        <RadioGroupField<ZoneVtc>
          id={ids.zone!}
          label="Zone d'exploitation"
          value={f.zone}
          options={[
            { value: 'paris', label: 'Paris intra-muros' },
            { value: 'idf', label: 'Île-de-France' },
            { value: 'grande-ville', label: 'Grande ville' },
            { value: 'regions', label: 'Régions' },
          ]}
          onChange={f.setZone}
          cols={4}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="Moto pro — usage à titre onéreux (livraison, coursier). Garantie RC + dommages obligatoires."
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// ---- PRÉVOYANCE TNS --------------------------------------------------------
// ---------------------------------------------------------------------------

type NiveauPrevoyance = 'ij' | 'ij-invalidite' | 'ij-inval-deces'

const PREV_NIVEAU_MOD: Record<NiveauPrevoyance, number> = {
  ij: 1.0,
  'ij-invalidite': 1.65,
  'ij-inval-deces': 2.2,
}

function usePrevoyanceForm() {
  const [revenuMensuel, setRevenuMensuel] = useState<number>(4_000)
  const [age, setAge] = useState<number>(40)
  const [niveau, setNiveau] = useState<NiveauPrevoyance>('ij-invalidite')
  const [statut, setStatut] = useState<Statut>('sarl')

  const range = useMemo<Range>(() => {
    // Base ~2,5% du revenu annuel pour IJ base
    const baseAnnuel = revenuMensuel * 12 * 0.025
    const mid = baseAnnuel * ageMultiplier(age) * PREV_NIVEAU_MOD[niveau] * STATUT_MODIFIER[statut]
    return spreadRange(mid, 0.24)
  }, [revenuMensuel, age, niveau, statut])

  return {
    revenuMensuel,
    setRevenuMensuel,
    age,
    setAge,
    niveau,
    setNiveau,
    statut,
    setStatut,
    range,
  }
}

function PrevoyanceFields({ ids }: { ids: Record<string, string> }) {
  const f = usePrevoyanceForm()
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SliderField
          id={ids.revenu!}
          label="Revenu mensuel net à protéger"
          ariaLabel="Revenu mensuel en euros"
          value={f.revenuMensuel}
          min={1_500}
          max={20_000}
          step={250}
          onChange={f.setRevenuMensuel}
          display={`${f.revenuMensuel.toLocaleString('fr-FR')} €`}
          ticks={['1,5 k€', '10 k€', '20 k€+']}
        />
        <SliderField
          id={ids.age!}
          label="Âge du dirigeant"
          ariaLabel="Âge en années"
          value={f.age}
          min={20}
          max={70}
          step={1}
          onChange={f.setAge}
          display={`${f.age} ans`}
          ticks={['20', '45', '70']}
        />
        <RadioGroupField<NiveauPrevoyance>
          id={ids.niveau!}
          label="Niveau de couverture"
          value={f.niveau}
          options={[
            { value: 'ij', label: 'IJ seules' },
            { value: 'ij-invalidite', label: 'IJ + Invalidité' },
            { value: 'ij-inval-deces', label: 'IJ + Inval. + Décès' },
          ]}
          onChange={f.setNiveau}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
      </div>
      <ResultBlock
        range={f.range}
        hint="Prévoyance TNS — déductible Loi Madelin (art. 154 bis CGI)."
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// ---- PROTECTION JURIDIQUE PRO ----------------------------------------------
// ---------------------------------------------------------------------------

type SecteurPJ = 'commerce-services' | 'btp' | 'sante' | 'professions-libe'

// Hiérarchie sinistralité Allianz/AXA PJ 2026: commerce < santé < prof-libé < btp
const PJ_BASE: Record<SecteurPJ, number> = {
  'commerce-services': 240,
  btp: 380,
  sante: 290,
  'professions-libe': 320,
}

type LitigesPj = '0' | '1-2' | '3plus'
const LITIGES_PJ_MOD: Record<LitigesPj, number> = {
  '0': 1.0,
  '1-2': 1.25,
  '3plus': 1.6,
}

function usePjForm() {
  const [secteur, setSecteur] = useState<SecteurPJ>('commerce-services')
  const [ca, setCa] = useState<number>(150_000)
  const [litiges, setLitiges] = useState<LitigesPj>('0')
  const [statut, setStatut] = useState<Statut>('sarl')

  const range = useMemo<Range>(() => {
    const mid =
      PJ_BASE[secteur] * caMultiplier(ca) * LITIGES_PJ_MOD[litiges] * STATUT_MODIFIER[statut]
    return spreadRange(mid, 0.28)
  }, [secteur, ca, litiges, statut])

  return { secteur, setSecteur, ca, setCa, litiges, setLitiges, statut, setStatut, range }
}

function PjFields({ ids }: { ids: Record<string, string> }) {
  const f = usePjForm()
  const MAX_CA = 5_000_000
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <RadioGroupField<SecteurPJ>
          id={ids.secteur!}
          label="Secteur d'activité"
          value={f.secteur}
          options={[
            { value: 'commerce-services', label: 'Commerce — services' },
            { value: 'btp', label: 'BTP — artisanat' },
            { value: 'sante', label: 'Santé — paramédical' },
            { value: 'professions-libe', label: 'Professions libérales' },
          ]}
          onChange={f.setSecteur}
          cols={4}
        />
        <SliderField
          id={ids.ca!}
          label="Chiffre d'affaires annuel"
          ariaLabel="Chiffre d'affaires annuel en euros"
          value={f.ca}
          min={5_000}
          max={MAX_CA}
          step={caStep(MAX_CA)}
          onChange={f.setCa}
          display={formatCaShort(f.ca)}
          ticks={caTicks(MAX_CA)}
        />
        <RadioGroupField<LitigesPj>
          id={ids.litiges!}
          label="Litiges 24 derniers mois"
          value={f.litiges}
          options={[
            { value: '0', label: '0 litige' },
            { value: '1-2', label: '1 à 2 litiges' },
            { value: '3plus', label: '3 ou plus' },
          ]}
          onChange={f.setLitiges}
        />
        <StatutField id={ids.statut!} value={f.statut} onChange={f.setStatut} />
      </div>
      <ResultBlock
        range={f.range}
        hint="Protection juridique pro — prise en charge frais d'avocat, expertise, médiation."
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// ---- HOMME-CLÉ -------------------------------------------------------------
// ---------------------------------------------------------------------------

type SecteurHc = 'tech-saas' | 'services-conseil' | 'industrie' | 'commerce-distrib'

const HC_FACTOR_PER_100K: Record<SecteurHc, number> = {
  'tech-saas': 0.45, // % du capital assuré par tranche 100k€
  'services-conseil': 0.38,
  industrie: 0.35,
  'commerce-distrib': 0.32,
}

function useHcForm() {
  const [ca, setCa] = useState<number>(500_000)
  const [capital, setCapital] = useState<number>(500_000)
  const [nbDirigeants, setNbDirigeants] = useState<number>(1)
  const [secteur, setSecteur] = useState<SecteurHc>('services-conseil')

  const range = useMemo<Range>(() => {
    // Base = capital × factor × nbDirigeants × caMul × coeff calibrage
    // Coeff 1.8 (vs 0.7 ancien) — calibré Verspieren/Albingia/MetLife 2026
    // Cible: 500k cap × services-conseil × 40y = ~650€/an (marché 600-1200)
    const mid =
      (capital / 100_000) *
      HC_FACTOR_PER_100K[secteur] *
      100 *
      nbDirigeants *
      caMultiplier(ca) *
      1.8
    return spreadRange(mid, 0.28)
  }, [ca, capital, nbDirigeants, secteur])

  return {
    ca,
    setCa,
    capital,
    setCapital,
    nbDirigeants,
    setNbDirigeants,
    secteur,
    setSecteur,
    range,
  }
}

function HcFields({ ids }: { ids: Record<string, string> }) {
  const f = useHcForm()
  const MAX_CA = 10_000_000
  const MAX_CAP = 5_000_000
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <SliderField
          id={ids.capital!}
          label="Capital assuré par homme-clé"
          ariaLabel="Capital assuré en euros"
          value={f.capital}
          min={100_000}
          max={MAX_CAP}
          step={caStep(MAX_CAP)}
          onChange={f.setCapital}
          display={formatCaShort(f.capital)}
          ticks={['100 k€', '2,5 M€', '5 M€']}
        />
        <SliderField
          id={ids.ca!}
          label="Chiffre d'affaires entreprise"
          ariaLabel="Chiffre d'affaires annuel entreprise en euros"
          value={f.ca}
          min={5_000}
          max={MAX_CA}
          step={caStep(MAX_CA)}
          onChange={f.setCa}
          display={formatCaShort(f.ca)}
          ticks={caTicks(MAX_CA)}
        />
        <SliderField
          id={ids.nbDirigeants!}
          label="Nombre d'hommes-clés à couvrir"
          ariaLabel="Nombre d'hommes-clés"
          value={f.nbDirigeants}
          min={1}
          max={5}
          step={1}
          onChange={f.setNbDirigeants}
          display={`${f.nbDirigeants} personne${f.nbDirigeants > 1 ? 's' : ''}`}
          ticks={['1', '3', '5']}
        />
        <RadioGroupField<SecteurHc>
          id={ids.secteurHc!}
          label="Secteur d'activité"
          value={f.secteur}
          options={[
            { value: 'tech-saas', label: 'Tech — SaaS' },
            { value: 'services-conseil', label: 'Services — conseil' },
            { value: 'industrie', label: 'Industrie' },
            { value: 'commerce-distrib', label: 'Commerce — distribution' },
          ]}
          onChange={f.setSecteur}
          cols={4}
        />
      </div>
      <ResultBlock
        range={f.range}
        hint="Homme-clé — indemnise pertes d'exploitation suite à disparition — incapacité du dirigeant."
      />
    </>
  )
}

// ---------------------------------------------------------------------------
// Result block (shared)
// ---------------------------------------------------------------------------

function ResultBlock({ range, hint }: { range: Range; hint: string }) {
  return (
    <div
      aria-live="polite"
      className="mt-8 rounded-xl border border-sand-200 bg-gradient-to-br from-sand-50 to-white p-5 md:p-6"
    >
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-charcoal-500">
        Fourchette indicative
      </p>
      <p
        className="font-display text-3xl font-medium tabular-nums leading-tight text-charcoal-900 md:text-4xl"
        style={{ fontFamily: 'var(--font-heading), Fraunces, serif', fontWeight: 500 }}
      >
        {formatEuros(range.min)}
        <span className="mx-2 text-charcoal-500">→</span>
        {formatEuros(range.max)}
        <span className="font-body ml-1 align-baseline text-base font-normal text-charcoal-600">
          par an
        </span>
      </p>
      <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-charcoal-600">
        <TrendingDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" aria-hidden />
        <span>
          {hint} Fourchette indicative ±15&nbsp;% calibrée marché courtage FR&nbsp;2026
          (sources&nbsp;: AQC SYCODÉS, MACSF, Coover, Hiscox, Verspieren, UNOCAM). Tarif définitif
          après étude dossier complète (sinistralité, ancienneté, garanties spécifiques).
        </span>
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/devis"
          aria-label="Obtenir un devis exact sous 24 heures"
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2"
        >
          Devis exact en 24h
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
        <span className="text-xs text-charcoal-500">Sans engagement · réponse 24h ouvrées</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Root component
// ---------------------------------------------------------------------------

export function TarifCalculator({ garantie, className = '', defaultMetier }: TarifCalculatorProps) {
  const reactId = useId()
  const ids = useMemo(
    () => ({
      metier: `${reactId}-metier`,
      ca: `${reactId}-ca`,
      statut: `${reactId}-statut`,
      anciennete: `${reactId}-anciennete`,
      sinistralite: `${reactId}-sinistralite`,
      activite: `${reactId}-activite`,
      effectif: `${reactId}-effectif`,
      surface: `${reactId}-surface`,
      contenu: `${reactId}-contenu`,
      data: `${reactId}-data`,
      age: `${reactId}-age`,
      niveau: `${reactId}-niveau`,
      ayants: `${reactId}-ayants`,
      zone: `${reactId}-zone`,
      permis: `${reactId}-permis`,
      vehicule: `${reactId}-vehicule`,
      plateforme: `${reactId}-plateforme`,
      nbVehicules: `${reactId}-nbVehicules`,
      typeVehicule: `${reactId}-typeVehicule`,
      bonus: `${reactId}-bonus`,
      cout: `${reactId}-cout`,
      typeOuvrage: `${reactId}-typeOuvrage`,
      maitrise: `${reactId}-maitrise`,
      coutChantier: `${reactId}-coutChantier`,
      duree: `${reactId}-duree`,
      complexite: `${reactId}-complexite`,
      typeMarch: `${reactId}-typeMarch`,
      valeurConvoi: `${reactId}-valeurConvoi`,
      cylindree: `${reactId}-cylindree`,
      usage: `${reactId}-usage`,
      revenu: `${reactId}-revenu`,
      secteur: `${reactId}-secteur`,
      litiges: `${reactId}-litiges`,
      capital: `${reactId}-capital`,
      nbDirigeants: `${reactId}-nbDirigeants`,
      secteurHc: `${reactId}-secteurHc`,
    }),
    [reactId]
  )

  return (
    <RevealOnScroll className={className}>
      <section
        aria-labelledby={`${reactId}-title`}
        className="rounded-2xl border border-sand-300 bg-white p-8 shadow-md md:p-10"
      >
        <header className="mb-6 flex items-start gap-3">
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600"
          >
            <Calculator className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-charcoal-500">
              Estimateur tarifaire
            </p>
            <h3
              id={`${reactId}-title`}
              className="font-heading text-xl font-semibold leading-tight text-charcoal-900 md:text-2xl"
            >
              {GARANTIE_LABELS[garantie]} — votre fourchette annuelle
            </h3>
          </div>
        </header>

        {garantie === 'decennale' && <DecennaleFields ids={ids} defaultMetier={defaultMetier} />}
        {garantie === 'rc-pro' && <RcProFields ids={ids} defaultMetier={defaultMetier} />}
        {garantie === 'multirisque-pro' && (
          <MultirisqueFields ids={ids} defaultMetier={defaultMetier} />
        )}
        {garantie === 'cyber' && <CyberFields ids={ids} defaultMetier={defaultMetier} />}
        {garantie === 'mutuelle-pro' && <MutuelleFields ids={ids} />}
        {garantie === 'vtc' && <VtcFields ids={ids} />}
        {garantie === 'flotte-auto' && <FlotteFields ids={ids} />}
        {garantie === 'dommages-ouvrage' && <DoFields ids={ids} />}
        {garantie === 'tous-risques-chantier' && <TrcFields ids={ids} />}
        {garantie === 'transport-marchandises' && <TransportFields ids={ids} />}
        {garantie === 'moto-pro' && <MotoProFields ids={ids} />}
        {garantie === 'prevoyance' && <PrevoyanceFields ids={ids} />}
        {garantie === 'protection-juridique' && <PjFields ids={ids} />}
        {garantie === 'homme-cle' && <HcFields ids={ids} />}
      </section>
    </RevealOnScroll>
  )
}
