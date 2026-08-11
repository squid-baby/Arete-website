(function () {
  "use strict";

  var VISIT_NOTICE_KEY = "arete-boulevard-hold-2026-08-11";
  var BOOKING_HASH = "#book-now";
  var modal;
  var closeButton;
  var previouslyFocused;
  var previousBodyOverflow = "";

  function isBookingLink(anchor) {
    if (!anchor || !anchor.href) return false;
    if (anchor.dataset.areteBookingHold === "true") return true;

    try {
      var url = new URL(anchor.href, window.location.href);
      var hostname = url.hostname.toLowerCase();
      return (
        url.hash === BOOKING_HASH ||
        hostname === "www.joinblvd.com" ||
        hostname === "joinblvd.com" ||
        hostname === "floathelm.com" ||
        hostname.endsWith(".floathelm.com")
      );
    } catch (error) {
      return false;
    }
  }

  function holdLink(anchor) {
    if (!isBookingLink(anchor)) return;
    anchor.href = BOOKING_HASH;
    anchor.removeAttribute("target");
    anchor.removeAttribute("rel");
    anchor.dataset.areteBookingHold = "true";
  }

  function holdLinks(root) {
    if (root && root.matches && root.matches("a[href]")) holdLink(root);
    if (!root || !root.querySelectorAll) return;
    Array.prototype.forEach.call(root.querySelectorAll("a[href]"), holdLink);
  }

  function buildNotice() {
    if (modal) return;

    var style = document.createElement("style");
    style.textContent = [
      ".booking-upgrade-notice{position:fixed;inset:0;z-index:2147483647;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(13,27,62,.62);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px)}",
      ".booking-upgrade-notice.is-visible{display:flex}",
      ".booking-upgrade-notice__card{position:relative;width:min(100%,560px);padding:48px 48px 44px;border:1px solid rgba(199,164,94,.55);border-radius:2px;background:#f8f4ec;color:#0d1b3e;box-shadow:0 24px 70px rgba(13,27,62,.28);text-align:center}",
      ".booking-upgrade-notice__eyebrow{display:block;margin:0 0 14px;color:#92743d;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}",
      ".booking-upgrade-notice__title{margin:0 36px 18px;font-family:'Le Jour Serif',Georgia,serif;font-size:clamp(28px,5vw,40px);font-weight:400;line-height:1.12;letter-spacing:-.02em}",
      ".booking-upgrade-notice__copy{margin:0 auto;max-width:450px;font-family:'Glacial Indifference',Arial,sans-serif;font-size:18px;line-height:1.65}",
      ".booking-upgrade-notice__copy a{color:#0d1b3e;font-weight:700;text-decoration-color:#c7a45e;text-decoration-thickness:2px;text-underline-offset:4px}",
      ".booking-upgrade-notice__copy a:hover,.booking-upgrade-notice__copy a:focus{color:#92743d}",
      ".booking-upgrade-notice__close{position:absolute;top:13px;right:14px;display:grid;width:40px;height:40px;padding:0;border:0;border-radius:50%;background:transparent;color:#0d1b3e;cursor:pointer;font-family:Arial,sans-serif;font-size:29px;font-weight:300;line-height:1;place-items:center}",
      ".booking-upgrade-notice__close:hover,.booking-upgrade-notice__close:focus{background:rgba(13,27,62,.08);outline:2px solid transparent}",
      "@media (max-width:600px){.booking-upgrade-notice{padding:18px}.booking-upgrade-notice__card{padding:44px 24px 36px}.booking-upgrade-notice__title{margin-left:22px;margin-right:22px}.booking-upgrade-notice__copy{font-size:17px}}",
      "@media (prefers-reduced-motion:no-preference){.booking-upgrade-notice.is-visible .booking-upgrade-notice__card{animation:booking-notice-in .24s ease-out both}@keyframes booking-notice-in{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:none}}}"
    ].join("");
    document.head.appendChild(style);

    modal = document.createElement("div");
    modal.className = "booking-upgrade-notice";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "booking-upgrade-title");
    modal.setAttribute("aria-describedby", "booking-upgrade-copy");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = [
      '<div class="booking-upgrade-notice__card">',
      '<button class="booking-upgrade-notice__close" type="button" aria-label="Close notice">&times;</button>',
      '<span class="booking-upgrade-notice__eyebrow">A quick update</span>',
      '<h2 class="booking-upgrade-notice__title" id="booking-upgrade-title">Online Booking Temporarily Unavailable</h2>',
      '<p class="booking-upgrade-notice__copy" id="booking-upgrade-copy">We&rsquo;re finishing our move to Boulevard, so online booking and purchases are temporarily paused. We expect to reopen after midnight tonight, once our final checks are complete. For help, email <a href="mailto:theteam@floatarete.com">theteam@floatarete.com</a> or call <a href="tel:+19196369899">919-636-9899</a>.</p>',
      "</div>"
    ].join("");

    document.body.appendChild(modal);
    closeButton = modal.querySelector(".booking-upgrade-notice__close");
    closeButton.addEventListener("click", hideNotice);
  }

  function showNotice() {
    buildNotice();
    previouslyFocused = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
    window.setTimeout(function () {
      closeButton.focus();
    }, 0);
  }

  function hideNotice() {
    if (!modal) return;
    modal.classList.remove("is-visible");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = previousBodyOverflow;

    if (previouslyFocused && typeof previouslyFocused.focus === "function") {
      previouslyFocused.focus();
    }
  }

  function noticeShownThisVisit() {
    try {
      return window.sessionStorage.getItem(VISIT_NOTICE_KEY) === "shown";
    } catch (error) {
      return false;
    }
  }

  function rememberNoticeForVisit() {
    try {
      window.sessionStorage.setItem(VISIT_NOTICE_KEY, "shown");
    } catch (error) {
      // The notice still works if a visitor has storage disabled.
    }
  }

  document.addEventListener(
    "click",
    function (event) {
      var anchor = event.target.closest ? event.target.closest("a") : null;
      if (!isBookingLink(anchor)) return;

      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === "function") {
        event.stopImmediatePropagation();
      }
      showNotice();
    },
    true
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && modal.classList.contains("is-visible")) {
      hideNotice();
    }
  });

  holdLinks(document);

  if (window.MutationObserver) {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, holdLinks);
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  function showFirstVisitNotice() {
    if (noticeShownThisVisit()) return;
    rememberNoticeForVisit();
    showNotice();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showFirstVisitNotice);
  } else {
    showFirstVisitNotice();
  }
})();
