-- ============================================================================
-- Migration 001 — Extensions PostgreSQL
-- Projet : assurance-pro (courtier ORIAS YMYL)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";       -- UUIDs
CREATE EXTENSION IF NOT EXISTS "citext";          -- Case-insensitive text
CREATE EXTENSION IF NOT EXISTS "pg_trgm";         -- Fuzzy search
CREATE EXTENSION IF NOT EXISTS "unaccent";        -- Accents removal
CREATE EXTENSION IF NOT EXISTS "postgis";         -- Geo PostGIS
CREATE EXTENSION IF NOT EXISTS "vector";          -- pgvector for embeddings

-- Schémas
CREATE SCHEMA IF NOT EXISTS app;                  -- Tables métier
CREATE SCHEMA IF NOT EXISTS public_views;         -- Vues publiques zéro-PII
CREATE SCHEMA IF NOT EXISTS audit;                -- Audit logs ACPR-grade

-- Fonctions utilitaires
CREATE OR REPLACE FUNCTION public.slugify(input text) RETURNS text
LANGUAGE sql IMMUTABLE AS $$
  SELECT trim(both '-' FROM regexp_replace(
    lower(unaccent(coalesce(input, ''))),
    '[^a-z0-9]+', '-', 'g'
  ))
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END $$;

COMMENT ON SCHEMA app IS 'Tables métier (PII protégé via RLS)';
COMMENT ON SCHEMA public_views IS 'Vues publiques sans données PII';
COMMENT ON SCHEMA audit IS 'Audit trail conforme ACPR Reco 2024-R-02 + R-03';
