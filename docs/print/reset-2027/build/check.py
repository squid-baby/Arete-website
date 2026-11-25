"""Checks on the finished PDFs in ../out. Prints real results; exits 1 on a failure.
Run: python3 docs/print/reset-2027/build/check.py"""
import glob, os, re, subprocess, sys
from pathlib import Path
import cv2

OUT = Path(__file__).resolve().parent.parent / "out"
TARGET = "https://floatarete.com/reset"
ALLOWED = ("CormorantGaramond-MediumItalic", "LeJour-Serif", "GlacialIndifference-Regular")
SIZES = {"1-hanger-front.pdf": (270, 630), "2-hanger-back.pdf": (270, 630), "3-pocket-sheet.pdf": (612, 792), "4-gift-card.pdf": (225, 225)}
fails = []

def run(*a): return subprocess.run(a, capture_output=True, text=True, check=True).stdout

for name, (w, h) in SIZES.items():
    f = str(OUT / name)
    m = re.search(r"Page size:\s+([\d.]+) x ([\d.]+)", run("pdfinfo", f))
    size_ok = abs(float(m[1]) - w) < 0.2 and abs(float(m[2]) - h) < 0.2
    fonts = [l.split()[0].split("+")[-1] for l in run("pdffonts", f).splitlines()[2:]]
    font_ok = all(x in ALLOWED for x in fonts)
    rows = [l.split() for l in run("pdfimages", "-list", f).splitlines()[2:]]
    ppis = [min(float(r[12]), float(r[13])) for r in rows]
    # Transparency (soft masks) draws wrong in some viewers and print systems.
    flat_ok = not any(r[2] == "smask" for r in rows)
    if not flat_ok: print(f"{name}: CONTAINS TRANSPARENCY MASKS"); fails.append(name + "-smask")
    ppi_ok = min(ppis) >= 300
    print(f"{name}: size {m[1]}x{m[2]} pt {'ok' if size_ok else 'WRONG'}; fonts {sorted(set(fonts))} {'ok' if font_ok else 'UNEXPECTED FONT'}; lowest image {min(ppis):.0f} ppi {'ok' if ppi_ok else 'TOO LOW'}")
    if not (size_ok and font_ok and ppi_ok): fails.append(name)

det = cv2.QRCodeDetector()
for ppi in (300, 120):
    base = str(OUT / f".chk{ppi}")
    run("pdftoppm", "-r", str(ppi), "-png", str(OUT / "4-gift-card.pdf"), base)
    im = cv2.imread(glob.glob(base + "*.png")[0])
    text = det.detectAndDecode(im)[0] or det.detectAndDecode(cv2.resize(im, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC))[0]
    print(f"QR code on the gift card at {ppi} ppi: {'decodes to ' + text if text else 'DOES NOT DECODE'}")
    if text != TARGET: fails.append(f"qr-{ppi}")
    for g in glob.glob(base + "*"): os.remove(g)

text = " ".join(run("pdftotext", str(OUT / n), "-") for n in SIZES)
bad = [w for w in ("ARÊTE", "Arête", "Aréte", "STILLNESS") if w in text]
print("Spelling: ARETÉ found" if "ARETÉ" in text.replace(" ", "") else "Spelling: ARETÉ NOT FOUND", "; forbidden words:", bad or "none")
if bad or "ARETÉ" not in text.replace(" ", ""): fails.append("spelling")
print("FAILED: " + ", ".join(fails) if fails else "All automatic checks passed.")
sys.exit(1 if fails else 0)
