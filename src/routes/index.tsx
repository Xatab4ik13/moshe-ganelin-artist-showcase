import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Reveal } from "@/components/site/Reveal";
import { SiteMenu } from "@/components/site/SiteMenu";
import { SiteFooter } from "@/components/site/SiteFooter";
import { upcomingConcerts } from "@/lib/site-data";
import logoAsset from "@/assets/moshe-ganelin-logo.png.asset.json";
import heroVideoAsset from "@/assets/hero-reger.mp4.asset.json";
import heroPosterAsset from "@/assets/hero-poster.jpg.asset.json";

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

function Index() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) heroVideoRef.current.playbackRate = 0.85;
  }, []);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <SiteMenu tone="light" />

      <section id="top" className="relative min-h-[94svh] overflow-hidden bg-hero text-background">
        <h1 className="sr-only">Moshe Ganelin</h1>
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideoAsset.url}
          poster={heroPosterAsset.url}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-hero/35" />
        <div className="hero-blur absolute bottom-0 left-0 z-10 h-32 w-full md:h-48" />
        <img
          src={logoAsset.url}
          alt="Moshe Ganelin"
          className="hero-logo absolute top-[calc(1.25rem-1cm)] left-1/2 z-20 w-[min(70vw,620px)] -translate-x-1/2 object-contain"
        />
      </section>

      <section id="concerts" className="bg-background px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <h2 className="font-display text-5xl leading-none md:text-7xl">Ближайшие<br />концерты</h2>
              <Link to="/concerts" className="line-link text-sm text-petrol">Вся афиша и архив</Link>
            </div>
          </Reveal>

          <ul className="mt-14 border-t border-border">
            {upcomingConcerts.slice(0, 4).map((concert, index) => (
              <Reveal as="li" key={`${concert.day}-${concert.city}`} delay={index * 70}>
                <Link
                  to="/concerts"
                  className="row-item group grid items-baseline gap-2 border-b border-border px-2 py-7 md:grid-cols-[12rem_1fr_1.2fr]"
                >
                  <span className="font-display text-3xl leading-none">
                    {concert.day} {concert.month}
                    <span className="ml-2 text-sm text-muted-foreground">{concert.year}</span>
                  </span>
                  <span className="text-base text-foreground">{concert.city}, {concert.venue}</span>
                  <span className="font-display text-xl leading-snug text-muted-foreground">{concert.title}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
