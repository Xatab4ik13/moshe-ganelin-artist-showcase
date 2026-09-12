import { createFileRoute } from "@tanstack/react-router";

import { DecoChevronRule, DecoPilaster, DecoScales } from "@/components/site/Deco";
import { PageShell, Placeholder } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { videos, youtubeChannelUrl } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n";
import { useSiteImage } from "@/lib/site-images";

export const Route = createFileRoute("/music/concerts")({
  head: () => ({
    meta: [
      { title: "Concert videos — Moshe Ariel Ganelin" },
      { name: "description", content: "Concert recordings and live streams of Moshe Ariel Ganelin." },
      { property: "og:title", content: "Concert videos — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Concert recordings and live streams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/music/concerts" }],
  }),
  component: ConcertVideoPage,
});

function ConcertVideoPage() {
  const { t } = useLanguage();
  const stage = useSiteImage("stage");

  return (
    <PageShell title={t("concertsVideoTitle")} lead={t("concertsVideoLead")} image={stage}>
      <div className="relative mx-auto max-w-[1400px] overflow-hidden px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <DecoScales tone="light" opacity={0.06} size={72} />
        <DecoPilaster tone="light" className="pointer-events-none absolute left-0 top-16 hidden h-[70%] w-10 opacity-40 lg:block" />
        <DecoPilaster tone="light" className="pointer-events-none absolute right-0 top-16 hidden h-[70%] w-10 -scale-x-100 opacity-40 lg:block" />
        <Reveal>
          <Placeholder>{t("sectionDescription")}</Placeholder>
          <DecoChevronRule tone="light" className="mx-auto mt-12 max-w-[900px]" />
        </Reveal>

        <div className="relative mt-14 grid gap-10 md:grid-cols-2">
          {videos.map((video, index) => (
            <Reveal key={video.id} delay={index * 50}>
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

        <Reveal>
          <a href={youtubeChannelUrl} target="_blank" rel="noreferrer" className="line-link mt-14 inline-block text-petrol">
            {t("homeVideoAll")}
          </a>
        </Reveal>
      </div>
    </PageShell>
  );
}
