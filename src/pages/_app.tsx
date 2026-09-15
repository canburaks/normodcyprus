import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next/pages";
import config from "../../next-i18next.config.cjs";
import type { BasePageProps } from "@/lib/content/models";
import { ShowroomStoreProvider } from "@/providers/showroom-store-provider";
import { SiteProvider } from "@/components/layout/site-context";
import { SiteLayout } from "@/components/layout/site-layout";
import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps<BasePageProps>) {
  if (!pageProps.shell) return <Component {...pageProps} />;
  return (
    <ShowroomStoreProvider key={pageProps.route.path}>
      <SiteProvider value={pageProps}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </SiteProvider>
    </ShowroomStoreProvider>
  );
}
export default appWithTranslation(App, config);
