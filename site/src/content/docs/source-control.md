---
title: "Source control"
weight: 65
description: "The Git panel: status, staging and diffs, branches, syncing, conflict resolution, and undo — built for repositories that agents work in."
---

The Git tab in the sidebar is a source-control panel built around one idea:
it routes you to the right tool instead of trying to become one. It stages,
commits, branches, syncs, and untangles conflicts — and the moment real
editing is needed, it hands the file to your editor, a terminal editor, or an
agent, rather than growing a half-editor of its own.

Like the file tree, it always shows the repository of the pane you are
focused on — click into a different project's terminal and the panel follows.

## Status, staging, and commits

Changed files sit in staged and unstaged sections. Click a file for its diff
— unified or side by side — stage what belongs together, write the message,
commit. A hint appears if the subject line runs long, a Signed-off-by trailer
is one switch away, and **amend** exists for the commit you finished two
seconds too early.

The spark button asks one of your installed agent CLIs for a commit message:
it reads the staged changes and drops a suggestion into the box for you to
edit before anything happens. Your house style — a ticket prefix, a tense, a
language — goes in **Settings → Git**.

## Branches

The branch picker lists branches most-recently-committed first (or
alphabetically), searchable, with create, rename, delete, and fast-forward.
If uncommitted work blocks a switch, the panel offers to stash, switch, and
bring the changes along in one step.

## Syncing

Fetch, pull, and push, with honest ahead/behind counts — an optional
background auto-fetch keeps them fresh. Pull is **fast-forward only** by
default: on a diverged branch it stops and says so instead of quietly
merging, and the rejected-push banner offers the rebase from there.

## Conflicts

When a merge or rebase stops on conflicts, the panel says so and lists the
conflicted files. Resolve each one block by block — keep your side, theirs,
or both — or hand the file to something with more context: your editor, a
terminal editor right in the pane, or an agent with a ready-made prompt.
Continue or abort the whole operation from the same banner, and an optional
badge puts the conflict count on the Git tab itself, so a merge an agent
started in a background pane is visible from anywhere.

## Undo

The panel's undo surfaces git's own safety net: back out of a commit, a
merge, or a botched operation by returning the branch to where it was.
Discarding a file's changes asks first (configurable) — and deleting an
untracked file always asks, because that is the one thing git cannot bring
back.

Everything the panel does runs through the `git` on your PATH — your
credentials, your hooks, your configuration — so nothing behaves differently
than it would in your terminal. Repositories on WSL paths are not supported
yet; see [Troubleshooting](/docs/troubleshooting/).
