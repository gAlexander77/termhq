---
title: "Remote workspaces"
weight: 52
description: "A preview: open another computer's workspaces in windows on this one, over your local network, while their shells, git, files and agents keep running on that computer."
---

Remote workspaces let you sit at one computer and work in another's
workspaces. Pair a laptop with your desktop once, and the laptop's workspace
picker lists the desktop's workspaces. Open one and you get an ordinary TermHQ
window on the laptop, with the laptop's keys, fonts and clipboard. The
terminals, agents, builds, Source Control, Files panel and editor files in that
window are all the desktop's.

It is not screen sharing. TermHQ draws the window on the computer you are
sitting at; only the work behind it happens on the other one. Close the laptop
and the desktop's agents keep working, as they would if you had closed a
window on the desktop itself.

Any computer can share its workspaces, open another's, or both at once.

Remote workspaces are a preview. Sharing is off until you turn it on, and it
works on a local network only; see [What it can't do yet](#what-it-cant-do-yet).

## What you need

- **TermHQ 0.3.0 or later on both computers, at versions that work
  together.** 0.3.1 and 0.3.0 don't, so update both. When two versions can't
  work together, the connection is refused with a message naming both
  versions; update the older one.
- **Windows or macOS, in either direction.** A Mac can open a Windows
  desktop's workspaces, and a Windows computer can open a Mac's. Linux is not
  supported yet, on either side.
- **The same network.** The computer you connect from must reach the sharing
  computer's address directly. There is no relay over the internet yet.
- **You, signed in, on the sharing computer.** Its screen can be locked, and
  no TermHQ window needs to be open there, but sharing runs in your user
  session.

## Sharing a computer

On the computer whose workspaces you want to reach, open **Settings → Remote**
and switch on **Let other computers connect (Preview)**. That starts a small
sharing process with no window, which paired computers connect to. You keep
using the computer as usual; its own windows are not affected.

The line under the switch says what sharing is doing, and reads *Sharing as
DESK-PC on port 47120* — with your computer's name — once it is ready.
**This computer's name** sets what other computers call this one in their
workspace picker. Left empty, it is the computer's own name.

The installed app shares on port 47120. To use another, open the folded
**Sharing port** section and type a **Port** from 1024 to 65535. A computer
that connects then types the same number in its own Port field, and computers
paired before the change keep the old port until they pair again.

### On Windows

The first time sharing starts, Windows asks whether TermHQ may use the network.
Allow it on **Private networks**.

Windows blocks incoming connections on a network it calls Public. If the other
computer cannot connect, set this network to Private in **Windows Settings →
Network & internet**, and allow TermHQ when Windows asks.

### On macOS

macOS asks before an app reads Documents, Desktop, Downloads or an external
drive, and it asks on the Mac's own screen, where no one may be looking while
you work from another computer. Give TermHQ Full Disk Access in **System
Settings → Privacy & Security**, or keep shared projects outside those folders.
Settings → Remote says the same on a Mac once sharing is on.

macOS also asks once whether TermHQ may connect to devices on your local
network. Allow it: that access is what lets TermHQ open other computers'
workspaces and lets paired computers use this Mac's.

## Pairing a computer

Pairing happens once for each pair of computers. It goes one way: it lets the
computer where you type the code open the workspaces of the computer that showed
it.

1. On the sharing computer, click **Pair a computer** in Settings → Remote. A
   12-character code appears, such as `7KQ2-M9XH-D4PF`, with the time it has
   left. It works once, for 5 minutes, and 5 wrong tries cancel it. **New
   code** replaces it; **Cancel** withdraws it.
2. On the other computer, open **Settings → Remote** and find **Add a
   computer** under **Connect to other computers**. Type the sharing
   computer's address, as listed under **Reach this computer at** on that
   computer (each address there has a copy button), then the code. Fill in the
   port only when the sharing computer does not use the default. Click
   **Pair**.

The second computer confirms with *Paired with*, followed by the other
computer's name, and that computer's workspaces appear in its workspace picker.

**Pair a computer** needs **Let other computers connect** to be on, since the
sharing process is what checks the code. To work in both directions, pair again
the other way round: turn sharing on at the second computer, and add it from
the first.

The code never crosses the network: each side proves to the other that it knows
it. After pairing, every connection checks both computers' certificates, and
there are no passwords to type. Settings → Remote shows this computer's
fingerprint under its name, and the computers that connect to it list the same
fingerprint beside it, so you can check that you paired the computer you meant.

## Opening a workspace

Open the [workspace picker](/docs/workspaces/#the-picker)
(<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd>, or
<kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>W</kbd> on macOS). Under this computer's
workspaces, each paired computer has a section with its name. Its workspaces
are listed in the same rows as yours, found by the same search and reached by
the same keys, followed by **New workspace on** that computer. A search that
matches nothing offers **New workspace named "…" on** that computer too.
Renaming and deleting stay with this computer's own workspaces.

While a computer's list loads, its section says *Looking for workspaces on* that
computer. One that cannot be reached says **Unreachable**, with the reason and
**Retry**. A computer with nothing paired shows nothing new in the picker.

A badge on each of the other computer's workspaces says where it is:

| Badge | Meaning |
|---|---|
| **running** | Its shells are running on that computer, with no window open |
| **open on** that computer | Open in a window on that computer's own screen |
| **on** another name | Open on a third computer |
| **open here** | Already open in a window on this computer |

A workspace from another computer opens in a window of its own, called a
server workspace. Its title bar shows the other computer's name with a server
icon, and a tag in the status bar says the same; hover it for the computer's
address. On macOS each server workspace runs as a process of its own, with its
own Dock icon, unlike local workspaces, which share one.

Inside a server workspace, everything that reads files or runs a program does
so on the other computer:

- terminals and agents, with that computer's shell list, starting in its home
  folder;
- the Files panel, Source Control and Worktrees;
- editor panes, which open and save that computer's files.

Keys, the clipboard, fonts, the theme and browser panes stay with the computer
you are sitting at. A browser pane in a server workspace says so: `localhost`
there means this computer, not the other one.

A saved workspace with nothing running opens as it would locally: its layout
comes back with fresh shells, started on the other computer.

## One workspace, one window

On one computer, a workspace is open in one window at a time. Remote
workspaces keep that rule across computers. Picking a workspace that is open on
another screen does not take it at once: the picker first says where it is
open. Pick it again within 30 seconds to move it here. The other window closes,
and the workspace's shells keep running without a pause. A workspace already
open in a window on this computer is brought forward, never opened twice.

On the sharing computer, a workspace you have open from elsewhere shows **on
another computer** in its own picker. Opening it there takes it back, and the
window on the other computer closes.

A window with unsaved editor changes is the exception. When its workspace moves
away, it stays on its screen with its usual question about those changes until
someone answers it. Save your editor work before you move a workspace.

## Leaving and coming back

Close the window, put the laptop to sleep, or walk out of Wi-Fi range:
everything keeps running on the other computer. A dropped connection shows
*Reconnecting to* the computer's name in the status bar, and the window
reconnects by itself when the network returns. Whether it reconnects or you
reopen the workspace later, the output the shells printed meanwhile replays,
up to the most recent output each one kept — the same as reopening a
[persistent session](/docs/persistent-sessions/#coming-back) locally.

Closing a server workspace window never ends its shells, whatever **Keep shells
running after close** says on this computer: they belong to the other computer
and keep running there. Closing it does not delete the workspace either, even
an empty one.

If the other computer's sessions restart (an update, a reboot or a crash
there), running programs end, as they would locally. The workspace then reopens
from its saved layout, with fresh shells on the other computer.

## Keeping a computer reachable

A computer shares only while it is awake and you are signed in. Two settings
under **Settings → Remote** help with that:

- **Start at sign-in, without a window** *(default off)* — starts sharing when
  you sign in, before any TermHQ window opens. A locked screen is fine; signed
  out is not. It takes effect at your next sign-in, on Windows and macOS.
- **Keep this computer awake while sharing** *(default on)* — asks the system
  not to sleep while sharing is on. The display may still turn off.

Without **Start at sign-in**, sharing resumes the next time TermHQ opens on
that computer. Turning **Let other computers connect** off ends sharing within
a few seconds. Windows open from other computers lose their connection, and the
shells keep running.

## Removing a computer

On the sharing computer, **Paired computers** lists every computer allowed to
connect, and **Connected now** shows which ones are connected at the moment.
Remove one and whatever it has open is cut off within a few seconds. It has to
pair again to come back.

On the computer you connect from, the list under **Connect to other computers**
has a remove button too. That forgets the other computer on this one only; the
sharing computer lists it under **Paired computers** until it is removed there
as well.

## Whose settings apply

A server workspace uses the settings of the computer you are sitting at:
theme, background, shortcuts, voice and the rest. Settings opened from it
change this computer's settings, and Settings → Remote there says so. How the
other computer shares is set in its own Settings.

Settings that name folders are the exception, because they point at this
computer's disk: the default terminal folder, favorites and worktree roots do
not apply in a server workspace. Its new terminals start in the other
computer's home folder, and Settings shows those rows as this computer's
instead of offering edits there.

Sharing settings are never included in a [settings
export](/docs/configuration/#exporting-and-importing-settings), so importing a
file cannot turn sharing on or copy a computer's name or port to another one.

## Dictation

[Dictation](/docs/dictation/) records and transcribes on the computer you are
sitting at, with its microphone and speech model, then types the words into the
terminal on the other computer. The other computer does not need a speech
model.

## Security

Pairing is trust. A paired computer can do anything you can do on the sharing
computer, as your user: open terminals, run programs, read, change or delete
your files, and run git with your credentials. Pair only computers you trust as
much as the one you share.

- Sharing is off until you turn it on.
- Connections use TLS 1.3, and each computer's certificate is pinned at
  pairing. A computer that was not paired, or whose certificate has changed
  since, is refused.
- The pairing code lasts 5 minutes, works once, and never crosses the network.
  A computer that has not paired learns nothing that names this one.
- Removing a paired computer cuts off its open connections within a few
  seconds.
- Sharing listens on every network the computer is connected to, so the
  network's own trust matters. On Windows, share only on networks marked
  Private.

## When the other computer can't be reached

- On the sharing computer, check that **Let other computers connect** is on
  and that the line under it says *Sharing as*, followed by its name and port.
- On Windows, set the network to Private and allow TermHQ when Windows asks.
- If the sharing computer does not use port 47120, type its port in the Port
  field when you add it.
- Make sure both computers are on the same network and the sharing computer is
  awake.
- A message naming two versions means the computers need the same version of
  TermHQ; update the older one.

## What it can't do yet

- **Same network only.** There is no relay over the internet yet.
- **No Linux,** as the sharing computer or the one you connect from.
- **No language servers** in a server workspace's editors. Editors there notice
  changes made outside them when you save, not as they happen.
- **File and folder links** printed in a server workspace's terminal do not
  open.
- **Not inside a server workspace:** SSH connections, moving a pane to another
  workspace, and opening its files in other apps (Reveal in File Explorer, Open
  in IDE, the default app).
- **Files dragged in from this computer's disk** are refused. Paths dragged
  from the Files panel still work.
- **One screen at a time.** There is no shared or view-only mode for a
  workspace.
- **Windows of other apps.** A program started in a server workspace that opens
  a window of its own opens it on the other computer's screen.
- **Updates** install from one of this computer's own windows, not from a
  server workspace.
- **Settings changed in another window** on this computer reach an open server
  workspace when you reopen it.
