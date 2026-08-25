import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { MiniBar } from "@/components/site/MiniBar";
import { Reveal } from "@/components/site/Reveal";
import { SiteMenu } from "@/components/site/SiteMenu";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StaffDivider } from "@/components/site/StaffDivider";
import { upcomingConcerts, type Concert } from "@/lib/site-data";
import logoAsset from "@/assets/moshe-ganelin-logo.png.asset.json";
import heroVideoAsset from "@/assets/hero-reger.mp4.asset.json";
import heroPosterAsset from "@/assets/hero-poster.jpg.asset.json";
import venueCathedral from "@/assets/venue-cathedral.jpg";
import venuePetrikirche from "@/assets/venue-petrikirche.jpg";
import venueHall from "@/assets/venue-hall.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moshe Ganelin — официальный сайт" },
      { name: "description", content: "Официальный сайт Moshe Ganelin: концерты, музыка, видео, публикации и фотографии." },
      { property: "og:title", content: "Moshe Ganelin — официальный сайт" },
      { property: "og:description", content: "Концерты, музыка, видео и публикации Moshe Ganelin." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://moshearielganelin.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/" }],
  }),
  component: Index,
});

const venueImages = [venueHall, venueCathedral, venuePetrikirche];

export function ConcertCard({ concert, index }: { concert: Concert; index: number }) {
  const image = venueImages[index % venueImages.length];

  return (
    <Reveal delay={(index % 3) * 90} className="h-full">
      <article
        tabIndex={0}
        className="slide-card flex h-full min-h-80 flex-col justify-between border border-border bg-card p-6 focus:outline-none md:p-8"
      >
        <div className="slide-card-media">
          <img
            src={image}
            alt={`${concert.city}, ${concert.venue}`}
            loading="lazy"
            width={1024}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-hero/55" />
        </div>

        <div className="slide-card-body space-y-1">
          <span className="font-display text-6xl leading-none">{concert.day}</span>
          <span className="slide-card-muted block font-sans text-sm text-muted-foreground">
            {concert.month} {concert.year}
          </span>
          <p className="mt-6 text-base leading-snug">{concert.city}, {concert.venue}</p>
        </div>
        <h3 className="slide-card-body mt-8 font-display text-2xl leading-snug">{concert.title}</h3>
      </article>
    </Reveal>
  );
}

function Index() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const apply = () => { video.playbackRate = 0.85; };
    apply();
    video.addEventListener("loadeddata", apply);
    video.addEventListener("play", apply);
    return () => {
      video.removeEventListener("loadeddata", apply);
      video.removeEventListener("play", apply);
    };
  }, []);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <SiteMenu tone="light" />
      <MiniBar />

      <section id="top" data-snap className="relative min-h-[100svh] overflow-hidden bg-hero text-background">
        <h1 className="sr-only">Moshe Ganelin</h1>
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
          src={heroVideoAsset.url}
          poster={heroPosterAsset.url}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="auto"
        />
        <div className="absolute inset-0 bg-hero/35" />
        <div className="hero-blur absolute bottom-0 left-0 z-10 h-32 w-full md:h-48" />
        <img
          src={logoAsset.url}
          alt="Moshe Ganelin"
          className="hero-logo absolute top-[calc(1.25rem-1cm)] left-1/2 z-20 w-[min(70vw,620px)] -translate-x-1/2 object-contain p-3"
        />
      </section>

      <section id="concerts" data-snap className="bg-background px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <h2 className="font-display text-5xl leading-none md:text-7xl">Ближайшие<br />концерты</h2>
              <Link to="/concerts" className="line-link text-sm text-petrol">Вся афиша и архив</Link>
            </div>
          </Reveal>

          <StaffDivider className="mt-8" />

          <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
            {upcomingConcerts.slice(0, 3).map((concert, index) => (
              <div key={`${concert.day}-${concert.city}`} className="w-[82%] shrink-0 snap-start md:w-auto md:shrink">
                <ConcertCard concert={concert} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
