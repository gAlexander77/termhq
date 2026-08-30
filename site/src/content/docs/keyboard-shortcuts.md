---
title: "Keyboard shortcuts"
weight: 80
description: "Every default shortcut in TermHQ, how to rebind them, and how conflicts with terminal programs are resolved."
---

On macOS, <kbd>⌘</kbd> replaces <kbd>Ctrl</kbd> in every shortcut below — with one
deliberate exception, dictation, which is <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd>
on both. On macOS <kbd>Ctrl</kbd> belongs to the shell: <kbd>Ctrl</kbd>+<kbd>F</kbd>
and <kbd>Ctrl</kbd>+<kbd>B</kbd> are readline's forward-char and backward-char, so
binding them app-side would swallow keys the terminal is supposed to receive.

Most of the app-level chords are three keys rather than two. That is not padding:
the single-<kbd>Ctrl</kbd> versions nearly all belong to the shell —
<kbd>Ctrl</kbd>+<kbd>C</kbd> is the interrupt, <kbd>Ctrl</kbd>+<kbd>D</kbd> is EOF,
<kbd>Ctrl</kbd>+<kbd>S</kbd> freezes output, <kbd>Ctrl</kbd>+<kbd>L</kbd> clears the
screen — and no <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+letter is a distinct control code.

## Terminals and panes

| Action | Shortcut |
|---|---|
| New terminal (default shell) | <kbd>Ctrl</kbd>+<kbd>J</kbd> |
| Duplicate focused terminal | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> |
| New browser pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> |
| New editor pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> |
| Delete focused terminal | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> |
| Restore last closed terminal | *unassigned by default* |
| Find in scrollback (or file names) | <kbd>Ctrl</kbd>+<kbd>F</kbd> |

<kbd>Ctrl</kbd>+<kbd>J</kbd> and <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> pair
on purpose: <kbd>J</kbd> opens a terminal, <kbd>Shift</kbd>+<kbd>J</kbd> opens one
like this one. <kbd>B</kbd> is for browser and <kbd>E</kbd> for editor, both
taking <kbd>Shift</kbd> for the same reason the others do: plain
<kbd>Ctrl</kbd>+<kbd>B</kbd> is the sidebar and `tmux`'s prefix, and plain
<kbd>Ctrl</kbd>+<kbd>E</kbd> is end-of-line in every shell.

## Layout

| Action | Shortcut |
|---|---|
| Focus pane left / right | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>←</kbd> / <kbd>→</kbd> |
| Focus pane up / down | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd> |
| Arrange pane (mode) | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd> |
| Fullscreen focused pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> |
| Stash focused terminal | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> |
| Show / hide the stash shelf | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd> |
| Ultra focus | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd> |

Focus movement is geometric — it steps to the nearest pane in that direction,
preferring one that shares an edge, so focus follows what your eye sees rather
than the order panes were opened. In Columns layout only left and right apply.

## Navigation

| Action | Shortcut |
|---|---|
| Command palette | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> |
| Settings, with search focused | <kbd>Ctrl</kbd>+<kbd>P</kbd> |
| Workspace picker | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> |
| Toggle sidebar | <kbd>Ctrl</kbd>+<kbd>B</kbd> |
| Run an agent by number | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>, then <kbd>1</kbd>…<kbd>9</kbd>/<kbd>0</kbd> |
| Open a favorite by number | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd>, then <kbd>1</kbd>…<kbd>9</kbd>/<kbd>0</kbd> |

The split between the two <kbd>P</kbd> chords follows VS Code's:
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> is the palette of every action by
name, <kbd>Ctrl</kbd>+<kbd>P</kbd> is quick-open — here, Settings with the search
box already focused, so you type the setting you want instead of hunting
categories. Both toggle: the same chord again closes what it opened.

The two numbered pickers are deliberately two strokes rather than ten chords,
which keeps the digits free the rest of the time. While one is armed, a card
lists the numbered entries so the mapping is never guesswork.

## Zoom

| Action | Shortcut |
|---|---|
| Zoom pane in / out | <kbd>Ctrl</kbd>+<kbd>=</kbd> / <kbd>Ctrl</kbd>+<kbd>-</kbd> |
| Reset pane zoom | <kbd>Ctrl</kbd>+<kbd>0</kbd> |
| Zoom the pane under the pointer | <kbd>Ctrl</kbd>+wheel, or a trackpad pinch |

This is text size in one pane, not that pane's share of the grid — for the
latter, see Fullscreen above.

## Editing

| Action | Shortcut |
|---|---|
| Copy selection | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> |
| Copy | <kbd>Ctrl</kbd>+<kbd>C</kbd> *(with a selection)* |
| Interrupt | <kbd>Ctrl</kbd>+<kbd>C</kbd> *(with no selection)* |
| Paste | <kbd>Ctrl</kbd>+<kbd>V</kbd>, <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd>, or <kbd>Shift</kbd>+<kbd>Insert</kbd> |

## Voice

| Action | Shortcut |
|---|---|
| Dictation (start / stop) | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> |

The one chord that does not move to <kbd>⌘</kbd> on macOS:
<kbd>⌘</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> is Finder's search window, while
<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> collides with nothing a shell
wants.

## Why Ctrl+C does two things

In a terminal, <kbd>Ctrl</kbd>+<kbd>C</kbd> means "interrupt", and that meaning
cannot be given away — it is how you stop a runaway process. But when text is
selected, "interrupt" is almost never what you meant.

So TermHQ copies when there is a selection and interrupts when there is not.
This is what Windows Terminal does, and it is safe because copying clears the
selection: a <kbd>Ctrl</kbd>+<kbd>C</kbd> that copies when you meant to interrupt
costs one extra keypress and never more, because the next one finds nothing
selected.

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> is the unconditional copy, and the
one you can rebind. The plain-<kbd>Ctrl</kbd> rule is off on macOS, where
<kbd>⌘</kbd>+<kbd>C</kbd> already copies, and off in ultra focus.

## Rebinding

**Settings → Shortcuts** lists every action with its current chord, under four
headings — Open panes, Terminals, Focus and layout, App — so you find one by what
it does rather than by scanning all of them. Search filters across every group.

Click a row and press the combination you want. To leave an action with no shortcut at all, use
the slashed-key button that appears beside the chord while you are recording —
<kbd>Backspace</kbd> does the same thing, but only if you already knew that, and
while recording every other key means "use this one". Only your overrides are
stored — anything you have not touched follows the default, so defaults can
improve between versions without overwriting your choices.

Recording stops if you leave the list — switching category, typing in the search
box, or closing Settings — so a recording you walked away from can never land on
a row you are no longer looking at.

A chord can belong to exactly one action, so taking an occupied one asks first: a
confirm card names the action that currently holds it and says it will be left
**unassigned**. Per-row reset works the same way in reverse — if that action's
default has since been given to something else, resetting tells you whose chord
it is taking back. Once anything differs from the defaults, the section ends with
a count and a **Reset all shortcuts** button.

An action you have unassigned is still listed in the command palette and still
runnable from it, so dropping a chord never costs you the command.

The palette also says when an action **cannot do anything right now** and why —
*only one pane in the grid* beside Arrange pane, *voice is off in Settings*
beside Voice dictation, *the focused pane is an editor, not a terminal* beside
the ones that need a shell. Those rows are dimmed but still listed and still
runnable, because the palette is how you find an action in the first place, and
hiding one teaches you nothing about what it needs.

### Three actions want a terminal

Running an agent by number, voice dictation, and Copy selection all write into a
shell, so they need a **terminal** focused rather than just any pane. With an
[editor](/docs/editor/) or a [browser pane](/docs/browser-panes/) in front, they
refuse and say which kind of pane is in the way instead of quietly doing
nothing.

You are not left without a way to copy: an editor and a browser each handle
<kbd>Ctrl</kbd>+<kbd>C</kbd> themselves.

## Seeing what a key did

**Settings → Shortcuts → Show shortcuts on screen** (off by default) puts a card
on screen for each chord you press, saying **what the app did with it**: ran an action, nothing bound, the editor kept it, ultra focus passed
it through.

It is there for demos and screen recordings, and for the moment a chord seems to
do nothing and you want to know which of those four it was. Only keys held with
<kbd>Ctrl</kbd>, <kbd>Alt</kbd> or <kbd>⌘</kbd> and the function keys are ever
shown — it cannot display your typing.

## What is not rebindable

A few behaviors answer to terminal state rather than to a chord, so they are
fixed rather than keymap entries: paste
(<kbd>Ctrl</kbd>+<kbd>V</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> /
<kbd>Shift</kbd>+<kbd>Insert</kbd>), right-click copying the selection or pasting
when there is none, and <kbd>Ctrl</kbd>+scroll zoom.

Bare arrow keys cannot be keymap entries either — they would break every TUI — so
the two places TermHQ uses them, arrange mode and the stash shelf, are modes you
enter and leave rather than standing bindings.

## Four defaults that take a key from your shell

Most of TermHQ's shortcuts are chosen so the shell loses nothing. Four are not,
and it is better that you hear it here than discover it:

| Chord | What it takes on Windows and Linux |
|---|---|
| <kbd>Ctrl</kbd>+<kbd>B</kbd> (sidebar) | **`tmux`'s prefix key.** If you use tmux inside TermHQ, rebind one of them. |
| <kbd>Ctrl</kbd>+<kbd>P</kbd> (settings) | Previous-command history, for anyone who walks history with it instead of ↑. |
| <kbd>Ctrl</kbd>+<kbd>F</kbd> (find) | Cursor-forward in shell line editing; page-forward in `less` and `vim`. |
| <kbd>Ctrl</kbd>+<kbd>J</kbd> (new terminal) | Newline — to a shell, <kbd>Ctrl</kbd>+<kbd>J</kbd> *is* <kbd>Enter</kbd>. |

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>←</kbd>/<kbd>→</kbd> also costs PowerShell
its word-selection. That one was a deliberate trade: pane navigation that works
in every shell, against one editing convenience in one shell.

None of this applies on macOS. There every shortcut hangs off <kbd>⌘</kbd>, which
never reaches the terminal at all, so there is nothing to collide.

Any of them can be rebound or cleared in **Settings → Shortcuts**, per machine.

## When an editor pane has focus

An [editor pane](/docs/editor/) binds keys of its own, and they are bound *in
the pane* so your shell loses nothing: <kbd>Ctrl</kbd>+<kbd>S</kbd> still
freezes a terminal's output and <kbd>Ctrl</kbd>+<kbd>W</kbd> still deletes a
word everywhere else. The full set is on the [editor page](/docs/editor/).

Two app chords also step aside for the editor, because Monaco binds them to
something you are more likely to want while typing:

| Chord | The editor uses it for |
|---|---|
| <kbd>Ctrl</kbd>+<kbd>F</kbd> | Its own find widget, instead of terminal scrollback search |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> | Select all occurrences, instead of the favorites picker |

On macOS, <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> joins them — there it is the
standard redo, so redo wins over fullscreen. On Windows and Linux redo also has
<kbd>Ctrl</kbd>+<kbd>Y</kbd>, so fullscreen keeps its chord.

**Settings → Editor → Editing shortcuts stay in the editor** turns the yielding
off and runs the app action everywhere. Ultra focus hands over every key
regardless.

## When a browser pane has focus

A [browser pane](/docs/browser-panes/) is a real web page, and a web page wants
keys too. On Windows, TermHQ's chords are taken before the page sees them, so
pane focus, arrange mode, stash, close, fullscreen and the pickers all work with
a page focused exactly as they do with a terminal focused. Afterwards the
keyboard goes where the result needs it — back into the page, or into the app
for arrange mode's arrows and a picker's digits.

A short list is deliberately left to the page:

| Chord | Who gets it | Why |
|---|---|---|
| <kbd>Ctrl</kbd>+<kbd>F</kbd> | The page | Its own find bar is the one you meant |
| <kbd>Ctrl</kbd>+<kbd>=</kbd> / <kbd>-</kbd> / <kbd>0</kbd> | The page | The browser engine's own zoom |
| Copy | The page | Same |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> | The page | It would type into a terminal that is not there |
| <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> | The page | Same — dictation needs somewhere to write |

The URL bar takes precedence over all of it: while you are typing an address,
no TermHQ chord fires at all.

Ultra focus (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd>) hands a browser pane
every key except its own toggle, the same bargain it makes with a terminal.

On macOS and Linux this interception is not in place yet, so a TermHQ surface —
another pane, the title bar — needs focus before a chord will fire.

## When a terminal program wants the same key

Full-screen terminal programs — editors, `tmux`, some agents — have their own
chords, and some collide with TermHQ's.

Two ways out:

1. **Rebind** the TermHQ action.
2. **Ultra focus** (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd>) — hands every
   keystroke to the terminal and turns TermHQ's shortcuts off. That includes
   <kbd>Ctrl</kbd>+<kbd>V</kbd>, which normally pastes, because that is vim's
   visual block and exactly the key someone turns the mode on to get.

Two things stay TermHQ's by design even in ultra focus:
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> still pastes — it is not a control
code, so no TUI can want it — and mouse behaviors are unaffected, so right-click
paste and <kbd>Ctrl</kbd>+scroll zoom keep working. Its own chord stays live too,
because a mode with no keyboard exit is a trap; a badge appears in the title bar
and can be clicked to leave, and the focused pane's edge breathes in the
attention color while the mode is on.

Ultra focus is deliberately not remembered across restarts. A mode that outlives
a launch is a mode you can be stuck in without knowing why.
