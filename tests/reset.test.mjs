// Checks the door-hanger campaign page, floatarete.com/reset.
//   - The offer prices are worked out right and match memberships.jsx.
//   - Each "Choose" button goes to that plan's real Boulevard checkout.
//   - The offer switches off at midnight Eastern, start of February 1, 2027.
//   - Visit tags (UTMs) are read safely, and events carry no personal data.
//
// Run with:  node --test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { compileJsx, renderPage } from "../scripts/build.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => readFileSync(join(root, f), "utf8");

// Load reset-campaign.jsx the way a browser does, with a stand-in gtag.
function loadCampaign() {
  const events = [];
  const window = { gtag: (...args) => events.push(args) };
  vm.runInNewContext(compileJsx(read("reset-campaign.jsx"), "reset-campaign.jsx"), { window, URLSearchParams, JSON, Date, Math });
  return { ...window.ResetCampaign, events, window };
}
const rc = loadCampaign();

// Render reset.html to plain HTML text, as the build does.
function renderReset(search = "") {
  const compiled = ["reset-campaign.jsx", "reset.jsx"].map((f) => [f, compileJsx(read(f), f)]);
  return renderPage(read("reset.html"), compiled, { search }).markup;
}

// The price and checkout path of a plan, as memberships.jsx shows them.
function membershipsPlan(name) {
  const src = read("memberships.jsx");
  const at = src.indexOf(`name: "${name}"`);
  assert.ok(at > -1, `${name} not found in memberships.jsx`);
  // The plan's own block: from its name to the next plan's name.
  const next = src.indexOf("name:", at + 6);
  const block = src.slice(at, next === -1 ? undefined : next);
  return {
    price: Number(block.match(/price: (\d+)/)[1]),
    path: block.match(/boulevardLink\("([^"]+)"\)/)[1],
  };
}

test("each campaign plan matches memberships.jsx (price and checkout)", () => {
  for (const plan of rc.CAMPAIGN.plans) {
    const live = membershipsPlan(plan.name);
    assert.equal(plan.regularPrice, live.price, `${plan.name} price`);
    assert.equal(plan.checkoutPath, live.path, `${plan.name} checkout`);
  }
});

test("offer prices: $25 off month one, then the regular price, 3-month minimum", () => {
  const expected = {
    float_ritual: { first: 44, recurring: 69 },
    thermal_reset: { first: 74, recurring: 99 },
    essential_wellness: { first: 84, recurring: 109 },
  };
  for (const plan of rc.CAMPAIGN.plans) {
    assert.deepEqual({ ...rc.planPricing(plan) }, expected[plan.id], plan.name);
  }
  assert.equal(rc.planPricing({ regularPrice: 10 }).first, 0, "never below $0");
});

test("Essential Wellness is the suggested plan, and only it", () => {
  assert.deepEqual(JSON.parse(JSON.stringify(rc.CAMPAIGN.plans.filter((p) => p.suggested).map((p) => p.id))), ["essential_wellness"]);
});

test("offer ends at midnight Eastern, start of February 1, 2027", () => {
  assert.equal(rc.isOfferActive(Date.parse("2027-01-31T23:59:59-05:00")), true);
  assert.equal(rc.isOfferActive(Date.parse("2027-02-01T00:00:00-05:00")), false);
  assert.equal(rc.isOfferActive(Date.parse("2027-02-01T04:59:59Z")), true, "still Jan 31 in Carrboro");
});

test("?campaign_now= previews a later time; bad or earlier values are ignored", () => {
  assert.equal(rc.currentTime("?campaign_now=2099-02-01T00:00:00-05:00"), Date.parse("2099-02-01T05:00:00Z"));
  const before = Date.now();
  assert.ok(rc.currentTime("?campaign_now=not-a-date") >= before);
  assert.ok(rc.currentTime("?campaign_now=%E0%A4%A") >= before, "a broken address does not crash the page");
  assert.ok(rc.currentTime("?campaign_now=2020-01-01") >= before, "cannot bring back an ended offer");
  assert.ok(rc.currentTime("") >= before);
});

test("visit tags: kept when clean, rejected when odd, never guessed", () => {
  const store = new Map();
  const storage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) };
  const tagged = rc.readAttribution("?utm_source=doorhanger&utm_medium=print&utm_content=WinMore", storage);
  assert.deepEqual({ ...tagged }, { source: "doorhanger", medium: "print", campaign: "(not set)", content: "winmore" });
  // A later page view in the same visit, without tags, keeps them.
  assert.deepEqual({ ...rc.readAttribution("", storage) }, { ...tagged });
  // No tags and nothing saved: not given a neighborhood.
  assert.equal(rc.readAttribution("", null).content, "(not set)");
  // Odd values (spaces, emails, markup) are dropped.
  assert.equal(rc.readAttribution("?utm_content=jane%40mail.com", null).content, "(not set)");
  assert.equal(rc.readAttribution("?utm_content=%3Cscript%3E", null).content, "(not set)");
  // Blocked storage does not break the page.
  const blocked = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
  assert.equal(rc.readAttribution("?utm_content=winmore", blocked).content, "winmore");
});

test("event parameters never use GA4's own traffic-source names", () => {
  const reserved = /[{,]\s*(campaign_id|campaign|source|medium|content|term)\s*:/;
  for (const [, params] of read("reset.jsx").matchAll(/track(?:ThenContinue)?\("[a-z_]+",\s*(\{[^}]*\})/g)) {
    assert.doesNotMatch(params, reserved, params);
  }
  assert.doesNotMatch(read("reset.jsx"), /const params = \{[^}]*\b(content|source|medium):/);
});

test("events go to GA4 with the campaign id, and are skipped without GA", () => {
  rc.events.length = 0;
  assert.equal(rc.track("campaign_code_copy", { visit_zone: "winmore" }), true);
  assert.deepEqual(JSON.parse(JSON.stringify(rc.events[0])), ["event", "campaign_code_copy", { promo_campaign: "reset2027", visit_zone: "winmore" }]);
  delete rc.window.gtag;
  assert.equal(rc.track("campaign_code_copy", {}), false);
});

test("checkout waits for GA4 to confirm the event, but never longer than the limit", () => {
  const timers = [];
  const events = [];
  const window = { gtag: (...args) => events.push(args), setTimeout: (fn, ms) => timers.push({ fn, ms }) };
  vm.runInNewContext(compileJsx(read("reset-campaign.jsx"), "reset-campaign.jsx"), { window, URLSearchParams, JSON, Date, Math });
  const { trackThenContinue } = window.ResetCampaign;
  let opened = 0;
  trackThenContinue("membership_checkout_click", { plan_id: "float_ritual" }, () => opened++);
  assert.equal(opened, 0, "waits for GA4");
  events[0][2].event_callback();          // GA4 confirms
  timers[0].fn();                          // the limit also passes
  assert.equal(opened, 1, "opens checkout exactly once");
  assert.equal(timers[0].ms, 800);
  assert.equal(events[0][2].plan_id, "float_ritual");
  // Without GA (blocked or not loaded), checkout opens at once.
  delete window.gtag;
  trackThenContinue("membership_checkout_click", {}, () => opened++);
  assert.equal(opened, 2);
});

test("built page: offer, prices, terms and real checkout links", () => {
  const html = renderReset();
  assert.match(html, /<h1[^>]*>A Year of <span>Possibility<\/span><\/h1>/);
  assert.match(html, /A gift for our neighbors/);
  assert.match(html, /Your best you is on the other side <br class="rs-br"\/>of a good/);
  assert.ok(html.includes(`Valid through ${rc.CAMPAIGN.lastDayLabel}`));
  assert.equal(rc.CAMPAIGN.lastDayLabel.replace(/\u00a0/g, " "), "January 31, 2027");
  assert.match(html, /Copy code/);
  assert.match(html, /Find your ritual/);
  for (const plan of rc.CAMPAIGN.plans) {
    const p = rc.planPricing(plan);
    const href = rc.checkoutUrl(plan).replace(/&/g, "&amp;");
    assert.ok(html.includes(`href="${href}" data-plan-id="${plan.id}"`), `${plan.name} checkout link`);
    assert.ok(html.includes(`Choose ${plan.name}`), `${plan.name} button`);
    assert.ok(html.includes(`>$${p.first}<`), `${plan.name} first month`);
    assert.ok(html.includes(`Then $${p.recurring}/month`), `${plan.name} recurring price next to the button`);
    assert.ok(html.includes(`Then $${p.recurring}/month. 3-month minimum.`), `${plan.name} minimum term next to the button`);
  }
  assert.doesNotMatch(html, /for your first 3 months/, "no 3-month dollar total");
  assert.match(html, /<b>Choose a membership\.<\/b> Checkout opens in Boulevard, our booking system\.<\/span>/, "step 1 text");
  assert.match(html, /href="memberships.html"/);
  assert.match(html, /href="memberships.html#rules"/);
  assert.match(html, /href="privacy.html"/);
  assert.doesNotMatch(html, /massage/i, "memberships here do not include massage");
  assert.doesNotMatch(html, /most popular/i);
});

test("after the offer ends: no discount, a clear message, links still work", () => {
  const html = renderReset("?campaign_now=2027-02-01T00:00:00-05:00");
  assert.match(html, /This offer has ended/);
  assert.match(html, /See all memberships/);
  assert.doesNotMatch(html, /rs-price__unit">first month|off your first month|Enter code/);
  assert.doesNotMatch(html, /Copy code/);
  for (const plan of rc.CAMPAIGN.plans) {
    assert.ok(html.includes(`>$${plan.regularPrice}<`), `${plan.name} regular price`);
  }
});

test("brand spelling is Areté / ARETÉ, never Arête or Aréte", () => {
  for (const f of ["reset.html", "reset.jsx", "reset-campaign.jsx"]) {
    assert.doesNotMatch(read(f), /Arête|ARÊTE|Aréte|ARéTE/, f);
  }
});

test("page head: noindex, clean canonical, title, social image", () => {
  const html = read("reset.html");
  assert.match(html, /<meta name="robots" content="noindex,follow" \/>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/floatarete.com\/reset" \/>/);
  assert.match(html, /<title>A Year of Possibility \| ARETÉ Float \+ Wellness<\/title>/);
  assert.match(html, /og:image" content="https:\/\/floatarete.com\/assets\/reset\/og-reset.jpg\?v=\d+"/);
  assert.match(html, /booking-notice\.js/, "Boulevard checkout overlay is loaded");
  assert.doesNotMatch(read("sitemap.xml"), /floatarete.com\/reset/);
});

test("the early 'offer ended' guard in reset.html uses the same end time", () => {
  const html = read("reset.html");
  assert.ok(html.includes(`var ENDS_AT = "${rc.CAMPAIGN.endsAt}";`));
});

test("/holiday-door (printed QR code) goes to /reset with the door-hanger tags", () => {
  const rule = read("_redirects").match(/^\/holiday-door\s+(\S+)\s+(\d+)$/m);
  assert.ok(rule, "no /holiday-door rule");
  assert.equal(rule[2], "302");
  const target = new URL(rule[1], "https://floatarete.com");
  assert.equal(target.pathname, "/reset");
  assert.deepEqual(Object.fromEntries(target.searchParams), {
    utm_source: "doorhanger", utm_medium: "print", utm_campaign: "reset2027", utm_content: "all_doors",
  });
  // The /reset page reads these tags and accepts them.
  assert.deepEqual({ ...rc.readAttribution(target.search, null) },
    { source: "doorhanger", medium: "print", campaign: "reset2027", content: "all_doors" });
});

test("/reset shows reset.html and keeps the address (200 rewrite)", () => {
  assert.match(read("_redirects"), /^\/reset\s+\/reset\.html\s+200$/m);
});
