import { useEffect, useState } from "react";

import { LogoText } from "@/components/site/LogoText";

/**
 * Тёмная заставка: фон -> логотип -> уход.
 * Держится, пока не будет готово hero-видео (или до таймаута).
 */
export function SitePreloader({ ready }: { ready: boolean }) {
  const [minTimePassed, setMinTimePassed] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const min = window.setTimeout(() => setMinTimePassed(true), 900);
    const max = window.setTimeout(() => setTimedOut(true), 4000);
    return () => {
      window.clearTimeout(min);
      window.clearTimeout(max);
    };
  }, []);

  const done = (ready && minTimePassed) || timedOut;

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setGone(true), 560);
    return () => window.clearTimeout(t);
  }, [done]);

  useEffect(() => {
    if (gone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div className={`preloader${done ? " preloader-out" : ""}`} aria-hidden="true">
      <LogoText variant="brass" className="preloader-logo w-[min(76vw,360px)] text-[clamp(2rem,5.6vw,3.8rem)]" />
    </div>
  );
}
