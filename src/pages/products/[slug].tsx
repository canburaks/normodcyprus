import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import Link from "next/link";
import { AssetImage } from "@/components/media/asset-image";
import { MediaFrame } from "@/components/media/media-frame";
import { mediaSizes } from "@/lib/design/layout";
import { ProductDetails } from "@/features/product/product-details";
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
      <Container className="product-page">
        {product.collections[0] ? (
          <Link href={product.collections[0].href} className="product-backlink">
            {product.collections[0].label}
          </Link>
        ) : null}
        <div className="product-layout">
          <MediaFrame
            frame={{ ...product.presentation.frame, ratio: product.presentation.detailRatio }}
            className="product-primary-image"
          >
            <AssetImage asset={product.gallery[0]} sizes={mediaSizes(12, 12, 6)} isEager />
          </MediaFrame>
          <ProductSummary product={product} />
        </div>
        <ProductDetails product={product} />
        {product.gallery.length > 1 ? (
          <Section className="product-secondary-gallery">
            <div className="section-heading">
              <h2>
                {t("galleryTitle")}
                <span aria-hidden="true">{t("captionSuffix")}</span>
              </h2>
            </div>
            <ProductGallery images={product.gallery} name={product.name} />
          </Section>
        ) : null}
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
