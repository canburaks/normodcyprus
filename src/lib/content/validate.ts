import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import {
  assetSchema,
  collectionSchema,
  collectionTranslationSchema,
  editorialSchema,
  editorialTranslationSchema,
  homeSchema,
  postSchema,
  postTranslationSchema,
  productSchema,
  productTranslationSchema,
  siteSchema,
  storeSchema,
  type Locale,
} from "./schemas";
import { readJson, readLocale, recordIds } from "./read";
import { compileArticle } from "../mdx/compile";
import { publishedPaths } from "../routes/published";

function invariant(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function leafKeys(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return [prefix];
  return Object.entries(value)
    .flatMap(([key, next]) => leafKeys(next, `${prefix}.${key}`))
    .sort();
}
function filesIn(folder: string): string[] {
  return fs
    .readdirSync(folder, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? filesIn(path.join(folder, entry.name))
        : [path.join(folder, entry.name)],
    );
}
export async function validateContent() {
  const site = readJson("content/config/site.json", siteSchema);
  const store = readJson("content/store.json", storeSchema);
  invariant(
    !site.isIndexable || site.origin,
    "An indexable site needs a confirmed production origin",
  );
  const assets = readJson("content/assets.json", z.record(z.string(), assetSchema));
  const products = recordIds("products").map((id) => {
    const record = readJson(`content/products/${id}.json`, productSchema);
    invariant(record.id === id, `Product filename and id differ: ${id}`);
    return record;
  });
  const collections = recordIds("collections").map((id) =>
    readJson(`content/collections/${id}.json`, collectionSchema),
  );
  const pages = recordIds("pages")
    .filter((id) => id !== "home")
    .map((id) => readJson(`content/pages/${id}.json`, editorialSchema));
  const posts = recordIds("posts").map((id) => readJson(`content/posts/${id}.json`, postSchema));
  const home = readJson("content/pages/home.json", homeSchema);
  const authors = readJson(
    "content/authors.json",
    z.record(z.string(), z.strictObject({ type: z.enum(["Person", "Organization"]) })),
  );
  const navigation = readJson(
    "content/config/navigation.json",
    z.strictObject({ primary: z.array(z.string()), footer: z.array(z.string()) }),
  );
  const routes = readJson<Record<string, string>>("content/config/routes.json");
  [...navigation.primary, ...navigation.footer].forEach((id) =>
    invariant(
      id in routes || pages.some((page) => page.id === id && page.isPublished),
      `Invalid navigation target: ${id}`,
    ),
  );
  const taxonomy = readJson(
    "content/taxonomy.json",
    z.strictObject({ categories: z.array(z.string()), materials: z.array(z.string()) }),
  );
  const productById = new Map(products.map((p) => [p.id, p]));
  const collectionIds = new Set(collections.map((c) => c.id));
  const verifyAsset = (id: string) => invariant(assets[id], `Missing asset reference: ${id}`);
  [
    site.logoAssetId,
    site.fallbackAssetId,
    site.socialAssetId,
    site.faviconAssetId,
    home.heroAssetId,
    home.editorialAssetId,
    store.photoAssetId,
  ].forEach(verifyAsset);
  for (const [id, asset] of Object.entries(assets)) {
    invariant(id === asset.id, `Asset ID mismatch: ${id}`);
    if (asset.kind === "local")
      invariant(fs.existsSync(path.join("public", asset.src)), `Missing public file: ${asset.src}`);
    for (const locale of site.locales)
      invariant(
        readLocale<Record<string, { alt: string }>>(locale, "assets")[id]?.alt?.trim(),
        `Missing ${locale} alt: ${id}`,
      );
  }
  for (const product of products) {
    invariant(
      taxonomy.categories.includes(product.categoryId),
      `Invalid category in ${product.id}`,
    );
    product.materialIds.forEach((id) =>
      invariant(taxonomy.materials.includes(id), `Invalid material in ${product.id}: ${id}`),
    );
    product.collectionIds.forEach((id) =>
      invariant(collectionIds.has(id), `Invalid collection in ${product.id}: ${id}`),
    );
    product.relatedIds.forEach((id) =>
      invariant(
        productById.has(id) && id !== product.id,
        `Invalid related product in ${product.id}: ${id}`,
      ),
    );
    product.galleryAssetIds.forEach(verifyAsset);
  }
  for (const collection of collections) {
    verifyAsset(collection.heroAssetId);
    collection.featuredProductIds.forEach((id) =>
      invariant(
        productById.get(id)?.collectionIds.includes(collection.id) &&
          (!collection.isPublished || productById.get(id)?.isPublished),
        `Featured product ${id} is not a published member of ${collection.id}`,
      ),
    );
  }
  home.collectionIds.forEach((id) =>
    invariant(
      collections.some((c) => c.id === id && c.isPublished),
      `Invalid featured collection: ${id}`,
    ),
  );
  home.featuredProductIds.forEach((id) =>
    invariant(productById.get(id)?.isPublished, `Invalid home product: ${id}`),
  );
  invariant(
    pages.some((page) => page.id === home.editorialPageId && page.isPublished),
    "Invalid home editorial reference",
  );
  home.postIds.forEach((id) =>
    invariant(
      posts.some((post) => post.id === id),
      `Invalid home article reference: ${id}`,
    ),
  );
  for (const locale of site.locales) {
    const navigationLabels = readLocale<Record<string, string>>(locale, "navigation");
    [...navigation.primary, ...navigation.footer].forEach((id) =>
      invariant(navigationLabels[id]?.trim(), `Missing navigation label: ${locale}/${id}`),
    );
    const groups = [
      products.map((p) => readLocale(locale, `products/${p.id}`, productTranslationSchema)),
      collections.map((c) =>
        readLocale(locale, `collections/${c.id}`, collectionTranslationSchema),
      ),
      pages.map((p) => {
        verifyAsset(p.heroAssetId);
        const copy = readLocale(locale, `pages/${p.id}`, editorialTranslationSchema);
        invariant(
          p.sections.every((section) => copy.sections[section.id]),
          `Missing section in ${locale}/${p.id}`,
        );
        return copy;
      }),
      posts.map((p) => readLocale(locale, `posts/${p.id}`, postTranslationSchema)),
    ];
    groups.forEach((group) =>
      invariant(
        new Set(group.map((record) => record.slug)).size === group.length,
        `Duplicate slugs in ${locale}`,
      ),
    );
    invariant(
      new Set(groups.flat().map((record) => record.seo.title)).size === groups.flat().length,
      `Duplicate SEO titles in ${locale}`,
    );
    for (const post of posts) {
      verifyAsset(post.coverAssetId);
      post.relatedProductIds.forEach((id) =>
        invariant(productById.has(id), `Invalid article product: ${id}`),
      );
      if (post.isPublished)
        invariant(
          post.authorId &&
            authors[post.authorId] &&
            readLocale<Record<string, unknown>>(locale, "authors")[post.authorId],
          `Missing verified ${locale} author: ${post.id}`,
        );
      await compileArticle(
        readLocale(locale, `posts/${post.id}`, postTranslationSchema).bodyMdx,
        locale,
      );
    }
  }
  const trFiles = filesIn("public/locales/tr")
    .map((file) => file.replace("public/locales/tr/", ""))
    .sort();
  const enFiles = filesIn("public/locales/en")
    .map((file) => file.replace("public/locales/en/", ""))
    .sort();
  invariant(
    JSON.stringify(trFiles) === JSON.stringify(enFiles),
    "Turkish and English file inventories differ",
  );
  for (const file of trFiles) {
    invariant(
      JSON.stringify(leafKeys(readLocale("tr", file.slice(0, -5)))) ===
        JSON.stringify(leafKeys(readLocale("en", file.slice(0, -5)))),
      `Translation keys differ: ${file}`,
    );
  }
  const paths = publishedPaths();
  invariant(
    new Set(paths).size === paths.length,
    "Published paths collide with each other or a reserved route",
  );
  return {
    products: products.length,
    collections: collections.length,
    editorialPages: pages.length,
    articleDrafts: posts.filter((post) => !post.isPublished).length,
    assets: Object.keys(assets).length,
    locales: site.locales as Locale[],
  };
}
