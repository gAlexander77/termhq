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
| Installing an update | Ended; running commands and agents stop | Restored, with fresh shells |
| Restart, shutdown, power loss | Ended | Restored, with fresh prompts |
| A program finishing on its own | Ended — it finished | Restored |

A reboot ends running processes. Installing an update also restarts the shells;
finish or stop important tasks before choosing **Update and restart**. When
terminals are running in any workspace, TermHQ asks before it goes ahead. What
comes back is your arrangement and working directories, with fresh shells.
See [Updating](/docs/installation/#updating) for the save prompts and restart flow.

[SSH panes](#ssh-panes-reconnect-when-you-ask) are the exception in the sleep,
update and restart rows. Sleep can drop the connection even though the `ssh`
program itself keeps running, and after an update or a restart an SSH pane
comes back disconnected rather than connecting again on its own.

A terminal you have already closed is different too. While its **Undo close**
countdown runs, its shell is still alive, and closing the window or quitting
TermHQ ends it there and then, rather than leaving it running out of sight.

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

The workspace appears in one piece. It stays out of sight while its panes are
reattached or restarted, then fades in already laid out, sidebar and all — no
empty start page first, and no pane arriving on its own. With
**Settings → Appearance → Animate panes** off, it simply appears.

Proportions come back too. If you have [dragged a
gutter](/docs/panes-and-layout/#resizing-panes) to give one pane more room than
another, the workspace remembers that alongside the panes themselves.

## Editor panes come back with their tabs

An [editor pane](/docs/editor/) restores its tab order and which tab was active.
Files load as you need them — the active one straight away, the rest when you
first click them.

Unsaved edits are the one thing an *orderly* quit does not carry across, and
that is deliberate: quitting with unsaved work stops and asks first, so leaving
it behind is always something you chose. A quit you did **not** choose is
covered separately — see
[If the app dies instead](/docs/editor/#if-the-app-dies-instead).

## Browser panes come back by address

A [browser pane](/docs/browser-panes/) is part of the window rather than of the
shell host, so quitting closes its page and reopening navigates back to it. What
survives is the address and its place in the grid — plus your logins and cookies,
which live in the browser engine's own profile. "Signed into the dashboard" is
still true after a restart; a half-filled form is not.

## SSH panes reconnect when you ask

An [SSH connection](/docs/ssh/) is a pane running your machine's own `ssh`
program, and that program lives in the background host like any shell. Close
the window and it keeps running; reopen and the pane is picked back up with its
connection still open, as long as the network held.

What the host cannot do is carry the connection itself through a dropped
network, a laptop going to sleep, a reboot or an update. When a connection
ends, the pane stays with its output and a card: **Reconnect**, **Open local
terminal here** or **Close**. A pane whose `ssh` program is gone by the time
you reopen comes back *disconnected*, in its place, with the same card.

Nothing reconnects until you ask, so a workspace with five SSH panes does not
open with five password prompts. **Reconnect**, or <kbd>Enter</kbd> in the
pane, opens a new connection. TermHQ does not keep programs on the far side
running across a lost connection.

## Several workspaces at once

Workspaces are independent. Closing one leaves the others alone, and one window
does not adopt another's terminals. Installing an update is the exception to
window independence: it asks other windows to close and restarts the shells
across the app. A window with unsaved edits gets its own save prompt.

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
  starts fresh: a single new terminal, or an empty workspace if you have turned
  **Open a terminal in new workspaces** off. Anything still running from last
  time is ended.

## If you want everything gone

Close the panes. That is the reliable route. With **Undo close** on — the
default — a closed terminal's shell keeps running until its countdown ends,
5 seconds unless you changed it in **Settings → General**. **Close now** in the
undo list ends it at once, and so does closing the window.

Deleting a workspace from the picker also ends any terminals still parked for it,
which is the quickest way to clear out one project's worth of background work
without touching another's.
