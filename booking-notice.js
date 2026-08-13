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
    anchor.dataset.areteBookingReady = "true";
  }

  function enhanceLinks(root) {
    if (root && root.matches && root.matches("a[href]")) enhanceLink(root);
    if (!root || !root.querySelectorAll) return;
    Array.prototype.forEach.call(root.querySelectorAll("a[href]"), enhanceLink);
  }

  document.addEventListener(
    "click",
    function (event) {
      var anchor = event.target.closest ? event.target.closest("a") : null;
      if (!anchor) return;

      var path = anchor.dataset.blvdPath;
      var visitType = anchor.dataset.blvdVisitType || "";
      if (!path) {
        try {
          var destination = new URL(anchor.href, window.location.href);
          if (destination.hostname === "www.joinblvd.com" && destination.searchParams.get("path")) {
            path = destination.searchParams.get("path");
            visitType = destination.searchParams.get("visitType") || "";
          }
        } catch (error) {
          return;
        }
      }

      if (!path || !window.blvd || typeof window.blvd.openBookingWidget !== "function") return;

      event.preventDefault();
      var urlParams = { path: path };
      if (visitType) urlParams.visitType = visitType;
      window.blvd.openBookingWidget({ urlParams: urlParams });
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
