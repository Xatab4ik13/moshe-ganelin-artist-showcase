import { createFileRoute } from "@tanstack/react-router";

import { FacetPage, type FacetLink } from "@/components/site/FacetPage";
import heroImage from "@/assets/moshe-piano.webp.asset.json";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press — Moshe Ariel Ganelin" },
      { name: "description", content: "Reviews, interviews and press materials about Moshe Ariel Ganelin." },
      { property: "og:title", content: "Press — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Reviews, interviews and press materials about Moshe Ariel Ganelin." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/press" }],
  }),
  component: PressPage,
});

const related: FacetLink[] = [
  { to: "/awards", labelKey: "navAwards" },
  { to: "/composer", labelKey: "navComposer" },
  { to: "/performer", labelKey: "navPerformer" },
];

function PressPage() {
  return <FacetPage titleKey="pressTitle" leadKey="pressLead" image={heroImage.url} related={related} />;
}
