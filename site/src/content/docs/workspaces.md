---
title: "Workspaces"
weight: 40
description: "Group terminals by what you are working on, name them, resume them, and open several at once."
---

A workspace is a window's worth of panes: their layout, the directories their
terminals are in, the pages any [browser panes](/docs/browser-panes/) are on,
and optionally a name. Open a second window and you get a second workspace, not
a copy of the first.

Anything you tune by hand is remembered with it, including proportions you set
by [dragging a gutter](/docs/panes-and-layout/#resizing-panes).

## The picker

Click the workspace name and window icon at the far right of the bottom status
bar to open the picker. **Stash** sits immediately to its left when you have
stashed panes; temporary recovery controls do not split the two.

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> also opens the picker
(<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> on macOS). Pressing it again
closes it. This shortcut and the command-palette action still work with the
status bar hidden.

Each row shows the workspace's title, when it was last used, how many panes it
has, and the directories those panes are in. Workspaces are listed most recently
used first.

The picker is keyboard-first: the first entry is selected when it opens, the
arrow keys move, <kbd>Enter</kbd> opens, and <kbd>Esc</kbd> closes. Moving the
mouse takes over the highlight, and moving the pointer off the list clears it
rather than leaving the last thing you hovered lit up.

## Naming a workspace

Naming one is optional. An untitled workspace is not "Untitled" — it is
identified by the directories its panes are in, which is usually the name you
would have typed anyway. Give it a title from the picker and it keeps that
instead.

You can rename the workspace you are in, and any that is closed. One that is
open in *another* window cannot be renamed from here — that window is still
saving over it, and would undo the change.

## Opening one

From the picker, <kbd>Enter</kbd> or a click. If the workspace is already open
in another window, TermHQ raises that window to the front instead of opening a
duplicate — two windows adopting the same shells would be a bad time for both.

## On startup

**Settings → Workspaces → On startup** decides what happens when TermHQ opens:

- **Resume the most recent workspace** — the default.
- **Show the picker** — choose every time.
- **Start a new workspace** — always begin fresh.

## From the taskbar

On Windows, right-clicking TermHQ in the taskbar lists recent workspaces in the
jump list. Clicking one opens it directly, or raises it if it is already open. A
jump-list click outranks the startup setting — you asked for a specific
workspace, so that is what you get.

## What a new workspace opens with

One terminal, in your default shell. **Settings → Workspaces → Open a terminal in
new workspaces** turns that off, and a new workspace then opens on the welcome
panel instead: **New terminal**, **Find a command**, **Workspaces**, and any
favorite directories. You can choose where to work before starting a shell.

If all your panes are stashed, the empty view points you back to the stash shelf
instead of making the workspace look as though it has lost them.

The same setting covers any workspace with nothing to restore, not just brand new
ones.

## Deleting one

The picker offers deletion. It removes the workspace's saved state and ends any
shells still parked for it, and is refused while a window owns that workspace —
close the window first.

Deleting a workspace does not touch anything on disk in those directories. It
only forgets the arrangement.

## Empty ones delete themselves

Close a window with no terminals left in it and that workspace is removed rather
than kept in the picker for good — its saved state goes, and so do any shells
still parked under it from the undo window.

This is why the setting above is worth knowing about: with a terminal opening
automatically, a workspace you opened and closed without doing anything still has
that terminal in it, so it stays. Turn the setting off and a workspace you merely
looked at cleans up after itself.

A workspace with terminals in it is never removed this way, including one whose
terminals are all stashed.
