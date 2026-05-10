/* global React */
const { useState, useEffect } = React;

// ---------- Icons ----------
const IconMenu = ({ size = 20 }) =>
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
  </svg>;

const IconArrow = ({ size = 14 }) =>
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const IconSpark = ({ size = 10 }) =>
  <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor">
    <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
  </svg>;

// ---------- Top nav (matches halotherapy) ----------
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
            <a href="memberships.html" style={{ color: "rgb(13, 27, 62)" }}>Memberships</a>
            <a href="packages.html">Packages</a>
            <a href={GIFTCARDS_URL} target="_blank" rel="noopener">Gift Cards</a>
            <a href="about.html">About</a>
            <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener" className="nav__cta" style={{ backgroundColor: "rgb(13, 27, 62)" }}>Book Now</a>
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
          <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener" className="nav__mobile-cta">Book Now</a>
        </div>
      )}
    </header>
  );
}

// ---------- Hero ----------
function Hero({ mobile }) {
  return (
    <section className={`hero ${mobile ? "hero--mobile" : ""}`} style={{ minHeight: mobile ? 0 : 460 }}>
      <div className="hero__text" style={{ gridColumn: mobile ? "auto" : "1 / -1", maxWidth: 880, margin: mobile ? 0 : "0 auto", textAlign: mobile ? "left" : "center" }}>
        <div className="hero__eyebrow" style={{ justifyContent: mobile ? "flex-start" : "center" }}>
          <span className="hero__eyebrow-line" />
          <span>Memberships · a monthly ritual</span>
          <span className="hero__eyebrow-line" />
        </div>
        <h1 className="hero__title">
          <span className="hero__line" style={{ color: "rgb(13, 27, 62)" }}>Show up for yourself,</span>
          <span className="hero__line" style={{ animationDelay: "0.15s" }}>on a schedule.</span>
        </h1>
        <p className="hero__lede" style={{ margin: mobile ? "0 0 28px" : "0 auto 36px" }}>
          A membership is two things: a small monthly discount, and a future promise to keep coming back to yourself. Pick the modality that fits your week — sauna, float, red light, contrast, or all of it — and let the rhythm do the work.
        </p>
        <div className="hero__cta-row" style={{ justifyContent: mobile ? "stretch" : "center" }}>
          <a href="#tiers" className="btn btn--primary">
            <span>SEE THE TIERS</span>
            <IconArrow />
          </a>
          <a href="#rules" className="btn btn--ghost">How memberships work</a>
        </div>
        <div className="hero__meta" style={{ justifyContent: mobile ? "flex-start" : "center" }}>
          <span><IconSpark /> 3-month minimum</span>
          <span className="hero__meta-dot">·</span>
          <span>Pause once · Cancel in writing</span>
          <span className="hero__meta-dot">·</span>
          <span>Carrboro, NC</span>
        </div>
      </div>
    </section>
  );
}

// ---------- Why a membership (3-up tiles) ----------
function WhyMembership({ mobile }) {
  return (
    <section className={`mb-why ${mobile ? "mb-why--mobile" : ""}`}>
      <div className="mb-why__cell">
        <div className="mb-why__icon">$</div>
        <span className="mb-why__kicker">The math</span>
        <h3 className="mb-why__title">Always less than the door.</h3>
        <p className="mb-why__body">
          Every tier is priced under its drop-in equivalent. The deeper you go, the more it saves —
          12 saunas a month at member rate is $54 less than walking in.
        </p>
      </div>
      <div className="mb-why__cell">
        <div className="mb-why__icon">∿</div>
        <span className="mb-why__kicker">The science</span>
        <h3 className="mb-why__title">Dose matters more than novelty.</h3>
        <p className="mb-why__body">
          The studied benefits of heat, cold, light, and float are dose-dependent — single sessions
          feel good, but the cardiovascular, mood, and sleep markers shift on consistent weekly use.
        </p>
        <span className="mb-why__cite">most protocols use 2–4×/week for 4–12 weeks</span>
      </div>
      <div className="mb-why__cell">
        <div className="mb-why__icon">✦</div>
        <span className="mb-why__kicker">The promise</span>
        <h3 className="mb-why__title">A standing date with yourself.</h3>
        <p className="mb-why__body">
          The hardest part of a practice isn't the session — it's getting back. Pre-paid credits
          on the calendar make showing up the path of least resistance.
        </p>
      </div>
    </section>
  );
}

// ---------- Sticky modality nav ----------
function JumpNav({ mobile }) {
  const links = [
    { href: "#float", label: "Float", n: "01" },
    { href: "#sauna", label: "Sauna & Fire", n: "02" },
    { href: "#rlt", label: "Red Light", n: "03" },
    { href: "#contrast", label: "Contrast", n: "04" },
    { href: "#bundles", label: "Bundled Wellness", n: "05" }
  ];
  return (
    <div className={`mb-jump ${mobile ? "mb-jump--mobile" : ""}`}>
      <div className="mb-jump__inner">
        {links.map(l => (
          <a key={l.href} href={l.href}>
            <span className="mb-jump__count">{l.n}</span>{l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ---------- Membership card ----------
function PlanCard({ plan }) {
  const color = plan.color || "var(--candle)";
  return (
    <article className="mp" style={{ "--mp-color": color }}>
      <div className="mp__top">
        <div>
          <span className="mp__cadence">{plan.cadence || "Monthly"}</span>
          <h3 className="mp__name">{plan.name}</h3>
        </div>
        <div className="mp__price">
          <span className="mp__price-num"><sup>$</sup>{plan.price}</span>
          <span className="mp__price-unit">per month</span>
        </div>
      </div>

      <div className={`mp__save ${plan.savings ? "" : "mp__save--neutral"}`}>
        <IconSpark size={9} />
        {plan.savings
          ? <span>Save <b>${plan.savings}/mo</b> vs. drop-in</span>
          : <span>{plan.savingsNote || "Best value at high frequency"}</span>}
      </div>

      <ul className="mp__list">
        {plan.includes.map((line, i) => (
          <li key={i} className={line.startsWith("~") ? "is-quiet" : ""}>
            {line.replace(/^~/, "")}
          </li>
        ))}
      </ul>

      {plan.chips && plan.chips.length > 0 &&
        <div className="mp__chips">
          {plan.chips.map((c, i) => (
            <span key={i} className={`mp__chip ${c.off ? "mp__chip--off" : ""}`}>{c.label}</span>
          ))}
        </div>
      }

      <div className="mp__cta">
        <a href={plan.signup || "#"} className="mp__signup" {...(plan.signup ? { target: "_blank", rel: "noopener" } : {})}>
          <span>Sign up</span>
          <IconArrow size={11} />
        </a>
        {plan.fine && <span className="mp__fine">{plan.fine}</span>}
      </div>
    </article>
  );
}

// ---------- Featured card (Ultimate) ----------
function FeatureCard({ plan }) {
  return (
    <article className="mp mp--feature" style={{ "--mp-color": "var(--candle)" }}>
      <div className="mp__feature-body">
        <span className="mp__feature-flag"><IconSpark size={9} /> Flagship</span>
        <span className="mp__cadence">Monthly · all four modalities + massage</span>
        <h3 className="mp__name">{plan.name}</h3>
        <p className="mp__feature-tag">Everything Areté offers, on tap. The membership for the person who's already here weekly.</p>
        <ul className="mp__list" style={{ marginTop: 22 }}>
          {plan.includes.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
        <div className="mp__chips">
          {plan.chips.map((c, i) => <span key={i} className="mp__chip">{c.label}</span>)}
        </div>
      </div>
      <div className="mp__feature-side">
        <div>
          <div className="mp__price" style={{ textAlign: "left" }}>
            <span className="mp__price-num"><sup>$</sup>{plan.price}</span>
            <span className="mp__price-unit">per month</span>
          </div>
          <div className="mp__save" style={{ marginTop: 18 }}>
            <IconSpark size={9} />
            <span>Breaks even at <b>~6 visits/mo</b></span>
          </div>
        </div>
        <div className="mp__cta" style={{ borderTop: "none", paddingTop: 0, justifyContent: "flex-start" }}>
          <a href={plan.signup || "#"} className="mp__signup" {...(plan.signup ? { target: "_blank", rel: "noopener" } : {})}>
            <span>Sign up online</span>
            <IconArrow size={11} />
          </a>
        </div>
        <span className="mp__fine" style={{ textAlign: "left" }}>3-month minimum · Massage giftable to one other person · Float, sauna, RLT and contrast not shareable</span>
      </div>
    </article>
  );
}

// ---------- Modality section wrapper ----------
function Modality({ mobile, id, index, title, em, lede, children }) {
  return (
    <section id={id} className={`mod ${mobile ? "mod--mobile" : ""}`}>
      <div className="mod__head">
        <div>
          <div className="mod__index">— {index}</div>
        </div>
        <div>
          <h2 className="mod__title">{title} {em && <em>{em}</em>}</h2>
          <p className="mod__lede">{lede}</p>
        </div>
      </div>
      <div className="mb-grid">{children}</div>
    </section>
  );
}

// ---------- Plan data ----------
const FLOAT_PLANS = [{
  name: "Just Float",
  price: 79,
  cadence: "Monthly · float",
  color: "rgb(124, 107, 138)",
  savings: 10,
  signup: "https://aretefloattank.floathelm.com/store/memberships/1215257",
  includes: [
    "1× 90-minute float session each month",
    "Additional floats at $55 (vs $89 drop-in)",
    "~3-month minimum"
  ],
  chips: [{ label: "Not shareable" }, { label: "No rollover", off: true }],
  fine: "$55 add'l floats"
}];

const SAUNA_PLANS = [
  {
    name: "6 Fire Credits",
    price: 170, cadence: "Monthly · sauna or RLT",
    color: "rgb(232, 155, 142)", savings: 10,
    signup: "https://aretefloattank.floathelm.com/store/memberships/1220706",
    includes: [
      "6× 30-min sauna or 20-min RLT (mix & match)",
      "+$15 to bring a friend",
      "~Reservations required"
    ],
    chips: [{ label: "Mix & match" }, { label: "Per person" }]
  },
  {
    name: "8 Fire Credits",
    price: 215, cadence: "Monthly · sauna or RLT",
    color: "rgb(232, 155, 142)", savings: 25,
    signup: "https://aretefloattank.floathelm.com/store/memberships/1203178",
    includes: [
      "8× 30-min sauna or 20-min RLT",
      "10% off other services & retail",
      "+$15 to bring a friend"
    ],
    chips: [{ label: "10% off retail" }, { label: "Mix & match" }]
  },
  {
    name: "12 Fire Credits",
    price: 306, cadence: "Monthly · sauna or RLT",
    color: "rgb(232, 155, 142)", savings: 54,
    signup: "https://aretefloattank.floathelm.com/store/memberships/1203177",
    includes: [
      "12× 30-min sauna or 20-min RLT",
      "10% off other services",
      "+$15 to bring a friend"
    ],
    chips: [{ label: "Best per-credit value" }, { label: "10% off services" }]
  },
  {
    name: "Unlimited Sauna & RLT",
    price: 400, cadence: "Monthly · unlimited",
    color: "rgb(199, 112, 103)",
    signup: "https://aretefloattank.floathelm.com/store/memberships/1203175",
    savingsNote: "Pays off at ~13 saunas/mo",
    includes: [
      "Unlimited 30-min sauna sessions",
      "Unlimited 20-min red-light sessions",
      "15% off select retail",
      "$55 floats (vs $89 drop-in)"
    ],
    chips: [{ label: "Unlimited" }, { label: "15% off retail" }, { label: "Not shareable" }]
  }
];

const RLT_PLANS = [{
  name: "RLT Monthly",
  price: 199, cadence: "Monthly · red light",
  color: "rgb(218, 99, 99)",
  signup: "https://aretefloattank.floathelm.com/store/memberships/1205640",
  savingsNote: "Pays off at 10 sessions/mo",
  includes: [
    "Unlimited 20-min red light therapy",
    "1 session per calendar day",
    "10% off other services & retail"
  ],
  chips: [{ label: "Unlimited" }, { label: "10% off" }, { label: "Not shareable" }]
}];

const CONTRAST_PLANS = [
  {
    name: "Contrast · 2/mo",
    price: 99, cadence: "Monthly · cold + heat",
    color: "rgb(126, 167, 207)", savings: 21,
    signup: "https://aretefloattank.floathelm.com/store/memberships/1215279",
    includes: [
      "2× 60-min contrast sessions",
      "Sessions roll over 1 month",
      "10% off other services & retail",
      "+$20 to bring a guest"
    ],
    chips: [{ label: "10% off" }, { label: "1-mo rollover" }, { label: "+$20 guest" }]
  },
  {
    name: "Contrast · 3/mo",
    price: 140, cadence: "Monthly · cold + heat",
    color: "rgb(102, 148, 192)", savings: 40,
    signup: "https://aretefloattank.floathelm.com/store/memberships/1215254",
    includes: [
      "3× 60-min contrast sessions",
      "Sessions roll over 1 month",
      "10% off other services & retail",
      "+$20 to bring a guest"
    ],
    chips: [{ label: "10% off" }, { label: "1-mo rollover" }, { label: "+$20 guest" }]
  },
  {
    name: "Contrast · 4/mo",
    price: 176, cadence: "Monthly · cold + heat",
    color: "rgb(78, 130, 178)", savings: 64,
    signup: "https://aretefloattank.floathelm.com/store/memberships/1214567",
    includes: [
      "4× 60-min contrast sessions",
      "Sessions roll over 1 month",
      "10% off other services & retail",
      "+$20 to bring a guest"
    ],
    chips: [{ label: "Best for 4×/mo" }, { label: "10% off" }, { label: "1-mo rollover" }, { label: "+$20 guest" }]
  }
];

const BASIC_BUNDLE = {
  name: "Basic Wellness", price: 120,
  cadence: "Monthly · float + fire",
  color: "rgb(180, 128, 148)", savings: 29,
  signup: "https://aretefloattank.floathelm.com/store/memberships/1215280",
  includes: [
    "1× 90-min float each month",
    "2× Fire & Ice credits (sauna/RLT = 1 each, contrast = 2)",
    "10% off retail, gift certs & services",
    "Additional floats at $55"
  ],
  chips: [{ label: "Shareable w/ 1" }, { label: "10% off" }, { label: "Early-access deals" }]
};

const TOTAL_BUNDLE = {
  name: "Total Wellness", price: 165,
  cadence: "Monthly · float + fire",
  color: "rgb(160, 110, 138)", savings: 44,
  signup: "https://aretefloattank.floathelm.com/store/memberships/1203325",
  includes: [
    "1× 90-min float each month",
    "4× Fire & Ice credits (mix sauna, RLT, contrast)",
    "10% off retail, gift certs & services",
    "Additional floats at $55",
    "Pause once, up to 2 months"
  ],
  chips: [{ label: "Shareable w/ 1" }, { label: "10% off" }, { label: "Pausable" }]
};

const ULTIMATE = {
  name: "Ultimate Wellness", price: 599,
  signup: "https://aretefloattank.floathelm.com/store/memberships/1215255",
  includes: [
    "Unlimited float, sauna, RLT, and contrast therapy",
    "1× 60-minute massage each month (giftable)",
    "15% off retail, gift certs & all other services",
    "3-month minimum"
  ],
  chips: [
    { label: "All four modalities" },
    { label: "Massage included" },
    { label: "15% off everything" }
  ]
};

// ---------- Tiers section (all modalities) ----------
function Tiers({ mobile }) {
  return (
    <div id="tiers">
      <Modality mobile={mobile} id="float" index="01 · Float"
        title="Float" em="memberships"
        lede="Theta-state deep rest in 1,000+ lbs of Epsom salt. The most cost-effective way to keep one float on the calendar each month.">
        {FLOAT_PLANS.map(p => <PlanCard key={p.name} plan={p} />)}
      </Modality>

      <Modality mobile={mobile} id="sauna" index="02 · Sauna & Fire Credits"
        title="Sauna" em="& fire credits"
        lede="Full-spectrum infrared. Fire credits are interchangeable between sauna and red light, so you can build a heat-and-light week however you like.">
        {SAUNA_PLANS.map(p => <PlanCard key={p.name} plan={p} />)}
      </Modality>

      <Modality mobile={mobile} id="rlt" index="03 · Red Light Therapy"
        title="Red Light" em="therapy"
        lede="Mitochondrial support, recovery, skin. The dose-response is daily — this tier is built around making that practical.">
        {RLT_PLANS.map(p => <PlanCard key={p.name} plan={p} />)}
      </Modality>

      <Modality mobile={mobile} id="contrast" index="04 · Contrast Therapy"
        title="Contrast" em="therapy"
        lede="Cold plunge and sauna in private hourly sessions. Three tiers, all with one-month rollover so a busy week doesn't cost you a credit.">
        {CONTRAST_PLANS.map(p => <PlanCard key={p.name} plan={p} />)}
      </Modality>

      <Modality mobile={mobile} id="bundles" index="05 · Bundled Wellness"
        title="Bundled" em="wellness"
        lede="Float plus fire credits in one membership. Basic and Total are shareable with one other person — Ultimate is the all-in for daily users.">
        {[BASIC_BUNDLE, TOTAL_BUNDLE].map(p => <PlanCard key={p.name} plan={p} />)}
        <FeatureCard plan={ULTIMATE} />
      </Modality>
    </div>
  );
}

// ---------- Ground rules ----------
function Rules({ mobile }) {
  const rules = [
    ["Three-month minimum", "Every membership runs for at least three months before you can cancel. The science (and the budget) shows up over weeks, not days."],
    ["Pause once, up to two months", "Travel, surgery, a busy season — pause your membership for up to two months. Credits stay active during the pause."],
    ["Rollover where it makes sense", "Contrast tiers roll over one month (use it or lose it after that). Float and sauna credits don't roll over — the rhythm is the point."],
    ["Sharing depends on the tier", "Bundled Wellness (Basic & Total) is shareable with one other person. Most single-modality memberships are personal — guest add-ons are $15–$20/session."],
    ["Member rates on top", "All members get $55 floats. 8+ Fire, RLT, and Contrast 3+ memberships add 10% off retail and other services. Ultimate adds 15% off everything."],
    ["Cancel in writing", "Email theteam@floatarete.com 14 days before your renewal date. You'll have 30 days to use any remaining credits."]
  ];
  return (
    <section id="rules" className={`mb-rules ${mobile ? "mb-rules--mobile" : ""}`}>
      <div className="mb-rules__head">
        <div>
          <span className="mb-rules__kicker">Ground rules</span>
          <h2 className="mb-rules__title">How memberships work</h2>
        </div>
      </div>
      <dl className="mb-rules__grid">
        {rules.map(([t, d]) => (
          <div key={t} className="mb-rules__item">
            <dt>{t}</dt>
            <dd>{d}</dd>
          </div>
        ))}
      </dl>
      <div className="mb-rules__foot">
        <a href="https://waiver.smartwaiver.com/w/9qytrehuxfwdun6a5ze6ms/web/" target="_blank" rel="noopener" className="mb-rules__link">Member agreement form <IconArrow size={11} /></a>
        <span>·</span>
        <span>theteam@floatarete.com · 919-636-9899</span>
      </div>
    </section>
  );
}

// ---------- Quote ----------
function Quote() {
  return (
    <section className="quote">
      <div className="quote__mark">"</div>
      <p>I joined Total Wellness during a stretch where I'd stopped sleeping. Two saunas and a float a week later, the wheel started turning again. The membership is what keeps me going — without it, I'd skip the week I most need it.</p>
      <div className="quote__who">— Reese P. · Member since 2024</div>
    </section>
  );
}

// ---------- Final CTA ----------
function FinalCTA({ mobile }) {
  return (
    <section className={`final ${mobile ? "final--mobile" : ""}`}>
      <div className="final__orb" />
      <h2>Pick a tier.<br /><em>Keep the appointment.</em></h2>
      <a href="#tiers" className="btn btn--primary btn--lg">
        <span>Sign up online</span>
        <IconArrow />
      </a>
      <div className="final__meta">
        213 E Braxton Foushee St · Carrboro, NC · 919-636-9899
      </div>
    </section>
  );
}

// ---------- Page ----------
function MembershipsPage({ mobile }) {
  return (
    <div className={`page ${mobile ? "page--mobile" : "page--desktop"}`}>
      <div className="grain" />
      <TopNav mobile={mobile} />
      <Hero mobile={mobile} />
      <WhyMembership mobile={mobile} />
      <JumpNav mobile={mobile} />
      <Tiers mobile={mobile} />
      <Rules mobile={mobile} />
      <Quote />
      <FinalCTA mobile={mobile} />
    </div>
  );
}

// ---------- App ----------
const MEMB_DEFAULTS = /*EDITMODE-BEGIN*/{
  "candle": "#7c6b8a",
  "displayFont": "LeJour",
  "darkMode": false
}/*EDITMODE-END*/;

function App() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange); };
  }, []);

  const [t, setTweak] = useTweaks(MEMB_DEFAULTS);

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
      <MembershipsPage mobile={isMobile} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
