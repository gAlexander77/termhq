---
title: "Under the hood"
weight: 95
description: "What TermHQ is built from: a native Rust core, the OS webview instead of a bundled browser — for the interface and for browser panes alike — and first-party parts everywhere it counts."
---

TermHQ is a Rust application. The parts that touch your system — spawning
shells and their PTYs, keeping sessions alive after the window closes, reading
and writing files — are native Rust code. Where a proven tool already does a
job, TermHQ drives that tool instead of rewriting it: git runs through the `git`
program installed on your machine, dictation through the whisper.cpp engine
bundled with TermHQ, and SSH through the OpenSSH client already on your machine.

The interface is rendered by your operating system's own webview through
[Tauri](https://v2.tauri.app/), not by a bundled browser. That one choice is
why the installer is measured in megabytes rather than hundreds of them, why
there is no runtime to install first, and why memory goes to your shells
instead of to a second copy of Chromium. The interface itself is React, with the
terminals rendered by [xterm.js](https://xtermjs.org/) — the same emulator VS
Code trusts — with GPU rendering and modern Unicode widths on top.

## Two processes

TermHQ runs as two pieces: the window you see, and a small headless Rust
process that owns every shell. The window can close or reload; the
shells keep running, and the next window picks them back up. That is the whole
mechanism behind [persistent sessions](/docs/persistent-sessions/) — the
terminal multiplexer is built in, so there is no `tmux` to learn.

The same background process owns [SSH connections](/docs/ssh/). An SSH pane is
the OpenSSH client running under it like any shell, so closing the window does
not drop the connection; it stays open for as long as the network holds.

Installing an application update restarts the shells and stops running commands
and agents. Your workspace arrangement returns after the update. See
[Updating](/docs/installation/#updating).

## The editor is Monaco

[Editor panes](/docs/editor/) are built on Monaco, a mature code-editing
engine, so multi-cursor editing, find and replace, and line moves work the way
a full editor's do rather than as an approximation. It loads only the first
time you open an editor pane or a diff — in Source Control or its History — so
a session that does neither never pays for it.

Language intelligence is a separate layer, and a strictly opt-in one:
[language servers](/docs/language-servers/) are programs you install, launched
on demand and shut down when the files that needed them close. TermHQ bundles
none, at any version, ever.

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
any channel into TermHQ, and navigation is fenced to `http`, `https` and
`about:` pages.

## One folder the interface can load from

The interface does not read your disk on its own; files reach it through
TermHQ's Rust side. Backgrounds are the one exception: to show a picture or play
a video behind your terminals, the webview loads it straight from disk — but
only from the `backgrounds/` folder in your configuration directory, the one
folder that route can reach. Nothing else on disk can be loaded that way.

## Built from scratch

Most GUI terminals are assembled from the same off-the-shelf parts — a
ready-made terminal widget, a layout library, `tmux` underneath
for persistence. TermHQ's core is built from scratch instead: the session
engine, the tiling grid and its gravity, the workspace model, the theming
system, the keymap, and Source Control.

Where a piece of the stack is the acknowledged best tool, TermHQ uses it and
says so: terminals are drawn by xterm.js and files edited in
[Monaco](https://microsoft.github.io/monaco-editor/), the two engines VS Code
itself uses; dictation runs on
[whisper.cpp](https://github.com/ggml-org/whisper.cpp), entirely on your
machine; git operations run through the `git` already on your `PATH`, with your
credentials, hooks, and configuration; SSH connections run through the OpenSSH
client already on your machine, with your keys, agent and `ssh_config`, nothing
installed on either side and no secret stored by TermHQ; language intelligence
comes from [LSP](https://microsoft.github.io/language-server-protocol/) servers
you install yourself; themes and icon packs install from
[Open VSX](https://open-vsx.org/).

## What reaches the network

With local Whisper models, dictation is processed on your machine; downloads
— a theme, an icon pack, a speech model — happen when you ask for them, from
sources the interface names. Three things reach the network without a
separate request, and each has a switch:

- **The update check** runs shortly after launch and every six hours.
  **Settings → General → Updates** turns it off.
- **A startup report.** Each time the app starts, it sends one request to
  `api.termhq.dev` saying it started, on which operating system (`windows`,
  `macos` or `linux`), and which version of TermHQ it is, such as `0.2.9`.
  That is the whole report. There is no account, device or
  installation ID, and no hardware details, performance numbers, terminal
  content or workspace data. It is sent once per start, never retried, and
  only over a verified HTTPS connection. **Settings → General → Privacy → Send
  startup reports** turns it off. Turning it off sends nothing, cancels a report still
  on its way, and holds for every later start. It does not delete reports
  already received.
- **Committer pictures in Source Control's History**, on by default: a GitHub
  noreply address asks GitHub for that account's picture, any other address
  goes to Gravatar only as a SHA-256 hash, and each picture is cached after
  its first fetch. **Settings → Git → Committer pictures in History** turns
  them off, and then nothing is sent.
