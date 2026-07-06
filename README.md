# KGMediaWorks

Marketing website for **KGMediaWorks** — an immersive media studio producing 360° virtual tours, Matterport 3D walkthroughs, Google Street View experiences, and aerial/drone media for real estate, hospitality, retail, and commercial spaces.

It's a fast, dependency-free static site (plain HTML, CSS, and vanilla JS) styled with a bespoke **immersive-editorial** design system — deep ocean navy + the brand blue `#009edf` on a bone canvas, editorial Fraunces serif paired with Inter. See [`DESIGN.md`](./DESIGN.md) for the full style reference.

## Structure

```
.
├── index.html          # The one-page site (all sections)
├── css/styles.css      # Design tokens + all styles
├── js/main.js          # Mobile nav, reveal-on-scroll, form handling
├── assets/favicon.svg  # Brand favicon / logo mark
├── DESIGN.md           # Design system documentation
└── README.md
```

## Run it locally

No build step. Open `index.html` directly, or serve the folder:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

## Customize

Everything is intentionally easy to edit:

- **Colors / fonts / radius** — edit the `:root` tokens at the top of `css/styles.css`. Changing `--color-ink` and `--color-signal` re-themes the whole site.
- **Hero 360°** — the hero backdrop is an **equirectangular 360° photo** (`assets/WEBSITECOVER.jpeg`) rendered as a slowly auto-rotating sphere by `js/pano.js` (raw WebGL, no library). It's **non-interactive** — it only pans. Add your equirectangular JPEG at `assets/WEBSITECOVER.jpeg` (2:1 aspect works best, e.g. 4096×2048). To use a different file, change the `data-src` on `<canvas class="hero__pano">` in `index.html`. Tune the drift speed (`yaw += dt * 0.055`) or field of view (`FOVY`) in `js/pano.js`. If the file or WebGL is unavailable, the gradient hero scene shows instead.
- **Copy** — all text lives in `index.html`. The **portfolio** and **trust strip** use your real projects and live 360°-tour links; contact **email** (`info@kgmediaworks.com`) and **phone** (`+91 77709 07656`) are set. Still to personalise:
  - **Studio location** — the "Bhopal, India · Serving pan-India" line is a reasonable guess; refine in the **Contact** section if needed.
  - **Testimonials** — the three quotes use illustrative placeholder names (a resort GM, a wedding-venue owner, a boutique-hotel director), *not* your real clients. Swap in genuine client quotes with permission — don't attribute invented quotes to named businesses.
  - **Social links** — the footer Instagram/YouTube/LinkedIn icons point to `#`; add your real profile URLs.
- **Portfolio previews** — each tile shows a **live preview of the hosted 360° tour**, embedded straight from its URL (lazy-loaded, non-interactive; the tile clicks through to the full tour). Nothing to upload. The preview is pulled back and framed by the navy scene via `transform: scale(0.82)` on `.work__tour` (a tour's own zoom can't be changed through an embed) — tune that scale to taste. To feature a different tour, change both the tile's `<iframe class="work__tour" src="…">` and its `<a class="work__link" href="…">`. See [`assets/tour-previews.md`](./assets/tour-previews.md) for the fallback behavior and how to add a static image for any tour that blocks embedding.
- **Other imagery** — for any other section, swap a scene block for a photo: replace `<div class="scene scene--interior"></div>` with `<img src="assets/your-photo.jpg" alt="…">`. Images crop with `object-fit: cover`, and the navy backdrop shows through while they load.
- **Contact form** — `js/main.js` handles the form as a front-end demo (validation + success message). Wire it to a real backend or a form service (Formspree, Basin, Netlify Forms, etc.) by pointing the form at your endpoint.

## Deploy

Being fully static, it drops onto any host:

- **GitHub Pages** — enable Pages on this repo (root of the branch).
- **Netlify / Vercel / Cloudflare Pages** — connect the repo; no build command, publish directory `/`.

## Notes

- Responsive from ~360px up; respects `prefers-reduced-motion`.
- The two web fonts load from Google Fonts — the layout degrades gracefully to system serif/sans if offline.
