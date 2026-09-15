import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { CatalogNavigation } from "@/components/content/catalog-navigation";
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
        <CatalogNavigation />
        <h1 className="sr-only">{t("title")}</h1>
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
