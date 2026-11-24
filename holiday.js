// Holiday 2026 campaign page (/holiday).
//
// 1. Campaign settings in one place (CONFIG). The /reset campaign, if built,
//    gets its own file; nothing here is shared with it.
// 2. Google Analytics events for the campaign. They record click intent only.
//    A click on "Buy a gift card" is not a purchase. No names, emails, phone
//    numbers or card data are ever sent: only fixed labels and UTM values that
//    pass a strict letters/numbers check.
// 3. A small "Buy a gift card" bar on phones once the hero buttons scroll away.
(function (root) {
  "use strict";

  var CONFIG = {
    slug: "holiday",
    campaign_id: "holiday2026",
    retail_discount_percent: 25,
    retail_redemption: "in_store", // physical card only; there is no online code
    gift_card_url:
      "https://www.joinblvd.com/b/52268a33-85eb-4646-b0f0-8a61f9510654/widget?path=%2Fcart%2Fmenu%2FGift%20Cards%2FGIFT_CARD&visitType=GIFT_CARD",
    service_links: {
      float: "float.html",
      sauna: "sauna.html",
      contrast: "/contrast-therapy",
      massage: "/massage",
      red_light: "red_light.html",
      halotherapy: "halotherapy.html"
    }
  };

  // data-track value on a link -> GA4 event name.
  var EVENT_FOR = {
    gift_card: "holiday_gift_card_click",
    service: "holiday_service_select",
    booking: "holiday_booking_click",
    directions: "holiday_retail_directions_click",
    phone: "holiday_phone_click"
  };

  // Keep only short, plain labels. Anything else (an email someone pasted into
  // a URL, a long tracking string) is dropped, so it never reaches analytics.
  function clean(value) {
    var v = String(value == null ? "" : value).trim().toLowerCase();
    return /^[a-z0-9][a-z0-9._-]{0,59}$/.test(v) ? v : "";
  }

  function campaignParams(search) {
    var p = new URLSearchParams(search || "");
    return {
      campaign_id: CONFIG.campaign_id,
      source: clean(p.get("utm_source")) || "(direct)",
      medium: clean(p.get("utm_medium")) || "(none)",
      content: clean(p.get("utm_content")) || "(none)"
    };
  }

  function eventFor(el, params) {
    if (!el || !el.getAttribute) return null;
    var name = EVENT_FOR[el.getAttribute("data-track")];
    if (!name) return null;
    var props = { campaign_id: CONFIG.campaign_id, content: params.content };
    var placement = clean(el.getAttribute("data-placement"));
    if (placement) props.placement = placement;
    var service = clean(el.getAttribute("data-service"));
    if (service) props.service_id = service;
    return { name: name, props: props };
  }

  function send(name, props) {
    if (typeof root.gtag === "function") root.gtag("event", name, props);
  }

  root.AreteHoliday = { CONFIG: CONFIG, campaignParams: campaignParams, eventFor: eventFor };

  var doc = root.document;
  if (!doc || !doc.querySelector) return;

  var params = campaignParams(root.location && root.location.search);
  send("campaign_landing_view", params);

  // Window capture runs before booking-notice.js, which stops the click at the
  // document so it can open the Boulevard window. This way every click counts.
  root.addEventListener("click", function (event) {
    var link = event.target && event.target.closest ? event.target.closest("a[data-track]") : null;
    var ev = eventFor(link, params);
    if (ev) send(ev.name, ev.props);
    // The booking note (booking-notice.js) asks people to confirm before
    // Boulevard opens. Count the confirmations, so closed notes are not
    // mistaken for bookings started.
    var go = event.target && event.target.closest ? event.target.closest(".arete-booking-note__continue") : null;
    if (go) send("holiday_booking_continue", { campaign_id: CONFIG.campaign_id, content: params.content });
  }, true);

  if (!("IntersectionObserver" in root)) {
    // No observer: show the animated pieces at rest.
    var still = doc.querySelector(".hol-offer");
    if (still) still.classList.add("is-in");
    var gift = doc.querySelector(".hol-giftcard");
    if (gift) gift.classList.add("is-seen");
    return;
  }

  // ---- Sticky gift-card bar (phones only; CSS hides it on wider screens) ----
  var bar = doc.querySelector(".hol-sticky");
  var heroActions = doc.querySelector(".hol-hero__actions");
  var blockers = doc.querySelectorAll("[data-sticky-hide], .hol-footer");
  if (bar && heroActions) {
    var visible = new Set();
    var setBar = function (show) {
      bar.classList.toggle("is-shown", show);
      bar.setAttribute("aria-hidden", show ? "false" : "true");
      Array.prototype.forEach.call(bar.querySelectorAll("a"), function (a) {
        if (show) a.removeAttribute("tabindex"); else a.setAttribute("tabindex", "-1");
      });
    };
    // A button counts as "on screen" only when most of it shows; a sliver at
    // the bottom edge of a short phone screen does not hide the bar.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting && e.intersectionRatio >= 0.6) visible.add(e.target); else visible.delete(e.target); });
      // Shown whenever no gift-card button is on screen, including on short
      // phones where the hero button starts just below the fold.
      setBar(visible.size === 0);
    }, { threshold: [0, 0.6, 1] });
    Array.prototype.forEach.call(blockers, function (el) { io.observe(el); });
  }

  // ---- The offer card rises from its pocket when it scrolls into view ----
  var offer = doc.querySelector(".hol-offer");
  if (offer) {
    var rise = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { offer.classList.add("is-in"); rise.disconnect(); }
    }, { threshold: 0.35 });
    rise.observe(offer);
  }

  // ---- A soft sheen crosses the gift card the first time it comes into view ----
  var card = doc.querySelector(".hol-giftcard");
  if (card) {
    var seen = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { card.classList.add("is-seen"); seen.disconnect(); }
    }, { threshold: 0.3 });
    seen.observe(card);
  }
})(typeof window !== "undefined" ? window : this);
