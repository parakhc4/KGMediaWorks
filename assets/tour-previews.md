# Portfolio tile previews

The portfolio tiles ("Tours worth getting lost in") now show a **live preview
of each hosted 360° tour** — the tile embeds the real tour URL in a lazy-loaded,
non-interactive `<iframe class="work__tour">`. Clicking a tile opens the full
interactive tour in a new tab. No image files are needed.

## How it behaves
- Previews **lazy-load** (only when the tile scrolls near the viewport) and each
  fades in once its tour loads. On mobile, tiles stack one-per-row, so only what's
  on screen loads — keeping things light.
- If a tour **blocks embedding** (some hosts send `X-Frame-Options`/CSP) or is
  offline, its preview simply stays hidden and the on-brand gradient shows instead.

## Optional: a static image fallback for a specific tour
If one tour won't embed and you'd rather show a still than the gradient, add an
`<img>` inside that tile's `.media` (below the badge) and it'll show under the
iframe layer:

```html
<div class="media">
  <div class="scene scene--twilight"></div>
  <img class="work__img" src="assets/work-graces.jpg" alt="Graces Resort 360° tour" loading="lazy">
  <iframe class="work__tour" src="https://www.gracesresort.com/virtualtour" ...></iframe>
</div>
```

Then add this rule to `css/styles.css`:

```css
.work__img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 1; }
```

The live tour (z-index 2) covers the image when it loads; the image covers the
gradient if the tour can't embed.
