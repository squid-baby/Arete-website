/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ---------- Read FAQ JSON ----------
function readFaq() {
  try {
    const el = document.getElementById("faq-data");
    if (!el) return [];
    return JSON.parse(el.textContent || "[]");
  } catch (e) {
    console.warn("Could not parse faq-data JSON", e);
    return [];
  }
}

// ---------- Inject FAQPage schema from same JSON ----------
function injectFaqSchema(groups) {
  const flat = groups.flatMap((g) =>
    g.items.map((it) => ({
      "@type": "Question",
      "name": it.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": it.a.replace(/<[^>]+>/g, "")
      }
    }))
  );
  const doc = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": flat
  };
  let tag = document.getElementById("__faq-schema");
  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = "__faq-schema";
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(doc, null, 2);
}

// ---------- Shared TopNav ----------
function TopNav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <a className="nav__brand" href="/" aria-label="Areté Float + Wellness — home">
          <img src="assets/arete-logo.png?v=2" alt="Areté Float + Wellness" style={{ width: "120px" }} />
        </a>
        <nav className="nav__links" aria-label="Primary">
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
          <a href="blog.html">Blog</a>
          <a href="https://aretefloattank.floathelm.com/store/giftcards" target="_blank" rel="noopener">Gift Cards</a>
          <a href="about.html">About</a>
          <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener noreferrer" className="nav__cta" style={{ backgroundColor: "rgb(13, 27, 62)" }}>Book Now</a>
        </nav>
      </div>
    </header>
  );
}

// ---------- Shared Footer (reuses blog-footer styles) ----------
function Footer() {
  return (
    <footer className="blog-footer">
      <div className="blog-footer__inner">
        <a className="blog-footer__brand" href="/">
          <img src="assets/arete-logo.png?v=2" alt="Areté Float + Wellness" />
          <span>Carrboro &middot; NC</span>
        </a>
        <ul className="blog-footer__links">
          <li><a href="float.html">Float</a></li>
          <li><a href="sauna.html">Sauna</a></li>
          <li><a href="Contrast-Therapy.html">Contrast Therapy</a></li>
          <li><a href="Massage.html">Massage</a></li>
          <li><a href="halotherapy.html">Halotherapy</a></li>
          <li><a href="retail.html">Retail</a></li>
          <li><a href="memberships.html">Memberships</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="https://aretefloattank.floathelm.com/store/giftcards" target="_blank" rel="noopener">Gift Cards</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="faq.html">FAQ</a></li>
        </ul>
        <div className="blog-footer__address">
          <strong style={{ color: "#fff", display: "block", marginBottom: 6 }}>Areté Float + Wellness</strong>
          213 E. Braxton Foushee St<br />
          Carrboro, NC 27510<br />
          <a href="tel:+19196369899">919-636-9899</a>
        </div>
      </div>
      <div className="blog-footer__copy">
        <span>&copy; 2026 Areté Float + Wellness. All rights reserved.</span>
        <span>A sanctuary for body, mind &amp; restoration.</span>
      </div>
    </footer>
  );
}

// ---------- FAQ accordion item ----------
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "is-open" : ""}`}>
      <button className="faq-item__q" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{q}</span>
        <span className="faq-item__caret" aria-hidden="true">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 1v8M1 5h8" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div className="faq-item__a">
        <div
          className="faq-item__a-inner"
          dangerouslySetInnerHTML={{ __html: a.split(/\n\n+/).map((p) => `<p>${p}</p>`).join("") }}
        />
      </div>
    </div>
  );
}

// ---------- TOC ----------
function Toc({ groups, active, onJump }) {
  return (
    <nav className="faq-toc" aria-label="FAQ topics">
      <h4 className="faq-toc__heading">Topics</h4>
      {groups.map((g) => (
        <a
          key={g.id}
          href={`#faq-${g.id}`}
          className={`faq-toc__link ${active === g.id ? "is-active" : ""}`}
          onClick={(e) => { e.preventDefault(); onJump(g.id); }}
        >
          {g.title}
        </a>
      ))}
    </nav>
  );
}

// ---------- App ----------
function App() {
  const groups = useMemo(readFaq, []);
  const [active, setActive] = useState(groups[0]?.id || "");

  // Inject schema once
  useEffect(() => {
    if (groups.length) injectFaqSchema(groups);
  }, [groups]);

  // Track which group is in view
  useEffect(() => {
    const els = groups.map((g) => document.getElementById(`faq-${g.id}`)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id.replace(/^faq-/, "");
            setActive(id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [groups]);

  const jumpTo = (id) => {
    const el = document.getElementById(`faq-${id}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 40;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="info-page">
      <TopNav />
      <main>
        <section className="info-hero">
          <div className="info-hero__eyebrow"><span>Frequently Asked</span></div>
          <h1 className="info-hero__title">Most of what you're <em>about to ask.</em></h1>
          <p className="info-hero__sub">
            What floating actually feels like, how cold the plunge really is, and everything we get asked at the front desk. If your question isn't here, call us at <a href="tel:+19196369899" style={{ color: "var(--ink)", borderBottom: "1px solid var(--candle)" }}>919-636-9899</a>.
          </p>
        </section>

        <div className="info-container">
          <div className="faq-layout">
            <Toc groups={groups} active={active} onJump={jumpTo} />
            <div>
              {groups.map((g) => (
                <section key={g.id} id={`faq-${g.id}`} className="faq-group">
                  <h2 className="faq-group__heading">{g.title}</h2>
                  {g.items.map((it, i) => <FaqItem key={i} q={it.q} a={it.a} />)}
                </section>
              ))}
            </div>
          </div>
        </div>

        <section className="info-visit">
          <h2>Still <em>have a question?</em></h2>
          <p>The fastest answer is usually a phone call. We pick up between 9 AM and close, every day.</p>
          <div className="info-visit__hours">
            <div className="info-visit__hours-cell"><h4>Mon — Thu</h4><p>9 AM — 8 PM</p></div>
            <div className="info-visit__hours-cell"><h4>Fri — Sat</h4><p>9 AM — 9 PM</p></div>
            <div className="info-visit__hours-cell"><h4>Sunday</h4><p>10 AM — 6 PM</p></div>
          </div>
          <a className="info-visit__cta" href="tel:+19196369899">Call 919-636-9899</a>
        </section>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
