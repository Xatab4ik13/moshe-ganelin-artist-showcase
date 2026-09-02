import { createFileRoute } from "@tanstack/react-router";

import { DecoAperture } from "@/components/site/Deco";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Contact — Moshe Ariel Ganelin" },
      { name: "description", content: "Contact for concert bookings, press and collaborations with Moshe Ariel Ganelin." },
      { property: "og:title", content: "Contact — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Contact for concert bookings, press and collaborations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/contacts" }],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const { t } = useLanguage();

  const blocks = [
    { title: t("contactsBooking"), value: "concerts@moshearielganelin.com" },
    { title: t("contactsPress"), value: "press@moshearielganelin.com" },
    { title: t("contactsScores"), value: "scores@moshearielganelin.com" },
  ];

  return (
    <PageShell title={t("contactsTitle")} lead={t("contactsLead")}>
      <section className="relative mx-auto max-w-[1600px] px-5 pb-24 pt-10 md:px-10 lg:px-16 lg:pb-32">
        <DecoAperture className="pointer-events-none absolute left-4 -top-2 md:left-6 h-16 w-16 opacity-55 md:h-20 md:w-20" />
        <DecoAperture className="pointer-events-none absolute right-4 -top-2 md:right-6 h-16 w-16 -scale-x-100 opacity-55 md:h-20 md:w-20" />
        <div className="grid gap-6 md:grid-cols-3">
          {blocks.map((block, index) => (
            <Reveal key={block.title} delay={index * 80}>
              <article className="flex h-full flex-col justify-between gap-8 border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-brass hover:shadow-[0_24px_50px_-24px_oklch(0_0_0/0.35)]">
                <h2 className="font-display text-3xl leading-snug md:text-4xl">{block.title}</h2>
                <div>
                  <a href={`mailto:${block.value}`} className="line-link text-lg text-petrol md:text-xl">{block.value}</a>
                  <p className="mt-3 text-lg text-muted-foreground md:text-xl">{t("blockNote")}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl md:text-5xl">{t("contactsManagement")}</h2>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground md:text-xl">
                {t("contactsManagementText")}
              </p>
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl">{t("contactsFollow")}</h2>
              <div className="mt-4 space-y-2 text-lg md:text-xl">
                <p><a className="line-link" href="https://www.facebook.com/mosheganelin/" target="_blank" rel="noreferrer">Facebook</a></p>
                <p><a className="line-link" href="https://www.instagram.com/moshearielganelin" target="_blank" rel="noreferrer">Instagram</a></p>
                <p><a className="line-link" href="https://youtube.com/@mosheganelin" target="_blank" rel="noreferrer">YouTube</a></p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
