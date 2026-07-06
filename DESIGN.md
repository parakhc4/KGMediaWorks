# KGMediaWorks — Style Reference
> Immersive editorial studio on a warm bone field

**Theme:** light

KGMediaWorks borrows the pastoral-editorial language of the Arva reference and re-anchors it for an immersive virtual-tours / media brand. A warm **bone** canvas replaces pure white; a deep **ocean navy** anchors the brand and evokes architectural depth and screens; quilted pastel surfaces (slate, sand, sage, stone, clay) tile across content like rooms seen through a viewer. Typography pairs an editorial serif (Fraunces) with a neutral sans (Inter) for a printed-magazine feel over typical SaaS chrome. Buttons are dramatically pill-shaped (100px radius), photography dominates full-bleed above the fold, and the only saturated color besides the navy is the studio's own **brand blue `#009edf`** (taken from the logo) — used sparingly on the marquee strip and micro-accents.

---

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ocean Ink | `#08324e` | `--color-ink` | Primary brand — deep navy header, nav bar, interstitial bands, footer |
| Ink Deep | `#05202f` | `--color-ink-deep` | Darker navy for gradient depth and scene backdrops |
| Ink Soft | `#0f5178` | `--color-ink-soft` | Lifted blue for hovers on dark surfaces |
| Brand Blue | `#009edf` | `--color-signal` | The single high-energy accent (from the logo) — marquee strip, hotspots, micro-accents |
| Brand Blue Deep | `#0086c0` | `--color-signal-deep` | Hover/press state for the brand blue |
| Bone | `#f3efe4` | `--color-bone` | Page canvas — warm off-white, never pure white |
| Bone 2 | `#eae5d6` | `--color-bone-2` | Slightly deeper canvas band (stats, trust strip) |
| Pure White | `#ffffff` | `--color-white` | Card surfaces, input fills, button text |
| Charcoal | `#1c1b18` | `--color-charcoal` | Primary body text and headings on light |
| Graphite | `#3a3833` | `--color-graphite` | Secondary text, borders |
| Pewter | `#6f6c63` | `--color-pewter` | Muted helper / tertiary text |
| Slate Tile | `#c4d6dd` | `--tile-slate` | Quilted pastel — soft slate blue (screens / sky) |
| Sand Tile | `#f4ddbf` | `--tile-sand` | Quilted pastel — warm sand |
| Sage Tile | `#dfe5d1` | `--tile-sage` | Quilted pastel — muted sage |
| Stone Tile | `#e8e4d7` | `--tile-stone` | Quilted pastel — pale stone |
| Clay Tile | `#eccdb2` | `--tile-clay` | Quilted pastel — soft terracotta |
| Line | `#cfcbb9` | `--color-line` | Subtle borders, dividers, input outlines |

---

## Tokens — Typography

### Fraunces — Editorial display serif
Replaces Arva's *Reckless*. At the light weight (300) and large sizes (44–80px) it feels literary and unhurried; at 400–500 it becomes section anchors. Used for headlines, pull-quotes, testimonial quotes, and stat figures. **Never below 24px and never for body copy.**
- **Weights:** 300, 400, 500, 600 (plus italic 300/400)
- **Role sizes:** 24px (subheading) → 80px (display)
- **Letter spacing:** −0.012 to −0.015em at display sizes

### Inter — Functional sans
Handles everything below 24px: nav, body, captions, labels, buttons, benefit headings. Negative tracking tightens larger sizes; the default body tracking is a subtle −0.011em.
- **Weights:** 300, 400, 500, 600, 700
- **Role sizes:** 12px (caption) → 17px (lead)

### Type scale (tokens in `css/styles.css`)

| Role | Token | Size |
|------|-------|------|
| caption | `--text-caption` | 12px |
| body-sm | `--text-body-sm` | 14px |
| body | `--text-body` | 16px |
| lead | `--text-body-lg` | 17px |
| subheading | `--text-subheading` | 24px |
| heading-sm | `--text-heading-sm` | ~28–37px (fluid) |
| heading | `--text-heading` | ~32–45px (fluid) |
| heading-lg | `--text-heading-lg` | ~40–57px (fluid) |
| display | `--text-display` | ~44–80px (fluid) |

All large sizes use `clamp()` so they scale fluidly between mobile and desktop.

---

## Tokens — Shape & Layout

**Density:** comfortable · **Page max-width:** 1200px · **Section gap:** fluid 4–7rem

### Border radius — the pill signature
| Element | Value | Token |
|---------|-------|-------|
| cards | 20px | `--radius-card` |
| large cards / panels | 30px | `--radius-card-lg` |
| inputs | 33px | `--radius-input` |
| buttons | 100px | `--radius-pill` |
| nav pills | 110px | `--radius-nav` |

Radii are deliberately oversized. There are no sharp 90° corners on interactive surfaces — the pill is the dominant shape and signals *approachable, not corporate*.

---

## Components

- **Pill CTA (navy filled)** — primary action. `--color-ink` bg, white text, 100px radius.
- **Pill accent (brand blue)** — high-emphasis CTA. `--color-signal` bg, ink text.
- **Pill ghost / ghost-light** — secondary action. Transparent, 1px border.
- **Marquee strip** — full-bleed brand-blue bar above the header, scrolling capabilities separated by checkmark glyphs. The single high-energy accent.
- **Navy header** — sticky deep-navy bar, "KG" monogram (blue G) + MEDIAWORKS wordmark with a "360° Virtual Tours" tagline set in Montserrat (`--font-logo`), Inter nav links, white "Book a Shoot" pill.
- **Full-bleed hero** — layered gradient "scene" backdrop + 360° badge + pulsing hotspots, centered/left serif headline at display size, two pills, scroll cue.
- **Quilted service cards** — rotating pastel tiles (slate → sand → sage → clay → stone → ink) in a 3-col grid, icon chip + serif heading + text-link.
- **Portfolio grid** — masonry-style navy tour tiles with gradient overlay, category, serif title, and a glass play button that turns brand blue on hover.
- **Navy interstitial band** — dark navy section with brand-blue radial glow, used for Process (numbered steps) and Benefits (2×2 grid).
- **Testimonial quilt** — 3 pastel cards, brand-blue stars, serif blockquote, initial-avatar + name/role.
- **Stat band** — serif figures in navy on a bone-2 strip.
- **CTA panel** — rounded navy panel over a twilight scene with centered headline and pills.
- **Contact form** — white card, 33px pill inputs, navy focus ring.
- **Navy footer** — multi-column links, brand-blue section labels, social pills.

---

## Imagery

The system is built to be **photography-forward** — full-bleed interiors, architecture, and on-location space photography do the heavy visual lifting. Because the starter ships with **no bundled photos**, each media slot renders a self-contained CSS/SVG "scene": layered navy/blue gradients suggesting light in a space, a faint perspective grid reading as architecture, subtle film grain, and virtual-tour UI cues (a `360°` badge, pulsing brand-blue hotspots, panorama frame brackets).

**Swap these for real tour photography** by replacing the `<div class="media">…</div>` scene blocks with `<img src="assets/your-photo.jpg" alt="…">`. Photos should be warm-toned, naturalistic, and high-resolution — real spaces, no heavy filters or overlaid text boxes.

---

## Do's and Don'ts

**Do**
- Use `--color-bone` as the canvas on every light section — never pure `#ffffff` as the base.
- Apply the 100px pill radius to every button regardless of variant.
- Pair Fraunces (serif) at 45–80px for headlines with Inter (sans) at 14–17px for body.
- Let the brand blue appear only on the marquee, hotspots, and small accents — it earns attention through scarcity.
- Rotate the five pastel tiles within a single row like a quilt, not randomly.
- Fill nav, bands, and footer solid navy — the deep-navy bands are the structural backbone.

**Don't**
- Don't use `#ffffff` as the page background.
- Don't apply small radii (4–8px) to buttons or cards.
- Don't introduce new saturated colors beyond ocean navy and the brand blue.
- Don't use Fraunces below 24px or for body copy.
- Don't rely on box-shadows for card depth — depth comes from surface-color shifts (shadows are used only lightly on the sticky header and focus rings).
- Don't center supporting body paragraphs — headlines and hero copy may center; body reads left-aligned at ≤60ch.

---

## Quick reference

```
text:                 #1c1b18
background (canvas):   #f3efe4
card surface:         #ffffff
border:               #cfcbb9
brand accent:         #08324e
promotional highlight: #009edf
```

All tokens live in `:root` at the top of `css/styles.css` — change the palette there and the whole site re-themes.
