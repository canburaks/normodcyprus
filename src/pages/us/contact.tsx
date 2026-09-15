import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next/pages";
import { Container } from "@/components/layout/container";
import { useSite } from "@/components/layout/site-context";
import { PageHeading } from "@/components/content/page-heading";
import { PageBreadcrumb } from "@/components/content/page-breadcrumb";
import { TextLink } from "@/components/content/text-link";
import { AssetImage } from "@/components/media/asset-image";
import { PageSeo } from "@/components/seo/page-seo";
import { baseProps, getImage } from "@/lib/content/loaders";
import { getLocale } from "@/lib/content/read";
import { absoluteUrl, localizedPath } from "@/lib/routes/paths";

export default function ContactPage({ image }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation(["contact", "common", "store"]);
  const { shell, locale, route } = useSite();
  const store = shell.store;
  return (
    <>
      <PageSeo
        title={t("seo.title")}
        description={t("seo.description")}
        image={image}
        pageType="ContactPage"
        schema={[
          {
            "@type": "FurnitureStore",
            "@id": `${absoluteUrl(localizedPath(route.path, locale))}#store`,
            name: t("name", { ns: "store" }),
            image: image.src,
            address: {
              "@type": "PostalAddress",
              streetAddress: t("address", { ns: "store" }),
              addressLocality: t("city", { ns: "store" }),
            },
            email: store.email,
            hasMap: store.directionsUrl,
            geo: { "@type": "GeoCoordinates", ...store.geo },
            openingHoursSpecification: store.openingHours.map((hours) => ({
              "@type": "OpeningHoursSpecification",
              dayOfWeek: hours.days,
              opens: hours.opens,
              closes: hours.closes,
            })),
          },
        ]}
      />
      <Container>
        <PageBreadcrumb title={t("name", { ns: "store" })} />
        <PageHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
        <div className="contact-layout">
          <div className="contact-image">
            <AssetImage asset={image} sizes="(min-width: 768px) 48vw, 90vw" isEager />
          </div>
          <section className="contact-details">
            <p className="eyebrow">{t("detailsTitle")}</p>
            <h2>{t("name", { ns: "store" })}</h2>
            <dl className="contact-detail-grid">
              <div>
                <dt>{t("address", { ns: "common" })}</dt>
                <dd>
                  <address>
                    {t("address", { ns: "store" })}
                    <br />
                    {t("addressLine2", { ns: "store" })}
                  </address>
                </dd>
              </div>
              <div>
                <dt>{t("hours", { ns: "common" })}</dt>
                <dd>
                  {t("hours", { ns: "store" })}
                  <br />
                  <span className="muted">{t("closed", { ns: "store" })}</span>
                </dd>
              </div>
              <div>
                <dt>{t("phone", { ns: "common" })}</dt>
                <dd>
                  {store.phoneHref ? (
                    <a href={store.phoneHref}>{store.phoneDisplay}</a>
                  ) : (
                    store.phoneDisplay
                  )}
                </dd>
              </div>
              <div>
                <dt>{t("contact", { ns: "common" })}</dt>
                <dd>
                  <a href={`mailto:${store.email}`}>{store.email}</a>
                </dd>
              </div>
            </dl>
            <p className="muted">{t("access", { ns: "store" })}</p>
            <div className="contact-actions">
              <TextLink href={store.directionsUrl}>{t("directions", { ns: "common" })}</TextLink>
              <TextLink href={`mailto:${store.email}`}>{t("email", { ns: "common" })}</TextLink>
            </div>
            <p className="muted">{t("note", { ns: "store" })}</p>
          </section>
        </div>
      </Container>
    </>
  );
}
export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = getLocale(context.locale);
  return {
    props: {
      ...(await baseProps(locale, "contact", ["contact"])),
      image: getImage("showroom", locale),
    },
  };
}
