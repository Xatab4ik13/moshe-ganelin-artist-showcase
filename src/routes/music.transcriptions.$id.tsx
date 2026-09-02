import { Link, createFileRoute } from "@tanstack/react-router";

import { PageShell, Placeholder } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { videos } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/music/transcriptions/$id")({
  head: () => ({
    meta: [
      { title: "Transcription — Moshe Ariel Ganelin" },
      { name: "description", content: "A transcription for organ or piano performed by Moshe Ariel Ganelin." },
      { property: "og:title", content: "Transcription — Moshe Ariel Ganelin" },
      { property: "og:description", content: "A transcription for organ or piano." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TranscriptionPage,
});

function TranscriptionPage() {
  const { t } = useLanguage();
  const { id } = Route.useParams();
  const video = videos.find((item) => item.id === id);

  return (
    <PageShell title={video?.title ?? t("transcriptionsTitle")}>
      <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-10 lg:px-16 lg:py-24">
        <Reveal>
          <Link to="/music/transcriptions" className="line-link text-base uppercase tracking-[0.28em] text-petrol md:text-lg">
            {t("transcriptionsTitle")}
          </Link>
        </Reveal>

        {video ? (
          <Reveal delay={80}>
            <div className="mt-10 aspect-video w-full overflow-hidden border border-border bg-card">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={140}>
          <div className="mt-12">
            <Placeholder>{t("sectionDescription")}</Placeholder>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
