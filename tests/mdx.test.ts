import test from "node:test";
import assert from "node:assert/strict";
import { compileArticle } from "../src/lib/mdx/compile";

test("MDX compiles headings and registered references to static HTML", async () => {
  const result = await compileArticle(
    [
      "## A room",
      "A **considered** space.",
      '<ProductLink id="klem-three">Discover Klem</ProductLink>',
      "<Callout>Bring your room measurements.</Callout>",
    ],
    "en",
  );
  assert.equal(result.headings[0].title, "A room");
  assert.match(result.html, /id="section-1"/);
  assert.match(result.html, /href="\/en\/products\/klem-three-seat-sofa"/);
  assert.match(result.html, /<aside>/);
});
for (const source of [
  'import x from "node:fs"',
  "{process.env.SECRET}",
  "<script>alert(1)</script>",
  '<Callout onClick="x">x</Callout>',
  '<Figure id={"logo"} />',
  "[unsafe](javascript:alert)",
  "# Duplicate title",
]) {
  test(`reject unsafe MDX: ${source}`, async () => {
    await assert.rejects(() => compileArticle([source], "en"));
  });
}
test("unknown entity references fail at build time", async () => {
  await assert.rejects(() => compileArticle(['<ProductLink id="missing">x</ProductLink>'], "en"));
});

test("photo pairs use registered localized media and reject incomplete or unknown references", async () => {
  const result = await compileArticle(['<PhotoPair left="living-room" right="bedroom" />'], "en");
  assert.match(result.html, /class="mdx-photo-pair"/);
  assert.equal((result.html.match(/<img /g) ?? []).length, 2);
  assert.match(result.html, /\/_next\/image/);
  await assert.rejects(() => compileArticle(['<PhotoPair left="living-room" />'], "en"));
  await assert.rejects(() =>
    compileArticle(['<PhotoPair left="living-room" right="missing" />'], "en"),
  );
});
