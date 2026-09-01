import { Link, createFileRoute } from "@tanstack/react-router";

import { DecoRule } from "@/components/site/Deco";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { workCategories, type WorkCategoryId } from "@/lib/site-data";
import { useLanguage, type DictKey } from "@/lib/i18n";
import pianoAsset from "@/assets/moshe-piano.webp.asset.json";

export const Route = createFileRoute("/music/")({
  head: () => ({
    meta: [
      { title: "Ganelin's music — Moshe Ariel Ganelin" },
      { name: "description", content: "Works by Moshe Ariel Ganelin: symphonic, organ, vocal, choir and chamber music." },
      { property: "og:title", content: "Ganelin's music — Moshe Ariel Ganelin" },
      { property: "og:description", content: "List of works: symphonic, organ, vocal, choir and chamber music." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/music" }],
  }),
  component: MusicIndexPage,
});

const categoryTitleKey: Record<WorkCategoryId, DictKey> = {
  symphonic: "catSymphonic",
  organ: "catOrgan",
  vocal: "catVocal",
  choir: "catChoir",
  chamber: "catChamber",
};

function MusicIndexPage() {
  const { t } = useLanguage();

  return (
    <PageShell title={t("navGanelinMusic")} lead={t("musicLead")} image={pianoAsset.url}>
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <Reveal>
          <h2 className="font-display text-3xl leading-none md:text-5xl">{t("musicIntroTitle")}</h2>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{t("musicIntroText")}</p>
        </Reveal>

        <Reveal>
          <h2 className="mt-24 text-center font-display text-4xl leading-none md:text-6xl">{t("listOfWorks")}</h2>
          <DecoRule className="mt-8" />
        </Reveal>

        {workCategories.map((category) => (
          <section key={category.id} id={category.id} className="mt-20 scroll-mt-28">
            <Reveal>
              <h3 className="font-display text-2xl uppercase tracking-[0.14em] text-petrol md:text-3xl">
                {t(categoryTitleKey[category.id])}
              </h3>
            </Reveal>

            <ul className="mt-8 border-t border-border">
              {category.works.map((work, index) => (
                <Reveal as="li" key={work.slug} delay={index * 60}>
                  <Link
                    to="/music/works/$slug"
                    params={{ slug: work.slug }}
                    className="group flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-border py-6 transition-colors duration-300 hover:bg-card"
                  >
                    <span className="font-display text-xl leading-snug transition-colors group-hover:text-brass md:text-3xl">
                      {work.title}
                    </span>
                    <span className="text-sm uppercase tracking-[0.28em] text-muted-foreground md:text-base">
                      {work.year} · {work.duration}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
