import Link from "next/link";
import { MapPin, Menu, X } from "lucide-react";
import { useTranslation } from "next-i18next/pages";
import { useSite } from "./site-context";
import { LanguageSwitcher } from "./language-switcher";
import { AssetImage } from "@/components/media/asset-image";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { routes } from "@/lib/routes/paths";

export function SiteHeader() {
  const { t } = useTranslation(["navigation", "brand"]);
  const { shell, route } = useSite();
  return (
    <header className="site-header">
      <Container>
        <div className="header-top">
          <Link href={routes.contact} className="store-shortcut">
            <MapPin size={15} aria-hidden="true" />
            {t("location", { ns: "brand" })}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            popoverTarget="mobile-navigation"
            className="mobile-menu-trigger"
            aria-label={t("openMenu")}
          >
            <Menu aria-hidden="true" />
          </Button>
          <Link href={routes.home} className="wordmark" aria-label={t("home")}>
            <AssetImage asset={shell.logo} sizes="220px" />
          </Link>
          <LanguageSwitcher />
        </div>
        <nav className="desktop-navigation" aria-label={t("primary")}>
          {shell.primaryLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="nav-link"
              aria-current={route.path === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
      <div id="mobile-navigation" popover="auto" className="mobile-navigation">
        <div className="mobile-menu-heading">
          <p className="eyebrow">{t("branch", { ns: "brand" })}</p>
          <Button
            variant="ghost"
            size="icon"
            popoverTarget="mobile-navigation"
            popoverTargetAction="hide"
            aria-label={t("closeMenu")}
          >
            <X aria-hidden="true" />
          </Button>
        </div>
        <nav aria-label={t("primary")}>
          {shell.primaryLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={route.path === link.href ? "page" : undefined}
              onClick={() => document.getElementById("mobile-navigation")?.hidePopover()}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mobile-secondary-links">
          {shell.footerLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => document.getElementById("mobile-navigation")?.hidePopover()}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
