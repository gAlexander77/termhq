/** Loop demo clips only while they are on screen. With reduced motion they stay paused, with controls. */
export function initClips(): () => void {
  const clips = [...document.querySelectorAll<HTMLVideoElement>("video.clip-video")];
  if (!clips.length || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return () => {};

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      const video = target as HTMLVideoElement;
      // A blocked autoplay hands control back to the visitor.
      if (isIntersecting) video.play().catch(() => { video.controls = true; });
      else video.pause();
    });
  }, { threshold: 0.25 });
  clips.forEach((video) => {
    video.controls = false;
    observer.observe(video);
  });
  return () => observer.disconnect();
}
