/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Booking links (FloatHelm direct service links) ----------
const BOOK = {
  general: "https://aretefloattank.floathelm.com/booking",
  massage60: "https://aretefloattank.floathelm.com/store/services/1214265",
  massage75: "https://aretefloattank.floathelm.com/store/services/1216238",
  massage90: "https://aretefloattank.floathelm.com/store/services/1214276"
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

const IconPlus = ({ size = 16, open }) =>
<svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.1"
style={{ transition: "transform .4s ease", transform: open ? "rotate(45deg)" : "none" }}>
    <path d="M8 2v12M2 8h12" strokeLinecap="round" />
  </svg>;

const IconStar = ({ size = 10 }) =>
<svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor">
    <path d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z" />
  </svg>;

const IconHands = ({ size = 28 }) =>
<svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 16c3-3 11-3 14 0" />
    <path d="M5 20c3-3 11-3 14 0" />
    <path d="M7 12c2-2 9-2 11 0" />
    <path d="M22 11l4-1 1 5-3 2" />
  </svg>;

// ---------- Top nav ----------
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

// ---------- Rock massage video ----------
// Uses the same blob-URL workaround as Contrast Therapy's IceCube — see
// contrast-therapy.jsx for the full explanation. tl;dr: the dev sandbox
// doesn't satisfy Range requests, so <video src="..."> from a normal URL
// can fail. Fetch the mp4, wrap the Blob in an object URL, use that as src.
function RockMassage({ played }) {
  const videoRef = React.useRef(null);
  const [blobUrl, setBlobUrl] = React.useState(null);

  React.useEffect(() => {
    let revoke = null;
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("assets/rock-massage.mp4");
        const blob = await r.blob();
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        revoke = url;
        setBlobUrl(url);
      } catch (_) {}
    })();
    return () => {
      cancelled = true;
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, []);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v || !blobUrl) return;
    if (played) {
      try {v.currentTime = 0;} catch (_) {}
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      v.pause();
      try {v.currentTime = 0;} catch (_) {}
    }
  }, [played, blobUrl]);

  return (
    <div className="ba__frame" style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(180deg, rgba(196,168,224,0.10) 0%, rgba(13,27,62,0.04) 100%)",
      overflow: "hidden", position: "relative"
    }}>
      <video
        ref={videoRef}
        src={blobUrl || undefined}
        muted
        playsInline
        preload="auto"
        onEnded={(e) => {
          const v = e.currentTarget;
          try {
            v.pause();
            if (v.duration && isFinite(v.duration)) {
              v.currentTime = Math.max(0, v.duration - 0.05);
            }
          } catch (_) {}
        }}
        style={{
          maxWidth: "100%", maxHeight: "100%", objectFit: "cover",
          width: "100%", height: "100%",
          position: "relative", zIndex: 1
        }} />
      
    </div>);

}

// ---------- Hero ----------
function Hero({ mobile, copy }) {
  const [played, setPlayed] = useState(false);
  return (
    <section className={`hero ${mobile ? "hero--mobile" : ""}`} style={{ opacity: "5" }}>
      <div className="hero__text">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span>Massage Therapy · 60 or 90 min</span>
        </div>
        <h1 className="hero__title">
          {copy.heroTitle.split("\n").map((line, i) =>
          <span key={i} className="hero__line" style={{ animationDelay: `${0.15 * i}s`, color: "rgb(13, 27, 62)" }}>{line}</span>
          )}
        </h1>
        <p className="hero__lede">{copy.heroLede}</p>

        <div className="hero__cta-row">
          <a href={BOOK.massage60} target="_blank" rel="noopener" className="btn btn--primary">
            <span>BOOK A SESSION</span>
            <IconArrow />
          </a>
          <a href="#learn" className="btn btn--ghost">How we work</a>
        </div>

        <div className="hero__meta">
          <span><IconStar /> Licensed therapists · 40+ yrs combined</span>
          <span className="hero__meta-dot">·</span>
          <span>Carrboro, NC</span>
        </div>
      </div>

      {!mobile &&
      <div className="hero__visual">
        <div className={`ba ${played ? "ba--float" : "ba--stress"}`}>
          <RockMassage played={played} />
          <div className="ba__caption">
            <span className="ba__caption-label">{played ? "After" : "Before"}</span>
            <span className="ba__caption-text" style={{ color: "rgb(74, 91, 160)", textAlign: "right", width: "200px", whiteSpace: "pre-line" }}>
              {played ? "Loosened\nopen\nand at ease" : "Held tight\nguarded\nbraced"}
            </span>
          </div>
        </div>
        <div className="hero__toggle">
          <button
            className={`toggle__pill ${!played ? "is-on" : ""}`}
            onClick={() => setPlayed(false)}>
            Held</button>
          <button
            className={`toggle__pill ${played ? "is-on" : ""}`}
            onClick={() => setPlayed(true)} style={{ color: "rgb(196, 168, 224)" }}>
            Play the release</button>
        </div>
      </div>
      }
    </section>);
}

// ---------- Benefits ----------
function Benefits({ mobile, copy }) {
  return (
    <section className={`benefits ${mobile ? "benefits--mobile" : ""}`}>
      {copy.benefits.map((b, i) =>
      <div key={i} className="benefit">
          <span className="benefit__num">{String(i + 1).padStart(2, "0")}</span>
          <div className="benefit__body">
            <h3 style={{ color: "rgb(13, 27, 62)", width: "118px" }}>{b.t}</h3>
            <p>{b.d}</p>
          </div>
        </div>
      )}
    </section>);
}

// ---------- Philosophy (replaces timeline) ----------
function Philosophy({ mobile }) {
  const cells = [
  {
    mark: "i.",
    t: "We talk first.",
    d: "Every session begins with a conversation — what hurts, what's heavy, what you'd like to leave behind on the table. We listen before we touch."
  },
  {
    mark: "ii.",
    t: "We tailor as we go.",
    d: "Pressure, pace, focus, modality — all adjustable in the moment. Your only job is to say more, less, or stay right there. The plan is a starting point, not a script."
  },
  {
    mark: "iii.",
    t: "We send you off knowing.",
    d: "Before you leave, we'll share what we noticed and a few small things to carry home — a stretch, a breath, a piece of attention. The work continues quietly between visits."
  }];


  return (
    <section className={`philosophy ${mobile ? "philosophy--mobile" : ""}`} id="learn">
      <div className="philosophy__head">
        <span className="philosophy__kicker">How we work</span>
        <h2>A conversation in <em>three movements</em></h2>
      </div>
      <div className="philosophy__grid">
        {cells.map((c, i) =>
        <div key={i} className="phil-cell">
            <span className="phil-cell__mark">{c.mark}</span>
            <h3>{c.t}</h3>
            <p>{c.d}</p>
          </div>
        )}
      </div>
      <p className="philosophy__pull">
        Discussion, collaboration, consent, discovery
      </p>
    </section>);

}

// ---------- Flow (the shape of a session) ----------
function Flow({ mobile }) {
  const steps = [
  { t: "Arrive", d: "Warm room, dim light, a brief check-in. We hear how your body is showing up today.", min: "0 min" },
  { t: "Read", d: "Hands listen first. Your therapist finds where you're holding before deciding what to bring.", min: "5 min" },
  { t: "Adapt", d: "Swedish flow, deep pressure, sport work, hot stones — modalities blend in real time, shaped to what the day asks for.", min: "10–75 min" },
  { t: "Integrate", d: "A few unhurried minutes to settle, then notes and a small thing or two to carry home.", min: "75–90 min" }];


  return (
    <section className={`flow ${mobile ? "flow--mobile" : ""}`}>
      <div className="flow__head">
        <span className="flow__kicker">The shape of a session</span>
        <h2>Every Style , Any Way —<br /><em>every session is therapeutic.</em></h2>
        <p className="flow__lede">
          We don't ask you to pick a modality off a menu. Whether the day calls for long Swedish strokes, deep sport work, warm stones, or all three braided together, the session is built around what your body needs that morning.
        </p>
      </div>
      <div className="flow__rail">
        <div className="flow__line" />
        {steps.map((s, i) =>
        <div key={i} className="flow-step" style={{ animationDelay: `${0.1 * i}s` }}>
            <div className="flow-step__dot"><span /></div>
            <div className="flow-step__min">{s.min}</div>
            <h4>{s.t}</h4>
            <p>{s.d}</p>
          </div>
        )}
      </div>
      <p className="flow__pull">
        Tailored, in the moment, to the person on the table that day.
      </p>
    </section>);

}

// ---------- Meet the Therapists ----------
const THERAPISTS = [
{
  name: "Jamie Taylor",
  role: "Lead LMBT",
  bio: "“I grew up with a mother who suffered from severe migraines. Every night as a little one, I'd massage her head and neck and salve her sores. Healing by touch came natural to me. Fast forwarding to when I was 18 years old, I decided to get married and went to massage school to start a career. It began as a means to an end: keep us afloat. I got my massage bodywork therapy license and started practicing professionally in 1999 at hotels and various spas, and my new income allowed my husband and I to pay for college.\n\nTo be honest, my plan was to move on from massage after college to get into social work or teaching, but in 2005 I began practicing massage therapy on my own. While pursuing this industry, I became a mother to two beautiful, empathetic children, now supporting them through my work. I continued until 2019 when I decided to put rubber to the road to grow my small business. I rebranded as Taylored Body Healing — which has now joined the team at Areté — all in stride and renewing my passion to help you collect your calm.”",
  credentials: "LMBT #5002 · NC Licensed · Practicing since 1999",
  specialties: ["Therapeutic massage", "Pain relief", "Recovery"],
  photo: "assets/team/Jamie_painting.png",
  bookingUrl: "https://aretefloattank.floathelm.com/booking"
},
{
  name: "Eileen Sullivan",
  role: "Massage Therapist",
  bio: "Eileen is a trusted licensed massage therapist who works with clients of all ages dealing with chronic tension, stress, and injuries. Most of her work centers on pain relief, but her intention is to assist in healing the body and calming the mind. She recently moved to the Triangle from Massachusetts to be closer to family, after running her own therapeutic massage practice for 20 years.",
  credentials: "LMBT #19391 · NC Licensed · 20+ years practicing",
  specialties: ["Chronic tension", "Stress relief", "Injury recovery"],
  photo: "assets/team/Eileen_painting.png",
  bookingUrl: "https://aretefloattank.floathelm.com/booking"
}];


function TherapistCard({ p }) {
  return (
    <article className="therapist-card">
      <div className="therapist-card__photo">
        {p.photo ?
        <img src={p.photo} alt={`Portrait of ${p.name}`} /> :
        <span>portrait<br />3:4</span>}
      </div>
      <div className="therapist-card__body">
        <h3 className="therapist-card__name">{p.name}</h3>
        <span className="therapist-card__role">{p.role}</span>
        <p className="therapist-card__bio">{p.bio}</p>
        {p.specialties && p.specialties.length > 0 &&
        <ul className="therapist-card__tags">
            {p.specialties.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        }
        {p.credentials && <div className="therapist-card__creds">{p.credentials}</div>}
        {p.bookingUrl &&
        <a
          className="therapist-card__book"
          href={p.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Book an appointment with ${p.name}`}>
            Book with {p.name.split(" ")[0]} <IconArrow size={12} />
          </a>
        }
      </div>
    </article>);

}

function Therapists({ mobile }) {
  return (
    <section className={`therapists ${mobile ? "therapists--mobile" : ""}`} id="therapists">
      <div className="therapists__head">
        <span className="therapists__kicker">Meet the therapists</span>
        <h2>The hands you'll be <em>in.</em></h2>
        <p className="therapists__lede">
          Two licensed therapists, decades of practice between them. Different backgrounds, different signatures — same care for the person on the table.
        </p>
      </div>
      <div className="therapists__grid">
        {THERAPISTS.map((p, i) => <TherapistCard key={i} p={p} />)}
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

function Deepen({ mobile }) {
  const [tab, setTab] = useState(1);
  const tabs = ["What to expect", "The science", "Who it's for"];
  const bodies = [
  "You'll arrive a few minutes early, fill out a brief intake, and meet your therapist. We'll talk through what's going on — recent injuries, sticky spots, how much pressure feels right. Then you'll undress to your comfort, settle face-down on a warmed table under linens, and the session begins. Communication continues throughout — you can ask for more, less, or different at any moment. Afterward, water, a few notes, and the rest of your day a little softer.",
  "Therapeutic massage measurably lowers cortisol, raises serotonin and dopamine, and shifts the autonomic nervous system toward parasympathetic dominance. Sustained pressure on connective tissue improves local circulation, reduces inflammatory markers, and downregulates pain signaling at the spinal level. For chronic tension, regular sessions are more effective than occasional deep work — the nervous system learns the pattern of release. For acute injury, manual therapy paired with movement consistently outperforms passive rest in recovery time and range-of-motion outcomes.",
  "Anyone who lives in a body. The most common reasons people come to us: chronic neck and shoulder tension from screens, low-back pain from sitting or lifting, athletes between training blocks, expectant parents, post-surgical recovery (with clearance), and the simply overworked. If you're unsure whether massage is right for your situation, we'll talk it through before booking — and decline gracefully if it isn't."];

  const faqs = [
  { q: "How do I choose a modality?", a: "You don't have to. Tell us what's going on — pain, stress, recovery, all three — and we'll recommend a starting point and blend as we go. Most sessions touch two or three modalities." },
  { q: "What should I wear?", a: "Whatever you'd like. Most guests undress to their comfort level under the linens; some prefer to stay in shorts or a sports bra. The therapist only ever uncovers the area being worked on." },
  { q: "How much pressure is too much?", a: "Pressure should feel intense but not bracing — if you're holding your breath or clenching, it's too much. Tell your therapist; they'll adjust immediately. There's no prize for white-knuckling it." },
  { q: "Can I get a massage if I'm pregnant?", a: "Yes — our prenatal sessions are cleared for second and third trimesters, on a side-lying support system designed for it. Please mention your due date when booking." },
  { q: "How often should I come in?", a: "For chronic tension or recovery work, every two to four weeks builds real change. For maintenance and stress, monthly is the sweet spot. We'll talk through what makes sense for your goals." },
  { q: "Should I tip?", a: "Tipping is welcome but never expected. Members and package holders often skip the tip and the therapists are paid the same either way." }];

  return (
    <section className={`deepen ${mobile ? "deepen--mobile" : ""}`}>
      <div className="deepen__head">
        <span className="deepen__kicker">Go as deep as you like</span>
        <h2>LeaRN more, when you're ready</h2>
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
  { name: "60 Min\n\n", price: "125", note: "Targeted reset · Most asked-for", highlight: true, link: BOOK.massage60 },
  { name: "90 Min\n\n", price: "150", note: "Full body, unhurried", link: BOOK.massage90 },
  { name: "Couples\n", price: "—", note: "Two tables, two therapists, one room", link: BOOK.general },
  { name: "Packages\n", price: "\n", note: "\n\n\n\n\nMonthly memberships & multi-session packs", link: BOOK.general }];

  return (
    <section className={`pricing ${mobile ? "pricing--mobile" : ""}`}>
      <div className="pricing__head">
        <span className="pricing__kicker">Simple, unhurried</span>
        <h2>Choose your entry</h2>
      </div>
      <div className="pricing__grid">
        {plans.map((p, i) =>
        <div key={i} className={`plan ${p.highlight ? "plan--on" : ""}`} style={{ height: "355px" }}>
            <span className="plan__badge" style={{ visibility: p.highlight ? "visible" : "hidden" }}>Most asked-for</span>
            <h3>{p.name}</h3>
            <div className="plan__price" style={{ fontFamily: "LeJour" }}>{p.price}</div>
            <p style={{ height: "30px", padding: "0px", margin: "40px 0px 45px" }}>{p.note}</p>
            <a href={p.link || BOOK.general} target="_blank" rel="noopener" className="plan__link">Reserve <IconArrow size={12} /></a>
          </div>
        )}
      </div>
    </section>);
}

// ---------- Quote ----------
function Quote() {
  return (
    <section className="quote">
      <div className="quote__mark">"</div>
      <p>I came in carrying a year of desk hours and left feeling like someone had quietly put my shoulders back where they belong. I'm rebooking before I leave, every time.</p>
      <div className="quote__who">— Priya S. · Member since 2023</div>
    </section>);
}

// ---------- Final CTA ----------
function FinalCTA({ mobile }) {
  return (
    <section className={`final ${mobile ? "final--mobile" : ""}`}>
      <div className="final__orb" />
      <h2>Care is a practice.<br /><em>Begin this week.</em></h2>
      <a href={BOOK.massage60} target="_blank" rel="noopener" className="btn btn--primary btn--lg">
        <span>Reserve your session</span>
        <IconArrow />
      </a>
      <div className="final__meta">
        213 E Braxton Foushee St · Carrboro, NC · 919-636-9899
      </div>
    </section>);
}

// ---------- Sticky bar ----------
function StickyBar() {
  return (
    <div className="stickybar">
      <div>
        <span className="stickybar__from">from</span>
        <span className="stickybar__price">$125</span>
      </div>
      <a href={BOOK.massage60} target="_blank" rel="noopener" className="btn btn--primary btn--sm">
        Reserve <IconArrow size={12} />
      </a>
    </div>);
}

// ---------- Page ----------
function ServicePage({ mobile, copy }) {
  return (
    <div className={`page ${mobile ? "page--mobile" : "page--desktop"}`}>
      <div className="grain" />
      <TopNav mobile={mobile} />
      <Hero mobile={mobile} copy={copy} />
      <Benefits mobile={mobile} copy={copy} />
      <Philosophy mobile={mobile} />
      <Flow mobile={mobile} />
      <Therapists mobile={mobile} />
      <Deepen mobile={mobile} />
      <Pricing mobile={mobile} />
      <Quote />
      <FinalCTA mobile={mobile} />
      {mobile && <StickyBar />}
    </div>);
}

// ---------- Tweaks ----------
const MASSAGE_DEFAULTS = /*EDITMODE-BEGIN*/{
  "candle": "#7C6B8A",
  "displayFont": "LeJour",
  "heroTone": "warm",
  "showWhimsy": true
} /*EDITMODE-END*/;

const MASSAGE_TONES = {
  poetic: {
    heroTitle: "Hands that\nlisten.",
    heroLede: "A conversation in pressure and breath. Skilled hands meet what the body has been carrying — and slowly, kindly, ask it to let go.",
    benefits: [
    { t: "Untie the knots", d: "Sustained, specific work where pain has set up camp." },
    { t: "Quiet the system", d: "Cortisol drops, breath deepens, the day's noise softens." },
    { t: "Come home to yourself", d: "Whole-body restoration that lingers for days." }]
  },
  practical: {
    heroTitle: "60 or 90.\nTailored to you.",
    heroLede: "Licensed therapists, 40+ years combined experience. Pressure, modality, and focus calibrated to what your body actually needs that day.",
    benefits: [
    { t: "Reduce chronic pain", d: "Manual therapy measurably lowers pain markers and improves range of motion." },
    { t: "Lower stress hormones", d: "Cortisol drops and serotonin rises within a single session." },
    { t: "Recover faster", d: "Soft-tissue work between training days speeds tissue repair." }]
  },
  warm: {
    heroTitle: "Slow hands.\nLong exhale.",
    heroLede: "Tell us what hurts and what's heavy. We'll meet you there — pressure, pace, and focus shaped to the person on the table that day.",
    benefits: [
    { t: "Ease where it aches", d: "Specific, patient work on the spots that have been calling for weeks." },
    { t: "Let the day go", d: "A full hour where nothing is asked of you. Most folks fall a little bit asleep." },
    { t: "Feel like yourself again", d: "You leave looser, lighter, and recognizably you." }]
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

  const [t, setTweak] = useTweaks(MASSAGE_DEFAULTS);
  const copy = MASSAGE_TONES[t.heroTone] || MASSAGE_TONES.warm;

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
      <ServicePage mobile={isMobile} copy={copy} />
    </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);