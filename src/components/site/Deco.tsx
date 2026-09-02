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

/** Art Deco organ-pipe fan — symmetric stepped pipes on a double plinth. */
export function DecoPipes({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const stroke = "var(--brass)";
  const opacity = tone === "light" ? 0.5 : 0.35;
  const heights = [50, 68, 88, 108, 88, 68, 50];
  return (
    <svg viewBox="0 0 200 122" className={className} aria-hidden="true" fill="none">
      <g stroke={stroke} strokeWidth="1.1" opacity={opacity} strokeLinecap="round">
        {heights.map((height, index) => {
          const x = 13 + index * 26;
          const top = 114 - height;
          return (
            <g key={x}>
              <path d={`M${x} 114V${top + 10}l9-10 9 10V114`} />
              <path d={`M${x + 4.5} 114V${top + 16}`} opacity="0.55" />
              <path d={`M${x + 13.5} 114V${top + 16}`} opacity="0.55" />
            </g>
          );
        })}
        <path d="M2 116h196" strokeWidth="1.2" />
        <path d="M10 120h180" opacity="0.6" />
        {[35.5, 61.5, 87.5, 113.5, 139.5, 165.5].map((cx) => (
          <path key={cx} d={`M${cx} 118l3 3-3 3-3-3z`} />
        ))}
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

/** Symmetric stepped arch with a fan tympanum — frames a quote or a portrait. */
export function DecoArch({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("arc");
  const rays = Array.from({ length: 17 }, (_, i) => 180 + (i * 180) / 16);
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden="true" fill="none" preserveAspectRatio="xMidYMax meet">
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1" fill="none" strokeLinecap="round">
          {/* outer stepped arch — symmetric about x=200 */}
          <path d="M40 200V120h24V96h28V72h36V56h144v16h36v24h28v24h24v80" strokeWidth="1.3" />
          {/* inner echo */}
          <path d="M56 200V128h20V106h24V84h30V70h140v14h30v22h24v22h20v72" opacity="0.55" />
          {/* fan of rays rising from the base centre */}
          {rays.map((a, i) => {
            const r = (a * Math.PI) / 180;
            const len = i % 2 === 0 ? 78 : 60;
            return (
              <line
                key={a}
                x1={200 + Math.cos(r) * 30}
                y1={200 + Math.sin(r) * 30}
                x2={200 + Math.cos(r) * len}
                y2={200 + Math.sin(r) * len}
                strokeWidth={i % 2 === 0 ? 1 : 0.6}
                opacity={i % 2 === 0 ? 0.85 : 0.5}
              />
            );
          })}
          <path d="M112 200a88 88 0 0 1 176 0" opacity="0.7" />
          {/* keystone diamond at the apex */}
          <path d="M200 22l15 19-15 19-15-19z" strokeWidth="1.2" />
          <path d="M200 31l8 10-8 10-8-10z" opacity="0.8" />
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

/* ------------------------------------------------------------------ */
/* Concerts family: marquee crown, ticket rule, playbill frame         */
/* ------------------------------------------------------------------ */

/** Marquee crown — stepped playbill cornice with lamp beads, mirror-symmetric. */
export function DecoMarquee({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("mrq");
  // stepped ziggurat, built from the centre outwards so both halves match
  const steps = [
    { w: 190, y: 92 },
    { w: 150, y: 78 },
    { w: 112, y: 64 },
    { w: 76, y: 50 },
    { w: 42, y: 38 },
  ];
  const outline = [
    `M${200 - steps[0]!.w} 96V${steps[0]!.y}`,
    ...steps.slice(1).map((s, i) => `H${200 - s.w}V${s.y}`),
    `H${200 + steps[steps.length - 1]!.w}`,
    ...steps
      .slice(0, -1)
      .reverse()
      .map((s) => `V${s.y}H${200 + s.w}`),
    "V96",
  ].join("");
  const inner = steps.map((s) => ({ w: s.w - 14, y: s.y + 7 }));
  const innerPath = [
    `M${200 - inner[0]!.w} 96V${inner[0]!.y}`,
    ...inner.slice(1).map((s) => `H${200 - s.w}V${s.y}`),
    `H${200 + inner[inner.length - 1]!.w}`,
    ...inner
      .slice(0, -1)
      .reverse()
      .map((s) => `V${s.y}H${200 + s.w}`),
    "V96",
  ].join("");
  const lamps = [40, 80, 120, 160, 240, 280, 320, 360];
  return (
    <svg viewBox="0 0 400 100" className={className} aria-hidden="true" fill="none" preserveAspectRatio="xMidYMax meet">
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1" fill="none" strokeLinecap="square">
          <path d={outline} strokeWidth="1.3" />
          <path d={innerPath} opacity="0.55" />
          {/* keystone diamond centred on the apex */}
          <path d="M200 10l14 14-14 14-14-14z" strokeWidth="1.2" />
          <path d="M200 18l6 6-6 6-6-6z" opacity="0.8" />
          {/* lamp beads, mirrored around the centre */}
          {lamps.map((x) => (
            <circle key={x} cx={x} cy={90} r="2.6" />
          ))}
          <path d="M0 96h400" opacity="0.45" />
        </g>
      </Relief>
    </svg>
  );
}

/** Ticket rule — divider of mirrored notched stubs around a centre star. */
export function DecoTicketRule({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("tkt");
  const half = (dir: 1 | -1) => {
    const x = (v: number) => 300 + dir * v;
    return (
      <g key={dir}>
        <path d={`M${x(210)} 24H${x(150)}`} opacity="0.6" />
        {/* notched ticket stub */}
        <path
          d={`M${x(150)} 12H${x(96)}a6 6 0 0 0 0 12v0a6 6 0 0 0 0 12H${x(150)}z`}
          opacity="0.9"
        />
        <path d={`M${x(120)} 17v14M${x(132)} 17v14M${x(144)} 17v14`} opacity="0.6" />
        <path d={`M${x(90)} 24H${x(52)}`} opacity="0.6" />
        <path d={`M${x(44)} 24l${dir * -8} -8 ${dir * -8} 8 ${dir * 8} 8z`} />
        <path d={`M${x(26)} 24H${x(16)}`} opacity="0.7" />
      </g>
    );
  };
  const rays = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <svg viewBox="0 0 600 48" className={className} aria-hidden="true" fill="none" preserveAspectRatio="xMidYMid meet">
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1" fill="none" strokeLinecap="round">
          {half(1)}
          {half(-1)}
          {rays.map((a2) => {
            const r = (a2 * Math.PI) / 180;
            const len = a2 % 90 === 0 ? 15 : 10;
            return (
              <line
                key={a2}
                x1={300 + Math.cos(r) * 6}
                y1={24 + Math.sin(r) * 6}
                x2={300 + Math.cos(r) * len}
                y2={24 + Math.sin(r) * len}
                strokeWidth={a2 % 90 === 0 ? 1.1 : 0.7}
                opacity={a2 % 90 === 0 ? 0.95 : 0.6}
              />
            );
          })}
          <circle cx="300" cy="24" r="6" />
        </g>
      </Relief>
    </svg>
  );
}

/** Playbill corner bracket — stepped ticket corner, used on all four corners. */
export function DecoBracket({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("brk");
  return (
    <svg viewBox="0 0 72 72" className={className} aria-hidden="true" fill="none">
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M2 70V26L26 2h44" strokeWidth="1.2" />
          <path d="M10 70V32L32 10h38" opacity="0.7" />
          <path d="M18 70V38l22-22" opacity="0.5" />
          <path d="M14 22l6-6 6 6-6 6z" />
          <path d="M2 52h10M52 2v10" opacity="0.8" />
        </g>
      </Relief>
    </svg>
  );
}

/**
 * Lyre crest — symmetric Deco lyre: mirrored inward arms, crossbar,
 * strings and a stepped plinth.
 */
export function DecoLyreCrest({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("lyr");
  const strings = [-30, -15, 0, 15, 30];
  const arm = (dir: 1 | -1) => {
    const x = (v: number) => 200 + dir * v;
    return (
      <g key={dir}>
        <path
          d={`M${x(46)} 116C${x(78)} 112 ${x(92)} 92 ${x(88)} 70C${x(85)} 52 ${x(70)} 42 ${x(56)} 46c-${dir * 10} 3-${dir * 13} 15-${dir * 5} 21`}
          strokeWidth="1.4"
        />
        <path
          d={`M${x(46)} 106C${x(70)} 102 ${x(81)} 88 ${x(78)} 71`}
          strokeWidth="0.8"
          opacity="0.6"
        />
        <circle cx={x(50)} cy="63" r="2.6" />
        <path d={`M${x(30)} 46h${dir * 16}`} opacity="0.75" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 400 150" className={className} aria-hidden="true" fill="none" preserveAspectRatio="xMidYMax meet">
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1.1" fill="none" strokeLinecap="round">
          {arm(1)}
          {arm(-1)}
          <path d="M154 46h92" strokeWidth="1.3" />
          <path d="M160 52h80" strokeWidth="0.7" opacity="0.6" />
          {strings.map((sx, i) => (
            <line
              key={sx}
              x1={200 + sx}
              y1={52}
              x2={200 + sx}
              y2={112}
              strokeWidth={i === 2 ? 1.2 : 0.8}
              opacity={i === 2 ? 0.95 : 0.7}
            />
          ))}
          <path d="M200 12l14 17-14 17-14-17z" strokeWidth="1.2" />
          <path d="M200 22l6 7-6 7-6-7z" opacity="0.85" />
          <path d="M200 46V29" opacity="0.7" />
          <path d="M150 116h100M140 124h120M160 132h80" strokeWidth="1.1" />
          <path d="M176 140h48" opacity="0.6" />
        </g>
      </Relief>
    </svg>
  );
}

/** Keyboard border — mirrored manual keys running out from a centre jewel. */
export function DecoKeyRule({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("key");
  const half = (dir: 1 | -1) => {
    const x = (v: number) => 300 + dir * v;
    const keys = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
      <g key={dir}>
        <path d={`M${x(40)} 8H${x(196)}V32H${x(40)}Z`} strokeWidth="1.3" />
        {keys.map((k) => (
          <line key={k} x1={x(40 + k * 17.3)} y1="8" x2={x(40 + k * 17.3)} y2="32" strokeWidth="0.9" opacity="0.85" />
        ))}
        {[0, 1, 3, 4, 5, 7].map((k) => (
          <path
            key={`b${k}`}
            d={`M${x(48 + k * 17.3)} 8h${dir * 8}v13h-${dir * 8}z`}
            strokeWidth="0.9"
            opacity="0.75"
          />
        ))}
        <path d={`M${x(196)} 20H${x(228)}`} strokeWidth="1" opacity="0.7" />
        <path d={`M${x(240)} 20l${dir * -12} -9 ${dir * -12} 9 ${dir * 12} 9z`} strokeWidth="1.1" />
        <path d={`M${x(252)} 20H${x(292)}`} opacity="0.5" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 600 40" className={className} aria-hidden="true" fill="none" preserveAspectRatio="xMidYMid meet">
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1" fill="none" strokeLinejoin="round">
          {half(1)}
          {half(-1)}
          <path d="M300 2l18 18-18 18-18-18z" strokeWidth="1.3" />
          <path d="M300 11l9 9-9 9-9-9z" opacity="0.8" />
        </g>
      </Relief>
    </svg>
  );
}

/** Small section glyph — stepped pipes between mirrored chevrons. */
export function DecoKeyMark({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  const { grad, glow } = useDecoIds("kmk");
  return (
    <svg viewBox="0 0 120 28" className={className} aria-hidden="true" fill="none" preserveAspectRatio="xMidYMid meet">
      <DecoPaint id={grad} glowId={glow} tone={tone} />
      <Relief tone={tone} glowId={glow}>
        <g stroke={`url(#${grad})`} strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M4 22l8-8-8-8M116 22l-8-8 8-8" opacity="0.7" />
          <path d="M44 22V12M52 22V8M60 22V4M68 22V8M76 22V12" />
          <path d="M40 24h40" opacity="0.8" />
          <path d="M24 14l6-6 6 6-6 6zM90 14l6-6 6 6-6 6z" opacity="0.85" />
        </g>
      </Relief>
    </svg>
  );
}
