'use client'

/**
 * Composant PDF — Devis professionnel
 * Conforme aux mentions légales obligatoires devis (art. L. 111-1 C. consommation +
 * art. L. 441-3 C. com. + arrêté 27/03/2017 secteur BTP).
 *
 * Différences avec une facture :
 * - Titre « DEVIS »
 * - Date d'émission + date de validité (typiquement 30/90 jours)
 * - PAS de pénalités de retard (proposition pré-contractuelle)
 * - Mention « Bon pour accord » + zone signature client
 * - Mention « Devis gratuit » obligatoire
 * - Conditions de réalisation (durée, matériaux, garanties)
 */

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  emetteur: { width: '50%' },
  destinataire: { width: '45%', borderLeft: '1px solid #d1d5db', paddingLeft: 12 },
  block: { marginBottom: 4 },
  bold: { fontWeight: 'bold' },
  devisMeta: {
    backgroundColor: '#dbeafe',
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
  conditions: {
    marginTop: 16,
    padding: 8,
    backgroundColor: '#f3f4f6',
    fontSize: 9,
    border: '1px solid #d1d5db',
  },
  signatureBox: {
    marginTop: 16,
    padding: 12,
    border: '1px solid #1e40af',
    backgroundColor: '#eff6ff',
  },
  signatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  signatureCol: { width: '48%', borderTop: '1px solid #d1d5db', paddingTop: 6, fontSize: 8 },
  legalSection: {
    marginTop: 12,
    padding: 6,
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

export interface DevisLine {
  description: string
  quantite: number
  prixUnitaire: number
}

export interface DevisData {
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
  // Devis
  numeroDevis: string
  dateDevis: string
  dateValidite: string
  // Lignes
  lignes: DevisLine[]
  tauxTva: number
  // Conditions
  dureeRealisation?: string
  conditionsReglement?: string
  acompte?: string
  garanties?: string
}

export function DevisPDF({ data }: { data: DevisData }) {
  const sousTotal = data.lignes.reduce((s, l) => s + l.quantite * l.prixUnitaire, 0)
  const tva = sousTotal * (data.tauxTva / 100)
  const totalTTC = sousTotal + tva
  const fmt = (n: number) => `${n.toFixed(2)} €`

  return (
    <Document title={`Devis ${data.numeroDevis}`} author={data.emetteurNom}>
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
            <Text style={[styles.bold, { marginBottom: 4 }]}>DESTINATAIRE</Text>
            <Text style={styles.block}>{data.destinataireNom}</Text>
            <Text style={styles.block}>{data.destinataireAdresse}</Text>
            {data.destinataireSiret && (
              <Text style={styles.block}>SIRET : {data.destinataireSiret}</Text>
            )}
          </View>
        </View>

        {/* Méta devis */}
        <View style={styles.devisMeta}>
          <Text style={[styles.bold, { fontSize: 14, marginBottom: 4, color: '#1e40af' }]}>
            DEVIS N° {data.numeroDevis}
          </Text>
          <Text>Date d&apos;émission : {data.dateDevis}</Text>
          <Text style={{ fontWeight: 'bold' }}>
            Validité du devis : jusqu&apos;au {data.dateValidite}
          </Text>
          <Text style={{ fontStyle: 'italic', marginTop: 2 }}>
            Devis gratuit et sans engagement
          </Text>
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

        {/* Conditions */}
        <View style={styles.conditions}>
          <Text style={[styles.bold, { marginBottom: 4 }]}>CONDITIONS DE RÉALISATION</Text>
          {data.dureeRealisation && <Text>• Durée prévisionnelle : {data.dureeRealisation}</Text>}
          {data.conditionsReglement && (
            <Text>• Conditions de règlement : {data.conditionsReglement}</Text>
          )}
          {data.acompte && <Text>• Acompte demandé : {data.acompte}</Text>}
          {data.garanties && <Text>• Garanties incluses : {data.garanties}</Text>}
          {data.emetteurAssureur && (
            <Text>
              • Assurance professionnelle : {data.emetteurAssureur}
              {data.emetteurAssurancePolice && ` — Police n° ${data.emetteurAssurancePolice}`}
            </Text>
          )}
        </View>

        {/* Bon pour accord */}
        <View style={styles.signatureBox}>
          <Text style={[styles.bold, { fontSize: 11, marginBottom: 4 }]}>ACCEPTATION DU DEVIS</Text>
          <Text style={{ fontSize: 9 }}>
            Pour valider ce devis, le client doit apposer la mention manuscrite « Bon pour accord »
            suivie de sa signature et de la date.
          </Text>
          <View style={styles.signatureRow}>
            <View style={styles.signatureCol}>
              <Text style={styles.bold}>Signature de l&apos;émetteur :</Text>
              <Text>{data.emetteurNom}</Text>
              <Text>Date : {data.dateDevis}</Text>
            </View>
            <View style={styles.signatureCol}>
              <Text style={styles.bold}>Signature du client + « Bon pour accord » :</Text>
              <Text>{'\n\n\n'}</Text>
            </View>
          </View>
        </View>

        {/* Mentions légales */}
        <View style={styles.legalSection}>
          <Text style={[styles.bold, { marginBottom: 2 }]}>MENTIONS LÉGALES</Text>
          <Text>
            • Devis valable{' '}
            {Math.ceil(
              (new Date(data.dateValidite).getTime() - new Date(data.dateDevis).getTime()) /
                (1000 * 60 * 60 * 24)
            )}{' '}
            jours à compter de la date d&apos;émission
          </Text>
          <Text>
            • Devis gratuit conformément à l&apos;article L. 111-1 du Code de la consommation
          </Text>
          <Text>• Toute commande implique l&apos;acceptation pleine et entière de nos CGV</Text>
        </View>

        <View style={styles.footer} fixed>
          <Text>
            Devis généré par Assurance Pro (https://vivos-assurance.fr) — Modèle conforme art. L.
            111-1 C. conso + L. 441-3 C. com.
          </Text>
        </View>
      </Page>
    </Document>
  )
}
