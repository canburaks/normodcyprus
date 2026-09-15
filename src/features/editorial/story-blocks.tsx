import type { CSSProperties } from "react";
import { useTranslation } from "next-i18next/pages";
import { AssetImage } from "@/components/media/asset-image";
import { MediaFrame } from "@/components/media/media-frame";
import type { EditorialModel } from "@/lib/content/models";
import { mediaSizes, tileStyle } from "@/lib/design/layout";

export function StoryBlocks({ page }: { page: EditorialModel }) {
  const { t } = useTranslation("common");
  return (
    <div className="story-blocks">
      {page.blocks.map((block) => {
        const copy = page.sections[block.id];
        const style = {
          ...tileStyle(block.layout),
          "--copy-medium-column": block.layout.medium.column === 1 ? 7 : 1,
          "--copy-large-column": block.layout.large.column < 7 ? 8 : 2,
        } as CSSProperties;
        return (
          <section className="story-row reveal" key={block.id} id={block.id} style={style}>
            <div className="story-photo grid-tile">
              <MediaFrame frame={block.frame}>
                <AssetImage
                  asset={block.image}
                  sizes={mediaSizes(
                    block.layout.small.span,
                    block.layout.medium.span,
                    block.layout.large.span,
                  )}
                />
              </MediaFrame>
            </div>
            <div className="story-copy">
              <h2>
                {copy.title}
                <span aria-hidden="true">{t("captionSuffix")}</span>
              </h2>
              <p>{copy.body}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
