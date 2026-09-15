import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { PageHeading } from "@/components/content/page-heading";
import { TextLink } from "@/components/content/text-link";
import { PageSeo } from "@/components/seo/page-seo";
import { AssetImage } from "@/components/media/asset-image";
import { MediaFrame } from "@/components/media/media-frame";
import { StoryBlocks } from "@/features/editorial/story-blocks";
import { ProductGrid } from "@/features/catalog/product-grid";
import { baseProps, editorialDetail, entityPaths, findEntityId } from "@/lib/content/loaders";
import { getLocale } from "@/lib/content/read";
import { mediaSizes, tileStyle } from "@/lib/design/layout";
import { routes } from "@/lib/routes/paths";

export default function EditorialPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  const isInspiration = page.id === "inspiration";
  return (
    <>
      <PageSeo
        {...page.seo}
        image={page.hero}
        pageType={page.id === "why-normod" ? "AboutPage" : "WebPage"}
      />
      <Container className={isInspiration ? "inspiration-page" : "story-page"}>
        {isInspiration ? (
          <>
            <h1 className="sr-only">{page.title}</h1>
            <div className="inspiration-grid">
              {page.blocks.map((block, index) => (
                <article
                  key={block.id}
                  className="editorial-tile grid-tile"
                  style={tileStyle(block.layout)}
                >
                  <Link href={block.href ?? routes.collections} className="editorial-tile-link">
                    <MediaFrame frame={block.frame}>
                      <AssetImage
                        asset={block.image}
                        sizes={mediaSizes(12, 6, 6)}
                        isEager={index < 2}
                      />
                    </MediaFrame>
                    <div className="editorial-caption">
                      <h2>
                        {page.sections[block.id].title}
                        <span aria-hidden="true">{t("captionSuffix")}</span>
                      </h2>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
            <p className="inspiration-copy">{page.description}</p>
          </>
        ) : (
          <>
            <PageHeading title={page.title} description={page.description} />
            <div className="editorial-hero">
              <AssetImage asset={page.hero} sizes={mediaSizes()} isEager />
            </div>
            <StoryBlocks page={page} />
          </>
        )}
        <div className="story-ending">
          <TextLink href={routes.contact}>{t("visit")}</TextLink>
        </div>
        <Section>
          <div className="section-heading">
            <h2>
              {t("related")}
              <span aria-hidden="true">{t("captionSuffix")}</span>
            </h2>
          </div>
          <ProductGrid products={page.related} />
        </Section>
      </Container>
    </>
  );
}
export function getStaticPaths() {
  return { paths: entityPaths("editorial"), fallback: false };
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale);
  const id = findEntityId("editorial", String(context.params?.slug), locale);
  if (!id) return { notFound: true as const };
  return {
    props: { ...(await baseProps(locale, "editorial", [], id)), page: editorialDetail(id, locale) },
  };
}
