import { useTranslation } from "next-i18next/pages";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import type { CatalogFilters } from "@/lib/catalog/filters";
import type { CatalogOptions } from "@/lib/content/models";

export function CatalogFilterFields({
  value,
  options,
  onChange,
}: {
  value: CatalogFilters;
  options: CatalogOptions;
  onChange: (value: CatalogFilters) => void;
}) {
  const { t } = useTranslation("catalog");
  const groups = [
    { key: "category", values: options.categories },
    { key: "collection", values: options.collections },
    { key: "material", values: options.materials },
  ] as const;
  return (
    <div className="catalog-filter-fields">
      {groups.map(({ key, values }) => (
        <label key={key} className="filter-field">
          <span>{t(key)}</span>
          <NativeSelect
            name={key}
            value={value[key]}
            onChange={(event) => onChange({ ...value, [key]: event.target.value })}
          >
            <NativeSelectOption value="">{t("all")}</NativeSelectOption>
            {values.map((option) => (
              <NativeSelectOption key={option.id} value={option.id}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </label>
      ))}
      <label className="filter-field">
        <span>{t("sort")}</span>
        <NativeSelect
          name="sort"
          value={value.sort}
          onChange={(event) =>
            onChange({ ...value, sort: event.target.value as CatalogFilters["sort"] })
          }
        >
          <NativeSelectOption value="featured">{t("featured")}</NativeSelectOption>
          <NativeSelectOption value="alphabetical">{t("alphabetical")}</NativeSelectOption>
        </NativeSelect>
      </label>
    </div>
  );
}
