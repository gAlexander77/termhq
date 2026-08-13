---
title: "Persistent sessions"
weight: 50
description: "Why quitting TermHQ does not kill your shells, exactly what survives what, and the settings that control it."
---

Closing TermHQ does not end your terminals. They keep running, and reopening the
app picks them back up — programs still going, recent output still there.

This is the same promise `tmux` makes, without having to know `tmux`.

## What survives what

| Event | Your shells | Your layout |
|---|---|---|
| Quitting TermHQ | **Keep running** | Restored |
| The window closing while others stay open | **Keep running** | Restored |
| TermHQ crashing | **Keep running** | Restored |
| Sleep or hibernate | **Keep running** | Restored |
| Restart, shutdown, power loss | Ended | Restored, with fresh prompts |
| A program finishing on its own | Ended — it finished | Restored |

The bottom two rows are the honest limit: a reboot takes everything running with
it. What comes back is the shape of your work — the same panes, the same shells,
in the same directories — waiting at a fresh prompt.

Crash resilience is not a setting you have to find. Whatever else is configured,
a crash leaves your shells running, because that is the case you would most
regret losing.

## Coming back

Reopening a workspace reconnects each pane to the shell that was already running
in it and replays what it had been saying, so you return to context rather than
a blank screen. Panes come back at the size they were, which matters more than it
sounds: a shell that drew its prompt at one width and reappeared at another
produces mangled output.

Only recent output is kept, not the full history. A pane that comes back emptier
than you left it is a pane whose program has been very chatty since.

## Several workspaces at once

Workspaces are independent. Closing one leaves the others alone, and one window
can never adopt or end another's terminals.

A workspace you are not currently looking at is **parked, not lost** — its shells
keep running in the background, and its agents keep working. Press
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> and the picker shows you which
workspaces are running in the background, so nothing is invisible. Opening one
picks its terminals back up mid-task. See [Workspaces](/docs/workspaces/).

## Stashed terminals on resume

A stashed pane is hidden but still running.

**By default, a resumed session opens everything into the grid — stash
included**, and the shelf starts empty. Nothing that was running is left hiding
where you would have to remember to go looking for it.

**Settings → Workspaces → Stashed panes stay stashed** reverses that, sending
them back to the shelf on resume instead.

## Turning it off

Two settings, under **Settings → Workspaces**:

- **Keep shells running after close** *(default on)* — turn it off and closing a
  window ends its terminals there and then.
- **Restore session on startup** *(default on)* — turn it off and every launch
  starts with a single fresh terminal, and anything still running from last time
  is ended.

## If you want everything gone

Close the panes. That is the reliable route, and it is instant.

Deleting a workspace from the picker also ends any terminals still parked for it,
which is the quickest way to clear out one project's worth of background work
without touching another's.
