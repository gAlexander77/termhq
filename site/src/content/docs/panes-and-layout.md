---
title: "Panes and layout"
weight: 30
description: "Tiling, the slot grid, resizing by the gutter, keyboard arranging, maximizing, pane motion, stashing, and undoing a close."
---

Everything TermHQ opens is a pane in a tiled grid. Nothing hides behind a tab.

There are three kinds, and the grid treats them identically — every move below
works on any of them:

| Pane | Opens with | Holds |
|---|---|---|
| Terminal | <kbd>Ctrl</kbd>+<kbd>J</kbd> | A shell |
| [Browser](/docs/browser-panes/) | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> | A web page |
| [Editor](/docs/editor/) | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> | Files, as tabs |

An [SSH connection](/docs/ssh/) opens as a terminal pane too, once you turn SSH
on in **Settings → SSH → SSH connections**; it is off by default.

## The slot grid

Every pane occupies a rectangle of grid cells. Move, swap, and grow panes to
arrange your workspace; opening and closing panes can repack the grid to fit.

That is the arrangement. How wide each cell is, is a separate and much simpler
question — see [Resizing panes](#resizing-panes) below.

There is no limit on how many terminals you can open. The grid keeps growing to
hold them, and two presets in the title bar decide the shape:

- **Grid** — kept square-ish. Four panes make a 2×2, five to nine go three wide,
  ten to sixteen go four wide, and so on.
- **Columns** — every pane is a full-height strip, however many there are.

Each workspace keeps its own choice, and switching keeps the panes in the order
you read them. **Switch between Grid and Columns** does it from the keyboard
once you give it a shortcut in **Settings → Shortcuts**.

When the columns no longer fit the window, the grid scrolls sideways rather
than squeezing them. A window too narrow for both the sidebar and the grid
closes the sidebar first, and opens it again once there is room, without
changing your sidebar setting.

Past the point where everything still fits comfortably, the answer is usually to
park what you are not watching on the shelf, or fill the screen with one pane —
both below, and neither stops anything running.

Panes also fall upward: a pane rises until it rests on the top edge or on another
pane. That is what makes floating islands and phantom rows impossible, so
resizing the window always divides the space over real rows.

A single terminal fills the whole grid area rather than sitting in one
half-width cell. Spawning or cloning splits it back into the grid.

In Grid, an empty cell offers **New terminal** and **Open file…**, and whatever
you open from one lands in that cell.

## Pane style

The grid has two looks, chosen in **Settings → Appearance → Pane style**.
**Spaced**, the default, keeps a small gutter between terminals and rounds
their corners. **Boxy** removes both — terminals meet edge to edge with
square corners, the tiling-window-manager look. Borders stay on in either
style, so two terminals never blur into one, and switching is instant: no
pane reflows or resizes, only the chrome around it changes.

Either way, the boundary between two panes is a resize handle; boxy simply puts
it on the seam where they meet instead of in a gutter.

**Settings → Appearance → Dim unfocused panes** washes every pane but the
focused one toward the theme's background, so the one you are typing into
stands out. It is off by default, and clicks still reach the dimmed panes.

## Pane motion

Panes move rather than jump. When they swap, move or resize, they glide into
place. A new pane settles into its cell with a quick fade while the others
glide aside, and a closed pane fades from its place as the grid closes up
under it. Stashing flies a pane down into the shelf's count, which bumps as it
lands, and restoring one rises back out into its cell. Maximize grows a pane
from its cell until it fills the grid, and Restore shrinks it back. The sidebar
slides in and out while the panes glide beside it, and a workspace appears in
one fade, already laid out.

**Settings → Appearance → Animate panes** turns all of it off. It is on by
default; off, panes jump straight to where they go. Reduced motion in your
system settings turns it off too.

## The pane header

Every header starts with a mark that says what the pane is: a prompt for a
terminal, a globe for a browser, a page for an editor. It lights on the focused
pane and pulses in the attention color when a run goes quiet. The focused pane
keeps its header buttons in view; the others show theirs when you hover.

A terminal's header shows its whole working directory. When the path does not
fit, the start gives way first and the folder's own name stays. Hover the path
to read all of it, and click its text to copy it.

- **Double-click the header**, name included, to
  [maximize](#maximize) the pane.
- **Right-click a terminal's header** for **Rename…**, **Copy path**,
  **Reveal in File Explorer** (**Reveal in Finder** on macOS), the pane's own
  actions, and **Close**. On a browser or editor pane, a right-click on the
  header renames it.
- **<kbd>F2</kbd> renames** while the keyboard is on the header's buttons. In
  the terminal itself, <kbd>F2</kbd> stays with the program.
  **Rename the focused pane** does it from anywhere, once you give it a
  shortcut in **Settings → Shortcuts**.

## Rearranging with the mouse

Drag a pane's **header**. A translucent copy of the header follows the pointer,
so it stays clear which pane you picked up, and names what letting go would
do: **Swap**, **Move here** or **Grow**. A dashed destination preview shows
where it will land. Press <kbd>Esc</kbd> at any point to cancel.

It is one gesture family, borrowed from Windows snap:

| Drop target | Result |
|---|---|
| Onto another pane | The two **swap** places |
| Into a free cell | The pane **moves** there |
| Onto the near half of an aligned free cell beyond an edge | The pane **grows** to that cell if the space between is free |
| Onto a grown pane's own cell | It **un-snaps** back to that single cell |

Closing a pane re-packs the rest in reading order, so middle holes close and the
grid shrinks back through square sizes — unless you have hand-grown a pane, which
switches to a gentler reflow that does not disturb your arrangement.

Closing or stashing the pane you are in hands focus to the pane you used before
it, not to whichever one opened last.

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
- **A pane can never be dragged out of existence.** Columns stop at 280px at
  100% interface scale — the floor grows with the scale, to 420px at 150% —
  and rows stop at 240px, so the boundary refuses rather than tearing.
- **Gutters take the keyboard too.** <kbd>Tab</kbd> reaches one, the arrow keys
  move it 24px at a time (96px with <kbd>Shift</kbd>), and <kbd>Enter</kbd>
  evens up the pair it separates.
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
wider than the others?" just by being there. **Reset pane sizes** does the same
from the command palette, or from a shortcut you give it.

### Opening or closing a pane resets the sizes

A hand-tuned layout is tuned around the panes that were in it. So opening a new
pane — or closing, stashing, or restoring one — puts every boundary back to
equal.

Nothing else disturbs them. Swapping, moving, growing, arranging and resizing
the window all leave your proportions exactly as you set them, and a workspace
remembers them across restarts.

A maximized pane and a lone pane have no boundaries to drag, because there is
nothing on the other side of one.

If you would rather the grid simply divided itself evenly, **Settings →
Appearance → Resize panes by dragging** turns the whole thing off: equal shares,
no handles. Your proportions are kept while it is off, so switching back on
returns the layout you had.

## Arranging from the keyboard

Everything the drag can do, without the mouse. Press
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>G</kbd> to enter arrange mode, then use the
arrow keys. What a press does depends on what is in that direction:

- **Arrow** pushes the pane that way: it grows into free space, keeps growing
  on further presses, or swaps with a neighboring pane. When it cannot advance,
  it pulls its back edge inward.
- **Shift + arrow** moves the pane one cell while keeping its size, where it fits.
- **Ctrl + arrow** shrinks it from that direction. On macOS it is
  **⌘ + arrow**, because Ctrl + arrow belongs to Mission Control there.

A size-preserving move toward several smaller panes can swap the entire block
when it fits.

You can also bind **Push pane left / right / up / down** under **Settings →
Shortcuts → Arrange without the mode**. These perform the same push without
entering arrange mode and have no default shortcuts.

While the mode is on, the pane you are arranging is outlined, and a hint bar
names the mode and previews what each arrow would do from where the pane
stands: grow, swap, move or shrink. <kbd>Esc</kbd> or <kbd>Enter</kbd>
finishes, and any other key — or any mouse click — simply leaves the mode and
does its usual job, so the arrows are never held hostage once you have moved on.

Panes will not grow past the edges of the grid in any direction, downward
included. The chord itself is refused when there would be nothing to watch: a
single pane, or a pane already maximized over the others.

## Maximize

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd>, a double-click on a pane header, or
the header's **Maximize** button fills the grid with one pane; the same action
restores the grid. Hidden panes stay alive throughout, and moving focus while
maximized carries the maximize to the next pane rather than dropping back to
the grid.

With [pane motion](#pane-motion) on, the pane grows from its cell until it
fills the grid, and Restore shrinks it back into place, with the other panes
fading in around it once it lands.

With only one pane in the grid there is nothing to maximize: the chord is
refused, and a double-click on the header does nothing.

## Font size

Separate from the above, and per-pane. <kbd>Ctrl</kbd>+<kbd>=</kbd> and
<kbd>Ctrl</kbd>+<kbd>-</kbd> change the focused pane's font size,
<kbd>Ctrl</kbd>+<kbd>0</kbd> resets it, and <kbd>Ctrl</kbd>+wheel — or a trackpad
pinch, which arrives as the same event — changes whichever pane is under the
pointer, editor panes included. An agent's wall of output can be small while
the shell you type in stays comfortable.

A terminal shows the size it landed on for a moment, with the way back:
*15 px · Ctrl+0 resets*.

## The status bar

The thin bar along the bottom of the window is always visible. The pane grid
ends above it, so items appearing or disappearing do not cover your work or
change the space available to panes.

**Workspace** is at the far right, with **Stash** immediately beside it when
panes are parked. **Worktrees** appears at the left when you have configured
[worktree roots](/docs/worktrees/). **Undo close** and the waiting-pane list
appear as needed, before Stash and Workspace.

Right after Worktrees — or at the far left without it — the focused pane's
branch appears whenever that pane is inside a Git repository, with how many
files have changed and how far the branch is ahead of or behind its upstream.
Click it to open [Source Control](/docs/source-control/).

When something fails that can be tried again, the bar says so beside the
branch, with the reason on hover and a **Retry** button: **Settings weren't
saved**, or a shell that did not start, such as *Git Bash didn't start*. Other
short notices, such as why a dropped file was refused, appear in the same
place and can be dismissed.

The waiting item is a count — **N waiting** — that stays as long as anything
is waiting. For a few seconds after a new pane goes quiet, a chip joined to
its left names that pane under a draining bar; click the chip to jump straight
there, the way **Undo close** restores. Open the count to see the list, then
select a pane to return to it; with two or more waiting, **Dismiss all**
clears them at once. It is
hidden when empty unless you enable **Settings → Agents → Always show it,
even when nothing is waiting**, in which case it reads **0 waiting**. See
[When a pane needs your attention](/docs/agents/#when-a-pane-needs-your-attention)
for notification controls and what makes a pane qualify.

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>N</kbd>
(<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>N</kbd> on macOS) jumps to the newest
waiting pane, bringing it back from the shelf or out from behind a maximized
pane if it has to. **Focus the previous pane** takes you back to where you
were; it has no default shortcut, so give it one in **Settings → Shortcuts**
or run it from the command palette.

In a narrow window the branch and workspace items drop their names and the
Undo chip drops the pane's; marks and counts stay.

## Stashing

A pane can be stashed with <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> or the
header's ↓ button: hidden from the grid while its shell keeps running and its
scrollback survives. This hides a job, it does not stop one. A stashed
[browser pane](/docs/browser-panes/) is the same bargain — the page stays
loaded, and restoring it returns the same scroll position — and a stashed
[editor](/docs/editor/) keeps its tabs and any unsaved edits in them.

Stashed panes collect behind a count in the status bar, immediately to the left
of Workspace. With [pane motion](#pane-motion) on, a stashed pane flies down
into the count, which bumps as it lands, and a restored one rises back out of
it into its cell.

Click the stash count — or reach it with
<kbd>Tab</kbd> and press <kbd>Enter</kbd> — to open a shelf of cards upward. Click
a card to restore it into the first free slot, or use its hover-revealed **×**
to close that pane outright without restoring it first. Right-click the count
(or press <kbd>Shift</kbd>+<kbd>F10</kbd> with it focused) for **Restore all**
and **Close all**: restore asks first only when the panes in the grid plus the
ones on the shelf would exceed nine, and close always asks, saying what closing
means under your Undo close setting. Both are in the command palette too, as
**Restore all stashed panes** and **Close all stashed panes**, with no default
shortcut.

Each card identifies what you parked at a glance: a shell prompt for a terminal,
a globe for a browser, or a page for an editor. If a busy stashed terminal goes
quiet while you are elsewhere, that icon lights and pulses in the attention
color instead of becoming a separate badge.

When the last stashed pane is restored or closed, the stash count disappears.
The status bar itself stays in place.

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>O</kbd> pins the shelf open and hands it the
arrow keys — <kbd>←</kbd> <kbd>→</kbd> along a row, <kbd>↑</kbd> <kbd>↓</kbd>
between rows, <kbd>Home</kbd> and <kbd>End</kbd> to either end, <kbd>Tab</kbd>
through the cards in order, <kbd>Enter</kbd> to restore, <kbd>Delete</kbd> or
<kbd>Backspace</kbd> to close, <kbd>Esc</kbd> to dismiss. Those keys are
swallowed rather than passed on, which
is the point: you can browse what is parked without a single keystroke reaching a
shell. Letters still reach the focused terminal, so press <kbd>Esc</kbd> first if
you mean to type.

Only *bare* presses belong to the shelf. Hold a modifier and the key does what it
always does, so <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+arrow still steps between panes
and <kbd>Ctrl</kbd>+<kbd>Backspace</kbd> still deletes a word in your shell while
the shelf is up. <kbd>Shift</kbd>+<kbd>Tab</kbd> is the one exception — it walks
the cards backwards.

<kbd>Esc</kbd> dismisses the shelf and returns keyboard focus to the terminal.

Cards fill a row left to right, most recently stashed first, then wrap. Two rows
show at a time and anything past that scrolls **down**, never sideways.

## Undoing a close

Closing a terminal removes its pane immediately, but the **shell underneath keeps
running** during the undo window. **Undo close** in the status bar restores the
most recently closed terminal in one click, and names the pane it will bring
back; the closed-pane count opens the full list. These controls appear before
Stash and Workspace, keeping that pair together at the far right.

A draining bar shows how long each shell will remain available, and each row of
the list counts its seconds down. A row's **Restore** brings that terminal back
and its **×** closes it now; with two or more closed, **Restore all** and
**Close all now** act on the whole list. **Show recently closed panes** opens
the list with the keyboard on its first row, from the command palette or a
shortcut you give it.

Restoring one re-adopts that shell with its program still going and its recent
output replayed, including whatever it printed while it was gone. If no pane
has been opened, closed or stashed since, the grid goes back exactly as it was
at the close, with the restored pane in its old place; otherwise it takes a
free cell like a new pane. With [pane motion](#pane-motion) on, a closed pane
fades from its place and a restored one settles into its cell.

Only when its timer runs out is the shell actually killed; opening the list
does not extend that deadline. Closing the window or quitting TermHQ ends any
shell still counting down, rather than leaving it running where nothing can
reach it.

A shell that ends by itself is never parked; there is nothing to restore. Nor is
a [browser pane](/docs/browser-panes/): closing one is final, because the undo
window exists to hold a shell that is still running and a page has nothing left
running to hold.

An [editor pane](/docs/editor/) has its own protection instead of an undo
window — closing one with unsaved work asks about each file first.

The behavior is configurable in **Settings → General**:

- how long the undo window lasts, in seconds (default 5)
- whether closing with the pane's **×** button also offers undo, or only the
  keyboard shortcut does
- whether the feature is on at all

<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> — **Restore last closed terminal**
— undoes without reaching for the mouse, the same restore as **Undo close** in
the status bar.

## Ultra focus

Some terminal programs want chords TermHQ also uses. Ultra focus
(<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd>) hands *every* keystroke to the
terminal, turning off TermHQ's own shortcuts so a TUI gets them unmodified. See
[Keyboard shortcuts](/docs/keyboard-shortcuts/) for exactly what it does and does
not take.

Because a mode that swallows the keyboard could trap you, the chord that turns it
on always turns it off, and a badge appears in the title bar that can be clicked
to leave.
