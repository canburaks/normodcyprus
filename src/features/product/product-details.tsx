import { useTranslation } from "next-i18next/pages";
import { TextLink } from "@/components/content/text-link";
import { useSite } from "@/components/layout/site-context";
import type { ProductModel } from "@/lib/content/models";

export function ProductDetails({ product }: { product: ProductModel }) {
  const { t } = useTranslation(["catalog", "common"]);
  const { locale, shell } = useSite();
  const subject = encodeURIComponent(t("inquirySubject", { ns: "common", product: product.name }));
  const body = encodeURIComponent(t("inquiryBody", { ns: "common", product: product.name }));
  return (
    <details className="product-details">
      <summary className="expand-trigger">
        <span>{t("detailsToggle", { ns: "common" })}</span>
        <span className="expand-circle" aria-hidden="true" />
      </summary>
      <div className="product-details-inner">
        <h2>
          {product.name}
          <span aria-hidden="true">{t("captionSuffix", { ns: "common" })}</span>
        </h2>
        <div className="specification-columns">
          {Object.keys(product.dimensions).length ? (
            <section>
              <h3>{t("dimensions")}</h3>
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
            </section>
          ) : null}
          <section>
            <h3>{t("care")}</h3>
            <p>{product.care}</p>
          </section>
          <section>
            <h3>{t("inquire")}</h3>
            <p>{t("availability")}</p>
            <TextLink
              href={"mailto:" + shell.store.email + "?subject=" + subject + "&body=" + body}
            >
              {t("email", { ns: "common" })}
            </TextLink>
          </section>
        </div>
        <div className="product-collection-links">
          {product.collections.map((collection) => (
            <TextLink key={collection.id} href={collection.href}>
              {collection.label}
            </TextLink>
          ))}
        </div>
      </div>
    </details>
  );
}
