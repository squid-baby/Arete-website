/* global React */
const { useState, useEffect } = React;

// ---------- Booking links ----------
const BOOK = {
  general: "https://aretefloattank.floathelm.com/booking",
  store: "https://aretefloattank.floathelm.com/store",
  signature: "https://aretefloattank.floathelm.com/store/packages/1231304",
  introFloat: "https://aretefloattank.floathelm.com/store/packages/1203271",
  fire6: "https://aretefloattank.floathelm.com/store/packages/1242824",
  fire8: "https://aretefloattank.floathelm.com/store/packages/1205385",
  fire12: "https://aretefloattank.floathelm.com/store/packages/1205386",
  rlt8: "https://aretefloattank.floathelm.com/store/packages/1247402",
  friend: "https://aretefloattank.floathelm.com/booking"
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

const IconSpark = ({ size = 10 }) =>
  <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor">
    <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
  </svg>;

// ---------- Top nav ----------
const GIFTCARDS_URL = "https://aretefloattank.floathelm.com/store/giftcards";

function TopNav({ mobile }) {
  const [menuOpen, setMenuOpen] = useState(false);
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
            <a href="packages.html" style={{ color: "rgb(13, 27, 62)" }}>Packages</a>
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
          <span>Packages · prepaid, no commitment</span>
          <span className="hero__eyebrow-line" />
        </div>
        <h1 className="hero__title">
          <span className="hero__line" style={{ color: "rgb(13, 27, 62)" }}>Buy a few sessions.</span>
          <span className="hero__line" style={{ animationDelay: "0.15s" }}>Save a little. No subscription.</span>
        </h1>
        <p className="hero__lede" style={{ margin: mobile ? "0 0 28px" : "0 auto 36px" }}>
          Packages are prepaid bundles of sessions you use at your own pace. No monthly bill, no auto-renew —
          just a small discount for buying ahead. Try a sampler, build a sauna habit, or bring a friend along.
        </p>
        <div className="hero__cta-row" style={{ justifyContent: mobile ? "stretch" : "center" }}>
          <a href="#packs" className="btn btn--primary">
            <span>SEE THE PACKAGES</span>
            <IconArrow />
          </a>
          <a href="#rules" className="btn btn--ghost">How packages work</a>
        </div>
        <div className="hero__meta" style={{ justifyContent: mobile ? "flex-start" : "center" }}>
          <span><IconSpark /> 60-day expiration</span>
          <span className="hero__meta-dot">·</span>
          <span>Single-person · non-refundable</span>
          <span className="hero__meta-dot">·</span>
          <span>Carrboro, NC</span>
        </div>
      </div>
    </section>
  );
}

// ---------- Why a package (Packages vs Memberships) ----------
function WhyPackages({ mobile }) {
  return (
    <section className={`mb-why ${mobile ? "mb-why--mobile" : ""}`}>
      <div className="mb-why__cell">
        <div className="mb-why__icon">◐</div>
        <span className="mb-why__kicker">No commitment</span>
        <h3 className="mb-why__title">Pay once. Use when you can.</h3>
        <p className="mb-why__body">
          Packages are a single charge for a fixed number of sessions. No three-month minimum, no recurring
          billing — when the credits run out, you decide whether to buy another or not.
        </p>
      </div>
      <div className="mb-why__cell">
        <div className="mb-why__icon">$</div>
        <span className="mb-why__kicker">Built-in savings</span>
        <h3 className="mb-why__title">Cheaper than à la carte.</h3>
        <p className="mb-why__body">
          Every package is priced under the equivalent walk-in total. Fire credits and the Signature sampler
          land at roughly 10–15% off — the more credits, the better the rate.
        </p>
      </div>
      <div className="mb-why__cell">
        <div className="mb-why__icon">⏱</div>
        <span className="mb-why__kicker">60-day window</span>
        <h3 className="mb-why__title">A nudge, not a cage.</h3>
        <p className="mb-why__body">
          Most packages expire 60 days after your first session. Long enough to fit a real practice into your
          calendar, short enough to keep things from gathering dust.
        </p>
        <span className="mb-why__cite">90 days for the Signature Collection</span>
      </div>
    </section>
  );
}

// ---------- Compare bar ----------
function Compare({ mobile }) {
  const rows = [
    ["Best for", "Trying things out · gifts · occasional use", "A weekly practice · steady rhythm"],
    ["Commitment", "One-time purchase", "3-month minimum, then month-to-month"],
    ["Recurring charge", "No", "Yes — auto-renews monthly"],
    ["Discount", "≈10–15% off à la carte", "Up to ≈30% off + member rates on add-ons"],
    ["Expiration", "60 days after first use (90 for Signature)", "Use within the month — no rollover (except contrast)"],
    ["Sharing", "Single person unless noted", "Bundled tiers shareable with one other person"]
  ];
  return (
    <section className={`pkg-compare ${mobile ? "pkg-compare--mobile" : ""}`}>
      <div className="pkg-compare__head">
        <span className="mb-rules__kicker">Packages vs memberships</span>
        <h2 className="mb-rules__title">Which one fits the season you're in?</h2>
      </div>
      <div className="pkg-compare__table" role="table">
        <div className="pkg-compare__row pkg-compare__row--head" role="row">
          <div role="columnheader" />
          <div role="columnheader"><span className="pkg-compare__pill">Packages</span></div>
          <div role="columnheader"><span className="pkg-compare__pill pkg-compare__pill--ghost">Memberships</span></div>
        </div>
        {rows.map(([k, a, b]) => (
          <div key={k} className="pkg-compare__row" role="row">
            <div role="cell" className="pkg-compare__key">{k}</div>
            <div role="cell" className="pkg-compare__val">{a}</div>
            <div role="cell" className="pkg-compare__val pkg-compare__val--alt">{b}</div>
          </div>
        ))}
      </div>
      <div className="pkg-compare__foot">
        <a href="memberships.html" className="mb-rules__link">See memberships <IconArrow size={11} /></a>
      </div>
    </section>
  );
}

// ---------- Jump nav ----------
function JumpNav({ mobile }) {
  const links = [
    { href: "#sampler", label: "Sampler & Intros", n: "01" },
    { href: "#fire", label: "Fire Credits", n: "02" },
    { href: "#rlt", label: "Red Light", n: "03" },
    { href: "#addons", label: "Add-ons", n: "04" }
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

// ---------- Package card ----------
function PackCard({ pack }) {
  const color = pack.color || "var(--candle)";
  return (
    <article className="mp" style={{ "--mp-color": color }}>
      <div className="mp__top">
        <div>
          <span className="mp__cadence">{pack.cadence}</span>
          <h3 className="mp__name">{pack.name}</h3>
        </div>
        <div className="mp__price">
          <span className="mp__price-num"><sup>$</sup>{pack.price}</span>
          <span className="mp__price-unit">{pack.priceUnit || "one-time"}</span>
        </div>
      </div>

      <div className={`mp__save ${pack.savings ? "" : "mp__save--neutral"}`}>
        <IconSpark size={9} />
        {pack.savings
          ? <span>Save <b>${pack.savings}</b> vs. à la carte</span>
          : <span>{pack.savingsNote || "Add-on pricing"}</span>}
      </div>

      <ul className="mp__list">
        {pack.includes.map((line, i) => (
          <li key={i} className={line.startsWith("~") ? "is-quiet" : ""}>
            {line.replace(/^~/, "")}
          </li>
        ))}
      </ul>

      {pack.chips && pack.chips.length > 0 &&
        <div className="mp__chips">
          {pack.chips.map((c, i) => (
            <span key={i} className={`mp__chip ${c.off ? "mp__chip--off" : ""}`}>{c.label}</span>
          ))}
        </div>
      }

      <div className="mp__cta">
        <a href={pack.buy || BOOK.store} className="mp__signup" target="_blank" rel="noopener">
          <span>{pack.buyLabel || "Buy package"}</span>
          <IconArrow size={11} />
        </a>
        {pack.fine && <span className="mp__fine">{pack.fine}</span>}
      </div>
    </article>
  );
}

// ---------- Featured Signature card ----------
function SignatureCard({ pack }) {
  return (
    <article className="mp mp--feature" style={{ "--mp-color": "var(--candle)" }}>
      <div className="mp__feature-body">
        <span className="mp__feature-flag"><IconSpark size={9} /> Sampler · 15% off</span>
        <span className="mp__cadence">One-time · all five modalities</span>
        <h3 className="mp__name">{pack.name}</h3>
        <p className="mp__feature-tag">A guided tour through everything Areté offers — one of each, at 15% off à la carte. The simplest way to find what your body responds to.</p>
        <ul className="mp__list" style={{ marginTop: 22 }}>
          {pack.includes.map((l, i) => <li key={i}>{l}</li>)}
        </ul>
        <div className="mp__chips">
          {pack.chips.map((c, i) => <span key={i} className="mp__chip">{c.label}</span>)}
        </div>
      </div>
      <div className="mp__feature-side">
        <div>
          <div className="mp__price" style={{ textAlign: "left" }}>
            <span className="mp__price-num"><sup>$</sup>{pack.price}</span>
            <span className="mp__price-unit">one-time · per person</span>
          </div>
          <div className="mp__save" style={{ marginTop: 18 }}>
            <IconSpark size={9} />
            <span>≈ <b>$43 off</b> à la carte</span>
          </div>
        </div>
        <div className="mp__cta" style={{ borderTop: "none", paddingTop: 0, justifyContent: "flex-start" }}>
          <a href={pack.buy} className="mp__signup" target="_blank" rel="noopener">
            <span>Buy online</span>
            <IconArrow size={11} />
          </a>
        </div>
        <span className="mp__fine" style={{ textAlign: "left" }}>Single person · credits expire 90 days after first use · limit one per customer · non-refundable · gratuity not included</span>
      </div>
    </article>
  );
}

// ---------- Section wrapper ----------
function Section({ mobile, id, index, title, em, lede, children }) {
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

// ---------- Pack data ----------
const SIGNATURE = {
  name: "Areté Signature Collection",
  price: 245,
  buy: BOOK.signature,
  includes: [
    "1× 60-minute float",
    "1× 30-minute infrared sauna",
    "1× 20-minute red light therapy",
    "1× 60-minute massage",
    "1× contrast therapy session"
  ],
  chips: [
    { label: "15% off à la carte" },
    { label: "All five modalities" },
    { label: "90-day window" }
  ]
};

const INTRO_FLOAT = {
  name: "Intro to Floating",
  price: 150,
  cadence: "First-time floaters · per person",
  color: "rgb(124, 107, 138)",
  savings: 117,
  buy: BOOK.introFloat,
  includes: [
    "3× 90-minute float sessions",
    "First-time customers only — single person",
    "Cannot be purchased as a gift",
    "~Credits expire 60 days after first use"
  ],
  chips: [{ label: "First-timers only" }, { label: "Best value to start" }, { label: "Not giftable", off: true }],
  fine: "$50/float · normally $89"
};

const FIRE_PACKS = [
  {
    name: "6 Fire Credits",
    price: 160,
    cadence: "Sauna or RLT · per person",
    color: "rgb(232, 155, 142)",
    savings: 14,
    buy: BOOK.fire6,
    includes: [
      "6× 30-min sauna or 20-min RLT",
      "Mix and match across modalities",
      "Bring a friend +$10/session",
      "~Reservations required"
    ],
    chips: [{ label: "Mix & match" }, { label: "Per person" }],
    fine: "≈$26.67/session"
  },
  {
    name: "8 Fire Credits",
    price: 228,
    cadence: "Sauna or RLT · per person",
    color: "rgb(232, 155, 142)",
    savings: 4,
    buy: BOOK.fire8,
    includes: [
      "8× 30-min sauna or 20-min RLT",
      "Mix and match across modalities",
      "Bring a friend +$10/session",
      "~Reservations required"
    ],
    chips: [{ label: "Mix & match" }, { label: "Per person" }],
    fine: "$28.50/session"
  },
  {
    name: "12 Fire Credits",
    price: 324,
    cadence: "Sauna or RLT · per person",
    color: "rgb(199, 112, 103)",
    savings: 24,
    buy: BOOK.fire12,
    includes: [
      "12× 30-min sauna or 20-min RLT",
      "10% off regular-priced sessions",
      "Bring a friend +$10/session",
      "~Reservations required"
    ],
    chips: [{ label: "Best per-credit value" }, { label: "10% off à la carte" }],
    fine: "$27/session · 10% off rate"
  }
];

const RLT_PACK = {
  name: "8 Red Light Therapy Sessions",
  price: 144,
  cadence: "Red light only · per person",
  color: "rgb(218, 99, 99)",
  savings: 76,
  buy: BOOK.rlt8,
  includes: [
    "8× individual 20-min red light therapy sessions",
    "Single person · non-transferable",
    "Built for daily-ish dosing — recovery, skin, sleep",
    "~Credits expire 60 days after first use"
  ],
  chips: [{ label: "RLT only" }, { label: "Daily-friendly" }, { label: "Non-transferable", off: true }],
  fine: "$18/session"
};

const FRIEND_PACK = {
  name: "Bring a Friend to Sauna",
  price: 15,
  priceUnit: "per add-on",
  cadence: "Guest add-on · sauna",
  color: "rgb(180, 128, 148)",
  savingsNote: "Adds a guest to your sauna",
  buy: BOOK.friend,
  includes: [
    "1× 30-minute sauna for one guest",
    "Book sauna for two, or add a note to your reservation",
    "Paid at check-in — no online package needed"
  ],
  chips: [{ label: "Add-on" }, { label: "Sauna only" }],
  fine: "No online link — book sauna for 2 or note it in your reservation",
  buyLabel: "Book sauna"
};

// ---------- Packs container ----------
function Packs({ mobile }) {
  return (
    <div id="packs">
      <Section mobile={mobile} id="sampler" index="01 · Sampler & Intros"
        title="Try one of" em="everything"
        lede="The two best ways to start: a guided tour of all five modalities, or three floats to figure out if water-and-quiet is your thing.">
        <SignatureCard pack={SIGNATURE} />
        <PackCard pack={INTRO_FLOAT} />
      </Section>

      <Section mobile={mobile} id="fire" index="02 · Fire Credits"
        title="Sauna" em="& red light, batched"
        lede="One credit = one sauna or one RLT session. Mix and match across the heat-and-light week — credits are interchangeable, reservations required.">
        {FIRE_PACKS.map(p => <PackCard key={p.name} pack={p} />)}
      </Section>

      <Section mobile={mobile} id="rlt" index="03 · Red Light Only"
        title="Red light" em="therapy pack"
        lede="If sauna isn't your thing but daily red light is — eight sessions to commit to a real protocol, no fire credit needed.">
        <PackCard pack={RLT_PACK} />
      </Section>

      <Section mobile={mobile} id="addons" index="04 · Add-ons"
        title="Bring" em="someone with you"
        lede="Small add-ons for the sessions you've already booked — guest passes for sauna, with more on the way.">
        <PackCard pack={FRIEND_PACK} />
      </Section>
    </div>
  );
}

// ---------- Ground rules ----------
function Rules({ mobile }) {
  const rules = [
    ["Single person, single account", "Packages are for one person unless explicitly noted. Sessions can't be split between accounts or shared with a friend (the Bring-a-Friend add-on is the exception)."],
    ["60-day expiration after first use", "Credits expire 60 days from the date of your first session — long enough for a real cadence, short enough to keep packages from sitting forever. The Signature Collection runs 90 days."],
    ["Non-refundable, non-swappable", "Once purchased, packages can't be refunded, exchanged, or converted into different services. Credits cannot be redeemed for cash, retail, or other modalities."],
    ["Reservations required", "Every credit needs an appointment. Book online through FloatHelm or by phone — same-day slots happen, but they aren't guaranteed."],
    ["Limit one Signature & Intro per customer", "The Signature Collection and Intro to Floating are once-per-person. Fire and RLT packages can be re-purchased anytime."],
    ["Tip not included", "Massage gratuity isn't bundled into the Signature price — handled at the appointment, like any other massage."]
  ];
  return (
    <section id="rules" className={`mb-rules ${mobile ? "mb-rules--mobile" : ""}`}>
      <div className="mb-rules__head">
        <div>
          <span className="mb-rules__kicker">Ground rules</span>
          <h2 className="mb-rules__title">How packages work</h2>
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
        <a href={BOOK.store} target="_blank" rel="noopener" className="mb-rules__link">Buy on FloatHelm <IconArrow size={11} /></a>
        <span>·</span>
        <span>theteam@floatarete.com · 919-636-9899</span>
      </div>
    </section>
  );
}

// ---------- Best For ----------
function BestFor({ mobile }) {
  const cols = [
    {
      kicker: "Buy a package if",
      heading: "You're trying things out.",
      body: "You want to sample a modality, give a thoughtful gift, or treat yourself a few times without a recurring charge on the card. Packages are the right shape for occasional use.",
      examples: [
        "First time floating",
        "Travel-heavy month or season",
        "Gifting someone a few sessions",
        "Stacking sauna for a 6-week project",
        "Once-or-twice-a-month rhythm"
      ]
    },
    {
      kicker: "Get a membership if",
      heading: "You want a monthly promise to yourself.",
      body: "If you're already coming 4+ times a month, the membership math wins by a wide margin and you get rollover, member rates, and the option to share. Memberships are the rhythm-keepers.",
      examples: [
        "Weekly float habit",
        "Daily-ish sauna or RLT",
        "Couples sharing a Bundled tier",
        "Recovery built into training week",
        "All-in on the Ultimate"
      ],
      alt: true
    }
  ];
  return (
    <section className={`pkg-best ${mobile ? "pkg-best--mobile" : ""}`}>
      <div className="pkg-best__head">
        <span className="mb-rules__kicker">Best for</span>
        <h2 className="mb-rules__title">Which side of the line are you on?</h2>
      </div>
      <div className="pkg-best__grid">
        {cols.map(c =>
          <div key={c.kicker} className={`pkg-best__col ${c.alt ? "pkg-best__col--alt" : ""}`}>
            <span className="pkg-best__kicker">{c.kicker}</span>
            <h3 className="pkg-best__heading">{c.heading}</h3>
            <p className="pkg-best__body">{c.body}</p>
            <ul className="pkg-best__list">
              {c.examples.map(e => <li key={e}><IconSpark size={9} /> {e}</li>)}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- Gift Cards ----------
function GiftCards({ mobile }) {
  return (
    <section className={`pkg-gift ${mobile ? "pkg-gift--mobile" : ""}`}>
      <div className="pkg-gift__inner">
        <div className="pkg-gift__copy">
          <span className="mb-rules__kicker">Gift cards</span>
          <h2 className="pkg-gift__title">A package, but for someone else.</h2>
          <p className="pkg-gift__body">
            Packages can't be purchased as gifts directly — but a gift card can. Pick any amount; the recipient
            applies it to a single session, a package, or a membership when they're ready. Delivered by email,
            redeemable at the front desk or online.
          </p>
          <div className="pkg-gift__amounts">
            <span className="pkg-gift__chip">$50</span>
            <span className="pkg-gift__chip">$100</span>
            <span className="pkg-gift__chip">$150</span>
            <span className="pkg-gift__chip">$250</span>
            <span className="pkg-gift__chip pkg-gift__chip--ghost">Custom</span>
          </div>
          <a href="https://aretefloattank.floathelm.com/store/giftcards" target="_blank" rel="noopener" className="btn btn--primary">
            <span>Buy a gift card</span>
            <IconArrow />
          </a>
        </div>
        <div className="pkg-gift__art" aria-hidden="true">
          <div className="pkg-gift__card">
            <div className="pkg-gift__card-corner">A</div>
            <div className="pkg-gift__card-mid">
              <span>gift</span>
              <span>card</span>
            </div>
            <div className="pkg-gift__card-foot">Areté · Carrboro</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Quote ----------
function Quote() {
  return (
    <section className="quote">
      <div className="quote__mark">"</div>
      <p>I bought the Signature Collection because I had no idea what I'd actually like. Turns out: red light, of all things. By the time the credits ran out I'd switched to the RLT pack and now I'm in three times a week. Best $245 I've spent on figuring myself out.</p>
      <div className="quote__who">— Marlee K. · Areté guest, 2025</div>
    </section>
  );
}

// ---------- FAQ ----------
function FAQ({ mobile }) {
  const [open, setOpen] = useState(0);
  const items = [
    ["Can I share a package with my partner?", "Most packages are single-person. The Bring a Friend to Sauna add-on is the only built-in way to share — pair it with one of your sauna credits to bring a guest. If you're both regulars, a Bundled Wellness membership lets you share with one other person."],
    ["What happens after 60 days?", "Any unused credits expire. We don't refund or roll them over (Signature Collection runs 90 days instead of 60). Set a cadence that gets you in once a week and you'll have plenty of headroom — most people finish a Fire 8 in about 4–6 weeks."],
    ["Do package credits stack with member discounts?", "No. Package pricing is its own discount lane. Once you're a member, member pricing on à la carte sessions usually beats buying additional packages, so most members don't double-up."],
    ["Can I gift a package?", "The Intro to Floating is first-time-customer only and isn't giftable. For everything else, the cleanest path is a gift card — the recipient picks the package, modality, or membership themselves."],
    ["Are packages refundable if I have to move or get injured?", "No. Packages are non-refundable and non-transferable. If something serious comes up, email theteam@floatarete.com — we handle hardship cases on a case-by-case basis but it's never automatic."],
    ["What's a Fire credit, exactly?", "One credit = one 30-minute infrared sauna or one 20-minute red light therapy session. You decide which when you book — no need to declare upfront. Credits don't combine into longer sessions."]
  ];
  return (
    <section className={`pkg-faq ${mobile ? "pkg-faq--mobile" : ""}`} id="faq">
      <div className="pkg-faq__head">
        <span className="mb-rules__kicker">FAQ</span>
        <h2 className="mb-rules__title">Six things people ask.</h2>
      </div>
      <ul className="pkg-faq__list">
        {items.map(([q, a], i) =>
          <li key={i} className={`pkg-faq__item ${open === i ? "is-open" : ""}`}>
            <button className="pkg-faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{q}</span>
              <span className="pkg-faq__plus">{open === i ? "–" : "+"}</span>
            </button>
            <div className="pkg-faq__a"><p>{a}</p></div>
          </li>
        )}
      </ul>
    </section>
  );
}

// ---------- Final CTA ----------
function FinalCTA({ mobile }) {
  return (
    <section className={`final ${mobile ? "final--mobile" : ""}`}>
      <div className="final__orb" />
      <h2>Pick a pack.<br /><em>Book what you bought.</em></h2>
      <a href="#packs" className="btn btn--primary btn--lg">
        <span>See the packages</span>
        <IconArrow />
      </a>
      <div className="final__meta">
        213 E Braxton Foushee St · Carrboro, NC · 919-636-9899
      </div>
    </section>
  );
}

// ---------- Page ----------
function PackagesPage({ mobile }) {
  return (
    <div className={`page ${mobile ? "page--mobile" : "page--desktop"}`}>
      <div className="grain" />
      <TopNav mobile={mobile} />
      <Hero mobile={mobile} />
      <WhyPackages mobile={mobile} />
      <Compare mobile={mobile} />
      <JumpNav mobile={mobile} />
      <Packs mobile={mobile} />
      <BestFor mobile={mobile} />
      <Rules mobile={mobile} />
      <Quote />
      <GiftCards mobile={mobile} />
      <FAQ mobile={mobile} />
      <FinalCTA mobile={mobile} />
    </div>
  );
}

// ---------- App ----------
const PKG_DEFAULTS = /*EDITMODE-BEGIN*/{
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

  const [t, setTweak] = useTweaks(PKG_DEFAULTS);

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
      <PackagesPage mobile={isMobile} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
