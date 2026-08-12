---
title: "Panes and layout"
weight: 30
description: "Tiling, resizing, keyboard arranging, zoom, stashing, and undoing a close."
---

Every terminal in TermHQ is a pane in a tiled grid. Nothing hides behind a tab.

## How panes are placed

New panes fill the first free space in the grid, and the grid reflows when a
pane leaves so there are no gaps. The two presets in the title bar decide the
shape:

- **Grid** — columns are ⌈√n⌉. Four panes make a 2×2; five or more go three
  wide.
- **Columns** — every pane is a full-height strip.

A pane keeps whatever size you have given it until the layout genuinely cannot
honour it. Closing a pane repacks the remaining ones rather than leaving a hole.

## Resizing

Drag any edge between two panes. Dragging is continuous, and the grid keeps
neighbouring panes aligned so you do not end up with a one-pixel seam.

## Arranging from the keyboard

Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd> to enter arrange mode, then
use the arrow keys. Pressing a direction repeatedly cycles through the outcomes
in order:

1. **Grow** — the pane expands in that direction into free space.
2. **Move** — the pane relocates in that direction.
3. **Swap** — the pane trades places with its neighbour.

<kbd>Esc</kbd> leaves arrange mode. Directions that cannot be honoured — an edge
with nothing beyond it — are refused rather than silently doing something else.

## Zoom

The mouse wheel with <kbd>Ctrl</kbd> held changes the font size of the focused
pane. On a trackpad, pinch does the same thing. Zoom is per-pane, so an agent's
output can be small while the shell you are typing in stays readable.

## Stashing

A pane can be stashed: hidden from the grid while its shell keeps running.
Stashed panes collect in a dock at the bottom edge, which expands on hover.
Restoring one puts it back in the grid.

Stashing is useful for a long build you want out of the way but not gone.

## Undoing a close

Closing a pane removes it immediately — no confirmation, no waiting. The shell
underneath keeps running for a few seconds, and a toast with a countdown offers
to bring it back. Click it and the pane returns with its scrollback.

If the countdown runs out, the shell is ended for real.

The behaviour is configurable in **Settings → General**:

- how long the undo window lasts, in seconds
- whether closing with the pane's **×** button also offers undo, or closes
  outright
- whether the feature is on at all

There is also an unassigned **Restore closed terminal** action in the keymap if
you would rather undo without reaching for the mouse. It ships unbound
deliberately, so it cannot collide with a chord you already use.

## Ultra focus

Some terminal programs want chords TermHQ also uses. Ultra focus hands *every*
keystroke to the terminal, turning off TermHQ's own shortcuts so a TUI gets them
unmodified.

Because a mode that swallows the keyboard could trap you, the chord that turns
it on always turns it off, and a badge appears in the title bar that can be
clicked to leave.
