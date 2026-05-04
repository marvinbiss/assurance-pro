'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { DevisPDF, type DevisData } from './DevisPDF'

export function DevisPdfDownloadButton({
  data,
  fileName,
  className,
  children,
}: {
  data: DevisData
  fileName: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <PDFDownloadLink
      document={<DevisPDF data={data} />}
      fileName={fileName}
      className={className}
    >
      {children}
    </PDFDownloadLink>
  )
}
