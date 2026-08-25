import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const titles: Record<string, string> = {
  "/": "Главная",
  "/about": "Биография",
  "/concerts": "Концерты",
  "/music": "Музыка",
  "/video": "Видео",
  "/gallery": "Галерея",
  "/blog": "Блог",
  "/contacts": "Контакты",
};

export function RouteCurtain() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const previous = useRef(pathname);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    setLabel(titles[pathname] ?? "");
    setActive(true);
    const timer = window.setTimeout(() => setActive(false), 620);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[120] flex items-center justify-center bg-hero text-background transition-[clip-path,opacity] duration-[620ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        active ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(0_0_100%_0)]"
      }`}
    >
      <span
        className={`font-display text-[clamp(1.8rem,6vw,4rem)] transition-opacity duration-300 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
