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
SmartScreen shows a warning the first time you run an installer: *"Windows
protected your PC."* Choose **More info → Run anyway**. SmartScreen judges
each file separately, so the warning can reappear when you install a new
version — same two clicks. [Why the warnings →](#why-the-install-warnings)

There is nothing to install alongside it — no runtime, no separate terminal
components. TermHQ carries its own copy of the Windows console machinery, which
is why terminals render identically on an old Windows 10 build and a current
Windows 11 one. Some terminal apps do not, and the difference shows up as
duplicated prompt lines in exactly the full-screen tools coding agents use.

## macOS

Open the `.dmg` and drag TermHQ to Applications. Builds are for **Apple
silicon**; there is no Intel build.

Unsigned builds are quarantined by Gatekeeper, and on current macOS (Sequoia
and later) the old right-click → Open trick no longer works. The first launch
is a three-step ritual:

1. Open TermHQ once. macOS says it *"could not verify this app is free of
   malware"* — dismiss the dialog (don't choose Move to Trash).
2. Open **System Settings → Privacy & Security**, scroll down to the Security
   section, and click **Open Anyway** next to the TermHQ message.
3. Confirm in the dialog that follows. From then on it opens normally.

On older macOS versions, **right-click → Open** still offers an "Open" button
directly. [Why the warnings →](#why-the-install-warnings)

## Why the install warnings

TermHQ builds are not yet code-signed: no Authenticode certificate on the
Windows installer, no Apple notarization on the macOS app. Both are paid,
recurring certificates, and signing changes which dialog your OS shows first —
not a byte of what actually runs. During the pre-release, the honest warning
plus this explanation seemed better than a subscription.

Two things worth knowing in the meantime:

- **Download only from this site or the
  [releases page](https://github.com/gAlexander77/termhq/releases/latest)** —
  every build is published from an exact tagged commit, so a version always
  means the same code.
- **If a downloaded installer vanishes**, an antivirus false positive is the
  likely cause — unsigned binaries occasionally trip them. The file on the
  releases page is unchanged; restore it from quarantine or re-download.

## Linux

An `.AppImage`, a `.deb` and an `.rpm` are published. The AppImage needs no
installation — mark it executable and run it. For the `.deb`:

```bash
sudo dpkg -i termhq_*.deb
```

## Voice dictation

Dictation runs on local Whisper models: transcription happens on your own
machine.

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
