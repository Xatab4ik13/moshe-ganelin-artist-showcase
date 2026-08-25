import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import pianoAsset from "@/assets/moshe-piano.webp.asset.json";
import organAsset from "@/assets/moshe-organ-wide.webp.asset.json";
import architectureAsset from "@/assets/organ-architecture.webp.asset.json";
import stageAsset from "@/assets/moshe-stage.webp.asset.json";
import consoleAsset from "@/assets/moshe-console.webp.asset.json";
import logoAsset from "@/assets/moshe-ganelin-logo.png.asset.json";
import heroVideoAsset from "@/assets/hero-reger.mp4.asset.json";
import heroPosterAsset from "@/assets/hero-poster.jpg.asset.json";
import menuBgAsset from "@/assets/menu-bg.jpg.asset.json";
import venueCathedral from "@/assets/venue-cathedral.jpg";
import venuePetrikirche from "@/assets/venue-petrikirche.jpg";
import venueHall from "@/assets/venue-hall.jpg";

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
  { day: "14", month: "сентября", city: "Москва", venue: "Кафедральный собор", title: "Органный вечер: от Баха до наших дней", image: venueCathedral },
  { day: "28", month: "сентября", city: "Санкт-Петербург", venue: "Петрикирхе", title: "Музыка соборов. Сольный концерт", image: venuePetrikirche },
  { day: "12", month: "сентября", city: "Москва", venue: "Зал имени Рахманинова", title: "Авторский вечер Moshe Ganelin", image: venueHall },
];


type Video = { id: string; title: string };

const videos: Video[] = [
  { id: "WBZdF8B2wpU", title: "Ganelin — Reger in Harlem" },
  { id: "Q88Nv7ToyN0", title: "Rachmaninoff — Moment musical op. 16 no. 4 (organ)" },
  { id: "jNyTRlUBOks", title: "Improvisation on Christmas themes" },
  { id: "qnOAs0JhL8w", title: "Louis Vierne — Final, Organ Symphony no. 6 op. 59" },
  { id: "yEJB7s02L9c", title: "Ganelin — Organ Symphony No. 4 (2017)" },
  { id: "GoNfKFTRTvU", title: "Chopin — Revolutionary Etude on organ" },
  { id: "iAKPA7E9fY8", title: "The Celtic Lovesong — concerto for organ and orchestra" },
  { id: "2i9yR_80YDI", title: "Prelude and Fugue «Nun komm, der Heiden Heiland»" },
  { id: "LaUCiNaGKws", title: "Scriabin — Le Poème de l'Extase" },
  { id: "Vs56W0_2n7M", title: "A. Mosolov — Iron Foundry (transcription for organ)" },
];

const menuItems = [
  ["Главная", "#top"], ["О музыканте", "#about"], ["Афиша", "#concerts"],
  ["Музыка", "#selected"], ["Видео", "#selected"], ["Блог", "#publications"],
  ["Галерея", "#gallery"], ["Контакты", "#contacts"],
] as const;

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: number) => {
    const rail = carouselRef.current;
    if (!rail) return;
    const step = rail.querySelector("article")?.clientWidth ?? rail.clientWidth * 0.6;
    rail.scrollBy({ left: direction * (step + 28), behavior: "smooth" });
  };



  useEffect(() => {
    if (heroVideoRef.current) heroVideoRef.current.playbackRate = 0.85;
  }, []);


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

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <button
        type="button"
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="group fixed right-[calc(0.75rem_+_var(--scrollbar-width))] top-3 z-50 inline-block p-3 text-background opacity-90 [filter:drop-shadow(0_2px_6px_rgb(0_0_0/0.5))] transition-opacity duration-300 hover:opacity-100 focus:outline-none md:right-[calc(1.5rem_+_var(--scrollbar-width))] md:top-5"
      >
        <span className="relative block h-11 w-14 md:h-14 md:w-[72px]" aria-hidden="true">
          <span className={`menu-stroke absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-current ${menuOpen ? "-translate-y-1/2 rotate-45" : "-translate-y-[9px] md:-translate-y-[11px]"}`} />
          <span className={`menu-stroke absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-current ${menuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`menu-stroke absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full bg-current ${menuOpen ? "translate-y-1/2 -rotate-45" : "translate-y-[9px] md:translate-y-[11px]"}`} />
        </span>
      </button>

      <div className={`menu-panel fixed inset-0 z-40 overflow-hidden bg-hero text-background ${menuOpen ? "menu-panel-open" : ""}`} aria-hidden={!menuOpen}>
          <img src={menuBgAsset.url} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-hero/70" />
          <nav aria-label="Основная навигация" className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-center px-6 py-20 md:px-16 lg:px-24">
            <ol className="grid gap-x-16 lg:grid-cols-2">
              {menuItems.map(([label, href]) => (
                <li key={label} className="overflow-hidden">
                  <a href={href} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)} className="menu-link block py-2 font-display text-[clamp(2rem,5.5vw,5.5rem)] leading-none transition-colors hover:text-background/70 md:py-3">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>




      <section id="top" className="relative min-h-[94svh] overflow-hidden bg-hero text-background">
        <h1 className="sr-only">Moshe Ganelin</h1>
        <video
          ref={heroVideoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideoAsset.url}
          poster={heroPosterAsset.url}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-hero/35" />
        <div className="hero-blur absolute bottom-0 left-0 z-10 h-32 w-full md:h-48" />
        <img
          src={logoAsset.url}
          alt="Moshe Ganelin"
          className="hero-logo absolute top-[calc(1.25rem-1cm)] left-1/2 z-20 w-[min(70vw,620px)] -translate-x-1/2 object-contain"
        />
      </section>

      <section id="concerts" className="bg-background px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="font-display text-5xl leading-none md:text-7xl">Ближайшие<br />концерты</h2>
            <span className="text-[10px] uppercase text-muted-foreground">Сезон 2026 / 27</span>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {concerts.map((concert) => (
              <div key={concert.day} className="flip-card min-h-80">
                <div className="flip-card-inner">
                  <article className="flip-face flex flex-col justify-between border border-border bg-background p-6 md:p-8">
                    <div className="space-y-1">
                      <span className="font-display text-6xl leading-none">{concert.day}</span>
                      <span className="block font-sans text-sm text-muted-foreground">{concert.month}</span>
                      <p className="mt-6 text-base leading-snug text-foreground">{concert.city}, {concert.venue}</p>
                    </div>
                    <h3 className="font-display text-2xl leading-snug">{concert.title}</h3>
                  </article>
                  <article className="flip-face flip-face-back overflow-hidden border border-border bg-foreground text-background">
                    <img src={concert.image} alt={`${concert.city}, ${concert.venue}`} loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-hero/55" />
                    <div className="relative flex h-full flex-col justify-end gap-2 p-6 md:p-8">
                      <span className="text-[10px] uppercase tracking-widest text-background/70">{concert.day} {concert.month}</span>
                      <h3 className="font-display text-2xl leading-snug">{concert.venue}</h3>
                      <p className="text-sm text-background/80">{concert.city}</p>
                    </div>
                  </article>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section id="selected" className="bg-foreground py-24 text-background lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-background/50">Видеоархив</span>
              <h2 className="mt-4 font-display text-5xl leading-none md:text-7xl">Избранные<br />записи</h2>
            </div>
            <div className="flex gap-3">
              <Button aria-label="Предыдущие видео" size="icon" variant="ghost" onClick={() => scrollCarousel(-1)} className="size-12 rounded-full border border-background/25 text-background hover:bg-background/10"><ChevronLeft /></Button>
              <Button aria-label="Следующие видео" size="icon" variant="ghost" onClick={() => scrollCarousel(1)} className="size-12 rounded-full border border-background/25 text-background hover:bg-background/10"><ChevronRight /></Button>
            </div>
          </div>
          <div ref={carouselRef} className="video-rail mt-14 flex snap-x snap-mandatory gap-7 overflow-x-auto pb-16 pt-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
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

function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rx", `${(-y * 9).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
  };

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      className="video-tilt w-[86vw] shrink-0 snap-center sm:w-[62vw] lg:w-[46%] xl:w-[38%]"
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <div ref={cardRef} className="video-tilt-inner">
        <div className="relative aspect-video overflow-hidden rounded-[1.5rem] bg-black">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} aria-label={`Смотреть: ${video.title}`} className="group absolute inset-0 h-full w-full">
              <img
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                loading="lazy"
                className="h-full w-full scale-[1.35] object-cover transition duration-700 group-hover:scale-[1.4]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/35 backdrop-blur-sm transition group-hover:scale-110">
                <Play className="size-6 fill-white text-white" />
              </span>
            </button>
          )}
        </div>
        <h3 className="mt-5 font-display text-xl leading-snug text-background">{video.title}</h3>
      </div>
    </article>
  );
}


function Publication({ type, date, title }: { type: string; date: string; title: string }) {
  return <article className="flex min-h-64 flex-col justify-between border-t border-border pt-5"><div className="flex justify-between text-[10px] uppercase"><span className="text-muted-foreground">{type}</span><time className="text-muted-foreground">{date}</time></div><a href="#contacts" className="group flex items-end justify-between gap-4"><h3 className="font-display text-3xl leading-tight">{title}</h3><ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></article>;
}