/** Progressive enhancement for the homepage; HTML is always visible by default. */
export function initLandingMotion(): () => void {
  if (!document.querySelector(".landing-hero")) return () => {};

  const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let observer: IntersectionObserver | undefined;

  const reveal = (target: HTMLElement, immediate = false) => {
    if (immediate) delete target.dataset.revealState;
    else target.dataset.revealState = "revealed";
    observer?.unobserve(target);
  };
  const showAll = () => {
    observer?.disconnect();
    targets.forEach((target) => delete target.dataset.revealState);
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
  const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) showAll(); };

  observe();
  reduced.addEventListener("change", observe);
  document.addEventListener("focusin", onFocus);
  window.addEventListener("hashchange", revealHash);
  window.addEventListener("pageshow", onPageShow);

  return () => {
    showAll();
    reduced.removeEventListener("change", observe);
    document.removeEventListener("focusin", onFocus);
    window.removeEventListener("hashchange", revealHash);
    window.removeEventListener("pageshow", onPageShow);
  };
}
