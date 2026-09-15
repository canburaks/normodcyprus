import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { AssetImage } from "@/components/media/asset-image";
import { MediaFrame } from "@/components/media/media-frame";
import type { CollectionCardModel } from "@/lib/content/models";
import type { MediaFrame as Frame } from "@/lib/content/schemas";
import type { CSSProperties } from "react";
import { mediaSizes } from "@/lib/design/layout";
import presentation from "../../../content/config/presentation.json";

export function CollectionCard({
  collection,
  isEager = false,
}: {
  collection: CollectionCardModel;
  isEager?: boolean;
}) {
  const { t } = useTranslation("common");
  return (
    <article
      className="editorial-tile collection-banner"
      style={
        Object.fromEntries(
          Object.entries(presentation.collectionSpans).map(([size, span]) => [
            "--collection-" + size + "-span",
            span,
          ]),
        ) as CSSProperties
      }
    >
      <Link href={collection.href} className="editorial-tile-link">
        <MediaFrame frame={presentation.collectionFrame as Frame}>
          <AssetImage
            asset={collection.hero}
            sizes={mediaSizes(
              presentation.collectionSpans.small,
              presentation.collectionSpans.medium,
              presentation.collectionSpans.large,
            )}
            isEager={isEager}
          />
        </MediaFrame>
        <div className="editorial-caption">
          <h2>
            {collection.name}
            <span aria-hidden="true">{t("captionSuffix")}</span>
          </h2>
        </div>
      </Link>
    </article>
  );
}
