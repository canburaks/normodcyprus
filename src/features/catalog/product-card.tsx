import Link from "next/link";
import type { CSSProperties } from "react";
import { AssetImage } from "@/components/media/asset-image";
import { MediaFrame } from "@/components/media/media-frame";
import type { ProductCardModel } from "@/lib/content/models";
import type { TileLayout } from "@/lib/content/schemas";
import { mediaSizes, tileStyle } from "@/lib/design/layout";

export function ProductCard({
  product,
  layout,
  isEager = false,
}: {
  product: ProductCardModel;
  layout: TileLayout;
  isEager?: boolean;
}) {
  const style = {
    ...tileStyle(layout),
    "--tile-background": product.presentation.hoverBackground,
    "--tile-foreground": product.presentation.hoverForeground,
  } as CSSProperties;
  return (
    <article className="product-card grid-tile" style={style}>
      <Link href={product.href} className="product-card-link">
        <MediaFrame frame={product.presentation.frame} className="product-card-media">
          <AssetImage
            asset={product.image}
            sizes={mediaSizes(layout.small.span, layout.medium.span, layout.large.span)}
            isEager={isEager}
          />
        </MediaFrame>
        <div className="product-card-copy">
          <h3>{product.name}</h3>
        </div>
      </Link>
    </article>
  );
}
