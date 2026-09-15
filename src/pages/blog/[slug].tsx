import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { PageHeading } from "@/components/content/page-heading";
import { PageBreadcrumb } from "@/components/content/page-breadcrumb";
import { TextLink } from "@/components/content/text-link";
import { AssetImage } from "@/components/media/asset-image";
import { PageSeo } from "@/components/seo/page-seo";
import { ProductGrid } from "@/features/catalog/product-grid";
import { baseProps, entityPaths, findEntityId } from "@/lib/content/loaders";
import { postDetail } from "@/lib/content/post-loader";
import { getLocale } from "@/lib/content/read";
import { absoluteUrl, localizedPath, routes } from "@/lib/routes/paths";

export default function ArticlePage({
  post,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(["blog", "common"]);
  return (
    <>
      <PageSeo
        {...post.seo}
        image={post.cover}
        isArticle
        schema={[
          {
            "@type": "BlogPosting",
            "@id": `${absoluteUrl(localizedPath(post.href, locale))}#article`,
            headline: post.title,
            description: post.excerpt,
            image: post.cover.src,
            datePublished: post.publishedAt,
            author: {
              "@type": post.author.type,
              name: post.author.name,
              ...(post.author.url ? { url: post.author.url } : {}),
            },
            mainEntityOfPage: absoluteUrl(localizedPath(post.href, locale)),
          },
        ]}
      />
      <Container>
        <PageBreadcrumb title={post.title} />
        <PageHeading title={post.title} description={post.excerpt} />
        <div className="article-meta">
          <span>{post.author.name}</span>
          <time dateTime={post.publishedAt}>
            {new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" }).format(
              new Date(post.publishedAt),
            )}
          </time>
          <span>{t("minRead", { ns: "common", count: post.readingMinutes })}</span>
        </div>
        <div className="editorial-hero">
          <AssetImage asset={post.cover} sizes="96vw" isEager />
        </div>
        <article className="article-layout">
          <nav className="article-toc" aria-label={t("contents")}>
            <p className="eyebrow">{t("contents")}</p>
            {post.headings.map((heading) => (
              <a key={heading.id} href={`#${heading.id}`}>
                {heading.title}
              </a>
            ))}
          </nav>
          <div className="article-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
          <TextLink href={routes.blog}>{t("back")}</TextLink>
        </article>
        {post.related.length ? (
          <Section>
            <div className="section-heading">
              <h2>{t("related", { ns: "common" })}</h2>
            </div>
            <ProductGrid products={post.related} />
          </Section>
        ) : null}
      </Container>
    </>
  );
}
export function getStaticPaths() {
  return { paths: entityPaths("blog"), fallback: false };
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale),
    id = findEntityId("blog", String(context.params?.slug), locale);
  if (!id) return { notFound: true as const };
  return {
    props: {
      ...(await baseProps(locale, "blog", ["blog"], id)),
      post: await postDetail(id, locale),
    },
  };
}
