import { createContext, useContext, type ReactNode } from "react";
import type { BasePageProps } from "@/lib/content/models";

const SiteContext = createContext<BasePageProps | null>(null);
export function SiteProvider({ value, children }: { value: BasePageProps; children: ReactNode }) {
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("SiteProvider is required");
  return context;
}
