/* global React */
const { useState, useEffect, useMemo } = React;

// ---------- Read team JSON ----------
function readTeam() {
  try {
    const el = document.getElementById("team-data");
    if (!el) return [];
    return JSON.parse(el.textContent || "[]");
  } catch (e) {
    console.warn("Could not parse team-data JSON", e);
    return [];
  }
}

// ---------- Inject Person schema for each team member ----------
function injectPeopleSchema(team) {
  const items = team
    .filter((p) => !/^\[|\bplaceholder\b/i.test(p.name))
    .map((p) => ({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": p.name,
      "jobTitle": p.role,
      "description": p.bio,
      "worksFor": { "@id": "https://floatarete.com/#business" },
      ...(p.credentials ? { "hasCredential": p.credentials } : {}),
      ...(p.specialties && p.specialties.length ? { "knowsAbout": p.specialties } : {}),
      ...(p.photo ? { "image": p.photo } : {})
    }));
  let tag = document.getElementById("__people-schema");
  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.id = "__people-schema";
    document.head.appendChild(tag);
  }
  // Person schema is one object per member; emit a graph
  tag.textContent = JSON.stringify(
    { "@context": "https://schema.org", "@graph": items },
    null,
    2
  );
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
          <a href="about.html" aria-current="page" style={{ color: "var(--ink)", fontWeight: 500 }}>About</a>
          <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener noreferrer" className="nav__cta" style={{ backgroundColor: "rgb(13, 27, 62)" }}>Book Now</a>
        </nav>
      </div>
    </header>
  );
}

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

// ---------- Sections ----------
function Hero() {
  return (
    <section className="info-hero">
      <div className="info-hero__eyebrow"><span>About Areté &middot; Carrboro, NC</span></div>
      <h1 className="info-hero__title">A neighborhood <em>sanctuary,</em><br />built on purpose.</h1>
      <p className="info-hero__sub">
        Areté is independently owned and quietly run. We built every room around one question: what would actually help someone slow down? Below — the story, the principles, and the people who keep it running.
      </p>
    </section>
  );
}

function Story() {
  return (
    <section className="about-story">
      <div className="about-story__visual about-story__visual--photo">
        <img src="assets/team/jen.png" alt="Portrait of Jen Ellis, founder of Areté Float + Wellness" />
      </div>
      <div className="about-story__body">
        <span className="about-story__kicker">Our story</span>
        <h2 className="about-story__heading">A studio shaped by <em>what we needed</em> ourselves.</h2>
        <p>
          Areté opened because we needed it. Years before there was a building, there was a list — a quiet, growing list of the rooms we wished existed in our own town. A float tank, run with care. A cedar sauna hot enough to matter. A cold plunge clean enough to use. A massage room that actually felt restful. And a small shop with the kind of objects that only show up if a person — not an algorithm — chose them.
        </p>
        <p>
          We're at the corner of Maple and E. Braxton Foushee in Carrboro. The building has warm windows. The team is small. The rotation of products in the retail room changes often. The phones at the front desk are answered by humans who've also been on the table.
        </p>
        <p>
          If you've never floated, never plunged, never sauna'd — start with one. We'll guide you through it. If you've done all three, you already know why we built this.
        </p>
        <div className="about-story__sig">— Jen, founder</div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="about-values">
      <div className="about-values__item">
        <h4>Principle 01</h4>
        <h3>One thing, done well.</h3>
        <p>
          Every room serves a single purpose. Float is for stillness. Sauna is for heat. Plunge is for the reset. We don't dilute any of them with overlap.
        </p>
      </div>
      <div className="about-values__item">
        <h4>Principle 02</h4>
        <h3>People, not patterns.</h3>
        <p>
          The team curates, the team greets, the team cleans. Decisions get made by humans on shift, not by a manual. The trade-off is intentional.
        </p>
      </div>
      <div className="about-values__item">
        <h4>Principle 03</h4>
        <h3>Slow as a service.</h3>
        <p>
          Sessions are never rushed. Transition time is built in. You arrive, you land, you leave changed. If we're behind schedule, the right answer is always: let it run long.
        </p>
      </div>
    </section>
  );
}

function TeamCard({ p }) {
  return (
    <article className="team-card">
      <div className="team-card__photo">
        {p.photo ? <img src={p.photo} alt={`Portrait of ${p.name}`} /> : <span>portrait<br />3:4</span>}
      </div>
      <h3 className="team-card__name">{p.name}</h3>
      <span className="team-card__role">{p.role}</span>
      <p className="team-card__bio">{p.bio}</p>
      {p.credentials && <div className="team-card__creds">{p.credentials}</div>}
      {p.bookingUrl && (
        <a
          className="team-card__book"
          href={p.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Book an appointment with ${p.name}`}
        >
          Book an appointment →
        </a>
      )}
    </article>
  );
}

function Team({ team }) {
  return (
    <section className="about-team">
      <div className="about-team__head">
        <span className="about-team__kicker">The team</span>
        <h2 className="about-team__heading">The people <em>on shift.</em></h2>
      </div>
      <div className="team-grid">
        {team.map((p, i) => <TeamCard key={i} p={p} />)}
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section className="info-visit">
      <h2>Come <em>see the rooms.</em></h2>
      <p>No appointment needed for a tour — pop in any time we're open. If you want to book a session, the fastest way is online.</p>
      <div className="info-visit__hours">
        <div className="info-visit__hours-cell"><h4>Mon — Thu</h4><p>9 AM — 8 PM</p></div>
        <div className="info-visit__hours-cell"><h4>Fri — Sat</h4><p>9 AM — 9 PM</p></div>
        <div className="info-visit__hours-cell"><h4>Sunday</h4><p>10 AM — 6 PM</p></div>
      </div>
      <a className="info-visit__cta" href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener noreferrer">Book a session →</a>
    </section>
  );
}

// ---------- App ----------
function App() {
  const team = useMemo(readTeam, []);

  useEffect(() => {
    if (team.length) injectPeopleSchema(team);
  }, [team]);

  return (
    <div className="info-page">
      <TopNav />
      <main>
        <Hero />
        <div className="info-container">
          <Story />
          <Values />
          <Team team={team} />
        </div>
        <Visit />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
