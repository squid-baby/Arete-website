# New Year 2027 door hanger ("A Year of Possibility")

Design proof, version 2. Terracotta hills, sun, three birds, sprig. Code **RESET**.
This is the New Year piece. It uses nothing from the evergreen holiday hanger.

Look at `out/mockup-hero.jpg` first.

## The four pieces

| Piece | Size | What is on it |
|---|---|---|
| Hanger front | 3.5 × 8.5 in | "A Year of Possibility", ARETÉ, "Your best you is on the other side of a good reset.", hills. The pocket is glued here. |
| Hanger back | 3.5 × 8.5 in | "Only you can hit the reset button.", the two "Perhaps…" lines, hills and sun, ARETÉ, service line, footer. |
| Pocket | 3.1 × 3.1 in front panel | Plain terracotta with a small ARETÉ. Curved top edge with a thumb scoop. **No offer and no QR code.** |
| Card | 3 × 3 in | "A little more room for yourself.", NEW YEAR OFFER, $25 off your first month of a membership, Use code RESET, QR code, floatarete.com/reset, Valid through January 31, 2027. |

The card stands inside the pocket. Its top shows in the curved opening, with the
1/4 in hole (centered, 0.25 in below the top edge). The key hangs from the hole
over the plain pocket. The first words on the card start 0.64 in from the top, so
the punch has room.

## Owner decisions that replace the written handoff

1. Pocket and card are on the hanger **front** (the handoff had them on the back).
2. The offer and the QR code are on the **card** (the handoff had them on the pocket front).
3. Card is **3 × 3 in**; pocket is **3.1 × 3.1 in** (the handoff had 2 × 3.5 and 3.2 × 2.1).
4. The pocket top is curved, as in the layout reference.

## Files

| Path | Contents |
|---|---|
| `out/1-hanger-front.pdf`, `out/2-hanger-back.pdf` | 3.75 × 8.75 in, 0.125 in bleed |
| `out/3-pocket-sheet.pdf` | 8.5 × 11 in, terracotta to the edge, 6 pockets |
| `out/3-pocket-cricut-cut-score.svg` | Same positions as the sheet. Black = cut, blue = score |
| `out/4-gift-card.pdf` | 3.125 × 3.125 in, 1/16 in bleed |
| `out/mockup-*.{jpg,png}` | Pictures of the assembled piece. The key and backdrop are pictures only |
| `out/proof-*.png` | Each piece with cut and safety lines; the pocket sheet with the cut lines on top |
| `build/spec.mjs` | Every measurement, colour and word. Change things here |
| `build/pages.mjs`, `build/build.mjs` | Layout, and the script that writes `out/` |
| `build/prepare-art.py` | Turns `art-source/` into `art/` (exact palette averages) |
| `build/check.py` | Checks the finished PDFs |
| `art-source/` | Watercolor art generated with the OpenAI image API (November 2026), using the approved art on floatarete.com/reset as the style reference |

## Rebuild and check

```
python3 docs/print/reset-2027/build/prepare-art.py   # only after art changes
node docs/print/reset-2027/build/build.mjs
python3 docs/print/reset-2027/build/check.py
node --test tests/reset-hanger-print.test.mjs
```

Needs Playwright with Chromium, and Python with `pillow`, `numpy`, `opencv-python-headless`.

## Not ready for the print order yet

- **The hook shape is approximate.** It was measured from the reference picture.
  `shop-template/die-inches.json` from the kit is needed. Then the sprig and sun
  can be fitted to the real cut. No words sit above 2.45 in from the top.
- **The die line is not in the PDFs.** It is only in the proof picture.
- **Colours are RGB.** No CMYK conversion or soft proof was made (no colour
  profile and no Ghostscript in the build machine). Ask the shop for a printed proof.
- The QR code opens `https://floatarete.com/reset` directly (owner's decision). It carries no door-hanger tracking tags, so Google Analytics cannot separate hanger scans from other visits to that page.
- A design review by a second person was not done.

## Pocket on the Cricut

1. Upload `3-pocket-cricut-cut-score.svg`. Select all, then **Attach**. The size must read 8.5 × 11 in. Do not resize.
2. Black lines: **Cut**. Blue lines: **Score**. The four tiny corner squares only hold the frame size.
3. Do not use Print Then Cut. Place the printed sheet at the top-left of the mat.
4. Fold the three tabs back. Tape the tabs to the hanger front: 0.2 in from each side, bottom fold 0.2 in above the bottom edge.
5. The card lies on top of the folded tabs, so keep the tape thin and flat.

## Tests only the owner can do

- Printed proof for colour, on the final paper.
- Scan the printed card with an iPhone and an Android phone.
- Two Cricut test sheets. Check that the curved top cuts cleanly.
- Fold-and-glue test: a 3 in card must slide in and out of the 3.1 in pocket. If it is too tight, make the pocket 3.2 in wide (change `POCKET.w` in `spec.mjs`).
- Key weight test on a door lever: the card must stay in the pocket when the door swings.
