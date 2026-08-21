---
title: "Panes and layout"
weight: 30
description: "Tiling, the slot grid, resizing by the gutter, keyboard arranging, zoom, stashing, and undoing a close."
---

Everything TermHQ opens is a pane in a tiled grid — terminals, and
[browser panes](/docs/browser-panes/) alongside them. Nothing hides behind a
tab.

## The slot grid

Every pane owns an explicit rectangle of grid cells rather than floating at
whatever size a chain of splits left it, and **no operation ever moves a pane
you did not touch**. Your arrangement is yours; the app does not reflow it
behind your back to make room for something.

That is the arrangement. How wide each cell is, is a separate and much simpler
question — see [Resizing panes](#resizing-panes) below.

There is no limit on how many terminals you can open. The grid keeps growing to
hold them, and two presets in the title bar decide the shape:

- **Grid** — kept square-ish. Four panes make a 2×2, five to nine go three wide,
  ten to sixteen go four wide, and so on.
- **Columns** — every pane is a full-height strip, however many there are.

Past the point where everything still fits comfortably, the answer is usually to
park what you are not watching on the shelf, or fill the screen with one pane —
both below, and neither stops anything running.

Panes also fall upward: a pane rises until it rests on the top edge or on another
pane. That is what makes floating islands and phantom rows impossible, so
resizing the window always divides the space over real rows.

A single terminal fills the whole grid area rather than sitting in one
half-width cell. Spawning or cloning splits it back into the grid.

## Pane style

The grid has two looks, chosen in **Settings → Appearance → Pane style**.
**Spaced**, the default, keeps a small gutter between terminals and rounds
their corners. **Boxy** removes both — terminals meet edge to edge with
square corners, the tiling-window-manager look. Borders stay on in either
style, so two terminals never blur into one, and switching is instant: no
pane reflows or resizes, only the chrome around it changes.

Either way, the boundary between two panes is a resize handle; boxy simply puts
it on the seam where they meet instead of in a gutter.

## Rearranging with the mouse

Drag a pane's **header**. It is one gesture family, borrowed from Windows snap,
and every drop shows a dashed ghost preview before you commit:

| Drop target | Result |
|---|---|
| Onto another pane | The two **swap** places |
| Into a free cell | The pane **moves** there |
| Onto the near half of an adjacent free cell | The pane **grows** into it |
| Onto a grown pane's own half | It **un-snaps** back to a single cell |

Closing a pane re-packs the rest in reading order, so middle holes close and the
grid shrinks back through square sizes — unless you have hand-grown a pane, which
switches to a gentler reflow that does not disturb your arrangement.

## Resizing panes

The space between two panes is a handle. Put the pointer on it, the cursor
turns into a resize arrow, and dragging moves that boundary wherever you want
it — the same gesture as dragging a window edge, and the same one every tiling
window manager uses.

Which panes move follows from where the boundary is. **Panes with an edge on
the boundary you are dragging move with it; panes that do not touch it do not
move at all.** With three columns open, resizing the first two leaves the third
exactly where it was.

Where four panes meet, the crossing is a **corner**: grab it and both
boundaries move at once, diagonally, the way an operating system's window
corner does.

A few things fall out of that:

- **Double-click any boundary** — or a corner — to even up the pair it
  separates. It is the "make this sensible again" gesture, scoped to the edge
  you clicked rather than resetting the whole grid.
- **A pane can never be dragged out of existence.** Columns stop at 160px and
  rows at 240px, so the boundary refuses rather than tearing.
- **Only the boundary under your pointer lights up** — a thin line on the one
  that would move, and the one you are actually holding is a shade brighter
  still. It waits a moment before appearing, so sweeping the pointer across a
  gutter on the way somewhere else lights nothing; stop on one and the line is
  there immediately. Leaving is never delayed.

The gesture is the reason a [browser pane](/docs/browser-panes/) and a terminal
can share a row honestly: a web page has a natural width and a terminal does
not, so 70/30 is often the right answer and 50/50 never was.

### Putting it back

Two ways, at two scales. **Double-clicking one boundary** levels the pair it
separates. For the whole grid, a small **reset button appears in the title bar**
beside the Grid/Columns switch.

It is only there when there is something to reset — drag a pane off its equal
share and it appears; level the grid again and it goes. That is deliberate on
both counts: a button that spends most of its life doing nothing is furniture,
and one that shows up only when the grid is custom answers "why is this pane
wider than the others?" just by being there.

### Opening or closing a pane resets the sizes

A hand-tuned layout is tuned around the panes that were in it. So opening a new
pane — or closing, stashing, or restoring one — puts every boundary back to
equal.

Nothing else disturbs them. Swapping, moving, growing, arranging and resizing
the window all leave your proportions exactly as you set them, and a workspace
remembers them across restarts.

Fullscreen and the single-pane case have no boundaries to drag, because there
is nothing on the other side of one.

If you would rather the grid simply divided itself evenly, **Settings →
Appearance → Resize panes by dragging** turns the whole thing off: equal shares,
no handles. Your proportions are kept while it is off, so switching back on
returns the layout you had.

## Arranging from the keyboard

Everything the drag can do, without the mouse. Press
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd> to enter arrange mode, then use the
arrow keys. What a press does depends on what is in that direction:

- **Free space** → the pane **grows** into it.
- **Press again after growing** → the pane **moves** there.
- **Another pane** → the two **swap**.

So a repeat walks a pane outward — grow, move, grow, move — and you always see
the ground before committing to it. It is not a fixed three-step cycle; the
geometry decides.

A hint bar names the mode while it is on. <kbd>Esc</kbd> or <kbd>Enter</kbd>
finishes, and any other key — or any mouse click — simply leaves the mode and
does its usual job, so the arrows are never held hostage once you have moved on.

Panes will not grow past the edges of the grid in any direction, downward
included. The chord itself is refused when there would be nothing to watch: a
single pane, or a pane already fullscreened over the others.

## Zoom

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>, a double-click on a pane header, or
the header's zoom button fills the grid with one pane; the same action returns.
Hidden panes stay alive throughout, and moving focus while zoomed carries the
zoom to the next pane rather than dropping back to the grid.

## Font size

Separate from the above, and per-pane. <kbd>Ctrl</kbd>+<kbd>=</kbd> and
<kbd>Ctrl</kbd>+<kbd>-</kbd> change the focused pane's font size,
<kbd>Ctrl</kbd>+<kbd>0</kbd> resets it, and <kbd>Ctrl</kbd>+wheel — or a trackpad
pinch, which arrives as the same event — changes whichever pane is under the
pointer. An agent's wall of output can be small while the shell you type in
stays comfortable.

## Stashing

A pane can be stashed with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> or the
header's ↓ button: hidden from the grid while its shell keeps running and its
scrollback survives. This hides a job, it does not stop one. A stashed
[browser pane](/docs/browser-panes/) is the same bargain — the page stays
loaded, and restoring it returns the same scroll position.

Stashed panes collapse to a small count pill at the bottom edge; hovering it pops
up a shelf of cards. Click one to restore it into the first free slot, or use its
hover-revealed **×** to close that terminal outright without restoring it first.

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd> pins the shelf open and hands it the
arrow keys — <kbd>←</kbd> <kbd>→</kbd> along a row, <kbd>↑</kbd> <kbd>↓</kbd>
between rows, <kbd>Enter</kbd> to restore, <kbd>Delete</kbd> to close,
<kbd>Esc</kbd> to dismiss. Those keys are swallowed rather than passed on, which
is the point: you can browse what is parked without a single keystroke reaching a
shell. Letters still reach the focused terminal, so press <kbd>Esc</kbd> first if
you mean to type.

Only *bare* presses belong to the shelf. Hold a modifier and the key does what it
always does, so <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+arrow still steps between panes
and <kbd>Ctrl</kbd>+<kbd>Backspace</kbd> still deletes a word in your shell while
the shelf is up. <kbd>Shift</kbd>+<kbd>Tab</kbd> is the one exception — it walks
the cards backwards.

<kbd>Esc</kbd> dismisses a shelf that is *pinned* — by the chord, or by an arrow
press that took it over from hover. A shelf you only hovered goes when you move
the pointer away, and <kbd>Esc</kbd> stays with your terminal, where vim and
every agent TUI need it.

Cards fill a row left to right, most recently stashed first, then wrap. Two rows
show at a time and anything past that scrolls **down**, never sideways.

## Undoing a close

Closing a pane removes it immediately — no confirmation, no waiting — so spamming
close stays fast. But the **shell underneath keeps running**, hidden, and a toast
counts down with a draining bar. Restore re-adopts that shell with its program
still going and its recent output replayed, including whatever it printed while
it was gone. Only when the timer runs out is the shell actually killed.

A shell that ends by itself is never parked; there is nothing to restore. Nor
is a [browser pane](/docs/browser-panes/): closing one is final, because the
undo window exists to hold a shell that is still running and a page has nothing
left running to hold.

The behavior is configurable in **Settings → General**:

- how long the undo window lasts, in seconds (default 5)
- whether closing with the pane's **×** button also offers undo, or only the
  keyboard shortcut does
- whether the feature is on at all

There is also an unassigned **Restore last closed terminal** action in the keymap
if you would rather undo without reaching for the mouse. It ships unbound
deliberately: the toast already covers the common case, and every chord worth
having is taken, so guessing one would cost more than it gave.

## Ultra focus

Some terminal programs want chords TermHQ also uses. Ultra focus
(<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd>) hands *every* keystroke to the
terminal, turning off TermHQ's own shortcuts so a TUI gets them unmodified. See
[Keyboard shortcuts](/docs/keyboard-shortcuts/) for exactly what it does and does
not take.

Because a mode that swallows the keyboard could trap you, the chord that turns it
on always turns it off, and a badge appears in the title bar that can be clicked
to leave.
