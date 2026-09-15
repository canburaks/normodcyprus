import type { ReactNode } from "react";
import type { MediaFrame as Frame } from "@/lib/content/schemas";
import { frameStyle } from "@/lib/design/layout";
import { cn } from "@/lib/utils";

export function MediaFrame({
  frame,
  children,
  className,
}: {
  frame: Frame;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("media-frame", className)}
      data-ratio={frame.ratio}
      data-fit={frame.fit}
      style={frameStyle(frame)}
    >
      {children}
    </div>
  );
}
