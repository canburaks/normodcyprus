import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { PageHeading } from "@/components/content/page-heading";
import { TextLink } from "@/components/content/text-link";
import { PageSeo } from "@/components/seo/page-seo";
import { PostCard } from "@/features/blog/post-card";
import { baseProps, entityAlternates, postCard, postRecords } from "@/lib/content/loaders";
import { getLocale } from "@/lib/content/read";

export default function BlogPage({
  posts,
  inspirationHref,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(["blog", "common"]);
  return (
    <>
      <PageSeo title={t("seo.title")} description={t("seo.description")} pageType="Blog" />
      <Container>
        <PageHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <Section className="!mt-0">
          {posts.length ? (
            <div className="editorial-grid">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>{t("emptyTitle")}</h2>
              <p>{t("emptyText")}</p>
              <TextLink href={inspirationHref}>{t("discover", { ns: "common" })}</TextLink>
            </div>
          )}
        </Section>
      </Container>
    </>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale);
  return {
    props: {
      ...(await baseProps(locale, "blog", ["blog"])),
      posts: postRecords().map((post) => postCard(post.id, locale)),
      inspirationHref: entityAlternates("editorial", "inspiration")[locale],
    },
  };
}
