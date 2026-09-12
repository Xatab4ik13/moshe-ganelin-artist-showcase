import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/** Папка на сервере, где лежат загруженные через панель файлы. */
export function uploadsDir(): string {
  return process.env["UPLOAD_DIR"] ?? path.join(process.cwd(), "data", "uploads");
}

const extByType: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
};

export function extensionFor(contentType: string, filename: string): string | null {
  const known = extByType[contentType];
  if (known) return known;
  const ext = path.extname(filename).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"].includes(ext)) {
    return ext === ".jpeg" ? ".jpg" : ext;
  }
  return null;
}

/** Сохраняет файл и возвращает публичный адрес. */
export async function saveUpload(key: string, data: Buffer, extension: string): Promise<string> {
  const dir = uploadsDir();
  await mkdir(dir, { recursive: true });
  const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, "");
  const name = `${safeKey}-${Date.now()}${extension}`;
  await writeFile(path.join(dir, name), data);
  return `/api/public/uploads/${name}`;
}
