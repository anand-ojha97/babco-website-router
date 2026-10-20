# Babco Foods — React Router website

Complete eight-page website using **React 19.2.7, React Router 8.4.0,
Vite 8 and Tailwind CSS 4**, written in JavaScript/JSX. It includes the existing
design, local fonts, images, videos, sliders, sticky header, timeline and counters.

This version uses a single HTML entry, client-side routing and a shared layout.
The old root page-entry folders have been removed. Page components are in
`src/pages/`; reusable sections are in `src/components/`.

## Run locally

Use **Node 24 LTS, version 24.15.0 or later within the 24.x line**.
Node 22.22.2 or later within the 22.x line is also supported.

Extract the ZIP, open the inner **babco-website** folder in VS Code, then run:

```bash
npm ci
npm run dev
```

Open the address printed by Vite, normally http://127.0.0.1:5173.
On Windows PowerShell, use `npm.cmd` if `npm.ps1` is blocked.

## Project map

| Location | Responsibility |
| --- | --- |
| `src/main.jsx` | Mounts React and wraps App in BrowserRouter. |
| `src/App.jsx` | Routes, shared layout route, old-URL redirects and 404 route. |
| `src/routes/routeConfig.js` | All page paths, components, titles and descriptions. |
| `src/routes/RouteEffects.jsx` | Hash scrolling, history scroll positions, focus and metadata. |
| `src/layouts/SiteLayout.jsx` | Shared header, Outlet, footer marquee and footer. |
| `src/pages/` | Eight pages and the NotFound page. |
| `src/components/` | Reusable UI, sliders, media, counters and motion helpers. |
| `src/data/` | Navigation, brands, slider scenes, people, business and timeline content. |
| `public/` | Images, videos, fonts, generated category labels and hosting fallback file. |
| `tests/router.test.jsx` | Routing and interaction regression checks. |

## Pages

| URL | Component |
| --- | --- |
| `/` | Home |
| `/who-we-are/` | WhoWeAre |
| `/operations/` | Operations |
| `/babco-story/` | BabcoStory |
| `/our-brands/` | OurBrands |
| `/our-business/` | OurBusiness |
| `/innovation/` | Innovation |
| `/our-people/` | OurPeople |

Internal navigation uses React Router's `Link`. A URL such as
`/?brand=2#brands` opens Meenu in the homepage carousel. Browser Back/Forward
updates the page and selected brand. Unknown routes show a 404 page.
Old links such as `/our-people/index.html` redirect inside the app.

## Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the exact locked dependencies. |
| `npm run dev` | Development server with live updates. |
| `npm test` | Routing, navigation, deep-link and asset checks in Node/jsdom. |
| `npm run labels` | Regenerate category SVG labels after editing category names. |
| `npm run build` | Production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |

## Guides

- **DEVELOPER_GUIDE.md** — router architecture, component/data map, both slider
  systems, state, animation timing, media replacement and common edits.
- **GITHUB_GUIDE.md** — upload the source with GitHub Desktop or Git commands.
- **DEPLOYMENT.md** — required SPA fallback and hosting examples.

The guide assumes basic React knowledge. The code uses components, props,
hooks, local data and React Router; Redux and a backend are not needed.

## Hosting

Run `npm run build` and deploy the contents of `dist/` at your domain root.
**Configure your host to serve `index.html` for routes such as
`/our-people/`.** Without that fallback, refreshing an inner route can return
a server 404. A Netlify-compatible `public/_redirects` file is included.
Other hosts need their own equivalent; see DEPLOYMENT.md.

GitHub holds your source. Uploading the repository does not itself publish the
website. GitHub Pages needs additional routing handling; this BrowserRouter
package is not configured for Pages or repository subpaths.

Prepared 18 October 2026 from your previous website ZIP. Source and assets are
included; `node_modules/`, generated `dist/`, credentials and Git history are
excluded. The current category videos all use the supplied shared Ullasam rice
preview; the guide explains how to assign separate videos. The included design
fonts are subsets; retain their original notices.
