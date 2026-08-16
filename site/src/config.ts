/** Site-wide constants. One place, imported everywhere, so nothing drifts. */

export const SITE = {
  name: "TermHQ",
  url: "https://termhq.dev",
  /** Used as the <title> on the home page and as the OG title fallback. */
  title: "TermHQ — A GUI Terminal for AI Coding Agents",
  description:
    "TermHQ is a keyboard-first GUI terminal for running AI coding agents. Tiling panes, shells that survive quitting the app, resumable workspaces, and local voice dictation. Windows, macOS, and Linux.",
  repo: "https://github.com/gAlexander77/termhq",
  /**
   * Resolved through GitHub's own redirect rather than naming a version, so a
   * release never requires editing this file. Every download link on the site
   * points here.
   */
  latestRelease: "https://github.com/gAlexander77/termhq/releases/latest",
  ogImage: "/og.png",
} as const;

/**
 * THE PRE-RELEASE SWITCH.
 *
 * While true:
 *   - every page emits `noindex, nofollow`
 *   - robots.txt disallows the whole site
 *   - no sitemap is generated or advertised
 *
 * TermHQ is unreleased. A preview deployment that got indexed would put
 * half-written pages into search results under termhq.dev, and a crawled page
 * outlives its own deletion by weeks — this is the one mistake on the site that
 * reverting a commit does not undo.
 *
 * Flipping this to false is a deliberate launch step, performed together with
 * setting the SITE_DEPLOY_ENABLED repository variable. It is never a side
 * effect of another change.
 */
export const PRE_RELEASE = true;

export const NAV = [
  { label: "Docs", href: "/docs/" },
  { label: "Download", href: "/download/" },
  { label: "Changelog", href: "/changelog/" },
] as const;
