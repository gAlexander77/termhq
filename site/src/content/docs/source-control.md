---
title: "Source control"
weight: 65
description: "The Git panel: a viewer — status, diffs, conflicts, branch switching, and syncing, built for watching repositories that agents work in."
---

The Git tab in the sidebar is deliberately a **viewer**. It shows you the
truth about the repository — status, diffs, counts, conflicts — lets you
switch branches and sync with the remote, and stops there. TermHQ is a
terminal app: the complete git client is always one keystroke below the
panel, and anything that edits history belongs to it, or to your editor.
The panel's job is the part a terminal shows poorly — the state of the repo
at a glance while agents are busy in the panes.

Like the file tree, it always shows the repository of the pane you are
focused on — click into a different project's terminal and the panel
follows.

## What it shows

Changed files sit in staged and unstaged sections with familiar status
letters. Click a file for its diff — unified or side by side, with
word-level change highlighting and line numbers that stay out of your
copies. Untracked files preview as an all-additions diff.

When a merge, rebase, or cherry-pick is in progress, a banner says so in
plain words — "Merging feature-x into main — 2 files need a decision" —
and tells you the exact command that concludes it in the terminal. Errors
are reported readably: a plain-language summary, the affected files, a
next-step hint, and git's verbatim message one click away. A genuine git
failure is reported as what it is, never disguised as "not a repository."

## Branches

The branch picker lists branches most-recently-committed first (or
alphabetically), searchable with ranked matching, remote branches included
— picking one checks it out, creating the local tracking branch when
needed. Switching branches is the panel's one local action; git's own
refusals (uncommitted changes in the way) surface as-is, and the fix is
yours to make in the terminal.

## Syncing

Fetch, pull, and push, with honest ahead/behind counts — an optional
background auto-fetch keeps them fresh. Pull is **fast-forward only** by
default: on a diverged branch it stops and says so instead of quietly
merging. A rejected push offers **pull with rebase**, the non-destructive
answer. Publishing a new branch follows your git configuration for which
remote to use rather than assuming one — and when several remotes leave it
genuinely ambiguous, the panel asks instead of guessing.

## Conflicts

When an operation stops on conflicts, the panel lists the conflicted files
and an optional badge puts the count on the Git tab itself, so a merge an
agent started in a background pane is visible from anywhere. **View** opens
each conflict read-only, side by side, in the words VS Code taught everyone
— **Current** and **Incoming**, with the actual branch names attached, and
labeled truthfully during a rebase (current is the base you are rebasing
onto; incoming is your own commits). From there, hand the file to your IDE
— VS Code and Cursor open their merge editors for a conflicted file — or to
a terminal editor in a pane. Or click **Copy AI prompt**: the panel
composes a resolve briefing — which files, which marker side belongs to
which branch (stated correctly even mid-rebase), and the
stage-don't-commit ground rules — and puts it on your clipboard to paste
into whichever AI you trust: your IDE's chat, an agent running in a pane,
anywhere. As markers disappear, rows leave the list.

Everything the panel reads comes through the `git` on your PATH — your
credentials, your hooks, your configuration — so what it shows never
disagrees with your terminal. Repositories on WSL paths are not supported
yet; see [Troubleshooting](/docs/troubleshooting/).
