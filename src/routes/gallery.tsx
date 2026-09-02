import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { haptic } from "@/lib/haptics";
import { useLanguage } from "@/lib/i18n";
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
      { title: "Gallery — Moshe Ariel Ganelin" },
      { name: "description", content: "Photographs of Moshe Ariel Ganelin: concerts, rehearsals, organs and halls." },
      { property: "og:title", content: "Gallery — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Photographs: concerts, rehearsals, organs and halls." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/gallery" }],
  }),
  component: GalleryPage,
});

const photos = [
  { src: organAsset.url, alt: "Moshe Ariel Ganelin at the organ in a cathedral", ratio: "aspect-[4/3]" },
  { src: architectureAsset.url, alt: "A historic organ", ratio: "aspect-[3/4]" },
  { src: stageAsset.url, alt: "On stage", ratio: "aspect-[3/4]" },
  { src: consoleAsset.url, alt: "The organ console", ratio: "aspect-[4/3]" },
  { src: pianoAsset.url, alt: "At the grand piano", ratio: "aspect-[4/5]" },
  { src: heroAsset.url, alt: "Portrait of the musician", ratio: "aspect-[4/3]" },
  { src: menuBgAsset.url, alt: "Concert hall interior", ratio: "aspect-[16/10]" },
];

const columnsCount = 3;
const speeds = [0, -46, 26];

function GalleryPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number; scale: number } | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStart = useRef<number | null>(null);

  const columns = Array.from({ length: columnsCount }, (_, columnIndex) =>
    photos.filter((_, index) => index % columnsCount === columnIndex),
  );

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (window.innerWidth < 768) {
          columnRefs.current.forEach((node) => node && (node.style.transform = ""));
          return;
        }
        const progress = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
        columnRefs.current.forEach((node, index) => {
          if (!node) return;
          node.style.transform = `translate3d(0, ${progress * (speeds[index] ?? 0) * 2.4}px, 0)`;
        });
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const openPhoto = (index: number, element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    setOrigin({
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
      scale: Math.max(0.18, rect.width / window.innerWidth),
    });
    setActive(index);
    setZoomed(false);
    haptic(10);
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => setZoomed(true)));
  };

  const step = (direction: number) => {
    setActive((index) => (index === null ? index : (index + direction + photos.length) % photos.length));
    haptic(6);
  };

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <PageShell title={t("galleryTitle")} lead={t("galleryLead")}>
      <section className="mx-auto max-w-[1600px] px-5 pb-32 pt-10 md:px-10 lg:px-16 lg:pb-44">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 md:items-start">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              ref={(node) => {
                columnRefs.current[columnIndex] = node;
              }}
              className="flex flex-col gap-5 will-change-transform"
            >
              {column.map((photo) => {
                const index = photos.indexOf(photo);
                return (
                  <Reveal key={photo.alt} delay={(index % 3) * 80} className="media-zoom overflow-hidden">
                    <figure className="group relative">
                      <button
                        type="button"
                        onClick={(event) => openPhoto(index, event.currentTarget)}
                        aria-label={`Open photo: ${photo.alt}`}
                        className="block w-full cursor-zoom-in"
                      >
                        <img src={photo.src} alt={photo.alt} loading="lazy" className={`w-full object-cover ${photo.ratio}`} />
                      </button>
                      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-hero/85 to-transparent p-5 text-lg leading-snug text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:text-xl">
                        {photo.alt} — caption, sample text
                      </figcaption>
                    </figure>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-hero/95 p-4 md:p-10"
          onClick={() => setActive(null)}
          onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            const end = event.changedTouches[0]?.clientX ?? null;
            if (start !== null && end !== null && Math.abs(end - start) > 48) step(end < start ? 1 : -1);
            touchStart.current = null;
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-background/30 text-background transition-colors hover:border-brass hover:text-brass"
          >
            <X className="size-5" />
          </button>

          <figure
            className="lightbox-figure max-h-full"
            onClick={(event) => event.stopPropagation()}
            style={
              zoomed || !origin
                ? { transform: "translate3d(0,0,0) scale(1)", opacity: 1 }
                : { transform: `translate3d(${origin.x}px, ${origin.y}px, 0) scale(${origin.scale})`, opacity: 0.5 }
            }
          >
            <img
              src={photos[active]!.src}
              alt={photos[active]!.alt}
              className="max-h-[78vh] w-auto max-w-full object-contain"
            />
            <figcaption className="mt-5 text-center text-lg leading-relaxed text-background/85 md:text-2xl">
              {photos[active]!.alt}
            </figcaption>
          </figure>

          <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
            {photos.map((photo, index) => (
              <button
                key={photo.alt}
                type="button"
                aria-label={`Photo ${index + 1}`}
                onClick={(event) => { event.stopPropagation(); setActive(index); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === active ? "w-6 bg-brass" : "w-1.5 bg-background/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}
