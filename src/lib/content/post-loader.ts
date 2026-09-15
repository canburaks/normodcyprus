import { readJson, readLocale } from "./read";
import { postSchema, postTranslationSchema, type Locale } from "./schemas";
import { postCard, productCard } from "./loaders";
import { compileArticle } from "../mdx/compile";
import type { PostModel } from "./models";

export async function postDetail(
  id: string,
  locale: Locale,
  shouldIncludeDrafts = false,
): Promise<PostModel> {
  const record = readJson(`content/posts/${id}.json`, postSchema);
  const copy = readLocale(locale, `posts/${id}`, postTranslationSchema);
  const authors = readLocale<Record<string, { name: string; url?: string }>>(locale, "authors");
  const authorRecords =
    readJson<Record<string, { type: "Person" | "Organization" }>>("content/authors.json");
  if (
    (!record.authorId || !authors[record.authorId] || !authorRecords[record.authorId]) &&
    !shouldIncludeDrafts
  )
    throw new Error(`Missing author for ${id}`);
  return {
    ...postCard(id, locale, shouldIncludeDrafts),
    seo: copy.seo,
    author: record.authorId
      ? { ...authors[record.authorId], ...authorRecords[record.authorId] }
      : null,
    ...(await compileArticle(copy.bodyMdx, locale)),
    related: record.relatedProductIds.map((id) => productCard(id, locale)),
  };
}
