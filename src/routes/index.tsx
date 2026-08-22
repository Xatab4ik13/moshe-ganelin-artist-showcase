import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/moshe-hero.webp.asset.json";
import pianoAsset from "@/assets/moshe-piano.webp.asset.json";
import organAsset from "@/assets/moshe-organ-wide.webp.asset.json";
import architectureAsset from "@/assets/organ-architecture.webp.asset.json";
import stageAsset from "@/assets/moshe-stage.webp.asset.json";
import consoleAsset from "@/assets/moshe-console.webp.asset.json";

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

const concerts = [
  { day: "14", month: "СЕН", city: "Москва", venue: "Кафедральный собор", title: "Органный вечер: от Баха до наших дней" },
  { day: "28", month: "СЕН", city: "Санкт-Петербург", venue: "Петрикирхе", title: "Музыка соборов. Сольный концерт" },
  { day: "12", month: "ОКТ", city: "Москва", venue: "Зал имени Рахманинова", title: "Авторский вечер Moshe Ganelin" },
];

const menuItems = [
  ["Главная", "#top"], ["О музыканте", "#about"], ["Афиша", "#concerts"],
  ["Музыка", "#selected"], ["Видео", "#selected"], ["Блог", "#publications"],
  ["Галерея", "#gallery"], ["Контакты", "#contacts"],
] as const;

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="group fixed right-5 top-5 z-50 size-14 rounded-none bg-primary text-primary-foreground shadow-none hover:bg-primary md:right-10 md:top-8 md:size-16"
      >
        <span className="relative block h-5 w-7" aria-hidden="true">
          <span className={`menu-stroke absolute left-0 top-0 h-px w-7 bg-current ${menuOpen ? "translate-y-[9px] rotate-45" : ""}`} />
          <span className={`menu-stroke absolute left-0 top-[9px] h-px w-7 bg-current ${menuOpen ? "scale-x-0 opacity-0" : ""}`} />
          <span className={`menu-stroke absolute bottom-0 left-0 h-px w-7 bg-current ${menuOpen ? "-translate-y-[9px] -rotate-45" : ""}`} />
        </span>
      </Button>

      <div className={`menu-panel fixed inset-0 z-40 bg-foreground text-background ${menuOpen ? "menu-panel-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Основная навигация" className="mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 py-20 md:px-16 lg:px-24">
          <ol className="grid gap-x-16 lg:grid-cols-2">
            {menuItems.map(([label, href], index) => (
              <li key={label} className="overflow-hidden">
                <a href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="menu-link group flex items-baseline gap-5 py-2 font-display text-[clamp(2rem,5.5vw,5.5rem)] leading-none transition-colors hover:text-primary md:py-3">
                  <span className="w-5 font-sans text-[9px] text-primary">{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-8 font-sans text-[10px] uppercase text-background/50 md:mt-14">
            <a href="#">YouTube</a><a href="#">Telegram</a><a href="#">VK</a><a href="#">SoundCloud</a>
          </div>
        </nav>
      </div>

      <section id="top" className="relative min-h-[94svh] bg-foreground px-5 pb-24 pt-16 text-background md:px-10 md:pt-10 lg:px-16">
        <div className="mx-auto grid min-h-[calc(94svh-7rem)] w-full max-w-[1600px] grid-cols-12 content-center">
          <div className="hero-image col-span-12 row-start-1 self-center md:col-span-8 md:col-start-2 lg:col-span-7 lg:col-start-3">
            <img src={heroAsset.url} alt="Moshe Ganelin за органом" className="aspect-[16/10] w-full object-cover object-center grayscale contrast-125 brightness-75" />
          </div>
          <h1 className="hero-name col-span-12 row-start-1 z-10 self-end pb-4 font-display text-[clamp(3.7rem,12vw,11rem)] leading-[0.78] uppercase mix-blend-difference md:pb-0">
            Moshe<br /><span className="block text-right md:pr-[4vw]">Ganelin</span>
          </h1>
          <div className="col-span-5 col-start-8 row-start-1 z-20 hidden self-end translate-y-1/3 md:block lg:col-span-3 lg:col-start-10">
            <img src={consoleAsset.url} alt="Органная консоль" className="aspect-[3/4] w-full object-cover grayscale contrast-125" />
          </div>
        </div>
      </section>

      <section id="concerts" className="bg-background px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="font-display text-5xl leading-none md:text-7xl">Ближайшие<br />концерты</h2>
            <span className="text-[10px] uppercase text-muted-foreground">Сезон 2026 / 27</span>
          </div>
          <div className="mt-16 grid gap-px bg-border lg:grid-cols-3">
            {concerts.map((concert) => (
              <article key={concert.day} className="group flex min-h-80 flex-col justify-between bg-background p-6 transition-colors hover:bg-foreground hover:text-background md:p-8">
                <div className="flex items-start justify-between"><span className="font-display text-6xl">{concert.day}</span><span className="text-[10px] text-primary">{concert.month}</span></div>
                <div><p className="mb-8 text-xs text-muted-foreground group-hover:text-background/55">{concert.city} · {concert.venue}</p><h3 className="font-display text-2xl leading-snug">{concert.title}</h3></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="selected" className="bg-foreground py-24 text-background lg:py-32">
        <div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:px-10 lg:grid-cols-[0.55fr_1.45fr] lg:px-16">
          <div className="flex flex-col justify-between"><span className="text-[10px] text-primary">01 / ИЗБРАННОЕ</span><h2 className="mt-12 font-display text-4xl leading-tight md:text-6xl">Орган как целый оркестр</h2></div>
          <div className="group relative aspect-[16/10] overflow-hidden">
            <img src={pianoAsset.url} alt="Moshe Ganelin во время выступления" loading="lazy" className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.02] group-hover:grayscale-0" />
            <Button aria-label="Смотреть видео" size="icon" className="absolute bottom-0 left-0 size-16 rounded-none bg-primary text-primary-foreground shadow-none hover:bg-primary/90"><Play className="fill-current" /></Button>
          </div>
        </div>
      </section>

      <section id="publications" className="bg-background px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-3">
            <h2 className="font-display text-5xl md:text-7xl">Публикации</h2>
            <Publication type="Эссе" date="18.08.2026" title="Тишина до первой ноты" />
            <Publication type="Интервью" date="02.07.2026" title="Инструмент, который дышит зданием" />
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-foreground py-24 text-background">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
          <div className="grid grid-cols-12 gap-3 md:gap-5">
            <img src={organAsset.url} alt="Moshe Ganelin за органом в соборе" loading="lazy" className="col-span-7 aspect-[4/5] h-full w-full object-cover grayscale md:col-span-5" />
            <img src={architectureAsset.url} alt="Исторический орган" loading="lazy" className="col-span-5 mt-20 aspect-[3/4] w-full object-cover grayscale md:col-span-3" />
            <div className="col-span-12 mt-4 grid grid-cols-2 gap-3 md:col-span-4 md:mt-40 md:grid-cols-1 md:gap-5">
              <img src={stageAsset.url} alt="Moshe Ganelin на сцене" loading="lazy" className="aspect-[3/2] w-full object-cover grayscale" />
              <img src={consoleAsset.url} alt="Moshe Ganelin играет на органе" loading="lazy" className="aspect-[3/2] w-full object-cover grayscale" />
            </div>
          </div>
        </div>
      </section>

      <footer id="contacts" className="bg-primary px-5 py-20 text-primary-foreground md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1600px]">
          <h2 className="font-display text-[clamp(3.2rem,9vw,9rem)] leading-none">Moshe Ganelin</h2>
          <div className="mt-14 flex flex-col justify-between gap-8 text-xs md:flex-row md:items-end"><a href="mailto:concerts@moshearielganelin.com">concerts@moshearielganelin.com</a><span>© 2026</span></div>
        </div>
      </footer>
    </main>
  );
}

function Publication({ type, date, title }: { type: string; date: string; title: string }) {
  return <article className="flex min-h-64 flex-col justify-between border-t border-border pt-5"><div className="flex justify-between text-[10px] uppercase"><span className="text-primary">{type}</span><time className="text-muted-foreground">{date}</time></div><a href="#contacts" className="group flex items-end justify-between gap-4"><h3 className="font-display text-3xl leading-tight">{title}</h3><ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></article>;
}