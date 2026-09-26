---
title: "Browser panes"
weight: 35
description: "A real web page as a pane in the grid: the OS browser engine embedded in TermHQ, with the same drag, stash, resize and maximize moves as a terminal."
---

A pane in TermHQ does not have to be a terminal. <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>
opens a **browser pane** — a web page tiled in the grid beside your shells,
with the same header, the same drag, stash, resize and maximize moves, and
the same place in your saved workspace.

The page is rendered by your operating system's own browser engine, embedded
directly in the window. Nothing is streamed and no input is faked: scrolling,
typing, text selection, hover, video and IME are the engine's, exactly as in
the browser you already use.

## Opening one

Three ways, all equivalent:

- The **globe** in the title bar, just right of the favorites star
- <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd>
- The command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>) — "New
  browser pane"

**Settings → Browser → Browser button on the titlebar** removes the globe if you
would rather have the space. Turning it off moves it into the menu behind the
**+** button's caret, as a **Browser** row after your shells; the chord and the
palette keep working either way. (With SSH turned on, that menu ends with
**Connect via SSH…** — see [SSH connections](/docs/ssh/).)

Where it lands is **Settings → Browser → New panes open**. Point it at
`localhost:3000` and the chord drops you on your dev server; leave it empty and
you get a blank pane with the URL bar waiting.

A link in a terminal can open straight into a pane:
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+click it (<kbd>⌘</kbd>+<kbd>Shift</kbd>+click on
macOS) and it opens in a new browser pane at that address. A plain
<kbd>Ctrl</kbd>+click (<kbd>⌘</kbd>+click) sends it to your system browser
instead.

Every browser pane is a native webview with its own renderer process, so
opening a **tenth** one onto the grid asks first — *Open anyway*, or *Don't
warn again*. Stashed panes are not counted. **Settings → Browser → Warn before
the tenth browser pane** is the switch.

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
with the bar already focused. While you are typing in it, the chords that act on
panes stand down, so closing or stashing cannot fire from the address bar; only
the launchers — the command palette, Settings, the workspace picker and the
like — dictation, and the shortcuts that move focus to a neighboring pane still
answer. Those last ones work from the pane's find bar too, so the keyboard can
always leave a browser pane.

Back, forward and reload sit to the left of the bar. The back and forward
buttons dim when there is nowhere to go, like a real browser's, and while a page
loads, Reload turns into **Stop**. Beside the address, a lock means the page
arrived over HTTPS and a warning sign means plain HTTP — except for this
machine's own addresses (`localhost`, `127.x.x.x`, `[::1]`), where a dev server
without encryption is normal and a warning would be noise.

The **⋯** button near Close is always there, at every width. It holds
**Rename**, **Web devtools** — the full inspector for that page, in its own
window — and **Copy address**.

The pane's title follows the page's. Rename it — right-click the header, press
<kbd>F2</kbd> on it, choose **Rename** from the **⋯** menu, or run "Rename the
focused pane" from the command palette — and your name sticks instead, the same
as a terminal. Clear the name to go back to the page's title. Double-clicking
the header maximizes the pane.

The focused pane keeps its speaker, **Stash** and **Maximize** in view. Other
panes fold them away until the pointer is over them, and the page title glides
into the space they were holding, un-truncating as far as the address bar can
spare. The one thing that never folds is a **muted** page's speaker — it pins
itself beside Close and stays visible, because silence with nothing on screen to
explain it reads as a fault rather than a setting.

On a narrow pane, the page title drops away. On an even tighter pane, back,
forward, reload, the speaker, **Stash** and **Maximize** fold into the **⋯** menu
as well, so the URL bar, **⋯** and Close remain reachable at every width.
A thin sweep along the bottom of the header shows when a page is loading. The
first real page also gets a simple pulsing loading surface until it is ready,
instead of an unexplained empty pane.

### When a page won't load

A page that cannot be reached does not leave the pane blank. A **Page
unavailable** card keeps the address you asked for, says why, and offers
**Retry**, **Copy address**, and **Open externally**, which hands the address to
your system browser. A load that never finishes gets the same card after 30
seconds — and if the page does arrive later, it still shows.

A server's own error page, such as a 404, is still a page: it stays visible like
any other. And if the browser surface itself cannot be created, the pane says
why and offers **Retry**.

## Sound

Pages play audio like any browser. **Settings → Browser → Sound in new panes**
turns that off for new panes, and each pane's header has a speaker that mutes or
unmutes that one page live. The speaker stays visible while a pane is muted, so
silence is never a mystery.

Muting works on Windows and macOS. On macOS it goes through WebKit, and on a
version of macOS whose WebKit cannot control page audio, pressing the speaker
shows an error saying so rather than pretending. A pane's mute is a choice for
that session: the workspace does not remember it.

## It is a pane like any other

Everything the grid does, a browser pane does:

- **Drag its header** to move, swap or grow it, exactly as with a terminal
- **Drag the gutter** beside it to give the page the width it wants — the
  reason [resizing](/docs/panes-and-layout/#resizing-panes) exists at all, since
  a web page has a natural width and a terminal does not
- **Stash it** — the page stays loaded and keeps playing; restoring brings back
  the same scroll position
- **Maximize it** — its header button, or a double-click on the header — and
  restore the grid the same way; arrange it from the keyboard, move focus to it

Its header wears a globe where a terminal's wears a prompt, so the kind of pane
reads at a glance, and it renames the way a terminal's does: <kbd>F2</kbd> or a
right-click on the header.

Panes glide into place when you swap, move or resize them, with a browser pane
on screen too: the page rides along as a still picture, keeping its size while
the pane reshapes around it, and comes back live where it lands. While you
resize the window, a border between panes or the sidebar, the page holds still
in the same way until you stop, so it never runs ahead of its pane. A new
browser pane settles into its cell, a closed one fades from
its place, and stashing and restoring fly it into and out of the shelf.
**Settings → Appearance → Animate panes** turns all of that off, and so does
reduced motion in your system settings — see
[Pane motion](/docs/panes-and-layout/#pane-motion).

Closing or stashing the browser pane you are using hands focus to the pane you
used before it, so the keyboard always has somewhere to go. And a file dropped on
a browser pane is turned away with a note rather than opened: a browser pane
opens web addresses, not files.

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

On Windows and macOS, TermHQ's own chords keep working while a page has the
keyboard: pane focus, arrange mode, stash, close, maximize and the pickers are
all intercepted before the page sees them, exactly as if a terminal were
focused. After a chord runs, the keyboard lands where the result needs it — back
in the page, or in the app for arrange mode's arrows and a picker's digits.
The dictation chord is caught too, and over a page it types what you say into
the page's focused text field — see [Dictation](/docs/dictation/).

A short list stays deliberately with the page. Copy, because the page's version
is the one you want. The agent picker, because it would only type into a
terminal that is not there. And on Windows,
<kbd>Ctrl</kbd>+<kbd>F</kbd> opens the engine's own find bar and
<kbd>Ctrl</kbd>+<kbd>=</kbd> / <kbd>-</kbd> / <kbd>0</kbd> are the engine's page
zoom.

On macOS, <kbd>⌘</kbd>+<kbd>F</kbd> opens TermHQ's own find bar on the pane, which
drives the page's search: <kbd>Enter</kbd> and <kbd>Shift</kbd>+<kbd>Enter</kbd>
step through matches, it says when there are none, and <kbd>Esc</kbd> hands the
keyboard back to the page. <kbd>⌘</kbd>+<kbd>=</kbd> / <kbd>-</kbd> / <kbd>0</kbd>
zoom the page, and the usual browser keys work while the page has the keyboard —
<kbd>⌘</kbd>+<kbd>L</kbd> for the address bar, <kbd>⌘</kbd>+<kbd>[</kbd> and
<kbd>⌘</kbd>+<kbd>]</kbd> for back and forward, <kbd>⌘</kbd>+<kbd>R</kbd> to
reload — unless you have bound one of those chords to something else.

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

- **Windows and macOS have both had a full pass**, including the frozen frame
  described below and the pane's rounded bottom corners. Linux support is
  pending.
- **Anything that must cover the grid covers the page.** A native page cannot
  be painted over by the interface, so when a modal, menu, drag preview, or
  similar overlay needs the space, the pane shows a **frozen frame** of the page
  for as long as the overlay is up, then goes live again. Video keeps playing
  underneath; it simply looks paused while covered. This includes opening the
  waiting-pane list, closed-pane list or stash shelf. Their status-bar buttons
  sit below the grid and do not freeze the page on their own. The frame is a
  courtesy rather than a guarantee — a pane nobody can see does not pay to
  capture one, and neither does a second overlay arriving right
  behind the last, where the previous correctly sized frame or the pane's
  background is shown.
- **Downloads** use the engine's own default handling.
- **One browser profile**, shared by every workspace. Per-workspace profiles
  are a real feature with real questions, and are deferred rather than faked.
