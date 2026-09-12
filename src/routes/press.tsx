import { createFileRoute } from "@tanstack/react-router";

import { DecoChevronRule, DecoCornerPlate, DecoPilaster, DecoScales } from "@/components/site/Deco";
import { PageShell } from "@/components/site/PageShell";
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
      <section className="relative overflow-hidden px-5 py-20 md:px-10 lg:px-16 lg:py-28">
        <DecoScales tone="light" opacity={0.07} size={104} />
        <DecoPilaster tone="light" className="pointer-events-none absolute left-1 top-24 hidden h-[70%] w-8 opacity-45 lg:block" />
        <DecoPilaster tone="light" flip className="pointer-events-none absolute right-1 top-24 hidden h-[70%] w-8 opacity-45 lg:block" />
        <div className="relative mx-auto max-w-[1400px]">
          <Reveal>
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t("sectionDescription")}
            </p>
            <DecoChevronRule tone="light" className="mx-auto mt-12 max-w-[1000px]" />
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {pressItems.map((item, index) => (
              <Reveal key={item.slug} delay={index * 70}>
                <article className="deco-card h-full p-9 md:p-10">
                  <DecoCornerPlate tone="light" className="pointer-events-none absolute left-3 top-3 h-9 w-9 opacity-55" />
                  <DecoCornerPlate tone="light" flipX flipY className="pointer-events-none absolute bottom-3 right-3 h-9 w-9 opacity-55" />
                  <p className="relative text-center text-xs uppercase tracking-[0.32em] text-petrol">
                    {item.outlet} · {item.date}
                  </p>
                  <h2 className="relative mt-5 text-center font-deco font-black text-2xl leading-snug md:text-3xl">{item.title}</h2>
                  <blockquote className="relative mx-auto mt-6 max-w-xl text-center text-base italic leading-relaxed text-muted-foreground md:text-lg">
                    {item.quote}
                  </blockquote>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
