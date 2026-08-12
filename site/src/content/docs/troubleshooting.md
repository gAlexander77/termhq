---
title: "Troubleshooting"
weight: 100
description: "Fixes for the problems people actually hit: monochrome agents, missing shells, stale sessions, and where the logs are."
---

## An agent or CLI renders without colour

Almost always an inherited `NO_COLOR` from whatever launched TermHQ. TermHQ
scrubs the variables it knows about on every shell it starts, so if colour is
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
installed but not yet initialised will not appear until it has been run once.

## My terminals did not come back

Shells survive quitting TermHQ, but not everything:

- **A reboot** ends them. Nothing survives that.
- **Ending the PTY host** ends every shell it owns.
- **A shell that exited on its own** — an agent that finished, a build that
  ended — is gone because the program ended, not because TermHQ lost it.

If panes come back empty rather than missing, the shells are alive but their
replay buffer was exhausted; only recent output is kept.

## Output looks mangled after resuming

Usually a width mismatch: a shell drew its prompt at one size and was replayed
at another. TermHQ saves each pane's dimensions with the workspace to avoid
this, but a shell with an unusual prompt can still be confused by it.

Pressing <kbd>Enter</kbd> to redraw the prompt fixes the display. `clear` fixes
it thoroughly.

## Dictation does nothing

Check **Settings → Voice** is enabled, and that the mic level meter in the title
bar moves while you speak. A flat meter means the operating system is not giving
TermHQ audio — check the microphone permission for TermHQ in your system
settings.

The first use downloads or builds the speech model, which takes a moment. This
happens once.

## Windows warns about the installer

SmartScreen warns on the first install of a build that is not code-signed. See
[Installation](/docs/installation/).

## Where the logs are

The PTY host writes to `logs/` inside the configuration directory
([Configuration](/docs/configuration/)). It is the right thing to attach to a
bug report about shells not starting, dying, or failing to reattach.

Note that the host truncates its log when it starts, so capture it *before*
restarting TermHQ if you are chasing something that happened in a previous run.

## Reporting a bug

Open an issue on [GitHub](https://github.com/gAlexander77/termhq/issues) with:

- your operating system and version
- your TermHQ version
- what you expected, and what happened instead
- the host log, if it involves terminals not behaving
