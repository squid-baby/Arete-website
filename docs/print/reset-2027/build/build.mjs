// Builds the print PDFs, the Cricut cut file and the proof pictures into ../out.
// Run from the repository root: node docs/print/reset-2027/build/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import * as pages from "./pages.mjs";
import { HANGER, CARD, SHEET, cutSvg } from "./spec.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, "..", "out");
const { chromium } = createRequire(import.meta.url)("playwright");
const only = process.argv.slice(2);
const want = (n) => !only.length || only.some((o) => n.includes(o));

const PDFS = [
  ["1-hanger-front.pdf", pages.frontPage, HANGER.w + 2 * HANGER.bleed, HANGER.h + 2 * HANGER.bleed],
  ["2-hanger-back.pdf", pages.backPage, HANGER.w + 2 * HANGER.bleed, HANGER.h + 2 * HANGER.bleed],
  ["3-pocket-sheet.pdf", () => pages.pocketSheetPage(false), SHEET.w, SHEET.h],
  ["4-gift-card.pdf", pages.cardPage, CARD.w + 2 * CARD.bleed, CARD.h + 2 * CARD.bleed],
];
const PICTURES = [
  ["mockup-hero.jpg", pages.heroPage, 13.6, 10.05, 2],
  ["mockup-front-assembled.png", pages.assembledFrontPage, 4.3, 9.3, 3],
  ["proof-pieces-with-lines.png", pages.proofPage, 11.9, 9.5, 2],
  ["proof-pocket-sheet-cut-overlay.png", () => pages.pocketSheetPage(true), SHEET.w, SHEET.h, 1.5],
];

fs.mkdirSync(out, { recursive: true });
const tmp = path.join(out, ".page.html");
const browser = await chromium.launch();
async function open(html, w, h, scale = 1) {
  fs.writeFileSync(tmp, html);
  const page = await browser.newPage({ viewport: { width: Math.round(w * 96), height: Math.round(h * 96) }, deviceScaleFactor: scale });
  await page.goto("file://" + tmp, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}
for (const [name, make, w, h] of PDFS) if (want(name)) {
  const page = await open(make(), w, h);
  await page.pdf({ path: path.join(out, name), width: `${w}in`, height: `${h}in`, printBackground: true, preferCSSPageSize: true });
  await page.close(); console.log("wrote", name);
}
for (const [name, make, w, h, scale] of PICTURES) if (want(name)) {
  const page = await open(make(), w, h, scale);
  await page.screenshot({ path: path.join(out, name), type: name.endsWith(".jpg") ? "jpeg" : "png", ...(name.endsWith(".jpg") ? { quality: 90 } : {}) });
  await page.close(); console.log("wrote", name);
}
if (want("cricut")) { fs.writeFileSync(path.join(out, "3-pocket-cricut-cut-score.svg"), cutSvg()); console.log("wrote 3-pocket-cricut-cut-score.svg"); }
await browser.close();
fs.rmSync(tmp, { force: true });
