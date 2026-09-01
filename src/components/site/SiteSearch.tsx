import { Link } from "@tanstack/react-router";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import { useLanguage, type DictKey } from "@/lib/i18n";
import { allWorks, pressItems, upcomingConcerts } from "@/lib/site-data";


type Entry = { title: string; section: string; to: string; hash?: string | undefined };

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
      {open && typeof document !== "undefined"
        ? createPortal(<SearchOverlay onClose={() => setOpen(false)} />, document.body)
        : null}
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
    <div className="fixed inset-0 z-[60] flex justify-center px-4 pt-20 md:pt-28">
      <button
        type="button"
        aria-label={t("closeMenu")}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-hero/80"
      />
      <div className="relative w-full max-w-2xl self-start border border-brass/35 bg-card shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4 shrink-0 text-petrol" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.6-3.6" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full bg-transparent font-sans text-lg text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("closeMenu")}
            className="shrink-0 rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
          {!query.trim() ? (
            <p className="font-sans text-sm text-muted-foreground">{t("searchHint")}</p>
          ) : results.length === 0 ? (
            <p className="font-sans text-sm text-muted-foreground">{t("searchNoResults")}</p>
          ) : (
            <ul>
              {results.map((entry) => (
                <li key={`${entry.to}-${entry.title}`}>
                  <Link
                    to={entry.to}
                    {...(entry.hash ? { hash: entry.hash } : {})}
                    onClick={onClose}
                    className="flex items-baseline justify-between gap-6 border-b border-border py-3 transition-colors last:border-b-0 hover:text-petrol"
                  >
                    <span className="font-sans text-base">{entry.title}</span>
                    <span className="shrink-0 font-sans text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {entry.section}
                    </span>
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
