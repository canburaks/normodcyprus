import { z } from "zod";

export const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const localeSchema = z.enum(["tr", "en"]);
export type Locale = z.infer<typeof localeSchema>;
const text = z.string().trim().min(1);
export const seoSchema = z.strictObject({ title: text, description: text });
const source = z.url();
export const siteSchema = z.strictObject({
  schemaVersion: z.literal(1),
  locales: z.tuple([z.literal("tr"), z.literal("en")]),
  defaultLocale: z.literal("tr"),
  localeDetection: z.literal(false),
  origin: z.url().nullable(),
  previewOrigin: z.url(),
  isIndexable: z.boolean(),
  brandId: idSchema,
  logoAssetId: idSchema,
  fallbackAssetId: idSchema,
  socialAssetId: idSchema,
  faviconAssetId: idSchema,
  sourceOrigin: source,
});
const openingHoursSchema = z
  .strictObject({
    days: z
      .array(z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]))
      .min(1),
    opens: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
    closes: z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
  })
  .refine((hours) => hours.opens < hours.closes, "Closing time must follow opening time");
export const storeSchema = z.strictObject({
  id: idSchema,
  email: z.email(),
  phoneDisplay: text,
  phoneHref: z
    .string()
    .regex(/^tel:\+[1-9]\d{6,14}$/)
    .nullable(),
  directionsUrl: z.url().refine((url) => url.startsWith("https://"), "Directions must use HTTPS"),
  photoAssetId: idSchema,
  openingHours: z.array(openingHoursSchema).min(1),
  geo: z.strictObject({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  sources: z.record(z.string(), z.strictObject({ url: source, verifiedAt: z.iso.date() })),
});
export const assetSchema = z
  .strictObject({
    id: idSchema,
    kind: z.enum(["remote", "local"]),
    src: text,
    width: z.number().positive(),
    height: z.number().positive(),
    isPlaceholder: z.boolean(),
    source,
  })
  .refine(
    (asset) =>
      asset.kind === "remote"
        ? /^https:\/\/normod\.com\/cdn\/shop\//.test(asset.src)
        : /^\/(images|brand|fonts)\/[a-zA-Z0-9/_.-]+$/.test(asset.src),
    "Use a registered Normod CDN or public asset path",
  );
export const productSchema = z.strictObject({
  id: idSchema,
  isPublished: z.boolean(),
  categoryId: idSchema,
  materialIds: z.array(idSchema).min(1),
  collectionIds: z.array(idSchema),
  galleryAssetIds: z.array(idSchema).min(1),
  dimensions: z.strictObject({
    width: z.number().positive().optional(),
    depth: z.number().positive().optional(),
    height: z.number().positive().optional(),
  }),
  source,
  verifiedAt: z.iso.date(),
  sortOrder: z.number().int().nonnegative(),
  relatedIds: z.array(idSchema),
});
export const productTranslationSchema = z.strictObject({
  slug: idSchema,
  name: text,
  subtitle: text,
  summary: text,
  description: text,
  care: text,
  seo: seoSchema,
});
export const collectionSchema = z.strictObject({
  id: idSchema,
  isPublished: z.boolean(),
  heroAssetId: idSchema,
  featuredProductIds: z.array(idSchema),
  source,
});
export const collectionTranslationSchema = z.strictObject({
  slug: idSchema,
  name: text,
  title: text,
  description: text,
  seo: seoSchema,
});
export const editorialSchema = z.strictObject({
  id: idSchema,
  isPublished: z.boolean(),
  heroAssetId: idSchema,
  source,
  sections: z.array(z.strictObject({ id: idSchema, type: z.literal("text") })).min(1),
});
export const editorialTranslationSchema = z.strictObject({
  slug: idSchema,
  name: text,
  title: text,
  description: text,
  sections: z.record(idSchema, z.strictObject({ title: text, body: text })),
  seo: seoSchema,
});
export const postSchema = z
  .strictObject({
    id: idSchema,
    isPublished: z.boolean(),
    coverAssetId: idSchema,
    authorId: idSchema.nullable(),
    publishedAt: z.iso.date().nullable(),
    relatedProductIds: z.array(idSchema),
  })
  .refine(
    (post) => !post.isPublished || Boolean(post.authorId && post.publishedAt),
    "Published articles need a verified author and date",
  );
export const postTranslationSchema = z.strictObject({
  slug: idSchema,
  title: text,
  excerpt: text,
  bodyMdx: z.array(text).min(1),
  seo: seoSchema,
});
export const homeSchema = z.strictObject({
  id: z.literal("home"),
  heroAssetId: idSchema,
  collectionIds: z.array(idSchema),
  featuredProductIds: z.array(idSchema),
  editorialPageId: idSchema,
  editorialAssetId: idSchema,
  postIds: z.array(idSchema),
});
export type Product = z.infer<typeof productSchema>;
export type ProductTranslation = z.infer<typeof productTranslationSchema>;
export type Collection = z.infer<typeof collectionSchema>;
export type CollectionTranslation = z.infer<typeof collectionTranslationSchema>;
export type Editorial = z.infer<typeof editorialSchema>;
export type EditorialTranslation = z.infer<typeof editorialTranslationSchema>;
export type Post = z.infer<typeof postSchema>;
export type PostTranslation = z.infer<typeof postTranslationSchema>;
export type SeoContent = z.infer<typeof seoSchema>;
