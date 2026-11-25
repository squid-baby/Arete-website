/* global React, ReactDOM, ResetCampaign */
// "A Year of Possibility" door-hanger landing page (floatarete.com/reset).
// Offer settings, prices and plan links live in reset-campaign.jsx.
const { useState, useEffect, useRef } = React;
const { CAMPAIGN, planPricing, checkoutUrl, currentTime, isOfferActive, readAttribution, track, trackThenContinue } = ResetCampaign;

const PHONE = "919-636-9899";
const PHONE_HREF = "tel:+19196369899";
const EMAIL = "TheTeam@FloatArete.com";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Arete+Float+%2B+Wellness+213+E+Braxton+Foushee+St+Carrboro+NC";

const IconArrow = () =>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const IconDown = () =>
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M7 1v12M2 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

// The small brass key from the door hanger.
const IconKey = () =>
  <svg className="rs-key" width="34" height="14" viewBox="0 0 34 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <circle cx="6" cy="7" r="4.6" />
    <circle cx="6" cy="7" r="1.6" />
    <path d="M10.6 7H32M27 7v4.2M23 7v3" strokeLinecap="round" />
  </svg>;

// ---------- Copy the code ----------
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_) { /* fall through to the older method */ }
  try {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
    document.body.appendChild(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  } catch (_) {
    return false;
  }
}

function CopyCode({ attribution, place }) {
  const [state, setState] = useState("idle");
  const codeRef = useRef(null);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function onCopy() {
    const ok = await copyText(CAMPAIGN.code);
    clearTimeout(timer.current);
    if (ok) {
      setState("copied");
      track("campaign_code_copy", { visit_zone: attribution.content, placement: place });
      timer.current = setTimeout(() => setState("idle"), 4000);
    } else {
      setState("failed");
      // Select the code so a long-press or Ctrl+C copies it.
      const sel = window.getSelection && window.getSelection();
      if (sel && codeRef.current) {
        const range = document.createRange();
        range.selectNodeContents(codeRef.current);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  return (
    <div className="rs-code">
      <span className="rs-code__label">Your code</span>
      <span className="rs-code__value" ref={codeRef}>{CAMPAIGN.code}</span>
      <button type="button" className={`rs-code__btn ${state === "copied" ? "is-done" : ""}`} onClick={onCopy}>
        {state === "copied" ? "Copied" : "Copy code"}
      </button>
      <span className="rs-code__status" role="status" aria-live="polite">
        {state === "copied" && `Code ${CAMPAIGN.code} copied. Paste it at checkout.`}
        {state === "failed" && `Copy did not work here. Your code is ${CAMPAIGN.code}.`}
      </span>
    </div>
  );
}

// ---------- Header ----------
function Header() {
  return (
    <header className="rs-header">
      <a className="rs-brand" href="/" aria-label="Areté Elemental Wellness home">
        <span className="rs-brand__name">ARETÉ</span>
        <span className="rs-brand__tag">Elemental Wellness</span>
      </a>
      <nav className="rs-header__links" aria-label="Areté">
        <a href="memberships.html">All memberships</a>
        <a href={PHONE_HREF}>{PHONE}</a>
      </nav>
    </header>
  );
}

// ---------- Hero / offer ----------
function Hero({ active, attribution }) {
  return (
    <section className="rs-hero" aria-labelledby="rs-title">
      <div className="rs-hero__inner">
        <p className="rs-eyebrow">{active ? "A gift for our neighbors" : "Elemental wellness in Carrboro"}</p>
        <h1 id="rs-title" className="rs-title">A Year of <span>Possibility</span></h1>
        <span className="rs-rule" aria-hidden="true" />
        <p className="rs-lede">Your best you is on the other side <br className="rs-br" />of a good&nbsp;reset.</p>

        {active ?
          <div className="rs-ticket" id="offer">
            <p className="rs-ticket__head"><IconKey /> Your gift</p>
            <p className="rs-ticket__offer">
              <strong>${CAMPAIGN.discount} off</strong> your first month of a&nbsp;membership.
            </p>
            <CopyCode attribution={attribution} place="hero" />
            <p className="rs-ticket__expiry">Valid through {CAMPAIGN.lastDayLabel}.</p>
            <a className="rs-btn rs-btn--primary rs-ticket__cta" href="#plans" data-scroll-cta="hero">
              <span>Find your ritual</span><IconDown />
            </a>
          </div> :
          <div className="rs-ticket rs-ticket--ended" id="offer">
            <p className="rs-ticket__head">This offer has ended</p>
            <p className="rs-ticket__offer">The {CAMPAIGN.code} gift ended on {CAMPAIGN.lastDayLabel}. Thank you for thinking of us. Our memberships are still the best way to make a habit of feeling good.</p>
            <a className="rs-btn rs-btn--primary rs-ticket__cta" href="memberships.html">
              <span>See all memberships</span><IconArrow />
            </a>
          </div>
        }
      </div>
      <div className="rs-hills" aria-hidden="true" />
    </section>
  );
}

// ---------- Plans ----------
function PlanCard({ plan, active }) {
  const p = planPricing(plan);
  return (
    <article className={`rs-plan ${plan.suggested ? "rs-plan--suggested" : ""}`} aria-labelledby={`plan-${plan.id}`}>
      {plan.suggested && <p className="rs-plan__flag">A balanced place to start</p>}
      <p className="rs-plan__intent">{plan.intent}</p>
      <h3 className="rs-plan__name" id={`plan-${plan.id}`}>{plan.name}</h3>
      <p className="rs-plan__summary">{plan.summary}</p>
      <ul className="rs-plan__list">
        {plan.includes.map((line) => <li key={line}>{line}</li>)}
      </ul>

      <div className="rs-plan__buy">
        {active ?
          <>
            <p className="rs-price">
              <span className="rs-price__was"><span className="rs-sr">Regular price </span><s>${p.recurring}</s></span>
              <span className="rs-price__now">${p.first}</span>
              <span className="rs-price__unit">first month</span>
            </p>
            <p className="rs-price__then">
              Then ${p.recurring}/month. {CAMPAIGN.minimumMonths}-month minimum.
            </p>
          </> :
          <>
            <p className="rs-price">
              <span className="rs-price__now">${p.recurring}</span>
              <span className="rs-price__unit">per month</span>
            </p>
            <p className="rs-price__then">{CAMPAIGN.minimumMonths}-month minimum.</p>
          </>
        }
        <a className="rs-btn rs-btn--plan" href={checkoutUrl(plan)} data-plan-id={plan.id}>
          <span>Choose {plan.name}</span><IconArrow />
        </a>
        {active && <p className="rs-plan__code">We copy code <b>{CAMPAIGN.code}</b> when you tap. Paste it at checkout.</p>}
      </div>
    </article>
  );
}

function Plans({ active, attribution }) {
  return (
    <section className="rs-plans" id="plans" tabIndex={-1} aria-labelledby="rs-plans-title">
      <div className="rs-wrap">
        <header className="rs-section-head">
          <h2 id="rs-plans-title" className="rs-h2">What would you like more of this year?</h2>
          <p className="rs-sub">A little more rest, a little more recovery, or a rhythm that brings it all together.</p>
        </header>
        <div className="rs-plan-grid">
          {CAMPAIGN.plans.map((plan) => <PlanCard key={plan.id} plan={plan} active={active} />)}
        </div>

        {active &&
          <ol className="rs-steps" aria-label="How to use your gift">
            <li><span className="rs-steps__n">1</span><span><b>Choose a membership.</b> Checkout opens in Boulevard, our booking system.</span></li>
            <li><span className="rs-steps__n">2</span><span><b>Paste {CAMPAIGN.code} at checkout.</b> ${CAMPAIGN.discount} comes off your first month.</span></li>
            <li><span className="rs-steps__n">3</span><span><b>Book your first visit.</b> Stay in the same window after you pay to pick a day and time.</span></li>
          </ol>
        }

        <div className="rs-plans__more">
          {active && <CopyCode attribution={attribution} place="plans" />}
          <p>
            Looking for sauna, red light, or contrast only? <a href="memberships.html">See all memberships</a>.
            {" "}Every membership has a three-month minimum. <a href="memberships.html#rules">How memberships work</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- The studio ----------
const SERVICES = [
  {
    name: "Float",
    img: "assets/reset/studio-float.webp?v=2", w: 760, h: 426,
    alt: "Watercolor of the float room at Areté: an open float pod glowing blue in a warm, candlelit room.",
    text: "Weightless rest in warm water with over 1,000 pounds of Epsom salt. Quiet, dark, and entirely yours."
  },
  {
    name: "Contrast therapy",
    img: "assets/reset/studio-contrast.webp?v=2", w: 760, h: 424,
    alt: "Watercolor of the private contrast therapy room: a cold plunge tub beside an infrared sauna.",
    text: "A private hour that moves between infrared sauna and cold plunge, at your own pace."
  },
  {
    name: "Infrared sauna",
    img: "assets/reset/studio-sauna.webp?v=2", w: 560, h: 700,
    alt: "Watercolor of the infrared sauna at Areté, its wood bench lit warm amber.",
    text: "Full-spectrum infrared heat. Warm up, slow down, and breathe."
  }
];

function Studio() {
  return (
    <section className="rs-studio" aria-labelledby="rs-studio-title">
      <div className="rs-wrap">
        <header className="rs-section-head">
          <h2 id="rs-studio-title" className="rs-h2">Step inside. Come back to&nbsp;you.</h2>
          <p className="rs-sub">A neighborhood wellness sanctuary in downtown Carrboro. Float, warm up, cool down, and make a little more space for yourself.</p>
        </header>
        <div className="rs-services">
          {SERVICES.map((s) =>
            <figure className="rs-service" key={s.name}>
              <img src={s.img} alt={s.alt} width={s.w} height={s.h} loading="lazy" decoding="async" />
              <figcaption>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </figcaption>
            </figure>
          )}
        </div>
        <figure className="rs-quote">
          <blockquote>
            <p>“Perfect experience. The float tank is so unbelievably relaxing--an experience of true rest--and every detail had been carefully attended to.”</p>
          </blockquote>
          <figcaption>Batsheva G. · Google review <span>Rated 4.9 from 74 Google reviews (October 2026)</span></figcaption>
        </figure>
      </div>
    </section>
  );
}

// ---------- Questions ----------
function Faq({ active }) {
  const items = [
    active && {
      q: "How do I use my gift?",
      a: <>Choose a membership above. When checkout asks for a code, enter <b>{CAMPAIGN.code}</b>. ${CAMPAIGN.discount} comes off your first month. The offer is valid through {CAMPAIGN.lastDayLabel}.</>
    },
    {
      q: "What happens after my first month?",
      a: <>Your membership renews at the regular monthly price shown on your plan. Every membership has a three-month minimum. <a href="memberships.html#rules">Read how memberships work</a>.</>
    },
    {
      q: "Can I pause or cancel?",
      a: <>After the three-month minimum, yes. Write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> at least 14 days before your renewal date. You can pause once, for up to two months. While paused, member rates and benefits stop, and your membership must renew once after a pause before you can cancel. Your member agreement has the complete terms.</>
    },
    {
      q: "When do I book my first visit?",
      a: <>Right after checkout, in the same booking window. Pick your day and time there. If you close the window first, Boulevard asks you to sign in again.</>
    },
    {
      q: "Can I explore other memberships?",
      a: <>Yes. We also have sauna, red light, contrast, and unlimited memberships. <a href="memberships.html">See all memberships</a>. If you want to use {CAMPAIGN.code} on a different plan, call or email us first and we will tell you whether it applies.</>
    },
    {
      q: "Where are you?",
      a: <>213 E. Braxton Foushee St, Carrboro, NC 27510, in downtown Carrboro. <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Get directions</a> or call <a href={PHONE_HREF}>{PHONE}</a>.</>
    }
  ].filter(Boolean);
  return (
    <section className="rs-faq" aria-labelledby="rs-faq-title">
      <div className="rs-wrap rs-wrap--narrow">
        <h2 id="rs-faq-title" className="rs-h2">Questions</h2>
        {items.map((item) =>
          <details className="rs-faq__item" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        )}
      </div>
    </section>
  );
}

// ---------- Closing ----------
function Closing({ active }) {
  return (
    <section className="rs-close" id="closing" aria-labelledby="rs-close-title">
      <div className="rs-close__band">
        <h2 id="rs-close-title" className="rs-close__title">It’s finally time.</h2>
        {active ?
          <>
            <p className="rs-close__offer">${CAMPAIGN.discount} off your first month with code <b>{CAMPAIGN.code}</b>. Valid through {CAMPAIGN.lastDayLabel}.</p>
            <a className="rs-btn rs-btn--light" href="#plans" data-scroll-cta="closing"><span>Find your ritual</span><IconDown /></a>
          </> :
          <a className="rs-btn rs-btn--light" href="memberships.html"><span>See all memberships</span><IconArrow /></a>
        }
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="rs-footer">
      <div className="rs-wrap rs-footer__inner">
        <div>
          <a className="rs-brand rs-brand--footer" href="/">
            <span className="rs-brand__name">ARETÉ</span>
            <span className="rs-brand__tag">Float + Wellness</span>
          </a>
          <p className="rs-footer__address">
            213 E. Braxton Foushee St<br />Carrboro, NC 27510<br />
            <a href={PHONE_HREF}>{PHONE}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </p>
        </div>
        <ul className="rs-footer__links">
          <li><a href="/">Home</a></li>
          <li><a href="memberships.html">All memberships</a></li>
          <li><a href="memberships.html#rules">Membership terms</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="terms.html">Terms &amp; Conditions</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
        </ul>
      </div>
      <p className="rs-footer__copy">© 2026 Areté Float + Wellness</p>
    </footer>
  );
}

// ---------- Mobile bar: keeps the offer one tap away ----------
function StickyBar({ show }) {
  return (
    <div className={`rs-sticky ${show ? "is-shown" : ""}`} aria-hidden={!show}>
      <p><b>{CAMPAIGN.code}</b> · ${CAMPAIGN.discount} off month one</p>
      <a className="rs-btn rs-btn--primary rs-btn--small" href="#plans" tabIndex={show ? 0 : -1} data-scroll-cta="sticky">Find your ritual</a>
    </div>
  );
}

// ---------- Page ----------
let landingTracked = false;

function App() {
  const [now, setNow] = useState(() => currentTime(typeof location !== "undefined" ? location.search : ""));
  const active = isOfferActive(now);
  const [attribution] = useState(() => {
    let storage = null;
    try { storage = window.sessionStorage; } catch (_) { /* blocked */ }
    return readAttribution(typeof location !== "undefined" ? location.search : "", storage);
  });
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    // The page may have been built before the offer ended (see reset.html).
    document.documentElement.classList.remove("rs-ended-pending");

    // A tab left open switches off at the end of the offer.
    const untilEnd = Date.parse(CAMPAIGN.endsAt) - Date.now();
    const endTimer = untilEnd > 0 && untilEnd < 864e5 ? setTimeout(() => setNow(Date.now()), untilEnd + 1000) : 0;

    if (!landingTracked) {
      landingTracked = true;
      track("campaign_landing_view", { visit_source: attribution.source, visit_medium: attribution.medium, visit_campaign: attribution.campaign, visit_zone: attribution.content, offer_active: active });
    }

    // Plan buttons open Boulevard checkout. booking-notice.js handles the
    // click at the document level and stops it there, so listen on the
    // window first to record it.
    // The tap also copies the code, so it is ready to paste in checkout.
    function onClick(event) {
      const link = event.target.closest && event.target.closest("a[data-plan-id]");
      if (!link) return;
      if (link.dataset.tracked === "1") { delete link.dataset.tracked; return; }
      if (active) copyText(CAMPAIGN.code);
      const params = { plan_id: link.dataset.planId, visit_zone: attribution.content, offer_active: active };
      const plainClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
      if (!plainClick || typeof window.gtag !== "function") { track("membership_checkout_click", params); return; }
      event.preventDefault();
      event.stopImmediatePropagation();
      trackThenContinue("membership_checkout_click", params, () => {
        link.dataset.tracked = "1";
        link.click();
      });
    }
    window.addEventListener("click", onClick, true);

    // On phones, show a small offer bar once the offer card has scrolled away,
    // except while the plans are on screen.
    const offer = document.getElementById("offer");
    const plans = document.getElementById("plans");
    const closing = document.getElementById("closing");
    const firstPlan = document.querySelector(".rs-plan");
    let offerVisible = true;
    let closingVisible = false;
    let plansSeen = false;
    let plansVisible = false;
    let io;
    if ("IntersectionObserver" in window && offer && plans) {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.target === offer) offerVisible = e.isIntersecting;
          if (e.target === closing) closingVisible = e.isIntersecting;
          if (e.target === plans) plansVisible = e.isIntersecting;
          if (e.target === firstPlan) {
            if (e.intersectionRatio >= 0.5 && !plansSeen) {
              plansSeen = true;
              track("campaign_plans_view", { visit_zone: attribution.content });
            }
          }
        });
        setShowSticky(active && !offerVisible && !plansVisible && !closingVisible);
      }, { threshold: [0, 0.5] });
      io.observe(offer);
      io.observe(plans);
      if (closing) io.observe(closing);
      if (firstPlan) io.observe(firstPlan);
    }
    return () => {
      clearTimeout(endTimer);
      window.removeEventListener("click", onClick, true);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <>
      <a className="rs-skip" href="#plans">Skip to memberships</a>
      <div className="rs-decor" aria-hidden="true">
        <img className="rs-art rs-art--sprig" src="assets/reset/sprig.webp?v=2" alt="" width="263" height="508" />
        <img className="rs-art rs-art--sun" src="assets/reset/sun-birds.webp?v=2" alt="" width="347" height="218" />
      </div>
      <Header />
      <main>
        <Hero active={active} attribution={attribution} />
        <Plans active={active} attribution={attribution} />
        <Studio />
        <Faq active={active} />
        <Closing active={active} />
      </main>
      <Footer />
      {active && <StickyBar show={showSticky} />}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
