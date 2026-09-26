import { test } from "node:test";
import assert from "node:assert/strict";
import { HOOK_STYLES, systemFor } from "./playbook.ts";

test("every task gets the base brief and hooks go where scripts are written", () => {
  for (const task of ["concepts", "script", "beats", "package"] as const) {
    const s = systemFor(task);
    assert.ok(s.includes("faceless AI content") && s.includes("HOOKS"), task);
  }
  assert.ok(!systemFor("sets").includes("HOOKS"));
});

test("tool craft follows the tool", () => {
  assert.ok(systemFor("beats", "ugc").includes("UGC STYLE") && systemFor("beats", "ugc").includes("PERFORMANCE ADS"));
  assert.ok(systemFor("beats", "commercial").includes("COMMERCIAL CRAFT"));
  assert.ok(systemFor("beats", "transition").includes("TRANSFORMATION CRAFT"));
  assert.ok(!systemFor("beats", "transition").includes("UGC STYLE"));
  assert.ok(systemFor("character").includes("CHARACTER DESIGN"));
});

test("hook styles are unique and listed in the playbook", () => {
  assert.equal(new Set(HOOK_STYLES).size, HOOK_STYLES.length);
  for (const h of HOOK_STYLES) assert.ok(systemFor("concepts").includes(h));
});
