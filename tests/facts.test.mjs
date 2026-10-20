// Checks that hours, prices and the new gift card and Carrboro pages agree
// everywhere on the site. AI assistants skip or repeat wrong facts when the
// site says different things in different places.
//
// Run with:  node --test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => readFileSync(join(root, f), "utf8");
const htmlPages = readdirSync(root).filter((f) => f.endsWith(".html"));

const jsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

// Confirmed by Jen, October 2026.
const HOURS = [
  { dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:30" },
  { dayOfWeek: ["Saturday", "Sunday"], opens: "10:00", closes: "16:00" },
];

// Lowest price on each service page (the "from" price), as shown to visitors.
const FROM_PRICES = {
  "Float Therapy": "65", "Infrared Sauna": "30", "Contrast Therapy": "50",
  "Massage": "125", "Red Light Therapy": "35", "Halotherapy": "10",
};

for (const page of htmlPages) {
  const business = jsonLd(read(page)).find((d) => d["@id"] === "https://floatarete.com/#business");
  if (!business) continue;

  test(`${page}: business schema has the confirmed hours`, () => {
    const hours = business.openingHoursSpecification.map(({ dayOfWeek, opens, closes }) => ({
      dayOfWeek: [dayOfWeek].flat(), opens, closes,
    }));
    assert.deepEqual(hours, HOURS);
  });

  test(`${page}: business schema prices match the service pages`, () => {
    for (const offer of business.hasOfferCatalog?.itemListElement ?? []) {
      const name = offer.itemOffered.name;
      if (name in FROM_PRICES) assert.equal(offer.price, FROM_PRICES[name], name);
    }
  });
}

test("FAQ and About pages show the confirmed hours", () => {
  for (const f of ["faq.jsx", "about.jsx"]) {
    const src = read(f);
    assert.match(src, /<h4>Tue–Fri<\/h4><p>10 AM – 6:30 PM<\/p>/, f);
    assert.match(src, /<h4>Sat–Sun<\/h4><p>10 AM – 4 PM<\/p>/, f);
    assert.match(src, /<h4>Monday<\/h4><p>Closed<\/p>/, f);
    assert.doesNotMatch(src, /9 AM|8 PM|9 PM|By appointment/, f);
  }
});

test("llms.txt has the confirmed hours and no old ones", () => {
  const llms = read("llms.txt");
  assert.match(llms, /Tuesday–Friday 10 AM – 6:30 PM; Saturday–Sunday 10 AM – 4 PM; closed Monday/);
  assert.doesNotMatch(llms, /9 AM|8 PM|9 PM/);
});

test("the FAQ answers about hours, prices, couples and gift cards", () => {
  const faq = read("faq.html");
  const groups = JSON.parse(faq.match(/id="faq-data">([\s\S]*?)<\/script>/)[1]);
  const questions = groups.flatMap((g) => g.items.map((i) => i.q)).join("\n");
  for (const topic of [/hours/i, /cost/i, /two people/i, /gift cards expire/i, /near Chapel Hill/i]) {
    assert.match(questions, topic);
  }
});

for (const page of ["gift-cards.html", "visit-carrboro.html"]) {
  test(`${page}: has an H1, a question H2, FAQ schema, and is listed for crawlers`, () => {
    const html = read(page);
    assert.match(html, /<h1[^>]*>/);
    assert.match(html, /<h2>[^<]*\?<\/h2>/, "no question-style H2");
    const faq = jsonLd(html).find((d) => d["@type"] === "FAQPage");
    assert.ok(faq && faq.mainEntity.length >= 4, "FAQPage schema missing or short");
    assert.match(read("sitemap.xml"), new RegExp(`<loc>https://floatarete.com/${page}</loc>`));
    assert.match(read("llms.txt"), new RegExp(`https://floatarete.com/${page}`));
    assert.doesNotMatch(html, /9 AM|8 PM|9 PM/);
  });
}

test("gift card page states the gift card terms and links to Boulevard", () => {
  const html = read("gift-cards.html");
  assert.match(html, /one year/);
  assert.match(html, /email right away/);
  assert.match(html, /printed gift card in an envelope/);
  assert.match(html, /joinblvd\.com\/b\/[^"]+GIFT_CARD/);
  const product = jsonLd(html).find((d) => d["@type"] === "Product");
  assert.equal(product.offers.seller["@id"], "https://floatarete.com/#business");
});
