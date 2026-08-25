import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { ConcertCard } from "@/components/site/ConcertCard";
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

      <section id="top" className="relative min-h-[100svh] overflow-hidden bg-hero text-background">
        <h1 className="sr-only">Moshe Ganelin</h1>
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] [transform:translateZ(0)] md:object-center"
          src={heroVideoAsset.url}
          poster={heroPosterAsset.url}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="auto"
        />
        <div className="absolute inset-0 bg-hero/15 md:bg-hero/35" />
        <div className="hero-blur absolute bottom-0 left-0 z-10 h-20 w-full md:h-48" />
        <img
          src={logoAsset.url}
          alt="Moshe Ganelin"
          className="hero-logo absolute top-[calc(1.25rem+1cm)] left-1/2 z-20 w-[min(80.5vw,620px)] md:top-[calc(1.25rem-1cm)] md:w-[min(70vw,620px)] -translate-x-1/2 object-contain p-3"
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
