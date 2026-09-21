import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { SITE } from "../config";

/**
 * /llms.txt — the convention for telling AI agents and their crawlers what a
 * site is and where its substance lives (https://llmstxt.org). robots.txt
 * already allows every agent; this is the map they read once they arrive.
 *
 * Generated from the docs collection, the same source the sidebar and the
 * sitemap use, so it can never list a page that does not exist or miss one
 * that does. /docs/all/ is the whole corpus on one page, which is what a model
 * wants when it wants everything.
 */
export const GET: APIRoute = async () => {
  const docs = (await getCollection("docs")).sort((a, b) => a.data.weight - b.data.weight);
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `TermHQ is a desktop app for Windows and macOS (Apple silicon); Linux support is pending. Source, releases and this website live at ${SITE.repo}. Everything below is public documentation, written for people; the complete set on one page is ${SITE.url}/docs/all/.`,
    "",
    "## Docs",
    "",
    `- [Overview](${SITE.url}/docs/): what TermHQ is and where to start`,
    ...docs.map((d) => `- [${d.data.title}](${SITE.url}/docs/${d.id}/): ${d.data.description}`),
    "",
    "## Releases",
    "",
    `- [Download](${SITE.url}/download/): installers for the latest release, one button per platform`,
    `- [Changelog](${SITE.url}/changelog/): every user-facing change, newest first`,
    `- [GitHub releases](${SITE.repo}/releases): the same installers with their updater signatures`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
