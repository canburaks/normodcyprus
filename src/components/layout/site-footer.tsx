import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { useTranslation } from "next-i18next/pages";
import { Container } from "./container";
import { useSite } from "./site-context";
import { LanguageSwitcher } from "./language-switcher";

export function SiteFooter() {
  const { t } = useTranslation(["brand", "navigation", "store", "common"]);
  const { shell } = useSite();
  const links = [
    ...new Map(
      [...shell.primaryLinks, ...shell.footerLinks].map((link) => [link.id, link]),
    ).values(),
  ];
  return (
    <footer className="site-footer">
      <Container>
        <nav className="footer-links" aria-label={t("footer", { ns: "navigation" })}>
          {links.map((link) => (
            <Link key={link.id} href={link.href}>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
        <div className="footer-icons">
          <a href={"mailto:" + shell.store.email} aria-label={t("email", { ns: "common" })}>
            <Mail size={18} strokeWidth={1.3} aria-hidden="true" />
          </a>
          <a href={shell.store.directionsUrl} aria-label={t("directions", { ns: "common" })}>
            <MapPin size={18} strokeWidth={1.3} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-company">
          <span>{t("branch")}</span>
          <address>
            {t("address", { ns: "store" })} {t("city", { ns: "store" })}
          </address>
          <a href={"mailto:" + shell.store.email}>{shell.store.email}</a>
        </div>
        <p className="footer-copyright">{t("copyright")}</p>
      </Container>
    </footer>
  );
}
