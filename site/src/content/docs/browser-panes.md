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

Four ways, all equivalent:

- The **globe** in the title bar, just right of the favorites star
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>
- The command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>) — "New
  browser pane"
- The **+** button's shell list, which ends with a Browser entry

**Settings → Browser → Globe button** removes the globe if you would rather have
the space. It takes away only the button — the chord, the palette and the spawn
menu are untouched.

Where it lands is **Settings → Browser → New panes open**. Point it at
`localhost:3000` and the chord drops you on your dev server; leave it empty and
you get a blank pane with the URL bar waiting.

## The URL bar

It reads what you type the way a browser's does:

| You type | What happens |
|---|---|
| `https://termhq.dev` | Opens it |
| `localhost:3000`, `127.0.0.1:8080` | Opens it over `http://` |
| `termhq.dev` | Anything with a dot opens over `https://` |
| `file:///C:/notes.md` | **Searches for it** — see below |
| `rust lifetimes` | Searches your configured engine |

The search engine is **Settings → Browser → Search engine** — DuckDuckGo (the
default), Google, Bing or Brave. Web addresses and localhost ports are never
searched; they open directly.

A browser pane may only navigate to `http`, `https` and `about`. Type a scheme
it is not allowed to open — `file:`, `vscode:` — and it becomes a **search**
rather than an error, because the alternative is a URL bar that silently
swallows what you typed and looks broken.

<kbd>Enter</kbd> navigates. Clicking into the bar selects the current address so
typing replaces it. <kbd>Esc</kbd> discards a half-typed address, restores the
page's current URL, and hands the keyboard back to the page. A blank pane opens
with the bar already focused, and while you are typing in it no TermHQ chord
fires, so an address containing a shortcut is still just an address.

Back, forward and reload sit to the left of the bar, and a devtools button to
the right opens the full inspector for that page in its own window. The pane's
title follows the page's; renaming it by double-clicking the header pins your
name instead, the same as a terminal.

Take the pointer off the pane and the header hands its room back: mute, stash
and fullscreen fade out while the page title glides into the space they were
holding, un-truncating as far as the address bar can spare. Move back on and it
reverses. The one thing that does not leave is a **muted** page's speaker — it
pins itself beside Close and stays visible, because silence with nothing on
screen to explain it reads as a fault rather than a setting.

On a narrow pane, the page title drops away and a **⋯** menu appears. On an even
tighter pane, navigation, reload, devtools, and hover-only actions fold into that
menu as well, so the URL bar and Close button remain reachable at every width.
A thin sweep along the bottom of the header shows when a page is loading. The
first real page also gets a simple pulsing loading surface until it is ready,
instead of an unexplained empty pane.

## Sound

Pages play audio like any browser. **Settings → Browser → Sound in new panes**
turns that off for new panes, and each pane's header has a speaker that mutes or
unmutes that one page live. The speaker stays visible while a pane is muted, so
silence is never a mystery.

Two things to know. **Muting is Windows-only for now** — the button toggles
everywhere, but off Windows it silences nothing, and the setting cannot start a
pane muted there either. And a pane's mute is a choice for that session: the
workspace does not remember it.

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
Cloning a browser pane opens a sibling at the same URL. Neither takes the home
page: only the panes you open yourself do.

One move a terminal has that a browser pane does not: **closing it is final.**
The undo window exists because a closed terminal's shell is parked and still
running in the background, and a page has nothing parked to come back to.

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

A short list stays deliberately with the page. Some because the page's version
is the one you want — <kbd>Ctrl</kbd>+<kbd>F</kbd> for its own find bar,
<kbd>Ctrl</kbd>+<kbd>=</kbd> / <kbd>-</kbd> / <kbd>0</kbd> for the engine's
zoom, and copy. The other two because they would only type into a terminal that
is not there: the agent picker and voice dictation.

Ultra focus (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd>) hands the page every
key except its own toggle.

## The page has no keys to the app

A browser pane loads whatever you point it at, so it is given no authority at
all. Browser surfaces are in none of the application's capabilities, and
navigation is limited to `http`, `https` and `about` — never a local file, a
custom protocol, or TermHQ's own interface.

The fence doing most of the work is the third: remote origins are refused any
channel into TermHQ wholesale, a layer below the point where a page could ask.
Development builds report what a page can see after every load, as a drift
detector — the bridge object is visible to the page; what it cannot do is use
it.

## What v1 does not do yet

Stated plainly rather than discovered later:

- **Verified on Windows.** macOS and Linux build; macOS has had a pass for the
  inspector and the rest await their own. Five behaviors are Windows-only so
  far: app chords firing while the page holds the keyboard (elsewhere a TermHQ
  surface needs focus first), the back and forward buttons dimming when there is
  nowhere to go, the frozen frame described below, the speaker actually
  silencing anything, and the pane's rounded bottom corners and the shape the
  stash pill cuts out of the pane above it.
- **Anything that must cover the grid covers the page.** A native page cannot
  be painted over by the interface, so when a modal, menu, drag preview, or
  similar overlay needs the space, the pane shows a **frozen frame** of the page
  for as long as the overlay is up, then goes live again. Video keeps playing
  underneath; it simply looks paused while covered. On Windows, small idle and
  undo cards are cut around instead, so the page stays live and clickable beside
  them. The frame is a courtesy rather than a guarantee — a pane nobody can see
  does not pay to capture one, and neither does a second overlay arriving right
  behind the last, where the previous correctly sized frame or the pane's
  background is shown.
- **Downloads** use the engine's own default handling.
- **One browser profile**, shared by every workspace. Per-workspace profiles
  are a real feature with real questions, and are deferred rather than faked.
