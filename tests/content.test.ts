import test from "node:test";
import assert from "node:assert/strict";
import {
  productSchema,
  postSchema,
  siteSchema,
  storeSchema,
  mediaFrameSchema,
  gridPlacementSchema,
} from "../src/lib/content/schemas";
import { readJson } from "../src/lib/content/read";
import { validateContent } from "../src/lib/content/validate";
import { entityAlternates, findEntityId, postRecords } from "../src/lib/content/loaders";
import { publishedPaths } from "../src/lib/routes/published";
import { localizedPath } from "../src/lib/routes/paths";
import { safeJsonLd } from "../src/lib/seo/schema";
import { postDetail } from "../src/lib/content/post-loader";

test("seed data has complete locales and valid asset, taxonomy and membership joins", async () => {
  const result = await validateContent();
  assert.deepEqual(result.locales, ["tr", "en"]);
  assert.ok(result.products > 0 && result.collections > 0);
});
test("product schemas reject commerce fields, unknown fields and invalid image lists", () => {
  const product = readJson("content/products/klem-three.json", productSchema);
  assert.equal(productSchema.safeParse({ ...product, price: 10 }).success, false);
  assert.equal(productSchema.safeParse({ ...product, galleryAssetIds: [] }).success, false);
  assert.equal(productSchema.safeParse({ ...product, dimensions: { width: -1 } }).success, false);
});
test("site versions and contact destinations/hours fail closed", () => {
  const site = readJson("content/config/site.json", siteSchema);
  const store = readJson("content/store.json", storeSchema);
  assert.equal(siteSchema.safeParse({ ...site, schemaVersion: 2 }).success, false);
  assert.equal(
    storeSchema.safeParse({ ...store, phoneHref: "javascript:alert(1)" }).success,
    false,
  );
  assert.equal(
    storeSchema.safeParse({
      ...store,
      openingHours: [{ days: ["Monday"], opens: "18:00", closes: "10:00" }],
    }).success,
    false,
  );
});
test("translated slugs resolve the same ID and generate reciprocal locale routes", () => {
  const paths = entityAlternates("products", "klem-three");
  assert.equal(paths.tr, "/products/klem-uclu-koltuk");
  assert.equal(localizedPath(paths.en, "en"), "/en/products/klem-three-seat-sofa");
  assert.equal(findEntityId("products", "klem-three-seat-sofa", "en"), "klem-three");
  assert.equal(findEntityId("products", "klem-uclu-koltuk", "en"), undefined);
  const all = publishedPaths();
  assert.equal(new Set(all).size, all.length);
  assert.ok(all.includes("/en/products/klem-three-seat-sofa"));
  assert.equal(
    all.some((path) => path.includes("/tr/")),
    false,
  );
});
test("uncredited drafts cannot be published or included in routes", () => {
  const draft = readJson("content/posts/room-to-live.json", postSchema);
  assert.equal(
    postSchema.safeParse({ ...draft, isPublished: true, authorId: null, publishedAt: null })
      .success,
    false,
  );
  assert.equal(
    postRecords().some((post) => !post.isPublished),
    false,
  );
  if (!draft.isPublished) assert.equal(findEntityId("blog", "room-to-live", "en"), undefined);
});
test("JSON-LD cannot break out of the head script", () => {
  const value = { name: "</script><script>alert(1)</script>" };
  const serialized = safeJsonLd(value);
  assert.equal(serialized.includes("<"), false);
  assert.deepEqual(JSON.parse(serialized), value);
});

test("presentation contracts reject off-grid tiles, unsafe colors and invalid focal points", () => {
  assert.equal(
    gridPlacementSchema.safeParse({ column: 10, span: 4, row: 1, rowSpan: 1 }).success,
    false,
  );
  assert.equal(
    mediaFrameSchema.safeParse({ ratio: "portrait", fit: "cover", position: "101% 50%" }).success,
    false,
  );
  const product = readJson("content/products/klem-three.json", productSchema);
  assert.equal(
    productSchema.safeParse({
      ...product,
      presentation: { ...product.presentation, hoverBackground: "url(https://example.com)" },
    }).success,
    false,
  );
});

test("draft previews omit invented author/date and remain excluded by default", async () => {
  await assert.rejects(() => postDetail("room-to-live", "en"));
  const preview = await postDetail("room-to-live", "en", true);
  assert.equal(preview.isDraft, true);
  assert.equal(preview.author, null);
  assert.equal(preview.publishedAt, null);
  assert.match(preview.html, /mdx-photo-pair/);
  assert.equal(
    publishedPaths().some((path) => path.includes("room-to-live")),
    false,
  );
});
