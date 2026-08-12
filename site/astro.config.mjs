// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { PRE_RELEASE } from "./src/config.ts";

export default defineConfig({
  site: "https://termhq.dev",

  // Directory format + always-trailing-slash keeps every URL shaped like
  // /docs/workspaces/, which is what the docs cross-link to.
  trailingSlash: "always",
  build: { format: "directory" },

  integrations: [
    // No sitemap at all while unreleased. Shipping one that lists pages which
    // all say noindex is a contradiction crawlers report as a warning, and
    // there is nothing here we want discovered yet.
    ...(PRE_RELEASE
      ? []
      : [
          sitemap({
            // /docs/all duplicates every word on the site. Indexed, it would
            // compete with the individual topic pages for their own queries,
            // so it is noindex — and a noindex URL must not appear here.
            filter: (page) => !page.includes("/docs/all"),
          }),
        ]),
  ],

  markdown: {
    // Heading ids are load-bearing: /docs/all links into every section and the
    // search index returns heading-level results.
    shikiConfig: { theme: "github-dark-default", wrap: false },
  },

  devToolbar: { enabled: false },
});
