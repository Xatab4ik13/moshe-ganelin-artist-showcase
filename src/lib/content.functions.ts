import { createServerFn } from "@tanstack/react-start";

import type { TextOverrides } from "./i18n";

/** Публичное чтение изменённых в админке текстов. Если базы нет — сайт работает на текстах по умолчанию. */
export const getTextOverrides = createServerFn({ method: "GET" }).handler(
  async (): Promise<TextOverrides> => {
    if (!process.env["DATABASE_URL"]) return {};
    try {
      const { dbQuery } = await import("./db.server");
      const rows = await dbQuery<{ key: string; lang: string; value: string }>(
        "SELECT key, lang, value FROM content_texts",
      );
      const out: TextOverrides = {};
      for (const row of rows) {
        const entry = out[row.key] ?? {};
        entry[row.lang as "en" | "es" | "pt"] = row.value;
        out[row.key] = entry;
      }
      return out;
    } catch (error) {
      console.error("getTextOverrides failed", error);
      return {};
    }
  },
);
