/** Progressive enhancement for the homepage; HTML is always visible by default. */
export function initLandingMotion(): () => void {
  const hero = document.querySelector<HTMLElement>(".landing-hero");
  if (!hero) return () => {};

  const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  let observer: IntersectionObserver | undefined;
  let frame = 0;
  let x = 0;
  let y = 0;

  const reveal = (target: HTMLElement, immediate = false) => {
    if (immediate) delete target.dataset.revealState;
    else target.dataset.revealState = "revealed";
    observer?.unobserve(target);
  };
  const showAll = () => {
    observer?.disconnect();
    targets.forEach((target) => delete target.dataset.revealState);
  };
  const resetDepth = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    hero.style.removeProperty("--hero-x");
    hero.style.removeProperty("--hero-y");
  };
  const revealHash = () => {
    // Malformed URL fragments should not prevent the rest of the page loading.
    let id: string;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const anchor = document.getElementById(id);
    if (!anchor) return;
    targets.filter((target) => target.contains(anchor) || anchor.contains(target))
      .forEach((target) => reveal(target, true));
  };
  const observe = () => {
    showAll();
    resetDepth();
    if (reduced.matches || !("IntersectionObserver" in window)) return;
    try {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      }, { rootMargin: "0px 0px -32px 0px", threshold: 0 });
      targets.forEach((target) => {
        // Never hide content already visible at load or on a restored scroll position.
        if (target.getBoundingClientRect().top < innerHeight) return;
        target.dataset.revealState = "pending";
        observer?.observe(target);
      });
      revealHash();
    } catch {
      showAll();
    }
  };
  const onFocus = (event: FocusEvent) => {
    if (!(event.target instanceof Element)) return;
    const target = event.target.closest<HTMLElement>("[data-reveal]");
    if (target) reveal(target, true);
  };
  const onPointer = (event: PointerEvent) => {
    if (reduced.matches || !finePointer.matches || event.pointerType !== "mouse") return;
    const bounds = hero.getBoundingClientRect();
    x = ((event.clientX - bounds.left) / bounds.width - .5) * 16;
    y = ((event.clientY - bounds.top) / bounds.height - .5) * 10;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      hero.style.setProperty("--hero-x", `${x.toFixed(2)}px`);
      hero.style.setProperty("--hero-y", `${y.toFixed(2)}px`);
      frame = 0;
    });
  };
  const onVisibility = () => { if (document.hidden) resetDepth(); };
  const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) showAll(); };

  observe();
  reduced.addEventListener("change", observe);
  finePointer.addEventListener("change", resetDepth);
  hero.addEventListener("pointermove", onPointer, { passive: true });
  hero.addEventListener("pointerleave", resetDepth);
  document.addEventListener("focusin", onFocus);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("hashchange", revealHash);
  window.addEventListener("pageshow", onPageShow);

  return () => {
    showAll();
    resetDepth();
    reduced.removeEventListener("change", observe);
    finePointer.removeEventListener("change", resetDepth);
    hero.removeEventListener("pointermove", onPointer);
    hero.removeEventListener("pointerleave", resetDepth);
    document.removeEventListener("focusin", onFocus);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("hashchange", revealHash);
    window.removeEventListener("pageshow", onPageShow);
  };
}
