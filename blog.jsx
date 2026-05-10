/* global React */
const { useState, useEffect, useRef, useMemo } = React;

// ---------- Icons ----------
const IconArrow = ({ size = 14 }) =>
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d="M1 7h12M8 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const IconMenu = ({ size = 20 }) =>
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
  </svg>;

// ---------- Read posts JSON ----------
function readPosts() {
  try {
    const el = document.getElementById("blog-posts");
    if (!el) return [];
    return JSON.parse(el.textContent || "[]");
  } catch (e) {
    console.warn("Could not parse blog-posts JSON", e);
    return [];
  }
}

// ---------- Top nav (matches retail/Massage) ----------
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
          <a href="blog.html" aria-current="page" style={{ color: "var(--ink)", fontWeight: 500 }}>Blog</a>
          <a href="https://aretefloattank.floathelm.com/store/giftcards" target="_blank" rel="noopener">Gift Cards</a>
          <a href="#">About</a>
          <a href="https://aretefloattank.floathelm.com/booking" target="_blank" rel="noopener noreferrer" className="nav__cta" style={{ backgroundColor: "rgb(13, 27, 62)" }}>Book Now</a>
        </nav>
      </div>
    </header>
  );
}

// ---------- Hero ----------
function BlogHero() {
  return (
    <section className="blog-hero">
      <div className="blog-hero__eyebrow">
        <span>Field Notes &middot; Carrboro, NC</span>
      </div>
      <h1 className="blog-hero__title">
        Notes from <em>the sanctuary.</em>
      </h1>
      <p className="blog-hero__sub">
        Long reads, short observations, and the occasional product spotlight — written by the team at Areté on floating, sauna, contrast therapy, massage, and the rituals of restoration.
      </p>
    </section>
  );
}

// ---------- Filter chips ----------
function Filters({ tags, active, onChange }) {
  return (
    <div className="blog-filters" role="tablist" aria-label="Filter posts by topic">
      {tags.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={active === t}
          className={`blog-filters__chip ${active === t ? "is-active" : ""}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

// ---------- Featured ----------
function Featured({ post }) {
  if (!post) return null;
  return (
    <a className="blog-featured" href={post.href} aria-label={`Read: ${post.title}`}>
      <div className="blog-featured__media">
        {post.image
          ? <img src={post.image} alt={post.imageAlt || post.title} loading="eager" />
          : <div className="blog-featured__placeholder">featured post image<br />1200&times;900</div>}
      </div>
      <div className="blog-featured__body">
        <span className="blog-featured__tag">Latest &middot; {post.tag || post.category}</span>
        <h2 className="blog-featured__title">{post.title}</h2>
        <p className="blog-featured__excerpt">{post.excerpt}</p>
        <div className="blog-featured__meta">
          <span>{post.author}</span>
          <span className="blog-featured__meta-dot">&middot;</span>
          <span>{post.date}</span>
          <span className="blog-featured__meta-dot">&middot;</span>
          <span>{post.readTime}</span>
        </div>
        <span className="blog-featured__cta">
          Read the post <IconArrow />
        </span>
      </div>
    </a>
  );
}

// ---------- Card ----------
function Card({ post }) {
  return (
    <a className="blog-card" href={post.href} aria-label={`Read: ${post.title}`}>
      <div className="blog-card__media">
        {post.image
          ? <img src={post.image} alt={post.imageAlt || post.title} loading="lazy" />
          : <div className="blog-card__placeholder">{post.title}<br />image &middot; 16:10</div>}
      </div>
      <span className="blog-card__tag">{post.category}</span>
      <h3 className="blog-card__title">{post.title}</h3>
      <p className="blog-card__excerpt">{post.excerpt}</p>
      <div className="blog-card__meta">
        <span>{post.date}</span>
        <span style={{ opacity: 0.5 }}>&middot;</span>
        <span>{post.readTime}</span>
      </div>
    </a>
  );
}

// ---------- Sidebar ----------
function Sidebar({ posts, onPickCategory }) {
  // archive (group by month/year)
  const archive = useMemo(() => {
    const map = {};
    posts.forEach((p) => {
      const k = p.archive || p.date;
      map[k] = (map[k] || 0) + 1;
    });
    return Object.entries(map);
  }, [posts]);

  // tags (group by category)
  const tags = useMemo(() => {
    const map = {};
    posts.forEach((p) => {
      const k = p.category || "General";
      map[k] = (map[k] || 0) + 1;
    });
    return Object.entries(map);
  }, [posts]);

  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <aside className="blog-side" aria-label="Blog sidebar">
      <div className="blog-side__cta">
        <p className="blog-side__cta-title">Stillness, in your inbox.</p>
        <p className="blog-side__cta-sub">A quiet monthly note &mdash; new posts, member-only events, and the occasional ritual worth trying.</p>
        <form
          className="blog-side__cta-form"
          onSubmit={(e) => { e.preventDefault(); if (email) setDone(true); }}
        >
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="blog-side__cta-input"
            aria-label="Email address"
          />
          <button type="submit" className="blog-side__cta-btn">{done ? "In ✓" : "Subscribe"}</button>
        </form>
      </div>

      <div className="blog-side__block">
        <h4 className="blog-side__heading">Topics</h4>
        <ul className="blog-side__list">
          {tags.map(([t, n]) => (
            <li className="blog-side__item" key={t} onClick={() => onPickCategory(t)}>
              <span>{t}</span>
              <span className="blog-side__count">{n}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="blog-side__block">
        <h4 className="blog-side__heading">Archive</h4>
        <ul className="blog-side__list">
          {archive.map(([k, n]) => (
            <li className="blog-side__item" key={k}>
              <span>{k}</span>
              <span className="blog-side__count">{n} {n === 1 ? "post" : "posts"}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="blog-side__block">
        <h4 className="blog-side__heading">Visit</h4>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--ink-70)" }}>
          213 E. Braxton Foushee St<br />
          Carrboro, NC 27510<br />
          <a href="tel:+19196369899" style={{ color: "var(--ink)" }}>919-636-9899</a>
        </p>
      </div>
    </aside>
  );
}

// ---------- Footer ----------
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
          <li><a href="https://www.instagram.com/floatarete/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="http://www.facebook.com/floatarete" target="_blank" rel="noopener noreferrer">Facebook</a></li>
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

// ---------- App ----------
function App() {
  const allPosts = useMemo(readPosts, []);
  const tags = useMemo(() => {
    const set = new Set(["All"]);
    allPosts.forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, [allPosts]);

  const [active, setActive] = useState("All");

  const filtered = active === "All" ? allPosts : allPosts.filter((p) => p.category === active);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="blog-page">
      <TopNav />
      <main>
        <BlogHero />
        <Filters tags={tags} active={active} onChange={setActive} />
        <div className="blog-layout">
          <div>
            <Featured post={featured} />
            <div className="blog-grid">
              {rest.map((p, i) => <Card key={p.href || i} post={p} />)}
            </div>
          </div>
          <Sidebar posts={allPosts} onPickCategory={setActive} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
