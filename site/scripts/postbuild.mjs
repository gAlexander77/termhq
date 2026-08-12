#!/usr/bin/env node
/**
 * Post-build fixups on the generated HTML.
 *
 * ONE JOB: make /docs/all's heading anchors unique.
 *
 * That page concatenates every documentation page, and each one's headings
 * carry the ids Astro generated for its own page — so two pages that both have
 * a "Configuration" heading emit `id="configuration"` twice. Duplicate ids are
 * invalid HTML, and every deep link to the second one silently lands on the
 * first. As the docs grow, collisions go from unlikely to certain.
 *
 * The fix is to prefix each heading id inside a section with that section's
 * page slug, and rewrite in-page hrefs to match — otherwise every
 * cross-reference inside the corpus would jump to the wrong page's section.
 *
 * Why post-build rather than at render time: Astro's markdown pipeline assigns
 * heading ids through a global rehype plugin, and the same rendered Content is
 * used by the individual pages, which must keep their clean unprefixed
 * anchors. Rewriting one output file is smaller and far more predictable than
 * teaching the pipeline to behave differently per consumer.
 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ALL = resolve(ROOT, "dist/docs/all/index.html");

if (!existsSync(ALL)) {
  console.error(`postbuild: ${ALL} not found — did astro build run?`);
  process.exit(1);
}

let html = await readFile(ALL, "utf8");

// Split on the section wrappers the page emits, so each rewrite is scoped to
// one document. Everything outside a section (nav, TOC, banner) is untouched —
// the TOC already points at prefixed anchors.
const SECTION = /<section class="alldoc" id="([^"]+)">([\s\S]*?)<\/section>/g;

let sections = 0;
let ids = 0;
let hrefs = 0;

html = html.replace(SECTION, (whole, slug, body) => {
  sections += 1;

  const prefixed = body
    // Heading ids, except the `<slug>--top` one this page adds itself.
    .replace(/(<h[2-6][^>]*?\sid=")([^"]+)(")/g, (m, pre, id, post) => {
      if (id.startsWith(`${slug}--`)) return m;
      ids += 1;
      return `${pre}${slug}--${id}${post}`;
    })
    // In-page links, so cross-references inside a doc stay inside that doc.
    .replace(/(\shref=")#([^"]+)(")/g, (m, pre, id, post) => {
      if (id.startsWith(`${slug}--`)) return m;
      hrefs += 1;
      return `${pre}#${slug}--${id}${post}`;
    });

  return `<section class="alldoc" id="${slug}">${prefixed}</section>`;
});

await writeFile(ALL, html, "utf8");

console.log(
  `postbuild: /docs/all — ${sections} sections, ${ids} heading ids prefixed, ${hrefs} in-page links rewritten`,
);

if (sections === 0) {
  console.error("postbuild: no .alldoc sections found — the markup changed?");
  process.exit(1);
}
