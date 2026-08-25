import { createFileRoute } from "@tanstack/react-router";

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
  return (
    <PageShell
      eyebrow="Галерея"
      title="Фотографии"
      lead="Подписи к фотографиям — пример текста, будут заменены."
    >
      <section className="mx-auto max-w-[1600px] px-5 pb-24 pt-10 md:px-10 lg:px-16 lg:pb-32">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          {photos.map((photo, index) => (
            <Reveal key={photo.alt} delay={(index % 2) * 90} className={`media-zoom overflow-hidden ${photo.span}`}>
              <figure className="group relative">
                <img src={photo.src} alt={photo.alt} loading="lazy" className={`w-full object-cover ${photo.ratio}`} />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-hero/85 to-transparent p-5 text-sm text-background opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.alt} — подпись, пример текста
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
