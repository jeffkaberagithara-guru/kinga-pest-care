# AGENTS.md — working notes for this repository

Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript. Marketing site for a pest
management business.

## Commands

```bash
npm run dev              # dev server
npm run build            # production build
npm start                # serve production build
npm run lint             # eslint
npm run typecheck        # tsc --noEmit
npm test                 # vitest
npm run audit:contrast   # WCAG contrast check from tokens
npm run og               # regenerate public/og-cover.png
npm run verify           # lint + typecheck + test + contrast (run before finishing)
```

## Conventions

- Tailwind v4 with `@theme` tokens in `app/globals.css`. **No raw hex in components** — use
  semantic classes (`bg-primary`, `text-muted`, `border-border`, etc.).
- Class names via `lib/cn.ts` (no clsx).
- Business facts live in `config/site.ts` and are env-overridable. **Never invent** phone
  numbers, credentials, testimonials, statistics or reviews. Unknown facts = configuration.
- Services: `config/services.ts`. FAQs: `config/faqs.ts`. Testimonials: `data/testimonials.ts`
  (empty by design).
- Validation is shared by client and server via `lib/validation.ts`.
- Any colour change must keep `npm run audit:contrast` green (min 4.5:1; 7:1 for body).
- Respect `prefers-reduced-motion`; motion durations stay ≤ 620ms.
- `next.config.ts` holds the CSP and security headers; keep the CSP tight (no new third-party
  origins without updating it and the README).

## Before finishing work

Run `npm run verify` and `npm run build`, and keep `README.md` / `DESIGN.md` accurate. See
README **Confirm before launch** for the business-supplied items still outstanding.
