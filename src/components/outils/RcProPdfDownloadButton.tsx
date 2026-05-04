'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { AttestationRcProPDF, type RcProAttestationData } from './AttestationRcProPDF'

export function RcProPdfDownloadButton({
  data,
  fileName,
  className,
  children,
}: {
  data: RcProAttestationData
  fileName: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <PDFDownloadLink
      document={<AttestationRcProPDF data={data} />}
      fileName={fileName}
      className={className}
    >
      {children}
    </PDFDownloadLink>
  )
}
