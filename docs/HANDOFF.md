# Handoff — Areté Website (floatarete.com SEO rebuild)

A fresh-context summary so the next session can pick up cleanly.

---

## Project context

Rebuild of **floatarete.com** off Wix onto a flat HTML/React site deployed via
Netlify. Owner: **Jen Ellis**, founder of Areté Float + Wellness in Carrboro, NC.
Opened February 2018 — the first float studio in the Triangle. Locally owned,
female-operated.

**NAP (use exactly this format everywhere):**
- Areté Float + Wellness
- 213 E. Braxton Foushee St, Carrboro, NC 27510
- 919-636-9899  /  `tel:+19196369899`
- TheTeam@FloatArete.com
- Geo: lat **35.90975173817612**, lng **-79.07104206138438**

**Hours:** Mon–Thu 9am–8pm · Fri–Sat 9am–9pm · Sun 10am–6pm
**Booking system:** FloatHelm at https://aretefloattank.floathelm.com/booking
**Socials:** instagram.com/floatarete · facebook.com/floatarete · linkedin.com/company/106779704

---

## Design system

- **Fonts:** `LeJour` (serif display) + `Glacial` (sans-serif body), self-hosted in `assets/fonts/`. Italic display text uses the candle accent color.
- **Tokens (light mode, in `styles.css`):**
  - `--bg #FAF9F7` · `--paper #FFFFFF` · `--ink #0d1b3e` (deep navy)
  - `--candle #7c6b8a` (muted purple accent)
  - `--display-font` LeJour serif · `--sans` Glacial
- **Whimsy mode:** dark navy variant with candle/sky accents. `body.whimsy` overrides tokens. The home page has a Light↔Whimsy toggle linking to `whimsy.html` and friends — the new SEO pages do not need this.
- **Layout vocabulary:** centered hero with thin-line eyebrow, large serif H1 with italic emphasis, constrained sub-text, hairline borders, and an editorial sidebar/grid pattern. See `retail.html` and `Massage.html` as the gold-standard references.
- **Component pattern:** every page uses inline-React via Babel CDN (no build step). React 18.3.1 / ReactDOM 18.3.1 / Babel 7.29.0 with the pinned `integrity` hashes from the system prompt — DO NOT change those URLs. Each page = `*.html` + `*.jsx` + `*.css`.

---

## What's already built

### Core pages (existing before this work)
- `home.html` / `home.jsx` / `home.css` — landing + services grid + email + experience + booking strip + footer + Light/Whimsy toggle. **Has full SEO head: title, description, canonical, OG/Twitter, LocalBusiness JSON-LD with OfferCatalog. Use this as the SEO reference template.**
- `float.html`, `sauna.html`, `Contrast-Therapy.html`, `Massage.html`, `halotherapy.html`, `red_light.html` — service pages. Each has matching `*.jsx` and `*.css`.
- `memberships.html` / `retail.html` — pricing & retail room.
- `whimsy*.html` — alt-mode counterparts.

### New pages from this session
- **`blog.html` / `blog.jsx` / `blog.css`** — blog index with featured + grid + filters + sidebar (topics/archive/newsletter/NAP). Posts edit through `<script id="blog-posts">` JSON in `blog.html`. Six existing Wix posts seeded. Schema: `Blog` JSON-LD.
- **`faq.html` / `faq.jsx`** + shared `info-pages.css` — 14 questions across 5 groups (Floating, Sauna, Contrast, Massage, Booking). Sticky topic nav + accordion. **`FAQPage` schema is auto-generated at runtime from `<script id="faq-data">` so visible Q&A and Google's view never drift.**
- **`about.html` / `about.jsx`** — story (Jen's broken-ankle origin, Feb 2018 opening), 3 principles, team grid, visit CTA. Real team data already populated:
  - Jen Ellis (Founder & Owner)
  - Jamie Taylor — Lead LMBT #5002
  - Eileen Sullivan — LMBT #19391
  - **Person schema auto-graphed from the team JSON.** Photos still placeholder — drop files in `assets/team/` and put the path in the `photo` field.

### SEO infrastructure
| File | Status |
|---|---|
| `_redirects` | ✅ Wix → new URL map for Netlify (root) |
| `robots.txt` | ✅ Allow all, block `?lightbox=`, sitemap link |
| `sitemap.xml` | ✅ All core, service, blog, about, faq URLs |
| `llms.txt` | ✅ Plain-language business + page index |
| `SEO-PLAN.md` | ✅ Full per-page checklist + schema boilerplates |

### SEO that's done across pages
- Full SEO head (title/desc/canonical/OG/Twitter/LocalBusiness JSON-LD): **home.html, blog.html, faq.html, about.html**
- Geo coords corrected to user-provided exact lat/lng on home & blog (and present on faq/about as built).

---

## What's left

### High priority
1. **Add SEO head + Service schema to remaining pages** — copy the head block from `home.html` into:
   - `float.html`, `sauna.html`, `Contrast-Therapy.html`, `Massage.html`, `halotherapy.html`, `red_light.html`, `retail.html`, `memberships.html`
   - For each service page, also add a `Service` JSON-LD block. Boilerplate is in `SEO-PLAN.md` under "Schema boilerplates → Service page". Fill in `name`, `description`, `offers.price`, and `url` per service.
   - For `memberships.html` add an `OfferCatalog` schema instead.
2. **Image alt-text audit** — every `<img>` across the site needs descriptive alt text (no filenames, no empty alts). Ones to definitely check: hero pod, service icons, retail visuals, massage video poster.
3. **Add team photos** — drop files in `assets/team/`, fill `photo` field in `about.html` `team-data` JSON. Schema picks them up automatically.
4. **Build individual blog post pages** — currently the cards in `blog.html` link to `blog/<slug>.html` which don't exist yet. Six posts to build (titles in the `blog-posts` JSON in `blog.html`). Each needs `BlogPosting` schema (boilerplate in `SEO-PLAN.md`).

### Medium priority
5. **Performance pass** — convert PNG/JPG to WebP, add `loading="lazy"` to below-fold images, set explicit width/height to prevent CLS.
6. **Cross-link service pages** — each should link to two related services in the body copy.
7. **Confirm Netlify publish folder** — currently the project root, so `_redirects` is correctly placed. If a build step is added, move `_redirects` to the publish output.
8. **Update home.html footer Blog link** — currently `<a href="#">Blog</a>` in `home.jsx`, should point to `blog.html`. Same for the home nav dropdown which uses `#` for several links.

### Nice to have
9. Build `/contact` page or section (audit recommended visible hours on homepage AND contact page).
10. Add Person schema link from each service page back to its primary therapist where relevant.
11. Pre-launch checklist in `SEO-PLAN.md` section 7 — actually run through it once Netlify deploy is staged.

---

## Files to know

```
home.html / home.jsx / home.css         — landing (SEO reference)
blog.html / blog.jsx / blog.css         — blog index
faq.html / faq.jsx                      — FAQ (uses info-pages.css + blog.css for footer)
about.html / about.jsx                  — about + team (uses info-pages.css + blog.css for footer)
info-pages.css                          — shared FAQ + About styles
styles.css                              — global tokens, nav, fonts, whimsy mode

_redirects                              — Netlify 301s
robots.txt                              — crawler rules
sitemap.xml                             — submit to Google Search Console post-launch
llms.txt                                — LLM crawler index
SEO-PLAN.md                             — full audit checklist + schema boilerplates
```

---

## Important conventions

- **Edit JSON, not JSX** for content lists (blog posts, FAQ items, team, retail items). Each page comments the JSON block in HTML.
- **Schema is auto-generated from JSON** for FAQ (`FAQPage`) and About (`Person` graph). Don't duplicate by hand — the page builds it on load.
- **Each `<script type="text/babel">` has its own scope** — components are inlined per page on purpose. If you refactor to a shared `nav-footer.jsx`, expose components via `Object.assign(window, {...})` per the system prompt rule.
- **Style objects must have unique names.** Don't write `const styles = ...` — use `const blogStyles = ...` etc.
- **Don't recreate copyrighted UI** — when designing, work from the existing site's own design vocabulary (already established) rather than mimicking other brands.

---

## Open questions for the user

- Want individual blog post pages built next, or push remaining service-page SEO heads first?
- Provide team headshot photos when ready — drop in `assets/team/` and update `about.html` `photo` field.
