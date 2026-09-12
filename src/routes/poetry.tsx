import { createFileRoute } from "@tanstack/react-router";

import { DecoChevronRule, DecoCornerPlate, DecoPilaster, DecoScales } from "@/components/site/Deco";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useLanguage, type DictKey } from "@/lib/i18n";
import { useSiteImage } from "@/lib/site-images";
import { poetryLangs } from "@/lib/site-data";

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
  const piano = useSiteImage("piano");

  return (
    <PageShell title={t("poetryTitle")} lead={t("poetryLead")} image={piano}>
      <section className="relative overflow-hidden px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <DecoScales tone="light" opacity={0.07} size={104} />
        <DecoPilaster tone="light" className="pointer-events-none absolute left-1 top-24 hidden h-[70%] w-8 opacity-45 lg:block" />
        <DecoPilaster tone="light" flip className="pointer-events-none absolute right-1 top-24 hidden h-[70%] w-8 opacity-45 lg:block" />
        <div className="relative mx-auto max-w-[1600px]">
          <Reveal>
            <section id="poetry-intro" className="mb-24 scroll-mt-24 text-center">
              <h2 className="font-display text-3xl leading-none md:text-5xl">{t("poetryIntroTitle")}</h2>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{t("poetryIntroText")}</p>
              <DecoChevronRule tone="light" className="mx-auto mt-12 max-w-[1000px]" />
            </section>
          </Reveal>

          {poetryLangs.map((group) => (
            <section key={group.id} id={group.id} className="mb-24 scroll-mt-24 last:mb-0">
              <Reveal>
                <h2 className="text-center font-display text-3xl leading-none md:text-5xl">{t(langLabelKey[group.id]!)}</h2>
                <DecoChevronRule tone="light" className="mx-auto mt-8 max-w-[720px] opacity-80" />
              </Reveal>

              <ul className="mt-12 grid gap-8 md:grid-cols-2">
                {[0, 1].map((index) => (
                  <Reveal as="li" key={index} delay={index * 70}>
                    <article className="deco-card flex h-full flex-col justify-between gap-8 p-9 md:p-10">
                      <DecoCornerPlate tone="light" className="pointer-events-none absolute left-3 top-3 h-9 w-9 opacity-55" />
                      <DecoCornerPlate tone="light" flipX flipY className="pointer-events-none absolute bottom-3 right-3 h-9 w-9 opacity-55" />
                      <div className="relative text-center">
                        <h3 className="font-deco text-2xl leading-snug md:text-3xl">{t("poemSampleTitle")}</h3>
                        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("poemSampleText")}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
