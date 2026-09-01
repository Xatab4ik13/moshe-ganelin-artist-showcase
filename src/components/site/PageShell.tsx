import type { ReactNode } from "react";

import { DecoPipes, DecoRule, DecoSunburst } from "./Deco";
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
          <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-hero via-hero/50 to-hero/20" />
          <DecoPipes tone="light" className="pointer-events-none absolute bottom-0 right-4 h-32 w-56 opacity-70 md:right-12 md:h-44 md:w-80" />
          <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-10 lg:px-16 lg:pb-24">
            <Reveal>
              <h1 className=" font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95]">{title}</h1>
              {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80 md:text-xl">{lead}</p> : null}
              <DecoRule tone="light" className="mt-10 max-w-3xl" />
            </Reveal>
          </div>
        </header>
      ) : (
        <header className="relative mx-auto max-w-[1600px] overflow-hidden px-5 pb-10 pt-32 md:px-10 lg:px-16 lg:pt-44">
          <DecoSunburst className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[840px] opacity-40" />
          <DecoPipes className="pointer-events-none absolute bottom-0 right-6 h-24 w-44 opacity-60 md:h-32 md:w-64" />
          <Reveal>
            <h1 className=" font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95]">{title}</h1>
            {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p> : null}
            <DecoRule className="mt-10 max-w-3xl" />
          </Reveal>
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
    <p className="border-l-2 border-brass/60 pl-4 text-base leading-relaxed text-muted-foreground md:text-lg">
      {children}
    </p>
  );
}
