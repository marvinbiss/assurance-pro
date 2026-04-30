-- ============================================================================
-- Migration 002 — Core V3 adapté pour assurance pro
-- Source : ~/servicesartisans/supabase/migrations/110_v3_full_schema.sql
-- Adaptations : artisans → insurance_partners, services → garanties_assurance
-- ============================================================================

-- ============================================================================
-- 1. PROFILES (utilisateurs)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.profiles (
  id            uuid PRIMARY KEY,
  role          text NOT NULL DEFAULT 'client'
                CHECK (role IN ('admin','courtier','redacteur','support','client','partner_insurer')),
  email         citext,
  phone_e164    text,
  full_name     text,
  avatar_url    text,
  -- Spécifique courtier
  orias_number  text,
  is_orias_certified boolean DEFAULT false,
  bio_short     text,
  bio_full      text,
  linkedin_url  text,
  credentials   jsonb DEFAULT '{}'::jsonb,
  -- Onboarding
  onboarding_completed_at timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_uniq
  ON app.profiles(email) WHERE email IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_phone_uniq
  ON app.profiles(phone_e164) WHERE phone_e164 IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS profiles_orias_uniq
  ON app.profiles(orias_number) WHERE orias_number IS NOT NULL;

CREATE TRIGGER trg_profiles_updated
  BEFORE UPDATE ON app.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 2. CITIES (~36k communes FR — réutilisé tel quel)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.cities (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  slug          text NOT NULL UNIQUE,
  postal_code   text NOT NULL,
  department    text NOT NULL,
  region        text,
  latitude      double precision,
  longitude     double precision,
  geo           geography(Point, 4326),
  population    integer,
  insee_code    text UNIQUE,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS cities_dept_idx ON app.cities(department);
CREATE INDEX IF NOT EXISTS cities_geo_gist ON app.cities USING gist(geo);
CREATE INDEX IF NOT EXISTS cities_name_idx ON app.cities USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS cities_pop_idx ON app.cities(population DESC);

-- ============================================================================
-- 3. METIERS (référentiel métiers — étendu vs services ServicesArtisans)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.metiers (
  code          text PRIMARY KEY,                -- 'plombier', 'electricien'
  name          text NOT NULL,
  slug          text NOT NULL UNIQUE,
  vertical      text NOT NULL CHECK (vertical IN (
    'BTP','RC_PRO','VTC_TAXI','MUTUELLE','MULTIRISQUE',
    'AVOCATS_JURIDIQUE','RESTAURATION','SANTE_MEDICAL','COMMERCE',
    'PREVOYANCE','CYBER','CONSULTANTS_FREELANCE','LOCAL_STOCK_BUREAU',
    'DIRIGEANT','FLOTTE','ECOMMERCE','GENERIQUE'
  )),
  parent_code   text REFERENCES app.metiers(code),  -- sub-métier
  naf_codes     text[] DEFAULT '{}',
  description   text,
  risque_niveau smallint CHECK (risque_niveau BETWEEN 1 AND 5),
  panier_moyen_eur numeric(10,2),
  obligation_decennale boolean DEFAULT false,
  is_active     boolean NOT NULL DEFAULT true,
  sort_order    integer DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS metiers_vertical_idx ON app.metiers(vertical);
CREATE INDEX IF NOT EXISTS metiers_parent_idx ON app.metiers(parent_code);
CREATE INDEX IF NOT EXISTS metiers_naf_gin ON app.metiers USING gin(naf_codes);

-- ============================================================================
-- 4. INSURANCE_PARTNERS (assureurs — adapté de artisans)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.insurance_partners (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code            text NOT NULL UNIQUE,           -- 'hiscox', 'april'
  name            text NOT NULL,
  slug            text NOT NULL UNIQUE,
  legal_name      text,
  siret           text,

  -- Statut
  is_active       boolean NOT NULL DEFAULT true,
  acpr_agrement   text,
  orias_number    text,

  -- Contact API tarifeur
  api_endpoint    text,
  api_key_secret  text,                          -- Vault reference
  webhook_url     text,

  -- Couverture
  metiers_couverts text[] DEFAULT '{}',
  garanties_couvertes text[] DEFAULT '{}',
  zones_intervention text[] DEFAULT '{}',
  ca_min          numeric(12,2),
  ca_max          numeric(12,2),

  -- Réputation
  solidity_score  numeric(3,1),                  -- via Pappers
  partner_priority smallint NOT NULL DEFAULT 100,

  -- Commercial
  commission_y1_pct numeric(4,2),
  commission_recurring_pct numeric(4,2),

  -- Metadata
  logo_url        text,
  website         text,
  contact_email   text,
  contact_phone   text,

  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS partners_active_idx ON app.insurance_partners(is_active, partner_priority);
CREATE INDEX IF NOT EXISTS partners_metiers_gin ON app.insurance_partners USING gin(metiers_couverts);
CREATE INDEX IF NOT EXISTS partners_garanties_gin ON app.insurance_partners USING gin(garanties_couvertes);

CREATE TRIGGER trg_partners_updated
  BEFORE UPDATE ON app.insurance_partners
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 5. NOTIFICATIONS (in-app — réutilisé ServicesArtisans)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.notifications (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id  uuid NOT NULL REFERENCES app.profiles(id) ON DELETE CASCADE,
  type          text NOT NULL,
  title         text NOT NULL,
  body          text,
  data          jsonb DEFAULT '{}'::jsonb,
  priority      smallint DEFAULT 0,             -- 0=normal, 1=high, 2=urgent
  read_at       timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS notif_recipient_unread
  ON app.notifications(recipient_id, created_at DESC)
  WHERE read_at IS NULL;

-- ============================================================================
-- 6. CONTACT_SUPPRESSIONS (opt-out RGPD — réutilisé)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.contact_suppressions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         citext,
  phone_e164    text,
  channel       text NOT NULL CHECK (channel IN ('email','sms','whatsapp','phone')),
  reason        text,
  bloctel_check boolean DEFAULT false,
  suppressed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (email, channel),
  UNIQUE (phone_e164, channel)
);

CREATE INDEX IF NOT EXISTS suppressions_email_idx ON app.contact_suppressions(email);
CREATE INDEX IF NOT EXISTS suppressions_phone_idx ON app.contact_suppressions(phone_e164);

-- ============================================================================
-- 7. EVENTS (audit trail partitionné — CRITIQUE ACPR)
-- ============================================================================
CREATE TABLE IF NOT EXISTS app.events (
  id            uuid NOT NULL DEFAULT gen_random_uuid(),
  actor_id      uuid,
  entity_type   text NOT NULL,
  entity_id     uuid,
  event_type    text NOT NULL,
  metadata      jsonb DEFAULT '{}'::jsonb,
  ip_address    inet,
  user_agent    text,
  created_at    timestamptz NOT NULL DEFAULT now()
) PARTITION BY RANGE (created_at);

-- Partitions 2026 (ajuster selon mois courant)
CREATE TABLE IF NOT EXISTS app.events_2026_05
  PARTITION OF app.events FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
CREATE TABLE IF NOT EXISTS app.events_2026_06
  PARTITION OF app.events FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE TABLE IF NOT EXISTS app.events_2026_07
  PARTITION OF app.events FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE IF NOT EXISTS app.events_2026_08
  PARTITION OF app.events FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
CREATE TABLE IF NOT EXISTS app.events_2026_09
  PARTITION OF app.events FOR VALUES FROM ('2026-09-01') TO ('2026-10-01');
CREATE TABLE IF NOT EXISTS app.events_2026_10
  PARTITION OF app.events FOR VALUES FROM ('2026-10-01') TO ('2026-11-01');

CREATE INDEX IF NOT EXISTS events_actor_idx ON app.events(actor_id, created_at DESC);
CREATE INDEX IF NOT EXISTS events_entity_idx ON app.events(entity_type, entity_id);

COMMENT ON TABLE app.events IS 'Audit trail conforme Reco ACPR 2024-R-02 (réclamations) et 2024-R-03 (devoir de conseil)';
