---
title: "Workspaces"
weight: 40
description: "Group your work into windows, move running terminals and editor panes between them, and close a window while its shells keep running."
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

The picker opens over your work, which dims and blurs behind it — **Backdrop
blur** and **Backdrop darkness** in
[Settings → Appearance](/docs/configuration/#appearance) set how much. The
title bar still works meanwhile: minimize, maximize and close stay live,
dragging the bar moves the window, and a double-click on it maximizes or
restores the window, all without closing the picker.

A search field at the top has the keyboard from the start. A few letters find a
workspace by its name or by a folder in it: names that start with what you
typed come first, then names that contain it, then folders that do, with the
matching letters marked. When what you type matches no workspace, the list offers
**New workspace named "…"** instead, and <kbd>Enter</kbd> makes a workspace
with that name. **New workspace**, beside the field, starts an unnamed one.

Each row shows the workspace's name, a badge when it is **open** in a window
(**this window** for the one you are in) or **running** in the background, and a
line such as *3 panes · 5m ago*; hover that for when the workspace was created.
The name is the title you gave it, or else the folders its panes are in, or
else its slot, such as *Workspace 4*. A titled workspace also lists its folders
on that line: two at most, then a count that names the rest when you hover it.
Two that share a name show their slot beside it — *Workspace 1*, *Workspace 3*
— the one thing about them guaranteed to differ.

With nothing typed, the list keeps one order: this window's workspace first,
then the ones open in other windows, then the ones running in the background,
then the rest — each group most recently used first. A search keeps that order
among equally good matches.

The highlight starts on the first workspace below this window's own, so the
picker's shortcut and then <kbd>Enter</kbd> switches to it — usually the way
back to where you just were. Choosing the workspace this window already shows
simply closes the picker.

The picker's own keys are listed along its foot. The up/down arrow keys move
the highlight, wrapping at the ends; <kbd>Enter</kbd> opens the highlighted
workspace; <kbd>F2</kbd> renames it; <kbd>Del</kbd> deletes it;
<kbd>Ctrl</kbd>+<kbd>N</kbd> (<kbd>⌘</kbd>+<kbd>N</kbd> on macOS) starts a new
one; and <kbd>Esc</kbd> clears the search, then closes the picker. In the
search field, <kbd>Del</kbd> deletes text until the caret reaches the end of
what you typed; from there it deletes the highlighted workspace.

Moving the mouse takes over the highlight, and moving the pointer off the list
clears the hover highlight. The row under the pointer shows a pencil to rename
it and a **×** to delete it; a row the keys highlighted does not, since
<kbd>F2</kbd> and <kbd>Del</kbd> do the same. A click anywhere in the picker
leaves the keyboard in the search. Where a button cannot act on that workspace,
it stays in place and says why when you hover it.

## Naming a workspace

Naming one is optional. An untitled workspace is not "Untitled" — it is
identified by the directories its panes are in, which is usually the name you
would have typed anyway. An [SSH](/docs/ssh/) pane counts by the host it
connects to, so a workspace of only SSH panes is named after its hosts. That
name appears in both the picker and the status bar. Give it a title from the
picker and it keeps that instead — or name it as you make it, with **New
workspace named "…"**.

You can rename the workspace you are in, and any that is closed: highlight it
and press <kbd>F2</kbd>, or click its pencil. <kbd>Enter</kbd> or a click
elsewhere saves the new name, and <kbd>Esc</kbd> cancels it. One that is open
in *another* window cannot be renamed from here — that window is still saving
over it, and would undo the change.

## Opening one

From the picker, <kbd>Enter</kbd> or a click. If the workspace is already open
in another window, TermHQ raises that window to the front instead of opening a
duplicate — two windows adopting the same shells would be a bad time for both.

If TermHQ cannot open or bring forward a workspace, the picker stays open and
shows the reason, so a failed action does not disappear without explanation.

The command palette lists your other workspaces too — **Switch to** one that is
open in a window, **Open** one that is not — so you can go straight there
without the picker. Its **Workspaces** scope lists only those.

However it opens — at launch, from the picker, or brand new — a workspace
appears once it is ready: its panes and sidebar fade in together, already in
place.

## Moving a pane to another workspace

Right-click the source terminal or editor's **header**, choose **Move to
workspace…**, or press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>
(<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> on macOS). The command palette offers
the same action, and Settings → Shortcuts lets you reassign or disable the key.
The action is available even when this is your only workspace. Browser panes
cannot move between workspaces.

Choose another open or saved workspace. A saved destination opens before the
pane moves. To create a destination, type an unmatched workspace name and choose
**Create & move**. The new window starts with the moved pane alone, even when
new workspaces normally open a default terminal. A failed launch can be retried
without creating another workspace with the same name.

The picker header identifies the pane by its icon, type and current title,
including the icon of a recognized running agent. A long title truncates;
hover over it to see the full name.

A local terminal or SSH connection keeps the same running process and working
directory. An editor brings its tabs, their order, and unsaved text. The
destination window comes forward with the moved pane selected.

The picker starts in its search field. Type to find a workspace by name or
folder, use the arrow keys to select it, and press <kbd>Enter</kbd> to move.
<kbd>Home</kbd> and <kbd>End</kbd> select the ends; <kbd>Page Up</kbd> and
<kbd>Page Down</kbd> step through a long list. <kbd>Tab</kbd> and
<kbd>Shift</kbd>+<kbd>Tab</kbd> stay inside the picker; <kbd>Esc</kbd> cancels
before a move starts. While the handoff is in progress, wait for it to finish.
The picker follows the app's animation setting and system reduced motion.

A destination that is busy, closes, or cannot accept the pane leaves it in the
source workspace. If the destination already has a different copy of an
editor file open, the move stops and keeps both copies intact; resolve the
difference before trying again.

**What carries over:** terminals restore the most recent 256 KiB of output,
so older scrollback does not transfer. Editors keep their text, but their undo
history and scroll/cursor positions start fresh in the receiving window.

## Closing a workspace window

In the workspace picker, highlight a row marked **open** or **this window**
and press <kbd>Ctrl</kbd>+<kbd>W</kbd> (<kbd>⌘</kbd>+<kbd>W</kbd> on macOS).
The footer offers the key only when that workspace has a window to close.
With **Settings → Workspaces → Keep shells running after close** on (the
default), its shells continue in the background and its row becomes
**running**. Opening it again reconnects to those shells.

Closing the window you are using asks first in its row. <kbd>Enter</kbd>,
or the close key again, confirms; <kbd>Esc</kbd> backs out. <kbd>Tab</kbd>
and the left/right arrow keys move between the answers. **Settings →
Workspaces → Ask before closing this window from the picker** turns this
question off. Unsaved editor files still have their usual save/discard
question, including when you close another workspace's window.

If keeping shells running is off, closing ends them. An empty workspace
cleans itself up when its window closes. To remove a saved workspace and end
its shells deliberately, use [Delete](#deleting-one).

## On startup

**Settings → Workspaces → On startup** decides what happens when TermHQ opens:

- **Resume the most recent workspace** — the default.
- **Show the workspace picker** — choose every time.
- **Start a new workspace** — always begin fresh.

With the picker chosen, it opens at startup in an otherwise empty window, with
the first row highlighted. The title bar stays out from under it, so you can
still move, minimize or close the window, and a click outside the list chooses
nothing. <kbd>Enter</kbd> opens the highlighted workspace, and <kbd>Esc</kbd>
clears a search if you typed one, then opens the most recent workspace. A new
workspace made here, named or not, opens in this window.

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
ones. A workspace created by **Create & move** starts with the incoming pane
alone, without an extra terminal.

## Deleting one

Press <kbd>Del</kbd> on the highlighted workspace, or click the **×** on its
row. It leaves the list at once, and a chip at the foot of the picker names it,
says how many of its shells will end if any are running, and offers **Undo**
(<kbd>Ctrl</kbd>+<kbd>Z</kbd>, or <kbd>⌘</kbd>+<kbd>Z</kbd> on macOS) while its
edge drains. Nothing is deleted and no shell ends until that runs out — after
the seconds set as the **Undo window** in **Settings → General**, 5 by default
— or until you close the picker. Deleting a second workspace finishes the first
at once. Deleting removes the workspace's saved state and ends any shells still
parked for it.

A workspace open in another window still asks first, since its window has to
close: the row names the workspace, counts its panes, and says its shells will
end if it is still running. Cancel has focus, so <kbd>Enter</kbd> answers the
safe way, and <kbd>Esc</kbd> cancels the question rather than closing the
picker. On **Delete**, that window closes the way its own close button would,
then the workspace is deleted. If that window has unsaved editor work, it comes
to the front and asks about it; if it stays open, the workspace is kept and the
picker says why.

The workspace in the window you're using can be deleted from its own picker
too. <kbd>Del</kbd> or its **×** turns the whole picker into a warning, **Delete
this workspace?**, which says in bold what goes: this window closes, and its
panes, the shells running in them, its layout and its name are deleted for
good, along with any unsaved editor files, which it counts. **Cancel** has the
keyboard, so <kbd>Enter</kbd> or <kbd>Esc</kbd> backs out; only the red
**Delete this workspace** button goes ahead. There is no Undo for this one: the
window that would offer it is the one that closes.

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
