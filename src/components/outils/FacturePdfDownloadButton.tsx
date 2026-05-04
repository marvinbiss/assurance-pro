'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { FacturePDF, type FactureData } from './FacturePDF'

export function FacturePdfDownloadButton({
  data,
  fileName,
  className,
  children,
}: {
  data: FactureData
  fileName: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <PDFDownloadLink
      document={<FacturePDF data={data} />}
      fileName={fileName}
      className={className}
    >
      {children}
    </PDFDownloadLink>
  )
}
