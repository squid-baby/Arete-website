// One place for every measurement, colour and word of the New Year door hanger.
// Units: inches, measured from the top-left of each piece's trim (cut) size.
// pages.mjs draws from this file; tests/reset-hanger-print.test.mjs checks it.

export const PALETTE = {
  paper: "#F4E7D8", cream: "#FBF4EA", ink: "#38271D",
  terracotta: "#B7795E", terracottaDeep: "#94563C", ochre: "#DFA76C",
};

export const COPY = {
  wordmark: "ARETÉ",
  front: { headline: ["A Year of", "Possibility"], line: ["Your best you is on the other side", "of a good reset."] },
  back: {
    headline: ["Only you can hit", "the reset button."],
    aside: [["Perhaps you don’t need to", "become someone new."], ["Perhaps you just need", "a little space to be yourself."]],
    services: ["FLOAT", "SAUNA", "COLD PLUNGE", "MASSAGE"],
    footer: ["ELEMENTAL WELLNESS", "CARRBORO, NC"],
  },
  offer: {
    label: "NEW YEAR OFFER",
    amount: "$25 off",
    terms: ["your first month", "of a membership"],
    codeLead: "Use code", code: "RESET",
    url: "floatarete.com/reset",
    valid: "Valid through January 31, 2027",
  },
  card: { message: ["A little more room", "for yourself."] }, // the card also carries COPY.offer
};

export const QR = { target: "https://floatarete.com/reset", file: "qr-reset.svg", modules: 37, size: 0.96 };

// Type sizes in points. The handoff minimum is 6 pt, and 6.5 pt for must-read text.
export const TYPE = {
  frontHeadline: 44, wordmark: 15, backHeadline: 30, aside: 11.5, frontLine: 13.5, services: 7, footer: 7,
  offerLabel: 7, offerAmount: 32, offerTerms: 11, offerCode: 8, offerUrl: 6.6, offerValid: 6.5, pocketWordmark: 12, pocketServices: 8,
  cardMessage: 17,
};
export const MIN_TYPE = 6, MIN_READING_TYPE = 6.5;

export const HANGER = {
  w: 3.5, h: 8.5, bleed: 0.125, safe: 0.1, radius: 0.2,
  // APPROXIMATE hook, measured from the reference picture. Replace with the
  // shop's die-inches.json before the print order (see README).
  hole: { cx: 1.73, cy: 1.05, r: 0.66 },
  slot: { topAtEdge: 0.78, bottomAtEdge: 0.94, topAngle: -12, bottomAngle: -1.7 },
  textTop: 2.45, // no words above this line
};

// Square gift card. It carries the offer and the QR code (owner's decision).
export const CARD = {
  w: 3, h: 3, bleed: 0.0625, safe: 0.125,
  hole: { cx: 1.5, cy: 0.25, d: 0.25, clear: 0.4 },
  contentTop: 0.64, // first words start here; the space above is for the punch
  qr: { x: 0.3, y: 1.5 },
};

// Plain terracotta pocket on the hanger FRONT. No offer and no QR code on it.
export const POCKET = {
  w: 3.1, h: 3.1, sideTab: 0.4, bottomTab: 0.3,
  // Top edge: high at both sides, a soft slope to a shoulder, then a thumb scoop.
  top: { shoulderX: 1.05, shoulderY: 0.2, scoopDepth: 0.55 },
  margin: 0.15, // keep-out from every cut and score line
  mark: { y: 2.4, servicesY: 2.72 }, // wordmark and service line on the pocket, below the key
  onHanger: { x: 0.2, bottomFoldAboveTrim: 0.2 },
};
POCKET.onHanger.y = HANGER.h - POCKET.onHanger.bottomFoldAboveTrim - POCKET.h;                         // 5.2
// The card stands on the pocket's bottom fold, so it sits 0.1 in below the pocket corners.
export const CARD_ON_HANGER = { x: (HANGER.w - CARD.w) / 2, y: HANGER.h - POCKET.onHanger.bottomFoldAboveTrim - CARD.h };

export const SHEET = { w: 8.5, h: 11, cols: 2, rows: 3, x0: 0.25, y0: 0.25, pitchX: 4.1, pitchY: 3.55 };

const r3 = (n) => Math.round(n * 1000) / 1000;

// ---------- Hanger die (approximate) ----------
export function diePath(mirror = false, scale = 1) {
  const { w, h, radius: r, hole, slot } = HANGER;
  const rad = (d) => (d * Math.PI) / 180;
  const c1 = [hole.cx + hole.r * Math.cos(rad(slot.topAngle)), hole.cy + hole.r * Math.sin(rad(slot.topAngle))];
  const c2 = [hole.cx + hole.r * Math.cos(rad(slot.bottomAngle)), hole.cy + hole.r * Math.sin(rad(slot.bottomAngle))];
  const X = (x) => r3((mirror ? w - x : x) * scale), Y = (y) => r3(y * scale), R = r3(r * scale), HR = r3(hole.r * scale);
  const sw = mirror ? 1 : 0, hs = mirror ? 0 : 1;
  return [
    `M${X(w)},${Y(slot.topAtEdge)}`, `L${X(w)},${Y(r)}`, `A${R},${R} 0 0 ${sw} ${X(w - r)},${Y(0)}`,
    `L${X(r)},${Y(0)}`, `A${R},${R} 0 0 ${sw} ${X(0)},${Y(r)}`, `L${X(0)},${Y(h - r)}`,
    `A${R},${R} 0 0 ${sw} ${X(r)},${Y(h)}`, `L${X(w - r)},${Y(h)}`, `A${R},${R} 0 0 ${sw} ${X(w)},${Y(h - r)}`,
    `L${X(w)},${Y(slot.bottomAtEdge)}`, `L${X(c2[0])},${Y(c2[1])}`,
    `A${HR},${HR} 0 1 ${hs} ${X(c1[0])},${Y(c1[1])}`, "Z",
  ].join(" ");
}

// ---------- Pocket net ----------
// Panel coordinates: (0,0) is the panel's top-left corner. Tabs fold backward.
// The curved top edge, left to right, as path segments in panel inches.
function pocketTopEdge() {
  const { w, top: t } = POCKET, a = t.shoulderX, b = w - a, m = w / 2;
  return [
    ["C", [a * 0.5, 0], [a * 0.68, t.shoulderY], [a, t.shoulderY]],
    ["C", [a + 0.15, t.shoulderY], [a + 0.2, t.scoopDepth], [m, t.scoopDepth]],
    ["C", [b - 0.2, t.scoopDepth], [b - 0.15, t.shoulderY], [b, t.shoulderY]],
    ["C", [w - a * 0.68, t.shoulderY], [w - a * 0.5, 0], [w, 0]],
  ];
}
export function pocketPanelPath(scale = 1) {
  const { w, h } = POCKET, s = (n) => r3(n * scale);
  const top = pocketTopEdge().map(([c, ...pts]) => c + pts.map(([x, y]) => `${s(x)},${s(y)}`).join(" ")).join(" ");
  return `M0,0 ${top} L${s(w)},${s(h)} L0,${s(h)} Z`;
}
export function pocketNet() {
  const { w, h, sideTab: t, bottomTab: bt } = POCKET;
  const cut = [
    ["M", [0, 0]], ...pocketTopEdge(),
    ["L", [w + t, t]], ["L", [w + t, h - t]], ["L", [w, h]],          // right tab, 45° ends
    ["L", [w - bt, h + bt]], ["L", [bt, h + bt]], ["L", [0, h]],      // bottom tab
    ["L", [-t, h - t]], ["L", [-t, t]], ["Z"],                        // left tab
  ];
  const score = [[[0, 0], [0, h]], [[w, 0], [w, h]], [[0, h], [w, h]]];
  return { cut, score };
}

// Six nets per letter sheet, upright. Panel point (u,v) -> sheet point.
export function sheetSlots() {
  const out = [];
  for (let j = 0; j < SHEET.rows; j++) for (let i = 0; i < SHEET.cols; i++) {
    const X0 = SHEET.x0 + i * SHEET.pitchX + POCKET.sideTab, Y0 = SHEET.y0 + j * SHEET.pitchY;
    out.push({ X0: r3(X0), Y0: r3(Y0), at: ([u, v]) => [r3(X0 + u), r3(Y0 + v)] });
  }
  return out;
}

// Cricut cut file. 72 units per inch, which Design Space reads as 8.5 × 11 in.
export function cutSvg() {
  const U = 72, p = ([x, y]) => `${r3(x * U)},${r3(y * U)}`;
  const { cut, score } = pocketNet();
  const cuts = [], scores = [];
  for (const slot of sheetSlots()) {
    cuts.push(`<path d="${cut.map(([c, ...pts]) => c + pts.map((q) => p(slot.at(q))).join(" ")).join(" ")}"/>`);
    for (const [a, b] of score) scores.push(`<path d="M${p(slot.at(a))} L${p(slot.at(b))}"/>`);
  }
  const m = 0.02, corner = (x, y) => `<rect x="${r3(x * U)}" y="${r3(y * U)}" width="${m * U}" height="${m * U}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SHEET.w}in" height="${SHEET.h}in" viewBox="0 0 ${SHEET.w * U} ${SHEET.h * U}">
<title>Arete New Year pocket sheet. Black = cut. Blue = score. Size must read 8.5 x 11 in.</title>
<g id="Cut" fill="none" stroke="#000000" stroke-width="0.5">
${cuts.join("\n")}
</g>
<g id="Score" fill="none" stroke="#0000FF" stroke-width="0.5">
${scores.join("\n")}
</g>
<g id="Frame-corners" fill="#000000" stroke="none">
${corner(0, 0)}${corner(SHEET.w - m, 0)}${corner(0, SHEET.h - m)}${corner(SHEET.w - m, SHEET.h - m)}
</g>
</svg>
`;
}
