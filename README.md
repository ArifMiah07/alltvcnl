# alltvcnl

A fast IPTV player for web and desktop, built with Solid 2, TypeScript, Vite, Tailwind CSS, hls.js, and Electron.

## Features

- Web and Electron builds from one Solid 2 codebase
- Paginated channel browsing from the production IPTV API
- Verified streams, groups, search, China IPTV, and collected channel browsing
- Single active HLS player with quality selection and automatic cleanup
- Favorites and JSON playlists stored locally
- Strict CSP headers and safe URL validation
- SEO metadata, canonical URLs, structured data, Open Graph/Twitter cards, robots.txt, sitemap.xml, Google Search Console verification, GA4 page tracking, and legacy redirects

## Requirements

- Node.js 22.12 or newer
- npm 11 or newer
- Local IPTV API at `http://localhost:5000` for development

## Install

```bash
npm install
```

## Environment

Development uses a Vite proxy so the browser calls the local API as same-origin:

- `.env.development` sets `VITE_API_BASE_URL=/dev-api`
- `/dev-api` proxies to `http://localhost:5000`
- `.env.production` uses the production API by default
- `.env.electron` sets the production API for desktop builds
- `.env.example` lists all supported variables

Copy `.env.example` only when you need custom values.

## Run

```bash
npm run dev
```

Open `http://localhost:5173`.

Desktop development:

```bash
npm run electron-dev
```

## Test and verify

```bash
npm run lint
npm run typecheck
npm test
```

## Build

```bash
npm run build
```

Outputs:

- `dist-web/` for static hosting
- `dist/` for Electron packaging

Desktop packages:

```bash
npm run dist:linux
npm run dist:win
npm run dist:mac
```

## Deployment

Cloudflare Pages is recommended:

- Build command: `npm run build:web`
- Output directory: `dist-web`

Netlify and Vercel work with the same command and output directory. `public/_redirects` and `public/_headers` provide SPA fallback and security headers on Netlify/Cloudflare-style hosts.

## Architecture

See [docs/architecture.md](docs/architecture.md).

Legacy React bugs and migration notes are recorded in [docs/legacy-react-audit.md](docs/legacy-react-audit.md).

## Data and privacy

Favorites, playlists, theme, pagination preference, and collected search are stored in localStorage. No account is required. Aggregate usage is measured with GA4 (`G-01LW7JCZ6F`); no personal channel data is sent.

## Known issues

- Stream availability and quality depend on public IPTV sources.
- Some streams may fail without correct `Referer` or `User-Agent`; a backend proxy is the safest fix.
- Some hosts require custom header rules because `public/_headers` is platform-specific.
