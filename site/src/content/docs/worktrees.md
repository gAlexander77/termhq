---
title: "Worktrees"
weight: 67
description: "Keep several checkouts organized, open a terminal or agent in the right one, and track worktrees across repositories."
---

A Git worktree is another working folder for the same repository. It lets you
keep one branch open while another branch — or another coding agent — works in
parallel, without switching the files underneath either task.

TermHQ gives you two views of them:

- The **Worktrees** section of the sidebar's **Git** panel manages worktrees for
  the repository belonging to the pane you are focused on. A browser or
  [SSH pane](/docs/ssh/) has no local folder, so the panel does not follow one.
- The **Worktrees** item in the status bar shows checkouts across every folder
  you chose to track, no matter which pane is focused.

## Track worktrees across repositories

Open **Settings → Git → Worktree roots** and add the folders that contain your
repositories or worktrees. Type a path, or use **Choose folder…** to pick one
with the system dialog. A folder that cannot be read is refused when you add it,
with the reason.

As soon as at least one root is set, **Worktrees** appears at the far left of the
status bar with the number of checkouts found. It comes first in the bar, ahead
of the focused repository's branch, so it stays put while the branch beside it
changes with every pane you focus. No root means no scan and no status-bar item.

The scan looks for Git checkouts up to two levels beneath each root, which
covers both common arrangements:

```text
root/project
root/project/worktree
```

It does not crawl the rest of your machine. If one checkout belongs to a
repository whose primary folder sits outside your chosen roots, TermHQ includes
that folder in the repository group and labels it **outside roots** rather than
searching beyond the roots.

## Reading the Worktrees view

Click the status-bar item to open the full list. Its header sums it up — "12
checkouts · 5 repositories" — and once there is more than one checkout, a filter
box narrows the list to the repositories, branches or folders matching what you
type.

Checkouts are grouped by repository, with each repository open by default. Fold a
group with a click, <kbd>Enter</kbd>, or <kbd>←</kbd>; <kbd>→</kbd> opens it again.
The folded state is remembered until that TermHQ window closes.

Each row shows:

- whether it is the **primary** checkout or a **linked** worktree
- the branch, or a detached-head label
- the folder path
- badges for what else is true: **changes**, **detached**, **locked**,
  **folder missing**, or **outside roots**

After the view opens, TermHQ checks the worktrees one at a time. The **changes**
badge appears as each checkout is checked, so a long list can become useful
immediately instead of making you wait for every folder.

A plain clone is labeled **primary**. Folders created with `git worktree` are
labeled **linked**. “Primary” describes its role in Git; it does not assume the
branch is named `main`.

## Open the right terminal or agent

Double-click a checkout, select it and press <kbd>Enter</kbd>, or use its terminal
button to open your default shell there. If TermHQ already opened a terminal for
that checkout, the same action focuses it instead of creating another one.

Open the row menu with **⋯**, right-click, or <kbd>Shift</kbd>+<kbd>F10</kbd> to:

- choose a different installed shell
- open the folder in your IDE or file manager
- copy its path
- remove a linked worktree

When the row's **⋯** button has keyboard focus, <kbd>Enter</kbd> opens that menu;
it does not fold the repository group or open a terminal. With a checkout row
selected instead, <kbd>Enter</kbd> keeps its open-or-focus-terminal action.

To start an agent there, open the row menu and **right-click an “Open in
&lt;shell&gt;” row**, or click the chevron at its edge. Pick one of the installed
agents from the flyout. TermHQ opens that shell in the checkout and starts the
agent in it.

Every removal asks first, and says what it means: the worktree's folder is
deleted, while the branch and its commits stay. Answer **Keep it** or **Remove
worktree**. A checkout with uncommitted changes gets a second, separate
question, because those changes would be lost — **Force remove** is the only way
past it. The primary checkout is never offered for removal here, and a worktree
whose folder is already gone cannot be removed from the list —
`git worktree prune` drops its entry.

## Refresh and change the roots

The view refreshes when it opens, when TermHQ creates or removes a worktree, and
when you return to the app, at most once every two minutes. Use **Refresh** when
you want an immediate scan. While a refresh runs, the status bar keeps the last
count in place and turns its Worktrees mark into a spinning refresh symbol.

The gear in the Worktrees header opens **Settings → Git → Worktree roots**
directly. Removing a root there asks **Remove?** first, and only stops tracking
it; nothing on disk is changed. A root that has moved or disappeared stays in
the list: the status-bar item turns to a warning, and the Worktrees view names
the root it could not read, so you can repair or remove it.

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd>, or choose **Worktrees** from
the command palette, to open the view without the pointer. On macOS, use
<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd>.

An editor pane keeps that chord for **Reopen closed tab** while the editor is
focused. Click the status-bar item, focus another pane, or turn off **Settings →
Editor → Editing shortcuts stay in the editor** when you want the Worktrees
view instead.

## Repository worktrees in the Git panel

For the repository you are already reviewing, open the **Worktrees** section in
the Git panel's **Changes** view. You can create a sibling checkout on a new
branch, open a terminal in an existing one, or remove a linked worktree without
leaving the panel — with the same questions before a removal.

The global tracker is a view across repositories; it does not replace this
repository-specific section.

## What the tracker does not infer

The list tells you where checkouts exist and whether they have changes. It does
not claim that an agent is running in a checkout. A terminal TermHQ opened from
the list can be focused again, but the app does not inspect processes and guess
which tool may be working there.
