import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { musicSections } from "@/lib/site-data";
import pianoAsset from "@/assets/moshe-piano.webp.asset.json";

export const Route = createFileRoute("/music")({
  head: () => ({
    meta: [
      { title: "Музыка — Moshe Ganelin" },
      { name: "description", content: "Сочинения Moshe Ganelin по разделам: орган, фортепиано, оркестр, транскрипции. Записи и ноты." },
      { property: "og:title", content: "Музыка — Moshe Ganelin" },
      { property: "og:description", content: "Сочинения по разделам: орган, фортепиано, оркестр, транскрипции." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/music" }],
  }),
  component: MusicPage,
});

function MusicPage() {
  return (
    <PageShell
      eyebrow="Музыка"
      title="Сочинения и записи"
      lead="Разделы по направлениям, ссылки на записи и ноты — пример текста."
      image={pianoAsset.url}
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        {musicSections.map((section, sectionIndex) => (
          <section key={section.section} className="mb-24 last:mb-0">
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border pb-6">
                <h2 className="font-display text-3xl leading-none md:text-5xl">{section.section}</h2>
                <span className="text-[10px] uppercase tracking-[0.4em] text-petrol">
                  {String(sectionIndex + 1).padStart(2, "0")} / {section.works.length} произведения
                </span>
              </div>
              <p className="mt-5 max-w-2xl text-sm text-muted-foreground">{section.description}</p>
            </Reveal>

            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {section.works.map((work, index) => (
                <Reveal as="li" key={work.title} delay={index * 70}>
                  <article className="group flex h-full flex-col justify-between gap-8 border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brass hover:shadow-[0_24px_50px_-24px_oklch(0_0_0/0.35)]">
                    <div>
                      <h3 className="font-display text-2xl leading-snug">{work.title}</h3>
                      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        {work.year} · {work.duration}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      {work.links.map((link) => (
                        <a key={link.label} href={link.href} className="line-link text-petrol">
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
