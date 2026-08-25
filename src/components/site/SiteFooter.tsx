import { Link } from "@tanstack/react-router";

import logoAsset from "@/assets/moshe-ganelin-logo.png.asset.json";
import { SocialIconSvg, socialLinks } from "./social-icons";

export function SiteFooter() {
  return (
    <footer id="contacts" className="bg-hero px-5 py-20 text-background md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <img src={logoAsset.url} alt="Moshe Ganelin" className="w-[min(52vw,260px)] object-contain" />

        <div className="mt-12 grid gap-10 border-t border-background/20 pt-10 md:grid-cols-3">
          <div className="space-y-2 text-sm text-background/75">
            <a className="line-link block" href="mailto:concerts@moshearielganelin.com">
              concerts@moshearielganelin.com
            </a>
            <p>Концерты и ангажемент — пример текста</p>
          </div>

          <ul className="flex h-fit flex-wrap items-center gap-3">
            {socialLinks.map((social) => (
              <li key={social.key}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex size-10 items-center justify-center rounded-full border border-background/30 text-background/80 transition-colors hover:border-brass hover:text-brass"
                >
                  <SocialIconSvg path={social.path} className="size-4" />
                </a>
              </li>
            ))}
          </ul>

          <ul className="space-y-2 text-sm text-background/75">
            <li><Link className="line-link" to="/concerts">Афиша</Link></li>
            <li><Link className="line-link" to="/music">Музыка</Link></li>
            <li><Link className="line-link" to="/video">Видео</Link></li>
            <li><Link className="line-link" to="/blog">Блог</Link></li>
          </ul>
        </div>

        <p className="mt-14 text-xs text-background/50">© 2026 Moshe Ganelin</p>
      </div>
    </footer>
  );
}
