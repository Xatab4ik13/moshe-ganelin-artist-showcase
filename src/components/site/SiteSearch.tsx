import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import { useLanguage, type DictKey } from "@/lib/i18n";
import { allWorks, pressItems, upcomingConcerts } from "@/lib/site-data";
import { DecoRule } from "./Deco";

type Entry = { title: string; section: string; to: string; hash?: string };

export function SearchButton({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("navSearch")}
        className={`inline-flex items-center gap-2 rounded-full border border-current/30 px-3 py-1.5 text-xs tracking-[0.2em] opacity-80 transition-opacity duration-300 hover:opacity-100 ${className}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.6-3.6" />
        </svg>
        <span className="hidden sm:inline">{t("navSearch").toUpperCase()}</span>
      </button>
      {open ? <SearchOverlay onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const entries = useMemo<Entry[]>(() => {
    const page = (key: DictKey, to: string, section: DictKey, hash?: string): Entry => ({
      title: t(key),
      section: t(section),
      to,
      hash,
    });

    return [
      page("navHome", "/", "navHome"),
      page("navBiography", "/about", "navAbout"),
      page("navPress", "/press", "navAbout"),
      page("navGallery", "/gallery", "navAbout"),
      page("navGanelinMusic", "/music", "navMusic"),
      page("navImprovisations", "/music/improvisations", "navMusic"),
      page("navTranscriptions", "/music/transcriptions", "navMusic"),
      page("navConcertsVideo", "/music/concerts", "navMusic"),
      page("navPoetry", "/poetry", "navPoetry"),
      page("navContact", "/contacts", "navContact"),
      ...allWorks.map((work) => ({
        title: work.title,
        section: t("listOfWorks"),
        to: `/music/works/${work.slug}`,
      })),
      ...upcomingConcerts.map((concert) => ({
        title: `${concert.title} — ${concert.city}`,
        section: t("concertsTitle"),
        to: "/concerts",
      })),
      ...pressItems.map((item) => ({
        title: `${item.title} — ${item.outlet}`,
        section: t("pressTitle"),
        to: "/press",
      })),
    ];
  }, [t]);

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    return entries.filter((entry) => `${entry.title} ${entry.section}`.toLowerCase().includes(value)).slice(0, 12);
  }, [entries, query]);

  return (
    <div className="fixed inset-0 z-[60] flex justify-center bg-hero/95 px-5 pt-24 text-background backdrop-blur-sm md:pt-32">
      <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-default" />
      <div className="relative w-full max-w-3xl">
        <input
          ref={inputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("searchPlaceholder")}
          className="w-full border-0 border-b border-brass/60 bg-transparent pb-4 font-display text-3xl text-background outline-none placeholder:text-background/40 md:text-5xl"
        />
        <DecoRule tone="light" className="mt-5 opacity-70" />

        <div className="mt-6 max-h-[55vh] overflow-y-auto">
          {!query.trim() ? (
            <p className="text-sm tracking-[0.2em] text-background/55">{t("searchHint")}</p>
          ) : results.length === 0 ? (
            <p className="text-sm tracking-[0.2em] text-background/55">{t("searchNoResults")}</p>
          ) : (
            <ul>
              {results.map((entry) => (
                <li key={`${entry.to}-${entry.title}`}>
                  <Link
                    to={entry.to}
                    {...(entry.hash ? { hash: entry.hash } : {})}
                    onClick={onClose}
                    className="flex items-baseline justify-between gap-6 border-b border-background/10 py-4 transition-colors hover:text-brass"
                  >
                    <span className="font-display text-lg md:text-2xl">{entry.title}</span>
                    <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.3em] text-background/50">{entry.section}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
