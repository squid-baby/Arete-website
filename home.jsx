// home.jsx — Areté home page (Light mode)
// Whimsy mode is stubbed in CSS via body.whimsy .whimsy-stub { display:flex }

const { useState, useEffect, useRef } = React;

/* ---------- Service Icons ---------- */
const IconFloat = () =>
<img src="assets/icons/float.png?v=2" alt="" className="service-icon-img" />;

const IconSauna = () =>
<img src="assets/icons/sauna.png?v=2" alt="" className="service-icon-img" />;

const IconCold = () =>
<img src="assets/icons/cold.png?v=2" alt="" className="service-icon-img" />;

const IconMassage = () =>
<img src="assets/icons/massage.png?v=2" alt="" className="service-icon-img" />;

const IconRedLight = () =>
<img src="assets/icons/redlight.png?v=2" alt="" className="service-icon-img" />;

const IconHalo = () =>
<img src="assets/icons/halo.png?v=2" alt="" className="service-icon-img" />;


const SERVICES = [
{
  id: "float",
  href: "float.html",
  name: "Float Tank",
  desc: "1,000 lbs of Epsom salt, 10 inches of water, zero gravity, total sensory silence. An experience unlike any other.",
  price: "From $65 · 60 or 90 min",
  tag: "Most popular",
  glow: "glow-blue",
  Icon: IconFloat
},
{
  id: "sauna",
  href: "#sauna",
  name: "Infrared Sauna",
  desc: "Deep heat that works from the inside out. Detox, muscle relief, and the kind of warmth that stays with you.",
  price: "From $25 · 15 or 30 min",
  glow: "glow-amber",
  Icon: IconSauna
},
{
  id: "cold",
  href: "Contrast-Therapy.html",
  name: "Contrast Therapy",
  desc: "The reset button. Cold immersion for inflammation, clarity, and that electric aliveness that lasts all day.",
  price: "From $50 · 60 min Solo or with a friend.",
  glow: "glow-blue",
  Icon: IconCold
},
{
  id: "massage",
  href: "#massage",
  name: "Massage",
  desc: "Therapeutic bodywork tailored to you. Curated rest and recovery designed around your unique needs.",
  price: "From $110 · 60, 75, or 90 min",
  glow: "glow-purple",
  Icon: IconMassage
},
{
  id: "redlight",
  href: "#redlight",
  name: "Red Light Therapy",
  desc: "Full-spectrum red and near-infrared light. Accelerates healing, supports collagen and cellular energy, without heat or UV.",
  price: "From $20 · 20 min",
  glow: "glow-red",
  Icon: IconRedLight
},
{
  id: "halo",
  href: "#halo",
  name: "Halotherapy",
  desc: "Dry salt air micronized into a therapeutic mist. Supports respiratory health, soothes skin, and quiets breath.",
  price: "From $10 · 30 min - add on to any sauna session",
  glow: "glow-salt",
  Icon: IconHalo
}];


/* ---------- Hero image ---------- */
const HeroPod = () =>
<img src="assets/hero-image.png" alt="Floating in the tank — Areté" className="home-hero__image" style={{ width: "120px", opacity: "3", height: "200px" }} />;


/* ---------- Components ---------- */
const IconMenu = ({ size = 22 }) =>
<svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
  </svg>;

const IconClose = ({ size = 22 }) =>
<svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
  </svg>;

function Nav({ mobile }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close drawer if viewport grows past mobile while open.
  useEffect(() => { if (!mobile) setMenuOpen(false); }, [mobile]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  return (
    <nav className={`nav ${mobile ? "nav--mobile" : ""}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="/" aria-label="Areté home">
          <img src="assets/arete-logo.png" alt="Areté" style={{ width: mobile ? "88px" : "122px" }} />
        </a>

        {mobile ?
        <button
          className="nav__menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button> :

        <>
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
              <a href="https://aretefloattank.floathelm.com/store/giftcards" target="_blank" rel="noopener">Gift Cards</a>
              <a href="about.html">About</a>
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <a
              className="mode-toggle"
              href="whimsy.html"
              aria-label="Switch to Whimsy mode"
              style={{ textDecoration: "none" }}>

                <span className="mode-toggle__label active">Light</span>
                <div className="mode-toggle__track">
                  <div className="mode-toggle__thumb">✦</div>
                </div>
                <span className="mode-toggle__label">Whimsy</span>
              </a>
              <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener" className="nav__cta">Book</a>
            </div>
          </>
        }
      </div>

      {mobile &&
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
          <a href="https://aretefloattank.floathelm.com/store/giftcards" target="_blank" rel="noopener">Gift Cards</a>
          <a href="about.html">About</a>
          <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener" className="nav__mobile-cta">Book</a>
        </div>
      }
    </nav>);

}

function Hero() {
  return (
    <section className="home-hero" style={{ gap: "40px", padding: "40px 24px 50px" }}>
      <div className="particle-field" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => {
          const symbols = ["✦", "✧", "⋆", "·", "∘"];
          const sym = symbols[i % symbols.length];
          const style = {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            "--pdur": `${Math.random() * 8 + 7}s`,
            "--pdelay": `${Math.random() * 8}s`,
            fontSize: `${Math.random() * 8 + 8}px`
          };
          return <span className="particle" style={style} key={i}>{sym}</span>;
        })}
      </div>

      <div className="home-hero__content">
        <p className="home-hero__eyebrow">ELEMENTAL WELLNESS · CARRBORO, NC</p>
        <h1 className="home-hero__title">
          Step inside.<br />
          <em>Come back to you.</em>
        </h1>
        <p className="home-hero__sub">
          A sanctuary for body, mind &amp; restoration. Float tanks, sauna, contrast therapy, and massage — designed to help you let go and light up.
        </p>
        <div className="home-hero__ctas">
          <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Book a Session</a>
          <a href="#services" className="btn-ghost" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Explore Services</a>
        </div>
      </div>

    </section>);

}

function Services() {
  return (
    <section className="section" id="services" style={{ padding: "80px 24px" }}>
      <div className="section__header reveal">
        <p className="section__eyebrow">What we offer</p>
        <h2 className="section__title">
          Experiences designed<br /><em>for restoration</em>
        </h2>
      </div>

      <div className="services-grid reveal">
        {SERVICES.map((s) => {
          const linked = !!s.href;
          return (
            <div
              key={s.id}
              className={`service-card ${linked ? "service-card--linked" : "service-card--soon"}`}
              onClick={linked ? () => { window.location.href = s.href; } : undefined}
              style={linked ? { cursor: "pointer" } : undefined}>
              
              <div className={`service-room-glow ${s.glow}`}></div>
              <div className="service-icon"><s.Icon /></div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <p className="service-price">{s.price}</p>
              {s.tag && <span className="service-tag">{s.tag}</span>}
              {linked ?
              <div className="service-actions" onClick={(e) => e.stopPropagation()}>
                  <a href={s.bookHref || "#book"} className="service-book" aria-label={`Book ${s.name}`}>
                    Book
                  </a>
                  <a href={s.href} className="service-more" aria-label={`More about ${s.name}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                </div> :

              <span className="service-soon-badge">Coming soon</span>
              }
            </div>);

        })}
      </div>
    </section>);

}

function EmailStrip() {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  return (
    <section className="email-strip reveal" aria-label="Newsletter signup">
      <div className="email-strip__inner" style={{ height: "160px" }}>
        <div className="email-strip__copy">
          <p className="email-strip__eyebrow">Stillness, in your inbox</p>
          <h3 className="email-strip__title">
            Notes on rest, ritual, and <em>returning to yourself</em>.
          </h3>
        </div>
        <form
          className="email-strip__form"
          onSubmit={(e) => {e.preventDefault();if (email) setDone(true);}}>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-strip__input"
            aria-label="Email address" />
          <button type="submit" className="email-strip__cta">
            {done ? "Welcome in ·" : "Sign me up"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </form>
        <p className="email-strip__privacy">We don't spam — we're here to lower stress, not add to it.</p>
      </div>
    </section>);
}

function Experience() {
  return (
    <section className="section" id="experience" style={{ opacity: "1" }}>
      <div className="section__header reveal">
        <p className="section__eyebrow">The experience</p>
        <h2 className="section__title">
          Slow down.<br /><em>Then come back.</em>
        </h2>
      </div>

      <div className="experience-grid">
        <div className="experience-text reveal">
          <div className="big-stat">36 <span style={{ color: "rgb(74, 84, 110)", opacity: "1" }}>hours on call</span></div>
          <p className="stat-label">AVERAGE WEEKLY TIME PARENTS OF YOUNG KIDS SPEND CARING FOR OTHERS AND KEEPING LIFE MOVING</p>
          <p>
            We've designed every room to do one thing: get you out of your head and back into your body. No phones. No noise. No schedule chasing you.
          </p>
          <p>
            Located at the corner of Maple Ave &amp; E Braxton Foushee St in Carrboro — a healing space rooted in community.
          </p>
        </div>

        <ul className="experience-list reveal">
          {[
          ["01", "Handpicked products", "Every item in our retail room is something we actually believe in — curated for recovery, ritual, and real results."],
          ["02", "Intentional experiences", "Sessions are never rushed. Transition time is built in. You arrive, you land, you leave changed."],
          ["03", "Rooted in community", "We're Carrboro through and through. A neighborhood sanctuary for neighbors who need it most."],
          ["04", "Made for you", "Whether it's your first float or your fiftieth, we meet you exactly where you are."]].
          map(([num, h, p]) =>
          <li className="experience-item" key={num}>
              <span className="exp-num">{num}</span>
              <div className="exp-content">
                <h4>{h}</h4>
                <p>{p}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>);

}

function BookingStrip() {
  return (
    <div className="booking-strip reveal" id="visit">
      <h2>Ready to <em>let go</em>?<br />Book your session.</h2>
      <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener" className="btn-book-large" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>Reserve Your Time →</a>
    </div>);

}

function Footer() {
  return (
    <footer className="home-footer">
      <div className="home-footer__inner">
        <a className="home-footer__logo" href="index.html">
          <img src="assets/arete-logo.png" alt="Areté" />
          <span>Carrboro · NC</span>
        </a>
        <ul className="home-footer__links">
          <li><a href="#services">Services</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="memberships.html">Memberships</a></li>
          <li><a href="packages.html">Packages</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="https://aretefloattank.floathelm.com/store/giftcards" target="_blank" rel="noopener">Gift Cards</a></li>
          <li><a href="https://www.instagram.com/floatarete/" target="_blank" rel="noopener">Instagram</a></li>
        </ul>
        <div className="home-footer__address">
          213 E. Braxton Foushee St<br />
          Carrboro, NC
        </div>
      </div>
      <div className="home-footer__copy">
        <span>© 2025 Areté. All rights reserved.</span>
        <span>A sanctuary for body, mind &amp; restoration.</span>
      </div>
    </footer>);

}

function WhimsyStub({ onBack }) {
  return (
    <div className="whimsy-stub" aria-hidden={false}>
      <div className="whimsy-stub__inner">
        <p className="whimsy-stub__sparkle">✦ ✦ ✦</p>
        <h2 className="whimsy-stub__title">
          Whimsy mode is<br /><em>still dreaming.</em>
        </h2>
        <p className="whimsy-stub__sub">
          We're crafting an illustrated, after-hours version of Areté — stars, candlelight, and a cutaway view of every room. Check back soon.
        </p>
        <button className="whimsy-stub__back" onClick={onBack}>← Back to Light mode</button>
      </div>
    </div>);

}

/* ---------- Tweaks ---------- */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "darkPurple": "#7c6b8a",
  "darkNavy": "#0d1b3e"
} /*EDITMODE-END*/;

// Hex → rgba(...) helper for replacing rgba purple uses
const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(v, 16);
  return [n >> 16 & 255, n >> 8 & 255, n & 255];
};

function applyDarkPurple(hex) {
  const [r, g, b] = hexToRgb(hex);
  // Build a darker variant for gradients (mix toward black ~50%)
  const darker = `rgb(${Math.round(r * 0.55)}, ${Math.round(g * 0.55)}, ${Math.round(b * 0.55)})`;
  const css = `
    body.light { --candle: ${hex} !important; }
    body.whimsy .final { background: linear-gradient(135deg, #1A2C5A 0%, ${darker} 100%) !important; }
    body.whimsy .mode-toggle__track { background: linear-gradient(135deg, ${hex}, #1A3A6E) !important; }
  `;
  let tag = document.getElementById("__dark-purple-tweak");
  if (!tag) {
    tag = document.createElement("style");
    tag.id = "__dark-purple-tweak";
    document.head.appendChild(tag);
  }
  tag.textContent = css;
}

function applyDarkNavy(hex) {
  const [r, g, b] = hexToRgb(hex);
  // Lighter variant for --ink-70
  const lighter = `rgb(${Math.round(r + (255 - r) * 0.25)}, ${Math.round(g + (255 - g) * 0.25)}, ${Math.round(b + (255 - b) * 0.25)})`;
  const css = `
    body.light {
      --ink: ${hex} !important;
      --ink-70: ${lighter} !important;
      --ink-55: rgba(${r}, ${g}, ${b}, 0.55) !important;
      --ink-30: rgba(${r}, ${g}, ${b}, 0.3) !important;
      --ink-06: rgba(${r}, ${g}, ${b}, 0.04) !important;
    }
  `;
  let tag = document.getElementById("__dark-navy-tweak");
  if (!tag) {
    tag = document.createElement("style");
    tag.id = "__dark-navy-tweak";
    document.head.appendChild(tag);
  }
  tag.textContent = css;
}

/* ---------- App ---------- */
function App() {
  const [mode, setMode] = useState("light");
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange); };
  }, []);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {applyDarkPurple(t.darkPurple);}, [t.darkPurple]);
  useEffect(() => {applyDarkNavy(t.darkNavy);}, [t.darkNavy]);

  // Apply mode class on body
  useEffect(() => {
    document.body.classList.toggle("whimsy", mode === "whimsy");
    document.body.classList.toggle("light", mode === "light");
  }, [mode]);

  // Star field generation (one-time)
  useEffect(() => {
    const sf = document.getElementById("starField");
    if (!sf || sf.childElementCount > 0) return;
    for (let i = 0; i < 100; i++) {
      const s = document.createElement("div");
      s.className = "star";
      const sz = Math.random() * 2 + 1;
      s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${sz}px;height:${sz}px;--dur:${Math.random() * 3 + 2}s;--delay:${Math.random() * 3}s;--min-o:${Math.random() * 0.3 + 0.1};--max-o:${Math.random() * 0.5 + 0.4};`;
      sf.appendChild(s);
    }
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav mobile={isMobile} />
      <main>
        <Hero />
        <Services />
        <EmailStrip />
        <Experience />
        <BookingStrip />
      </main>
      <Footer />
      <TweaksPanel>
        <TweakSection label="Color" />
        <TweakColor
          label="Dark purple"
          value={t.darkPurple}
          onChange={(v) => setTweak('darkPurple', v)} />

        <TweakColor
          label="Dark navy"
          value={t.darkNavy}
          onChange={(v) => setTweak('darkNavy', v)} />

      </TweaksPanel>
    </>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
