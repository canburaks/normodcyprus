import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { PageHeading } from "@/components/content/page-heading";
import { PageSeo } from "@/components/seo/page-seo";
import { CatalogBrowser } from "@/features/catalog/catalog-browser";
import { baseProps, catalogOptions, productCard, productRecords } from "@/lib/content/loaders";
import { getLocale } from "@/lib/content/read";
import { absoluteUrl, localizedPath } from "@/lib/routes/paths";

export default function ProductsPage({
  products,
  options,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("catalog");
  return (
    <>
      <PageSeo
        title={t("seo.title")}
        description={t("seo.description")}
        pageType="CollectionPage"
        schema={[
          {
            "@type": "ItemList",
            itemListElement: products.map((p, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: p.name,
              url: absoluteUrl(localizedPath(p.href, locale)),
            })),
          },
        ]}
      />
      <Container>
        <PageHeading title={t("title")} description={t("description")} />
        <Section className="!mt-0">
          <CatalogBrowser products={products} options={options} />
        </Section>
      </Container>
    </>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale);
  return {
    props: {
      ...(await baseProps(locale, "products", ["catalog"])),
      products: productRecords().map((p) => productCard(p.id, locale)),
      options: catalogOptions(locale),
    },
  };
}
