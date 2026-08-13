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
| `themes/` | Your own and imported colour themes, plus the commented `_template.jsonc` |
| `icons/` | Installed file-icon themes |
| `logos/` | Cached artwork for installed marketplace extensions, so the Installed list has pictures offline |
| `sessions/` | One JSON per window slot: the saved state of each workspace |
| `pty-host.log` | A log file, useful to attach to a bug report |

## Missing keys are filled in

Any key absent from `config.json` takes its default. A config written by an older
TermHQ keeps working after an update — new settings appear with their defaults
rather than the file needing a migration, and hand-editing cannot break startup
by leaving something out.

The same applies in reverse: a key TermHQ no longer recognises is ignored, and
dropped the next time the file is written. And if the file cannot be parsed at
all, TermHQ starts with defaults rather than refusing to open.

## Editing by hand

Close TermHQ before editing `config.json`, or your changes will be overwritten
the next time it saves — TermHQ writes the whole file whenever a setting changes.

Keys are camelCase.

## What you can change

### General

- **Default shell** — used by the **+** button, <kbd>Ctrl</kbd>+<kbd>J</kbd> and
  favourites. Unset means the first shell detected.
- **Undo close** — which close paths get an undo window: none, the keyboard
  shortcut only, or the shortcut and the pane's **×** button. Default: both.
- **Undo window length** — seconds before the parked shell is actually killed.
  Default 5.
- **Clone keeps directory** — whether duplicating a pane opens in the source
  pane's directory or at home. Default on.
- **Layout preset** — Grid or Columns. Also the title bar switch.
- **Favourites** — starred directories, reorderable with ↑/↓. One order drives
  the title bar dropdown, the welcome list *and* the number keys, so there is
  never a second ordering to keep in sync. They are stored shell-agnostically:
  opening one spawns whatever your default shell is at the time you click, not
  the one that starred it.

### Workspaces

- **On startup** — resume the most recent workspace, show the picker, or start a
  new one. Default: most recent. A taskbar jump-list click overrides it for that
  launch.
- **Restore session on startup** — reopen your last panes with their shells,
  directories, layout, zoom and titles. Default on. Off means always starting
  with one default terminal, and anything still alive from last time is ended.
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
- **Git diff view** — split or stacked.

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
- **Notification colour** — the colour every attention surface draws from.
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
- **Toast auto-dismiss** — seconds, or 0 to stay until dismissed. Default 0.

### Files

- **Show hidden files** — dotfiles and OS-hidden entries. Default **on**; `ls -a`
  is the terminal user's default worldview, so hiding is the opt-in.
- **Sidebar side** — left or right. <kbd>Ctrl</kbd>+<kbd>B</kbd> toggles the
  sidebar itself.
- **File openers** — the right-click "open with" list. Each is a name plus a
  command, run either detached (Notepad) or in a new terminal pane opened in the
  file's directory (vim, nano).
- **Terminal openers run in** — which shell those terminal openers get. Until you
  pick one they stay hidden entirely, because vim in PowerShell helps nobody.

### Voice

- **Voice dictation** — show the mic button and honour the dictation chord.
  Default on.
- **Input device** — which microphone to use; falls back to the system default if
  the chosen one is unplugged.

### Shortcuts

Every action, rebindable. Only your overrides are stored — see
[Keyboard shortcuts](/docs/keyboard-shortcuts/).
