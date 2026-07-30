-- NEO Gents affiliate schema for Neon PostgreSQL

CREATE TABLE IF NOT EXISTS affiliates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  how TEXT,
  referral_code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  payout_method TEXT,
  payout_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clicks (
  id TEXT PRIMARY KEY,
  affiliate_id TEXT NOT NULL,
  referral_code TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  to_tag TEXT,
  landing TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT fk_clicks_affiliate FOREIGN KEY (affiliate_id) REFERENCES affiliates(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS conversions (
  id TEXT PRIMARY KEY,
  affiliate_id TEXT NOT NULL,
  referral_code TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  plan TEXT NOT NULL,
  commission INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at TIMESTAMPTZ,
  CONSTRAINT fk_conversions_affiliate FOREIGN KEY (affiliate_id) REFERENCES affiliates(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_affiliates_email ON affiliates(email);
CREATE INDEX IF NOT EXISTS idx_affiliates_code ON affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_clicks_affiliate ON clicks(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_conversions_affiliate ON conversions(affiliate_id);
