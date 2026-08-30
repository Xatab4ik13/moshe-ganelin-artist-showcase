import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import menuBgAsset from "@/assets/menu-bg.jpg.asset.json";
import logoAsset from "@/assets/moshe-ganelin-logo.png.asset.json";
import { haptic } from "@/lib/haptics";
import { langOptions, useLanguage, type DictKey } from "@/lib/i18n";
import { SocialIconSvg, socialLinks } from "./social-icons";

type MenuChild = { labelKey: DictKey; to: string; hash?: string };
type MenuItem = { labelKey: DictKey; to?: string; children?: MenuChild[] };

const menuItems: MenuItem[] = [
  { labelKey: "navHome", to: "/" },
  {
    labelKey: "navAbout",
    children: [
      { labelKey: "navBio", to: "/about" },
      { labelKey: "navPublications", to: "/about", hash: "publications" },
    ],
  },
  {
    labelKey: "navMusic",
    children: [
      { labelKey: "navOrgan", to: "/music", hash: "organ" },
      { labelKey: "navOrchestra", to: "/music", hash: "orchestra" },
      { labelKey: "navPiano", to: "/music", hash: "piano" },
      { labelKey: "navTranscriptions", to: "/music", hash: "transcriptions" },
      { labelKey: "navRecordings", to: "/music", hash: "recordings" },
    ],
  },
  {
    labelKey: "navPoetry",
    children: [
      { labelKey: "langRussian", to: "/poetry", hash: "russian" },
      { labelKey: "langEnglish", to: "/poetry", hash: "english" },
      { labelKey: "langSpanish", to: "/poetry", hash: "spanish" },
      { labelKey: "langPortuguese", to: "/poetry", hash: "portuguese" },
    ],
  },
  { labelKey: "navConcerts", to: "/concerts" },
  { labelKey: "navGallery", to: "/gallery" },
  { labelKey: "navContact", to: "/contacts" },
];

type PanelState = "closed" | "open" | "closing";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  return (
    <div className={`flex items-center gap-1 ${className}`} role="group" aria-label="Language">
      {langOptions.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => {
            setLang(option.code);
            haptic(6);
          }}
          aria-pressed={lang === option.code}
          className={`px-2.5 py-1.5 text-xs tracking-[0.2em] transition-colors duration-300 ${
            lang === option.code ? "text-brass" : "opacity-55 hover:opacity-100"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function SiteMenu({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { t } = useLanguage();
  const [panel, setPanel] = useState<PanelState>("closed");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const timer = useRef<number | null>(null);
  const menuOpen = panel === "open";

  const close = useCallback(() => {
    setPanel((current) => (current === "open" ? "closing" : current));
    haptic(8);
  }, []);

  const open = useCallback(() => {
    setPanel("open");
    haptic(14);
  }, []);

  useEffect(() => {
    if (panel !== "closing") return;
    timer.current = window.setTimeout(() => setPanel("closed"), 650);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [panel]);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.body.style.setProperty("--scrollbar-width", "0px");
      return;
    }
    const width = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.setProperty("--scrollbar-width", `${width}px`);
    document.body.style.paddingRight = `${width}px`;
    document.body.style.overflow = "hidden";
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const barTone = menuOpen || tone === "light" ? "text-background" : "text-foreground";
  const panelClass =
    panel === "open" ? "menu-panel-open" : panel === "closing" ? "menu-panel-closing" : "menu-panel-reset";

  return (
    <>
      <LanguageSwitcher
        className={`fixed left-[calc(0.75rem)] top-6 z-50 md:left-6 md:top-8 ${barTone} [filter:drop-shadow(0_2px_6px_rgb(0_0_0/0.35))]`}
      />

      <button
        type="button"
        aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
        aria-expanded={menuOpen}
        onClick={() => (menuOpen ? close() : open())}
        className={`group fixed right-[calc(0.75rem_+_var(--scrollbar-width))] top-3 z-50 inline-block p-3 opacity-90 [filter:drop-shadow(0_2px_6px_rgb(0_0_0/0.35))] transition-opacity duration-300 hover:opacity-100 focus:outline-none md:right-[calc(1.5rem_+_var(--scrollbar-width))] md:top-5 ${barTone}`}
      >
        <span className="relative block h-11 w-14 md:h-14 md:w-[72px]" aria-hidden="true">
          <span className={`menu-stroke absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-current ${menuOpen ? "-translate-y-1/2 rotate-45" : "-translate-y-[9px] md:-translate-y-[11px]"}`} />
          <span className={`menu-stroke absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-current ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`menu-stroke absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-current ${menuOpen ? "translate-y-1/2 -rotate-45" : "translate-y-[9px] md:translate-y-[11px]"}`} />
        </span>
      </button>

      <div
        className={`menu-panel fixed inset-0 z-40 overflow-hidden bg-hero text-background ${panelClass}`}
        aria-hidden={!menuOpen}
      >
        <img src={menuBgAsset.url} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero/70" />

        <img
          src={logoAsset.url}
          alt="Moshe Ariel Ganelin"
          className="hero-logo pointer-events-none absolute top-[calc(1.25rem+1cm)] left-1/2 z-10 w-[min(80.5vw,620px)] md:top-[calc(1.25rem-1cm)] md:w-[min(70vw,620px)] -translate-x-1/2 object-contain"
        />

        <nav
          aria-label={t("mainNav")}
          className="relative mx-auto flex h-full max-w-[1600px] flex-col items-end justify-center gap-8 px-6 py-24 text-right md:px-16 lg:px-24"
        >
          <ol className="flex flex-col items-end">
            {menuItems.map((item) =>
              item.children ? (
                <li key={item.labelKey} className="flex flex-col items-end">
                  <button
                    type="button"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() =>
                      setOpenGroups((value) => ({ ...value, [item.labelKey]: !value[item.labelKey] }))
                    }
                    aria-expanded={!!openGroups[item.labelKey]}
                    className="menu-link block py-1.5 font-display text-[clamp(1.7rem,4vw,3.4rem)] leading-tight transition-colors hover:text-brass md:py-2"
                  >
                    {t(item.labelKey)}
                    <span className={`ml-3 inline-block text-[0.5em] transition-transform duration-300 ${openGroups[item.labelKey] ? "rotate-90" : ""}`}>›</span>
                  </button>
                  <ul
                    className={`flex flex-col items-end overflow-hidden transition-all duration-500 ${openGroups[item.labelKey] ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {item.children.map((child) => (
                      <li key={child.labelKey}>
                        <Link
                          to={child.to}
                          hash={child.hash}
                          tabIndex={menuOpen && openGroups[item.labelKey] ? 0 : -1}
                          onClick={close}
                          activeProps={{ className: "text-brass" }}
                          className="block py-1 pr-1 font-sans text-base tracking-wide text-background/75 transition-colors hover:text-brass md:text-lg"
                        >
                          {t(child.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to} className="overflow-hidden">
                  <Link
                    to={item.to!}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={close}
                    activeProps={{ className: "text-brass" }}
                    className="menu-link block py-1.5 font-display text-[clamp(1.7rem,4vw,3.4rem)] leading-tight transition-colors hover:text-brass md:py-2"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ),
            )}
          </ol>

          <div className="flex flex-col items-end gap-6">
            <LanguageSwitcher />
            <ul className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <li key={social.key}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={menuOpen ? 0 : -1}
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full border border-background/35 text-background/85 transition-colors hover:border-brass hover:text-brass"
                  >
                    <SocialIconSvg path={social.path} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}
