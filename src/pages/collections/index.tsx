import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { PageHeading } from "@/components/content/page-heading";
import { PageSeo } from "@/components/seo/page-seo";
import { CollectionCard } from "@/features/catalog/collection-card";
import { baseProps, collectionCard, collectionRecords } from "@/lib/content/loaders";
import { getLocale } from "@/lib/content/read";
import { absoluteUrl, localizedPath } from "@/lib/routes/paths";

export default function CollectionsPage({
  collections,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("catalog");
  return (
    <>
      <PageSeo
        title={t("collectionsSeo.title")}
        description={t("collectionsSeo.description")}
        pageType="CollectionPage"
        schema={[
          {
            "@type": "ItemList",
            itemListElement: collections.map((c, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: c.name,
              url: absoluteUrl(localizedPath(c.href, locale)),
            })),
          },
        ]}
      />
      <Container>
        <PageHeading title={t("collectionsTitle")} description={t("collectionsDescription")} />
        <Section className="!mt-0">
          <h2 className="sr-only">{t("collectionsTitle")}</h2>
          <div className="editorial-grid">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </Section>
      </Container>
    </>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale);
  return {
    props: {
      ...(await baseProps(locale, "collections", ["catalog"])),
      collections: collectionRecords().map((c) => collectionCard(c.id, locale)),
    },
  };
}
