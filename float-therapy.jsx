/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Booking links (FloatHelm direct service links) ----------
const BOOK = {
  general: "https://aretefloattank.floathelm.com/booking",
  newGuest: "https://aretefloattank.floathelm.com/store/services/1234463",
  float60: "https://aretefloattank.floathelm.com/store/services/1246191",
  float90: "https://aretefloattank.floathelm.com/store/services/1202784"
};

// ---------- Icons (minimal line) ----------
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


// ---------- Site chrome ----------
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

// ---------- Above-the-fold ----------
function Hero({ mobile, copy }) {
  const [stressed, setStressed] = useState(true); // before/after
  // whimsy: gentle drift
  return (
    <section className={`hero ${mobile ? "hero--mobile" : ""}`} style={{ opacity: "5" }}>
      <div className="hero__text">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span>Floatation Therapy · 60 or 90 min</span>
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
          <span><IconStar /> First float · $69 intro</span>
          <span className="hero__meta-dot">·</span>
          <span>Carrboro, NC</span>
        </div>
      </div>

      {!mobile &&
      <div className="hero__visual">
        <BeforeAfter stressed={stressed} setStressed={setStressed} />
        <div className="hero__toggle">
          <button
            className={`toggle__pill ${stressed ? "is-on" : ""}`}
            onClick={() => setStressed(true)}>
            Before</button>
          <button
            className={`toggle__pill ${!stressed ? "is-on" : ""}`}
            onClick={() => setStressed(false)} style={{ color: "rgb(196, 168, 224)" }}>
            After a float</button>
        </div>
      </div>
      }
    </section>);

}

// ---------- Before / after body illustration ----------
function BeforeAfter({ stressed }) {
  const videoRef = React.useRef(null);
  const [blobUrl, setBlobUrl] = React.useState(null);

  // Fetch as blob to bypass Range-request issue in sandbox
  React.useEffect(() => {
    let active = true;
    let createdUrl = null;
    fetch("assets/float-before-after.mp4").
    then((r) => r.blob()).
    then((b) => {
      if (!active) return;
      createdUrl = URL.createObjectURL(b);
      setBlobUrl(createdUrl);
    }).
    catch(() => {});
    return () => {
      active = false;
      if (createdUrl) URL.revokeObjectURL(createdUrl);
    };
  }, []);

  // When stressed → pause on first frame.
  // When not stressed (after-float pressed) → restart from frame 0 and play once.
  // The onEnded handler below pins it to the last frame so it doesn't loop.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v || !blobUrl) return;
    if (stressed) {
      try {v.pause();} catch (_) {}
      try {v.currentTime = 0;} catch (_) {}
    } else {
      try {v.currentTime = 0;} catch (_) {}
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    }
  }, [stressed, blobUrl]);

  return (
    <div className={`ba ${stressed ? "ba--stress" : "ba--float"}`}>
      <div className="ba__frame">
        {blobUrl &&
        <video
          ref={videoRef}
          className="ba__video"
          src={blobUrl}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            try {e.currentTarget.currentTime = 0;} catch (_) {}
          }}
          onEnded={(e) => {
            const v = e.currentTarget;
            try {
              v.pause();
              if (v.duration && isFinite(v.duration)) {
                // Seek just shy of the end so the last frame stays painted.
                v.currentTime = Math.max(0, v.duration - 0.05);
              }
            } catch (_) {}
          }}
          style={{ opacity: 1, backgroundColor: "rgba(255, 255, 255, 0.224)" }} />

        }
      </div>

      <div className="ba__caption">
        <span className="ba__caption-label">{stressed ? "Before" : "After"}</span>
        <span className="ba__caption-text" style={{ color: "rgb(74, 91, 160)", textAlign: "right", width: "200px", height: "120px", whiteSpace: "pre-line" }}>
          {stressed ? "Tense shoulders noisy mind gravity everywhere" : "Weightless\nbody\n quiet mind\n 90 minutes lifted"}
        </span>
      </div>
    </div>);

}

// ---------- Benefits strip ----------
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

// ---------- Timeline (whimsy) ----------
function Timeline({ mobile }) {
  const steps = [
  { t: "Arrive", d: "Dim light, warm tea, a quiet room to settle.", min: "0 min" },
  { t: "Rinse", d: "A brief shower — then into your private pod.", min: "5 min" },
  { t: "Relax", d: "Lights dim. Music fades. You drift.", min: "10–70 min" },
  { t: "Return", d: "Rinse, dress, sip. Step back into the world softly.", min: "70–90 min" }];

  return (
    <section className={`timeline ${mobile ? "timeline--mobile" : ""}`} id="learn">
      <div className="timeline__head">
        <span className="timeline__kicker">An arc, not an appointment</span>
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

// ---------- Accordion (progressive disclosure) ----------
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
  "Ten inches of water. A thousand pounds of Epsom salt. Skin-temperature. Your body becomes buoyant the moment you let go — no effort required. Light and sound fade to a chosen hush.",
  "Twelve hundred pounds of magnesium sulfate hold you weightless while sensory input drops to near-zero — no light, no sound, no gravity to push back against. With nothing to defend against, your nervous system shifts out of fight-or-flight and into the parasympathetic state: heart rate slows, cortisol drops, breath deepens. EEG studies show floaters move from active beta brainwaves into slower alpha and theta — the same territory your brain visits in deep meditation and the moments just before sleep. Meanwhile, magnesium absorbs transdermally through the skin, easing muscle tension and supporting the very neurotransmitters (GABA, serotonin) that keep the calm response humming. Ninety minutes in; a quieter operating system out.",
  "Most first-timers feel the quiet settle in around minute fifteen. Thoughts get quieter. Time stretches. You emerge rinsed, unhurried, and — most report — noticeably looser shoulders, lower back and even jaws relax. Your nervous system is completely reset for the first time in years. "];

  const faqs = [
  { q: "Will I feel claustrophobic?", a: "The pod is larger than it looks — you control the door, the light, and the music the entire time. You can float with the lid fully open." },
  { q: "Do I need to know how to swim?", a: "No. The salt density makes sinking impossible. You lie back and the water does the work." },
  { q: "What do I bring?", a: "Yourself. We provide towels, earplugs, robes, rinse products, and a quiet room afterward." },
  { q: "Is it hygienic?", a: "The saline solution is fully filtered between every session through multiple stages, including UV. The salt concentration alone is inhospitable to microbes." },
  { q: "How often should I float?", a: "Once is transporting. A cadence of every 1–2 weeks compounds: sleep deepens, pain quiets, and attention sharpens." }];


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

// ---------- Pricing snapshot ----------
function Pricing({ mobile }) {
  const plans = [
  { name: "New Guest", price: "$65", note: "Intro session — 60 min", highlight: true, link: BOOK.newGuest },
  { name: "60 Min\n\n", price: "$69", note: "Express float", link: BOOK.float60 },
  { name: "90 Min\n\n", price: "$89", note: "Most Poplar", link: BOOK.float90 },
  { name: "Monthly", price: "\n", note: "\n\n\n\n\nMany Packages Available", link: "memberships.html" }];

  return (
    <section className={`pricing ${mobile ? "pricing--mobile" : ""}`}>
      <div className="pricing__head">
        <span className="pricing__kicker">Simple, unhurried</span>
        <h2>Choose your entry</h2>
      </div>
      <div className="pricing__grid">
        {plans.map((p, i) =>
        <div key={i} className={`plan ${p.highlight ? "plan--on" : ""}`} style={{ height: mobile ? "auto" : "355px" }}>
            <span className="plan__badge" style={{ visibility: p.highlight ? "visible" : "hidden" }}>Best first step</span>
            <h3>{p.name}</h3>
            <div className="plan__price" style={{ fontFamily: "LeJour" }}>{p.price}</div>
            <p style={{ height: mobile ? "auto" : "30px", padding: "0px", margin: mobile ? "10px 0px 18px" : "40px 0px 45px" }}>{p.note}</p>
            <a href={p.link || BOOK.general} target="_blank" rel="noopener" className="plan__link">Reserve <IconArrow size={12} /></a>
          </div>
        )}
      </div>
    </section>);

}

// ---------- Testimonial ----------
function Quote() {
  return (
    <section className="quote">
      <div className="quote__mark">"</div>
      <p>I arrived wound tight and left unreadable by my own stress. I've been back four times since.</p>
      <div className="quote__who">— Maya R. · Floater since 2024</div>
    </section>);

}

// ---------- Footer / final CTA ----------
function FinalCTA({ mobile }) {
  return (
    <section className={`final ${mobile ? "final--mobile" : ""}`}>
      <div className="final__orb" />
      <h2>Quiet is a practice.<br /><em>Begin tonight.</em></h2>
      <a href={BOOK.newGuest} target="_blank" rel="noopener" className="btn btn--primary btn--lg">
        <span>Reserve your session</span>
        <IconArrow />
      </a>
      <div className="final__meta">
        213 E Braxton Foushee St · Carrboro, NC · 919-636-9899
      </div>
    </section>);

}

// ---------- Sticky mobile book bar ----------
function StickyBar() {
  return (
    <div className="stickybar">
      <div>
        <span className="stickybar__from">from</span>
        <span className="stickybar__price">$69</span>
      </div>
      <a href={BOOK.newGuest} target="_blank" rel="noopener" className="btn btn--primary btn--sm">
        Reserve <IconArrow size={12} />
      </a>
    </div>);

}

// ---------- Whole page ----------
function ServicePage({ mobile, copy }) {
  return (
    <div className={`page ${mobile ? "page--mobile" : "page--desktop"}`}>
      <div className="grain" />
      <TopNav mobile={mobile} />
      <Hero mobile={mobile} copy={copy} />
      <Benefits mobile={mobile} copy={copy} />
      <Timeline mobile={mobile} />
      <Deepen mobile={mobile} />
      <Pricing mobile={mobile} />
      <Quote />
      <FinalCTA mobile={mobile} />
      {mobile && <StickyBar />}
    </div>);

}

// ---------- Tweakable root ----------
const DEFAULTS = /*EDITMODE-BEGIN*/{
  "candle": "#7C6B8A",
  "displayFont": "LeJour",
  "heroTone": "poetic",
  "showWhimsy": true
} /*EDITMODE-END*/;

const TONES = {
  poetic: {
    heroTitle: "Surrender\nto stillness.",
    heroLede: "Ten inches of water, skin-temperature, dissolved with a thousand pounds of salt. You let go; the water holds you.",
    benefits: [
    { t: "Relax the body", d: "Drop the day's weight the moment the lid closes." },
    { t: "Reboot Your Best self", d: "Epsom salt unwinds what hours at a desk knotted." },
    { t: "Quiet the noise", d: "Ninety minutes that feel like a long weekend away." }]

  },
  practical: {
    heroTitle: "60 minutes.\nZero gravity.",
    heroLede: "A private pod, skin-temperature saltwater, and complete silence. Your nervous system downshifts in under fifteen.",
    benefits: [
    { t: "Lower cortisol", d: "Measured stress response drops within a single session." },
    { t: "Ease pain", d: "Magnesium and gravity relief compound for chronic tension." },
    { t: "Deepen sleep", d: "Floaters report longer, slower-wave sleep the same night." }]

  },
  warm: {
    heroTitle: "Come as\nyou are.",
    heroLede: "No experience needed. No routine to follow. Just warm water, quiet light, and the kindest version of ninety minutes off.",
    benefits: [
    { t: "Be held", d: "The water does the work. You just let go." },
    { t: "Breathe easier", d: "Most folks leave softer, lighter, and a little brighter." },
    { t: "Take it home", d: "The calm you find in the pod tends to linger for days." }]

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

  const [t, setTweak] = useTweaks(DEFAULTS);
  const copy = TONES[t.heroTone] || TONES.poetic;

  // Apply CSS vars globally
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