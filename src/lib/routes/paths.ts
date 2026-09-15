import routes from "../../../content/config/routes.json";
import site from "../../../content/config/site.json";
import type { Locale } from "../content/schemas";

export { routes };
export type RouteKey = keyof typeof routes;
export type EntityKind = "products" | "collections" | "editorial" | "blog";
export function localizedPath(path: string, locale: Locale) {
  return locale === site.defaultLocale ? path : `/${locale}${path === routes.home ? "" : path}`;
}
export function entityPath(kind: EntityKind, slug: string) {
  return `${routes[kind]}/${slug}`;
}
export function absoluteUrl(path: string) {
  return new URL(path, site.origin || site.previewOrigin).href;
}
export const isIndexable = Boolean(site.isIndexable && site.origin);
