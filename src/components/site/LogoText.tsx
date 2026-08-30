import { cn } from "@/lib/utils";

interface LogoTextProps {
  variant?: "brass" | "light";
  className?: string;
  showRule?: boolean;
}

export function LogoText({ variant = "brass", className = "", showRule = true }: LogoTextProps) {
  const colorClass = variant === "light" ? "text-background" : "text-brass";

  return (
    <span
      className={cn(
        "inline-flex flex-col items-center leading-none tracking-[0.22em]",
        "font-display uppercase antialiased",
        colorClass,
        className
      )}
      aria-label="Moshe Ariel Ganelin"
    >
      <span className="block text-[0.42em] opacity-95">Moshe Ariel</span>
      {showRule && (
        <span className="my-[0.18em] flex w-full items-center gap-[0.35em]">
          <span className="h-[1px] flex-1 bg-current opacity-80" />
          <span className="block aspect-square rotate-45 border border-current bg-current/20" style={{ width: "0.22em" }} />
          <span className="h-[1px] flex-1 bg-current opacity-80" />
        </span>
      )}
      <span className="block text-[0.72em]">Ganelin</span>
    </span>
  );
}
