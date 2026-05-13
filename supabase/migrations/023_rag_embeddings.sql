-- ─────────────────────────────────────────────────────────────────────────────
-- Migration 023 — RAG Chatbot embeddings (pgvector)
--
-- Stratégie : indexer le contenu des 6 070 pages (108 statiques + 5 811 prog +
-- ~150 autres) en embeddings 1536-dim (OpenAI text-embedding-3-small).
-- Permet retrieval similaire pour répondre aux questions ORIAS/assurance.
--
-- Génération offline via scripts/generate-embeddings.ts (batch nuit).
-- Retrieval online via RPC match_page_embeddings(query_emb, k, threshold).
-- ─────────────────────────────────────────────────────────────────────────────

-- Extension pgvector (no-op si déjà activée — Supabase l'inclut par défaut)
create extension if not exists vector with schema extensions;

-- ─── Table embeddings ────────────────────────────────────────────────────────

create table if not exists app.page_embeddings (
  id          uuid primary key default gen_random_uuid(),
  page_slug   text not null,
  chunk_index int  not null default 0,           -- 0 si toute la page, 1+ pour chunks
  content     text not null,                      -- texte source du chunk
  embedding   extensions.vector(1536) not null,   -- OpenAI text-embedding-3-small
  model       text not null default 'text-embedding-3-small',
  token_count int,                                 -- coût tracking
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create unique index if not exists ix_page_embeddings_slug_chunk
  on app.page_embeddings (page_slug, chunk_index);

-- HNSW index pour recherche kNN rapide (Supabase pgvector >= 0.5)
create index if not exists ix_page_embeddings_hnsw
  on app.page_embeddings
  using hnsw (embedding extensions.vector_cosine_ops)
  with (m = 16, ef_construction = 64);

-- ─── RLS — read public (pas de PII), write service_role only ────────────────

alter table app.page_embeddings enable row level security;

drop policy if exists page_embeddings_read on app.page_embeddings;
create policy page_embeddings_read on app.page_embeddings for select
  using (true);

drop policy if exists page_embeddings_write on app.page_embeddings;
create policy page_embeddings_write on app.page_embeddings for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- ─── RPC match_page_embeddings ───────────────────────────────────────────────
-- Retourne top-k pages par similarité cosine. Wrapper public schema pour
-- bypasser PGRST106 (app schema non exposé PostgREST).

create or replace function public.match_page_embeddings(
  query_embedding extensions.vector(1536),
  match_count int default 5,
  similarity_threshold float default 0.7
)
returns table (
  page_slug text,
  chunk_index int,
  content text,
  similarity float
)
language sql
stable
parallel safe
security definer
set search_path = app, extensions
as $$
  select
    pe.page_slug,
    pe.chunk_index,
    pe.content,
    1 - (pe.embedding operator(extensions.<=>) query_embedding) as similarity
  from app.page_embeddings pe
  where 1 - (pe.embedding operator(extensions.<=>) query_embedding) >= similarity_threshold
  order by pe.embedding operator(extensions.<=>) query_embedding
  limit greatest(1, least(50, match_count))
$$;

grant execute on function public.match_page_embeddings(extensions.vector, int, float)
  to anon, authenticated;

-- ─── RPC upsert_page_embedding (idempotent) ─────────────────────────────────

create or replace function public.upsert_page_embedding(
  p_page_slug text,
  p_chunk_index int,
  p_content text,
  p_embedding extensions.vector(1536),
  p_model text default 'text-embedding-3-small',
  p_token_count int default null
)
returns uuid
language plpgsql
security definer
set search_path = app
as $$
declare
  v_id uuid;
begin
  insert into app.page_embeddings (page_slug, chunk_index, content, embedding, model, token_count, updated_at)
  values (p_page_slug, p_chunk_index, p_content, p_embedding, p_model, p_token_count, now())
  on conflict (page_slug, chunk_index) do update
    set content = excluded.content,
        embedding = excluded.embedding,
        model = excluded.model,
        token_count = excluded.token_count,
        updated_at = now()
  returning id into v_id;
  return v_id;
end;
$$;

revoke all on function public.upsert_page_embedding(text, int, text, extensions.vector, text, int)
  from anon, authenticated;
-- Seul service_role peut upsert (sécurité).

-- ─── Métadonnées ─────────────────────────────────────────────────────────────

comment on table app.page_embeddings is
  'RAG chatbot — embeddings 1536-dim (OpenAI text-embedding-3-small) par page/chunk. Indexé HNSW cosine.';

comment on function public.match_page_embeddings is
  'Top-k pages similaires via cosine similarity. Threshold typique : 0.7.';

comment on function public.upsert_page_embedding is
  'Upsert idempotent depuis script offline (scripts/generate-embeddings.ts). Service-role uniquement.';
