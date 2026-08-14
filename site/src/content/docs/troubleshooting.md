---
title: "Troubleshooting"
weight: 100
description: "Fixes for the problems people actually hit: monochrome agents, missing shells, stale sessions, and where the logs are."
---

## An agent or CLI renders without color

Almost always an inherited `NO_COLOR` from whatever launched TermHQ. TermHQ
scrubs the variables it knows about on every shell it starts, so if color is
still missing, check your shell profile — a `NO_COLOR`, `TERM=dumb` or
`CLICOLOR=0` set there is applied after TermHQ hands the shell over, and TermHQ
cannot override your own configuration.

Confirm with:

```bash
echo "TERM=$TERM NO_COLOR=$NO_COLOR COLORTERM=$COLORTERM"
```

## A shell is missing from the list

TermHQ detects shells at startup. Something installed afterwards appears after a
restart.

On Windows, WSL distributions are listed individually; a distribution that is
installed but not yet initialized will not appear until it has been run once.

## My tmux prefix stopped working

<kbd>Ctrl</kbd>+<kbd>B</kbd> toggles TermHQ's sidebar by default, which is also
tmux's prefix key. Rebind one of the two — TermHQ's is in **Settings →
Shortcuts**. Three other defaults take a key the shell wanted; they are listed in
[Keyboard shortcuts](/docs/keyboard-shortcuts/).

## My terminals did not come back

Terminals survive quitting TermHQ, but not everything:

- **A restart or shutdown** ends them. Nothing survives that — you get your
  panes and directories back, at fresh prompts.
- **A program that exited on its own** — an agent that finished, a build that
  ended — is gone because it ended, not because TermHQ lost it.
- **Turning off "Keep shells running after close"** (Settings → Workspaces) makes
  closing a window end its terminals deliberately.

If panes come back but look emptier than you left them, the terminals are fine —
only recent output is kept, and a chatty program pushes the rest out.

## Everything vanished right after a crash

Relaunching within about fifteen seconds of a crash can open a fresh, empty
workspace instead of the one you lost.

**Your work is not gone.** The terminals are still running. Quit and open TermHQ
again, or open a second window, and they are adopted back.

## Output looks mangled after resuming

Usually a width mismatch: a shell drew its prompt at one size and came back at
another. TermHQ restores each pane at the size it was to avoid this, but a shell
with an unusual prompt can still be confused by it.

Pressing <kbd>Enter</kbd> to redraw the prompt fixes the display. `clear` fixes
it thoroughly.

## Dictation does nothing

Check **Settings → Voice** is enabled, and watch the mini-waveform beside the mic
button in the title bar while you speak. It scrolls with real input, so a flat
line means the operating system is not giving TermHQ any audio — check the
microphone permission for TermHQ in your system settings, and check the input
device in **Settings → Voice** if you have more than one.

On macOS the permission matters twice over: without it, microphones do not
enumerate at all, so the device list comes up empty rather than wrong.

The speech model ships inside the Windows and macOS installers, so there is
nothing to download on first use. **Linux packages do not currently include it**,
and dictation is unavailable there.

If it hears you but the words come out wrong, note that dictation currently
recognizes **English only**.

## Windows warns about the installer

SmartScreen warns on the first install of a build that is not code-signed. See
[Installation](/docs/installation/).

## Git panel says it cannot read a WSL repo

Repositories on a `\\wsl.localhost` path are not supported by the Git panel yet,
and it says so rather than showing you something wrong. Git inside the WSL pane
itself works normally.

## Where the log is

`pty-host.log`, directly inside the configuration directory
([Configuration](/docs/configuration/)). Attach it to any bug report about
terminals not starting, dying, or failing to come back.

It is cleared each time TermHQ starts, so grab a copy **before** relaunching if
you are chasing something that happened in a previous run.

## Reporting a bug

Open an issue on [GitHub](https://github.com/gAlexander77/termhq/issues) with:

- your operating system and version
- your TermHQ version
- what you expected, and what happened instead
- `pty-host.log`, if it involves terminals not behaving
