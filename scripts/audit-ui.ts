import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

function sourceFiles(folder: string): string[] {
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const filename = path.join(folder, entry.name);
    return entry.isDirectory()
      ? sourceFiles(filename)
      : filename.endsWith(".tsx")
        ? [filename]
        : [];
  });
}
const failures: string[] = [];
for (const filename of sourceFiles("src")) {
  const source = ts.createSourceFile(
    filename,
    fs.readFileSync(filename, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let namespace: string | undefined;
  function findNamespace(node: ts.Node) {
    if (ts.isCallExpression(node) && node.expression.getText(source) === "useTranslation") {
      const argument = node.arguments[0];
      const first =
        argument && ts.isArrayLiteralExpression(argument) ? argument.elements[0] : argument;
      if (first && ts.isStringLiteral(first)) namespace = first.text;
    }
    ts.forEachChild(node, findNamespace);
  }
  findNamespace(source);
  function fail(node: ts.Node, message: string) {
    const position = source.getLineAndCharacterOfPosition(node.getStart(source));
    failures.push(`${filename}:${position.line + 1}: ${message}`);
  }
  function visit(node: ts.Node) {
    if (ts.isJsxText(node) && /\p{L}/u.test(node.text))
      fail(node, "Visible text must come from JSON");
    if (
      ts.isJsxExpression(node) &&
      node.expression &&
      ts.isStringLiteral(node.expression) &&
      /\p{L}/u.test(node.expression.text)
    )
      fail(node, "Visible text expressions must come from JSON");
    if (
      namespace &&
      ts.isCallExpression(node) &&
      node.expression.getText(source) === "t" &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      const key = node.arguments[0].text;
      let selectedNamespace = namespace;
      const options = node.arguments[1];
      if (options && ts.isObjectLiteralExpression(options)) {
        const override = options.properties.find(
          (property) => ts.isPropertyAssignment(property) && property.name.getText(source) === "ns",
        );
        if (
          override &&
          ts.isPropertyAssignment(override) &&
          ts.isStringLiteral(override.initializer)
        )
          selectedNamespace = override.initializer.text;
      }
      for (const locale of ["tr", "en"]) {
        const data = JSON.parse(
          fs.readFileSync(`public/locales/${locale}/${selectedNamespace}.json`, "utf8"),
        );
        const lookup = (candidate: string) =>
          candidate.split(".").reduce((value, part) => value?.[part], data);
        const hasTranslation = [key, `${key}_one`, `${key}_other`].some(
          (candidate) => typeof lookup(candidate) === "string" && lookup(candidate).trim(),
        );
        if (!hasTranslation) fail(node, `Missing ${locale}/${selectedNamespace}:${key}`);
      }
    }
    if (
      ts.isJsxAttribute(node) &&
      ["aria-label", "placeholder", "title", "alt"].includes(node.name.getText(source)) &&
      node.initializer &&
      ts.isStringLiteral(node.initializer) &&
      node.initializer.text
    ) {
      fail(node, "Accessible and visible labels must come from JSON");
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else console.info("UI audit passed: no hard-coded JSX prose or accessible labels.");
