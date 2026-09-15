import fs from "node:fs";
import YAML from "yaml";

const source = fs.readFileSync("DESIGN.md", "utf8").split("---")[1];
const tokens = YAML.parse(source) as Record<string, unknown>;
const declarations: string[] = [];
function flatten(value: unknown, path: string[]) {
  if (value && typeof value === "object")
    Object.entries(value).forEach(([key, item]) =>
      flatten(item, [...path, key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)]),
    );
  else declarations.push(`  --design-${path.join("-")}: ${value};`);
}
for (const key of [
  "colors",
  "typography",
  "rounded",
  "spacing",
  "responsive",
  "font-fallbacks",
  "motion",
  "geometry",
])
  flatten(tokens[key], [key]);
fs.mkdirSync("src/styles/generated", { recursive: true });
fs.writeFileSync(
  "src/styles/generated/layout.json",
  JSON.stringify({ responsive: tokens.responsive, geometry: tokens.geometry }, null, 2) + "\n",
);
fs.writeFileSync(
  "src/styles/generated/tokens.css",
  `/* Generated from DESIGN.md. Run pnpm design:generate. */\n:root {\n${declarations.join("\n")}\n}\n`,
);
console.info(`Generated ${declarations.length} design tokens.`);
