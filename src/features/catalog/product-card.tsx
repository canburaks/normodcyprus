import Link from "next/link";
import { AssetImage } from "@/components/media/asset-image";
import type { ProductCardModel } from "@/lib/content/models";

export function ProductCard({
  product,
  isEager = false,
}: {
  product: ProductCardModel;
  isEager?: boolean;
}) {
  const sizes =
    "(min-width: 1440px) 320px, (min-width: 1024px) 23vw, (min-width: 768px) 30vw, 44vw";
  return (
    <article className="product-card">
      <Link href={product.href} className="product-card-link">
        <div className="product-card-media">
          <AssetImage asset={product.image} sizes={sizes} isEager={isEager} />
          {product.alternateImage ? (
            <AssetImage
              asset={product.alternateImage}
              sizes={sizes}
              className="alternate-image"
              isDecorative
            />
          ) : null}
        </div>
        <div className="product-card-copy">
          <h3>{product.name}</h3>
          <p>{product.subtitle}</p>
        </div>
      </Link>
    </article>
  );
}
