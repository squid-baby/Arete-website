/* =============================================================================
   "A Year of Possibility" door-hanger campaign: settings and rules
   Page: floatarete.com/reset  (reset.html + reset.jsx + reset.css)

   This file holds everything about the offer in one place. Edit here, not in
   reset.jsx. The page works out every price from these numbers.

   - code / discount / endsAt: the offer itself.
   - plans[].regularPrice and plans[].checkoutPath must match memberships.jsx.
     The checks (`node --test`) fail if they drift apart.
   - To preview the page after the offer ends, open
     /reset?campaign_now=2027-02-01T00:00:00-05:00
   ========================================================================== */
(function (global) {
  "use strict";

  var BOULEVARD_WIDGET = "https://www.joinblvd.com/b/52268a33-85eb-4646-b0f0-8a61f9510654/widget";

  var CAMPAIGN = {
    slug: "reset",
    campaignId: "reset2027",
    code: "RESET",
    discount: 25,
    // The first moment the offer is over: midnight Eastern, start of Feb 1.
    endsAt: "2027-02-01T00:00:00-05:00",
    lastDayLabel: "January\u00a031,\u00a02027",
    minimumMonths: 3,
    plans: [
      {
        id: "float_ritual",
        intent: "More rest",
        name: "Float Ritual",
        regularPrice: 69,
        checkoutPath: "/cart/menu/Float/p_403e6458-73d2-43cd-ba97-1d7a8886af12",
        summary: "One 60- or 90-minute float each month.",
        includes: ["Additional floats for $57", "10% off non-practitioner services and retail"]
      },
      {
        id: "thermal_reset",
        intent: "More recovery",
        name: "Thermal Reset",
        regularPrice: 99,
        checkoutPath: "/cart/menu/Contrast Therapy (Cold Plunge & Sauna)/p_400a8fd5-b757-47e4-b6c6-3ee72c3403c9",
        summary: "Two 60-minute contrast sessions each month: infrared sauna and cold plunge.",
        includes: ["Bring a guest for $20", "10% off non-practitioner services and retail"]
      },
      {
        id: "essential_wellness",
        intent: "More balance",
        name: "Essential Wellness",
        regularPrice: 109,
        checkoutPath: "/cart/menu/Float | Sauna | RLT | Contrast/p_02cdb7ed-36c5-48aa-b5c6-347cb22b40ab",
        summary: "One 60-minute float plus two flexible wellness credits each month.",
        includes: ["Sauna or red light = 1 credit; contrast = 2 credits", "10% off non-practitioner services and retail"],
        suggested: true
      }
    ]
  };

  // ---------- Prices ----------
  // First month, monthly price after that, and the total for the minimum term.
  function planPricing(plan, campaign) {
    var c = campaign || CAMPAIGN;
    var first = Math.max(0, plan.regularPrice - c.discount);
    return {
      first: first,
      recurring: plan.regularPrice,
      minimumTotal: first + plan.regularPrice * (c.minimumMonths - 1)
    };
  }

  function checkoutUrl(plan) {
    return BOULEVARD_WIDGET + "?path=" + encodeURIComponent(plan.checkoutPath);
  }

  // ---------- Dates ----------
  // `?campaign_now=<date>` previews the page at a LATER time (for example,
  // after the offer ends). It can never move time back, so an old link
  // cannot bring back an offer that has ended.
  function currentTime(search) {
    var now = Date.now();
    var value = null;
    try { value = new URLSearchParams(search || "").get("campaign_now"); } catch (_) { value = null; }
    var t = value ? Date.parse(value) : NaN;
    return isNaN(t) ? now : Math.max(now, t);
  }

  function isOfferActive(now, campaign) {
    return now < Date.parse((campaign || CAMPAIGN).endsAt);
  }

  // ---------- Where the visitor came from ----------
  // Read UTM tags from the address. Keep them for the rest of the visit so
  // events on this page carry them. Only short, plain values are kept.
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  var STORAGE_KEY = "arete-reset-attribution";

  function clean(value) {
    if (typeof value !== "string") return "";
    var v = value.trim().toLowerCase().slice(0, 40);
    return /^[a-z0-9_.-]+$/.test(v) ? v : "";
  }

  function readAttribution(search, storage) {
    var params = {};
    var found = false;
    var query = new URLSearchParams(search || "");
    UTM_KEYS.forEach(function (key) {
      var v = clean(query.get(key));
      if (v) { params[key] = v; found = true; }
    });
    try {
      if (found) storage && storage.setItem(STORAGE_KEY, JSON.stringify(params));
      else if (storage) {
        var saved = JSON.parse(storage.getItem(STORAGE_KEY) || "null");
        if (saved && typeof saved === "object") {
          UTM_KEYS.forEach(function (key) { var v = clean(saved[key]); if (v) params[key] = v; });
        }
      }
    } catch (_) { /* storage blocked: use what the address says */ }
    // Visits without tags are never given a neighborhood.
    return {
      source: params.utm_source || "(direct)",
      medium: params.utm_medium || "(none)",
      campaign: params.utm_campaign || "(not set)",
      content: params.utm_content || "(not set)"
    };
  }

  // ---------- Analytics ----------
  // Sends a GA4 event through the gtag already on every page. No names,
  // emails or addresses are ever sent. Parameter names avoid GA4's own
  // traffic-source names (campaign_id, source, medium, content), which GA4
  // can use to re-credit the visit.
  function track(name, params) {
    if (typeof global.gtag !== "function") return false;
    var payload = { promo_campaign: CAMPAIGN.campaignId };
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k];
    global.gtag("event", name, payload);
    return true;
  }

  // Send an event, then continue (for example, open checkout). On phones
  // Boulevard checkout leaves this page, and GA4 can lose an event that has
  // not been sent yet. Continue when GA4 confirms, or after `waitMs` at most.
  function trackThenContinue(name, params, proceed, waitMs) {
    var wait = waitMs || 800;
    var done = false;
    function go() { if (!done) { done = true; proceed(); } }
    var payload = {};
    for (var k in params) if (Object.prototype.hasOwnProperty.call(params, k)) payload[k] = params[k];
    payload.event_callback = go;
    payload.event_timeout = wait;
    if (!track(name, payload)) { go(); return; }
    global.setTimeout(go, wait);
  }

  global.ResetCampaign = {
    CAMPAIGN: CAMPAIGN,
    planPricing: planPricing,
    checkoutUrl: checkoutUrl,
    currentTime: currentTime,
    isOfferActive: isOfferActive,
    readAttribution: readAttribution,
    track: track,
    trackThenContinue: trackThenContinue
  };
})(typeof window !== "undefined" ? window : globalThis);
