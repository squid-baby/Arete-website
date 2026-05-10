/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Booking links (FloatHelm direct service links) ----------
const BOOK = {
  general: "https://aretefloattank.floathelm.com/booking",
  halotherapy: "https://aretefloattank.floathelm.com/store/services/s/48720b9bf28e4b600cfb586409d61609dcbd004c",
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

// ---------- Hero video placeholder ----------
function HaloVideo({ playing, intensity = 0.7 }) {
  const videoRef = React.useRef(null);
  const [blobUrl, setBlobUrl] = React.useState(null);
  const [missing, setMissing] = React.useState(false);

  React.useEffect(() => {
    let revoke = null;
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("assets/halotherapy.mp4");
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

  // Warm pink salt-glow tied to tweak
  const glowAlpha = 0.16 + intensity * 0.42;

  return (
    <div className="ba__frame" style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      background: `radial-gradient(circle at 50% 60%, rgba(232,155,142,${glowAlpha}) 0%, rgba(244,221,217,0.18) 45%, rgba(13,27,62,0.04) 100%)`,
      overflow: "hidden", position: "relative", borderRadius: "12px"
    }}>
      {/* Salt particles drifting — present whether or not the mp4 loads */}
      <SaltParticles playing={playing} intensity={intensity} />

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
          <SaltCaveGlyph intensity={intensity} />
          <div>video placeholder</div>
          <div style={{ fontSize: "10px", opacity: 0.7, textTransform: "none", letterSpacing: "0.04em", maxWidth: "220px", lineHeight: 1.5 }}>
            drop <code>assets/halotherapy.mp4</code> in — same handling as the contrast page
          </div>
        </div>
      }
    </div>
  );
}

// Decorative SVG of a salt-cave wall — placeholder while no mp4
function SaltCaveGlyph({ intensity }) {
  const stones = [];
  // Irregular salt stone wall — varied rectangles with rounded corners
  const rows = [
    [{ w: 28, h: 14 }, { w: 22, h: 14 }, { w: 32, h: 14 }, { w: 24, h: 14 }],
    [{ w: 20, h: 12 }, { w: 30, h: 12 }, { w: 26, h: 12 }, { w: 30, h: 12 }],
    [{ w: 32, h: 16 }, { w: 24, h: 16 }, { w: 28, h: 16 }, { w: 24, h: 16 }]
  ];
  let y = 8;
  rows.forEach((row, ri) => {
    let x = 6;
    row.forEach((s, ci) => {
      const op = 0.4 + intensity * 0.4 + (Math.sin(ri + ci) * 0.05);
      stones.push(
        <rect key={`${ri}-${ci}`} x={x} y={y} width={s.w - 2} height={s.h - 2} rx="2"
          fill="rgb(232,155,142)" opacity={op}>
          <animate attributeName="opacity"
            values={`${op * 0.7};${op};${op * 0.7}`}
            dur={`${3 + ri * 0.4 + ci * 0.2}s`} repeatCount="indefinite" />
        </rect>
      );
      x += s.w;
    });
    y += row[0].h;
  });
  return (
    <svg width="120" height="74" viewBox="0 0 120 74" aria-hidden="true">
      <rect x="2" y="2" width="116" height="70" rx="6" fill="rgba(244,221,217,0.4)" stroke="rgba(13,27,62,0.18)" strokeWidth="1" />
      {stones}
    </svg>
  );
}

// Drifting salt particles. Density tied to intensity tweak.
function SaltParticles({ playing, intensity }) {
  const count = Math.round(20 + intensity * 60);
  const particles = [];
  for (let i = 0; i < count; i++) {
    const cx = (i * 137.5) % 100; // deterministic spread
    const dur = 6 + ((i * 7) % 6);
    const delay = (i * 0.31) % 6;
    const r = 0.6 + ((i * 3) % 5) * 0.18;
    const op = 0.18 + intensity * 0.5;
    const drift = (i % 2 === 0 ? 1 : -1) * (1 + (i % 4));
    particles.push(
      <circle key={i} cx={`${cx}%`} cy="-2%" r={r} fill="rgb(244,221,217)" opacity={op}>
        <animate attributeName="cy" values="-2%;102%" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="cx" values={`${cx}%;${cx + drift}%;${cx}%`} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="opacity" values={`0;${op};${op};0`} dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    );
  }
  return (
    <svg
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}
      aria-hidden="true"
    >
      {particles}
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
          <span>Halotherapy · added to your sauna</span>
        </div>
        <h1 className="hero__title">
          {copy.heroTitle.split("\n").map((line, i) =>
          <span key={i} className="hero__line" style={{ animationDelay: `${0.15 * i}s`, color: "rgb(13, 27, 62)" }}>{line}</span>
          )}
        </h1>
        <p className="hero__lede">{copy.heroLede}</p>

        <div className="hero__cta-row">
          <a href={BOOK.halotherapy} target="_blank" rel="noopener" className="btn btn--primary">
            <span>BOOK HALOTHERAPY</span>
            <IconArrow />
          </a>
          <a href="#learn" className="btn btn--ghost">How it works</a>
        </div>

        <div className="hero__meta">
          <span><IconStar /> +$10 add-on · runs your full sauna</span>
          <span className="hero__meta-dot">·</span>
          <span>Carrboro, NC</span>
        </div>
      </div>

      {!mobile &&
      <div className="hero__visual">
        <div className={`ba ${playing ? "ba--float" : "ba--stress"}`}>
          <HaloVideo playing={playing} intensity={intensity} />
          <div className="ba__caption">
            <span className="ba__caption-label">{playing ? "Halogenerator on" : "Halogenerator off"}</span>
            <span className="ba__caption-text" style={{ color: "rgb(74, 91, 160)", textAlign: "right", width: "210px", whiteSpace: "pre-line" }}>
              {playing ? "Pharmaceutical salt\nmicronized to 1–5 µm\ndrifting through the cabin" : "Cedar walls\nwarm bench\nair still"}
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
            onClick={() => setPlaying(true)} style={{ color: "rgb(232, 155, 142)" }}>
            Switch on the salt</button>
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

// ---------- Salt Benefits Radial (replaces Wavelengths section) ----------
// A four-quadrant compass showing what micronized salt does once it's
// inhaled. Hover/tap a quadrant to read its mechanism.
function SaltRadial({ mobile, intensity }) {
  const [active, setActive] = useState(0);

  const quads = [
    {
      id: 0,
      title: "Antibacterial",
      kicker: "Lowers microbial load",
      job: "Salt is hygroscopic — it pulls water out of bacterial cells on contact, denaturing membranes and lowering colony counts in the airway during exposure.",
      // angle range in degrees (0 = top), color
      a0: -45, a1: 45,
      color: "rgb(232,155,142)"
    },
    {
      id: 1,
      title: "Anti-inflammatory",
      kicker: "Quiets airway tissue",
      job: "Inhaled saline reduces cytokine and neutrophil activity in the bronchial mucosa. Swelling drops, tightness eases, and the airway gets a wider working diameter.",
      a0: 45, a1: 135,
      color: "rgb(199,112,103)"
    },
    {
      id: 2,
      title: "Mucolytic",
      kicker: "Thins & moves mucus",
      job: "Salt particles draw water into thick airway secretions and stimulate ciliary clearance. Stuck mucus loosens and moves — the dry cough that arrives mid-session is the mechanism working.",
      a0: 135, a1: 225,
      color: "rgb(218,168,118)"
    },
    {
      id: 3,
      title: "Antihistamine",
      kicker: "Calms allergic response",
      job: "Hypertonic saline blunts mast-cell degranulation and reduces histamine release in the upper airway — useful for seasonal allergies, post-nasal drip, and chronic rhinitis.",
      a0: 225, a1: 315,
      color: "rgb(180,128,148)"
    }
  ];

  const sel = quads[active];
  const cx = 220, cy = 220, rOuter = 180, rInner = 70;

  // Build SVG arc for a quadrant
  const arcPath = (a0, a1) => {
    const toRad = a => (a - 90) * Math.PI / 180;
    const x0o = cx + rOuter * Math.cos(toRad(a0));
    const y0o = cy + rOuter * Math.sin(toRad(a0));
    const x1o = cx + rOuter * Math.cos(toRad(a1));
    const y1o = cy + rOuter * Math.sin(toRad(a1));
    const x0i = cx + rInner * Math.cos(toRad(a0));
    const y0i = cy + rInner * Math.sin(toRad(a0));
    const x1i = cx + rInner * Math.cos(toRad(a1));
    const y1i = cy + rInner * Math.sin(toRad(a1));
    const large = (a1 - a0) > 180 ? 1 : 0;
    return `M ${x0i} ${y0i} L ${x0o} ${y0o} A ${rOuter} ${rOuter} 0 ${large} 1 ${x1o} ${y1o} L ${x1i} ${y1i} A ${rInner} ${rInner} 0 ${large} 0 ${x0i} ${y0i} Z`;
  };

  // Position label at the midpoint of a quadrant
  const labelPos = (a0, a1, r) => {
    const a = (a0 + a1) / 2;
    const rad = (a - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  return (
    <section className={`timeline ${mobile ? "timeline--mobile" : ""}`} id="learn">
      <div className="timeline__head">
        <span className="timeline__kicker">Four mechanisms · one mineral</span>
        <h2>What the salt is doing</h2>
      </div>

      <div className="ht-radial">
        <div className="ht-radial__diagram" role="img" aria-label="Four-quadrant diagram showing antibacterial, anti-inflammatory, mucolytic, and antihistamine effects of inhaled salt">
          <svg viewBox="0 0 440 440" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <radialGradient id="ht-core" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="60%" stopColor="rgba(244,221,217,0.85)" />
                <stop offset="100%" stopColor="rgba(232,155,142,0.5)" />
              </radialGradient>
            </defs>

            {/* Quadrants */}
            {quads.map(q => {
              const isActive = active === q.id;
              return (
                <g key={q.id} style={{ cursor: "pointer", transition: "opacity .35s" }}
                   onMouseEnter={() => setActive(q.id)}
                   onClick={() => setActive(q.id)}>
                  <path
                    d={arcPath(q.a0, q.a1)}
                    fill={q.color}
                    opacity={isActive ? (0.85 + intensity * 0.15) : (0.32 + intensity * 0.12)}
                    style={{ transition: "opacity .35s" }}
                  />
                  <path
                    d={arcPath(q.a0 + 1.5, q.a1 - 1.5)}
                    fill="none"
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth="0.6"
                  />
                  {/* Quadrant label */}
                  {(() => {
                    const p = labelPos(q.a0, q.a1, (rOuter + rInner) / 2);
                    return (
                      <g pointerEvents="none">
                        <text x={p.x} y={p.y - 6} textAnchor="middle"
                          fontFamily="var(--display-font), serif"
                          fontSize="22" fill="rgba(255,255,255,0.96)"
                          style={{ letterSpacing: "-0.01em" }}>
                          {q.title}
                        </text>
                        <text x={p.x} y={p.y + 14} textAnchor="middle"
                          fontFamily="'GT America Mono','IBM Plex Mono',ui-monospace,monospace"
                          fontSize="9" fill="rgba(255,255,255,0.85)"
                          letterSpacing="0.18em">
                          {q.kicker.toUpperCase()}
                        </text>
                      </g>
                    );
                  })()}
                </g>
              );
            })}

            {/* Center core — the salt particle */}
            <circle cx={cx} cy={cy} r={rInner - 4} fill="url(#ht-core)" />
            <circle cx={cx} cy={cy} r={rInner - 4} fill="none" stroke="rgba(13,27,62,0.18)" strokeWidth="0.7" />

            {/* Drifting micro-particles around the core */}
            {[0, 1, 2, 3, 4, 5].map(i => {
              const angle = (i * 60) * Math.PI / 180;
              const r = rInner - 18;
              const x = cx + r * Math.cos(angle);
              const y = cy + r * Math.sin(angle);
              return (
                <circle key={i} cx={x} cy={y} r="2" fill="rgb(232,155,142)" opacity="0.7">
                  <animate attributeName="opacity" values="0.3;0.95;0.3" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              );
            })}

            {/* Center label */}
            <text x={cx} y={cy - 4} textAnchor="middle"
              fontFamily="'GT America Mono',monospace" fontSize="9"
              fill="rgba(13,27,62,0.55)" letterSpacing="0.2em">
              NaCl
            </text>
            <text x={cx} y={cy + 14} textAnchor="middle"
              fontFamily="var(--display-font), serif" fontSize="20"
              fill="rgba(13,27,62,0.85)" letterSpacing="-0.01em">
              1–5 µm
            </text>
            <text x={cx} y={cy + 32} textAnchor="middle"
              fontFamily="'GT America Mono',monospace" fontSize="8"
              fill="rgba(13,27,62,0.5)" letterSpacing="0.18em">
              MICRONIZED
            </text>
          </svg>
        </div>

        <div className="ht-radial__cards">
          {quads.map(q => (
            <button
              key={q.id}
              className={`ht-quad ${active === q.id ? "is-on" : ""}`}
              onClick={() => setActive(q.id)}
              onMouseEnter={() => setActive(q.id)}
              style={{ "--quad-color": q.color }}
            >
              <div className="ht-quad__head">
                <span className="ht-quad__title">{q.title}</span>
                <span className="ht-quad__kicker">{q.kicker}</span>
              </div>
              <p className="ht-quad__job">{q.job}</p>
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
  const tabs = showScience ? baseTabs : baseTabs.filter((_, i) => i !== 1);
  useEffect(() => {
    if (!showScience && tab === 1) setTab(0);
  }, [showScience]);

  const bodies = {
    "How it works": (
      <>
        <p>You book a sauna and add halotherapy at the front desk. A halogenerator mounted in the cabin grinds pharmaceutical-grade sodium chloride into a dry aerosol — particles between one and five microns — and pushes it into the cedar room while you sit. You breathe normally through the nose. Twenty to thirty minutes later you step out, your sauna ends, and the cabin's ventilation clears the salt for the next guest.</p>
      </>
    ),
    "The science": (
      <>
        <p>Halotherapy delivers <em>dry sodium chloride aerosol</em> — micronized salt particles small enough to bypass the upper airway and reach the bronchial tree. The mechanism is mechanical, osmotic, and immunomodulatory at once. Salt is hygroscopic: each particle that lands on a moist mucosal surface pulls water out of pathogens and into thick mucus, lowering microbial load and thinning secretions.</p>
        <p style={{ marginTop: "14px" }}>Particle size dictates depth. <strong>1–2 µm</strong> particles travel deepest, reaching the bronchioles and alveoli. <strong>3–5 µm</strong> particles deposit in the larger bronchi and trachea. Anything above ten microns is filtered out by the nose. Our halogenerator targets the lower-airway range, which is the band studied for asthma, COPD, and chronic bronchitis.</p>
        <p style={{ marginTop: "14px" }}>Controlled trials show measurable improvements in FEV1, peak flow, and symptom scores in mild-to-moderate asthma after a course of sessions<sup>1</sup>, reduced exacerbations in chronic bronchitis<sup>2</sup>, and a clear effect on inflammatory skin conditions like atopic dermatitis<sup>3</sup> through a different route — salt deposition on the skin during exposure. Effects are dose-dependent and cumulative; a single session feels good, but the airway and skin shifts compound over a course.</p>
        <p className="rl-cite">
          <span><sup>1</sup> Chervinskaya & Zilber, <em>Journal of Aerosol Medicine</em>, 1995.</span>
          <span><sup>2</sup> Rashleigh, Smith & Roberts, <em>International Journal of COPD</em>, 2014.</span>
          <span><sup>3</sup> Bock & Bork, <em>Journal of the European Academy of Dermatology</em>, 2008.</span>
        </p>
      </>
    ),
    "What to expect": (
      <>
        <p>The cabin smells faintly of the sea — clean, mineral, not sharp. You'll see the air glint as particles drift through the light. Most people notice deeper, easier breathing within the first ten minutes. A mild dry cough mid-session is normal and expected; it's mucus mobilizing. Afterward, the airway feels open for several hours and the skin looks faintly luminous from the salt deposition. You may want extra water on your way out.</p>
      </>
    )
  };

  const faqs = [
    { q: "Do I need to do anything different in the sauna?", a: "Nothing. Sit, breathe through your nose, sweat as you normally would. The halogenerator runs the full length of your sauna session — there's no separate timer to manage." },
    { q: "Is it safe for kids and people with asthma?", a: "Halotherapy is well-tolerated and has been used for decades in respiratory clinics in Eastern Europe. Most people with asthma find it eases symptoms, but if you have severe or unstable asthma, brittle airways, or active TB, check with your pulmonologist first." },
    { q: "How often should I add it?", a: "For seasonal allergies or a stuck cold, two to three times a week for two weeks tends to produce a noticeable shift. For chronic respiratory or skin conditions, a longer course of two or three sessions a week for a month is the protocol most studies use." },
    { q: "Will the salt damage my jewelry or phone?", a: "The aerosol is dry and the concentration is low — your phone and watch will be fine. We recommend leaving leather goods in the cubby anyway to keep them out of the heat." },
    { q: "Are there reasons to skip a session?", a: "Active respiratory infections with fever, severe COPD exacerbation, recent thoracic surgery, and active TB are reasons to wait. Salt sensitivity and severe hypertension warrant a quick check with your doctor first." }
  ];

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

// ---------- Pricing (single add-on card + sauna/massage stack) ----------
function Pricing({ mobile }) {
  return (
    <section className={`pricing ${mobile ? "pricing--mobile" : ""}`}>
      <div className="pricing__head">
        <span className="pricing__kicker">Simple, unhurried</span>
        <h2>Add it to your sauna</h2>
      </div>

      <div className="ht-pricing">
        <div className="ht-pricing__card">
          <span className="plan__badge">Add-on only</span>
          <div className="ht-pricing__row">
            <div>
              <h3 className="ht-pricing__name">Halotherapy</h3>
              <p className="ht-pricing__sub">Runs the full length of your sauna session — no extra time, no extra room.</p>
            </div>
            <div className="ht-pricing__price">
              <span className="ht-pricing__plus">+</span>
              <span className="ht-pricing__num" style={{ fontFamily: "LeJour" }}>10</span>
            </div>
          </div>
          <div className="ht-pricing__foot">
            <a href={BOOK.halotherapy} target="_blank" rel="noopener" className="plan__link">Book halotherapy <IconArrow size={12} /></a>
            <span className="ht-pricing__sep">·</span>
            <span className="ht-pricing__small">Mention halotherapy at the front desk to add it.</span>
          </div>
        </div>
      </div>

      {/* Add-on callout — Halotherapy + Massage stack */}
      <div className="rl-addon">
        <div className="rl-addon__mark">+</div>
        <div className="rl-addon__body">
          <span className="rl-addon__kicker">Stack it on a visit</span>
          <h3>Sauna + halotherapy, then onto the table</h3>
          <p>
            A common pairing: thirty minutes in the cedar cabin with the salt running, a quick rinse,
            then straight into a massage. The airway opens, the body softens, and the work goes deeper.
          </p>
          <div className="rl-addon__links">
            <a href="sauna.html" className="rl-addon__link">+ With sauna <IconArrow size={12} /></a>
            <a href="Massage.html" className="rl-addon__link">+ With massage <IconArrow size={12} /></a>
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
      <p>I started adding the salt to my sauna during allergy season and never stopped. My sinuses are clearer than they've been in a decade, my eczema quieted down, and the ten dollars is the easiest yes on the menu.</p>
      <div className="quote__who">— Mara K. · Member since 2023</div>
    </section>);
}

// ---------- Final CTA ----------
function FinalCTA({ mobile }) {
  return (
    <section className={`final ${mobile ? "final--mobile" : ""}`}>
      <div className="final__orb" />
      <h2>Salt is medicine.<br /><em>Add it to the sauna you're already taking.</em></h2>
      <a href={BOOK.halotherapy} target="_blank" rel="noopener" className="btn btn--primary btn--lg">
        <span>Reserve halotherapy</span>
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
        <span className="stickybar__from">add-on</span>
        <span className="stickybar__price">+$10</span>
      </div>
      <a href={BOOK.halotherapy} target="_blank" rel="noopener" className="btn btn--primary btn--sm">
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
      <Benefits mobile={mobile} copy={copy} />
      <SaltRadial mobile={mobile} intensity={intensity} />
      <Deepen mobile={mobile} showScience={showScience} />
      <Pricing mobile={mobile} />
      <Quote />
      <FinalCTA mobile={mobile} />
      {mobile && <StickyBar />}
    </div>);
}

// ---------- Tweaks ----------
const HALO_DEFAULTS = /*EDITMODE-BEGIN*/{
  "candle": "#E89B8E",
  "displayFont": "LeJour",
  "showScience": true,
  "intensity": 0.7
} /*EDITMODE-END*/;

const HALO_COPY = {
  heroTitle: "Sea air,\non a schedule.",
  heroLede: "A halogenerator mists pharmaceutical-grade salt into your sauna. You breathe it in for the full session — airways open, mucus thins, skin softens, allergies quiet down.",
  benefits: [
    { t: "Respiratory clearance", d: "Asthma, allergies, sinus congestion, post-nasal drip — micronized salt thins mucus and quiets airway inflammation across the bronchial tree." },
    { t: "Skin & barrier", d: "Eczema, psoriasis, and acne respond to salt deposition on the skin during exposure. Itch eases, redness fades, the barrier rebuilds." },
    { t: "Antimicrobial", d: "Salt is hygroscopic and antibacterial on contact. Pathogen load in the airway drops during and after exposure — useful at the edge of a cold." }
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

  const [t, setTweak] = useTweaks(HALO_DEFAULTS);
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
      <ServicePage mobile={isMobile} copy={HALO_COPY} showScience={showScience} intensity={intensity} />
    </>);
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
