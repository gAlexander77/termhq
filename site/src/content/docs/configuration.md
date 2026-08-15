---
title: "Configuration"
weight: 70
description: "Where TermHQ keeps its settings, every setting you can change, and how config files behave across versions."
---

Everything configurable lives in **Settings**. <kbd>Ctrl</kbd>+<kbd>P</kbd>
(<kbd>⌘</kbd>+<kbd>P</kbd> on macOS) opens it with the search box already focused,
so you type the setting you want instead of hunting through categories. The same
chord — or <kbd>Esc</kbd> — closes it.

Settings are written to a JSON file you can also edit by hand.

## Where it lives

| Platform | Path |
|---|---|
| Windows | `%APPDATA%\dev.termhq.app\config.json` |
| macOS | `~/Library/Application Support/dev.termhq.app/config.json` |
| Linux | `~/.config/dev.termhq.app/config.json` |

Alongside it, in the same directory:

| Item | Contents |
|---|---|
| `themes/` | Your own and imported color themes, plus the commented `_template.jsonc` |
| `icons/` | Installed file-icon themes |
| `logos/` | Cached artwork for installed marketplace extensions, so the Installed list has pictures offline |
| `sessions/` | One JSON per window slot: the saved state of each workspace |
| `pty-host.log` | A log file, useful to attach to a bug report |

## Missing keys are filled in

Any key absent from `config.json` takes its default. A config written by an older
TermHQ keeps working after an update — new settings appear with their defaults
rather than the file needing a migration, and hand-editing cannot break startup
by leaving something out.

The same applies in reverse: a key TermHQ no longer recognizes is ignored, and
dropped the next time the file is written. And if the file cannot be parsed at
all, TermHQ starts with defaults rather than refusing to open.

## Editing by hand

Close TermHQ before editing `config.json`, or your changes will be overwritten
the next time it saves — TermHQ writes the whole file whenever a setting changes.

Keys are camelCase.

## What you can change

### General

- **Default shell** — used by the **+** button, <kbd>Ctrl</kbd>+<kbd>J</kbd> and
  favorites. Unset means the first shell detected.
- **Undo close** — which close paths get an undo window: none, the keyboard
  shortcut only, or the shortcut and the pane's **×** button. Default: both.
- **Undo window length** — seconds before the parked shell is actually killed.
  Default 5.
- **Clone keeps directory** — whether duplicating a pane opens in the source
  pane's directory or at home. Default on.
- **Layout preset** — Grid or Columns. Also the title bar switch.
- **Favorites** — starred directories, reorderable with ↑/↓. One order drives
  the title bar dropdown, the welcome list *and* the number keys, so there is
  never a second ordering to keep in sync. They are stored shell-agnostically:
  opening one spawns whatever your default shell is at the time you click, not
  the one that starred it.

### Workspaces

- **On startup** — resume the most recent workspace, show the picker, or start a
  new one. Default: most recent. A taskbar jump-list click overrides it for that
  launch.
- **Open a terminal in new workspaces** — whether a workspace with nothing to
  restore starts with one default terminal or on the welcome list. Default on.
  Turning it off is also what makes a workspace you opened, looked at and closed
  clean up after itself, since a workspace closed with no terminals in it is
  deleted rather than kept.
- **Restore session on startup** — reopen your last panes with their shells,
  directories, layout, zoom and titles. Default on. Off means every launch starts
  fresh — with one default terminal, or empty if you turned the setting above
  off — and anything still alive from last time is ended.
- **Keep shells running after close** — closing the window leaves its shells
  running in the background, and the next launch picks them up. Default on. Needs
  session restore to do anything.
- **Stashed panes stay stashed** — see
  [Persistent sessions](/docs/persistent-sessions/). Default **off**.

### Appearance

- **Theme** and **Terminal theme** — the second can point at a different theme,
  so the terminal palette and the interface need not match.
- **Default font size** and **font family** — the font list is the monospaced
  fonts actually installed on the machine; anything else can be typed by name. A
  chosen family sits in front of the shipped stack, so a missing glyph still
  renders monospaced.
- **Cursor style** — block, bar or underline — and **cursor blink**.
- **File icons**, plus marketplace browsers for themes and icon packs, and
  buttons that open the `themes/` and `icons/` folders.
- **Pane style** — how terminals sit in the grid: **Spaced** (small gaps and
  rounded corners, the default) or **Boxy** (no gaps, square corners — the
  tiling-window-manager look). Borders stay in both, so two terminals never
  read as one.

### Terminal

- **Scrollback** — lines retained per terminal, default 8000. Memory scales with
  this times the number of open panes.
- **Ctrl+scroll zoom** — whether the wheel zooms the hovered pane. Default on.
- **Follow terminal titles** — pane headers show the title the running program
  reports (OSC 0/2) rather than the shell name. Default on. A title you set by
  hand always wins.
- **Modern Unicode widths** — Unicode 11 width tables, so emoji and CJK measure
  two cells and the box art agent CLIs print stays aligned. Default on; turn it
  off only for an older program that assumes the legacy character widths.
- **GPU terminal rendering** — draws the terminal on the graphics card, so box
  art and block characters land exactly in their cells.
  Default on; the escape hatch if the renderer runs out of memory on a very long
  agent session. Applies to newly opened panes.

### Agents

- **Agent commands** — the list behind every pane header's ✳ button. Name plus
  command, flags welcome (`claude --dangerously-skip-permissions`). Ships with
  Claude Code, Codex, OpenCode and Antigravity. **The array order is both the
  dropdown order and the digit each answers to** after
  <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>, and entries whose program is not
  on `PATH` are hidden automatically.
- **IDE command** — what the `</>` button runs against a directory. Default
  `code`; flags allowed.
- **Agent idle badge** and **idle notification** — see below.
- **Notification color** — the color every attention surface draws from.
  Defaults to the active theme's accent; setting it here pins it across all
  themes.

### Notifications

- **Agent idle badge** — badge a pane that was busy while you were looking
  elsewhere and has since gone quiet. Default on.
- **Quiet seconds** — how long a pane must be silent to count as idle. Default
  10. It also decides how long a pane may pause mid-job without the pause being
  read as the job ending, so raise it for agents that stop to think.
- **Agent idle notification** — the same trigger raises a toast: in-app while
  the window is focused, a native OS notification while it is not. Default on.
- **Toast auto-dismiss** — seconds, or 0 to stay until dismissed. Default 0. Set
  above zero and the toast drains a countdown bar so you can see the deadline
  running; at 0 there is no bar, because a timer that never expires would read as
  a stuck toast.

### Files

- **Show hidden files** — dotfiles and OS-hidden entries. Default **on**; `ls -a`
  is the terminal user's default worldview, so hiding is the opt-in.
- **Sidebar side** — left or right. <kbd>Ctrl</kbd>+<kbd>B</kbd> toggles the
  sidebar itself.
- **Sidebar** — showing or not. It also follows the grid on its own: the file
  tree reads the focused terminal's directory, so it leaves when your last
  terminal does and comes back with the next one. Shutting it yourself outranks
  that — it then stays shut, including while you move between terminals, until
  you open it yourself again. Opening it with no terminals open leaves it open
  and empty, which is the honest answer rather than a toggle that appears to do
  nothing.
- **File openers** — the right-click "open with" list. Each is a name plus a
  command, run either detached (Notepad) or in a new terminal pane opened in the
  file's directory (vim, nano).
- **Terminal openers run in** — which shell those terminal openers get. Until you
  pick one they stay hidden entirely, because vim in PowerShell helps nobody.

### Git

- **Commit message agent** — which installed agent CLI the spark button asks
  for a commit message; it reads your staged changes and the suggestion lands
  in the box for you to edit. Automatic (first one installed) by default; set
  it to off to hide the button.
- **Commit message prompt** — your house rules for those messages: a ticket
  prefix, a required tense, a language. Empty means the shipped prompt.
- **Subject length hint** — a note appears when a commit's first line runs
  longer than this. Nothing is ever blocked or truncated; 0 turns it off.
- **Add Signed-off-by** — the trailer some projects require on every commit.
- **Branch order** — how the branch picker sorts: most recently committed
  first, or alphabetical.
- **Pull style** — what pull does when your branch and its upstream have both
  moved: fast-forward only (the default — it stops and says so rather than
  surprising you), rebase, or merge.
- **Auto-fetch** — a quiet background fetch every few minutes so ahead/behind
  counts stay honest. Failures are silent on purpose; a fetch that fails on a
  plane should not raise a banner.
- **Prune on fetch** — drop remote-tracking branches whose upstream is gone.
- **Stash carries untracked files** — whether the stash-and-switch offer
  brings brand-new files along to the other branch.
- **Refresh every** — how often the panel re-reads status; a very large
  repository may prefer a longer interval.
- **Conflict count on the Git tab** — a badge on the tab itself, so a merge an
  agent started in a background pane is visible while you are looking at
  Files.
- **Confirm before discarding** — ask before a file's changes are thrown
  away. Deleting an untracked file always asks, because that is the one thing
  git cannot bring back.
- **Diff layout** — unified (stacked) or side by side; the same toggle lives
  in the diff window's header.

### Voice

- **Voice dictation** — show the mic button and honor the dictation chord.
  Default on — but the button only exists once a speech model is installed,
  so a fresh install shows no voice controls at all until you download one.
- **Input device** — which microphone to use; falls back to the system default if
  the chosen one is unplugged.
- **Dictation language** — English by default, sixteen more, or auto-detect,
  which lets a multilingual model identify the language per recording.
  English-only models transcribe English regardless, and the panel warns
  about that combination when you pick it.
- **Test microphone** — record a few seconds and play them back through the
  exact capture path dictation uses, with a verdict on the level — so "is my
  mic working?" gets answered before any words are spent on it.
- **Speech model** — the model manager: download with live progress and
  cancel, switch between downloaded models, delete them, or import your own
  file. Every row shows its size and language coverage, every downloaded
  model records where it came from and when, and the panel links its sources
  so you can verify them yourself.

### Shortcuts

Every action, rebindable. Only your overrides are stored — see
[Keyboard shortcuts](/docs/keyboard-shortcuts/).
