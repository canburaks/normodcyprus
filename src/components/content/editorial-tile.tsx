import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { AssetImage } from "@/components/media/asset-image";
import { MediaFrame } from "@/components/media/media-frame";
import type { EditorialTileModel } from "@/lib/content/models";
import { mediaSizes, tileStyle } from "@/lib/design/layout";
import { cn } from "@/lib/utils";

export function EditorialTile({
  tile,
  isPrimary = false,
}: {
  tile: EditorialTileModel;
  isPrimary?: boolean;
}) {
  const { t } = useTranslation("common");
  const Heading = isPrimary ? "h1" : "h2";
  return (
    <article
      className={cn("editorial-tile grid-tile", !isPrimary && "reveal")}
      style={tileStyle(tile.layout)}
    >
      <Link href={tile.href} className="editorial-tile-link">
        <MediaFrame frame={tile.frame}>
          <AssetImage
            asset={tile.image}
            sizes={mediaSizes(
              tile.layout.small.span,
              tile.layout.medium.span,
              tile.layout.large.span,
            )}
            isEager={isPrimary}
          />
        </MediaFrame>
        <div className="editorial-caption">
          <Heading>
            {tile.caption}
            <span aria-hidden="true">{t("captionSuffix")}</span>
          </Heading>
        </div>
      </Link>
    </article>
  );
}
