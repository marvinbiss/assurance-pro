'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { LettreResiliationPDF, type LettreResiliationData } from './LettreResiliationPDF'

export function LettreResiliationPdfDownloadButton({
  data,
  fileName,
  className,
  children,
}: {
  data: LettreResiliationData
  fileName: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <PDFDownloadLink
      document={<LettreResiliationPDF data={data} />}
      fileName={fileName}
      className={className}
    >
      {children}
    </PDFDownloadLink>
  )
}
