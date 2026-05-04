'use client'

/**
 * Wrapper léger autour de PDFDownloadLink (@react-pdf/renderer) qui encapsule
 * tout le typage SSR-unsafe à un seul endroit. Le form parent peut alors
 * importer ce composant via dynamic({ ssr: false }) sans casser le type-check.
 */

import { PDFDownloadLink } from '@react-pdf/renderer'
import { AttestationDecennalePDF, type AttestationData } from './AttestationDecennalePDF'

export function PdfDownloadButton({
  data,
  fileName,
  className,
  children,
}: {
  data: AttestationData
  fileName: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <PDFDownloadLink
      document={<AttestationDecennalePDF data={data} />}
      fileName={fileName}
      className={className}
    >
      {children}
    </PDFDownloadLink>
  )
}
