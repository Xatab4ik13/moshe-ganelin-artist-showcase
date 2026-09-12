-- Этап 3: концерты, добавленные или изменённые через панель управления.
CREATE TABLE IF NOT EXISTS concerts (
  slug TEXT PRIMARY KEY,
  kind TEXT NOT NULL DEFAULT 'upcoming',
  day TEXT NOT NULL DEFAULT '',
  month TEXT NOT NULL DEFAULT '',
  year TEXT NOT NULL DEFAULT '',
  city TEXT NOT NULL DEFAULT '',
  venue TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  video_id TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0,
  hidden BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
