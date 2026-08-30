import { createFileRoute } from "@tanstack/react-router";

import { FacetPage, type FacetLink } from "@/components/site/FacetPage";
import heroImage from "@/assets/moshe-hero.webp.asset.json";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards — Moshe Ariel Ganelin" },
      { name: "description", content: "Competitions, prizes and honours of Moshe Ariel Ganelin." },
      { property: "og:title", content: "Awards — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Competitions, prizes and honours of Moshe Ariel Ganelin." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/awards" }],
  }),
  component: AwardsPage,
});

const related: FacetLink[] = [
  { to: "/press", labelKey: "navPress" },
  { to: "/performer", labelKey: "navPerformer" },
  { to: "/composer", labelKey: "navComposer" },
];

function AwardsPage() {
  return <FacetPage titleKey="awardsTitle" leadKey="awardsLead" image={heroImage.url} related={related} />;
}
