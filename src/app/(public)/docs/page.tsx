import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'

export const metadata: Metadata = {
  title: 'API Documentation — Vivos Assurance',
  description:
    "Documentation interactive de l'API publique Vivos Assurance (OpenAPI 3.1). Endpoints: embeddings, knowledge graph, agentic booking, OAuth 2.1, MCP server, webhooks.",
  alternates: { canonical: `${SITE_URL}/docs` },
  robots: { index: true, follow: true },
}

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen">
      <script
        id="api-reference"
        data-url="/api/openapi.json"
        data-configuration={JSON.stringify({
          theme: 'default',
          layout: 'modern',
          showSidebar: true,
          hideDownloadButton: false,
          searchHotKey: 'k',
          metaData: {
            title: 'Vivos Assurance — API Documentation',
            description: 'API publique courtier ORIAS — agents IA + RAG + booking',
            ogTitle: 'Vivos Assurance API',
            ogDescription: 'OpenAPI 3.1 spec — 14 verticales assurance + LLM integration',
          },
          authentication: {
            preferredSecurityScheme: 'BearerAuth',
            http: { bearer: { token: 'YOUR_OAUTH_ACCESS_TOKEN' } },
          },
        })}
      />
      <script
        async
        src="https://cdn.jsdelivr.net/npm/@scalar/api-reference@latest/dist/browser/standalone.js"
      ></script>
    </main>
  )
}
