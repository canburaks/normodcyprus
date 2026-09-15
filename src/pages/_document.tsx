import { Html, Head, Main, NextScript } from "next/document";
import site from "../../content/config/site.json";
import assets from "../../content/assets.json";

export default function Document() {
  const favicon = assets[site.faviconAssetId as keyof typeof assets];
  return (
    <Html>
      <Head>
        <link rel="icon" href={favicon.src} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
