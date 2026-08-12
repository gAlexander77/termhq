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

TermHQ uses ConPTY for its terminals. The required libraries ship beside the
executable, so there is nothing to install separately, and TermHQ does not
depend on the version of ConPTY that happens to be in your Windows build.

## macOS

Open the `.dmg` and drag TermHQ to Applications.

Unsigned builds are quarantined by Gatekeeper. The first launch needs
**right-click → Open** rather than a double-click, which offers an "Open"
button the normal launch path does not.

## Linux

Both an `.AppImage` and a `.deb` are published. The AppImage needs no
installation — mark it executable and run it. For the `.deb`:

```bash
sudo dpkg -i termhq_*.deb
```

## Voice dictation

Dictation runs entirely on your machine using whisper.cpp. On Windows the
speech model is downloaded on first use; on macOS it is built from source as
part of setup. Either way, audio never leaves the machine — there is no cloud
transcription path in TermHQ at all.

If you never use dictation, the model is never fetched.

## Where TermHQ keeps its files

Settings, themes, workspaces and logs live in a per-user configuration
directory:

| Platform | Path |
|---|---|
| Windows | `%APPDATA%\dev.termhq.app` |
| macOS | `~/Library/Application Support/dev.termhq.app` |
| Linux | `~/.config/dev.termhq.app` |

## Updating

TermHQ checks for updates on launch and shows an unobtrusive indicator when one
is available. Installing is always a click — TermHQ will not update or restart
itself while you have shells running.

## Uninstalling

Use the platform's normal uninstall route. The configuration directory above is
left in place; delete it by hand if you want TermHQ's settings, themes and saved
workspaces gone too.
