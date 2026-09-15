import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductModel } from "@/lib/content/models";
import { routes } from "@/lib/routes/paths";

export function ProductSummary({ product }: { product: ProductModel }) {
  const { t } = useTranslation("common");
  return (
    <div className="product-summary">
      <h1>{product.name}</h1>
      <p className="product-description">{product.description}</p>
      <Link
        className={cn(buttonVariants({ variant: "outline" }), "store-action")}
        href={routes.contact}
      >
        {t("contactAction")}
      </Link>
    </div>
  );
}
