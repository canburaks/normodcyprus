import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container } from "@/components/layout/container";
import { PageSeo } from "@/components/seo/page-seo";
import { EditorialTile } from "@/components/content/editorial-tile";
import { baseProps, getImage, targetPath } from "@/lib/content/loaders";
import { getLocale, readJson, readLocale } from "@/lib/content/read";
import { homeSchema } from "@/lib/content/schemas";

export default function HomePage({ tiles }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("home");
  return (
    <>
      <PageSeo title={t("seo.title")} description={t("seo.description")} image={tiles[0].image} />
      <Container className="home-page">
        <div className="editorial-grid home-grid">
          {tiles.map((tile, index) => (
            <EditorialTile key={tile.id} tile={tile} isPrimary={index === 0} />
          ))}
        </div>
      </Container>
    </>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale);
  const data = readJson("content/pages/home.json", homeSchema);
  const copy = readLocale<{ tiles: Record<string, string> }>(locale, "home");
  return {
    props: {
      ...(await baseProps(locale, "home", ["home"])),
      tiles: data.tiles.map((tile) => ({
        id: tile.id,
        caption: copy.tiles[tile.id],
        image: getImage(tile.assetId, locale),
        frame: tile.frame,
        layout: tile.layout,
        href: targetPath(tile.target, locale),
      })),
    },
  };
}
