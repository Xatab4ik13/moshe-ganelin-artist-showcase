import { createFileRoute } from "@tanstack/react-router";

import { FacetPage, type FacetLink } from "@/components/site/FacetPage";
import heroImage from "@/assets/moshe-console.webp.asset.json";

export const Route = createFileRoute("/improviser")({
  head: () => ({
    meta: [
      { title: "Improviser — Moshe Ariel Ganelin" },
      { name: "description", content: "Improvisation on given themes as a living form of composition by Moshe Ariel Ganelin." },
      { property: "og:title", content: "Improviser — Moshe Ariel Ganelin" },
      { property: "og:description", content: "Improvisation on given themes as a living form of composition by Moshe Ariel Ganelin." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://moshearielganelin.com/improviser" }],
  }),
  component: ImproviserPage,
});

const related: FacetLink[] = [
  { to: "/silent-film", labelKey: "navSilentFilm" },
  { to: "/composer", labelKey: "navComposer" },
  { to: "/performer", labelKey: "navPerformer" },
];

function ImproviserPage() {
  return <FacetPage titleKey="improviserTitle" leadKey="improviserLead" image={heroImage.url} related={related} />;
}
