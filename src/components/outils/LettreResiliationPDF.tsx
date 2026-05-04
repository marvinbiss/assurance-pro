'use client'

/**
 * Composant PDF — Lettre type de résiliation assurance professionnelle
 *
 * Conforme à la Loi Hamon (17 mars 2014) — résiliation infra-annuelle après 1 an
 * d'engagement, sans frais, sans motif. Article L. 113-15-2 du Code des assurances.
 *
 * Format : lettre A4 standard, à imprimer + signer + envoyer en LRAR.
 * Mention manuscrite recommandée : "Lu et approuvé" (facultative).
 */

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 50, fontSize: 11, fontFamily: 'Helvetica', lineHeight: 1.4 },
  emetteur: { marginBottom: 30 },
  destinataire: { textAlign: 'right', marginBottom: 20 },
  metaLR: { marginBottom: 20, fontSize: 10, fontStyle: 'italic' },
  date: { textAlign: 'right', marginBottom: 16 },
  objet: { marginBottom: 20, fontWeight: 'bold' },
  body: { textAlign: 'justify', marginBottom: 12 },
  signature: { marginTop: 40 },
  signatureLine: { marginTop: 24, borderTop: '1px solid #d1d5db', width: 200, paddingTop: 4, fontSize: 9, textAlign: 'center' },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 50,
    right: 50,
    fontSize: 7,
    textAlign: 'center',
    color: '#9ca3af',
    borderTop: '1px solid #e5e7eb',
    paddingTop: 6,
  },
})

export interface LettreResiliationData {
  // Émetteur (assuré)
  assureNom: string
  assurePrenom: string
  assureAdresse: string
  assureCp: string
  assureVille: string
  // Destinataire (assureur)
  assureurNom: string
  assureurAdresse: string
  assureurCp: string
  assureurVille: string
  // Contrat
  numeroPolice: string
  typeAssurance: string // RC Pro, Décennale, Multirisque, etc.
  dateSouscription: string
  // Date d'effet souhaitée
  dateEffetResiliation: string
  // Motif (optionnel — Loi Hamon = aucun motif requis)
  motif?: string
}

export function LettreResiliationPDF({ data }: { data: LettreResiliationData }) {
  const dateAujourdhui = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
  const dateEffet = new Date(data.dateEffetResiliation).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Document title={`Lettre résiliation ${data.numeroPolice}`} author={`${data.assurePrenom} ${data.assureNom}`}>
      <Page size="A4" style={styles.page}>
        {/* Émetteur (haut gauche) */}
        <View style={styles.emetteur}>
          <Text>{data.assurePrenom} {data.assureNom}</Text>
          <Text>{data.assureAdresse}</Text>
          <Text>{data.assureCp} {data.assureVille}</Text>
        </View>

        {/* Mention LRAR */}
        <View style={styles.metaLR}>
          <Text>Lettre recommandée avec accusé de réception</Text>
        </View>

        {/* Destinataire (droite) */}
        <View style={styles.destinataire}>
          <Text>{data.assureurNom}</Text>
          <Text>Service Résiliations</Text>
          <Text>{data.assureurAdresse}</Text>
          <Text>{data.assureurCp} {data.assureurVille}</Text>
        </View>

        {/* Date */}
        <View style={styles.date}>
          <Text>Fait à {data.assureVille}, le {dateAujourdhui}</Text>
        </View>

        {/* Objet */}
        <View style={styles.objet}>
          <Text>Objet : Résiliation du contrat n° {data.numeroPolice} (Loi Hamon)</Text>
        </View>

        {/* Corps */}
        <View style={styles.body}>
          <Text>Madame, Monsieur,</Text>
        </View>
        <View style={styles.body}>
          <Text>
            Conformément à la loi du 17 mars 2014 (dite Loi Hamon) et à l&apos;article
            L. 113-15-2 du Code des assurances, je vous notifie par la présente la résiliation
            de mon contrat d&apos;assurance professionnelle référencé ci-dessous :
          </Text>
        </View>
        <View style={styles.body}>
          <Text>• Type d&apos;assurance : {data.typeAssurance}</Text>
          <Text>• Numéro de police : {data.numeroPolice}</Text>
          <Text>• Date de souscription : {new Date(data.dateSouscription).toLocaleDateString('fr-FR')}</Text>
        </View>
        <View style={styles.body}>
          <Text>
            Mon contrat ayant plus d&apos;un an d&apos;engagement, je suis fondé(e) à exercer
            mon droit à la résiliation infra-annuelle, sans frais et sans motif. La résiliation
            prendra effet 1 mois après la réception de la présente, soit le {dateEffet}.
          </Text>
        </View>
        {data.motif && (
          <View style={styles.body}>
            <Text>Motif (à titre informatif, non requis par la Loi Hamon) : {data.motif}</Text>
          </View>
        )}
        <View style={styles.body}>
          <Text>
            Je vous prie de bien vouloir me confirmer la prise en compte de cette résiliation
            par retour de courrier et de procéder, dans un délai de 30 jours, au remboursement
            au prorata temporis de la fraction de cotisation déjà versée pour la période
            postérieure à la date d&apos;effet de la résiliation.
          </Text>
        </View>
        <View style={styles.body}>
          <Text>
            Je vous remercie de bien vouloir m&apos;adresser une attestation de résiliation à
            l&apos;adresse indiquée ci-dessus.
          </Text>
        </View>
        <View style={styles.body}>
          <Text>Je vous prie d&apos;agréer, Madame, Monsieur, l&apos;expression de mes salutations distinguées.</Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text style={{ fontWeight: 'bold' }}>{data.assurePrenom} {data.assureNom}</Text>
          <View style={styles.signatureLine}>
            <Text>Signature</Text>
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>Lettre générée par Assurance Pro (https://assurance-pro.fr) — Conforme Loi Hamon (art. L. 113-15-2 C. assur.)</Text>
        </View>
      </Page>
    </Document>
  )
}
