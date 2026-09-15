import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { AssetImage } from "@/components/media/asset-image";
import { TextLink } from "@/components/content/text-link";
import { PageSeo } from "@/components/seo/page-seo";
import { CollectionCard } from "@/features/catalog/collection-card";
import { ProductGrid } from "@/features/catalog/product-grid";
import { StoreBand } from "@/features/contact/store-band";
import {
  baseProps,
  collectionCard,
  entityAlternates,
  getImage,
  productCard,
} from "@/lib/content/loaders";
import { getLocale, readJson } from "@/lib/content/read";
import { homeSchema } from "@/lib/content/schemas";
import { routes } from "@/lib/routes/paths";

export default function HomePage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(["home", "common"]);
  return (
    <>
      <PageSeo title={t("seo.title")} description={t("seo.description")} image={page.hero} />
      <Container>
        <section className="home-hero">
          <div className="hero-media">
            <AssetImage asset={page.hero} sizes="(min-width: 1440px) 1376px, 96vw" isEager />
          </div>
          <div className="hero-caption">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1>{t("title")}</h1>
            <p className="page-intro">{t("intro")}</p>
            <TextLink href={routes.products}>{t("allProducts", { ns: "common" })}</TextLink>
          </div>
        </section>
        <Section>
          <div className="section-heading">
            <div>
              <h2>{t("collectionsTitle")}</h2>
              <p>{t("collectionsText")}</p>
            </div>
            <TextLink href={routes.collections}>{t("allCollections", { ns: "common" })}</TextLink>
          </div>
          <div className="editorial-grid editorial-grid-asymmetric">
            {page.collections.slice(0, 2).map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </Section>
        <Section>
          <div className="section-heading">
            <h2>{t("featuredTitle")}</h2>
            <TextLink href={routes.products}>{t("allProducts", { ns: "common" })}</TextLink>
          </div>
          <ProductGrid products={page.products} />
        </Section>
        <Section className="split-editorial reveal">
          <AssetImage asset={page.editorialImage} sizes="(min-width: 768px) 48vw, 90vw" />
          <div className="split-copy">
            <h2>{t("editorialTitle")}</h2>
            <p>{t("editorialText")}</p>
            <TextLink href={page.editorialHref}>{t("discover", { ns: "common" })}</TextLink>
          </div>
        </Section>
      </Container>
      <StoreBand image={page.storeImage} />
    </>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale),
    data = readJson("content/pages/home.json", homeSchema);
  return {
    props: {
      ...(await baseProps(locale, "home", ["home"])),
      page: {
        hero: getImage(data.heroAssetId, locale),
        products: data.featuredProductIds.map((id) => productCard(id, locale)),
        collections: data.collectionIds.map((id) => collectionCard(id, locale)),
        editorialImage: getImage(data.editorialAssetId, locale),
        editorialHref: entityAlternates("editorial", data.editorialPageId)[locale],
        storeImage: getImage("showroom", locale),
      },
    },
  };
}
