import type { NextConfig } from "next";
import i18nConfig from "./next-i18next.config.cjs";

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: true,
  i18n: i18nConfig.i18n,
  trailingSlash: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "normod.com", pathname: "/cdn/shop/**" }],
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
};

export default nextConfig;
