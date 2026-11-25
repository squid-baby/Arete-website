# ARETÉ holiday door hanger: print files

Design: the approved holiday art (evergreen, forest-green band, brass key, sunburst pocket).
Production rules: the earlier print handoff (die, bleed, fonts, files, Cricut, assembly).
The pocket is on the hanger **front**, as in the art.

## Files to upload (one file per piece, exact size)

| File | Upload to | Artboard (with bleed) | Trim | Notes |
|---|---|---|---|---|
| `hanger-front.pdf` | Door hanger, front | 3.74 × 8.74 in | 3.5 × 8.5 | Slot on the left, as in the shop template |
| `hanger-back.pdf` | Door hanger, back | 3.74 × 8.74 in | 3.5 × 8.5 | Nothing placed near the top; works with a mirrored slot |
| `card-front.pdf` | Square business card, rounded corners | 2.625 × 2.625 in | 2.5 × 2.5 | Front only. Blank or plain back. |
| `pocket-sheet.pdf` | Flyer / sheet, 8.5 × 11, full bleed | 8.75 × 11.25 in | 8.5 × 11 | 8 pocket fronts. Print at 100%, no scaling. |
| `pocket-sheet-cut.svg` | Cricut Design Space | 8.5 × 11 in | | Cut (black), score (pink dashed), corner marks |
| `pocket-single-cut.svg` | Cricut, test cut | 3.70 × 2.68 in | | One pocket |

Each PDF also has a `.png` at 600 ppi, the same size, for upload tools that want images.
The PDFs carry a TrimBox at the trim size. All text is converted to outlines, so the
PDFs contain no fonts (nothing to embed, nothing to substitute). Colours are RGB; the
shop converts to CMYK, so ask for a printed proof.

## The pocket (cut from the pocket sheet)

| Part | Size |
|---|---|
| Front panel | 3.10 W × 2.35 H in, straight top edge with a 1.00 × 0.36 in thumb notch (it frames the card's wreath) |
| Side tabs | 0.25 in, fold back behind the panel |
| Bottom tab | 0.20 in, folds back inside; the card stands on it |
| Inside width | 2.60 in (card 2.50 + 0.05 each side) |
| Tab ends | 45°, pulled back 0.03 in at the corners so the folded tabs never overlap |
| Card held | 2.15 of 2.5 in (86%); 0.35 in shows above the pocket |

**Sheets:** 8 per sheet. 500 + 10% = 550 pockets → 69 sheets; order 75.

**Placement on the hanger front:** bottom fold 0.95 in above the bottom trim edge,
centered (0.20 in from each side). The card top is then 4.85 in below the top trim,
0.25 in under the service line.

## Card (2.5 × 2.5)

- Top of the card: a small evergreen wreath (the same sprig art and colours as the corner
  sprigs). In the pocket the top 0.35 in shows, and the notch shows the whole wreath.
  All words start below 0.75 in, so the pocket never cuts a line in half.
- Punch a 1/4 in hole in the **centre of the wreath: centred left to right, 0.39 in below
  the card's top edge**. The printed opening is 0.35 in across, so the punch has about
  0.05 in of room on every side. A card-sized template with the hole marked keeps it centred.
- Tie the key with jute twine through that hole so the key lies on the pocket front over
  the sunburst.
- QR code: `https://floatarete.com/key` (version 2, 25 × 25 modules, 0.76 in including its
  quiet zone, printed on the cream card). `/key` forwards to `/holiday` with the door-hanger tags. It decodes from the card
  file at 600, 300 and 150 ppi. **The website change must be live before printing.**

## Print shop

- Hanger: thick card stock, matte or uncoated. Card: business-card stock (14–16 pt).
- Pocket sheets: 100 lb cover, matte or uncoated, from the same paper family as the hanger.
  Grain along the 8.5 in side, so the long bottom fold folds cleanly.
  Full bleed: print on a larger sheet and trim to 8.5 × 11 ± 1/32 in. No "fit to page".
- Ask for one printed proof of each piece on the final stock before the full run.

## Cricut

1. Upload `pocket-sheet-cut.svg`. Select everything and **Attach**. The group must read
   **8.5 × 11 in**. Never type a new size.
2. Pink dashed lines: **Score** (scoring wheel on 100 lb cover). Black lines: **Cut**.
   The four tiny corner squares only keep the frame; they cut the paper corners.
3. Put the trimmed, printed sheet at the top-left of the mat, the right way up.
4. Cut 2 test sheets. The sunbursts must sit in the middle of each pocket front.
   Do not use Print Then Cut for shop-printed sheets.

## Assembly

1. Fold the three tabs back on the score lines.
2. 1/4 in strong double-sided tape (Scor-Tape or ATG) on the tabs, kept 0.05 in back from
   the inner edges. No foam: the slight bow of the panel is what grips the card.
3. Use a cardboard L-guide cut to the hanger corner, so each pocket sits 0.95 in up and centered.
4. Punch the card, tie the key, slide the card in.
5. Optional: one removable glue dot behind the card stops it falling out on a swinging door.

## Before the full run

- [ ] The pull request with `/key` is merged and floatarete.com/key opens the holiday page.
- [ ] Scan the printed card at actual size with an iPhone and an Android phone.
- [ ] Owner confirms the retail offer terms (expiry, exclusions, one use) before printing.
- [ ] Assemble 3 complete hangers; hang one on a lever handle and one on a round knob.
- [ ] The die in these files matches the shop template screenshot; check it against the
      shop's own die file in their uploader preview.
