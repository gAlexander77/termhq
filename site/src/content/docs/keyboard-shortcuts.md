---
title: "Keyboard shortcuts"
weight: 80
description: "Every default shortcut in TermHQ, how to rebind them, and how conflicts with terminal programs are resolved."
---

On macOS, <kbd>⌘</kbd> replaces <kbd>Ctrl</kbd> in every shortcut below.

## Terminals

| Action | Shortcut |
|---|---|
| New terminal | <kbd>Ctrl</kbd>+<kbd>T</kbd> |
| Close focused pane | <kbd>Ctrl</kbd>+<kbd>W</kbd> |
| Focus pane 1–9 | <kbd>Ctrl</kbd>+<kbd>1</kbd>…<kbd>9</kbd> |
| Restore closed terminal | *unassigned by default* |

## Layout

| Action | Shortcut |
|---|---|
| Arrange mode | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd> |
| Zoom pane in / out | <kbd>Ctrl</kbd>+wheel |
| Ultra focus | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd> |

## Navigation

| Action | Shortcut |
|---|---|
| Command palette | <kbd>Ctrl</kbd>+<kbd>P</kbd> |
| Workspace picker | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> |
| Settings | <kbd>Ctrl</kbd>+<kbd>,</kbd> |
| Favourite 1–10 | prefix chord, then <kbd>1</kbd>…<kbd>0</kbd> |

<kbd>Ctrl</kbd>+<kbd>P</kbd> and <kbd>Ctrl</kbd>+<kbd>,</kbd> toggle: pressing
the same chord again closes what it opened.

## Editing

| Action | Shortcut |
|---|---|
| Copy | <kbd>Ctrl</kbd>+<kbd>C</kbd> *(with a selection)* |
| Interrupt | <kbd>Ctrl</kbd>+<kbd>C</kbd> *(with no selection)* |
| Paste | <kbd>Ctrl</kbd>+<kbd>V</kbd> |

## Why Ctrl+C does two things

In a terminal, <kbd>Ctrl</kbd>+<kbd>C</kbd> means "interrupt", and that meaning
cannot be given away — it is how you stop a runaway process. But when text is
selected, "interrupt" is almost never what you meant.

So TermHQ copies when there is a selection and interrupts when there is not.
This is what Windows Terminal does, and in practice the ambiguity never comes
up: you do not select text in order to kill a process.

The rule is off on macOS, where <kbd>⌘</kbd>+<kbd>C</kbd> already copies and
<kbd>Ctrl</kbd>+<kbd>C</kbd> is unambiguously the interrupt. It is also off in
ultra focus, where the whole point is that TermHQ touches nothing.

## Rebinding

**Settings → Keybinds** lists every action with its current chord. Click one and
press the combination you want.

Conflicts are shown rather than silently resolved: if two actions claim the same
chord, both are flagged so you can decide which keeps it.

## When a terminal program wants the same key

Full-screen terminal programs — editors, `tmux`, some agents — have their own
chords, and some collide with TermHQ's.

Two ways out:

1. **Rebind** the TermHQ action.
2. **Ultra focus** — hands every keystroke to the terminal and turns TermHQ's
   shortcuts off entirely. The chord that enables it also disables it, and the
   title bar shows a badge you can click to leave, so the mode cannot trap you.
