import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { ConcertCard } from "@/components/site/ConcertCard";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { archiveConcerts, upcomingConcerts, type Concert } from "@/lib/site-data";
import stageAsset from "@/assets/moshe-stage.webp.asset.json";
import venueCathedralAsset from "@/assets/venue-cathedral.webp.asset.json";
import venuePetrikircheAsset from "@/assets/venue-petrikirche.webp.asset.json";
import venueHallAsset from "@/assets/venue-hall.webp.asset.json";

const venueCathedral = venueCathedralAsset.url;
const venuePetrikirche = venuePetrikircheAsset.url;
const venueHall = venueHallAsset.url;

export const Route = createFileRoute("/concerts")({
  head: () => ({
    meta: [
      { title: "Афиша концертов — Moshe Ganelin" },
      { name: "description", content: "Ближайшие концерты и архив выступлений Moshe Ganelin." },
      { property: "og:title", content: "Афиша концертов — Moshe Ganelin" },
      { property: "og:description", content: "Ближайшие концерты и архив выступлений Moshe Ganelin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/concerts" }],
  }),
  component: ConcertsPage,
});

const archiveImages = [venueCathedral, venuePetrikirche, venueHall];

function MonthCalendar({ month, year, days }: { month: string; year: string; days: number[] }) {
  const cells = Array.from({ length: 31 }, (_, index) => index + 1);
  return (
    <div className="border border-border/70 bg-card/60 p-5">
      <p className="font-display text-lg leading-none">
        {month} <span className="text-muted-foreground">{year}</span>
      </p>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] tabular-nums">
        {cells.map((day) => {
          const active = days.includes(day);
          return (
            <span
              key={day}
              className={
                active
                  ? "rounded-sm bg-brass/25 py-1 font-semibold text-foreground"
                  : "py-1 text-muted-foreground/45"
              }
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ConcertsPage() {
  const [thumb, setThumb] = useState<{ src: string; x: number; y: number } | null>(null);
  const frame = useRef(0);

  const months = upcomingConcerts.reduce<{ month: string; year: string; days: number[] }[]>((acc, concert) => {
    const found = acc.find((item) => item.month === concert.month && item.year === concert.year);
    if (found) found.days.push(Number(concert.day));
    else acc.push({ month: concert.month, year: concert.year, days: [Number(concert.day)] });
    return acc;
  }, []);

  const moveThumb = (src: string) => (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = 0;
      setThumb({ src, x: clientX, y: clientY });
    });
  };

  return (
    <PageShell
      title="Концерты"
      lead="Каталог ближайших выступлений и архив прошедших вечеров — пример текста."
      image={stageAsset.url}
    >
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <Reveal>
          <h2 className="font-display text-4xl leading-none md:text-6xl">Ближайшие концерты</h2>
        </Reveal>


        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {upcomingConcerts.map((concert, index) => (
              <div key={`${concert.day}-${concert.city}`} className="w-[82%] shrink-0 snap-start md:w-auto md:shrink">
                <ConcertCard concert={concert} index={index} />
              </div>
            ))}
          </div>

          <aside className="hidden space-y-4 lg:block">
            {months.map((item) => (
              <Reveal key={`${item.month}-${item.year}`}>
                <MonthCalendar month={item.month} year={item.year} days={item.days} />
              </Reveal>
            ))}
          </aside>
        </div>
      </section>

      <section className="bg-secondary px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <h2 className="font-display text-4xl leading-none md:text-6xl">Прошедшие выступления</h2>
          </Reveal>
          <ul className="mt-12 border-t border-border/60">
            {archiveConcerts.map((concert: Concert, index) => (
              <Reveal as="li" key={`${concert.day}-${concert.city}-a`} delay={index * 60}>
                <div
                  onMouseMove={moveThumb(archiveImages[index % archiveImages.length]!)}
                  onMouseLeave={() => setThumb(null)}
                  style={{ opacity: Math.max(0.4, 1 - index * 0.13) }}
                  className="row-item group grid items-baseline gap-3 border-b border-border/60 px-3 py-7 text-muted-foreground md:grid-cols-[10rem_1fr_1.1fr]"
                >
                  <span className="font-display text-2xl leading-none">
                    {concert.day} {concert.month}
                    <span className="ml-2 text-sm">{concert.year}</span>
                  </span>
                  <span className="text-base">{concert.city}, {concert.venue}</span>
                  <span className="font-display text-lg leading-snug">{concert.title}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <div
        aria-hidden="true"
        className={`row-thumb hidden md:block ${thumb ? "row-thumb-visible" : ""}`}
        style={{ left: thumb?.x ?? -400, top: thumb?.y ?? -400 }}
      >
        {thumb ? <img src={thumb.src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" /> : null}
      </div>
    </PageShell>
  );
}
