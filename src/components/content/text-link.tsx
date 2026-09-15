import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function TextLink({ children, className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link className={cn("text-link", className)} {...props}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={16} />
    </Link>
  );
}
