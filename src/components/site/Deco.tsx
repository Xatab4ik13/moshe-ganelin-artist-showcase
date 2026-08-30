import type { ReactNode } from "react";

/**
 * Art Deco ornaments drawn in code (SVG) — no raster textures, fully scalable.
 */

export function DecoRule({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  const stroke = tone === "light" ? "var(--brass)" : "var(--brass)";
  const line = tone === "light" ? "color-mix(in oklab, white 45%, transparent)" : "var(--border)";

  return (
    <div className={`flex w-full items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1" style={{ background: line }} />
      <svg width="132" height="20" viewBox="0 0 132 20" fill="none" className="shrink-0">
        <g stroke={stroke} strokeWidth="1.2">
          <path d="M2 10h26" />
          <path d="M34 10l6-6 6 6-6 6z" />
          <path d="M52 16V4M58 16V2M64 16V6M70 16V2M76 16V4M82 16V8" />
          <path d="M88 10l6-6 6 6-6 6z" />
          <path d="M106 10h24" />
        </g>
      </svg>
      <span className="h-px flex-1" style={{ background: line }} />
    </div>
  );
}

export function DecoSunburst({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 24 }, (_, i) => (i * 180) / 24);
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden="true" fill="none">
      <g stroke="var(--brass)" strokeWidth="0.8" opacity="0.5">
        {rays.map((a) => {
          const rad = (a * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={200}
              y1={200}
              x2={200 - Math.cos(rad) * 320}
              y2={200 - Math.sin(rad) * 320}
            />
          );
        })}
        <circle cx="200" cy="200" r="70" />
        <circle cx="200" cy="200" r="110" />
        <circle cx="200" cy="200" r="150" />
      </g>
    </svg>
  );
}

export function DecoCorner({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden="true"
      fill="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g stroke="var(--brass)" strokeWidth="1.1" opacity="0.75">
        <path d="M4 76V20L20 4h56" />
        <path d="M12 76V26L26 12h50" />
        <path d="M20 76V34l14-14" />
      </g>
    </svg>
  );
}

export function DecoFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <DecoCorner className="pointer-events-none absolute left-0 top-0 h-10 w-10" />
      <DecoCorner className="pointer-events-none absolute right-0 top-0 h-10 w-10" flip />
      <DecoCorner className="pointer-events-none absolute bottom-0 left-0 h-10 w-10 rotate-180" flip />
      <DecoCorner className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 rotate-180" />
      {children}
    </div>
  );
}
