(function () {
  "use strict";

  var BUSINESS_ID = "52268a33-85eb-4646-b0f0-8a61f9510654";
  var GA_MEASUREMENT_ID = "G-E4KK9FDJ4T";
  var BOOKING_HASH = "#book-now";
  var BOULEVARD_WIDGET = "https://www.joinblvd.com/b/" + BUSINESS_ID + "/widget";

  // These routes let existing pages move cleanly from FloatHelm to the
  // matching Boulevard service, membership, package, or gift card.
  var LEGACY_PATHS = {
    "/store/giftcards": "/cart/menu/Gift Cards/GIFT_CARD",

    "/store/services/1202785": "/cart/menu/Sauna | RLT | Halotherapy/s_781ae6aa-0520-415c-8e95-fa698cfad8e0",
    "/store/services/1202786": "/cart/menu/Sauna | RLT | Halotherapy/s_7ae386a7-b03b-42f6-bd97-a25d94e59cc2",
    "/store/services/1232409": "/cart/menu/Sauna | RLT | Halotherapy/s_1ff063de-eef0-47de-a03b-ad210891245b",
    "/store/services/1246191": "/cart/menu/Float Tank/s_cc7f5fd3-a524-4a0d-a9e8-62091ed65ca5",
    "/store/services/1202784": "/cart/menu/Float Tank/s_7b0c61da-f673-44e2-8ebe-d1ab2fa2b82a",
    "/store/services/1234463": "/cart/menu/Float Tank/s_8e3ded43-810c-4c81-ba0b-4356068fe019",
    "/store/services/1245698": "/cart/menu/Contrast Therapy (Cold Plunge/ Sauna)/s_362467ac-4c55-4f4d-bb81-4bcef670d725",
    "/store/services/1221833": "/cart/menu/Contrast Therapy (Cold Plunge/ Sauna)/s_fae2e953-60c5-419d-864a-3407c63a298c",
    "/store/services/1232408": "/cart/menu/Contrast Therapy (Cold Plunge/ Sauna)/s_b81c144f-9acb-4df1-89ee-ceb98da13b55",
    "/store/services/1234610": "/cart/menu/Sauna | RLT | Halotherapy/s_042db913-a148-46c7-9bcd-0a99af8f7cc5",
    "/store/services/1211368": "/cart/menu/Sauna | RLT | Halotherapy/s_5e0940f7-65d9-4fb9-8b89-924dc4e37861",
    "/store/services/1211439": "/cart/menu/Sauna | RLT | Halotherapy/s_0d2a9897-5a34-4693-9a94-a38682332343",
    "/store/services/s/48720b9bf28e4b600cfb586409d61609dcbd004c": "/cart/menu/Sauna | RLT | Halotherapy/s_92588d14-a197-45de-a8cd-68b4c6a1038f",
    "/store/services/1214265": "/cart/menu/Massage/s_20d7380b-ee16-49d9-b53e-30d88d19019d",
    "/store/services/1216238": "/cart/menu/Massage/s_b16b1ce8-b2ff-4e43-96f3-1d702d9a3a28",
    "/store/services/1214276": "/cart/menu/Massage/s_04587201-fba0-4429-b29b-4f27cb933a0b",

    "/store/memberships/1215257": "/cart/menu/Float/p_403e6458-73d2-43cd-ba97-1d7a8886af12",
    "/store/memberships/1220706": "/cart/menu/Fire (Sauna | RLT)/p_3b990437-0c05-41eb-99be-246fd0b4c25b",
    "/store/memberships/1203178": "/cart/menu/Fire (Sauna | RLT)/p_82886a87-db7b-42d2-a098-fdee5cf8adf9",
    "/store/memberships/1203177": "/cart/menu/Fire (Sauna | RLT)/p_a3e4d5ca-e6c9-430e-9db1-eb72873e2fbe",
    "/store/memberships/1203175": "/cart/menu/Fire (Sauna | RLT)/p_d51f048f-51fe-4e79-9ccf-436b1f545b15",
    "/store/memberships/1205640": "/cart/menu/Red Light Therapy /p_9cc9d494-526a-4015-92c7-174c8bbdc01c",
    "/store/memberships/1215279": "/cart/menu/Contrast Therapy (Cold Plunge & Sauna)/p_400a8fd5-b757-47e4-b6c6-3ee72c3403c9",
    "/store/memberships/1215254": "/cart/menu/Contrast Therapy (Cold Plunge & Sauna)/p_e2eb0c04-d5d8-4fc0-860a-a01ebc461841",
    "/store/memberships/1214567": "/cart/menu/Contrast Therapy (Cold Plunge & Sauna)/p_1b5fa7ca-66f2-4bbf-84d3-65919819d902",
    "/store/memberships/1215280": "/cart/menu/Float | Sauna | RLT | Contrast/p_02cdb7ed-36c5-48aa-b5c6-347cb22b40ab",
    "/store/memberships/1203325": "/cart/menu/Float | Sauna | RLT | Contrast/p_992ea038-e48d-4510-82e9-c26f089da83f",
    "/store/memberships/1215255": "/cart/menu/All Services /p_e5c7c8b8-bdef-485c-bd85-3734d31ae226",

    "/store/packages/1231304": "/cart/menu/Whole Studio/p_3f9f8577-4b83-435a-8650-ab17ac875f6e",
    "/store/packages/1203271": "/cart/menu/Float Tank/p_f8f0e7ea-b6d3-4f7d-9669-8f866151abdc",
    "/store/packages/1205385": "/cart/menu/Sauna/p_2493232c-6a5c-454d-b0da-90e375e50bb4",
    "/store/packages/1205386": "/cart/menu/Sauna/p_42f36f41-52ec-4e3f-b1fd-a2b4123f3815"
  };

  function boulevardUrl(path, visitType) {
    var url = BOULEVARD_WIDGET + "?path=" + encodeURIComponent(path);
    return visitType ? url + "&visitType=" + encodeURIComponent(visitType) : url;
  }

  function legacyPath(anchor) {
    try {
      var url = new URL(anchor.href, window.location.href);
      if (url.hostname !== "aretefloattank.floathelm.com") return null;
      return LEGACY_PATHS[url.pathname] || "";
    } catch (error) {
      return null;
    }
  }

  function enhanceLink(anchor) {
    if (!anchor || anchor.dataset.areteBookingReady === "true") return;

    var path = legacyPath(anchor);
    if (path === null) return;

    if (path) {
      var visitType = path.indexOf("/s_") !== -1 ? "SELF_VISIT" : "";
      anchor.href = boulevardUrl(path, visitType);
      anchor.dataset.blvdPath = path;
      if (visitType) anchor.dataset.blvdVisitType = visitType;
    } else {
      anchor.href = BOOKING_HASH;
    }

    anchor.removeAttribute("target");
    anchor.removeAttribute("rel");

    // Boulevard keeps an in-progress cart when the overlay is reopened, but
    // its standard widget does not share the cart count with the surrounding
    // website. Use the desktop navigation action as a direct cart shortcut.
    if (anchor.classList.contains("nav__cta")) {
      anchor.textContent = "Cart";
      anchor.href = boulevardUrl("/cart", "SELF_VISIT");
      anchor.dataset.blvdPath = "/cart";
      anchor.dataset.blvdVisitType = "SELF_VISIT";
      anchor.setAttribute("aria-label", "View your Boulevard cart");
    }

    // On mobile, keep the cart visible beside the menu icon instead of hiding
    // the only shortcut inside the slide-down navigation drawer.
    if (anchor.classList.contains("nav__mobile-cta")) {
      var mobileNav = anchor.closest(".nav");
      var menuButton = mobileNav && mobileNav.querySelector(".nav__menu");

      if (menuButton && !mobileNav.querySelector(".nav__mobile-cart")) {
        var mobileCart = document.createElement("a");
        mobileCart.className = "nav__mobile-cart";
        mobileCart.href = boulevardUrl("/cart", "SELF_VISIT");
        mobileCart.dataset.blvdPath = "/cart";
        mobileCart.dataset.blvdVisitType = "SELF_VISIT";
        mobileCart.dataset.areteBookingReady = "true";
        mobileCart.setAttribute("aria-label", "View your Boulevard cart");
        mobileCart.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5h11l1 11h-13l1-11Z"></path><path d="M9 9V7a3 3 0 0 1 6 0v2"></path></svg>';
        menuButton.insertAdjacentElement("beforebegin", mobileCart);
      }

      anchor.classList.add("nav__mobile-cta--hidden");
      anchor.setAttribute("aria-hidden", "true");
      anchor.tabIndex = -1;
    }

    anchor.dataset.areteBookingReady = "true";
  }

  function enhanceLinks(root) {
    if (root && root.matches && root.matches("a[href]")) enhanceLink(root);
    if (!root || !root.querySelectorAll) return;
    Array.prototype.forEach.call(root.querySelectorAll("a[href]"), enhanceLink);
  }

  var bookingNotice;
  var pendingBooking;

  function showBookingNotice(proceed) {
    pendingBooking = proceed;
    if (!bookingNotice) {
      var style = document.createElement("style");
      style.textContent = `
        .arete-booking-note{box-sizing:border-box;width:calc(100% - 32px);max-width:470px;max-height:calc(100dvh - 32px);overflow:auto;margin:auto;padding:26px 30px;border:1px solid #ddd6cd;border-radius:12px;background:#faf9f6;color:#111d3d;font-family:var(--sans,Arial,sans-serif);box-shadow:0 16px 48px #111d3d26}
        .arete-booking-note::backdrop{background:rgba(13,27,62,.55)}
        .arete-booking-note *{box-sizing:border-box}
        .arete-booking-note__top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}
        .arete-booking-note__brand{font-size:11px;letter-spacing:1.5px;line-height:1.7;color:#62616b}
        .arete-booking-note__close{border:0;background:transparent;color:#62616b;min-width:44px;min-height:44px;font:26px Arial,sans-serif;margin:-12px -14px -12px 0;cursor:pointer}
        .arete-booking-note h2{font:400 30px/1.2 Georgia,serif;letter-spacing:-.5px;margin:0 0 18px;text-transform:none;color:inherit}
        .arete-booking-note p{font-size:16px;line-height:1.65;margin:0;color:inherit}
        .arete-booking-note__gift{background:#f0ece8;padding:17px 18px;margin:20px 0;border-radius:6px}
        .arete-booking-note h3{font:400 22px/1.3 Georgia,serif;margin:0 0 8px;color:inherit;text-transform:none}
        .arete-booking-note .arete-booking-note__policy{font-size:14px;color:#62616b}
        .arete-booking-note__continue{display:block;width:100%;background:#111d3d;color:#faf9f6;border:0;border-radius:4px;padding:17px 18px;margin-top:22px;font:16px var(--sans,Arial,sans-serif);cursor:pointer;min-height:48px}
        .arete-booking-note button:focus-visible{outline:3px solid #7c6b8a;outline-offset:3px}
        @media(max-width:400px){.arete-booking-note{padding:22px}.arete-booking-note h2{font-size:27px}}
      `;
      document.head.appendChild(style);
      bookingNotice = document.createElement("dialog");
      bookingNotice.className = "arete-booking-note";
      bookingNotice.setAttribute("aria-labelledby", "arete-booking-note-title");
      bookingNotice.innerHTML = `
        <div class="arete-booking-note__top"><span class="arete-booking-note__brand">Areté · ELEMENTAL WELLNESS</span><button type="button" class="arete-booking-note__close" aria-label="Close booking note">×</button></div>
        <h2 id="arete-booking-note-title">A quick note before you book</h2>
        <p>Boulevard requires a valid credit or debit card to reserve your appointment, <strong>even if you’re using an Areté gift card.</strong> Your card won’t be charged upfront for booking an appointment.</p>
        <div class="arete-booking-note__gift"><h3>Using a gift card?</h3><p>Bring your gift card, email, or code to your visit—we’ll apply it at checkout.</p></div>
        <p class="arete-booking-note__policy">Gift-card, package, and membership purchases are charged separately. Our late-cancellation and no-show policy still applies.</p>
        <button type="button" class="arete-booking-note__continue">Continue to booking</button>
      `;
      document.body.appendChild(bookingNotice);
      bookingNotice.querySelector(".arete-booking-note__close").addEventListener("click", function () {
        pendingBooking = null;
        bookingNotice.close();
      });
      bookingNotice.addEventListener("cancel", function () { pendingBooking = null; });
      bookingNotice.addEventListener("click", function (event) {
        if (event.target !== bookingNotice) return;
        var rect = bookingNotice.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
          pendingBooking = null;
          bookingNotice.close();
        }
      });
      bookingNotice.querySelector(".arete-booking-note__continue").addEventListener("click", function () {
        var next = pendingBooking;
        pendingBooking = null;
        bookingNotice.close();
        if (next) next();
      });
    }
    if (!bookingNotice.open) bookingNotice.showModal();
  }

  document.addEventListener(
    "click",
    function (event) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var anchor = event.target.closest ? event.target.closest("a") : null;
      if (!anchor) return;

      var destination;
      try { destination = new URL(anchor.href, window.location.href); } catch (error) { return; }
      var isLocalBooking = destination.origin === window.location.origin &&
        destination.pathname === window.location.pathname && destination.hash === BOOKING_HASH;
      var isBoulevard = (destination.hostname === "www.joinblvd.com" || destination.hostname === "joinblvd.com") &&
        destination.pathname === "/b/" + BUSINESS_ID + "/widget";
      var path = anchor.dataset.blvdPath || destination.searchParams.get("path") || "";
      if (!isLocalBooking && !isBoulevard && !anchor.dataset.blvdPath) return;

      var visitType = anchor.dataset.blvdVisitType || destination.searchParams.get("visitType") || "";
      var locationId = destination.searchParams.get("locationId") || "";
      var urlParams = {};
      if (path) urlParams.path = path;
      if (visitType) urlParams.visitType = visitType;
      if (locationId) urlParams.locationId = locationId;
      var fallback = isLocalBooking ? BOULEVARD_WIDGET : destination.href;
      function openBooking() {
        if (window.blvd && typeof window.blvd.openBookingWidget === "function") {
          window.blvd.openBookingWidget({ urlParams: urlParams });
        } else {
          window.location.assign(fallback);
        }
      }

      // Purchases and the existing cart keep their current, direct experience.
      var isPurchase = path === "/cart" || /\/p_|GIFT_CARD/.test(path) ||
        /^(PACKAGE|MEMBERSHIP|GIFT_CARD|PRODUCT)$/.test(visitType);
      event.preventDefault();
      event.stopImmediatePropagation();
      if (isPurchase) openBooking();
      else showBookingNotice(openBooking);
    },
    true
  );

  enhanceLinks(document);

  if (window.MutationObserver) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, enhanceLinks);
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  // Boulevard Self-Booking overlay.
  (function (doc) {
    var config = {
      businessId: BUSINESS_ID,
      gaMeasurementId: GA_MEASUREMENT_ID
    };

    var injector = doc.createElement("script");
    var firstScript = doc.querySelector("script");

    injector.src = "https://static.joinboulevard.com/injector.min.js";
    injector.async = true;
    injector.onload = function () {
      window.blvd.init(config);
    };

    firstScript.parentNode.insertBefore(injector, firstScript);
  })(document);
})();
