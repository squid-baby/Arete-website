(function () {
  "use strict";

  // Eastern time: available now through the end of November 30, 2026.
  var startsAt = Date.parse("2026-11-24T00:00:00-05:00");
  var endsAt = Date.parse("2026-12-01T00:00:00-05:00");
  var dismissalKey = "arete-black-friday-2026-dismissed";
  var now = Date.now();
  if (now < startsAt || now >= endsAt) return;
  try { if (sessionStorage.getItem(dismissalKey)) return; } catch (_) {}

  var popup = document.createElement("dialog");
  popup.className = "bf-popup";
  popup.setAttribute("aria-labelledby", "bf-title");
  popup.innerHTML = `
    <button type="button" class="bf-popup__close" aria-label="Close Black Friday offer" autofocus>×</button>
    <div class="bf-popup__layout">
      <img class="bf-popup__art" src="assets/black-friday-2026.png" alt="Areté Black Friday starts early: our blue-lit float pod and contrast therapy room, with a gold gift card." width="1122" height="1402">
      <div class="bf-popup__copy">
        <p class="bf-popup__eyebrow">Black Friday · Through November 30</p>
        <h2 id="bf-title">Give $150.<br>Enjoy a session on us.</h2>
        <p>Purchase a <strong>$150 Areté gift card</strong> and receive a bonus voucher for <strong>one full 60-minute float or contrast session.</strong></p>
        <p class="bf-popup__code">Use code <strong>BlackFriday</strong> at checkout.</p>
        <a class="bf-popup__cta" href="https://www.joinblvd.com/b/52268a33-85eb-4646-b0f0-8a61f9510654/widget?path=%2Fcart%2Fmenu%2FGift%20Cards%2FGIFT_CARD">Get a $150 gift card →</a>
        <p class="bf-popup__terms">Create an Areté account or sign in when purchasing. We’ll manually add your bonus voucher to your purchaser account within 24 hours. Keep it or share it. Voucher expires 356 days after purchase.</p>
        <p class="bf-popup__terms">Offer ends November 30, 2026, at 11:59 p.m. Eastern.</p>
      </div>
    </div>`;
  document.body.appendChild(popup);

  var previousOverflow;
  var previousFocus;
  var expiryTimer;
  var cleanedUp = false;
  function cleanup() {
    if (cleanedUp) return;
    cleanedUp = true;
    clearTimeout(expiryTimer);
    document.body.style.overflow = previousOverflow;
    try { sessionStorage.setItem(dismissalKey, "1"); } catch (_) {}
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
    window.removeEventListener("click", closeBeforeCheckout, true);
    popup.remove();
  }
  function dismiss() {
    popup.close();
    // Finish cleanup before Boulevard opens; the native close event is queued.
    cleanup();
  }
  function closeBeforeCheckout(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var anchor = event.target.closest ? event.target.closest(".bf-popup__cta") : null;
    if (anchor && popup.contains(anchor)) dismiss();
  }
  // Boulevard intercepts clicks at document capture and stops propagation.
  // Window capture runs first, so checkout is never trapped behind our dialog.
  window.addEventListener("click", closeBeforeCheckout, true);
  popup.querySelector(".bf-popup__close").addEventListener("click", dismiss);
  popup.addEventListener("click", function (event) {
    var bounds = popup.getBoundingClientRect();
    if (event.target === popup && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dismiss();
  });
  popup.addEventListener("close", cleanup);
  // Recheck immediately before opening, including a tab left open at midnight.
  setTimeout(function () {
    if (Date.now() >= endsAt) { popup.remove(); return; }
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    popup.showModal();
    document.body.style.overflow = "hidden";
    expiryTimer = setTimeout(dismiss, endsAt - Date.now());
  }, 1200);
})();
