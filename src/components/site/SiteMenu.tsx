import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import menuBgAsset from "@/assets/menu-bg.jpg.asset.json";
import logoAsset from "@/assets/moshe-ganelin-logo.png.asset.json";
import { haptic } from "@/lib/haptics";
import { SocialIconSvg, socialLinks } from "./social-icons";

export const menuItems = [
  { label: "Главная", to: "/" },
  { label: "О музыканте", to: "/about" },
  { label: "Афиша", to: "/concerts" },
  {
    label: "Медиа",
    children: [
      { label: "Музыка", to: "/music" },
      { label: "Видео", to: "/video" },
      { label: "Галерея", to: "/gallery" },
    ],
  },
  { label: "Блог", to: "/blog" },
  { label: "Контакты", to: "/contacts" },
] as const;

type PanelState = "closed" | "open" | "closing";

export function SiteMenu({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [panel, setPanel] = useState<PanelState>("closed");
  const [mediaOpen, setMediaOpen] = useState(false);
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
      <button
        type="button"
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
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
          alt="Moshe Ganelin"
          className="hero-logo pointer-events-none absolute top-[calc(1.25rem-1cm)] left-1/2 z-10 w-[min(70vw,620px)] -translate-x-1/2 object-contain"
        />

        <nav
          aria-label="Основная навигация"
          className="relative mx-auto flex h-full max-w-[1600px] flex-col items-end justify-center gap-8 px-6 py-24 text-right md:px-16 lg:px-24"
        >
          <ol className="flex flex-col items-end">
            {menuItems.map((item) =>
              "children" in item ? (
                <li key={item.label} className="flex flex-col items-end">
                  <button
                    type="button"
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={() => setMediaOpen((value) => !value)}
                    aria-expanded={mediaOpen}
                    className="menu-link block py-1.5 font-display text-[clamp(1.7rem,4vw,3.4rem)] leading-tight transition-colors hover:text-brass md:py-2"
                  >
                    {item.label}
                    <span className={`ml-3 inline-block text-[0.5em] transition-transform duration-300 ${mediaOpen ? "rotate-90" : ""}`}>›</span>
                  </button>
                  <ul
                    className={`flex flex-col items-end overflow-hidden transition-all duration-500 ${mediaOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <Link
                          to={child.to}
                          tabIndex={menuOpen && mediaOpen ? 0 : -1}
                          onClick={close}
                          activeProps={{ className: "text-brass" }}
                          className="block py-1 pr-1 font-sans text-base tracking-wide text-background/75 transition-colors hover:text-brass md:text-lg"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to} className="overflow-hidden">
                  <Link
                    to={item.to}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={close}
                    activeProps={{ className: "text-brass" }}
                    className="menu-link block py-1.5 font-display text-[clamp(1.7rem,4vw,3.4rem)] leading-tight transition-colors hover:text-brass md:py-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ol>

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
        </nav>
      </div>
    </>
  );
}
