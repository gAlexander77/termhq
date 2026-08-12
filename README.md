<p align="center">
  <img src="site/public/termhq-mark.svg" alt="TermHQ" width="96">
</p>

<h1 align="center">TermHQ</h1>

<p align="center"><strong>A GUI terminal built for coding agents.</strong></p>

<p align="center">
  <img alt="Windows" src="https://img.shields.io/badge/Windows-0078D4?style=flat-square&logo=windows&logoColor=white">
  <img alt="macOS" src="https://img.shields.io/badge/macOS-000000?style=flat-square&logo=apple&logoColor=white">
  <img alt="Linux" src="https://img.shields.io/badge/Linux-1a1a1a?style=flat-square&logo=linux&logoColor=white">
  <img alt="Status" src="https://img.shields.io/badge/status-pre--release-111111?style=flat-square">
</p>

---

> **TermHQ has not been released yet.** There are no downloads on this
> repository, and the links below to the website and release page will start
> working at launch. This page describes what TermHQ is; it does not yet
> describe something you can install.

## What TermHQ is

Terminal emulators were designed for a person typing one command at a time.
That is not how anyone works with coding agents. You run four of them at once,
you want to see all four, you want the one that finished to stop being the one
you have to hunt for — and you do not want any of them to die because you
closed a window.

TermHQ is a terminal workbench built around that. Panes tile instead of
stacking behind tabs. Shells live in a separate process, so they survive
quitting the app entirely. Work is grouped into workspaces you can leave and
come back to. Dictation runs locally, on your own machine, with nothing sent
anywhere.

It is a terminal, not an IDE. It does not want to be your editor.

## Capabilities

- **Tiling panes** — every terminal visible at once, in a grid or in columns,
  with keyboard-driven arranging and drag-to-resize.
- **Shells that outlive the app** — terminals run in a detached host process,
  tmux-style. Quit TermHQ, reopen it, and your sessions are still running with
  their scrollback intact.
- **Workspaces** — named groups of terminals with their own layout and working
  directories. Resume the one you were in, or pick from a list on launch.
- **Built for agents** — panes are sized so an agent's output is composed at the
  width it will be read at, colour capability is forced on so agents render in
  colour, and long-running work is easy to keep an eye on.
- **Local voice dictation** — powered by whisper.cpp, running entirely on your
  machine. There is no cloud path, by design.
- **Theming** — JSON themes applied as CSS variables, with VS Code theme import
  via Open VSX.
- **Undo close** — closing a pane is reversible for a few seconds.

## Platforms

Windows, macOS, and Linux. Windows is the primary daily-driver target; macOS
and Linux are built and tested alongside it.

## Links

| | |
|---|---|
| Website | [termhq.dev](https://termhq.dev) *(at launch)* |
| Documentation | [termhq.dev/docs](https://termhq.dev/docs) *(at launch)* |
| Changelog | [CHANGELOG.md](CHANGELOG.md) |
| Downloads | [Releases](../../releases) *(at launch)* |

## Reporting a problem

Once TermHQ is public, bug reports and feature requests belong in this
repository's [Issues](../../issues). Please include your OS and version, the
TermHQ version, and what you expected to happen.

## Privacy

TermHQ runs locally. Voice dictation is processed on your own machine by a
bundled whisper.cpp build and is never uploaded. Theme and extension downloads
are user-initiated and come from [Open VSX](https://open-vsx.org/).

## About this repository

This is TermHQ's user-facing home: the website, the documentation, the
changelog, and the releases. The application source is maintained privately and
is not published here. Releases are built from that private source at an exact
tagged commit and published to this repository.

## Licence

Licensing is not final. A licence file will be added before this repository is
made public.
