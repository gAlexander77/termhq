---
title: "Troubleshooting"
weight: 100
description: "Fixes for the problems people actually hit: monochrome agents, missing shells, stale sessions, browser panes, resetting pane sizes, and where the logs are."
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

If there is **no mic button at all**, no speech model is installed yet — that
is the intended off state, not a bug. Open **Settings → Voice**, download a
model (or import your own), close Settings, and the button appears.

If the button is there but nothing comes out, use **Settings → Voice → Test
microphone**: it records a few seconds and plays them back through the same
capture path dictation uses. A silent clip means the operating system is not
giving TermHQ any audio — check the microphone permission for TermHQ in your
system settings, and the input device in **Settings → Voice** if you have
more than one. The mini-waveform beside the mic button tells the same story
live: it scrolls with real input, so a flat line means no audio is arriving.

On macOS the permission matters twice over: without it, microphones do not
enumerate at all, so the device list comes up empty rather than wrong.

**Linux packages do not currently include the speech engine**, and dictation
is unavailable there.

If it hears you but the words come out wrong, check the **dictation
language** in Settings → Voice — and note that models labeled *English only*
stay English whatever the language is set to; only multilingual models follow
it.

## A browser pane looks frozen

Almost certainly it is — deliberately, and only for as long as something is
covering it. A [browser pane](/docs/browser-panes/) is a native surface that the
interface cannot paint over, so whenever a modal, menu, drag preview or toast
needs the space, the pane shows a still frame of the page until the overlay
goes away. Audio and video keep running underneath.

Sometimes you get the pane's plain background instead of a still frame: a pane
nobody can see does not pay to capture one, and neither does a second overlay
arriving right behind the last. Both go live again the moment the overlay does.

If nothing is covering it and it is still frozen, reload the page from the
pane's reload button.

## A browser pane's mute button does nothing

Muting is Windows-only for now. The speaker toggles on every platform, but off
Windows it silences nothing — and **Settings → Browser → Sound in new panes**
cannot start a pane muted there either.

## My shortcuts do nothing while a web page is focused

On macOS and Linux, TermHQ's chords are not yet intercepted while a browser
pane has the keyboard. Click another pane or the title bar first. On Windows
they fire over the page already, except the short list the page keeps — see
[Keyboard shortcuts](/docs/keyboard-shortcuts/#when-a-browser-pane-has-focus).

## There is nothing to grab between my panes

Check **Settings → Appearance → Resize panes by dragging**. Off is a supported
state — equal shares and no handles — and it is remembered per machine, so a
config carried from elsewhere can arrive with it already off.

## My pane sizes keep resetting

By design, and only on one trigger: opening or closing a pane — including
stashing one or bringing it back — puts every boundary back to equal. A
hand-tuned layout describes a particular set of panes, so it is not carried
onto a different one. Moving, swapping, growing, arranging and resizing the
window all leave your proportions alone, and a workspace keeps them across
restarts. See [Resizing panes](/docs/panes-and-layout/#resizing-panes).

To level the grid *deliberately*, use the reset button that appears in the title
bar beside the layout switch whenever a pane is off its equal share — or
double-click one boundary to even up just that pair.

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
