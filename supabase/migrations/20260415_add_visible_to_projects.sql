ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS visible boolean DEFAULT true;

UPDATE public.projects
SET visible = true
WHERE visible IS NULL;

ALTER TABLE public.projects
ALTER COLUMN visible SET DEFAULT true;
