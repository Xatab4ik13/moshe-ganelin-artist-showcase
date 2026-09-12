import { createServerFn } from "@tanstack/react-start";

import type { ItemKind, ItemOverride } from "./site-items";

type Row = {
  kind: string;
  slug: string;
  data: Record<string, string> | string | null;
  position: number;
  hidden: boolean;
};

export const itemsSelect = "SELECT kind, slug, data, position, hidden FROM site_items ORDER BY position, slug";

export function rowToItem(row: Row): ItemOverride {
  const raw = typeof row.data === "string" ? JSON.parse(row.data) : (row.data ?? {});
  const data: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    data[key] = typeof value === "string" ? value : String(value ?? "");
  }
  return {
    kind: row.kind as ItemKind,
    slug: row.slug,
    data,
    position: row.position,
    hidden: row.hidden,
  };
}

/** Публичное чтение записей панели. Без базы сайт показывает исходное содержимое. */
export const getItemOverrides = createServerFn({ method: "GET" }).handler(
  async (): Promise<ItemOverride[]> => {
    if (!process.env["DATABASE_URL"]) return [];
    try {
      const { dbQuery } = await import("./db.server");
      const rows = await dbQuery<Row>(itemsSelect);
      return rows.map(rowToItem);
    } catch (error) {
      console.error("getItemOverrides failed", error);
      return [];
    }
  },
);
