import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import organAsset from "@/assets/moshe-organ-wide.webp.asset.json";
import architectureAsset from "@/assets/organ-architecture.webp.asset.json";
import stageAsset from "@/assets/moshe-stage.webp.asset.json";
import consoleAsset from "@/assets/moshe-console.webp.asset.json";
import pianoAsset from "@/assets/moshe-piano.webp.asset.json";
import heroAsset from "@/assets/moshe-hero.webp.asset.json";
import menuBgAsset from "@/assets/menu-bg.jpg.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Галерея — Moshe Ganelin" },
      { name: "description", content: "Фотографии Moshe Ganelin: концерты, репетиции, органы и залы." },
      { property: "og:title", content: "Галерея — Moshe Ganelin" },
      { property: "og:description", content: "Фотографии: концерты, репетиции, органы и залы." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/gallery" }],
  }),
  component: GalleryPage,
});

const photos = [
  { src: organAsset.url, alt: "Moshe Ganelin за органом в соборе", span: "md:col-span-7", ratio: "aspect-[4/3]" },
  { src: architectureAsset.url, alt: "Исторический орган", span: "md:col-span-5", ratio: "aspect-[3/4]" },
  { src: stageAsset.url, alt: "Выступление на сцене", span: "md:col-span-5", ratio: "aspect-[3/4]" },
  { src: consoleAsset.url, alt: "Органная кафедра", span: "md:col-span-7", ratio: "aspect-[4/3]" },
  { src: pianoAsset.url, alt: "За роялем", span: "md:col-span-6", ratio: "aspect-[4/3]" },
  { src: heroAsset.url, alt: "Портрет музыканта", span: "md:col-span-6", ratio: "aspect-[4/3]" },
  { src: menuBgAsset.url, alt: "Интерьер зала", span: "md:col-span-12", ratio: "aspect-[16/7]" },
];

function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((i: number | null) => (i === null ? i : (i + 1) % photos.length));
      if (event.key === "ArrowLeft") setActive((i: number | null) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <PageShell
      title="Фотографии"
      lead="Подписи к фотографиям — пример текста, будут заменены."
    >
      <section className="mx-auto max-w-[1600px] px-5 pb-24 pt-10 md:px-10 lg:px-16 lg:pb-32">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {photos.map((photo, index) => (
            <Reveal key={photo.alt} delay={(index % 2) * 90} className={`media-zoom overflow-hidden ${photo.span}`}>
              <figure className="group relative">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Открыть фото: ${photo.alt}`}
                  className="block w-full cursor-zoom-in"
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" className={`w-full object-cover ${photo.ratio}`} />
                </button>
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-hero/85 to-transparent p-5 text-sm text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.alt} — подпись, пример текста
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-hero/95 p-4 md:p-10"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Закрыть"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-background/30 text-background transition-colors hover:border-brass hover:text-brass"
          >
            <X className="size-5" />
          </button>
          <figure className="max-h-full" onClick={(event) => event.stopPropagation()}>
            <img
              src={photos[active]!.src}
              alt={photos[active]!.alt}
              className="max-h-[82vh] w-auto max-w-full animate-scale-in object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-background/70">{photos[active]!.alt}</figcaption>
          </figure>
        </div>
      )}
    </PageShell>
  );
}

