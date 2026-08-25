import { Link } from "@tanstack/react-router";

const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@mosheganelin" },
  { label: "Telegram", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "SoundCloud", href: "#" },
];

export function SiteFooter() {
  return (
    <footer id="contacts" className="bg-hero px-5 py-20 text-background md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="font-display text-[clamp(3.2rem,9vw,9rem)] leading-none">Moshe Ganelin</h2>
        <div className="mt-14 grid gap-10 border-t border-background/20 pt-10 md:grid-cols-3">
          <div className="space-y-2 text-sm text-background/75">
            <p className="text-[10px] uppercase tracking-[0.4em] text-brass">Контакты</p>
            <a className="line-link block" href="mailto:concerts@moshearielganelin.com">
              concerts@moshearielganelin.com
            </a>
            <p>Концерты и ангажемент — пример текста</p>
          </div>
          <ul className="space-y-2 text-sm text-background/75">
            <li className="text-[10px] uppercase tracking-[0.4em] text-brass">Соцсети</li>
            {socials.map((social) => (
              <li key={social.label}>
                <a className="line-link" href={social.href} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 text-sm text-background/75">
            <li className="text-[10px] uppercase tracking-[0.4em] text-brass">Разделы</li>
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
