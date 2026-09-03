import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/**
 * Documentation pages. The schema is the point: a docs file missing a title or
 * description fails the build rather than shipping a page with an empty <title>
 * and no meta description, which is the SEO defect nobody notices until the
 * page has been live for a month.
 */
const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Sidebar and /docs/all ordering. */
    weight: z.number(),
    /** Overrides the computed "<title> — TermHQ" when a page needs its own. */
    metaTitle: z.string().optional(),
  }),
});

/**
 * The repo-root CHANGELOG.md, loaded in place rather than copied into src/ —
 * hence the `../` base, which reaches out of site/ to the repository root.
 * It is the single canonical source: this collection feeds the website, and the
 * release workflow reads the same file for GitHub release bodies. Nobody
 * maintains release prose twice, and the two cannot drift.
 */
const changelog = defineCollection({
  loader: glob({ pattern: "CHANGELOG.md", base: "../" }),
});

export const collections = { docs, changelog };
