import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container } from "@/components/layout/container";
import { PageHeading } from "@/components/content/page-heading";
import { PageBreadcrumb } from "@/components/content/page-breadcrumb";
import { TextLink } from "@/components/content/text-link";
import { PageSeo } from "@/components/seo/page-seo";
import { AssetImage } from "@/components/media/asset-image";
import { baseProps, editorialDetail, entityPaths, findEntityId } from "@/lib/content/loaders";
import { getLocale } from "@/lib/content/read";
import { routes } from "@/lib/routes/paths";

export default function EditorialPage({ page }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");
  return (
    <>
      <PageSeo
        {...page.seo}
        image={page.hero}
        pageType={page.id === "why-normod" ? "AboutPage" : "WebPage"}
      />
      <Container>
        <PageBreadcrumb title={page.name} />
        <PageHeading eyebrow={page.name} title={page.title} />
        <div className="editorial-hero">
          <AssetImage asset={page.hero} sizes="96vw" isEager />
        </div>
        <article className="editorial-body">
          {page.sectionIds.map((id) => (
            <section key={id} className="reveal">
              <h2>{page.sections[id].title}</h2>
              <p>{page.sections[id].body}</p>
            </section>
          ))}
          <TextLink href={routes.contact}>{t("visit")}</TextLink>
        </article>
      </Container>
    </>
  );
}
export function getStaticPaths() {
  return { paths: entityPaths("editorial"), fallback: false };
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale),
    id = findEntityId("editorial", String(context.params?.slug), locale);
  if (!id) return { notFound: true as const };
  return {
    props: { ...(await baseProps(locale, "editorial", [], id)), page: editorialDetail(id, locale) },
  };
}
