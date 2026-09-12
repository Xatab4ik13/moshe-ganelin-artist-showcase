import { createFileRoute } from "@tanstack/react-router";

import { DecoChevronRule, DecoPilaster, DecoScales } from "@/components/site/Deco";
import { PageShell, Placeholder } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { videos } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n";
import { useSiteImage } from "@/lib/site-images";

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
    <PageShell title={t("improvisationsTitle")} lead={t("improvisationsLead")} image={consoleImg}>
      <div className="relative mx-auto max-w-[1400px] overflow-hidden px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <DecoScales tone="light" opacity={0.06} size={72} />
        <DecoPilaster tone="light" className="pointer-events-none absolute left-0 top-16 hidden h-[70%] w-10 opacity-40 lg:block" />
        <DecoPilaster tone="light" className="pointer-events-none absolute right-0 top-16 hidden h-[70%] w-10 -scale-x-100 opacity-40 lg:block" />

        <Reveal>
          <Placeholder>{t("sectionDescription")}</Placeholder>
          <DecoChevronRule tone="light" className="mx-auto mt-12 max-w-[900px]" />
        </Reveal>

        <div className="relative mt-14 grid gap-10 md:grid-cols-2">
          {selection.map((video, index) => (
            <Reveal key={video.id} delay={index * 70}>
              <article className="deco-card p-4">
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
                <h2 className="mt-5 font-deco text-xl leading-snug md:text-2xl">{video.title}</h2>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
