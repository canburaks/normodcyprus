import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { AssetImage } from "@/components/media/asset-image";
import { TextLink } from "@/components/content/text-link";
import type { PostCardModel } from "@/lib/content/models";

export function PostCard({ post }: { post: PostCardModel }) {
  const { t } = useTranslation("common");
  return (
    <article className="editorial-card">
      <Link href={post.href} className="card-image" tabIndex={-1} aria-hidden="true">
        <AssetImage asset={post.cover} sizes="(min-width: 768px) 44vw, 90vw" />
      </Link>
      <div className="editorial-card-content">
        <div>
          <h2>
            <Link href={post.href}>{post.title}</Link>
          </h2>
          <p>{post.excerpt}</p>
          <TextLink href={post.href}>{t("readMore")}</TextLink>
        </div>
      </div>
    </article>
  );
}
