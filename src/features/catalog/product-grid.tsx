import type { ProductCardModel } from "@/lib/content/models";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  hasPriorityImage = false,
}: {
  products: ProductCardModel[];
  hasPriorityImage?: boolean;
}) {
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} isEager={hasPriorityImage && index === 0} />
      ))}
    </div>
  );
}
