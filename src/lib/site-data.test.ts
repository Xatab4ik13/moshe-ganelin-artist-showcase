import { test } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { categoryOrder } from "./site-data";
import { worksFrom } from "./site-items";

test("piano is a separate work category immediately after organ", () => {
  deepStrictEqual(categoryOrder, ["symphonic", "organ", "piano", "vocal", "choir", "chamber"]);
});

test("a newly added piano work retains its selected category", () => {
  const works = worksFrom([{ kind: "work", slug: "piano-test", data: { title: "Piano work", category: "piano" }, position: 0, hidden: false }]);
  deepStrictEqual(works.find((work) => work.slug === "piano-test")?.category, "piano");
});