import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { TextLink } from "@/components/content/text-link";
import { PageHeading } from "@/components/content/page-heading";
import { PageBreadcrumb } from "@/components/content/page-breadcrumb";
import { PageSeo } from "@/components/seo/page-seo";
import { AssetImage } from "@/components/media/asset-image";
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
        <PageBreadcrumb title={collection.name} />
        <PageHeading
          eyebrow={collection.name}
          title={collection.title}
          description={collection.description}
        />
        <div className="editorial-hero">
          <AssetImage asset={collection.hero} sizes="96vw" isEager />
        </div>
        <Section>
          <div className="section-heading">
            <h2>{t("collectionProducts")}</h2>
          </div>
          {collection.products.length ? (
            <ProductGrid products={collection.products} />
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
