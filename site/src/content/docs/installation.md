---
title: "Installation"
weight: 20
description: "Install TermHQ on Windows, macOS, or Linux, and what to expect from SmartScreen and Gatekeeper."
---

Download the build for your platform from the
[releases page](https://github.com/gAlexander77/termhq/releases/latest).

## Windows

Run the installer. TermHQ supports Windows 10 and 11.

Because builds are not yet code-signed with an Authenticode certificate,
SmartScreen shows a warning on the **first** install: *"Windows protected your
PC."* Choose **More info → Run anyway**. Later updates are unaffected.

There is nothing to install alongside it — no runtime, no separate terminal
components. TermHQ carries its own copy of the Windows console machinery, which
is why terminals render identically on an old Windows 10 build and a current
Windows 11 one. Some terminal apps do not, and the difference shows up as
duplicated prompt lines in exactly the full-screen tools coding agents use.

## macOS

Open the `.dmg` and drag TermHQ to Applications. Builds are for **Apple
silicon**; there is no Intel build.

Unsigned builds are quarantined by Gatekeeper. The first launch needs
**right-click → Open** rather than a double-click, which offers an "Open"
button the normal launch path does not.

## Linux

An `.AppImage`, a `.deb` and an `.rpm` are published. The AppImage needs no
installation — mark it executable and run it. For the `.deb`:

```bash
sudo dpkg -i termhq_*.deb
```

## Voice dictation

Dictation runs entirely on your machine. Audio never leaves it
— there is no cloud transcription path in TermHQ at all.

The installers ship **without a speech model**, which is most of why they are
small. The first time you want voice, open **Settings → Voice** and download a
model — one click, a progress bar, done. Until then there is no mic button and
nothing voice-related runs: nobody gets handed a hundred-megabyte AI download
they did not ask for. On macOS the first recording asks for microphone
permission, as any app does.

Four models are offered, from a quick 78 MB English-only one to a 1.6 GB
multilingual one — each labeled with its size and language coverage, and the
panel says in plain text exactly where every download comes from. Models can
be switched, deleted, or re-downloaded at any time, they survive app updates,
and if you already have a compatible model file of your own, **Import** brings
it in instead.

Dictation listens in **English** by default. **Settings → Voice** has a
language dropdown with sixteen more, plus an auto-detect option that lets a
multilingual model identify the language per recording.

Linux is the exception: the Linux packages do not include the speech engine
yet, so dictation is unavailable there for now. Everything else on this page
applies to Linux as normal.

## Where TermHQ keeps its files

Settings, themes, saved workspaces and a log file live in a per-user
configuration directory:

| Platform | Path |
|---|---|
| Windows | `%APPDATA%\dev.termhq.app` |
| macOS | `~/Library/Application Support/dev.termhq.app` |
| Linux | `~/.config/dev.termhq.app` |

## Updating

Update by downloading the current release and installing over the top; your
configuration directory is untouched.

Built-in update checking is not switched on yet. When it is, installing will
always be a click you make: TermHQ will not update or restart itself on its own
initiative, because there are live shells and running agents in those panes and
an unprompted relaunch destroys work no dialog can apologize for.

## Uninstalling

Use the platform's normal uninstall route. The configuration directory above is
left in place; delete it by hand if you want TermHQ's settings, themes and saved
workspaces gone too.
