import type { APIRoute } from "astro";
import { SITE, PRE_RELEASE } from "../config";

/**
 * robots.txt, generated from the same PRE_RELEASE switch the meta tags read —
 * so the two can never disagree. The meta tag is the one that actually keeps a
 * page out of results (robots.txt alone will not remove a URL a crawler
 * already knows), but both should say the same thing.
 */
export const GET: APIRoute = () => {
  const body = PRE_RELEASE
    ? [
        "# TermHQ is not released yet. Nothing here should be indexed, and every",
        "# page also carries a noindex meta tag — robots.txt alone would not keep",
        "# an already-known URL out of results.",
        "#",
        "# Flipping PRE_RELEASE to false in src/config.ts turns this into a normal",
        "# allow-all with a sitemap. That is a deliberate launch step.",
        "User-agent: *",
        "Disallow: /",
        "",
      ].join("\n")
    : [
        "User-agent: *",
        "Allow: /",
        "",
        `Sitemap: ${SITE.url}/sitemap-index.xml`,
        "",
      ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
