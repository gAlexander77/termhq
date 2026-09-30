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
Windows PowerShell, Command Prompt, Git Bash and each WSL distribution on
Windows; whatever `/etc/shells` reports on macOS. Once **Settings → SSH → SSH
connections** is on, the same list ends with **Connect via SSH…**, which opens
a connection to another machine as a pane — see
[SSH connections](/docs/ssh/).

Panes tile automatically — with two open you get two columns, with four you get a
2×2 grid. Open as many as you like; there is no limit, and the grid grows to hold
them. Drag the space between two panes to change how the room is divided.

Not every pane has to be a shell. The **globe** in the title bar — or
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> — opens a
[browser pane](/docs/browser-panes/), a real web page tiled beside your
terminals. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> opens an
[editor pane](/docs/editor/), which holds files as tabs. Both take the same
header and the same moves as a terminal.

With no panes open, the start panel offers **New terminal**, **Find a command**,
**Workspaces**, and your favorite directories. If your panes are all stashed,
it points you back to the shelf. Workspace selection also lives at the far
right of the bottom status bar, beside Stash.

## Make the interface comfortable

In **Settings → Appearance**, choose **Compact** or **Comfortable** interface
density and scale the app's labels and controls from 100% to 150%. Terminal and
editor text keep their own size settings, and these options work with every
theme.

The same page can put a picture, a GIF or a looping video behind your
terminals. **Background** keeps a small library — **Add…** copies a file in —
and **Transparency** (25% by default), **Blur**, **Fit** and, for a video,
**Speed** tune it. The text stays solid at any setting, and the background is
the same in every workspace, like the theme.

Two more switches live there. **Dim unfocused panes**, off by default, washes
every pane but the one you are typing into toward the background. **Animate
panes**, on by default, lets panes glide, fly and fade as they move; turn it
off and they jump straight into place.

**Backdrop blur** and **Backdrop darkness** set how the window dims and blurs
behind the command palette, the workspace picker, Settings, the Worktrees view,
and Git's History and diffs: blur from off to 12 px (2 px by default), darkness
from off to 80% (40% by default; a light theme dims more gently). The title bar
stays live above the backdrop: minimize, maximize and close still work, and the
bar still drags the window.

Once anything on the page differs from how TermHQ ships, it ends with **Reset
Appearance**, which names what it will put back and asks first. Your themes,
backgrounds and icon packs stay installed.

Need a little more room for file names or Git changes? Drag the sidebar's inner
edge to widen it. Its original width is the minimum, the maximum is bounded,
and a double-click on that edge resets it. See
[Configuration](/docs/configuration/#general) for keyboard controls.

## Layouts

Two presets live in the title bar:

- **Grid** — kept square-ish. Four panes make a 2×2, five to nine go three wide,
  ten to sixteen go four wide, and onwards from there.
- **Columns** — every terminal a full-height strip.

Each workspace remembers which of the two it uses.

Panes can also be dragged by their headers to move, swap and grow, or rearranged
entirely from the keyboard. See [Panes and layout](/docs/panes-and-layout/).

## The shortcuts worth learning first

| Action | Shortcut |
|---|---|
| New terminal | <kbd>Ctrl</kbd>+<kbd>J</kbd> |
| New browser pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> |
| New editor pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> |
| Delete the focused terminal | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> |
| Move focus between panes | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+arrow |
| Command palette | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> |
| Settings, with search focused | <kbd>Ctrl</kbd>+<kbd>P</kbd> |
| Workspace picker | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> |
| Jump to the newest waiting pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>N</kbd> |

If you only learn one, learn the command palette: it lists every action by name
with its shortcut beside it, or *unassigned* where it has none, so the rest do
not have to be memorized first. It also opens your favorite folders, shells,
agents, other workspaces, saved and recent SSH targets (once SSH is on), themes
and Settings pages, and it lists your open panes: choose one to focus it,
bringing it back from the stash shelf or out from behind a maximized pane if it
has to. With nothing typed it leads with what you ran recently.

Scopes under its search field — **All**, **Commands**, **Git**, **Panes**,
**Themes** and **Workspaces** — narrow the list to one kind of thing;
<kbd>Tab</kbd> steps through them, or start your search with a scope's name and
a space. <kbd>Ctrl</kbd>+<kbd>D</kbd> inside the palette, or its **details**
button, opens a pane beside the list that says what the highlighted row does,
its shortcut, and why it can't run right now, if it can't.

On macOS, <kbd>⌘</kbd> replaces <kbd>Ctrl</kbd> throughout — except dictation.
Every shortcut in the table is rebindable; see
[Keyboard shortcuts](/docs/keyboard-shortcuts/) for the full list and why the
app-level chords are three keys rather than two.

## Copy and paste

Selecting text and pressing <kbd>Ctrl</kbd>+<kbd>C</kbd> copies it. With nothing
selected, the same key sends the interrupt to the running program, as it should.
This is the behavior Windows Terminal uses.
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> copies unconditionally.

Paste is <kbd>Ctrl</kbd>+<kbd>V</kbd>,
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> or <kbd>Shift</kbd>+<kbd>Insert</kbd>.
What a right-click does is up to **Settings → Terminal → Right-click in a
terminal**. The default, **Automatic**, opens a menu on macOS — Copy, Paste,
Select all, Clear and Find — and on Windows copies the selection if there is
one and pastes if there is not. Either behavior can be chosen on any platform.
A right-click never copies and pastes at once.

A program that reads the mouse, such as full-screen Claude Code, Codex, vim or
tmux, gets the right-click itself. Hold <kbd>Shift</kbd> (<kbd>Option</kbd> on
macOS) to take it back for TermHQ. In such a program, <kbd>Shift</kbd>+drag
makes TermHQ's own selection, and it stays up while you move the pointer.
<kbd>Shift</kbd>+right-click, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> or
<kbd>Ctrl</kbd>+<kbd>C</kbd> copies it.

A paste goes straight in, with no confirmation card and no copy receipt, and a
large one arrives whole. To be asked before a multi-line paste, turn on
**Settings → Terminal → Confirm multi-line pastes**.

Dropping a file onto a terminal types its path at the prompt, quoted the way
that shell reads quotes. Files can come from your file manager or from the
Files panel. Dropped on an editor pane, a file opens there instead; a browser
pane, an SSH pane or a terminal whose shell has ended refuses the drop and says
why.

## Links

A web address in a terminal's output opens with <kbd>Ctrl</kbd>+click
(<kbd>⌘</kbd>+click on macOS), in your default browser. Add <kbd>Shift</kbd> to
open it in a [browser pane](/docs/browser-panes/) beside the terminal instead.
A plain click only focuses the pane, so a link an agent printed never opens by
accident.

The file links a program prints, such as the paths Claude Code and Codex show,
open the same way. <kbd>Ctrl</kbd>+click (<kbd>⌘</kbd>+click on macOS) opens a
file in its default app and a folder in your file manager. Add
<kbd>Shift</kbd> to show a file there instead. A program or script is never
run, only shown. The hint beside the pointer says where the link really leads.

## What to read next

- [Workspaces](/docs/workspaces/) — grouping terminals by what you are doing
- [Persistent sessions](/docs/persistent-sessions/) — why quitting does not kill
  your shells
- [Browser panes](/docs/browser-panes/) — a web page as a pane in the grid
- [The editor](/docs/editor/) — files as tabs, in a pane like any other
- [Running coding agents](/docs/agents/) — the parts built specifically for this
- [Dictation](/docs/dictation/) — talk a prompt into a terminal, transcribed on
  your machine
- [Worktrees](/docs/worktrees/) — separate checkouts and a terminal or agent in
  the right one
