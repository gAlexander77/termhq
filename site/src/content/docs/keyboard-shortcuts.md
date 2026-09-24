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
| Duplicate focused pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> |
| New browser pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> |
| New editor pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> |
| Connect via SSH | *unassigned by default* |
| Delete focused terminal | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>D</kbd> |
| Restore last closed terminal | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> |
| Show recently closed panes | *unassigned by default* |
| Rename the focused pane | *unassigned by default* |
| Find (terminal or files) | <kbd>Ctrl</kbd>+<kbd>F</kbd> |

<kbd>Ctrl</kbd>+<kbd>J</kbd> and <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> pair
on purpose: <kbd>J</kbd> opens a terminal, <kbd>Shift</kbd>+<kbd>J</kbd> opens one
like this one. <kbd>B</kbd> is for browser and <kbd>E</kbd> for editor, with
<kbd>Shift</kbd> keeping them separate from other actions. On Windows, for
example, plain <kbd>Ctrl</kbd>+<kbd>B</kbd> toggles the sidebar, but Vim also
uses it to page backward in normal mode.

**Connect via SSH** opens the SSH picker once SSH is turned on in **Settings →
SSH → SSH connections** — see [SSH connections](/docs/ssh/). **Show recently
closed panes** opens the status bar's list of panes still inside their undo
window, with the keyboard on its first row. **Rename the focused pane** opens the
pane's name for editing; an empty name brings back the automatic one. **Find**
follows where you are: over a terminal it opens that pane's find bar, and when
you were last in the Files panel it searches file and folder names.

On macOS, <kbd>⌘</kbd>+<kbd>W</kbd> closes what it points at: the tab in a
focused editor, otherwise the focused pane — through the same close as **Delete
focused terminal**, so a closed terminal can still come back with Undo close.
Only when no pane is left on the grid does it close the window.

## Layout

| Action | Shortcut |
|---|---|
| Focus pane left / right | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>←</kbd> / <kbd>→</kbd> |
| Focus pane up / down | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd> |
| Jump to the newest waiting pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>N</kbd> |
| Focus the previous pane | *unassigned by default* |
| Arrange pane (mode) | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd> |
| Push pane left / right / up / down | *unassigned by default* |
| Maximize focused pane (toggle) | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> |
| Switch between Grid and Columns | *unassigned by default* |
| Reset pane sizes | *unassigned by default* |
| Stash focused pane | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> |
| Show/hide the stash shelf | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd> |
| Restore all stashed panes | *unassigned by default* |
| Close all stashed panes | *unassigned by default* |
| Ultra focus mode (toggle) | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd> |

Focus movement is geometric — it steps to the nearest pane in that direction,
preferring one that shares an edge, so focus follows what your eye sees rather
than the order panes were opened. In Columns layout only left and right apply.

**Jump to the newest waiting pane** goes to the pane that most recently went
quiet while you were looking elsewhere — the first entry in the status bar's
waiting list — bringing it back from the shelf, or out from behind a maximized
pane, if it has to. See
[When a pane needs your attention](/docs/agents/#when-a-pane-needs-your-attention).
**Focus the previous pane** is the way back after a jump: it returns to the pane
that had focus before this one.

**Maximize focused pane** fills the grid with one pane, and the same chord
restores the grid; a double-click on a pane's header does the same. **Switch
between Grid and Columns** flips the layout and keeps the panes in the order you
read them, **Reset pane sizes** puts every dragged row and column back to an even
share, and **Restore all stashed panes** and **Close all stashed panes** act on
the whole shelf — restoring asks first when it would leave every pane very small,
and closing always asks.

## Navigation

| Action | Shortcut |
|---|---|
| Command palette | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> |
| Settings (focus search) | <kbd>Ctrl</kbd>+<kbd>P</kbd> |
| Workspaces | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> |
| Toggle sidebar | <kbd>Ctrl</kbd>+<kbd>B</kbd> |
| Worktrees | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> |
| Run an agent by number | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd>, then <kbd>1</kbd>…<kbd>9</kbd>/<kbd>0</kbd> |
| Open a favorite by number | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd>, then <kbd>1</kbd>…<kbd>9</kbd>/<kbd>0</kbd> |

The split between the two <kbd>P</kbd> chords follows VS Code's:
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> is the palette of every action by
name, <kbd>Ctrl</kbd>+<kbd>P</kbd> is quick-open — here, Settings with the search
box already focused, so you type the setting you want instead of hunting
categories. Both toggle: the same chord again closes what it opened.

The palette opens more than actions. Beside them it lists your favorites, your
shells, the agents it found (**Run** and the agent's name), your other
workspaces, themes and every Settings page — and your saved and recent SSH
connections while SSH is on. With nothing typed they sit under headings, with
what you ran last first.

The two numbered pickers are deliberately two strokes rather than ten chords,
which keeps the digits free the rest of the time. While one is armed, a card
lists the numbered entries so the mapping is never guesswork; the agent card's
title names the terminal the command will be typed into.
Both the number row and numeric keypad work in the agent and favorite pickers,
including <kbd>0</kbd> for the tenth entry. <kbd>Esc</kbd> cancels, and any other
key cancels and then does what it normally does.

The global [Worktrees](/docs/worktrees/) view is also available from the command
palette and its status-bar item.

The Git actions have no default shortcut: Git: Open the Git panel, Git: Open
History, Git: View File History, Git: Commit, Git: Stage All Changes, Git:
Unstage All Changes, Git: Fetch, Git: Pull, Git: Push, Git: Switch Branch, Git:
Stash Changes and Git: Refresh. Run them from the command palette, or give the
ones you use a chord under the **Source Control** heading in **Settings →
Shortcuts**. See [Source Control](/docs/source-control/).

## In a pane

| Action | Key |
| --- | --- |
| Open a web link in a terminal's output, in your default browser | <kbd>Ctrl</kbd>+click |
| Open it in a browser pane beside the terminal instead | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+click |
| Find bar: next / previous match | <kbd>Enter</kbd> / <kbd>Shift</kbd>+<kbd>Enter</kbd> |
| Find bar: match case, whole word, regular expression | <kbd>Alt</kbd>+<kbd>C</kbd>, <kbd>Alt</kbd>+<kbd>W</kbd>, <kbd>Alt</kbd>+<kbd>R</kbd> |
| Close the find bar | <kbd>Esc</kbd> |
| Maximize the pane, or restore the grid | Double-click its header |
| Rename the pane | Right-click its header, or <kbd>F2</kbd> with the keyboard on the header's buttons |

A plain click on a link only focuses the pane or starts a selection; hover one
and a hint says how to open it. On macOS the find bar's toggles are
<kbd>Option</kbd>+<kbd>C</kbd>, <kbd>W</kbd> and <kbd>R</kbd>. <kbd>Ctrl</kbd>+<kbd>F</kbd>
on a pane whose find bar is already open puts the keyboard back in it.

On a terminal, a right-click on the header opens the pane's menu instead —
Rename…, Copy path, Reveal in File Explorer (Finder on macOS), the header's
buttons by name, and Close. <kbd>F2</kbd> never renames from inside the terminal
itself, where it belongs to the program.

## In the Files panel

With a row focused (click one, or <kbd>Tab</kbd> into the tree):

| Action | Key |
| --- | --- |
| Open a file, or expand / collapse a folder | <kbd>Enter</kbd> or <kbd>Space</kbd> |
| Walk the tree | <kbd>↑</kbd> <kbd>↓</kbd>, <kbd>Home</kbd> <kbd>End</kbd> |
| Expand a folder, or step into one that is open | <kbd>→</kbd> |
| Collapse a folder, or go to the parent folder's row | <kbd>←</kbd> |
| Jump to a name | Type its first letters |
| Go up a folder | <kbd>Backspace</kbd> |
| Open the row's menu | <kbd>Shift</kbd>+<kbd>F10</kbd> or the menu key |
| Rename | <kbd>F2</kbd> |
| Delete (asks first; moves to the Recycle Bin / Trash) | <kbd>Delete</kbd> |

Inside a row's menu, a shell row ("Open in PowerShell" and the like) opens its
agent flyout with <kbd>→</kbd>, a right-click or the chevron at its edge, and
<kbd>←</kbd> or <kbd>Esc</kbd> closes it.

## In menus

Every menu takes the keyboard the same way: <kbd>↑</kbd> <kbd>↓</kbd>,
<kbd>Home</kbd> and <kbd>End</kbd> move between rows, <kbd>Enter</kbd> picks one,
<kbd>Esc</kbd> closes the menu, and a letter jumps to the next row that starts
with it — press it again for the one after.

## Zoom

| Action | Shortcut |
|---|---|
| Zoom pane in / out | <kbd>Ctrl</kbd>+<kbd>=</kbd> / <kbd>Ctrl</kbd>+<kbd>-</kbd> |
| Reset pane zoom | <kbd>Ctrl</kbd>+<kbd>0</kbd> |
| Zoom the pane under the pointer | <kbd>Ctrl</kbd>+wheel, or a trackpad pinch |

This is text size in one pane, not that pane's share of the grid — for the
latter, see Maximize above. After each step a terminal pane shows its new size
for a moment, with the chord that resets it: *15 px · Ctrl+0 resets*. **Settings
→ Terminal → Zoom controls** turns the wheel and the pinch off; the keys keep
working.

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
| Voice dictation (start / stop) | <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> |
| Hold to talk (opt in) | hold <kbd>Space</kbd>, or the key you set |

The one chord that does not move to <kbd>⌘</kbd> on macOS:
<kbd>⌘</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> is Finder's search window, while
<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> collides with nothing a shell
wants. It dictates into the focused terminal, or into the text field you are
typing in.

Hold to talk is a hold, not a chord, so it lives in **Settings → Voice** rather
than here: turn it on there and set its key by pressing it — any single key,
Right Ctrl included. See [Dictation](/docs/dictation/).

## Why Ctrl+C does two things

In a terminal, <kbd>Ctrl</kbd>+<kbd>C</kbd> means "interrupt", and that meaning
cannot be given away — it is how you stop a runaway process. But when text is
selected, "interrupt" is almost never what you meant.

So TermHQ copies when there is a selection and interrupts when there is not.
This is what Windows Terminal does, and it is safe because copying clears the
selection: a <kbd>Ctrl</kbd>+<kbd>C</kbd>
that copies when you meant to interrupt costs one extra keypress and never more,
because the next one finds nothing selected.

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> is the unconditional copy, and the
one you can rebind. The plain-<kbd>Ctrl</kbd> rule is off on macOS, where
<kbd>⌘</kbd>+<kbd>C</kbd> already copies, and off in ultra focus.

## Rebinding

**Settings → Shortcuts** lists every action with its current chord, under six
headings — Open panes, Source Control, Terminals, Focus & layout, Arrange without
the mode, App — so you find one by what it does rather than by scanning all of
them. Search filters across every group.

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

A chord gets the same treatment. When its action has nothing to do right now,
TermHQ does not swallow the key: it goes on to the focused pane, where it may
mean something to the program running there.

### Three actions want a terminal

Running an agent by number and voice dictation type into a shell, and Copy
selection copies a terminal's selection, so all three want a **terminal** focused
rather than just any pane. The first two also need that terminal's shell to be
running — a terminal whose shell has ended refuses them — and the agent picker
refuses an [SSH pane](/docs/ssh/) as well, because the agents it offers are the
ones found on this machine and the command would run on the far host.

Dictation can also start in one of TermHQ's own text fields — the commit box, a
search box, a browser pane's address bar — and types there. See
[Dictation](/docs/dictation/).

With an [editor](/docs/editor/) or a [browser pane](/docs/browser-panes/) in
front, all three refuse: the palette says which kind of pane is in the way, and
the chord goes on to the pane rather than doing something that could not work.

You are not left without a way to copy: an editor and a browser each handle
<kbd>Ctrl</kbd>+<kbd>C</kbd> themselves.

## Seeing what a key did

**Settings → Shortcuts → Show shortcuts on screen** (off by default) puts a card
on screen for each chord you press, saying **what the app did with it**: ran an
action, nothing bound, the editor kept it (or it was the editor's own key), ultra
focus passed it through, the action could not run — with the reason the palette
would give — or a text field kept it (*typing — … not run*).

It is there for demos and screen recordings, and for the moment a chord seems to
do nothing and you want to know which of those it was. Only keys held with
<kbd>Ctrl</kbd>, <kbd>Alt</kbd> or <kbd>⌘</kbd> and the function keys are ever
shown — it cannot display your typing.

## What is not rebindable

A few behaviors answer to terminal state or to the mouse rather than to a chord,
so they are not keymap entries: paste
(<kbd>Ctrl</kbd>+<kbd>V</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> /
<kbd>Shift</kbd>+<kbd>Insert</kbd>), right-click, and <kbd>Ctrl</kbd>+scroll zoom.

The two mouse behaviors have settings of their own instead. **Settings → Terminal
→ Right-click in a terminal** chooses between a menu — Copy, Paste, Select all,
Clear and Find — and copying the selection, or pasting when there is none;
*Automatic*, the default, is the menu on macOS and copy-or-paste on Windows.
**Settings → Terminal → Zoom controls** turns <kbd>Ctrl</kbd>+scroll zoom off.

Bare arrow keys cannot be keymap entries either — they would break every TUI — so
TermHQ uses them only where you have gone on purpose: arrange mode, the stash
shelf, a gutter between panes that you have tabbed to (the arrows move it,
<kbd>Enter</kbd> evens it up), the status bar's lists of closed and waiting
panes, and menus. None of them is a standing binding.

## Four defaults that take a key from your shell

Most of TermHQ's shortcuts are chosen so the shell loses nothing. Four are not,
and it is better that you hear it here than discover it:

| Chord | What it takes on Windows |
|---|---|
| <kbd>Ctrl</kbd>+<kbd>B</kbd> (sidebar) | Page-backward in Vim's normal mode; cursor-backward in shell line editing. |
| <kbd>Ctrl</kbd>+<kbd>P</kbd> (settings) | Previous-command history, for anyone who walks history with it instead of ↑. |
| <kbd>Ctrl</kbd>+<kbd>F</kbd> (find) | Page-forward in Vim's normal mode and `less`; cursor-forward in shell line editing. |
| <kbd>Ctrl</kbd>+<kbd>J</kbd> (new terminal) | Newline — to a shell, <kbd>Ctrl</kbd>+<kbd>J</kbd> *is* <kbd>Enter</kbd>. |

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>←</kbd>/<kbd>→</kbd> also costs PowerShell
its word-selection. That one was a deliberate trade: pane navigation that works
in every shell, against one editing convenience in one shell.

None of this applies on macOS. There every shortcut hangs off <kbd>⌘</kbd>, which
never reaches the terminal at all, so there is nothing to collide.

Any of them can be rebound or cleared in **Settings → Shortcuts**, per machine.

## When a text field or a dialog has focus

TermHQ's own text fields — a browser pane's address bar, the commit box, a
search box, a pane's name while you rename it — and anything under an open
dialog get their keys first. There only the launchers run: the command palette,
Settings, Workspaces, Connect via SSH, Worktrees, and voice dictation, which types
into the field you are in. Every other chord is left to the field or the dialog, so
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> in the commit box does not maximize
the pane behind it, and <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>←</kbd> /
<kbd>→</kbd> select by word as they do in any text box.

A terminal's input and an editor's are not text fields in this sense. They keep
their keys by the rules on the rest of this page.

## When an editor pane has focus

An [editor pane](/docs/editor/) binds keys of its own, and they are bound *in
the pane* so your shell loses nothing: <kbd>Ctrl</kbd>+<kbd>S</kbd> still
freezes a terminal's output and <kbd>Ctrl</kbd>+<kbd>W</kbd> still deletes a
word everywhere else. The full set is on the [editor page](/docs/editor/).

Three app chords also step aside for the editor, because the editor binds them to
something you are more likely to want while typing:

| Chord | The editor uses it for |
|---|---|
| <kbd>Ctrl</kbd>+<kbd>F</kbd> | Its own find widget, instead of terminal scrollback search |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> | Select all occurrences, instead of the favorites picker |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> | Reopen the last closed tab, instead of opening Worktrees |

On macOS, <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> joins them — there it is the
standard redo, so redo wins over Maximize. On Windows redo also has
<kbd>Ctrl</kbd>+<kbd>Y</kbd>, so Maximize keeps its chord.

The pane-focus chords stay in the editor too: there
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+arrow selects text, as it does in any text box.

**Settings → Editor → Editing shortcuts stay in the editor** turns the yielding
off and runs the app action everywhere, pane focus included. Ultra focus hands
over every key regardless.

## When a browser pane has focus

A [browser pane](/docs/browser-panes/) is a real web page, and a web page wants
keys too. On Windows and macOS, TermHQ's chords are taken before the page sees
them, so pane focus, arrange mode, stash, close, maximize and the pickers all
work with a page focused exactly as they do with a terminal focused. Afterwards
the keyboard goes where the result needs it — back into the page, or into the
app for arrange mode's arrows and a picker's digits.

A short list is deliberately left to the page:

| Chord | Who gets it | Why |
|---|---|---|
| <kbd>Ctrl</kbd>+<kbd>F</kbd> | The page | Its own find bar is the one you meant |
| <kbd>Ctrl</kbd>+<kbd>=</kbd> / <kbd>-</kbd> / <kbd>0</kbd> | The page | The browser engine's own zoom |
| Copy | The page | Same |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>A</kbd> | The page | It would type into a terminal that is not there |
| <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Space</kbd> | The page | Same — dictation needs somewhere to write |

On macOS the first two rows are the pane's instead. The page's engine shows no
find bar of its own there, so <kbd>⌘</kbd>+<kbd>F</kbd> opens the pane's find
bar, and <kbd>⌘</kbd>+<kbd>=</kbd> / <kbd>-</kbd> / <kbd>0</kbd> still zoom the
page, with TermHQ doing the zooming. macOS also gives a focused page the usual
browser keys, unless your keymap has claimed them: <kbd>⌘</kbd>+<kbd>L</kbd> for
the address bar, <kbd>⌘</kbd>+<kbd>[</kbd> and <kbd>⌘</kbd>+<kbd>]</kbd> for back
and forward, <kbd>⌘</kbd>+<kbd>R</kbd> to reload.

The address bar is one of TermHQ's own text fields, so while you type an address
only the launchers run — see
[When a text field or a dialog has focus](#when-a-text-field-or-a-dialog-has-focus).

Ultra focus (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd>) hands a browser pane
every key except its own toggle, the same bargain it makes with a terminal.

## When a terminal program wants the same key

Terminal programs such as Vim have their own shortcuts, and some collide with
TermHQ's. For example, on Windows, <kbd>Ctrl</kbd>+<kbd>B</kbd> opens the sidebar
instead of paging backward in Vim's normal mode.

Two ways out:

1. **Rebind or clear** the TermHQ action in **Settings → Shortcuts**.
2. **Ultra focus** (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd>) — hands every
   keystroke to the terminal and turns TermHQ's shortcuts off. That includes
   <kbd>Ctrl</kbd>+<kbd>V</kbd>, which normally pastes, so Vim can receive it to
   enter visual block mode.

Two things stay TermHQ's by design even in ultra focus:
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> still pastes — it is not a control
code, so no TUI can want it — and mouse behaviors are unaffected, so right-click
and <kbd>Ctrl</kbd>+scroll zoom keep working. Its own chord stays live too,
because a mode with no keyboard exit is a trap; a badge appears in the title bar
and can be clicked to leave, and the focused pane's edge breathes in the
attention color while the mode is on.

Ultra focus is deliberately not remembered across restarts. A mode that outlives
a launch is a mode you can be stuck in without knowing why.
