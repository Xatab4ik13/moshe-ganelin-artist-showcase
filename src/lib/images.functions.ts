import { createServerFn } from "@tanstack/react-start";

import type { ImageOverrides } from "./site-images";

/** Публичное чтение заменённых в панели изображений. Без базы сайт работает на исходных картинках. */
export const getImageOverrides = createServerFn({ method: "GET" }).handler(
  async (): Promise<ImageOverrides> => {
    if (!process.env["DATABASE_URL"]) return {};
    try {
      const { dbQuery } = await import("./db.server");
      const rows = await dbQuery<{ key: string; url: string }>("SELECT key, url FROM content_images");
      const out: ImageOverrides = {};
      for (const row of rows) out[row.key] = row.url;
      return out;
    } catch (error) {
      console.error("getImageOverrides failed", error);
      return {};
    }
  },
);
