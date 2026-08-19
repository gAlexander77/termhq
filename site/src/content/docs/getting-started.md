---
title: "Getting started"
weight: 10
description: "Open your first terminals, tile them, and learn the handful of shortcuts that matter."
---

A new workspace starts with a single terminal running your default shell. After
that, launching TermHQ resumes the workspace you were last in — panes, shells,
directories and layout — rather than starting over. You can change that in
**Settings → Workspaces → On startup**, or pick a different workspace from the
picker every time.

Everything else is built on two ideas: panes are tiled rather than stacked, and
the shells inside them are not owned by the window.

## Your first panes

The **+** button in the title bar opens another pane running your default shell.
Its caret opens a list of every shell TermHQ found on your machine: PowerShell 7,
Windows PowerShell, cmd, Git Bash and each WSL distribution on Windows; whatever
`/etc/shells` reports on macOS and Linux.

Panes tile automatically — with two open you get two columns, with four you get a
2×2 grid. Open as many as you like; there is no limit, and the grid grows to hold
them. Drag the space between two panes to change how the room is divided.

Not every pane has to be a shell: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>
opens a [browser pane](/docs/browser-panes/), a real web page tiled beside your
terminals with the same header and the same moves.

## Layouts

Two presets live in the title bar:

- **Grid** — kept square-ish. Four panes make a 2×2, five to nine go three wide,
  ten to sixteen go four wide, and onwards from there.
- **Columns** — every terminal a full-height strip.

Panes can also be dragged by their headers to move, swap and grow, or rearranged
entirely from the keyboard. See [Panes and layout](/docs/panes-and-layout/).

## The shortcuts worth learning first

| Action | Shortcut |
|---|---|
| New terminal | <kbd>Ctrl</kbd>+<kbd>J</kbd> |
| New browser pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> |
| Delete the focused terminal | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> |
| Move focus between panes | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+arrow |
| Command palette | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> |
| Settings, with search focused | <kbd>Ctrl</kbd>+<kbd>P</kbd> |
| Workspace picker | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> |

If you only learn one, learn the command palette: it lists every action by name
with its shortcut beside it, so the other twenty do not have to be memorized
first.

On macOS, <kbd>⌘</kbd> replaces <kbd>Ctrl</kbd> throughout — except dictation.
Every one of these is rebindable; see
[Keyboard shortcuts](/docs/keyboard-shortcuts/) for the full list and why the
app-level chords are three keys rather than two.

## Copy and paste

Selecting text and pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> copies it. With nothing
selected, the same key sends the interrupt to the running program, as it should.
This is the behavior Windows Terminal uses.
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> copies unconditionally.

Paste is <kbd>Ctrl</kbd>+<kbd>V</kbd>,
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> or <kbd>Shift</kbd>+<kbd>Insert</kbd>;
right-click copies the selection if there is one and pastes if there is not.
Dropping a file onto a pane writes its quoted path at the prompt.

## What to read next

- [Workspaces](/docs/workspaces/) — grouping terminals by what you are doing
- [Persistent sessions](/docs/persistent-sessions/) — why quitting does not kill
  your shells
- [Browser panes](/docs/browser-panes/) — a web page as a pane in the grid
- [Running coding agents](/docs/agents/) — the parts built specifically for this
