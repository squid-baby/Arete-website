# SEO Game Plan — floatarete.com

A practical, priority-ordered checklist for the Wix → Netlify rebuild. Track
each item to completion before launch, then keep the bottom section open as
ongoing work.

---

## 1 · Foundation files (root of publish folder) ✅ created

| File | Status | Purpose |
|---|---|---|
| `_redirects` | ✅ | Maps every old Wix URL to its new equivalent (301). Netlify reads automatically. |
| `robots.txt` | ✅ | Allows all crawlers, blocks `?lightbox=` style duplicates, points to sitemap. |
| `sitemap.xml` | ✅ | Hand-maintained for now. Submit to Google Search Console after launch. |
| `llms.txt` | ✅ | Plain-language business + page index for LLM crawlers. |

**Important:** `_redirects` MUST live in whatever folder Netlify is publishing.
For this project we're publishing the project root directly, so leaving it at
the project root is correct. If you ever switch to a build step that outputs to
`/dist` or `/public`, copy `_redirects` into that folder instead.

---

## 2 · Per-page SEO checklist

Every page in the site must hit these. Use `home.html` as the reference
implementation — its `<head>` is fully fitted out.

- [ ] Exactly one `<h1>` reflecting the page's primary topic
- [ ] Unique `<title>`, 50–60 chars, format: `[Topic] | Areté Float + Wellness | Carrboro, NC`
- [ ] Unique `<meta name="description">`, 140–155 chars
- [ ] `<link rel="canonical" href="https://floatarete.com/<page>">` pointing to its own URL
- [ ] `<meta name="robots" content="index,follow,max-image-preview:large">`
- [ ] Open Graph: `og:type`, `og:title`, `og:description`, `og:url`, `og:image`, `og:site_name`
- [ ] Twitter: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Site-wide LocalBusiness JSON-LD (copy block from home.html)
- [ ] Page-specific JSON-LD (see schema map below)
- [ ] Every `<img>` has descriptive `alt`. No empty alts. No filename-as-alt.
- [ ] Below-fold images use `loading="lazy"`; above-fold use `loading="eager"`.

### Schema map

| Page | Schema type |
|---|---|
| Homepage (`/`) | `LocalBusiness` (full) — already on home.html |
| `/float`, `/sauna`, `/red-light`, `/Contrast-Therapy`, `/Massage`, `/halotherapy` | `Service` with `provider`, `areaServed`, `offers` |
| `/memberships` | `OfferCatalog` |
| `/blog` | `Blog` (already on blog.html) |
| `/blog/<post>` | `BlogPosting` with `author`, `datePublished`, `dateModified`, `image` |
| `/about` (when built) | `AboutPage` + `Person` schema for each therapist with `jobTitle` and credentials |
| `/faq` (when built) | `FAQPage` wrapping every Q&A pair |

A copy-paste boilerplate for each schema type is at the bottom of this file.

---

## 3 · Content minimums

| Page | Word count target |
|---|---|
| Homepage | 500+ |
| Each service page | 600+ |
| FAQ page | 10+ Q&As with full answers |
| Blog post | 700+ for ranking; under that is fine for personal notes |

---

## 4 · NAP consistency (name / address / phone)

These three lines must be identical, character-for-character, on every page
they appear (footer, contact section, schema). Pick ONE format and stick to it:

```
Areté Float + Wellness
213 E. Braxton Foushee St
Carrboro, NC 27510
919-636-9899
```

Phone in `tel:` links uses E.164 format: `tel:+19196369899`.

Hours, when shown in HTML, must match the hours in LocalBusiness schema.

---

## 5 · Performance targets

- [ ] No render-blocking scripts. React + Babel are loaded synchronously today;
      consider moving to `<script defer>` for the JSX shell, or compile to
      static HTML once content stabilizes.
- [ ] All product / hero images served as WebP (or AVIF). Convert PNG/JPG.
- [ ] Below-fold images use `loading="lazy"`.
- [ ] Largest Contentful Paint < 2.5s on 4G.
- [ ] No layout shift on hero (set explicit `width`/`height` or aspect-ratio).
- [ ] Self-host fonts (already done — `assets/fonts/*.otf`) with `font-display: swap`.

---

## 6 · Internal linking

- Every nav link uses descriptive anchor text (no "click here").
- Footer repeats the full service list on every page (already in blog.html /
  home.html).
- Each service page should cross-link to two related services (e.g. Float ↔
  Contrast Therapy, Sauna ↔ Halotherapy).
- Blog posts should link out to the relevant service page in the body.

---

## 7 · Pre-launch checklist

1. [ ] Open `https://floatarete.com/sitemap.xml` in browser — verify every old
       Wix URL we care about is either redirected or has a new equivalent.
2. [ ] Cross-reference with Google Search Console → Coverage → Valid pages
       (this lists every URL Google has indexed, including ones not in the
       Wix sitemap).
3. [ ] Add any newly discovered URLs to `_redirects`.
4. [ ] Test 5 redirects manually after deploy:
       - `floatarete.com/about-us` → `/about.html`
       - `floatarete.com/coldplunge` → `/Contrast-Therapy.html`
       - `floatarete.com/blog-1` → `/blog.html`
       - `floatarete.com/single-post/2017/03/29/spring-snow` → `/blog.html`
       - `floatarete.com/copy-of-why-sauna-why-infrared` → `/sauna.html`
5. [ ] Submit new sitemap in Google Search Console.
6. [ ] Submit `robots.txt` URL in Bing Webmaster Tools.
7. [ ] Update Google Business Profile with the new URL (still floatarete.com,
       but if any deep links pointed at /about-us they need refreshing).
8. [ ] Monitor Coverage report for 404 errors for 30 days post-launch.

---

## 8 · Ongoing (post-launch)

- New blog post → add `<url>` entry to `sitemap.xml`, ping Google.
- Page meaningfully updated → bump `<lastmod>` date.
- Quarterly: run a free SEO audit (Screaming Frog, Ahrefs Webmaster Tools) and
  fix anything flagged.
- Watch Search Console > Performance for 6 months. The pages that get
  impressions but few clicks are usually a meta-description problem, not a
  ranking problem — easy fix.

---

## Schema boilerplates

### Service page (drop into `/float.html`, etc — fill `name`, `description`, `offers`)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Floatation Therapy",
  "serviceType": "Sensory deprivation float tank",
  "provider": { "@id": "https://floatarete.com/#business" },
  "areaServed": { "@type": "City", "name": "Carrboro" },
  "description": "60- or 90-minute floats in 1,000 lbs of Epsom salt — sensory silence, zero gravity, and complete restoration.",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "89.00",
    "availability": "https://schema.org/InStock",
    "url": "https://floatarete.com/float.html"
  }
}
</script>
```

### BlogPosting (drop into each post page)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How Contrast Therapy Boosts Health and Recovery",
  "image": "https://floatarete.com/assets/blog/contrast-room.jpg",
  "author": { "@type": "Person", "name": "Jen [last name]" },
  "publisher": { "@id": "https://floatarete.com/#business" },
  "datePublished": "2025-07-12",
  "dateModified": "2025-07-12",
  "mainEntityOfPage": "https://floatarete.com/blog/how-contrast-therapy-boosts-health-and-recovery.html"
}
</script>
```

### FAQPage (when /faq ships)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What should I wear in a float tank?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most people float nude — the room is fully private and lockable. If you'd prefer a swimsuit, that's fine too."
      }
    }
  ]
}
</script>
```
