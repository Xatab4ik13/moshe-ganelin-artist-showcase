import type { ReactNode } from "react";

import { Link } from "@tanstack/react-router";


import { LogoText } from "./LogoText";
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
          
          <Link
            to="/"
            aria-label="Moshe Ariel Ganelin — Home"
            className="absolute left-1/2 top-3 z-10 -translate-x-1/2 [filter:drop-shadow(0_2px_6px_rgb(0_0_0/0.35))] md:top-5"
          >
            <LogoText variant="brass" className="w-[min(42.9vw,165px)] md:w-[min(28.75vw,379px)]" />
          </Link>
          <div className="relative mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-10 lg:px-16 lg:pb-24">
            <Reveal>
              <h1 className=" font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95]">{title}</h1>
              {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-background/80 md:text-xl">{lead}</p> : null}
              
            </Reveal>
          </div>
        </header>
      ) : (
        <header className="relative mx-auto max-w-[1600px] overflow-hidden px-5 pb-10 pt-36 md:px-10 md:pt-52 lg:px-16 lg:pb-16 lg:pt-64">
          
          <Link
            to="/"
            aria-label="Moshe Ariel Ganelin — Home"
            className="absolute left-1/2 top-3 z-10 -translate-x-1/2 [filter:drop-shadow(0_2px_6px_rgb(0_0_0/0.35))] md:top-5"
          >
            <LogoText variant="brass" className="w-[min(42.9vw,165px)] md:w-[min(28.75vw,379px)]" />
          </Link>
          <Reveal>
            <h1 className=" font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95]">{title}</h1>
            {lead ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{lead}</p> : null}
            
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
    <p className="border-l-2 border-brass/60 pl-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
      {children}
    </p>
  );
}
