import type { CSSProperties } from "react";
import type { MediaFrame, TileLayout } from "@/lib/content/schemas";
import tokens from "@/styles/generated/layout.json";

export function tileStyle(layout: TileLayout): CSSProperties {
  return Object.fromEntries(
    Object.entries(layout).flatMap(([breakpoint, value]) => [
      ["--tile-" + breakpoint + "-column", value.column],
      ["--tile-" + breakpoint + "-span", value.span],
      ["--tile-" + breakpoint + "-row", value.row],
      ["--tile-" + breakpoint + "-rows", value.rowSpan],
    ]),
  ) as CSSProperties;
}
export function frameStyle(frame: MediaFrame): CSSProperties {
  return { "--media-position": frame.position } as CSSProperties;
}
export function mediaSizes(small = 12, medium = small, large = medium) {
  const { geometry, responsive } = tokens;
  const rowSmall = parseFloat(geometry["row-padding-mobile"]);
  const rowLarge = parseFloat(geometry["row-padding-desktop"]);
  const columnSmall = parseFloat(geometry["column-padding-mobile"]);
  const columnLarge = parseFloat(geometry["column-padding-desktop"]);
  const max = parseFloat(responsive["container-max"]);
  const breakpoints = responsive.breakpoints;
  const size = (span: number, row: number, column: number) =>
    "calc(" + (100 * span) / 12 + "vw - " + (2 * row * span) / 12 + "px - " + 2 * column + "px)";
  return [
    "(min-width: " +
      (parseFloat(breakpoints.wide) + 1) +
      "px) " +
      ((max * large) / 12 - 2 * columnLarge) +
      "px",
    "(min-width: " + max + "px) " + (((max - 2 * rowLarge) * large) / 12 - 2 * columnLarge) + "px",
    "(min-width: " +
      (parseFloat(breakpoints.desktop) + 0) +
      "px) " +
      size(large, rowLarge, columnLarge),
    "(min-width: " +
      (parseFloat(breakpoints.inset) + 1) +
      "px) " +
      size(medium, rowLarge, columnLarge),
    "(min-width: " +
      (parseFloat(breakpoints.grid) + 0) +
      "px) " +
      size(medium, rowSmall, columnLarge),
    size(small, rowSmall, columnSmall),
  ].join(", ");
}
