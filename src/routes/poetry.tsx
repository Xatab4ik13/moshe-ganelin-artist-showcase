import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useLanguage, type DictKey } from "@/lib/i18n";
import { poetryLangs } from "@/lib/site-data";
import pianoAsset from "@/assets/moshe-piano.webp.asset.json";

export const Route = createFileRoute("/poetry")({
  head: () => ({
    meta: [
      { title: "Poetry — Moshe Ariel Ganelin" },
      { name: "description", content: "Poems by Moshe Ariel Ganelin in Russian, English, Spanish and Portuguese." },
      { property: "og:title", content: "Poetry — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Poems in Russian, English, Spanish and Portuguese." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/poetry" }],
  }),
  component: PoetryPage,
});

const langLabelKey: Record<string, DictKey> = {
  russian: "langRussian",
  english: "langEnglish",
  spanish: "langSpanish",
  portuguese: "langPortuguese",
};

function PoetryPage() {
  const { t } = useLanguage();

  return (
    <PageShell title={t("poetryTitle")} lead={t("poetryLead")} image={pianoAsset.url}>
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        {poetryLangs.map((group, groupIndex) => (
          <section key={group.id} id={group.id} className="mb-24 scroll-mt-24 last:mb-0">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-6">
                <h2 className="font-display text-3xl leading-none md:text-5xl">{t(langLabelKey[group.id]!)}</h2>
              </div>
            </Reveal>

            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {[0, 1].map((index) => (
                <Reveal as="li" key={index} delay={index * 70}>
                  <article className="group flex h-full flex-col justify-between gap-8 border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brass hover:shadow-[0_24px_50px_-24px_oklch(0_0_0/0.35)]">
                    <div>
                      <h3 className="font-display text-2xl leading-snug">{t("poemSampleTitle")}</h3>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("poemSampleText")}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
            {groupIndex === poetryLangs.length - 1 ? null : null}
          </section>
        ))}
      </div>
    </PageShell>
  );
}
