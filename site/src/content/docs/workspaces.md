---
title: "Workspaces"
weight: 40
description: "Group terminals by what you are working on, name them, resume them, and open several at once."
---

A workspace is a window's worth of terminals: their layout, their working
directories, and a name you gave it. Open a second window and you get a second
workspace, not a copy of the first.

## The picker

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> opens the workspace picker.
Pressing it again closes it.

Each row shows the workspace's title, when it was last used, how many panes it
has, and the directories those panes are in. Workspaces are listed most recently
used first.

The picker is keyboard-first: the first entry is selected when it opens, the
arrow keys move, <kbd>Enter</kbd> opens, and <kbd>Esc</kbd> closes. Moving the
mouse takes over the highlight, and moving the pointer off the list clears it
rather than leaving the last thing you hovered lit up.

## Naming a workspace

A workspace starts unnamed and is identified by its directories. Give it a
title from the picker and it keeps that name.

Renaming is offered only where it is safe — a workspace that is currently open
in a live window would have its own saves overwrite the change.

## Opening one

From the picker, <kbd>Enter</kbd> or a click. If the workspace is already open
in another window, TermHQ raises that window to the front instead of opening a
duplicate — two windows adopting the same shells would be a bad time for both.

## On startup

**Settings → General → Startup** decides what happens when TermHQ opens:

- **Resume the most recent workspace** — the default.
- **Show the picker** — choose every time.
- **Start a new workspace** — always begin fresh.

## From the taskbar

On Windows, right-clicking TermHQ in the taskbar lists recent workspaces in the
jump list. Clicking one opens it directly, or raises it if it is already open. A
jump-list click outranks the startup setting — you asked for a specific
workspace, so that is what you get.

## Deleting one

The picker offers deletion. It removes the workspace's saved state and ends any
shells still parked for it, and is refused while a window owns that workspace —
close the window first.

Deleting a workspace does not touch anything on disk in those directories. It
only forgets the arrangement.
