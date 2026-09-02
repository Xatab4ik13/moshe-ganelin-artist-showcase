import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import type { Concert } from "@/lib/site-data";
import venueCathedralAsset from "@/assets/venue-cathedral.webp.asset.json";
import venuePetrikircheAsset from "@/assets/venue-petrikirche.webp.asset.json";
import venueHallAsset from "@/assets/venue-hall.webp.asset.json";

const venueCathedral = venueCathedralAsset.url;
const venuePetrikirche = venuePetrikircheAsset.url;
const venueHall = venueHallAsset.url;

const venueImages = [venueHall, venueCathedral, venuePetrikirche];

export function ConcertCard({ concert, index }: { concert: Concert; index: number }) {
  const image = venueImages[index % venueImages.length];
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(!!entry && entry.intersectionRatio >= 0.75),
      { threshold: [0, 0.75, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal delay={(index % 3) * 90} className="h-full">
      <Link
        to="/concerts/$slug"
        params={{ slug: concert.slug }}
        ref={cardRef}
        className={`slide-card flex h-full min-h-80 flex-col justify-between border border-border bg-card p-6 focus:outline-none md:p-8 ${active ? "is-active" : ""}`}
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
          <span className="font-display text-7xl leading-none">{concert.day}</span>
          <span className="slide-card-muted block font-sans text-lg text-muted-foreground md:text-xl">
            {concert.month} {concert.year}
          </span>
          <p className="mt-6 text-lg leading-snug md:text-xl">{concert.city}, {concert.venue}</p>
        </div>
        <h3 className="slide-card-body mt-8 font-display text-2xl leading-snug md:text-3xl">{concert.title}</h3>
      </Link>
    </Reveal>
  );
}
