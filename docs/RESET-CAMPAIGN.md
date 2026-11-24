# "A Year of Possibility" door-hanger page (floatarete.com/reset)

Holiday 2026 / New Year 2027. 500 door hangers. Offer: $25 off the first month of a
membership with code **RESET**, valid through **January 31, 2027** (Eastern time).

## Files

| File | What it holds |
|---|---|
| `reset-campaign.jsx` | The offer settings: code, discount, end time, the three plans, their prices and checkout links. Edit offer details here only. |
| `reset.jsx` | The page layout and text. |
| `reset.css` | The page styles. This page does not load `styles.css`. |
| `reset.html` | Page head: title, description, `noindex`, social image. |
| `assets/reset/` | Art taken from the door hanger (sprig, sun and birds, hills), studio pictures, social image. |
| `assets/fonts/CormorantGaramond-MediumItalic.woff2` | The italic serif from the hanger (open source, SIL OFL, license file next to it). Le Jour Serif has capital letters only, so it stays for short titles. |
| `_redirects` | `/reset  /reset.html  200` shows the page at `/reset` and keeps `?utm_...` tags. |
| `tests/reset.test.mjs` | Checks prices, checkout links, end date, tags, events, spelling. |

## How to change things

Run `node --test` after every change. It fails when numbers disagree.

- **Code or discount:** in `reset-campaign.jsx`, change `code` or `discount`. Every price on the page is worked out again. Also update the numbers in the test `offer prices` in `tests/reset.test.mjs`.
- **End date:** change `endsAt` (the first moment the offer is over, with the Eastern offset `-05:00`) and `lastDayLabel` (the words people read).
- **A plan price:** change it in `memberships.jsx` first, then `regularPrice` in `reset-campaign.jsx`. The test fails until both agree.
- **Which plans show:** edit the `plans` list. Copy `checkoutPath` exactly from the matching plan in `memberships.jsx`.
- **Preview after the end date:** open `/reset?campaign_now=2027-02-01T00:00:00-05:00`.

After the end date the page stays live. It says the offer ended, shows regular prices, and links to all memberships. Do not delete the page: the hangers stay on doors.

## Rollback

The page is new and nothing else depends on it. To take it down, open the pull request
that added it on GitHub and click **Revert**, then merge the revert. Netlify publishes
the old site in about a minute. Or, in Netlify, open **Deploys**, pick the deploy before
this one, and click **Publish deploy**.

## QR codes

Print only after the page is live at `https://floatarete.com/reset` and a test purchase
with RESET worked. Destination pattern:

```
https://floatarete.com/reset?utm_source=doorhanger&utm_medium=print&utm_campaign=reset2027&utm_content=<zone>
```

Zones: `downtown_carrboro`, `north_carrboro`, `winmore`, `lake_hogan_farms`,
`southern_village`, or `all_doors` if one QR goes on all 500. Test each printed code at
actual size on an iPhone and an Android phone. Keep the white border (quiet zone)
around the code clear of the pocket and the art.

## Events sent to Google Analytics (GA4, G-E4KK9FDJ4T)

| Event | When | Data |
|---|---|---|
| `campaign_landing_view` | Once per page load | campaign_id, source, medium, content, offer_active |
| `campaign_plans_view` | The plans first come on screen | campaign_id, content |
| `campaign_code_copy` | The code was really copied | campaign_id, content, placement |
| `membership_checkout_click` | A "Choose …" button was clicked (Boulevard checkout opens) | campaign_id, plan_id, content, offer_active |

`campaign_plan_select` from the brief is the same click as `membership_checkout_click`
on this page, so only one event is sent. A click is not a purchase. No names, emails or
addresses are sent. Visits without tags are recorded as `(not set)`, never as a
neighborhood. Tags are not added to links to other pages, because that would start a
new GA session and break the attribution.

**Purchases:** this page cannot see a Boulevard purchase. Count sales from Boulevard's
report of RESET redemptions. Neighborhood numbers are visits and checkout clicks only,
unless each zone gets its own code.

## Metrics for the pilot

- Visitor response rate = unique campaign visitors / hangers delivered.
- Checkout click rate = users with `membership_checkout_click` / unique visitors.
- Door-to-member rate = RESET memberships sold / hangers delivered.
- Cash cost per member = (printing + delivery + assembly + development) / new members. Report the $25 discounts separately.
- Activation = members with a completed first visit / new members. Retention = members active at day 90 / members who reached day 90.

Keep a delivery log (zone, date, number of hangers delivered).

## Open items for the owner before printing

1. RESET is set up in Boulevard as $25 off the first billing cycle only, for online membership checkout.
2. Which memberships RESET works on, and whether it is for new members only and one use per person. The page says nothing about these until confirmed.
3. A real test purchase with RESET shows the right total, and month two is full price.
4. Final zones for the QR codes.
