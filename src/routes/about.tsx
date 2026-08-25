import { createFileRoute } from "@tanstack/react-router";


import { PageShell, Placeholder } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import organAsset from "@/assets/moshe-organ-wide.webp.asset.json";
import consoleAsset from "@/assets/moshe-console.webp.asset.json";
import pianoAsset from "@/assets/moshe-piano.webp.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О музыканте — Moshe Ganelin" },
      { name: "description", content: "Биография Moshe Ganelin: композитор, органист и пианист." },
      { property: "og:title", content: "О музыканте — Moshe Ganelin" },
      { property: "og:description", content: "Биография Moshe Ganelin: композитор, органист и пианист." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/about" }],
  }),
  component: AboutPage,
});

const milestones = [
  { title: "Заголовок этапа — пример", text: "Текст этапа биографии — пример, будет заменён." },
  { title: "Заголовок этапа — пример", text: "Текст этапа биографии — пример, будет заменён." },
  { title: "Заголовок этапа — пример", text: "Текст этапа биографии — пример, будет заменён." },
  { title: "Заголовок этапа — пример", text: "Текст этапа биографии — пример, будет заменён." },
];

const shapes = ["milestone-shape-a", "milestone-shape-b", "milestone-shape-c", "milestone-shape-d"];

function Timeline() {
  return (
    <div className="relative mt-14">
      <ul className="space-y-10 md:space-y-16">
        {milestones.map((item, index) => (
          <Reveal
            as="li"
            key={index}
            delay={index * 90}
            className={`relative w-full md:w-[46%] ${
              index % 2 === 0 ? "reveal-left md:mr-auto md:ml-0" : "reveal-right md:ml-auto md:mr-0"
            }`}
          >
            <div className={`milestone-card p-8 md:p-10 ${shapes[index % shapes.length]}`}>
              <h3 className="font-display text-2xl md:text-3xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-background/80">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}


function AboutPage() {
  return (
    <PageShell
      title="Биография"
      lead="Короткое вступление о музыканте — пример текста, который будет заменён финальной редакцией."
      image={organAsset.url}
    >
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <Reveal>
              <p className="font-display text-2xl leading-snug md:text-3xl">
                Ведущий абзац биографии — пример текста. Здесь будет главная мысль о музыканте.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <Placeholder>
                Основной текст биографии — пример. Абзац об образовании, ключевых педагогах и творческом становлении.
              </Placeholder>
            </Reveal>
            <Reveal delay={140}>
              <Placeholder>
                Второй абзац — пример. Концертная деятельность, репертуар, сотрудничество с оркестрами и залами.
              </Placeholder>
            </Reveal>
            <Reveal delay={200}>
              <Placeholder>
                Третий абзац — пример. Композиторская работа, записи, награды и проекты.
              </Placeholder>
            </Reveal>
          </div>
          <Reveal delay={120} className="media-zoom overflow-hidden">
            <img src={consoleAsset.url} alt="Moshe Ganelin за органной кафедрой" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </Reveal>
        </div>

      </section>

      <section className="flex min-h-[80svh] items-center bg-hero px-5 py-24 text-background md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <blockquote className="font-display text-[clamp(1.7rem,4.4vw,3.4rem)] leading-[1.15]">
              «Цитата музыканта — пример текста, который будет заменён финальной редакцией.»
            </blockquote>
            <p className="mt-8 text-sm tracking-wide text-background/60">Moshe Ganelin</p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 text-background lg:py-32">
        <img src={pianoAsset.url} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero/82" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-hero via-hero/55 to-transparent md:h-56" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-hero via-hero/55 to-transparent md:h-44" />
        <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
          <Reveal>
            <h2 className="font-display text-4xl leading-none md:text-6xl">Этапы пути</h2>
          </Reveal>
          <Timeline />
        </div>
      </section>
    </PageShell>
  );
}
