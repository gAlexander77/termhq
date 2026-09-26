---
title: "SSH connections"
weight: 35.5
description: "A shell on another machine as a pane in the grid, through the OpenSSH client you already have: typed targets, saved profiles, your ssh config's aliases, and a way back when a connection drops."
---

An SSH pane tiles, stashes, maximizes and clones like any terminal. It uses the
keys, agent and ssh config you already have, installs nothing on the machine
you connect to, and needs no account anywhere.

SSH is off until you turn it on.

## Turning it on

Open **Settings → SSH** and switch on **SSH connections**. Then:

- **Connect via SSH…** appears at the bottom of the **+** button's shell list
  (its caret opens the list).
- The command palette's **Connect via SSH** opens the picker.
- **Settings → SSH** shows its other two options: which client to use, and the
  keep-alive.

While it is off, there is no SSH entry under the **+** button, and **Settings →
SSH** shows only the switch. The palette still lists Connect via SSH, so you can
find it, but refuses it with *SSH is off in Settings → SSH*.

The switch only decides where new connections start. SSH panes you already
have — open, stashed, or restored from your last session — keep working either
way, Reconnect and Clone included.

## What you need

Only the OpenSSH client, which your system most likely has already. TermHQ
looks in these places, and **Automatic** uses the first client it finds:

| Platform | Where TermHQ looks, in order |
|---|---|
| Windows | Windows OpenSSH (`C:\Windows\System32\OpenSSH`), then Git for Windows' client (`C:\Program Files\Git\usr\bin`), then any `ssh.exe` on your `PATH` |
| macOS | `/usr/bin/ssh`, then Homebrew's in `/opt/homebrew/bin`, then `/usr/local/bin/ssh`, then any `ssh` on your `PATH` |

**Settings → SSH → OpenSSH client** lists every client found, each with its
version. Pick one to use it instead of the automatic choice, or choose **A
path…** and give the full path of any other `ssh`. Below the list, Settings
says which client is in use and which config file it reads.

Whichever client you use, its own agent, keys and configuration are the ones
in play. On Windows TermHQ never mixes the two clients, so if your keys live in
the Windows `ssh-agent` service, use Windows OpenSSH.

If no client is found, Settings and the picker say so. Windows includes the
OpenSSH Client as an optional feature of Windows itself, and Git for Windows
carries its own; every Mac has `/usr/bin/ssh`.

On the machine you connect to, you need nothing but the SSH server you already
reach.

## Connecting

Three ways to open the SSH picker:

- **Connect via SSH…**, the last entry in the **+** button's shell list
- The command palette (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>, or
  <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on macOS) — "Connect via SSH"
- A shortcut of your own. The action ships without one, because every free
  chord was already taken; give it one under
  [**Settings → Shortcuts**](/docs/keyboard-shortcuts/#rebinding).

With SSH on, the palette also lists each saved profile and your most recent
targets as **Connect to …** rows, which connect straight away.

The picker is one box over one list. The list has up to three sections —
**Recent**, **Profiles** and **From your ssh config** — and typing filters all
three at once. Click a row to connect, or use the keyboard:

| Key | What it does |
|---|---|
| <kbd>↑</kbd> <kbd>↓</kbd> | Move through the list |
| <kbd>Enter</kbd> | Connect to the highlighted row — or, with none highlighted, to what you typed |
| <kbd>F2</kbd> | Edit the highlighted profile |
| <kbd>Delete</kbd> | Delete the highlighted profile (it asks first), or forget the highlighted recent target |
| <kbd>Esc</kbd> | Close the picker |

As you type, the line under the box says what <kbd>Enter</kbd> will connect
to, or why it can't. The footer names the client in use, its version and the
config file it read. Once the connection starts, the picker closes and the new
pane joins the grid.

### What you can type

| You type | It means |
|---|---|
| `build.example.com` | A host |
| `alex@build.example.com` | A user and a host |
| `build.example.com:2222` | A host and a port |
| `[2001:db8::10]:2222` | An IPv6 address, in brackets when it has a port |
| `ssh://alex@build.example.com:2222/` | The same things, written as an address |
| `staging` | An alias from your ssh config, or any name the client can resolve |

The user can be a directory account: `alex@corp.example@build.example.com` and
`CORP\alex@build.example.com` both work.

The picker refuses, with the reason under the box: a space (a target is just
the host, not a command), a leading `-`, a path, or a port outside 1–65535.
Nothing you type or paste is ever run as a command.

### Hosts from your ssh config

**From your ssh config** lists the hosts named in `~/.ssh/config`
(`%USERPROFILE%\.ssh\config` on Windows). TermHQ reads the file the way the
client does and never writes to it:

- Only concrete `Host` entries are listed. Wildcard patterns and `Match` blocks
  name no single host, so they are left out.
- `Include` lines are followed, and the hosts in included files are listed too.
- Nothing in the file is run. A `ProxyCommand` or `Match exec` runs only when
  you connect, and the client runs it, as it would from any terminal.

## Saved profiles

A profile keeps a connection's settings under a name. To make one, type a
target and choose **Save…**, which opens the form with what you typed already
filled in. With the box empty, **New profile…** starts one from scratch. To
change a profile, use the pencil on its row, or highlight it and press
<kbd>F2</kbd>.

| Field | What it sets |
|---|---|
| **Name** | What the picker shows, and what the pane is called |
| **Host** | A host name, an address, or an alias from your ssh config |
| **User** | The login user; empty means the client's default |
| **Port** | Empty means the client's default |
| **Key file** | A private key for this host (the client's `-i`) |
| **Jump host** | A host to connect through (`-J`): `bastion`, `alex@bastion:2222`, or several hops separated by commas |
| **Config file** | A config file to use instead of `~/.ssh/config` (`-F`) |
| **Known hosts** | A known-hosts file to use instead of `~/.ssh/known_hosts` |

The last two sit under **More options**. Only the fields you fill in reach the
client; everything else comes from your ssh config and the client's own
defaults.

File fields have a folder button that opens your system's file dialog. Type a
full path, or one starting with `~`. A path that contains `%` or `${…}` is
refused: OpenSSH reads those as placeholders of its own, so it would open a
different file from the one you named.

A problem shows under the field that has it, and a save TermHQ refuses keeps
the form and everything you typed. Change a form and then press <kbd>Esc</kbd>,
choose **Cancel** or click outside it, and it asks *Discard what you typed?*
first.

Deleting a profile asks first. A recent target has an **×** to forget it. The
picker remembers the last twelve targets you typed or picked from your ssh
config; a connection made through a profile is remembered by the profile's own
row instead.

### Where profiles are kept

Profiles live in `ssh-profiles.json`, beside `config.json` in
[TermHQ's configuration folder](/docs/configuration/#where-it-lives). The file
holds settings, never secrets: a key file's path may be saved, but never a
password, a passphrase or the key itself.

If the file can't be read — a hand edit gone wrong, or a file from a newer
TermHQ — the picker says so and leaves the file exactly as it is. Typed targets
still connect.

Editing or deleting a profile changes only the connections you make afterward. A
pane that is already open keeps the settings it connected with, and Reconnect
uses them.

## Passwords, keys and host keys

Every prompt in an SSH pane is the client's own. It writes the prompt into the
pane, and you answer it there: a password, a key's passphrase, a one-time code
or other MFA prompt, the question about a host you have never connected to
(with its fingerprint), and the client's refusal when a host's key has changed.

TermHQ reads none of these prompts and types no answers. It stores no password
or passphrase, and it never adds or removes an entry in your `known_hosts`.
When you accept a new host's key, the client records it, as it always has.

## What a remote pane shows

The header keeps the shape it has on a local pane:

- **The name** is where the pane goes — the target you typed, the alias you
  picked, or the profile's name. Rename it like any pane.
- **The badge** sits where a local pane shows its shell's name. It carries the
  remote mark and the connection's state, and after a rename it names the
  connection too. Hover it to see the exact command the pane ran.
- **The path** is the remote shell's directory, once the shell reports it.
  Hover it to see which host it belongs to.

| The badge says | It means |
|---|---|
| *connecting…* | The client has started, and nothing has arrived yet |
| nothing but the mark | The client is running, and output has arrived |
| *shell ready* | The remote shell has reported its directory |
| *ended* | The connection has ended |
| *not connected* | Restored from your last session, and not connected since |

TermHQ shows only what the client can tell it. OpenSSH sends no signal when a
login succeeds, so none is claimed: *shell ready* waits for evidence from the
far side.

If nothing arrives within two seconds, the pane says so — *Connecting to
build.example.com… 5 s*, counting — with a **Cancel** button that closes it.

On the stash shelf, a stashed SSH pane's row names the host, followed by the
remote folder when the shell reports one.

## When a connection ends

When `ssh` ends — the remote shell exited, the network dropped, a login
failed — the pane stays, with all its output, and a card appears below the
output. It says:

- **How it ended.** A shell that exits normally reads *The shell on … ended.*
  Code 255 is the one OpenSSH uses for every connection and authentication
  failure alike, so the card says just that and points you to the output above
  it, where the client names the real reason.
- **The command that ran**, the first two lines of it, with the rest on hover.

And it offers three buttons:

- **Reconnect** — a new connection with the pane's own saved settings, in the
  same place.
- **Open local terminal here** — your default shell, in this pane's place.
- **Close**.

**<kbd>Enter</kbd> in the pane also reconnects.** It is the key people press
after "Connection closed", so it does the useful thing rather than closing the
pane. If the pane doesn't have the keyboard, click beside the card first.

While an attempt runs, **Reconnect** reads *Connecting…* and the card's buttons
wait. An attempt that cannot even start — the client has moved, a key file is
gone — says why on the card and gives you the buttons back. A rename survives
Reconnect, and a maximized pane stays maximized.

A remote pane never quietly turns into a local shell. That happens only when
you choose **Open local terminal here**.

## Keeping idle connections alive

Routers and firewalls often drop a quiet connection after a few minutes without
telling either end, and a connection that has died is otherwise noticed only at
your next keystroke. So every connection sends a keep-alive through the
encrypted channel, every 30 seconds by default.

**Settings → SSH → Keep idle connections alive** sets the interval, from 0 to
120 seconds in steps of 15. It is the one option TermHQ adds to the command on
its own, as `-o ServerAliveInterval=30`. Because an option on the command line
outranks your ssh config, it replaces any `ServerAliveInterval` you set there.
At 0 — shown as *off* — nothing is added, and your config decides.

## Quitting and coming back

The `ssh` process behind a remote pane runs in TermHQ's background host, like
every shell — see [Persistent sessions](/docs/persistent-sessions/). What you
get back depends on whether that process is still running.

**It is still running.** Closing the window or quitting TermHQ leaves the
connection open. Relaunch, and the pane picks it up with its recent output. The
badge shows *shell ready* again once the remote shell next reports its
directory.

**It is gone.** After a reboot, after an update restarts the background host,
or when the connection ended while TermHQ was closed, the pane comes back in
its place saying *Not connected to …* and "Nothing connects until you ask."
Press **Reconnect** or <kbd>Enter</kbd> when you want it. A workspace full of
SSH panes opens quietly, rather than with a login prompt in every pane.

What no local process can keep alive is the connection itself. Don't count on
a remote session surviving a lost network, sleep, a reboot or an update: when
the connection ends, the shell on the far side ends with it, and so does
whatever was running in it.

## Stashing and closing

- **[Stashing](/docs/panes-and-layout/#stashing)** keeps the connection: the
  pane is hidden, not stopped.
- **[Undo close](/docs/panes-and-layout/#undoing-a-close)** works as it does for
  any terminal. The connection stays open through the undo window and ends when
  the window runs out. If it drops during the window, Undo brings the pane back
  ended, with its card.
- **A pane with no connection behind it** — ended, or restored as not
  connected — closes outright, because there is nothing for Undo to bring back.

## What stays local

A remote pane's directory is on another machine, so it is kept away from
everything that works with local folders:

- **Files**, [Source Control](/docs/source-control/), favorites and
  [Worktrees](/docs/worktrees/) never see the remote path.
- The header has no **Open in IDE** and no **Star**; both act on a local
  folder.
- The agent launcher is not offered. Its list is what *this* machine found on
  its `PATH`, which says nothing about the far host: the header has no launcher
  button, the palette's **Run an agent by number** says why it can't run, and
  its shortcut does nothing.
- Files dropped on the pane are refused — *This machine's paths mean nothing on
  …* — rather than typed in as paths.
- **Clone** opens a second connection to the same host, with the same settings.
  It starts where a new login starts, not in the directory you are in.

## How the command is built

- TermHQ builds the `ssh` command from checked fields — a host, a user, a port,
  the files and the jump host — never from text. Nothing you type or paste can
  become an option or a command.
- Settings apply in this order: what you set on a profile or typed into the
  picker, then your ssh config, then the client's own defaults. The keep-alive
  is the one thing TermHQ adds.
- The exact command is on the badge's tooltip and on the card when a connection
  ends, so you can always read what ran.

## Limits

- **Linux:** TermHQ is not released there yet.
- **Not built yet:** a starting directory, tunnels (port forwarding), remote
  files, and Git and language services on the remote machine.
- **Code 255 can't be read further.** A failed login and a lost network both
  end with it, so the card can't tell them apart — the output above it can.
- **The *shell ready* badge needs the remote shell's help.** It appears only
  when the shell reports its directory, which not every shell does out of the
  box. Without it the badge stays at the mark, and the pane works the same.
- **Windows OpenSSH refuses a config or key file that other accounts can
  read.** The client says so in the pane; limit the file to your own account.
- **An `ssh` you type in a local pane** is an ordinary program running in that
  shell, not an SSH pane: no badge, no card, no Reconnect.
