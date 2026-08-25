import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { VideoCard } from "@/components/site/VideoCard";
import { videos } from "@/lib/site-data";
import architectureAsset from "@/assets/organ-architecture.webp.asset.json";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Видео — Moshe Ganelin" },
      { name: "description", content: "Каталог видеозаписей выступлений Moshe Ganelin с описаниями." },
      { property: "og:title", content: "Видео — Moshe Ganelin" },
      { property: "og:description", content: "Каталог видеозаписей выступлений с описаниями." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/video" }],
  }),
  component: VideoPage,
});

function VideoPage() {
  return (
    <PageShell
      eyebrow="Видео"
      title="Видеоархив"
      lead="Каталог записей выступлений с короткими описаниями — пример текста."
      image={architectureAsset.url}
    >
      <section className="bg-hero py-24 text-background lg:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-x-8 gap-y-16 px-5 md:grid-cols-2 md:px-10 lg:px-16 xl:grid-cols-3">
          {videos.map((video, index) => (
            <Reveal key={video.id} delay={(index % 3) * 80}>
              <VideoCard video={video} className="w-full" />
              <p className="mt-3 text-sm text-background/60">{video.description}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
