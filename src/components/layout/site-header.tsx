import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "next-i18next/pages";
import { useSite } from "./site-context";
import { AssetImage } from "@/components/media/asset-image";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { routes } from "@/lib/routes/paths";
import { NavigationPanel, SITE_MENU_ID } from "./navigation/navigation-panel";

export function SiteHeader() {
  const { t } = useTranslation("navigation");
  const { shell, route } = useSite();
  const sentinel = useRef<HTMLDivElement>(null);
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    const element = sentinel.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIsCompact(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <div ref={sentinel} className="header-sentinel" aria-hidden="true" />
      <header className="site-header" data-is-compact={isCompact}>
        <Container className="header-inner">
          <nav className="desktop-navigation" aria-label={t("primary")}>
            {shell.primaryLinks.map((link) =>
              link.id === "products" ? (
                <Button
                  key={link.id}
                  variant="ghost"
                  className="nav-link"
                  popoverTarget={SITE_MENU_ID}
                >
                  <span>{link.label}</span>
                </Button>
              ) : (
                <Link
                  key={link.id}
                  href={link.href}
                  className="nav-link"
                  aria-current={route.path === link.href ? "page" : undefined}
                >
                  <span>{link.label}</span>
                </Link>
              ),
            )}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            popoverTarget={SITE_MENU_ID}
            className="mobile-menu-trigger"
            aria-label={t("openMenu")}
          >
            <span className="menu-glyph" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            popoverTarget={SITE_MENU_ID}
            className="compact-menu-trigger"
            aria-label={t("expandHeader")}
          >
            <span className="compact-glyph" aria-hidden="true">
              <i />
              <i />
            </span>
          </Button>
          <Link href={routes.home} className="wordmark" aria-label={t("home")}>
            <AssetImage asset={shell.logo} sizes="140px" isEager />
          </Link>
          <Link href={routes.products} className="header-search" aria-label={t("search")}>
            <Search strokeWidth={1.2} aria-hidden="true" />
          </Link>
        </Container>
        <NavigationPanel />
      </header>
    </>
  );
}
