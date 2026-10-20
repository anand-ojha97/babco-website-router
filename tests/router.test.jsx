import { test, after } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { StrictMode, act } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { BrowserRouter, MemoryRouter, matchRoutes } from "react-router";
import App from "../src/App.jsx";
import { siteRoutes } from "../src/routes/routeConfig.js";

const dom = new JSDOM(
  '<!doctype html><html><head><meta name="description" content=""></head><body><div id="root"></div></body></html>',
  { url: "https://babco.test/", pretendToBeVisual: true },
);
const { window } = dom;
Object.assign(globalThis, {
  window, document: window.document, HTMLElement: window.HTMLElement,
  Image: window.Image, MutationObserver: window.MutationObserver,
  IS_REACT_ACT_ENVIRONMENT: true,
});
// Import the client renderer after installing the DOM, so feature detection
// uses this DOM rather than selecting React's legacy input-event fallback.
const { createRoot } = await import("react-dom/client");
const domErrors = [];
window.addEventListener("error", (event) => domErrors.push(event.error));
const frames = new Map();
let frameId = 0;
window.requestAnimationFrame = (callback) => { frames.set(++frameId, callback); return frameId; };
window.cancelAnimationFrame = (id) => frames.delete(id);
globalThis.requestAnimationFrame = window.requestAnimationFrame;
globalThis.cancelAnimationFrame = window.cancelAnimationFrame;
window.matchMedia = (media) => ({
  matches: media.includes("prefers-reduced-motion"), media,
  addEventListener() {}, removeEventListener() {},
});
class Observer {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = globalThis.IntersectionObserver = Observer;
window.ResizeObserver = globalThis.ResizeObserver = Observer;
window.HTMLMediaElement.prototype.pause = function () {};
window.HTMLMediaElement.prototype.load = function () {};
window.HTMLMediaElement.prototype.play = function () { return Promise.resolve(); };
let scrollCalls = [];
let hashCalls = [];
window.scrollTo = ({ left = 0, top = 0 }) => {
  scrollCalls.push({ x: left, y: top });
  Object.defineProperty(window, "scrollX", { configurable: true, value: left });
  Object.defineProperty(window, "scrollY", { configurable: true, value: top });
  window.dispatchEvent(new window.Event("scroll"));
};
window.HTMLElement.prototype.scrollIntoView = function () {
  hashCalls.push(this.id);
  window.scrollTo({ top: 900 });
};
after(() => {
  dom.window.close();
  assert.deepEqual(domErrors, [], "No uncaught DOM event errors");
});

async function flushFrames() {
  for (let pass = 0; frames.size && pass < 8; pass++) {
    const pending = [...frames.values()];
    frames.clear();
    await act(async () => { pending.forEach((callback) => callback(performance.now())); });
  }
}
async function mount(url) {
  window.history.replaceState(null, "", url);
  window.scrollTo({ top: 0 });
  scrollCalls = []; hashCalls = [];
  const root = createRoot(document.getElementById("root"));
  await act(async () => {
    root.render(<StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>);
  });
  await flushFrames();
  return async () => { await act(async () => root.unmount()); frames.clear(); };
}
async function click(element) {
  assert.ok(element, "The expected interactive element exists");
  await act(async () => {
    element.dispatchEvent(new window.MouseEvent("click", { bubbles: true, cancelable: true, button: 0 }));
  });
  await flushFrames();
}
async function historyMove(direction) {
  await act(async () => {
    await new Promise((done, reject) => {
      const timer = setTimeout(() => reject(new Error("History navigation did not complete")), 1000);
      window.addEventListener("popstate", () => { clearTimeout(timer); done(); }, { once: true });
      window.history.go(direction);
    });
  });
  await flushFrames();
}
const selectedBrand = () => document.querySelector('[role="tab"][aria-selected="true"]')?.textContent;
const footerLink = (href) => document.querySelector('footer nav[aria-label="Footer navigation"] a[href="' + href + '"]');

test("all eight routes render, all referenced assets exist, and internal links resolve", () => {
  const pages = new Map();
  for (const { path } of siteRoutes) {
    const html = renderToStaticMarkup(<MemoryRouter initialEntries={[path]}><App /></MemoryRouter>);
    const document = new JSDOM(html).window.document;
    assert.equal(document.querySelectorAll("header").length, 1, path);
    assert.equal(document.querySelectorAll("footer").length, 1, path);
    assert.equal(document.querySelectorAll("main h1").length, 1, path);
    assert.ok(!document.querySelector("main h1").textContent.includes("Page not found"), path);
    for (const element of document.querySelectorAll("[src], [poster]")) {
      for (const attr of ["src", "poster"]) {
        const url = element.getAttribute(attr);
        if (url?.startsWith("/")) assert.ok(existsSync(resolve("public", url.slice(1))), path + ": " + url);
      }
    }
    pages.set(path, document);
  }
  for (const [path, document] of pages) {
    for (const anchor of document.querySelectorAll("a[href]")) {
      const url = new URL(anchor.getAttribute("href"), "https://babco.test" + path);
      if (url.origin !== "https://babco.test") continue;
      assert.ok(matchRoutes(siteRoutes, url.pathname), path + ": route " + url.pathname);
      if (url.hash) {
        const targetPage = pages.get(url.pathname);
        assert.ok(targetPage?.getElementById(decodeURIComponent(url.hash.slice(1))), path + ": hash " + url.href);
      }
    }
  }
  for (const match of readFileSync("src/index.css", "utf8").matchAll(/url\(["']?(\/[^)"']+)/g)) {
    assert.ok(existsSync(resolve("public", match[1].slice(1))), "CSS asset: " + match[1]);
  }
});

test("client-side navigation retains the shared layout and updates page metadata", async () => {
  const cleanup = await mount("/");
  try {
    const header = document.querySelector("header");
    for (const route of siteRoutes.slice(1)) {
      await click(footerLink(route.path) ?? document.querySelector('a[href="' + route.path + '"]'));
      assert.equal(window.location.pathname, route.path);
      assert.equal(document.querySelector("header"), header, "Header is retained without a document reload");
      assert.equal(document.title, route.title);
      assert.equal(document.querySelector('meta[name="description"]').content, route.description);
      assert.equal(document.activeElement.id, "main-content");
      assert.equal(window.scrollY, 0);
    }
  } finally { await cleanup(); }
});

test("Explore brands, brand deep links, tab URLs and Back/Forward work together", async () => {
  const cleanup = await mount("/");
  try {
    await click([...document.querySelectorAll("main a")].find((a) => /Explore our Brands/.test(a.textContent)));
    assert.equal(window.location.pathname, "/our-brands/");
    await click(document.querySelector('main a[href="/?brand=2#brands"]'));
    assert.equal(selectedBrand(), "Meenu");
    assert.equal(window.location.search, "?brand=2");
    assert.equal(hashCalls.at(-1), "brands");
    window.scrollTo({ top: 1400 });
    scrollCalls = [];
    await click(document.getElementById("brand-tab-3"));
    assert.equal(selectedBrand(), "Ullasam");
    assert.equal(window.location.search, "?brand=3");
    assert.equal(window.scrollY, 1400);
    assert.equal(scrollCalls.length, 0, "Tab selection preserves the viewport");
    await historyMove(-1);
    assert.equal(window.location.pathname, "/our-brands/");
    await historyMove(1);
    assert.equal(selectedBrand(), "Ullasam");
    assert.equal(window.scrollY, 1400, "Forward restores the remembered scroll position");
  } finally { await cleanup(); }
});

test("initial hash URLs work in StrictMode and invalid brand values fall back safely", async () => {
  for (const query of ["2", "3", "bad", "-1", "99", "1.5"]) {
    const cleanup = await mount("/?brand=" + query + "#brands");
    try {
      assert.equal(selectedBrand(), query === "2" ? "Meenu" : query === "3" ? "Ullasam" : "Anand");
      assert.equal(hashCalls.at(-1), "brands", "Initial hash is followed, even with StrictMode effect cleanup");
    } finally { await cleanup(); }
  }
});

test("section links, menu dismissal, search navigation and sticky state survive route changes", async () => {
  const cleanup = await mount("/who-we-are/");
  try {
    const header = document.querySelector("header");
    await click(header.querySelector(".desktop-nav button"));
    assert.equal(header.querySelector(".desktop-nav button").getAttribute("aria-expanded"), "true");
    await click(document.querySelector('#nav-menu-0 a[href="/who-we-are/#vision"]'));
    assert.equal(hashCalls.at(-1), "vision");
    assert.equal(header.querySelector(".desktop-nav button").getAttribute("aria-expanded"), "false");
    await click(header.querySelector('button[aria-label="Open navigation"]'));
    await click(document.querySelector('#mobile-navigation a[href="/innovation/"]'));
    assert.equal(window.location.pathname, "/innovation/");
    assert.equal(header.querySelector(".mobile-menu-button").getAttribute("aria-expanded"), "false");
    await click(header.querySelector('button[aria-label="Search this site"]'));
    assert.ok(document.querySelector('[role="dialog"]'));
    const result = [...document.querySelectorAll('[role="dialog"] a')].find((a) => a.textContent.includes("Leadership"));
    await click(result);
    assert.equal(window.location.pathname, "/our-people/");
    assert.equal(hashCalls.at(-1), "leadership");
    assert.equal(document.querySelector('[role="dialog"]'), null);
    assert.equal(document.body.style.overflow, "");
    window.scrollTo({ top: 200 });
    await flushFrames();
    assert.equal(header.dataset.sticky, "true");
    await click(footerLink("/our-business/"));
    await flushFrames();
    assert.equal(header.dataset.sticky, "false");
  } finally { await cleanup(); }
});

test("legacy HTML URLs preserve query/hash and unknown URLs show a 404", async () => {
  let cleanup = await mount("/who-we-are/index.html?source=old#mission");
  try {
    assert.equal(window.location.pathname, "/who-we-are/");
    assert.equal(window.location.search, "?source=old");
    assert.equal(window.location.hash, "#mission");
    assert.equal(hashCalls.at(-1), "mission");
  } finally { await cleanup(); }
  cleanup = await mount("/missing-page/");
  try {
    assert.match(document.querySelector("main h1").textContent, /Page not found/);
    await click(document.querySelector('main a[href="/"]'));
    assert.equal(window.location.pathname, "/");
    assert.ok(document.getElementById("home"));
  } finally { await cleanup(); }
});
