import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSite } from "./site-context";
import { localizedPath, routes } from "@/lib/routes/paths";
import type { Locale } from "@/lib/content/schemas";
import site from "../../../content/config/site.json";

export function LanguageSwitcher() {
  const { t } = useTranslation("navigation");
  const { locale, route } = useSite();
  const router = useRouter();
  return (
    <div className="language-switcher">
      <Button
        variant="ghost"
        popoverTarget="language-menu"
        className="language-trigger"
        aria-label={t("language")}
      >
        {locale.toLocaleUpperCase(locale)}
        <ChevronDown size={12} aria-hidden="true" />
      </Button>
      <div id="language-menu" popover="auto" className="language-popover">
        <nav aria-label={t("language")}>
          {site.locales.map((value) => {
            const language = value as Locale;
            const query =
              route.path === routes.products && router.isReady
                ? new URLSearchParams(
                    Object.entries(router.query).filter(
                      (entry): entry is [string, string] => typeof entry[1] === "string",
                    ),
                  ).toString()
                : "";
            return (
              <Link
                key={language}
                href={`${localizedPath(route.alternates[language], language)}${query ? `?${query}` : ""}`}
                locale={false}
                hrefLang={language}
                lang={language}
                aria-current={locale === language ? "true" : undefined}
                onClick={() => document.getElementById("language-menu")?.hidePopover()}
              >
                {t(language)}
                {locale === language ? <Check size={14} aria-hidden="true" /> : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
