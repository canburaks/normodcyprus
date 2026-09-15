import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { Container } from "./container";
import { useSite } from "./site-context";
import { AssetImage } from "@/components/media/asset-image";
import { routes } from "@/lib/routes/paths";

export function SiteFooter() {
  const { t } = useTranslation(["brand", "navigation", "store", "common"]);
  const { shell } = useSite();
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href={routes.home} aria-label={t("name")}>
              <AssetImage asset={shell.logo} sizes="170px" />
            </Link>
            <p>{t("description")}</p>
          </div>
          <nav aria-label={t("footer", { ns: "navigation" })}>
            <p className="eyebrow">{t("name")}</p>
            {shell.primaryLinks.slice(0, 4).map((link) => (
              <Link key={link.id} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <nav aria-label={t("inspiration", { ns: "navigation" })}>
            <p className="eyebrow">{t("inspiration", { ns: "navigation" })}</p>
            {shell.footerLinks
              .filter((link) => link.id !== "contact")
              .map((link) => (
                <Link key={link.id} href={link.href}>
                  {link.label}
                </Link>
              ))}
          </nav>
          <div>
            <p className="eyebrow">{t("contact", { ns: "navigation" })}</p>
            <address>
              {t("address", { ns: "store" })}
              <br />
              {t("addressLine2", { ns: "store" })}
            </address>
            <Link href={routes.contact}>{t("hours", { ns: "store" })}</Link>
            <a href={`mailto:${shell.store.email}`}>{shell.store.email}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <p>{t("tagline")}</p>
        </div>
      </Container>
    </footer>
  );
}
