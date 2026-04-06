# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite)
npm run build     # Build to /docs for GitHub Pages
npm run preview   # Preview production build locally
npm run deploy    # Copy index.html → 404.html in /docs (SPA fallback for GitHub Pages)
```

No lint or test scripts are configured.

## Architecture

**Stack:** Vue 3 · Vue Router 4 · Pinia · Vite 6 · SCSS

**Deployment:** Output goes to `/docs` (configured in `vite.config.js`), served via GitHub Pages with hash-based routing (`createWebHashHistory`).

### Routing

Routes are split across three arrays in `src/router/`:
- `routes.js` — major/minor route arrays imported by `index.js`
- `projects.js` — sub-routes mounted under `/projects/`
- `index.js` — assembles all routes, runs `beforeEach`/`afterEach` hooks for nav state, document title, and meta tags

Route `meta` properties drive behavior:
- `navOnDark: true` — tells the nav store the background is dark (nav turns white)
- `hideable: true` — shows a button to collapse the nav
- `title` / `metaTags` — set document title and `<meta>` tags on navigation

### State (Pinia)

- **`nav` store** (`src/stores/nav.js`) — tracks `collapsed`, `hideable`, and `navOnDark`; `navColor` getter returns `'white'` or `'black'`

### Styling

Global utility classes live in `src/assets/css/custom.scss` (imported in `App.vue`):
- Flexbox shortcuts: `f-row`, `f-col`, `g` (gap), etc.
- Spacing helpers: `.m-s`, `.m-m`, `.m-l`, `.p-s`, `.p-m`, `.p-l`, etc.
- Component styles use scoped SCSS blocks

### Blog / Content

Blog posts are driven by `src/assets/data/articles.json` and rendered via `marked`. Content files live in `src/assets/content/`. The `BlogPost` route accepts a dynamic `:slug` param.

To add a new blog post:
1. Add a Markdown file to `src/assets/content/<slug>.md`
2. Add an entry to `src/assets/data/articles.json` with `slug`, `title`, `date`, `tags`, `excerpt`, `image`, and `featured`
3. Tags must exist in `src/assets/data/tags.json`; add new ones there with a `name` and `color`

To find files for a project: look up its `path` in `src/router/projects.js`, then find the matching folder under `src/components/smallProjects/<path>/`. Logic files and the main component live there. Blog content (if any) is at `src/assets/content/<path>.md`.

To add a new project route: add an entry to `src/router/projects.js` (`PROJECT_ROUTES`). The path is automatically prefixed with `/projects/`.

Each project entry has these identifying fields:
- `name` — display name and Vue Router route name (used for `<router-link :to="{ name }">`)
- `path` — URL segment under `/projects/` (also used as `projectSlug` in `articles.json` to link a blog post to a project)
- `description` — short subtitle shown on the project card
- `tags` — array of tag strings; each must exist in `src/assets/data/tags.json` (provides name + color); drives the tag-filter UI on the Projects page
- `meta.hidden: true` — excludes the project from the Projects listing while keeping the route accessible

### Utilities

- `src/utils/tags.js` — exports `getTag(name)` which looks up a tag object `{ name, color }` from `tags.json`; use this instead of importing the JSON directly
- `src/utils/Image.vue` — reusable image thumbnail component with lazy loading and a fullscreen modal on click; accepts `src`, `preview` (lower-res thumbnail URL), and `show` (open modal immediately) props

### Path Alias

`@` resolves to `/src` (configured in `vite.config.js`).

### Navigation

`/` redirects to `Blog`. All unknown paths also redirect to `Blog`.
