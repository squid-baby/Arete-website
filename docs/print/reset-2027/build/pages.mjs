// HTML for each printed piece and for the proof pictures. Sizes are CSS inches,
// so Chromium writes PDFs at the exact print size. All numbers come from spec.mjs.
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import fs from "node:fs";
import { PALETTE as C, COPY, TYPE as T, HANGER, CARD, POCKET, SHEET, QR, CARD_ON_HANGER, diePath, pocketPanelPath, pocketNet, sheetSlots } from "./spec.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const url = (...p) => pathToFileURL(path.resolve(here, ...p)).href;
const art = (f) => url("..", "art", f);
const font = (f) => url("..", "..", "..", "..", "assets", "fonts", f);
const qrSvg = fs.readFileSync(path.resolve(here, "..", "art", QR.file), "utf8")
  .replace("<svg ", `<svg viewBox="0 0 ${QR.modules} ${QR.modules}" shape-rendering="crispEdges" `)
  .replace(/width="\d+" height="\d+"/, 'width="100%" height="100%"');

const CSS = `
@font-face{font-family:LeJour;src:url("${font("LeJourSerif.otf")}")}
@font-face{font-family:Glacial;src:url("${font("GlacialIndifference-Regular.otf")}")}
@font-face{font-family:Cormorant;src:url("${font("CormorantGaramond-MediumItalic.woff2")}");font-style:italic}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:transparent}
body{color:${C.ink};-webkit-font-smoothing:antialiased}
.abs{position:absolute}
.piece{position:relative;overflow:hidden}
.trim{position:absolute}
.paper{background:${C.paper} url("${art("paper.jpg")}") center/cover}
.cream{background:${C.cream} url("${art("paper-cream.jpg")}") center/cover}
.terra{background:${C.terracotta} url("${art("terracotta.jpg")}") center/cover}
.it{font-family:Cormorant;font-style:italic;font-weight:500}
.caps{font-family:Glacial;text-transform:uppercase}
.mark{font-family:LeJour}
.c{left:0;right:0;text-align:center}
.rule{height:0;border-top:.6pt solid ${C.ink};opacity:.75}
.dot{display:inline-block;width:.022in;height:.022in;border-radius:50%;background:currentColor;vertical-align:middle;margin:0 .1in;position:relative;top:-.01in}
img{display:block}
`;
const doc = (w, h, body, extra = "") => `<!doctype html><html><head><meta charset="utf-8"><style>@page{size:${w}in ${h}in;margin:0}${CSS}${extra}</style></head><body style="width:${w}in;height:${h}in">${body}</body></html>`;
const dots = (items, gap) => items.join(`<i class="dot"${gap ? ` style="margin:0 ${gap}in"` : ""}></i>`);
const mark = (pt, style = "") => `<div class="abs c mark" style="font-size:${pt}pt;letter-spacing:.46em;padding-left:.46em;${style}">${COPY.wordmark}</div>`;

// ---------- Hanger front (printed layer; the pocket and card sit on top) ----------
export function frontArt() {
  const b = HANGER.bleed;
  return `
<img class="abs" src="${art("sprig.png")}" style="left:-.03in;top:.03in;height:2.2in">
<img class="abs" src="${art("sun.png")}" style="left:2.36in;top:1.27in;width:1.08in">
<img class="abs" src="${art("birds.png")}" style="left:1.98in;top:1.93in;width:.56in">
<div class="abs c it" style="top:2.5in;font-size:${T.frontHeadline}pt;line-height:.585in;letter-spacing:-.005em">${COPY.front.headline.join("<br>")}</div>
<div class="abs rule" style="left:1.4in;width:.7in;top:3.83in"></div>
${mark(T.wordmark, "top:3.95in")}
<div class="abs c it" style="top:4.38in;font-size:${T.frontLine}pt;line-height:.225in">${COPY.front.line.join("<br>")}</div>
<img class="abs" src="${art("hills-a.webp")}" style="left:-.45in;top:4.8in;width:4.4in">
<div class="abs terra" style="left:-${b}in;right:-${b}in;top:5.5in;bottom:-${b}in;-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 .5in);mask-image:linear-gradient(to bottom,transparent 0,#000 .5in)"></div>`;
}

// ---------- Hanger back ----------
export function backArt() {
  const k = COPY.back;
  return `
<img class="abs" src="${art("sprig.png")}" style="right:-.03in;top:.03in;height:2.2in;transform:scaleX(-1)">
<img class="abs" src="${art("birds.png")}" style="left:.85in;top:1.9in;width:.54in;transform:scaleX(-1)">
<div class="abs c it" style="top:2.62in;font-size:${T.backHeadline}pt;line-height:.44in">${k.headline.join("<br>")}</div>
<div class="abs rule" style="left:1.4in;width:.7in;top:3.72in"></div>
<div class="abs c it" style="top:3.94in;font-size:${T.aside}pt;line-height:.205in;opacity:.9">${k.aside[0].join("<br>")}</div>
<div class="abs c it" style="top:4.5in;font-size:${T.aside}pt;line-height:.205in;opacity:.9">${k.aside[1].join("<br>")}</div>
<img class="abs" src="${art("sun.png")}" style="left:1.9in;top:5.43in;width:1.3in">
<img class="abs" src="${art("hills-b.webp")}" style="left:-.45in;top:5.7in;width:4.4in">
${mark(T.wordmark, "top:7.38in")}
<div class="abs c caps" style="top:7.82in;font-size:${T.services}pt;letter-spacing:.2em">${dots(k.services)}</div>
<div class="abs rule" style="left:1.25in;width:1in;top:8.02in;opacity:.5"></div>
<div class="abs c caps" style="top:8.1in;font-size:${T.footer}pt;letter-spacing:.2em">${dots(k.footer)}</div>`;
}

// ---------- Gift card (3 × 3): the message, the offer and the QR code ----------
export function cardArt() {
  const k = COPY.offer, h = CARD.hole, q = QR.size, qx = CARD.qr.x, qy = CARD.qr.y, col = "left:1.42in;width:1.36in;text-align:center";
  const line = `<span style="display:inline-block;width:.46in;border-top:.6pt solid ${C.ink};vertical-align:middle;opacity:.6"></span>`;
  return `
<div class="abs" style="inset:.07in;border:.5pt solid ${C.terracottaDeep};opacity:.5;border-radius:.02in"></div>
<div class="abs" style="left:${h.cx - 0.008}in;top:${h.cy - 0.008}in;width:.016in;height:.016in;border-radius:50%;background:${C.terracotta};opacity:.6"></div>
<div class="abs c it" style="top:${CARD.contentTop}in;font-size:${T.cardMessage}pt;line-height:.265in">${COPY.card.message.join("<br>")}</div>
<div class="abs c caps" style="top:1.29in;font-size:${T.offerLabel}pt;letter-spacing:.34em;padding-left:.34em">${line}<span style="margin:0 .08in 0 .12in">${k.label}</span>${line}</div>
<div class="abs" style="left:${qx}in;top:${qy}in;width:${q}in;height:${q}in">${qrSvg}</div>
<div class="abs caps" style="left:${qx}in;width:${q}in;text-align:center;top:${qy + q + 0.01}in;font-size:${T.offerUrl}pt;letter-spacing:.02em;text-transform:none">${k.url}</div>
<div class="abs it" style="${col};top:1.48in;font-size:${T.offerAmount}pt;line-height:.4in">${k.amount}</div>
<div class="abs it" style="${col};top:1.94in;font-size:${T.offerTerms}pt;line-height:.165in">${k.terms.join("<br>")}</div>
<div class="abs" style="${col};top:2.32in"><span class="it" style="display:inline-block;border:.6pt solid ${C.ink};padding:.04in .12in .035in"><span class="it" style="font-size:10pt">${k.codeLead}</span>&nbsp; <span class="caps" style="font-size:${T.offerCode}pt;letter-spacing:.32em">${k.code}</span></span></div>
<div class="abs c caps" style="top:2.73in;font-size:${T.offerValid}pt;letter-spacing:.14em">${k.valid}</div>`;
}

// ---------- Pocket front panel (3.1 × 3.1): terracotta with the wordmark and the service line ----------
export function pocketArt() {
  return mark(T.pocketWordmark, `top:${POCKET.mark.y}in;color:${C.cream}`) +
    `<div class="abs c caps" style="top:${POCKET.mark.servicesY}in;font-size:${T.pocketServices}pt;letter-spacing:.1em;color:${C.cream}">${dots(COPY.back.services, 0.07)}</div>`;
}

// ---------- Print pages ----------
// The hanger PDFs are made in two passes, so no transparency effects reach the
// print file (some viewers and print systems draw them wrong):
//   "art"  = pictures only; build.mjs saves this as one flat 400 ppi image.
//   "text" = that flat image as the background, with the words on top as sharp type.
const PASS_CSS = {
  art: ".it,.caps,.mark,.rule{visibility:hidden}",
  text: ".trim img,.abs.terra{display:none}",
};
const hangerPage = (inner, pass, flat) => {
  const { w, h, bleed: b } = HANGER, bg = pass === "text" ? ` style="width:${w + 2 * b}in;height:${h + 2 * b}in;background:url('${flat}') 0 0/100% 100%"` : ` style="width:${w + 2 * b}in;height:${h + 2 * b}in"`;
  return doc(w + 2 * b, h + 2 * b, `<div class="piece ${pass === "text" ? "" : "paper"}"${bg}><div class="trim" style="left:${b}in;top:${b}in;width:${w}in;height:${h}in">${inner}</div></div>`, PASS_CSS[pass] || "");
};
export const frontPage = (pass, flat) => hangerPage(frontArt(), pass, flat);
export const backPage = (pass, flat) => hangerPage(backArt(), pass, flat);
export function cardPage() {
  const { w, h, bleed: b } = CARD;
  return doc(w + 2 * b, h + 2 * b, `<div class="piece cream" style="width:${w + 2 * b}in;height:${h + 2 * b}in"><div class="trim" style="left:${b}in;top:${b}in;width:${w}in;height:${h}in">${cardArt()}</div></div>`);
}
export function pocketSheetPage(overlay = false) {
  const nets = sheetSlots().map((s) => `<div class="abs" style="left:${s.X0}in;top:${s.Y0}in;width:${POCKET.w}in;height:${POCKET.h}in;">${pocketArt()}</div>`).join("");
  return doc(SHEET.w, SHEET.h, `<div class="piece terra" style="width:${SHEET.w}in;height:${SHEET.h}in">${nets}${overlay ? cutOverlay() : ""}</div>`);
}
function cutOverlay() {
  const { cut, score } = pocketNet(), p = (q) => q.join(",");
  const paths = sheetSlots().map((s) => `<path d="${cut.map(([c, ...pts]) => c + pts.map((q) => p(s.at(q))).join(" ")).join(" ")}" stroke="#000"/>` +
    score.map(([a, b]) => `<path d="M${p(s.at(a))} L${p(s.at(b))}" stroke="#00f" stroke-dasharray=".05 .04"/>`).join("")).join("");
  return `<svg class="abs" style="left:0;top:0" width="${SHEET.w}in" height="${SHEET.h}in" viewBox="0 0 ${SHEET.w} ${SHEET.h}" fill="none" stroke-width=".012">${paths}</svg>`;
}

// ---------- Mockup parts (pictures only, never printed) ----------
const PX = 96;
const shadow = (s) => `filter:drop-shadow(0 ${0.012 * s}in ${0.012 * s}in rgba(60,36,20,.28)) drop-shadow(0 ${0.05 * s}in ${0.09 * s}in rgba(60,36,20,.22))`;
function hangerMock(inner, mirror) {
  return `<div class="abs" style="left:0;top:0;width:${HANGER.w}in;height:${HANGER.h}in;${shadow(1.4)}"><div class="piece paper" style="width:100%;height:100%;clip-path:path('${diePath(mirror, PX)}')">${inner}</div></div>`;
}
const KEY = { h: 1.62, w: 1.62 * 312 / 1231, lift: 0.1 };
const keyImg = (x, y, turn = 0) => `<img class="abs" src="${art("mock-key.png")}" style="left:${x + CARD.hole.cx - KEY.w / 2}in;top:${y + CARD.hole.cy - KEY.lift}in;height:${KEY.h}in;transform-origin:50% ${KEY.lift}in;transform:rotate(${turn}deg);filter:drop-shadow(.012in .03in .035in rgba(50,30,15,.45))">`;
function cardMock(withKey = true) {
  const h = CARD.hole, r = h.d / 2;
  const holeMask = `radial-gradient(circle at ${h.cx}in ${h.cy}in, transparent ${r - 0.004}in, #000 ${r}in)`;
  return `<div class="abs" style="left:0;top:0;width:${CARD.w}in;height:${CARD.h}in;${shadow(.6)}"><div class="piece cream" style="width:100%;height:100%;border-radius:.03in;-webkit-mask-image:${holeMask};mask-image:${holeMask}">${cardArt()}</div></div>` + (withKey ? keyImg(0, 0, -128) : "");
}
function pocketMock() {
  return `<div class="abs" style="left:0;top:0;width:${POCKET.w}in;height:${POCKET.h}in;${shadow(.9)}"><div class="piece terra" style="width:100%;height:100%;clip-path:path('${pocketPanelPath(PX)}')">${pocketArt()}<div class="abs" style="inset:0;box-shadow:inset 0 0 .05in rgba(70,35,18,.25)"></div></div></div>`;
}
const at = (x, y, html, extra = "") => `<div class="abs" style="left:${x}in;top:${y}in;${extra}">${html}</div>`;

// Assembled front: hanger, card behind the pocket, key on top of both.
export function assembledFront() {
  return hangerMock(frontArt(), false) +
    at(CARD_ON_HANGER.x, CARD_ON_HANGER.y, cardMock(false)) +
    at(POCKET.onHanger.x, POCKET.onHanger.y, pocketMock()) +
    keyImg(CARD_ON_HANGER.x, CARD_ON_HANGER.y);
}
export const assembledBack = () => hangerMock(backArt(), true);

export function assembledFrontPage() {
  return doc(4.3, 9.3, `<div style="position:relative;width:4.3in;height:9.3in;background:#cdbfae">${at(0.4, 0.4, assembledFront())}</div>`);
}
export function heroPage() {
  const W = 13.6, H = 10.05;
  const cap = (x, y, t, s) => `<div class="abs" style="left:${x}in;top:${y}in;width:3.5in;text-align:center;color:#33241a"><div class="caps" style="font-size:7.5pt;letter-spacing:.3em">${t}</div><div class="it" style="font-size:11pt;margin-top:.04in;opacity:.85">${s}</div></div>`;
  return doc(W, H, `<div style="position:relative;width:${W}in;height:${H}in;background:url('${art("mock-backdrop.jpg")}') center/cover;overflow:hidden">
${at(0.95, 0.55, assembledFront())}${cap(0.95, 9.28, "Front, assembled", "pocket, card and key in place")}
${at(5.05, 0.55, assembledBack())}${cap(5.05, 9.28, "Back", "the story")}
${at(9.75, 0.95, cardMock(true), "transform:rotate(3deg);transform-origin:50% 0")}${cap(9.55, 4.35, "The card, 3 × 3 in", "the offer and the QR code")}
${at(9.75, 5.45, pocketMock())}${cap(9.55, 8.8, "The pocket, 3.1 × 3.1 in", "wordmark, services, curved top")}
</div>`);
}

// Proofs: each piece with the cut line (red) and safety line (blue dashes).
export function proofPage() {
  const guide = (mirror) => `<svg class="abs" style="left:0;top:0;overflow:visible" width="${HANGER.w}in" height="${HANGER.h}in" viewBox="0 0 ${HANGER.w} ${HANGER.h}" fill="none"><path d="${diePath(mirror)}" stroke="#e00" stroke-width=".012"/><rect x="${HANGER.safe}" y="${HANGER.textTop}" width="${HANGER.w - 2 * HANGER.safe}" height="${HANGER.h - HANGER.textTop - HANGER.safe}" stroke="#06c" stroke-width=".01" stroke-dasharray=".05 .04"/></svg>`;
  const piece = (cls, w, h, b, inner, over) => `<div class="piece ${cls}" style="width:${w + 2 * b}in;height:${h + 2 * b}in"><div class="trim" style="left:${b}in;top:${b}in;width:${w}in;height:${h}in">${inner}${over}</div></div>`;
  const cardGuide = `<svg class="abs" style="left:0;top:0;overflow:visible" width="${CARD.w}in" height="${CARD.h}in" viewBox="0 0 ${CARD.w} ${CARD.h}" fill="none"><rect width="${CARD.w}" height="${CARD.h}" stroke="#e00" stroke-width=".01"/><rect x="${CARD.safe}" y="${CARD.safe}" width="${CARD.w - 2 * CARD.safe}" height="${CARD.h - 2 * CARD.safe}" stroke="#06c" stroke-width=".008" stroke-dasharray=".05 .04"/><circle cx="${CARD.hole.cx}" cy="${CARD.hole.cy}" r="${CARD.hole.d / 2}" stroke="#e00" stroke-width=".01"/><circle cx="${CARD.hole.cx}" cy="${CARD.hole.cy}" r="${CARD.hole.clear / 2}" stroke="#06c" stroke-width=".008" stroke-dasharray=".04 .03"/></svg>`;
  const m = POCKET.margin, pk = `<svg class="abs" style="left:0;top:0;overflow:visible" width="${POCKET.w}in" height="${POCKET.h}in" viewBox="0 0 ${POCKET.w} ${POCKET.h}" fill="none"><path d="${pocketPanelPath()}" stroke="#fff" stroke-width=".012"/><rect x="${m}" y="${m}" width="${POCKET.w - 2 * m}" height="${POCKET.h - 2 * m}" stroke="#9cf" stroke-width=".008" stroke-dasharray=".05 .04"/></svg>`;
  return doc(11.9, 9.5, `<div style="position:relative;width:11.9in;height:9.5in;background:#fff">
${at(0.3, 0.35, piece("paper", HANGER.w, HANGER.h, HANGER.bleed, frontArt(), guide(false)))}
${at(4.3, 0.35, piece("paper", HANGER.w, HANGER.h, HANGER.bleed, backArt(), guide(true)))}
${at(8.3, 0.35, piece("cream", CARD.w, CARD.h, CARD.bleed, cardArt(), cardGuide))}
${at(8.3, 3.8, `<div class="piece terra" style="width:${POCKET.w}in;height:${POCKET.h}in">${pocketArt()}${pk}</div>`)}
<div class="abs caps" style="left:8.3in;top:7.1in;width:3.2in;font-size:7pt;letter-spacing:.08em;line-height:1.7;text-transform:none;color:#333">Red: cut line (hanger hook is approximate). Blue dashes: safety line. White on the pocket: the curved cut edge.</div>
</div>`);
}
