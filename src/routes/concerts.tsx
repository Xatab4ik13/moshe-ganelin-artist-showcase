import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { archiveConcerts, upcomingConcerts, type Concert } from "@/lib/site-data";
import stageAsset from "@/assets/moshe-stage.webp.asset.json";

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

function ConcertRow({ concert, index, archived = false }: { concert: Concert; index: number; archived?: boolean }) {
  return (
    <Reveal as="li" delay={index * 60}>
      <a
        href="#contacts"
        className={`row-item group grid items-baseline gap-3 border-b px-3 py-7 md:grid-cols-[10rem_1fr_1.1fr_2rem] ${archived ? "border-border/60 text-muted-foreground" : "border-border"}`}
      >
        <span className="font-display text-2xl leading-none">
          {concert.day} {concert.month}
          <span className="ml-2 text-sm text-muted-foreground">{concert.year}</span>
        </span>
        <span className="text-base">{concert.city}, {concert.venue}</span>
        <span className={`font-display text-lg leading-snug ${archived ? "" : "text-foreground"}`}>{concert.title}</span>
        <ArrowUpRight className="row-arrow size-5 justify-self-end text-brass" />
      </a>
    </Reveal>
  );
}

function ConcertsPage() {
  return (
    <PageShell
      eyebrow="Афиша"
      title="Концерты"
      lead="Каталог ближайших выступлений и архив прошедших вечеров — пример текста."
      image={stageAsset.url}
    >
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.4em] text-petrol">Сезон 2026 / 27</p>
          <h2 className="mt-5 font-display text-4xl leading-none md:text-6xl">Ближайшие концерты</h2>
        </Reveal>
        <ul className="mt-12 border-t border-border">
          {upcomingConcerts.map((concert, index) => (
            <ConcertRow key={`${concert.day}-${concert.city}`} concert={concert} index={index} />
          ))}
        </ul>
      </section>

      <section className="bg-secondary px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.4em] text-petrol">Архив</p>
            <h2 className="mt-5 font-display text-4xl leading-none md:text-6xl">Прошедшие выступления</h2>
          </Reveal>
          <ul className="mt-12 border-t border-border/60">
            {archiveConcerts.map((concert, index) => (
              <ConcertRow key={`${concert.day}-${concert.city}-a`} concert={concert} index={index} archived />
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
