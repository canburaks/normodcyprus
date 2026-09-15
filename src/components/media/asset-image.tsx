import Image from "next/image";
import { useState } from "react";
import type { ImageAsset } from "@/lib/content/models";
import { useSite } from "@/components/layout/site-context";
import { cn } from "@/lib/utils";

export function AssetImage({
  asset,
  sizes,
  isEager = false,
  className,
  isDecorative = false,
}: {
  asset: ImageAsset;
  sizes: string;
  isEager?: boolean;
  className?: string;
  isDecorative?: boolean;
}) {
  const { shell } = useSite();
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const image = failedSource === asset.src ? shell.fallback : asset;
  return (
    <Image
      src={image.src}
      alt={isDecorative ? "" : image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      loading={isEager ? "eager" : "lazy"}
      fetchPriority={isEager ? "high" : undefined}
      className={cn("asset-image", className)}
      onError={() => setFailedSource(asset.src)}
    />
  );
}
