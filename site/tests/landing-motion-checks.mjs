/** Run against the local production preview with a Playwright Page. */
export default async function checkLandingMotion(page, baseURL = "http://127.0.0.1:4322") {
  if (!/^http:\/\/(localhost|127\.0\.0\.1|\[::1\]):\d+$/.test(baseURL)) {
    throw new Error("Use a local preview, not the live website.");
  }
  const checks = [];
  const assert = (ok, name) => { if (!ok) throw new Error(name); checks.push(name); };
  const visible = (el) => {
    const style = getComputedStyle(el);
    return style.opacity === "1" && (style.transform === "none" || new DOMMatrix(style.transform).isIdentity);
  };
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(baseURL);
  await page.waitForFunction(() => document.querySelector('[data-reveal-state="pending"]'));
  assert(await page.locator("h1").evaluate((el) => getComputedStyle(el).opacity === "1"), "Headline is opaque during its entrance");
  assert(await page.evaluate(() => document.getAnimations().every((animation) => {
    const timing = animation.effect.getTiming();
    return timing.iterations === 1 && timing.delay + Number(timing.duration) < 5000;
  })), "Opening animations settle within five seconds without looping");
  assert(await page.locator(".hero-video").evaluate((el) => getComputedStyle(el).animationName === "video-settle"), "Hero recording has its entrance animation");

  await page.locator('.hero-video').evaluate(async (el) => {
    await Promise.all(el.getAnimations().map((animation) => animation.finished));
  });
  const artworkBounds = await page.locator('.hero-video').boundingBox();
  for (const [x, y] of [[1100, 400], [200, 200], [10, 10]]) {
    await page.mouse.move(x, y);
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert(JSON.stringify(await page.locator('.hero-video').boundingBox()) === JSON.stringify(artworkBounds),
      `Mouse movement to ${x},${y} leaves the hero recording stationary`);
  }

  await page.locator('#parallel-agents').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('#parallel-agents').dataset.revealState === 'revealed');
  await page.locator('#parallel-agents').evaluate(async (el) => {
    await Promise.all(el.getAnimations().map((animation) => animation.finished));
  });
  assert(await page.locator('#parallel-agents').evaluate(visible), "Scroll reveals finish fully visible");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.locator('#parallel-agents').scrollIntoViewIfNeeded();
  assert(await page.locator('#parallel-agents').evaluate((el) => el.getAnimations().every((animation) => animation.playState === "finished")), "Scrolling back does not replay revealed sections");

  await page.goto(baseURL);
  await page.waitForFunction(() => document.querySelector('.feature-grid .cell').dataset.revealState === 'pending');
  await page.locator('.feature-grid .cell').first().focus();
  assert(await page.locator('.feature-grid .cell').first().evaluate(visible), "Keyboard focus reveals a link immediately");
  assert(await page.locator('.feature-grid .cell').first().evaluate((el) => el === document.activeElement), "Reveal does not steal keyboard focus");

  await page.goto(baseURL + '/#screenshots');
  assert(await page.locator('.app-showcase').evaluate(visible), "Direct screenshot links bypass pending reveals");

  // Changing the OS preference also clears pending elements, without a reload.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => !document.querySelector('[data-reveal-state]'));
  assert(await page.locator('[data-reveal]').evaluateAll((els) => els.every((el) => getComputedStyle(el).opacity === '1')), "Reduced motion immediately exposes all content");
  assert(await page.locator('.hero-video, .hero-copy h1').evaluateAll((els) =>
    els.every((el) => getComputedStyle(el).animationName === 'none' && getComputedStyle(el).transform === 'none')), "Reduced motion disables entrances");
  assert(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto'), "Reduced motion keeps anchor scrolling instant");

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(baseURL);
  await page.waitForFunction(() => document.querySelector('[data-reveal-state="pending"]'));
  await page.emulateMedia({ media: 'print' });
  assert(await page.locator('[data-reveal]').evaluateAll((els) => els.every((el) => getComputedStyle(el).opacity === '1')), "Printing never hides pending sections");
  await page.emulateMedia({ media: 'screen' });

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(baseURL);
    await page.waitForFunction(() => document.querySelector('[data-reveal-state="pending"]'));
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Motion fits ${width}px`);
  }

  const browser = page.context().browser();
  for (const mode of ['no-script', 'no-observer', 'touch']) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: 'no-preference',
      javaScriptEnabled: mode !== 'no-script',
      hasTouch: mode === 'touch',
      isMobile: mode === 'touch',
    });
    try {
      if (mode === 'no-observer') await context.addInitScript(() => { delete window.IntersectionObserver; });
      const local = await context.newPage();
      await local.goto(baseURL);
      if (mode === 'touch') {
        await local.locator('.hero-video').evaluate(async (el) => {
          await Promise.all(el.getAnimations().map((animation) => animation.finished));
        });
        const beforeTouch = await local.locator('.hero-video').boundingBox();
        await local.locator('.landing-hero').dispatchEvent('pointermove', { pointerType: 'touch', clientX: 300, clientY: 400 });
        assert(JSON.stringify(await local.locator('.hero-video').boundingBox()) === JSON.stringify(beforeTouch), "Touch movement leaves the hero recording stationary");
      } else {
        assert(await local.locator('[data-reveal]').evaluateAll((els) => els.every((el) => getComputedStyle(el).opacity === '1')), `${mode}: all content remains visible`);
      }
      assert(await local.locator('#screenshots video').isVisible(), `${mode}: the product recording remains visible`);
    } finally {
      await context.close();
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseURL);
  return { passed: checks.length, checks };
}
