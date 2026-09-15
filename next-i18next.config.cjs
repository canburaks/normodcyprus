// Shared CommonJS config is consumed by both Next.js and next-i18next's Pages loader.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const site = require("./content/config/site.json");

/** @type {import('next-i18next/pages').UserConfig} */
const config = {
  i18n: {
    locales: site.locales,
    defaultLocale: site.defaultLocale,
    localeDetection: /** @type {false} */ (site.localeDetection),
  },
  defaultNS: "common",
  localePath: "./public/locales",
  fallbackLng: false,
  reloadOnPrerender: process.env.NODE_ENV === "development",
  interpolation: { escapeValue: false },
};
module.exports = config;
