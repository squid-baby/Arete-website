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
const IconMenu = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
  </svg>
);

const IconClose = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
  </svg>
);

function TopNav({ mobile }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { if (!mobile) setMenuOpen(false); }, [mobile]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  return (
    <header className={`nav ${mobile ? "nav--mobile" : ""}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="/" aria-label="Areté Float + Wellness, home">
          <img src="assets/arete-logo.png?v=2" alt="Areté Float + Wellness" style={{ width: mobile ? "88px" : "120px" }} />
        </a>

        {mobile ? (
          <button
            className="nav__menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        ) : (
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
        )}
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
          <a href="blog.html">Blog</a>
          <a href="https://aretefloattank.floathelm.com/store/giftcards" target="_blank" rel="noopener">Gift Cards</a>
          <a href="about.html" aria-current="page">About</a>
          <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener noreferrer" className="nav__mobile-cta">Book Now</a>
        </div>
      )}
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
        Areté is independently owned and quietly run. We built every room around one question: what would actually help someone slow down? Below, the story, the principles, and the people who keep it running.
      </p>
    </section>
  );
}

function Story() {
  return (
    <section className="about-story">
      <div className="about-story__visual about-story__definition" aria-label="Areté definition">
        <div className="about-story__wordmark">
          <span className="about-story__term">Areté</span>
          <span className="about-story__rule" aria-hidden="true"></span>
          <span className="about-story__pronunciation">&auml;-re-t&#257;'</span>
        </div>
        <div className="about-story__chevrons" aria-hidden="true">
          <span></span>
          <span></span>
        </div>
        <div className="about-story__meaning">
          <p>Virtue, moral excellence.</p>
          <p>Becoming the best version of one's self.</p>
        </div>
      </div>
      <div className="about-story__body">
        <h2 className="about-story__heading">Our story</h2>
        <p>
          At Areté, we believe wellness is not a trend. It is a lifelong journey. As the first studio of our kind in the Triangle, we have been proudly rooted in downtown Carrboro since opening our doors in February 2018. Locally owned and female-operated, Areté was built on the belief that real self-care starts with genuine connection and community.
        </p>
        <p>
          We offer first-class wellness and self-care experiences designed to help remind your mind and body that it is time to relax, recover, and create. Rooted in time-honored traditions and shaped with a modern touch, every service is thoughtfully chosen to help you slow down, reset, and step fully into your best self.
        </p>
        <p>
          Areté is always growing and evolving, just as we believe we all should be. Whether you are booking a session, exploring our magical space, or simply stopping by to say hello, we are here to support you every step of the way.
        </p>
        <p>
          Welcome to Areté, where becoming the best version of you is not just the goal. It is the experience.
        </p>
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
      <div className="team-card__content">
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
      </div>
    </article>
  );
}

function Team({ team }) {
  return (
    <section className="about-team">
      <div className="about-team__head">
        <span className="about-team__kicker">Meet the owner</span>
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
      <p>Our doors follow the day's appointment rhythm, so hours can shift with what is on the books. In general, Areté is available Tuesday through Sunday and closed on Mondays. If you would like a tour, send us a quick note before stopping by, or book online for the smoothest visit.</p>
      <div className="info-visit__hours">
        <div className="info-visit__hours-cell"><h4>Tue-Sun</h4><p>By appointment</p></div>
        <div className="info-visit__hours-cell"><h4>Monday</h4><p>Closed</p></div>
        <div className="info-visit__hours-cell"><h4>Tours</h4><p>Please check ahead</p></div>
      </div>
      <a className="info-visit__cta" href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener noreferrer">Book a session →</a>
    </section>
  );
}

// ---------- App ----------
function App() {
  const team = useMemo(readTeam, []);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => {
      mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (team.length) injectPeopleSchema(team);
  }, [team]);

  return (
    <div className="info-page about-page">
      <TopNav mobile={isMobile} />
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
