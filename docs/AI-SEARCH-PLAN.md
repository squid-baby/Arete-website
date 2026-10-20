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

## Phase 2: facts and new pages (done October 20, 2026, with Jen's answers)

Confirmed by Jen: hours are Tuesday–Friday 10 AM – 6:30 PM, Saturday–Sunday 10 AM – 4 PM, closed
Monday. Website prices are correct. Gift cards expire one year after purchase, are emailed right
away, and can be bought in person as a printed card in an envelope. Two people can book together.

| Item | What changed |
|---|---|
| Hours | Same hours in the schema on every page, the FAQ page, the About page and llms.txt |
| Prices | Schema and llms.txt now use the prices on the service pages (they were older, different numbers) |
| Gift card page | New `/gift-cards.html`: "What's a unique gift for someone near Chapel Hill?", gift card FAQs, Product and FAQPage schema |
| Visit Carrboro page | New `/visit-carrboro.html`: a slow Saturday in Carrboro, date and rainy-day ideas, FAQPage schema |
| FAQ | New group "Hours, Prices & Gifts": hours, cost (with "as of October 2026"), two people, gift cards, float tank near Chapel Hill / Durham / UNC |
| Home page | Hero sentence now says where Areté is: "downtown Carrboro, NC, next to Chapel Hill" |
| Schema | `DaySpa` type, old business names, area served, opening year, booking link |
| Phone layout | Blog posts, Terms, Privacy and the new pages no longer scroll sideways on phones |

### Still open (needs Jen)

1. **Three prices disagree on the visible site.** Which is right?
   - Float intro: the price table says $65 for a first float, but the top of the float page and the
     sticky bar say "$69 intro".
   - Massage: the home card says "from $110 · 60, 75, or 90 min". The massage page says $125 (60 min) and $150 (90 min), with no 75-minute option.
   - Red light: the home card says "from $20". The red light page starts at $35.
   - Sauna: the home card says "from $25 · 15 or 30 min". The sauna page starts at $30 for 30 min.
     (If a 15-minute session is $25, this one is fine.)
2. **Discounts.** Which discounts are there (student, first-time, military, teacher), and how much?
3. **Reviews.** May we quote 5–8 Google reviews on the site, with first name and last initial?
4. **Salt.** The float page says both "a thousand pounds" and "twelve hundred pounds".
5. **Gift card use.** Can a gift card pay for retail items too?
6. **Walking times.** Check the Visit Carrboro page: Weaver Street Market "a few minutes' walk",
   UNC "about a mile".
7. **Menu.** Should the "Gift Cards" menu link open the new gift card page (better for search),
   or keep opening the Boulevard checkout directly (one click less for buyers)?

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
