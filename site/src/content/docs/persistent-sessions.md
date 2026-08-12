---
title: "Persistent sessions"
weight: 50
description: "Why quitting TermHQ does not kill your shells, and how reattaching works."
---

Closing TermHQ does not end your terminals. They keep running, and reopening the
app picks them back up with their scrollback intact.

## How it works

TermHQ runs as two processes. The app owns the window; a separate **PTY host**
owns every shell. The host is headless, has no window, and does not exit when
the app does — the same idea as `tmux` keeping sessions alive after you close
the terminal that started them.

Because the shells belong to the host rather than the window, they survive:

- quitting TermHQ
- the interface crashing or reloading
- closing one window while others stay open

They do not survive a reboot, or ending the host process yourself.

## Reattaching

When TermHQ opens a workspace, it asks the host which shells are still alive for
it and adopts them. Each pane replays a buffer of recent output, so you come
back to what the shell had been saying rather than an empty screen.

Panes remember their size across a reattach, which matters more than it sounds:
a shell that drew a prompt at one width and gets replayed at another produces
mangled output.

## Quiet replay

While a pane is being re-adopted, TermHQ mutes what the terminal would normally
send back. Replayed output can contain queries a terminal is expected to answer,
and answering them again would type stray characters into whatever is running —
which, if that is a coding agent sitting at a prompt, means typing into your
agent.

## The host's lifetime

The host starts on demand when TermHQ needs a shell, and exits on its own once
no shells are left and nothing has connected for a while. There is normally no
reason to manage it by hand.

If you want everything gone, close your panes rather than killing the process:
ending the host takes every shell in every workspace with it.

## Stashed terminals on resume

A stashed pane is hidden but still running. **Settings → General** decides
whether stashed panes come back stashed when a workspace resumes, or are
restored into the grid. The default keeps them stashed — you put them away for a
reason.
