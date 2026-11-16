import { expect, test } from "bun:test";
import { categoryOrder } from "./site-data";

test("piano is a separate work category immediately after organ", () => {
  expect(categoryOrder).toEqual(["symphonic", "organ", "piano", "vocal", "choir", "chamber"]);
});