---
title: "Configuration"
weight: 70
description: "Where TermHQ keeps its settings, what can be changed, and how config files behave across versions."
---

Everything configurable lives in **Settings** (<kbd>Ctrl</kbd>+<kbd>,</kbd>, or
<kbd>Ctrl</kbd>+<kbd>P</kbd> and search for it). Settings are written to a JSON
file you can also edit by hand.

## Where it lives

| Platform | Path |
|---|---|
| Windows | `%APPDATA%\dev.termhq.app\config.json` |
| macOS | `~/Library/Application Support/dev.termhq.app/config.json` |
| Linux | `~/.config/dev.termhq.app/config.json` |

Alongside it are the directories TermHQ manages for you:

| Directory | Contents |
|---|---|
| `themes/` | Your own and imported colour themes |
| `icons/` | Installed file-icon themes |
| `workspaces/` | Saved workspace state |
| `logs/` | The PTY host's log |

## Missing keys are filled in

Any key absent from `config.json` takes its default. A config written by an
older TermHQ keeps working after an update — new settings appear with their
defaults rather than the file needing migration, and hand-editing cannot break
startup by leaving something out.

The same applies in reverse: a key TermHQ no longer recognises is ignored rather
than being an error.

## What you can change

### Appearance

- **Theme** — built-in themes plus anything in `themes/`
- **Font family and size**; per-pane size is adjusted with <kbd>Ctrl</kbd>+wheel
- **Cursor style and blink**
- **File icon theme**

### Terminals

- **Default shell** — used by the New terminal button
- **Scrollback length**
- **Bell behaviour**

### Startup

- **What opens on launch** — most recent workspace, the picker, or a new one
- **Whether stashed panes resume stashed**

### Closing

- **Undo window** — how many seconds a closed pane can be restored; default 5
- **Whether the × button offers undo** as well as the keyboard shortcut
- **Whether undo is enabled at all**

### Favourites

Starred directories, opened with whatever your default shell is at the time you
click them rather than the one that starred them. They appear in the title bar
dropdown, in the welcome list, and as numbered shortcuts — one list drives all
three, so reordering it reorders everything.

### Voice

- **Enable dictation**
- **Model selection**, where more than one has been fetched

## Editing by hand

Close TermHQ before editing `config.json`, or your changes will be overwritten
the next time it saves — TermHQ writes the whole file whenever a setting
changes.

If the file cannot be parsed, TermHQ starts with defaults rather than refusing
to open.
