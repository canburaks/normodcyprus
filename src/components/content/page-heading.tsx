import { useTranslation } from "next-i18next/pages";
import { cn } from "@/lib/utils";

export function PageHeading({
  title,
  description,
  eyebrow,
  variant = "story",
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  variant?: "story" | "compact";
}) {
  const { t } = useTranslation("common");
  return (
    <header className={cn("page-heading", "page-heading-" + variant)}>
      {eyebrow ? <p className="sr-only">{eyebrow}</p> : null}
      <h1>
        {title}
        <span aria-hidden="true">{t("captionSuffix")}</span>
      </h1>
      {description ? <p className="page-intro">{description}</p> : null}
    </header>
  );
}
