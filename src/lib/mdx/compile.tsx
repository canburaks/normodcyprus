import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement, type ReactNode } from "react";
import { getImageProps, type ImageLoaderProps } from "next/image";
import { entityAlternates, getImage } from "../content/loaders";
import { localizedPath } from "../routes/paths";
import type { Locale } from "../content/schemas";
import { mediaSizes } from "../design/layout";

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
// The standalone content validator has no Next config injection. All sources here
// resolve through the validated registry; retain Next's runtime image endpoint.
function articleImageLoader({ src, width, quality }: ImageLoaderProps) {
  return (
    "/_next/image?" + new URLSearchParams({ url: src, w: String(width), q: String(quality ?? 75) })
  );
}
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
  PhotoPair: ["left", "right"],
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
      const required =
        node.name === "Callout" ? [] : node.name === "PhotoPair" ? ["left", "right"] : ["id"];
      if (required.some((name) => !node.attributes?.some((attr) => attr.name === name)))
        throw new Error("MDX references need their required asset/entity IDs");
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
        loader: articleImageLoader,
        src: asset.src,
        width: asset.width,
        height: asset.height,
        alt: asset.alt,
        sizes: mediaSizes(),
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
  const PhotoPair = ({ left, right }: { left: string; right: string }) => (
    <div className="mdx-photo-pair">
      {[left, right].map((id) => {
        const asset = getImage(id, locale);
        const { props } = getImageProps({
          loader: articleImageLoader,
          src: asset.src,
          width: asset.width,
          height: asset.height,
          alt: asset.alt,
          sizes: mediaSizes(12, 6, 6),
        });
        return (
          <figure key={id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...props} alt={asset.alt} />
            <figcaption>{asset.alt}</figcaption>
          </figure>
        );
      })}
    </div>
  );
  return {
    html: renderToStaticMarkup(
      createElement(Content, { components: { ...components, PhotoPair } }),
    ),
    headings,
    readingMinutes: Math.max(1, Math.ceil(wordCount / 200)),
  };
}
