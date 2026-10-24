"""Trace the CrawlStat owl into SVG.

The source is a JPEG with the transparency checkerboard baked in as real
pixels — the squares sit at luminance 66 and 92, the artwork at 250+ — so the
alpha is recovered by a luminance threshold before tracing.

Note the inversion on the way into potrace: potracer treats *zero* as the
region to trace, so the artwork mask has to be flipped or you get the
background as one enormous filled rectangle with the owl knocked out of it.
"""
from PIL import Image
import numpy as np
import potrace

SRC = '/private/tmp/claude-501/-Users-clotaire-Documents-Development-CrawlStat/ece6bfb4-8fa0-4b82-a5ac-6740a63d6108/images/4.jpg'
OUT = '/Users/clotaire/Documents/Development/Crawlstat Website/public/brand'

# 900px wide is the sweet spot: finer detail than the curves can express, and
# the file doubles in size for differences nobody can see at logo scale.
TRACE_WIDTH = 900


def artwork_mask() -> np.ndarray:
    grey = Image.open(SRC).convert('L')
    grey = grey.resize(
        (TRACE_WIDTH, round(grey.height * TRACE_WIDTH / grey.width)),
        Image.LANCZOS,
    )
    mask = np.array(grey) > 150
    rows, cols = np.any(mask, axis=1), np.any(mask, axis=0)
    y0, y1 = np.where(rows)[0][[0, -1]]
    x0, x1 = np.where(cols)[0][[0, -1]]
    return mask[y0:y1 + 1, x0:x1 + 1]


def to_svg(arr: np.ndarray, path: str, label: str) -> None:
    height, width = arr.shape
    # Inverted: see the module docstring.
    curves = potrace.Bitmap(~arr).trace(
        turdsize=4, alphamax=1.0, opticurve=True, opttolerance=0.8
    )
    parts = []
    for curve in curves:
        start = curve.start_point
        d = [f'M{start.x:.0f} {start.y:.0f}']
        for seg in curve:
            end = seg.end_point
            if seg.is_corner:
                c = seg.c
                d.append(f'L{c.x:.0f} {c.y:.0f}L{end.x:.0f} {end.y:.0f}')
            else:
                a, b = seg.c1, seg.c2
                d.append(
                    f'C{a.x:.0f} {a.y:.0f} {b.x:.0f} {b.y:.0f} '
                    f'{end.x:.0f} {end.y:.0f}'
                )
        d.append('Z')
        parts.append(''.join(d))

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'role="img" aria-label="{label}">'
        f'<path fill="currentColor" fill-rule="evenodd" d="{"".join(parts)}"/>'
        f'</svg>'
    )
    with open(path, 'w') as handle:
        handle.write(svg)
    print(f'{path.rsplit("/", 1)[1]}: {width}x{height}, '
          f'{len(curves)} paths, {len(svg) / 1024:.1f} KB')


def main() -> None:
    mask = artwork_mask()
    to_svg(mask, f'{OUT}/owl.svg', 'CrawlStat')

    # The head alone. The full wingspan is 2:1 and its double strokes turn to
    # mud below about 60px; the head still reads at 28.
    height, width = mask.shape
    head = mask[0:int(height * 0.53), int(width * 0.405):int(width * 0.600)]
    rows, cols = np.any(head, axis=1), np.any(head, axis=0)
    y0, y1 = np.where(rows)[0][[0, -1]]
    x0, x1 = np.where(cols)[0][[0, -1]]
    to_svg(head[y0:y1 + 1, x0:x1 + 1], f'{OUT}/mark.svg', 'CrawlStat')


if __name__ == '__main__':
    main()
