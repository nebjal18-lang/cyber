import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const english = JSON.parse(
  readFileSync(new URL("../src/locales/en.json", import.meta.url), "utf8"),
);
const products = JSON.parse(
  readFileSync(new URL("../src/catalog.json", import.meta.url), "utf8"),
);
test("les vingt-et-une fiches sont complètes en français et en anglais", () => {
  assert.equal(products.length, 21);
  assert.equal(new Set(products.map((p) => p.id)).size, 21);
  for (const product of products) {
    assert.ok(["cyber", "datacenter", "telecom"].includes(product.category));
    assert.equal(product.url, undefined);
    for (const lang of ["fr", "en"]) {
      for (const field of [
        "name",
        "label",
        "text",
        "best",
        "overview",
        "example",
        "licensing",
      ])
        assert.ok(
          product[lang][field].length > 10,
          `${product.id} ${lang} ${field}`,
        );
      assert.ok(product[lang].overview.length > 200);
      for (const field of ["tags", "capabilities", "prerequisites"])
        assert.ok(product[lang][field].length >= 3);
    }
  }
});
test("la traduction anglaise couvre les textes de l’interface et des données dynamiques", () => {
  const file = new URL("../src/main.tsx", import.meta.url);
  const src = readFileSync(file, "utf8");
  const ast = ts.createSourceFile(
    "main.tsx",
    src,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const required = new Set();
  const identical = new Set(["+221…", "14.7167° N   17.4677° W", "Cloud"]);
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(ast) === "t" &&
      node.arguments.length &&
      ts.isStringLiteral(node.arguments[0])
    )
      required.add(node.arguments[0].text);
    if (
      ts.isPropertyAssignment(node) &&
      ["q", "a", "n", "title", "text", "t", "name"].includes(
        node.name.getText(ast),
      ) &&
      ts.isStringLiteral(node.initializer)
    )
      required.add(node.initializer.text);
    ts.forEachChild(node, visit);
  }
  visit(ast);
  for (const key of required)
    assert.ok(
      english[key] || identical.has(key),
      `Traduction manquante : ${key}`,
    );
});
