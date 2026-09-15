import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { AssetImage } from "@/components/media/asset-image";
import type { PostCardModel } from "@/lib/content/models";
import { mediaSizes } from "@/lib/design/layout";

export function PostCard({ post }: { post: PostCardModel }) {
  const { t } = useTranslation(["navigation", "common", "blog"]);
  return (
    <article className="news-card reveal">
      <Link href={post.href}>
        <AssetImage asset={post.cover} sizes={mediaSizes(12, 6, 6)} />
        <div className="news-caption">
          <p>
            {t("blog")}
            <span aria-hidden="true">{t("captionSuffix", { ns: "common" })}</span>
          </p>
          <h2>{post.title}</h2>
          {post.isDraft ? <p>{t("draftPreview", { ns: "blog" })}</p> : null}
        </div>
      </Link>
    </article>
  );
}
