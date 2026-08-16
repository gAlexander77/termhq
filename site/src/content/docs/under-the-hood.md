---
title: "Under the hood"
weight: 95
description: "What TermHQ is built from: a native Rust core, the OS webview instead of a bundled browser, and first-party parts everywhere it counts."
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

None of it phones home. There is no telemetry and no account, and the only
network requests TermHQ makes are the ones you ask for — a theme install, a
speech-model download, your own git remotes.
