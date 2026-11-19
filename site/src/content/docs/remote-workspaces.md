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

- **TermHQ 0.3.1 or later on both computers.** 0.3.1 and 0.3.2 connect to
  each other; 0.3.0 connects to neither, so update a computer that still runs
  it. When two versions can't work together, the connection is refused with a
  message naming both versions; update the older one. A few things new in
  0.3.2 need the other computer to answer them: downloading a file, keeping
  its own folders and shell, and deleting a workspace or closing its window
  from here. Until that computer runs 0.3.2 they stay off, and say to update
  it.
- **Windows or macOS, in either direction.** A Mac can open a Windows
  desktop's workspaces, and a Windows computer can open a Mac's. Linux is not
  supported yet, on either side.
- **The same network.** The computer you connect from must reach the sharing
  computer's address directly. There is no relay over the internet yet.
- **You, signed in, on the sharing computer.** Its screen can be locked, and
  no TermHQ window needs to be open there, but sharing runs in your user
  session.

## Sharing a computer

On the computer whose workspaces you want to reach, open **Settings → Remote**.
It has two tabs, **Share this computer** and **Connect to others**; on the
first, switch on **Let other computers connect (Preview)**. That starts a small
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
   sheet opens with everything the other computer needs, large enough to read
   across a desk: this computer's address, its port when it isn't the
   default, and a 12-character code such as `7KQ2-M9XH-D4PF`. The code works
   once, for 5 minutes: a line under it drains as the time runs out, and five
   dots fill with wrong tries, the fifth of which cancels it. **New code**
   replaces it; **Cancel code**, or closing the sheet, stops it working.
2. On the other computer, open **Settings → Remote → Connect to others** and
   find **Add a computer**. Type the sharing computer's name or address, as
   the sheet shows it (or as listed under **Reach this computer at** on that
   computer, where each address has a copy button), then the code. Fill in
   the port only when the sheet shows one. Click **Pair**.

When the code is used, the sheet turns into a receipt: *Paired with*, followed
by the other computer's name, and **Done**. The second computer confirms with
*Paired with* too, and the sharing computer's workspaces appear in its
workspace picker. A code that runs out or is canceled says so on the sheet,
with **New code** to try again.

A pairing that fails says what happened and the one thing to do about it,
marks the field at fault and keeps what you typed: nothing sharing at that
address, no answer, no computer by that name, or a code that expired, was wrong
(with the tries left) or was canceled after too many wrong tries.

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
workspaces, each paired computer has a header with its name, its system and
address, and a green dot with its number of workspaces. Its workspaces are
listed in the same rows as yours, found by the same search and reached by the
same keys, followed by **New workspace on** that computer. A search that
matches nothing offers **New workspace named "…" on** that computer too.

While a computer's list loads, its header says *Looking…*. One whose list
can't be had says what kind of trouble it is, why in a few words (hover it for
the whole sentence and the address), and the one fix:

| Header | What happened | Fix |
|---|---|---|
| **Not sharing** | It answered, but TermHQ there is closed or not sharing | Turn on **Let other computers connect** there, then **Retry** |
| **Didn't answer** | It may be asleep or on another network | **Retry** |
| **Not found** | This network doesn't know its name | **Retry** |
| **Turned away** | It answered and refused this computer, and says why | **Retry** |
| **Not paired anymore** | It removed this computer | **Pair again…**, which opens Settings → Remote with its address filled in |
| **Identity changed** | Its certificate changed since pairing, as after a reinstall | **Remove and pair again** |
| **Needs an update** | The two run versions that can't work together | **Update this computer** when this one is older; otherwise, update TermHQ there |

A computer with nothing paired shows nothing new in the picker.

A badge on each of the other computer's workspaces says where it is:

| Badge | Meaning |
|---|---|
| **running** | Its shells are running on that computer, with no window open |
| **open on** that computer | Open in a window on that computer's own screen |
| **on** another name | Open on a third computer |
| **open here** | Already open in a window on this computer |

A workspace from another computer opens in a window of its own, called a
server workspace. Its title bar takes a faint tint of your theme's accent, and
the other computer's name sits in it as a chip: a steady green dot while
connected, a ring while it connects or the computer is away. Click the chip for
a card about that computer: its system, address and port, its TermHQ version,
since when this window is connected and when the two paired, what runs on
each computer, and **Copy address**, **Copy fingerprint** and **Open Settings →
Remote**. A tag in the status bar names the computer too; hover it for its
address. On macOS each server workspace runs as a process of its own, with its
own Dock icon, unlike local workspaces, which share one.

Inside a server workspace, everything that reads files or runs a program does
so on the other computer:

- terminals and agents, with that computer's shell list, starting in its home
  folder;
- the Files panel, Source Control and Worktrees;
- editor panes, which open and save that computer's files.

Keys, the clipboard, fonts, the theme and browser panes stay with the computer
you are sitting at. A browser pane in a server workspace that shows a
`localhost` address carries a quiet *this PC* or *this Mac* tag, since
`localhost` there means this computer, not the other one.

A program that copies by itself copies on the computer it runs on, which in a
server workspace is the other one. Claude Code's own copy still reaches this
computer, because it also sends the copy to the terminal (as OSC 52), and
TermHQ puts that on this computer's clipboard. A program that copies only on
its own computer, as Codex does, leaves the copy there: make TermHQ's own
selection instead (see [Copy and paste](/docs/getting-started/#copy-and-paste))
and copy that. TermHQ never lets a program read the clipboard.

A saved workspace with nothing running opens as it would locally: its layout
comes back with fresh shells, started on the other computer.

## One workspace, one window

On one computer, a workspace is open in one window at a time. Remote
workspaces keep that rule across computers. Picking a workspace that is open on
another screen does not take it at once: its row asks *Move it here?*, saying
where it is open and that its shells keep running. **Move here**, which has the
keyboard, closes the other window and opens the workspace here, and its shells
keep running without a pause; **Cancel** leaves it where it is. A workspace
already open in a window on this computer is brought forward, never opened
twice.

On the sharing computer, a workspace you have open from elsewhere shows **on
another computer** in its own picker. Opening it there takes it back, and the
window on the other computer closes.

A window with unsaved editor changes is the exception. When its workspace moves
away, it stays on its screen with its usual question about those changes until
someone answers it. Save your editor work before you move a workspace.

## Managing the other computer's workspaces

A paired computer's workspaces are managed from their rows in the picker, with
the same keys and buttons as this computer's own (see
[the picker](/docs/workspaces/#the-picker)):

- **Rename** one in place with its pencil. A workspace open in a window, on
  any computer, can't be renamed from here; its pencil says where it is open.
- **Delete** one with its **×**. It waits under the same **Undo** chip as a
  local delete, named with its computer. One that is open in a window asks
  first, closes that window wherever it is, then deletes the workspace. If that
  window stays open to ask about unsaved editor work, the workspace is kept and
  the status bar says why.
- **Close its window** with the picker's close key, wherever that window is.
  Its shells keep running on that computer, and its badge turns from open to
  **running**.

An action the other computer's TermHQ is too old for stays in place, faded, and
its tip says to update TermHQ there.

## Downloading a file

In a server workspace, right-click a file in the Files panel and choose
**Download…** to save a copy on this computer. This computer's save dialog
opens in its Downloads folder, so you choose where the copy goes.

While it downloads, a note under the Files panel's path bar shows the file, how
far along it is (*7.7 of 18.4 MB · from* the computer's name), **Cancel** and a
filling line, and the file's row shows a ring where its size goes. Once it is
saved, the note shows the full path and **Show in File Explorer** (**Show in
Finder** on a Mac), and the note and the row say *Saved* for a few seconds
before they clear.

Downloads queue, one running at a time. A transfers item in the status bar
shows the current file and its percentage from any tab, even with the sidebar
hidden. Click it for the list: each download has **Cancel** while it waits or
runs, **Show** once it is saved, or the reason it failed, and the foot has
**Cancel all** and **Clear finished**. While the other computer is away,
waiting downloads hold, and start once it is back.

A download arrives whole or not at all. The copy is written beside its
destination under a temporary name and renamed only at the end, so a cancel, a
failure, a dropped connection or closing the window leaves nothing behind, and
a file you chose to replace stays as it was. A file that changes while it downloads, such as a log
or a build output still being written, stops the download rather than saving a
mix of two versions; try again once it is done changing. On the other computer
the download only reads the file, and never blocks a program using it.

**Download…** is for files; folders can't be downloaded yet. When the other
computer runs an older TermHQ, the menu item is off and says which version it
runs.

## Leaving and coming back

Close the window, put the laptop to sleep, or walk out of Wi-Fi range:
everything keeps running on the other computer.

While the other computer can't be reached, a server workspace's window turns
gray and dims, still readable, and a small panel at its foot says *Lost
connection to* the computer, that your shells keep running there, since when,
and why in a few words, such as *TermHQ there isn't sharing right now* or *no
answer: it may be asleep or on another network*; hover it for the network's
own words. The window takes no typing meanwhile, so nothing you type is lost to
a terminal that can't receive it. Shortcuts wait too: only the command
palette, Settings and the workspace picker open, and from the palette only
workspaces, themes and Settings pages run. The window itself stays responsive,
and closing it doesn't wait for the other computer. TermHQ reconnects by
itself, so there is nothing to press. A drop is noticed at once when TermHQ on the other computer
quits, and within 45 seconds when the computer or the network just vanishes.

When the connection is back, the gray and the panel leave at once, the keyboard
goes back where it was, and *Back on* the computer's name shows in the status
bar for a moment. Whether it reconnects or you reopen the workspace later, the
output the shells printed meanwhile replays, up to the most recent output each
one kept — the same as reopening a
[persistent session](/docs/persistent-sessions/#coming-back) locally.

A window opened while the other computer doesn't answer still opens, says it
*Can't reach* that computer, and opens the workspace once it can. If the other
computer turned this one away, because it removed this computer or the two run
versions that can't work together, the panel says so, with its reason. TermHQ
keeps trying, so pairing again or updating one side brings the window back by
itself.

Closing a server workspace window never ends its shells, whatever **Keep shells
running after close** says on this computer: they belong to the other computer
and keep running there. Closing it does not delete the workspace either, even
an empty one. And opening one never ends its shells: a server workspace picks
up its shells where they are, whatever **Restore session on startup** says on
this computer.

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

## Disconnecting and removing a computer

On the sharing computer, **Paired computers** lists every computer allowed to
connect. One with a window open on this computer's workspaces shows a green
dot, and its second line says since when, from which address and which
workspaces it has open; the others say when they last connected.
**Disconnect** closes the windows it has open here and keeps the pairing:
their shells keep running, and it can open them again later. If one of those
windows stays open because it is asking about unsaved editor work, the list
says so. **Remove** also forgets the computer: whatever it has open is cut off
within a few seconds, and it has to pair again to come back.

On the computer you connect from, each computer under **Connect to others** has
a menu. **Rename on this computer…** gives it a name of your own, used in
Settings, the picker and the title bar, while its row still says what it calls
itself. **Copy address** and **Copy fingerprint** copy those. **Remove…**
forgets the other computer on this one only; the sharing computer lists it
under **Paired computers** until it is removed there as well.

## Whose settings apply

A server workspace uses the settings of the computer you are sitting at:
theme, background, shortcuts, voice and the rest. Settings opened from it
change this computer's settings, and Settings → Remote there says so. How the
other computer shares is set in its own Settings.

The settings that name the other computer's folders and programs are the
exception: the default shell, the default terminal folder, favorites, and the
worktree roots with the checkouts they leave out. In a server workspace those
are the other computer's own, saved on it, and Settings says so under each.
Set them once and every computer that opens its workspaces gets the same ones:
a folder starred from the laptop is a favorite there for the next computer
too, and a change shows up at once in the other computer's own windows and in
every window open on its workspaces.

When the other computer runs an older TermHQ, which can't keep them, those rows
say so instead, and its new terminals start in its home folder.

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

The picker's header for that computer, and the panel on a gray server
workspace window, say which kind of trouble it is.

- **Not sharing:** on the sharing computer, check that TermHQ is running, that
  **Let other computers connect** is on, and that the line under it says
  *Sharing as*, followed by its name and port.
- **Didn't answer** or **Not found:** make sure both computers are on the same
  network and the sharing computer is awake. On Windows, set the network to
  Private and allow TermHQ when Windows asks.
- **Turned away**, **Not paired anymore** or **Identity changed:** the other
  computer answered and refused this one, and its reason says why. Pair again
  if it removed this computer; remove it and pair again if its identity
  changed, as it does after a reinstall.
- **Needs an update**, or a message naming two versions: update the older one.
- If the sharing computer does not use port 47120, type its port in the Port
  field when you add it.

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
- **Files go one way.** **Download…** copies a file from the other computer to
  this one; folders can't be downloaded, and nothing copies a file from this
  computer to the other yet.
- **One screen at a time.** There is no shared or view-only mode for a
  workspace.
- **Windows of other apps.** A program started in a server workspace that opens
  a window of its own opens it on the other computer's screen.
- **Updates** install from one of this computer's own windows, not from a
  server workspace.
- **Settings changed in another window** on this computer reach an open server
  workspace when you reopen it. The other computer's folders and shell are the
  exception: a change to those arrives at once.
