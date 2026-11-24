# Holiday 2026 door-hanger campaign (`/holiday`)

The door hanger carries a brass key and a removable offer card: "Bring this in
for 25% off retail." The QR code on the card opens **floatarete.com/holiday**.

## Files

| File | What it does |
|---|---|
| `holiday.html` | The page. Plain HTML, no React, so it loads fast from a QR scan. |
| `holiday.css` | Page styles. Holiday colors only; no other page uses this file. |
| `holiday.js` | Campaign settings (`CONFIG`), analytics events, phone "Buy a gift card" bar. |
| `assets/holiday/` | Evergreen art, retail photos (small WebP copies), share image. |
| `_redirects` | `/holiday  /holiday.html  200` keeps the short printed address. |
| `tests/holiday.test.mjs` | Checks copy, links, offer wording, analytics privacy. |
| `docs/holiday-qr/` | Production QR codes (SVG for print, PNG for preview). Not published. |

The Black Friday popup (`black-friday.js`) runs on the home page only. It is not on `/holiday`.

## Art

The evergreen art, the brass key and the kraft envelope were generated with the
OpenAI image API (November 2026), using the approved hanger artwork as the style
reference. They are original images made for this page, with transparent backgrounds:

| File | Used for |
|---|---|
| `art-garland-800.webp`, `art-garland-1300.webp` | Arch over the wordmark (phone / large screen) |
| `art-corner.webp` | Corner sprays: offer card, "sanctuary" section, closing section |
| `art-sprig.webp` | Loose sprigs beside the hero buttons on wide screens, share image |
| `art-key.webp` | Brass key on jute twine in the offer pocket |
| `art-envelope.webp` | Kraft envelope with a blank card. The ARETÉ wordmark on the card is real page text, placed over the blank card |

The envelope is an illustration, not a photo of the studio's printed gift card. If
the studio's card looks different, replace it with a photo of the real card.
Retail photos are the studio's own, re-exported with a light warm color correction.

Fonts: Le Jour Serif has capital letters only. It sets the ARETÉ wordmark.
Sentence-case headlines use Cormorant Garamond from Google Fonts (already the
site's fallback for Le Jour), because it has a true italic like the hanger.

## QR codes

| Batch | URL encoded | Files |
|---|---|---|
| One code for every door | `https://floatarete.com/holiday?utm_source=doorhanger&utm_medium=print&utm_campaign=holiday2026&utm_content=all_doors` | `holiday2026-all_doors.svg/.png` |
| Winmore batch | `...&utm_content=winmore` | `holiday2026-winmore.svg/.png` |

Both have a 4-module quiet zone, error correction level M, and decode to the exact
URL with two independent decoders (OpenCV standard and ArUco) at full and reduced size.

Before printing:
1. Print an actual-size proof. Keep the code at least 2 cm (0.8 in) wide.
2. Scan it with two different phones (one iPhone, one Android).
3. Confirm the phone opens floatarete.com/holiday and the page loads.
4. Do not use the QR drawn in the mockup art. It is not a real code.

For a new tracked batch, change only `utm_content` (lowercase letters, numbers,
`-` or `_`). Other values are dropped by the page before they reach analytics.

## Analytics (Google Analytics 4, property G-E4KK9FDJ4T)

| Event | When | Values |
|---|---|---|
| `campaign_landing_view` | Page load | campaign_id, source, medium, content |
| `holiday_gift_card_click` | Any gift-card button click | campaign_id, content, placement |
| `holiday_service_select` | Float, sauna, contrast, massage, red light, halotherapy links | + service_id |
| `holiday_booking_click` | "Book a visit" / "Book an experience" | campaign_id, content, placement |
| `holiday_booking_continue` | "Continue to booking" in the booking note | campaign_id, content |
| `holiday_retail_directions_click` | "Get directions" | campaign_id, content, placement |
| `holiday_phone_click` | Any phone link | campaign_id, content, placement |

What these numbers mean:
- They are **clicks** (intent), not purchases. A gift-card click does not prove a sale.
- Boulevard's checkout opens in a window over the page. Boulevard receives the GA
  ID from `booking-notice.js`, but this repo cannot confirm that Boulevard sends
  purchase events with the campaign attached. Until that is confirmed, compare
  gift-card sales in Boulevard reports by date; do not count all holiday gift-card
  sales as campaign sales.
- Retail redemptions happen at the register, so the website cannot see them.
  Count them in the POS (next section).
- No names, emails, phone numbers or card data are sent.

To see the events in GA4: Reports → Engagement → Events. Register `content`,
`placement`, `service_id` and `campaign_id` as event-scoped custom dimensions
(Admin → Custom definitions), or those values cannot be used in reports.

Count **users**, not events. A reload or the Back button sends a new
`campaign_landing_view`, and there are four gift-card buttons. "Booking clicks"
include people who then closed the booking note; `holiday_booking_continue` counts
the ones who went on.

Report gift-card sales from Boulevard by date, against the same weeks before the
hangers went out. A gift card sale is cash received plus a future obligation, not
profit, and its later use is not a second sale. Some results cannot be seen online:
people who typed the address instead of scanning, walk-in printed gift cards, and
bookings made later on another device.

## Retail offer at the register (owner and staff)

Proposed internal label: `HOLIDAY26_RETAIL25`. Customers never see or type it.

1. Owner: create a 25% retail discount with that name in the point-of-sale system.
   Confirm the POS can limit it to retail items.
2. Staff: when a guest hands over the holiday offer card, apply the discount to
   eligible retail items in the same sale. Keep the card (or mark it) if the owner
   decides it is single use.
3. Collect or mark every card that is handed in. The pile of cards is a count of
   visits, even when the guest buys a gift card or books instead of shopping.
4. Add "Door hanger" as a choice in the new-client "How did you hear about us?" field.
5. Weekly in December: export the count of sales and the discount total for that label.

## Open decisions before printing (owner)

The page shows only what the printed card says, plus "retail items only, in
person". It shows no expiry, minimum, or limit, because none are approved. Decide:

- [ ] Expiry date, if any.
- [ ] Which products count as retail; any exclusions.
- [ ] One use per card? Must the guest bring the original card?
- [ ] Does it combine with member discounts?
- [ ] Holiday hours. The page shows regular hours, and also says the studio opens
      around the day's appointments, so shoppers should call first. Confirm which
      is true in December and keep one statement.
- [ ] Hero button wording: keep "Give the gift of wellness" (approved) or change it to
      "Buy a gift card" (clearer, recommended by the conversion review).
- [ ] A "what $50 / $100 / $150 covers" row using the prices on the gift card page
      (needs current prices confirmed).
- [ ] Number of hangers per zone and date (track separately from New Year hangers).

When terms are approved, add one plain sentence to the "How it works" box and the
first FAQ answer in `holiday.html`, then update the test in `tests/holiday.test.mjs`
that blocks unapproved terms.

## After the holidays

Keep `/holiday` live: printed cards stay in kitchens for months. The page has no
date switch, so nothing breaks on December 26. In January, change the eyebrow and
the word "holiday" in the copy to an evergreen gift/visit message, and keep honoring
and showing the retail offer for as long as its approved terms say.

## Undo

To take the page down completely, delete `holiday.html`, `holiday.css`,
`holiday.js`, `assets/holiday/`, `tests/holiday.test.mjs`, and the `/holiday` line in
`_redirects`. Better: point the line at a live page instead
(`/holiday  /gift-cards.html  302`) so printed QR codes still land somewhere useful.
