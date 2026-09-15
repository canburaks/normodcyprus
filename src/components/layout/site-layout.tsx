import type { ReactNode } from "react";
import { useTranslation } from "next-i18next/pages";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation("common");
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("skip")}
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
