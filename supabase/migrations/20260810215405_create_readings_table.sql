/*
# Create readings table for Ayni Shamanic Life Journey

1. New Tables
- `readings`
  - `id` (uuid, primary key)
  - `mode` (text: 'individual' | 'couple') — whether this is a single-person or couple reading
  - `payload` (jsonb) — the full input payload (birth profiles, journal entries, question)
  - `result` (jsonb) — the Ayni engine's structured diagnostic output (metrics, shadow diagnosis, myth, prescription)
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `readings`.
- Single-tenant app with no sign-in: allow anon + authenticated full CRUD so the anon-key frontend can read/write its own readings.
*/

CREATE TABLE IF NOT EXISTS readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  mode text NOT NULL CHECK (mode IN ('individual', 'couple')),
  payload jsonb NOT NULL,
  result jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_readings" ON readings;
CREATE POLICY "anon_select_readings"
ON readings FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_readings" ON readings;
CREATE POLICY "anon_insert_readings"
ON readings FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_readings" ON readings;
CREATE POLICY "anon_update_readings"
ON readings FOR UPDATE
TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_readings" ON readings;
CREATE POLICY "anon_delete_readings"
ON readings FOR DELETE
TO anon, authenticated USING (true);
