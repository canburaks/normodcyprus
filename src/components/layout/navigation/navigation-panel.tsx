import Link from "next/link";
import { Search } from "lucide-react";
import { useTranslation } from "next-i18next/pages";
import { useSite } from "../site-context";
import { LanguageSwitcher } from "../language-switcher";
import { AssetImage } from "@/components/media/asset-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { localizedPath, routes } from "@/lib/routes/paths";

export const SITE_MENU_ID = "site-menu";

export function NavigationPanel() {
  const { t } = useTranslation(["navigation", "common"]);
  const { shell, locale } = useSite();
  return (
    <div
      id={SITE_MENU_ID}
      popover="auto"
      className="navigation-panel"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) event.currentTarget.hidePopover();
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="navigation-close"
        autoFocus
        popoverTarget={SITE_MENU_ID}
        popoverTargetAction="hide"
        aria-label={t("closeMenu")}
      >
        <span className="close-glyph" aria-hidden="true" />
      </Button>
      <div className="navigation-scroll">
        <form action={localizedPath(routes.products, locale)} className="navigation-search">
          <label className="sr-only" htmlFor="navigation-query">
            {t("searchPlaceholder")}
          </label>
          <Input id="navigation-query" name="q" type="search" maxLength={100} autoComplete="off" />
          <Button type="submit" variant="ghost" size="icon" aria-label={t("search")}>
            <Search strokeWidth={1.2} />
          </Button>
        </form>
        <div className="navigation-columns">
          {shell.menuGroups.map((group) => (
            <nav className="navigation-group" key={group.id} aria-label={group.label}>
              <h2>
                <Link href={group.href}>
                  {group.label}
                  <span aria-hidden="true">{t("captionSuffix", { ns: "common" })}</span>
                </Link>
              </h2>
              {group.links.map((link) => (
                <Link key={link.id} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
          <div className="navigation-preview">
            <AssetImage asset={shell.menuPreview} sizes="350px" />
          </div>
        </div>
        <div className="navigation-language">
          <LanguageSwitcher />
        </div>
        <nav className="mobile-navigation-list" aria-label={t("primary")}>
          <details open className="mobile-products">
            <summary>{t("products")}</summary>
            {shell.menuGroups.map((group) => (
              <details className="mobile-navigation-group" key={group.id}>
                <summary>{group.label}</summary>
                {group.links.map((link) => (
                  <Link key={link.id} href={link.href}>
                    {link.label}
                  </Link>
                ))}
                <Link href={group.href} className="mobile-group-all">
                  {group.label}
                  <span aria-hidden="true">{t("captionSuffix", { ns: "common" })}</span>
                </Link>
              </details>
            ))}
          </details>
          {shell.primaryLinks
            .filter((link) => link.id !== "products")
            .map((link) => (
              <Link key={link.id} href={link.href}>
                {link.label}
              </Link>
            ))}
          <LanguageSwitcher />
        </nav>
      </div>
    </div>
  );
}
