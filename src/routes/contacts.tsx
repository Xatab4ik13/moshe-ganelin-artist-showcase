import { createFileRoute } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Moshe Ganelin" },
      { name: "description", content: "Контакты для концертных предложений, прессы и сотрудничества с Moshe Ganelin." },
      { property: "og:title", content: "Контакты — Moshe Ganelin" },
      { property: "og:description", content: "Контакты для концертных предложений, прессы и сотрудничества." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/contacts" }],
  }),
  component: ContactsPage,
});

const blocks = [
  { title: "Концерты и ангажемент", value: "concerts@moshearielganelin.com", note: "Описание — пример текста." },
  { title: "Пресса", value: "press@moshearielganelin.com", note: "Описание — пример текста." },
  { title: "Ноты и издания", value: "scores@moshearielganelin.com", note: "Описание — пример текста." },
];

function ContactsPage() {
  return (
    <PageShell
      title="Связаться"
      lead="Ниже — контактные направления. Тексты и адреса будут заменены финальными."
    >
      <section className="mx-auto max-w-[1600px] px-5 pb-24 pt-10 md:px-10 lg:px-16 lg:pb-32">
        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map((block, index) => (
            <Reveal key={block.title} delay={index * 80}>
              <article className="flex h-full flex-col justify-between gap-8 border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-brass hover:shadow-[0_24px_50px_-24px_oklch(0_0_0/0.35)]">
                <h2 className="font-display text-2xl leading-snug">{block.title}</h2>
                <div>
                  <a href={`mailto:${block.value}`} className="line-link text-petrol">{block.value}</a>
                  <p className="mt-3 text-sm text-muted-foreground">{block.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl">Менеджмент</h2>
              <p className="mt-4 max-w-xl text-sm text-muted-foreground">
                Текст блока о менеджменте и условиях приглашения — пример, будет заменён.
              </p>
            </div>
            <div className="space-y-2 text-sm">
              <p><a className="line-link" href="https://youtube.com/@mosheganelin" target="_blank" rel="noreferrer">YouTube</a></p>
              <p><a className="line-link" href="https://www.instagram.com/moshearielganelin" target="_blank" rel="noreferrer">Instagram</a></p>
              <p><a className="line-link" href="https://www.facebook.com/mosheganelin/" target="_blank" rel="noreferrer">Facebook</a></p>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
