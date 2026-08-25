import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { archiveConcerts, upcomingConcerts, type Concert } from "@/lib/site-data";
import stageAsset from "@/assets/moshe-stage.webp.asset.json";
import venueCathedral from "@/assets/venue-cathedral.jpg";
import venuePetrikirche from "@/assets/venue-petrikirche.jpg";
import venueHall from "@/assets/venue-hall.jpg";

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

const venueImages = [venueHall, venueCathedral, venuePetrikirche];

function ConcertCard({ concert, index }: { concert: Concert; index: number }) {
  const image = venueImages[index % venueImages.length];
  return (
    <Reveal delay={(index % 3) * 90} className="flip-card min-h-80">
      <div className="flip-card-inner">
        <article className="flip-face flex flex-col justify-between border border-border bg-card p-6 md:p-8">
          <div className="space-y-1">
            <span className="font-display text-6xl leading-none">{concert.day}</span>
            <span className="block font-sans text-sm text-muted-foreground">{concert.month} {concert.year}</span>
            <p className="mt-6 text-base leading-snug text-foreground">{concert.city}, {concert.venue}</p>
          </div>
          <h3 className="font-display text-2xl leading-snug">{concert.title}</h3>
        </article>
        <article className="flip-face flip-face-back overflow-hidden border border-border bg-hero text-background">
          <img src={image} alt={`${concert.city}, ${concert.venue}`} loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero/55" />
          <div className="relative flex h-full flex-col justify-end gap-2 p-6 md:p-8">
            <span className="text-sm text-background/70">{concert.day} {concert.month} {concert.year}</span>
            <h3 className="font-display text-2xl leading-snug">{concert.venue}</h3>
            <p className="text-sm text-background/80">{concert.city}</p>
          </div>
        </article>
      </div>
    </Reveal>
  );
}

function ArchiveRow({ concert, index }: { concert: Concert; index: number }) {
  return (
    <Reveal as="li" delay={index * 60}>
      <a
        href="#contacts"
        className="row-item group grid items-baseline gap-3 border-b border-border/60 px-3 py-7 text-muted-foreground md:grid-cols-[10rem_1fr_1.1fr_2rem]"
      >
        <span className="font-display text-2xl leading-none">
          {concert.day} {concert.month}
          <span className="ml-2 text-sm">{concert.year}</span>
        </span>
        <span className="text-base">{concert.city}, {concert.venue}</span>
        <span className="font-display text-lg leading-snug">{concert.title}</span>
        <ArrowUpRight className="row-arrow size-5 justify-self-end text-brass" />
      </a>
    </Reveal>
  );
}

function ConcertsPage() {
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
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingConcerts.map((concert, index) => (
            <ConcertCard key={`${concert.day}-${concert.city}`} concert={concert} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-secondary px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <h2 className="font-display text-4xl leading-none md:text-6xl">Прошедшие выступления</h2>
          </Reveal>
          <ul className="mt-12 border-t border-border/60">
            {archiveConcerts.map((concert, index) => (
              <ArchiveRow key={`${concert.day}-${concert.city}-a`} concert={concert} index={index} />
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
