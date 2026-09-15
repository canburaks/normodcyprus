import site from "../../../content/config/site.json";
import { entityPaths } from "../content/loaders";
import { entityPath, localizedPath, routes, type EntityKind } from "./paths";
import type { Locale } from "../content/schemas";

export function publishedPaths() {
  const fixed = [routes.home, routes.contact, routes.collections, routes.products, routes.blog];
  return [
    ...fixed.flatMap((path) => site.locales.map((locale) => localizedPath(path, locale as Locale))),
    ...(["products", "collections", "editorial", "blog"] as EntityKind[]).flatMap((kind) =>
      entityPaths(kind).map(({ params, locale }) =>
        localizedPath(entityPath(kind, params.slug), locale as Locale),
      ),
    ),
  ];
}
