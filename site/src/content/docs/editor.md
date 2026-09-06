---
title: "The editor"
weight: 36
description: "Editor panes: files as tabs, saving that cannot lose work, reading markdown, and the keys a VS Code hand already knows."
---

A pane can hold a file. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd> opens an
empty editor pane, and it behaves like every other pane — drag it, stash it,
fullscreen it, resize it, zoom its text, and find it where you left it when the
workspace comes back.

TermHQ is still a terminal, not an IDE. The editor exists for the edit you make
*while* something else is running: the config line an agent asked about, the
README you are reading, the fix that is faster to type than to explain.

## Opening a file

The Files panel is the daily door. **Double-click** a file and it opens in the
editor pane you last used — or opens a new one if you have none. **Right-click**
gives you the choice: *Open in editor*, *Open in new editor pane*, or the
external routes (your IDE, a terminal editor, the system default). The same menu
can reveal the file in Explorer or Finder with the file selected; on Linux it
opens the containing folder.

Opening a file that is already open just switches to its tab. Opening it in a
*different* pane gives you a second live view of the same file — type in one and
the other keeps up, because both are looking at the same file rather than at two
copies of it. Duplicating an editor pane does the same thing for every tab at
once: a second view of the same files, not a copy of them.

If the appropriate editor is stashed, opening a file brings it back into the
grid. An editor that already holds that file is preferred, so opening it again
does not leave duplicate editors on the shelf.

## Files are tabs

Each editor pane has its own tab strip. Scroll it with the wheel, drag tabs to
reorder them, middle-click to close one. Every tab carries the same file-type
icon the Files panel uses, so the tree and the strip always show the same
picture.

The active tab renames the pane and sets its working directory, which means the
Files and Source Control follow what you are editing exactly as they follow a shell.

| Action | Shortcut |
|---|---|
| Next / previous tab | <kbd>Ctrl</kbd>+<kbd>Tab</kbd> / <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Tab</kbd> |
| Next / previous tab, again | <kbd>Ctrl</kbd>+<kbd>PageDown</kbd> / <kbd>Ctrl</kbd>+<kbd>PageUp</kbd> |
| Jump to a tab | <kbd>Ctrl</kbd>+<kbd>1</kbd> … <kbd>Ctrl</kbd>+<kbd>8</kbd> |
| Jump to the last tab | <kbd>Ctrl</kbd>+<kbd>9</kbd> |
| Reopen the tab you just closed | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> |
| Close the tab | <kbd>Ctrl</kbd>+<kbd>W</kbd> |
| Save | <kbd>Ctrl</kbd>+<kbd>S</kbd> |
| Save every unsaved file in the window | <kbd>Ctrl</kbd>+<kbd>K</kbd> then <kbd>S</kbd> |

Tab cycling wraps, so with two tabs open one chord flips between them.
<kbd>Ctrl</kbd>+<kbd>9</kbd> is the *last* tab however many there are, the way it
works in a browser. <kbd>Ctrl</kbd>+<kbd>W</kbd> on the last remaining tab closes
the pane.

On macOS, <kbd>⌘</kbd> replaces <kbd>Ctrl</kbd> in all of these — with one
exception: <kbd>Ctrl</kbd>+<kbd>Tab</kbd> stays <kbd>Ctrl</kbd> on every
platform, because that is the cycle-through-tabs key everywhere.

Those chords are bound inside the pane, which is why they cost your shell
nothing: <kbd>Ctrl</kbd>+<kbd>S</kbd> still freezes a terminal's output and
<kbd>Ctrl</kbd>+<kbd>W</kbd> still deletes a word, everywhere except an editor.

## Going back

<kbd>Alt</kbd>+<kbd>←</kbd> and <kbd>Alt</kbd>+<kbd>→</kbd> walk back and forward
through the places you have been, so a go-to-definition that landed somewhere
unhelpful is one key from being undone. On macOS these are
<kbd>Ctrl</kbd>+<kbd>-</kbd> and <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>-</kbd>,
because <kbd>Alt</kbd>+arrow is word movement there.

The history belongs to the pane, not the window. With three editors open, going
back in one never scrolls another you were not looking at.

## Editing

The editing surface is Monaco — the engine behind VS Code — so multi-cursor,
column selection, find and replace, bracket matching and the rest of the usual
moves are already there. It uses your terminal font, and
<kbd>Ctrl</kbd>+<kbd>=</kbd> / <kbd>-</kbd> / <kbd>0</kbd> zoom one pane's text
exactly as they do a terminal's — on top of a base size that follows your
terminal font until you turn **Settings → Editor → Font size follows the
terminal** off and set the editor's own. That panel also carries soft word wrap
and the minimap, both off by default, and a reference list of Monaco's own
keys.

The editor wears the active theme, including its surface, cursor, selections,
widgets, diffs, and syntax. Built-in and hand-made themes draw syntax from the
terminal palette, so an editor and terminal beside each other belong to the same
workspace. Themes imported from Open VSX keep their own editor colors and syntax
rules. See [Theming](/docs/theming/).

<kbd>Ctrl</kbd>+<kbd>F</kbd> opens Monaco's find widget while an editor is
focused, rather than the terminal's scrollback search. That is one of a small set
of chords the editor keeps for itself — see
[Keyboard shortcuts](/docs/keyboard-shortcuts/#when-an-editor-pane-has-focus).

For diagnostics, hover, completion, go-to-definition and formatting, see
[Language servers](/docs/language-servers/). Those come from tools you install;
TermHQ ships none.

## Saving cannot lose your work

Every save writes to a temporary file first and then swaps it into place, so a
save that fails partway — a full disk, a permission, a read-only file — leaves
the original exactly as it was. You get a card naming which of those happened, a
**Retry**, and your edits still sitting in the buffer.

Saves are also guarded against overwriting someone else: if the file changed on
disk since you opened it, TermHQ notices before writing rather than after.

### When the file changes underneath you

Agents write files. So do formatters, `git checkout`, and the pane next door.

- **With no unsaved edits**, the tab quietly reloads within a second or two,
  keeping your cursor and your undo history.
- **With unsaved edits**, a card appears offering three honest options:
  **Compare** (a side-by-side diff of disk against what you typed), **Reload from
  disk** (throw your edits away), or **Keep my changes** (your next save wins,
  and you knew it would).

A file deleted while you have it open is flagged rather than closed. Saving
writes it back.

## Closing without losing work

Three guards, at three scales:

1. **Closing a tab** with unsaved edits asks Save / Don't save / Cancel.
2. **Closing a pane** asks once for each unsaved file about to lose its last
   view. A file still open in another pane needs no question — it is not going
   anywhere.
3. **Closing the window** with unsaved work anywhere stops and offers *Save all
   and quit*, *Quit without saving*, or *Cancel*.

## If the app dies instead

Those guards cover the endings you choose. Unsaved text is also mirrored to disk
about a second and a half after you stop typing, so the endings you do not
choose — a crash, an end-task, a power cut — do not take your work either.

When the file reopens, the tab comes back still unsaved, dirty dot and all. There
is no "restore your work?" prompt, because the answer to that question is always
yes; one undo reaches the version on disk if the restore was unwanted. If the
file *also* changed while the app was gone, you get the ordinary conflict card
instead.

Records clear the moment they stop being true — on save, on reload, on undoing
back to the saved text, on closing the tab. **Settings → Editor → Recover unsaved
changes after a crash** turns the whole thing off and deletes anything it had
mirrored. Text over 4 MB is not mirrored.

An *orderly* quit deliberately does not preserve unsaved buffers. The quit guard
above exists so that is always a decision you made rather than a surprise.

## Reading markdown

A `.md` tab has three views, and each chord toggles:

| View | Chord | What you get |
|---|---|---|
| Source | — | The file as text |
| Split | <kbd>Ctrl</kbd>+<kbd>K</kbd> then <kbd>V</kbd> | Source on the left, rendered on the right |
| Full | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> | The rendered page, filling the tab |

On macOS those are <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> and
<kbd>⌘</kbd>+<kbd>K</kbd> then <kbd>V</kbd>. The header button walks all three if
you would rather not learn the chords, and the split divider drags wherever you
want it — double-click to even it up.

Saving and closing work the same in every view, so
<kbd>Ctrl</kbd>+<kbd>S</kbd> and <kbd>Ctrl</kbd>+<kbd>W</kbd> still do their jobs
while you are reading. **Find is the one that moves you**: the rendered page has
no search of its own, so <kbd>Ctrl</kbd>+<kbd>F</kbd> flips the tab back to
source and opens the find widget there rather than appearing to do nothing.

**The two halves scroll together**, anchored on the source line each rendered
block came from rather than on a percentage of the two heights, so a long table,
a code fence or an image cannot drift them apart.

The view belongs to the **tab**, so a README can sit rendered beside code that
stays source. And it renders the **buffer**, not the file: your unsaved edits
show up, and an agent rewriting the file redraws it.

Headings, tables, quotes and code blocks are themed from the same colors as the
rest of the app, so an imported theme carries the preview with it. **Code fences
are syntax highlighted**, by the same colorizer the editor uses on the file
itself — so a fence is painted in the theme you are already wearing, and
switching themes recolors it. A fence tagged with a language name the editor
does not know simply renders plain. Relative links
open as another tab in the same pane; web links open a
[browser pane](/docs/browser-panes/).

Two current limits: **relative images do not load**, and `[[wikilinks]]` render
as plain text.

> **A document is never trusted.** Real READMEs contain HTML, so the preview
> keeps what merely presents — centered blocks, badge images, collapsible
> sections, and the checkboxes of a `- [x]` task list — and drops anything that
> could run, embed, restyle or navigate somewhere of its own accord. Link
> destinations are limited to safe ones.

## Images, binaries, and very large files

Images (PNG, JPEG, GIF, WebP, SVG and friends) open in an image view inside the
same tab strip. Binary files, anything that is not UTF-8 text, and files over
20 MB get a plain notice rather than a mangled buffer. SVG opens as a picture —
to edit one as text, use the Files panel's *open with* routes.

## The Files panel while you edit

With an editor focused on a file inside a git repository, the Files panel roots
itself at the **repository** rather than at the file's own folder, expands the
tree down to that file, and keeps its row highlighted — the shape VS Code's
explorer uses. A file outside any repository falls back to the folder view, and
terminals are never affected either way.

Wandering the tree yourself is respected: nothing yanks the view back until the
file you are editing actually changes. **Settings → Editor → Files panel shows
the repo while editing** turns it off.

The tree draws a hairline down each level of indentation so a deeply nested file
still reads as belonging to its folder. Most stay invisible until your pointer is
in the panel; **the deepest open folder on each branch stays lit**, so "how far
down am I on this side" is answerable at a glance.

## What it does not do yet

- No creating, renaming or deleting files from the editor — the Files panel's
  right-click menu is where that lives.
- Cursor position survives tab switches and stashing, but not an app restart.
- UTF-8 only.
- A read-only file refuses to save and says why, rather than offering to change
  the file's permissions for you.
