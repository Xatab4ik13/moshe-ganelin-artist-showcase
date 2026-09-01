import { cn } from "@/lib/utils";
import logoAsset from "@/assets/logo-ganelin.webp.asset.json";

interface LogoTextProps {
  variant?: "brass" | "light";
  className?: string;
  showRule?: boolean;
}

export function LogoText({ className = "" }: LogoTextProps) {
  return (
    <img
      src={logoAsset.url}
      alt="Moshe Ariel Ganelin"
      width={720}
      height={715}
      loading="eager"
      decoding="async"
      className={cn("block h-auto w-40 select-none", className)}
    />
  );
}
