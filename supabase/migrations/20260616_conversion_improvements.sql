-- Contact messages for lead capture
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous contact insert" ON contact_messages;
CREATE POLICY "Allow anonymous contact insert" ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can read contact messages" ON contact_messages;
CREATE POLICY "Authenticated users can read contact messages" ON contact_messages
  FOR SELECT TO authenticated
  USING (true);

-- Case study fields for projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenge text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS results text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS metrics jsonb DEFAULT '[]'::jsonb;

CREATE UNIQUE INDEX IF NOT EXISTS projects_slug_unique ON projects (slug) WHERE slug IS NOT NULL;

-- Blog slugs for shareable URLs
ALTER TABLE blogs ADD COLUMN IF NOT EXISTS slug text;

CREATE UNIQUE INDEX IF NOT EXISTS blogs_slug_unique ON blogs (slug) WHERE slug IS NOT NULL;
