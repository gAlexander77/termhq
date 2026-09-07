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
  assert(await page.evaluate(async () => {
    const urls = [...new Set([...document.querySelectorAll('main a[href^="/"]')].map((el) => el.href))];
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    return responses.every((response) => response.ok);
  }), "Homepage guide links resolve");

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
  return { passed: checks.length, checks };
}
