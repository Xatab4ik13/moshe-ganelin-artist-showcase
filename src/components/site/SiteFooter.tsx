import { Link } from "@tanstack/react-router";

import { useLanguage } from "@/lib/i18n";
import { LogoText } from "./LogoText";
import { SocialIconSvg, socialLinks } from "./social-icons";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer id="contacts" className="bg-hero px-5 py-20 text-background md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 border-b border-background/20 pb-10 md:grid-cols-3">
          <div className="space-y-2 text-base text-background/75">
            <a className="line-link block" href="mailto:concerts@moshearielganelin.com">
              concerts@moshearielganelin.com
            </a>
            <p>{t("footerBooking")}</p>
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

          <ul className="space-y-2 text-base text-background/75">
            <li><Link className="line-link" to="/about">{t("navAbout")}</Link></li>
            <li><Link className="line-link" to="/music">{t("navMusic")}</Link></li>
            <li><Link className="line-link" to="/poetry">{t("navPoetry")}</Link></li>
            <li><Link className="line-link" to="/concerts">{t("navConcerts")}</Link></li>
            <li><Link className="line-link" to="/gallery">{t("navGallery")}</Link></li>
            <li><Link className="line-link" to="/contacts">{t("navContact")}</Link></li>
          </ul>
        </div>

        <Link to="/" aria-label="Moshe Ariel Ganelin — Home" className="mt-14 inline-block">
          <LogoText variant="brass" className="w-[min(40vw,150px)] md:w-[min(14vw,180px)]" />
        </Link>

        <p className="mt-8 text-sm text-background/50">© 2026 Moshe Ariel Ganelin</p>
      </div>
    </footer>
  );
}
