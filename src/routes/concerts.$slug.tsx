import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { findConcert } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n";
import venueCathedralAsset from "@/assets/venue-cathedral.webp.asset.json";

export const Route = createFileRoute("/concerts/$slug")({
  head: () => ({
    meta: [
      { title: "Concert — Moshe Ariel Ganelin" },
      { name: "description", content: "Details of a concert by Moshe Ariel Ganelin: date, venue, programme and video." },
      { property: "og:title", content: "Concert — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Date, venue, programme and video of the concert." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConcertPage,
});

function ConcertPage() {
  const { slug } = Route.useParams();
  const { t } = useLanguage();
  const concert = findConcert(slug);

  if (!concert) throw notFound();

  return (
    <PageShell
      title={concert.title}
      lead={`${concert.day} ${concert.month} ${concert.year} — ${concert.city}, ${concert.venue}`}
      image={venueCathedralAsset.url}
    >
      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <Reveal>
          <Link to="/concerts" className="line-link text-lg text-petrol md:text-xl">
            {t("concertBack")}
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_22rem]">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl leading-tight md:text-5xl">{t("concertAbout")}</h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t("concertDetailsText")}
              </p>
            </Reveal>

            <Reveal>
              <h3 className="mt-14 font-display text-2xl leading-tight md:text-4xl">{t("concertProgram")}</h3>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t("programNote")}
              </p>
            </Reveal>

            <Reveal>
              <h3 className="mt-14 font-display text-2xl leading-tight md:text-4xl">{t("concertVideo")}</h3>
              <div className="mt-6 aspect-video w-full max-w-3xl overflow-hidden border border-border">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${concert.videoId ?? "WBZdF8B2wpU"}`}
                  title={concert.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          </div>

          <aside className="space-y-6 border border-border bg-card p-7">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-petrol">{t("concertWhen")}</p>
              <p className="mt-2 font-display text-2xl md:text-3xl">
                {concert.day} {concert.month} {concert.year}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-petrol">{t("concertWhere")}</p>
              <p className="mt-2 text-lg md:text-xl">{concert.city}, {concert.venue}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-petrol">{t("concertTickets")}</p>
              <p className="mt-2 text-lg text-muted-foreground md:text-xl">{t("blockNote")}</p>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
