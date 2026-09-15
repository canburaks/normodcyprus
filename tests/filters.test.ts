import test from "node:test";
import assert from "node:assert/strict";
import {
  emptyFilters,
  filterProducts,
  parseFilters,
  serializeFilters,
} from "../src/lib/catalog/filters";
import { catalogOptions, productCard, productRecords } from "../src/lib/content/loaders";

const products = productRecords().map((p) => productCard(p.id, "tr"));
const options = catalogOptions("tr");
test("invalid and repeated query parameters fall back safely", () => {
  assert.deepEqual(
    parseFilters(
      { category: "unknown", material: ["oak", "velvet"], sort: "invalid", q: ["x"] },
      options,
    ),
    emptyFilters,
  );
  assert.deepEqual(serializeFilters(emptyFilters), {});
});
test("Turkish matching handles dotted and dotless I, case and diacritics", () => {
  assert.equal(
    filterProducts(products, { ...emptyFilters, q: "ŞİFONYER" }, "tr")[0].id,
    "norac-dresser",
  );
  assert.equal(
    filterProducts(products, { ...emptyFilters, q: "uclu KLEM" }, "tr")[0].id,
    "klem-three",
  );
});
test("combined filters and sorting remain deterministic and do not mutate the catalog", () => {
  const before = products.map((p) => p.id);
  const filtered = filterProducts(
    products,
    { ...emptyFilters, collection: "carle", material: "velvet", category: "seating" },
    "tr",
  );
  assert.deepEqual(
    filtered.map((p) => p.id),
    ["carle-three"],
  );
  assert.equal(filterProducts(products, { ...emptyFilters, q: "unmatched" }, "tr").length, 0);
  filterProducts(products, { ...emptyFilters, sort: "alphabetical" }, "tr");
  assert.deepEqual(
    products.map((p) => p.id),
    before,
  );
});
