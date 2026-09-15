import { useTranslation } from "next-i18next/pages";
import type { ImageAsset } from "@/lib/content/models";
import { Container } from "@/components/layout/container";
import { AssetImage } from "@/components/media/asset-image";
import { TextLink } from "@/components/content/text-link";
import { routes } from "@/lib/routes/paths";

export function StoreBand({ image }: { image: ImageAsset }) {
  const { t } = useTranslation(["home", "common", "store"]);
  return (
    <section className="store-band">
      <Container>
        <div className="split-editorial split-editorial-reverse">
          <AssetImage asset={image} sizes="(min-width: 768px) 48vw, 90vw" />
          <div className="split-copy">
            <p className="eyebrow">{t("name", { ns: "store" })}</p>
            <h2>{t("storeTitle")}</h2>
            <p>{t("storeText")}</p>
            <TextLink href={routes.contact}>{t("visit", { ns: "common" })}</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
