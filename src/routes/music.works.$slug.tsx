import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { DecoCartouche, DecoRule } from "@/components/site/Deco";
import { PageShell, Placeholder } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { allWorks } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/music/works/$slug")({
  loader: ({ params }) => {
    const work = allWorks.find((item) => item.slug === params.slug);
    if (!work) throw notFound();
    return { work };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — Moshe Ariel Ganelin" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.work.title} — Moshe Ariel Ganelin`;
    return {
      meta: [
        { title },
        { name: "description", content: `${loaderData.work.title} (${loaderData.work.year}) by Moshe Ariel Ganelin.` },
        { property: "og:title", content: title },
        { property: "og:description", content: `${loaderData.work.title} (${loaderData.work.year})` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: WorkNotFound,
  component: WorkPage,
});

function WorkNotFound() {
  const { t } = useLanguage();
  return (
    <PageShell title="—" lead={t("searchNoResults")}>
      <div className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10 lg:px-16">
        <Link to="/music" className="line-link text-petrol">
          {t("workBack")}
        </Link>
      </div>
    </PageShell>
  );
}

function WorkPage() {
  const { t } = useLanguage();
  const { work } = Route.useLoaderData();

  return (
    <PageShell title={work.title} lead={`${work.year} · ${work.duration}`}>
      <div className="mx-auto max-w-[1400px] px-5 pb-28 md:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <Reveal>
              <DecoCartouche className="mb-8 h-10 w-[min(100%,520px)] opacity-70" />
              <h2 className="font-display text-2xl uppercase tracking-[0.14em] text-petrol md:text-3xl">{t("workAbout")}</h2>
              <div className="mt-6 space-y-5">
                <Placeholder>{t("sectionDescription")}</Placeholder>
                <Placeholder>{t("blockNote")}</Placeholder>
              </div>
            </Reveal>

            <Reveal>
              <h2 className="mt-20 font-display text-2xl uppercase tracking-[0.14em] text-petrol md:text-3xl">{t("workQuotes")}</h2>
              <blockquote className="mt-6 border-l-2 border-brass/70 pl-6 text-lg italic leading-relaxed text-muted-foreground md:text-xl">
                {t("pressQuoteText")}
                <footer className="mt-4 text-sm not-italic uppercase tracking-[0.28em]">{t("pressQuoteSource")}</footer>
              </blockquote>
            </Reveal>

            {work.videoId ? (
              <Reveal>
                <h2 className="mt-20 font-display text-2xl uppercase tracking-[0.14em] text-petrol md:text-3xl">{t("workVideo")}</h2>
                <div className="mt-6 aspect-video w-full overflow-hidden border border-border bg-card">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${work.videoId}`}
                    title={work.title}
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
              <h2 className="font-display text-2xl uppercase tracking-[0.14em] text-petrol">{t("workDetails")}</h2>
              <DecoRule className="mt-6" />
              <dl className="mt-8 space-y-6 text-lg md:text-xl">
                <div>
                  <dt className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{t("workDuration")}</dt>
                  <dd className="mt-1 font-display text-2xl">{work.duration}</dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{t("workScoring")}</dt>
                  <dd className="mt-1 font-deco text-2xl">{work.scoring}</dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-[0.3em] text-muted-foreground">{t("workPremiere")}</dt>
                  <dd className="mt-1 font-deco text-2xl">{work.premiere}</dd>
                </div>
              </dl>

              <Link to="/music" className="line-link mt-12 inline-block text-petrol">
                {t("workBack")}
              </Link>
            </Reveal>
          </aside>
        </div>
      </div>
    </PageShell>
  );
}
