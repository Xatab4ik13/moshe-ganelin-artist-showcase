import { createServerFn } from "@tanstack/react-start";

import type { ConcertOverride } from "./site-concerts";

type Row = {
  slug: string;
  kind: string;
  day: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  title: string;
  description: string;
  video_id: string;
  image_url: string;
  extra: Record<string, unknown> | string | null;
  position: number;
  hidden: boolean;
};

function parseExtra(raw: Row["extra"]): Record<string, string> {
  const value = typeof raw === "string" ? JSON.parse(raw) : (raw ?? {});
  const out: Record<string, string> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    out[key] = typeof item === "string" ? item : String(item ?? "");
  }
  return out;
}

export function rowToOverride(row: Row): ConcertOverride {
  return {
    slug: row.slug,
    kind: row.kind === "archive" ? "archive" : "upcoming",
    day: row.day,
    month: row.month,
    year: row.year,
    city: row.city,
    venue: row.venue,
    title: row.title,
    description: row.description,
    videoId: row.video_id,
    image: row.image_url ?? "",
    extra: parseExtra(row.extra),
    position: row.position,
    hidden: row.hidden,
  };
}

export const concertsSelect =
  "SELECT slug, kind, day, month, year, city, venue, title, description, video_id, image_url, extra, position, hidden FROM concerts ORDER BY position, slug";

/** Публичное чтение концертов из панели. Без базы сайт показывает исходный список. */
export const getConcertOverrides = createServerFn({ method: "GET" }).handler(
  async (): Promise<ConcertOverride[]> => {
    if (!process.env["DATABASE_URL"]) return [];
    try {
      const { dbQuery } = await import("./db.server");
      const rows = await dbQuery<Row>(concertsSelect);
      return rows.map(rowToOverride);
    } catch (error) {
      console.error("getConcertOverrides failed", error);
      return [];
    }
  },
);
