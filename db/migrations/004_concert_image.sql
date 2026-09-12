-- Этап 3.1: собственная фотография для каждого концерта.
ALTER TABLE concerts ADD COLUMN IF NOT EXISTS image_url TEXT NOT NULL DEFAULT '';
