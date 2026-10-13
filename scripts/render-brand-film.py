"""Encode a quiet looping brand film from original generated artwork.

Usage: python scripts/render-brand-film.py EXTERIOR.png INTERIOR.png
Requires Pillow and imageio-ffmpeg. This is an editorial motion treatment of
still artwork, not generated footage of an actual property.
"""
from pathlib import Path
import math
import sys
from PIL import Image, ImageOps
import imageio_ffmpeg

root = Path(__file__).resolve().parents[1]
destination = root / "public" / "images" / "brand"
destination.mkdir(parents=True, exist_ok=True)
exterior, interior = [Image.open(path).convert("RGB") for path in sys.argv[1:3]]
for image, name in [(exterior, "together-exterior"), (interior, "together-interior")]:
    optimised = image.copy().resize((1600, 900), Image.Resampling.LANCZOS)
    optimised.save(
        destination / f"{name}.webp", "WEBP", quality=80, method=6
    )
    optimised.save(destination / f"{name}.avif", "AVIF", quality=50, speed=4)
mobile = ImageOps.fit(exterior, (720, 1080), Image.Resampling.LANCZOS, centering=(0.77, 0.5))
mobile.save(
    destination / "together-mobile.webp", "WEBP", quality=75, method=6
)
mobile.save(destination / "together-mobile.avif", "AVIF", quality=45, speed=4)

def smooth(value):
    value = max(0.0, min(1.0, value))
    return value * value * (3.0 - 2.0 * value)

def frame(image, zoom):
    width, height = image.size
    crop_width, crop_height = width / zoom, height / zoom
    left, top = (width - crop_width) / 2, (height - crop_height) / 2
    return image.crop((left, top, left + crop_width, top + crop_height)).resize(
        (1280, 720), Image.Resampling.LANCZOS
    )

fps, duration = 24, 12
writer = imageio_ffmpeg.write_frames(
    str(destination / "together-brand-film.mp4"), (1280, 720), fps=fps,
    codec="libx264", pix_fmt_in="rgb24", pix_fmt_out="yuv420p",
    output_params=["-crf", "25", "-preset", "medium", "-movflags", "+faststart", "-an"],
)
writer.send(None)
for index in range(fps * duration):
    time = index / (fps * duration - 1) * duration
    primary = frame(exterior, 1 + 0.035 * math.sin(math.pi * time / duration) ** 2)
    blend = smooth(time - 4) * (1 - smooth(time - 8))
    if blend > 0:
        secondary = frame(interior, 1.04 - 0.025 * smooth(time / duration))
        primary = Image.blend(primary, secondary, blend)
    writer.send(primary.tobytes())
writer.close()
for path in destination.iterdir():
    print(f"{path.name}: {path.stat().st_size:,} bytes")
