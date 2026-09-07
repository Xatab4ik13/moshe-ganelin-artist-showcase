import { Link, createFileRoute } from "@tanstack/react-router";

import { DecoChevronRule, DecoPilaster, DecoScales } from "@/components/site/Deco";
import { PageShell, Placeholder } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { videos } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n";
import organAsset from "@/assets/moshe-organ-wide.webp.asset.json";

export const Route = createFileRoute("/music/transcriptions/")({
  head: () => ({
    meta: [
      { title: "Transcriptions — Moshe Ariel Ganelin" },
      { name: "description", content: "Transcriptions for organ and piano by Moshe Ariel Ganelin." },
      { property: "og:title", content: "Transcriptions — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Transcriptions for organ and piano." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/music/transcriptions" }],
  }),
  component: TranscriptionsPage,
});

function TranscriptionsPage() {
  const { t } = useLanguage();
  const selection = videos.filter((video) => /transcription|Chopin|Scriabin|Rachmaninoff|Mosolov/i.test(video.title));

  return (
    <PageShell title={t("transcriptionsTitle")} lead={t("transcriptionsLead")} image={organAsset.url}>
      <div className="relative mx-auto max-w-[1400px] overflow-hidden px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <DecoScales tone="light" opacity={0.06} size={72} />
        <DecoPilaster tone="light" className="pointer-events-none absolute left-0 top-16 hidden h-[70%] w-10 opacity-40 lg:block" />
        <DecoPilaster tone="light" className="pointer-events-none absolute right-0 top-16 hidden h-[70%] w-10 -scale-x-100 opacity-40 lg:block" />

        <Reveal>
          <Placeholder>{t("sectionDescription")}</Placeholder>
          <DecoChevronRule tone="light" className="mx-auto mt-12 max-w-[900px]" />
        </Reveal>

        <ul className="relative mt-14 border-t border-border">
          {selection.map((video, index) => (
            <Reveal as="li" key={video.id} delay={index * 60}>
              <Link
                to="/music/transcriptions/$id"
                params={{ id: video.id }}
                className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-border py-6 transition-colors hover:text-brass"
              >
                <span className="font-deco text-xl leading-snug transition-colors group-hover:text-brass md:text-3xl">
                  {video.title}
                </span>
                <span className="text-base uppercase tracking-[0.28em] text-muted-foreground md:text-lg">{t("homeWatch")}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
