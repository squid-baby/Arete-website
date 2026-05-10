/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Booking links (FloatHelm direct service links) ----------
const BOOK = {
  general: "https://aretefloattank.floathelm.com/booking",
  newGuest: "https://aretefloattank.floathelm.com/store/services/1245698",
  single: "https://aretefloattank.floathelm.com/store/services/1221833",
  twoPerson: "https://aretefloattank.floathelm.com/store/services/1232408"
};

// ---------- Icons ----------
const IconMenu = ({ size = 20 }) =>
<svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
  </svg>;

const IconArrow = ({ size = 14 }) =>
<svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const IconPlus = ({ size = 16, open }) =>
<svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.1"
style={{ transition: "transform .4s ease", transform: open ? "rotate(45deg)" : "none" }}>
    <path d="M8 2v12M2 8h12" strokeLinecap="round" />
  </svg>;

const IconStar = ({ size = 10 }) =>
<svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor">
    <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
  </svg>;

// ---------- Top nav ----------
const GIFTCARDS_URL = "https://aretefloattank.floathelm.com/store/giftcards";
function TopNav({ mobile }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <header className={`nav ${mobile ? "nav--mobile" : ""}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="/" aria-label="Back to Areté home">
          <img src="assets/arete-logo.png?v=2" alt="Areté Elemental Wellness" style={{ width: "120px" }} />
        </a>
        {mobile ?
        <button className="nav__menu" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(v => !v)}><IconMenu /></button> :
        <nav className="nav__links">
            <div className="nav__dropdown">
              <a href="#" className="nav__dropdown-trigger">
                Services
                <svg className="nav__dropdown-caret" width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <div className="nav__dropdown-menu" role="menu">
                <a href="float.html" role="menuitem">Float</a>
                <a href="sauna.html" role="menuitem">Sauna</a>
                <a href="red_light.html" role="menuitem">Red Light Therapy</a>
                <a href="halotherapy.html" role="menuitem">Halotherapy</a>
                <a href="Contrast-Therapy.html" role="menuitem">Contrast Therapy</a>
                <a href="Massage.html" role="menuitem">Massage</a>
                <a href="retail.html" role="menuitem">Retail</a>
              </div>
            </div>
            <a href="memberships.html">Memberships</a>
            <a href="packages.html">Packages</a>
            <a href={GIFTCARDS_URL} target="_blank" rel="noopener">Gift Cards</a>
            <a href="about.html">About</a>
            <a href={BOOK.general} target="_blank" rel="noopener" className="nav__cta" style={{ backgroundColor: "rgb(13, 27, 62)" }}>Book Now</a>
          </nav>
        }
      </div>
      {mobile && (
        <div className={`nav__mobile-drawer ${menuOpen ? "is-open" : ""}`}>
          <span className="nav__mobile-group-label">Services</span>
          <a className="nav__mobile-sub" href="float.html">Float</a>
          <a className="nav__mobile-sub" href="sauna.html">Sauna</a>
          <a className="nav__mobile-sub" href="red_light.html">Red Light Therapy</a>
          <a className="nav__mobile-sub" href="halotherapy.html">Halotherapy</a>
          <a className="nav__mobile-sub" href="Contrast-Therapy.html">Contrast Therapy</a>
          <a className="nav__mobile-sub" href="Massage.html">Massage</a>
          <a className="nav__mobile-sub" href="retail.html">Retail</a>
          <a href="memberships.html">Memberships</a>
          <a href="packages.html">Packages</a>
          <a href={GIFTCARDS_URL} target="_blank" rel="noopener">Gift Cards</a>
          <a href="about.html">About</a>
          <a href={BOOK.general} target="_blank" rel="noopener" className="nav__mobile-cta">Book Now</a>
        </div>
      )}
    </header>);
}

// ---------- Ice cube before/after ----------
// Driven by a <video>: native play/pause/seek, fires `ended` exactly once
// playback finishes, and freezes on the last frame on its own (no loop).
//
// ─── HERO MP4 PLAYBACK FIX (reuse for other service heroes) ──────────────────
// Symptom: <video src="assets/foo.mp4"> never loads. video.error.code === 4
// (MEDIA_ERR_SRC_NOT_SUPPORTED), readyState 0, networkState 3. The codec
// (H.264 Main / Baseline / High, AAC) is fine — canPlayType returns "probably".
// Fetch returns 200 with correct Content-Type and full bytes.
//
// Cause: the dev server (claudeusercontent.com /serve/...) doesn't satisfy
// the partial/range requests the <video> element issues for progressive
// streaming, so the media element gives up parsing.
//
// Two preconditions for the file itself:
//   1. moov atom must come BEFORE mdat (a.k.a. "fast-start" / web-optimized).
//      Re-encode with `ffmpeg -movflags +faststart` or equivalent. If you
//      have a moov-at-end file, it can be rewritten in-place by relocating
//      the moov box and shifting all stco/co64 chunk offsets by +moov.size.
//   2. H.264 video, AAC (or no) audio. Other codecs (HEVC, VP9, AV1) may
//      not play in all browsers.
//
// Runtime workaround: don't set <video src=...> directly. Fetch the mp4 with
// fetch(), wrap the response Blob in URL.createObjectURL(), and use THAT as
// src. The blob URL bypasses the range-request path entirely — the entire
// file is in memory, so the media parser sees a normal seekable stream.
// ──────────────────────────────────────────────────────────────────────────────
function IceCube({ played }) {
  const videoRef = React.useRef(null);
  const [blobUrl, setBlobUrl] = React.useState(null);

  // Fetch the mp4 once and expose it as a blob URL — see header comment.
  React.useEffect(() => {
    let revoke = null;
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("assets/icecube.mp4");
        const blob = await r.blob();
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        revoke = url;
        setBlobUrl(url);
      } catch (_) {}
    })();
    return () => {
      cancelled = true;
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, []);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v || !blobUrl) return;
    if (played) {
      try { v.currentTime = 0; } catch (_) {}
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      v.pause();
      try { v.currentTime = 0; } catch (_) {}
    }
  }, [played, blobUrl]);

  return (
    <div className="ba__frame" style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(180deg, rgba(196,168,224,0.10) 0%, rgba(13,27,62,0.04) 100%)",
      overflow: "hidden", position: "relative"
    }}>
      <video
        ref={videoRef}
        src={blobUrl || undefined}
        muted
        playsInline
        preload="auto"
        style={{
          maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
          position: "relative", zIndex: 1
        }}
      />
    </div>
  );
}

// ---------- Hero ----------
function Hero({ mobile, copy }) {
  const [played, setPlayed] = useState(false);
  return (
    <section className={`hero ${mobile ? "hero--mobile" : ""}`} style={{ opacity: "5" }}>
      <div className="hero__text">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span>Contrast Therapy · 60 min</span>
        </div>
        <h1 className="hero__title">
          {copy.heroTitle.split("\n").map((line, i) =>
          <span key={i} className="hero__line" style={{ animationDelay: `${0.15 * i}s`, color: "rgb(13, 27, 62)" }}>{line}</span>
          )}
        </h1>
        <p className="hero__lede">{copy.heroLede}</p>

        <div className="hero__cta-row">
          <a href={BOOK.newGuest} target="_blank" rel="noopener" className="btn btn--primary">
            <span>BOOK A SESSION</span>
            <IconArrow />
          </a>
          <a href="#learn" className="btn btn--ghost">How it works</a>
        </div>

        <div className="hero__meta">
          <span><IconStar /> New guest · $50 intro</span>
          <span className="hero__meta-dot">·</span>
          <span>Carrboro, NC</span>
        </div>
      </div>

      {!mobile &&
      <div className="hero__visual">
        <div className={`ba ${played ? "ba--float" : "ba--stress"}`}>
          <IceCube played={played} />
          <div className="ba__caption">
            <span className="ba__caption-label">{played ? "After" : "Before"}</span>
            <span className="ba__caption-text" style={{ color: "rgb(74, 91, 160)", textAlign: "right", width: "200px", whiteSpace: "pre-line" }}>
              {played ? "Melted open\nawake\nand alive" : "Frozen tight\nheld\nbraced"}
            </span>
          </div>
        </div>
        <div className="hero__toggle">
          <button
            className={`toggle__pill ${!played ? "is-on" : ""}`}
            onClick={() => setPlayed(false)}>
            Frozen</button>
          <button
            className={`toggle__pill ${played ? "is-on" : ""}`}
            onClick={() => setPlayed(true)} style={{ color: "rgb(196, 168, 224)" }}>
            Play the thaw</button>
        </div>
      </div>
      }
    </section>);
}

// ---------- Benefits ----------
function Benefits({ mobile, copy }) {
  return (
    <section className={`benefits ${mobile ? "benefits--mobile" : ""}`}>
      {copy.benefits.map((b, i) =>
      <div key={i} className="benefit">
          <span className="benefit__num">{String(i + 1).padStart(2, "0")}</span>
          <div className="benefit__body">
            <h3 style={{ color: "rgb(13, 27, 62)", width: "118px" }}>{b.t}</h3>
            <p>{b.d}</p>
          </div>
        </div>
      )}
    </section>);
}

// ---------- Protocol (hot/cold timeline) ----------
function Protocol({ mobile }) {
  const steps = [
  { t: "Warm", d: "15 min in the full-spectrum infrared sauna. Heart rate climbs; vessels open.", min: "175° F" },
  { t: "Plunge", d: "2–3 min in the cold tub. Sharp inhale, then a slow exhale.", min: "39° F" },
  { t: "Repeat", d: "Three full rounds. Each one easier, each one deeper.", min: "×3" },
  { t: "Settle", d: "Towel off, hydrate, return to the world re-tuned.", min: "60 min" }];

  return (
    <section className={`timeline ${mobile ? "timeline--mobile" : ""}`} id="learn">
      <div className="timeline__head">
        <span className="timeline__kicker">A rhythm, not a routine</span>
        <h2>The shape of a session</h2>
      </div>
      <div className="timeline__rail">
        <div className="timeline__line" />
        {steps.map((s, i) =>
        <div key={i} className="step" style={{ animationDelay: `${0.1 * i}s` }}>
            <div className="step__dot"><span /></div>
            <div className="step__min">{s.min}</div>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </div>
        )}
      </div>
    </section>);
}

// ---------- Accordion ----------
function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="acc">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`acc__row ${isOpen ? "is-open" : ""}`}>
            <button className="acc__head" onClick={() => setOpen(isOpen ? null : i)}>
              <span className="acc__q">{it.q}</span>
              <IconPlus open={isOpen} />
            </button>
            <div className="acc__body" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="acc__inner"><p>{it.a}</p></div>
            </div>
          </div>);
      })}
    </div>);
}

function Deepen({ mobile }) {
  const [tab, setTab] = useState(1);
  const tabs = ["How it works", "The science", "What to expect"];
  const bodies = [
  "A full-spectrum dry infrared sauna paired with a single-person cold plunge tub. Warm yourself for 10–15 minutes until you've broken a deep sweat, then step into the 39°F plunge for two to three minutes. Repeat for three rounds. The contrast does the work.",
  "Heat dilates blood vessels and ramps circulation; cold constricts them and clears the system. Cycling between the two — at roughly 175°F sauna and 39°F plunge — trains your vascular system like a workout, releases norepinephrine and dopamine in measurable surges, reduces inflammatory markers, and shifts your nervous system into a sharper, calmer state. Studies show contrast bathing speeds muscle recovery, deepens sleep onset, and improves mood for hours after. Three rounds is the sweet spot most research converges on.",
  "The first plunge is loud — your body protests, your breath quickens, and you'll want to leave. Stay 90 seconds. By round two it gets quieter; by round three many guests linger past three minutes. You'll leave alert, light, and unmistakably awake — a clean kind of energy that holds for hours."];

  const faqs = [
  { q: "Do I need to be in shape?", a: "No. The protocol is self-paced — you set your own time in the cold and the sauna. Most beginners start with shorter plunges and work up." },
  { q: "How cold is the plunge, really?", a: "We hold it at 38–40°F. It's a single-person tub, fully filtered and treated between every session." },
  { q: "Why infrared instead of a traditional sauna?", a: "Full-spectrum infrared heats your body directly rather than the air around you. The session feels gentler at the lungs but penetrates deeper into muscle, joints, and connective tissue." },
  { q: "Is contrast therapy safe?", a: "For most healthy adults, yes — but if you're pregnant or have heart conditions, uncontrolled blood pressure, or are on certain medications, please check with your doctor first." },
  { q: "How often should I come?", a: "Two to three times a week is where most regulars land. The benefits compound: better sleep, faster recovery, steadier mood, sharper mornings." }];

  return (
    <section className={`deepen ${mobile ? "deepen--mobile" : ""}`}>
      <div className="deepen__head">
        <span className="deepen__kicker">Go as deep as you like</span>
        <h2>LeaRN more, when you're ready</h2>
      </div>

      <div className="tabs">
        {tabs.map((t, i) =>
        <button key={t} className={`tabs__btn ${tab === i ? "is-on" : ""}`} onClick={() => setTab(i)}>
            <span className="tabs__idx">0{i + 1}</span>
            <span>{t}</span>
          </button>
        )}
      </div>
      <div className="tabs__body">
        <p>{bodies[tab]}</p>
      </div>

      <div className="deepen__faqs">
        <div className="deepen__faqs-head">
          <span className="deepen__faqs-kicker">Questions we hear often</span>
        </div>
        <Accordion items={faqs} />
      </div>
    </section>);
}

// ---------- Pricing ----------
function Pricing({ mobile }) {
  const plans = [
  { name: "New Guest\n\n", price: "50", note: "Intro session — 60 min", highlight: true, link: BOOK.newGuest },
  { name: "Single\n\n", price: "60", note: "À la carte · 60 min", link: BOOK.single },
  { name: "2-Person\n", price: "90", note: "Share the contrast", link: BOOK.twoPerson },
  { name: "Memberships\n", price: "99", priceSuffix: "+", note: "From $99/mo · many tiers available", link: "https://floatarete.com/memberships.html" }];

  return (
    <section className={`pricing ${mobile ? "pricing--mobile" : ""}`}>
      <div className="pricing__head">
        <span className="pricing__kicker">Simple, unhurried</span>
        <h2>Choose your entry</h2>
      </div>
      <div className="pricing__grid">
        {plans.map((p, i) =>
        <div key={i} className={`plan ${p.highlight ? "plan--on" : ""}`} style={{ height: "355px" }}>
            <span className="plan__badge" style={{ visibility: p.highlight ? "visible" : "hidden" }}>Best first step</span>
            <h3>{p.name}</h3>
            <div className="plan__price" style={{ fontFamily: "LeJour" }}>
              <sup style={{ fontSize: "0.45em", verticalAlign: "0.55em", marginRight: "0.04em", opacity: 0.7 }}>$</sup>{p.price}{p.priceSuffix && <span style={{ fontSize: "0.55em", verticalAlign: "0.4em", opacity: 0.7 }}>{p.priceSuffix}</span>}
            </div>
            <p style={{ height: "30px", padding: "0px", margin: "40px 0px 45px" }}>{p.note}</p>
            <a href={p.link || BOOK.general} target={p.link && p.link.startsWith("http") ? "_blank" : undefined} rel="noopener" className="plan__link">Reserve <IconArrow size={12} /></a>
          </div>
        )}
      </div>
    </section>);
}

// ---------- Quote ----------
function Quote() {
  return (
    <section className="quote">
      <div className="quote__mark">"</div>
      <p>Three rounds and I walked out feeling like I'd slept for nine hours and run a 5k. I'm not the same person I was an hour ago.</p>
      <div className="quote__who">— Daniel K. · Member since 2024</div>
    </section>);
}

// ---------- Final CTA ----------
function FinalCTA({ mobile }) {
  return (
    <section className={`final ${mobile ? "final--mobile" : ""}`}>
      <div className="final__orb" />
      <h2>Sharp is a practice.<br /><em>Begin tomorrow morning.</em></h2>
      <a href={BOOK.newGuest} target="_blank" rel="noopener" className="btn btn--primary btn--lg">
        <span>Reserve your session</span>
        <IconArrow />
      </a>
      <div className="final__meta">
        213 E Braxton Foushee St · Carrboro, NC · 919-636-9899
      </div>
    </section>);
}

// ---------- Sticky bar ----------
function StickyBar() {
  return (
    <div className="stickybar">
      <div>
        <span className="stickybar__from">from</span>
        <span className="stickybar__price">$50</span>
      </div>
      <a href={BOOK.newGuest} target="_blank" rel="noopener" className="btn btn--primary btn--sm">
        Reserve <IconArrow size={12} />
      </a>
    </div>);
}

// ---------- Page ----------
function ServicePage({ mobile, copy }) {
  return (
    <div className={`page ${mobile ? "page--mobile" : "page--desktop"}`}>
      <div className="grain" />
      <TopNav mobile={mobile} />
      <Hero mobile={mobile} copy={copy} />
      <Benefits mobile={mobile} copy={copy} />
      <Protocol mobile={mobile} />
      <Deepen mobile={mobile} />
      <Pricing mobile={mobile} />
      <Quote />
      <FinalCTA mobile={mobile} />
      {mobile && <StickyBar />}
    </div>);
}

// ---------- Tweaks ----------
const CONTRAST_DEFAULTS = /*EDITMODE-BEGIN*/{
  "candle": "#7C6B8A",
  "displayFont": "LeJour",
  "heroTone": "poetic",
  "showWhimsy": true
} /*EDITMODE-END*/;

const CONTRAST_TONES = {
  poetic: {
    heroTitle: "Heat then\nhush.",
    heroLede: "A full-spectrum infrared sauna and a single-person plunge, cycled three times. The body learns the rhythm; the mind goes quiet.",
    benefits: [
    { t: "Sharpen the body", d: "Vessels open and close — circulation trained like a workout." },
    { t: "Steady the mind", d: "A measured release of dopamine that holds for hours." },
    { t: "Recover faster", d: "Inflammation drops; sleep deepens; mornings arrive lighter." }]
  },
  practical: {
    heroTitle: "60 minutes.\n3 rounds.",
    heroLede: "175°F infrared sauna · 39°F cold plunge. Cycle three times. Most guests leave with steadier mood and deeper sleep that same night.",
    benefits: [
    { t: "Reduce inflammation", d: "Cold immersion lowers measured inflammatory markers fast." },
    { t: "Boost dopamine", d: "Cold exposure raises baseline dopamine for up to three hours." },
    { t: "Recover faster", d: "Contrast bathing accelerates muscle recovery between training days." }]
  },
  warm: {
    heroTitle: "Hot.\nThen cold.",
    heroLede: "It's simpler than it sounds — and friendlier than it looks. Go at your pace. Stay as long as feels right. We'll be here when you're done.",
    benefits: [
    { t: "Find your rhythm", d: "You set the time in each room. We just hold the temperatures." },
    { t: "Wake up clearer", d: "Most folks leave brighter than they came in." },
    { t: "Build a habit", d: "Two or three visits a week, and the calm starts to follow you home." }]
  }
};

function App() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange); };
  }, []);

  const [t, setTweak] = useTweaks(CONTRAST_DEFAULTS);
  const copy = CONTRAST_TONES[t.heroTone] || CONTRAST_TONES.poetic;

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--bg", t.darkMode ? "#0D1B3E" : "#FAF9F7");
    r.style.setProperty("--ink", t.darkMode ? "#F4EDE2" : "#0d1b3e");
    r.style.setProperty("--candle", t.candle);
    r.style.setProperty("--paper", t.darkMode ? "#152033" : "#FFFFFF");
    r.style.setProperty("--display-font", t.displayFont === "LeJour" ? "'LeJour', 'Cormorant Garamond', serif" : "'Cormorant Garamond', 'Le Jour Serif', serif");
  }, [t]);

  return (
    <>
      <ServicePage mobile={isMobile} copy={copy} />
    </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
