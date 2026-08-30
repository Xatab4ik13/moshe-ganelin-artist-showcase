import { Link } from "@tanstack/react-router";

import { DecoRule, DecoCorner } from "./Deco";
import { PageShell, Placeholder, SectionTitle } from "./PageShell";
import { Reveal } from "./Reveal";
import { useLanguage, type DictKey } from "@/lib/i18n";

export type FacetLink = { to: string; labelKey: DictKey };
export type FacetVariant = "default" | "press" | "awards";

const highlightCount = 4;
const itemCount = 5;
const quoteCount = 6;
const awardCount = 6;

/**
 * Единый шаблон для профильных подстраниц (Composer, Performer, Improviser,
 * Silent film, Awards, Press). Тексты — шаблонные, ждут клиента.
 */
export function FacetPage({
  titleKey,
  leadKey,
  image,
  related,
  variant = "default",
}: {
  titleKey: DictKey;
  leadKey: DictKey;
  image: string;
  related: FacetLink[];
  variant?: FacetVariant;
}) {
  const { t } = useLanguage();

  return (
    <PageShell title={t(titleKey)} lead={t(leadKey)} image={image}>
      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-6">
            <Reveal>
              <p className="font-display text-2xl leading-snug md:text-3xl">
                Opening paragraph — sample text. The main idea of this section will go here.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <Placeholder>
                Body paragraph — sample text. Context, approach and artistic method, to be replaced.
              </Placeholder>
            </Reveal>
            <Reveal delay={140}>
              <Placeholder>
                Second paragraph — sample text. Repertoire, collaborations and notable projects.
              </Placeholder>
            </Reveal>
          </div>

          <Reveal delay={120} className="reveal-right">
            <div className="relative border border-brass/35 p-8 md:p-10">
              <DecoCorner className="pointer-events-none absolute -left-px -top-px h-14 w-14 text-brass" />
              <DecoCorner className="pointer-events-none absolute -right-px -top-px h-14 w-14 rotate-90 text-brass" />
              <DecoCorner className="pointer-events-none absolute -bottom-px -right-px h-14 w-14 rotate-180 text-brass" />
              <DecoCorner className="pointer-events-none absolute -bottom-px -left-px h-14 w-14 -rotate-90 text-brass" />

              <h2 className="font-display text-xl tracking-[0.18em] text-petrol md:text-2xl">
                {t("facetHighlights")}
              </h2>
              <ul className="mt-8 space-y-6">
                {Array.from({ length: highlightCount }).map((_, index) => (
                  <li key={index} className="flex gap-5">
                    <span className="mt-1 h-fit shrink-0 font-display text-sm tracking-[0.25em] text-brass">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg md:text-xl">{t("facetItem")}</h3>
                      <p className="mt-2 text-base leading-relaxed text-muted-foreground">{t("facetItemNote")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-hero px-5 py-24 text-background md:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <SectionTitle tone="light">{t("facetSelected")}</SectionTitle>
            <DecoRule tone="light" className="mt-8" />
          </Reveal>

          <ul className="mt-12 divide-y divide-background/15 border-y border-background/15">
            {Array.from({ length: itemCount }).map((_, index) => (
              <Reveal as="li" key={index} delay={index * 70}>
                <div className="grid gap-3 py-7 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8">
                  <span className="font-display text-sm tracking-[0.25em] text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight md:text-3xl">{t("facetItem")}</h3>
                    <p className="mt-2 text-base leading-relaxed text-background/70">{t("facetItemNote")}</p>
                  </div>
                  <span className="text-sm tracking-[0.2em] text-background/50">2026</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 lg:px-16">
        <Reveal>
          <p className="font-display text-sm tracking-[0.3em] text-petrol">{t("facetExplore")}</p>
          <DecoRule className="mt-6" />
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
          {related.map((item, index) => (
            <Reveal key={item.to} delay={index * 60}>
              <Link
                to={item.to}
                className="font-display text-2xl leading-none transition-colors hover:text-brass md:text-4xl"
              >
                {t(item.labelKey)}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
