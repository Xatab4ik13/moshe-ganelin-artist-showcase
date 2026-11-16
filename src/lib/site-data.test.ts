import { test } from "node:test";
import { deepStrictEqual } from "node:assert/strict";
import { categoryOrder } from "./site-data";

test("piano is a separate work category immediately after organ", () => {
  deepStrictEqual(categoryOrder, ["symphonic", "organ", "piano", "vocal", "choir", "chamber"]);
});