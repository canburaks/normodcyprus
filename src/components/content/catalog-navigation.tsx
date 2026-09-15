import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { useSite } from "@/components/layout/site-context";
import { routes } from "@/lib/routes/paths";

export function CatalogNavigation() {
  const { t } = useTranslation("navigation");
  const { shell, route } = useSite();
  const collectionLinks = shell.menuGroups.find((group) => group.id === "collections")?.links ?? [];
  return (
    <div className="catalog-navigation-space">
      <nav className="sub-navigation" aria-label={t("collections")}>
        <Link
          href={routes.products}
          aria-current={route.path === routes.products ? "page" : undefined}
        >
          {t("products")}
        </Link>
        <Link
          href={routes.collections}
          aria-current={route.path === routes.collections ? "page" : undefined}
        >
          {t("collections")}
        </Link>
        {collectionLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            aria-current={route.path === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
