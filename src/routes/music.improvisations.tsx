import { createFileRoute } from "@tanstack/react-router";

import { PageShell, Placeholder } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { videos } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n";
import consoleAsset from "@/assets/moshe-console.webp.asset.json";

export const Route = createFileRoute("/music/improvisations")({
  head: () => ({
    meta: [
      { title: "Improvisations — Moshe Ariel Ganelin" },
      { name: "description", content: "Organ and piano improvisations by Moshe Ariel Ganelin." },
      { property: "og:title", content: "Improvisations — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Organ and piano improvisations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/music/improvisations" }],
  }),
  component: ImprovisationsPage,
});

function ImprovisationsPage() {
  const { t } = useLanguage();
  const selection = videos.filter((video) => /improvis/i.test(video.title)).concat(videos.slice(0, 3)).slice(0, 4);

  return (
    <PageShell title={t("improvisationsTitle")} lead={t("improvisationsLead")} image={consoleAsset.url}>
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <Reveal>
          <Placeholder>{t("sectionDescription")}</Placeholder>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {selection.map((video, index) => (
            <Reveal key={video.id} delay={index * 70}>
              <article className="border border-border bg-card p-4">
                <div className="aspect-video w-full overflow-hidden">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                    title={video.title}
                    loading="lazy"
                    allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <h2 className="mt-5 font-display text-xl leading-snug md:text-2xl">{video.title}</h2>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
