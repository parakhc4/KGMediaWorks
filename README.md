# KGMediaWorks

Marketing website for **KGMediaWorks** — an immersive media studio producing 360° virtual tours, Matterport 3D walkthroughs, Google Street View experiences, and aerial/drone media for real estate, hospitality, retail, and commercial spaces.

It's a fast, dependency-free static site (plain HTML, CSS, and vanilla JS) styled with a bespoke **immersive-editorial** design system — deep petrol teal + warm amber on a bone canvas, editorial Fraunces serif paired with Inter. See [`DESIGN.md`](./DESIGN.md) for the full style reference.

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
- **Copy** — all text lives in `index.html`. The **portfolio** and **trust strip** already use your real projects and live 360°-tour links. Still to personalise before going live:
  - **Contact details** — email `hello@kgmediaworks.com`, phone `+91 00000 00000`, and the Bhopal studio line are placeholders. Update them in the **Contact** section and footer.
  - **Testimonials** — the three quotes use illustrative placeholder names (a resort GM, a wedding-venue owner, a boutique-hotel director), *not* your real clients. Swap in genuine client quotes with permission — don't attribute invented quotes to named businesses.
  - **Social links** — the footer Instagram/YouTube/LinkedIn icons point to `#`; add your real profile URLs.
- **Real photography** — the site currently renders self-contained CSS/SVG "scenes" as placeholders. To use real tour photos, replace a scene block:

  ```html
  <!-- from -->
  <div class="media"><div class="scene scene--interior"></div></div>
  <!-- to -->
  <div class="media"><img src="assets/your-tour.jpg" alt="Living room virtual tour"></div>
  ```

  Drop images into `assets/`. They'll be cropped with `object-fit: cover`, and the teal backdrop shows through while they load.
- **Contact form** — `js/main.js` handles the form as a front-end demo (validation + success message). Wire it to a real backend or a form service (Formspree, Basin, Netlify Forms, etc.) by pointing the form at your endpoint.

## Deploy

Being fully static, it drops onto any host:

- **GitHub Pages** — enable Pages on this repo (root of the branch).
- **Netlify / Vercel / Cloudflare Pages** — connect the repo; no build command, publish directory `/`.

## Notes

- Responsive from ~360px up; respects `prefers-reduced-motion`.
- The two web fonts load from Google Fonts — the layout degrades gracefully to system serif/sans if offline.
