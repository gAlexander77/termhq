---
title: "Getting started"
weight: 10
description: "Open your first terminals, tile them, and learn the handful of shortcuts that matter."
---

TermHQ opens with a single terminal running your default shell. Everything else
is built on two ideas: panes are tiled rather than stacked, and the shells
inside them are not owned by the window.

## Your first panes

Click **+ New terminal** in the title bar to open another pane, or use the
keyboard shortcut. Panes tile automatically — with two open you get two
columns, with four you get a 2×2 grid.

The split button's caret opens a list of every shell TermHQ found on your
machine: PowerShell, Windows PowerShell, cmd and each WSL distribution on
Windows; whatever `/etc/shells` reports on macOS and Linux.

## Layouts

Two presets live in the title bar:

- **Grid** — square-ish. Columns are ⌈√n⌉, so four panes make a 2×2 and five
  go three wide.
- **Columns** — every terminal a full-height strip.

Panes can also be dragged to resize, and rearranged from the keyboard. See
[Panes and layout](/docs/panes-and-layout/).

## The shortcuts worth learning first

| Action | Shortcut |
|---|---|
| New terminal | <kbd>Ctrl</kbd>+<kbd>T</kbd> |
| Close the focused pane | <kbd>Ctrl</kbd>+<kbd>W</kbd> |
| Move focus between panes | <kbd>Ctrl</kbd>+<kbd>1</kbd>…<kbd>9</kbd> |
| Command palette | <kbd>Ctrl</kbd>+<kbd>P</kbd> |
| Workspace picker | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> |
| Settings | <kbd>Ctrl</kbd>+<kbd>,</kbd> |

On macOS, <kbd>⌘</kbd> replaces <kbd>Ctrl</kbd> throughout. Every one of these
is rebindable — see [Keyboard shortcuts](/docs/keyboard-shortcuts/).

## Copy and paste

Selecting text and pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> copies it. With
nothing selected, the same key sends the interrupt to the running program, as
it should. This is the behaviour Windows Terminal uses, and it means you do not
need a separate chord for copying.

Paste is <kbd>Ctrl</kbd>+<kbd>V</kbd>. Dropping a file onto a pane writes its
quoted path at the prompt.

## What to read next

- [Workspaces](/docs/workspaces/) — grouping terminals by what you are doing
- [Persistent sessions](/docs/persistent-sessions/) — why quitting does not kill
  your shells
- [Running coding agents](/docs/agents/) — the parts built specifically for this
