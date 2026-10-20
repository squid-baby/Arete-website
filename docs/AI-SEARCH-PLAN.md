# AI search plan: get Areté into AI assistant answers

Started October 20, 2026, from the AEO/SEO audit of October 19, 2026.

Goal: when a person asks ChatGPT, Claude, Perplexity, Google AI Overviews, Grok or Meta AI
for "things to do in Carrboro", "date ideas in Chapel Hill", "a unique gift near Chapel Hill"
or "float tank near Durham", the answer names Areté.

## Phase 1: technical fixes (done in this update, no new facts needed)

| Audit item | What changed |
|---|---|
| Pages were empty without JavaScript (8–21 words) | New build step writes each page's text into the HTML: 330–1,400 words per page, with H1s |
| Babel compiler (about 650 KB) loaded on every visit | Removed from the live site. Pages use scripts compiled ahead of time |
| FAQPage schema was made by JavaScript only | Now written into faq.html. The About page Person schema too |
| Book and Gift Card links went to dead FloatHelm pages | Every published page now links straight to the matching Boulevard page |
| robots.txt did not name AI crawlers | Names 20 search and AI crawlers, with the same rules for each |
| Links to `Massage.html`, `Contrast-Therapy.html`, `../home.html` redirected | Changed to `/massage`, `/contrast-therapy`, `/` in pages, sitemap and llms.txt. Massage canonical fixed |
| Service icons and house picture had empty alt text | Alt text added |
| Large images: icons 4 MB each, logo 1.2 MB on every page | Icons now about 30 KB, logo 80 KB, home house picture 137 KB (WebP) |
| No checks | 93 automated checks (`node --test`) |

## Phase 2: facts and new pages (needs answers from Jen)

The site gives different hours and prices in different places. AI assistants avoid facts that
disagree, or repeat the wrong one. Each answer below goes into the page text, the schema,
llms.txt and the FAQ at the same time, with "as of" dates.

### Questions for Jen

1. **Hours.** Which is correct?
   - Schema on every page: Tue–Fri 10–6, Sat 10–5:30, Sun 10:30–5, closed Monday
   - About page: Tue–Sun by appointment, closed Monday
   - FAQ page and llms.txt: Mon–Thu 9–8, Fri–Sat 9–9, Sun 10–6
2. **Starting prices.** The home cards, the service pages and the schema disagree:

   | Service | Home card | Service page | Schema / llms.txt |
   |---|---|---|---|
   | Float | from $65 | New guest $65, 60 min $69, 90 min $89, top of page says "$69 intro" | $89 |
   | Infrared sauna | from $25, 15 or 30 min | from $30 | $45, 30 or 45 min |
   | Contrast therapy | from $50 | $50 intro, $60 single, $90 two-person | $25 |
   | Massage | from $110 | from $125 | $95 |
   | Red light | from $20 | $38 per session | $35 |
   | Halotherapy | $10 add-on | $10 add-on | $30 |
3. **Gift cards.** Do they expire? Any amount, or set amounts? Delivered by email right away?
   Can they pay for massage and retail?
4. **Couples and friends.** Can two people book contrast therapy or the sauna together? Price?
5. **Discounts.** Any student, first-time, military or teacher discount?
6. **Reviews.** May we quote 5–8 Google reviews on the site, with first name and last initial?
7. **Salt amount.** The float page says both "a thousand pounds" and "twelve hundred pounds" of Epsom salt.
8. **Google Business Profile.** Is the address 213 E. Braxton Foushee St, and are the hours current?

### Pages to build after the answers

- **Gift cards page** (`/gift-cards.html`). First question: "What's a unique gift for someone who
  lives near Chapel Hill?" Short answer by person (stressed, athlete, couple, first-timer).
  Gift card FAQs. Product schema. Nav "Gift Cards" links point here.
- **Visit Carrboro / date night page** (`/visit-carrboro.html`). Questions: "What is there to do
  in Carrboro?", "What's a good date idea in Carrboro or Chapel Hill?", "What's something unique to
  do near UNC?", "What to do in Chapel Hill on a rainy day?". Real walking distances to Weaver
  Street Market, Cat's Cradle and Franklin Street.
- **Home page.** One plain sentence under the H1 that says what Areté is and where it is.
  A "Float, sauna or contrast: which should I book?" section.
- **Reviews section** with real quotes (only with Jen's permission).
- **More FAQs:** couples, rainy day, closest float tank to Chapel Hill / Durham / UNC, cost with an
  "as of" date, hours, discounts, sending a gift card right away, how Areté differs from a gym recovery studio.
- **Schema:** correct hours, prices, `DaySpa` type, alternate names, `ReserveAction`, Google Maps link.
- **llms.txt:** new version with the confirmed facts.

## Phase 3: off-site work (Jen or a helper, not code)

AI assistants trust what other sites say about a business. These listings still show the old
address (203 E Carr St) or old names.

- [ ] Google Business Profile: address, hours, categories (Float center, Day spa, Sauna), photos, gift card link
- [ ] Apple Business Connect: claim and fill in (Siri and Apple Maps use it)
- [ ] Bing Places: claim (ChatGPT search uses Bing)
- [ ] Yelp and TripAdvisor (Things to Do → Spas & Wellness): claim or create
- [ ] Fix or claim Birdeye, Cylex, floatationlocations.com, promallu (old address and names)
- [ ] Ask happy guests for Google reviews that mention what they did ("date night", "gift", "first float")
- [ ] Pitch the "slow Saturday in Carrboro" idea to visitcarrboro.com, chapelhillvisitors.com,
      Chapelboro, Raleigh Mom Club and This Is Raleigh
- [ ] Submit sitemap in Google Search Console and Bing Webmaster Tools

## Phase 4: keep it fresh

- 1–2 blog posts a month with "Published" and "Updated" dates. Ideas: holiday gift guide,
  winter sauna, first float questions, a slow Saturday in Carrboro.
- Update `lastmod` in sitemap.xml when a page changes.
- Every 3 months, ask the target questions in ChatGPT, Perplexity, Google and Claude and note
  whether Areté shows.
