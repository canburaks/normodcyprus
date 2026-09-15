import { useTranslation } from "next-i18next/pages";
import { TextLink } from "@/components/content/text-link";
import { useSite } from "@/components/layout/site-context";
import type { ProductModel } from "@/lib/content/models";
import { routes } from "@/lib/routes/paths";

export function ProductSummary({ product }: { product: ProductModel }) {
  const { t } = useTranslation(["catalog", "common"]);
  const { shell, locale } = useSite();
  const subject = encodeURIComponent(t("inquirySubject", { ns: "common", product: product.name }));
  const body = encodeURIComponent(t("inquiryBody", { ns: "common", product: product.name }));
  return (
    <div className="product-summary">
      <header>
        <h1>{product.name}</h1>
        <p className="product-subtitle">{product.subtitle}</p>
      </header>
      <p>{product.summary}</p>
      <div className="product-inquiry">
        <TextLink href={routes.contact}>{t("visit", { ns: "common" })}</TextLink>
        <TextLink href={`mailto:${shell.store.email}?subject=${subject}&body=${body}`}>
          {t("inquire")}
        </TextLink>
        <p>{t("availability")}</p>
      </div>
      <div>
        <details className="product-disclosure" open>
          <summary>{t("details")}</summary>
          <p>{product.description}</p>
        </details>
        {Object.keys(product.dimensions).length ? (
          <details className="product-disclosure">
            <summary>{t("dimensions")}</summary>
            <dl className="dimensions-list">
              {Object.entries(product.dimensions).map(([key, value]) => (
                <div key={key}>
                  <dt>{t(key)}</dt>
                  <dd>
                    {new Intl.NumberFormat(locale).format(value)} {t("unit")}
                  </dd>
                </div>
              ))}
            </dl>
          </details>
        ) : null}
        <details className="product-disclosure">
          <summary>{t("care")}</summary>
          <p>{product.care}</p>
        </details>
      </div>
      {product.collections.map((collection) => (
        <TextLink key={collection.id} href={collection.href}>
          {collection.label} — {t("viewCollection", { ns: "common" })}
        </TextLink>
      ))}
    </div>
  );
}
