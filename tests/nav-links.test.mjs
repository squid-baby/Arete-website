// Checks that every page's menu carries the "Decor" link to decorbyarete.com
// and that it opens in a new browser tab. The menu is copied into each page
// file by hand, so this test catches a page that was missed or edited apart.
//
// Run with:  node --test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DECOR_URL = "https://decorbyarete.com";

// Every file that renders the site menu. tweaks-panel.jsx is a design tool, not a page.
const pages = [
  ...readdirSync(root).filter((f) => f.endsWith(".jsx") && f !== "tweaks-panel.jsx"),
  "privacy.html",
  "terms.html",
  ...readdirSync(join(root, "blog"))
    .filter((f) => f.endsWith(".html"))
    .map((f) => join("blog", f)),
];

// A menu link sits alone on its line. Footer links are wrapped in <li>, so they do not match.
const menuLinkLines = (src, label) =>
  src.match(new RegExp(`^\\s*<a [^>]*>${label}</a>\\s*$`, "gm")) ?? [];

test("every page has at least one menu", () => {
  assert.ok(pages.length >= 20, `expected 20+ page files, found ${pages.length}`);
});

for (const page of pages) {
  test(`${page}: each menu has a Decor link next to About`, () => {
    const src = readFileSync(join(root, page), "utf8");
    const about = menuLinkLines(src, "About");
    const decor = menuLinkLines(src, "Decor");
    assert.ok(about.length > 0, "no About menu link found, so the menu shape changed");
    assert.equal(decor.length, about.length, "Decor and About must appear in the same menus");
  });

  test(`${page}: Decor link points to decorbyarete.com and opens a new tab`, () => {
    const src = readFileSync(join(root, page), "utf8");
    for (const line of menuLinkLines(src, "Decor")) {
      assert.match(line, /target="_blank"/, `missing target="_blank": ${line.trim()}`);
      assert.match(line, /rel="noopener noreferrer"/, `missing rel: ${line.trim()}`);
      const literal = line.includes(`href="${DECOR_URL}"`);
      const viaConst =
        line.includes("href={DECOR_URL}") && src.includes(`const DECOR_URL = "${DECOR_URL}";`);
      assert.ok(literal || viaConst, `href does not resolve to ${DECOR_URL}: ${line.trim()}`);
    }
  });
}
