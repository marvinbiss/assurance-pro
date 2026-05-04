'use client'

/**
 * Composant PDF — Attestation RC Pro modèle TYPE
 *
 * Conforme à l'arrêté du 23 janvier 2024 (mentions obligatoires) — version
 * adaptée à la RC Pro (sans la référence Loi Spinetta qui est BTP-spécifique).
 *
 * AVERTISSEMENT JURIDIQUE : MODÈLE TYPE pédagogique, NON opposable juridiquement.
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
  title: { fontSize: 16, fontWeight: 'bold', color: '#1e40af', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 9, textAlign: 'center', color: '#6b7280' },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', backgroundColor: '#f3f4f6', padding: 4, marginBottom: 4 },
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

export interface RcProAttestationData {
  raisonSociale: string
  formeJuridique: string
  siret: string
  adresse: string
  metiers: string
  zoneGeographique: string
  dateDebut: string
  dateFin: string
  plafondParSinistre: string
  plafondAnnuel: string
}

export function AttestationRcProPDF({ data }: { data: RcProAttestationData }) {
  const dateEmission = new Date().toLocaleDateString('fr-FR')

  return (
    <Document title="Modèle attestation RC Pro — Assurance Pro" author="Assurance Pro (modèle type)">
      <Page size="A4" style={styles.page}>
        <Text style={styles.watermark}>MODÈLE TYPE</Text>

        <View style={styles.header}>
          <Text style={styles.title}>ATTESTATION D&apos;ASSURANCE RESPONSABILITÉ CIVILE PROFESSIONNELLE</Text>
          <Text style={styles.subtitle}>
            Modèle conforme à l&apos;arrêté du 23 janvier 2024 — Article L. 113-1 du Code des assurances
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Identification de l&apos;assureur</Text>
          <View style={styles.row}><Text style={styles.label}>Raison sociale :</Text><Text style={styles.value}>[À compléter par l&apos;assureur]</Text></View>
          <View style={styles.row}><Text style={styles.label}>SIREN :</Text><Text style={styles.value}>[N° SIREN assureur]</Text></View>
          <View style={styles.row}><Text style={styles.label}>N° agrément ACPR :</Text><Text style={styles.value}>[N° agrément]</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Identification de l&apos;assuré</Text>
          <View style={styles.row}><Text style={styles.label}>Raison sociale :</Text><Text style={styles.value}>{data.raisonSociale}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Forme juridique :</Text><Text style={styles.value}>{data.formeJuridique}</Text></View>
          <View style={styles.row}><Text style={styles.label}>SIRET :</Text><Text style={styles.value}>{data.siret}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Adresse :</Text><Text style={styles.value}>{data.adresse}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Contrat d&apos;assurance RC Pro</Text>
          <View style={styles.row}><Text style={styles.label}>N° de police :</Text><Text style={styles.value}>[Numéro de police — à remplir par assureur]</Text></View>
          <View style={styles.row}><Text style={styles.label}>Date d&apos;émission :</Text><Text style={styles.value}>{dateEmission}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Période de validité</Text>
          <View style={styles.row}><Text style={styles.label}>Date de début :</Text><Text style={styles.value}>{data.dateDebut}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Date de fin :</Text><Text style={styles.value}>{data.dateFin}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Activités professionnelles couvertes</Text>
          <Text style={styles.value}>{data.metiers}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Zone géographique de couverture</Text>
          <Text style={styles.value}>{data.zoneGeographique}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Plafonds de garantie</Text>
          <View style={styles.row}><Text style={styles.label}>Plafond par sinistre :</Text><Text style={styles.value}>{data.plafondParSinistre}</Text></View>
          <View style={styles.row}><Text style={styles.label}>Plafond annuel cumulé :</Text><Text style={styles.value}>{data.plafondAnnuel}</Text></View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Garanties incluses (RC Pro standard)</Text>
          <Text style={styles.value}>
            • Dommages corporels causés à un tiers{'\n'}
            • Dommages matériels causés à un tiers{'\n'}
            • Dommages immatériels consécutifs{'\n'}
            • Faute professionnelle, erreur, omission, négligence
          </Text>
        </View>

        <View style={styles.legalRef}>
          <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
            ⚠️ AVERTISSEMENT — MODÈLE TYPE NON CONTRACTUEL
          </Text>
          <Text>
            Ce document est un MODÈLE PÉDAGOGIQUE conforme aux mentions obligatoires de
            l&apos;arrêté du 23 janvier 2024. Il NE constitue PAS une attestation
            d&apos;assurance valable juridiquement. Seule une attestation émise et signée par
            votre assureur réel a une valeur opposable aux tiers. Pour obtenir une attestation
            conforme et opposable : souscrivez votre RC Pro chez un courtier ORIAS sous 24h
            sur https://assurance-pro.fr/outils/devis-rc-pro
          </Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>Modèle généré par Assurance Pro (https://assurance-pro.fr) — {dateEmission}</Text>
          <Text>Conformité arrêté 23 janvier 2024 (mentions obligatoires) — Article L. 113-1 du Code des assurances</Text>
        </View>
      </Page>
    </Document>
  )
}
