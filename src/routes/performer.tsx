import { createFileRoute } from "@tanstack/react-router";

import { FacetPage, type FacetLink } from "@/components/site/FacetPage";
import heroImage from "@/assets/moshe-organ-wide.webp.asset.json";

export const Route = createFileRoute("/performer")({
  head: () => ({
    meta: [
      { title: "Performer — Moshe Ariel Ganelin" },
      { name: "description", content: "Moshe Ariel Ganelin on the concert stage: organ and piano repertoire, halls and instruments." },
      { property: "og:title", content: "Performer — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Moshe Ariel Ganelin on the concert stage: organ and piano repertoire, halls and instruments." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/performer" }],
  }),
  component: PerformerPage,
});

const related: FacetLink[] = [
  { to: "/composer", labelKey: "navComposer" },
  { to: "/improviser", labelKey: "navImproviser" },
  { to: "/awards", labelKey: "navAwards" },
];

function PerformerPage() {
  return <FacetPage titleKey="performerTitle" leadKey="performerLead" image={heroImage.url} related={related} />;
}
