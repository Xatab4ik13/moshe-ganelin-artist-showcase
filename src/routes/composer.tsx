import { createFileRoute } from "@tanstack/react-router";

import { FacetPage, type FacetLink } from "@/components/site/FacetPage";
import heroImage from "@/assets/organ-architecture.webp.asset.json";

export const Route = createFileRoute("/composer")({
  head: () => ({
    meta: [
      { title: "Composer — Moshe Ariel Ganelin" },
      { name: "description", content: "Original works for organ, orchestra and chamber ensembles by Moshe Ariel Ganelin." },
      { property: "og:title", content: "Composer — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Original works for organ, orchestra and chamber ensembles by Moshe Ariel Ganelin." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/composer" }],
  }),
  component: ComposerPage,
});

const related: FacetLink[] = [
  { to: "/performer", labelKey: "navPerformer" },
  { to: "/improviser", labelKey: "navImproviser" },
  { to: "/silent-film", labelKey: "navSilentFilm" },
];

function ComposerPage() {
  return <FacetPage titleKey="composerTitle" leadKey="composerLead" image={heroImage.url} related={related} />;
}
