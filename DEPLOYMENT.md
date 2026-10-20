# Deploy the React Router website

## Build settings

| Setting | Value |
| --- | --- |
| Install | `npm ci` |
| Build | `npm run build` |
| Output | `dist` |
| Node | Node 24 LTS, 24.15.0+ within 24.x recommended |
| URL | Domain root, e.g. `https://example.com/` |
| SPA fallback | Non-file routes must serve `/index.html` |

The production build has **one index.html**, rather than separate HTML files
for each page. React Router chooses the page after JavaScript starts.

Opening `/our-people/` directly or refreshing it sends that URL to the server.
The server must return index.html; then BrowserRouter renders OurPeople.
Existing image, video, CSS, JavaScript and font files must still be served as
normal files. A missing route should reach the app's NotFound page.

## Netlify-compatible static hosting

`public/_redirects` contains:

```text
/* /index.html 200
```

Vite copies this file to `dist/_redirects`. On hosts supporting this syntax,
existing files are served normally and other URLs use the SPA fallback.
Check that your chosen host actually supports this file. Upload the contents
of dist, including _redirects, or connect GitHub with the build settings above.

## Apache hosting

If your host uses Apache with mod_rewrite and allows .htaccess rules, put the
following into **dist/.htaccess before uploading**, or configure equivalent
rules on the server. Preserve any required existing host rules.

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

The source ZIP does not automatically apply Apache configuration.

## Nginx hosting

An example within the server's site configuration is:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

Use your host's deployment process to reload a changed server configuration.

## Other static hosts

Select that host's documented single-page application rewrite/fallback option.
`_redirects` is not a universal standard. Check both an internal Link click
and a direct request/refresh to an inner URL after deploying.

## GitHub and GitHub Pages

Push the **source folder contents** to GitHub using GITHUB_GUIDE.md.
A host connected to that repository can build and serve the site.

GitHub Pages does not provide the arbitrary SPA rewrite used above. Even a
root/custom-domain Pages deployment needs an additional routing solution for
direct visits to BrowserRouter paths. This download does not include a Pages
404 redirect workaround or an automatic deployment workflow.

A repository Pages URL also adds a prefix such as `/babco-website/`.
This source currently uses root-relative routes and asset URLs. Supporting a
prefix requires coordinated changes to BrowserRouter's basename, Vite's base,
internal URLs and media paths. Changing Vite's base alone is insufficient.
HashRouter is another option, but it changes URLs and the existing section
anchor system; it has not been substituted in this package.

## Check a deployed build

1. Open each of the eight routes directly, then refresh it.
2. Use the header/footer links and browser Back/Forward.
3. Open `/?brand=2#brands` directly; Meenu should be selected.
4. Follow a section link such as `/our-people/#leadership`.
5. Confirm a missing path shows the app's 404 page.
6. Check media loading, mobile spacing, sliders, timeline and the sticky header.

The Node/jsdom tests cover navigation behavior and asset references. They do
not measure a real browser's layout, video playback or visual animation.
Review those in your browser before publishing.

## Official references

- React Router installation: https://reactrouter.com/start/declarative/installation
- React Router routing: https://reactrouter.com/start/declarative/routing
- React Router URL state: https://reactrouter.com/start/declarative/url-values
- SPA fallback background: https://reactrouter.com/how-to/spa
- Netlify redirects: https://docs.netlify.com/manage/routing/redirects/overview/
- Vite deployment: https://vite.dev/guide/static-deploy
