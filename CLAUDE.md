# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repository.

**Most files here carry a header comment explaining why they are built the way
they are.** This file is the map — what lives where, and the contracts that span
files. Read the file itself before changing it; the rationale is there, in full,
and this file deliberately does not duplicate it.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Build to /docs for GitHub Pages
npm run preview   # Preview production build locally
```

`build` emits a complete, deployable `/docs` — including `404.html`, `CNAME`,
and `favicon.png`, copied verbatim from `public/`. There is no second deploy
step.

No lint or test scripts are configured.

## Stack & deployment

Vue 3 · Vue Router 4 · Vite 6 · SCSS. No state library, no HTTP client, no icon
set — the site is four static pages over one animated canvas.

Output goes to `/docs` (set in `vite.config.js`), served by GitHub Pages at
melonade.me with hash routing (`createWebHashHistory`).

## Invariants

Deliberate decisions that each fixed a real bug. Changing one regresses it.

- **No route transition** on `PortfolioLayout`'s `<router-view>`. The entrance
  is `PageShell`'s `fadeUp`; a `mode="out-in"` wrapper serializes the swap into
  a dead gap on every navigation.
- **`public/404.html` stays a redirect stub**, never a copy of `index.html` —
  `createWebHashHistory` would take the bad path as its base and nest every
  route under it for the session.
- **Routes are statically imported**, not lazy. Vue Router awaits an async
  component before confirming navigation, so splitting these five puts a network
  round-trip in front of the first click to each route.
- **The theme script in `index.html` stays inline, in `<head>`, above every
  stylesheet.** It is the only thing between a light-mode visitor and a dark
  flash, and it is why no stylesheet contains a `prefers-color-scheme` block.
- **`BlurVeil` is one masked layer** — blur only, no tint. Stacked layers
  compound their radii; a tint darkens what should read as clear glass.
- **Nothing that must cross-fade is painted as a gradient of the ink.**
  `background-image` cannot be transitioned, so it would snap ahead of the
  ground during a theme swap.
- **Every color is one token.** Where a surface needs an alpha, it derives the
  channels with relative color syntax — `rgb(from var(--bg) r g b / …)` — never
  a parallel `--bg-rgb` token. Floor: Chrome 119+ / Safari 16.4+ / Firefox 128+,
  no fallback.
- **`--clock-accent` must stay opaque.** `ClockField`'s cursor highlight scales
  it with `ctx.globalAlpha`, and an alpha in the token would multiply into that.
- **Reduced motion is a blanket `animation: none !important`** in
  `portfolio.scss`, so it does **not** reach a `transition`. Anything animating
  with one guards itself in JS — see `useTheme.js:49`.

## Code map

### Routing

`src/router/routes.js` — one layout route at `/` with four children:

| Name | Path | Component |
|---|---|---|
| `Landing` | `/` | `PortfolioLanding.vue` |
| `Work` | `/work` | `PortfolioWork.vue` |
| `About` | `/about` | `PortfolioAbout.vue` |
| `Contact` | `/contact` | `PortfolioContact.vue` |

Anything unmatched redirects to `/`.

`src/router/index.js` — an `afterEach` hook setting `document.title` from
`meta.title` and injecting `meta.metaTags`, tagged `data-vue-router-controlled`
so the next navigation can remove them. Crawlers don't run this, so `index.html`
also carries static title, description, and OG tags for the landing page.

### Components

All under `src/components/portfolio/`. `PortfolioLayout.vue` sits at the root;
`shared/` holds the chrome, `content/` holds the four pages.

Stacking: canvas `0` < `<main>` `5` < blur veils `9` < nav and footer `10`.
Both bars are pinned to the viewport and the page scrolls between them, so
`PageShell`'s padding is what keeps content clear of them.

- `PortfolioLayout.vue` — the layout route. Imports `portfolio.scss`, calls
  `initTheme()` once, renders a bare `<clock-field />`.

`shared/`:

- `PortfolioNav.vue` — fixed top bar, plus its `<blur-veil edge="top" />`.
- `PortfolioFooter.vue` — fixed bottom bar and `<blur-veil edge="bottom" />`. A
  three-column grid: `ThemeToggle`, `socialLinks` icons, `© <year>`. Renders on
  every route — Contact drops only the marks, never the bar, so `PageShell`'s
  bottom clearance is the same on all four pages.
- `BlurVeil.vue` — the progressive blur behind a pinned bar, on an `edge` prop
  (`top` / `bottom`). Its header comment covers the constraints; read it before
  touching the mask or the geometry tokens.
- `ThemeToggle.vue` — the light/dark button. Two-state: each icon shows the
  theme a click would take you to, which is what its `aria-label` names.
- `SocialIcon.vue` — inline SVG marks (`github`, `linkedin`, `email`) on a
  `name` prop. There is no icon dependency; all take `currentColor`.
- `ClockField.vue` — full-viewport canvas of clock faces. Cycles five
  choreography patterns on a `requestAnimationFrame` loop and bends hands near
  the cursor. Props: `gridSpacing`, `motion` (`still` / `calm` / `lively`).
  Colors are **not** props — see Theme contract below. Honors
  `prefers-reduced-motion`.
- `clockMath.js` — `blendAngle`, `easeInOut`.
- `PageShell.vue` — the wrapper every page renders as its root. Owns the page
  padding, the `fadeUp` entrance, and the scrim behind the copy. Props:
  `maxWidth` (default `760px`; pass `none` when children set their own),
  `centered` (Landing's full-height geometry, no wrapper animation). Slotted
  content sits at `z-index: 1`, so pages never need z-index of their own. The
  scrim's construction is explained in the file.

`content/` — the four pages, each rendering `<page-shell>` as its root. Their
scoped styles reach slotted markup because Vue stamps the parent's scope id on
it. `PortfolioWork.vue` and `PortfolioAbout.vue` are fully data-driven: add a
project or a skill group to `src/data/`, never to markup.

### Styling

- `src/assets/css/base.scss` — global reset, `color-scheme`, and the
  `.theme-transition` swap class. Imported by `App.vue` (entry chunk). It
  *paints* the body ground with `var(--bg)` but does not define it.
- `src/assets/css/portfolio.scss` — every palette token, the shared
  `.eyebrow` / `.section-title` / `.rule-label` classes, `fadeUp`, and the
  chrome metrics the bars and veils share (`--nav-h`, `--footer-h`,
  `--veil-tail`, and the `--*-veil-h` sums). **The only file to edit to change a
  color.** Its header explains the five-section layout — read it before adding a
  token, since a themed token needs a mirror in section 2.

Page components use scoped SCSS and reference tokens, never hex literals.

### Data

- `src/data/contactLinks.js` — single source of truth for outbound links.
  `contactLinks` (rows on Contact), `socialLinks` (its `social: true` subset,
  icons in the footer), and `isExternal(href)`, which keeps `mailto:` out of
  `target="_blank"`. Change a handle here, not in a component.
- `src/data/about.js` — `bio`, `background`, `skillGroups`. The groups are
  capability areas, not employers; Work owns the employment history.
- `src/data/work.js` — `workSections`. The entry field contract is in the file's
  header comment.

## Cross-file contracts

Facts that no single file states, because they span several.

**Theme contract.** `data-theme` on `<html>` is always a concrete `light` or
`dark` — never absent, never `system`. The inline script in `index.html` resolves
it pre-paint from `localStorage['melonade-theme']`, else `prefers-color-scheme`.
Because it always lands on a concrete value, every light rule is a plain
`[data-theme='light']` selector. `useTheme.js` (a module-level ref, not a store)
only ever changes it afterwards, and its `matchMedia` listener follows the system
**only while nothing is stored**. `ClockField` reads `--clock-face` /
`--clock-hand` / `--clock-accent` off its own element with `getComputedStyle`,
caching and re-reading on a `watch` of `theme`.

**404 handling is two mechanisms that never see the same URL.**

- Bad *hash* paths (`melonade.me/#/pizza`) — Pages serves `index.html` (the
  request path is `/`), the app boots, and the router's catch-all redirects.
- Bad *server* paths (`melonade.me/pizza`, or `/work` typed without the hash) —
  the request never reaches the app. Pages serves `docs/404.html`, which folds
  the path into the hash and hands it back to the router.

`npm run preview` **cannot** reproduce either: Vite's preview server is
`appType: 'spa'` and rewrites unknown paths to `index.html`. Test with a static
server that honors `404.html` — `npx --yes serve docs`.

**The one remaining color mirror.** `public/404.html` is copied verbatim and can
import nothing, so it spells out both grounds inline and **must be re-synced by
hand whenever `portfolio.scss` changes them.** Nothing else duplicates a color.

**First paint depends on `portfolio.scss` riding in the entry chunk.** `--bg`,
`--fg`, and `--sans` sit on `:root` rather than `.portfolio` because `<body>` is
outside it and `base.scss` must paint the ground before the app mounts. That
works today because every route is a static import and the build emits one
stylesheet. **If it ever splits, the ground tokens move back into `base.scss` as
literals.**

**Safe-area tokens are wired but currently inert.** `--safe-top` /
`--safe-bottom` / `--safe-left` / `--safe-right` wrap `env(safe-area-inset-*)`
with a `0px` fallback and are threaded through both bars, both veils'
`--veil-hold`, and `PageShell`'s padding. They all resolve to `0px` today
because `index.html` does **not** set `viewport-fit=cover` on its viewport meta.
Adding it would activate the whole layer at once.

## Conventions

`@` resolves to `/src` (`vite.config.js`).

Fonts (Instrument Serif, IBM Plex Sans, Geist Mono) load from Google Fonts in
`index.html`. Only weights 300 and 400 are used in `src/` and the request is
trimmed to match — IBM Plex Sans is static there, so every extra weight is
another file.

The design is the Claude Design project `Portfolio.dc.html` (project id
`0f9b0972-99fd-403c-b8f8-5be012acfbfd`), readable via the `claude_design` MCP /
`DesignSync` tool. Consult it before changing layout or type.

## History

Everything before commit `a900521` was a personal blog / sketchbook (blog, photo
gallery, Sudoku solver, Shower Thoughts). It was deleted in the portfolio
rewrite — recover from git history if any of it is wanted back.
