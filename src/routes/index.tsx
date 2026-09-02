import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { ConcertCard } from "@/components/site/ConcertCard";
import { DecoRule } from "@/components/site/Deco";
import { LogoText } from "@/components/site/LogoText";
import { Reveal } from "@/components/site/Reveal";
import { SiteMenu } from "@/components/site/SiteMenu";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SitePreloader } from "@/components/site/SitePreloader";
import { pressItems, upcomingConcerts, videos, youtubeChannelUrl } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n";
import heroVideoAsset from "@/assets/hero-reger.mp4.asset.json";
import heroVideoLightAsset from "@/assets/hero-reger-light.mp4.asset.json";
import heroPosterAsset from "@/assets/hero-poster.jpg.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moshe Ariel Ganelin — official website" },
      { name: "description", content: "Official website of Moshe Ariel Ganelin: concerts, music, poetry and photographs." },
      { property: "og:title", content: "Moshe Ariel Ganelin — official website" },
      { property: "og:description", content: "Concerts, music, poetry and publications of Moshe Ariel Ganelin." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://moshearielganelin.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/" }],
  }),
  component: Index,
});

function Index() {
  const { t } = useLanguage();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const apply = () => { video.playbackRate = 0.85; };

    const connection = (navigator as any).connection;
    const slow =
      connection?.saveData === true ||
      ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
    video.src = slow ? heroVideoLightAsset.url : heroVideoAsset.url;
    video.load();

    const markReady = () => { apply(); setVideoReady(true); };
    apply();
    if (video.readyState >= 2) setVideoReady(true);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("play", apply);
    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("play", apply);
    };
  }, []);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <SitePreloader ready={videoReady} />
      <SiteMenu tone="light" home />

      <section id="top" className="relative min-h-[100svh] overflow-hidden bg-hero text-background">
        <h1 className="sr-only">Moshe Ariel Ganelin</h1>
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover object-[58%_center] [transform:translateZ(0)] md:object-center"
          poster={heroPosterAsset.url}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="auto"
        />
        <div className="absolute inset-0 bg-hero/30 md:bg-hero/45" />
        <div className="hero-blur absolute bottom-0 left-0 z-10 h-20 w-full md:h-48" />

        <Link
          to="/"
          aria-label="Moshe Ariel Ganelin — Home"
          className="hero-logo absolute left-1/2 top-[26px] z-20 -translate-x-1/2 md:top-[10px]"
        >
          <LogoText variant="brass" className="w-[min(42.9vw,165px)] md:w-[min(28.75vw,379px)]" />
        </Link>

      </section>


      <section id="concerts" className="bg-background px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <h2 className="font-display text-5xl leading-none md:text-7xl">{t("homeUpcoming")}</h2>
              <Link to="/concerts" className="line-link text-base text-petrol">{t("homeAllConcerts")}</Link>
            </div>
            <DecoRule className="mt-8" />
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

      <section id="press" className="bg-card px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <h2 className="font-display text-5xl leading-none md:text-7xl">{t("homePress")}</h2>
              <Link to="/press" className="line-link text-base text-petrol">{t("homePressAll")}</Link>
            </div>
            <DecoRule className="mt-8" />
          </Reveal>

          <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
            {pressItems.map((item, index) => (
              <Reveal key={item.slug} delay={index * 60}>
                <article className="h-full border border-border bg-background p-7">
                  <p className="text-xs uppercase tracking-[0.32em] text-petrol">
                    {item.outlet} · {item.date}
                  </p>
                  <h3 className="mt-4 font-display text-xl leading-snug md:text-2xl">{item.title}</h3>
                  <p className="mt-4 text-base italic leading-relaxed text-muted-foreground">{item.quote}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="video" className="bg-hero px-5 py-24 text-background md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <h2 className="font-display text-5xl leading-none md:text-7xl">{t("homeVideo")}</h2>
              <a href={youtubeChannelUrl} target="_blank" rel="noreferrer" className="line-link text-base text-brass">
                {t("homeVideoAll")}
              </a>
            </div>
            <DecoRule tone="light" className="mt-8" />
          </Reveal>

          <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
            {videos.slice(0, 3).map((video, index) => (
              <Reveal key={video.id} delay={index * 70} className="w-[82%] shrink-0 snap-start md:w-auto">
                <article className="border border-background/15 bg-background/5 p-4">
                  <div className="aspect-video w-full overflow-hidden">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                      title={video.title}
                      loading="lazy"
                      allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-lg leading-snug md:text-xl">{video.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <SiteFooter />
    </main>
  );
}
