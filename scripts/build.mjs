// Build step for Netlify. Netlify runs `npm run build` and publishes dist/.
//
// The source pages stay the same: each *.html loads React and its *.jsx file.
// This script makes a copy of the site in dist/ and changes each React page so:
//   1. The page text is already in the HTML file (search engines and AI tools
//      that do not run JavaScript can read it).
//   2. The *.jsx files are compiled ahead of time, so visitors do not download
//      the Babel compiler (about 650 KB) and the page shows faster.
//   3. Schema that the page made in the browser (FAQPage, Person) is written
//      into the HTML file.
//   4. Old FloatHelm links point straight to Boulevard.
//
// Run locally with:  npm run build
import { readFileSync, writeFileSync, rmSync, mkdirSync, cpSync, readdirSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import vm from "node:vm";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const babel = require("@babel/core");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

// Files and folders that are for the project, not for site visitors.
const NOT_PUBLISHED = new Set([
  ".git", ".gitignore", ".claude", ".netlify", "node_modules", "dist", "scripts", "tests", "docs",
  "package.json", "package-lock.json", "netlify.toml", "README.md", "AGENTS.md",
]);

const BABEL_TAG = /\s*<script[^>]*@babel\/standalone[^>]*><\/script>/;
const BABEL_SCRIPT = /<script type="text\/babel" src="([^"?]+)(?:\?[^"]*)?"><\/script>/g;
const ROOT_DIV = '<div id="root"></div>';

// ---------- FloatHelm → Boulevard link table (read from booking-notice.js) ----------
export function loadBookingRoutes(src = readFileSync(join(root, "booking-notice.js"), "utf8")) {
  const businessId = src.match(/BUSINESS_ID = "([^"]+)"/)[1];
  const table = src.match(/LEGACY_PATHS = (\{[\s\S]*?\});/)[1];
  return { widget: `https://www.joinblvd.com/b/${businessId}/widget`, paths: JSON.parse(table) };
}

export function rewriteFloatHelmLinks(html, routes) {
  return html.replace(/https:\/\/aretefloattank\.floathelm\.com(\/[^"'\s<>]*)?/g, (_, path = "/") => {
    const target = routes.paths[path];
    if (!target) return routes.widget;
    const visit = target.includes("/s_") ? "&amp;visitType=SELF_VISIT" : "";
    return `${routes.widget}?path=${encodeURIComponent(target)}${visit}`;
  });
}

// ---------- A small stand-in for the browser, enough to render once ----------
function fakeElement(tag, textContent = "") {
  return {
    tagName: tag.toUpperCase(), id: "", type: "", textContent, style: {}, dataset: {},
    classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
    setAttribute() {}, getAttribute: () => null, appendChild(child) { return child; },
    addEventListener() {}, removeEventListener() {}, querySelector: () => null, querySelectorAll: () => [],
  };
}

function fakeBrowser(html) {
  // Inline <script id="..."> blocks hold page data (FAQ, team, blog posts).
  const dataBlocks = {};
  for (const m of html.matchAll(/<script[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/script>/g)) {
    dataBlocks[m[1]] = m[2];
  }
  const headTags = [];
  let rendered = null;
  const head = fakeElement("head");
  head.appendChild = (el) => { headTags.push(el); return el; };
  const document = {
    ...fakeElement("document"),
    head, body: fakeElement("body"), documentElement: fakeElement("html"),
    getElementById: (id) => {
      const made = headTags.find((t) => t.id === id);
      if (made) return made;
      return id in dataBlocks ? fakeElement("script", dataBlocks[id]) : null;
    },
    createElement: (tag) => fakeElement(tag),
  };
  const noop = () => {};
  const window = {
    document, React,
    ReactDOM: { createRoot: () => ({ render: (el) => { rendered = el; } }) },
    matchMedia: () => ({ matches: false, addEventListener: noop, removeEventListener: noop, addListener: noop, removeListener: noop }),
    location: { href: "https://floatarete.com/", pathname: "/", search: "", hash: "" },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    addEventListener: noop, removeEventListener: noop, postMessage: noop,
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
    requestAnimationFrame: () => 0, cancelAnimationFrame: noop,
    IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} },
    MutationObserver: class { observe() {} disconnect() {} },
    navigator: { userAgent: "node" }, innerWidth: 1280, innerHeight: 800, scrollY: 0,
    console, URL, URLSearchParams, JSON, Math, Date,
  };
  window.window = window;
  window.self = window;
  window.parent = window;
  window.top = window;
  return { window, headTags, getRendered: () => rendered };
}

export function compileJsx(src, filename) {
  return babel.transformSync(src, {
    filename, babelrc: false, configFile: false, compact: false,
    presets: [["@babel/preset-react", { runtime: "classic" }]],
  }).code;
}

// Render one page: run its compiled scripts against the fake browser.
export function renderPage(html, compiled) {
  const { window, headTags, getRendered } = fakeBrowser(html);
  const context = vm.createContext(window);
  for (const [name, code] of compiled) vm.runInContext(code, context, { filename: name });
  const app = getRendered();
  if (!app) throw new Error("page script did not call ReactDOM.createRoot().render()");
  const markup = ReactDOMServer.renderToStaticMarkup(app);

  // The FAQ and About pages build their schema in the browser. Build it now too.
  const data = (name) => { try { return JSON.parse(window.document.getElementById(name)?.textContent || "[]"); } catch { return []; } };
  if (typeof context.injectFaqSchema === "function") context.injectFaqSchema(data("faq-data"));
  if (typeof context.injectPeopleSchema === "function") context.injectPeopleSchema(data("team-data"));
  const schema = headTags
    .filter((t) => t.type === "application/ld+json" && t.textContent)
    .map((t) => `  <script type="application/ld+json" id="${t.id}">\n${t.textContent}\n  </script>`)
    .join("\n");
  return { markup, schema };
}

const hash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 10);

export function build() {
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist);
  for (const name of readdirSync(root)) {
    if (NOT_PUBLISHED.has(name) || name.endsWith(".md")) continue;
    cpSync(join(root, name), join(dist, name), { recursive: true });
  }

  const compiled = new Map();
  for (const name of readdirSync(root).filter((f) => f.endsWith(".jsx"))) {
    const code = compileJsx(readFileSync(join(root, name), "utf8"), name);
    const out = name.replace(/\.jsx$/, ".js");
    writeFileSync(join(dist, out), code);
    compiled.set(name, { out, code, version: hash(code) });
  }

  const routes = loadBookingRoutes();
  const pages = [];
  for (const name of readdirSync(root).filter((f) => f.endsWith(".html"))) {
    let html = readFileSync(join(root, name), "utf8");
    const scripts = [...html.matchAll(BABEL_SCRIPT)].map((m) => basename(m[1]));
    if (!scripts.length) continue;
    if (!html.includes(ROOT_DIV)) throw new Error(`${name}: no empty <div id="root"> to fill`);

    const { markup, schema } = renderPage(html, scripts.map((s) => [s, compiled.get(s).code]));
    html = html
      .replace(BABEL_TAG, "")
      .replace(BABEL_SCRIPT, (_, src) => {
        const c = compiled.get(basename(src));
        return `<script src="${c.out}?v=${c.version}"></script>`;
      })
      .replace(ROOT_DIV, () => `<div id="root">${markup}</div>`)
      // Content that fades in on scroll must still show when JavaScript is off.
      .replace("</head>", () => `${schema ? schema + "\n" : ""}  <noscript><style>.reveal{opacity:1!important;transform:none!important}</style></noscript>\n</head>`);
    writeFileSync(join(dist, name), html);
    pages.push(name);
  }

  // Every published page (blog posts too) links straight to Boulevard.
  const htmlFiles = readdirSync(dist, { recursive: true }).filter((f) => f.endsWith(".html"));
  for (const name of htmlFiles) {
    const file = join(dist, name);
    writeFileSync(file, rewriteFloatHelmLinks(readFileSync(file, "utf8"), routes));
  }
  return pages;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const pages = build();
  console.log(`Built ${pages.length} pages into dist/: ${pages.join(", ")}`);
}
