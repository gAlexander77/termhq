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
  assert(await page.locator(".hero-art img").evaluate((el) => getComputedStyle(el).animationName === "glass-settle"), "Existing glass artwork has its entrance animation");

  await page.mouse.move(1100, 400);
  await page.waitForFunction(() => document.querySelector('.landing-hero').style.getPropertyValue('--hero-x') !== '');
  assert(await page.locator(".landing-hero").evaluate((el) =>
    Math.abs(parseFloat(el.style.getPropertyValue("--hero-x"))) <= 8 &&
    Math.abs(parseFloat(el.style.getPropertyValue("--hero-y"))) <= 5), "Mouse depth stays restrained");
  await page.mouse.move(10, 10);
  assert(await page.locator(".landing-hero").evaluate((el) => el.style.getPropertyValue("--hero-x") === ""), "Leaving the hero resets depth");

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
  assert(await page.locator('.app-gallery').evaluate(visible), "Direct screenshot links bypass pending reveals");
  const height = await page.locator('.app-gallery').evaluate((el) => el.offsetHeight);
  await page.locator('.gallery-options label').filter({ hasText: 'Dracula' }).click();
  assert(await page.locator('#screenshot-dracula').isVisible(), "Theme selection still shows the real screenshot");
  assert(await page.locator('#screenshot-dracula figure').evaluate((el) => getComputedStyle(el).animationName === 'screenshot-enter'), "Theme changes have a short transition");
  assert(await page.locator('.app-gallery').evaluate((el) => el.offsetHeight) === height, "Theme changes do not move the layout");

  // Changing the OS preference also clears pending elements, without a reload.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => !document.querySelector('[data-reveal-state]'));
  assert(await page.locator('[data-reveal]').evaluateAll((els) => els.every((el) => getComputedStyle(el).opacity === '1')), "Reduced motion immediately exposes all content");
  assert(await page.locator('.hero-depth, .hero-art img, .hero-copy h1, .gallery-preview figure').evaluateAll((els) =>
    els.every((el) => getComputedStyle(el).animationName === 'none' && getComputedStyle(el).transform === 'none')), "Reduced motion disables entrances and depth");
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
        await local.locator('.landing-hero').dispatchEvent('pointermove', { pointerType: 'touch', clientX: 300, clientY: 400 });
        assert(await local.locator('.landing-hero').evaluate((el) => el.style.getPropertyValue('--hero-x') === ''), "Touch scrolling does not trigger mouse depth");
      } else {
        assert(await local.locator('[data-reveal]').evaluateAll((els) => els.every((el) => getComputedStyle(el).opacity === '1')), `${mode}: all content remains visible`);
      }
      await local.locator('.gallery-options label').filter({ hasText: 'Monokai' }).click();
      assert(await local.locator('#screenshot-monokai').isVisible(), `${mode}: theme selection remains usable`);
    } finally {
      await context.close();
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseURL);
  return { passed: checks.length, checks };
}
