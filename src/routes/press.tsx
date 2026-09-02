import { createFileRoute } from "@tanstack/react-router";

import { DecoCartouche, DecoFrame } from "@/components/site/Deco";
import { PageShell, Placeholder } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { pressItems } from "@/lib/site-data";
import { useLanguage } from "@/lib/i18n";
import heroImage from "@/assets/moshe-stage.webp.asset.json";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press — Moshe Ariel Ganelin" },
      { name: "description", content: "Reviews, interviews and press materials about Moshe Ariel Ganelin." },
      { property: "og:title", content: "Press — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Reviews, interviews and press materials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/press" }],
  }),
  component: PressPage,
});

function PressPage() {
  const { t } = useLanguage();

  return (
    <PageShell title={t("pressTitle")} lead={t("pressLead")} image={heroImage.url}>
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <Reveal>
          <Placeholder>{t("sectionDescription")}</Placeholder>
          <DecoCartouche className="mx-auto mt-12 h-12 w-[min(92%,760px)] opacity-75" />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {pressItems.map((item, index) => (
            <Reveal key={item.slug} delay={index * 70}>
              <DecoFrame className="h-full border border-border bg-card p-8 transition-transform duration-500 hover:-translate-y-1">
                <p className="text-xs uppercase tracking-[0.32em] text-petrol">
                  {item.outlet} · {item.date}
                </p>
                <h2 className="mt-5 font-display text-2xl leading-snug md:text-3xl">{item.title}</h2>
                <blockquote className="mt-6 border-l-2 border-brass/70 pl-5 text-base italic leading-relaxed text-muted-foreground md:text-lg">
                  {item.quote}
                </blockquote>
              </DecoFrame>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
