import { createContext, useContext, type ReactNode } from "react";

import { archiveConcerts, upcomingConcerts, type Concert } from "./site-data";

export type ConcertKind = "upcoming" | "archive";

/** Запись концерта из панели управления. Пустые поля означают «оставить как было». */
export type ConcertOverride = {
  slug: string;
  kind: ConcertKind;
  day: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  title: string;
  description: string;
  videoId: string;
  position: number;
  hidden: boolean;
};

export type SiteConcert = {
  slug: string;
  day: string;
  month: string;
  year: string;
  city: string;
  venue: string;
  title: string;
  kind: ConcertKind;
  description?: string | undefined;
  videoId?: string | undefined;
  isDefault: boolean;
};

export type ConcertsData = {
  upcoming: SiteConcert[];
  archive: SiteConcert[];
  all: SiteConcert[];
};

function withDefaults(list: Concert[], kind: ConcertKind): SiteConcert[] {
  return list.map((concert) => ({
    slug: concert.slug,
    day: concert.day,
    month: concert.month,
    year: concert.year,
    city: concert.city,
    venue: concert.venue,
    title: concert.title,
    videoId: concert.videoId,
    kind,
    isDefault: true,
  }));
}

export const defaultConcerts: SiteConcert[] = [
  ...withDefaults(upcomingConcerts, "upcoming"),
  ...withDefaults(archiveConcerts, "archive"),
];

function pick(custom: string | undefined, fallback: string | undefined): string {
  const value = (custom ?? "").trim();
  return value.length > 0 ? value : (fallback ?? "");
}

/** Склеивает исходные концерты сайта с правками и новыми записями из панели. */
export function mergeConcerts(overrides: ConcertOverride[] = []): ConcertsData {
  const byslug = new Map(overrides.map((row) => [row.slug, row]));
  const merged: SiteConcert[] = [];

  for (const base of defaultConcerts) {
    const row = byslug.get(base.slug);
    byslug.delete(base.slug);
    if (row?.hidden) continue;
    merged.push({
      slug: base.slug,
      kind: row?.kind ?? base.kind,
      day: pick(row?.day, base.day),
      month: pick(row?.month, base.month),
      year: pick(row?.year, base.year),
      city: pick(row?.city, base.city),
      venue: pick(row?.venue, base.venue),
      title: pick(row?.title, base.title),
      description: pick(row?.description, base.description) || undefined,
      videoId: pick(row?.videoId, base.videoId) || undefined,
      isDefault: true,
    });
  }

  for (const row of byslug.values()) {
    if (row.hidden) continue;
    merged.push({
      slug: row.slug,
      kind: row.kind,
      day: row.day,
      month: row.month,
      year: row.year,
      city: row.city,
      venue: row.venue,
      title: row.title,
      description: row.description,
      videoId: row.videoId || undefined,
      isDefault: false,
    });
  }

  const upcoming = merged.filter((item) => item.kind === "upcoming");
  const archive = merged.filter((item) => item.kind === "archive");
  return { upcoming, archive, all: [...upcoming, ...archive] };
}

const ConcertsContext = createContext<ConcertOverride[]>([]);

export function ConcertsProvider({
  overrides,
  children,
}: {
  overrides?: ConcertOverride[];
  children: ReactNode;
}) {
  return <ConcertsContext.Provider value={overrides ?? []}>{children}</ConcertsContext.Provider>;
}

export function useConcerts(): ConcertsData {
  return mergeConcerts(useContext(ConcertsContext));
}

export function useConcert(slug: string): SiteConcert | undefined {
  return useConcerts().all.find((concert) => concert.slug === slug);
}

/** Простой адрес страницы концерта из названия и даты. */
export function makeConcertSlug(input: { title: string; city: string; day: string; month: string; year: string }): string {
  const raw = `${input.month}-${input.day}-${input.year}-${input.city || input.title}`;
  const slug = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.length > 2 ? slug : `concert-${Date.now()}`;
}
