-- ─────────────────────────────────────────────────────────────────────────
-- Migration 025 — MCP (Model Context Protocol) server compliance tables
-- ─────────────────────────────────────────────────────────────────────────
-- Tables pour le serveur MCP /api/mcp exposé aux LLMs (Claude/ChatGPT/etc).
--
-- Compliance ACPR + DDA art. L.521-4 :
--   - mcp_proofs : preuves recueil exigences/besoins (5 ans archivage ACPR)
--   - mcp_sessions : sessions LLM (corrélation conversation × proof)
--   - mcp_audit_log : audit trail complet (acceptation/refus tools)
-- ─────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS mcp_proofs (
  id text PRIMARY KEY,
  -- Format: 'mcp_proof_' || sha256(payload)[:32]
  llm_session_id text,
  -- OpenAI/Anthropic session ID (corrélation conversation)
  llm_user_pseudo_id text,
  -- Pseudo-ID utilisateur fourni par LLM (anonymisé)
  garantie_souhaitee text NOT NULL,
  metier text NOT NULL,
  statut_juridique text NOT NULL,
  ca_annuel numeric,
  nb_salaries integer,
  anciennete_activite_annees numeric,
  sinistres_5_derniers_ans integer,
  ville text,
  payload_json jsonb NOT NULL,
  -- Snapshot complet du recueil exigences
  payload_hash text NOT NULL,
  -- SHA-256 du payload pour intégrité
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '30 minutes'),
  -- TTL 30 min pour devis (au-delà = nouveau recueil obligatoire)
  archived_at timestamptz,
  -- Set quand proof est utilisé pour signature contrat (archivage 5 ans ACPR)
  acpr_retention_until timestamptz NOT NULL DEFAULT (now() + interval '5 years')
);

CREATE INDEX IF NOT EXISTS idx_mcp_proofs_llm_session ON mcp_proofs (llm_session_id) WHERE llm_session_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_mcp_proofs_expires ON mcp_proofs (expires_at);
CREATE INDEX IF NOT EXISTS idx_mcp_proofs_archived ON mcp_proofs (archived_at) WHERE archived_at IS NOT NULL;

CREATE TABLE IF NOT EXISTS mcp_sessions (
  id text PRIMARY KEY,
  -- LLM session ID (header _meta.openai/session ou anthropic/session)
  llm_origin text NOT NULL CHECK (llm_origin IN ('openai', 'anthropic', 'perplexity', 'gemini', 'cursor', 'other')),
  user_pseudo_id text,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  tool_calls_count integer NOT NULL DEFAULT 0,
  proof_id text REFERENCES mcp_proofs(id),
  metadata_json jsonb DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_mcp_sessions_origin ON mcp_sessions (llm_origin);
CREATE INDEX IF NOT EXISTS idx_mcp_sessions_last_activity ON mcp_sessions (last_activity_at DESC);

CREATE TABLE IF NOT EXISTS mcp_audit_log (
  id bigserial PRIMARY KEY,
  session_id text REFERENCES mcp_sessions(id),
  proof_id text REFERENCES mcp_proofs(id),
  tool_name text NOT NULL,
  request_json jsonb NOT NULL,
  response_json jsonb,
  error_code text,
  error_message text,
  duration_ms integer,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_mcp_audit_session ON mcp_audit_log (session_id);
CREATE INDEX IF NOT EXISTS idx_mcp_audit_created ON mcp_audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mcp_audit_tool ON mcp_audit_log (tool_name);

COMMENT ON TABLE mcp_proofs IS
  'Preuves recueil exigences DDA art. L.521-4 — archivage ACPR 5 ans obligatoire';
COMMENT ON TABLE mcp_sessions IS
  'Sessions LLM (ChatGPT/Claude/Perplexity/Gemini) interagissant avec MCP server';
COMMENT ON TABLE mcp_audit_log IS
  'Audit trail tous appels tools MCP — traçabilité ACPR + debug';

-- RPC: increment atomique du compteur d'appels d'outils par session.
CREATE OR REPLACE FUNCTION increment_mcp_session_tool_calls(p_session_id text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  UPDATE mcp_sessions
  SET tool_calls_count = tool_calls_count + 1,
      last_activity_at = now()
  WHERE id = p_session_id;
$$;
