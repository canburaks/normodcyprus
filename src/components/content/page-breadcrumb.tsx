import { Fragment } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next/pages";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSite } from "@/components/layout/site-context";

export function PageBreadcrumb({ title }: { title: string }) {
  const { t } = useTranslation("common");
  const { route } = useSite();
  const parents = route.breadcrumbs.filter((link) => link.href !== route.path);
  return (
    <Breadcrumb className="page-breadcrumb" aria-label={t("breadcrumb")}>
      <BreadcrumbList>
        {parents.map((link) => (
          <Fragment key={link.id}>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href={link.href} />}>{link.label}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
