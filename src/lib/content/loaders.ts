import { serverSideTranslations } from "next-i18next/pages/serverSideTranslations";
import i18nConfig from "../../../next-i18next.config.cjs";
import site from "../../../content/config/site.json";
import navigation from "../../../content/config/navigation.json";
import store from "../../../content/store.json";
import taxonomy from "../../../content/taxonomy.json";
import presentation from "../../../content/config/presentation.json";
import { entityPath, routes, type EntityKind, type RouteKey } from "../routes/paths";
import { readJson, readLocale, recordIds } from "./read";
import {
  collectionSchema,
  collectionTranslationSchema,
  editorialSchema,
  editorialTranslationSchema,
  productSchema,
  productTranslationSchema,
  postSchema,
  postTranslationSchema,
  type Locale,
  type Product,
  type Collection,
  type Editorial,
  type Post,
  type LinkTarget,
} from "./schemas";
import type {
  AlternatePaths,
  ImageAsset,
  ProductCardModel,
  ProductModel,
  CollectionModel,
  EditorialModel,
  BasePageProps,
  SiteLink,
  PostCardModel,
} from "./models";

export function getImage(id: string, locale: Locale): ImageAsset {
  const assets = readJson<Record<string, Omit<ImageAsset, "alt">>>("content/assets.json");
  const translated = readLocale<Record<string, { alt: string }>>(locale, "assets");
  const asset = assets[id];
  if (!asset || !translated[id]) throw new Error(`Missing asset or translation: ${locale}/${id}`);
  return { id, src: asset.src, width: asset.width, height: asset.height, alt: translated[id].alt };
}
export function productRecords(): Product[] {
  return recordIds("products")
    .map((id) => readJson(`content/products/${id}.json`, productSchema))
    .filter((p) => p.isPublished)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
export function collectionRecords(): Collection[] {
  return recordIds("collections")
    .map((id) => readJson(`content/collections/${id}.json`, collectionSchema))
    .filter((p) => p.isPublished);
}
export function editorialRecords(): Editorial[] {
  return recordIds("pages")
    .filter((id) => id !== "home")
    .map((id) => readJson(`content/pages/${id}.json`, editorialSchema))
    .filter((p) => p.isPublished);
}
export function postRecords(shouldIncludeDrafts = false): Post[] {
  return recordIds("posts")
    .map((id) => readJson(`content/posts/${id}.json`, postSchema))
    .filter((p) => shouldIncludeDrafts || p.isPublished);
}
const folders = {
  products: "products",
  collections: "collections",
  editorial: "pages",
  blog: "posts",
} as const;
export function entityAlternates(kind: EntityKind, id: string): AlternatePaths {
  return Object.fromEntries(
    site.locales.map((locale) => [
      locale,
      entityPath(
        kind,
        readLocale<{ slug: string }>(locale as Locale, `${folders[kind]}/${id}`).slug,
      ),
    ]),
  ) as AlternatePaths;
}
export function findEntityId(
  kind: EntityKind,
  slug: string,
  locale: Locale,
  shouldIncludeDrafts = false,
) {
  const records =
    kind === "products"
      ? productRecords()
      : kind === "collections"
        ? collectionRecords()
        : kind === "editorial"
          ? editorialRecords()
          : postRecords(shouldIncludeDrafts);
  return records.find(
    ({ id }) => readLocale<{ slug: string }>(locale, `${folders[kind]}/${id}`).slug === slug,
  )?.id;
}
export function entityPaths(kind: EntityKind, shouldIncludeDrafts = false) {
  const records =
    kind === "products"
      ? productRecords()
      : kind === "collections"
        ? collectionRecords()
        : kind === "editorial"
          ? editorialRecords()
          : postRecords(shouldIncludeDrafts);
  return records.flatMap(({ id }) =>
    site.locales.map((locale) => ({
      params: {
        slug: readLocale<{ slug: string }>(locale as Locale, `${folders[kind]}/${id}`).slug,
      },
      locale,
    })),
  );
}
function navigationLink(id: string, locale: Locale): SiteLink {
  const labels = readLocale<Record<string, string>>(locale, "navigation");
  return {
    id,
    label: labels[id],
    href: id in routes ? routes[id as RouteKey] : entityAlternates("editorial", id)[locale],
  };
}
export function targetPath(target: LinkTarget, locale: Locale) {
  if (target.kind === "route") return routes[target.id as RouteKey];
  return entityAlternates(target.kind, target.id)[locale];
}
function menuGroups(locale: Locale) {
  const labels = readLocale<Record<string, string>>(locale, "navigation");
  return navigation.groups.map((group) => ({
    id: group.id,
    label: labels[group.id],
    href:
      group.type === "categories"
        ? routes.products
        : group.type === "collections"
          ? routes.collections
          : entityAlternates("editorial", "inspiration")[locale],
    links:
      group.type === "categories"
        ? catalogOptions(locale).categories.map((category) => ({
            ...category,
            href: routes.products + "?category=" + category.id,
          }))
        : group.type === "collections"
          ? collectionRecords().map(({ id }) => {
              const copy = readLocale(locale, "collections/" + id, collectionTranslationSchema);
              return { id, label: copy.name, href: entityPath("collections", copy.slug) };
            })
          : group.ids.map((id) => navigationLink(id, locale)),
  }));
}
export async function baseProps(
  locale: Locale,
  routeKey: RouteKey,
  namespaces: string[],
  entityId?: string,
) {
  const alternates: AlternatePaths = entityId
    ? entityAlternates(routeKey as EntityKind, entityId)
    : { tr: routes[routeKey], en: routes[routeKey] };
  const breadcrumbs: SiteLink[] = [navigationLink("home", locale)];
  if (
    routeKey !== "home" &&
    routeKey !== "editorial" &&
    routeKey !== "notFound" &&
    routeKey !== "serverError"
  )
    breadcrumbs.push(navigationLink(routeKey, locale));
  const data: BasePageProps = {
    locale,
    shell: {
      logo: getImage(site.logoAssetId, locale),
      fallback: getImage(site.fallbackAssetId, locale),
      socialImage: getImage(site.socialAssetId, locale),
      primaryLinks: navigation.primary.map((id) => navigationLink(id, locale)),
      footerLinks: navigation.footer.map((id) => navigationLink(id, locale)),
      menuGroups: menuGroups(locale),
      menuPreview: getImage(presentation.navigationPreviewAssetId, locale),
      store: {
        email: store.email,
        phoneDisplay: store.phoneDisplay,
        phoneHref: store.phoneHref,
        directionsUrl: store.directionsUrl,
        openingHours: store.openingHours,
        geo: store.geo,
      },
    },
    route: { path: alternates[locale], alternates, breadcrumbs },
  };
  return {
    ...data,
    ...(await serverSideTranslations(
      locale,
      ["common", "navigation", "brand", "store", ...namespaces],
      i18nConfig,
    )),
  };
}
export function productCard(id: string, locale: Locale): ProductCardModel {
  const record = readJson(`content/products/${id}.json`, productSchema);
  if (!record.isPublished) throw new Error(`Unpublished product reference: ${id}`);
  const copy = readLocale(locale, `products/${id}`, productTranslationSchema);
  return {
    id,
    name: copy.name,
    subtitle: copy.subtitle,
    summary: copy.summary,
    href: entityPath("products", copy.slug),
    image: getImage(record.galleryAssetIds[0], locale),
    categoryId: record.categoryId,
    materialIds: record.materialIds,
    collectionIds: record.collectionIds,
    sortOrder: record.sortOrder,
    presentation: record.presentation,
  };
}
export function productDetail(id: string, locale: Locale): ProductModel {
  const record = readJson(`content/products/${id}.json`, productSchema);
  return {
    ...productCard(id, locale),
    ...readLocale(locale, `products/${id}`, productTranslationSchema),
    gallery: record.galleryAssetIds.map((id) => getImage(id, locale)),
    dimensions: record.dimensions,
    collections: record.collectionIds.map((id) => {
      const c = readLocale(locale, `collections/${id}`, collectionTranslationSchema);
      return { id, label: c.name, href: entityPath("collections", c.slug) };
    }),
    related: record.relatedIds
      .filter((id) => productRecords().some((p) => p.id === id))
      .map((id) => productCard(id, locale)),
  };
}
export function collectionDetail(id: string, locale: Locale): CollectionModel {
  const record = readJson(`content/collections/${id}.json`, collectionSchema);
  if (!record.isPublished) throw new Error(`Unpublished collection reference: ${id}`);
  const copy = readLocale(locale, `collections/${id}`, collectionTranslationSchema);
  const products = productRecords().filter((p) => p.collectionIds.includes(id));
  products.sort((a, b) => {
    const ai = record.featuredProductIds.indexOf(a.id),
      bi = record.featuredProductIds.indexOf(b.id);
    return (ai < 0 ? Infinity : ai) - (bi < 0 ? Infinity : bi);
  });
  return {
    id,
    ...copy,
    href: entityPath("collections", copy.slug),
    hero: getImage(record.heroAssetId, locale),
    products: products.map((p) => productCard(p.id, locale)),
  };
}
export function collectionCard(id: string, locale: Locale) {
  const collection = collectionDetail(id, locale);
  return {
    id: collection.id,
    href: collection.href,
    hero: collection.hero,
    name: collection.name,
    title: collection.title,
    description: collection.description,
  };
}
export function editorialDetail(id: string, locale: Locale): EditorialModel {
  const record = readJson(`content/pages/${id}.json`, editorialSchema);
  return {
    id,
    ...readLocale(locale, `pages/${id}`, editorialTranslationSchema),
    hero: getImage(record.heroAssetId, locale),
    sectionIds: record.sections.map((s) => s.id),
    blocks: record.sections.map((section) => ({
      id: section.id,
      image: getImage(section.assetId, locale),
      frame: section.frame,
      layout: section.layout,
      href: section.target ? targetPath(section.target, locale) : null,
    })),
    related: record.relatedProductIds.map((id) => productCard(id, locale)),
  };
}
export function catalogOptions(locale: Locale) {
  const labels = readLocale<{
    categories: Record<string, string>;
    materials: Record<string, string>;
  }>(locale, "taxonomy");
  return {
    categories: taxonomy.categories.map((id) => ({
      id,
      label: labels.categories[id],
      href: routes.products,
    })),
    materials: taxonomy.materials.map((id) => ({
      id,
      label: labels.materials[id],
      href: routes.products,
    })),
    collections: collectionRecords().map(({ id }) => ({
      id,
      label: readLocale(locale, `collections/${id}`, collectionTranslationSchema).name,
      href: entityAlternates("collections", id)[locale],
    })),
  };
}
export function postCard(id: string, locale: Locale, shouldIncludeDrafts = false): PostCardModel {
  const record = readJson(`content/posts/${id}.json`, postSchema),
    copy = readLocale(locale, `posts/${id}`, postTranslationSchema);
  if ((!record.isPublished || !record.publishedAt) && !shouldIncludeDrafts)
    throw new Error(`Post is not ready to publish: ${id}`);
  return {
    id,
    title: copy.title,
    excerpt: copy.excerpt,
    href: entityPath("blog", copy.slug),
    cover: getImage(record.coverAssetId, locale),
    publishedAt: record.publishedAt,
    isDraft: !record.isPublished,
  };
}
