import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { PageBreadcrumb } from "@/components/content/page-breadcrumb";
import { PageSeo } from "@/components/seo/page-seo";
import { ProductGrid } from "@/features/catalog/product-grid";
import { ProductGallery } from "@/features/product/product-gallery";
import { ProductSummary } from "@/features/product/product-summary";
import { baseProps, entityPaths, findEntityId, productDetail } from "@/lib/content/loaders";
import { getLocale } from "@/lib/content/read";
import { absoluteUrl, localizedPath } from "@/lib/routes/paths";

export default function ProductPage({
  product,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(["common", "brand"]);
  return (
    <>
      <PageSeo
        {...product.seo}
        image={product.gallery[0]}
        schema={[
          {
            "@type": "Product",
            "@id": `${absoluteUrl(localizedPath(product.href, locale))}#product`,
            name: product.name,
            description: product.summary,
            image: product.gallery.map((image) => image.src),
            brand: { "@type": "Brand", name: t("name", { ns: "brand" }) },
            url: absoluteUrl(localizedPath(product.href, locale)),
          },
        ]}
      />
      <Container>
        <PageBreadcrumb title={product.name} />
        <div className="product-layout">
          <ProductGallery images={product.gallery} name={product.name} />
          <ProductSummary product={product} />
        </div>
        {product.related.length ? (
          <Section>
            <div className="section-heading">
              <h2>{t("related")}</h2>
            </div>
            <ProductGrid products={product.related} />
          </Section>
        ) : null}
      </Container>
    </>
  );
}
export function getStaticPaths() {
  return { paths: entityPaths("products"), fallback: false };
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale),
    id = findEntityId("products", String(context.params?.slug), locale);
  if (!id) return { notFound: true as const };
  return {
    props: {
      ...(await baseProps(locale, "products", ["catalog"], id)),
      product: productDetail(id, locale),
    },
  };
}
