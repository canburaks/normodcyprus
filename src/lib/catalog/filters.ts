import type { ParsedUrlQuery } from "node:querystring";
import type { CatalogOptions, ProductCardModel } from "../content/models";
import type { Locale } from "../content/schemas";

export type CatalogFilters = {
  q: string;
  category: string;
  collection: string;
  material: string;
  sort: "featured" | "alphabetical";
};
export const emptyFilters: CatalogFilters = {
  q: "",
  category: "",
  collection: "",
  material: "",
  sort: "featured",
};
function single(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}
export function parseFilters(query: ParsedUrlQuery, options: CatalogOptions): CatalogFilters {
  const valid = (value: string | string[] | undefined, list: { id: string }[]) =>
    list.some((item) => item.id === single(value)) ? single(value) : "";
  return {
    q: single(query.q).trim().slice(0, 100),
    category: valid(query.category, options.categories),
    collection: valid(query.collection, options.collections),
    material: valid(query.material, options.materials),
    sort: single(query.sort) === "alphabetical" ? "alphabetical" : "featured",
  };
}
export function serializeFilters(filters: CatalogFilters) {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) => value && !(key === "sort" && value === "featured"),
    ),
  );
}
export function filterProducts(
  products: ProductCardModel[],
  filters: CatalogFilters,
  locale: Locale,
) {
  const normalize = (value: string) =>
    value
      .toLocaleLowerCase(locale)
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replaceAll("ı", "i");
  const terms = normalize(filters.q).split(/\s+/).filter(Boolean);
  return products
    .filter(
      (product) =>
        (!filters.category || product.categoryId === filters.category) &&
        (!filters.collection || product.collectionIds.includes(filters.collection)) &&
        (!filters.material || product.materialIds.includes(filters.material)) &&
        terms.every((term) =>
          normalize(`${product.name} ${product.subtitle} ${product.summary}`).includes(term),
        ),
    )
    .sort((a, b) =>
      filters.sort === "alphabetical"
        ? a.name.localeCompare(b.name, locale)
        : a.sortOrder - b.sortOrder,
    );
}
