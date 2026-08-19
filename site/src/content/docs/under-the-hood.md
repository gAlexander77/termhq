---
title: "Under the hood"
weight: 95
description: "What TermHQ is built from: a native Rust core, the OS webview instead of a bundled browser — for the interface and for browser panes alike — and first-party parts everywhere it counts."
---

TermHQ is a Rust application. Everything that touches your system — spawning
shells and their PTYs, keeping sessions alive after the window closes, reading
and writing files, running git, transcribing speech — is native Rust code.

The interface is rendered by your operating system's own webview through
[Tauri](https://v2.tauri.app/), not by a bundled browser. That one choice is
why the installer is measured in megabytes rather than hundreds of them, why
there is no runtime to install first, and why memory goes to your shells
instead of to a second copy of Chromium. The interface itself is React, with
the terminals rendered by [xterm.js](https://xtermjs.org/) — the same emulator
VS Code trusts — with GPU rendering and modern Unicode widths on top.

## Two processes

TermHQ runs as two pieces: the window you see, and a small headless Rust
process that owns every shell. The window can close, crash, or update; the
shells keep running, and the next window picks them back up. That is the whole
mechanism behind [persistent sessions](/docs/persistent-sessions/) — the
terminal multiplexer is built in, so there is no `tmux` to learn.

## Browser panes are the real engine

The same choice that keeps the installer small pays again for
[browser panes](/docs/browser-panes/): a browser pane is your operating system's
browser engine embedded in the window as a child surface, positioned at the
pane's rectangle. The page is composited by the engine on the GPU. No frame is
ever streamed through the application, and no keystroke or mouse move is ever
synthesized — which is the difference between a web page and a screenshot of
one that lags.

Because the page is arbitrary remote content, it is given no authority: browser
surfaces hold none of the application's permissions, remote pages are refused
any channel into TermHQ, and navigation is fenced to `http` and `https`.

## Built from scratch

Most GUI terminals are assembled from the same off-the-shelf parts — a
ready-made terminal widget, a layout library, `tmux` underneath for
persistence. TermHQ's core is built from scratch instead: the session engine,
the tiling grid and its gravity, the workspace model, the theming system, the
keymap, the Git panel.

Where a piece of the stack is the acknowledged best tool, TermHQ uses it and
says so: dictation runs on
[whisper.cpp](https://github.com/ggml-org/whisper.cpp), entirely on your
machine; git operations run through the `git` already on your `PATH`, with
your credentials, hooks, and configuration; themes and icon packs install
from [Open VSX](https://open-vsx.org/).

With local Whisper models, dictation is processed on your machine; downloads
— a theme, an icon pack, a speech model — happen when you ask for them, from
sources the interface names.
