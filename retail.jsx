/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Icons ----------
const IconMenu = ({ size = 20 }) =>
<svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
  </svg>;

const IconArrow = ({ size = 14 }) =>
<svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const IconArrowL = ({ size = 14 }) =>
<svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
    <path d="M13 7H1M6 2L1 7l5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const IconStar = ({ size = 10 }) =>
<svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor">
    <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
  </svg>;

// ---------- Top nav (matches Massage page) ----------
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
    </header>);
}

// ---------- Hero ----------
function Hero({ mobile }) {
  return (
    <section className={`hero ${mobile ? "hero--mobile" : ""}`}>
      <div className="hero__text">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span>The Retail Room · Carrboro, NC</span>
        </div>
        <h1 className="hero__title">
          <span className="hero__line" style={{ animationDelay: "0s", color: "rgb(13, 27, 62)" }}>Treasures,</span>
          <span className="hero__line" style={{ animationDelay: "0.15s" }}>curiosities chosen.</span>
        </h1>
        <p className="hero__lede">
          A small, deeply considered shop tucked inside Areté — home goods, apothecary, and lifestyle objects you won't find by scrolling. Every piece on the shelf has a reason it's there.
        </p>
        <div className="hero__cta-row">
          <a href="#carousel" className="btn btn--primary">
            <span>SEE WHAT'S IN</span>
            <IconArrow />
          </a>
          <a href="#visit" className="btn btn--ghost">Plan a visit</a>
        </div>
        <div className="hero__meta">
          <span><IconStar /> Open 7 days · Walk-ins welcome</span>
          <span className="hero__meta-dot">·</span>
          <span>213 E Braxton Foushee St</span>
        </div>
      </div>

      {!mobile &&
      <div className="hero__visual">
          <div className="retail-hero-visual">
            <div className="retail-hero-visual__cell retail-hero-visual__cell--tall">
              <div className="retail-hero-visual__placeholder">retail room — wide<br />1200×1500</div>
              <span className="retail-hero-visual__tag">the shop floor</span>
            </div>
            <div className="retail-hero-visual__cell">
              <div className="retail-hero-visual__placeholder">apothecary shelf<br />800×800</div>
            </div>
            <div className="retail-hero-visual__cell">
              <div className="retail-hero-visual__placeholder">vignette<br />800×800</div>
            </div>
          </div>
        </div>
      }
    </section>);
}

// ---------- Curator note ----------
function Curator({ mobile }) {
  return (
    <section className={`curator ${mobile ? "curator--mobile" : ""}`}>
      <div className="curator__inner">
        <div className="curator__portrait">
          <img src="assets/team/jen.png" alt="Portrait of Jen, founder and curator of Areté Float + Wellness" />
        </div>
        <div>
          <span className="curator__kicker">A note from Jen</span>
          <h2>Carrboro's most <em>thoughtfully curated</em> small shop.</h2>
          <p>
            The internet has made almost everything findable — and almost nothing memorable. The shop is the opposite of an algorithm. Every object on the shelf has been held, considered, and quietly argued over before it earns its spot.
          </p>
          <p>
            Linens woven by a single family in Portugal. Ceramics from a one-woman studio outside Asheville. Tinctures, balms, and home goods that have a maker, a story, and usually a long wait list. We rotate often — what's in this week may be gone next.
          </p>
          <div className="curator__sig">— Jen, founder &amp; curator</div>
        </div>
      </div>
    </section>);

}

// ---------- Carousel ----------
//
// HOW TO UPDATE THE CAROUSEL
// --------------------------
// The carousel reads its items from the JSON block in retail.html
// (look for <script type="application/json" id="retail-items">).
// Edit that JSON to swap, add, or remove products — no JSX changes needed.
//
// Each entry has: { name, category, description, meta, image }
// `image` is optional — leave it blank ("") for a placeholder card.
//
function readItems() {
  try {
    const el = document.getElementById("retail-items");
    if (!el) return [];
    return JSON.parse(el.textContent || "[]");
  } catch (e) {
    console.warn("Could not parse retail-items JSON", e);
    return [];
  }
}

function Carousel({ mobile }) {
  const items = readItems();
  const railRef = useRef(null);

  const scrollBy = (dir) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector(".carousel-card");
    const step = card ? card.getBoundingClientRect().width + 24 : 300;
    el.scrollBy({ left: dir * step * (mobile ? 1 : 2), behavior: "smooth" });
  };

  return (
    <section className={`carousel ${mobile ? "carousel--mobile" : ""}`} id="carousel">
      <div className="carousel__head">
        <div className="carousel__title-wrap">
          <span className="carousel__kicker">In the shop this week</span>
          <h2 className="carousel__title">A few <em>recent finds.</em></h2>
        </div>
        <p className="carousel__lede">
          The selection rotates often. These are pieces we've fallen for lately — pop in to see what's actually on the shelf today.
        </p>
      </div>

      <div className="carousel__viewport" ref={railRef}>
        <div className="carousel__track">
          {items.map((it, i) =>
          <article key={i} className="carousel-card">
              <div className="carousel-card__img">
                {it.image ?
              <img src={it.image} alt={it.name} /> :
              <div className="carousel-card__placeholder">{it.name}<br />image · 4:5</div>
              }
                {it.category && <span className="carousel-card__cat">{it.category}</span>}
              </div>
              <h3 className="carousel-card__name">{it.name}</h3>
              <p className="carousel-card__desc">{it.description}</p>
              {it.meta && <div className="carousel-card__meta">{it.meta}</div>}
            </article>
          )}
        </div>
      </div>

      <div className="carousel__controls">
        <span className="carousel__hint">Drag, swipe, or use arrows. Inventory rotates often.</span>
        <div className="carousel__btns">
          <button className="carousel__btn" onClick={() => scrollBy(-1)} aria-label="Previous"><IconArrowL /></button>
          <button className="carousel__btn" onClick={() => scrollBy(1)} aria-label="Next"><IconArrow /></button>
        </div>
      </div>
    </section>);

}

// ---------- Categories ----------
function Categories({ mobile }) {
  const cats = [
  { t: "Home & Linens", d: "Heirloom textiles, ceramics, and small objects for the table and the rest of the house." },
  { t: "Apothecary", d: "Small-batch tinctures, balms, soaps, and candles from makers we know by name." },
  { t: "Skincare", d: "A rotating bench of the latest in clean, science-led skincare — researched relentlessly by Jen." },
  { t: "Curiosities", d: "Books, paper, jewelry, ritual objects. Things that don't fit a category but couldn't be left behind." }];

  return (
    <section className={`cats ${mobile ? "cats--mobile" : ""}`}>
      <div className="cats__head">
        <span className="cats__kicker">What you'll find</span>
        <h2>Four shelves, <em>one point of view.</em></h2>
      </div>
      <div className="cats__grid">
        {cats.map((c, i) =>
        <div key={i} className="cat">
            <span className="cat__num">{`0${i + 1}`}</span>
            <h4>{c.t}</h4>
            <p>{c.d}</p>
          </div>
        )}
      </div>
    </section>);

}

// ---------- Skincare callout ----------
function Skincare({ mobile }) {
  return (
    <section className={`skincare ${mobile ? "skincare--mobile" : ""}`}>
      <div className="skincare__inner">
        <div className="skincare__visual">skincare bench<br />1000×1000</div>
        <div>
          <span className="skincare__kicker">Jen's research bench</span>
          <h2>The skincare shelf, <em>obsessively kept.</em></h2>
          <p>
            Jen has a knack for chasing down the latest in skincare — reading the studies, the formulator interviews, the niche industry forums — and bringing back only the lines that hold up. The bench rotates constantly; what's there is what we'd happily put on our own faces this week.
          </p>
          <ul className="skincare__list">
            <li>Independent, formulator-led brands. No private-label fillers.</li>
            <li>Refreshed every few weeks as new launches and reformulations arrive.</li>
            <li>Honest guidance — we'll tell you when something <em>isn't</em> for you.</li>
            <li>Samples whenever possible. Skin is personal; trial it first.</li>
          </ul>
        </div>
      </div>
    </section>);

}

// ---------- Visit ----------
function Visit({ mobile }) {
  return (
    <section className={`visit ${mobile ? "visit--mobile" : ""}`} id="visit">
      <div className="visit__inner">
        <span className="visit__kicker">Come by</span>
        <h2>The shop is open whenever <em>Areté is.</em></h2>
        <div className="visit__hours">
          <div className="visit__hours-cell">
            <h4>Mon — Thu</h4>
            <p>9 AM — 8 PM</p>
          </div>
          <div className="visit__hours-cell">
            <h4>Fri — Sat</h4>
            <p>9 AM — 9 PM</p>
          </div>
          <div className="visit__hours-cell">
            <h4>Sunday</h4>
            <p>10 AM — 6 PM</p>
          </div>
        </div>
        <p style={{ fontSize: 14, color: "var(--ink-70)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
          No appointment needed. Come in between treatments, before yoga, or simply because. We're at 213 E Braxton Foushee Street in Carrboro — the building with the warm windows.
        </p>
      </div>
    </section>);

}

// ---------- Final CTA ----------
function FinalCTA({ mobile }) {
  return (
    <section className={`final ${mobile ? "final--mobile" : ""}`}>
      <div className="final__orb" />
      <h2>Small things,<br /><em>chosen. 
        </em></h2>
      <a href="#visit" className="btn btn--primary btn--lg">
        <span>Plan a visit</span>
        <IconArrow />
      </a>
      <div className="final__meta">
        213 E Braxton Foushee St · Carrboro, NC · 919-636-9899
      </div>
    </section>);}

// ---------- Sticky bar ----------
function StickyBar() {
  return (
    <div className="stickybar">
      <div>
        <span className="stickybar__from">curated by</span>
        <span className="stickybar__price" style={{ fontSize: 18 }}>Jen</span>
      </div>
      <a href="#carousel" className="btn btn--primary btn--sm">
        See finds <IconArrow size={12} />
      </a>
    </div>);
}

// ---------- Page ----------
function ServicePage({ mobile }) {
  return (
    <div className={`page ${mobile ? "page--mobile" : "page--desktop"}`}>
      <div className="grain" />
      <TopNav mobile={mobile} />
      <Hero mobile={mobile} />
      <Curator mobile={mobile} />
      <Carousel mobile={mobile} />
      <Categories mobile={mobile} />
      <Skincare mobile={mobile} />
      <Visit mobile={mobile} />
      <FinalCTA mobile={mobile} />
      {mobile && <StickyBar />}
    </div>);
}

// ---------- Tweaks ----------
const RETAIL_DEFAULTS = /*EDITMODE-BEGIN*/{
  "candle": "#7C6B8A",
  "displayFont": "LeJour",
  "showWhimsy": true
} /*EDITMODE-END*/;

function App() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange); };
  }, []);

  const [t, setTweak] = useTweaks(RETAIL_DEFAULTS);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--candle", t.candle);
    r.style.setProperty("--display-font", t.displayFont === "LeJour" ? "'LeJour', 'Cormorant Garamond', serif" : "'Cormorant Garamond', 'Le Jour Serif', serif");
  }, [t]);

  return (
    <>
      <ServicePage mobile={isMobile} />
    </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);