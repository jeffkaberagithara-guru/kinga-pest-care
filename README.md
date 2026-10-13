# KINGA Pest Care — website

A production-minded marketing website for a professional fumigation and pest-management
business. Editorial art direction ("Living Shield"), honest treatment messaging, an accessible
inspection-request form with real server-side handling, and strong defaults for SEO, security,
performance and accessibility.

> The company name, logo, phone, WhatsApp number, email, service area, hours and regulatory
> registration are **all configuration**. The phone/WhatsApp line (+254 707 764 281) is the
> real business number supplied by the company and is used as the default; the email, address,
> hours and registration are clearly-marked placeholders. Nothing in this repository invents a
> credential, a testimonial or a business fact.

---

## Stack

| Concern    | Choice                                          | Version |
| ---------- | ----------------------------------------------- | ------- |
| Framework  | Next.js (App Router, Turbopack)                 | 16.4    |
| UI         | React                                           | 19.3    |
| Language   | TypeScript (strict, `noUncheckedIndexedAccess`) | 5.9     |
| Styling    | Tailwind CSS v4 (`@theme` tokens)               | 4.3     |
| Motion     | Motion for React                                | 14.1    |
| Icons      | Lucide React                                    | 1.55    |
| Validation | Zod                                             | 3.25    |
| Tests      | Vitest                                          | 5.0     |
| Images     | sharp (OG raster)                               | 0.35    |

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit .env.local
npm run dev                  # http://localhost:3000
```

Scripts:

| Command                  | Purpose                                       |
| ------------------------ | --------------------------------------------- |
| `npm run dev`            | Development server                            |
| `npm run build`          | Production build                              |
| `npm start`              | Serve the production build                    |
| `npm run lint`           | ESLint                                        |
| `npm run typecheck`      | `tsc --noEmit`                                |
| `npm test`               | Vitest unit tests                             |
| `npm run audit:contrast` | Compute WCAG contrast from tokens and assert  |
| `npm run og`             | Regenerate `public/og-cover.png` from the SVG |
| `npm run verify`         | lint + typecheck + test + contrast            |
| `npm run format`         | Prettier                                      |

---

## Configuration

All configuration is environment-based. Public values are prefixed `NEXT_PUBLIC_`; secrets are
**not** and never reach the browser. See `.env.example` for the full annotated list.

**Public (browser-visible):**
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BUSINESS_NAME`, `NEXT_PUBLIC_BUSINESS_WORDMARK`,
`NEXT_PUBLIC_BUSINESS_DESCRIPTOR`, `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_PHONE_DISPLAY`,
`NEXT_PUBLIC_PHONE_HREF`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_ADDRESS_1`,
`NEXT_PUBLIC_ADDRESS_2`, `NEXT_PUBLIC_AREA`, `NEXT_PUBLIC_SERVICE_AREA`, `NEXT_PUBLIC_HOURS`,
`NEXT_PUBLIC_PCPB_LICENCE` (leave empty to publish no registration claim).

The default phone line is the real business number `+254 707 764 281` (E.164
`+254707764281`, WhatsApp `254707764281`) used for every call, urgent/emergency and inspection
route plus WhatsApp. Override any value without code changes via the environment variables
above. The **email default is still a placeholder** — replace `NEXT_PUBLIC_EMAIL` before
launch.

**Server-only secrets:**
`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.

> A dev-only `sr-only` notice is emitted when no phone/email is configured via the environment,
> so a demo build cannot silently pass as a live business.

---

## Confirm before launch

This is the checklist of things only the business can supply. Each is currently a placeholder
or intentionally empty.

1. **Business name, logo and legal name.** Default brand is "KINGA Pest Care".
2. **Phone & WhatsApp.** The real line `+254 707 764 281` is configured (normal, urgent,
   inspection and WhatsApp). Confirm it is current and, if it changes, update
   `config/site.ts` or the environment. Email, address, hours and service coverage are still
   pending.
3. **Services.** `config/services.ts` contains a _typical_ pest-management offering used to
   build the site. Delete anything the business does not provide and add anything it does.
4. **Testimonials.** `data/testimonials.ts` is empty on purpose. Add only real, authorised
   reviews; the section renders nothing until then.
5. **Imagery.** Replace the licensed stock photography and the ambient clip with real
   photographs/video of the company, team, equipment and completed work. Keep
   `config/media.ts` and the asset register below in step.
6. **Credentials / PCPB registration.** Confirm current Pest Control Products Board
   requirements and whether a registration number may be published. Do not publish one until
   verified.
7. **Privacy notice date** (`app/privacy/page.tsx`, `LAST_UPDATED`).
8. **Contact delivery** (below).
9. **Trademark.** "KINGA Pest Care" is a proposed name. Run a KIPI search before investing in
   print/branding.

---

## Contact delivery

The form posts to `app/api/contact/route.ts`, which:

1. rejects non-JSON and oversized bodies,
2. applies a per-IP rate limit (5 requests / 10 min — `lib/rate-limit.ts`),
3. silently discards honeypot submissions,
4. validates on the server with Zod (`lib/validation.ts`),
5. delivers via the **Resend** HTTP API (`lib/contact.ts`).

To enable delivery, set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (and a verified
`CONTACT_FROM_EMAIL`). To use a different provider, replace the `fetch` call in `lib/contact.ts`.

**If delivery is not configured**, the endpoint returns `503` with an honest message, and the
form shows a call/WhatsApp fallback — never a fake success. The form also shows an up-front
notice when it detects delivery is unconfigured.

Rate limiting is in-memory and single-instance. For serverless or multi-instance hosting,
swap `lib/rate-limit.ts` for a shared store (e.g. Upstash Redis).

---

## Media & asset register

Photography and video are licensed stock placeholders, chosen to be clean and non-alarming
(no pest close-ups, no pesticide clouds, no misleading before/after). They are
**illustrative, not proof of this company's work**, and should be replaced with real
photographs of the company, team, equipment and completed work before launch. Every asset is
registered with its source, author and licence in `config/media.ts`; the exact source URLs
live there.

| Asset                                         | Type    | Origin / licence                               | Notes                               |
| --------------------------------------------- | ------- | ---------------------------------------------- | ----------------------------------- |
| `app/icon.svg`                                | SVG     | Original work (this project)                   | Favicon; forest tile + citron mark  |
| `public/logo-mark.svg`                        | SVG     | Original work                                  | Forest mark                         |
| `public/logo-mark-light.svg`                  | SVG     | Original work                                  | Mark for dark surfaces              |
| `public/og-cover.svg` → `public/og-cover.png` | SVG/PNG | Original work                                  | Rasterised via `npm run og` (sharp) |
| `public/img/home-hero.jpg`                    | JPEG    | Pexels — Lisa Anna (photo/19836798)            | Hero image panel                    |
| `public/img/context-residential.jpg`          | JPEG    | Pexels — Beyza Kılıçdere (photo/29012619)      | Residential context panel           |
| `public/img/context-commercial.jpg`           | JPEG    | Pexels — Clément Proust (photo/29649756)       | Commercial context panel            |
| `public/img/about-approach.jpg`               | JPEG    | Pexels — Алан Албегов (photo/27023397)         | About page                          |
| `public/img/svc-cockroach.jpg`                | JPEG    | Pexels — Marcus (photo/18033166)               | Service page photo                  |
| `public/img/svc-termite.jpg`                  | JPEG    | Pexels — Yelena Wegel (photo/17490027)         | Service page photo                  |
| `public/img/svc-bedbug.jpg`                   | JPEG    | Pexels — Екатерина Cтепаненко (photo/19980080) | Service page photo                  |
| `public/img/svc-rodent.jpg`                   | JPEG    | Pexels — ha ha (photo/16211537)                | Service page photo                  |
| `public/img/svc-mosquito.jpg`                 | JPEG    | Pexels — Karen F (photo/17460103)              | Service page photo                  |
| `public/img/svc-ants.jpg`                     | JPEG    | Pexels — Théo Cold (photo/34005910)            | Service page photo                  |
| `public/img/svc-residential.jpg`              | JPEG    | Pexels — Enrique (photo/25972319)              | Service page photo                  |
| `public/img/svc-commercial.jpg`               | JPEG    | Pexels — James L (photo/15177112)              | Service page photo                  |
| `public/media/hero-ambient.mp4`               | MP4     | Pexels (video/11556237)                        | Ambient brand-band loop             |
| `public/media/hero-ambient-poster.jpg`        | JPEG    | Pexels (video/11556237)                        | Video poster + reduced-motion still |

All Pexels assets are used under the **Pexels License** (free for commercial use; attribution
not required). Attribution is recorded here and in `config/media.ts` as good practice. The
previous placeholder vector panels (`public/img/panel-*.svg`) were retired when the real
context photography was added.

### Sourcing real photography and video

When real assets are not yet available, licensed stock may be used — inspect each asset and
confirm its licence before use:

- Pexels — photos and videos (free for commercial use under the Pexels licence).
- Pixabay — photos and videos (Pixabay content licence).
- Unsplash — photos (Unsplash licence; no selling unmodified copies).
- Mixkit — video (check the licence attached to the specific clip).

Requirements for any photo/video you add:

- Prefer authentic company imagery; never present stock as proof of this company's work.
- No frightening pest close-ups, pesticide clouds or misleading before/after images.
- Avoid implying that treatment is harmless under all conditions.
- Keep an entry in the table above with source, author and licence for every asset.

### Video

The site ships with **one** video: a short, muted, decorative clip used in the "Our promise"
ambient band on the home page. It is mounted only on screens ≥768px when
`prefers-reduced-motion` is not set; the still poster is the default and the fallback. It has
no audio and no controls, is `aria-hidden`, and never gates content or the headline.

If you replace it with real footage:

- Use one clip only, muted, looped, inline; serve MP4 (H.264) and optionally WebM (VP9), and
  keep it short and modest in size.
- Provide a poster image and a still-image fallback (the reduced-motion path).
- Do not autoplay under `prefers-reduced-motion`; render the poster instead.
- Update the CSP `media-src` only if you serve media from another origin.

---

## Security

- **Headers** (`next.config.ts`): Content-Security-Policy, `X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options: DENY`, `Cross-Origin-Opener-Policy`,
  `Permissions-Policy`, and HSTS in production.
- **CSP** is tight because the site loads no third parties (self-hosted fonts, local media).
  `script-src`/`style-src` include `'unsafe-inline'` for Next's inline bootstrap/CSS. A
  nonce-based policy is the recommended next hardening step if inline scripts are introduced.
- **Input**: server-side Zod validation; no `dangerouslySetInnerHTML` on user data (the only
  use is controlled JSON-LD, with `<` escaped).
- **Abuse**: per-IP rate limiting + honeypot.
- **Secrets**: server-only env vars; `.env*` is git-ignored. Never commit a filled `.env.local`.
- **Errors**: API responses never include stack traces or secrets.
- **Privacy**: the form collects only what is needed; no tracking cookies or analytics; the
  privacy notice matches the implementation.

---

## Accessibility

Targets WCAG 2.2 AA. Implemented: semantic landmarks, one `h1` per page, real interactive
elements, visible focus (forest on light, citron on forest), labelled form controls with
`aria-invalid`/`aria-describedby`, a focusable `role="alert"` error summary, `role="status"`
success, focus-trapped mobile dialog with `Esc` and focus restore, a route announcer,
44px+ mobile targets, reduced-motion support, and a script-verified colour system.
Automated checks do not replace manual keyboard and screen-reader testing.

---

## SEO

- Per-page `title`/`description` and canonicals; Open Graph + Twitter cards (`/og-cover.png`).
- `app/sitemap.ts` and `app/robots.ts` (`/api/` disallowed).
- JSON-LD: `Organization` + `WebSite` always; `LocalBusiness` (telephone, address, service
  offers) **only** when real values are supplied via env. No review schema — no verified
  reviews exist. No fake locations.
- No search-ranking guarantees are made anywhere.

---

## Testing

Commands run and their results:

| Check                        | Command                  | Result                         |
| ---------------------------- | ------------------------ | ------------------------------ |
| Production build (19 routes) | `npm run build`          | ✅ pass                        |
| Type check                   | `npm run typecheck`      | ✅ pass                        |
| Lint                         | `npm run lint`           | ✅ pass (0 errors, 0 warnings) |
| Unit tests (validation)      | `npm test`               | ✅ 8/8 pass                    |
| Contrast audit               | `npm run audit:contrast` | ✅ 18/18 pass                  |
| Runtime smoke test           | `curl` vs `next start`   | ✅ see below                   |

Runtime smoke test verified: CSP and security headers present; `POST /api/contact` returns
`503 not_configured` when unconfigured (with fallback message); returns `422` with per-field
errors for invalid input; `/`, `/services/<slug>`, `/privacy` return `200`; unknown routes
return `404`.

**Not automated here (no browser automation installed):** cross-width overflow, touch-target
sizing, reduced-motion rendering and screen-reader flow. A manual matrix is provided below and
should be run before release.

### Manual test matrix

- Widths: 360, 390, 768, 1024, 1440, 1920 — no horizontal scroll, hero copy not clipped.
- Keyboard: Tab through header, mobile menu (open → trap → `Esc` → focus returns), form,
  and the FAQ accordion.
- Reduced motion (OS setting): no transforms/animation; all content visible.
- Form: submit empty (errors + focus), invalid phone, missing consent, valid submission
  (success), disabled/loading state, duplicate-submit protection, server error path.
- Links: header/nav/anchors, `tel:` and `wa.me` links, footer links, external links.
- Media fallback: images load; layout stable with media blocked.

---

## Deployment (Vercel)

1. Import the repository into Vercel; the framework is auto-detected.
2. Add the environment variables from `.env.example` in **Project → Settings → Environment
   Variables** (Production and Preview). Set `NEXT_PUBLIC_SITE_URL` to the production domain.
   Add the server-only Resend secrets. Never paste secrets into source.
3. Build command `next build`; output is standard Next.js.
4. After deploy, verify the security headers and that the contact form delivers.

Any Node.js host works; the app uses the Node runtime for the API route and `sharp` for the
optimiser.

---

## Project structure

```
app/
  layout.tsx            Fonts, metadata, header/footer, structured data
  page.tsx              Home
  services/page.tsx     Services index
  services/[slug]/      Service detail (SSG per service)
  about/ contact/ faq/ privacy/
  api/contact/route.ts  Server validation + rate limit + delivery
  sitemap.ts robots.ts not-found.tsx icon.svg globals.css
components/
  home/                 hero, trust-strip, services-overview, process,
                        ambient-band, safety, contexts, faq-section,
                        request-section
  contact/contact-form.tsx
  ui/                   button, section-heading, service-tile, service-icon,
                        step-list, faq-accordion, safety-note, page-header,
                        breadcrumbs, footer, reveal
  seo/structured-data.tsx
  logo.tsx navbar.tsx mobile-menu.tsx mobile-action-bar.tsx
  announcement-bar.tsx route-announcer.tsx
config/                 site.ts, services.ts, faqs.ts, process.ts, nav.ts, media.ts
data/testimonials.ts    Empty by design
lib/                    cn.ts, validation.ts, rate-limit.ts, contact.ts
scripts/                audit-contrast.mjs, generate-og.mjs
public/                 logo SVGs, og-cover.*, img/*.jpg, media/*
DESIGN.md               Design system & reference lock
.env.example            Placeholder environment values
```

---

## Known limitations / follow-ups

- Photography and video are licensed stock placeholders (Pexels License) — replace with real
  company imagery before launch.
- The ambient band video autoplays (muted) on ≥768px screens only; the poster still is shown
  for reduced-motion users and small screens.
- Testimonials section is intentionally empty.
- Contact delivery requires a Resend key; otherwise the honest fallback is shown.
- Rate limiting is per-instance; move to a shared store when scaling.
- CSP could move to a nonce-based `script-src` if inline scripts are ever added.
- Browser-based layout/reduced-motion/screen-reader audits are manual (not run here).
