import { describe, expect, it } from "vitest";
import { defaultConcerts, mergeConcerts, type ConcertOverride } from "./site-concerts";

describe("concert order", () => {
  it("follows positions saved from the admin panel", () => {
    const upcoming = defaultConcerts.filter((c) => c.kind === "upcoming");
    const last = upcoming[upcoming.length - 1]!;
    const row: ConcertOverride = {
      slug: last.slug, kind: "upcoming", day: "", month: "", year: "", city: "", venue: "",
      title: "", description: "", videoId: "", image: "", position: 1, hidden: false,
    };
    expect(mergeConcerts([row]).upcoming[0]!.slug).toBe(last.slug);
  });
});
