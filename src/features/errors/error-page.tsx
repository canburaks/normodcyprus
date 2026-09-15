import { useTranslation } from "next-i18next/pages";
import { Container, Section } from "@/components/layout/container";
import { PageHeading } from "@/components/content/page-heading";
import { TextLink } from "@/components/content/text-link";
import { PageSeo } from "@/components/seo/page-seo";
import { routes } from "@/lib/routes/paths";

export function ErrorPage({ code }: { code: "404" | "500" }) {
  const { t } = useTranslation(["errors", "common"]);
  return (
    <>
      <PageSeo title={t(`${code}.title`)} description={t(`${code}.description`)} shouldNoIndex />
      <Container>
        <Section>
          <PageHeading
            title={t(`${code}.title`)}
            eyebrow={t(`${code}.eyebrow`)}
            description={t(`${code}.description`)}
          />
          <div className="text-center">
            <TextLink href={routes.home}>{t("backHome", { ns: "common" })}</TextLink>
          </div>
        </Section>
      </Container>
    </>
  );
}
