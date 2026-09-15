import fs from "node:fs";
import { publishedPaths } from "../src/lib/routes/published";
import { absoluteUrl, isIndexable } from "../src/lib/routes/paths";

const urls = publishedPaths();
fs.writeFileSync(
  "public/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((path) => `  <url><loc>${absoluteUrl(path).replaceAll("&", "&amp;")}</loc></url>`).join("\n")}\n</urlset>\n`,
);
fs.writeFileSync(
  "public/robots.txt",
  `User-agent: *\n${isIndexable ? "Allow: /" : "Disallow: /"}\nSitemap: ${absoluteUrl("/sitemap.xml")}\n`,
);
console.info(`Generated sitemap for ${urls.length} routes. Indexable: ${isIndexable}`);
