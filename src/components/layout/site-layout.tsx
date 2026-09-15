import type { ReactNode } from "react";
import { useTranslation } from "next-i18next/pages";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { useSite } from "./site-context";
import { routes } from "@/lib/routes/paths";
import { useSectionReveals } from "./use-section-reveals";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation("common");
  const { route } = useSite();
  useSectionReveals(route.path);
  const isProduct = route.path.startsWith(routes.products + "/");
  return (
    <div className="site-shell" data-is-product={isProduct}>
      <a className="skip-link" href="#main-content">
        {t("skip")}
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
