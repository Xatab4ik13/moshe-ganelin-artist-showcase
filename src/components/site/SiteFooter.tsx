import { Link } from "@tanstack/react-router";

import { useLanguage } from "@/lib/i18n";
import { useContacts, useSocialLinks } from "@/lib/site-items";
import { LogoText } from "./LogoText";
import { SocialIconSvg, networkIcons } from "./social-icons";

export function SiteFooter() {
  const { t } = useLanguage();
  const socials = useSocialLinks();
  const bookingEmail = useContacts().find((contact) => contact.slug === "booking")?.email ?? "";

  return (
    <footer id="contacts" className="bg-hero px-5 py-20 text-background md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid gap-10 border-b border-background/20 pb-10 md:grid-cols-3">
          <div className="space-y-2 text-base text-background/75">
            {bookingEmail ? (
              <a className="line-link block" href={`mailto:${bookingEmail}`}>
                {bookingEmail}
              </a>
            ) : null}
            <p>{t("footerBooking")}</p>
          </div>

          <ul className="flex h-fit flex-wrap items-center gap-3">
            {socials.map((social) => {
              const icon = networkIcons[social.network];
              return (
                <li key={social.slug}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className={`flex size-10 items-center justify-center rounded-full border border-background/30 transition-colors hover:border-brass ${icon?.className ?? ""}`}
                  >
                    {icon ? (
                      <SocialIconSvg path={icon.path} className="size-4" />
                    ) : (
                      <span className="px-2 text-xs uppercase tracking-widest">{social.label}</span>
                    )}
                  </a>
                </li>
              );
            })}
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
