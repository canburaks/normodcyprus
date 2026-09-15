import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("page-container", className)} {...props} />;
}
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("page-section", className)} {...props} />;
}
