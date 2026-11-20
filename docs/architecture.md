# Architecture

## Overview

The app is a client-only Solid 2 SPA with an Electron shell. It calls the IPTV backend directly in production and through a Vite dev proxy locally.

```text
src/
  app/          bootstrap, global CSS
  components/   reusable UI and layout
  features/     channels, playlists, player
  lib/          API, storage, validation, pagination, state
  routes/       route components and router definition
```

## Routing

- Web uses `browserHistory` and static host SPA rewrites.
- Electron production uses `hashHistory` so routes work from `file://`.
- Route components are lazy-loaded code-split chunks.
- `AppLayout` owns navigation, theme toggle, loading boundary, and footer.

## Data flow

- `src/lib/api/client.ts` normalizes every backend payload into `Channel`.
- Requests are abortable and have a 15-second timeout.
- `src/lib/resource.ts` wraps fetchers with loading, error, data, cancellation, and dependency tracking.
- Local catalog files are fetched once through `staticAsset()`.

## State

`src/lib/stores.ts` exposes a small module-level store:

- theme
- channels per page
- favorites
- playlists
- collected search

All persisted values are versioned localStorage keys with migration from legacy keys where available.

## Player

`HlsPlayer` uses the original `hls.js` player behavior. It:

- validates stream URLs before use
- loads the stream as soon as the player mounts; no click is required to see the first frame
- uses the original conditional green/purple/blue borders for loading, valid, and unreachable streams
- keeps one active HLS instance per mounted player
- destroys instances and clears video state on route/source changes
- keeps the original buffer and manifest retry settings

Grid View mounts an inline player on every channel card, matching the original app. Normal list view mounts a player only for an expanded card. `/watch` and `/playlist-player` mount full players.

## Security

- `safeUrl`, `safeHref`, and `safeMediaUrl` reject non-HTTP(S), credentials, malformed URLs, and private hosts in production.
- Imported playlists, favorites, M3U text, and search parameters are validated and capped.
- Images use `referrerpolicy="no-referrer"`.
- External links use `rel="noopener noreferrer"`.
- CSP is set in `index.html` for local/dev and in `public/_headers` for production hosting.
- Electron uses context isolation, sandboxing, `webSecurity: true`, no Node integration, and no global CORS rewriting.
- External links open through the system browser.

## SEO

- Per-route title, description, canonical, Open Graph, Twitter, robots, and JSON-LD via `@solidjs/meta`.
- Static fallback title, description, Open Graph, Twitter, WebSite JSON-LD, and Google Search Console verification live in `index.html`.
- GA4 loads once in `index.html` with automatic pageviews disabled; `src/lib/analytics.ts` sends pageviews on SPA route changes from `AppLayout`.
- `scripts/generate-sitemap.mjs` writes `sitemap.xml` and `robots.txt` from one site URL to `public/`, `dist-web/`, and `dist/`.
- `public/_redirects` maps legacy React URLs to their Solid equivalents before the SPA fallback.
- Private routes (`/watch` and `/404`) are `noindex`; catalog, favorites, playlists, and search pages remain indexable.

## Performance

- Fine-grained Solid reactivity instead of virtual-DOM reconciliation.
- Lazy routes keep catalog pages separate from the landing page.
- No icon package at runtime; icons are inline SVG.
- Mobile disables backdrop blur, smooth scrolling, heavy card effects, and decorative background downloads; desktop keeps the glass look.
- Channel cards use `content-visibility`, `contain`, flat backgrounds, and Set-based favorite lookups.
- Mobile page size is capped at 24 even if a larger desktop preference was saved.
- Hero, featured, and desktop background images ship as `sm`/`md`/`lg` WebP variants with `srcset`; the time-of-day background mapping is unchanged.
- `/home` loads a 9-channel featured JSON instead of the full catalog.
- The hero timer pauses when the slider is offscreen or the tab is hidden.
- GA4 loads during idle and decorative backgrounds ship as cached WebP assets.
- Search inputs are debounced before network requests.
- Skeletons and error states avoid layout shifts.

## Verification

Run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
