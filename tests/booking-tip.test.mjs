// Checks that the packages and memberships pages tell buyers to book in the
// same Boulevard window. Boulevard signs people out when the window closes,
// so this note keeps them from having to sign in twice.
//
// Run with:  node --test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (...p) => readFileSync(join(...p), "utf8");

for (const page of ["packages", "memberships"]) {
  test(`${page}: top of page tells buyers to book in the same window`, () => {
    const html = read(root, `${page}.jsx`);
    assert.match(html, /after you buy, pick your day and time in the same booking window/);
  });

  test(`${page}: ground rules explain the sign-in again problem`, () => {
    const html = read(root, `${page}.jsx`);
    assert.match(html, /If you close the window first, Boulevard asks you to sign in again\./);
  });
}
