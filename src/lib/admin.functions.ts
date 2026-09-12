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
