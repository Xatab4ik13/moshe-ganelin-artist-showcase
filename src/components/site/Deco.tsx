import { useId } from "react";
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

/** Art Deco organ-pipe fan — stepped pipes with a chevron crown. */
export function DecoPipes({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const stroke = "var(--brass)";
  const opacity = tone === "light" ? 0.5 : 0.35;
  const pipes = [46, 62, 80, 100, 118, 136, 152];
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true" fill="none">
      <g stroke={stroke} strokeWidth="1.1" opacity={opacity}>
        {pipes.map((height, index) => {
          const x = 10 + index * 27;
          const top = 120 - height * 0.62;
          return (
            <g key={x}>
              <path d={`M${x} 120V${top + 8}l9-8 9 8V120`} />
              <path d={`M${x + 4} ${top + 16}h10`} />
            </g>
          );
        })}
        <path d="M2 118h196" />
        <path d="M100 6l14 14-14 14-14-14z" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Rich Art Deco set — relief-aware ornaments (static, no animation)   */
/* ------------------------------------------------------------------ */

type Tone = "dark" | "light";

function useDecoIds(prefix: string) {
  const uid = useId().replace(/:/g, "");
  return {
    grad: `${prefix}-g-${uid}`,
    glow: `${prefix}-f-${uid}`,
    lattice: `${prefix}-p-${uid}`,
  };
}

/** Shared paint: gradient + soft glow (dark ground) / chased double stroke (light ground). */
function DecoPaint({ id, glowId, tone }: { id: string; glowId: string; tone: Tone }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="color-mix(in oklab, var(--brass) 55%, white)" />
        <stop offset="38%" stopColor="var(--brass)" />
        <stop offset="62%" stopColor="color-mix(in oklab, var(--brass) 72%, black)" />
        <stop offset="100%" stopColor="var(--brass)" />
      </linearGradient>
      <filter id={glowId} x="-30%" y="-60%" width="160%" height="220%">
        <feGaussianBlur stdDeviation={tone === "dark" ? 2.4 : 0.9} result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

/**
 * Relief wrapper: on dark ground the ornament glows; on light ground it is
 * "chased" — a hairline ink shadow offset under the brass line.
 */
function Relief({
  tone,
  glowId,
  children,
}: {
  tone: Tone;
  glowId: string;
  children: ReactNode;
}) {
  if (tone === "light") {
    return (
      <>
        <g
          transform="translate(0.9 1.1)"
          stroke="color-mix(in oklab, var(--foreground) 42%, transparent)"
          opacity="0.5"
        >
          {children}
        </g>
        <g transform="translate(-0.5 -0.6)" stroke="color-mix(in oklab, white 85%, transparent)" opacity="0.55">
          {children}
        </g>
        <g>{children}</g>
      </>
    );
  }
  return <g filter={`url(#${glowId})`}>{children}</g>;
}

/** Single scrolled volute (the curl motif from the logo). */
function Volute({ x = 0, y = 0, flip = false }: { x?: number; y?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})${flip ? " scale(-1 1)" : ""}`}>
      <path d="M0 0c22 0 34-9 40-22 6-14-2-27-15-27-11 0-18 9-15 18 3 8 13 10 18 4" />
      <path d="M0 8c26 0 41-11 48-27" opacity="0.6" />
      <circle cx="25" cy="-24" r="2.4" />
    </g>
  );
}

/** Faceted rosette / medallion — the centre jewel of a banner. */
export function DecoMedallion({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("med");
  const rays = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none">
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1.1" fill="none">
          {rays.map((a, i) => {
            const r = (a * Math.PI) / 180;
            const inner = i % 2 === 0 ? 52 : 62;
            const outer = i % 2 === 0 ? 88 : 76;
            return (
              <line
                key={a}
                x1={100 + Math.cos(r) * inner}
                y1={100 + Math.sin(r) * inner}
                x2={100 + Math.cos(r) * outer}
                y2={100 + Math.sin(r) * outer}
                strokeWidth={i % 2 === 0 ? 1.4 : 0.7}
              />
            );
          })}
          <circle cx="100" cy="100" r="94" strokeWidth="0.6" opacity="0.5" />
          <circle cx="100" cy="100" r="88" strokeWidth="1.4" />
          <circle cx="100" cy="100" r="48" />
          <circle cx="100" cy="100" r="42" strokeWidth="0.6" opacity="0.7" />
          <path d="M100 58l30 42-30 42-30-42z" strokeWidth="1.3" />
          <path d="M100 72l19 28-19 28-19-28z" strokeWidth="0.8" opacity="0.8" />
          <path d="M100 86l9 14-9 14-9-14z" />
          <path d="M58 100h-14M156 100h-14M100 44v-12M100 168v-12" strokeWidth="1.2" />
        </g>
      </Relief>
    </svg>
  );
}

/**
 * Wide ornamental band that replaces a plain rule between sections:
 * volutes, stepped chevrons, organ pipes and a faceted centre jewel.
 */
export function DecoBanner({
  tone = "dark",
  className = "",
}: {
  tone?: Tone;
  className?: string;
}) {
  const { grad, glow } = useDecoIds("ban");
  const hair =
    tone === "light"
      ? "color-mix(in oklab, var(--foreground) 22%, transparent)"
      : "color-mix(in oklab, white 22%, transparent)";

  return (
    <div className={`w-full ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 120" className="w-full" fill="none" preserveAspectRatio="xMidYMid meet">
        <DecoPaint id={grad} glowId={glow} tone={tone} />
        <g stroke={hair} strokeWidth="1">
          <path d="M0 60h300M900 60h300" />
          <path d="M60 52h240M900 52h240" opacity="0.55" />
        </g>
        <Relief tone={tone} glowId={glow}>
          <g stroke={`url(#${grad})`} strokeWidth="1.2" fill="none" strokeLinecap="round">
            {/* stepped ziggurat wings */}
            <path d="M300 60h24v-10h20v-12h22v-9h24" />
            <path d="M900 60h-24v-10h-20v-12h-22v-9h-24" />
            <path d="M300 60h24v10h20v12h22v9h24" opacity="0.55" />
            <path d="M900 60h-24v10h-20v12h-22v9h-24" opacity="0.55" />
            {/* organ pipes */}
            {[0, 1, 2, 3, 4].map((i) => {
              const x = 400 + i * 18;
              const h = [22, 32, 44, 32, 22][i]!;
              return <path key={`lp${i}`} d={`M${x} 84V${84 - h}l5-6 5 6V84`} />;
            })}
            {[0, 1, 2, 3, 4].map((i) => {
              const x = 700 + i * 18;
              const h = [22, 32, 44, 32, 22][4 - i]!;
              return <path key={`rp${i}`} d={`M${x} 84V${84 - h}l5-6 5 6V84`} />;
            })}
            <path d="M394 86h64M694 86h64" />
            {/* volutes */}
            <Volute x={520} y={62} />
            <Volute x={680} y={62} flip />
            {/* centre jewel */}
            <path d="M600 18l34 42-34 42-34-42z" strokeWidth="1.5" />
            <path d="M600 32l22 28-22 28-22-28z" opacity="0.8" />
            <path d="M600 46l10 14-10 14-10-14z" />
            <path d="M566 60h-18M652 60h-18" />
            <circle cx="600" cy="60" r="3" />
          </g>
        </Relief>
      </svg>
    </div>
  );
}

/** Ornate corner plate with volute — richer than DecoCorner. */
export function DecoCornerPlate({
  className = "",
  tone = "light",
  flipX = false,
  flipY = false,
}: {
  className?: string;
  tone?: Tone;
  flipX?: boolean;
  flipY?: boolean;
}) {
  const { grad, glow } = useDecoIds("cnr");
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      fill="none"
      style={{ transform: `scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})` }}
    >
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1.1" fill="none" strokeLinecap="round">
          <path d="M2 118V26L26 2h92" />
          <path d="M12 118V32L32 12h86" opacity="0.75" />
          <path d="M22 118V40l16-16h80" opacity="0.5" />
          <path d="M30 60c16 0 26-8 26-20 0-9-7-15-14-12-6 3-6 12 1 13 5 1 8-3 7-7" />
          <path d="M60 30l9 11-9 11-9-11z" />
          <path d="M84 22v14M96 22v10M108 22v6" />
          <path d="M22 84h6M22 96h10M22 108h14" />
        </g>
      </Relief>
    </svg>
  );
}

/** Repeating Art Deco lattice, used as a whisper-quiet section background. */
export function DecoLattice({
  className = "",
  tone = "light",
  size = 96,
  opacity = 0.16,
}: {
  className?: string;
  tone?: Tone;
  size?: number;
  opacity?: number;
}) {
  const { lattice } = useDecoIds("lat");
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id={lattice} width={size} height={size} patternUnits="userSpaceOnUse">
          <g
            stroke={tone === "light" ? "color-mix(in oklab, var(--brass) 80%, black)" : "var(--brass)"}
            strokeWidth="0.7"
            fill="none"
          >
            <path d={`M0 ${size / 2}L${size / 2} 0L${size} ${size / 2}L${size / 2} ${size}Z`} />
            <path
              d={`M${size / 4} ${size / 2}L${size / 2} ${size / 4}L${size * 0.75} ${size / 2}L${size / 2} ${size * 0.75}Z`}
              opacity="0.7"
            />
            <circle cx={size / 2} cy={size / 2} r="2.2" />
            <path d={`M0 0h10M${size} 0h-10M0 ${size}h10M${size} ${size}h-10`} opacity="0.6" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${lattice})`} />
    </svg>
  );
}

/** Crest that caps a section edge — fan of rays over a stepped arch. */
export function DecoCrest({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("crest");
  const rays = Array.from({ length: 17 }, (_, i) => 180 + (i * 180) / 16);
  return (
    <svg viewBox="0 0 600 150" className={className} aria-hidden="true" fill="none" preserveAspectRatio="xMidYMax meet">
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1" fill="none" strokeLinecap="round">
          {rays.map((a, i) => {
            const r = (a * Math.PI) / 180;
            const len = i % 2 === 0 ? 92 : 66;
            return (
              <line
                key={a}
                x1={300 + Math.cos(r) * 34}
                y1={150 + Math.sin(r) * 34}
                x2={300 + Math.cos(r) * len}
                y2={150 + Math.sin(r) * len}
                strokeWidth={i % 2 === 0 ? 1.1 : 0.6}
                opacity={i % 2 === 0 ? 0.9 : 0.6}
              />
            );
          })}
          <path d="M204 150a96 96 0 0 1 192 0" strokeWidth="1.3" />
          <path d="M232 150a68 68 0 0 1 136 0" opacity="0.7" />
          <path d="M300 96l22 30-22 30-22-30z" />
          <Volute x={186} y={150} />
          <Volute x={414} y={150} flip />
          <path d="M60 150h120M420 150h120" opacity="0.7" />
        </g>
      </Relief>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* About-page family: fluted pilasters, laurel chevrons, stepped arch  */
/* ------------------------------------------------------------------ */

/** Vertical fluted pilaster — a tall column of stepped flutes with a capital. */
export function DecoPilaster({
  className = "",
  tone = "light",
  flip = false,
}: {
  className?: string;
  tone?: Tone;
  flip?: boolean;
}) {
  const { grad, glow } = useDecoIds("pil");
  return (
    <svg
      viewBox="0 0 60 640"
      className={className}
      aria-hidden="true"
      fill="none"
      preserveAspectRatio="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1" fill="none">
          <path d="M8 640V64l10-14h24l10 14v576" strokeWidth="1.3" />
          <path d="M16 640V72h28v568" opacity="0.7" />
          <path d="M24 640V84M30 640V80M36 640V84" opacity="0.55" />
          <path d="M4 50h52M10 40h40M16 30h28" />
          <path d="M30 6l10 14-10 14-10-14z" />
          {[140, 240, 340, 440, 540].map((y) => (
            <g key={y}>
              <path d={`M12 ${y}h36`} opacity="0.55" />
              <path d={`M30 ${y - 9}l7 9-7 9-7-9z`} opacity="0.8" />
            </g>
          ))}
        </g>
      </Relief>
    </svg>
  );
}

/** Slim divider of laurel chevrons and beads — quieter than the Home banner. */
export function DecoChevronRule({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("chv");
  const hair =
    tone === "light"
      ? "color-mix(in oklab, var(--foreground) 20%, transparent)"
      : "color-mix(in oklab, white 20%, transparent)";
  return (
    <div className={`w-full ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1200 60" className="w-full" fill="none" preserveAspectRatio="xMidYMid meet">
        <DecoPaint id={grad} glowId={glow} tone={tone} />
        <g stroke={hair} strokeWidth="1">
          <path d="M0 30h420M780 30h420" />
        </g>
        <Relief tone={tone} glowId={glow}>
          <g stroke={`url(#${grad})`} strokeWidth="1.15" fill="none" strokeLinecap="round">
            {[0, 1, 2, 3].map((i) => (
              <g key={`l${i}`} transform={`translate(${430 + i * 26} 0)`}>
                <path d="M0 38l8-9-8-9" opacity={0.45 + i * 0.15} />
              </g>
            ))}
            {[0, 1, 2, 3].map((i) => (
              <g key={`r${i}`} transform={`translate(${770 - i * 26} 0)`}>
                <path d="M0 38l-8-9 8-9" opacity={0.45 + i * 0.15} />
              </g>
            ))}
            <path d="M556 30h-14M658 30h-14" opacity="0.8" />
            <Volute x={540} y={30} />
            <Volute x={660} y={30} flip />
            <path d="M600 10l16 20-16 20-16-20z" strokeWidth="1.3" />
            <path d="M600 20l8 10-8 10-8-10z" />
            <circle cx="600" cy="30" r="1.8" />
          </g>
        </Relief>
      </svg>
    </div>
  );
}

/** Stepped arch with a fan tympanum — frames a quote or a portrait. */
export function DecoArch({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("arc");
  const rays = Array.from({ length: 13 }, (_, i) => 180 + (i * 180) / 12);
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden="true" fill="none" preserveAspectRatio="xMidYMax meet">
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M40 200V120h20V96h22V74h26V56h44v18h26v22h22v24h20v80" strokeWidth="1.3" />
          <path d="M56 200V128h20v-24h22V84h26V66h32v18h26v20h22v24h20v72" opacity="0.55" />
          {rays.map((a, i) => {
            const r = (a * Math.PI) / 180;
            return (
              <line
                key={a}
                x1={200 + Math.cos(r) * 16}
                y1={196 + Math.sin(r) * 16}
                x2={200 + Math.cos(r) * (i % 2 === 0 ? 62 : 44)}
                y2={196 + Math.sin(r) * (i % 2 === 0 ? 62 : 44)}
                strokeWidth={i % 2 === 0 ? 1 : 0.6}
                opacity={i % 2 === 0 ? 0.85 : 0.5}
              />
            );
          })}
          <path d="M200 108l14 18-14 18-14-18z" />
        </g>
      </Relief>
    </svg>
  );
}

/** Fan-scale (shell) repeating background — softer than the diamond lattice. */
export function DecoScales({
  className = "",
  tone = "light",
  size = 90,
  opacity = 0.14,
}: {
  className?: string;
  tone?: Tone;
  size?: number;
  opacity?: number;
}) {
  const { lattice } = useDecoIds("scl");
  const r = size / 2;
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id={lattice} width={size} height={r} patternUnits="userSpaceOnUse">
          <g
            stroke={tone === "light" ? "color-mix(in oklab, var(--brass) 78%, black)" : "var(--brass)"}
            strokeWidth="0.7"
            fill="none"
          >
            <path d={`M0 ${r}a${r} ${r} 0 0 1 ${size} 0`} />
            <path d={`M${r * 0.5} ${r}a${r * 0.5} ${r * 0.5} 0 0 1 ${r} 0`} opacity="0.6" />
            <path d={`M-${r} ${r}a${r} ${r} 0 0 1 ${size} 0`} />
            <path d={`M${r} ${r}a${r} ${r} 0 0 1 ${size} 0`} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${lattice})`} />
    </svg>
  );
}
