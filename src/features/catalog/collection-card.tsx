import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import { AssetImage } from "@/components/media/asset-image";
import { TextLink } from "@/components/content/text-link";
import type { CollectionCardModel } from "@/lib/content/models";

export function CollectionCard({ collection }: { collection: CollectionCardModel }) {
  const { t } = useTranslation("common");
  return (
    <article className="editorial-card reveal">
      <Link href={collection.href} className="card-image" tabIndex={-1} aria-hidden="true">
        <AssetImage asset={collection.hero} sizes="(min-width: 768px) 44vw, 90vw" />
      </Link>
      <div className="editorial-card-content">
        <div>
          <h3>
            <Link href={collection.href}>{collection.name}</Link>
          </h3>
          <p>{collection.title}</p>
        </div>
        <TextLink href={collection.href}>{t("discover")}</TextLink>
      </div>
    </article>
  );
}
