import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { useSite } from "./site-context";
import { localizedPath, routes } from "@/lib/routes/paths";
import type { Locale } from "@/lib/content/schemas";
import site from "../../../content/config/site.json";

export function LanguageSwitcher() {
  const { t } = useTranslation("navigation");
  const { locale, route } = useSite();
  const router = useRouter();
  const query =
    route.path === routes.products && router.isReady
      ? new URLSearchParams(
          Object.entries(router.query).filter(
            (entry): entry is [string, string] => typeof entry[1] === "string",
          ),
        ).toString()
      : "";
  return (
    <nav className="language-switcher" aria-label={t("language")}>
      {site.locales.map((value) => {
        const language = value as Locale;
        return (
          <Link
            key={language}
            href={localizedPath(route.alternates[language], language) + (query ? "?" + query : "")}
            locale={false}
            hrefLang={language}
            lang={language}
            aria-current={locale === language ? "true" : undefined}
          >
            {t(language)}
          </Link>
        );
      })}
    </nav>
  );
}
