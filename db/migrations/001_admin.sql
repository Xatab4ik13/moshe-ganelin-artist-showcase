-- Этап 1: пользователь админки и тексты сайта.
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS content_texts (
  key TEXT NOT NULL,
  lang TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (key, lang)
);

-- Логин: moshearielganelin@gmail.com / Qwerty123!  (пароль меняется в панели)
INSERT INTO admin_users (email, password_hash)
VALUES (
  'moshearielganelin@gmail.com',
  'scrypt$a625285229674eebdfd08826d18c9b65$2b06fe263d32d4c10a759ab9b0507560a9ec67b19dd45ee35d03209797d312e95e8d81dceba4156b9b95b94009346247c283379ac5787dc417cb4cafc46b6c1e'
)
ON CONFLICT (email) DO NOTHING;
