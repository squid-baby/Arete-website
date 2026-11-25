// Checks on the New Year door hanger print design (docs/print/reset-2027).
// These test the measurements and words in spec.mjs and the page HTML.
// They do not open the PDFs; build/check.py does that.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import * as spec from "../docs/print/reset-2027/build/spec.mjs";
import * as pages from "../docs/print/reset-2027/build/pages.mjs";

const { COPY, TYPE, HANGER, CARD, POCKET, SHEET, QR, CARD_ON_HANGER } = spec;
const allCopy = JSON.stringify(COPY);

test("brand spelling and offer words", () => {
  assert.equal(COPY.wordmark, "ARETÉ");
  for (const wrong of ["ARÊTE", "Arête", "Aréte", "STILLNESS", "holiday pause"]) assert.ok(!allCopy.includes(wrong), wrong);
  assert.deepEqual(COPY.front.headline, ["A Year of", "Possibility"]);
  assert.equal(COPY.back.headline.join(" "), "Only you can hit the reset button.");
  assert.equal(`${COPY.offer.amount} ${COPY.offer.terms.join(" ")}`, "$25 off your first month of a membership");
  assert.equal(COPY.offer.code, "RESET");
  assert.equal(COPY.offer.valid, "Valid through January 31, 2027");
  assert.equal(COPY.card.message.join(" "), "A little more room for yourself.");
  assert.equal(COPY.front.line.join(" "), "Your best you is on the other side of a good reset.");
});

test("offer matches the live /reset page settings", () => {
  const campaign = fs.readFileSync(new URL("../reset-campaign.jsx", import.meta.url), "utf8");
  assert.match(campaign, /code: "RESET"/);
  assert.match(campaign, /discount: 25/);
  assert.match(campaign, /endsAt: "2027-02-01T00:00:00-05:00"/);
  const redirects = fs.readFileSync(new URL("../_redirects", import.meta.url), "utf8");
  assert.match(redirects, /^\/holiday-door\s/m, "the QR address must exist on the site");
  assert.equal(QR.target, "https://floatarete.com/holiday-door");
});

test("the offer and the QR code are on the card only, never on the pocket", () => {
  const pocket = pages.pocketArt();
  for (const word of ["RESET", "$25", "floatarete", "<svg", "Valid"]) assert.ok(!pocket.includes(word), `pocket must not contain ${word}`);
  const card = pages.cardArt();
  for (const word of ["$25 off", "RESET", "floatarete.com/reset", "Valid through January 31, 2027", "<svg"]) assert.ok(card.includes(word), `card needs ${word}`);
  for (const side of [pages.frontArt(), pages.backArt()]) assert.ok(!side.includes("$25") && !side.includes("<svg"));
});

test("type sizes meet the print minimum", () => {
  for (const [name, pt] of Object.entries(TYPE)) assert.ok(pt >= spec.MIN_TYPE, `${name} is ${pt} pt`);
  for (const name of ["offerUrl", "offerValid", "services", "footer"]) assert.ok(TYPE[name] >= spec.MIN_READING_TYPE, `${name} is ${TYPE[name]} pt`);
});

test("card: size, QR code and room for the hole punch", () => {
  assert.deepEqual([CARD.w, CARD.h], [3, 3]);
  assert.ok(QR.size >= 0.85);
  assert.ok(CARD.qr.x >= CARD.safe && CARD.qr.y + QR.size <= CARD.h - CARD.safe);
  assert.ok(CARD.hole.cy - CARD.hole.d / 2 >= 0.1, "paper above the hole");
  assert.ok(CARD.contentTop >= CARD.hole.cy + CARD.hole.clear / 2 + 0.15, "words start well below the hole");
});

test("pocket and card fit the hanger front", () => {
  assert.deepEqual([POCKET.w, POCKET.h], [3.1, 3.1]);
  assert.ok(POCKET.onHanger.x >= 0.15 && POCKET.onHanger.x + POCKET.w <= HANGER.w - 0.15);
  assert.ok(POCKET.w - CARD.w >= 0.1 - 1e-9, "card is narrower than the pocket");
  const holeY = CARD_ON_HANGER.y + CARD.hole.cy, scoopBottom = POCKET.onHanger.y + POCKET.top.scoopDepth;
  assert.ok(holeY + CARD.hole.d / 2 <= scoopBottom - 0.05, "the hole shows in the curved opening");
  assert.ok(CARD_ON_HANGER.y >= POCKET.onHanger.y, "card top is below the pocket corners");
  assert.ok(POCKET.mark.y >= POCKET.top.scoopDepth + POCKET.margin);
});

test("Cricut cut file stays on the sheet and nets do not overlap", () => {
  const svg = spec.cutSvg();
  assert.match(svg, /width="8.5in" height="11in"/);
  assert.equal((svg.match(/<path d="M[^"]+Z"\/>/g) || []).length, SHEET.cols * SHEET.rows);
  const { cut } = spec.pocketNet(), boxes = [];
  for (const slot of spec.sheetSlots()) {
    const pts = cut.flatMap(([, ...p]) => p).map(slot.at), xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const box = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
    assert.ok(box[0] >= 0.25 && box[1] >= 0.25 && box[2] <= SHEET.w - 0.25 && box[3] <= SHEET.h - 0.25, `net inside sheet: ${box}`);
    for (const o of boxes) assert.ok(box[0] >= o[2] + 0.1 || box[2] <= o[0] - 0.1 || box[1] >= o[3] + 0.1 || box[3] <= o[1] - 0.1, "nets keep 0.1 in apart");
    boxes.push(box);
  }
});
