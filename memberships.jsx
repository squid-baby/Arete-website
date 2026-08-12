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
            <a href={GIFTCARDS_URL} target="_blank" rel="noopener noreferrer">Gift Cards</a>
            <a href="about.html">About</a>
            <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener noreferrer" className="nav__cta" style={{ backgroundColor: "rgb(13, 27, 62)" }}>Book Now</a>
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
          <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener noreferrer" className="nav__mobile-cta">Book Now</a>
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
          A membership is two things: a small monthly discount, and a future promise to keep coming back to yourself. Pick the modality that fits your week, sauna, float, red light, contrast, or all of it, and let the rhythm do the work.
        </p>
        <div className="hero__cta-row" style={{ justifyContent: mobile ? "stretch" : "center" }}>
          <a href="#tiers" className="btn btn--primary">
            <span>SEE THE TIERS</span>
            <IconArrow />
          </a>
          <a href="#rules" className="btn btn--ghost">How memberships work</a>
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
          Every tier is priced under its drop-in equivalent. The deeper you go, the more it saves,
          the 12-session Sauna Ritual works out to about $19 per visit before add-ons.
        </p>
      </div>
      <div className="mb-why__cell">
        <div className="mb-why__icon">∿</div>
        <span className="mb-why__kicker">The science</span>
        <h3 className="mb-why__title">Dose matters more than novelty.</h3>
        <p className="mb-why__body">
          The studied benefits of heat, cold, light, and float are dose-dependent, single sessions
          feel good, but the cardiovascular, mood, and sleep markers shift on consistent weekly use.
        </p>
        <span className="mb-why__cite">most protocols use 2–4×/week for 4–12 weeks</span>
      </div>
      <div className="mb-why__cell">
        <div className="mb-why__icon">✦</div>
        <span className="mb-why__kicker">The promise</span>
        <h3 className="mb-why__title">A standing date with yourself.</h3>
        <p className="mb-why__body">
          The hardest part of a practice isn't the session, it's getting back. Pre-paid credits
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
    { href: "#sauna", label: "Sauna", n: "02" },
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
        <a href={plan.signup || "#"} className="mp__signup">
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
        <span className="mp__cadence">Monthly · all four modalities</span>
        <h3 className="mp__name">{plan.name}</h3>
        <p className="mp__feature-tag">Float, sauna, red light, and contrast therapy, on tap. The membership for the person who's already here weekly.</p>
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
            <span>Up to <b>one included visit per service, per day</b></span>
          </div>
        </div>
        <div className="mp__cta" style={{ borderTop: "none", paddingTop: 0, justifyContent: "flex-start" }}>
          <a href={plan.signup || "#"} className="mp__signup">
            <span>Sign up online</span>
            <IconArrow size={11} />
          </a>
        </div>
        <span className="mp__fine" style={{ textAlign: "left" }}>Personal membership · not shareable</span>
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
          <div className="mod__index">{index}.</div>
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
const BOULEVARD_WIDGET = "https://www.joinblvd.com/b/52268a33-85eb-4646-b0f0-8a61f9510654/widget";
const boulevardLink = (path) => `${BOULEVARD_WIDGET}?path=${encodeURIComponent(path)}`;

const FLOAT_PLANS = [{
  name: "Float Ritual",
  price: 69,
  cadence: "Monthly · float",
  color: "rgb(124, 107, 138)",
  savingsNote: "One float each month",
  signup: boulevardLink("/cart/menu/Float/p_403e6458-73d2-43cd-ba97-1d7a8886af12"),
  includes: [
    "1× 60- or 90-minute float session each month",
    "Additional floats for $57",
    "10% off non-practitioner services and retail"
  ],
  chips: [{ label: "60 or 90 minutes" }, { label: "Personal membership" }],
  fine: "$57 additional floats"
}];

const SAUNA_PLANS = [
  {
    name: "The Restorative Ritual",
    price: 149, cadence: "Monthly · 6 sauna sessions",
    color: "rgb(232, 155, 142)", savingsNote: "6 sauna sessions each month",
    signup: boulevardLink("/cart/menu/Fire (Sauna | RLT)/p_3b990437-0c05-41eb-99be-246fd0b4c25b"),
    includes: [
      "6× sauna sessions of up to 30 minutes",
      "Bring a guest for $15",
      "Add red light therapy for $10 or halotherapy for $5",
      "10% off non-practitioner services and retail"
    ],
    chips: [{ label: "Credits valid 60 days" }, { label: "Personal membership" }]
  },
  {
    name: "The Radiant Ritual",
    price: 179, cadence: "Monthly · 8 sauna sessions",
    color: "rgb(232, 155, 142)", savingsNote: "8 sauna sessions each month",
    signup: boulevardLink("/cart/menu/Fire (Sauna | RLT)/p_82886a87-db7b-42d2-a098-fdee5cf8adf9"),
    includes: [
      "8× sauna sessions of up to 30 minutes",
      "Bring a guest for $15",
      "Add red light therapy for $10 or halotherapy for $5",
      "10% off non-practitioner services and retail"
    ],
    chips: [{ label: "Credits valid 60 days" }, { label: "Personal membership" }]
  },
  {
    name: "The Immersive Ritual",
    price: 229, cadence: "Monthly · 12 sauna sessions",
    color: "rgb(216, 132, 121)", savingsNote: "12 sauna sessions each month",
    signup: boulevardLink("/cart/menu/Fire (Sauna | RLT)/p_a3e4d5ca-e6c9-430e-9db1-eb72873e2fbe"),
    includes: [
      "12× sauna sessions of up to 30 minutes",
      "Bring a guest for $15",
      "Add red light therapy for $10",
      "10% off non-practitioner services and retail"
    ],
    chips: [{ label: "Credits valid 60 days" }, { label: "Personal membership" }]
  },
  {
    name: "The Unlimited Sauna Ritual",
    price: 275, cadence: "Monthly · unlimited sauna",
    color: "rgb(199, 112, 103)",
    signup: boulevardLink("/cart/menu/Fire (Sauna | RLT)/p_d51f048f-51fe-4e79-9ccf-436b1f545b15"),
    savingsNote: "One sauna session per day",
    includes: [
      "Unlimited sauna sessions of up to 30 minutes, maximum one per day",
      "Bring a guest for $15",
      "Add red light therapy for $10 or halotherapy for $5",
      "15% off non-practitioner services and retail"
    ],
    chips: [{ label: "Unlimited" }, { label: "Personal membership" }]
  }
];

const RLT_PLANS = [
  {
    name: "The Illuminating Ritual",
    price: 136, cadence: "Monthly · 8 red light sessions",
    color: "rgb(208, 83, 83)", savingsNote: "8 red light sessions each month",
    signup: boulevardLink("/cart/menu/Red Light Therapy /p_ebbf7f57-6a65-4613-889b-c6bbeeed010e"),
    includes: [
      "8× red light therapy sessions",
      "Add a 30-minute sauna for $25",
      "10% off non-practitioner services and retail"
    ],
    chips: [{ label: "Credits valid 60 days" }, { label: "Personal membership" }]
  },
  {
    name: "The Luminous Ritual",
    price: 169, cadence: "Monthly · unlimited red light",
    color: "rgb(194, 67, 67)", savingsNote: "Unlimited red light sessions",
    signup: boulevardLink("/cart/menu/Red Light Therapy /p_9cc9d494-526a-4015-92c7-174c8bbdc01c"),
    includes: [
      "Unlimited red light therapy sessions",
      "Add a 30-minute sauna for $20",
      "10% off non-practitioner services and retail"
    ],
    chips: [{ label: "Unlimited" }, { label: "Personal membership" }]
  }
];

const CONTRAST_PLANS = [
  {
    name: "Thermal Reset",
    price: 99, cadence: "Monthly · 2 contrast sessions",
    color: "rgb(126, 167, 207)", savingsNote: "2 contrast sessions each month",
    signup: boulevardLink("/cart/menu/Contrast Therapy (Cold Plunge & Sauna)/p_400a8fd5-b757-47e4-b6c6-3ee72c3403c9"),
    includes: [
      "2× 60-min contrast sessions",
      "Bring a guest for $20",
      "10% off non-practitioner services and retail"
    ],
    chips: [{ label: "Credits valid 60 days" }, { label: "Personal membership" }]
  },
  {
    name: "Fire & Ice Rhythm",
    price: 140, cadence: "Monthly · 3 contrast sessions",
    color: "rgb(102, 148, 192)", savingsNote: "3 contrast sessions each month",
    signup: boulevardLink("/cart/menu/Contrast Therapy (Cold Plunge & Sauna)/p_e2eb0c04-d5d8-4fc0-860a-a01ebc461841"),
    includes: [
      "3× 60-min contrast sessions",
      "Bring a guest for $20",
      "10% off non-practitioner services and retail"
    ],
    chips: [{ label: "Credits valid 60 days" }, { label: "Personal membership" }]
  },
  {
    name: "The Contrast Practice",
    price: 176, cadence: "Monthly · 4 contrast sessions",
    color: "rgb(78, 130, 178)", savingsNote: "4 contrast sessions each month",
    signup: boulevardLink("/cart/menu/Contrast Therapy (Cold Plunge & Sauna)/p_1b5fa7ca-66f2-4bbf-84d3-65919819d902"),
    includes: [
      "4× 60-min contrast sessions",
      "Bring a guest for $20",
      "15% off non-practitioner services and retail"
    ],
    chips: [{ label: "Credits valid 60 days" }, { label: "Personal membership" }]
  }
];

const ESSENTIAL_BUNDLE = {
  name: "Essential Wellness", price: 109,
  cadence: "Monthly · float + wellness credits",
  color: "rgb(180, 128, 148)", savingsNote: "A balanced monthly ritual",
  signup: boulevardLink("/cart/menu/Float | Sauna | RLT | Contrast/p_02cdb7ed-36c5-48aa-b5c6-347cb22b40ab"),
  includes: [
    "1× 60-minute float each month",
    "2 wellness credits: sauna/RLT = 1, contrast = 2",
    "Additional floats for $57; upgrade to a 90-minute float for $10",
    "10% off non-practitioner services and retail; early access to select offers"
  ],
  chips: [{ label: "Credits valid 60 days" }, { label: "Shareable with one designated person" }]
};

const SIGNATURE_BUNDLE = {
  name: "Signature Wellness", price: 159,
  cadence: "Monthly · float + wellness credits",
  color: "rgb(160, 110, 138)", savingsNote: "A complete monthly ritual",
  signup: boulevardLink("/cart/menu/Float | Sauna | RLT | Contrast/p_992ea038-e48d-4510-82e9-c26f089da83f"),
  includes: [
    "1× 90-minute float each month",
    "4 wellness credits: sauna/RLT = 1, contrast = 2",
    "Additional floats for $57",
    "15% off non-practitioner services and retail"
  ],
  chips: [{ label: "Credits valid 60 days" }, { label: "Shareable with one designated person" }]
};

const ULTIMATE = {
  name: "Unlimited Wellness", price: 499,
  signup: boulevardLink("/cart/menu/All Services /p_e5c7c8b8-bdef-485c-bd85-3734d31ae226"),
  includes: [
    "Unlimited float, sauna, red light, and contrast therapy",
    "Up to one session of each included service per day",
    "15% off retail",
    "Early access to select offers"
  ],
  chips: [
    { label: "All four modalities" },
    { label: "Personal membership" }
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
        title="Sauna" em="rituals"
        lede="Full-spectrum infrared with a rhythm for every schedule, from one session a week to unlimited visits. Add a guest, red light, or halotherapy where listed.">
        {SAUNA_PLANS.map(p => <PlanCard key={p.name} plan={p} />)}
      </Modality>

      <Modality mobile={mobile} id="rlt" index="03 · Red Light Therapy"
        title="Red Light" em="therapy"
        lede="Choose eight or unlimited monthly visits. Add a 30-minute sauna for $25 on Illuminating or $20 on Luminous.">
        {RLT_PLANS.map(p => <PlanCard key={p.name} plan={p} />)}
      </Modality>

      <Modality mobile={mobile} id="contrast" index="04 · Contrast Therapy"
        title="Contrast" em="therapy"
        lede="Cold plunge and sauna in private hourly sessions. Three tiers, all built to keep a steady recovery rhythm realistic.">
        {CONTRAST_PLANS.map(p => <PlanCard key={p.name} plan={p} />)}
      </Modality>

      <Modality mobile={mobile} id="bundles" index="05 · Bundled Wellness"
        title="Bundled" em="wellness"
        lede="Float plus flexible wellness credits in one membership. Essential and Signature are shareable with one other person; Unlimited Wellness is the all-in plan for frequent visitors.">
        {[ESSENTIAL_BUNDLE, SIGNATURE_BUNDLE].map(p => <PlanCard key={p.name} plan={p} />)}
        <FeatureCard plan={ULTIMATE} />
      </Modality>
    </div>
  );
}

// ---------- Ground rules ----------
function Rules({ mobile }) {
  const rules = [
    ["Three-month minimum", "Every membership runs for at least three months before you can cancel or pause. The science (and the budget) shows up over weeks, not days."],
    ["Pause once, up to two months", "Travel, surgery, a busy season, pause your membership for up to two months after the three-month minimum. While paused, you do not have access to discounted member rates or benefits. Your membership must renew once after a pause before you can cancel."],
    ["60-day credit validity", "Sauna, red light, contrast, Essential, and Signature credits remain valid for 60 days while the membership is active. Float Ritual credits do not roll over."],
    ["Sharing depends on the tier", "Essential and Signature Wellness are shareable with one designated person. Single-modality and Unlimited Wellness memberships are personal."],
    ["Member perks", "Most memberships include 10% off non-practitioner services and retail. The Contrast Practice, Signature Wellness, and Unlimited Sauna Ritual include 15% off non-practitioner services and retail; Unlimited Wellness includes 15% off retail. Add-on and guest rates vary by plan."],
    ["Cancel or pause in writing", "Let us know in writing at theteam@floatarete.com at least 14 days before your renewal date if you need to pause or cancel. Your member agreement contains the complete terms."]
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
        <a href="https://waiver.smartwaiver.com/w/9qytrehuxfwdun6a5ze6ms/web/" target="_blank" rel="noopener noreferrer" className="mb-rules__link">Member agreement form <IconArrow size={11} /></a>
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
      <p>I joined Signature Wellness during a stretch where I'd stopped sleeping. Two saunas and a float a week later, the wheel started turning again. The membership is what keeps me going, without it, I'd skip the week I most need it.</p>
      <div className="quote__who">Reese P. · Member since 2024</div>
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
