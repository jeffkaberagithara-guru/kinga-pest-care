# KINGA PEST CARE — Design System & Reference Lock

> Authority: this file is the source of truth for visual and interaction decisions.
> Tokens here must match `app/globals.css`. Components consume semantic tokens only —
> no raw hex in JSX.

---

## 1. Design reference lock

Research was carried out before implementation across Awwwards (motion & photography),
Godly (art direction), SiteInspire (grid/typography), Refero (real UI patterns and forms),
Lapa Ninja (landing structure), Mobbin (mobile interaction) and Behance (identity).
Access to Refero/Figma was not required; publicly accessible references were used.

### 1.1 Primary visual direction — "Living Shield"

Protection expressed through **healthy living spaces**, **professional expertise** and
**nature-inspired design** — not through frightening insects, pesticide clouds or the
blue-and-red pest-control template. Editorial minimalism with warm botanical colour, large
but disciplined type, photography-led composition, and a small amount of technical detail
(contour lines, specimen numbers, hairline rules).

**Brand personality:** calm, precise, warm, trustworthy. We sound like a careful professional
who explains the plan, not a company that frightens you into booking.

### 1.2 What is adapted from each source (and what is not)

| Source                | Adapted                                                                                       | Deliberately not taken                                             |
| --------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Awwwards (animations) | Entrances capped at 620 ms, one hero reveal, staggered section items, restrained hover polish | Cursor trails, scroll-jacking, full-screen transitions, preloaders |
| Godly                 | Asymmetric hero (7/5), one dominant editorial image panel, confident type scale               | Trend-chasing effects, decorative 3D                               |
| SiteInspire           | Generous whitespace, hairline dividers, mixed open sections over uniform cards                | Strict minimalism that hides the CTA                               |
| Refero                | Form field order, inline validation, radio-as-segmented-control, honest success/error states  | Dashboard-like complexity                                          |
| Lapa Ninja            | One primary + one secondary CTA above the fold, single-purpose sections                       | Countdowns, fake urgency, badge stacking                           |
| Mobbin                | Persistent mobile Call/WhatsApp/Request bar, 44px+ targets, no hover-dependent info           | Hamburger-only navigation without a visible action bar             |
| Behance               | Shield-as-leaf mark, Swahili voice, earthy palette                                            | National-flag clichés, cartoon mascots                             |

The rule: a strong single direction (Living Shield) with other references used only to
sharpen details — never an average of unrelated styles.

### 1.3 Rejected patterns (enforced in §14)

Generic AI/SaaS styling, gradient text, floating blobs/orbs, glassmorphism panels over
photography, uniform three-card rows, emoji icons, radius inflation, parallax everywhere,
ambient looping animation, fake statistics/testimonials/certifications.

---

## 2. Brand

| Property     | Value                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| Name         | KINGA Pest Care (configurable)                                               |
| Wordmark     | `KINGA` — Manrope 800, `-0.02em`                                             |
| Descriptor   | `PEST CARE` — tracked uppercase caption                                      |
| Mark         | Shield whose interior is a leaf ("Living Shield"); forest body, citron veins |
| Tagline (SW) | Ulinzi wa makazi. Utulivu wa moyo.                                           |
| Tagline (EN) | Protection for your home. Peace of mind.                                     |

The mark is drawn with plain shapes so it stays legible at 16px and reads on light or dark
backgrounds. Standalone assets: `app/icon.svg` (favicon), `public/logo-mark.svg`,
`public/logo-mark-light.svg`.

> **Trademark caution.** "KINGA Pest Care" is a proposed name, not a verified or registered
> mark. Complete a KIPI trademark search before investing in print, vehicle branding or
> signage. Nothing here registers or claims any mark.

---

## 3. Colour

Semantic tokens only. Raw hex is forbidden in components.

| Token                    | Value     | Role                                               |
| ------------------------ | --------- | -------------------------------------------------- |
| `--color-primary`        | `#153e32` | Forest — brand surfaces, primary text, interactive |
| `--color-primary-hover`  | `#103028` | Primary hover/active                               |
| `--color-primary-strong` | `#0c251f` | Deep forest — footer, mobile menu, announcement    |
| `--color-primary-soft`   | `#e4ede2` | Sage tint — icon wells, quiet panels               |
| `--color-accent`         | `#d9f36a` | Electric citron — primary CTA fill only            |
| `--color-accent-hover`   | `#c9e751` | CTA hover                                          |
| `--color-accent-ink`     | `#18241f` | Text **on** citron (12.95:1)                       |
| `--color-accent-deep`    | `#4e6b14` | Citron-family used **as text** on ivory (5.59:1)   |
| `--color-accent-on-dark` | `#d9f36a` | Citron on forest (9.61:1)                          |
| `--color-clay`           | `#b76445` | Warmth — small editorial detail, number accents    |
| `--color-clay-deep`      | `#8f4a32` | Clay used **as text** on ivory (6.02:1)            |
| `--color-background`     | `#f6f5ee` | Warm ivory canvas                                  |
| `--color-surface`        | `#ffffff` | Cards, form fields, raised panels                  |
| `--color-surface-2`      | `#e4ede2` | Soft sage section bands                            |
| `--color-surface-3`      | `#efeee4` | Quiet ivory band / note panels                     |
| `--color-text`           | `#18241f` | Dark ink                                           |
| `--color-text-secondary` | `#3c4a42` | Body secondary                                     |
| `--color-muted`          | `#5c685f` | Captions, helper text                              |
| `--color-border`         | `#dde4da` | Default hairline                                   |
| `--color-border-strong`  | `#c2ccc0` | Emphasised hairline, input borders                 |
| `--color-success`        | `#1f6b4a` | Success                                            |
| `--color-danger`         | `#a4232b` | Errors                                             |
| `--color-focus`          | `#153e32` | Focus ring on light surfaces                       |

### Usage rules

1. **Citron is a fill, not body text.** `accent` fills the single highest-value CTA. On
   forest surfaces citron is text-safe (`accent-on-dark`). As text on ivory, use
   `accent-deep` — never raw citron (fails contrast).
2. **One citron CTA per view.** Never two competing accent buttons.
3. **Forest carries trust and is the default interactive colour.**
4. **Clay is a spice, not a sauce.** Small numbers, markers and eyebrow labels only.
5. **Hairlines and soft radii over heavy shadows.** Depth is gentle and natural.
6. **Verified contrast** — computed by `scripts/audit-contrast.mjs` from `globals.css`:
   body ≥ 7:1, secondary ≥ 4.5:1, muted ≥ 4.5:1, ink on citron 12.95:1, white on forest
   11.88:1, citron on forest 9.61:1. 18/18 pairs pass.

---

## 4. Typography

Two families, both self-hosted via `next/font` — no external font request, so the CSP needs
no font host allowance.

| Role                          | Family      | Setting                              |
| ----------------------------- | ----------- | ------------------------------------ |
| Display / headings / wordmark | **Manrope** | geometric humanist; warm but precise |
| Body / UI / nav / forms       | **DM Sans** | highly legible at small sizes        |

### 4.1 Scale

| Token            | Font    | Size / line                              | Weight | Tracking           |
| ---------------- | ------- | ---------------------------------------- | ------ | ------------------ |
| `--text-display` | Manrope | `clamp(2.5rem, 5.4vw, 4.5rem)` / `0.98`  | 800    | `-0.03em`          |
| `--text-h1`      | Manrope | `clamp(1.9rem, 3.1vw, 2.75rem)` / `1.08` | 750    | `-0.025em`         |
| `--text-h2`      | Manrope | `clamp(1.5rem, 2.3vw, 2.05rem)` / `1.15` | 700    | `-0.02em`          |
| `--text-h3`      | Manrope | `1.1875rem` / `1.32`                     | 650    | `-0.01em`          |
| `--text-body`    | DM Sans | `1rem` / `1.65`                          | 400    | `0`                |
| `--text-body-lg` | DM Sans | `1.0625rem` / `1.7`                      | 400    | `0`                |
| `--text-small`   | DM Sans | `0.875rem` / `1.55`                      | 400    | `0`                |
| `--text-caption` | DM Sans | `0.6875rem` / `1.4`                      | 600    | `0.16em` uppercase |

Body line length is capped with `max-w-2xl`/`max-w-3xl`; base text never drops below 16px on
mobile. The display size is intentionally large but bounded so services are reachable without
scrolling the whole hero.

---

## 5. Spacing, grid & breakpoints

4px base scale. Section rhythm alternates `--spacing-section` (mobile `4rem` → desktop `7rem`)
with tighter `--spacing-section-sm` so sections do not read as uniform.

- Container: `--container-site: 78rem`; gutter `clamp(1rem, 4vw, 2.5rem)`.
- Desktop grid: 12 columns; content grids use **asymmetric spans** (7/5, 5/7) over uniform thirds.
- Breakpoints: `xs 360`, `sm 640`, `md 768`, `lg 1024`, `xl 1280`.
- Verified widths: 360, 390, 768, 1024, 1440, 1920.

---

## 6. Radius, border, shadow

| Token            | Value   | Use                              |
| ---------------- | ------- | -------------------------------- |
| `--radius-xs`    | `4px`   | Inputs, small controls           |
| `--radius-sm`    | `8px`   | Icon wells, compact buttons      |
| `--radius-card`  | `14px`  | Cards, notes                     |
| `--radius-panel` | `20px`  | Feature panels, form, hero panel |
| `--radius-pill`  | `999px` | Buttons, chips, mobile actions   |

| Shadow             | Use             |
| ------------------ | --------------- |
| `--shadow-lift`    | Card hover lift |
| `--shadow-panel`   | Hero panel      |
| `--shadow-overlay` | Dialogs         |

Soft, low-opacity, forest-tinted. Never a coloured glow.

---

## 7. Iconography

Lucide React, and only where it carries meaning. Service icons carry meaning (the pest or
context). Icons are never decorative padding beside every sentence. Permitted set: the
service-icon map (`Bug`, `TreePine`, `BedDouble`, `Rat`, `Waves`, `Footprints`, `Home`,
`Building2`) plus `Menu`, `X`, `Phone`, `MessageCircle`, `Mail`, `MapPin`, `Clock`,
`ArrowRight`, `ArrowUpRight`, `ArrowLeft`, `Check`, `X`, `ChevronDown`, `ChevronRight`,
`ShieldCheck`, `ClipboardCheck`, `ClipboardList`, `FileText`, `Info`, `AlertTriangle`,
`Loader2`.

---

## 8. Components

| Component           | Behaviour                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `AnnouncementBar`   | Compact forest strip; message shortens on mobile; action hidden < 640px                                                      |
| `Navbar`            | Sticky, translucent ivory, hairline on scroll; centered links with active marker; phone + CTA on `lg`; menu button on mobile |
| `MobileMenu`        | Right panel `min(22rem,100vw)`; `role=dialog`, focus trap, `Esc`, scroll lock, focus restore, closes on navigation           |
| `MobileActionBar`   | Persistent Call / WhatsApp / Request bar under 768px; content reserves bottom space                                          |
| `Logo` / `LogoMark` | Shield-leaf lockup; light/dark tones                                                                                         |
| `Hero`              | 7/5 asymmetric; staggered text entrance; editorial photo panel (portrait 4/5 crop)                                           |
| `TrustStrip`        | Four process commitments, not credentials; top hairline per item                                                             |
| `ServiceTile`       | Single-link tile; icon well turns citron on hover; lift removed under reduced motion                                         |
| `Process`           | 5/7 editorial; numbered steps under a left heading                                                                           |
| `StepList`          | Shared numbered editorial list (specimen numbers + hairlines) used by home, about and service pages; reveal-staggered        |
| `Safety`            | Sage band; honest prep/re-entry messaging + PCPB note                                                                        |
| `Contexts`          | Residential vs commercial image panels                                                                                       |
| `Testimonials`      | Renders **nothing** while `data/testimonials.ts` is empty; quote cards appear only once real, authorised reviews are added   |
| `FaqAccordion`      | Button + labelled region, `aria-expanded`, animated height, reduced-motion aware                                             |
| `ContactForm`       | Full validation, error summary, loading/disabled, honeypot, success/error/not-configured states                              |
| `Footer`            | Deep forest; services, company, real contact details, regulator note                                                         |

---

## 9. Motion

| Token               | Value                               | Use                         |
| ------------------- | ----------------------------------- | --------------------------- |
| `--motion-fast`     | `150ms`                             | Button feedback, icon nudge |
| `--motion-standard` | `220ms`                             | Hover, fades, image scale   |
| `--motion-emphasis` | `380ms`                             | Mobile menu                 |
| `--motion-entrance` | `620ms`                             | Hero reveal                 |
| `--ease-out`        | `cubic-bezier(0.22, 0.61, 0.36, 1)` | Default                     |
| `--ease-inout`      | `cubic-bezier(0.65, 0, 0.35, 1)`    | Two-state                   |
| `--ease-spring`     | `cubic-bezier(0.34, 1.28, 0.64, 1)` | Low-amplitude accents       |

- Section reveals: `whileInView` opacity + 14px rise, once, 70ms stagger, 550ms.
- **No parallax, no scroll-jacking, no ambient loops, nothing above 620ms.** Motion never
  delays an interaction.
- `prefers-reduced-motion: reduce` collapses everything to opacity or instant state change;
  hover transforms and image zooms are removed; functionality is identical.

---

## 10. Responsive rules

- Mobile-first; desktop is composed, not stretched.
- No horizontal overflow at any width ≥ 360px; `overflow-x: clip` on body as a backstop.
- Touch targets ≥ 44px under 768px (nav links 36px height but with adequate spacing; primary
  controls are 44–52px).
- Hero: text first, then the forest panel; panel keeps a 4/5 crop.
- Base body text never below 16px on mobile.

---

## 11. Accessibility rules

- Landmarks `header`/`nav`/`main`/`footer`; one `h1` per page; no skipped heading levels.
- Real `<button>`/`<a>` everywhere; no `div onclick`.
- Visible focus via `:focus-visible` (forest on light; citron inside `.on-dark`). Never removed.
- Form: labelled inputs, `aria-invalid`, `aria-describedby` to inline errors, a focusable
  `role="alert"` error summary, and `role="status"` success.
- Dialog: `role="dialog"`, `aria-modal`, focus trap, focus restore, `Esc`.
- Colour is never the sole carrier of state (radio chips show a filled border + text).
- Verified contrast by script (§3).
- `prefers-reduced-motion` honoured globally.

---

## 12. Imagery rules

- Photographs of the actual company, team, equipment and completed work are preferred and
  should replace the placeholders before launch.
- Until then, imagery is **licensed stock** (Pexels License) chosen to be clean and
  non-alarming, plus original vector/SVG work for the logo, favicon and social card. Stock is
  clearly illustrative — not a photograph of this business — and is never presented as proof
  of work, credentials or results. Every asset is registered with its source, author and
  licence in `config/media.ts` and README.md.
- No frightening pest close-ups, pesticide clouds, misleading before/after, or imagery
  implying treatment is harmless.
- The one video is a muted, decorative ambient clip used only in the "Our promise" band. It is
  mounted client-side on ≥768px screens and skipped entirely under `prefers-reduced-motion`;
  the still poster is the default and the fallback. It has no audio and no controls and is
  `aria-hidden`.
- All imagery ships with explicit dimensions to prevent layout shift; decorative media is
  `aria-hidden`; meaningful images carry descriptive alt text.

---

## 13. Anti-AI design rules (enforced)

1. No gradient text; no purple/blue "AI" gradient anywhere.
2. No decorative blobs, orbs or floating shapes (contour rings are a deliberate, brand-native
   texture, used sparingly).
3. No glassmorphism panels over photography.
4. Asymmetry must have a content reason.
5. Icons only where they carry meaning.
6. No fake statistics, testimonials, customer logos or guarantees.
7. Motion never exceeds 620ms; UI motion never loops (the single ambient band video is the
   only exception — muted, reduced-motion-aware and desktop-only; see §12).
8. Citron stays a small fraction of any viewport.
9. No component ships with untouched library defaults.
10. No placeholders in prose ("Lorem ipsum", "Company Name"); unknown business facts are
    marked as configuration required, not invented.

---

## 14. Data & configuration architecture

- Business details live in `config/site.ts` (env-overridable). The phone/WhatsApp default is
  the real business line supplied by the company; no other credential is fabricated in source.
- Services live in `config/services.ts`; FAQs in `config/faqs.ts`; process in `config/process.ts`.
- Testimonials live in `data/testimonials.ts` and are **empty** until real, authorised reviews
  are supplied — the UI renders nothing from an empty list.
- Validation shape is shared by client and server (`lib/validation.ts`).

---

## 15. Verification checklist

Script-checked (`npm run verify`):

- [x] Contrast computed from tokens and asserted — `scripts/audit-contrast.mjs` (18/18 pass)
- [x] Type-check clean — `tsc --noEmit`
- [x] Lint clean — `eslint`
- [x] Unit tests for validation, rate limiting, delivery, configuration data and structured data
      — `vitest` (48 pass)
- [x] Production build succeeds for all 19 routes — `next build`
- [ ] Browser layout/overflow and reduced-motion audit at 360→1920px — **manual** (no browser
      automation installed in this environment; see README § Testing for the manual matrix)
- [x] Runtime smoke test: security headers, 422 validation, 503 honest fallback, 404 — via
      `curl` against `next start`
- [ ] Screen-reader walkthrough — **manual**, by inspection the semantics are in place
