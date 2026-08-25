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

      <section className="bg-hero py-24 text-background lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 lg:px-16">
          <Reveal>
            <h2 className="font-display text-4xl leading-none md:text-6xl">Этапы пути</h2>
          </Reveal>
          <ol className="mt-14 border-t border-background/15">
            {milestones.map((item, index) => (
              <Reveal as="li" key={index} delay={index * 70} className="grid gap-4 border-b border-background/15 py-8 md:grid-cols-[8rem_1fr_1.2fr] md:items-baseline">
                <span className="font-display text-3xl text-brass">{item.year}</span>
                <h3 className="font-display text-xl">{item.title}</h3>
                <p className="text-sm text-background/70">{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16">
        <Reveal className="media-zoom overflow-hidden">
          <img src={pianoAsset.url} alt="Moshe Ganelin за роялем" loading="lazy" className="aspect-[16/7] w-full object-cover" />
        </Reveal>
      </section>
    </PageShell>
  );
}
