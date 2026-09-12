-- Этап 2: изображения сайта, заменённые через панель управления.
CREATE TABLE IF NOT EXISTS content_images (
  key TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
