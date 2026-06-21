-- Partners / Trusted By section
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  logo_url text NOT NULL,
  website_url text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS partners_display_order_idx ON partners (display_order);
CREATE INDEX IF NOT EXISTS partners_is_active_idx ON partners (is_active);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active partners" ON partners;
CREATE POLICY "Public can read active partners" ON partners
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "Authenticated users can read all partners" ON partners;
CREATE POLICY "Authenticated users can read all partners" ON partners
  FOR SELECT TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert partners" ON partners;
CREATE POLICY "Authenticated users can insert partners" ON partners
  FOR INSERT TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update partners" ON partners;
CREATE POLICY "Authenticated users can update partners" ON partners
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete partners" ON partners;
CREATE POLICY "Authenticated users can delete partners" ON partners
  FOR DELETE TO authenticated
  USING (true);

-- Partner logo storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('partner-logos', 'partner-logos', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read partner logos" ON storage.objects;
CREATE POLICY "Public read partner logos" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'partner-logos');

DROP POLICY IF EXISTS "Authenticated upload partner logos" ON storage.objects;
CREATE POLICY "Authenticated upload partner logos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'partner-logos');

DROP POLICY IF EXISTS "Authenticated update partner logos" ON storage.objects;
CREATE POLICY "Authenticated update partner logos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'partner-logos');

DROP POLICY IF EXISTS "Authenticated delete partner logos" ON storage.objects;
CREATE POLICY "Authenticated delete partner logos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'partner-logos');
