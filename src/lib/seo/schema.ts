export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
export type SchemaNode = Record<string, unknown>;
