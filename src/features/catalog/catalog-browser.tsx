import { useRef } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeDialog } from "@/components/ui/native-dialog";
import { useSite } from "@/components/layout/site-context";
import { useShowroomStore } from "@/providers/showroom-store-provider";
import {
  emptyFilters,
  filterProducts,
  parseFilters,
  serializeFilters,
  type CatalogFilters,
} from "@/lib/catalog/filters";
import type { CatalogOptions, ProductCardModel } from "@/lib/content/models";
import { CatalogFilterFields } from "./catalog-filters";
import { ProductGrid } from "./product-grid";

export function CatalogBrowser({
  products,
  options,
}: {
  products: ProductCardModel[];
  options: CatalogOptions;
}) {
  const { t } = useTranslation("catalog");
  const { locale } = useSite();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const draft = useShowroomStore((state) => state.filterDraft);
  const setDraft = useShowroomStore((state) => state.setFilterDraft);
  const filters = parseFilters(router.isReady ? router.query : {}, options);
  const filtered = filterProducts(products, filters, locale);
  const hasFilters = Object.keys(serializeFilters(filters)).length > 0;
  function commit(next: CatalogFilters) {
    void router.push({ pathname: router.pathname, query: serializeFilters(next) }, undefined, {
      shallow: true,
      scroll: false,
    });
  }
  return (
    <>
      <div className="catalog-toolbar">
        <form
          className="catalog-search"
          onSubmit={(event) => {
            event.preventDefault();
            const value = new FormData(event.currentTarget).get("q");
            commit({ ...filters, q: typeof value === "string" ? value : "" });
          }}
        >
          <label className="filter-field search-field">
            <span>{t("search")}</span>
            <Input
              key={filters.q}
              type="search"
              name="q"
              maxLength={100}
              defaultValue={filters.q}
              placeholder={t("searchPlaceholder")}
            />
          </label>
          <Button
            type="submit"
            variant="outline"
            size="icon"
            className="self-end"
            aria-label={t("searchAction")}
          >
            <Search aria-hidden="true" />
          </Button>
        </form>
        <div className="catalog-desktop-filters">
          <CatalogFilterFields value={filters} options={options} onChange={commit} />
        </div>
      </div>
      <h2 className="sr-only">{t("results")}</h2>
      <div className="catalog-status">
        <p role="status" aria-live="polite">
          {t("count", { count: filtered.length })}
        </p>
        <div className="flex items-center gap-2">
          {hasFilters ? (
            <Button variant="link" onClick={() => commit(emptyFilters)}>
              {t("reset")}
            </Button>
          ) : null}
          <Button
            variant="outline"
            className="mobile-filter-trigger"
            onClick={() => {
              setDraft(filters);
              dialogRef.current?.showModal();
            }}
          >
            <SlidersHorizontal aria-hidden="true" />
            {t("filters")}
          </Button>
        </div>
      </div>
      {filtered.length ? (
        <ProductGrid products={filtered} hasPriorityImage />
      ) : (
        <div className="empty-state">
          <h2>{t("emptyTitle")}</h2>
          <p>{t("emptyText")}</p>
          <Button variant="outline" onClick={() => commit(emptyFilters)}>
            {t("reset")}
          </Button>
        </div>
      )}
      <NativeDialog ref={dialogRef} className="filter-dialog" aria-labelledby="filter-heading">
        <h2 id="filter-heading">{t("filters")}</h2>
        <CatalogFilterFields value={draft} options={options} onChange={setDraft} />
        <div className="filter-dialog-actions">
          <Button
            onClick={() => {
              commit(draft);
              dialogRef.current?.close();
            }}
          >
            {t("apply")}
          </Button>
          <Button variant="outline" onClick={() => setDraft(emptyFilters)}>
            {t("reset")}
          </Button>
        </div>
      </NativeDialog>
    </>
  );
}
