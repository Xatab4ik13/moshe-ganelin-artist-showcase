import { createContext, useContext, type ReactNode } from "react";

import { pressItems, publications, videos } from "./site-data";

export type ItemKind = "video" | "press" | "publication";

/** Запись из панели управления. Пустое значение поля означает «оставить как на сайте». */
export type ItemOverride = {
  kind: ItemKind;
  slug: string;
  data: Record<string, string>;
  position: number;
  hidden: boolean;
};

export type SiteItem = {
  kind: ItemKind;
  slug: string;
  data: Record<string, string>;
  isDefault: boolean;
};

function defaults(kind: ItemKind): SiteItem[] {
  if (kind === "video") {
    return videos.map((video) => ({
      kind,
      slug: video.id,
      data: { videoId: video.id, title: video.title, description: video.description ?? "" },
      isDefault: true,
    }));
  }
  if (kind === "press") {
    return pressItems.map((item) => ({
      kind,
      slug: item.slug,
      data: { outlet: item.outlet, title: item.title, date: item.date, quote: item.quote, url: "" },
      isDefault: true,
    }));
  }
  return publications.map((item, index) => ({
    kind,
    slug: `publication-${index + 1}`,
    data: { title: item.title, source: item.source, year: item.year },
    isDefault: true,
  }));
}

export const defaultItems: Record<ItemKind, SiteItem[]> = {
  video: defaults("video"),
  press: defaults("press"),
  publication: defaults("publication"),
};

function merge(kind: ItemKind, overrides: ItemOverride[]): SiteItem[] {
  const rows = overrides.filter((row) => row.kind === kind);
  const bySlug = new Map(rows.map((row) => [row.slug, row]));
  const result: SiteItem[] = [];

  for (const base of defaultItems[kind]) {
    const row = bySlug.get(base.slug);
    bySlug.delete(base.slug);
    if (row?.hidden) continue;
    const data = { ...base.data };
    for (const [key, value] of Object.entries(row?.data ?? {})) {
      if (typeof value === "string" && value.trim().length > 0) data[key] = value;
    }
    result.push({ kind, slug: base.slug, data, isDefault: true });
  }

  const added = [...bySlug.values()]
    .filter((row) => !row.hidden)
    .sort((a, b) => a.position - b.position)
    .map((row) => ({ kind, slug: row.slug, data: { ...row.data }, isDefault: false }));

  return [...result, ...added];
}

const ItemsContext = createContext<ItemOverride[]>([]);

export function ItemsProvider({
  overrides,
  children,
}: {
  overrides?: ItemOverride[];
  children: ReactNode;
}) {
  return <ItemsContext.Provider value={overrides ?? []}>{children}</ItemsContext.Provider>;
}

export function useItems(kind: ItemKind): SiteItem[] {
  return merge(kind, useContext(ItemsContext));
}

export type SiteVideo = { id: string; title: string; description?: string | undefined };

export function useVideos(): SiteVideo[] {
  return useItems("video")
    .map((item) => ({
      id: (item.data["videoId"] ?? "").trim(),
      title: item.data["title"] ?? "",
      description: item.data["description"] || undefined,
    }))
    .filter((video) => video.id.length > 0);
}

export type SitePressItem = { slug: string; outlet: string; title: string; date: string; quote: string; url?: string | undefined };

export function usePress(): SitePressItem[] {
  return useItems("press").map((item) => ({
    slug: item.slug,
    outlet: item.data["outlet"] ?? "",
    title: item.data["title"] ?? "",
    date: item.data["date"] ?? "",
    quote: item.data["quote"] ?? "",
    url: item.data["url"] || undefined,
  }));
}

export type SitePublication = { title: string; source: string; year: string };

export function usePublications(): SitePublication[] {
  return useItems("publication").map((item) => ({
    title: item.data["title"] ?? "",
    source: item.data["source"] ?? "",
    year: item.data["year"] ?? "",
  }));
}

/** Простой адрес записи из названия. */
export function makeItemSlug(prefix: string, title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.length > 2 ? `${prefix}-${slug}`.slice(0, 80) : `${prefix}-${Date.now()}`;
}
