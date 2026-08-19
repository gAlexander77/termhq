---
title: "Browser panes"
weight: 35
description: "A real web page as a pane in the grid: the OS browser engine embedded in TermHQ, with the same drag, stash, resize and fullscreen moves as a terminal."
---

A pane in TermHQ does not have to be a terminal. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>
opens a **browser pane** — a web page tiled in the grid beside your shells,
with the same header, the same drag, stash, resize and fullscreen moves, and
the same place in your saved workspace.

The page is rendered by your operating system's own browser engine, embedded
directly in the window. Nothing is streamed and no input is faked: scrolling,
typing, text selection, hover, video and IME are the engine's, exactly as in
the browser you already use.

## Opening one

Three ways, all equivalent:

- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>
- The command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>) — "New
  browser pane"
- The **+** button's shell list, which ends with a Browser entry

Where it lands is **Settings → Browser → New panes open**. Point it at
`localhost:3000` and the chord drops you on your dev server; leave it empty and
you get a blank pane with the URL bar waiting.

## The URL bar

It reads what you type the way a browser's does:

| You type | What happens |
|---|---|
| `https://termhq.dev` | Opens it |
| `localhost:3000` | Opens `http://localhost:3000` |
| `termhq.dev` | Opens `https://termhq.dev` |
| `rust lifetimes` | Searches your configured engine |

The search engine is **Settings → Browser → Search engine** — DuckDuckGo (the
default), Google, Bing or Brave. Web addresses and localhost ports are never
searched; they open directly.

Back, forward and reload sit to the left of the bar, and a devtools button to
the right opens the full inspector for that page in its own window. The pane's
title follows the page's; renaming it by double-clicking the header pins your
name instead, the same as a terminal.

## Sound

Pages play audio like any browser. **Settings → Browser → Sound in new panes**
turns that off for new panes, and each pane's header has a speaker that mutes
or unmutes that one page live. The speaker stays visible while a pane is muted,
so silence is never a mystery.

## It is a pane like any other

Everything the grid does, a browser pane does:

- **Drag its header** to move, swap or grow it, exactly as with a terminal
- **Drag the gutter** beside it to give the page the width it wants — the
  reason [resizing](/docs/panes-and-layout/#resizing-panes) exists at all, since
  a web page has a natural width and a terminal does not
- **Stash it** — the page stays loaded and keeps playing; restoring brings back
  the same scroll position
- **Fullscreen it**, arrange it from the keyboard, move focus to it

A link that opens a new tab — `target="_blank"`, or a `window.open` from the
page — opens **another browser pane** rather than an operating-system window.
Cloning a browser pane opens a sibling at the same URL.

## Workspaces remember pages

A saved workspace stores each browser pane's address and its place in the grid,
so reopening it puts the pages back where they were. Logins and cookies live in
the engine's own profile, so "signed into the dashboard" survives a restart.

Browser panes are part of the window, not of the shell host, so a full quit
closes their pages and reopening navigates back to them. Shells are the thing
that keeps running across a quit — see
[Persistent sessions](/docs/persistent-sessions/).

## Keys over a page

On Windows, TermHQ's own chords keep working while a page has the keyboard:
pane focus, arrange mode, stash, close, fullscreen and the pickers are all
intercepted before the page sees them, exactly as if a terminal were focused.
After a chord runs, the keyboard lands where the result needs it — back in the
page, or in the app for arrange mode's arrows and a picker's digits.

A short list stays deliberately with the page, because the page's version is
the one you want: <kbd>Ctrl</kbd>+<kbd>F</kbd> (its own find bar),
<kbd>Ctrl</kbd>+<kbd>=</kbd> / <kbd>-</kbd> / <kbd>0</kbd> (the engine's zoom),
and copy. Ultra focus (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd>) hands the
page every key except its own toggle.

## The page has no keys to the app

A browser pane loads whatever you point it at, so it is given no authority at
all. Browser webviews hold none of the application's permissions, remote pages
are refused any channel to TermHQ outright, and a pane can only navigate to
`http` and `https` — never to local files, custom protocols, or TermHQ's own
interface. Development builds re-check every fence on every page load.

## What v1 does not do yet

Stated plainly rather than discovered later:

- **Verified on Windows.** macOS and Linux build, and each is getting its own
  pass. Three behaviors are Windows-only so far: app chords firing while the
  page holds the keyboard (elsewhere a TermHQ surface needs focus first), the
  back and forward buttons dimming when there is nowhere to go, and the frozen
  frame described below.
- **Anything that must cover the grid covers the page.** A native page cannot
  be painted over by the interface, so when a modal, menu, drag preview or
  toast needs the space, the pane shows a **frozen frame** of the page for as
  long as the overlay is up, then goes live again. Video keeps playing
  underneath; it simply looks paused while covered.
- **Downloads** use the engine's own default handling.
- **One browser profile**, shared by every workspace. Per-workspace profiles
  are a real feature with real questions, and are deferred rather than faked.
