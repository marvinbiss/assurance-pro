-- ============================================================================
-- Migration 003 — CMS Pages étendu pour pSEO assurance pro
-- Source : ~/servicesartisans/supabase/migrations/305_cms_schema.sql
-- Adaptations : ajout colonnes assurance (intent_score, vertical, page_layer, etc.)
-- ============================================================================

-- ============================================================================
-- 1. CMS_PAGES — table cœur du pSEO 8 400 pages
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.cms_pages (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Slug et type
  slug            text NOT NULL,
  page_type       text NOT NULL CHECK (page_type IN (
    'pillar',          -- 10 piliers garanties
    'hub_metier',      -- ~50 hubs méga-métier
    'hub_geo',         -- hubs régionaux/départementaux
    'leaf',            -- feuilles métier × statut, métier × ville (rares)
    'comparator',      -- comparatifs assureurs
    'calculator',      -- calculateurs prime interactifs
    'guide',           -- guides juridiques
    'price',           -- pages prix/tarifs
    'auto_entrepreneur', -- pages spécifiques AE
    'attestation',     -- attestations / lettres types
    'jurisprudence',   -- pages jurisprudence par métier
    'static',          -- pages statiques (CGU, mentions, etc.)
    'blog',            -- articles éditoriaux
    'glossaire',       -- glossaire termes assurance
    'faq',             -- FAQ thématiques
    'auteur'           -- pages auteurs ORIAS
  )),

  -- Architecture KPMG 4 couches
  page_layer      text CHECK (page_layer IN ('A','B','C','D','utility')),

  -- Dimensions assurance (transverses)
  vertical        text CHECK (vertical IN (
    'BTP','RC_PRO','VTC_TAXI','MUTUELLE','MULTIRISQUE',
    'AVOCATS_JURIDIQUE','RESTAURATION','SANTE_MEDICAL','COMMERCE',
    'PREVOYANCE','CYBER','CONSULTANTS_FREELANCE','LOCAL_STOCK_BUREAU',
    'DIRIGEANT','FLOTTE','ECOMMERCE','GENERIQUE','UTILITY'
  )),
  garantie_code   text,
  metier_code     text REFERENCES app.metiers(code),
  statut_juridique text,
  tranche_ca      text,

  -- Contenu
  title           text NOT NULL,
  h1              text,
  content_json    jsonb,
  content_html    text,
  structured_data jsonb,                  -- Schema.org JSON-LD
  meta_title      text,
  meta_description text,
  og_image_url    text,
  canonical_url   text,
  excerpt         text,

  -- Auteur ORIAS (E-E-A-T critique)
  author_id       uuid REFERENCES app.profiles(id),
  author_name     text,
  author_bio      text,

  -- Catégorisation
  category        text,
  tags            text[] DEFAULT '{}',
  read_time       text,
  featured_image  text,
  service_slug    text,
  location_slug   text,

  -- SEO Ahrefs (mesuré)
  intent_score    smallint,                       -- 0-100
  kw_principal    text,
  kw_volume       integer,
  kw_difficulty   smallint,
  kw_cpc          numeric(6,2),
  serp_features   text[],                         -- ['AIO', 'PAA', 'LocalPack']
  ahrefs_traffic_potential integer,

  -- LLM pipeline (Claude Sonnet 4.6)
  llm_version     integer NOT NULL DEFAULT 0,
  llm_prompt_hash text,
  llm_validated_at timestamptz,
  llm_validated_by uuid REFERENCES app.profiles(id),
  llm_cross_validated boolean DEFAULT false,      -- via GPT-5

  -- Embeddings pgvector (related pages)
  embedding       vector(1536),

  -- Audit trail conformité
  audit_trail     jsonb DEFAULT '[]'::jsonb,
  data_sources    jsonb DEFAULT '{}'::jsonb,      -- {orias, legifrance, insee, aqc, ffa, tarifs_proprietaires}

  -- Status
  status          text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','queued','review','published','archived')),
  is_active       boolean NOT NULL DEFAULT true,
  noindex         boolean DEFAULT false,
  sort_order      integer DEFAULT 0,

  -- Lifecycle
  published_at    timestamptz,
  published_by    uuid REFERENCES app.profiles(id),
  last_crawled_at timestamptz,
  next_review_at  timestamptz,

  created_by      uuid REFERENCES app.profiles(id),
  updated_by      uuid REFERENCES app.profiles(id),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- 2. CONTRAINTES (héritées + ajoutées)
-- ============================================================================

-- Slug format (lowercase + tirets uniquement)
DO $$ BEGIN
  ALTER TABLE cms_pages ADD CONSTRAINT cms_pages_slug_format
    CHECK (slug ~ '^[a-z0-9]+(?:-[a-z0-9/]+)*$');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Pages publiées doivent avoir une date
DO $$ BEGIN
  ALTER TABLE cms_pages ADD CONSTRAINT cms_pages_published_has_date
    CHECK (status != 'published' OR published_at IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Pages publiées doivent avoir un auteur ORIAS (E-E-A-T)
DO $$ BEGIN
  ALTER TABLE cms_pages ADD CONSTRAINT cms_pages_published_has_author
    CHECK (status != 'published' OR author_id IS NOT NULL);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Longueurs
DO $$ BEGIN
  ALTER TABLE cms_pages ADD CONSTRAINT cms_pages_slug_length
    CHECK (length(slug) <= 200);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE cms_pages ADD CONSTRAINT cms_pages_title_length
    CHECK (length(title) <= 500);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE cms_pages ADD CONSTRAINT cms_pages_meta_title_length
    CHECK (meta_title IS NULL OR length(meta_title) <= 70);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE cms_pages ADD CONSTRAINT cms_pages_meta_description_length
    CHECK (meta_description IS NULL OR length(meta_description) <= 160);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Intent score 0-100
DO $$ BEGIN
  ALTER TABLE cms_pages ADD CONSTRAINT cms_pages_intent_range
    CHECK (intent_score IS NULL OR (intent_score BETWEEN 0 AND 100));
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================================
-- 3. INDEXES
-- ============================================================================

-- Unicité slug (par type + service + location)
CREATE UNIQUE INDEX IF NOT EXISTS cms_pages_slug_uniq
  ON public.cms_pages(slug)
  WHERE is_active = true;

-- Filtres courants
CREATE INDEX IF NOT EXISTS cms_pages_status_idx
  ON public.cms_pages(status, page_type);
CREATE INDEX IF NOT EXISTS cms_pages_vertical_idx
  ON public.cms_pages(vertical, page_layer)
  WHERE status = 'published';
CREATE INDEX IF NOT EXISTS cms_pages_metier_garantie_idx
  ON public.cms_pages(metier_code, garantie_code)
  WHERE status = 'published';
CREATE INDEX IF NOT EXISTS cms_pages_intent_idx
  ON public.cms_pages(intent_score DESC)
  WHERE status IN ('draft','queued');
CREATE INDEX IF NOT EXISTS cms_pages_published_at_idx
  ON public.cms_pages(published_at DESC)
  WHERE status = 'published';

-- Full-text search
CREATE INDEX IF NOT EXISTS cms_pages_fts_idx
  ON public.cms_pages USING gin(
    to_tsvector('french', coalesce(title,'') || ' ' || coalesce(meta_description,'') || ' ' || coalesce(excerpt,''))
  );

-- JSONB
CREATE INDEX IF NOT EXISTS cms_pages_content_gin
  ON public.cms_pages USING gin(content_json jsonb_path_ops);
CREATE INDEX IF NOT EXISTS cms_pages_data_sources_gin
  ON public.cms_pages USING gin(data_sources jsonb_path_ops);

-- pgvector (similarité related pages)
CREATE INDEX IF NOT EXISTS cms_pages_embedding_idx
  ON public.cms_pages USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- ============================================================================
-- 4. TRIGGER updated_at
-- ============================================================================
CREATE TRIGGER trg_cms_pages_updated
  BEFORE UPDATE ON public.cms_pages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 5. RLS — lecture publique uniquement pages publiées
-- ============================================================================
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_published_pages"
  ON public.cms_pages FOR SELECT
  TO anon, authenticated
  USING (status = 'published' AND is_active = true AND noindex = false);

CREATE POLICY "admin_full_access"
  ON public.cms_pages FOR ALL
  TO authenticated
  USING (
    auth.jwt() ->> 'role' IN ('admin','courtier','redacteur')
  )
  WITH CHECK (
    auth.jwt() ->> 'role' IN ('admin','courtier','redacteur')
  );

COMMENT ON TABLE public.cms_pages IS 'pSEO 8 400 pages assurance pro France — KPMG-validated';
