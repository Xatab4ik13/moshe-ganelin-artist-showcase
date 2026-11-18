import { Link, createFileRoute } from "@tanstack/react-router";

import { PageShell, Placeholder } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { localized, useVideoEntries } from "@/lib/site-items";
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
  const entries = useVideoEntries("transcription");
  const { t, lang } = useLanguage();
  const { id } = Route.useParams();
  const video = entries.find((item) => item.slug === id);
  const description = video ? localized(video.data, "description", lang) : "";

  return (
    <PageShell title={video?.title ?? t("transcriptionsTitle")}>
      <div className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
        <Reveal>
          <div>
            <h2 className="font-display text-2xl uppercase tracking-[0.14em] text-petrol md:text-3xl">{t("transcriptionAbout")}</h2>
            <div className="mt-6 whitespace-pre-line">
              <Placeholder>{description || t("transcriptionDetailDescription")}</Placeholder>
            </div>
          </div>
        </Reveal>

        {video && video.videoId ? (
          <Reveal delay={140}>
            <div className="mt-10 aspect-video w-full overflow-hidden border border-border bg-card">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.videoId}`}
                title={video.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </Reveal>
        ) : null}
          </div>
          <aside>
            <Reveal>
              <Link to="/music/transcriptions" className="line-link inline-block text-petrol">
                {t("transcriptionBack")}
              </Link>
            </Reveal>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
