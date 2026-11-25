"""Turn the generated art in art-source/ into print-ready layers in art/.

- Watercolor on white becomes colour + transparency (so it sits on any paper).
- Paper and terracotta textures are shifted so their average colour is exactly
  the palette value. One terracotta file serves the pocket and the hanger.
Run: python3 docs/print/reset-2027/build/prepare-art.py
"""
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / "art-source", ROOT / "art"
PALETTE = {"paper": (0xF4, 0xE7, 0xD8), "cream": (0xFB, 0xF4, 0xEA), "terracotta": (0xB7, 0x79, 0x5E)}


def white_to_alpha(img, ink_gain=(1.0, 1.0, 1.0)):
    """Watercolor on white -> RGBA. ink_gain scales how much each channel is
    darkened, which moves the hue toward the palette without flattening tones."""
    a = np.asarray(img.convert("RGB")).astype(np.float64) / 255.0
    a = 1.0 - (1.0 - a) * np.array(ink_gain, dtype=np.float64)
    a = np.clip(a, 0, 1)
    alpha = 1.0 - a.min(axis=2)
    alpha = np.clip((alpha - 0.012) / 0.988, 0, 1)          # drop paper-white noise
    safe = np.maximum(alpha, 1e-4)[..., None]
    colour = np.clip((a - (1.0 - alpha[..., None])) / safe, 0, 1)
    rgba = np.dstack([colour, alpha])
    return Image.fromarray((rgba * 255 + 0.5).astype(np.uint8), "RGBA")


def crop_alpha(img, pad=6):
    box = img.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox()
    box = (max(0, box[0] - pad), max(0, box[1] - pad), min(img.width, box[2] + pad), min(img.height, box[3] + pad))
    return img.crop(box)


def normalise(img, target, size, contrast=1.0):
    """Resize, then move the average colour to the exact palette value."""
    a = np.asarray(img.convert("RGB").resize(size, Image.LANCZOS)).astype(np.float64)
    mean = a.reshape(-1, 3).mean(axis=0)
    a = (a - mean) * contrast + np.array(target, dtype=np.float64)
    return Image.fromarray(np.clip(a + 0.5, 0, 255).astype(np.uint8), "RGB")


def recolour(img, src, dst):
    """Move one sampled colour (src) to a palette colour (dst), keep the texture."""
    a = np.asarray(img).astype(np.float64)
    a[..., :3] = np.clip(a[..., :3] * (np.array(dst, dtype=np.float64) / np.array(src, dtype=np.float64)), 0, 255)
    return Image.fromarray((a + 0.5).astype(np.uint8), "RGBA")


def main():
    OUT.mkdir(exist_ok=True)
    # Hills: pull the orange toward the palette terracotta, keep peach-to-deep range.
    for name in ("hills-a", "hills-b"):
        hills = white_to_alpha(Image.open(SRC / f"{name}.jpg"), ink_gain=(1.42, 0.97, 0.86))
        hills.resize((2880, 960), Image.LANCZOS).save(OUT / f"{name}.webp", quality=92, method=6)

    crop_alpha(Image.open(SRC / "sprig.png").convert("RGBA")).save(OUT / "sprig.png", optimize=True)

    # Sun and birds arrive in one picture; split them so each can be placed alone.
    sb = Image.open(SRC / "sun-birds.png").convert("RGBA")
    a = np.asarray(sb).astype(np.int32)
    dark = (a[..., :3].sum(axis=2) < 330) & (a[..., 3] > 0)             # espresso birds
    birds = np.asarray(sb).copy(); birds[~dark] = 0
    sun = np.asarray(sb).copy(); sun[dark] = 0
    sun_img = crop_alpha(Image.fromarray(sun, "RGBA"))
    s = np.asarray(sun_img).astype(np.float64)
    solid = s[..., 3] > 200
    sun_img = recolour(sun_img, s[solid][:, :3].mean(axis=0), (0xDF, 0xA7, 0x6C))
    sun_img.save(OUT / "sun.png", optimize=True)
    birds_img = crop_alpha(Image.fromarray(birds, "RGBA"))
    b = np.asarray(birds_img).copy(); b[..., 0], b[..., 1], b[..., 2] = 0x38, 0x27, 0x1D   # exact ink
    Image.fromarray(b, "RGBA").save(OUT / "birds.png", optimize=True)

    normalise(Image.open(SRC / "paper.jpg"), PALETTE["paper"], (1500, 3500), 0.45).save(OUT / "paper.jpg", quality=93)
    normalise(Image.open(SRC / "paper.jpg"), PALETTE["cream"], (1500, 3500), 0.35).save(OUT / "paper-cream.jpg", quality=93)
    # Portrait, 2550 x 3400: 300 ppi across a letter sheet.
    normalise(Image.open(SRC / "terracotta.jpg").rotate(90, expand=True), PALETTE["terracotta"], (2550, 3400), 0.7).save(OUT / "terracotta.jpg", quality=93)

    # Mockup only (never printed): the brass key and the photo backdrop.
    crop_alpha(Image.open(SRC / "key.png").convert("RGBA")).save(OUT / "mock-key.png", optimize=True)
    Image.open(SRC / "backdrop.jpg").convert("RGB").save(OUT / "mock-backdrop.jpg", quality=90)

    for f in sorted(OUT.iterdir()):
        if f.suffix in (".png", ".jpg", ".webp"):
            im = Image.open(f)
            mean = np.asarray(im.convert("RGB")).astype(np.float64).reshape(-1, 3).mean(axis=0).round(1)
            print(f"{f.name:22} {im.size}  mean {mean}")


if __name__ == "__main__":
    main()
