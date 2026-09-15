import { createStore } from "zustand/vanilla";
import { emptyFilters, type CatalogFilters } from "@/lib/catalog/filters";

type ShowroomState = {
  galleryIndex: number;
  filterDraft: CatalogFilters;
  setGalleryIndex: (index: number) => void;
  setFilterDraft: (filters: CatalogFilters) => void;
};
export function createShowroomStore() {
  return createStore<ShowroomState>()((set) => ({
    galleryIndex: 0,
    filterDraft: { ...emptyFilters },
    setGalleryIndex: (galleryIndex) => set({ galleryIndex }),
    setFilterDraft: (filterDraft) => set({ filterDraft }),
  }));
}
