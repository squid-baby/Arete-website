// Checks the build step (scripts/build.mjs) and the files that search engines
// and AI assistants read: robots.txt, sitemap.xml, llms.txt.
//
// Run with:  node --test
import { test, before } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { build, loadBookingRoutes, rewriteFloatHelmLinks } from "../scripts/build.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const read = (...p) => readFileSync(join(...p), "utf8");

// Pages that are drawn by React in the browser (they have an empty #root).
const reactPages = readdirSync(root).filter(
  (f) => f.endsWith(".html") && read(root, f).includes('type="text/babel"'),
);

// The words a crawler sees when it does not run JavaScript.
const visibleWords = (html) =>
  html
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

let built;
before(() => {
  built = build();
});

test("every React page is built", () => {
  assert.ok(reactPages.length >= 13, `expected 13+ React pages, found ${reactPages.length}`);
  assert.deepEqual([...built].sort(), [...reactPages].sort());
});

for (const page of reactPages) {
  test(`${page}: text and H1 are in the HTML without JavaScript`, () => {
    const html = read(dist, page);
    assert.match(html, /<h1[\s>]/, "no <h1> in the built HTML");
    const words = visibleWords(html);
    assert.ok(words >= 250, `only ${words} words readable without JavaScript`);
  });

  test(`${page}: ships compiled scripts, not the Babel compiler`, () => {
    const html = read(dist, page);
    assert.doesNotMatch(html, /@babel\/standalone/);
    assert.doesNotMatch(html, /type="text\/babel"/);
    for (const [, src] of html.matchAll(/<script src="([^"?]+\.js)\?v=/g)) {
      assert.ok(statSync(join(dist, src)).size > 0, `${src} is missing from dist/`);
    }
  });

  test(`${page}: keeps its structured data`, () => {
    const src = read(root, page);
    const html = read(dist, page);
    const count = (s) => (s.match(/application\/ld\+json/g) ?? []).length;
    assert.ok(count(html) >= count(src), "a JSON-LD block was lost");
    for (const [, json] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      assert.doesNotThrow(() => JSON.parse(json), "JSON-LD is not valid JSON");
    }
  });
}

test("no built page links to the old FloatHelm booking site", () => {
  const files = readdirSync(dist, { recursive: true }).filter((f) => f.endsWith(".html"));
  for (const f of files) assert.doesNotMatch(read(dist, f), /floathelm\.com/, f);
});

test("FloatHelm links become the matching Boulevard links", () => {
  const routes = loadBookingRoutes();
  const out = rewriteFloatHelmLinks('<a href="https://aretefloattank.floathelm.com/store/giftcards">', routes);
  assert.equal(out, `<a href="${routes.widget}?path=%2Fcart%2Fmenu%2FGift%20Cards%2FGIFT_CARD">`);
  const unknown = rewriteFloatHelmLinks('href="https://aretefloattank.floathelm.com/booking"', routes);
  assert.equal(unknown, `href="${routes.widget}"`);
});

test("FAQ page has FAQPage schema in the HTML, one entry per question", () => {
  const src = read(root, "faq.html");
  const groups = JSON.parse(src.match(/<script[^>]*id="faq-data"[^>]*>([\s\S]*?)<\/script>/)[1]);
  const questions = groups.flatMap((g) => g.items);
  const html = read(dist, "faq.html");
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json" id="__faq-schema">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema["@type"], "FAQPage");
  assert.equal(schema.mainEntity.length, questions.length);
});

test("project files are not published", () => {
  const published = readdirSync(dist);
  for (const f of ["node_modules", "scripts", "tests", "docs", "package.json", "AGENTS.md", "README.md"]) {
    assert.ok(!published.includes(f), `${f} should not be in dist/`);
  }
  for (const f of ["_redirects", "robots.txt", "sitemap.xml", "llms.txt"]) {
    assert.ok(published.includes(f), `${f} must be in dist/`);
  }
});

test("robots.txt welcomes AI assistants and lists the sitemap", () => {
  const robots = read(root, "robots.txt");
  for (const bot of ["GPTBot", "OAI-SearchBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "meta-webindexer"]) {
    assert.match(robots, new RegExp(`^User-agent: ${bot}$`, "m"), `${bot} not named`);
  }
  assert.doesNotMatch(robots, /^Disallow: \/$/m, "something blocks the whole site");
  assert.match(robots, /^Sitemap: https:\/\/floatarete\.com\/sitemap\.xml$/m);
});

test("sitemap, llms.txt and canonicals use the final URLs, not ones that redirect", () => {
  const redirected = /floatarete\.com\/(Massage\.html|Contrast-Therapy\.html|home\.html)/;
  assert.doesNotMatch(read(root, "sitemap.xml"), redirected);
  assert.doesNotMatch(read(root, "llms.txt"), redirected);
  for (const f of readdirSync(root).filter((f) => f.endsWith(".html"))) {
    const canonical = read(root, f).match(/rel="canonical" href="([^"]+)"/);
    if (canonical) assert.doesNotMatch(canonical[1], redirected, f);
  }
});

test("every canonical page is in the sitemap", () => {
  const sitemap = read(root, "sitemap.xml");
  for (const f of readdirSync(root).filter((f) => f.endsWith(".html"))) {
    const canonical = read(root, f).match(/rel="canonical" href="([^"]+)"/);
    if (canonical) assert.ok(sitemap.includes(`<loc>${canonical[1]}</loc>`), `${canonical[1]} (${f}) missing`);
  }
});

test("home page images have alt text and are small", () => {
  const home = read(root, "home.jsx");
  for (const [tag] of home.matchAll(/<img [^>]*>/g)) {
    assert.doesNotMatch(tag, /alt=""/, `empty alt: ${tag}`);
  }
  for (const [, src] of home.matchAll(/src="(assets\/[^"?]+)/g)) {
    const kb = statSync(join(root, src)).size / 1024;
    assert.ok(kb < 400, `${src} is ${Math.round(kb)} KB`);
  }
  assert.ok(statSync(join(root, "assets/arete-logo.png")).size < 200 * 1024, "logo is over 200 KB");
});
