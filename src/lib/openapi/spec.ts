/**
 * OpenAPI 3.1 spec — Vivos Assurance Public API.
 *
 * Document tous les endpoints publics /api/v1 + OAuth + MCP.
 * Servi par GET /api/openapi.json et rendu par /docs (Scalar UI).
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vivos-assurance.fr'
const API_VERSION = '1.0.0'

export interface OpenAPISpec {
  openapi: '3.1.0'
  info: Record<string, unknown>
  servers: Array<{ url: string; description: string }>
  paths: Record<string, Record<string, unknown>>
  components: Record<string, unknown>
  security?: Array<Record<string, string[]>>
  tags: Array<{ name: string; description: string }>
}

const GARANTIES = [
  'decennale',
  'rc-pro',
  'multirisque-pro',
  'mutuelle-pro',
  'prevoyance',
  'cyber',
  'vtc',
  'dommages-ouvrage',
  'tous-risques-chantier',
  'transport-marchandises',
  'moto-pro',
  'protection-juridique-pro',
  'homme-cle',
  'flotte-auto',
]

const AGENT_SOURCES = ['openai', 'anthropic', 'perplexity', 'gemini', 'mcp', 'other']

export function buildOpenAPISpec(): OpenAPISpec {
  return {
    openapi: '3.1.0',
    info: {
      title: 'Vivos Assurance Public API',
      version: API_VERSION,
      description:
        'API publique du cabinet de courtage en assurance professionnelle Vivos. Conçue pour intégration agents IA (ChatGPT/Claude/Perplexity/Gemini), RAG externe, et partenaires distribution. License CC-BY 4.0 pour usage non-commercial avec citation requise vers vivos-assurance.fr.',
      termsOfService: `${SITE_URL}/cgv`,
      contact: {
        name: 'Vivos Assurance — Cabinet ORIAS',
        url: SITE_URL,
        email: 'api@vivos-assurance.fr',
      },
      license: {
        name: 'CC-BY 4.0',
        url: 'https://creativecommons.org/licenses/by/4.0/',
      },
    },
    servers: [
      { url: SITE_URL, description: 'Production' },
      { url: 'http://localhost:3000', description: 'Local development' },
    ],
    tags: [
      {
        name: 'Embeddings',
        description: 'Vector embeddings + semantic search (1536-dim text-embedding-3-small).',
      },
      { name: 'Knowledge Graph', description: 'JSON-LD knowledge graph (Schema.org).' },
      { name: 'Agents', description: 'Agentic Booking API — LLM créent leads courtier ORIAS.' },
      {
        name: 'OAuth',
        description: 'OAuth 2.1 PKCE gateway pour MCP server activation stores LLM.',
      },
      {
        name: 'MCP',
        description: 'Model Context Protocol JSON-RPC 2.0 server (tools + resources).',
      },
      {
        name: 'Webhooks',
        description: 'Subscriptions HMAC-signed events (agent_booking, citation, quote).',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'OAuth 2.1',
          description: 'Access token OAuth 2.1 (cf. /.well-known/oauth-authorization-server).',
        },
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'X-Api-Key',
          description: 'Clé API partenaire (sur demande).',
        },
      },
      schemas: {
        Garantie: {
          type: 'string',
          enum: GARANTIES,
          description: "14 verticales d'assurance couvertes.",
        },
        AgentSource: {
          type: 'string',
          enum: AGENT_SOURCES,
        },
        Error: {
          type: 'object',
          required: ['error'],
          properties: {
            error: { type: 'string' },
            details: { type: 'object', additionalProperties: true },
          },
        },
        EmbeddingRequest: {
          type: 'object',
          required: ['input'],
          properties: {
            input: {
              oneOf: [
                { type: 'string', maxLength: 8000 },
                { type: 'array', items: { type: 'string', maxLength: 8000 }, maxItems: 10 },
              ],
            },
            model: { type: 'string', default: 'text-embedding-3-small' },
          },
        },
        EmbeddingResponse: {
          type: 'object',
          required: ['object', 'data', 'model', 'usage'],
          properties: {
            object: { type: 'string', enum: ['list'] },
            data: {
              type: 'array',
              items: {
                type: 'object',
                required: ['object', 'embedding', 'index'],
                properties: {
                  object: { type: 'string', enum: ['embedding'] },
                  embedding: {
                    type: 'array',
                    items: { type: 'number' },
                    minItems: 1536,
                    maxItems: 1536,
                  },
                  index: { type: 'integer' },
                },
              },
            },
            model: { type: 'string' },
            usage: {
              type: 'object',
              properties: {
                prompt_tokens: { type: 'integer' },
                total_tokens: { type: 'integer' },
              },
            },
          },
        },
        SearchMatch: {
          type: 'object',
          properties: {
            url: { type: 'string', format: 'uri' },
            slug: { type: 'string' },
            chunk_index: { type: 'integer' },
            snippet: { type: 'string' },
            similarity: { type: 'number', minimum: 0, maximum: 1 },
          },
        },
        BookingRequest: {
          type: 'object',
          required: ['email', 'garantie', 'agent_source', 'consent_at', 'consent_text'],
          properties: {
            email: { type: 'string', format: 'email' },
            first_name: { type: 'string', maxLength: 100 },
            last_name: { type: 'string', maxLength: 100 },
            phone: { type: 'string', maxLength: 30 },
            garantie: { $ref: '#/components/schemas/Garantie' },
            metier: { type: 'string', maxLength: 100 },
            statut_juridique: { type: 'string', maxLength: 50 },
            ca_annuel: { type: 'number', minimum: 0, maximum: 100000000 },
            ville: { type: 'string', maxLength: 100 },
            message: { type: 'string', maxLength: 2000 },
            preferred_contact_window: {
              type: 'string',
              enum: ['morning', 'afternoon', 'evening', 'asap'],
            },
            agent_source: { $ref: '#/components/schemas/AgentSource' },
            agent_session_id: { type: 'string', maxLength: 128 },
            agent_user_pseudo_id: { type: 'string', maxLength: 128 },
            consent_at: { type: 'string', format: 'date-time' },
            consent_text: { type: 'string', minLength: 20, maxLength: 1000 },
          },
        },
        BookingResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['created'] },
            booking_reference: { type: 'string', pattern: '^AGT-[A-Z0-9]{6}-[A-F0-9]{4}$' },
            tracking_url: { type: 'string', format: 'uri' },
            sla: { type: 'string' },
            consent_recorded_at: { type: 'string', format: 'date-time' },
          },
        },
        WebhookSubscription: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            url: { type: 'string', format: 'uri' },
            events: {
              type: 'array',
              items: {
                type: 'string',
                enum: [
                  'agent_booking.created',
                  'agent_booking.qualified',
                  'agent_booking.won',
                  'llm_citation.detected',
                  'mcp.proof.signed',
                ],
              },
            },
            active: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
            last_delivery_at: { type: 'string', format: 'date-time', nullable: true },
            secret_preview: {
              type: 'string',
              description:
                '8 derniers caractères secret (full secret renvoyé une seule fois à création).',
            },
          },
        },
      },
    },
    paths: {
      '/api/v1/embeddings': {
        post: {
          tags: ['Embeddings'],
          summary: 'Generate embedding (OpenAI-compatible)',
          description:
            'Génère un embedding 1536-dim text-embedding-3-small pour input texte. Format compatible OpenAI Embeddings API.',
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/EmbeddingRequest' } },
            },
          },
          responses: {
            '200': {
              description: 'Embedding(s) générés',
              content: {
                'application/json': { schema: { $ref: '#/components/schemas/EmbeddingResponse' } },
              },
            },
            '400': {
              description: 'Validation failed',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
            '502': {
              description: 'Embedding generation failed',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
      },
      '/api/v1/embeddings/search': {
        get: {
          tags: ['Embeddings'],
          summary: 'Semantic search sur corpus Vivos (6 070 pages)',
          description: 'Pipeline: embed query → pgvector cosine match → top-K snippets.',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: true,
              schema: { type: 'string', minLength: 2, maxLength: 500 },
            },
            {
              name: 'k',
              in: 'query',
              schema: { type: 'integer', minimum: 1, maximum: 20, default: 5 },
            },
            {
              name: 'threshold',
              in: 'query',
              schema: { type: 'number', minimum: 0, maximum: 1, default: 0.5 },
            },
          ],
          responses: {
            '200': {
              description: 'Matches triés par similarité',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      query: { type: 'string' },
                      matches: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/SearchMatch' },
                      },
                      count: { type: 'integer' },
                      threshold: { type: 'number' },
                      latency_ms: { type: 'integer' },
                      attribution: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/knowledge-graph': {
        get: {
          tags: ['Knowledge Graph'],
          summary: 'JSON-LD knowledge graph public',
          description:
            'Schema.org @graph avec Organization + 14 garanties + 8 assureurs + métiers + statuts + 100 villes.',
          responses: {
            '200': {
              description: 'JSON-LD document',
              content: {
                'application/ld+json': { schema: { type: 'object', additionalProperties: true } },
              },
              headers: {
                'X-KG-Stats': {
                  schema: { type: 'string' },
                  description: 'JSON stats: organizations, garanties, assureurs, etc.',
                },
              },
            },
          },
        },
      },
      '/api/v1/agents/booking': {
        post: {
          tags: ['Agents'],
          summary: 'Create booking lead via LLM/agent',
          description:
            'LLM/agents externes créent un lead courtier ORIAS direct depuis interface conversationnelle. Email confirmation + alerte Marvin envoyés automatiquement.',
          security: [{ BearerAuth: [] }, {}],
          requestBody: {
            required: true,
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/BookingRequest' } },
            },
          },
          responses: {
            '201': {
              description: 'Booking créé',
              content: {
                'application/json': { schema: { $ref: '#/components/schemas/BookingResponse' } },
              },
            },
            '400': { description: 'Validation failed' },
            '401': { description: 'Invalid OAuth token' },
            '500': { description: 'Server error' },
          },
        },
        get: {
          tags: ['Agents'],
          summary: 'Endpoint documentation',
          responses: { '200': { description: 'Documentation OpenAPI inline' } },
        },
      },
      '/api/v1/webhooks/subscriptions': {
        post: {
          tags: ['Webhooks'],
          summary: 'Create webhook subscription',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['url', 'events'],
                  properties: {
                    url: { type: 'string', format: 'uri' },
                    events: { type: 'array', items: { type: 'string' }, minItems: 1 },
                    description: { type: 'string', maxLength: 200 },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Subscription créée — secret retourné UNE SEULE FOIS',
              content: {
                'application/json': {
                  schema: {
                    allOf: [
                      { $ref: '#/components/schemas/WebhookSubscription' },
                      {
                        type: 'object',
                        properties: {
                          secret: {
                            type: 'string',
                            description: 'Secret HMAC complet (ne sera plus jamais affiché).',
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ['Webhooks'],
          summary: 'List webhook subscriptions',
          security: [{ BearerAuth: [] }],
          responses: {
            '200': {
              description: 'Liste subscriptions',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/WebhookSubscription' },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/webhooks/subscriptions/{id}': {
        delete: {
          tags: ['Webhooks'],
          summary: 'Delete webhook subscription',
          security: [{ BearerAuth: [] }],
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string', format: 'uuid' } },
          ],
          responses: {
            '204': { description: 'Deleted' },
            '404': { description: 'Not found' },
          },
        },
      },
      '/api/v1/webhooks/test': {
        post: {
          tags: ['Webhooks'],
          summary: 'Send test event to subscription',
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['subscription_id'],
                  properties: {
                    subscription_id: { type: 'string', format: 'uuid' },
                    event: { type: 'string', default: 'test.ping' },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Test event dispatched' },
            '404': { description: 'Subscription not found' },
          },
        },
      },
      '/api/mcp': {
        post: {
          tags: ['MCP'],
          summary: 'Model Context Protocol JSON-RPC 2.0',
          description:
            'Tools: recueil_exigences, generate_quote_pro, compare_offers, audit_coverage.',
          security: [{ BearerAuth: [] }, {}],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['jsonrpc', 'method', 'id'],
                  properties: {
                    jsonrpc: { type: 'string', enum: ['2.0'] },
                    method: {
                      type: 'string',
                      enum: ['initialize', 'tools/list', 'tools/call', 'resources/list', 'ping'],
                    },
                    params: { type: 'object', additionalProperties: true },
                    id: { oneOf: [{ type: 'string' }, { type: 'integer' }] },
                  },
                },
              },
            },
          },
          responses: { '200': { description: 'JSON-RPC response' } },
        },
      },
      '/.well-known/oauth-authorization-server': {
        get: {
          tags: ['OAuth'],
          summary: 'OAuth 2.1 metadata (RFC 8414)',
          responses: { '200': { description: 'Discovery document' } },
        },
      },
      '/api/oauth/authorize': {
        get: {
          tags: ['OAuth'],
          summary: 'Authorization endpoint (PKCE)',
          parameters: [
            {
              name: 'response_type',
              in: 'query',
              required: true,
              schema: { type: 'string', enum: ['code'] },
            },
            { name: 'client_id', in: 'query', required: true, schema: { type: 'string' } },
            {
              name: 'redirect_uri',
              in: 'query',
              required: true,
              schema: { type: 'string', format: 'uri' },
            },
            {
              name: 'scope',
              in: 'query',
              schema: { type: 'string', default: 'mcp:tools mcp:resources' },
            },
            { name: 'code_challenge', in: 'query', required: true, schema: { type: 'string' } },
            {
              name: 'code_challenge_method',
              in: 'query',
              required: true,
              schema: { type: 'string', enum: ['S256'] },
            },
            { name: 'state', in: 'query', schema: { type: 'string' } },
          ],
          responses: { '302': { description: 'Redirect with code' } },
        },
      },
      '/api/oauth/token': {
        post: {
          tags: ['OAuth'],
          summary: 'Token endpoint',
          requestBody: {
            required: true,
            content: {
              'application/x-www-form-urlencoded': {
                schema: { type: 'object', additionalProperties: true },
              },
            },
          },
          responses: { '200': { description: 'Tokens issued' } },
        },
      },
      '/api/oauth/introspect': {
        post: {
          tags: ['OAuth'],
          summary: 'Token introspection (RFC 7662)',
          responses: { '200': { description: 'Token status' } },
        },
      },
    },
  }
}
