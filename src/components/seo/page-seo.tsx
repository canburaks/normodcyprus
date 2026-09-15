import Head from "next/head";
import { useTranslation } from "next-i18next/pages";
import { useSite } from "@/components/layout/site-context";
import { absoluteUrl, isIndexable, localizedPath, routes } from "@/lib/routes/paths";
import { safeJsonLd, type SchemaNode } from "@/lib/seo/schema";
import type { ImageAsset } from "@/lib/content/models";
import type { SeoContent, Locale } from "@/lib/content/schemas";

export function PageSeo({
  title,
  description,
  image,
  pageType = "WebPage",
  schema = [],
  shouldNoIndex = false,
  isArticle = false,
}: SeoContent & {
  image?: ImageAsset;
  pageType?: string;
  schema?: SchemaNode[];
  shouldNoIndex?: boolean;
  isArticle?: boolean;
}) {
  const { locale, shell, route } = useSite();
  const { t } = useTranslation("brand");
  const canonical = absoluteUrl(localizedPath(route.path, locale));
  const homeUrl = absoluteUrl(localizedPath(routes.home, locale));
  const socialImage = image ?? shell.socialImage;
  const breadcrumbs = [
    ...route.breadcrumbs.filter((link) => link.href !== route.path),
    { id: route.path, href: route.path, label: title.split(" | ")[0] },
  ];
  const graph: SchemaNode[] = [
    {
      "@type": "WebSite",
      "@id": `${homeUrl}#website`,
      url: homeUrl,
      name: t("branch"),
      inLanguage: locale,
    },
    {
      "@type": "Organization",
      "@id": `${homeUrl}#organization`,
      name: t("branch"),
      url: homeUrl,
      logo: shell.logo.src,
    },
    {
      "@type": pageType,
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: locale,
      isPartOf: { "@id": `${homeUrl}#website` },
      primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(socialImage.src) },
    },
    ...(route.path === routes.home
      ? []
      : [
          {
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((link, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: link.label,
              item: absoluteUrl(localizedPath(link.href, locale)),
            })),
          },
        ]),
    ...schema,
  ];
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta
        name="robots"
        content={
          !isIndexable || shouldNoIndex
            ? "noindex, follow"
            : "index, follow, max-image-preview:large"
        }
        key="robots"
      />
      <link rel="canonical" href={canonical} key="canonical" />
      {Object.entries(route.alternates).map(([language, path]) => (
        <link
          key={`alternate-${language}`}
          rel="alternate"
          hrefLang={language}
          href={absoluteUrl(localizedPath(path, language as Locale))}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={absoluteUrl(route.alternates.tr)}
        key="alternate-default"
      />
      <meta property="og:type" content={isArticle ? "article" : "website"} key="og-type" />
      <meta property="og:title" content={title} key="og-title" />
      <meta property="og:description" content={description} key="og-description" />
      <meta property="og:url" content={canonical} key="og-url" />
      <meta property="og:site_name" content={t("branch")} key="og-site-name" />
      <meta property="og:locale" content={locale === "tr" ? "tr_TR" : "en_GB"} key="og-locale" />
      <meta property="og:image" content={absoluteUrl(socialImage.src)} key="og-image" />
      <meta property="og:image:alt" content={socialImage.alt} key="og-image-alt" />
      <meta name="twitter:card" content="summary_large_image" key="twitter-card" />
      <script
        key="schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd({ "@context": "https://schema.org", "@graph": graph }),
        }}
      />
    </Head>
  );
}
