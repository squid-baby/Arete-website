/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Booking links (FloatHelm direct service links) ----------
const BOOK = {
  general: "https://aretefloattank.floathelm.com/booking",
  comboBundle: "https://aretefloattank.floathelm.com/store/services/1234610",
  separateStack: "https://aretefloattank.floathelm.com/store/services/1211368",
  redLight: "https://aretefloattank.floathelm.com/store/services/1211439",
  sauna30: "https://aretefloattank.floathelm.com/store/services/1202786"
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

// ---------- Hero video placeholder (mirrors IceCube pattern) ----------
// Looks for assets/red-light.mp4. Shows a placeholder card if not present yet
// so the page doesn't break before the video is recorded.
function RedLightVideo({ playing, intensity = 0.7 }) {
  const videoRef = React.useRef(null);
  const [blobUrl, setBlobUrl] = React.useState(null);
  const [missing, setMissing] = React.useState(false);

  React.useEffect(() => {
    let revoke = null;
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("assets/red-light.mp4");
        if (!r.ok) { if (!cancelled) setMissing(true); return; }
        const blob = await r.blob();
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        revoke = url;
        setBlobUrl(url);
      } catch (_) {
        if (!cancelled) setMissing(true);
      }
    })();
    return () => {
      cancelled = true;
      if (revoke) URL.revokeObjectURL(revoke);
    };
  }, []);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v || !blobUrl) return;
    if (playing) {
      try { v.currentTime = 0; } catch (_) {}
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      v.pause();
      try { v.currentTime = 0; } catch (_) {}
    }
  }, [playing, blobUrl]);

  // Glow intensity tied to tweak
  const glowAlpha = 0.18 + intensity * 0.45;
  const ringAlpha = 0.10 + intensity * 0.35;

  return (
    <div className="ba__frame" style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      background: `radial-gradient(circle at 50% 50%, rgba(196,80,90,${glowAlpha}) 0%, rgba(196,168,224,0.08) 40%, rgba(13,27,62,0.04) 100%)`,
      overflow: "hidden", position: "relative", borderRadius: "12px"
    }}>
      {/* Animated wavelength rings — visible whether or not the mp4 loads */}
      <RLRings playing={playing} intensity={intensity} alpha={ringAlpha} />

      {blobUrl && !missing &&
        <video
          ref={videoRef}
          src={blobUrl}
          muted
          playsInline
          preload="auto"
          style={{
            maxWidth: "100%", maxHeight: "100%", objectFit: "contain",
            position: "relative", zIndex: 2
          }}
        />
      }

      {(!blobUrl || missing) &&
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "14px",
          padding: "32px",
          color: "rgba(13,27,62,0.55)",
          fontFamily: "'GT America Mono','IBM Plex Mono',ui-monospace,monospace",
          fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase",
          textAlign: "center"
        }}>
          <RLPanelGlyph intensity={intensity} />
          <div>video placeholder</div>
          <div style={{ fontSize: "10px", opacity: 0.7, textTransform: "none", letterSpacing: "0.04em", maxWidth: "220px", lineHeight: 1.5 }}>
            drop <code>assets/red-light.mp4</code> in — same handling as the contrast page
          </div>
        </div>
      }
    </div>
  );
}

// Decorative SVG of a red light panel — used as the placeholder while no mp4
function RLPanelGlyph({ intensity }) {
  const dots = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 7; c++) {
      const x = 18 + c * 14;
      const y = 18 + r * 14;
      const delay = (r + c) * 0.12;
      dots.push(
        <circle key={`${r}-${c}`} cx={x} cy={y} r="3.2" fill="rgb(196,80,90)" opacity={0.55 + intensity * 0.4}>
          <animate attributeName="opacity"
            values={`${0.35 + intensity * 0.25};${0.85 + intensity * 0.15};${0.35 + intensity * 0.25}`}
            dur="2.6s" begin={`${delay}s`} repeatCount="indefinite" />
        </circle>
      );
    }
  }
  return (
    <svg width="120" height="86" viewBox="0 0 120 86" aria-hidden="true">
      <rect x="2" y="2" width="116" height="82" rx="6" fill="none" stroke="rgba(13,27,62,0.18)" strokeWidth="1" />
      {dots}
    </svg>
  );
}

// Animated wavelength rings (hero ambience). Intensity controls amplitude.
function RLRings({ playing, intensity, alpha }) {
  const rings = [
    { r0: 60, dur: 4.0, delay: 0 },
    { r0: 60, dur: 4.0, delay: 1.0 },
    { r0: 60, dur: 4.0, delay: 2.0 },
    { r0: 60, dur: 4.0, delay: 3.0 }
  ];
  const max = 90 + intensity * 110;
  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="rl-ring-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(196,80,90,0.0)" />
          <stop offset="60%" stopColor={`rgba(196,80,90,${alpha})`} />
          <stop offset="100%" stopColor="rgba(196,80,90,0.0)" />
        </radialGradient>
      </defs>
      {rings.map((ring, i) => (
        <circle
          key={i}
          cx="100"
          cy="100"
          r={ring.r0}
          fill="none"
          stroke="url(#rl-ring-grad)"
          strokeWidth="1.2"
        >
          <animate
            attributeName="r"
            values={`${ring.r0};${max}`}
            dur={`${ring.dur}s`}
            begin={`${ring.delay}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values={`${0.05 + intensity * 0.4};0`}
            dur={`${ring.dur}s`}
            begin={`${ring.delay}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  );
}

// ---------- Hero ----------
function Hero({ mobile, copy, intensity }) {
  const [playing, setPlaying] = useState(false);
  return (
    <section className={`hero ${mobile ? "hero--mobile" : ""}`} style={{ opacity: "5" }}>
      <div className="hero__text">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span>Red Light Therapy · 20 min</span>
        </div>
        <h1 className="hero__title">
          {copy.heroTitle.split("\n").map((line, i) =>
          <span key={i} className="hero__line" style={{ animationDelay: `${0.15 * i}s`, color: "rgb(13, 27, 62)" }}>{line}</span>
          )}
        </h1>
        <p className="hero__lede">{copy.heroLede}</p>

        <div className="hero__cta-row">
          <a href={BOOK.comboBundle} target="_blank" rel="noopener" className="btn btn--primary">
            <span>BOOK SAUNA + RED LIGHT</span>
            <IconArrow />
          </a>
          <a href="#solo" className="btn btn--ghost">Just red light, please</a>
        </div>

        <div className="hero__meta">
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <IconStar /> <strong style={{ fontWeight: 500 }}>9 of 10 guests</strong> bundle red light with a sauna session
          </span>
        </div>
      </div>

      {!mobile &&
      <div className="hero__visual">
        <div className={`ba ${playing ? "ba--float" : "ba--stress"}`}>
          <RedLightVideo playing={playing} intensity={intensity} />
          <div className="ba__caption">
            <span className="ba__caption-label">{playing ? "Light on" : "Light off"}</span>
            <span className="ba__caption-text" style={{ color: "rgb(74, 91, 160)", textAlign: "right", width: "210px", whiteSpace: "pre-line" }}>
              {playing ? "660 + 850 nm\nbathing every cell\nin photons" : "Quiet panel\nwarm bench\nready"}
            </span>
          </div>
        </div>
        <div className="hero__toggle">
          <button
            className={`toggle__pill ${!playing ? "is-on" : ""}`}
            onClick={() => setPlaying(false)}>
            Off</button>
          <button
            className={`toggle__pill ${playing ? "is-on" : ""}`}
            onClick={() => setPlaying(true)} style={{ color: "rgb(196, 168, 224)" }}>
            Switch on the panel</button>
        </div>
      </div>
      }
    </section>);
}

// ---------- Bundle Spotlight (sauna + red light) ----------
function BundleSpotlight({ mobile }) {
  return (
    <section className={`bundle ${mobile ? "bundle--mobile" : ""}`} id="bundle">
      <div className="bundle__inner">
        <div className="bundle__head">
          <span className="bundle__kicker">The pairing · most-booked combination</span>
          <h2>Sauna, then <em>red light</em>.</h2>
          <p className="bundle__lede">
            Heat opens the tissue. Red light feeds it photons while it's still relaxed and well-perfused.
            The two stack so well that most of our regulars never book one without the other.
          </p>
        </div>

        <div className="bundle__flow" aria-hidden="true">
          <div className="bundle__step">
            <span className="bundle__step-num">01</span>
            <span className="bundle__step-time">30 min</span>
            <h3>Infrared sauna</h3>
            <p>Core temperature rises. Vessels dilate. Muscles soften.</p>
          </div>
          <div className="bundle__arrow">
            <svg width="56" height="24" viewBox="0 0 56 24" fill="none">
              <path d="M2 12h50M44 4l8 8-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="bundle__step bundle__step--accent">
            <span className="bundle__step-num">02</span>
            <span className="bundle__step-time">20 min</span>
            <h3>Red light panel</h3>
            <p>660 + 850 nm reach deeper into warm, open tissue. Recovery accelerates.</p>
          </div>
        </div>

        <div className="bundle__cta">
          <div className="bundle__price">
            <span className="bundle__price-from">Bundle</span>
            <span className="bundle__price-num"><span className="bundle__price-dollar">$</span>60</span>
            <span className="bundle__price-strike">
              <span style={{ textDecoration: "line-through", opacity: 0.5 }}>$75</span> separately
            </span>
          </div>
          <a href={BOOK.comboBundle} target="_blank" rel="noopener" className="btn btn--primary btn--lg">
            <span>Book the bundle</span>
            <IconArrow />
          </a>
          <a href="#solo" className="bundle__solo">
            Or feel red light on its own &rarr;
          </a>
        </div>
      </div>
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

// ---------- Wavelengths explainer (replaces Timeline) ----------
// A skin/tissue cross-section showing 660nm red light at the dermis and
// 850nm NIR penetrating to muscle. Hover/tap a band to read its job.
function Wavelengths({ mobile, intensity }) {
  const [active, setActive] = useState(0);

  const bands = [
    {
      id: 0,
      nm: "660 nm",
      label: "Visible red",
      depth: "≈ 1–2 mm",
      target: "Epidermis & papillary dermis",
      job: "Wakes up mitochondria in skin cells. Drives collagen and elastin synthesis, smooths fine lines, and accelerates wound closure.",
      color: "rgb(206, 68, 78)"
    },
    {
      id: 1,
      nm: "850 nm",
      label: "Near-infrared",
      depth: "≈ 30–40 mm",
      target: "Reticular dermis · muscle · joint",
      job: "Slips past the skin to reach muscle, fascia, and joint capsule. Reduces inflammation, speeds repair, and eases deep, nagging tension.",
      color: "rgb(140, 56, 90)"
    }
  ];

  const sel = bands[active];
  const glow = 0.45 + intensity * 0.45;

  return (
    <section className={`timeline ${mobile ? "timeline--mobile" : ""}`} id="learn">
      <div className="timeline__head">
        <span className="timeline__kicker">Two wavelengths · one panel</span>
        <h2>What the light is doing</h2>
      </div>

      <div className="rl-wave">
        <div className="rl-wave__diagram" role="img" aria-label="Skin cross-section showing red and near-infrared wavelength penetration">
          <svg viewBox="0 0 600 280" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <linearGradient id="rl-skin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(244,221,217,0.95)" />
                <stop offset="35%" stopColor="rgba(229,196,191,0.9)" />
                <stop offset="70%" stopColor="rgba(195,160,162,0.85)" />
                <stop offset="100%" stopColor="rgba(140,108,124,0.85)" />
              </linearGradient>
              <linearGradient id="rl-660" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`rgba(206,68,78,${0.0})`} />
                <stop offset="40%" stopColor={`rgba(206,68,78,${glow})`} />
                <stop offset="100%" stopColor={`rgba(206,68,78,0)`} />
              </linearGradient>
              <linearGradient id="rl-850" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`rgba(140,56,90,${0.0})`} />
                <stop offset="50%" stopColor={`rgba(140,56,90,${glow * 0.85})`} />
                <stop offset="100%" stopColor={`rgba(140,56,90,0)`} />
              </linearGradient>
            </defs>

            {/* Tissue layers */}
            <rect x="40" y="20" width="520" height="240" rx="8" fill="url(#rl-skin)" />

            {/* Layer separators */}
            <line x1="40" y1="68" x2="560" y2="68" stroke="rgba(13,27,62,0.18)" strokeDasharray="3 4" strokeWidth="0.7" />
            <line x1="40" y1="120" x2="560" y2="120" stroke="rgba(13,27,62,0.18)" strokeDasharray="3 4" strokeWidth="0.7" />
            <line x1="40" y1="200" x2="560" y2="200" stroke="rgba(13,27,62,0.18)" strokeDasharray="3 4" strokeWidth="0.7" />

            {/* Layer labels */}
            <g fontFamily="'GT America Mono','IBM Plex Mono',ui-monospace,monospace" fontSize="9" fill="rgba(13,27,62,0.55)" letterSpacing="0.08em">
              <text x="50" y="40">EPIDERMIS</text>
              <text x="50" y="92">DERMIS</text>
              <text x="50" y="160">SUBCUTIS</text>
              <text x="50" y="226">MUSCLE · FASCIA</text>
            </g>

            {/* 660nm beam — shallow */}
            <g style={{ opacity: active === 0 ? 1 : 0.35, transition: "opacity .4s" }}>
              <rect x="180" y="20" width="80" height="100" fill="url(#rl-660)" />
              <line x1="180" y1="20" x2="180" y2="120" stroke="rgba(206,68,78,0.5)" strokeWidth="0.6" strokeDasharray="2 3" />
              <line x1="260" y1="20" x2="260" y2="120" stroke="rgba(206,68,78,0.5)" strokeWidth="0.6" strokeDasharray="2 3" />
              <text x="220" y="14" textAnchor="middle" fontFamily="'GT America Mono',monospace" fontSize="10" fill="rgb(206,68,78)" fontWeight="600">660 nm</text>
            </g>

            {/* 850nm beam — deep */}
            <g style={{ opacity: active === 1 ? 1 : 0.35, transition: "opacity .4s" }}>
              <rect x="340" y="20" width="80" height="220" fill="url(#rl-850)" />
              <line x1="340" y1="20" x2="340" y2="240" stroke="rgba(140,56,90,0.5)" strokeWidth="0.6" strokeDasharray="2 3" />
              <line x1="420" y1="20" x2="420" y2="240" stroke="rgba(140,56,90,0.5)" strokeWidth="0.6" strokeDasharray="2 3" />
              <text x="380" y="14" textAnchor="middle" fontFamily="'GT America Mono',monospace" fontSize="10" fill="rgb(140,56,90)" fontWeight="600">850 nm</text>
            </g>

            {/* Photons traveling — animated dots */}
            {[0,1,2,3].map(i => (
              <circle key={`r-${i}`} cx={220} cy={20} r="2" fill="rgb(206,68,78)" opacity={active === 0 ? 0.9 : 0.3}>
                <animate attributeName="cy" values="20;120" dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values={`${active === 0 ? 0.9 : 0.3};0`} dur="1.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ))}
            {[0,1,2,3,4].map(i => (
              <circle key={`n-${i}`} cx={380} cy={20} r="2" fill="rgb(140,56,90)" opacity={active === 1 ? 0.9 : 0.3}>
                <animate attributeName="cy" values="20;240" dur="2.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values={`${active === 1 ? 0.9 : 0.3};0`} dur="2.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </svg>
        </div>

        <div className="rl-wave__cards">
          {bands.map(b => (
            <button
              key={b.id}
              className={`rl-band ${active === b.id ? "is-on" : ""}`}
              onClick={() => setActive(b.id)}
              onMouseEnter={() => setActive(b.id)}
              style={{ "--band-color": b.color }}
            >
              <div className="rl-band__head">
                <span className="rl-band__nm">{b.nm}</span>
                <span className="rl-band__label">{b.label}</span>
              </div>
              <div className="rl-band__meta">
                <span>{b.depth}</span>
                <span className="rl-band__dot">·</span>
                <span>{b.target}</span>
              </div>
              <p className="rl-band__job">{b.job}</p>
            </button>
          ))}
        </div>
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

// ---------- Deepen ----------
function Deepen({ mobile, showScience }) {
  const [tab, setTab] = useState(1);
  const baseTabs = ["How it works", "The science", "What to expect"];
  // If science is hidden, drop it from the tab list and reset selection.
  const tabs = showScience ? baseTabs : baseTabs.filter((_, i) => i !== 1);
  useEffect(() => {
    if (!showScience && tab === 1) setTab(0);
  }, [showScience]);

  const bodies = {
    "How it works": (
      <>
        <p>Twenty minutes on a heated bench, eight inches from a full-body LED panel. Two wavelengths — 660 nm visible red and 850 nm near-infrared — bathe the skin and tissue beneath. Eyes covered, phone away, music optional. The light is warm but doesn't burn, never heats the room, and leaves no residue. You shower if you want, dress, and walk back into the day.</p>
      </>
    ),
    "The science": (
      <>
        <p>Photobiomodulation (PBM) — formerly low-level laser therapy — works at the mitochondrial scale. Photons in the 600–900 nm window are absorbed by <em>cytochrome c oxidase</em>, a key enzyme in the electron transport chain. The result is a measurable bump in ATP synthesis, a brief, beneficial spike in reactive oxygen species that triggers downstream repair signaling, and a release of nitric oxide that improves local blood flow.</p>
        <p style={{ marginTop: "14px" }}>Different wavelengths reach different depths. <strong>660 nm</strong> is absorbed primarily in the epidermis and papillary dermis — the territory where collagen and elastin are made. <strong>850 nm</strong> passes through skin with minimal scatter and is absorbed in muscle, fascia, and joint capsule, which is why it's the wavelength studied for recovery, deep pain, and tendon repair. Together they cover the full clinical envelope.</p>
        <p style={{ marginTop: "14px" }}>The literature is unusually consistent for a non-pharmaceutical modality — clinical reviews report accelerated wound healing<sup>1</sup>, measurable reduction in fine lines and improved skin texture<sup>2</sup>, faster muscle recovery and reduced DOMS, and reduced inflammatory markers across joint and tendon studies. Effects are dose-dependent: too little does nothing, and there's a biphasic curve where too much can blunt the benefit. Our protocol — twenty minutes, panel at hand-distance, three to five sessions a week — sits inside the well-studied window.</p>
        <p className="rl-cite">
          <span><sup>1</sup> Avci et al., <em>Seminars in Cutaneous Medicine and Surgery</em>, 2013.</span>
          <span><sup>2</sup> Wunsch & Matuschka, <em>Photomedicine and Laser Surgery</em>, 2014.</span>
        </p>
      </>
    ),
    "What to expect": (
      <>
        <p>The first session is quieter than you'd think. The light is bright but warm — most people close their eyes and breathe. You may feel a gentle warmth on the skin, nothing more. Effects are cumulative: skin texture shifts over weeks, recovery times shorten across training cycles, and stubborn aches generally quiet down by session four to six. There's no downtime, no irritation, and you can pair it with sauna, float, or massage on the same visit.</p>
      </>
    )
  };

  const faqs = [
  { q: "Is it safe for my eyes?", a: "Yes — we provide opaque goggles for every session. The wavelengths we use don't carry the UV that damages skin or eyes, but bright light directly in the eyes is uncomfortable, so we cover them." },
  { q: "How often should I come?", a: "For skin and recovery, three to five sessions a week for the first month produces the most noticeable shift. After that, two to three a week maintains the gains comfortably." },
  { q: "Will I feel anything in one session?", a: "Some people feel looser muscles or warmer skin the same day. Most of the benefits — collagen turnover, faster recovery — show up after a handful of sessions, the way the gym does." },
  { q: "Can I combine it with sauna or float?", a: "Absolutely, and many regulars do. A common pairing is sauna → red light → cold plunge, or red light immediately before a massage. Ask the front desk to stack them on one visit." },
  { q: "Are there reasons to skip a session?", a: "Active skin cancers, photosensitizing medications (some antibiotics, retinoids, certain antidepressants), recent injectables, and pregnancy are reasons to check with your doctor first. Otherwise, it's well-tolerated across ages and skin types." }];

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
        {bodies[tabs[tab]]}
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
  const bundlePlans = [
  { name: "Sauna + Red Light\n\n", price: "60", note: "30 min sauna · 20 min red light", highlight: true, badge: "Most booked", link: BOOK.comboBundle },
  { name: "Sauna + RL · 5-Pack\n\n", price: "265", note: "$53 / visit · best value", link: BOOK.general }];

  const soloPlans = [
  { name: "First Light\n\n", price: "35", note: "Red light intro · 20 min · first visit", link: BOOK.redLight },
  { name: "Single — Red Light\n\n", price: "45", note: "À la carte · 20 min, just the panel", link: BOOK.redLight },
  { name: "Red Light · 5-Pack\n\n", price: "189", note: "$38 / session · solo red light", link: BOOK.general },
  { name: "Memberships\n", price: "\n", note: "\n\n\n\n\nMany Packages Available", link: "https://aretefloattank.floathelm.com/store/memberships/1205640" }];

  return (
    <section className={`pricing ${mobile ? "pricing--mobile" : ""}`}>
      <div className="pricing__head">
        <span className="pricing__kicker">Bundles · the way most people book</span>
        <h2>Sauna + Red Light <em>together</em></h2>
      </div>
      <div className="pricing__grid pricing__grid--bundles">
        {bundlePlans.map((p, i) =>
        <div key={i} className={`plan plan--bundle ${p.highlight ? "plan--on" : ""}`} style={{ height: "355px" }}>
            <span className="plan__badge" style={{ visibility: p.badge ? "visible" : "hidden" }}>{p.badge || "·"}</span>
            <h3>{p.name}</h3>
            <div className="plan__price" style={{ fontFamily: "LeJour" }}>{p.price}</div>
            <p style={{ height: "30px", padding: "0px", margin: "40px 0px 45px" }}>{p.note}</p>
            <a href={p.link || BOOK.general} target="_blank" rel="noopener" className="plan__link">Book the bundle <IconArrow size={12} /></a>
          </div>
        )}
      </div>

      <div className="pricing__divider" id="solo">
        <span className="pricing__divider-line" />
        <span className="pricing__divider-label">Just red light, on its own</span>
        <span className="pricing__divider-line" />
      </div>
      <p className="pricing__solo-note">
        We love when people try red light by itself first — it's the cleanest way to feel what the panel
        actually does to your body. Once you know that signal, the bundle makes even more sense.
      </p>

      <div className="pricing__grid pricing__grid--solo">
        {soloPlans.map((p, i) =>
        <div key={i} className="plan plan--solo" style={{ height: "355px" }}>
            <span className="plan__badge" style={{ visibility: "hidden" }}>·</span>
            <h3>{p.name}</h3>
            <div className="plan__price" style={{ fontFamily: "LeJour" }}>{p.price}</div>
            <p style={{ height: "30px", padding: "0px", margin: "40px 0px 45px" }}>{p.note}</p>
            <a href={p.link || BOOK.general} target="_blank" rel="noopener" className="plan__link">Reserve <IconArrow size={12} /></a>
          </div>
        )}
      </div>

      {/* Add-on callout — sauna primary, others secondary */}
      <div className="rl-addon">
        <div className="rl-addon__mark">+</div>
        <div className="rl-addon__body">
          <span className="rl-addon__kicker">Already booked a sauna?</span>
          <h3>Add 20 minutes of red light to your next sauna visit</h3>
          <p>
            Walk straight from the cedar bench to the panel — warm tissue absorbs more light, and you
            leave with the recovery dose you came for. Bundle rate applies automatically when both are on the same booking.
          </p>
          <div className="rl-addon__links">
            <a href="sauna.html" className="rl-addon__link rl-addon__link--primary">+ Add to a sauna booking <IconArrow size={12} /></a>
            <a href="float.html" className="rl-addon__link">also pairs with float</a>
            <a href="Massage.html" className="rl-addon__link">also pairs with massage</a>
          </div>
        </div>
      </div>
    </section>);
}

// ---------- Quote ----------
function Quote() {
  return (
    <section className="quote">
      <div className="quote__mark">"</div>
      <p>I came in for my shoulder. Six weeks later the shoulder's quiet, my skin looks better than it has in a decade, and I sleep through the night. I keep recommending it and people keep thanking me.</p>
      <div className="quote__who">— Lena P. · Member since 2024</div>
    </section>);
}

// ---------- Final CTA ----------
function FinalCTA({ mobile }) {
  return (
    <section className={`final ${mobile ? "final--mobile" : ""}`}>
      <div className="final__orb" />
      <h2>Light is medicine.<br /><em>Heat makes it land deeper.</em></h2>
      <div className="final__ctas">
        <a href={BOOK.comboBundle} target="_blank" rel="noopener" className="btn btn--primary btn--lg">
          <span>Reserve sauna + red light</span>
          <IconArrow />
        </a>
        <a href="#solo" className="btn btn--ghost">Just red light</a>
      </div>
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
        <span className="stickybar__from">bundle</span>
        <span className="stickybar__price">$60</span>
        <span className="stickybar__from" style={{ marginLeft: 8 }}>sauna + red light</span>
      </div>
      <a href={BOOK.comboBundle} target="_blank" rel="noopener" className="btn btn--primary btn--sm">
        Book <IconArrow size={12} />
      </a>
    </div>);
}

// ---------- Page ----------
function ServicePage({ mobile, copy, showScience, intensity }) {
  return (
    <div className={`page ${mobile ? "page--mobile" : "page--desktop"}`}>
      <div className="grain" />
      <TopNav mobile={mobile} />
      <Hero mobile={mobile} copy={copy} intensity={intensity} />
      <BundleSpotlight mobile={mobile} />
      <Benefits mobile={mobile} copy={copy} />
      <Wavelengths mobile={mobile} intensity={intensity} />
      <Deepen mobile={mobile} showScience={showScience} />
      <Pricing mobile={mobile} />
      <Quote />
      <FinalCTA mobile={mobile} />
      {mobile && <StickyBar />}
    </div>);
}

// ---------- Tweaks ----------
const REDLIGHT_DEFAULTS = /*EDITMODE-BEGIN*/{
  "candle": "#7C6B8A",
  "displayFont": "LeJour",
  "showScience": true,
  "intensity": 0.7
} /*EDITMODE-END*/;

const REDLIGHT_COPY = {
  heroTitle: "Slow medicine\nat the speed\nof light.",
  heroLede: "Twenty minutes under a full-body panel of 660 nm and 850 nm light. Skin softens, muscles loosen, mitochondria wake up. You leave warmer, looser, and quietly rebuilt.",
  benefits: [
    { t: "Skin & collagen", d: "660 nm wavelengths drive collagen and elastin synthesis — finer texture, softened lines, brighter tone." },
    { t: "Muscle recovery", d: "Near-infrared cuts DOMS and shortens recovery between hard sessions. Athletes notice it first." },
    { t: "Tissue repair", d: "Wounds, scars, and stubborn soft-tissue injuries close faster. Inflammation quiets at the cellular level." }
  ]
};

function App() {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener ? mq.addEventListener("change", onChange) : mq.addListener(onChange);
    return () => { mq.removeEventListener ? mq.removeEventListener("change", onChange) : mq.removeListener(onChange); };
  }, []);

  const [t, setTweak] = useTweaks(REDLIGHT_DEFAULTS);
  const intensity = typeof t.intensity === "number" ? t.intensity : 0.7;
  const showScience = t.showScience !== false;

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
      <ServicePage mobile={isMobile} copy={REDLIGHT_COPY} showScience={showScience} intensity={intensity} />
    </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
