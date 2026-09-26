import { test } from "node:test";
import assert from "node:assert/strict";
import { VAULT, VAULT_CATEGORIES, fillPrompt } from "./vault.ts";

test("every prompt has a unique id and a known category", () => {
  assert.equal(new Set(VAULT.map((v) => v.id)).size, VAULT.length);
  for (const v of VAULT) assert.ok((VAULT_CATEGORIES as readonly string[]).includes(v.category), v.id);
});

test("placeholders fill from the library and fall back to generics", () => {
  const p = "{character} holds {product} in {set}. {character} smiles.";
  assert.equal(fillPrompt(p, { character: "Zara", product: "Glow Drops", set: "the kitchen" }), "Zara holds Glow Drops in the kitchen. Zara smiles.");
  assert.ok(!/[{}]/.test(fillPrompt(p, {})));
});

test("no unknown placeholders", () => {
  for (const v of VAULT) assert.ok(!/[{}]/.test(fillPrompt(v.prompt, {})), v.id);
});
