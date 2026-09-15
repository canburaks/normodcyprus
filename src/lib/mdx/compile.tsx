import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement, type ReactNode } from "react";
import { getImageProps } from "next/image";
import { entityAlternates, getImage } from "../content/loaders";
import { localizedPath } from "../routes/paths";
import type { Locale } from "../content/schemas";

type Node = {
  type: string;
  value?: string;
  name?: string;
  depth?: number;
  url?: string;
  attributes?: { type: string; name?: string; value?: unknown }[];
  children?: Node[];
  data?: { hProperties?: Record<string, string> };
};
const allowedNodes = new Set([
  "root",
  "paragraph",
  "text",
  "heading",
  "emphasis",
  "strong",
  "delete",
  "blockquote",
  "list",
  "listItem",
  "thematicBreak",
  "break",
  "inlineCode",
  "link",
  "mdxJsxFlowElement",
  "mdxJsxTextElement",
]);
const allowedComponents: Record<string, string[]> = {
  Callout: [],
  Figure: ["id"],
  ProductLink: ["id"],
  CollectionLink: ["id"],
};
function nodeText(node: Node): string {
  return node.value ?? node.children?.map(nodeText).join("") ?? "";
}
export function validateMdxTree(tree: Node) {
  function visit(node: Node) {
    if (!allowedNodes.has(node.type)) throw new Error(`Unsupported MDX construct: ${node.type}`);
    if (node.type === "heading" && (node.depth === 1 || (node.depth ?? 0) > 3))
      throw new Error("Article headings must use levels 2 or 3");
    if (node.type === "link" && !/^(https:\/\/|mailto:|\/(?!\/)|#)/.test(node.url ?? ""))
      throw new Error("Unsafe article link");
    if (node.type.startsWith("mdxJsx")) {
      if (!node.name || !Object.hasOwn(allowedComponents, node.name))
        throw new Error(`Unregistered MDX component: ${node.name}`);
      for (const attr of node.attributes ?? []) {
        if (
          attr.type !== "mdxJsxAttribute" ||
          !attr.name ||
          !allowedComponents[node.name].includes(attr.name) ||
          typeof attr.value !== "string" ||
          !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(attr.value)
        )
          throw new Error("MDX attributes must be allowlisted literal IDs");
      }
      if (node.name !== "Callout" && !node.attributes?.some((attr) => attr.name === "id"))
        throw new Error("MDX references need an id");
    }
    node.children?.forEach(visit);
  }
  visit(tree);
}
export async function compileArticle(lines: string[], locale: Locale) {
  const headings: { id: string; title: string }[] = [];
  let wordCount = 0;
  function validatePlugin() {
    return (tree: Node) => {
      validateMdxTree(tree);
      wordCount = nodeText(tree).split(/\s+/).filter(Boolean).length;
      function visit(node: Node) {
        if (node.type === "heading") {
          const title = nodeText(node),
            id = `section-${headings.length + 1}`;
          headings.push({ id, title });
          node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
        }
        node.children?.forEach(visit);
      }
      visit(tree);
    };
  }
  const { default: Content } = await evaluate(lines.join("\n\n"), {
    ...runtime,
    remarkPlugins: [validatePlugin],
  });
  const components = {
    Callout: ({ children }: { children: ReactNode }) => <aside>{children}</aside>,
    Figure: ({ id }: { id: string }) => {
      const asset = getImage(id, locale);
      const { props } = getImageProps({
        src: asset.src,
        width: asset.width,
        height: asset.height,
        alt: asset.alt,
        sizes: "(min-width: 768px) 660px, 90vw",
      });
      // Next's getImageProps supplies optimized src/srcSet; this build-only render has no image runtime.
      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...props} alt={asset.alt} />
          <figcaption>{asset.alt}</figcaption>
        </figure>
      );
    },
    ProductLink: ({ id, children }: { id: string; children: ReactNode }) => (
      <a href={localizedPath(entityAlternates("products", id)[locale], locale)}>{children}</a>
    ),
    CollectionLink: ({ id, children }: { id: string; children: ReactNode }) => (
      <a href={localizedPath(entityAlternates("collections", id)[locale], locale)}>{children}</a>
    ),
  };
  return {
    html: renderToStaticMarkup(createElement(Content, { components })),
    headings,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
  };
}
