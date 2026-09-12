-- Этап 4: видео, пресса и публикации, добавленные или изменённые через панель управления.
CREATE TABLE IF NOT EXISTS site_items (
  kind TEXT NOT NULL,
  slug TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  position INTEGER NOT NULL DEFAULT 0,
  hidden BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (kind, slug)
);
