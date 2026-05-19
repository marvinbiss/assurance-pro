-- ─────────────────────────────────────────────────────────────────────────
-- Migration 024 — Pipeline nurture warm leads pré-ORIAS
-- ─────────────────────────────────────────────────────────────────────────
-- Ajoute colonnes nurture_step (1-3) + nurture_last_sent_at à
-- newsletter_subscribers pour pipeline 3 emails séquencé J+1 / J+7 / J+14.
--
-- Trigger : cron /api/cron/nurture-emails quotidien (9h UTC).
-- ─────────────────────────────────────────────────────────────────────────

ALTER TABLE newsletter_subscribers
  ADD COLUMN IF NOT EXISTS nurture_step smallint
    CHECK (nurture_step IS NULL OR nurture_step BETWEEN 0 AND 3),
  ADD COLUMN IF NOT EXISTS nurture_last_sent_at timestamptz;

-- Index pour requête cron quotidien
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_nurture_pending
  ON newsletter_subscribers (consent_at)
  WHERE source LIKE 'preinscription_pre_orias%'
    AND status = 'pending'
    AND (nurture_step IS NULL OR nurture_step < 3);

COMMENT ON COLUMN newsletter_subscribers.nurture_step IS
  'Étape séquence nurture pré-ORIAS : NULL/0=pas encore envoyé, 1=J+1 envoyé, 2=J+7 envoyé, 3=J+14 envoyé (terminé)';

COMMENT ON COLUMN newsletter_subscribers.nurture_last_sent_at IS
  'Timestamp dernier email nurture envoyé (anti-double-fire 23h minimum)';
