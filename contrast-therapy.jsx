/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Booking links (Boulevard routes are upgraded site-wide) ----------
const BOOK = {
  general: "https://aretefloattank.floathelm.com/booking",
  session: "https://aretefloattank.floathelm.com/booking/2026/5/27",
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
            <a href={GIFTCARDS_URL} target="_blank" rel="noopener noreferrer">Gift Cards</a>
            <a href="about.html">About</a>
            <a href={BOOK.general} target="_blank" rel="noopener noreferrer" className="nav__cta" style={{ backgroundColor: "rgb(13, 27, 62)" }}>Book Now</a>
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
          <a href={GIFTCARDS_URL} target="_blank" rel="noopener noreferrer">Gift Cards</a>
          <a href="about.html">About</a>
          <a href={BOOK.general} target="_blank" rel="noopener noreferrer" className="nav__mobile-cta">Book Now</a>
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
// (H.264 Main / Baseline / High, AAC) is fine, canPlayType returns "probably".
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
// src. The blob URL bypasses the range-request path entirely, the entire
// file is in memory, so the media parser sees a normal seekable stream.
// ──────────────────────────────────────────────────────────────────────────────
function IceCube({ played }) {
  const videoRef = React.useRef(null);
  const [blobUrl, setBlobUrl] = React.useState(null);

  // Fetch the mp4 once and expose it as a blob URL, see header comment.
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
          <a href={BOOK.session} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
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

// ---------- Local SEO intro ----------
function LocalRecoveryLinks({ mobile }) {
  return (
    <section className={`local-seo ${mobile ? "local-seo--mobile" : ""}`}>
      <span className="local-seo__kicker">Cold plunge near Chapel Hill</span>
      <h2>Recovery services for Carrboro, Chapel Hill, and Durham.</h2>
      <p>
        Areté offers cold plunge therapy and contrast therapy in Carrboro, minutes from Chapel Hill and a short drive from Durham. Guests cycle between our <a href="sauna.html">infrared sauna</a> and cold plunge for a simple sauna and cold plunge ritual that supports athletic recovery, wellness recovery, circulation, resilience, and stress reduction.
      </p>
      <p>
        Contrast therapy pairs well with our broader <a href="/">recovery services</a>, including <a href="float.html">float therapy</a>. If you plan to make cold plunge or ice bath sessions part of your routine, explore our <a href="memberships.html">wellness memberships</a>.
      </p>
    </section>);
}

// ---------- Protocol (hot/cold timeline) ----------
function Protocol({ mobile }) {
  const steps = [
  { t: "Warm", d: "15 min in the full-spectrum infrared sauna. Heart rate climbs; vessels open.", min: "175° F" },
  { t: "Plunge", d: "2–3 min in the cold plunge. The ice bath effect is clean, focused, and fully controlled.", min: "51° F" },
  { t: "Repeat", d: "Three full sauna and cold plunge rounds. Each one easier, each one deeper.", min: "×3" },
  { t: "Settle", d: "Towel off, hydrate, and return to Carrboro, Chapel Hill, or Durham re-tuned.", min: "60 min" }];

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
  "A full-spectrum dry infrared sauna paired with a single-person cold plunge tub. Warm yourself for 10–15 minutes until you've broken a deep sweat, then step into the 51°F cold plunge for two to three minutes. Repeat for three rounds. The contrast therapy does the work.",
  "Heat dilates blood vessels and ramps circulation; cold constricts them and clears the system. Cycling between the two, at roughly 175°F infrared sauna and 51°F cold plunge, trains your vascular system like a workout and supports athletic recovery, wellness recovery, resilience, and a sharper, calmer state.",
  "The first plunge is loud, your body protests, your breath quickens, and you'll want to leave. Stay 90 seconds. By round two it gets quieter; by round three many guests linger past three minutes. You'll leave alert, light, and unmistakably awake, a clean kind of energy that holds for hours."];

  const faqs = [
  { q: "What is a cold plunge?", a: "A cold plunge is a tub of cold water used for short, intentional cold-water immersion. It is sometimes called an ice bath, though a cold plunge is usually cleaner, more controlled, and easier to repeat as a wellness ritual." },
  { q: "What are the benefits of cold plunge therapy?", a: "Cold plunge therapy may support recovery, circulation, resilience, stress management, alertness, and post-exercise soreness. It is commonly used for athletic recovery and wellness recovery routines." },
  { q: "How long should I stay in a cold plunge?", a: "Many beginners start with 30 to 90 seconds and build slowly. Experienced guests may work toward two to three minutes. The right amount depends on your body, health history, and comfort level." },
  { q: "What is contrast therapy?", a: "Contrast therapy alternates heat and cold, such as infrared sauna and cold plunge, to create a controlled hot-cold cycle that supports circulation, recovery, and nervous system resilience." },
  { q: "Why combine sauna and cold plunge?", a: "Combining sauna and cold plunge gives the body a clear contrast between heat and cold. The infrared sauna warms the body and encourages circulation; the cold plunge brings a focused cooling response." },
  { q: "Is cold plunge therapy safe?", a: "Cold plunge therapy is well tolerated by many healthy adults, but it is not right for everyone. People who are pregnant, have heart conditions, blood pressure concerns, or other medical conditions should check with a clinician first." },
  { q: "Is cold plunge therapy good after exercise?", a: "Cold plunge therapy is often used after exercise to support athletic recovery, soreness management, and a calmer post-workout state. Some athletes prefer it after hard training days rather than immediately before strength sessions." },
  { q: "How often should I do cold plunge therapy?", a: "Many people start once a week and build from there. Regular guests often use cold plunge or contrast therapy one to three times weekly, depending on recovery needs, training load, and how their body responds." }];

  return (
    <section className={`deepen ${mobile ? "deepen--mobile" : ""}`}>
      <div className="deepen__head">
        <span className="deepen__kicker">Go as deep as you like</span>
        <h2>Learn more, when you're ready</h2>
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
          <span className="deepen__faqs-kicker">Cold plunge FAQ</span>
        </div>
        <Accordion items={faqs} />
      </div>
    </section>);
}

// ---------- Pricing ----------
function Pricing({ mobile }) {
  const plans = [
  { name: "New Guest\n\n", price: "50", note: "Intro session, 60 min", highlight: true, link: BOOK.newGuest },
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
      <div className="quote__who">Daniel K. · Member since 2024</div>
    </section>);
}

// ---------- Final CTA ----------
function FinalCTA({ mobile }) {
  return (
    <section className={`final ${mobile ? "final--mobile" : ""}`}>
      <div className="final__orb" />
      <h2>Cold plunge is a practice.<br /><em>Begin in Carrboro.</em></h2>
      <a href={BOOK.newGuest} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--lg">
        <span>Reserve cold plunge</span>
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
      <a href={BOOK.newGuest} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
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
      <LocalRecoveryLinks mobile={mobile} />
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
    heroTitle: "Cold Plunge & \nContrast Therapy",
    heroLede: "Areté offers cold plunge therapy and contrast therapy in Carrboro, serving Chapel Hill, Durham, and the surrounding area. Alternate between our infrared sauna and cold plunge to support recovery, circulation, stress management, resilience, and overall wellness.",
    benefits: [
    { t: "Cold plunge therapy", d: "A controlled ice bath-style plunge for recovery, resilience, and nervous system training." },
    { t: "Sauna and cold plunge", d: "Infrared sauna heat and cold plunge contrast support circulation and stress reduction." },
    { t: "Athletic recovery", d: "A practical wellness recovery ritual for Carrboro, Chapel Hill, and Durham bodies in motion." }]
  },
  practical: {
    heroTitle: "Cold Plunge & \nContrast Therapy",
    heroLede: "Cold plunge therapy in Carrboro near Chapel Hill and Durham. Cycle between a 175°F infrared sauna and 51°F cold plunge for athletic recovery, circulation, resilience, stress relief, and wellness support.",
    benefits: [
    { t: "Cold plunge therapy", d: "A controlled ice bath-style plunge for recovery, resilience, and nervous system training." },
    { t: "Sauna and cold plunge", d: "Infrared sauna heat and cold plunge contrast support circulation and stress reduction." },
    { t: "Athletic recovery", d: "A practical wellness recovery ritual for Carrboro, Chapel Hill, and Durham bodies in motion." }]
  },
  warm: {
    heroTitle: "Cold Plunge & \nContrast Therapy",
    heroLede: "Areté offers cold plunge and contrast therapy in Carrboro for Chapel Hill, Durham, and nearby communities. Pair infrared sauna with cold plunge to support recovery, circulation, resilience, stress reduction, and wellness.",
    benefits: [
    { t: "Cold plunge therapy", d: "A controlled ice bath-style plunge for recovery, resilience, and nervous system training." },
    { t: "Sauna and cold plunge", d: "Infrared sauna heat and cold plunge contrast support circulation and stress reduction." },
    { t: "Athletic recovery", d: "A practical wellness recovery ritual for Carrboro, Chapel Hill, and Durham bodies in motion." }]
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
