import { createServerFn } from "@tanstack/react-start";

import { adminFieldKeys } from "./admin-fields";
import { dict, type Lang } from "./i18n";

export type AdminStatus = {
  ready: boolean;
  reason?: string;
  email: string | null;
};

/** Статус: настроена ли база/секрет и выполнен ли вход. */
export const adminStatus = createServerFn({ method: "GET" }).handler(async (): Promise<AdminStatus> => {
  if (!process.env["DATABASE_URL"]) {
    return { ready: false, reason: "База данных не подключена (нет DATABASE_URL на сервере).", email: null };
  }
  const secret = process.env["SESSION_SECRET"];
  if (!secret || secret.length < 32) {
    return { ready: false, reason: "Не задан SESSION_SECRET на сервере (строка от 32 символов).", email: null };
  }
  try {
    const { getAdminSession } = await import("./admin-auth.server");
    const session = await getAdminSession();
    return { ready: true, email: session.data.email ?? null };
  } catch (error) {
    console.error("adminStatus failed", error);
    return { ready: false, reason: "Не удалось прочитать сессию.", email: null };
  }
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    const { findAdminByEmail, verifyPassword, getAdminSession } = await import("./admin-auth.server");
    try {
      const user = await findAdminByEmail(data.email.trim());
      if (!user || !verifyPassword(data.password, user.password_hash)) {
        return { ok: false, error: "Неверная почта или пароль." };
      }
      const session = await getAdminSession();
      await session.update({ userId: user.id, email: user.email });
      return { ok: true };
    } catch (error) {
      console.error("adminLogin failed", error);
      return { ok: false, error: "Сервер не смог обработать вход. Проверьте подключение базы данных." };
    }
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { getAdminSession } = await import("./admin-auth.server");
  const session = await getAdminSession();
  await session.clear();
  return { ok: true as const };
});

export type AdminTextRow = {
  key: string;
  defaults: Record<Lang, string>;
  values: Partial<Record<Lang, string>>;
};

/** Тексты для формы: значения по умолчанию (как сейчас на сайте) + сохранённые правки. */
export const adminGetTexts = createServerFn({ method: "GET" }).handler(async (): Promise<AdminTextRow[]> => {
  const { requireAdmin } = await import("./admin-auth.server");
  const { dbQuery } = await import("./db.server");
  await requireAdmin();

  const rows = await dbQuery<{ key: string; lang: string; value: string }>(
    "SELECT key, lang, value FROM content_texts",
  );
  const saved = new Map<string, Partial<Record<Lang, string>>>();
  for (const row of rows) {
    const entry = saved.get(row.key) ?? {};
    entry[row.lang as Lang] = row.value;
    saved.set(row.key, entry);
  }

  return adminFieldKeys.map((key) => ({
    key,
    defaults: {
      en: dict.en[key as keyof typeof dict.en],
      es: dict.es[key as keyof typeof dict.es],
      pt: dict.pt[key as keyof typeof dict.pt],
    },
    values: saved.get(key) ?? {},
  }));
});

export const adminSaveText = createServerFn({ method: "POST" })
  .inputValidator((data: { key: string; lang: Lang; value: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { dbQuery } = await import("./db.server");
    await requireAdmin();

    if (!adminFieldKeys.includes(data.key)) {
      throw new Error("Неизвестное поле.");
    }
    const value = data.value.trim();
    if (value.length === 0) {
      await dbQuery("DELETE FROM content_texts WHERE key = $1 AND lang = $2", [data.key, data.lang]);
      return { ok: true as const, reset: true as const };
    }
    await dbQuery(
      `INSERT INTO content_texts (key, lang, value) VALUES ($1, $2, $3)
       ON CONFLICT (key, lang) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
      [data.key, data.lang, value],
    );
    return { ok: true as const, reset: false as const };
  });

export const adminChangePassword = createServerFn({ method: "POST" })
  .inputValidator((data: { current: string; next: string }) => data)
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    const { requireAdmin, findAdminByEmail, verifyPassword, hashPassword } = await import(
      "./admin-auth.server"
    );
    const { dbQuery } = await import("./db.server");
    const admin = await requireAdmin();

    if (data.next.length < 8) {
      return { ok: false, error: "Новый пароль должен быть не короче 8 символов." };
    }
    const user = await findAdminByEmail(admin.email);
    if (!user || !verifyPassword(data.current, user.password_hash)) {
      return { ok: false, error: "Текущий пароль указан неверно." };
    }
    await dbQuery("UPDATE admin_users SET password_hash = $1 WHERE id = $2", [
      hashPassword(data.next),
      user.id,
    ]);
    return { ok: true };
  });

export type AdminImageRow = { key: string; url: string | null };

/** Список заменённых изображений (ключ -> адрес файла на сервере). */
export const adminGetImages = createServerFn({ method: "GET" }).handler(async (): Promise<AdminImageRow[]> => {
  const { requireAdmin } = await import("./admin-auth.server");
  const { dbQuery } = await import("./db.server");
  await requireAdmin();
  const rows = await dbQuery<{ key: string; url: string }>("SELECT key, url FROM content_images");
  return rows.map((row) => ({ key: row.key, url: row.url }));
});

export const adminUploadImage = createServerFn({ method: "POST" })
  .inputValidator((data: { key: string; filename: string; contentType: string; base64: string }) => data)
  .handler(async ({ data }): Promise<{ ok: boolean; url?: string; error?: string }> => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { dbQuery } = await import("./db.server");
    const { imageKeys } = await import("./site-images");
    const { extensionFor, saveUpload } = await import("./uploads.server");
    await requireAdmin();

    if (!imageKeys.includes(data.key)) return { ok: false, error: "Неизвестное изображение." };
    const extension = extensionFor(data.contentType, data.filename);
    if (!extension) return { ok: false, error: "Подойдут файлы JPG, PNG, WebP, GIF, AVIF или SVG." };

    const buffer = Buffer.from(data.base64, "base64");
    if (buffer.length === 0) return { ok: false, error: "Файл пустой." };
    if (buffer.length > 12 * 1024 * 1024) return { ok: false, error: "Файл больше 12 МБ. Уменьшите его." };

    const url = await saveUpload(data.key, buffer, extension);
    await dbQuery(
      `INSERT INTO content_images (key, url) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET url = EXCLUDED.url, updated_at = now()`,
      [data.key, url],
    );
    return { ok: true, url };
  });

export const adminResetImage = createServerFn({ method: "POST" })
  .inputValidator((data: { key: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { dbQuery } = await import("./db.server");
    await requireAdmin();
    await dbQuery("DELETE FROM content_images WHERE key = $1", [data.key]);
    return { ok: true as const };
  });

export type AdminConcertInput = {
  slug: string;
  originalSlug?: string;
  kind: "upcoming" | "archive";
  day: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  title: string;
  description: string;
  videoId: string;
  image: string;
  position: number;
  hidden: boolean;
};

/** Список концертов для панели: исходные концерты сайта + правки и новые записи. */
export const adminGetConcerts = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("./admin-auth.server");
  const { dbQuery } = await import("./db.server");
  const { concertsSelect, rowToOverride } = await import("./concerts.functions");
  await requireAdmin();
  const rows = await dbQuery<Record<string, never>>(concertsSelect);
  return rows.map((row) => rowToOverride(row as never));
});

export const adminSaveConcert = createServerFn({ method: "POST" })
  .inputValidator((data: AdminConcertInput) => data)
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string; slug?: string }> => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { dbQuery } = await import("./db.server");
    await requireAdmin();

    const slug = data.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (slug.length < 3) return { ok: false, error: "Не удалось составить адрес страницы концерта." };
    if (data.title.trim().length === 0) return { ok: false, error: "Впишите название концерта." };

    if (data.originalSlug && data.originalSlug !== slug) {
      await dbQuery("DELETE FROM concerts WHERE slug = $1", [data.originalSlug]);
    }

    await dbQuery(
      `INSERT INTO concerts (slug, kind, day, month, year, city, venue, title, description, video_id, image_url, position, hidden)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       ON CONFLICT (slug) DO UPDATE SET kind = EXCLUDED.kind, day = EXCLUDED.day, month = EXCLUDED.month,
         year = EXCLUDED.year, city = EXCLUDED.city, venue = EXCLUDED.venue, title = EXCLUDED.title,
         description = EXCLUDED.description, video_id = EXCLUDED.video_id, image_url = EXCLUDED.image_url,
         position = EXCLUDED.position,
         hidden = EXCLUDED.hidden, updated_at = now()`,
      [
        slug,
        data.kind === "archive" ? "archive" : "upcoming",
        data.day.trim(),
        data.month.trim(),
        data.year.trim(),
        data.city.trim(),
        data.venue.trim(),
        data.title.trim(),
        data.description.trim(),
        data.videoId.trim(),
        (data.image ?? "").trim(),
        Number.isFinite(data.position) ? data.position : 0,
        Boolean(data.hidden),
      ],
    );
    return { ok: true, slug };
  });

/** Скрыть исходный концерт сайта или полностью удалить добавленный. */
export const adminDeleteConcert = createServerFn({ method: "POST" })
  .inputValidator((data: { slug: string; isDefault: boolean }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { dbQuery } = await import("./db.server");
    await requireAdmin();
    if (data.isDefault) {
      await dbQuery(
        `INSERT INTO concerts (slug, hidden) VALUES ($1, true)
         ON CONFLICT (slug) DO UPDATE SET hidden = true, updated_at = now()`,
        [data.slug],
      );
    } else {
      await dbQuery("DELETE FROM concerts WHERE slug = $1", [data.slug]);
    }
    return { ok: true as const };
  });

/** Вернуть исходный концерт сайта (снять скрытие и правки). */
export const adminResetConcert = createServerFn({ method: "POST" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { dbQuery } = await import("./db.server");
    await requireAdmin();
    await dbQuery("DELETE FROM concerts WHERE slug = $1", [data.slug]);
    return { ok: true as const };
  });

export type AdminItemInput = {
  kind: "video" | "press" | "publication";
  slug: string;
  originalSlug?: string;
  data: Record<string, string>;
  position: number;
};

/** Записи разделов «Видео», «Пресса» и «Публикации» из базы. */
export const adminGetItems = createServerFn({ method: "GET" }).handler(async () => {
  const { requireAdmin } = await import("./admin-auth.server");
  const { dbQuery } = await import("./db.server");
  const { itemsSelect, rowToItem } = await import("./items.functions");
  await requireAdmin();
  const rows = await dbQuery<Record<string, never>>(itemsSelect);
  return rows.map((row) => rowToItem(row as never));
});

export const adminSaveItem = createServerFn({ method: "POST" })
  .inputValidator((data: AdminItemInput) => data)
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string; slug?: string }> => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { dbQuery } = await import("./db.server");
    await requireAdmin();

    const slug = data.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
    if (slug.length < 2) return { ok: false, error: "Не удалось составить адрес записи." };

    const clean: Record<string, string> = {};
    for (const [key, value] of Object.entries(data.data)) {
      clean[key] = typeof value === "string" ? value.trim() : "";
    }

    if (data.originalSlug && data.originalSlug !== slug) {
      await dbQuery("DELETE FROM site_items WHERE kind = $1 AND slug = $2", [data.kind, data.originalSlug]);
    }

    await dbQuery(
      `INSERT INTO site_items (kind, slug, data, position, hidden)
       VALUES ($1, $2, $3::jsonb, $4, false)
       ON CONFLICT (kind, slug) DO UPDATE SET data = EXCLUDED.data, position = EXCLUDED.position,
         hidden = false, updated_at = now()`,
      [data.kind, slug, JSON.stringify(clean), Number.isFinite(data.position) ? data.position : 0],
    );
    return { ok: true, slug };
  });

/** Скрыть исходную запись сайта или удалить добавленную. */
export const adminDeleteItem = createServerFn({ method: "POST" })
  .inputValidator((data: { kind: string; slug: string; isDefault: boolean }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { dbQuery } = await import("./db.server");
    await requireAdmin();
    if (data.isDefault) {
      await dbQuery(
        `INSERT INTO site_items (kind, slug, hidden) VALUES ($1, $2, true)
         ON CONFLICT (kind, slug) DO UPDATE SET hidden = true, updated_at = now()`,
        [data.kind, data.slug],
      );
    } else {
      await dbQuery("DELETE FROM site_items WHERE kind = $1 AND slug = $2", [data.kind, data.slug]);
    }
    return { ok: true as const };
  });

/** Вернуть исходную запись сайта (снять скрытие и правки). */
export const adminResetItem = createServerFn({ method: "POST" })
  .inputValidator((data: { kind: string; slug: string }) => data)
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { dbQuery } = await import("./db.server");
    await requireAdmin();
    await dbQuery("DELETE FROM site_items WHERE kind = $1 AND slug = $2", [data.kind, data.slug]);
    return { ok: true as const };
  });

/** Загрузка произвольной фотографии (например, для концерта). Возвращает адрес файла. */
export const adminUploadFile = createServerFn({ method: "POST" })
  .inputValidator((data: { prefix: string; filename: string; contentType: string; base64: string }) => data)
  .handler(async ({ data }): Promise<{ ok: boolean; url?: string; error?: string }> => {
    const { requireAdmin } = await import("./admin-auth.server");
    const { extensionFor, saveUpload } = await import("./uploads.server");
    await requireAdmin();

    const extension = extensionFor(data.contentType, data.filename);
    if (!extension) return { ok: false, error: "Подойдут файлы JPG, PNG, WebP, GIF, AVIF или SVG." };
    const buffer = Buffer.from(data.base64, "base64");
    if (buffer.length === 0) return { ok: false, error: "Файл пустой." };
    if (buffer.length > 12 * 1024 * 1024) return { ok: false, error: "Файл больше 12 МБ. Уменьшите его." };

    const url = await saveUpload(data.prefix || "file", buffer, extension);
    return { ok: true, url };
  });
