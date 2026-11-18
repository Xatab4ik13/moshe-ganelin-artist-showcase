import { test } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { categoryOrder } from "./site-data";
import { worksFrom, workTitle } from "./site-items";

test("piano is a separate work category immediately after organ", () => {
  deepStrictEqual(categoryOrder, ["symphonic", "organ", "piano", "vocal", "choir", "chamber"]);
});

test("a newly added piano work retains its selected category", () => {
  const works = worksFrom([{ kind: "work", slug: "piano-test", data: { title: "Piano work", category: "piano" }, position: 0, hidden: false }]);
  deepStrictEqual(works.find((work) => work.slug === "piano-test")?.category, "piano");
});

test("work titles use EN, ES and POR translations without changing the work address", () => {
  const work = worksFrom([{ kind: "work", slug: "translated-work", data: { title: "English title", title_es: "Título español", title_pt: "Título português" }, position: 0, hidden: false }]).find((item) => item.slug === "translated-work");
  if (!work) throw new Error("Missing work");
  deepStrictEqual([workTitle(work, "en"), workTitle(work, "es"), workTitle(work, "pt"), work.slug], ["English title", "Título español", "Título português", "translated-work"]);
});

test("empty work title translations fall back to the existing English title", () => {
  const work = worksFrom([{ kind: "work", slug: "fallback-work", data: { title: "Original title", title_es: " ", title_pt: "" }, position: 0, hidden: false }]).find((item) => item.slug === "fallback-work");
  if (!work) throw new Error("Missing work");
  deepStrictEqual([workTitle(work, "es"), workTitle(work, "pt")], ["Original title", "Original title"]);
});