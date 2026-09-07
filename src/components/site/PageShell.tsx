import type { ReactNode } from "react";

import { DecoChevronRule, DecoCrest, DecoPilaster, DecoScales } from "./Deco";
import { Reveal } from "./Reveal";
import { SiteFooter } from "./SiteFooter";
import { SiteMenu } from "./SiteMenu";

export function PageShell({
  title,
  lead,
  image,
  children,
}: {
  title: string;
  lead?: string;
  image?: string;
  children: ReactNode;
}) {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <SiteMenu tone={image ? "light" : "dark"} />

      {image ? (
        <header className="relative flex min-h-[62svh] items-end overflow-hidden bg-hero text-background">
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[50%_28%] opacity-60 md:object-[50%_18%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/50 to-hero/20" />

          <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-10 lg:px-16 lg:pb-24">
            <Reveal>
              <h1 className=" font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95]">{title}</h1>
              {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80 md:text-xl">{lead}</p> : null}
              
            </Reveal>
          </div>
        </header>
      ) : (
        <header className="relative overflow-hidden px-5 pb-10 pt-32 md:px-10 md:pt-40 lg:px-16 lg:pb-16 lg:pt-48">
          <DecoScales tone="light" opacity={0.07} size={104} />
          <DecoPilaster tone="light" className="pointer-events-none absolute left-1 top-28 hidden h-[60%] w-8 opacity-45 lg:block" />
          <DecoPilaster tone="light" flip className="pointer-events-none absolute right-1 top-28 hidden h-[60%] w-8 opacity-45 lg:block" />
          <div className="relative mx-auto max-w-[1600px]">
            <Reveal>
              <DecoCrest tone="light" className="mx-auto h-16 w-[min(80%,360px)] opacity-70 md:h-20" />
              <h1 className="mt-8 text-center font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95]">{title}</h1>
              {lead ? (
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p>
              ) : null}
              <DecoChevronRule tone="light" className="mx-auto mt-10 max-w-[1000px]" />
            </Reveal>
          </div>
        </header>
      )}

      {children}

      <SiteFooter />
    </main>
  );
}

export function SectionTitle({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return (
    <h2 className={`font-display text-4xl leading-none md:text-6xl ${tone === "light" ? "text-background" : ""}`}>
      {children}
    </h2>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-brass/60 pl-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
      {children}
    </p>
  );
}
