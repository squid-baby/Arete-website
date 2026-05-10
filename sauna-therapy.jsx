/* global React */
const { useState, useEffect } = React;

// ---------- Booking links (FloatHelm direct service links) ----------
const BOOK = {
  general: "https://aretefloattank.floathelm.com/booking",
  sauna15: "https://aretefloattank.floathelm.com/store/services/1202785",
  sauna30: "https://aretefloattank.floathelm.com/store/services/1202786",
  sauna30Two: "https://aretefloattank.floathelm.com/store/services/1232409"
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

const IconHeat = ({ size = 12 }) =>
<svg width={size} height={size} viewBox="0 0 12 12" fill="currentColor">
    <path d="M6 1 C 4 3, 4 4.5, 5 6 C 5.5 7, 5.5 8, 5 9 C 6 8.5, 7 7.5, 7 6 C 7 4.5, 6.5 3, 6 1 Z" />
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

// ---------- Hero ----------
function Hero({ mobile, copy }) {
  return (
    <section className={`hero ${mobile ? "hero--mobile" : ""}`}>
      <div className="hero__text">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span>Full-Spectrum Infrared · 30 min</span>
        </div>
        <h1 className="hero__title">
          {copy.heroTitle.split("\n").map((line, i) =>
          <span key={i} className="hero__line" style={{ animationDelay: `${0.15 * i}s`, color: "rgb(13, 27, 62)" }}>{line}</span>
          )}
        </h1>
        <p className="hero__lede">{copy.heroLede}</p>

        <div className="hero__cta-row">
          <a href={BOOK.sauna30} target="_blank" rel="noopener" className="btn btn--primary">
            <span>BOOK A SESSION</span>
            <IconArrow />
          </a>
          <a href="#learn" className="btn btn--ghost">How it works</a>
        </div>

        <div className="hero__meta hero__meta--sauna">
          <span className="chip"><strong>140–150°F</strong> cabin</span>
          <span className="chip"><strong>7×</strong> the detox of traditional</span>
          <span className="chip"><strong>~600</strong> cal / session</span>
        </div>
      </div>

      {!mobile &&
      <div className="hero__visual hero__visual--sauna">
        <img
          src="assets/sauna-hero.png"
          alt="Full-spectrum infrared sauna cabin at Areté Float + Wellness, Carrboro NC"
          className="sauna-hero-img"
          loading="eager"
          decoding="async" />
      </div>
      }
    </section>);
}

// ---------- Benefits (6-cell grid) ----------
function Benefits({ mobile, copy }) {
  return (
    <section className={`benefits benefits--grid6 ${mobile ? "benefits--mobile" : ""}`}>
      {copy.benefits.map((b, i) =>
      <div key={i} className="benefit benefit--cell">
          <span className="benefit__num">{String(i + 1).padStart(2, "0")} / 06</span>
          <h3>{b.t}</h3>
          <p>{b.d}</p>
          {b.metric && <span className="benefit__metric">{b.metric}</span>}
        </div>
      )}
    </section>);
}

// ---------- Timeline ----------
function Timeline({ mobile }) {
  const steps = [
  { t: "Arrive", d: "Settle in. Change into the provided robe and slippers in your private suite.", min: "0 min" },
  { t: "Hydrate", d: "Cool electrolyte water before you step in — heat works better when you're topped off.", min: "5 min" },
  { t: "Heat", d: "Full-spectrum infrared. Phone away, breath slow. Sweat builds around minute fifteen.", min: "5–35 min" },
  { t: "Cool", d: "Step out, towel down, optional rinse. Heart rate eases as core temperature unwinds.", min: "35–40 min" },
  { t: "Return", d: "Lounge a beat. Re-hydrate. Walk back into the day a measurable degree calmer.", min: "40+ min" }];

  return (
    <section className={`timeline ${mobile ? "timeline--mobile" : ""}`} id="learn">
      <div className="timeline__head">
        <span className="timeline__kicker">A 30-minute arc</span>
        <h2>The shape of a session</h2>
      </div>
      <div className="timeline__rail" style={{ gridTemplateColumns: mobile ? "1fr" : "repeat(5, 1fr)" }}>
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

// ---------- Pairs With cards ----------
function PairsWith({ mobile }) {
  const pairs = [
  {
    kicker: "Stack 1",
    name: "Red Light Therapy",
    body: "Pair a 30-minute infrared session with a red-light protocol — same warm room, complementary mechanism. Mitochondrial repair on top of cellular detox.",
    href: "#",
    cta: "Read about red light"
  },
  {
    kicker: "Stack 2",
    name: "Cold Plunge",
    body: "Heat then cold. The classic contrast loop — sauna dilates, plunge constricts, the whole vascular system gets a workout while you barely move.",
    href: "Contrast-Therapy.html",
    cta: "Contrast therapy"
  },
  {
    kicker: "Stack 3",
    name: "Float",
    body: "Sauna burns off the tension; the float tank does the rest. We see the deepest sleep reports from members who finish a sweat session in the pod.",
    href: "float.html",
    cta: "Floatation therapy"
  }];

  return (
    <div className="pairs-grid">
      {pairs.map((p, i) =>
      <a key={i} href={p.href} className="pair-card">
          <span className="pair-card__kicker">{p.kicker}</span>
          <h4>{p.name}</h4>
          <p>{p.body}</p>
          <span className="pair-card__link">{p.cta} <IconArrow size={11} /></span>
        </a>
      )}
    </div>);
}

// ---------- Deepen (tabs + FAQ) ----------
function Deepen({ mobile }) {
  const [tab, setTab] = useState(0);
  const tabs = ["The science", "What to expect", "Pairs with"];

  const faqs = [
  { q: "Is infrared different from a traditional sauna?", a: "Yes — meaningfully. Traditional saunas heat the air around you (often 180–200°F) and you sweat from external convection. Infrared cabins run cooler (140–150°F) but the wavelengths penetrate one to two inches into tissue, so the heat builds from the inside out. Most people report a deeper, more comfortable sweat at lower air temperature." },
  { q: "What do I wear, and what should I bring?", a: "Whatever feels right — swimsuit, shorts, or nothing at all (your suite is private). We provide robes, towels, slippers, cool electrolyte water, and a quiet rinse area afterward. Just leave the phone in the locker." },
  { q: "Can I sauna on the same day as a float?", a: "Absolutely — and many members do. We recommend sauna first (sweat out tension), then float (let the magnesium and weightlessness reset the nervous system). Cold plunge between the two is the full reset stack." },
  { q: "Who shouldn't use the sauna?", a: "If you're pregnant, have uncontrolled blood pressure, recent surgery, a fever, or are on medications that affect heat regulation, please check with your physician first. Our front-desk team will walk you through the intake form on your first visit." },
  { q: "How often should I go?", a: "Most members aim for 2–4 sessions per week to compound the cardiovascular and detox benefits. Even one weekly session moves the needle on sleep and stress markers — start where you can sustain." }];

  const bodies = [
  // The science
  "Full-spectrum infrared raises core temperature without overheating the air. Inside fifteen minutes, your body responds as if you'd run a few miles: heart rate climbs, blood vessels dilate, and a flood of heat-shock proteins (HSPs) hits the bloodstream. HSPs scavenge free radicals, repair damaged proteins, and protect against the oxidative stress that drives muscle breakdown and aging. Cortisol drops; serotonin and norepinephrine rise. Cellular metabolism accelerates, breaking liquid molecules apart and pulling stored toxins through the skin — which is why infrared sweat measures roughly seven times more dense in heavy metals and chemical residue than a traditional sauna's. Thirty minutes in; an immune system, cardiovascular network, and nervous system that all just got a workout you didn't have to do.",

  // What to expect
  "First-timers usually feel the heat settle in around minute ten. The sweat is slow at first, then sudden — an honest, drenching sweat that keeps coming for several minutes after you step out. Your heart rate will climb the way it does on a brisk walk; that's normal and the point. Breathe slow, sip water, and don't push past comfortable. Most people leave noticeably looser in the shoulders and lower back, mentally clearer, and sleep an hour deeper that night. Plan a relaxed exit — this isn't a workout you want to rush back into traffic from.",

  // Pairs with — handled separately as cards below this paragraph
  "Sauna is a foundation, not an island. The same thirty minutes compounds when you stack it against complementary modalities — pre-load with red light to amplify the cellular repair, follow with a cold plunge to lock in the vascular tone, or finish in the float tank to drop the nervous system the rest of the way down."];

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
        {tab === 2 && <PairsWith mobile={mobile} />}
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
  { name: "Single\nSession", price: "30", note: "30 minutes · drop in any time", highlight: true, feature: true, link: BOOK.sauna30 },
  { name: "6-Session\nPack", price: "160", note: "Save with a multi-pack · ask the front desk", link: "https://aretefloattank.floathelm.com/store/memberships/1220706" },
  { name: "12-Session\nPack", price: "324", note: "Monthly access · multiple tiers available", link: "https://aretefloattank.floathelm.com/store/memberships/1203177" }];

  return (
    <section className={`pricing pricing--sauna ${mobile ? "pricing--mobile" : ""}`}>
      <div className="pricing__head">
        <span className="pricing__kicker">Simple pricing</span>
        <h2>One length. Thirty minutes.</h2>
      </div>
      <div className="pricing__grid">
        {plans.map((p, i) =>
        <div key={i} className={`plan ${p.highlight ? "plan--on" : ""} ${p.feature ? "plan--feature" : ""}`} style={{ height: "300px" }}>
            <span className="plan__badge" style={{ visibility: p.highlight ? "visible" : "hidden" }}>Most popular</span>
            <h3 style={{ whiteSpace: "pre-line" }}>{p.name}</h3>
            <div className="plan__price" style={{ fontFamily: "LeJour", height: "65.599998px" }}>
              {p.price === "—" ? <span style={{ opacity: 0.5, fontSize: "22px" }}>$324
            </span> : <><span style={{ fontSize: "0.55em", verticalAlign: "0.6em", marginRight: 4, opacity: 0.7 }}>$</span>{p.price}</>}
            </div>
            <p style={{ height: "auto", padding: "0", margin: "16px 0 28px" }}>{p.note}</p>
            <a href={p.link || BOOK.general} target="_blank" rel="noopener" className="plan__link">Reserve <IconArrow size={12} /></a>
          </div>)}
      </div>
    </section>);
}

// ---------- Testimonial ----------
function Quote() {
  return (
    <section className="quote">
      <div className="quote__mark">"</div>
      <p>I started with one session a week for the back pain. Three months in I'm sleeping deeper than I have in a decade.</p>
      <div className="quote__who">— Daniel K. · Member since 2024</div>
    </section>);
}

// ---------- Final CTA ----------
function FinalCTA({ mobile }) {
  return (
    <section className={`final ${mobile ? "final--mobile" : ""}`}>
      <div className="final__orb" />
      <h2>Heat is medicine.<br /><em>Thirty minutes is enough.</em></h2>
      <a href={BOOK.sauna30} target="_blank" rel="noopener" className="btn btn--primary btn--lg">
        <span>Reserve your session</span>
        <IconArrow />
      </a>
      <div className="final__meta">
        213 E Braxton Foushee St · Carrboro, NC · 919-636-9899
      </div>
    </section>);
}

// ---------- Sticky mobile bar ----------
function StickyBar() {
  return (
    <div className="stickybar">
      <div>
        <span className="stickybar__from">from</span>
        <span className="stickybar__price">$30</span>
      </div>
      <a href={BOOK.sauna30} target="_blank" rel="noopener" className="btn btn--primary btn--sm">
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
  "candle": "#C8633A",
  "heroTone": "practical",
  "showRedLightCrosspromo": true
} /*EDITMODE-END*/;

const SIX_BENEFITS = [
{
  t: "Pain Relief",
  d: "Infrared wavelengths penetrate one to two inches into tissue, releasing anti-inflammatory hormones at the source of joint and muscle tension.",
  metric: "1–2 in. tissue penetration"
},
{
  t: "Detoxification",
  d: "Cellular metabolism accelerates and pushes stored toxins out through the skin — denser sweat than any traditional sauna can produce.",
  metric: "7× detox vs. traditional"
},
{
  t: "Cardiovascular",
  d: "Repeated sessions improve vascular function in patients with high blood pressure, diabetes, and cholesterol — a passive workout for the heart.",
  metric: "30 min · 3× weekly"
},
{
  t: "Immune Support",
  d: "Heat raises white blood cell counts and triggers heat-shock proteins shown to neutralize even drug-resistant bacteria and accelerate wound healing.",
  metric: "WBC ↑ · HSPs ↑"
},
{
  t: "Stress & Sleep",
  d: "Cortisol drops while serotonin climbs. Most members report deeper, slower-wave sleep the same night as a session.",
  metric: "Cortisol ↓ · Serotonin ↑"
},
{
  t: "Anti-Aging",
  d: "12 weeks of regular infrared sessions measurably increased collagen production and reduced fine lines in a Journal of Cosmetic & Laser Therapy study.",
  metric: "Collagen ↑ · 12-wk study"
}];

const TONES = {
  practical: {
    heroTitle: "Heat that\nworks deep.",
    heroLede: "Full-spectrum infrared penetrates one to two inches into tissue — easing pain at the source while cortisol drops, white blood cells climb, and the cardiovascular system gets a workout you don't have to earn.",
    benefits: SIX_BENEFITS
  },
  poetic: {
    heroTitle: "Sweat,\nthen settle.",
    heroLede: "Thirty minutes of warm cedar light. Your shoulders fall, your breath lengthens, and a slow honest sweat carries the week out through your skin.",
    benefits: SIX_BENEFITS
  },
  bold: {
    heroTitle: "Burn it\noff. Reset.",
    heroLede: "600 calories. Seven times the detox of a traditional cabin. Heat-shock proteins, cardiovascular tone, and a nervous system that finally exhales — in thirty minutes flat.",
    benefits: SIX_BENEFITS
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
  const copy = TONES[t.heroTone] || TONES.practical;

  // Apply CSS vars globally
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--candle", t.candle);
  }, [t]);

  return (
    <>
      <ServicePage mobile={isMobile} copy={copy} />
    </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);