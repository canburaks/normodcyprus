import { createRequire } from "node:module";
import fs from "node:fs";
import { readJson } from "../src/lib/content/read";
import { assetSchema } from "../src/lib/content/schemas";
import { z } from "zod";

// Reuse the image decoder shipped with this installed Next.js version.
const require = createRequire(import.meta.url);
const sharp = require(
  require.resolve("sharp", { paths: [require.resolve("next/package.json")] }),
) as (input: Buffer) => { metadata(): Promise<{ width?: number; height?: number }> };
const assets = readJson("content/assets.json", z.record(z.string(), assetSchema));
let hasErrors = false;
async function check(id: string) {
  const asset = assets[id];
  try {
    const response =
      asset.kind === "remote"
        ? await fetch(asset.src, { signal: AbortSignal.timeout(20000) })
        : null;
    if (response && !response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = response
      ? Buffer.from(await response.arrayBuffer())
      : fs.readFileSync(`public${asset.src}`);
    const metadata = await sharp(buffer).metadata();
    const expectedRatio = asset.width / asset.height;
    const actualRatio = (metadata.width ?? 0) / (metadata.height ?? 1);
    if (Math.abs(expectedRatio - actualRatio) > 0.01) {
      hasErrors = true;
      console.error(
        `${id}: registry ${asset.width}x${asset.height}; actual ${metadata.width}x${metadata.height}`,
      );
    } else
      console.info(
        `${id}: OK ${metadata.width}x${metadata.height}, ${Math.round(buffer.length / 1024)} KB source`,
      );
  } catch (error) {
    hasErrors = true;
    console.error(`${id}: ${String(error)}`);
  }
}
const ids = Object.keys(assets);
for (let index = 0; index < ids.length; index += 4)
  await Promise.all(ids.slice(index, index + 4).map(check));
if (hasErrors) process.exitCode = 1;
