import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
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
      { title: "Moshe Ganelin — композитор, органист, пианист" },
      { name: "description", content: "Официальный сайт Moshe Ganelin: концерты, музыка, видео, публикации и фотографии композитора, органиста и пианиста." },
      { property: "og:title", content: "Moshe Ganelin — композитор, органист, пианист" },
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

function Index() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-background/25 text-background">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10 lg:px-16">
          <a href="#top" className="font-display text-xl">MG</a>
          <nav aria-label="Основная навигация" className="hidden items-center gap-7 text-[11px] font-semibold uppercase md:flex">
            <a className="transition-colors hover:text-primary" href="#concerts">Афиша</a>
            <a className="transition-colors hover:text-primary" href="#selected">Музыка</a>
            <a className="transition-colors hover:text-primary" href="#selected">Видео</a>
            <a className="transition-colors hover:text-primary" href="#publications">Блог</a>
            <a className="transition-colors hover:text-primary" href="#gallery">Галерея</a>
            <a className="transition-colors hover:text-primary" href="#contacts">Контакты</a>
          </nav>
          <span className="text-[10px] font-semibold uppercase md:hidden">Меню</span>
        </div>
      </header>

      <section id="top" className="relative min-h-[92svh] bg-foreground text-background">
        <img src={heroAsset.url} alt="Moshe Ganelin за органом" className="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-80" />
        <div className="absolute inset-0 bg-linear-to-r from-foreground/90 via-foreground/35 to-transparent" />
        <div className="relative mx-auto flex min-h-[92svh] max-w-[1600px] flex-col justify-end px-5 pb-10 pt-32 md:px-10 md:pb-14 lg:px-16">
          <div className="hero-reveal max-w-5xl">
            <p className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase"><span className="h-px w-10 bg-primary" />Композитор · Органист · Пианист</p>
            <h1 className="font-display text-[clamp(4rem,11vw,10rem)] leading-[0.84]">Moshe<br />Ganelin</h1>
          </div>
          <div className="mt-9 flex items-end justify-between border-t border-background/30 pt-5">
            <p className="max-w-xs text-sm leading-6 text-background/75">Музыка между архитектурой звука, импровизацией и живой традицией.</p>
            <a href="#concerts" aria-label="Перейти к афише" className="flex size-11 items-center justify-center border border-background/40 transition-colors hover:border-primary hover:text-primary"><ArrowDown className="size-4" /></a>
          </div>
        </div>
      </section>

      <section id="concerts" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <SectionHeading number="01" title="Ближайшие концерты" aside="Сезон 2026 / 27" />
        <div className="mt-14 border-t border-border">
          {concerts.map((concert) => (
            <article key={concert.day} className="group grid gap-5 border-b border-border py-7 md:grid-cols-[110px_1fr_1.3fr_auto] md:items-center md:gap-8">
              <div className="flex items-baseline gap-3"><span className="font-display text-4xl">{concert.day}</span><span className="text-[10px] font-semibold text-primary">{concert.month}</span></div>
              <div><p className="text-sm font-semibold">{concert.city}</p><p className="mt-1 text-xs text-muted-foreground">{concert.venue}</p></div>
              <h3 className="font-display text-xl leading-snug md:text-2xl">{concert.title}</h3>
              <a href="#contacts" className="flex items-center gap-2 text-[10px] font-semibold uppercase transition-colors group-hover:text-primary">Подробнее <ArrowUpRight className="size-3.5" /></a>
            </article>
          ))}
        </div>
      </section>

      <section id="selected" className="bg-foreground py-20 text-background lg:py-28">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 md:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:px-16">
          <div className="flex flex-col justify-between py-2">
            <div>
              <p className="text-[10px] font-semibold text-primary">02 / ИЗБРАННОЕ</p>
              <h2 className="mt-8 max-w-lg font-display text-4xl leading-tight md:text-6xl">Орган как целый оркестр</h2>
              <p className="mt-7 max-w-md text-sm leading-7 text-background/60">Фрагмент сольного концерта. Музыка Иоганна Себастьяна Баха в пространстве кафедрального собора.</p>
            </div>
            <p className="mt-12 text-[10px] uppercase text-background/45">Видео · 18:42 · Концертная запись</p>
          </div>
          <div className="group relative aspect-[4/3] overflow-hidden">
            <img src={pianoAsset.url} alt="Moshe Ganelin во время выступления" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]" />
            <div className="absolute inset-0 bg-foreground/15" />
            <Button aria-label="Смотреть видео" size="icon" className="absolute bottom-6 left-6 size-14 rounded-none bg-primary text-primary-foreground shadow-none hover:bg-primary/90"><Play className="fill-current" /></Button>
          </div>
        </div>
      </section>

      <section id="publications" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <SectionHeading number="03" title="Публикации" aside="Мысли о музыке и времени" />
        <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1fr_0.55fr]">
          <Publication type="Эссе" date="18.08.2026" title="Тишина до первой ноты" text="О паузе как части музыкальной формы и о том, почему слушание начинается раньше звука." />
          <Publication type="Интервью" date="02.07.2026" title="Инструмент, который дышит зданием" text="Разговор об органе, пространстве собора и свободе исполнителя внутри многовековой традиции." />
          <a href="#contacts" className="group flex items-end justify-between border-t border-primary pt-5 text-xs font-semibold uppercase text-primary lg:ml-8">Все публикации <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
        </div>
      </section>

      <section id="gallery" className="border-y border-border py-20">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
          <div className="mb-10 flex items-end justify-between"><h2 className="font-display text-4xl md:text-5xl">Фотографии</h2><span className="text-[10px] font-semibold text-primary">04 / АРХИВ</span></div>
          <div className="grid grid-cols-12 gap-3 md:gap-5">
            <img src={organAsset.url} alt="Moshe Ganelin за органом в соборе" loading="lazy" className="col-span-5 h-full max-h-[620px] w-full object-cover" />
            <img src={architectureAsset.url} alt="Исторический орган в концертном зале" loading="lazy" className="col-span-3 mt-16 h-[75%] w-full object-cover" />
            <div className="col-span-4 grid gap-3 md:gap-5">
              <img src={stageAsset.url} alt="Moshe Ganelin на сцене" loading="lazy" className="aspect-[3/2] w-full object-cover" />
              <img src={consoleAsset.url} alt="Moshe Ganelin играет на органе" loading="lazy" className="aspect-[3/2] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <footer id="contacts" className="bg-foreground px-5 py-20 text-background md:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1600px]">
          <p className="text-[10px] font-semibold text-primary">05 / СВЯЗЬ</p>
          <div className="mt-8 grid gap-14 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
            <div><h2 className="font-display text-[clamp(3rem,7vw,7rem)] leading-none">Moshe Ganelin</h2><a href="mailto:concerts@moshearielganelin.com" className="mt-8 inline-block border-b border-background/35 pb-2 text-sm transition-colors hover:border-primary hover:text-primary">concerts@moshearielganelin.com</a></div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-background/20 pt-6 text-xs uppercase"><a href="#" className="hover:text-primary">YouTube</a><a href="#" className="hover:text-primary">Telegram</a><a href="#" className="hover:text-primary">VK</a><a href="#" className="hover:text-primary">SoundCloud</a></div>
          </div>
          <div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-background/20 pt-5 text-[9px] uppercase text-background/40"><span>© 2026 Moshe Ganelin</span><span>Композитор · Органист · Пианист</span></div>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ number, title, aside }: { number: string; title: string; aside: string }) {
  return <div className="grid items-end gap-5 md:grid-cols-[90px_1fr_auto]"><span className="text-[10px] font-semibold text-primary">{number} /</span><h2 className="font-display text-4xl md:text-6xl">{title}</h2><p className="text-[10px] font-semibold uppercase text-muted-foreground">{aside}</p></div>;
}

function Publication({ type, date, title, text }: { type: string; date: string; title: string; text: string }) {
  return <article className="border-t border-border pt-5"><div className="flex justify-between text-[10px] font-semibold uppercase"><span className="text-primary">{type}</span><time className="text-muted-foreground">{date}</time></div><h3 className="mt-8 max-w-lg font-display text-2xl leading-snug md:text-3xl">{title}</h3><p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">{text}</p><a href="#contacts" className="mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase">Читать <ArrowUpRight className="size-3.5" /></a></article>;
}
