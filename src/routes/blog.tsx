import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { posts } from "@/lib/site-data";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Блог — Moshe Ganelin" },
      { name: "description", content: "Эссе, интервью и заметки Moshe Ganelin о музыке, органе и концертах." },
      { property: "og:title", content: "Блог — Moshe Ganelin" },
      { property: "og:description", content: "Эссе, интервью и заметки о музыке, органе и концертах." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <PageShell
      eyebrow="Блог"
      title="Публикации"
      lead="Эссе, интервью и заметки — пример текста, который будет заменён."
    >
      <section className="mx-auto max-w-[1600px] px-5 pb-24 pt-10 md:px-10 lg:px-16 lg:pb-32">
        <ul className="border-t border-border">
          {posts.map((post, index) => (
            <Reveal as="li" key={post.slug} delay={index * 70}>
              <a href="#contacts" className="row-item group grid gap-4 border-b border-border px-3 py-10 md:grid-cols-[10rem_1fr_2rem] md:items-baseline">
                <div className="text-[10px] uppercase tracking-[0.3em] text-petrol">
                  {post.type}
                  <time className="mt-2 block text-muted-foreground">{post.date}</time>
                </div>
                <div>
                  <h2 className="font-display text-3xl leading-tight md:text-4xl">{post.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{post.excerpt}</p>
                </div>
                <ArrowUpRight className="row-arrow size-5 justify-self-end text-brass" />
              </a>
            </Reveal>
          ))}
        </ul>
      </section>
    </PageShell>
  );
}
