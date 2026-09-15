import fs from "node:fs";
import path from "node:path";
import type { z } from "zod";
import { localeSchema, type Locale } from "./schemas";

export function readJson<T>(relativePath: string, schema?: z.ZodType<T>): T {
  if (relativePath.includes("..")) throw new Error(`Unsafe content path: ${relativePath}`);
  const filename = relativePath.startsWith("content/")
    ? path.join(process.cwd(), "content", relativePath.slice("content/".length))
    : relativePath.startsWith("public/locales/")
      ? path.join(process.cwd(), "public", "locales", relativePath.slice("public/locales/".length))
      : null;
  if (!filename) throw new Error(`Unregistered content directory: ${relativePath}`);
  const value: unknown = JSON.parse(fs.readFileSync(filename, "utf8"));
  if (!schema) return value as T;
  const parsed = schema.safeParse(value);
  if (!parsed.success) throw new Error(`${relativePath}: ${parsed.error.message}`);
  return parsed.data;
}
export function readLocale<T>(locale: Locale, namespace: string, schema?: z.ZodType<T>) {
  return readJson(`public/locales/${locale}/${namespace}.json`, schema);
}
export function recordIds(folder: string) {
  return fs
    .readdirSync(path.join(process.cwd(), "content", folder))
    .filter((name) => name.endsWith(".json"))
    .map((name) => name.slice(0, -5))
    .sort();
}
export function getLocale(locale?: string): Locale {
  return localeSchema.parse(locale ?? localeSchema.enum.tr);
}
