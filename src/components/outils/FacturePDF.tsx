'use client'

/**
 * Composant PDF — Facture professionnelle
 * Conforme aux mentions légales obligatoires (art. L. 441-9 C. com. + arrêté 22/03/2017).
 *
 * Inclut la mention OBLIGATOIRE depuis le décret 2024 :
 * « Mention de l'assurance pro de l'émetteur (assureur, n° police, validité, périmètre) »
 * pour les artisans BTP, professionnels de santé, conseil financier, transport.
 */

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  emetteur: { width: '50%' },
  destinataire: { width: '45%', borderLeft: '1px solid #d1d5db', paddingLeft: 12 },
  block: { marginBottom: 4 },
  bold: { fontWeight: 'bold' },
  factureMeta: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    marginVertical: 16,
    borderLeft: '3px solid #1e40af',
  },
  table: { marginVertical: 16 },
  tableRow: { flexDirection: 'row', borderBottom: '1px solid #e5e7eb', padding: 6 },
  tableHeader: { backgroundColor: '#1e40af', color: 'white', fontWeight: 'bold' },
  colDesc: { width: '50%' },
  colQty: { width: '12%', textAlign: 'right' },
  colPrice: { width: '18%', textAlign: 'right' },
  colTotal: { width: '20%', textAlign: 'right' },
  totalsBox: { alignSelf: 'flex-end', width: '50%', marginTop: 8 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 4 },
  totalFinal: { backgroundColor: '#1e40af', color: 'white', fontWeight: 'bold', padding: 8 },
  legalSection: {
    marginTop: 24,
    padding: 8,
    backgroundColor: '#fef3c7',
    fontSize: 7,
    border: '1px solid #f59e0b',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 7,
    textAlign: 'center',
    color: '#6b7280',
    borderTop: '1px solid #e5e7eb',
    paddingTop: 8,
  },
})

export interface FactureLine {
  description: string
  quantite: number
  prixUnitaire: number
}

export interface FactureData {
  // Émetteur
  emetteurNom: string
  emetteurAdresse: string
  emetteurSiret: string
  emetteurTva?: string
  emetteurFormeJuridique: string
  emetteurEmail?: string
  emetteurTelephone?: string
  emetteurAssureur?: string
  emetteurAssurancePolice?: string
  // Destinataire
  destinataireNom: string
  destinataireAdresse: string
  destinataireSiret?: string
  destinataireTva?: string
  // Facture
  numeroFacture: string
  dateFacture: string
  dateEcheance: string
  // Lignes
  lignes: FactureLine[]
  // TVA
  tauxTva: number
  // Conditions
  conditionsPaiement?: string
  mentionTva?: string
}

export function FacturePDF({ data }: { data: FactureData }) {
  const sousTotal = data.lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0)
  const tva = sousTotal * (data.tauxTva / 100)
  const totalTTC = sousTotal + tva
  const fmt = (n: number) => `${n.toFixed(2)} €`

  return (
    <Document title={`Facture ${data.numeroFacture}`} author={data.emetteurNom}>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <View style={styles.emetteur}>
            <Text style={[styles.bold, { fontSize: 14, marginBottom: 6 }]}>{data.emetteurNom}</Text>
            <Text style={styles.block}>{data.emetteurFormeJuridique}</Text>
            <Text style={styles.block}>{data.emetteurAdresse}</Text>
            <Text style={styles.block}>SIRET : {data.emetteurSiret}</Text>
            {data.emetteurTva && <Text style={styles.block}>TVA : {data.emetteurTva}</Text>}
            {data.emetteurEmail && <Text style={styles.block}>{data.emetteurEmail}</Text>}
            {data.emetteurTelephone && <Text style={styles.block}>{data.emetteurTelephone}</Text>}
          </View>
          <View style={styles.destinataire}>
            <Text style={[styles.bold, { marginBottom: 4 }]}>FACTURÉ À</Text>
            <Text style={styles.block}>{data.destinataireNom}</Text>
            <Text style={styles.block}>{data.destinataireAdresse}</Text>
            {data.destinataireSiret && (
              <Text style={styles.block}>SIRET : {data.destinataireSiret}</Text>
            )}
            {data.destinataireTva && <Text style={styles.block}>TVA : {data.destinataireTva}</Text>}
          </View>
        </View>

        {/* Méta facture */}
        <View style={styles.factureMeta}>
          <Text style={[styles.bold, { fontSize: 13, marginBottom: 4 }]}>
            FACTURE N° {data.numeroFacture}
          </Text>
          <Text>Date d&apos;émission : {data.dateFacture}</Text>
          <Text>Date d&apos;échéance : {data.dateEcheance}</Text>
        </View>

        {/* Lignes */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.colDesc}>Description</Text>
            <Text style={styles.colQty}>Qté</Text>
            <Text style={styles.colPrice}>PU HT</Text>
            <Text style={styles.colTotal}>Total HT</Text>
          </View>
          {data.lignes.map((l, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.colDesc}>{l.description}</Text>
              <Text style={styles.colQty}>{l.quantite}</Text>
              <Text style={styles.colPrice}>{fmt(l.prixUnitaire)}</Text>
              <Text style={styles.colTotal}>{fmt(l.quantite * l.prixUnitaire)}</Text>
            </View>
          ))}
        </View>

        {/* Totaux */}
        <View style={styles.totalsBox}>
          <View style={styles.totalRow}>
            <Text style={styles.bold}>Sous-total HT</Text>
            <Text>{fmt(sousTotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.bold}>TVA ({data.tauxTva}%)</Text>
            <Text>{fmt(tva)}</Text>
          </View>
          <View style={[styles.totalRow, styles.totalFinal]}>
            <Text>TOTAL TTC</Text>
            <Text>{fmt(totalTTC)}</Text>
          </View>
        </View>

        {/* Mentions légales obligatoires (art. L. 441-9 C. com.) */}
        <View style={styles.legalSection}>
          <Text style={[styles.bold, { marginBottom: 4 }]}>MENTIONS LÉGALES OBLIGATOIRES</Text>
          <Text>
            • Conditions de paiement :{' '}
            {data.conditionsPaiement || '30 jours fin de mois (Art. L. 441-10 C. com.)'}
          </Text>
          <Text>
            • Pénalités de retard : taux BCE +10 points (Loi LME 2008) appliquées dès le lendemain
            de l&apos;échéance, sans rappel préalable
          </Text>
          <Text>
            • Indemnité forfaitaire pour frais de recouvrement : 40 € (Art. D. 441-5 C. com.)
          </Text>
          <Text>• Pas d&apos;escompte pour paiement anticipé</Text>
          {data.mentionTva && <Text>• {data.mentionTva}</Text>}
          {data.emetteurAssureur && (
            <Text>
              • Assurance professionnelle : {data.emetteurAssureur}
              {data.emetteurAssurancePolice && ` — Police n° ${data.emetteurAssurancePolice}`}
            </Text>
          )}
        </View>

        <View style={styles.footer} fixed>
          <Text>
            Facture générée par Vivos Assurance (https://vivos-assurance.fr) — Modèle conforme art.
            L. 441-9 C. com.
          </Text>
        </View>
      </Page>
    </Document>
  )
}
