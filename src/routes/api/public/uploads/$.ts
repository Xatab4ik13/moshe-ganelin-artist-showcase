import { createFileRoute } from "@tanstack/react-router";

const types: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

/** Отдаёт файлы, загруженные через панель управления. */
export const Route = createFileRoute("/api/public/uploads/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const name = (params._splat ?? "").split("/").pop() ?? "";
        if (!/^[a-zA-Z0-9_-]+\.[a-z0-9]+$/.test(name)) {
          return new Response("Not found", { status: 404 });
        }
        const path = await import("node:path");
        const { readFile } = await import("node:fs/promises");
        const { uploadsDir } = await import("@/lib/uploads.server");
        const ext = path.extname(name).toLowerCase();
        const contentType = types[ext];
        if (!contentType) return new Response("Not found", { status: 404 });
        try {
          const file = await readFile(path.join(uploadsDir(), name));
          return new Response(new Uint8Array(file), {
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        } catch {
          return new Response("Not found", { status: 404 });
        }
      },
    },
  },
});
