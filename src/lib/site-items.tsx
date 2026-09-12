import { createContext, useContext, type ReactNode } from "react";

import { galleryPhotos, pressItems, publications, videos, workCategories, type WorkCategoryId } from "./site-data";

export type ItemKind = "video" | "press" | "publication" | "work" | "poem" | "photo";


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
  if (kind === "work") {
    return workCategories.flatMap((category) =>
      category.works.map((work) => ({
        kind,
        slug: work.slug,
        data: {
          category: category.id,
          title: work.title,
          year: work.year,
          duration: work.duration,
          scoring: work.scoring,
          premiere: work.premiere,
          videoId: work.videoId ?? "",
          description: "",
        },
        isDefault: true,
      })),
    );
  }
  if (kind === "poem") {
    return [];
  }
  if (kind === "photo") {
    return galleryPhotos.map((photo) => ({
      kind,
      slug: photo.key,
      data: { caption: photo.alt, imageUrl: "", ratio: photo.ratio },
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
  work: defaults("work"),
  poem: defaults("poem"),
  photo: defaults("photo"),
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

export type SiteWork = {
  slug: string;
  category: WorkCategoryId;
  title: string;
  year: string;
  duration: string;
  scoring: string;
  premiere: string;
  videoId?: string | undefined;
  description?: string | undefined;
};

const categoryOrder: WorkCategoryId[] = ["symphonic", "organ", "vocal", "choir", "chamber"];

function toWork(item: SiteItem): SiteWork {
  const category = (item.data["category"] ?? "").trim() as WorkCategoryId;
  return {
    slug: item.slug,
    category: categoryOrder.includes(category) ? category : "chamber",
    title: item.data["title"] ?? "",
    year: item.data["year"] ?? "",
    duration: item.data["duration"] ?? "",
    scoring: item.data["scoring"] ?? "",
    premiere: item.data["premiere"] ?? "",
    videoId: item.data["videoId"] || undefined,
    description: item.data["description"] || undefined,
  };
}

/** Сочинения с учётом изменений из панели (для загрузчиков маршрутов). */
export function worksFrom(overrides: ItemOverride[]): SiteWork[] {
  return merge("work", overrides).map(toWork);
}

export function useWorks(): SiteWork[] {
  return useItems("work").map(toWork);
}

export function useWorkGroups(): { id: WorkCategoryId; works: SiteWork[] }[] {
  const works = useWorks();
  return categoryOrder.map((id) => ({ id, works: works.filter((work) => work.category === id) }));
}

/** Простой адрес записи из названия. */
export function makeItemSlug(prefix: string, title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug.length > 2 ? `${prefix}-${slug}`.slice(0, 80) : `${prefix}-${Date.now()}`;
}

export type SitePoem = { slug: string; lang: string; title: string; text: string };

export function usePoems(lang: string): SitePoem[] {
  return useItems("poem")
    .map((item) => ({
      slug: item.slug,
      lang: (item.data["lang"] ?? "").trim(),
      title: item.data["title"] ?? "",
      text: item.data["text"] ?? "",
    }))
    .filter((poem) => poem.lang === lang);
}

export type SitePhoto = { slug: string; caption: string; imageUrl: string; ratio: string; isDefault: boolean };

export function usePhotos(): SitePhoto[] {
  return useItems("photo").map((item) => ({
    slug: item.slug,
    caption: item.data["caption"] ?? "",
    imageUrl: item.data["imageUrl"] ?? "",
    ratio: item.data["ratio"] || "aspect-[4/3]",
    isDefault: item.isDefault,
  }));
}
