'use client'

/**
 * Composant PDF — Attestation décennale modèle TYPE
 *
 * AVERTISSEMENT JURIDIQUE : ce PDF est un MODÈLE TYPE éducatif. Il NE constitue
 * PAS une attestation valable juridiquement (seul un assureur peut émettre une
 * attestation décennale opposable). Le mention « MODÈLE TYPE — DOCUMENT NON
 * CONTRACTUEL » est apposée en filigrane visible.
 *
 * Conforme à l'arrêté du 23 janvier 2024 (mentions obligatoires) pour servir de
 * référence à l'utilisateur qui veut vérifier la conformité de son attestation
 * réelle reçue de son assureur.
 */

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica', position: 'relative' },
  watermark: {
    position: 'absolute',
    top: 350,
    left: 80,
    fontSize: 60,
    color: '#fee2e2',
    opacity: 0.5,
    transform: 'rotate(-20deg)',
  },
  header: { borderBottom: '2px solid #1e40af', paddingBottom: 10, marginBottom: 16 },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: { fontSize: 9, textAlign: 'center', color: '#6b7280' },
  section: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    backgroundColor: '#f3f4f6',
    padding: 4,
    marginBottom: 4,
  },
  row: { flexDirection: 'row', marginBottom: 3 },
  label: { width: '40%', fontWeight: 'bold' },
  value: { width: '60%' },
  legalRef: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#fef3c7',
    fontSize: 8,
    border: '1px solid #f59e0b',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    textAlign: 'center',
    color: '#6b7280',
    borderTop: '1px solid #e5e7eb',
    paddingTop: 8,
  },
})

export interface AttestationData {
  // Assuré
  raisonSociale: string
  formeJuridique: string
  siret: string
  adresse: string
  // Activité
  metiers: string
  zoneGeographique: string
  // Période (à remplir par l'utilisateur, modèle type)
  dateDebut: string
  dateFin: string
  // Plafond
  plafondGarantie: string
}

export function AttestationDecennalePDF({ data }: { data: AttestationData }) {
  const dateEmission = new Date().toLocaleDateString('fr-FR')

  return (
    <Document
      title="Modèle attestation décennale — Assurance Pro"
      author="Assurance Pro (modèle type)"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>MODÈLE TYPE</Text>

        <View style={styles.header}>
          <Text style={styles.title}>ATTESTATION D&apos;ASSURANCE DÉCENNALE</Text>
          <Text style={styles.subtitle}>
            Modèle conforme à l&apos;arrêté du 23 janvier 2024 — Loi Spinetta art. L. 241-1 C.
            assur.
          </Text>
        </View>

        {/* 1. Assureur (placeholder — à remplir par l'assureur réel) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Identification de l&apos;assureur</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Raison sociale :</Text>
            <Text style={styles.value}>[À compléter par l&apos;assureur]</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>SIREN :</Text>
            <Text style={styles.value}>[N° SIREN assureur]</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>N° agrément ACPR :</Text>
            <Text style={styles.value}>[N° agrément]</Text>
          </View>
        </View>

        {/* 2. Assuré (rempli par utilisateur) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Identification de l&apos;assuré</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Raison sociale :</Text>
            <Text style={styles.value}>{data.raisonSociale}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Forme juridique :</Text>
            <Text style={styles.value}>{data.formeJuridique}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>SIRET :</Text>
            <Text style={styles.value}>{data.siret}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Adresse :</Text>
            <Text style={styles.value}>{data.adresse}</Text>
          </View>
        </View>

        {/* 3. Police d'assurance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Contrat d&apos;assurance</Text>
          <View style={styles.row}>
            <Text style={styles.label}>N° de police :</Text>
            <Text style={styles.value}>[Numéro de police — à remplir par assureur]</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date d&apos;émission :</Text>
            <Text style={styles.value}>{dateEmission}</Text>
          </View>
        </View>

        {/* 4. Période de validité */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Période de validité</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Date de début :</Text>
            <Text style={styles.value}>{data.dateDebut}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date de fin :</Text>
            <Text style={styles.value}>{data.dateFin}</Text>
          </View>
        </View>

        {/* 5. Activités couvertes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Activités professionnelles couvertes</Text>
          <Text style={styles.value}>{data.metiers}</Text>
        </View>

        {/* 6. Zone géographique */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Zone géographique de couverture</Text>
          <Text style={styles.value}>{data.zoneGeographique}</Text>
        </View>

        {/* 7. Garanties + plafond */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Garanties souscrites</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Garantie décennale :</Text>
            <Text style={styles.value}>Plafond : {data.plafondGarantie}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Loi applicable :</Text>
            <Text style={styles.value}>
              Loi Spinetta du 4 janvier 1978 (art. L. 241-1 C. assur.)
            </Text>
          </View>
        </View>

        {/* 8. Mentions légales obligatoires */}
        <View style={styles.legalRef}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
            ⚠️ AVERTISSEMENT — MODÈLE TYPE NON CONTRACTUEL
          </Text>
          <Text>
            Ce document est un MODÈLE PÉDAGOGIQUE conforme aux 11 mentions obligatoires de
            l&apos;arrêté du 23 janvier 2024. Il NE constitue PAS une attestation d&apos;assurance
            valable juridiquement. Seule une attestation émise et signée par votre assureur réel a
            une valeur opposable aux tiers (clients, maîtres d&apos;ouvrage, administration). Pour
            obtenir une attestation conforme et opposable : souscrivez une décennale chez un
            courtier ORIAS sous 24h sur https://vivos-assurance.fr/devis
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>Modèle généré par Assurance Pro (https://vivos-assurance.fr) — {dateEmission}</Text>
          <Text>
            Conformité arrêté 23 janvier 2024 (mentions obligatoires) — Loi Spinetta art. L. 241-1
            C. assur.
          </Text>
        </View>
      </Page>
    </Document>
  )
}
