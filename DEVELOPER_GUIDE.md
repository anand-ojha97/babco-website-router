# Babco website — developer guide

This guide assumes you know components, JSX, props, state and effects.
It explains this project's structure and the decisions you will need when
editing routes, content, sliders and media. The site uses JavaScript/JSX.

## 1. Run and check

Use Node 24 LTS (24.15.0+ within 24.x recommended), or Node 22.22.2+ within
22.x. Open the extracted babco-website folder containing package.json.

```bash
npm ci
npm run dev
```

Use Vite's printed URL. Save files for live updates; stop with Ctrl+C.
For a production check, run `npm test`, `npm run build`, then
`npm run preview`. PowerShell users can substitute `npm.cmd`.

React Router is pinned to 8.4.0. React and React DOM are 19.2.7, a compatible
patch version. The lockfile records all installed versions. Run `npm ci` after
extracting, and commit both package files when intentionally updating dependencies.

## 2. Structure and state ownership

| File/folder | Role |
| --- | --- |
| `index.html` | The only HTML entry. Contains the React root and default metadata. |
| `src/main.jsx` | StrictMode, BrowserRouter and createRoot. |
| `src/App.jsx` | Routes inside a shared layout, old HTML URL redirects, catch-all 404. |
| `src/routes/routeConfig.js` | Paths, page components, titles and descriptions. |
| `src/routes/RouteEffects.jsx` | Route metadata, focus, section scrolling and history scroll restoration. |
| `src/layouts/SiteLayout.jsx` | Header, main/Outlet, marquee and footer. |
| `src/pages/` | Each complete page; page-specific sections can remain local components. |
| `src/components/` | Reusable UI sections, media and animation helpers. |
| `src/data/` | Editable local content, slider definitions and navigation. |
| `public/` | Static media/fonts; referenced as `/images/...`, not `/public/images/...`. |
| `tests/router.test.jsx` | Node/jsdom checks for actual routing and navigation behavior. |

There is no database, CMS, Redux store or external slider package.

State lives near its consumers:

- The homepage brand is URL state: `?brand=2` means Meenu.
- Each brand's carousel category position is local state in BrandShowcase.
- Automatic headline scene selection is local state in RichScenes.
- Header menu and search visibility are local state in Header.
- The chosen map location is local state in Locations.

The old folders such as `our-people/index.html` are unnecessary in this SPA.
Only remove those old page-entry folders; keep `src/pages/`, `src/components/`
and `public/`, which contain the actual website.

## 3. How React Router works here

The startup flow is:

1. The host serves index.html, including for an inner route.
2. main.jsx mounts BrowserRouter around App.
3. App matches the URL against the routes recorded in routeConfig.js.
4. SiteLayout stays mounted and renders the matched page through Outlet.
5. RouteEffects updates metadata, scroll position and keyboard focus.

The project uses React Router's **declarative mode**, with BrowserRouter,
Routes, Route, Outlet, Link, useLocation and useSearchParams.
Imports come from `react-router`, following the current declarative API.
You do not need an additional `react-router-dom` package for this implementation.

### Route registration

Each entry in `src/routes/routeConfig.js` includes a path, component, title and
description. App maps those entries to Route elements. Home is the index route.
A separate `*` route displays NotFound.

| Page | URL | Source |
| --- | --- | --- |
| Home | `/` | `src/pages/Home.jsx` |
| Who We Are | `/who-we-are/` | `src/pages/WhoWeAre.jsx` |
| Operations | `/operations/` | `src/pages/Operations.jsx` |
| Babco Story | `/babco-story/` | `src/pages/BabcoStory.jsx` |
| Our Brands | `/our-brands/` | `src/pages/OurBrands.jsx` |
| Our Business | `/our-business/` | `src/pages/OurBusiness.jsx` |
| Innovation | `/innovation/` | `src/pages/Innovation.jsx` |
| Our People | `/our-people/` | `src/pages/OurPeople.jsx` |

Paths with or without the final slash match. The old `/page/index.html` URLs
redirect to their normal route while retaining query strings and section hashes.
These are client-side redirects after the host serves the SPA.

### Internal navigation and anchors

Use Link for internal destinations:

```jsx
import { Link } from "react-router";

<Link to="/our-brands/">Explore our brands</Link>
<Link to="/our-people/#leadership">Meet the leadership</Link>
<Link to="/?brand=2#brands">Explore Meenu</Link>
```

Link changes browser history without requesting a new HTML document.
Keep ordinary anchors for external URLs, mailto/tel links and the skip-to-content
anchor. An external maps link remains an ordinary anchor.

Menu/search destinations are recorded in `src/data/navigation.js`.
`navigationHref()` turns a numeric brand field into its query/hash URL.
Header, footer, directory cards and search now use Link.

### Brand state and query parameters

Home uses useSearchParams to read the selected brand. Valid indices are based
on brandCatalog.length; invalid values fall back to Anand. The order is:

| Index | Brand |
| --- | --- |
| 0 | Anand |
| 1 | Adarsh |
| 2 | Meenu |
| 3 | Ullasam |

The brand is derived from the URL rather than copied into App state.
Changing the URL through a menu, a directory card, a direct visit or browser
history therefore changes the selected tab.

Clicking a tab updates the query using `replace: true`. It does not add a
history entry for every tab press. Other query parameters are retained.
The tab update sets `state.preserveScroll`, so the viewport stays in place.
useSearchParams builds a search-only destination, so a previous section hash
is cleared by tab selection; direct links still use `#brands` to reach the section.

### Scrolling, focus and cleanup

RouteEffects follows section hashes after the new DOM mounts. Navigating to
a different page without a hash goes to its top. Back/Forward restores a scroll
position previously recorded for that history entry during this SPA session;
if none exists, it follows the hash or starts at the top.

Positions are kept in a bounded in-memory map, not localStorage. A new reload
starts a new map. Hash decoding is guarded against malformed URLs.
The sticky header's existing CSS scroll padding keeps section targets clear
of navigation. Main receives keyboard focus when the pathname changes.

SiteLayout reconnects data-reveal observers when pathname changes. Pages clean
up their own media, timers and timeline listeners on unmount. Header closes its
menus/search when the route changes and when a navigation link is selected.

RouteEffects updates document.title and the description meta tag in the browser.
The static HTML response still contains the default homepage metadata. If you
later need route-specific crawler/social-preview HTML, add prerendering or SSR.

### Add another page

1. Create a component in `src/pages/`, for example `Careers.jsx`.
2. Import it in routeConfig.js and add an entry with path `/careers/`,
   Component, title and description.
3. Add the desired menu/search link in navigation.js.
4. Use Link for links in the new page. Use shared components for repeated sections.
5. Run tests/build and verify a direct visit and refresh on your chosen host.

No new HTML entry or Vite multi-entry configuration is needed.
Read DEPLOYMENT.md before publishing: BrowserRouter needs the server's SPA fallback.

## 4. Reusable components and repeating sections

All component paths in this table begin with `src/components/`.

| File | Responsibility |
| --- | --- |
| `../layouts/SiteLayout.jsx` | Shared shell and Outlet; retained across page navigation. |
| `../routes/RouteEffects.jsx` | Route scrolling, metadata and focus behavior. |
| `Header.jsx` | Logo, desktop navigation, mobile menu, search button. |
| `AboutMegaMenu.jsx` | The expanded About us panel. |
| `SearchDialog.jsx` | Search input, filtered results, keyboard focus, closing. |
| `PageHero.jsx` | Shared image, overlay, and heading markup for six inner-page banners. |
| `SectionHeading.jsx` | Shared editable homepage section heading. |
| `RichScenes.jsx` | The automatic red-section headline and portrait slideshow. |
| `BrandShowcase.jsx` | Brand tabs, category selection, arrows, dots, swipe handling. |
| `CategorySlide.jsx` | One carousel tile and its calculated position. |
| `ProductMedia.jsx` | Video on the active tile, still/SVG labels elsewhere. |
| `StoryBannerVideo.jsx` | The separate Babco Story banner video and play/pause control. |
| `ScrollReveal.jsx` | Reusable one-time entrance effect for a section. |
| `CountUp.jsx` | Reusable animated numerical value. |
| `Distribution.jsx` | Homepage distribution section and figures. |
| `Locations.jsx` | Homepage map, location buttons, and explanatory text. |
| `FooterMarquee.jsx` | The repeating animated slogan above the footer. |
| `Footer.jsx` | Shared address, links, and social icons. |

Other repeated structures are small components inside their page files:
`LeaderCard` in `OurPeople.jsx`, `CollectionPhoto` in `OurBrands.jsx`,
`BusinessStat`, `WarehousePhoto`, and `QualityPhoto` in `OurBusiness.jsx`,
and `Statement` and `PageLink` in `WhoWeAre.jsx`. A component does not need
its own file to be reusable. Repeated cards are rendered with `.map()`.

`PageHero` accepts an `id`, `title`, an `image` object, and CSS class props.
The image object holds `src`, `alt`, `width`, `height`, and `className`.
Different crop and title classes preserve each page's design. The homepage
hero and Babco Story video banner have different structures and stay separate.

## 5. Where your details and data are recorded

The site has no database or CMS. Its content is recorded in JavaScript arrays,
one JSON file, and the page JSX. Editing a file changes the website after saving
in development, or after rebuilding and redeploying in production.

| What you want to change | File or folder |
| --- | --- |
| Homepage section order | `src/pages/Home.jsx` |
| Route registration and metadata | `src/routes/routeConfig.js` |
| Shared layout | `src/layouts/SiteLayout.jsx` |
| Selected homepage brand query | `src/pages/Home.jsx` |
| Menu labels, links, search items, map locations | `src/data/navigation.js` |
| Homepage brand tabs and category media | `src/data/brands.js` |
| Carousel curve, offsets, scale, and opacity | `src/data/carousel.js` |
| Red-section words and portrait positions | `src/data/richScenes.json` |
| Our Brands directory cards and logos | `src/data/brandDirectory.js` |
| Business figures, warehouse stages, logistics steps | `src/data/business.js` |
| Timeline years, event text, colors, and desktop positions | `src/data/story.js` |
| Leadership names, roles, images, and crops | `src/data/people.js` |
| Leadership introduction and workforce copy | `src/pages/OurPeople.jsx` |
| Most long page paragraphs | The relevant `src/pages/*.jsx` file |
| Innovation sourcing principles | `src/pages/Innovation.jsx` |
| Homepage distribution text and figures | `src/components/Distribution.jsx` |
| Contact address, footer links, social destinations | `src/components/Footer.jsx` |
| Colors, registered fonts, coordinated animations | `src/index.css` |
| Repeated Tailwind class strings | `src/styles.js` |
| Images, logos, and page-specific photos | `public/images/` |
| Product posters | `public/products/` |
| Inactive category text artwork | `public/categories/` |
| Videos | `public/videos/` |
| Local font files and original notices | `public/fonts/` |

Use VS Code's Ctrl+Shift+F to search the whole project for a visible phrase.
Search for the actual text, not only the page name.

## 6. Slider A: automatic headlines and portraits

The red homepage section cycles through five scenes: RICH, AUTHENTIC, BRANDS,
GOOD, and MEENU. This is a custom React slideshow in `RichScenes.jsx`.
It does not come from Swiper, Slick, or another slider package.

The scene definitions come from `src/data/richScenes.json`. Each scene has:

- `title`: the visible word.
- `headingWidth` and `mobileHeadingWidth`: width percentages for its title.
- `headingEmWidth`: measured width used to calculate a fitting font size.
- `desktop` and `mobile`: four portrait position objects for each layout.

The portraits are defined in the `portraits` array near the top of
`RichScenes.jsx`; the photos themselves are in `public/images/`. The array
order is cook, woman, boy, girl. Scene position arrays use the same order.

`sceneIndex` records the current scene. A timeout advances it every **6000 ms
(six seconds)**. `(current + 1) % scenes.length` loops back after the last scene.
Clicking a dot selects a scene and restarts its interval. CSS transitions fade
the title and move/fade the portraits.

The timer runs only while the section is sufficiently in view, the browser tab
is visible, and reduced motion is off. Cleanup clears the previous timeout.
The pause behavior is intentional; an offscreen section should not keep
cycling unnecessarily.

To slow the automatic changes, find `6000` in `RichScenes.jsx` and change it
to `8000` for eight seconds. That is the delay between scenes, not the CSS
transition duration. Preserve the four portrait positions per scene when
editing the JSON.

## 7. Slider B: the curved brand/category carousel

The homepage Our brands section is another custom React system. It has four
brand tabs: Anand, Adarsh, Meenu, and Ullasam. Each brand currently has five
category entries. It uses no external carousel library.

### Data and selected state

`src/data/brands.js` exports `brandCatalog`. A category looks like this:

```js
{
  id: "anand-rice-dishes",
  label: "Rice Dishes",
  video: "/videos/ullasam-rice-white.mp4",
  poster: "/products/ullasam-rice-white.webp"
}
```

| Field | Meaning |
| --- | --- |
| `id` | Stable unique identifier; also selects the inactive SVG filename. |
| `label` | Category text used in labels and accessible descriptions. |
| `video` | The active tile's video path. |
| `poster` | Its still image and video fallback. |

Home derives `brand` from the URL using useSearchParams and passes it to
BrandShowcase as a prop. Its `onBrandChange` callback updates the query string
without scrolling. Header/footer links include the same brand query parameter,
so there is no second copy of selected-brand state to synchronize.

`categoryIndices` in `BrandShowcase.jsx` remembers one circular step for each
brand. Its current initial value is `[0, 0, 0, 0]`. Switching tabs preserves
each brand's category position during that page visit. Reloading starts a new
visit; these values are not stored in a database or localStorage.

### What happens when you press an arrow

1. An arrow, dot, side tile, swipe, or keyboard action calls `moveCarousel()`.
2. The selected brand's step increases or decreases.
3. `getProductIndex()` in `src/data/carousel.js` wraps the step into a valid
   category index. Five categories therefore wrap from 4 back to 0.
4. `getCarouselSlides()` creates nine positions around the current step.
5. `CategorySlide` draws each tile using its x/y position, scale, and opacity.
6. CSS `.orbit-slide` transitions all tiles along the shallow curve.
7. The centre tile activates its video; the other tiles show category SVG labels.

The nine rendered positions repeat the category list; they are not nine
different products. Outer positions are invisible until needed. Stable keys
let React and CSS move existing tiles smoothly. Dots take the shortest path
around the circle. Input is temporarily locked during a transition, preventing
rapid clicks from overlapping animations.

The carousel responds to left/right arrow keys when focused, dots, arrows,
side-tile clicks, and horizontal swipes longer than 50 px. Vertical scrolling
is allowed. Brand tabs also support left/right and Home/End keys.

### Timing and video behavior

This category carousel is **manually controlled**; it does not automatically
select the next category on a timer. Its `SLIDE_DURATION = 1300` means a
**1.3-second movement**, not an autoplay interval. It also controls the CSS
variable `--brand-slide-duration`; you normally change this one constant.

`ProductMedia.jsx` gives a video URL only to the active tile. Inactive tiles
have no video source and use `/categories/<id>.svg`. Active videos are muted,
looping, and inline on mobile. Playback pauses out of view, in a hidden browser
tab, or for reduced motion. If video loading/playback fails, the poster is used.
When a tile leaves the centre, its still image fades into its inactive label.

The active-media entrance is 0.7 seconds in `ProductMedia.jsx`; the leaving
still-image fade is 0.5 seconds. If you change the leaving fade, change both
its timeout and its animation class together.

### Where the current videos come from

All category entries currently point to the **same supplied Ullasam rice
preview**, `public/videos/ullasam-rice-white.mp4`, and its matching poster.
That is the current configured media, not a connection to an external catalog.
Other retained media files are included, but a file is displayed only when
code or data references its path.

To give each category its own video:

1. Put an MP4 in `public/videos/` and a matching WebP/PNG/JPG still in
   `public/products/`.
2. Change that category's `video` and `poster` values in `brands.js`.
3. Keep the existing `id` unless you also regenerate its SVG label.
4. Save and test that category, its neighboring tiles, and the mobile view.

For example, after adding your own files:

```js
video: "/videos/anand-pickles.mp4",
poster: "/products/anand-pickles.webp"
```

Those example filenames are not supplied assets; create them before using
those paths. No online dashboard manages these entries.

### Changing or adding categories

Edit a category's `label` in `brands.js`, then run:

```bash
npm run labels
```

This runs `scripts/create-slide-labels.js` and recreates `public/categories/` SVG
labels from the data. Without that step, a side tile may still show its old name.
You can add another category object to a brand's array; keep IDs unique and
include valid media. The carousel reads the category count from the array.

Adding a fifth brand is a larger design change: update `brandCatalog`, the
`categoryIndices` initial array, the four-column tab layout, and brand links
and indices in navigation/directory data. Home validation already uses
brandCatalog.length. Preserve the current four-brand order unless you update
every index that refers to it.

## 8. Other motion and interactive behavior

| Feature | Implementation | Where to edit it |
| --- | --- | --- |
| Sticky header | `stickyHeader.js` sets `data-sticky` after 64 px of scroll and keeps it pinned until the top. | Threshold in that module; layout classes in `Header.jsx`. |
| Header slide-down | CSS keyframes run when the sticky attribute becomes true. | `sticky-header-enter` rule in `src/index.css`; current duration 0.9 seconds. |
| Sticky size | Same inset width and rounded shape as the original; sticky height is 90 px. | `data-[sticky=true]:h-[90px]` and matching minimum height in `Header.jsx`. |
| Section entrance | `ScrollReveal` uses IntersectionObserver and reveals once. | `ScrollReveal.jsx`; current transition 900 ms. |
| Element entrance | `pageMotion.js` observes elements marked `data-reveal`. | `[data-reveal]` rules in `index.css`. |
| History timeline | Scroll position reveals the line and marks reached/current milestones. | `historyMotion.js`, `src/data/story.js`, `BabcoStory.jsx`. |
| Numerical counters | `CountUp` displays a final accessible value and animates a visual copy. | `counterAnimation.js`; current duration 1350 ms after a small start delay. |
| Image hover | Contained zoom/brightness and selected card effects. | `.brand-photo-hover`, `.brand-card-hover`, and related rules in `index.css`. |
| Warehouse hover | Its shadow is disabled while its contained image effect remains. | `.warehouse-photo` rules in `index.css`. |
| Moving footer slogan | Two copies of the same text move in a seamless CSS loop. | `FooterMarquee.jsx`; current cycle 28 seconds. |

The non-sticky header retains the original design. Sticky state changes are
scoped to `data-[sticky=true]` utilities and the sticky CSS rule. When changing
one state, do not replace its base width or height classes accidentally.

`CountUp` accepts values such as `"46"`, `"25+"`, and `"1,100"`. Reuse it like:

```jsx
import CountUp from "../components/CountUp.jsx";

<p><CountUp value="250+" /> products</p>
```

Do not wrap ordinary paragraph numbers or timeline years in counters unless
you want those numbers to count up. The existing timeline years stay readable
as years; its motion follows scrolling instead of counting years upward.

Reduced-motion CSS turns off animation and transitions. Browser observers also
stop selected automatic media/motion. Keep that support when changing effects.

### The Babco Story video is separate

`StoryBannerVideo.jsx` uses `/videos/babco-story-banner.mp4` with the truck
poster in `public/images/babco-story/hero-truck.webp`. It is not part of either
homepage slider. It loops silently while visible and has its own play/pause
control. The component pauses for hidden tabs, offers a still-image fallback
on failure, and honors reduced-motion preferences unless the visitor chooses
to play it. Replacing this MP4 changes only the Story banner.

## 9. Editing recipes

### Change a paragraph

Search the sentence with Ctrl+Shift+F, open the relevant page/component, and
change the text between the tags. Preserve surrounding tags and JavaScript
braces. Some desktop text uses `<br className="max-[1000px]:hidden" />` for a
design-specific line break. A longer sentence may need its line breaks and
section spacing adjusted. Review desktop and mobile after copy changes.

### Replace an image

Find its `src` path. `public/images/example.webp` is referenced in the browser
as `/images/example.webp` — there is no `/public` in the URL. You can replace
the file with one of the same dimensions, or give a new file a new path.
Update `width`, `height`, and `alt` when appropriate. Keep filenames lowercase
with hyphens so case differences on a web server do not break the image.

Many images use a particular crop via classes such as `object-cover`, `top`,
and `left`. A very different aspect ratio can require crop adjustments.

### Update a leader's details

Open `src/data/people.js`. Change `name`, optional `credentials`, and `role`.
The `image` value is a filename inside `public/images/our-people/`. `crop`
records percentage positions and width. `LeaderCard` repeats the same layout
for each entry. Introductory copy stays in `OurPeople.jsx`.

Names and roles use the supplied design's recovered bold and regular profile
lettering; normal paragraphs retain Gilroy SemiBold. The existing wording is
retained from the supplied design.

### Update numbers or timeline events

Business statistics are in `src/data/business.js`. Homepage figures are in
`Distribution.jsx` and `Locations.jsx`. Keep numbers as strings when they
include commas, a plus sign, or a percent sign.

Timeline event text is in `src/data/story.js`. Its `top` and `marker` values
are positions from the 1920 px design. Adding an event also requires reviewing
the timeline's height and desktop spacing in `BabcoStory.jsx`; editing the
array alone does not redesign the timeline. Mobile rows use document flow.

### Add a menu link or search result

Edit `navigation` and its `links` in `src/data/navigation.js`. Add/update a
`searchItems` entry if you want that destination in search. The header and
footer use shared navigation data, but dedicated About menu content and
some footer links live in their own components. Search is a local text filter
over `searchItems`; it does not search the internet or automatically index
every paragraph of every page.

Links with a numeric `brand` field select a homepage tab.
`navigationHref()` always creates a link such as `/?brand=2#brands`; Home reads
the query parameter reactively and opens the correct tab. Preserve brand order.

### Adjust color, spacing, or fonts

`src/index.css` contains the Tailwind 4 `@theme` colors and local font rules.
`src/styles.js` contains common heading and button classes. Layout classes
are written in JSX; there is no `tailwind.config.js` in this project.

| Class/example | Meaning |
| --- | --- |
| `flex`, `grid` | Layout methods. |
| `px-6`, `mt-5` | Horizontal padding and top margin. |
| `text-babco-red` | Uses the named color in `@theme`. |
| `max-[640px]:text-sm` | Applies a style on narrow screens. |
| `min-[1001px]:...` | Applies a desktop style. |
| `cqw` | One percent of the container width. |
| `clamp(min, preferred, max)` | Scales a size within minimum and maximum bounds. |

The page container is capped at 1920 px. Percentage/cqw geometry preserves
the supplied design on desktop; responsive classes switch to readable mobile
layouts. Start with content changes before adjusting those measurements.
Use complete Tailwind class names; constructing a class such as
`"bg-" + color` prevents reliable automatic class detection.

Mula R display lettering, Gilroy paragraph lettering, and profile weights are
included as design subsets, not complete vendor fonts. New text containing
unsupported characters uses fallbacks. To support a wider character set,
install your full licensed font files in `public/fonts/` and update the matching
`@font-face` URLs/weights in `index.css`.

## 10. Build, check, and publish an updated site

After editing and checking the development website, run:

```bash
npm run build
npm run preview
```

The build creates optimized HTML, CSS, JavaScript, and assets in `dist/`.
The preview checks that build locally, normally at http://127.0.0.1:4173.
Stop it with Ctrl+C. Preview is not a production hosting service.

Check all eight URLs, refresh an inner page, open each menu, use search,
switch all four brand tabs, try the slider arrows/dots, play the Story banner,
and review narrow-screen text. Check the header both before and after scrolling.
If you replace media, inspect the image/poster fallback as well.

For a static host, publish the contents of `dist/` at the domain root, with
an SPA fallback serving index.html for non-file routes. See DEPLOYMENT.md. If a
hosting service builds from your GitHub repository, its build command is
`npm run build`, its output directory is `dist`, and it must install your npm
dependencies. Source code and build output are different things.

Uploading source to GitHub records your code. It does not automatically update
the already-hosted Babco website. Read `GITHUB_GUIDE.md` for the upload steps
and the note about GitHub Pages repository subpaths.

## 11. Common problems

| Problem | What to check |
| --- | --- |
| `npm` or `node` is not recognized | Install Node, then reopen VS Code and its terminal. |
| `npm.ps1` cannot run | Use `npm.cmd` in PowerShell. |
| npm cannot find `package.json` | Open the inner project folder, not its parent or ZIP viewer. |
| `vite` is not found | Run `npm ci` in the project root first. |
| `npm ci` reports lockfile mismatch after intentional dependency edits | Run `npm install` to update the lockfile, then include both package files in Git. |
| JSON/JS syntax error | Check quotes, commas, brackets, and the file/line shown by Vite. |
| Image/video is missing | Check path spelling, capitalization, extension, and the actual `public/` file. |
| Side category labels are outdated | Run `npm run labels`. |
| Category does not advance automatically | That carousel is manual; only the red headline slideshow auto-advances. |
| Product video does not play | Test its URL, supported MP4 encoding, visibility, poster, and reduced-motion setting. |
| New words use a different font | The supplied design font is a subset; add full licensed font files for additional glyphs. |
| Inner-route refresh returns a server 404 | Configure the SPA fallback; see DEPLOYMENT.md. |
| Menu changes the whole document | Use Link with a to prop for internal navigation. |
| GitHub upload succeeded but site looks unchanged | Uploading source and deploying a build are separate steps. |
| Local edits did not change production | Rebuild and deploy through your chosen host's process. |

## 12. Working workflow and validation

Follow the ownership tables to keep changes local: page copy in its page,
repeated structure in a component, content lists in data, and routes in routeConfig.
For new interactive state, decide whether it belongs in the URL or only in the
component. Values that should survive a shared link are good URL candidates.

Run `npm test` after routing/navigation edits. The test runner compiles JSX with
Vite, runs Node's test runner with jsdom, then removes its temporary bundle.
Tests cover all eight routes and referenced assets, shared-layout persistence,
metadata updates, brand query links, history traversal, initial hashes in
StrictMode, menu/search dismissal, sticky-state transitions, legacy URLs and 404s.
Browser APIs are mocked; this is functional DOM testing, not visual browser QA.

Run `npm run build` before a handoff or deploy. In your browser, inspect desktop
and mobile layout, video playback, image crops, animation timing and inner-route
refreshes on the actual host. Avoid adding a test that only duplicates a CSS
class; test the user behavior a change could break.

Official references for the APIs used here:

- https://react.dev/learn
- https://reactrouter.com/start/declarative/installation
- https://reactrouter.com/start/declarative/routing
- https://reactrouter.com/start/declarative/url-values
