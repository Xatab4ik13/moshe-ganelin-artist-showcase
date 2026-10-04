-- Программа, билеты и переводы описания концерта (EN/ES/POR).
ALTER TABLE concerts ADD COLUMN IF NOT EXISTS extra JSONB NOT NULL DEFAULT '{}'::jsonb;
