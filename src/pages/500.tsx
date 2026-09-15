import type { GetStaticPropsContext } from "next";
import { ErrorPage } from "@/features/errors/error-page";
import { baseProps } from "@/lib/content/loaders";
import { getLocale } from "@/lib/content/read";
export default function ServerErrorPage() {
  return <ErrorPage code="500" />;
}
export async function getStaticProps(context: GetStaticPropsContext) {
  return { props: await baseProps(getLocale(context.locale), "serverError", ["errors"]) };
}
