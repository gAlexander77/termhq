/**
 * Reusable browser regression checks. Pass a Playwright Page and the local
 * production-preview URL after `npm run build`. No test-only runtime is shipped.
 */
export default async function checkWebsite(page, baseURL = "http://127.0.0.1:4322") {
  if (!/^http:\/\/(localhost|127\.0\.0\.1|\[::1\]):\d+$/.test(baseURL)) {
    throw new Error("Run these checks against a local preview, not the live site.");
  }
  const checks = [];
  const assert = (value, name) => {
    if (!value) throw new Error(name);
    checks.push(name);
  };
  const goto = (path) => page.goto(baseURL + path);

  // Rapid viewport changes and focus moves should not race smooth scrolling.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await goto("/");
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Homepage fits ${width}px`);
    assert(await page.locator('.nav-links a[href="/docs/"]').isVisible(), `Docs remains available at ${width}px`);
  }
  assert(await page.locator("h1").count() === 1, "Homepage has one main heading");
  assert(await page.locator(".workflow").count() === 3, "Three principal workflows");
  assert(await page.locator(".feature-grid .cell").count() === 6, "Six concise supporting features");
  assert(await page.locator("video").count() === 0, "No placeholder demos shipped");
  assert(await page.locator('link[rel="canonical"]').getAttribute("href") === "https://termhq.dev/", "Canonical URL preserved");
  assert((await page.locator('meta[name="robots"]').getAttribute("content")).startsWith("index,follow"), "Release remains indexable");
  assert(await page.evaluate(() => {
    const graph = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)["@graph"];
    return graph.some((item) => item["@type"] === "SoftwareApplication" && item.operatingSystem === "Windows, macOS");
  }), "Product structured data preserved");

  const favicons = await page.evaluate(async () => {
    const links = [...document.querySelectorAll('link[rel="icon"]')];
    const svg = links.find((link) => link.type === "image/svg+xml");
    const ico = links.find((link) => link.type === "image/x-icon");
    if (!svg || !ico) throw new Error("Both favicon formats must be declared");
    const response = await fetch(ico.href);
    if (!response.ok) throw new Error("ICO fallback failed to load");
    const buffer = await response.arrayBuffer();
    const view = new DataView(buffer);
    if (view.getUint16(0, true) !== 0 || view.getUint16(2, true) !== 1) throw new Error("Invalid ICO header");
    const frames = [];
    for (let i = 0; i < view.getUint16(4, true); i++) {
      const entry = 6 + i * 16;
      const size = view.getUint8(entry) || 256;
      const length = view.getUint32(entry + 8, true);
      const offset = view.getUint32(entry + 12, true);
      const url = URL.createObjectURL(new Blob([buffer.slice(offset, offset + length)], { type: "image/png" }));
      try {
        const img = new Image();
        img.src = url;
        await img.decode();
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = size;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        frames.push({
          size,
          width: img.naturalWidth,
          height: img.naturalHeight,
          corners: [[0, 0], [size - 1, 0], [0, size - 1], [size - 1, size - 1]]
            .map(([x, y]) => [...ctx.getImageData(x, y, 1, 1).data]),
        });
      } finally {
        URL.revokeObjectURL(url);
      }
    }
    return {
      svgPreferred: links.at(-1) === svg && svg.sizes.contains("any"),
      versioned: [svg, ico].every((link) => new URL(link.href).searchParams.has("v")),
      frames,
    };
  });
  assert(favicons.svgPreferred, "Scalable SVG favicon is preferred over the ICO fallback");
  assert(favicons.versioned, "Favicon URLs refresh cached tab icons");
  assert(favicons.frames.map((frame) => frame.size).join(",") === "16,32,48", "ICO contains all three tab icon sizes");
  for (const frame of favicons.frames) {
    // A rounded edge can lightly cover a corner pixel at 16px. It must stay
    // translucent black, never the nearly opaque white matte of the old ICO.
    assert(frame.width === frame.size && frame.height === frame.size &&
      frame.corners.every(([r, g, b, a]) => r === 0 && g === 0 && b === 0 && a <= 16),
    `${frame.size}px favicon corners are transparent without a white matte`);
  }

  assert(await page.evaluate(async () => {
    const urls = [...new Set([...document.querySelectorAll('main a[href^="/"]')].map((el) => el.href))];
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    return responses.every((response) => response.ok);
  }), "Homepage guide links resolve");

  assert(await page.locator('.hero-actions a[href="#screenshots"]').count() === 1, "Hero leads to actual application screenshots");
  assert((await page.locator("#screenshots-title").textContent()) === "This is TermHQ.", "First recording introduces the product, not just theming");
  assert((await page.locator(".gallery-note").textContent()).includes("VS Code themes"), "Built-in themes are distinguished from marketplace ones");
  const clipsOk = (els) => els.every((v) => v.muted && v.loop && v.playsInline && v.getAttribute("preload") === "none" &&
    v.getAttribute("aria-label") && v.poster && Math.abs(v.getBoundingClientRect().width / v.getBoundingClientRect().height - 16 / 9) < .02);
  assert(await page.locator("video.clip-video").evaluateAll(clipsOk), "Every clip is muted, lazy, labelled, postered, and uncropped");
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Recordings fit ${width}px`);
  }
  await page.locator("#screenshots video").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => !document.querySelector("#screenshots video").paused);
  assert(await page.locator("#screenshots video").evaluate((v) => !v.controls), "An on-screen recording plays without controls");
  await page.locator(".closing-cta").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector("#screenshots video").paused);
  const noScriptContext = await page.context().browser().newContext({ javaScriptEnabled: false, reducedMotion: "reduce", viewport: { width: 390, height: 844 } });
  try {
    const noScriptPage = await noScriptContext.newPage();
    await noScriptPage.goto(baseURL + "/#screenshots");
    assert(await noScriptPage.locator("video.clip-video").evaluateAll((els) => els.every((v) => v.controls && v.paused)), "Without JavaScript, recordings wait with their controls");
  } finally {
    await noScriptContext.close();
  }

  await page.locator('input[value="mac"]').check();
  assert(await page.locator(".keys-mac").isVisible() && !await page.locator(".keys-windows").isVisible(), "macOS shortcut switch");
  assert(await page.locator(".keys-mac .keys-row").count() === 4, "Four macOS shortcuts");
  assert((await page.locator(".keys-mac").innerText()).includes("⌘"), "macOS displays Command");
  await page.locator('input[value="windows"]').check();
  assert(await page.locator(".keys-windows").isVisible() && !await page.locator(".keys-mac").isVisible(), "Windows shortcut switch");

  const opener = page.locator("[data-search-open]");
  const input = page.locator("[data-search-input]");
  const close = page.locator("[data-search-close]");
  await opener.click();
  await page.keyboard.press("Shift+Tab");
  assert(await close.evaluate((el) => el === document.activeElement), "Search traps reverse Tab at close button");
  await page.keyboard.press("Tab");
  assert(await input.evaluate((el) => el === document.activeElement), "Search cycles forward Tab to input");
  await input.fill("workspaces");
  await page.locator(".search-result").first().waitFor();
  assert(await input.getAttribute("aria-expanded") === "true", "Search announces expanded results");
  await page.keyboard.press("ArrowDown");
  const active = await input.getAttribute("aria-activedescendant");
  assert(active === "search-result-1" && await page.locator(`#${active}`).getAttribute("aria-selected") === "true", "Search selection tracks arrow keys");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  assert(!await page.locator("dialog").evaluate((el) => el.open), "Enter on close button closes, not a search result");
  assert(await opener.evaluate((el) => el === document.activeElement), "Search restores focus");

  await opener.click();
  await input.fill("zzzznonexistenttermzzzz");
  await page.waitForFunction(() => document.querySelector("[data-search-empty]").textContent === "No matches.");
  assert(await input.getAttribute("aria-expanded") === "false", "No matches resets combobox state");
  await page.keyboard.press("Escape");
  assert(await page.evaluate(() => document.body.style.overflow !== "hidden"), "Escape restores page scrolling");

  await opener.click();
  await input.fill("workspaces");
  await page.locator(".search-result").first().waitFor();
  const selectedURL = await page.locator(".search-result").first().evaluate((el) => el.href);
  await page.keyboard.press("Enter");
  await page.waitForURL(selectedURL);
  assert(page.url() === selectedURL, "Enter opens the selected search result");

  await goto("/docs/configuration/");
  assert(await page.locator(".toc-rail").isVisible(), "Wide-screen outline is separate from article");
  assert(!await page.locator(".toc-inline").isVisible(), "No duplicate visible outline on desktop");
  await page.setViewportSize({ width: 390, height: 844 });
  assert(!await page.locator(".toc-inline").evaluate((el) => el.open), "Mobile outline starts collapsed");
  assert(await page.locator(".toc-inline").evaluate((el) => el.getBoundingClientRect().height < 80), "Mobile outline is compact");
  assert(await page.locator(".nav").evaluate((el) => el.getBoundingClientRect().height === 64), "Mobile header is 64px");
  await page.locator(".toc-inline summary").click();
  assert(await page.locator(".toc-inline nav").isVisible(), "Mobile outline expands");
  await page.locator(".docs-nav-mobile summary").click();
  assert(await page.locator(".docs-nav-mobile a").count() === 19, "All documentation destinations preserved");
  for (const title of ["Getting started", "Workspace", "Tools", "Reference"]) {
    assert(await page.locator(".docs-nav-mobile h4").getByText(title, { exact: true }).count() === 1, `Documentation group: ${title}`);
  }
  await page.locator('.docs-nav-mobile a[href="/docs/installation/"]').click();
  assert(await page.evaluate(() => location.pathname) === "/docs/installation/", "Mobile documentation navigation works");

  await goto("/download/");
  assert(await page.locator(".dl-grid .dl-cell").count() === 2, "Only supported platforms have download cards");
  assert((await page.locator(".platform-pending").innerText()) === "Linux support is pending.", "Linux status stays concise");
  assert(await page.locator(".dl-install-note").count() === 2, "Installation guidance beside each download");
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Download fits ${width}px`);
  }

  // Exercise a missing index without exposing development instructions.
  const indexURL = baseURL + "/pagefind/pagefind.js";
  await page.route(indexURL, (route) => route.abort());
  await goto("/");
  await opener.click();
  await page.waitForFunction(() => document.querySelector("[data-search-empty]").textContent.includes("temporarily unavailable"));
  assert(!(await page.locator("[data-search-empty]").innerText()).includes("npm"), "Search failure is user-facing");
  await close.click();
  await page.unroute(indexURL);

  // A pending search must not repopulate results after the user clears it.
  await page.route(indexURL, (route) => route.fulfill({
    contentType: "text/javascript",
    body: `export function search() { return new Promise(resolve => {
      window.finishTestSearch = () => resolve({ results: [{ data: async () => ({
        url: '/docs/workspaces/', meta: {title: 'Workspaces'}, excerpt: 'Workspace result'
      }) }] });
    }); }`,
  }));
  await goto("/");
  await opener.click();
  await input.fill("workspaces");
  await page.waitForFunction(() => typeof window.finishTestSearch === "function");
  await input.fill("");
  await page.evaluate(async () => {
    window.finishTestSearch();
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  });
  assert(await page.locator(".search-result").count() === 0, "Cleared query ignores stale search completion");
  await close.click();
  await page.unroute(indexURL);

  await goto("/");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  return { passed: checks.length, checks };
}
