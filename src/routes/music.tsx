import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { musicSections, type MusicSectionId } from "@/lib/site-data";
import { useLanguage, type DictKey } from "@/lib/i18n";
import pianoAsset from "@/assets/moshe-piano.webp.asset.json";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Music — Moshe Ariel Ganelin" },
      { name: "description", content: "Compositions by Moshe Ariel Ganelin: organ, orchestra, piano, transcriptions and recordings." },
      { property: "og:title", content: "Music — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Works by discipline: organ, orchestra, piano, transcriptions, recordings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/music" }],
  }),
  component: MusicPage,
});

const sectionTitleKey: Record<MusicSectionId, DictKey> = {
  organ: "musicOrgan",
  orchestra: "musicOrchestra",
  piano: "musicPiano",
  transcriptions: "musicTranscriptions",
  recordings: "musicRecordings",
};

function MusicPage() {
  const { t } = useLanguage();

  return (
    <PageShell title={t("musicTitle")} lead={t("musicLead")} image={pianoAsset.url}>
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        {musicSections.map((section) => (
          <section key={section.id} id={section.id} className="mb-24 scroll-mt-24 last:mb-0">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-6">
                <h2 className="font-display text-3xl leading-none md:text-5xl">{t(sectionTitleKey[section.id])}</h2>
              </div>
              <p className="mt-5 max-w-2xl text-base text-muted-foreground">{t("sectionDescription")}</p>
            </Reveal>

            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {section.works.map((work, index) => (
                <Reveal as="li" key={work.title} delay={index * 70}>
                  <article className="group flex h-full flex-col justify-between gap-8 border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brass hover:shadow-[0_24px_50px_-24px_oklch(0_0_0/0.35)]">
                    <div>
                      <h3 className="font-display text-2xl leading-snug">{work.title}</h3>
                      <p className="mt-3 text-sm uppercase tracking-[0.25em] text-muted-foreground">
                        {work.year} · {work.duration}
                      </p>
                    </div>
                    {work.scoreLink ? (
                      <div className="flex flex-wrap gap-4 text-base">
                        <a href="#" className="line-link text-petrol">
                          {work.scoreLink === "pdf" ? t("scorePdf") : t("fullScore")}
                        </a>
                      </div>
                    ) : null}
                  </article>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
