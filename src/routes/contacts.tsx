import { createFileRoute } from "@tanstack/react-router";

import { DecoChevronRule, DecoCornerPlate, DecoPilaster, DecoScales } from "@/components/site/Deco";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useLanguage, type DictKey } from "@/lib/i18n";
import { useContacts, useSocialLinks } from "@/lib/site-items";

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

const contactTitleKeys: Record<string, DictKey> = {
  booking: "contactsBooking",
  press: "contactsPress",
  scores: "contactsScores",
};

function ContactsPage() {
  const { t } = useLanguage();
  const contacts = useContacts();
  const socials = useSocialLinks();

  const blocks = contacts.map((contact) => ({
    title: contactTitleKeys[contact.slug] ? t(contactTitleKeys[contact.slug]!) : contact.label || contact.email,
    value: contact.email,
  }));

  return (
    <PageShell title={t("contactsTitle")} lead={t("contactsLead")}>
      <section className="relative overflow-hidden px-5 pb-24 pt-10 md:px-10 lg:px-16 lg:pb-32">
        <DecoScales tone="light" opacity={0.07} size={104} />
        <DecoPilaster tone="light" className="pointer-events-none absolute left-1 top-16 hidden h-[70%] w-8 opacity-45 lg:block" />
        <DecoPilaster tone="light" flip className="pointer-events-none absolute right-1 top-16 hidden h-[70%] w-8 opacity-45 lg:block" />
        <div className="relative mx-auto max-w-[1600px]">
          <div className="grid gap-8 md:grid-cols-3">
            {blocks.map((block, index) => (
              <Reveal key={block.title} delay={index * 80}>
                <article className="deco-card flex h-full flex-col justify-between gap-8 p-9 md:p-10">
                  <DecoCornerPlate tone="light" className="pointer-events-none absolute left-3 top-3 h-9 w-9 opacity-55" />
                  <DecoCornerPlate tone="light" flipX flipY className="pointer-events-none absolute bottom-3 right-3 h-9 w-9 opacity-55" />
                  <h2 className="relative text-center font-display text-3xl leading-snug md:text-4xl">{block.title}</h2>
                  <div className="relative text-center">
                    <a href={`mailto:${block.value}`} className="line-link text-lg text-petrol md:text-xl">{block.value}</a>
                    <p className="mt-3 text-lg text-muted-foreground md:text-xl">{t("blockNote")}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <DecoChevronRule tone="light" className="mx-auto mt-20 max-w-[1200px]" />

          <Reveal delay={120}>
            <div className="mt-16 grid gap-14 md:grid-cols-2">
              <div className="text-center md:text-left">
                <h2 className="font-display text-4xl md:text-5xl">{t("contactsManagement")}</h2>
                <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground md:mx-0 md:text-xl">
                  {t("contactsManagementText")}
                </p>
              </div>
              <div className="text-center md:text-right">
                <h2 className="font-display text-4xl md:text-5xl">{t("contactsFollow")}</h2>
                <div className="mt-5 space-y-2 text-lg md:text-xl">
                  {socials.map((social) => (
                    <p key={social.slug}>
                      <a className="line-link" href={social.url} target="_blank" rel="noreferrer">
                        {social.label}
                      </a>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
