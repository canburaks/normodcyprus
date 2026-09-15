import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { TextLink } from "@/components/content/text-link";
import { PageHeading } from "@/components/content/page-heading";
import { CatalogNavigation } from "@/components/content/catalog-navigation";
import { PageSeo } from "@/components/seo/page-seo";
import { ProductGrid } from "@/features/catalog/product-grid";
import { baseProps, collectionDetail, entityPaths, findEntityId } from "@/lib/content/loaders";
import { getLocale } from "@/lib/content/read";
import { absoluteUrl, localizedPath, routes } from "@/lib/routes/paths";

export default function CollectionPage({
  collection,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  return (
    <>
      <PageSeo
        {...collection.seo}
        image={collection.hero}
        pageType="CollectionPage"
        schema={[
          {
            "@type": "ItemList",
            itemListElement: collection.products.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: p.name,
              url: absoluteUrl(localizedPath(p.href, locale)),
            })),
          },
        ]}
      />
      <Container>
        <CatalogNavigation />
        <PageHeading
          variant="compact"
          title={collection.title}
          description={collection.description}
        />
        <Section className="collection-products">
          <h2 className="sr-only">{t("collectionProducts")}</h2>
          {collection.products.length ? (
            <ProductGrid products={collection.products} hasPriorityImage />
          ) : (
            <div className="empty-state">
              <h3>{t("emptySelectionTitle")}</h3>
              <p>{t("emptySelectionText")}</p>
              <TextLink href={routes.products}>{t("allProducts")}</TextLink>
            </div>
          )}
        </Section>
      </Container>
    </>
  );
}
export function getStaticPaths() {
  return { paths: entityPaths("collections"), fallback: false };
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale),
    id = findEntityId("collections", String(context.params?.slug), locale);
  if (!id) return { notFound: true as const };
  return {
    props: {
      ...(await baseProps(locale, "collections", [], id)),
      collection: collectionDetail(id, locale),
    },
  };
}
