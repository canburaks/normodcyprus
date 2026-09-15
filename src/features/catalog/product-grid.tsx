import type { ProductCardModel } from "@/lib/content/models";
import type { TileLayout } from "@/lib/content/schemas";
import presentation from "../../../content/config/presentation.json";
import { ProductCard } from "./product-card";

export function ProductGrid({
  products,
  hasPriorityImage = false,
}: {
  products: ProductCardModel[];
  hasPriorityImage?: boolean;
}) {
  const slots: TileLayout[] = presentation.productCollageSlots;
  const groups = Array.from({ length: Math.ceil(products.length / slots.length) }, (_, index) =>
    products.slice(index * slots.length, (index + 1) * slots.length),
  );
  return (
    <div className="product-collage">
      {groups.map((group, groupIndex) => (
        <div className="product-collage-group" key={group[0].id}>
          <div
            className="product-grid"
            data-rows={Math.max(
              ...group.map((_, index) => slots[index].large.row + slots[index].large.rowSpan - 1),
            )}
          >
            {group.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                layout={slots[index]}
                isEager={hasPriorityImage && groupIndex === 0 && index < 3}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
