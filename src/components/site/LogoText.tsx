import { cn } from "@/lib/utils";
import { useSiteImage } from "@/lib/site-images";

interface LogoTextProps {
  variant?: "brass" | "light";
  className?: string;
  showRule?: boolean;
}

export function LogoText({ className = "" }: LogoTextProps) {
  const logo = useSiteImage("logo");
  return (
    <img
      src={logo}
      alt="Moshe Ariel Ganelin"
      width={1200}
      height={627}
      loading="eager"
      decoding="async"
      className={cn("block h-auto w-40 select-none", className)}
    />
  );
}
