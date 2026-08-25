import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SiteMenu } from "@/components/site/SiteMenu";
import { SiteFooter } from "@/components/site/SiteFooter";
import { VideoCard } from "@/components/site/VideoCard";
import { posts, upcomingConcerts, videos } from "@/lib/site-data";
import organAsset from "@/assets/moshe-organ-wide.webp.asset.json";
import architectureAsset from "@/assets/organ-architecture.webp.asset.json";
import stageAsset from "@/assets/moshe-stage.webp.asset.json";
import consoleAsset from "@/assets/moshe-console.webp.asset.json";
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

function Index() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: number) => {
    const rail = carouselRef.current;
    if (!rail) return;
    const step = rail.querySelector("article")?.clientWidth ?? rail.clientWidth * 0.6;
    rail.scrollBy({ left: direction * (step + 28), behavior: "smooth" });
  };

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
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {upcomingConcerts.slice(0, 3).map((concert, index) => (
              <Reveal key={`${concert.day}-${concert.city}`} delay={index * 90} className="flip-card min-h-80">
                <div className="flip-card-inner">
                  <article className="flip-face flex flex-col justify-between border border-border bg-card p-6 md:p-8">
                    <div className="space-y-1">
                      <span className="font-display text-6xl leading-none">{concert.day}</span>
                      <span className="block font-sans text-sm text-muted-foreground">{concert.month}</span>
                      <p className="mt-6 text-base leading-snug text-foreground">{concert.city}, {concert.venue}</p>
                    </div>
                    <h3 className="font-display text-2xl leading-snug">{concert.title}</h3>
                  </article>
                  <article className="flip-face flip-face-back overflow-hidden border border-border bg-hero text-background">
                    <img src={venueImages[index]} alt={`${concert.city}, ${concert.venue}`} loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-hero/55" />
                    <div className="relative flex h-full flex-col justify-end gap-2 p-6 md:p-8">
                      <span className="text-[10px] uppercase tracking-widest text-brass">{concert.day} {concert.month}</span>
                      <h3 className="font-display text-2xl leading-snug">{concert.venue}</h3>
                      <p className="text-sm text-background/80">{concert.city}</p>
                    </div>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="selected" className="bg-hero py-24 text-background lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-brass">Видеоархив</span>
                <h2 className="mt-4 font-display text-5xl leading-none md:text-7xl">Избранные<br />записи</h2>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/video" className="line-link mr-2 text-sm text-background/70">Все видео</Link>
                <Button aria-label="Предыдущие видео" size="icon" variant="ghost" onClick={() => scrollCarousel(-1)} className="size-12 rounded-full border border-background/25 text-background hover:bg-background/10"><ChevronLeft /></Button>
                <Button aria-label="Следующие видео" size="icon" variant="ghost" onClick={() => scrollCarousel(1)} className="size-12 rounded-full border border-background/25 text-background hover:bg-background/10"><ChevronRight /></Button>
              </div>
            </div>
          </Reveal>
          <div ref={carouselRef} className="video-rail mt-14 flex snap-x snap-mandatory gap-7 overflow-x-auto pb-16 pt-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} className="w-[82vw] shrink-0 snap-center sm:w-[26rem] xl:w-[30rem]" />
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="bg-background px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-3">
            <Reveal>
              <h2 className="font-display text-5xl md:text-7xl">Публикации</h2>
              <Link to="/blog" className="line-link mt-6 inline-block text-sm text-petrol">Все публикации</Link>
            </Reveal>
            {posts.slice(0, 2).map((post, index) => (
              <Reveal key={post.slug} delay={index * 90}>
                <article className="flex min-h-64 flex-col justify-between border-t border-border pt-5">
                  <div className="flex justify-between text-[10px] uppercase">
                    <span className="text-petrol">{post.type}</span>
                    <time className="text-muted-foreground">{post.date}</time>
                  </div>
                  <Link to="/blog" className="group flex items-end justify-between gap-4">
                    <h3 className="font-display text-3xl leading-tight">{post.title}</h3>
                    <ArrowUpRight className="size-5 shrink-0 text-brass transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-secondary py-24">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-5xl md:text-7xl">Фотографии</h2>
              <Link to="/gallery" className="line-link text-sm text-petrol">Вся галерея</Link>
            </div>
          </Reveal>
          <div className="grid grid-cols-12 gap-3 md:gap-5">
            <Reveal className="media-zoom col-span-7 overflow-hidden md:col-span-5">
              <img src={organAsset.url} alt="Moshe Ganelin за органом в соборе" loading="lazy" className="aspect-[4/5] h-full w-full object-cover" />
            </Reveal>
            <Reveal delay={90} className="media-zoom col-span-5 mt-20 overflow-hidden md:col-span-3">
              <img src={architectureAsset.url} alt="Исторический орган" loading="lazy" className="aspect-[3/4] w-full object-cover" />
            </Reveal>
            <div className="col-span-12 mt-4 grid grid-cols-2 gap-3 md:col-span-4 md:mt-40 md:grid-cols-1 md:gap-5">
              <Reveal delay={150} className="media-zoom overflow-hidden">
                <img src={stageAsset.url} alt="Moshe Ganelin на сцене" loading="lazy" className="aspect-[3/2] w-full object-cover" />
              </Reveal>
              <Reveal delay={210} className="media-zoom overflow-hidden">
                <img src={consoleAsset.url} alt="Moshe Ganelin играет на органе" loading="lazy" className="aspect-[3/2] w-full object-cover" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
