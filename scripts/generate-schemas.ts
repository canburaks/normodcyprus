import fs from "node:fs";
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
  presentationSchema,
} from "../src/lib/content/schemas";

const schemas = {
  site: siteSchema,
  store: storeSchema,
  presentation: presentationSchema,
  assets: z.record(z.string(), assetSchema),
  product: productSchema,
  "product-translation": productTranslationSchema,
  collection: collectionSchema,
  "collection-translation": collectionTranslationSchema,
  editorial: editorialSchema,
  "editorial-translation": editorialTranslationSchema,
  home: homeSchema,
  post: postSchema,
  "post-translation": postTranslationSchema,
};
fs.mkdirSync("content/schemas", { recursive: true });
for (const [name, schema] of Object.entries(schemas))
  fs.writeFileSync(
    `content/schemas/${name}.schema.json`,
    JSON.stringify(z.toJSONSchema(schema), null, 2) + "\n",
  );
console.info(`Generated ${Object.keys(schemas).length} editor schemas.`);
