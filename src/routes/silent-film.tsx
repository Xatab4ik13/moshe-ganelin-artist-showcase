import { createFileRoute } from "@tanstack/react-router";

import { FacetPage, type FacetLink } from "@/components/site/FacetPage";
import heroImage from "@/assets/moshe-stage.webp.asset.json";

export const Route = createFileRoute("/silent-film")({
  head: () => ({
    meta: [
      { title: "Silent film — Moshe Ariel Ganelin" },
      { name: "description", content: "Live organ accompaniment to silent cinema by Moshe Ariel Ganelin." },
      { property: "og:title", content: "Silent film — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Live organ accompaniment to silent cinema by Moshe Ariel Ganelin." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/silent-film" }],
  }),
  component: SilentFilmPage,
});

const related: FacetLink[] = [
  { to: "/improviser", labelKey: "navImproviser" },
  { to: "/performer", labelKey: "navPerformer" },
  { to: "/press", labelKey: "navPress" },
];

function SilentFilmPage() {
  return <FacetPage titleKey="silentFilmTitle" leadKey="silentFilmLead" image={heroImage.url} related={related} />;
}
