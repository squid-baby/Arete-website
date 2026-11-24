// Checks the Holiday 2026 door-hanger page (/holiday): the printed QR code
// address works, every button goes to a real destination, the copy matches
// the approved offer, nothing from other campaigns leaks in, and the
// analytics never send personal data.
//
// Run with:  node --test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => readFileSync(join(root, f), "utf8");
const html = read("holiday.html");
const script = read("holiday.js");
const text = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1].replace(/&amp;/g, "&"));

// Run holiday.js in a stand-in browser and record what it sends to Google Analytics.
function load(search = "", withDocument = true) {
  const sent = [];
  const listeners = {};
  const window = {
    location: { search },
    gtag: (kind, name, props) => sent.push({ kind, name, props }),
    addEventListener: (name, fn, capture) => { listeners[name] = { fn, capture }; },
    document: withDocument ? { querySelector: () => null, querySelectorAll: () => [] } : undefined,
    URLSearchParams,
  };
  vm.runInNewContext(script, { window, URLSearchParams });
  return { api: window.AreteHoliday, sent, listeners };
}
const el = (attrs) => ({ getAttribute: (k) => (k in attrs ? attrs[k] : null) });
const { CONFIG } = load("", false).api;

test("the printed address /holiday serves the page and keeps the UTM values", () => {
  assert.match(read("_redirects"), /^\/holiday\s+\/holiday\.html\s+200$/m);
  assert.match(html, /<link rel="canonical" href="https:\/\/floatarete\.com\/holiday" \/>/);
  assert.match(html, /<meta name="robots" content="noindex,follow" \/>/);
  assert.equal(CONFIG.slug, "holiday");
  assert.equal(CONFIG.campaign_id, "holiday2026");
});

test("approved copy is on the page, word for word", () => {
  for (const line of [
    "A little something for our neighbors",
    "Give the gift of the perfect shift.",
    "Give yourself (or someone you love) space to slow down, reset, and return to what feels good.",
    "A little gift for you.",
    "Bring this in for 25% off retail.",
    "Bring your holiday offer card to the studio when you shop.",
    "Find what’s right for you.",
    "Let them choose what feels right.",
    "Good things to take home.",
    "A sanctuary for rest, recovery and renewal.",
    "A little more room for yourself, and the people you love.",
  ]) assert.ok(text.includes(line), `missing: ${line}`);
  assert.match(html, /<h1[^>]*>Give the gift of <span[^>]*>the perfect shift\.<\/span><\/h1>/);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
});

test("no other campaign leaks in: no RESET code, membership deal, deadline or Black Friday popup", () => {
  assert.doesNotMatch(text, /\bRESET\b/, "the New Year code");
  assert.doesNotMatch(text, /January 31|first membership month|Black ?Friday|A Year of Possibility/i);
  assert.doesNotMatch(html, /black-friday\.(js|css)|\/reset/);
  assert.doesNotMatch(text, /use code|promo code|coupon code/i, "the retail offer is in person; there is no code");
});

test("brand name is spelled ARETÉ / Areté, never ARÉTÉ, ARÊTE or ARETE", () => {
  assert.doesNotMatch(text, /ARÉTÉ|ARÊTE|Arête|\bARETE\b|\bArete\b/);
  assert.match(text, /ARETÉ/);
});

test("the retail offer says it is for retail only, in person, and not for gift cards or services", () => {
  assert.match(text, /does not apply to gift cards, services or memberships/);
  assert.match(text, /in-person offer, with no online code/);
  assert.equal(CONFIG.retail_discount_percent, 25);
  assert.equal(CONFIG.retail_redemption, "in_store");
  assert.doesNotMatch(text, /expires|valid through|one per customer|minimum purchase/i, "terms not approved yet");
});

test("every gift-card button opens the same Boulevard gift-card checkout as the gift card page", () => {
  const giftLinks = hrefs.filter((h) => h.includes("GIFT_CARD"));
  assert.ok(giftLinks.length >= 4, "hero, gift section, close and phone bar");
  for (const h of giftLinks) assert.equal(h, CONFIG.gift_card_url);
  const url = new URL(CONFIG.gift_card_url);
  const sitePage = read("gift-cards.html").match(/href="(https:\/\/www\.joinblvd\.com[^"]+GIFT_CARD)"/)[1];
  assert.equal(url.origin + url.pathname, new URL(sitePage).origin + new URL(sitePage).pathname);
  assert.equal(url.searchParams.get("path"), new URL(sitePage).searchParams.get("path"));
  assert.equal(url.searchParams.get("visitType"), "GIFT_CARD");
  // Every gift-card button is tagged for analytics.
  for (const [tag] of html.matchAll(/<a [^>]*GIFT_CARD[^>]*>/g)) assert.match(tag, /data-track="gift_card"/);
});

test("service and site links go to pages that exist", () => {
  const redirects = read("_redirects");
  for (const [service, link] of Object.entries(CONFIG.service_links)) {
    assert.ok(html.includes(`href="${link}" data-track="service" data-service="${service}"`), `${service} link`);
  }
  for (const h of hrefs) {
    if (/^(https?:|tel:|#)/.test(h)) continue;
    const path = h.split(/[?#]/)[0];
    if (path === "/") continue;
    const onDisk = existsSync(join(root, path.replace(/^\//, "")));
    const viaRule = new RegExp(`^${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s`, "m").test(redirects);
    assert.ok(onDisk || viaRule, `${h} does not exist`);
  }
  for (const id of hrefs.filter((h) => h.startsWith("#") && h !== "#book-now" && h !== "#main")) {
    assert.match(html, new RegExp(`id="${id.slice(1)}"`), `${id} has no target`);
  }
  assert.ok(hrefs.includes("#book-now"), "booking button uses the site's Boulevard booking flow");
  assert.match(html, /<script src="\/booking-notice\.js\?v=\d+"><\/script>/);
});

test("phone, address and hours match the rest of the site", () => {
  assert.ok(hrefs.includes("tel:+19196369899"));
  assert.match(text, /213 E\. Braxton Foushee St/);
  assert.match(text, /Tue–Fri 10 AM – 6:30 PM/);
  assert.match(text, /Sat–Sun 10 AM – 4 PM/);
  assert.match(text, /Closed Monday/);
  const directions = hrefs.filter((h) => h.startsWith("https://www.google.com/maps/dir/"));
  assert.ok(directions.length >= 2);
  for (const h of directions) assert.equal(new URL(h).searchParams.get("destination"), "213 E. Braxton Foushee St, Carrboro, NC 27510");
});

test("images exist, have alt text and fixed sizes (no layout jumps)", () => {
  for (const [tag] of html.matchAll(/<img [^>]*>/g)) {
    assert.match(tag, /\salt="[^"]*"/, tag);
    assert.match(tag, /\swidth="\d+"/, tag);
    assert.match(tag, /\sheight="\d+"/, tag);
    const src = tag.match(/src="([^"?]+)/)[1];
    assert.ok(existsSync(join(root, src)), `${src} missing`);
  }
  assert.ok(existsSync(join(root, "assets/holiday/og-holiday.jpg")), "share image missing");
});

test("analytics: landing view carries the campaign and UTM values", () => {
  const { sent } = load("?utm_source=doorhanger&utm_medium=print&utm_campaign=holiday2026&utm_content=winmore");
  assert.deepEqual(JSON.parse(JSON.stringify(sent)), [{
    kind: "event", name: "campaign_landing_view",
    props: { campaign_id: "holiday2026", source: "doorhanger", medium: "print", content: "winmore" },
  }]);
});

test("analytics: a direct visit is labelled direct", () => {
  const { sent } = load("");
  assert.equal(sent.length, 1);
  assert.deepEqual({ ...sent[0].props }, { campaign_id: "holiday2026", source: "(direct)", medium: "(none)", content: "(none)" });
});

test("analytics: personal data or odd values in the URL are never sent", () => {
  const { sent } = load("?utm_source=jane%40example.com&utm_medium=print&utm_content=" + "x".repeat(80));
  const props = sent[0].props;
  assert.equal(props.source, "(direct)");
  assert.equal(props.content, "(none)");
  assert.doesNotMatch(JSON.stringify(sent), /@|example/);
});

test("analytics: each tracked link sends its event, before the booking script can stop the click", () => {
  const { api, sent, listeners } = load("?utm_content=winmore");
  assert.equal(listeners.click.capture, true, "must listen at window capture");
  const params = api.campaignParams("?utm_content=winmore");
  assert.deepEqual({ ...api.eventFor(el({ "data-track": "gift_card", "data-placement": "hero" }), params) },
    { name: "holiday_gift_card_click", props: api.eventFor(el({ "data-track": "gift_card", "data-placement": "hero" }), params).props });
  const cases = [
    [{ "data-track": "gift_card", "data-placement": "hero" }, "holiday_gift_card_click"],
    [{ "data-track": "service", "data-service": "float" }, "holiday_service_select"],
    [{ "data-track": "booking" }, "holiday_booking_click"],
    [{ "data-track": "directions" }, "holiday_retail_directions_click"],
    [{ "data-track": "phone" }, "holiday_phone_click"],
  ];
  for (const [attrs, name] of cases) {
    const link = el(attrs);
    listeners.click.fn({ target: { closest: (sel) => (sel === "a[data-track]" ? link : null) } });
    const last = sent.at(-1);
    assert.equal(last.name, name);
    assert.equal(last.props.campaign_id, "holiday2026");
    assert.equal(last.props.content, "winmore");
  }
  assert.equal(sent.at(-4).props.service_id, "float");
  const before = sent.length;
  listeners.click.fn({ target: { closest: () => null } });
  assert.equal(sent.length, before, "untracked clicks send nothing");
  // Every data-track value used on the page has an event.
  for (const [, kind] of html.matchAll(/data-track="([^"]+)"/g)) {
    assert.ok(api.eventFor(el({ "data-track": kind }), params), `no event for ${kind}`);
  }
});

test("analytics: confirming the booking note is counted separately from the first booking click", () => {
  const { sent, listeners } = load("?utm_content=winmore");
  const button = { closest: (sel) => (sel === ".arete-booking-note__continue" ? button : null) };
  listeners.click.fn({ target: button });
  assert.deepEqual({ name: sent.at(-1).name, props: { ...sent.at(-1).props } },
    { name: "holiday_booking_continue", props: { campaign_id: "holiday2026", content: "winmore" } });
});

test("the offer card and gift card are never left hidden when the script cannot run", () => {
  assert.match(html, /if \(!window\.AreteHoliday\)[^<]*classList\.add\('is-in'\)[^<]*classList\.add\('is-seen'\)/);
  assert.match(script, /IntersectionObserver" in root\)\) \{[\s\S]*?is-in[\s\S]*?is-seen[\s\S]*?return;/);
  assert.match(read("holiday.css"), /@media print \{[\s\S]*?transform: none !important/);
});

test("the gift-card picture carries the real wordmark as page text, not baked into the image", () => {
  assert.match(html, /class="hol-giftcard__text">\s*<span class="hol-giftcard__name">ARETÉ<\/span>/);
});

test("holiday.js runs before booking-notice.js, so its click listener is registered first", () => {
  assert.ok(html.indexOf('src="/holiday.js') < html.indexOf('src="/booking-notice.js'));
});

test("motion respects reduced-motion settings", () => {
  const css = read("holiday.css");
  const animations = css.match(/animation: hol-/g).length;
  const guarded = css.match(/@media \(prefers-reduced-motion: no-preference\) \{([\s\S]*?)\n\}/)[1].match(/animation: hol-/g).length;
  assert.equal(guarded, animations, "every animation sits inside the no-preference block");
});
