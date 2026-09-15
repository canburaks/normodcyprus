import { createContext, useContext, useState, type ReactNode } from "react";
import { useStore } from "zustand";
import { createShowroomStore } from "@/stores/showroom-store";

type Store = ReturnType<typeof createShowroomStore>;
const ShowroomContext = createContext<Store | null>(null);
export function ShowroomStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(createShowroomStore);
  return <ShowroomContext.Provider value={store}>{children}</ShowroomContext.Provider>;
}
export function useShowroomStore<T>(selector: (state: ReturnType<Store["getState"]>) => T) {
  const store = useContext(ShowroomContext);
  if (!store) throw new Error("ShowroomStoreProvider is required");
  return useStore(store, selector);
}
