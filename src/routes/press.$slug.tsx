import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { localized, usePress } from "@/lib/site-items";
import { useLanguage } from "@/lib/i18n";
import { useSiteImage } from "@/lib/site-images";

export const Route = createFileRoute("/press/$slug")({
  head: () => ({
    meta: [
      { title: "Press article — Moshe Ariel Ganelin" },
      { name: "description", content: "A press article, review or interview about Moshe Ariel Ganelin." },
      { property: "og:title", content: "Press article — Moshe Ariel Ganelin" },
      { property: "og:description", content: "A press article, review or interview." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PressArticlePage,
});

function PressArticlePage() {
  const { slug } = Route.useParams();
  const { t, lang } = useLanguage();
  const stage = useSiteImage("stage");
  const item = usePress().find((entry) => entry.slug === slug);
  if (!item) throw notFound();

  const quote = localized(item.data, "quote", lang);
  const body = localized(item.data, "body", lang);

  return (
    <PageShell title={item.title} lead={[item.outlet, item.date].filter(Boolean).join(" · ")} image={stage}>
      <article className="mx-auto max-w-[1000px] px-5 py-20 md:px-10 lg:py-28">
        <Reveal>
          <Link to="/press" className="line-link text-lg text-petrol md:text-xl">
            {t("pressBack")}
          </Link>
        </Reveal>
        {quote ? (
          <Reveal>
            <blockquote className="mt-12 border-l-2 border-brass/70 pl-6 text-xl italic leading-relaxed text-muted-foreground md:text-2xl">
              {quote}
            </blockquote>
          </Reveal>
        ) : null}
        {body ? (
          <Reveal>
            <div className="mt-12 whitespace-pre-line text-lg leading-relaxed md:text-xl">{body}</div>
          </Reveal>
        ) : null}
        {item.url ? (
          <Reveal>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="mt-12 inline-block break-all text-lg text-petrol underline underline-offset-4 hover:text-brass md:text-xl"
            >
              {t("pressSourceLink")}: {item.url}
            </a>
          </Reveal>
        ) : null}
      </article>
    </PageShell>
  );
}
