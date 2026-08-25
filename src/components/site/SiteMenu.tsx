import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import menuBgAsset from "@/assets/menu-bg.jpg.asset.json";

export const menuItems = [
  { label: "Главная", to: "/" },
  { label: "О музыканте", to: "/about" },
  { label: "Афиша", to: "/concerts" },
  { label: "Музыка", to: "/music" },
  { label: "Видео", to: "/video" },
  { label: "Блог", to: "/blog" },
  { label: "Галерея", to: "/gallery" },
  { label: "Контакты", to: "/contacts" },
] as const;

export function SiteMenu({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [menuOpen, setMenuOpen] = useState(false);

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
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const barTone = menuOpen || tone === "light" ? "text-background" : "text-foreground";

  return (
    <>
      <button
        type="button"
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className={`group fixed right-[calc(0.75rem_+_var(--scrollbar-width))] top-3 z-50 inline-block p-3 opacity-90 [filter:drop-shadow(0_2px_6px_rgb(0_0_0/0.35))] transition-opacity duration-300 hover:opacity-100 focus:outline-none md:right-[calc(1.5rem_+_var(--scrollbar-width))] md:top-5 ${barTone}`}
      >
        <span className="relative block h-11 w-14 md:h-14 md:w-[72px]" aria-hidden="true">
          <span className={`menu-stroke absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-current ${menuOpen ? "-translate-y-1/2 rotate-45" : "-translate-y-[9px] md:-translate-y-[11px]"}`} />
          <span className={`menu-stroke absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-current ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`menu-stroke absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-current ${menuOpen ? "translate-y-1/2 -rotate-45" : "translate-y-[9px] md:translate-y-[11px]"}`} />
        </span>
      </button>

      <div
        className={`menu-panel fixed inset-0 z-40 overflow-hidden bg-hero text-background ${menuOpen ? "menu-panel-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <img src={menuBgAsset.url} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero/70" />
        <nav aria-label="Основная навигация" className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 py-20 md:px-16 lg:px-24">
          <ol className="grid gap-x-16 lg:grid-cols-2">
            {menuItems.map((item) => (
              <li key={item.to} className="overflow-hidden">
                <Link
                  to={item.to}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                  activeProps={{ className: "text-brass" }}
                  className="menu-link block py-2 font-display text-[clamp(2rem,5.5vw,5.5rem)] leading-none transition-colors hover:text-brass md:py-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}
