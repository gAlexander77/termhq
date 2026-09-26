---
title: "Workspaces"
weight: 40
description: "Group terminals by what you are working on, name them, resume them, and open several at once."
---

A workspace is a window's worth of panes: their layout, the directories their
terminals are in, the pages any [browser panes](/docs/browser-panes/) are on,
and optionally a name. Open a second window and you get a second workspace, not
a copy of the first. On macOS every workspace window belongs to the one TermHQ
application — one Dock icon, all of them in the Window menu — while each keeps
its own terminals, editors and language servers.

Anything you tune by hand is remembered with it, including proportions you set
by [dragging a gutter](/docs/panes-and-layout/#resizing-panes) and whether it
uses Grid or Columns.

Settings, on the other hand, belong to the whole app. Change the theme, the
background, your favorites, an agent or a shortcut in one window and every open
window follows at once. The sidebar and the Grid or Columns choice are the
exception: they stay with the window you change them in, and are saved as the
starting point for the next new window.

When you reopen a workspace whose terminals are still running, the pane you
last selected is selected again, provided it is still available and visible.
Selection is saved when you switch panes, even if nothing else changes. After a
reboot or update the terminals are new processes, but the selection follows
them to their new shells. It falls back to another visible pane only when the
pane you had selected is gone or stashed.

## The picker

Click the workspace name and window icon at the far right of the bottom status
bar to open the picker. **Stash** sits immediately to its left when you have
stashed panes; temporary recovery controls do not split the two.

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> also opens the picker
(<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> on macOS). Pressing it again
closes it. You can also choose **Workspaces** from the command palette.

Each row shows the workspace's name, a badge when it is **open** in a window
(**this window** for the one you are in) or **running** in the background, and a
line such as *3 panes · created 2d ago · last used 5m ago*. The name is the
title you gave it, or else the folders its panes are in, or else its slot, such
as *Workspace 4*; a titled workspace shows its title alone. Workspaces are
listed most recently used first. Two that share a name
show their slot beside it — *Workspace 1*, *Workspace 3* — the one thing about
them guaranteed to differ.

Past eight workspaces, a filter box appears above the list. It matches names
and folders, and <kbd>Esc</kbd> clears it before it closes anything.

The keyboard starts on your most recently used *other* workspace, so the
picker's shortcut and then <kbd>Enter</kbd> switches to it — the way back to
where you just were. Choosing the workspace this window already shows simply
closes the picker. Use
the up/down arrow keys to focus another row, then <kbd>Enter</kbd> to open it.
<kbd>Tab</kbd> moves among controls such as **New workspace** and **Rename**;
<kbd>Enter</kbd> activates whichever control has keyboard focus.
<kbd>Esc</kbd> closes the picker. Moving the mouse takes over the highlight,
and moving the pointer off the list clears the hover highlight.

Every row has **Rename** and **Delete**. Where one cannot act on that
workspace, it stays in place and says why when you hover it.

## Naming a workspace

Naming one is optional. An untitled workspace is not "Untitled" — it is
identified by the directories its panes are in, which is usually the name you
would have typed anyway. An [SSH](/docs/ssh/) pane counts by the host it
connects to, so a workspace of only SSH panes is named after its hosts. That
name appears in both the picker and the status bar. Give it a title from the
picker and it keeps that instead.

You can rename the workspace you are in, and any that is closed. <kbd>Enter</kbd>
or a click elsewhere saves the new name, and <kbd>Esc</kbd> cancels it. One that
is open in *another* window cannot be renamed from here — that window is still
saving over it, and would undo the change.

## Opening one

From the picker, <kbd>Enter</kbd> or a click. If the workspace is already open
in another window, TermHQ raises that window to the front instead of opening a
duplicate — two windows adopting the same shells would be a bad time for both.

If TermHQ cannot open or bring forward a workspace, the picker stays open and
shows the reason, so a failed action does not disappear without explanation.

The command palette lists your other workspaces too — **Switch to** one that is
open in a window, **Open** one that is not — so you can go straight there
without the picker.

However it opens — at launch, from the picker, or brand new — a workspace
appears once it is ready: its panes and sidebar fade in together, already in
place.

## On startup

**Settings → Workspaces → On startup** decides what happens when TermHQ opens:

- **Resume the most recent workspace** — the default.
- **Show the workspace picker** — choose every time.
- **Start a new workspace** — always begin fresh.

With the picker chosen, it opens at startup in an otherwise empty window. The
title bar stays out from under it, so you can still move, minimize or close the
window, and a click outside the list chooses nothing. <kbd>Enter</kbd> opens the
highlighted workspace, and <kbd>Esc</kbd> opens the most recent one.

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

The picker offers deletion, and asks first: the row names the workspace,
counts its panes, and says its shells will end if it is still running. Cancel
has focus, so <kbd>Enter</kbd> answers the safe way, and <kbd>Esc</kbd> cancels
the question rather than closing the picker. Deleting removes the workspace's
saved state and ends any shells still parked for it.

A workspace open in another window can be deleted too: the question says that
window will close, and on **Delete** it closes the way its own close button
would, then the workspace is deleted. If that window has unsaved editor work,
it comes to the front and asks about it; if it stays open, the workspace is
kept and the picker says why. The workspace in the window you're using can't be
deleted from its own picker.

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
