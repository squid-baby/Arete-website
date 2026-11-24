import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../booking-notice.js", import.meta.url), "utf8");
const widget = "https://www.joinblvd.com/b/52268a33-85eb-4646-b0f0-8a61f9510654/widget";

function browser(withWidget = true) {
  let handleClick;
  const calls = [];
  const dialogs = [];
  const makeElement = () => ({
    open: false, buttons: {}, setAttribute() {}, addEventListener() {},
    showModal() { this.open = true; }, close() { this.open = false; },
    querySelector(selector) {
      return this.buttons[selector] ||= { addEventListener(name, fn) { this[name] = fn; } };
    },
  });
  const document = {
    head: { appendChild() {} }, body: { appendChild() {} },
    createElement(tag) { const el = makeElement(); if (tag === "dialog") dialogs.push(el); return el; },
    querySelectorAll: () => [], querySelector: () => ({ parentNode: { insertBefore() {} } }),
    addEventListener(name, fn) { if (name === "click") handleClick = fn; },
  };
  const location = { href: "https://floatarete.com/", origin: "https://floatarete.com", pathname: "/", assign: (url) => calls.push({ fallback: url }) };
  const window = { location, blvd: withWidget ? { openBookingWidget: (options) => calls.push(options.urlParams) } : undefined };
  vm.runInNewContext(source, { document, window, URL });
  function click(href, dataset = {}) {
    const anchor = { href, dataset };
    handleClick({ button: 0, target: { closest: () => anchor }, preventDefault() {}, stopImmediatePropagation() {} });
    const note = dialogs.find(el => el.open);
    if (note) note.buttons[".arete-booking-note__continue"].click();
    return JSON.parse(JSON.stringify(calls.at(-1)));
  }
  return { click };
}

test("regular booking explicitly resets the gift-card mode and remembered destination", () => {
  const page = browser();
  const gift = widget + "?path=%2Fcart%2Fmenu%2FGift%20Cards%2FGIFT_CARD&visitType=GIFT_CARD";
  assert.equal(page.click(gift).visitType, "GIFT_CARD");
  assert.deepEqual(page.click("https://floatarete.com/#book-now"), { path: "/cart/menu", visitType: "SELF_VISIT" });
  assert.equal(page.click(gift).visitType, "GIFT_CARD");
  assert.deepEqual(page.click(widget), { path: "/cart/menu", visitType: "SELF_VISIT" });
});

test("service links retain their requested destination after gift-card checkout", () => {
  const page = browser();
  page.click(widget + "?visitType=GIFT_CARD");
  const path = "/cart/menu/Float Tank?type=SERVICE";
  assert.deepEqual(page.click(widget + "?path=" + encodeURIComponent(path)), { path, visitType: "SELF_VISIT" });
});

test("gift-card links without an explicit mode still open gift cards", () => {
  const path = "/cart/menu/Gift Cards/GIFT_CARD";
  assert.deepEqual(browser().click(widget + "?path=" + encodeURIComponent(path)), { path, visitType: "GIFT_CARD" });
});

test("the full-page fallback also resets ordinary booking to the main menu", () => {
  const result = browser(false).click("https://floatarete.com/#book-now");
  const url = new URL(result.fallback);
  assert.equal(url.searchParams.get("visitType"), "SELF_VISIT");
  assert.equal(url.searchParams.get("path"), "/cart/menu");
});
