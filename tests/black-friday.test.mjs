import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const script = readFileSync(new URL("../black-friday.js", import.meta.url), "utf8");

function visit(time, dismissed = false) {
  let clock = Date.parse(time);
  let created = 0;
  const timers = [];
  const events = {};
  const windowEvents = {};
  const anchor = {};
  const popup = {
    open: false, removed: false,
    setAttribute() {}, querySelector: () => ({ addEventListener() {} }),
    addEventListener: (name, fn) => { events[name] = fn; },
    showModal() { this.open = true; },
    close() { this.open = false; },
    contains: (node) => node === anchor,
    remove() { this.removed = true; },
  };
  const body = { style: { overflow: "auto" }, appendChild() {} };
  vm.runInNewContext(script, {
    Date: { parse: Date.parse, now: () => clock },
    sessionStorage: { getItem: () => dismissed ? "1" : null, setItem() {} },
    document: { body, createElement: () => { created++; return popup; } },
    window: {
      addEventListener: (name, fn, capture) => { windowEvents[name] = { fn, capture }; },
      removeEventListener: (name) => { delete windowEvents[name]; },
    },
    setTimeout: (fn, delay) => { timers.push({ fn, delay }); return timers.length; },
    clearTimeout() {},
  });
  return { popup, body, timers, created, events, windowEvents, anchor, advance: (time) => { clock = Date.parse(time); } };
}

test("offer starts November 24 Eastern and ends exactly December 1 Eastern", () => {
  assert.equal(visit("2026-11-24T04:59:59Z").created, 0);
  assert.equal(visit("2026-11-24T05:00:00Z").created, 1);
  assert.equal(visit("2026-12-01T04:59:59Z").created, 1);
  assert.equal(visit("2026-12-01T05:00:00Z").created, 0);
  assert.equal(visit("2027-11-27T12:00:00Z").created, 0);
});

test("a dismissed offer stays closed for the rest of the visit", () => {
  assert.equal(visit("2026-11-25T12:00:00Z", true).created, 0);
});

test("an open popup closes at expiry and restores page scrolling", () => {
  const page = visit("2026-12-01T04:59:50Z");
  page.timers[0].fn();
  assert.equal(page.popup.open, true);
  assert.equal(page.body.style.overflow, "hidden");
  assert.equal(page.timers[1].delay, 10000);
  page.timers[1].fn();
  assert.equal(page.popup.open, false);
  assert.equal(page.body.style.overflow, "auto");
});

test("a delayed popup cannot appear after the promotion ends", () => {
  const page = visit("2026-12-01T04:59:59Z");
  page.advance("2026-12-01T05:00:01Z");
  page.timers[0].fn();
  assert.equal(page.popup.open, false);
  assert.equal(page.popup.removed, true);
});

test("gift-card click clears the dialog before checkout and queued close cannot unlock checkout", () => {
  const page = visit("2026-11-25T12:00:00Z");
  page.timers[0].fn();
  assert.equal(page.windowEvents.click.capture, true);
  page.windowEvents.click.fn({ button: 0, target: { closest: () => page.anchor } });
  assert.equal(page.popup.open, false);
  assert.equal(page.popup.removed, true);
  assert.equal(page.body.style.overflow, "auto");
  // Boulevard now opens and locks the page behind its own checkout overlay.
  page.body.style.overflow = "hidden";
  page.events.close();
  assert.equal(page.body.style.overflow, "hidden");
  assert.equal(page.windowEvents.click, undefined);
});
